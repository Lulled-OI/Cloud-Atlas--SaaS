// Global news aggregation service integrations for Cloud Atlas

export interface NewsSource {
  id: string;
  name: string;
  platform: string;
  region: string;
  language: string;
  apiEndpoint?: string;
  rateLimit: number; // requests per hour
  authentication: 'api_key' | 'oauth' | 'public';
  dataFormat: 'json' | 'xml' | 'rss';
}

export interface NewsStory {
  id: string;
  title: string;
  content: string;
  source: string;
  platform: string;
  author?: string;
  url?: string;
  timestamp: number;
  region: string;
  country: string;
  language: string;
  sentiment: number; // -1 to 1
  category: string;
  tags: string[];
  metrics: {
    mentions: number;
    shares?: number;
    likes?: number;
    views?: number;
  };
  coordinates?: {
    lat: number;
    lng: number;
  };
  verified: boolean;
  trending: boolean;
}

// News source configurations
export const NEWS_SOURCES: Record<string, NewsSource[]> = {
  "North America": [
    {
      id: "twitter_us",
      name: "Twitter/X",
      platform: "twitter",
      region: "North America",
      language: "en",
      rateLimit: 300,
      authentication: "oauth",
      dataFormat: "json"
    },
    {
      id: "reddit_news",
      name: "Reddit News",
      platform: "reddit",
      region: "North America", 
      language: "en",
      rateLimit: 100,
      authentication: "api_key",
      dataFormat: "json"
    },
    {
      id: "cnn_rss",
      name: "CNN",
      platform: "news",
      region: "North America",
      language: "en",
      apiEndpoint: "http://rss.cnn.com/rss/edition.rss",
      rateLimit: 60,
      authentication: "public",
      dataFormat: "rss"
    }
  ],
  
  "Europe": [
    {
      id: "vk_news",
      name: "VKontakte",
      platform: "vk",
      region: "Europe",
      language: "ru",
      rateLimit: 100,
      authentication: "api_key",
      dataFormat: "json"
    },
    {
      id: "telegram_channels",
      name: "Telegram News Channels",
      platform: "telegram", 
      region: "Europe",
      language: "multi",
      rateLimit: 300,
      authentication: "api_key",
      dataFormat: "json"
    },
    {
      id: "bbc_rss",
      name: "BBC News",
      platform: "news",
      region: "Europe",
      language: "en",
      apiEndpoint: "http://feeds.bbci.co.uk/news/rss.xml",
      rateLimit: 60,
      authentication: "public",
      dataFormat: "rss"
    }
  ],
  
  "Asia": [
    {
      id: "weibo_trends", 
      name: "Weibo",
      platform: "weibo",
      region: "Asia",
      language: "zh",
      rateLimit: 150,
      authentication: "oauth",
      dataFormat: "json"
    },
    {
      id: "line_news",
      name: "Line News",
      platform: "line",
      region: "Asia",
      language: "ja",
      rateLimit: 200,
      authentication: "api_key",
      dataFormat: "json"
    },
    {
      id: "wechat_public",
      name: "WeChat Public Accounts",
      platform: "wechat",
      region: "Asia",
      language: "zh",
      rateLimit: 100,
      authentication: "api_key",
      dataFormat: "json"
    }
  ],
  
  "South America": [
    {
      id: "whatsapp_status",
      name: "WhatsApp Status Updates",
      platform: "whatsapp",
      region: "South America",
      language: "es",
      rateLimit: 50,
      authentication: "api_key",
      dataFormat: "json"
    },
    {
      id: "folha_rss",
      name: "Folha de S.Paulo",
      platform: "news",
      region: "South America",
      language: "pt",
      apiEndpoint: "https://feeds.folha.uol.com.br/folha/topicos/",
      rateLimit: 60,
      authentication: "public",
      dataFormat: "rss"
    }
  ],
  
  "Africa": [
    {
      id: "african_news_rss",
      name: "African News Network",
      platform: "news",
      region: "Africa",
      language: "en",
      rateLimit: 60,
      authentication: "public",
      dataFormat: "rss"
    }
  ],
  
  "Oceania": [
    {
      id: "abc_australia",
      name: "ABC News Australia",
      platform: "news",
      region: "Oceania",
      language: "en",
      apiEndpoint: "https://www.abc.net.au/news/feed/",
      rateLimit: 60,
      authentication: "public",
      dataFormat: "rss"
    }
  ]
};

// Base API integration class
export abstract class NewsIntegration {
  protected source: NewsSource;
  protected apiKey?: string;
  protected accessToken?: string;

  constructor(source: NewsSource, credentials?: { apiKey?: string; accessToken?: string }) {
    this.source = source;
    this.apiKey = credentials?.apiKey;
    this.accessToken = credentials?.accessToken;
  }

