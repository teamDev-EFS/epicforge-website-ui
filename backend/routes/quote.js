const express = require("express");
const router = express.Router();
const Joi = require("joi");

// Validation schema for quote requests
const quoteSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).max(15).required(),
  company: Joi.string().max(100).optional(),
  projectType: Joi.string().required(),
  businessType: Joi.string().required(),
  budget: Joi.number().min(1000).required(),
  requirements: Joi.string().min(10).max(2000).required(),
  problem: Joi.string().min(10).max(1000).optional(),
  timeline: Joi.string().optional(),
  features: Joi.array().items(Joi.string()).optional(),
  additionalServices: Joi.array().items(Joi.string()).optional(),
  pages: Joi.number().min(1).optional(),
  source: Joi.string().default("website"),
  language: Joi.string().default("en"),
});

// Create quote request
router.post("/", async (req, res) => {
  try {
    // Validate input
    const { error, value } = quoteSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.details.map((detail) => detail.message),
      });
    }

    // Calculate project estimate
    const {
      formatBudget,
      calculateProjectEstimate,
    } = require("../utils/budgetCalculator");
    const budgetInfo = formatBudget(value.budget);
    const projectEstimate = calculateProjectEstimate(
      value.budget,
      value.projectType,
      value.businessType
    );

    // Generate quote data
    const quoteData = {
      ...value,
      problem: value.problem || value.requirements, // Use requirements as problem if problem not provided
      budgetFormatted: budgetInfo.formatted,
      qualified:
        budgetInfo.priority === "high" || budgetInfo.priority === "medium",
      createdAt: new Date(),
    };

    // Save to database (using Lead model for now)
    const Lead = require("../models/Lead");
    const lead = new Lead(quoteData);
    await lead.save();

    // Send notifications asynchronously
    setImmediate(async () => {
      try {
        const EmailService = require("../services/emailService");
        const WhatsAppService = require("../services/whatsappService");

        const emailService = new EmailService();
        const whatsappService = new WhatsAppService();

        // Send email notifications
        await emailService.sendLeadNotification(quoteData, projectEstimate);
        await emailService.sendConfirmationToLead(quoteData, projectEstimate);

        // Send WhatsApp notifications
        await whatsappService.sendLeadNotification(quoteData, projectEstimate);
        await whatsappService.sendConfirmationToLead(
          quoteData,
          projectEstimate
        );

        // Update lead with notification status
        await Lead.findByIdAndUpdate(lead._id, {
          emailSent: true,
          whatsappSent: true,
        });

        console.log("All notifications sent successfully for quote:", lead._id);
      } catch (notificationError) {
        console.error("Error sending notifications:", notificationError);
      }
    });

    // Return success response with quote details
    res.status(201).json({
      success: true,
      message: "Quote request submitted successfully",
      data: {
        quoteId: lead._id,
        budgetInfo,
        projectEstimate: {
          duration: projectEstimate.duration,
          category: budgetInfo.category,
          priority: budgetInfo.priority,
        },
        nextSteps: [
          "Our team will contact you within 2 hours",
          "We'll schedule a FREE discovery call",
          "You'll receive a detailed project proposal",
          "We'll start building your dream project!",
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
    console.error("Error creating quote:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

// Get quote by ID
router.get("/:id", async (req, res) => {
  try {
    const Lead = require("../models/Lead");
    const quote = await Lead.findById(req.params.id);

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: "Quote not found",
      });
    }

    res.json({
      success: true,
      data: quote,
    });
  } catch (error) {
    console.error("Error fetching quote:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

// Get all quotes (admin only)
router.get("/", async (req, res) => {
  try {
    const Lead = require("../models/Lead");
    const { page = 1, limit = 10, status, priority } = req.query;
    const query = {};

    if (status) query.status = status;
    if (priority) {
      const budgetRanges = {
        high: { $gte: 100000 },
        medium: { $gte: 10000, $lt: 100000 },
        low: { $lt: 10000 },
      };
      if (budgetRanges[priority]) {
        query.budget = budgetRanges[priority];
      }
    }

    const quotes = await Lead.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select("-__v");

    const total = await Lead.countDocuments(query);

    res.json({
      success: true,
      data: {
        quotes,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / limit),
          total,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching quotes:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

module.exports = router;
