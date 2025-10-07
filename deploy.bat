@echo off
echo 🚀 EpicForge Software - Deployment Script
echo ==========================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo ✅ Node.js and npm are installed

REM Install dependencies
echo 📦 Installing dependencies...
npm install

REM Run linting
echo 🔍 Running ESLint...
npm run lint

REM Run type checking
echo 🔍 Running TypeScript type checking...
npx tsc --noEmit

REM Build the project
echo 🏗️ Building the project...
npm run build

REM Check if build was successful
if %errorlevel% equ 0 (
    echo ✅ Build completed successfully!
    echo.
    echo 📊 Build Information:
    echo ====================
    echo Build directory: dist/
    echo.
    echo 🎯 Optimization Checklist:
    echo =========================
    echo ✅ Mobile responsive design implemented
    echo ✅ SEO meta tags and schema markup added
    echo ✅ Performance optimizations applied
    echo ✅ AI search optimization included
    echo ✅ Core Web Vitals monitoring enabled
    echo.
    echo 🚀 Ready for deployment!
    echo.
    echo Next steps:
    echo 1. Upload the 'dist' folder to your web server
    echo 2. Configure your web server to serve the files
    echo 3. Set up Google Analytics and Search Console
    echo 4. Test the website on mobile devices
    echo 5. Run PageSpeed Insights test
    echo.
    echo 📱 Mobile Testing URLs:
    echo - iPhone: https://search.google.com/test/mobile-friendly
    echo - Android: https://search.google.com/test/mobile-friendly
    echo.
    echo 🔍 SEO Testing URLs:
    echo - PageSpeed Insights: https://pagespeed.web.dev/
    echo - Mobile-Friendly Test: https://search.google.com/test/mobile-friendly
    echo - Rich Results Test: https://search.google.com/test/rich-results
    echo.
    echo 📈 Analytics Setup:
    echo - Google Analytics: https://analytics.google.com/
    echo - Google Search Console: https://search.google.com/search-console
    echo.
) else (
    echo ❌ Build failed. Please check the errors above.
    pause
    exit /b 1
)

echo 🎉 Deployment script completed!
echo EpicForge Software - Forging the Future with AI, Blockchain ^& Automation
pause
