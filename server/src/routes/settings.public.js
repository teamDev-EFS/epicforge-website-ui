import express from 'express';
import Setting from '../models/Setting.js';

const router = express.Router();

router.get('/public', async (_req, res) => {
  const s = await Setting.findById('global');
  return res.json({
    companyName: s?.companyName || 'EpicForge Software',
    calendars: { calendlyUrl: s?.calendars?.calendlyUrl || process.env.CALENDLY_URL || '' }
  });
});

export default router;


