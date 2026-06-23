@echo off
title DASAN Homepage Production Stop
echo ==============================================
echo  Stopping DASAN Homepage Server...
echo ==============================================
cd /d %~dp0

echo [INFO] Stopping and deleting the PM2 process 'dasan-homepage'...
call pm2 delete dasan-homepage

echo ==============================================
echo  Server successfully stopped!
echo ==============================================
pause
