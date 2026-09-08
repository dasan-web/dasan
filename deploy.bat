@echo off
chcp 65001 > nul
title 다산제약 Vercel 운영 배포기
echo ========================================================
echo   다산제약 공식 웹사이트 - Vercel 운영 서버 배포
echo   대상 사이트: https://dasan-sigma.vercel.app/
echo ========================================================
cd /d %~dp0
echo.

echo [1/3] 로컬 변경 사항 확인 중...
git status -s
echo.

set /p confirm="위 변경 사항들을 Vercel 운영 서버에 배포하시겠습니까? (Y/N): "
if /i "%confirm%" neq "y" (
    echo.
    echo [안내] 배포가 취소되었습니다. 로컬 변경사항은 그대로 유지됩니다.
    pause
    exit /b 0
)

echo.
set /p commit_msg="배포 메모를 입력하세요 (엔터 시 기본값: 배포 업데이트): "
if "%commit_msg%"=="" (
    set commit_msg=배포 업데이트
)

echo.
echo [2/3] 변경 사항 패키징 및 커밋 중...
git add .
git commit -m "%commit_msg%"

echo.
echo [3/3] GitHub main 브랜치로 전송 중 (Vercel 자동 배포 트리거)...
git push origin main

if %errorlevel% neq 0 (
    echo.
    echo [오류] GitHub 전송에 실패했습니다. 네트워크 연결을 확인해 주세요.
    pause
    exit /b 1
)

echo.
echo ========================================================
echo   [배포 완료!] GitHub 전송이 완료되었습니다.
echo   약 1~2분 후 Vercel 운영 사이트에 자동 반영됩니다.
echo   확인 주소: https://dasan-sigma.vercel.app/
echo ========================================================
pause

