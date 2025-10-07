# EpicForge Backend Server Stop Script

Write-Host "🛑 Stopping EpicForge Backend Server..." -ForegroundColor Red

# Kill all Node.js processes
$nodeProcesses = Get-Process -Name "node" -ErrorAction SilentlyContinue

if ($nodeProcesses) {
    $nodeProcesses | Stop-Process -Force
    Write-Host "✅ Stopped all Node.js processes" -ForegroundColor Green
} else {
    Write-Host "ℹ️ No Node.js processes found" -ForegroundColor Blue
}

# Check if port 5000 is still in use
$portInUse = Get-NetTCPConnection -LocalPort 5000 -ErrorAction SilentlyContinue

if ($portInUse) {
    Write-Host "⚠️ Port 5000 is still in use. Force killing processes..." -ForegroundColor Yellow
    $portInUse | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }
    Write-Host "✅ Port 5000 is now free" -ForegroundColor Green
} else {
    Write-Host "✅ Port 5000 is free" -ForegroundColor Green
}

Write-Host "🎉 Server stopped successfully!" -ForegroundColor Green
