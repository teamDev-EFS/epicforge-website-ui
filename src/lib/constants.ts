// WhatsApp Business Configuration
// Primary concierge number (E.164 without +)
export const WHATSAPP_BUSINESS_NUMBER =
  import.meta.env.VITE_WHATSAPP_BUSINESS_NUMBER || "91879300107";

// WhatsApp API base URL
export const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_BUSINESS_NUMBER}`;
