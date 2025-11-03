# Deployment Guide - EpicForge Website

This guide covers deploying the frontend to Netlify and backend to Render.

## Prerequisites

- Backend deployed on Render (get your backend URL)
- Netlify account
- GitHub repository (recommended for automatic deployments)

## Frontend Deployment (Netlify)

### 1. Environment Variables Setup

Set the following environment variables in Netlify:

1. Go to your Netlify site dashboard
2. Navigate to **Site settings** → **Environment variables**
3. Add the following variables:

```
VITE_API_BASE_URL=https://your-backend-app.onrender.com/api
VITE_WHATSAPP_BUSINESS_NUMBER=919201046787
```

**Important**: Replace `https://your-backend-app.onrender.com/api` with your actual Render backend URL.

### 2. Build Settings

Netlify will automatically detect the build settings from `netlify.toml`:
- **Build command**: `npm run build`
- **Publish directory**: `dist`

### 3. Deployment Methods

#### Option A: Git Integration (Recommended)
1. Connect your GitHub repository to Netlify
2. Netlify will automatically deploy on every push to main branch
3. Set environment variables as described above

#### Option B: Manual Deploy
1. Build locally: `npm run build`
2. Deploy the `dist` folder via Netlify CLI or drag-and-drop

#### Option C: Netlify CLI
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

### 4. Verify Deployment

1. Check that all environment variables are set
2. Test API connections from the deployed site
3. Verify WhatsApp links work correctly

## Backend Deployment (Render)

### 1. Environment Variables

Set these in Render dashboard:
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `NODE_ENV`: `production`
- `PORT`: `5000` (or Render's assigned port)

### 2. CORS Configuration

Update `backend/server.js` CORS settings to include your Netlify domain:
```javascript
origin: function (origin, callback) {
  const allowedOrigins = [
    'https://your-netlify-site.netlify.app',
    'https://epicforgesoftware.com',
    // ... other allowed origins
  ];
  // ...
}
```

### 3. Build & Deploy

1. Connect your GitHub repository
2. Set build command: `cd backend && npm install`
3. Set start command: `cd backend && node server.js`
4. Deploy

## Environment Variables Reference

### Frontend (.env or Netlify)
```
VITE_API_BASE_URL=https://your-backend-app.onrender.com/api
VITE_WHATSAPP_BUSINESS_NUMBER=919201046787
```

### Backend (Render Environment Variables)
```
MONGODB_URI=mongodb://...
JWT_SECRET=your-secret-key
NODE_ENV=production
PORT=5000
```

## Troubleshooting

### CORS Errors
- Ensure your Netlify domain is in the backend's CORS allowed origins
- Check that `VITE_API_BASE_URL` is correctly set

### API Calls Failing
- Verify `VITE_API_BASE_URL` includes `/api` at the end
- Check backend logs on Render
- Verify backend is running and accessible

### Build Failures
- Ensure all dependencies are in `package.json`
- Check Node version compatibility (Node 18+)
- Review build logs for specific errors

## Post-Deployment Checklist

- [ ] All environment variables set correctly
- [ ] API endpoints working
- [ ] WhatsApp links functional
- [ ] Admin portal accessible
- [ ] Forms submitting correctly
- [ ] Analytics tracking working
- [ ] Mobile responsive design verified
- [ ] SSL/HTTPS enabled (automatic on Netlify)

## Local Development

For local development, create a `.env` file:
```bash
cp .env.example .env
```

Update `.env` with your local backend URL if needed:
```
VITE_API_BASE_URL=http://localhost:5000/api
VITE_WHATSAPP_BUSINESS_NUMBER=919201046787
```

Then run:
```bash
npm install
npm run dev
```

## Production Build Locally

To test production build locally:
```bash
npm run build
npm run preview
```

This builds the app and serves it locally, allowing you to test production behavior.
