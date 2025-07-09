import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import { ClerkProvider, useAuth } from "@clerk/react-router";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import type { Route } from "./+types/root";
import "./app.css";
import { Analytics } from "@vercel/analytics/react";

// Check if we have real API keys (not demo_mode placeholders)
const isRealValue = (value: string | undefined) => value && value !== "demo_mode" && value.trim() !== "";

// Make Convex optional - only initialize if URL is provided and real
const convexUrl = import.meta.env.VITE_CONVEX_URL;
const convex = isRealValue(convexUrl) ? new ConvexReactClient(convexUrl) : null;

// Check if Clerk is configured with real keys
const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const clerkSecretKey = process.env.CLERK_SECRET_KEY;
const hasRealClerk = isRealValue(clerkPublishableKey) && isRealValue(clerkSecretKey);

// Simple root loader that doesn't require Clerk
export async function loader(args: Route.LoaderArgs) {
  // If Clerk is configured with real keys, use it
  if (hasRealClerk) {
    try {
      const { rootAuthLoader } = await import("@clerk/react-router/ssr.server");
      return rootAuthLoader(args);
    } catch (error) {
      console.log("Clerk auth loader failed, using demo mode:", error);
      return {};
    }
  }
  
  // Otherwise return empty object for demo mode
  return {};
}

export const links: Route.LinksFunction = () => [
  // DNS prefetch for external services
  { rel: "dns-prefetch", href: "https://fonts.googleapis.com" },
  { rel: "dns-prefetch", href: "https://fonts.gstatic.com" },
  { rel: "dns-prefetch", href: "https://api.convex.dev" },
  { rel: "dns-prefetch", href: "https://clerk.dev" },
  
  // Preconnect to font services
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  
  // Font with display=swap for performance
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  
  // Preload critical assets
  {
    rel: "preload",
    href: "/rsk.png",
    as: "image",
    type: "image/png",
  },
  {
    rel: "preload",
    href: "/favicon.png", 
    as: "image",
    type: "image/png",
  },
  
  // Icon
  {
    rel: "icon",
    type: "image/png",
    href: "/favicon.png",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Analytics />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

// Cloud Atlas Demo Provider - works without Convex or Clerk
function CloudAtlasDemoProvider({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* Demo banner */}
      <div className="bg-blue-600 text-white text-center py-2 text-sm">
        🌍 <strong>Cloud Atlas Demo Mode</strong> - No API keys required! 
        <span className="ml-2 opacity-75">All features work with simulated data</span>
      </div>
      {children}
    </div>
  );
}

export default function App({ loaderData }: Route.ComponentProps) {
  // Check if we have full configuration
  const hasConvex = convex !== null;

  if (hasRealClerk && hasConvex) {
    // Full setup with both Clerk and Convex
    return (
      <ClerkProvider
        loaderData={loaderData}
        signUpFallbackRedirectUrl="/"
        signInFallbackRedirectUrl="/"
      >
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
          <Outlet />
        </ConvexProviderWithClerk>
      </ClerkProvider>
    );
  } else if (hasRealClerk) {
    // Clerk only (no Convex)
    return (
      <ClerkProvider
        loaderData={loaderData}
        signUpFallbackRedirectUrl="/"
        signInFallbackRedirectUrl="/"
      >
        <Outlet />
      </ClerkProvider>
    );
  } else {
    // Demo mode - no Clerk or Convex required
    return (
      <CloudAtlasDemoProvider>
        <Outlet />
      </CloudAtlasDemoProvider>
    );
  }
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1 className="text-2xl font-bold mb-4">{message}</h1>
      <p className="mb-4">{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto bg-gray-100 rounded">
          <code>{stack}</code>
        </pre>
      )}
      <div className="mt-6">
        <a href="/" className="text-blue-600 hover:underline">
          ← Back to Cloud Atlas
        </a>
      </div>
    </main>
  );
}
