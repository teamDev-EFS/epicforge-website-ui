#!/usr/bin/env node
/**
 * Emergency script to temporarily remove/replace large images before deployment
 * Run: node scripts/remove-large-images.js
 */

const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const distDir = path.join(__dirname, '../dist');

// Large files that cause timeout
const largeFiles = [
  'forgeorion.png',
  'forgeorion-CfsL4iMd.png', // Hashed version in dist
];

console.log('🔍 Checking for large images...\n');

largeFiles.forEach(file => {
  const publicPath = path.join(publicDir, file);
  const distPath = path.join(distDir, 'assets', 'png', file);
  
  if (fs.existsSync(publicPath)) {
    const stats = fs.statSync(publicPath);
    const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
    console.log(`⚠️  Found: ${file} (${sizeMB} MB) in public/`);
    console.log(`   💡 Rename this file before deploying to avoid timeout`);
  }
  
  if (fs.existsSync(distPath)) {
    const stats = fs.statSync(distPath);
    const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
    console.log(`⚠️  Found: ${file} (${sizeMB} MB) in dist/`);
    console.log(`   💡 This will cause Netlify timeout`);
  }
});

console.log('\n📝 Solutions:');
console.log('1. Optimize images using TinyPNG: https://tinypng.com');
console.log('2. Temporarily rename large files:');
console.log('   mv public/forgeorion.png public/forgeorion.png.backup');
console.log('3. Use placeholder images for now');
console.log('4. Rebuild after optimizing: npm run build');

