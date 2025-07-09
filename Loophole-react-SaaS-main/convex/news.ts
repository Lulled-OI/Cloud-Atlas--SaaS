import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Define the news story schema
export const newsStorySchema = {
  id: v.string(),
  title: v.string(),
  content: v.string(),
  source: v.string(),
  platform: v.string(), // twitter, vk, line, etc.
  region: v.string(),
  country: v.string(),
  timestamp: v.number(),
  url: v.optional(v.string()),
  author: v.optional(v.string()),
  sentiment: v.number(), // -1 to 1
  category: v.string(),
  tags: v.array(v.string()),
  mentions: v.number(),
  shares: v.optional(v.number()),
  likes: v.optional(v.number()),
  coordinates: v.optional(v.object({
    lat: v.number(),
    lng: v.number()
  })),
  language: v.string(),
  verified: v.boolean(),
  trending: v.boolean()
};

// Get latest news stories with filters
export const getLatestNews = query({
  args: {
    limit: v.optional(v.number()),
    region: v.optional(v.string()),
    platform: v.optional(v.string()),
    category: v.optional(v.string()),
    timeframe: v.optional(v.number()) // hours
  },
  handler: async (ctx, args) => {
    const { limit = 50, region, platform, category, timeframe = 24 } = args;
    
    // Calculate timestamp cutoff
    const cutoffTime = Date.now() - (timeframe * 60 * 60 * 1000);
    
    // This would typically query your news database
    // For now, return simulated data
    const sampleNews = [
      {
        id: "1",
        title: "AI Revolution Continues with New Breakthrough",
        content: "Scientists announce major advancement in artificial intelligence...",
        source: "TechNews Global",
        platform: "twitter",
        region: "North America",
        country: "United States",
        timestamp: Date.now() - 3600000,
        sentiment: 0.7,
        category: "Technology",
        tags: ["AI", "Machine Learning", "Innovation"],
        mentions: 15420,
        shares: 3200,
        likes: 12500,
        language: "en",
        verified: true,
        trending: true
      },
      {
        id: "2", 
        title: "Climate Action Summit Reaches Historic Agreement",
        content: "World leaders unite on comprehensive climate strategy...",
        source: "Global Environmental Network",
        platform: "line",
        region: "Asia",
        country: "Japan",
        timestamp: Date.now() - 7200000,
        sentiment: 0.5,
        category: "Environment",
        tags: ["Climate", "Environment", "Politics"],
        mentions: 28900,
        language: "en",
        verified: true,
        trending: true
      }
    ];
    
    return sampleNews.filter(story => {
      if (region && story.region !== region) return false;
      if (platform && story.platform !== platform) return false;
      if (category && story.category !== category) return false;
      if (story.timestamp < cutoffTime) return false;
      return true;
    }).slice(0, limit);
  }
});

// Get trending topics globally
export const getTrendingTopics = query({
  args: {
    limit: v.optional(v.number()),
    region: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    const { limit = 10, region } = args;
    
    // Simulated trending topics data
    const trendingTopics = [
      {
        topic: "#ClimateAction",
        mentions: 45200,
        growth: 127,
        sentiment: 0.3,
        regions: ["Global"],
        category: "Environment"
      },
      {
        topic: "AI Regulation",
        mentions: 32100,
        growth: 89,
        sentiment: 0.1,
        regions: ["North America", "Europe"],
        category: "Technology"
      },
      {
        topic: "#WorldCup2024",
        mentions: 156000,
        growth: 245,
        sentiment: 0.8,
        regions: ["Global"],
        category: "Sports"
      }
    ];
    
    return trendingTopics
      .filter(topic => !region || topic.regions.includes(region))
      .slice(0, limit);
  }
});

// Get global news statistics
export const getGlobalStats = query({
  handler: async (ctx) => {
    // This would typically aggregate from your news database
    return {
      totalSources: 1247,
      activeStories: 34567,
      globalSentiment: 0.15,
      processingSpeed: 892,
      regionsActive: 52,
      platformsMonitored: 15,
      storiesLastHour: 2341,
      lastUpdated: Date.now()
    };
  }
});

// Get regional news density
export const getRegionalDensity = query({
  handler: async (ctx) => {
    // Simulated regional density data
    return [
      {
        region: "North America",
        country: "United States",
        density: 85,
        stories: 8500,
        sentiment: 0.2,
        topCategories: ["Technology", "Politics", "Economics"]
      },
      {
        region: "Europe", 
        country: "United Kingdom",
        density: 72,
        stories: 6200,
        sentiment: 0.1,
        topCategories: ["Politics", "Environment", "Economics"]
      },
      {
        region: "Asia",
        country: "China",
        density: 95,
        stories: 12400,
        sentiment: 0.3,
        topCategories: ["Economics", "Technology", "Culture"]
      }
    ];
  }
});

// Store news story (for data ingestion)
export const storeNewsStory = mutation({
  args: newsStorySchema,
  handler: async (ctx, args) => {
    // Store news story in database
    // This would typically save to your news collection
    return { success: true, id: args.id };
  }
});

// Update trending status
export const updateTrendingStatus = mutation({
  args: {
    storyId: v.string(),
    trending: v.boolean()
  },
  handler: async (ctx, args) => {
    // Update trending status in database
    return { success: true };
  }
});
