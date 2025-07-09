"use client";
import { useState, useEffect } from "react";
import { Globe, Activity, TrendingUp } from "lucide-react";

// Sample news data points for visualization
const newsData = [
  { country: "USA", headlines: 15, color: "#3B82F6", position: "top-1/4 left-1/2" },
  { country: "Europe", headlines: 12, color: "#10B981", position: "top-1/3 left-1/4" },
  { country: "Asia", headlines: 18, color: "#F59E0B", position: "top-1/2 right-1/4" },
  { country: "S.America", headlines: 8, color: "#EF4444", position: "bottom-1/3 left-1/3" },
  { country: "Africa", headlines: 6, color: "#8B5CF6", position: "bottom-1/4 right-1/3" },
];

export default function InteractiveGlobe() {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [pulsePhase, setPulsePhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulsePhase(prev => (prev + 1) % 360);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const totalHeadlines = newsData.reduce((sum, region) => sum + region.headlines, 0);

  return (
    <div className="w-full h-96 md:h-[500px] rounded-xl overflow-hidden bg-gradient-to-b from-slate-900 to-blue-900 relative">
      {/* Background Globe Visualization */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Main Globe */}
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border-2 border-blue-400/30 relative overflow-hidden">
            {/* Globe Grid Lines */}
            <div className="absolute inset-0">
              {[...Array(8)].map((_, i) => (
                <div
                  key={`lat-${i}`}
                  className="absolute w-full border-t border-blue-400/20"
                  style={{ top: `${(i + 1) * 12.5}%` }}
                />
              ))}
              {[...Array(8)].map((_, i) => (
                <div
                  key={`lng-${i}`}
                  className="absolute h-full border-l border-blue-400/20"
                  style={{ left: `${(i + 1) * 12.5}%` }}
                />
              ))}
            </div>

            {/* Continents (simplified shapes) */}
            <div className="absolute inset-0">
              {/* North America */}
              <div className="absolute w-8 h-12 bg-blue-500/20 rounded-lg top-1/4 left-1/3 transform -translate-x-1/2" />
              {/* Europe */}
              <div className="absolute w-6 h-8 bg-green-500/20 rounded top-1/3 left-1/2 transform -translate-x-1/2" />
              {/* Asia */}
              <div className="absolute w-12 h-16 bg-yellow-500/20 rounded-lg top-1/4 right-1/4" />
              {/* Africa */}
              <div className="absolute w-8 h-14 bg-purple-500/20 rounded-lg bottom-1/3 left-1/2 transform -translate-x-1/2" />
              {/* South America */}
              <div className="absolute w-6 h-12 bg-red-500/20 rounded-lg bottom-1/4 left-1/3" />
            </div>

            {/* News Activity Points */}
            {newsData.map((region, index) => (
              <div
                key={region.country}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer ${region.position}`}
                onMouseEnter={() => setActiveRegion(region.country)}
                onMouseLeave={() => setActiveRegion(null)}
              >
                {/* Pulsing Point */}
                <div className="relative">
                  <div 
                    className="w-3 h-3 rounded-full animate-pulse"
                    style={{ 
                      backgroundColor: region.color,
                      boxShadow: `0 0 20px ${region.color}50`
                    }}
                  />
                  {/* Expanding Ring */}
                  <div 
                    className="absolute inset-0 w-6 h-6 -m-1.5 rounded-full border-2 animate-ping"
                    style={{ 
                      borderColor: region.color,
                      opacity: 0.4
                    }}
                  />
                </div>

                {/* Hover Tooltip */}
                {activeRegion === region.country && (
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white dark:bg-slate-800 rounded-lg p-2 shadow-lg border text-xs whitespace-nowrap z-10">
                    <div className="font-semibold">{region.country}</div>
                    <div className="text-muted-foreground">{region.headlines} stories</div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Rotation Animation */}
          <div 
            className="absolute inset-0 w-64 h-64 md:w-80 md:h-80 rounded-full border border-blue-400/40"
            style={{
              transform: `rotate(${pulsePhase}deg)`,
              borderStyle: 'dashed'
            }}
          />
        </div>
      </div>

      {/* Info Overlay */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="flex items-center justify-center gap-1 mb-1">
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">Global</span>
              </div>
              <div className="text-xl font-bold">{totalHeadlines}</div>
              <div className="text-xs text-blue-200">Active Stories</div>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 mb-1">
                <Activity className="w-4 h-4" />
                <span className="text-sm font-medium">Live</span>
              </div>
              <div className="text-xl font-bold">{newsData.length}</div>
              <div className="text-xs text-blue-200">Regions</div>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 mb-1">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">Trending</span>
              </div>
              <div className="text-xl font-bold">+{Math.floor(Math.random() * 50) + 20}%</div>
              <div className="text-xs text-blue-200">Growth</div>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 mb-1">
                <span className="text-sm font-medium">Updated</span>
              </div>
              <div className="text-sm font-bold">Live</div>
              <div className="text-xs text-blue-200">Real-time</div>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute top-4 left-4">
        <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white text-xs">
          <div className="font-medium mb-2">News Activity</div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span>High Activity</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>Medium Activity</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <span>Emerging Trends</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
