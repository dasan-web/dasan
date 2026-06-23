@echo off
title DASAN Homepage Development Server
echo ==============================================
echo  Starting DASAN Homepage in DEVELOPMENT mode...
echo ==============================================
cd /d %~dp0

call npm run dev
pause
