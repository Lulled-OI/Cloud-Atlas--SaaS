import { Button } from "~/components/ui/button";
import { ChevronRight, Globe, Zap, BarChart3, Shield, Rss, TrendingUp } from "lucide-react";
import { Link } from "react-router";
import InteractiveGlobe from "~/components/InteractiveGlobe";

export default function ContentSection() {
  return (
    <>
      {/* Hero Section */}
      <section id="hero" className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-500 via-purple-600 to-blue-500 bg-clip-text text-transparent">
              Cloud Atlas
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Experience global news intelligence through interactive 3D visualization. 
              Aggregate, analyze, and explore news from every corner of the world in real-time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                <Link to="/sign-up" className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Start Exploring
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50">
                <Link to="#globe" className="flex items-center gap-2">
                  Watch Demo
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Globe Section */}
      <section id="globe" className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center space-y-6 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Global News Intelligence in 3D
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Visualize news trends, social media activity, and global events in an interactive 3D environment.
              Each pulse represents real-time news activity from our global data sources.
            </p>
          </div>
          <InteractiveGlobe />
          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              🌟 Hover over the points to see live news data • ⚡ Auto-rotating globe with real-time updates
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Powerful Features for Global News Intelligence
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Cloud Atlas aggregates news from dozens of global sources and social media platforms,
              providing unprecedented insights into worldwide events and trends.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-4 p-6 rounded-xl border bg-gradient-to-b from-blue-50 to-white dark:from-blue-950 dark:to-slate-900">
              <Rss className="w-10 h-10 text-blue-500" />
              <h3 className="text-xl font-semibold">Multi-Platform Aggregation</h3>
              <p className="text-muted-foreground">
                Collect news from Twitter, VK, Line, WeChat, Telegram, major news outlets, 
                and regional social media across all continents in real-time.
              </p>
            </div>

            <div className="space-y-4 p-6 rounded-xl border bg-gradient-to-b from-purple-50 to-white dark:from-purple-950 dark:to-slate-900">
              <Globe className="w-10 h-10 text-purple-500" />
              <h3 className="text-xl font-semibold">3D Visualization</h3>
              <p className="text-muted-foreground">
                Interactive 3D globe interface that displays news density, trending topics, 
                and geopolitical events with stunning visual clarity and depth.
              </p>
            </div>

            <div className="space-y-4 p-6 rounded-xl border bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-slate-900">
              <Zap className="w-10 h-10 text-green-500" />
              <h3 className="text-xl font-semibold">Real-Time Processing</h3>
              <p className="text-muted-foreground">
                Advanced AI algorithms process millions of posts and articles in real-time,
                delivering instant insights as global events unfold.
              </p>
            </div>

            <div className="space-y-4 p-6 rounded-xl border bg-gradient-to-b from-orange-50 to-white dark:from-orange-950 dark:to-slate-900">
              <BarChart3 className="w-10 h-10 text-orange-500" />
              <h3 className="text-xl font-semibold">Advanced Analytics</h3>
              <p className="text-muted-foreground">
                Sentiment analysis, trend prediction, influence mapping, and topic clustering 
                across multiple languages and cultural contexts.
              </p>
            </div>

            <div className="space-y-4 p-6 rounded-xl border bg-gradient-to-b from-red-50 to-white dark:from-red-950 dark:to-slate-900">
              <Shield className="w-10 h-10 text-red-500" />
              <h3 className="text-xl font-semibold">Verified Sources</h3>
              <p className="text-muted-foreground">
                Sophisticated fact-checking and source verification ensures high-quality, 
                reliable news data from trusted outlets and verified social media accounts.
              </p>
            </div>

            <div className="space-y-4 p-6 rounded-xl border bg-gradient-to-b from-indigo-50 to-white dark:from-indigo-950 dark:to-slate-900">
              <TrendingUp className="w-10 h-10 text-indigo-500" />
              <h3 className="text-xl font-semibold">Trend Forecasting</h3>
              <p className="text-muted-foreground">
                Machine learning models predict emerging trends, viral content, 
                and potential geopolitical events before they reach mainstream media.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Global Sources Section */}
      <section id="analytics" className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Connected to Global Information Networks
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Cloud Atlas integrates with news sources and social media platforms from every continent,
              providing comprehensive coverage of global events and conversations.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">NA</span>
              </div>
              <h3 className="font-semibold">North America</h3>
              <p className="text-sm text-muted-foreground">Twitter, Facebook, Instagram, CNN, Fox News, New York Times</p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-green-600">EU</span>
              </div>
              <h3 className="font-semibold">Europe</h3>
              <p className="text-sm text-muted-foreground">VK, Telegram, BBC, Le Monde, Der Spiegel, El País</p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-yellow-600">AS</span>
              </div>
              <h3 className="font-semibold">Asia</h3>
              <p className="text-sm text-muted-foreground">WeChat, Line, Weibo, NHK, Times of India, SCMP</p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-purple-600">SA</span>
              </div>
              <h3 className="font-semibold">South America</h3>
              <p className="text-sm text-muted-foreground">WhatsApp, Folha, Clarín, El Universal, Globo</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="gap-2 border-blue-500 text-blue-500 hover:bg-blue-50"
            >
              <Link to="/sign-up">
                <Globe className="w-5 h-5" />
                Start Your Global Analysis
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
