@echo off
cd /d "c:\Users\Atharva\Documents\Projects\ArtsFactory\TimeTracker"
start "TimeTracker Server" cmd /c "npm run server"
timeout /t 2 /nobreak >nul
start "TimeTracker App" cmd /c "npm run dev"
timeout /t 3 /nobreak >nul
start http://localhost:5173
