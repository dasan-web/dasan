@echo off
echo ===================================================
echo   DASAN Admin Server Deployment (WinSCP Auto)
echo ===================================================
echo.
echo Starting file sync to Linux Server (192.168.20.85)...
echo (Only changed files will be uploaded. Missing files will be deleted.)
echo.

"C:\Program Files (x86)\WinSCP\WinSCP.com" /script="c:\Share\DASAN\scripts\winscp_deploy.txt"

echo.
echo ===================================================
echo   Deployment Complete!
echo ===================================================
pause
