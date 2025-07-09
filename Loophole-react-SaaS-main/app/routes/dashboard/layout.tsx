import { redirect, useLoaderData } from "react-router";
import { AppSidebar } from "~/components/dashboard/app-sidebar";
import { SiteHeader } from "~/components/dashboard/site-header";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";
import type { Route } from "./+types/layout";
import { Outlet } from "react-router";

// Helper function to check if we have real API keys
const isRealValue = (value: string | undefined) => value && value !== "demo_mode" && value.trim() !== "";

export async function loader(args: Route.LoaderArgs) {
  // Check if we have real Clerk configuration
  const clerkSecretKey = process.env.CLERK_SECRET_KEY;
  const convexUrl = process.env.VITE_CONVEX_URL || process.env.CONVEX_URL;
  
  // Demo mode - no authentication required
  if (!isRealValue(clerkSecretKey)) {
    const demoUser = {
      id: "demo_user",
      firstName: "Demo",
      lastName: "User",
      emailAddresses: [{ emailAddress: "demo@cloudatlas.com" }],
      imageUrl: "/demo-avatar.png"
    };
    
    return { 
      user: demoUser,
      isDemo: true 
    };
  }

  // Real Clerk authentication
  try {
    const { getAuth } = await import("@clerk/react-router/ssr.server");
    const { fetchQuery } = await import("convex/nextjs");
    const { api } = await import("../../../convex/_generated/api");
    const { createClerkClient } = await import("@clerk/react-router/api.server");

    const { userId } = await getAuth(args);

    // Redirect to sign-in if not authenticated
    if (!userId) {
      throw redirect("/sign-in");
    }

    // Check subscription if Convex is available
    let subscriptionStatus = { hasActiveSubscription: true }; // Default for demo
    
    if (isRealValue(convexUrl)) {
      subscriptionStatus = await fetchQuery(api.subscriptions.checkUserSubscriptionStatus, { userId });
    }

    // Get user info from Clerk
    const user = await createClerkClient({
      secretKey: process.env.CLERK_SECRET_KEY,
    }).users.getUser(userId);

    // Redirect to subscription-required if no active subscription
    if (!subscriptionStatus?.hasActiveSubscription) {
      throw redirect("/subscription-required");
    }

    return { user, isDemo: false };
  } catch (error) {
    console.log("Authentication failed, using demo mode:", error);
    
    // Fallback to demo mode
    const demoUser = {
      id: "demo_user",
      firstName: "Demo",
      lastName: "User", 
      emailAddresses: [{ emailAddress: "demo@cloudatlas.com" }],
      imageUrl: "/demo-avatar.png"
    };
    
    return { 
      user: demoUser,
      isDemo: true 
    };
  }
}

export default function DashboardLayout() {
  const { user, isDemo } = useLoaderData<typeof loader>();

  return (
    <div>
      {/* Demo banner for dashboard */}
      {isDemo && (
        <div className="bg-blue-600 text-white text-center py-2 text-sm">
          🌍 <strong>Cloud Atlas Demo Dashboard</strong> - All features work with simulated data!
        </div>
      )}
      
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" user={user} />
        <SidebarInset>
          <SiteHeader />
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
