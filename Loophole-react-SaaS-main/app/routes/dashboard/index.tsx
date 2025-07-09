"use client";
import { ChartAreaInteractive } from "~/components/dashboard/chart-area-interactive";
import { SectionCards } from "~/components/dashboard/section-cards";
import NewsGlobe from "~/components/dashboard/NewsGlobe";
import TrendingTopics from "~/components/dashboard/TrendingTopics";
import NewsMap from "~/components/dashboard/NewsMap";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          {/* Global News Stats */}
          <SectionCards />
          
          {/* Main 3D Globe View */}
          <div className="px-4 lg:px-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <NewsGlobe />
              <TrendingTopics />
            </div>
          </div>
          
          {/* Analytics Chart */}
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>
          
          {/* News Heatmap */}
          <div className="px-4 lg:px-6">
            <NewsMap />
          </div>
        </div>
      </div>
    </div>
  );
}
