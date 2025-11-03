EpicForge LeadOps Server

Local dev:

1) cd server
2) npm install
3) npm run dev

Env variables:
- MONGO_URI
- PORT (default 5000)
- JWT_SECRET
- CORS_ORIGINS (comma-separated)
- FRONTEND_URL
- ADMIN_URL
- NOTIFY_EMAILS (comma-separated)
- NOTIFY_WHATSAPPS (comma-separated)
- SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, EMAIL_FROM
- WHATSAPP_PROVIDER=cloud-api|manual
- WHATSAPP_TOKEN, WHATSAPP_PHONE_NUMBER_ID
- CALENDLY_URL
- LEAD_RATE_LIMIT (default 30)

API routes:
- POST /api/leads/capture
- GET /api/settings/public
- POST /api/auth/login
- GET /api/leads
- GET /api/leads/:id
- PUT /api/leads/:id
- GET /api/notifications
- GET /api/settings
- PUT /api/settings

Socket events: lead:new, lead:notify


