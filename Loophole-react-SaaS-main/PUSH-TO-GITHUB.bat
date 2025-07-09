@echo off
echo.
echo 🚀 Cloud Atlas - Push to GitHub
echo ================================
echo.

echo ✅ Preparing files for GitHub...
echo.

REM Check if git is installed
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Git is not installed. Please install Git first.
    echo Download from: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo ✅ Git is installed

REM Initialize git if not already done
if not exist .git (
    echo 📁 Initializing Git repository...
    git init
    echo ✅ Git repository initialized
) else (
    echo ✅ Git repository already exists
)

echo.
echo 📝 Adding all files to Git...
git add .

echo.
echo 💾 Creating commit...
git commit -m "🌍 Cloud Atlas - 3D Global News Intelligence Platform

✨ Features:
- Interactive 3D globe visualization  
- Real-time global news aggregation
- AI-powered sentiment analysis
- Professional SaaS dashboard
- Demo mode with simulated data

🔧 Tech Stack:
- React 19 + React Router 7
- TypeScript + Tailwind CSS
- Three.js + shadcn/ui
- Convex + Clerk (optional)

🚀 Ready to run: npm run demo"

echo.
echo 🌐 To connect to GitHub:
echo.
echo 1. Create a new repository on GitHub.com
echo 2. Copy the repository URL (example: https://github.com/yourusername/cloud-atlas-3d-news.git)
echo 3. Run these commands:
echo.
echo    git remote add origin YOUR_GITHUB_URL
echo    git branch -M main  
echo    git push -u origin main
echo.
echo 📋 Example commands:
echo    git remote add origin https://github.com/yourusername/cloud-atlas-3d-news.git
echo    git branch -M main
echo    git push -u origin main
echo.

pause
