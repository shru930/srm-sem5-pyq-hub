@echo off
rem Opens the PYQ Hub on this computer only (http://localhost:8000). Close this window to stop it.
cd /d "%~dp0"
start "" http://localhost:8000/
python -m http.server 8000 --bind 127.0.0.1
