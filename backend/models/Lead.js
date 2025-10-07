const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  // Personal Information
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  whatsapp: {
    type: String,
    trim: true,
  },

  // Company Information
  company: {
    type: String,
    trim: true,
  },
  businessType: {
    type: String,
    required: true,
  },

  // Project Information
  projectType: {
    type: String,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  budgetFormatted: {
    type: String,
    required: true,
  },
  problem: {
    type: String,
    required: true,
    trim: true,
  },

  // Source Information
  source: {
    type: String,
    default: "website",
  },
  language: {
    type: String,
    default: "en",
  },

  // Status and Processing
  status: {
    type: String,
    enum: [
      "new",
      "contacted",
      "qualified",
      "proposal_sent",
      "closed_won",
      "closed_lost",
    ],
    default: "new",
  },
  qualified: {
    type: Boolean,
    default: false,
  },

  // Notifications
  emailSent: {
    type: Boolean,
    default: false,
  },
  whatsappSent: {
    type: Boolean,
    default: false,
  },

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
leadSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Index for better query performance
leadSchema.index({ email: 1 });
leadSchema.index({ phone: 1 });
leadSchema.index({ createdAt: -1 });
leadSchema.index({ status: 1 });

module.exports = mongoose.model("Lead", leadSchema);
