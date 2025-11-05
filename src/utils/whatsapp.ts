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
