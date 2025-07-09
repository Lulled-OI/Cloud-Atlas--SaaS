import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import CloudAtlasLogo from "~/components/logo";

export default function SubscriptionRequiredPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800 p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="space-y-4">
          <div className="flex justify-center">
            <CloudAtlasLogo />
          </div>
          <div>
            <CardTitle className="text-2xl">Subscription Required</CardTitle>
            <CardDescription>
              Access to Cloud Atlas dashboard requires an active subscription
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="text-6xl">🌍</div>
            <p className="text-muted-foreground">
              Unlock global news intelligence with advanced analytics, real-time monitoring, and AI-powered insights.
            </p>
          </div>
          
          <div className="space-y-3">
            <Button asChild className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              <Link to="/pricing">
                View Subscription Plans
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="w-full">
              <Link to="/">
                Back to Homepage
              </Link>
            </Button>
          </div>

          {/* Demo notice */}
          <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-md">
            <p className="text-xs text-blue-700 dark:text-blue-200">
              <strong>Demo Mode:</strong> In the full version, this page handles subscription verification and redirects.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
