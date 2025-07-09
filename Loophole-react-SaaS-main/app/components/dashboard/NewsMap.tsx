"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { MapPin, Activity, TrendingUp, AlertCircle } from "lucide-react";

// Simulated global news heatmap data
const generateHeatmapData = () => [
  {
    country: "United States",
    coordinates: { lat: 39.8283, lng: -98.5795 },
    intensity: Math.floor(Math.random() * 100) + 50,
    topStory: "AI regulation hearing continues in Congress",
    category: "Technology",
    sentiment: 0.2,
    sources: 45
  },
  {
    country: "China",
    coordinates: { lat: 35.8617, lng: 104.1954 },
    intensity: Math.floor(Math.random() * 80) + 40,
    topStory: "Economic growth targets adjusted for 2024",
    category: "Economics", 
    sentiment: 0.1,
    sources: 32
  },
  {
    country: "United Kingdom",
    coordinates: { lat: 55.3781, lng: -3.4360 },
    intensity: Math.floor(Math.random() * 70) + 30,
    topStory: "Climate summit preparations accelerate",
    category: "Environment",
    sentiment: 0.4,
    sources: 28
  },
  {
    country: "Germany",
    coordinates: { lat: 51.1657, lng: 10.4515 },
    intensity: Math.floor(Math.random() * 60) + 25,
    topStory: "EU energy policy reforms proposed",
    category: "Politics",
    sentiment: -0.1,
    sources: 24
  },
  {
    country: "Japan",
    coordinates: { lat: 36.2048, lng: 138.2529 },
    intensity: Math.floor(Math.random() * 55) + 20,
    topStory: "Tech innovation drives economic recovery",
    category: "Technology",
    sentiment: 0.3,
    sources: 19
  },
  {
    country: "Brazil",
    coordinates: { lat: -14.2350, lng: -51.9253 },
    intensity: Math.floor(Math.random() * 65) + 35,
    topStory: "Amazon conservation efforts expand",
    category: "Environment",
    sentiment: 0.5,
    sources: 22
  },
  {
    country: "India",
    coordinates: { lat: 20.5937, lng: 78.9629 },
    intensity: Math.floor(Math.random() * 75) + 40,
    topStory: "Digital infrastructure investment announced",
    category: "Technology",
    sentiment: 0.4,
    sources: 31
  },
  {
    country: "Russia",
    coordinates: { lat: 61.5240, lng: 105.3188 },
    intensity: Math.floor(Math.random() * 50) + 20,
    topStory: "Energy export agreements under review",
    category: "Economics",
    sentiment: -0.2,
    sources: 16
  },
  {
    country: "South Korea",
    coordinates: { lat: 35.9078, lng: 127.7669 },
    intensity: Math.floor(Math.random() * 45) + 15,
    topStory: "K-pop cultural influence study released",
    category: "Culture",
    sentiment: 0.6,
    sources: 18
  },
  {
    country: "Australia",
    coordinates: { lat: -25.2744, lng: 133.7751 },
    intensity: Math.floor(Math.random() * 40) + 10,
    topStory: "Renewable energy targets updated",
    category: "Environment",
    sentiment: 0.3,
    sources: 14
  }
];

export default function NewsMap() {
  const [heatmapData, setHeatmapData] = useState(generateHeatmapData());
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setHeatmapData(generateHeatmapData());
      setLastUpdate(new Date());
    }, 20000); // Update every 20 seconds

    return () => clearInterval(interval);
  }, []);

  const getIntensityColor = (intensity: number) => {
    if (intensity >= 80) return "bg-red-500";
    if (intensity >= 60) return "bg-orange-500";
    if (intensity >= 40) return "bg-yellow-500";
    if (intensity >= 20) return "bg-blue-500";
    return "bg-green-500";
  };

  const getIntensityLabel = (intensity: number) => {
    if (intensity >= 80) return "Very High";
    if (intensity >= 60) return "High";
    if (intensity >= 40) return "Medium";
    if (intensity >= 20) return "Low";
    return "Very Low";
  };

  const getSentimentColor = (sentiment: number) => {
    if (sentiment > 0.2) return "text-green-600";
    if (sentiment < -0.2) return "text-red-600";
    return "text-yellow-600";
  };

  const topRegions = [...heatmapData]
    .sort((a, b) => b.intensity - a.intensity)
    .slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Global News Heatmap
        </CardTitle>
        <CardDescription>
          News activity intensity across major regions and countries
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {/* Heatmap Visual Representation */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-3">Activity Intensity by Region</h3>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
            {topRegions.map((region, index) => (
              <div
                key={region.country}
                className="p-3 rounded-lg border cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedRegion(region.country)}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-3 h-3 rounded-full ${getIntensityColor(region.intensity)}`} />
                  <span className="text-sm font-medium">{region.country}</span>
                </div>
                <div className="text-xs text-muted-foreground mb-1">
                  {getIntensityLabel(region.intensity)} Activity
                </div>
                <div className="text-xs">
                  <Badge variant="outline" className="text-xs">
                    {region.sources} sources
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed View */}
        {selectedRegion && (
          <div className="mb-6 p-4 rounded-lg bg-slate-50 dark:bg-slate-800 border">
            {(() => {
              const region = heatmapData.find(r => r.country === selectedRegion);
              if (!region) return null;
              
              return (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">{region.country}</h4>
                    <button 
                      onClick={() => setSelectedRegion(null)}
                      className="text-xs text-muted-foreground hover:text-foreground"
                    >
                      ✕ Close
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4" />
                      <span className="text-sm">Top Story:</span>
                      <span className="text-sm font-medium">{region.topStory}</span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <div className={`w-2 h-2 rounded-full ${getIntensityColor(region.intensity)}`} />
                        <span>{region.intensity}/100 intensity</span>
                      </div>
                      
                      <Badge variant="secondary">{region.category}</Badge>
                      
                      <span className={getSentimentColor(region.sentiment)}>
                        {region.sentiment > 0.2 ? "Positive" : region.sentiment < -0.2 ? "Negative" : "Neutral"} sentiment
                      </span>
                    </div>
                    
                    <div className="text-xs text-muted-foreground">
                      Active sources: {region.sources} • Coordinates: {region.coordinates.lat.toFixed(2)}, {region.coordinates.lng.toFixed(2)}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* Legend and Stats */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-semibold mb-3">Intensity Legend</h3>
            <div className="space-y-2">
              {[
                { range: "80-100", color: "bg-red-500", label: "Very High" },
                { range: "60-79", color: "bg-orange-500", label: "High" },
                { range: "40-59", color: "bg-yellow-500", label: "Medium" },
                { range: "20-39", color: "bg-blue-500", label: "Low" },
                { range: "0-19", color: "bg-green-500", label: "Very Low" }
              ].map((item) => (
                <div key={item.range} className="flex items-center gap-2 text-xs">
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <span>{item.label} ({item.range})</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-3">Global Stats</h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span>Total regions monitored:</span>
                <span className="font-medium">{heatmapData.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Active news sources:</span>
                <span className="font-medium">{heatmapData.reduce((sum, r) => sum + r.sources, 0)}</span>
              </div>
              <div className="flex justify-between">
                <span>Avg intensity:</span>
                <span className="font-medium">
                  {Math.round(heatmapData.reduce((sum, r) => sum + r.intensity, 0) / heatmapData.length)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Last updated:</span>
                <span className="font-medium">{lastUpdate.toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <AlertCircle className="w-3 h-3" />
            <span>Click on regions above for detailed analysis • Data updates every 20 seconds</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
