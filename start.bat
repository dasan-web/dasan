@echo off
title DASAN Homepage Production Start
echo ==============================================
echo  DASAN Homepage Production Server starting...
echo ==============================================
cd /d %~dp0

:: Use goto instead of parentheses to avoid batch parser issues (e.g., 'not은 예상되지 않았습니다')
if not exist .next goto BUILD
goto STARTNODE

:BUILD
echo [INFO] Build directory (.next) not found. Compiling the project...
call npm run build

:STARTNODE
where pm2 >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [INFO] Starting Next.js app via PM2...
    call pm2 start ecosystem.config.js
    echo ==============================================
    echo  Server successfully launched via PM2!
    echo  Check status: pm2 status
    echo  Check logs: pm2 logs dasan-homepage
    echo ==============================================
    pause
) else (
    echo [INFO] Starting Next.js Production Server (npm start)...
    echo  Access at: http://localhost:3000
    echo ==============================================
    call npm run start
)
