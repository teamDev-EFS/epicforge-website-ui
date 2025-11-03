import nodemailer from 'nodemailer';
import Notification from '../models/Notification.js';

function buildAdminEmail(lead, settings, adminUrl) {
  const subject = `[EpicForge Lead] ${lead.source} – ${lead.name} – ${lead.company || 'No company'}`;
  const whatsappText = encodeURIComponent(
    `New lead from EpicForge\nName: ${lead.name}\nPhone: ${lead.phone || lead.whatsapp || ''}\nEmail: ${lead.email || ''}\nCompany: ${lead.company || ''}\nMessage: ${lead.message || ''}`
  );
  const manualLink = `https://wa.me/${(settings?.notifyWhatsapps?.[0] || '').replace(/[^\d+]/g,'')}?text=${whatsappText}`;
  const html = `
  <div style="font-family:Inter,system-ui,Arial,sans-serif;padding:16px;background:#0b1020;color:#e5e7eb;">
    <h2 style="margin:0 0 8px">New Lead – ${lead.source} – ${lead.name} (${lead.company || 'No company'})</h2>
    <div style="background:#111827;border:1px solid #1f2937;border-radius:12px;padding:16px;margin-bottom:16px">
      <h3 style="margin:0 0 8px;color:#93c5fd">Lead Info</h3>
      <pre style="white-space:pre-wrap;color:#e5e7eb">${JSON.stringify(lead.toObject ? lead.toObject() : lead, null, 2)}</pre>
    </div>
    <div style="display:flex;gap:12px;margin-top:12px">
      <a href="${adminUrl}/leads/${lead._id}" style="background:#4ADE80;color:#0b1020;padding:10px 14px;border-radius:10px;text-decoration:none;font-weight:600">Open in Admin</a>
      <a href="${manualLink}" style="background:#f59e0b;color:#0b1020;padding:10px 14px;border-radius:10px;text-decoration:none;font-weight:600">Reply on WhatsApp</a>
    </div>
    <p style="margin-top:16px;color:#9ca3af">Powered by EpicForge LeadOps</p>
  </div>`;
  return { subject, html, manualLink };
}

async function sendEmailToAdmin(lead, settings) {
  const to = (settings?.notifyEmails && settings.notifyEmails.length)
    ? settings.notifyEmails
    : (process.env.NOTIFY_EMAILS || '').split(',').map(s => s.trim()).filter(Boolean);

  if (!to.length) return { ok: false, error: 'No admin emails configured' };

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined
  });

  const adminUrl = process.env.ADMIN_URL || (process.env.FRONTEND_URL ? `${process.env.FRONTEND_URL}/admin` : '');
  const { subject, html } = buildAdminEmail(lead, settings, adminUrl);
  const fromName = 'EpicForge Software – Leads Desk';
  const from = process.env.EMAIL_FROM || `${fromName} <no-reply@epicforge.local>`;

  await transporter.sendMail({ from, to, subject, html });
  await Notification.create({ type: 'email', to, payload: { leadId: lead._id }, relatedLeadId: lead._id, status: 'success' });
  return { ok: true };
}

async function trySendWhatsappToAdmin(lead, settings) {
  const provider = settings?.whatsapp?.provider || process.env.WHATSAPP_PROVIDER || 'manual';
  const to = (settings?.notifyWhatsapps?.length ? settings.notifyWhatsapps : (process.env.NOTIFY_WHATSAPPS || '').split(',').map(s=>s.trim()).filter(Boolean));
  if (!to.length) return { ok: false, error: 'No admin WhatsApp numbers configured' };

  const text = `New lead from EpicForge\nName: ${lead.name}\nPhone: ${lead.phone || lead.whatsapp || ''}\nService: ${lead.projectType || ''}`;

  if (provider === 'cloud-api') {
    const token = settings?.whatsapp?.cloud?.accessToken || process.env.WHATSAPP_TOKEN;
    const phoneNumberId = settings?.whatsapp?.cloud?.phoneNumberId || process.env.WHATSAPP_PHONE_NUMBER_ID;
    if (!token || !phoneNumberId) {
      await Notification.create({ type: 'whatsapp', to, payload: { text }, relatedLeadId: lead._id, status: 'failed', errorMessage: 'no-token-or-number' });
      return { ok: false, error: 'no-token' };
    }
    // Fire one message to first number
    try {
      const resp = await fetch(`https://graph.facebook.com/v18.0/${phoneNumberId}/messages`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ messaging_product: 'whatsapp', to: to[0], type: 'text', text: { body: text } })
      });
      if (!resp.ok) throw new Error(`WA ${resp.status}`);
      await Notification.create({ type: 'whatsapp', to: [to[0]], payload: { text }, relatedLeadId: lead._id, status: 'success' });
      return { ok: true };
    } catch (e) {
      await Notification.create({ type: 'whatsapp', to: [to[0]], payload: { text }, relatedLeadId: lead._id, status: 'failed', errorMessage: e.message });
      return { ok: false, error: e.message };
    }
  }

  // manual fallback: store unsent task via notification log (failed to trigger auto)
  const link = `https://wa.me/${to[0].replace(/[^\d+]/g,'')}?text=${encodeURIComponent(text)}`;
  await Notification.create({ type: 'whatsapp', to: [to[0]], payload: { text, manualLink: link }, relatedLeadId: lead._id, status: 'failed', errorMessage: 'manual' });
  return { ok: false, manualLink: link };
}

export async function notifyNewLead(lead, settings, appRef) {
  const io = appRef?.get?.('io');
  // email
  try {
    await sendEmailToAdmin(lead, settings);
    lead.notifications.emailToAdmin = { sent: true, at: new Date() };
  } catch (e) {
    lead.notifications.emailToAdmin = { sent: false, error: e.message };
  }

  // whatsapp
  try {
    const r = await trySendWhatsappToAdmin(lead, settings);
    if (r.ok) {
      lead.notifications.whatsappToAdmin = { sent: true, at: new Date() };
    } else {
      lead.notifications.whatsappToAdmin = { sent: false, error: r.error || 'manual' };
      lead.events.push({ type: 'whatsapp-sent', by: 'system', payload: { ok: r.ok } });
    }
  } catch (e) {
    lead.notifications.whatsappToAdmin = { sent: false, error: e.message };
  }

  await lead.save();
  if (io) io.emit('lead:notify', { leadId: lead._id });
}


