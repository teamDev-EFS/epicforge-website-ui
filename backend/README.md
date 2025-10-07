# EpicForge Software Backend API

A comprehensive backend system for EpicForge Software that handles lead management, automatic budget calculation, email notifications, WhatsApp notifications, and MongoDB storage.

## Features

- 🚀 **Lead Management**: Complete CRUD operations for leads
- 💰 **Budget Calculation**: Automatic formatting (K, Lakhs, Crores)
- 📧 **Email Notifications**: Admin notifications and lead confirmations
- 💬 **WhatsApp Integration**: Automated WhatsApp messages via Twilio
- 🗄️ **MongoDB Storage**: Persistent data storage with Mongoose
- 🔒 **Security**: Rate limiting, CORS, input validation
- 📊 **Analytics**: Lead statistics and reporting

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Twilio account for WhatsApp
- Gmail account for email notifications

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   ```bash
   # Run the setup script to create .env file
   npm run setup

   # Or manually copy
   cp env.example .env
   ```

4. **Initialize Database**

   ```bash
   # Create collections and indexes in MongoDB Atlas
   npm run init-db
   ```

   Update the `.env` file with your credentials:

   ```env
   # Database
   MONGODB_URI=mongodb+srv://teamdev_user:6FYaILjp4Ss5cLVe@epicforge.e5c5nf6.mongodb.net/?retryWrites=true&w=majority&appName=Epicforge

   # Email Configuration
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password

   # Twilio WhatsApp Configuration
   TWILIO_ACCOUNT_SID=your-twilio-account-sid
   TWILIO_AUTH_TOKEN=your-twilio-auth-token
   TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886

   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # Admin Email for Notifications
   ADMIN_EMAIL=admin@epicforgesoftware.com
   ```

5. **Start the server**

   ```bash
   # Development
   npm run dev

   # Production
   npm start
   ```

## API Endpoints

### Leads

- `POST /api/leads` - Create new lead
- `GET /api/leads` - Get all leads (with pagination)
- `GET /api/leads/:id` - Get lead by ID
- `PATCH /api/leads/:id/status` - Update lead status
- `POST /api/leads/:id/quotation` - Send quotation to lead
- `GET /api/leads/stats/overview` - Get lead statistics

### Health Check

- `GET /api/health` - Server health status

## Lead Data Structure

```javascript
{
  name: String,
  email: String,
  phone: String,
  whatsapp: String (optional),
  company: String (optional),
  businessType: String,
  projectType: String,
  budget: Number,
  budgetFormatted: String,
  problem: String,
  source: String,
  language: String,
  status: String,
  qualified: Boolean,
  emailSent: Boolean,
  whatsappSent: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## Budget Calculation

The system automatically formats budget amounts:

- `₹1,000` → `₹1.0K`
- `₹50,000` → `₹50.0K`
- `₹5,00,000` → `₹5.0 Lakhs`
- `₹1,00,00,000` → `₹1.0 Crores`

## Notifications

### Email Notifications

- **Admin Notification**: Detailed lead information with project estimate
- **Lead Confirmation**: Welcome message with next steps

### WhatsApp Notifications

- **Admin Alert**: Lead details with quick actions
- **Lead Confirmation**: Project estimate and contact information
- **Quotation**: Detailed project proposal

## Project Estimation

Based on budget amount, the system provides:

- **Duration**: Estimated project timeline
- **Features**: Expected deliverables
- **Services**: Recommended service packages
- **Priority**: Lead priority level

## Security Features

- Rate limiting (100 requests per 15 minutes)
- CORS protection
- Input validation with Joi
- Helmet security headers
- Error handling and logging

## Database Indexes

Optimized for performance:

- Email index
- Phone index
- Created date index
- Status index

## Error Handling

Comprehensive error handling with:

- Validation errors
- Database errors
- Email/WhatsApp delivery errors
- Graceful fallbacks

## Monitoring

- Health check endpoint
- Request logging
- Error tracking
- Performance metrics

## Deployment

### Environment Variables

Set the following environment variables in production:

```env
NODE_ENV=production
MONGODB_URI=your-production-mongodb-uri
EMAIL_USER=your-production-email
EMAIL_PASS=your-production-email-password
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
ADMIN_EMAIL=admin@epicforgesoftware.com
```

### Docker Support

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is proprietary to EpicForge Software.

## Support

For technical support, contact:

- Email: dev@epicforgesoftware.com
- WhatsApp: +91 98765 43210
