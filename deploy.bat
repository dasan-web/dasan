@echo off
title DASAN Homepage Git Deployer
echo ========================================================
echo  Deploying DASAN Homepage to Vercel (via GitHub)
echo ========================================================
cd /d %~dp0

echo [INFO] Checking current Git status...
git status
echo.

set /p confirm="Do you want to stage all changes and push to GitHub? (Y/N): "
if /i "%confirm%" neq "y" (
    echo [INFO] Deployment cancelled.
    pause
    exit /b 0
)

set /p commit_msg="Enter commit/update message: "
if "%commit_msg%"=="" (
    set commit_msg="Update website content"
)

echo.
echo [INFO] Staging changes...
git add .

echo [INFO] Committing changes...
git commit -m "%commit_msg%"

echo [INFO] Pushing to GitHub (will trigger Vercel deploy)...
git push origin main

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Git push failed. Please check your network or credentials.
    pause
    exit /b 1
)

echo.
echo ========================================================
echo  [SUCCESS] Pushed successfully!
echo  Vercel is now automatically deploying your changes.
echo  Please wait 1-2 minutes for Vercel to update.
echo ========================================================
pause
