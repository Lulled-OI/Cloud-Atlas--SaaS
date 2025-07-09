import { IconDashboard, IconSettings } from "@tabler/icons-react";
import { BarChart3, Globe, Search, TrendingUp, Map } from "lucide-react";
import { Link } from "react-router";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";
import CloudAtlasLogo from "~/components/logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "~/components/ui/sidebar";

const data = {
  navMain: [
    {
      title: "Global Overview",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "News Analysis",
      url: "/dashboard/analysis",
      icon: Search,
    },
    {
      title: "Trending Topics",
      url: "/dashboard/trends",
      icon: TrendingUp,
    },
    {
      title: "Regional Insights",
      url: "/dashboard/regions",
      icon: Map,
    },
    {
      title: "Custom Alerts",
      url: "/dashboard/alerts",
      icon: BarChart3,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: IconSettings,
    },
  ],
};

export function AppSidebar({
  variant,
  user,
}: {
  variant: "sidebar" | "floating" | "inset";
  user: any;
}) {
  return (
    <Sidebar collapsible="offcanvas" variant={variant}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link to="/" prefetch="viewport" className="flex items-center">
              <CloudAtlasLogo className="h-6 w-6" />
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>{user && <NavUser user={user} />}</SidebarFooter>
    </Sidebar>
  );
}
