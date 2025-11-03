import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
  type: { type: String, enum: ['email', 'whatsapp', 'socket'], required: true },
  to: { type: [String], default: [] },
  payload: { type: Object, default: {} },
  relatedLeadId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead' },
  status: { type: String, enum: ['success', 'failed'], required: true },
  errorMessage: String
}, { timestamps: { createdAt: true, updatedAt: false } });

export default mongoose.model('Notification', NotificationSchema);


