# Netlify Deployment Setup Guide

## Quick Setup Checklist

### 1. Environment Variables (Required)

In your Netlify dashboard, go to **Site settings** → **Environment variables** and add:

```
VITE_API_BASE_URL=https://your-backend-app.onrender.com/api
VITE_WHATSAPP_BUSINESS_NUMBER=919201046787
```

**Important**: Replace `https://your-backend-app.onrender.com/api` with your actual Render backend URL.

### 2. Build Settings

Netlify will automatically detect these from `netlify.toml`:
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: 18 (or higher)

### 3. Deploy

#### Option A: Git Integration (Recommended)
1. Connect your GitHub repository to Netlify
2. Netlify will auto-deploy on every push
3. Set environment variables as shown above

#### Option B: Netlify CLI
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

### 4. Backend CORS Configuration

Update your Render backend's environment variables:
```
FRONTEND_URL=https://your-netlify-site.netlify.app
```

Or update `backend/server.js` to include your Netlify domain in the `allowedOrigins` array:
```javascript
const allowedOrigins = [
  "https://your-netlify-site.netlify.app",
  "https://epicforgesoftware.com",
  // ... other domains
];
```

### 5. Verify Deployment

1. ✅ Check that environment variables are set correctly
2. ✅ Test API connections from the deployed site
3. ✅ Verify WhatsApp links work
4. ✅ Test admin portal login
5. ✅ Check forms are submitting correctly

## Troubleshooting

### CORS Errors
- Ensure your Netlify domain is in the backend's `allowedOrigins`
- Check that `VITE_API_BASE_URL` ends with `/api`
- Verify backend is running and accessible

### Build Failures
- Check Node version (18+ required)
- Ensure all dependencies are in `package.json`
- Review build logs for specific errors

### API Calls Failing
- Verify `VITE_API_BASE_URL` is correctly set in Netlify
- Check backend logs on Render
- Ensure backend URL includes `/api` at the end

## Production Checklist

- [ ] Environment variables set in Netlify
- [ ] Backend deployed on Render
- [ ] Backend CORS configured with Netlify domain
- [ ] SSL/HTTPS enabled (automatic on Netlify)
- [ ] All API endpoints tested
- [ ] Forms working correctly
- [ ] Admin portal accessible
- [ ] WhatsApp links functional