  abstract fetchLatestNews(limit?: number): Promise<NewsStory[]>;
  abstract fetchTrendingTopics(limit?: number): Promise<string[]>;
  
  protected async makeRequest(url: string, options?: RequestInit): Promise<any> {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...this.getAuthHeaders(),
          ...options?.headers
        }
      });
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error fetching from ${this.source.name}:`, error);
      throw error;
    }
  }
  
  protected getAuthHeaders(): Record<string, string> {
    const headers: Record<string, string> = {};
    
    if (this.source.authentication === 'api_key' && this.apiKey) {
      headers['Authorization'] = `Bearer ${this.apiKey}`;
    } else if (this.source.authentication === 'oauth' && this.accessToken) {
      headers['Authorization'] = `Bearer ${this.accessToken}`;
    }
    
    return headers;
  }
  
  protected categorizeContent(content: string, title: string): string {
    const text = (title + ' ' + content).toLowerCase();
    
    if (text.includes('technology') || text.includes('ai') || text.includes('tech')) return 'Technology';
    if (text.includes('politics') || text.includes('election') || text.includes('government')) return 'Politics';
    if (text.includes('economy') || text.includes('business') || text.includes('finance')) return 'Economics';
    if (text.includes('climate') || text.includes('environment') || text.includes('green')) return 'Environment';
    if (text.includes('sports') || text.includes('football') || text.includes('soccer')) return 'Sports';
    if (text.includes('health') || text.includes('medical') || text.includes('covid')) return 'Health';
    if (text.includes('culture') || text.includes('entertainment') || text.includes('celebrity')) return 'Culture';
    
    return 'General';
  }
  
  protected analyzeSentiment(content: string): number {
    // Simple sentiment analysis - in production, use a proper NLP service
    const positiveWords = ['good', 'great', 'excellent', 'positive', 'success', 'growth', 'win', 'achievement'];
    const negativeWords = ['bad', 'terrible', 'negative', 'crisis', 'problem', 'fail', 'disaster', 'decline'];
    
    const words = content.toLowerCase().split(/\s+/);
    let score = 0;
    
    words.forEach(word => {
      if (positiveWords.includes(word)) score += 0.1;
      if (negativeWords.includes(word)) score -= 0.1;
    });
    
    return Math.max(-1, Math.min(1, score));
  }
}

// Twitter/X Integration
export class TwitterIntegration extends NewsIntegration {
  async fetchLatestNews(limit = 10): Promise<NewsStory[]> {
    // Twitter API v2 implementation
    const url = `https://api.twitter.com/2/tweets/search/recent?query=news&max_results=${limit}`;
    
    try {
      const data = await this.makeRequest(url);
      
      return data.data?.map((tweet: any) => ({
        id: tweet.id,
        title: tweet.text.substring(0, 100) + (tweet.text.length > 100 ? '...' : ''),
        content: tweet.text,
        source: this.source.name,
        platform: this.source.platform,
        author: tweet.author_id,
        url: `https://twitter.com/i/web/status/${tweet.id}`,
        timestamp: new Date(tweet.created_at).getTime(),
        region: this.source.region,
        country: 'United States', // Could be enhanced with geolocation
        language: this.source.language,
        sentiment: this.analyzeSentiment(tweet.text),
        category: this.categorizeContent(tweet.text, ''),
        tags: tweet.entities?.hashtags?.map((tag: any) => tag.tag) || [],
        metrics: {
          mentions: tweet.public_metrics?.like_count || 0,
          shares: tweet.public_metrics?.retweet_count || 0,
          likes: tweet.public_metrics?.like_count || 0
        },
        verified: false, // Would need author info
        trending: tweet.public_metrics?.retweet_count > 100
      })) || [];
    } catch (error) {
      console.error('Twitter integration error:', error);
      return [];
    }
  }
  
  async fetchTrendingTopics(limit = 10): Promise<string[]> {
    const url = 'https://api.twitter.com/1.1/trends/place.json?id=1'; // Global trends
    
    try {
      const data = await this.makeRequest(url);
      return data[0]?.trends?.slice(0, limit).map((trend: any) => trend.name) || [];
    } catch (error) {
      console.error('Twitter trends error:', error);
      return [];
    }
  }
}

// VK Integration
export class VKIntegration extends NewsIntegration {
  async fetchLatestNews(limit = 10): Promise<NewsStory[]> {
    const url = `https://api.vk.com/method/newsfeed.search?q=news&count=${limit}&access_token=${this.accessToken}&v=5.131`;
    
    try {
      const data = await this.makeRequest(url);
      
      return data.response?.items?.map((post: any) => ({
        id: `vk_${post.id}`,
        title: post.text.substring(0, 100) + (post.text.length > 100 ? '...' : ''),
        content: post.text,
        source: this.source.name,
        platform: this.source.platform,
        timestamp: post.date * 1000,
        region: this.source.region,
        country: 'Russia',
        language: this.source.language,
        sentiment: this.analyzeSentiment(post.text),
        category: this.categorizeContent(post.text, ''),
        tags: [],
        metrics: {
          mentions: post.likes?.count || 0,
          shares: post.reposts?.count || 0,
          likes: post.likes?.count || 0
        },
        verified: false,
        trending: (post.likes?.count || 0) > 50
      })) || [];
    } catch (error) {
      console.error('VK integration error:', error);
      return [];
    }
  }
  
