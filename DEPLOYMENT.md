# EpicForge Software - Deployment Guide

This guide covers deploying the EpicForge Software application with:

- **Frontend**: Deployed on Netlify
- **Backend**: Deployed on Render

## Prerequisites

1. **Netlify Account**: Sign up at [netlify.com](https://netlify.com)
2. **Render Account**: Sign up at [render.com](https://render.com)
3. **MongoDB Atlas**: Set up a MongoDB cluster at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
4. **Email Service**: Set up SMTP email service (Gmail, SendGrid, etc.)
5. **Twilio Account**: For WhatsApp notifications (optional)

## Backend Deployment (Render)

### 1. Prepare Backend for Deployment

The backend is already configured with:

- `render.yaml` configuration file
- Production-ready `package.json` with start script
- Environment variable setup

### 2. Deploy to Render

1. **Connect Repository**:

   - Go to [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure Service**:

   - **Name**: `epicforge-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Plan**: Free (or upgrade as needed)

3. **Set Environment Variables**:

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

4. **Deploy**:
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note the service URL (e.g., `https://epicforge-backend.onrender.com`)

## Frontend Deployment (Netlify)

### 1. Prepare Frontend for Deployment

The frontend is already configured with:

- `netlify.toml` configuration file
- Environment variables setup
- Production build configuration

### 2. Deploy to Netlify

1. **Connect Repository**:

   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Configure Build Settings**:

   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
   - **Node Version**: `18`

3. **Set Environment Variables**:

   ```
   VITE_API_BASE_URL=https://epicforge-backend.onrender.com/api
   VITE_APP_NAME=EpicForge Software
   VITE_APP_VERSION=1.0.0
   ```

4. **Deploy**:
   - Click "Deploy site"
   - Wait for deployment to complete
   - Your site will be available at `https://epicforge-website-ui.netlify.app`

## Environment Variables Setup

### Backend Environment Variables (Render)

| Variable              | Description                   | Example                                    |
| --------------------- | ----------------------------- | ------------------------------------------ |
| `NODE_ENV`            | Environment mode              | `production`                               |
| `PORT`                | Server port                   | `10000`                                    |
| `MONGODB_URI`         | MongoDB connection string     | `mongodb+srv://...`                        |
| `JWT_SECRET`          | JWT signing secret            | `your-secret-key`                          |
| `EMAIL_HOST`          | SMTP host                     | `smtp.gmail.com`                           |
| `EMAIL_PORT`          | SMTP port                     | `587`                                      |
| `EMAIL_USER`          | SMTP username                 | `your-email@gmail.com`                     |
| `EMAIL_PASS`          | SMTP password                 | `your-app-password`                        |
| `TWILIO_ACCOUNT_SID`  | Twilio account SID            | `AC...`                                    |
| `TWILIO_AUTH_TOKEN`   | Twilio auth token             | `your-token`                               |
| `TWILIO_PHONE_NUMBER` | Twilio phone number           | `+1234567890`                              |
| `ADMIN_EMAIL`         | Admin email for notifications | `admin@epicforgesoftware.com`              |
| `ADMIN_PHONE`         | Admin phone for notifications | `+1234567890`                              |
| `FRONTEND_URL`        | Frontend URL for CORS         | `https://epicforge-website-ui.netlify.app` |

### Frontend Environment Variables (Netlify)

| Variable            | Description         | Example                                      |
| ------------------- | ------------------- | -------------------------------------------- |
| `VITE_API_BASE_URL` | Backend API URL     | `https://epicforge-backend.onrender.com/api` |
| `VITE_APP_NAME`     | Application name    | `EpicForge Software`                         |
| `VITE_APP_VERSION`  | Application version | `1.0.0`                                      |

## Testing Deployment

### 1. Test Backend API

```bash
# Test health endpoint
curl https://epicforge-backend.onrender.com/api/health

# Test leads endpoint
curl -X POST https://epicforge-backend.onrender.com/api/leads \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","phone":"+1234567890","businessType":"Startup","projectType":"Website","budget":50000,"problem":"Need a website"}'
```

### 2. Test Frontend

1. Visit your Netlify URL
2. Test the contact form
3. Test the quotation calculator
4. Verify WhatsApp integration
5. Check email notifications

## Monitoring and Maintenance

### Backend Monitoring (Render)

- **Logs**: Available in Render dashboard
- **Metrics**: CPU, Memory, Response time
- **Uptime**: Automatic monitoring
- **Scaling**: Auto-scaling available on paid plans

### Frontend Monitoring (Netlify)

- **Analytics**: Built-in analytics
- **Form Submissions**: Netlify Forms integration
- **Performance**: Core Web Vitals monitoring
- **CDN**: Global CDN for fast loading

## Troubleshooting

### Common Issues

1. **CORS Errors**:

   - Ensure `FRONTEND_URL` is set correctly in backend
   - Check CORS configuration in `server.js`

2. **Database Connection**:

   - Verify MongoDB URI is correct
   - Check MongoDB Atlas IP whitelist
   - Ensure database user has proper permissions

3. **Email Notifications**:

   - Verify SMTP credentials
   - Check email service provider settings
   - Test with a simple email first

4. **WhatsApp Integration**:
   - Verify Twilio credentials
   - Check phone number format
   - Ensure Twilio account is active

### Debug Commands

```bash
# Check backend logs
# Available in Render dashboard

# Test API locally
curl http://localhost:5000/api/health

# Test frontend build locally
npm run build
npm run preview
```

## Security Considerations

1. **Environment Variables**: Never commit sensitive data to Git
2. **CORS**: Configure properly for production domains
3. **Rate Limiting**: Implemented in backend
4. **Helmet**: Security headers configured
5. **Input Validation**: Joi validation implemented

## Performance Optimization

1. **Frontend**:

   - Vite build optimization
   - Code splitting
   - Image optimization
   - CDN delivery

2. **Backend**:
   - Connection pooling
   - Caching strategies
   - Database indexing
   - Response compression

## Support

For deployment issues:

1. Check Render logs for backend issues
2. Check Netlify build logs for frontend issues
3. Verify environment variables are set correctly
4. Test API endpoints individually

## Next Steps

1. Set up custom domain (optional)
2. Configure SSL certificates (automatic)
3. Set up monitoring and alerts
4. Implement CI/CD pipeline
5. Add staging environment
