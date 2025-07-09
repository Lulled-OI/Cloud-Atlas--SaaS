# Cloud Atlas Troubleshooting Guide

## 🔧 Quick Fix for Common Issues

### Issue 1: "Three.js not found" or 3D Globe not working
**Solution:** The app is designed to work without Three.js initially
- The 3D globe shows a fallback 2D version by default
- Click "Try 3D View" button to test 3D functionality
- To install full 3D support: `npm install three @types/three @react-three/fiber @react-three/drei`

### Issue 2: "Route not found" or blank pages
**Solution:** Missing route configuration
1. Check that all routes are properly defined in `app/routes.ts`
2. Restart the dev server: `npm run dev`

### Issue 3: Convex backend errors
**Solution:** Backend not initialized
1. Make sure you have a Convex account at https://convex.dev
2. Run: `npx convex dev`
3. Follow the setup prompts to connect your project

### Issue 4: Authentication not working
**Solution:** Clerk configuration missing
1. Sign up at https://clerk.com
2. Get your publishable key and secret key
3. Add them to your `.env` file:
   ```
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   ```

### Issue 5: Subscription features not working
**Solution:** Polar.sh not configured
1. Sign up at https://polar.sh
2. Add your API keys to `.env`:
   ```
   POLAR_ACCESS_TOKEN=your_token_here
   POLAR_ORGANIZATION_ID=your_org_id_here
   ```

## 🚀 Quick Start Commands

### Option 1: Automated Setup
```bash
# Run the setup script
npm run setup

# Initialize Convex
npx convex dev

# Start development
npm run dev
```

### Option 2: Manual Setup
```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your API keys
# (use notepad, VS Code, or any text editor)

# Initialize Convex
npx convex dev

# Start development server
npm run dev
```

## 🌍 What Works Without API Keys

Cloud Atlas is designed to work immediately with demo data:

✅ **Works without setup:**
- Homepage with interactive 2D globe
- Dashboard with simulated news data
- Trending topics with fake data
- News analysis interface
- All UI components and navigation

❌ **Requires API keys:**
- Real-time news data
- User authentication
- Subscription management
- 3D globe (optional)

## 🔍 Debug Steps

### 1. Check Node.js Version
```bash
node --version
# Should be 18.0.0 or higher
```

### 2. Check if packages installed
```bash
npm list react react-router
# Should show version numbers
```

### 3. Check for TypeScript errors
```bash
npm run typecheck
```

### 4. Check browser console
1. Open browser dev tools (F12)
2. Look for error messages in Console tab
3. Common errors and solutions:

**"Module not found":** Run `npm install`
**"Convex error":** Run `npx convex dev`
**"Clerk error":** Add Clerk keys to `.env`

## 📞 Still Need Help?

### Quick Fixes:
1. **Delete node_modules and reinstall:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Reset Convex:**
   ```bash
   npx convex dev --clear
   ```

3. **Check all environment variables:**
   Open `.env` file and make sure no values are `your_key_here`

### What to Include When Asking for Help:
- Error message (full text)
- What you were trying to do
- Your Node.js version (`node --version`)
- Your operating system

## 🎯 Expected Behavior

When working correctly, you should see:
- ✅ Homepage loads with animated 2D globe
- ✅ Navigation works between pages
- ✅ Dashboard shows news cards with data
- ✅ No error messages in browser console
- ✅ Dev server starts without errors

The app uses simulated data by default, so it should work even without API keys!
