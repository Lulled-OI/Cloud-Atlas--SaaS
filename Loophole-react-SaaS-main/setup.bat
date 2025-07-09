@echo off
echo 🌍 Setting up Cloud Atlas - 3D Global News Intelligence Platform
echo =============================================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

echo ✅ Node.js version:
node --version

REM Install dependencies
echo 📦 Installing dependencies...
npm install

REM Check if .env.example exists and copy to .env if .env doesn't exist
if exist ".env.example" if not exist ".env" (
    echo 📝 Creating .env file from .env.example...
    copy .env.example .env
    echo ⚠️  Please edit .env file with your actual API keys and configuration
)

echo.
echo 🚀 Cloud Atlas Setup Complete!
echo.
echo Next steps:
echo 1. Edit the .env file with your API keys:
echo    - Get Convex keys from: https://convex.dev
echo    - Get Clerk keys from: https://clerk.com
echo    - Get Polar.sh keys from: https://polar.sh
echo.
echo 2. Initialize Convex backend:
echo    npx convex dev
echo.
echo 3. Start the development server:
echo    npm run dev
echo.
echo 4. Open your browser to: http://localhost:5173
echo.
echo 📚 For more help, see README.md
echo.
echo 🌟 Welcome to Cloud Atlas!
echo.
pause
