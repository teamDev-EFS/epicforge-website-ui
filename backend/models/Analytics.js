const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["visitor", "footfall", "cookie", "audit_request", "whatsapp_click"],
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
      index: true,
    },
    userAgent: String,
    ip: String,
    referer: String,
    path: String,
    sessionId: String,
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for efficient queries
analyticsSchema.index({ type: 1, date: -1 });
analyticsSchema.index({ date: -1 });
analyticsSchema.index({ sessionId: 1 });

module.exports = mongoose.model("Analytics", analyticsSchema);

