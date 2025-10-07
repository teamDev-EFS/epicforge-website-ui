const twilio = require("twilio");

class WhatsAppService {
  constructor() {
    this.isConfigured = !!(
      process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN
    );

    if (this.isConfigured) {
      this.client = twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
      );
      this.fromNumber = process.env.TWILIO_WHATSAPP_NUMBER;
    } else {
      console.log(
        "⚠️ WhatsApp service not configured - missing Twilio credentials"
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

    const message = `🚀 *NEW LEAD ALERT!*

*Contact Details:*
👤 Name: ${leadData.name}
📧 Email: ${leadData.email}
📱 Phone: ${leadData.phone}
${leadData.whatsapp ? `💬 WhatsApp: ${leadData.whatsapp}` : ""}
${leadData.company ? `🏢 Company: ${leadData.company}` : ""}

*Project Details:*
💰 Budget: ${budgetInfo.formatted} (${budgetInfo.category.toUpperCase()})
🏢 Business: ${leadData.businessType}
📋 Project: ${leadData.projectType}
🌐 Source: ${leadData.source}

*Project Estimate:*
⏱️ Duration: ${projectEstimate.duration}
🎯 Priority: ${budgetInfo.priority.toUpperCase()}

*Project Description:*
${leadData.problem}

*Next Steps:*
1. Contact within 2 hours
2. Schedule discovery call
3. Send detailed proposal

*Quick Actions:*
📧 Reply: mailto:${leadData.email}
💬 WhatsApp: https://wa.me/${leadData.phone.replace(/[^0-9]/g, "")}
📅 Calendar: https://calendly.com/team-dev-epicforgesoftware/30min

---
EpicForge Software Lead Management System`;

    try {
      // Send to admin WhatsApp
      await this.client.messages.create({
        body: message,
        from: this.fromNumber,
        to: `whatsapp:+919876543210`, // Admin WhatsApp number
      });

      console.log("WhatsApp notification sent to admin successfully");
      return true;
    } catch (error) {
      console.error("Error sending WhatsApp notification:", error);
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

    const message = `🎉 *Thank You for Choosing EpicForge Software!*

Dear ${leadData.name},

Thank you for your interest in our services! We've received your project inquiry and are excited to help you transform your business.

*Your Project Details:*
💰 Budget: ${budgetInfo.formatted}
🏢 Business Type: ${leadData.businessType}
📋 Project Type: ${leadData.projectType}

*Preliminary Estimate:*
⏱️ Duration: ${projectEstimate.duration}
🎯 Category: ${budgetInfo.category.toUpperCase()}

*What's Next?*
1. Our team will contact you within 2 hours
2. We'll schedule a FREE discovery call
3. You'll receive a detailed project proposal
4. We'll start building your dream project!

*Quick Connect:*
📅 Schedule Free Call: https://calendly.com/team-dev-epicforgesoftware/30min
💬 WhatsApp: https://wa.me/919876543210
📧 Email: info@epicforgesoftware.com

*Our Services:*
✅ Custom Software Development
✅ AI & Machine Learning Solutions
✅ Blockchain Development
✅ Mobile App Development
✅ Web Applications & Portals
✅ CRM & Enterprise Tools

We're committed to delivering exceptional results for your ${
      budgetInfo.formatted
    } project!

Best regards,
The EpicForge Software Team
🚀 Building the Future of Technology`;

    try {
      // Send to lead's WhatsApp if available
      const phoneNumber = leadData.whatsapp || leadData.phone;
      const cleanPhone = phoneNumber.replace(/[^0-9]/g, "");

      await this.client.messages.create({
        body: message,
        from: this.fromNumber,
        to: `whatsapp:+${cleanPhone}`,
      });

      console.log("WhatsApp confirmation sent to lead successfully");
      return true;
    } catch (error) {
      console.error("Error sending WhatsApp confirmation:", error);
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

    const message = `📋 *Your Custom Quotation is Ready!*

Dear ${leadData.name},

Based on your requirements, here's your personalized quotation:

*Project Overview:*
💰 Budget: ${budgetInfo.formatted}
📋 Project: ${quotationData.projectType}
⏱️ Timeline: ${quotationData.timeline}

*Included Services:*
${quotationData.services.map((service) => `✅ ${service}`).join("\n")}

*Key Features:*
${quotationData.features.map((feature) => `🎯 ${feature}`).join("\n")}

*Investment Breakdown:*
${quotationData.breakdown.map((item) => `• ${item}`).join("\n")}

*Total Investment: ${budgetInfo.formatted}*

*What's Included:*
✅ Complete Development
✅ UI/UX Design
✅ Testing & Quality Assurance
✅ Deployment & Setup
✅ ${quotationData.support} Support
✅ Source Code Delivery

*Next Steps:*
1. Review the quotation
2. Schedule a call to discuss
3. Sign the agreement
4. Project kickoff!

*Ready to Start?*
📅 Book a Call: https://calendly.com/team-dev-epicforgesoftware/30min
💬 WhatsApp: https://wa.me/919876543210
📧 Email: info@epicforgesoftware.com

*Why Choose EpicForge?*
🚀 7+ Years Experience
🏆 100+ Successful Projects
💎 Enterprise-Grade Solutions
🛡️ 100% Data Security
⚡ Fast Delivery
🎯 Client-First Approach

We're excited to work with you on this ${budgetInfo.formatted} project!

Best regards,
The EpicForge Software Team
📧 info@epicforgesoftware.com
📱 +91 98765 43210`;

    try {
      const phoneNumber = leadData.whatsapp || leadData.phone;
      const cleanPhone = phoneNumber.replace(/[^0-9]/g, "");

      await this.client.messages.create({
        body: message,
        from: this.fromNumber,
        to: `whatsapp:+${cleanPhone}`,
      });

      console.log("WhatsApp quotation sent to lead successfully");
      return true;
    } catch (error) {
      console.error("Error sending WhatsApp quotation:", error);
      return false;
    }
  }
}

module.exports = WhatsAppService;
