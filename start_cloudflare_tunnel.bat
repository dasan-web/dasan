@echo off
title DASAN Homepage Cloudflare Tunnel
echo ========================================================
echo  Exposing DASAN Homepage (http://localhost:3000)
echo  to the public web using Cloudflare Tunnel...
echo ========================================================
cd /d %~dp0

:: Check if cloudflared.exe exists
if not exist cloudflared.exe (
    echo [INFO] cloudflared.exe not found. Downloading the latest version...
    powershell -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri 'https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-amd64.exe' -OutFile 'cloudflared.exe'"
    if not exist cloudflared.exe (
        echo [ERROR] Failed to download cloudflared.exe. Please check your internet connection.
        pause
        exit /b 1
    )
    echo [INFO] Download complete!
)

echo [INFO] Starting Cloudflare Tunnel...
cloudflared.exe tunnel --url http://localhost:3000

pause
