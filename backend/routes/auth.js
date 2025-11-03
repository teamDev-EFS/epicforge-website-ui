const express = require("express");
const router = express.Router();
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/User");

// Auth middleware
function authMiddleware(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.substring(7) : null;
  if (!token) return res.status(401).json({ error: "unauthorized" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "devsecret");
    req.user = decoded;
    return next();
  } catch {
    return res.status(401).json({ error: "invalid_token" });
  }
}

// Login endpoint
router.post("/auth/login", async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  try {
    const { email, password } = await schema.validateAsync(req.body);
    console.log(`[AUTH] Login attempt for email: ${email}`);

    // Normalize email to lowercase for lookup (email is stored lowercase)
    const normalizedEmail = email.toLowerCase().trim();
    image.png;

    // Debug: Check database connection
    const dbName = mongoose.connection.db
      ? mongoose.connection.db.databaseName
      : "unknown";
    console.log(
      `[AUTH] Database: ${dbName}, Collection: ${User.collection.name}`
    );

    // Try to find user with exact email match
    let user = await User.findOne({ email: normalizedEmail, status: "active" });

    // If not found, try without status filter (for debugging)
    if (!user) {
      user = await User.findOne({ email: normalizedEmail });
      if (user) {
        console.log(`[AUTH] Found user but status is: ${user.status}`);
      }
    }

    // If still not found, try case-insensitive regex search
    if (!user) {
      user = await User.findOne({
        email: { $regex: new RegExp(`^${normalizedEmail}$`, "i") },
        status: "active",
      });
    }

    // List all users for debugging if still not found
    if (!user) {
      try {
        const allUsers = await User.find({}).limit(10);
        console.log(
          `[AUTH] User not found. Total users in DB: ${allUsers.length}`
        );
        console.log(`[AUTH] Searching for email: "${normalizedEmail}"`);
        allUsers.forEach((u) => {
          console.log(
            `  - Email: "${u.email}" (type: ${typeof u.email}), Role: ${
              u.role
            }, Status: ${u.status}`
          );
        });
      } catch (dbError) {
        console.error(
          `[AUTH] Database error while listing users: ${dbError.message}`
        );
      }
      return res.status(401).json({ error: "invalid_credentials" });
    }

    console.log(
      `[AUTH] User found: ${user.email}, role: ${user.role}, status: ${user.status}`
    );
    const ok = await bcrypt.compare(password, user.passwordHash);

    if (!ok) {
      console.log(`[AUTH] Password mismatch for user: ${email}`);
      return res.status(401).json({ error: "invalid_credentials" });
    }

    console.log(`[AUTH] Login successful for user: ${email}`);

    user.lastLoginAt = new Date();
    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      process.env.JWT_SECRET || "devsecret",
      { expiresIn: "7d" }
    );

    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        email: user.email,
      },
    });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

// Register endpoint: allows first admin without auth; afterwards only admin can create
router.post("/auth/register", async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid("admin", "staff").default("staff"),
  });

  try {
    const payload = await schema.validateAsync(req.body);
    const existingCount = await User.countDocuments();
    const isDevelopment = process.env.NODE_ENV !== "production";

    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.substring(7) : null;
    let requester = null;

    if (token) {
      try {
        requester = jwt.verify(token, process.env.JWT_SECRET || "devsecret");
      } catch {
        // ignore
      }
    }

    // Check if email already exists
    const existingUser = await User.findOne({
      email: payload.email.toLowerCase().trim(),
    });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // If users exist, check permissions
    if (existingCount > 0) {
      // In development, allow registration if no admin users exist
      if (isDevelopment) {
        const adminCount = await User.countDocuments({
          role: "admin",
          status: "active",
        });
        // Allow registration if no active admins exist (for development only)
        if (adminCount === 0) {
          console.log(
            `[AUTH] No active admins found. Allowing registration as admin (development mode)`
          );
          payload.role = "admin";
        } else if (!requester || requester.role !== "admin") {
          return res.status(403).json({ error: "forbidden" });
        }
      } else {
        // In production, only admin can create users
        if (!requester || requester.role !== "admin") {
          return res.status(403).json({ error: "forbidden" });
        }
      }
    }

    // First user automatically gets admin role
    const role = existingCount === 0 ? "admin" : payload.role;

    const hashed = await bcrypt.hash(payload.password, 10);
    const user = await User.create({
      name: payload.name,
      email: payload.email.toLowerCase().trim(),
      passwordHash: hashed,
      role,
      status: "active",
    });

    console.log(`[AUTH] User registered: ${user.email}, role: ${user.role}`);

    return res.json({
      ok: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (e) {
    console.error(`[AUTH] Registration error: ${e.message}`);
    if (e.code === 11000) {
      // Duplicate email
      return res.status(400).json({ error: "Email already exists" });
    }
    return res.status(400).json({ error: e.message });
  }
});

module.exports = { router, authMiddleware };
