require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const ADMIN_EMAIL = "admin@epicforgesoftware.com";
const ADMIN_PASSWORD = "Admin123!";

async function checkUser() {
  try {
    const mongoURI =
      process.env.MONGODB_URI || "mongodb://localhost:27017/epicforge";

    await mongoose.connect(mongoURI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log("✅ Connected to MongoDB");

    // Find user with case-insensitive email
    const user = await User.findOne({ 
      email: { $regex: new RegExp(`^${ADMIN_EMAIL}$`, "i") } 
    });

    if (!user) {
      console.log("❌ User not found in database");
      
      // List all users
      const allUsers = await User.find({});
      console.log(`\nTotal users in database: ${allUsers.length}`);
      allUsers.forEach(u => {
        console.log(`  - Email: ${u.email}, Role: ${u.role}, Status: ${u.status}`);
      });
      
      process.exit(1);
    }

    console.log("✅ User found:");
    console.log("   Email:", user.email);
    console.log("   Name:", user.name);
    console.log("   Role:", user.role);
    console.log("   Status:", user.status);
    console.log("   Created:", user.createdAt);
    
    // Test password
    const passwordMatch = await bcrypt.compare(ADMIN_PASSWORD, user.passwordHash);
    console.log("\n🔑 Password test:");
    console.log("   Expected password:", ADMIN_PASSWORD);
    console.log("   Password matches:", passwordMatch ? "✅ YES" : "❌ NO");
    
    if (!passwordMatch) {
      console.log("\n⚠️  Password doesn't match. Resetting password...");
      const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
      user.passwordHash = passwordHash;
      user.status = "active";
      await user.save();
      console.log("✅ Password reset successfully!");
    }

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

checkUser();

