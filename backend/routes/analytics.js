const express = require("express");
const router = express.Router();
const Analytics = require("../models/Analytics");
const { authMiddleware } = require("./auth");

// Track analytics event (public - no auth required)
router.post("/track", async (req, res) => {
  try {
    const { type, sessionId, metadata } = req.body;
    const allowedTypes = ["visitor", "footfall", "cookie", "audit_request", "whatsapp_click"];

    if (!allowedTypes.includes(type)) {
      return res.status(400).json({ error: "Invalid analytics type" });
    }

    const analytics = await Analytics.create({
      type,
      date: new Date(),
      userAgent: req.headers["user-agent"],
      ip: req.ip || req.connection.remoteAddress,
      referer: req.headers.referer,
      path: req.headers["x-path"] || req.body.path,
      sessionId: sessionId || req.body.sessionId,
      metadata: metadata || {},
    });

    return res.json({ ok: true, id: analytics._id });
  } catch (error) {
    console.error("Analytics tracking error:", error);
    return res.status(500).json({ error: error.message });
  }
});

// Get dashboard metrics (admin only)
router.get("/metrics", authMiddleware, async (req, res) => {
  try {
    const { days = 30 } = req.query;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));

    // Get counts by type
    const counts = await Analytics.aggregate([
      {
        $match: {
          date: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 },
        },
      },
    ]);

    // Get daily visitors (last 30 days)
    const dailyVisitors = await Analytics.aggregate([
      {
        $match: {
          type: "visitor",
          date: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
            day: { $dayOfMonth: "$date" },
          },
          count: { $sum: 1 },
          unique: { $addToSet: "$sessionId" },
        },
      },
      {
        $project: {
          date: {
            $dateFromParts: {
              year: "$_id.year",
              month: "$_id.month",
              day: "$_id.day",
            },
          },
          count: 1,
          uniqueCount: { $size: "$unique" },
        },
      },
      {
        $sort: { date: 1 },
      },
    ]);

    // Get daily footfalls
    const dailyFootfalls = await Analytics.aggregate([
      {
        $match: {
          type: "footfall",
          date: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
            day: { $dayOfMonth: "$date" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          date: {
            $dateFromParts: {
              year: "$_id.year",
              month: "$_id.month",
              day: "$_id.day",
            },
          },
          count: 1,
        },
      },
      {
        $sort: { date: 1 },
      },
    ]);

    // Get cookies collected
    const cookiesCount = await Analytics.countDocuments({
      type: "cookie",
      date: { $gte: startDate },
    });

    // Get audit requests
    const auditRequests = await Analytics.countDocuments({
      type: "audit_request",
      date: { $gte: startDate },
    });

    // Get WhatsApp clicks
    const whatsappClicks = await Analytics.countDocuments({
      type: "whatsapp_click",
      date: { $gte: startDate },
    });

    // Format counts
    const metrics = {
      totalVisitors: 0,
      totalFootfalls: 0,
      totalCookies: cookiesCount,
      totalAuditRequests: auditRequests,
      totalWhatsAppClicks: whatsappClicks,
    };

    counts.forEach((item) => {
      if (item._id === "visitor") metrics.totalVisitors = item.count;
      if (item._id === "footfall") metrics.totalFootfalls = item.count;
    });

    return res.json({
      ...metrics,
      dailyVisitors,
      dailyFootfalls,
      lastDays: parseInt(days),
    });
  } catch (error) {
    console.error("Error fetching metrics:", error);
    return res.status(500).json({ error: error.message });
  }
});

// Get recent activity (admin only)
router.get("/activity", authMiddleware, async (req, res) => {
  try {
    const { limit = 50 } = req.query;

    const activities = await Analytics.find()
      .sort({ date: -1 })
      .limit(parseInt(limit))
      .select("type date path metadata sessionId")
      .lean();

    return res.json({ activities });
  } catch (error) {
    console.error("Error fetching activity:", error);
    return res.status(500).json({ error: error.message });
  }
});

// Delete activity/notification (admin only)
router.delete("/activity/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Analytics.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: "Notification not found" });
    }

    return res.json({ success: true, message: "Notification deleted successfully" });
  } catch (error) {
    console.error("Error deleting notification:", error);
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;

