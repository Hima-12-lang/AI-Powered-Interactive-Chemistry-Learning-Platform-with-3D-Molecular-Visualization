@echo off
cd /d "%~dp0"
start "Chemistry Structure Server" cmd /k ""C:\Program Files\nodejs\node.exe" "%~dp0serve-chemistry-app.js""
timeout /t 2 /nobreak > nul
start "" "http://127.0.0.1:5173/"
