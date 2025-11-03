import express from 'express';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import bcrypt from 'bcryptjs';
import Lead from '../../models/Lead.js';
import User from '../../models/User.js';
import Setting from '../../models/Setting.js';
import Notification from '../../models/Notification.js';
import { Types } from 'mongoose';
import { notifyNewLead } from '../../services/notify.js';

const router = express.Router();

function authMiddleware(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ')? header.substring(7) : null;
  if (!token) return res.status(401).json({ error: 'unauthorized' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'devsecret');
    req.user = decoded;
    return next();
  } catch {
    return res.status(401).json({ error: 'invalid_token' });
  }
}

router.post('/auth/login', async (req, res) => {
  const schema = Joi.object({ email: Joi.string().email().required(), password: Joi.string().required() });
  try {
    const { email, password } = await schema.validateAsync(req.body);
    const user = await User.findOne({ email, status: 'active' });
    if (!user) return res.status(401).json({ error: 'invalid_credentials' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: 'invalid_credentials' });
    user.lastLoginAt = new Date();
    await user.save();
    const token = jwt.sign({ id: user._id, role: user.role, email: user.email }, process.env.JWT_SECRET || 'devsecret', { expiresIn: '7d' });
    return res.json({ token, user: { id: user._id, name: user.name, role: user.role, email: user.email } });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

// Register user: allows first admin without auth; afterwards only admin can create
router.post('/auth/register', async (req, res) => {
  const schema = Joi.object({ name: Joi.string().required(), email: Joi.string().email().required(), password: Joi.string().min(6).required(), role: Joi.string().valid('admin','staff').default('staff') });
  try {
    const payload = await schema.validateAsync(req.body);
    const existingCount = await User.countDocuments();
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ')? header.substring(7) : null;
    let requester = null;
    if (token) {
      try { requester = jwt.verify(token, process.env.JWT_SECRET || 'devsecret'); } catch { /* ignore */ }
    }
    if (existingCount > 0) {
      if (!requester || requester.role !== 'admin') return res.status(403).json({ error: 'forbidden' });
    }
    const role = existingCount === 0 ? 'admin' : payload.role;
    const hashed = await bcrypt.hash(payload.password, 10);
    const user = await User.create({ name: payload.name, email: payload.email, passwordHash: hashed, role });
    return res.json({ ok: true, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

router.get('/leads', authMiddleware, async (req, res) => {
  const { status, source, dateFrom, dateTo, q, owner } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (source) filter.source = source;
  if (owner === 'me') filter.ownerId = req.user.id;
  if (dateFrom || dateTo) {
    filter.createdAt = {};
    if (dateFrom) filter.createdAt.$gte = new Date(dateFrom);
    if (dateTo) filter.createdAt.$lte = new Date(dateTo);
  }
  if (q) filter.$text = { $search: q };
  const items = await Lead.find(filter).sort({ createdAt: -1 }).limit(200);
  return res.json({ items });
});

router.get('/leads/:id', authMiddleware, async (req, res) => {
  const lead = await Lead.findById(req.params.id);
  if (!lead) return res.status(404).json({ error: 'not_found' });
  return res.json({ lead });
});

router.put('/leads/:id', authMiddleware, async (req, res) => {
  const schema = Joi.object({ status: Joi.string(), note: Joi.string().allow(''), ownerId: Joi.string().allow(null) });
  const { status, note, ownerId } = await schema.validateAsync(req.body, { stripUnknown: true });
  const lead = await Lead.findById(req.params.id);
  if (!lead) return res.status(404).json({ error: 'not_found' });
  if (status && status !== lead.status) {
    lead.events.push({ type: 'status-changed', by: req.user.id, payload: { from: lead.status, to: status } });
    lead.status = status;
  }
  if (typeof ownerId !== 'undefined') lead.ownerId = ownerId || null;
  if (note) lead.events.push({ type: 'note', by: req.user.id, payload: { note } });
  await lead.save();
  return res.json({ ok: true, lead });
});

// Lead-related notifications (for manual WA retries UI)
router.get('/leads/:id/notifications', authMiddleware, async (req, res) => {
  if (!Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ error: 'invalid_id' });
  const items = await Notification.find({ relatedLeadId: req.params.id }).sort({ createdAt: -1 });
  return res.json({ items });
});

// Reply via WhatsApp (cloud/manual)
router.post('/leads/:id/reply/whatsapp', authMiddleware, async (req, res) => {
  const schema = Joi.object({ message: Joi.string().required() });
  const { message } = await schema.validateAsync(req.body);
  const lead = await Lead.findById(req.params.id);
  if (!lead) return res.status(404).json({ error: 'not_found' });
  const settings = await Setting.findById('global');

  // manual link to lead's WhatsApp/phone
  const toNumber = (lead.whatsapp || lead.phone || '').replace(/[^\d+]/g,'');
  const provider = settings?.whatsapp?.provider || process.env.WHATSAPP_PROVIDER || 'manual';
  if (provider !== 'cloud-api' || !process.env.WHATSAPP_TOKEN || !process.env.WHATSAPP_PHONE_NUMBER_ID) {
    const link = `https://wa.me/${toNumber}?text=${encodeURIComponent(message)}`;
    await Notification.create({ type: 'whatsapp', to: [toNumber], payload: { text: message, manualLink: link, direction: 'outbound' }, relatedLeadId: lead._id, status: 'failed', errorMessage: 'manual' });
    lead.events.push({ type: 'whatsapp-sent', by: req.user.id, payload: { provider: 'manual' } });
    await lead.save();
    return res.json({ ok: false, manualLink: link });
  }

  // Cloud API send (simple text)
  try {
    const resp = await fetch(`https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ messaging_product: 'whatsapp', to: toNumber, type: 'text', text: { body: message } })
    });
    if (!resp.ok) throw new Error(`WA ${resp.status}`);
    await Notification.create({ type: 'whatsapp', to: [toNumber], payload: { text: message, direction: 'outbound' }, relatedLeadId: lead._id, status: 'success' });
    lead.events.push({ type: 'whatsapp-sent', by: req.user.id, payload: { provider: 'cloud-api' } });
    await lead.save();
    return res.json({ ok: true });
  } catch (e) {
    await Notification.create({ type: 'whatsapp', to: [toNumber], payload: { text: message, direction: 'outbound' }, relatedLeadId: lead._id, status: 'failed', errorMessage: e.message });
    return res.status(500).json({ error: e.message });
  }
});

// Reply via Email (logs event; relies on SMTP config if later wired)
router.post('/leads/:id/reply/email', authMiddleware, async (req, res) => {
  const schema = Joi.object({ subject: Joi.string().required(), html: Joi.string().required() });
  const { subject, html } = await schema.validateAsync(req.body);
  const lead = await Lead.findById(req.params.id);
  if (!lead) return res.status(404).json({ error: 'not_found' });
  // For now: record intent; in future, send via SMTP and log Notification
  lead.events.push({ type: 'email-sent', by: req.user.id, payload: { subject } });
  await lead.save();
  return res.json({ ok: true });
});

// Analytics overview
router.get('/analytics/overview', authMiddleware, async (_req, res) => {
  const totalLeads = await Lead.countDocuments();
  const leadsBySource = await Lead.aggregate([ { $group: { _id: '$source', count: { $sum: 1 } } } ]);
  const leadsByStatus = await Lead.aggregate([ { $group: { _id: '$status', count: { $sum: 1 } } } ]);
  const since = new Date(Date.now() - 7*24*60*60*1000);
  const last7Days = await Lead.aggregate([
    { $match: { createdAt: { $gte: since } } },
    { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, count: { $sum: 1 } } },
    { $sort: { _id: 1 } }
  ]);
  const conversionByPage = await Lead.aggregate([
    { $group: { _id: '$visitor.currentPage', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 20 }
  ]);
  return res.json({ totalLeads, leadsBySource, leadsByStatus, last7Days, conversionByPage });
});

router.get('/notifications', authMiddleware, async (_req, res) => {
  const items = await Notification.find({}).sort({ createdAt: -1 }).limit(200);
  return res.json({ items });
});

router.get('/settings', authMiddleware, async (_req, res) => {
  const s = await Setting.findById('global');
  return res.json({ settings: s });
});

router.put('/settings', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'forbidden' });
  const schema = Joi.object({
    companyName: Joi.string().allow(''),
    notifyEmails: Joi.array().items(Joi.string().email()),
    notifyWhatsapps: Joi.array().items(Joi.string()),
    whatsapp: Joi.object({ provider: Joi.string().valid('cloud-api', 'manual'), cloud: Joi.object({ phoneNumberId: Joi.string().allow(''), accessToken: Joi.string().allow(''), templateName: Joi.string().allow('') }) }),
    calendars: Joi.object({ calendlyUrl: Joi.string().allow(''), fallbackMeetUrl: Joi.string().allow('') }),
    security: Joi.object({ leadRateLimitPerIpPerHour: Joi.number() })
  });
  const payload = await schema.validateAsync(req.body, { stripUnknown: true });
  const updated = await Setting.findByIdAndUpdate('global', { $set: payload }, { new: true, upsert: true });
  return res.json({ settings: updated });
});

export default router;


