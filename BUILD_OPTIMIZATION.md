# Build Optimization Guide

## Optimizations Applied

### 1. Code Splitting
- **Vendor Chunks**: Split large libraries into separate chunks
  - `vendor-react`: React core (~150KB)
  - `vendor-router`: React Router (~50KB)
  - `vendor-ag-grid`: AG Grid library (~500KB)
  - `vendor-charts`: Highcharts (~400KB)
  - `vendor-animations`: Framer Motion (~100KB)
  - `vendor-i18n`: i18next libraries (~50KB)
  - `vendor-icons`: Lucide React icons (~200KB)
  - `vendor-other`: Other dependencies

### 2. Build Settings
- **Minification**: esbuild (faster than terser)
- **Source Maps**: Disabled (saves ~30% build time)
- **CSS Code Splitting**: Enabled
- **Target Browsers**: Modern browsers only (smaller output)
- **Report Compressed Size**: Enabled

### 3. Dependencies Removed
- **@supabase/supabase-js**: Removed (not used in codebase)

### 4. Bundle Size Reduction
- Tree-shaking enabled
- Dead code elimination
- CSS minification
- Asset optimization

## Expected Build Output

### Initial Load
- Main bundle: ~200-300KB (gzipped)
- Vendor React: ~50KB (gzipped)
- Total initial load: ~300-400KB (gzipped)

### Code-Split Chunks (loaded on demand)
- Admin dashboard (AG Grid): ~500KB
- Charts: ~400KB
- Icons: ~200KB
- Animations: ~100KB

### Total Bundle Size
- Without code-splitting: ~2-3MB
- With code-splitting: ~1-1.5MB (initial), rest loaded on demand

## Netlify Build Optimization

### Build Command
```bash
npm run build
```

### Build Time Optimization
1. Enable build cache in Netlify
2. Use Node 18+ for faster builds
3. Install only production dependencies in build

### Environment Variables
Set in Netlify dashboard:
```
VITE_API_BASE_URL=https://your-backend.onrender.com/api
VITE_WHATSAPP_BUSINESS_NUMBER=919201046787
```

## Build Performance

### Before Optimization
- Build time: ~60-90 seconds
- Bundle size: ~2-3MB
- Initial load: ~800KB-1MB

### After Optimization
- Build time: ~30-45 seconds
- Bundle size: ~1-1.5MB (initial)
- Initial load: ~300-400KB

## Monitoring Bundle Size

Run after build:
```bash
npx vite-bundle-visualizer
```

Or check build output for chunk sizes.

