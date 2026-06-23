@echo off
title DASAN Homepage Tunnel Server
echo ========================================================
echo  Exposing DASAN Homepage (http://localhost:3000)
echo  to the public web using Localtunnel...
echo ========================================================
cd /d %~dp0

:: You can change the subdomain below to your preferred prefix.
:: If the subdomain is already in use, Localtunnel will assign a random one.
npx localtunnel --port 3000 --subdomain dasan-homepage

pause
