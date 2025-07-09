"use client";
import React, { Suspense, lazy, useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Globe, Loader2 } from "lucide-react";

// Lazy load Three.js components to prevent SSR issues
const ThreeGlobe = lazy(() => import("./ThreeGlobe"));

// Fallback 2D globe component
function FallbackGlobe({ newsData }: { newsData: any[] }) {
  return (
    <div className="w-full h-full rounded-xl overflow-hidden bg-gradient-to-b from-slate-900 to-blue-900 flex items-center justify-center">
      <div className="text-center space-y-4">
        <Globe className="w-16 h-16 text-blue-400 mx-auto animate-spin" />
        <div className="text-white">
          <h3 className="text-lg font-semibold">Global News Activity</h3>
          <p className="text-blue-200">
            {newsData.reduce((sum, region) => sum + region.headlines, 0)} active stories worldwide
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs text-blue-200">
          {newsData.slice(0, 4).map((region, idx) => (
            <div key={idx} className="bg-blue-800/30 rounded p-2">
              <div className="font-medium">{region.country}</div>
              <div>{region.headlines} stories</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.log('3D Globe Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

// Real-time news data simulation
const generateNewsData = () => [
  { 
    position: [0, 0.8, 0.6], 
    country: "United States", 
    headlines: Math.floor(Math.random() * 20) + 10, 
    color: "#3B82F6",
    trending: ["AI Regulation", "Climate Summit", "Tech Earnings"],
    sentiment: 0.2
  },
  { 
    position: [-0.7, 0.2, 0.7], 
    country: "Europe", 
    headlines: Math.floor(Math.random() * 15) + 8, 
    color: "#10B981",
    trending: ["EU Elections", "Energy Crisis", "Migration"],
    sentiment: -0.1
  },
  { 
    position: [0.8, 0.3, 0.5], 
    country: "Asia Pacific", 
    headlines: Math.floor(Math.random() * 25) + 15, 
    color: "#F59E0B",
    trending: ["Economic Growth", "Trade Wars", "Technology"],
    sentiment: 0.3
  },
  { 
    position: [-0.5, -0.6, 0.6], 
    country: "South America", 
    headlines: Math.floor(Math.random() * 10) + 5, 
    color: "#EF4444",
    trending: ["Political Unrest", "Amazon Forest", "Economy"],
    sentiment: -0.2
  },
  { 
    position: [0.6, -0.3, 0.8], 
    country: "Africa", 
    headlines: Math.floor(Math.random() * 12) + 6, 
    color: "#8B5CF6",
    trending: ["Development", "Elections", "Climate"],
    sentiment: 0.1
  },
];

export default function NewsGlobe() {
  const [newsData, setNewsData] = useState(generateNewsData());
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [use3D, setUse3D] = useState(false); // Start with 2D by default

  useEffect(() => {
    const interval = setInterval(() => {
      setNewsData(generateNewsData());
      setLastUpdate(new Date());
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const totalHeadlines = newsData.reduce((sum, region) => sum + region.headlines, 0);

  return (
    <Card className="h-[500px]">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Global News Activity
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              Live
            </Badge>
            <button 
              onClick={() => setUse3D(!use3D)}
              className="text-xs text-blue-500 hover:text-blue-600 underline"
            >
              {use3D ? "Switch to 2D" : "Try 3D View"}
            </button>
          </div>
        </CardTitle>
        <CardDescription>
          Real-time news tracking across {newsData.length} regions • {totalHeadlines} active stories
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[400px] p-0">
        <div className="w-full h-full">
          {use3D ? (
            <Suspense 
              fallback={
                <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-800">
                  <div className="text-center space-y-2">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-500" />
                    <p className="text-sm text-muted-foreground">Loading 3D Globe...</p>
                  </div>
                </div>
              }
            >
              <ErrorBoundary fallback={<FallbackGlobe newsData={newsData} />}>
                <ThreeGlobe newsData={newsData} />
              </ErrorBoundary>
            </Suspense>
          ) : (
            <FallbackGlobe newsData={newsData} />
          )}
        </div>
        <div className="p-4 border-t">
          <p className="text-xs text-muted-foreground">
            Last updated: {lastUpdate.toLocaleTimeString()} • Click regions for details
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
