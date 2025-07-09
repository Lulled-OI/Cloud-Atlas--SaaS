#!/bin/bash

echo "🌍 Setting up Cloud Atlas - 3D Global News Intelligence Platform"
echo "============================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if .env.example exists and copy to .env if .env doesn't exist
if [ -f ".env.example" ] && [ ! -f ".env" ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    echo "⚠️  Please edit .env file with your actual API keys and configuration"
fi

# Check if Convex is installed globally
if ! command -v convex &> /dev/null; then
    echo "🔧 Installing Convex CLI..."
    npm install -g convex
fi

echo ""
echo "🚀 Cloud Atlas Setup Complete!"
echo ""
echo "Next steps:"
echo "1. Edit the .env file with your API keys:"
echo "   - Get Convex keys from: https://convex.dev"
echo "   - Get Clerk keys from: https://clerk.com"
echo "   - Get Polar.sh keys from: https://polar.sh"
echo ""
echo "2. Initialize Convex backend:"
echo "   npx convex dev"
echo ""
echo "3. Start the development server:"
echo "   npm run dev"
echo ""
echo "4. Open your browser to: http://localhost:5173"
echo ""
echo "📚 For more help, see README.md"
echo ""
echo "🌟 Welcome to Cloud Atlas!"
