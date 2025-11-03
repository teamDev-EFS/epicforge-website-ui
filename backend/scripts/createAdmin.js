require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Default admin credentials
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@epicforgesoftware.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Admin123!";
const ADMIN_NAME = process.env.ADMIN_NAME || "Admin User";

async function createAdminUser() {
  try {
    // Connect to MongoDB
    const mongoURI =
      process.env.MONGODB_URI || "mongodb://localhost:27017/epicforge";

    await mongoose.connect(mongoURI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log("✅ Connected to MongoDB");

    // Check if admin user already exists
    const existingUser = await User.findOne({ email: ADMIN_EMAIL });

    if (existingUser) {
      console.log(`⚠️  Admin user with email ${ADMIN_EMAIL} already exists.`);
      console.log("🔄 Resetting password and updating user status...");
      
      // Hash new password
      const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
      
      // Update existing user with new password and ensure it's active
      existingUser.passwordHash = passwordHash;
      existingUser.status = "active";
      existingUser.role = "admin";
      existingUser.name = ADMIN_NAME;
      await existingUser.save();
      
      console.log("✅ Admin user password reset successfully!");
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("📧 Email:", ADMIN_EMAIL);
      console.log("🔑 Password:", ADMIN_PASSWORD);
      console.log("👤 Name:", ADMIN_NAME);
      console.log("🔐 Role: admin");
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      
      await mongoose.connection.close();
      process.exit(0);
    }

    // Check if any user exists
    const existingCount = await User.countDocuments();
    
    // Hash password
    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);

    // Create admin user
    const user = await User.create({
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      passwordHash: passwordHash,
      role: existingCount === 0 ? "admin" : "admin", // First user is always admin
      status: "active",
    });

    console.log("✅ Admin user created successfully!");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("📧 Email:", ADMIN_EMAIL);
    console.log("🔑 Password:", ADMIN_PASSWORD);
    console.log("👤 Name:", ADMIN_NAME);
    console.log("🔐 Role: admin");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("⚠️  IMPORTANT: Change this password after first login!");

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating admin user:", error.message);
    
    if (error.code === 11000) {
      console.error("User with this email already exists.");
    }
    
    process.exit(1);
  }
}

createAdminUser();

