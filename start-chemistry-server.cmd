@echo off
cd /d "%~dp0"
"C:\Program Files\nodejs\node.exe" "%~dp0serve-chemistry-app.js" > "%~dp0server.out.log" 2> "%~dp0server.err.log"
pause
