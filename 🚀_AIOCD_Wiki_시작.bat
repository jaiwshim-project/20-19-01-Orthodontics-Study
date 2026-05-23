@echo off
chcp 65001 > nul
echo.
echo ================================================
echo   🤖 AIOCD Wiki 로컬 서버 시작
echo ================================================
echo.

cd /d "%~dp0"

echo ⏳ 기존 서버 종료 중...
taskkill /F /IM python.exe /FI "CMDLINE like *http.server*" 2>nul

echo.
echo 🌐 http://localhost:8000 에서 AIOCD Wiki 시작...
timeout /t 1 /nobreak > nul

REM 브라우저 실행
start http://localhost:8000/aiocd-index.html

REM 서버 실행
echo.
echo ✅ 서버가 시작되었습니다.
echo    → 브라우저에서 http://localhost:8000/aiocd-index.html 열기
echo.
echo 💡 팁: 마크다운 문서 링크를 클릭하면 아름답게 렌더링됩니다.
echo.
echo ⚠️  이 창을 닫으면 서버가 종료됩니다. (계속 실행 시 최소화)
echo.

python -m http.server 8000

pause
