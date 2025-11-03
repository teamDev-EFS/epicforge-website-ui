import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  type: { type: String, enum: ['created', 'note', 'email-sent', 'whatsapp-sent', 'status-changed'], required: true },
  by: { type: String },
  at: { type: Date, default: Date.now },
  payload: { type: Object, default: {} }
}, { _id: false });

const LeadSchema = new mongoose.Schema({
  source: { type: String, index: true },
  channel: { type: String, default: 'web' },
  name: String,
  email: String,
  phone: String,
  company: String,
  businessType: String,
  budget: String,
  projectType: String,
  whatsapp: String,
  message: String,
  tags: { type: [String], default: [] },
  status: { type: String, enum: ['new', 'working', 'proposal-sent', 'won', 'lost', 'spam'], default: 'new', index: true },
  priority: { type: String, enum: ['high', 'normal', 'low'], default: 'normal' },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  events: { type: [EventSchema], default: [] },
  visitor: {
    ip: String,
    userAgent: String,
    referer: String,
    landingPage: String,
    currentPage: String,
    utm: {
      source: String,
      medium: String,
      campaign: String,
      term: String,
      content: String
    }
  },
  notifications: {
    emailToAdmin: { sent: { type: Boolean, default: false }, at: Date, error: String },
    whatsappToAdmin: { sent: { type: Boolean, default: false }, at: Date, error: String },
    emailToVisitor: { sent: { type: Boolean, default: false }, at: Date, error: String }
  }
}, { timestamps: true });

LeadSchema.index({ status: 1, createdAt: -1 });
LeadSchema.index({ 'visitor.utm.source': 1, 'visitor.referer': 1 });
LeadSchema.index({ name: 'text', email: 'text', company: 'text', message: 'text' });

export default mongoose.model('Lead', LeadSchema);


