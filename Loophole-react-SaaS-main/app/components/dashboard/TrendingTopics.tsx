"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { TrendingUp, TrendingDown, Hash, Globe, Clock } from "lucide-react";

// Simulated trending topics data
const generateTrendingTopics = () => [
  {
    id: 1,
    topic: "#ClimateAction",
    mentions: Math.floor(Math.random() * 50000) + 10000,
    change: Math.floor(Math.random() * 200) - 100,
    regions: ["North America", "Europe", "Asia"],
    sentiment: 0.3,
    category: "Environment"
  },
  {
    id: 2,
    topic: "AI Revolution",
    mentions: Math.floor(Math.random() * 80000) + 20000,
    change: Math.floor(Math.random() * 150) + 50,
    regions: ["Global"],
    sentiment: 0.5,
    category: "Technology"
  },
  {
    id: 3,
    topic: "Economic Outlook",
    mentions: Math.floor(Math.random() * 40000) + 15000,
    change: Math.floor(Math.random() * 100) - 50,
    regions: ["North America", "Europe"],
    sentiment: -0.1,
    category: "Economics"
  },
  {
    id: 4,
    topic: "#WorldCup2024",
    mentions: Math.floor(Math.random() * 120000) + 30000,
    change: Math.floor(Math.random() * 300) + 100,
    regions: ["Global"],
    sentiment: 0.8,
    category: "Sports"
  },
  {
    id: 5,
    topic: "Space Exploration",
    mentions: Math.floor(Math.random() * 25000) + 8000,
    change: Math.floor(Math.random() * 80) + 20,
    regions: ["North America", "Asia"],
    sentiment: 0.6,
    category: "Science"
  },
  {
    id: 6,
    topic: "Political Elections",
    mentions: Math.floor(Math.random() * 60000) + 18000,
    change: Math.floor(Math.random() * 120) - 60,
    regions: ["Europe", "South America"],
    sentiment: -0.2,
    category: "Politics"
  }
];

export default function TrendingTopics() {
  const [topics, setTopics] = useState(generateTrendingTopics());
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTopics(generateTrendingTopics());
      setLastUpdate(new Date());
    }, 15000); // Update every 15 seconds

    return () => clearInterval(interval);
  }, []);

  const categories = ["All", "Technology", "Politics", "Environment", "Economics", "Sports", "Science"];
  
  const filteredTopics = selectedCategory === "All" 
    ? topics 
    : topics.filter(topic => topic.category === selectedCategory);

  const formatMentions = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <Card className="h-[500px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Hash className="w-5 h-5" />
          Trending Topics
        </CardTitle>
        <CardDescription>
          Real-time global conversation trends across all platforms
        </CardDescription>
        
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 pt-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="text-xs"
            >
              {category}
            </Button>
          ))}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4 overflow-y-auto h-[320px]">
        {filteredTopics.slice(0, 8).map((topic, index) => (
          <div 
            key={topic.id} 
            className="flex items-center justify-between p-3 rounded-lg border bg-gradient-to-r from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 hover:shadow-md transition-shadow"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-sm">{topic.topic}</span>
                <Badge 
                  variant={topic.sentiment > 0.2 ? "default" : topic.sentiment < -0.2 ? "destructive" : "secondary"}
                  className="text-xs"
                >
                  {topic.category}
                </Badge>
              </div>
              
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Globe className="w-3 h-3" />
                  {formatMentions(topic.mentions)} mentions
                </span>
                
                <span className="flex items-center gap-1">
                  {topic.change > 0 ? (
                    <TrendingUp className="w-3 h-3 text-green-500" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-red-500" />
                  )}
                  {Math.abs(topic.change)}%
                </span>
              </div>
              
              <div className="mt-1">
                <div className="flex flex-wrap gap-1">
                  {topic.regions.slice(0, 3).map((region, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {region}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-lg font-bold">#{index + 1}</div>
              <div 
                className={`text-xs ${
                  topic.sentiment > 0.2 
                    ? "text-green-500" 
                    : topic.sentiment < -0.2 
                    ? "text-red-500" 
                    : "text-yellow-500"
                }`}
              >
                {topic.sentiment > 0.2 
                  ? "Positive" 
                  : topic.sentiment < -0.2 
                  ? "Negative" 
                  : "Neutral"}
              </div>
            </div>
          </div>
        ))}
        
        <div className="pt-4 border-t">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Last updated: {lastUpdate.toLocaleTimeString()}
            </span>
            <span>Updates every 15 seconds</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
