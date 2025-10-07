# EpicForge Backend Server Management Script

Write-Host "🚀 Starting EpicForge Backend Server..." -ForegroundColor Green

# Check if port 5000 is in use
$portInUse = Get-NetTCPConnection -LocalPort 5000 -ErrorAction SilentlyContinue

if ($portInUse) {
    Write-Host "⚠️ Port 5000 is already in use. Stopping existing processes..." -ForegroundColor Yellow
    
    # Kill all Node.js processes
    Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force
    Write-Host "✅ Stopped all Node.js processes" -ForegroundColor Green
    
    # Wait a moment for ports to be released
    Start-Sleep -Seconds 2
}

# Start the server
Write-Host "🚀 Starting server on port 5000..." -ForegroundColor Green
Set-Location $PSScriptRoot
node server.js
