import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    image: v.optional(v.string()),
    tokenIdentifier: v.string(),
  }).index("by_token", ["tokenIdentifier"]),
  
  subscriptions: defineTable({
    userId: v.optional(v.string()),
    polarId: v.optional(v.string()),
    polarPriceId: v.optional(v.string()),
    currency: v.optional(v.string()),
    interval: v.optional(v.string()),
    status: v.optional(v.string()),
    currentPeriodStart: v.optional(v.number()),
    currentPeriodEnd: v.optional(v.number()),
    cancelAtPeriodEnd: v.optional(v.boolean()),
    amount: v.optional(v.number()),
    startedAt: v.optional(v.number()),
    endsAt: v.optional(v.number()),
    endedAt: v.optional(v.number()),
    canceledAt: v.optional(v.number()),
    customerCancellationReason: v.optional(v.string()),
    customerCancellationComment: v.optional(v.string()),
    metadata: v.optional(v.any()),
    customFieldData: v.optional(v.any()),
    customerId: v.optional(v.string()),
  })
    .index("userId", ["userId"])
    .index("polarId", ["polarId"]),
    
  webhookEvents: defineTable({
    type: v.string(),
    polarEventId: v.string(),
    createdAt: v.string(),
    modifiedAt: v.string(),
    data: v.any(),
  })
    .index("type", ["type"])
    .index("polarEventId", ["polarEventId"]),

  // Cloud Atlas News Tables
  newsStories: defineTable({
    storyId: v.string(),
    title: v.string(),
    content: v.string(),
    source: v.string(),
    platform: v.string(),
    region: v.string(),
    country: v.string(),
    timestamp: v.number(),
    url: v.optional(v.string()),
    author: v.optional(v.string()),
    sentiment: v.number(),
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
    trending: v.boolean(),
  })
    .index("by_timestamp", ["timestamp"])
    .index("by_region", ["region"])
    .index("by_platform", ["platform"])
    .index("by_trending", ["trending"])
    .index("by_category", ["category"]),

  trendingTopics: defineTable({
    topic: v.string(),
    mentions: v.number(),
    growth: v.number(),
    sentiment: v.number(),
    regions: v.array(v.string()),
    category: v.string(),
    timestamp: v.number(),
  })
    .index("by_mentions", ["mentions"])
    .index("by_timestamp", ["timestamp"])
    .index("by_category", ["category"]),

  regionalData: defineTable({
    region: v.string(),
    country: v.string(),
    density: v.number(),
    stories: v.number(),
    sentiment: v.number(),
    topCategories: v.array(v.string()),
    timestamp: v.number(),
  })
    .index("by_region", ["region"])
    .index("by_timestamp", ["timestamp"])
    .index("by_density", ["density"]),
});
