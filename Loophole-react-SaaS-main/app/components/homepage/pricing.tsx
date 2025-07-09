"use client";
import { Check, Loader2, Globe, BarChart3, Zap } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";

export default function Pricing({ loaderData }: { loaderData: any }) {
  const [loadingPriceId, setLoadingPriceId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Use loader data instead of Clerk hooks (works in demo mode)
  const isSignedIn = loaderData?.isSignedIn ?? false;
  const hasActiveSubscription = loaderData?.hasActiveSubscription ?? false;

  const handleSubscribe = async (priceId: string) => {
    if (!isSignedIn) {
      window.location.href = "/sign-up";
      return;
    }

    // Demo mode handling
    setLoadingPriceId(priceId);
    setTimeout(() => {
      alert("🌍 Cloud Atlas Demo Mode\n\nThis is a demo version. In the full version, this would:\n• Process your subscription\n• Redirect to payment\n• Activate your plan\n\nTo enable full functionality, add your Convex and Clerk API keys to the .env file.");
      setLoadingPriceId(null);
    }, 1000);
  };

  // Custom Cloud Atlas pricing tiers with features
  const cloudAtlasPricingTiers = [
    {
      id: "explorer",
      name: "Explorer",
      price: 29,
      description: "Perfect for journalists, researchers, and small teams exploring global news trends.",
      features: [
        "Access to 15+ news sources",
        "Basic 3D globe visualization",
        "Real-time news tracking (5 regions)",
        "Basic sentiment analysis",
        "Email alerts for trending topics",
        "Standard support",
        "Up to 1,000 searches/month"
      ],
      icon: Globe,
      popular: false
    },
    {
      id: "analyst", 
      name: "Analyst",
      price: 79,
      description: "Comprehensive news intelligence for media companies and analysts.",
      features: [
        "Access to 50+ news sources",
        "Advanced 3D visualization with filters",
        "Real-time tracking (all regions)",
        "Advanced sentiment & trend analysis",
        "Custom alerts & notifications",
        "Priority support",
        "Up to 10,000 searches/month",
        "Historical data access (6 months)",
        "Export capabilities (CSV, JSON)"
      ],
      icon: BarChart3,
      popular: true
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: 199,
      description: "Complete global news intelligence platform for large organizations.",
      features: [
        "Access to 100+ news sources",
        "Full platform access with white-labeling",
        "Real-time global coverage",
        "AI-powered predictive analytics",
        "Custom integrations & API access",
        "Dedicated account manager",
        "Unlimited searches",
        "Historical data access (unlimited)",
        "Advanced export & reporting",
        "Custom data sources integration",
        "SLA guarantee (99.9% uptime)"
      ],
      icon: Zap,
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-16 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl space-y-6 text-center">
          <h1 className="text-center text-4xl font-semibold lg:text-5xl bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Choose Your Global News Intelligence Plan
          </h1>
          <p className="text-lg text-muted-foreground">
            From regional insights to worldwide coverage, Cloud Atlas scales with your news intelligence needs.
            All plans include access to our revolutionary 3D visualization platform.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {cloudAtlasPricingTiers.map((tier, index) => {
            const isCurrentPlan = false; // Demo mode

            return (
              <Card
                key={tier.id}
                className={`relative transition-all duration-300 hover:shadow-lg ${
                  tier.popular 
                    ? "border-blue-500 shadow-md scale-105" 
                    : ""
                }`}
              >
                {tier.popular && (
                  <div className="absolute inset-x-0 -top-4 mx-auto flex h-8 w-fit items-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-1 text-sm font-medium text-white">
                    Most Popular
                  </div>
                )}

                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
                    <tier.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  
                  <CardTitle className="text-xl font-semibold">{tier.name}</CardTitle>
                  
                  <div className="my-4">
                    <span className="text-4xl font-bold">${tier.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>

                  <CardDescription className="text-sm leading-relaxed">
                    {tier.description}
                  </CardDescription>

                  <Button
                    className={`mt-6 w-full ${
                      tier.popular 
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700" 
                        : ""
                    }`}
                    variant={tier.popular ? "default" : "outline"}
                    onClick={() => handleSubscribe(`price_${tier.id}`)}
                    disabled={loadingPriceId === `price_${tier.id}`}
                  >
                    {loadingPriceId === `price_${tier.id}` ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Try Demo Features"
                    )}
                  </Button>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3">
                    {tier.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-3">
                        <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {tier.popular && (
                    <div className="mt-6 pt-4 border-t">
                      <Badge variant="secondary" className="w-full justify-center py-2">
                        Most comprehensive features
                      </Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Demo Mode Notice */}
        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg max-w-2xl mx-auto">
          <div className="text-center">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
              🌍 Demo Mode Active
            </h3>
            <p className="text-blue-700 dark:text-blue-200 text-sm">
              You're viewing Cloud Atlas in demo mode. All the news intelligence features work with simulated data!
              Click any plan above to see the demo subscription flow.
            </p>
          </div>
        </div>

        {/* Additional Features Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold mb-8">All Plans Include</h3>
          <div className="grid gap-6 md:grid-cols-4">
            <div className="space-y-2">
              <Globe className="h-8 w-8 text-blue-500 mx-auto" />
              <h4 className="font-medium">Global Coverage</h4>
              <p className="text-sm text-muted-foreground">News from every continent and major social platforms</p>
            </div>
            <div className="space-y-2">
              <BarChart3 className="h-8 w-8 text-purple-500 mx-auto" />
              <h4 className="font-medium">3D Visualization</h4>
              <p className="text-sm text-muted-foreground">Interactive globe with real-time news mapping</p>
            </div>
            <div className="space-y-2">
              <Zap className="h-8 w-8 text-green-500 mx-auto" />
              <h4 className="font-medium">Real-time Updates</h4>
              <p className="text-sm text-muted-foreground">Live news feeds updated every 30 seconds</p>
            </div>
            <div className="space-y-2">
              <Check className="h-8 w-8 text-orange-500 mx-auto" />
              <h4 className="font-medium">No Contracts</h4>
              <p className="text-sm text-muted-foreground">Cancel anytime, 14-day money back guarantee</p>
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-md max-w-md mx-auto">
            <p className="text-red-800 text-center">{error}</p>
          </div>
        )}

        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground">
            Need a custom solution? <a href="mailto:enterprise@cloudatlas.com" className="text-blue-500 hover:underline">Contact our enterprise team</a>
          </p>
        </div>
      </div>
    </section>
  );
}
