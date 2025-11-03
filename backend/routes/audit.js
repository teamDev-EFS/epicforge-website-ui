const express = require("express");
const router = express.Router();
const Joi = require("joi");

// Validation schema for audit requests
const auditSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).max(15).required(),
  company: Joi.string().max(100).optional(),
  website: Joi.string().uri().optional(),
  businessType: Joi.string().required(),
  currentChallenges: Joi.string().min(10).max(1000).required(),
  goals: Joi.string().min(10).max(1000).optional(),
  source: Joi.string().default("free_audit"),
  language: Joi.string().default("en"),
});

// Create audit request
router.post("/", async (req, res) => {
  try {
    // Validate input
    const { error, value } = auditSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.details.map((detail) => detail.message),
      });
    }

    // Create audit data
    const auditData = {
      ...value,
      type: "free_audit",
      status: "new",
      createdAt: new Date(),
    };

    // Save to database (using Lead model for now)
    const Lead = require("../models/Lead");
    const { formatBudget } = require("../utils/budgetCalculator");
    const budgetInfo = formatBudget(0); // Free audit

    const lead = new Lead({
      name: auditData.name,
      email: auditData.email,
      phone: auditData.phone,
      company: auditData.company,
      businessType: auditData.businessType,
      projectType: "Free AI Audit",
      budget: 0, // Free audit
      budgetFormatted: budgetInfo.formatted || "Free",
      problem: `Free Audit Request: ${auditData.currentChallenges}`,
      source: auditData.source,
      language: auditData.language,
      additionalServices: ["AI Audit", "SEO Analysis", "Growth Strategy"],
      pages: 1,
    });

    await lead.save();

    // Emit Socket.IO event for new audit request (real-time notification to admin portal)
    const io = req.app.get("io");
    if (io) {
      io.emit("lead:new", {
        leadId: lead._id,
        source: "free_audit",
        name: auditData.name,
        email: auditData.email,
        budget: "Free",
        timestamp: new Date(),
      });
    }

    // Send notifications asynchronously
    setImmediate(async () => {
      try {
        const EmailService = require("../services/emailService");
        const WhatsAppService = require("../services/whatsappService");

        const emailService = new EmailService();
        const whatsappService = new WhatsAppService();

        // Send email notifications
        await emailService.sendLeadNotification(lead.toObject(), {
          duration: "1-2 days",
          category: "audit",
          priority: "high",
        });
        await emailService.sendConfirmationToLead(lead.toObject(), {
          duration: "1-2 days",
          category: "audit",
          priority: "high",
        });

        // Send WhatsApp notifications
        await whatsappService.sendLeadNotification(lead.toObject(), {
          duration: "1-2 days",
          category: "audit",
          priority: "high",
        });
        await whatsappService.sendConfirmationToLead(lead.toObject(), {
          duration: "1-2 days",
          category: "audit",
          priority: "high",
        });

        // Update lead with notification status
        await Lead.findByIdAndUpdate(lead._id, {
          emailSent: true,
          whatsappSent: true,
        });

        // Emit Socket.IO event for notification sent
        if (io) {
          io.emit("lead:notify", {
            leadId: lead._id,
            notificationsSent: {
              email: true,
              whatsapp: true,
            },
            timestamp: new Date(),
          });
        }

        console.log(
          "All notifications sent successfully for audit request:",
          lead._id
        );
      } catch (notificationError) {
        console.error("Error sending notifications:", notificationError);
      }
    });

    // Return success response
    res.status(201).json({
      success: true,
      message: "Free audit request submitted successfully",
      data: {
        auditId: lead._id,
        nextSteps: [
          "Our AI team will analyze your digital presence within 24 hours",
          "You'll receive a comprehensive audit report via email",
          "We'll schedule a FREE strategy call to discuss findings",
          "Get actionable insights to grow your business",
        ],
        contactInfo: {
          email: "info@epicforgesoftware.com",
          phone: "+91 98765 43210",
          whatsapp: "https://wa.me/919876543210",
          calendar: "https://calendly.com/team-dev-epicforgesoftware/30min",
        },
      },
    });
  } catch (error) {
    console.error("Error creating audit request:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

// Get audit by ID
router.get("/:id", async (req, res) => {
  try {
    const Lead = require("../models/Lead");
    const audit = await Lead.findById(req.params.id);

    if (!audit) {
      return res.status(404).json({
        success: false,
        message: "Audit request not found",
      });
    }

    res.json({
      success: true,
      data: audit,
    });
  } catch (error) {
    console.error("Error fetching audit:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

// Get all audit requests (admin only)
router.get("/", async (req, res) => {
  try {
    const Lead = require("../models/Lead");
    const { page = 1, limit = 10 } = req.query;

    const audits = await Lead.find({ source: "free_audit" })
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select("-__v");

    const total = await Lead.countDocuments({ source: "free_audit" });

    res.json({
      success: true,
      data: {
        audits,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / limit),
          total,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching audit requests:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

module.exports = router;
