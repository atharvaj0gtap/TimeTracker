@echo off
cd /d "c:\Users\Atharva\Documents\Projects\ArtsFactory\TimeTracker"
start "TimeTracker" cmd /k "npm run dev:full"
timeout /t 3 /nobreak >nul
start http://localhost:5173
