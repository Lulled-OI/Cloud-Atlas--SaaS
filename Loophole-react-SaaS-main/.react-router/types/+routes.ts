// Generated by React Router

import "react-router"

declare module "react-router" {
  interface Register {
    pages: Pages
    routeFiles: RouteFiles
  }
}

type Pages = {
  "/": {
    params: {};
  };
  "/sign-in/*": {
    params: {
      "*": string;
    };
  };
  "/sign-up/*": {
    params: {
      "*": string;
    };
  };
  "/pricing": {
    params: {};
  };
  "/success": {
    params: {};
  };
  "/subscription-required": {
    params: {};
  };
  "/dashboard": {
    params: {};
  };
  "/dashboard/analysis": {
    params: {};
  };
  "/dashboard/chat": {
    params: {};
  };
  "/dashboard/settings": {
    params: {};
  };
  "/dashboard/trends": {
    params: {};
  };
  "/dashboard/regions": {
    params: {};
  };
  "/dashboard/alerts": {
    params: {};
  };
};

type RouteFiles = {
  "root.tsx": {
    id: "root";
    page: "/" | "/sign-in/*" | "/sign-up/*" | "/pricing" | "/success" | "/subscription-required" | "/dashboard" | "/dashboard/analysis" | "/dashboard/chat" | "/dashboard/settings" | "/dashboard/trends" | "/dashboard/regions" | "/dashboard/alerts";
  };
  "routes/home.tsx": {
    id: "routes/home";
    page: "/";
  };
  "routes/sign-in.tsx": {
    id: "routes/sign-in";
    page: "/sign-in/*";
  };
  "routes/sign-up.tsx": {
    id: "routes/sign-up";
    page: "/sign-up/*";
  };
  "routes/pricing.tsx": {
    id: "routes/pricing";
    page: "/pricing";
  };
  "routes/success.tsx": {
    id: "routes/success";
    page: "/success";
  };
  "routes/subscription-required.tsx": {
    id: "routes/subscription-required";
    page: "/subscription-required";
  };
  "routes/dashboard/layout.tsx": {
    id: "routes/dashboard/layout";
    page: "/dashboard" | "/dashboard/analysis" | "/dashboard/chat" | "/dashboard/settings" | "/dashboard/trends" | "/dashboard/regions" | "/dashboard/alerts";
  };
  "routes/dashboard/index.tsx": {
    id: "routes/dashboard/index";
    page: "/dashboard";
  };
  "routes/dashboard/analysis.tsx": {
    id: "routes/dashboard/analysis";
    page: "/dashboard/analysis";
  };
  "routes/dashboard/chat.tsx": {
    id: "routes/dashboard/chat";
    page: "/dashboard/chat";
  };
  "routes/dashboard/settings.tsx": {
    id: "routes/dashboard/settings";
    page: "/dashboard/settings";
  };
  "routes/dashboard/trends.tsx": {
    id: "routes/dashboard/trends";
    page: "/dashboard/trends";
  };
  "routes/dashboard/regions.tsx": {
    id: "routes/dashboard/regions";
    page: "/dashboard/regions";
  };
  "routes/dashboard/alerts.tsx": {
    id: "routes/dashboard/alerts";
    page: "/dashboard/alerts";
  };
};