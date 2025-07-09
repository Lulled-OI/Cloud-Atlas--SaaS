import { useState } from "react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import CloudAtlasLogo from "~/components/logo";

// Helper function to check if we have real API keys
const isRealValue = (value: string | undefined) => value && value !== "demo_mode" && value.trim() !== "";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Check if Clerk is available
  const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  const hasRealClerk = isRealValue(clerkPublishableKey);

  const handleDemoSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate sign in process
    setTimeout(() => {
      alert("🌍 Cloud Atlas Demo Mode\n\nThis is a demo sign-in. In the full version, this would:\n• Authenticate with Clerk\n• Create user session\n• Redirect to dashboard\n\nFor now, explore the demo features!");
      setIsLoading(false);
      // Redirect to homepage to show demo features
      window.location.href = "/";
    }, 1500);
  };

  // If Clerk is available, use the real sign-in component
  if (hasRealClerk) {
    const { SignIn } = require("@clerk/react-router");
    return (
      <div className="flex items-center justify-center min-h-screen">
        <SignIn />
      </div>
    );
  }

  // Demo mode sign-in page
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center">
            <CloudAtlasLogo />
          </div>
          <div>
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>
              Sign in to your Cloud Atlas account
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleDemoSignIn} className="space-y-4">
            <div>
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In (Demo)"}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/sign-up" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>

          {/* Demo Notice */}
          <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-md">
            <p className="text-xs text-blue-700 dark:text-blue-200 text-center">
              🌍 <strong>Demo Mode:</strong> This is a demonstration. All Cloud Atlas features work with simulated data!
            </p>
          </div>

          <div className="mt-4 text-center">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
              ← Back to Cloud Atlas
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
