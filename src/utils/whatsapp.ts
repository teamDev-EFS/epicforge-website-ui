/**
 * WhatsApp utility functions for sending form data via WhatsApp
 */

// WhatsApp phone number - Loaded from environment variable for configuration
// Falls back to default if not set in environment
// Note: This is a public business number, so it's safe to have in the frontend
export const WHATSAPP_NUMBER =
  import.meta.env.VITE_WHATSAPP_NUMBER || "919201046787";

/**
 * Format form data into a structured WhatsApp message
 */
export function formatWhatsAppMessage(formData: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  businessType?: string;
  source?: string;
  budget?: string;
  problem?: string;
  projectType?: string;
}): string {
  const message = `*Free Audit Request - EpicForge Software*

*Contact Details:*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*Name:* ${formData.name}
*Email:* ${formData.email}
${formData.phone ? `*Phone:* ${formData.phone}\n` : ""}${
    formData.company ? `*Company:* ${formData.company}\n` : ""
  }

*Project Information:*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${formData.businessType ? `*Business Type:* ${formData.businessType}\n` : ""}${
    formData.source ? `*How did you find us:* ${formData.source}\n` : ""
  }${formData.projectType ? `*Project Type:* ${formData.projectType}\n` : ""}${
    formData.budget ? `*Budget:* ${formData.budget}\n` : ""
  }

*Project Description:*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${formData.problem || "No description provided"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
I'm interested in learning more about your services and would like to schedule a free consultation.

Thank you!`;

  return message;
}

/**
 * Create WhatsApp URL with preformatted message
 */
export function createWhatsAppURL(
  formData: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    businessType?: string;
    source?: string;
    budget?: string;
    problem?: string;
    projectType?: string;
  },
  phoneNumber?: string
): string {
  const message = formatWhatsAppMessage(formData);
  const encodedMessage = encodeURIComponent(message);
  const number = phoneNumber || WHATSAPP_NUMBER;

  // Ensure phone number doesn't have + or spaces
  const cleanNumber = number.replace(/[\s\+\-\(\)]/g, "");

  return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
}

/**
 * Open WhatsApp with form data
 */
export function openWhatsApp(
  formData: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    businessType?: string;
    source?: string;
    budget?: string;
    problem?: string;
    projectType?: string;
  },
  phoneNumber?: string
): void {
  const url = createWhatsAppURL(formData, phoneNumber);
  window.open(url, "_blank");
}

/**
 * Format a personalized message for booking a demo/call
 */
export function formatDemoBookingMessage(): string {
  const message = `*Demo Booking Request - EpicForge Software*

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hello! I'm interested in booking a demo call to learn more about your software development services.

I would like to:
• Schedule a personalized demo
• Understand how EpicForge can help my business
• Discuss my project requirements
• Learn about your development process

Please let me know your available time slots, and I'll be happy to schedule a call at your convenience.

Thank you!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;

  return message;
}

/**
 * Create WhatsApp URL for demo booking
 */
export function createDemoBookingURL(phoneNumber?: string): string {
  const message = formatDemoBookingMessage();
  const encodedMessage = encodeURIComponent(message);
  const number = phoneNumber || WHATSAPP_NUMBER;

  // Ensure phone number doesn't have + or spaces
  const cleanNumber = number.replace(/[\s\+\-\(\)]/g, "");

  return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
}

/**
 * Open WhatsApp for demo booking
 */
export function openDemoBooking(phoneNumber?: string): void {
  const url = createDemoBookingURL(phoneNumber);
  window.open(url, "_blank");
}
