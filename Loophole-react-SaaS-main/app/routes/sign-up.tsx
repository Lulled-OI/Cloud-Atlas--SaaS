import { useState } from "react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import CloudAtlasLogo from "~/components/logo";

// Helper function to check if we have real API keys
const isRealValue = (value: string | undefined) => value && value !== "demo_mode" && value.trim() !== "";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Check if Clerk is available
  const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  const hasRealClerk = isRealValue(clerkPublishableKey);

  const handleDemoSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate sign up process
    setTimeout(() => {
      alert("🌍 Welcome to Cloud Atlas Demo!\n\nThis is a demo sign-up. In the full version, this would:\n• Create account with Clerk\n• Send verification email\n• Set up user profile\n• Start free trial\n\nFor now, explore all the demo features!");
      setIsLoading(false);
      // Redirect to dashboard to show demo features
      window.location.href = "/dashboard";
    }, 1500);
  };

  // If Clerk is available, use the real sign-up component
  if (hasRealClerk) {
    const { SignUp } = require("@clerk/react-router");
    return (
      <div className="flex items-center justify-center min-h-screen">
        <SignUp />
      </div>
    );
  }

  // Demo mode sign-up page
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center">
            <CloudAtlasLogo />
          </div>
          <div>
            <CardTitle className="text-2xl">Join Cloud Atlas</CardTitle>
            <CardDescription>
              Start exploring global news intelligence
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleDemoSignUp} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="text-sm font-medium">
                  First Name
                </label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="text-sm font-medium">
                  Last Name
                </label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
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
                placeholder="Create a password"
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
              {isLoading ? "Creating account..." : "Start Free Trial (Demo)"}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/sign-in" className="text-blue-600 hover:underline">
                Sign in
              </Link>
            </p>
          </div>

          {/* Demo Features List */}
          <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-md">
            <p className="text-xs font-medium text-blue-900 dark:text-blue-100 mb-2">
              🎯 Try These Demo Features:
            </p>
            <ul className="text-xs text-blue-700 dark:text-blue-200 space-y-1">
              <li>• Interactive 3D news globe</li>
              <li>• Real-time trending topics</li>
              <li>• Global news analytics</li>
              <li>• Regional news insights</li>
              <li>• AI-powered analysis</li>
            </ul>
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
