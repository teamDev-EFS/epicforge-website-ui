const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { Server: SocketIOServer } = require("socket.io");
require("dotenv").config({ path: "./.env" });

// Environment variables loaded
console.log("Environment:", process.env.NODE_ENV || "development");
console.log(
  "MongoDB:",
  process.env.MONGODB_URI ? "Connected" : "Not configured"
);
console.log(
  "WhatsApp:",
  process.env.WHATSAPP_ACCESS_TOKEN ? "Configured" : "Not configured"
);
require("dotenv").config({ path: "./.env" });

// Environment variables loaded
console.log("Environment:", process.env.NODE_ENV || "development");
console.log(
  "MongoDB:",
  process.env.MONGODB_URI ? "Connected" : "Not configured"
);
console.log(
  "WhatsApp:",
  process.env.WHATSAPP_ACCESS_TOKEN ? "Configured" : "Not configured"
);

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

// Allowed origins for CORS and Socket.IO
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://epicforgesoftware.com",
  "https://www.epicforgesoftware.com",
  "https://epicforge-website-ui.netlify.app",
  process.env.FRONTEND_URL,
].filter(Boolean);

const io = new SocketIOServer(server, {
  cors: {
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps)
      if (!origin) return callback(null, true);

      // ALWAYS allow localhost origins (for development)
      if (origin.includes("localhost") || origin.includes("127.0.0.1")) {
        return callback(null, true);
      }

      // In development, allow all origins
      if (process.env.NODE_ENV !== "production") {
        return callback(null, true);
      }

      // Production: only allow specific origins
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST"],
  },
});

// Store io instance in app for use in routes
app.set("io", io);

// Socket.IO connection handler
io.on("connection", (socket) => {
  console.log("🔌 Client connected:", socket.id);
  socket.emit("connected", { timestamp: Date.now() });

  socket.on("disconnect", () => {
    console.log("🔌 Client disconnected:", socket.id);
  });
});

// CORS configuration - MUST come first before other middleware
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      return callback(null, true);
    }

    // ALWAYS allow localhost origins (for development)
    if (origin.includes("localhost") || origin.includes("127.0.0.1")) {
      return callback(null, true);
    }

    // Check if we're in production mode
    const isProduction = process.env.NODE_ENV === "production";

    // In development (not production), allow all origins
    if (!isProduction) {
      return callback(null, true);
    }

    // Production: only allow specific origins
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.error(`[CORS] Blocked origin in production: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin",
    "Access-Control-Request-Method",
    "Access-Control-Request-Headers",
  ],
  exposedHeaders: ["Content-Range", "X-Content-Range"],
  maxAge: 86400, // 24 hours - cache preflight for 24 hours
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests explicitly
app.options("*", cors(corsOptions));

// Security middleware
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
  // Skip rate limiting for OPTIONS requests (preflight)
  skip: (req) => req.method === "OPTIONS",
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Database connection
const connectDB = async () => {
  try {
    const mongoURI =
      process.env.MONGODB_URI || "mongodb://localhost:27017/epicforge";

    await mongoose.connect(mongoURI, {
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });

    console.log("✅ Connected to MongoDB Atlas");
    console.log(`📊 Database: ${mongoose.connection.name}`);
    console.log(`🌐 Host: ${mongoose.connection.host}`);

    // Handle connection events
    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("⚠️ MongoDB disconnected");
    });

    mongoose.connection.on("reconnected", () => {
      console.log("🔄 MongoDB reconnected");
    });
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

// Connect to database
connectDB();

// Routes
app.use("/api/leads", require("./routes/leads"));
app.use("/api/quote", require("./routes/quote"));
app.use("/api/audit", require("./routes/audit"));
app.use("/webhooks", require("./routes/webhooks"));
app.use("/api/analytics", require("./routes/analytics"));

// Admin Auth Routes
const { router: authRouter } = require("./routes/auth");
app.use("/api", authRouter);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "EpicForge Backend API is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  // Handle CORS errors specifically
  if (err.message === "Not allowed by CORS") {
    console.warn(`[CORS] Blocked origin: ${req.headers.origin || "unknown"}`);
    return res.status(403).json({
      success: false,
      message: "CORS error: Origin not allowed",
      error:
        process.env.NODE_ENV === "production"
          ? "Origin not allowed"
          : `Origin ${req.headers.origin || "unknown"} is not allowed`,
    });
  }

  console.error("Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
    error:
      process.env.NODE_ENV === "production"
        ? "Something went wrong"
        : err.message,
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found",
  });
});

// Start server with Socket.IO
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔌 Socket.IO enabled for real-time notifications`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  mongoose.connection.close(() => {
    console.log("MongoDB connection closed");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  console.log("SIGINT received, shutting down gracefully");
  mongoose.connection.close(() => {
    console.log("MongoDB connection closed");
    process.exit(0);
  });
});
