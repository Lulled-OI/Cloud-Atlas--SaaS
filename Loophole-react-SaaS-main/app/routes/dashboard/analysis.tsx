"use client";

import { useState, useEffect } from "react";
import { Search, Filter, TrendingUp, Globe, BarChart3, Clock, Zap } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";

// Simulated real-time news analysis data
const generateAnalysisData = () => ({
  query: "",
  insights: [
    {
      type: "trending",
      title: "AI Technology Surge",
      description: "Mentions of AI technology increased 340% in the last 6 hours across global platforms",
      sentiment: 0.65,
      regions: ["North America", "Asia", "Europe"],
      confidence: 92
    },
    {
      type: "emerging",
      title: "Climate Policy Discussions",
      description: "New climate policy proposals trending across European social media",
      sentiment: 0.1,
      regions: ["Europe"],
      confidence: 78
    },
    {
      type: "alert",
      title: "Market Volatility Detected",
      description: "Increased financial news activity suggests potential market movement",
      sentiment: -0.2,
      regions: ["Global"],
      confidence: 85
    }
  ],
  newsStories: [
    {
      id: "1",
      title: "Revolutionary AI Breakthrough in Medical Diagnosis",
      source: "TechNews Global",
      region: "North America",
      sentiment: 0.8,
      category: "Technology",
      timestamp: Date.now() - 3600000,
      mentions: 15420,
      summary: "New AI system demonstrates 99.1% accuracy in early cancer detection..."
    },
    {
      id: "2", 
      title: "European Union Announces Green Energy Initiative",
      source: "EU Environmental Times",
      region: "Europe",
      sentiment: 0.6,
      category: "Environment",
      timestamp: Date.now() - 7200000,
      mentions: 12800,
      summary: "€50 billion investment plan targets carbon neutrality by 2035..."
    },
    {
      id: "3",
      title: "Asian Markets React to Trade Agreement",
      source: "Asia Pacific Finance",
      region: "Asia",
      sentiment: 0.3,
      category: "Economics",
      timestamp: Date.now() - 1800000,
      mentions: 9600,
      summary: "New trade partnerships expected to boost regional economic growth..."
    }
  ],
  globalMetrics: {
    totalStories: 34567,
    trendingTopics: 247,
    sentimentScore: 0.15,
    processingSpeed: 892
  }
});

export default function NewsAnalysis() {
  const [analysisData, setAnalysisData] = useState(generateAnalysisData());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setAnalysisData(generateAnalysisData());
      setLastUpdate(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleSearch = async () => {
    setIsAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      setAnalysisData(generateAnalysisData());
      setIsAnalyzing(false);
    }, 2000);
  };

  const getSentimentColor = (sentiment: number) => {
    if (sentiment > 0.3) return "text-green-600";
    if (sentiment < -0.3) return "text-red-600";
    return "text-yellow-600";
  };

  const getSentimentLabel = (sentiment: number) => {
    if (sentiment > 0.3) return "Positive";
    if (sentiment < -0.3) return "Negative";
    return "Neutral";
  };

  return (
    <div className="flex flex-col w-full py-6 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Global News Analysis
            </h1>
            <p className="text-muted-foreground">
              AI-powered insights from global news sources and social media platforms
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>Last updated: {lastUpdate.toLocaleTimeString()}</span>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <Input
              placeholder="Search global news trends, topics, or events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-base"
            />
          </div>
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="north-america">North America</SelectItem>
              <SelectItem value="europe">Europe</SelectItem>
              <SelectItem value="asia">Asia</SelectItem>
              <SelectItem value="south-america">South America</SelectItem>
              <SelectItem value="africa">Africa</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="politics">Politics</SelectItem>
              <SelectItem value="economics">Economics</SelectItem>
              <SelectItem value="environment">Environment</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleSearch} disabled={isAnalyzing} className="bg-gradient-to-r from-blue-500 to-purple-600">
            {isAnalyzing ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Analyzing...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                Analyze
              </div>
            )}
          </Button>
        </div>
      </div>

      {/* Global Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Stories</p>
                <p className="text-2xl font-bold">{analysisData.globalMetrics.totalStories.toLocaleString()}</p>
              </div>
              <Globe className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Trending Topics</p>
                <p className="text-2xl font-bold">{analysisData.globalMetrics.trendingTopics}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Global Sentiment</p>
                <p className={`text-2xl font-bold ${getSentimentColor(analysisData.globalMetrics.sentimentScore)}`}>
                  {analysisData.globalMetrics.sentimentScore > 0 ? '+' : ''}{(analysisData.globalMetrics.sentimentScore * 100).toFixed(1)}%
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Processing Speed</p>
                <p className="text-2xl font-bold">{analysisData.globalMetrics.processingSpeed}/s</p>
              </div>
              <Zap className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analysis Tabs */}
      <Tabs defaultValue="insights" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="stories">Latest Stories</TabsTrigger>
          <TabsTrigger value="trends">Trend Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="insights" className="space-y-4">
          <div className="grid gap-4">
            {analysisData.insights.map((insight, index) => (
              <Card key={index} className="transition-all hover:shadow-md">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{insight.title}</CardTitle>
                      <CardDescription>{insight.description}</CardDescription>
                    </div>
                    <Badge variant="outline" className="capitalize">
                      {insight.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Sentiment:</span>
                      <span className={getSentimentColor(insight.sentiment)}>
                        {getSentimentLabel(insight.sentiment)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Confidence:</span>
                      <span className="font-medium">{insight.confidence}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Regions:</span>
                      <div className="flex gap-1">
                        {insight.regions.map((region, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {region}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="stories" className="space-y-4">
          <div className="grid gap-4">
            {analysisData.newsStories.map((story) => (
              <Card key={story.id} className="transition-all hover:shadow-md">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1 flex-1">
                      <CardTitle className="text-lg leading-tight">{story.title}</CardTitle>
                      <CardDescription>{story.summary}</CardDescription>
                    </div>
                    <div className="text-right space-y-1">
                      <Badge variant="outline">{story.category}</Badge>
                      <p className="text-xs text-muted-foreground">
                        {new Date(story.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Source:</span>
                      <span className="font-medium">{story.source}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Region:</span>
                      <Badge variant="secondary" className="text-xs">{story.region}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Mentions:</span>
                      <span className="font-medium">{story.mentions.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Sentiment:</span>
                      <span className={getSentimentColor(story.sentiment)}>
                        {getSentimentLabel(story.sentiment)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Trend Analysis Dashboard</CardTitle>
              <CardDescription>
                Advanced trend analysis and prediction models coming soon
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 space-y-4">
                <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto" />
                <p className="text-muted-foreground">
                  Advanced trend analysis features are being developed. This will include:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Predictive trend modeling</li>
                  <li>• Cross-platform sentiment correlation</li>
                  <li>• Viral content prediction</li>
                  <li>• Geopolitical event forecasting</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
