const axios = require("axios");

class WhatsAppService {
  constructor() {
    this.isConfigured = !!(
      process.env.WHATSAPP_ACCESS_TOKEN &&
      process.env.WHATSAPP_PHONE_NUMBER_ID &&
      process.env.WHATSAPP_BUSINESS_ACCOUNT_ID
    );

    if (this.isConfigured) {
      this.accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
      this.phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
      this.businessAccountId = process.env.WHATSAPP_BUSINESS_ACCOUNT_ID;
      this.apiUrl = `https://graph.facebook.com/v18.0/${this.phoneNumberId}/messages`;
    } else {
      console.log(
        "⚠️ WhatsApp service not configured - missing WhatsApp Cloud API credentials"
      );
    }
  }

  async sendLeadNotification(leadData, projectEstimate) {
    if (!this.isConfigured) {
      console.log(
        "⚠️ WhatsApp service not configured - skipping lead notification"
      );
      return { success: false, message: "WhatsApp service not configured" };
    }

    const { formatBudget } = require("../utils/budgetCalculator");
    const budgetInfo = formatBudget(leadData.budget);

    // Generate meeting link
    const meetingLink = "https://calendly.com/team-dev-epicforgesoftware/30min";

    // Format additional services
    const additionalServices = leadData.additionalServices
      ? leadData.additionalServices.join(", ")
      : "None";

    // Format pricing range
    const pricingRange = `${budgetInfo.formatted} - ${budgetInfo.formatted}`;

    try {
      // Send template message to admin
      const response = await axios.post(
        this.apiUrl,
        {
          messaging_product: "whatsapp",
          to: "919876543210", // Admin WhatsApp number
          type: "template",
          template: {
            name: "quotation_alert_admin",
            language: { code: "en" },
            components: [
              {
                type: "body",
                parameters: [
                  { type: "text", text: leadData.name },
                  { type: "text", text: leadData.phone },
                  { type: "text", text: leadData.projectType },
                  {
                    type: "text",
                    text: leadData.pages ? leadData.pages.toString() : "1",
                  },
                  { type: "text", text: additionalServices },
                  { type: "text", text: pricingRange },
                  { type: "text", text: meetingLink },
                ],
              },
            ],
          },
        },
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(
        "WhatsApp template notification sent to admin successfully:",
        response.data
      );
      return true;
    } catch (error) {
      console.error(
        "Error sending WhatsApp template notification:",
        error.response?.data || error.message
      );
      return false;
    }
  }

  async sendConfirmationToLead(leadData, projectEstimate) {
    if (!this.isConfigured) {
      console.log(
        "⚠️ WhatsApp service not configured - skipping lead confirmation"
      );
      return { success: false, message: "WhatsApp service not configured" };
    }

    const { formatBudget } = require("../utils/budgetCalculator");
    const budgetInfo = formatBudget(leadData.budget);

    // Generate meeting link
    const meetingLink = "https://calendly.com/team-dev-epicforgesoftware/30min";

    // Format additional services
    const additionalServices = leadData.additionalServices
      ? leadData.additionalServices.join(", ")
      : "None";

    // Format pricing range
    const pricingRange = `${budgetInfo.formatted} - ${budgetInfo.formatted}`;

    try {
      // Send to lead's WhatsApp if available
      const phoneNumber = leadData.whatsapp || leadData.phone;
      const cleanPhone = phoneNumber.replace(/[^0-9]/g, "");

      const response = await axios.post(
        this.apiUrl,
        {
          messaging_product: "whatsapp",
          to: cleanPhone,
          type: "template",
          template: {
            name: "quotation_request_user",
            language: { code: "en" },
            components: [
              {
                type: "body",
                parameters: [
                  { type: "text", text: leadData.name },
                  { type: "text", text: leadData.projectType },
                  {
                    type: "text",
                    text: leadData.pages ? leadData.pages.toString() : "1",
                  },
                  { type: "text", text: additionalServices },
                  { type: "text", text: pricingRange },
                ],
              },
              {
                type: "button",
                sub_type: "url",
                index: "0",
                parameters: [{ type: "text", text: meetingLink }],
              },
            ],
          },
        },
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(
        "WhatsApp template confirmation sent to lead successfully:",
        response.data
      );
      return true;
    } catch (error) {
      console.error(
        "Error sending WhatsApp template confirmation:",
        error.response?.data || error.message
      );
      return false;
    }
  }

  async sendQuotationToLead(leadData, quotationData) {
    if (!this.isConfigured) {
      console.log("⚠️ WhatsApp service not configured - skipping quotation");
      return { success: false, message: "WhatsApp service not configured" };
    }

    const { formatBudget } = require("../utils/budgetCalculator");
    const budgetInfo = formatBudget(leadData.budget);

    // Generate meeting link
    const meetingLink = "https://calendly.com/team-dev-epicforgesoftware/30min";

    // Format additional services
    const additionalServices = quotationData.services
      ? quotationData.services.join(", ")
      : "Standard Development";

    // Format pricing range
    const pricingRange = `${budgetInfo.formatted} - ${budgetInfo.formatted}`;

    try {
      const phoneNumber = leadData.whatsapp || leadData.phone;
      const cleanPhone = phoneNumber.replace(/[^0-9]/g, "");

      const response = await axios.post(
        this.apiUrl,
        {
          messaging_product: "whatsapp",
          to: cleanPhone,
          type: "template",
          template: {
            name: "quotation_request_user",
            language: { code: "en" },
            components: [
              {
                type: "body",
                parameters: [
                  { type: "text", text: leadData.name },
                  {
                    type: "text",
                    text: quotationData.projectType || leadData.projectType,
                  },
                  {
                    type: "text",
                    text: quotationData.pages
                      ? quotationData.pages.toString()
                      : "1",
                  },
                  { type: "text", text: additionalServices },
                  { type: "text", text: pricingRange },
                ],
              },
              {
                type: "button",
                sub_type: "url",
                index: "0",
                parameters: [{ type: "text", text: meetingLink }],
              },
            ],
          },
        },
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(
        "WhatsApp template quotation sent to lead successfully:",
        response.data
      );
      return true;
    } catch (error) {
      console.error(
        "Error sending WhatsApp template quotation:",
        error.response?.data || error.message
      );
      return false;
    }
  }

  // Helper method to send template messages
  async sendTemplateMessage(to, templateName, parameters, buttonUrl = null) {
    if (!this.isConfigured) {
      console.log(
        "⚠️ WhatsApp service not configured - cannot send template message"
      );
      return { success: false, message: "WhatsApp service not configured" };
    }

    try {
      const cleanPhone = to.replace(/[^0-9]/g, "");

      const templateData = {
        messaging_product: "whatsapp",
        to: cleanPhone,
        type: "template",
        template: {
          name: templateName,
          language: { code: "en" },
          components: [
            {
              type: "body",
              parameters: parameters.map((param) => ({
                type: "text",
                text: param,
              })),
            },
          ],
        },
      };

      // Add button component if URL is provided
      if (buttonUrl) {
        templateData.template.components.push({
          type: "button",
          sub_type: "url",
          index: "0",
          parameters: [{ type: "text", text: buttonUrl }],
        });
      }

      const response = await axios.post(this.apiUrl, templateData, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
      });

      console.log(`✅ Template message sent to ${cleanPhone}:`, response.data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error(
        `❌ Error sending template message to ${to}:`,
        error.response?.data || error.message
      );
      return { success: false, error: error.response?.data || error.message };
    }
  }

  // Fallback method to send simple text messages
  async sendTextMessage(to, message) {
    if (!this.isConfigured) {
      console.log(
        "⚠️ WhatsApp service not configured - cannot send text message"
      );
      return { success: false, message: "WhatsApp service not configured" };
    }

    try {
      const cleanPhone = to.replace(/[^0-9]/g, "");

      const response = await axios.post(
        this.apiUrl,
        {
          messaging_product: "whatsapp",
          to: cleanPhone,
          type: "text",
          text: {
            body: message,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(`✅ Text message sent to ${cleanPhone}:`, response.data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error(
        `❌ Error sending text message to ${to}:`,
        error.response?.data || error.message
      );
      return { success: false, error: error.response?.data || error.message };
    }
  }
}

module.exports = WhatsAppService;
