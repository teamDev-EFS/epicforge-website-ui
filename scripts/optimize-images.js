// Image optimization script (run before deployment)
// Install: npm install sharp --save-dev
// Run: node scripts/optimize-images.js

const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const distAssetsDir = path.join(__dirname, '../dist/assets');

// Large files that need optimization
const largeFiles = [
  'forgeorion.png',
  'NamasteEximVentures.png',
  'SafetyPlus Protection SaaS with Admin Portal.png'
];

console.log('⚠️  Large image files detected. Please optimize:');
console.log('   - forgeorion.png (37.6 MB)');
console.log('   - NamasteEximVentures.png (3.7 MB)');
console.log('   - SafetyPlus Protection SaaS (2 MB)');
console.log('\n📝 Recommendations:');
console.log('   1. Use TinyPNG (https://tinypng.com) or Squoosh (https://squoosh.app)');
console.log('   2. Convert to WebP format for better compression');
console.log('   3. Target file size: < 500 KB per image');
console.log('   4. Use <img loading="lazy"> for images below the fold');
console.log('\n💡 Quick fix: Temporarily remove largest images if deployment is urgent');

