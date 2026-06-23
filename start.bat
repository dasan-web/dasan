@echo off
title DASAN Homepage Production Start
echo ==============================================
echo  DASAN Homepage Production Server starting...
echo ==============================================
cd /d %~dp0

:: Use goto instead of parentheses to avoid batch parser issues (e.g., 'not은 예상되지 않았습니다')
if not exist .next goto BUILD
goto STARTPM2

:BUILD
echo [INFO] Build directory (.next) not found. Compiling the project...
call npm run build

:STARTPM2
echo [INFO] Starting Next.js app via PM2...
call pm2 start ecosystem.config.js
echo ==============================================
echo  Server successfully launched!
echo  Check status: pm2 status
echo  Check logs: pm2 logs dasan-homepage
echo ==============================================
pause
