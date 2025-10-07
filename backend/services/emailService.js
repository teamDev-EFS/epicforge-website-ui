const nodemailer = require("nodemailer");

class EmailService {
  constructor() {
    this.isConfigured = !!(
      process.env.EMAIL_HOST &&
      process.env.EMAIL_USER &&
      process.env.EMAIL_PASS
    );

    if (this.isConfigured) {
      this.transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
    } else {
      console.log(
        "⚠️ Email service not configured - missing email credentials"
      );
    }
  }

  async sendLeadNotification(leadData, projectEstimate) {
    if (!this.isConfigured) {
      console.log(
        "⚠️ Email service not configured - skipping lead notification"
      );
      return { success: false, message: "Email service not configured" };
    }

    const { formatBudget } = require("../utils/budgetCalculator");
    const budgetInfo = formatBudget(leadData.budget);

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .info-box { background: white; padding: 20px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #667eea; }
          .budget-highlight { background: #e8f5e8; border-left-color: #4caf50; }
          .priority-high { border-left-color: #f44336; }
          .priority-medium { border-left-color: #ff9800; }
          .priority-low { border-left-color: #4caf50; }
          .btn { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 10px 5px; }
          .features { list-style: none; padding: 0; }
          .features li { padding: 5px 0; border-bottom: 1px solid #eee; }
          .features li:before { content: "✓ "; color: #4caf50; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🚀 New Lead Received!</h1>
            <p>EpicForge Software - Lead Management System</p>
          </div>
          
          <div class="content">
            <div class="info-box budget-highlight">
              <h3>💰 Budget Information</h3>
              <p><strong>Amount:</strong> ${budgetInfo.formatted}</p>
              <p><strong>Category:</strong> ${budgetInfo.category.toUpperCase()}</p>
              <p><strong>Priority:</strong> ${budgetInfo.priority.toUpperCase()}</p>
            </div>

            <div class="info-box">
              <h3>👤 Contact Information</h3>
              <p><strong>Name:</strong> ${leadData.name}</p>
              <p><strong>Email:</strong> ${leadData.email}</p>
              <p><strong>Phone:</strong> ${leadData.phone}</p>
              ${
                leadData.whatsapp
                  ? `<p><strong>WhatsApp:</strong> ${leadData.whatsapp}</p>`
                  : ""
              }
              ${
                leadData.company
                  ? `<p><strong>Company:</strong> ${leadData.company}</p>`
                  : ""
              }
            </div>

            <div class="info-box">
              <h3>🏢 Business Information</h3>
              <p><strong>Business Type:</strong> ${leadData.businessType}</p>
              <p><strong>Project Type:</strong> ${leadData.projectType}</p>
              <p><strong>Source:</strong> ${leadData.source}</p>
              <p><strong>Language:</strong> ${leadData.language}</p>
            </div>

            <div class="info-box">
              <h3>📝 Project Description</h3>
              <p>${leadData.problem}</p>
            </div>

            <div class="info-box">
              <h3>📊 Project Estimate</h3>
              <p><strong>Estimated Duration:</strong> ${
                projectEstimate.duration
              }</p>
              <p><strong>Recommended Services:</strong></p>
              <ul class="features">
                ${projectEstimate.services
                  .map((service) => `<li>${service}</li>`)
                  .join("")}
              </ul>
            </div>

            <div class="info-box">
              <h3>🎯 Next Steps</h3>
              <p>1. Contact the lead within 2 hours</p>
              <p>2. Schedule a discovery call</p>
              <p>3. Send detailed proposal</p>
              <p>4. Follow up via WhatsApp</p>
            </div>

            <div style="text-align: center; margin-top: 30px;">
              <a href="mailto:${
                leadData.email
              }" class="btn">📧 Reply to Lead</a>
              <a href="https://wa.me/${leadData.phone.replace(
                /[^0-9]/g,
                ""
              )}" class="btn">💬 WhatsApp</a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `🚀 New ${budgetInfo.category.toUpperCase()} Lead: ${
        leadData.name
      } - ${budgetInfo.formatted}`,
      html: htmlContent,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log("Lead notification email sent successfully");
      return true;
    } catch (error) {
      console.error("Error sending email:", error);
      return false;
    }
  }

  async sendConfirmationToLead(leadData, projectEstimate) {
    if (!this.isConfigured) {
      console.log(
        "⚠️ Email service not configured - skipping lead confirmation"
      );
      return { success: false, message: "Email service not configured" };
    }

    const { formatBudget } = require("../utils/budgetCalculator");
    const budgetInfo = formatBudget(leadData.budget);

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .info-box { background: white; padding: 20px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #667eea; }
          .budget-highlight { background: #e8f5e8; border-left-color: #4caf50; }
          .btn { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 10px 5px; }
          .features { list-style: none; padding: 0; }
          .features li { padding: 5px 0; border-bottom: 1px solid #eee; }
          .features li:before { content: "✓ "; color: #4caf50; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Thank You for Your Interest!</h1>
            <p>EpicForge Software - Your Project Estimate</p>
          </div>
          
          <div class="content">
            <p>Dear ${leadData.name},</p>
            
            <p>Thank you for reaching out to EpicForge Software! We've received your project inquiry and are excited to help you transform your business with cutting-edge technology.</p>

            <div class="info-box budget-highlight">
              <h3>💰 Your Project Budget</h3>
              <p><strong>Amount:</strong> ${budgetInfo.formatted}</p>
              <p><strong>Project Category:</strong> ${budgetInfo.category.toUpperCase()}</p>
            </div>

            <div class="info-box">
              <h3>📊 Preliminary Project Estimate</h3>
              <p><strong>Estimated Duration:</strong> ${
                projectEstimate.duration
              }</p>
              <p><strong>What you can expect:</strong></p>
              <ul class="features">
                ${projectEstimate.features
                  .map((feature) => `<li>${feature}</li>`)
                  .join("")}
              </ul>
            </div>

            <div class="info-box">
              <h3>🚀 Next Steps</h3>
              <p>1. Our team will contact you within 2 hours</p>
              <p>2. We'll schedule a free discovery call</p>
              <p>3. You'll receive a detailed project proposal</p>
              <p>4. We'll start building your dream project!</p>
            </div>

            <div style="text-align: center; margin-top: 30px;">
              <a href="https://calendly.com/team-dev-epicforgesoftware/30min" class="btn">📅 Schedule Free Call</a>
              <a href="https://wa.me/919876543210" class="btn">💬 WhatsApp Us</a>
            </div>

            <p style="margin-top: 30px; font-size: 14px; color: #666;">
              Best regards,<br>
              The EpicForge Software Team<br>
              📧 info@epicforgesoftware.com<br>
              📱 +91 98765 43210
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: leadData.email,
      subject: `🎉 Your Project Estimate - ${budgetInfo.formatted} | EpicForge Software`,
      html: htmlContent,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log("Confirmation email sent to lead successfully");
      return true;
    } catch (error) {
      console.error("Error sending confirmation email:", error);
      return false;
    }
  }
}

module.exports = EmailService;
