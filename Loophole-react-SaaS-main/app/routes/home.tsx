import type { Route } from "./+types/home";
import ContentSection from "~/components/homepage/content";
import Footer from "~/components/homepage/footer";
import Integrations from "~/components/homepage/integrations";
import Pricing from "~/components/homepage/pricing";
import Team from "~/components/homepage/team";

// Helper function to check if we have real API keys
const isRealValue = (value: string | undefined) => value && value !== "demo_mode" && value.trim() !== "";

export function meta({}: Route.MetaArgs) {
  const title = "Cloud Atlas - 3D Global News Intelligence Platform";
  const description =
    "Experience global news like never before with Cloud Atlas - a revolutionary 3D platform that aggregates and visualizes news from social media and news sources worldwide in real-time.";
  const keywords = "Global News, 3D Visualization, News Aggregation, Social Media Intelligence, Real-time News, Twitter, VK, Line, World News, News Analytics";
  const siteUrl = "https://www.cloudatlas3d.com/";
  const imageUrl =
    "https://jdj14ctwppwprnqu.public.blob.vercel-storage.com/cloud-atlas-preview-FcUcfBMBgsjNLo99j3NhKV64GT2bQl.png";

  return [
    { title },
    {
      name: "description",
      content: description,
    },

    // Open Graph / Facebook
    { property: "og:type", content: "website" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: imageUrl },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:url", content: siteUrl },
    { property: "og:site_name", content: "Cloud Atlas" },
    { property: "og:image", content: imageUrl },

    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    {
      name: "twitter:description",
      content: description,
    },
    { name: "twitter:image", content: imageUrl },
    {
      name: "keywords",
      content: keywords,
    },
    { name: "author", content: "Cloud Atlas Team" },
    { name: "favicon", content: imageUrl },
  ];
}

export async function loader(args: Route.LoaderArgs) {
  // Fallback data for demo mode
  const fallbackData = {
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

  // Check if we have real API keys
  const clerkSecretKey = process.env.CLERK_SECRET_KEY;
  const convexUrl = process.env.VITE_CONVEX_URL || process.env.CONVEX_URL;
  
  if (!isRealValue(clerkSecretKey)) {
    console.log("No real Clerk secret key found - using demo mode");
    return fallbackData;
  }

  // Try to use Clerk if available
  let userId = null;
  try {
    const { getAuth } = await import("@clerk/react-router/ssr.server");
    const authResult = await getAuth(args);
    userId = authResult.userId;
  } catch (error) {
    console.log("Clerk not available, using demo mode:", error);
    return fallbackData;
  }

  // Try to use Convex if available and we have a user
  if (isRealValue(convexUrl) && userId) {
    try {
      const { fetchAction, fetchQuery } = await import("convex/nextjs");
      const { api } = await import("../../convex/_generated/api");

      const [subscriptionData, plans] = await Promise.all([
        fetchQuery(api.subscriptions.checkUserSubscriptionStatus, {
          userId,
        }).catch((error) => {
          console.error("Failed to fetch subscription data:", error);
          return null;
        }),
        fetchAction(api.subscriptions.getAvailablePlans).catch(() => fallbackData.plans),
      ]);

      return {
        isSignedIn: !!userId,
        hasActiveSubscription: subscriptionData?.hasActiveSubscription || false,
        plans: plans || fallbackData.plans,
      };
    } catch (error) {
      console.log("Convex not available, using demo mode:", error);
    }
  }

  // Return data with Clerk user info but no subscription data
  return {
    isSignedIn: !!userId,
    hasActiveSubscription: false,
    plans: fallbackData.plans,
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <Integrations loaderData={loaderData} />
      <ContentSection />
      <Team />
      <Pricing loaderData={loaderData} />
      <Footer />
    </>
  );
}
