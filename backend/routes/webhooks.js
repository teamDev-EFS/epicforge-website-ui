const express = require("express");
const router = express.Router();

// WhatsApp webhook verification and message handling
router.get("/whatsapp", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  console.log("WhatsApp webhook verification request:", {
    mode,
    token: token ? "present" : "missing",
    challenge: challenge ? "present" : "missing",
  });

  // Check if a token and mode is in the query string of the request
  if (mode && token) {
    // Check the mode and token sent is correct
    if (mode === "subscribe" && token === process.env.VERIFY_TOKEN) {
      // Respond with the challenge token from the request
      console.log("✅ WhatsApp webhook verified successfully");
      res.status(200).send(challenge);
    } else {
      // Respond with '403 Forbidden' if verify tokens do not match
      console.log("❌ WhatsApp webhook verification failed - invalid token");
      res.status(403).json({
        success: false,
        message: "Forbidden - Invalid verify token",
      });
    }
  } else {
    console.log("❌ WhatsApp webhook verification failed - missing parameters");
    res.status(400).json({
      success: false,
      message: "Bad Request - Missing required parameters",
    });
  }
});

// Handle incoming WhatsApp messages
router.post("/whatsapp", (req, res) => {
  console.log(
    "📱 Incoming WhatsApp webhook:",
    JSON.stringify(req.body, null, 2)
  );

  try {
    const body = req.body;

    // Check if this is an event notification
    if (body.object) {
      if (body.object === "whatsapp_business_account") {
        body.entry?.forEach((entry) => {
          entry.changes?.forEach((change) => {
            if (change.field === "messages") {
              const messages = change.value?.messages;
              const statuses = change.value?.statuses;

              // Handle incoming messages
              if (messages) {
                messages.forEach((message) => {
                  handleIncomingMessage(message, change.value);
                });
              }

              // Handle message status updates
              if (statuses) {
                statuses.forEach((status) => {
                  handleMessageStatus(status);
                });
              }
            }
          });
        });
      }
    }

    // Always respond with 200 OK to acknowledge receipt
    res.status(200).json({
      success: true,
      message: "Webhook received successfully",
    });
  } catch (error) {
    console.error("❌ Error processing WhatsApp webhook:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

// Handle incoming WhatsApp messages
function handleIncomingMessage(message, value) {
  console.log("📨 Processing incoming message:", {
    id: message.id,
    from: message.from,
    type: message.type,
    timestamp: message.timestamp,
  });

  const phoneNumber = message.from;
  const messageType = message.type;

  switch (messageType) {
    case "text":
      handleTextMessage(message, phoneNumber, value);
      break;
    case "image":
      handleImageMessage(message, phoneNumber, value);
      break;
    case "document":
      handleDocumentMessage(message, phoneNumber, value);
      break;
    case "button":
      handleButtonMessage(message, phoneNumber, value);
      break;
    default:
      console.log(`📱 Unhandled message type: ${messageType}`);
  }
}

// Handle text messages
function handleTextMessage(message, phoneNumber, value) {
  const text = message.text?.body || "";
  console.log(`💬 Text message from ${phoneNumber}: ${text}`);

  // Simple auto-reply logic
  if (
    text.toLowerCase().includes("hello") ||
    text.toLowerCase().includes("hi")
  ) {
    sendAutoReply(
      phoneNumber,
      "Hello! 👋 Thank you for contacting EpicForge Software. How can we help you today?"
    );
  } else if (
    text.toLowerCase().includes("quote") ||
    text.toLowerCase().includes("quotation")
  ) {
    sendAutoReply(
      phoneNumber,
      "📋 For a detailed quotation, please visit our website: https://epicforgesoftware.com or email us at info@epicforgesoftware.com"
    );
  } else if (
    text.toLowerCase().includes("price") ||
    text.toLowerCase().includes("cost")
  ) {
    sendAutoReply(
      phoneNumber,
      "💰 Our pricing depends on your specific requirements. Please share your project details for a custom quote!"
    );
  } else {
    sendAutoReply(
      phoneNumber,
      "Thank you for your message! Our team will get back to you within 2 hours. For immediate assistance, call us at +91 98765 43210"
    );
  }
}

// Handle image messages
function handleImageMessage(message, phoneNumber, value) {
  console.log(`🖼️ Image message from ${phoneNumber}`);
  sendAutoReply(
    phoneNumber,
    "Thank you for sharing the image! Our team will review it and get back to you soon."
  );
}

// Handle document messages
function handleDocumentMessage(message, phoneNumber, value) {
  console.log(`📄 Document message from ${phoneNumber}`);
  sendAutoReply(
    phoneNumber,
    "Thank you for sharing the document! Our team will review it and get back to you soon."
  );
}

// Handle button messages
function handleButtonMessage(message, phoneNumber, value) {
  const buttonText = message.button?.text || "";
  console.log(`🔘 Button message from ${phoneNumber}: ${buttonText}`);
  sendAutoReply(
    phoneNumber,
    "Thank you for your selection! Our team will process your request and get back to you soon."
  );
}

// Handle message status updates
function handleMessageStatus(status) {
  console.log("📊 Message status update:", {
    id: status.id,
    status: status.status,
    timestamp: status.timestamp,
    recipient_id: status.recipient_id,
  });

  // Log delivery status for monitoring
  if (status.status === "delivered") {
    console.log(`✅ Message ${status.id} delivered to ${status.recipient_id}`);
  } else if (status.status === "read") {
    console.log(`👀 Message ${status.id} read by ${status.recipient_id}`);
  } else if (status.status === "failed") {
    console.log(
      `❌ Message ${status.id} failed to deliver to ${status.recipient_id}`
    );
  }
}

// Send auto-reply message
async function sendAutoReply(phoneNumber, message) {
  try {
    const WhatsAppService = require("../services/whatsappService");
    const whatsappService = new WhatsAppService();

    if (whatsappService.isConfigured) {
      // Try to send as text message first (fallback)
      const result = await whatsappService.sendTextMessage(
        phoneNumber,
        message
      );

      if (result.success) {
        console.log(`✅ Auto-reply sent to ${phoneNumber}`);
      } else {
        console.log(
          `⚠️ Failed to send auto-reply to ${phoneNumber}:`,
          result.error
        );
      }
    } else {
      console.log(
        "⚠️ WhatsApp service not configured - cannot send auto-reply"
      );
    }
  } catch (error) {
    console.error(
      `❌ Error sending auto-reply to ${phoneNumber}:`,
      error.message
    );
  }
}

module.exports = router;
