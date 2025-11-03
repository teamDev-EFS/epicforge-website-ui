import express from 'express';
import Joi from 'joi';
import xss from 'xss';
import Lead from '../models/Lead.js';
import Setting from '../models/Setting.js';
import { notifyNewLead } from '../services/notify.js';

const router = express.Router();

const captureSchema = Joi.object({
  source: Joi.string().required(),
  channel: Joi.string().valid('web', 'whatsapp', 'email', 'manual').default('web'),
  name: Joi.string().required(),
  email: Joi.string().email().allow('', null),
  phone: Joi.string().allow('', null),
  company: Joi.string().allow('', null),
  businessType: Joi.string().allow('', null),
  budget: Joi.string().allow('', null),
  projectType: Joi.string().allow('', null),
  whatsapp: Joi.string().allow('', null),
  message: Joi.string().allow('', null),
  tags: Joi.array().items(Joi.string()).default([]),
  priority: Joi.string().valid('high', 'normal', 'low').default('normal'),
  visitor: Joi.object({
    ip: Joi.string().allow('', null),
    userAgent: Joi.string().allow('', null),
    referer: Joi.string().allow('', null),
    landingPage: Joi.string().allow('', null),
    currentPage: Joi.string().allow('', null),
    utm: Joi.object({
      source: Joi.string().allow('', null),
      medium: Joi.string().allow('', null),
      campaign: Joi.string().allow('', null),
      term: Joi.string().allow('', null),
      content: Joi.string().allow('', null)
    }).default({})
  }).default({})
});

router.post('/capture', async (req, res) => {
  try {
    const body = await captureSchema.validateAsync(req.body, { abortEarly: false, stripUnknown: true });
    const sanitized = { ...body };
    if (sanitized.message) sanitized.message = xss(sanitized.message);

    const ip = req.headers['x-forwarded-for']?.toString().split(',')[0]?.trim() || req.socket.remoteAddress || '';
    sanitized.visitor = {
      ip: sanitized.visitor.ip || ip,
      userAgent: req.headers['user-agent'] || '',
      referer: sanitized.visitor.referer || req.headers['referer'] || '',
      landingPage: sanitized.visitor.landingPage || '',
      currentPage: sanitized.visitor.currentPage || '',
      utm: sanitized.visitor.utm || {}
    };

    const lead = await Lead.create({
      ...sanitized,
      events: [{ type: 'created', by: 'system', payload: {} }]
    });

    const settings = await Setting.findById('global');

    // Fire async notifications (no await for response speed)
    notifyNewLead(lead, settings, req.app).catch(() => {});

    const io = req.app.get('io');
    if (io) io.emit('lead:new', { leadId: lead._id, source: lead.source, name: lead.name });

    return res.json({ success: true, leadId: lead._id });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
});

export default router;


