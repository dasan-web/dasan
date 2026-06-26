@echo off
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "backup_dasan.ps1"
pause
