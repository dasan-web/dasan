@echo off
title DASAN Homepage Ngrok Tunnel
echo ========================================================
echo  Exposing DASAN Homepage (http://localhost:3000)
echo  to the public web using Ngrok...
echo ========================================================
cd /d %~dp0

:: =======================================================
:: 1. 사용자 설정 (Ngrok 대시보드에서 확인 후 아래에 입력)
:: =======================================================
:: Ngrok 가입 후 대시보드(https://dashboard.ngrok.com)에서
:: "Your Authtoken" 메뉴를 클릭해 아래에 붙여넣으세요.
set NGROK_AUTHTOKEN=3Ehv26IONEIr85svoh5fBpHPKBH_4EtcczDa8fFQz6fbhmdNV

:: Ngrok 대시보드 "Domains" 메뉴에 할당된 
:: 본인만의 무료 고정 도메인을 아래에 붙여넣으세요. (예: abc-def-123.ngrok-free.app)
set NGROK_DOMAIN=procreate-elk-nibble.ngrok-free.dev
:: =======================================================

:: 토큰 및 도메인 입력 여부 검사
if "%NGROK_AUTHTOKEN%"=="" goto ERR_TOKEN
if "%NGROK_DOMAIN%"=="" goto ERR_DOMAIN
goto START_TUNNEL

:ERR_TOKEN
echo [WARNING] NGROK_AUTHTOKEN이 설정되지 않았습니다.
echo 이 배치 파일을 우클릭하여 편집을 누른 뒤 NGROK_AUTHTOKEN 값을 입력해 주세요.
echo.
echo 가입 및 토큰 확인: https://dashboard.ngrok.com
pause
exit /b 1

:ERR_DOMAIN
echo [WARNING] NGROK_DOMAIN이 설정되지 않았습니다.
echo 이 배치 파일을 우클릭하여 편집을 누른 뒤 NGROK_DOMAIN 값을 입력해 주세요.
echo.
echo 본인의 고정 도메인 확인: https://dashboard.ngrok.com/cloud-edge/domains
pause
exit /b 1

:START_TUNNEL

:: Check if ngrok.exe exists
if not exist ngrok.exe (
    echo [INFO] ngrok.exe not found. Downloading the latest version...
    powershell -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri 'https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-windows-amd64.zip' -OutFile 'ngrok.zip'; Expand-Archive -Path 'ngrok.zip' -DestinationPath '.'; Remove-Item 'ngrok.zip'"
    if not exist ngrok.exe (
        echo [ERROR] Failed to download or unzip ngrok.exe.
        pause
        exit /b 1
    )
    echo [INFO] Download complete!
)

echo [INFO] Registering Authtoken...
ngrok.exe config add-authtoken %NGROK_AUTHTOKEN%

echo [INFO] Starting Ngrok Tunnel...
ngrok.exe http --url=%NGROK_DOMAIN% 3000

pause
