import mongoose from 'mongoose';

const SettingSchema = new mongoose.Schema({
  _id: { type: String, default: 'global' },
  companyName: String,
  notifyEmails: { type: [String], default: [] },
  notifyWhatsapps: { type: [String], default: [] },
  whatsapp: {
    provider: { type: String, enum: ['cloud-api', 'manual'], default: 'manual' },
    cloud: {
      phoneNumberId: String,
      accessToken: String,
      templateName: { type: String, default: 'lead_alert' }
    }
  },
  calendars: {
    calendlyUrl: String,
    fallbackMeetUrl: String
  },
  security: {
    leadRateLimitPerIpPerHour: { type: Number, default: 30 }
  }
}, { timestamps: true });

export default mongoose.model('Setting', SettingSchema);


