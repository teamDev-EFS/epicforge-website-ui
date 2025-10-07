# EpicForge Software - Complete Setup Guide

This guide will help you set up the complete EpicForge Software system with automatic budget calculation, email notifications, WhatsApp notifications, and MongoDB storage.

## 🚀 Quick Start

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment file
cp env.example .env

# Update .env with your credentials (see Backend Configuration below)

# Start the backend server
npm run dev
```

### 2. Frontend Setup

```bash
# Navigate to root directory
cd ..

# Install dependencies
npm install

# Copy environment file
cp env.example .env

# Update .env with your API URL
VITE_API_URL=http://localhost:5000

# Start the frontend
npm run dev
```

## 🔧 Backend Configuration

### Required Services

#### 1. MongoDB Database

- **Local**: Install MongoDB locally
- **Cloud**: Use MongoDB Atlas (recommended)

#### 2. Gmail for Email Notifications

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Use this password in your `.env` file

#### 3. Twilio for WhatsApp Notifications

1. Sign up for Twilio account
2. Get your Account SID and Auth Token
3. Set up WhatsApp Sandbox:
   - Go to Console → Messaging → Try it out → Send a WhatsApp message
   - Follow the setup instructions
4. Use the sandbox number in your `.env` file

### Environment Variables

Create `backend/.env` with:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/epicforge

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

## 📱 Frontend Configuration

Create `.env` with:

```env
# Backend API URL
VITE_API_URL=http://localhost:5000
```

## 🎯 Features Overview

### 1. Automatic Budget Calculation

- **Input**: User enters any budget amount
- **Output**: Automatically formatted as K, Lakhs, or Crores
- **Examples**:
  - `₹1,000` → `₹1.0K`
  - `₹50,000` → `₹50.0K`
  - `₹5,00,000` → `₹5.0 Lakhs`
  - `₹1,00,00,000` → `₹1.0 Crores`

### 2. Email Notifications

- **Admin Notification**: Detailed lead information with project estimate
- **Lead Confirmation**: Welcome message with next steps
- **Rich HTML Templates**: Professional email design

### 3. WhatsApp Notifications

- **Admin Alert**: Lead details with quick actions
- **Lead Confirmation**: Project estimate and contact information
- **Quotation**: Detailed project proposal

### 4. Database Storage

- **MongoDB**: All lead data stored securely
- **Indexes**: Optimized for performance
- **Validation**: Input validation and error handling

## 🔄 Form Integration

### ContactPage.tsx

- **Budget Input**: Number input with real-time formatting
- **Validation**: Minimum budget of ₹1,000
- **Backend Integration**: Saves to MongoDB via API

### ContactForm.tsx

- **Same Features**: As ContactPage but in modal format
- **Real-time Feedback**: Shows formatted budget as user types

### QuotationCalculator.tsx

- **WhatsApp Integration**: Opens WhatsApp with pre-filled message
- **Backend Storage**: Also saves to database
- **Cost Calculation**: Dynamic pricing based on selections

## 📊 Lead Management

### Lead Data Structure

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

### Lead Status Flow

1. **New**: Lead created
2. **Contacted**: Initial contact made
3. **Qualified**: Lead qualified for proposal
4. **Proposal Sent**: Quotation sent
5. **Closed Won**: Deal closed successfully
6. **Closed Lost**: Deal lost

## 🚀 Deployment

### Backend Deployment

1. **Environment**: Set production environment variables
2. **Database**: Use MongoDB Atlas for production
3. **Email**: Use production email service
4. **WhatsApp**: Use production Twilio account

### Frontend Deployment

1. **Build**: `npm run build`
2. **Environment**: Set production API URL
3. **Deploy**: Upload to your hosting service

## 🔍 Testing

### Backend Testing

```bash
# Test API endpoints
curl -X POST http://localhost:5000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "9876543210",
    "businessType": "E-commerce",
    "projectType": "Website",
    "budget": 50000,
    "problem": "Need a new website"
  }'
```

### Frontend Testing

1. Fill out any form
2. Check browser console for success messages
3. Verify email notifications
4. Check WhatsApp messages

## 🛠️ Troubleshooting

### Common Issues

#### 1. Email Not Sending

- Check Gmail app password
- Verify SMTP settings
- Check spam folder

#### 2. WhatsApp Not Working

- Verify Twilio credentials
- Check sandbox setup
- Ensure phone number format is correct

#### 3. Database Connection Issues

- Check MongoDB connection string
- Verify database is running
- Check network connectivity

#### 4. Frontend API Errors

- Verify backend is running
- Check CORS settings
- Verify API URL in environment

## 📈 Monitoring

### Backend Health Check

```bash
curl http://localhost:5000/api/health
```

### Lead Statistics

```bash
curl http://localhost:5000/api/leads/stats/overview
```

## 🔐 Security

### Backend Security

- Rate limiting enabled
- CORS protection
- Input validation
- Error handling

### Data Protection

- Secure database connections
- Encrypted email transmission
- Secure API endpoints

## 📞 Support

For technical support:

- **Email**: dev@epicforgesoftware.com
- **WhatsApp**: +91 98765 43210
- **Documentation**: See backend/README.md

## 🎉 Success!

Once everything is set up, you'll have:

- ✅ Automatic budget calculation and formatting
- ✅ Email notifications to admin and leads
- ✅ WhatsApp notifications via Twilio
- ✅ MongoDB storage for all leads
- ✅ Professional lead management system
- ✅ Real-time form validation
- ✅ Multi-language support

Your EpicForge Software system is now ready to capture and manage leads professionally!
