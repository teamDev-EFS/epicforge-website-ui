const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");
const {
  formatBudget,
  calculateProjectEstimate,
} = require("../utils/budgetCalculator");
const EmailService = require("../services/emailService");
const WhatsAppService = require("../services/whatsappService");

// Instantiate services
const emailService = new EmailService();
const whatsappService = new WhatsAppService();
const Joi = require("joi");

// Validation schemas
const leadSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).max(15).required(),
  whatsapp: Joi.string().min(10).max(15).optional(),
  company: Joi.string().max(100).optional(),
  businessType: Joi.string().required(),
  projectType: Joi.string().required(),
  budget: Joi.number().min(1000).required(),
  problem: Joi.string().min(10).max(1000).required(),
  additionalServices: Joi.array().items(Joi.string()).optional(),
  pages: Joi.number().min(1).optional(),
  source: Joi.string().default("website"),
  language: Joi.string().default("en"),
});

// Create new lead
router.post("/", async (req, res) => {
  try {
    // Validate input
    const { error, value } = leadSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.details.map((detail) => detail.message),
      });
    }

    // Calculate budget formatting and project estimate
    const budgetInfo = formatBudget(value.budget);
    const projectEstimate = calculateProjectEstimate(
      value.budget,
      value.projectType,
      value.businessType
    );

    // Create lead data
    const leadData = {
      ...value,
      budgetFormatted: budgetInfo.formatted,
      qualified:
        budgetInfo.priority === "high" || budgetInfo.priority === "medium",
    };

    // Save to database
    const lead = new Lead(leadData);
    await lead.save();

    // Send notifications asynchronously
    setImmediate(async () => {
      try {
        // Send email notifications
        await emailService.sendLeadNotification(leadData, projectEstimate);
        await emailService.sendConfirmationToLead(leadData, projectEstimate);

        // Send WhatsApp notifications
        await whatsappService.sendLeadNotification(leadData, projectEstimate);
        await whatsappService.sendConfirmationToLead(leadData, projectEstimate);

        // Update lead with notification status
        await Lead.findByIdAndUpdate(lead._id, {
          emailSent: true,
          whatsappSent: true,
        });

        console.log("All notifications sent successfully for lead:", lead._id);
      } catch (notificationError) {
        console.error("Error sending notifications:", notificationError);
      }
    });

    // Return success response
    res.status(201).json({
      success: true,
      message: "Lead created successfully",
      data: {
        leadId: lead._id,
        budgetInfo,
        projectEstimate: {
          duration: projectEstimate.duration,
          category: budgetInfo.category,
          priority: budgetInfo.priority,
        },
      },
    });
  } catch (error) {
    console.error("Error creating lead:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

// Get all leads (admin only)
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10, status, priority } = req.query;
    const query = {};

    if (status) query.status = status;
    if (priority) {
      // Add priority filtering based on budget
      const budgetRanges = {
        high: { $gte: 100000 },
        medium: { $gte: 10000, $lt: 100000 },
        low: { $lt: 10000 },
      };
      if (budgetRanges[priority]) {
        query.budget = budgetRanges[priority];
      }
    }

    const leads = await Lead.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select("-__v");

    const total = await Lead.countDocuments(query);

    res.json({
      success: true,
      data: {
        leads,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / limit),
          total,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching leads:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

// Get lead by ID
router.get("/:id", async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.json({
      success: true,
      data: lead,
    });
  } catch (error) {
    console.error("Error fetching lead:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

// Update lead status
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = [
      "new",
      "contacted",
      "qualified",
      "proposal_sent",
      "closed_won",
      "closed_lost",
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: new Date() },
      { new: true }
    );

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.json({
      success: true,
      message: "Lead status updated successfully",
      data: lead,
    });
  } catch (error) {
    console.error("Error updating lead status:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

// Send quotation to lead
router.post("/:id/quotation", async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    const { quotationData } = req.body;

    // Send WhatsApp quotation
    await whatsappService.sendQuotationToLead(lead.toObject(), quotationData);

    // Update lead status
    await Lead.findByIdAndUpdate(req.params.id, {
      status: "proposal_sent",
      updatedAt: new Date(),
    });

    res.json({
      success: true,
      message: "Quotation sent successfully",
    });
  } catch (error) {
    console.error("Error sending quotation:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

// Get lead statistics
router.get("/stats/overview", async (req, res) => {
  try {
    const totalLeads = await Lead.countDocuments();
    const newLeads = await Lead.countDocuments({ status: "new" });
    const qualifiedLeads = await Lead.countDocuments({ qualified: true });
    const highPriorityLeads = await Lead.countDocuments({
      budget: { $gte: 100000 },
    });

    const totalBudget = await Lead.aggregate([
      { $group: { _id: null, total: { $sum: "$budget" } } },
    ]);

    const leadsByStatus = await Lead.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const leadsByMonth = await Lead.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": -1, "_id.month": -1 } },
      { $limit: 12 },
    ]);

    res.json({
      success: true,
      data: {
        totalLeads,
        newLeads,
        qualifiedLeads,
        highPriorityLeads,
        totalBudget: totalBudget[0]?.total || 0,
        leadsByStatus,
        leadsByMonth,
      },
    });
  } catch (error) {
    console.error("Error fetching lead statistics:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

module.exports = router;
