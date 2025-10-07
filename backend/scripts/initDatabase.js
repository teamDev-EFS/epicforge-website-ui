const mongoose = require("mongoose");
require("dotenv").config();

// Import models
const Lead = require("../models/Lead");

const initDatabase = async () => {
  try {
    console.log("🚀 Initializing EpicForge Database...");

    // Connect to MongoDB
    const mongoURI =
      process.env.MONGODB_URI || "mongodb://localhost:27017/epicforge";

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB Atlas");

    // Create collections and indexes
    console.log("📊 Setting up collections and indexes...");

    // Create Lead collection indexes
    await Lead.createIndexes();
    console.log("✅ Lead collection indexes created");

    // Create additional collections if needed
    const db = mongoose.connection.db;

    // Create analytics collection
    await db.createCollection("analytics", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["event", "timestamp"],
          properties: {
            event: {
              bsonType: "string",
              description: "Event type must be a string and is required",
            },
            timestamp: {
              bsonType: "date",
              description: "Timestamp must be a date and is required",
            },
            userId: {
              bsonType: "string",
              description: "User ID must be a string",
            },
            sessionId: {
              bsonType: "string",
              description: "Session ID must be a string",
            },
            metadata: {
              bsonType: "object",
              description: "Additional metadata",
            },
          },
        },
      },
    });
    console.log("✅ Analytics collection created");

    // Create contacts collection
    await db.createCollection("contacts", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["name", "email"],
          properties: {
            name: {
              bsonType: "string",
              description: "Name must be a string and is required",
            },
            email: {
              bsonType: "string",
              pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
              description:
                "Email must be a valid email address and is required",
            },
            phone: {
              bsonType: "string",
              description: "Phone must be a string",
            },
            company: {
              bsonType: "string",
              description: "Company must be a string",
            },
            message: {
              bsonType: "string",
              description: "Message must be a string",
            },
            source: {
              bsonType: "string",
              description: "Source must be a string",
            },
            createdAt: {
              bsonType: "date",
              description: "Created date must be a date",
            },
          },
        },
      },
    });
    console.log("✅ Contacts collection created");

    // Create projects collection
    await db.createCollection("projects", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["title", "clientId"],
          properties: {
            title: {
              bsonType: "string",
              description: "Project title must be a string and is required",
            },
            clientId: {
              bsonType: "objectId",
              description: "Client ID must be an ObjectId and is required",
            },
            description: {
              bsonType: "string",
              description: "Description must be a string",
            },
            status: {
              bsonType: "string",
              enum: [
                "planning",
                "development",
                "testing",
                "deployed",
                "maintenance",
              ],
              description: "Status must be one of the enum values",
            },
            budget: {
              bsonType: "number",
              description: "Budget must be a number",
            },
            startDate: {
              bsonType: "date",
              description: "Start date must be a date",
            },
            endDate: {
              bsonType: "date",
              description: "End date must be a date",
            },
            technologies: {
              bsonType: "array",
              description: "Technologies must be an array",
            },
            createdAt: {
              bsonType: "date",
              description: "Created date must be a date",
            },
          },
        },
      },
    });
    console.log("✅ Projects collection created");

    // Create indexes for new collections
    await db.collection("analytics").createIndex({ timestamp: -1 });
    await db.collection("analytics").createIndex({ event: 1 });
    await db.collection("analytics").createIndex({ userId: 1 });

    await db.collection("contacts").createIndex({ email: 1 }, { unique: true });
    await db.collection("contacts").createIndex({ createdAt: -1 });
    await db.collection("contacts").createIndex({ source: 1 });

    await db.collection("projects").createIndex({ clientId: 1 });
    await db.collection("projects").createIndex({ status: 1 });
    await db.collection("projects").createIndex({ createdAt: -1 });

    console.log("✅ All indexes created successfully");

    // Insert sample data (optional)
    console.log("📝 Checking for sample data...");

    const leadCount = await Lead.countDocuments();
    if (leadCount === 0) {
      console.log("📊 No leads found, database is ready for new data");
    } else {
      console.log(`📊 Found ${leadCount} existing leads`);
    }

    console.log("🎉 Database initialization completed successfully!");
    console.log("📋 Collections created:");
    console.log("   - leads (with indexes)");
    console.log("   - analytics (with indexes)");
    console.log("   - contacts (with indexes)");
    console.log("   - projects (with indexes)");
  } catch (error) {
    console.error("❌ Database initialization error:", error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 Database connection closed");
  }
};

// Run initialization
initDatabase();
