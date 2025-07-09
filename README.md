# 🌍 Cloud Atlas - 3D Global News Intelligence Platform

> **Experience global news like never before through interactive 3D visualization and AI-powered intelligence**

[![Demo](https://img.shields.io/badge/Demo-Live-green?style=for-the-badge)](https://your-demo-url.com)
[![Tech Stack](https://img.shields.io/badge/Tech-React%2019%20%7C%20Three.js%20%7C%20TypeScript-blue?style=for-the-badge)](https://github.com/your-username/cloud-atlas-3d-news)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

## ✨ Features

### 🌐 **3D Global Visualization**
- Interactive 3D globe with real-time news activity points
- Hover regions for detailed news insights
- Smooth animations and responsive design
- Auto-rotating globe with customizable views

### 📊 **Real-time Analytics**
- Live news aggregation from 100+ global sources
- AI-powered sentiment analysis across 40+ languages
- Trending topics with confidence scoring
- Regional news density heatmaps

### 🔍 **Advanced Intelligence**
- Multi-platform social media integration (Twitter, VK, Line, WeChat, Telegram)
- Cross-platform correlation analysis
- Predictive trend modeling
- Geopolitical event forecasting

### 🎨 **Professional UI/UX**
- Modern SaaS interface with shadcn/ui components
- Responsive design for all devices
- Dark/light theme support
- Smooth animations and micro-interactions

## 🚀 Quick Start

### **Demo Mode (No Setup Required)**
```bash
# Clone the repository
git clone https://github.com/your-username/cloud-atlas-3d-news.git
cd cloud-atlas-3d-news

# Install dependencies and start demo
npm run quick-start

# Or step by step
npm install
npm run demo
```

**Then open:** http://localhost:5173

**🎯 The demo works immediately with realistic simulated data - no API keys required!**

## 🛠️ Tech Stack

### **Frontend**
- **React 19** - Latest React with concurrent features
- **React Router 7** - File-based routing system  
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Modern utility-first styling
- **shadcn/ui** - Beautiful, accessible components
- **Three.js & React Three Fiber** - 3D visualization
- **Framer Motion** - Smooth animations

### **Backend & Services**
- **Convex** - Real-time backend platform
- **Clerk** - Authentication and user management  
- **Vercel** - Deployment and hosting
- **Polar.sh** - Subscription management

### **APIs & Integrations**
- **Twitter API v2** - Real-time tweets and trends
- **VK API** - Russian social media data
- **Line Messaging API** - Asian social platforms
- **WeChat API** - Chinese social media
- **Telegram Bot API** - Messaging platform data
- **RSS Feeds** - Traditional news sources

## 📸 Screenshots

### Homepage with Interactive Globe
![Cloud Atlas Homepage](docs/images/homepage.png)

### Real-time Dashboard
![Dashboard Analytics](docs/images/dashboard.png)

### 3D News Visualization  
![3D Globe View](docs/images/globe-3d.png)

## 🔧 Installation & Setup

### **Prerequisites**
- Node.js 18+
- npm or yarn
- Git

### **Environment Setup**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/cloud-atlas-3d-news.git
   cd cloud-atlas-3d-news
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment variables (optional for demo):**
   ```bash
   cp .env.example .env
   # Edit .env with your API keys for full functionality
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

### **Production Setup**

For full functionality with real data, configure these services:

1. **Convex Backend:**
   - Sign up at [convex.dev](https://convex.dev)
   - Run: `npx convex dev`
   - Add `VITE_CONVEX_URL` to `.env`

2. **Clerk Authentication:**
   - Sign up at [clerk.com](https://clerk.com)  
   - Add `VITE_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` to `.env`

3. **News API Keys:**
   - Twitter API, VK API, Line API, etc.
   - Add respective API keys to `.env`

## 🌍 Global Coverage

### **Supported Regions & Platforms**

| Region | Social Media | News Sources | Languages |
|--------|-------------|---------------|-----------|
| **North America** | Twitter, Reddit, Facebook | CNN, Fox News, NYT | English |
| **Europe** | VK, Telegram | BBC, Le Monde, Der Spiegel | 20+ languages |  
| **Asia** | WeChat, Line, Weibo | NHK, Times of India, SCMP | 15+ languages |
| **South America** | WhatsApp, Telegram | Folha, Clarín, Globo | Spanish, Portuguese |
| **Africa & Middle East** | Twitter, Regional platforms | Al Jazeera, Local outlets | Arabic, English |

## 📦 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run demo         # Start in demo mode (no API keys required)
npm run quick-start  # Install dependencies and start demo
npm run typecheck    # Run TypeScript checks
```

## 🔄 Demo vs Production Mode

| Feature | Demo Mode | Production Mode |
|---------|-----------|-----------------|
| 🌍 News Globe | ✅ 2D Interactive | ✅ 3D WebGL |
| 📊 Data Updates | ✅ Simulated Real-time | ✅ Live API Data |
| 🔐 User Accounts | ✅ Demo Authentication | ✅ Full User Management |
| 💰 Subscriptions | ✅ Demo Flow | ✅ Real Payments |
| 📡 News Sources | ✅ Realistic Simulation | ✅ 100+ Live APIs |

## 🚢 Deployment

### **Vercel (Recommended)**
```bash
npm run build
vercel --prod
```

### **Docker**
```bash
docker build -t cloud-atlas .
docker run -p 3000:3000 cloud-atlas
```

### **Traditional Hosting**
```bash
npm run build
# Deploy contents of build/ directory
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md).

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Three.js** - For amazing 3D capabilities
- **React Router** - For excellent routing system
- **shadcn/ui** - For beautiful component library
- **Convex** - For real-time backend platform
- **All news sources** - For providing valuable information

## 📞 Support

- **Documentation**: [docs.cloudatlas.com](https://docs.cloudatlas.com)
- **Issues**: [GitHub Issues](https://github.com/your-username/cloud-atlas-3d-news/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/cloud-atlas-3d-news/discussions)
- **Email**: support@cloudatlas.com

---

**⭐ If you found this project helpful, please give it a star on GitHub!**

*Built with ❤️ for global news intelligence*
