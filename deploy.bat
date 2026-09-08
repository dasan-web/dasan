@echo off
title DASAN Homepage - Vercel Deployer
echo ========================================================
echo   DASAN Homepage - Deploy to Vercel
echo   Target URL: https://dasan-sigma.vercel.app/
echo ========================================================
cd /d "%~dp0"
echo.

echo [1/3] Checking Git status...
git status -s
echo.

set /p confirm="Deploy to Vercel production now? (Y/N): "
if /i "%confirm%" neq "y" (
    echo.
    echo [INFO] Deployment cancelled. Local changes kept safely.
    pause
    exit /b 0
)

echo.
set /p commit_msg="Enter deploy note (Press Enter for default: Update website): "
if "%commit_msg%"=="" (
    set commit_msg=Update website
)

echo.
echo [2/3] Adding and committing changes...
git add .
git commit -m "%commit_msg%"

echo.
echo [3/3] Pushing to GitHub (triggers Vercel deployment)...
git push origin main

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Git push failed. Please check network or credentials.
    pause
    exit /b 1
)

echo.
echo ========================================================
echo   [SUCCESS] Pushed to GitHub successfully!
echo   Vercel is now deploying your changes (approx. 1-2 mins).
echo   Live site: https://dasan-sigma.vercel.app/
echo ========================================================
pause
