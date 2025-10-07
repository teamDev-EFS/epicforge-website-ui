const fs = require("fs");
const path = require("path");

console.log("🚀 EpicForge Backend Setup");
console.log("==========================");

// Check if .env file exists
const envPath = path.join(__dirname, ".env");
const envExamplePath = path.join(__dirname, "env.example");

if (fs.existsSync(envPath)) {
  console.log("✅ .env file already exists");
} else {
  console.log("📝 Creating .env file from env.example...");

  try {
    // Copy env.example to .env
    const envExample = fs.readFileSync(envExamplePath, "utf8");
    fs.writeFileSync(envPath, envExample);
    console.log("✅ .env file created successfully");
    console.log("⚠️  Please update the .env file with your actual credentials");
  } catch (error) {
    console.error("❌ Error creating .env file:", error.message);
    process.exit(1);
  }
}

// Display current MongoDB URI
console.log("\n📊 Current MongoDB Configuration:");
console.log("================================");

try {
  const envContent = fs.readFileSync(envPath, "utf8");
  const mongoUriMatch = envContent.match(/MONGODB_URI=(.+)/);

  if (mongoUriMatch) {
    const mongoUri = mongoUriMatch[1];
    if (mongoUri.includes("mongodb+srv://")) {
      console.log("✅ MongoDB Atlas connection configured");
      console.log(`🔗 Connection: ${mongoUri.substring(0, 50)}...`);
    } else {
      console.log("⚠️  Local MongoDB connection configured");
      console.log(`🔗 Connection: ${mongoUri}`);
    }
  } else {
    console.log("❌ MongoDB URI not found in .env file");
  }
} catch (error) {
  console.error("❌ Error reading .env file:", error.message);
}

console.log("\n📋 Next Steps:");
console.log("==============");
console.log("1. Update .env file with your actual credentials");
console.log("2. Install dependencies: npm install");
console.log("3. Initialize database: node scripts/initDatabase.js");
console.log("4. Start server: npm start");
console.log("\n🎉 Setup completed!");
