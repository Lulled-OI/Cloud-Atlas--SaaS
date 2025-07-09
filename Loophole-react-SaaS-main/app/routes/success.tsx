import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import CloudAtlasLogo from "~/components/logo";

export default function SuccessPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800 p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="space-y-4">
          <div className="flex justify-center">
            <CloudAtlasLogo />
          </div>
          <div>
            <CardTitle className="text-2xl text-green-600">Welcome to Cloud Atlas!</CardTitle>
            <CardDescription>
              Your subscription is now active
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="text-6xl">🎉</div>
            <p className="text-muted-foreground">
              You now have access to the full Cloud Atlas platform with global news intelligence, real-time analytics, and AI-powered insights.
            </p>
          </div>
          
          <div className="space-y-3">
            <Button asChild className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              <Link to="/dashboard">
                Access Your Dashboard
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="w-full">
              <Link to="/">
                Back to Homepage
              </Link>
            </Button>
          </div>

          {/* Demo notice */}
          <div className="mt-6 p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-md">
            <p className="text-xs text-green-700 dark:text-green-200">
              <strong>Demo Mode:</strong> In the full version, this page confirms successful payment and activates the subscription.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
