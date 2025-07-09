@echo off
echo.
echo 🔗 Cloud Atlas - Connect to Existing GitHub Repository
echo =====================================================
echo.

set /p repo_url="Enter your GitHub repository URL: "

if "%repo_url%"=="" (
    echo ❌ No URL provided. Please try again.
    pause
    exit /b 1
)

echo.
echo 🔗 Connecting to: %repo_url%
echo.

git remote add origin %repo_url%
git branch -M main
git push -u origin main

echo.
echo ✅ Successfully pushed to GitHub!
echo.
echo 🌐 Your Cloud Atlas project is now live on GitHub:
echo    %repo_url%
echo.
echo 🎯 Next steps:
echo    • Add a description to your repository
echo    • Enable GitHub Pages (if you want a live demo)
echo    • Star your own repository ⭐
echo.

pause
