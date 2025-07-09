import type { Route } from "./+types/pricing";
import Pricing from "~/components/homepage/pricing";
import { Navbar } from "~/components/homepage/navbar";
import Footer from "~/components/homepage/footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Cloud Atlas Pricing - 3D Global News Intelligence Plans" },
    { name: "description", content: "Choose the perfect Cloud Atlas plan for your global news intelligence needs. From Explorer to Enterprise, we have solutions for every scale." },
  ];
}

export async function loader(args: Route.LoaderArgs) {
  // Simple loader for demo mode
  return {
    isSignedIn: false,
    hasActiveSubscription: false,
    plans: [
      {
        name: "Explorer",
        price: 29,
        description: "Perfect for journalists and researchers",
        features: ["15+ news sources", "Basic 3D visualization", "5 regions coverage"]
      },
      {
        name: "Analyst", 
        price: 79,
        description: "Comprehensive news intelligence",
        features: ["50+ news sources", "Advanced visualization", "Global coverage"]
      },
      {
        name: "Enterprise",
        price: 199,
        description: "Complete platform access",
        features: ["100+ news sources", "Full platform access", "Custom integrations"]
      }
    ]
  };
}

export default function PricingPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="min-h-screen">
      <Navbar loaderData={loaderData} />
      <main className="pt-16">
        <Pricing loaderData={loaderData} />
      </main>
      <Footer />
    </div>
  );
}
