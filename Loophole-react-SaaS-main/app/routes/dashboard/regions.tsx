export default function RegionsPage() {
  return (
    <div className="flex flex-col w-full py-6 space-y-6">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Regional News Insights
        </h1>
        <p className="text-muted-foreground">
          Deep dive into regional news patterns and cultural insights
        </p>
      </div>
      
      <div className="text-center py-12 space-y-4">
        <div className="text-6xl">🗺️</div>
        <h2 className="text-xl font-semibold">Regional Analysis</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Detailed regional breakdowns, cultural context analysis, and geopolitical insights coming soon.
        </p>
      </div>
    </div>
  );
}