  async fetchTrendingTopics(limit = 10): Promise<string[]> {
    // VK doesn't have a direct trending topics API, would need to analyze popular posts
    return [];
  }
}

// RSS Feed Integration
export class RSSIntegration extends NewsIntegration {
  async fetchLatestNews(limit = 10): Promise<NewsStory[]> {
    if (!this.source.apiEndpoint) {
      throw new Error('RSS endpoint not configured');
    }
    
    try {
      const response = await fetch(this.source.apiEndpoint);
      const xmlText = await response.text();
      
      // Parse RSS XML (simplified - would use proper XML parser in production)
      const items = this.parseRSSItems(xmlText);
      
      return items.slice(0, limit).map((item: any) => ({
        id: `rss_${Date.now()}_${Math.random()}`,
        title: item.title,
        content: item.description || item.title,
        source: this.source.name,
        platform: this.source.platform,
        url: item.link,
        timestamp: new Date(item.pubDate).getTime(),
        region: this.source.region,
        country: this.getCountryFromSource(),
        language: this.source.language,
        sentiment: this.analyzeSentiment(item.description || item.title),
        category: this.categorizeContent(item.description || '', item.title),
        tags: [],
        metrics: {
          mentions: 0
        },
        verified: true, // RSS feeds are typically from verified sources
        trending: false
      }));
    } catch (error) {
      console.error('RSS integration error:', error);
      return [];
    }
  }
  
  async fetchTrendingTopics(limit = 10): Promise<string[]> {
    // RSS feeds don't typically have trending topics
    return [];
  }
  
  private parseRSSItems(xmlText: string): any[] {
    // Simplified RSS parsing - would use proper XML parser in production
    const items: any[] = [];
    const itemRegex = /<item>(.*?)<\/item>/gs;
    let match;
    
    while ((match = itemRegex.exec(xmlText)) !== null) {
      const itemXml = match[1];
      const item = {
        title: this.extractXMLContent(itemXml, 'title'),
        description: this.extractXMLContent(itemXml, 'description'),
        link: this.extractXMLContent(itemXml, 'link'),
        pubDate: this.extractXMLContent(itemXml, 'pubDate')
      };
      items.push(item);
    }
    
    return items;
  }
  
  private extractXMLContent(xml: string, tag: string): string {
    const regex = new RegExp(`<${tag}>(.*?)<\/${tag}>`, 's');
    const match = xml.match(regex);
    return match ? match[1].trim() : '';
  }
  
  private getCountryFromSource(): string {
    const sourceCountries: Record<string, string> = {
      'CNN': 'United States',
      'BBC News': 'United Kingdom',
      'Folha de S.Paulo': 'Brazil',
      'ABC News Australia': 'Australia'
    };
    
    return sourceCountries[this.source.name] || 'Unknown';
  }
}

// News Aggregation Manager
export class NewsAggregationManager {
  private integrations: Map<string, NewsIntegration> = new Map();
  
  addIntegration(sourceId: string, integration: NewsIntegration) {
    this.integrations.set(sourceId, integration);
  }
  
  async aggregateLatestNews(regions?: string[], limit = 50): Promise<NewsStory[]> {
    const allNews: NewsStory[] = [];
    
    for (const [sourceId, integration] of this.integrations) {
      try {
        const news = await integration.fetchLatestNews(Math.ceil(limit / this.integrations.size));
        allNews.push(...news);
      } catch (error) {
        console.error(`Failed to fetch from ${sourceId}:`, error);
      }
    }
    
    // Filter by regions if specified
    let filteredNews = regions 
      ? allNews.filter(story => regions.includes(story.region))
      : allNews;
    
    // Sort by timestamp (newest first) and limit
    return filteredNews
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, limit);
  }
  
  async getTrendingTopics(limit = 20): Promise<string[]> {
    const allTopics: string[] = [];
    
    for (const [sourceId, integration] of this.integrations) {
      try {
        const topics = await integration.fetchTrendingTopics(10);
        allTopics.push(...topics);
      } catch (error) {
        console.error(`Failed to fetch trending from ${sourceId}:`, error);
      }
    }
    
    // Remove duplicates and return top topics
    return Array.from(new Set(allTopics)).slice(0, limit);
  }
}
