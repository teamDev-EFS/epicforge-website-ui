# EpicForge Software - Deployment Checklist

## Pre-Deployment Checklist

### ✅ Frontend (Netlify) - READY

- [x] `netlify.toml` configuration file created
- [x] Environment variables configured
- [x] Production build tested successfully
- [x] Build command: `npm run build`
- [x] Publish directory: `dist`
- [x] Node version: 18
- [x] Redirects configured for SPA
- [x] Security headers configured
- [x] Cache headers for assets

### ✅ Backend (Render) - READY

- [x] `render.yaml` configuration file created
- [x] Production start script configured
- [x] Environment variables documented
- [x] CORS configured for production domains
- [x] Security middleware (Helmet) configured
- [x] Rate limiting configured
- [x] Error handling configured
- [x] Graceful shutdown configured

### ✅ Environment Variables - READY

- [x] Frontend: `VITE_API_BASE_URL` configured
- [x] Backend: All production variables documented
- [x] CORS: Frontend URL included
- [x] Database: MongoDB Atlas ready
- [x] Email: SMTP configuration ready
- [x] WhatsApp: Twilio configuration ready

## Deployment Steps

### 1. Backend Deployment (Render)

1. Go to [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect GitHub repository
4. Configure service:
   - Name: `epicforge-backend`
   - Environment: `Node`
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
5. Set all environment variables from DEPLOYMENT.md
6. Deploy and note the URL

### 2. Frontend Deployment (Netlify)

1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Connect GitHub repository
4. Configure build settings:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
   - Node Version: `18`
5. Set environment variables:
   - `VITE_API_BASE_URL`: Your Render backend URL + `/api`
6. Deploy

### 3. Post-Deployment Testing

- [ ] Test backend health endpoint
- [ ] Test frontend loads correctly
- [ ] Test contact form submission
- [ ] Test quotation calculator
- [ ] Test WhatsApp integration
- [ ] Test email notifications
- [ ] Verify CORS is working
- [ ] Check all forms are functional

## Environment Variables to Set

### Backend (Render)

```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/epicforge
JWT_SECRET=your-super-secret-jwt-key
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
TWILIO_PHONE_NUMBER=+1234567890
ADMIN_EMAIL=admin@epicforgesoftware.com
ADMIN_PHONE=+1234567890
FRONTEND_URL=https://epicforge-website-ui.netlify.app
```

### Frontend (Netlify)

```
VITE_API_BASE_URL=https://epicforge-backend.onrender.com/api
VITE_APP_NAME=EpicForge Software
VITE_APP_VERSION=1.0.0
```

## Testing Commands

### Test Backend

```bash
# Health check
curl https://epicforge-backend.onrender.com/api/health

# Test lead submission
curl -X POST https://epicforge-backend.onrender.com/api/leads \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","phone":"+1234567890","businessType":"Startup","projectType":"Website","budget":50000,"problem":"Need a website"}'
```

### Test Frontend

```bash
# Build test
npm run build

# Preview test
npm run preview
```

## Troubleshooting

### Common Issues

1. **CORS Errors**: Check `FRONTEND_URL` in backend
2. **Build Failures**: Check Node version and dependencies
3. **Database Connection**: Verify MongoDB URI and permissions
4. **Email Issues**: Check SMTP credentials
5. **WhatsApp Issues**: Verify Twilio credentials

### Debug Steps

1. Check Render logs for backend issues
2. Check Netlify build logs for frontend issues
3. Test API endpoints individually
4. Verify environment variables are set correctly
5. Check browser console for frontend errors

## Success Criteria

- [ ] Frontend loads without errors
- [ ] Backend API responds to health check
- [ ] Contact form submits successfully
- [ ] Quotation calculator works
- [ ] WhatsApp integration functions
- [ ] Email notifications are sent
- [ ] All forms validate correctly
- [ ] No CORS errors in browser console
- [ ] Performance is acceptable

## Next Steps After Deployment

1. Set up monitoring and alerts
2. Configure custom domain (optional)
3. Set up CI/CD pipeline
4. Add staging environment
5. Implement backup strategies
6. Set up analytics and tracking
