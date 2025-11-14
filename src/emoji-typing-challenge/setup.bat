@echo off
echo ========================================
echo   EMOJI TYPING CHALLENGE - AUTO SETUP
echo ========================================
echo.

REM Check if Docker is installed
docker --version >nul 2>&1
if %errorlevel% == 0 (
    echo [OK] Docker is already installed!
    echo.
    echo Starting the game with Docker...
    echo First run will download ~500MB of dependencies
    echo.
    docker-compose up --build
) else (
    echo [ERROR] Docker is not installed
    echo.
    echo Docker is required to run this game automatically.
    echo It will handle all dependencies for you!
    echo.
    echo Installation instructions for Windows:
    echo.
    echo 1. Download Docker Desktop from:
    echo    https://www.docker.com/products/docker-desktop
    echo.
    echo 2. Install and run Docker Desktop
    echo.
    echo 3. Run this script again: setup.bat
    echo.
    pause
    exit /b 1
)

pause
