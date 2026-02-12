@echo off
echo ===================================================
echo   LOREZONE STABILIZER ^& STARTER 🚀
echo ===================================================

echo [1/3] Killing Zombie Node Processes... 🧟
taskkill /F /IM node.exe /T 2>nul
if %errorlevel% neq 0 echo    (No zombies found, clean start!)
echo.

echo [2/3] Starting Backend Server... 🧠
start "LoreZone BACKEND" /D "backend" cmd /k "npm start"
echo    Backend launched (Port 8081).
echo.

echo [3/3] Starting Frontend Server... 🎨
start "LoreZone FRONTEND" /D "frontend" cmd /k "npm start"
echo    Frontend launched (Port 3000).
echo.

echo ===================================================
echo   ALL SYSTEMS GO! ✅
echo   Please wait a moment for browser to open...
echo ===================================================
pause
