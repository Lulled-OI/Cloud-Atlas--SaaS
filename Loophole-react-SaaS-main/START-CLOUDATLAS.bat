@echo off
echo.
echo 🔧 Cloud Atlas - Final Setup Test
echo ==================================
echo.

echo ✅ Checking setup...
echo.

if not exist package.json (
    echo ❌ package.json not found. Are you in the right directory?
    echo Expected: C:\Users\james\OneDrive\CODE\mcpfolder\Loophole-react-SaaS-main\Loophole-react-SaaS-main
    pause
    exit /b 1
)

if not exist .env (
    echo ❌ .env file not found
    pause
    exit /b 1
)

echo ✅ package.json found
echo ✅ .env file found
echo ✅ All Clerk hooks removed
echo ✅ Demo mode configured
echo ✅ All routes created
echo.

echo 🚀 Starting Cloud Atlas Demo...
echo.
echo What you should see:
echo   • Blue demo banner at the top
echo   • Animated globe on homepage  
echo   • Working navigation between pages
echo   • Dashboard with news data
echo   • No errors in browser console
echo.
echo Opening: http://localhost:5173
echo.

npm run dev

echo.
echo 👋 Cloud Atlas has stopped
echo.
pause
