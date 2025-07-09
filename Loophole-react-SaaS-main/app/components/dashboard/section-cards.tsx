import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"
import { Globe, Rss, Activity, TrendingUp } from "lucide-react"

import { Badge } from "~/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"

export function SectionCards() {
  // Simulated real-time data
  const getRandomGrowth = () => Math.floor(Math.random() * 30) + 5;
  const globalSources = Math.floor(Math.random() * 500) + 1200;
  const activeStories = Math.floor(Math.random() * 10000) + 25000;
  const sentimentScore = (Math.random() * 0.6 - 0.3).toFixed(2);
  const processingSpeed = Math.floor(Math.random() * 200) + 800;

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Global News Sources</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl flex items-center gap-2">
            <Globe className="w-6 h-6 text-blue-500" />
            {globalSources.toLocaleString()}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-green-600">
              <IconTrendingUp />
              +{getRandomGrowth()}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Active across 50+ countries <Globe className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Social media, news outlets, blogs
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Active News Stories</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl flex items-center gap-2">
            <Rss className="w-6 h-6 text-purple-500" />
            {activeStories.toLocaleString()}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-green-600">
              <IconTrendingUp />
              +{getRandomGrowth()}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Real-time story tracking <Activity className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Updated every 30 seconds
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Global Sentiment Score</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl flex items-center gap-2">
            <Activity className="w-6 h-6 text-orange-500" />
            {sentimentScore}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className={parseFloat(sentimentScore) > 0 ? "text-green-600" : "text-red-600"}>
              {parseFloat(sentimentScore) > 0 ? <IconTrendingUp /> : <IconTrendingDown />}
              {Math.abs(parseFloat(sentimentScore) * 100).toFixed(1)}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {parseFloat(sentimentScore) > 0.1 ? "Positive global mood" : parseFloat(sentimentScore) < -0.1 ? "Negative trends detected" : "Neutral sentiment"} 
            <Activity className="size-4" />
          </div>
          <div className="text-muted-foreground">
            AI-powered sentiment analysis
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Processing Speed</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-green-500" />
            {processingSpeed}/s
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-green-600">
              <IconTrendingUp />
              +{getRandomGrowth()}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            High-speed data ingestion <TrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Articles processed per second
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
