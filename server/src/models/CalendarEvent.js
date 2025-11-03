import mongoose from 'mongoose';

const CalendarEventSchema = new mongoose.Schema({
  leadId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead', required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  meetingType: { type: String, required: true },
  startAt: { type: Date, required: true },
  durationMins: { type: Number, default: 30 },
  joinUrl: { type: String, required: true },
  notes: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model('CalendarEvent', CalendarEventSchema);


