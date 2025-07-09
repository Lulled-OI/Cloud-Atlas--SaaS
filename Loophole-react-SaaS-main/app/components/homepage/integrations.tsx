import { memo } from "react";
import { Link } from "react-router";
import CloudAtlasLogo from "~/components/logo";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/utils";
import { Navbar } from "./navbar";
import { Globe, MessageCircle, Rss, Radio, Tv, Newspaper } from "lucide-react";

// Global platform logos/icons (simplified representations)
const TwitterIcon = () => (
  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">X</div>
);

const VKIcon = () => (
  <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-sm">VK</div>
);

const LineIcon = () => (
  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">L</div>
);

const WeChatIcon = () => (
  <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">微</div>
);

const TelegramIcon = () => (
  <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-white">
    <MessageCircle className="w-5 h-5" />
  </div>
);

const BBCIcon = () => (
  <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center text-white font-bold text-xs">BBC</div>
);

const CNNIcon = () => (
  <div className="w-8 h-8 bg-red-700 rounded flex items-center justify-center text-white font-bold text-xs">CNN</div>
);

const RSSIcon = () => (
  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white">
    <Rss className="w-5 h-5" />
  </div>
);

export default function IntegrationsSection({
  loaderData,
}: {
  loaderData?: { isSignedIn: boolean; hasActiveSubscription: boolean };
}) {
  return (
    <section id="hero">
      <Navbar loaderData={loaderData} />
      <div className="bg-muted dark:bg-background py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6 mt-[2rem]">
          <div className="grid items-center lg:grid-cols-2 gap-12">
            <div className="dark:bg-muted/50 relative mx-auto w-fit">
              <div className="bg-radial to-muted dark:to-background absolute inset-0 z-10 from-transparent to-75%"></div>
              
              {/* Social Media Platforms Row */}
              <div className="mx-auto mb-3 flex w-fit justify-center gap-3">
                <IntegrationCard region="North America">
                  <TwitterIcon />
                </IntegrationCard>
                <IntegrationCard region="Europe">
                  <VKIcon />
                </IntegrationCard>
                <IntegrationCard region="Asia">
                  <LineIcon />
                </IntegrationCard>
              </div>

              {/* Central Cloud Atlas Logo */}
              <div className="mx-auto my-3 flex w-fit justify-center gap-3">
                <IntegrationCard region="Europe">
                  <TelegramIcon />
                </IntegrationCard>
                <IntegrationCard
                  borderClassName="shadow-black-950/20 shadow-2xl border-blue-500/50 dark:border-blue-400/50"
                  className="dark:bg-blue-950/20 bg-blue-50/50 scale-110"
                  region="Global"
                >
                  <CloudAtlasLogo className="h-8 w-8" />
                </IntegrationCard>
                <IntegrationCard region="Asia">
                  <WeChatIcon />
                </IntegrationCard>
              </div>

              {/* News Sources Row */}
              <div className="mx-auto flex w-fit justify-center gap-3">
                <IntegrationCard region="Europe">
                  <BBCIcon />
                </IntegrationCard>
                <IntegrationCard region="North America">
                  <CNNIcon />
                </IntegrationCard>
                <IntegrationCard region="Global">
                  <RSSIcon />
                </IntegrationCard>
              </div>

              {/* Regional indicators */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                <Badge variant="outline" className="text-xs">50+ Regions</Badge>
                <Badge variant="outline" className="text-xs">Live Data</Badge>
              </div>
            </div>

            <div className="mx-auto max-w-lg space-y-6 text-center lg:text-left">
              <h2 className="text-balance text-3xl font-semibold md:text-4xl bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Connected to Global Information Networks
              </h2>
              <p className="text-muted-foreground text-lg">
                Cloud Atlas aggregates news from every corner of the world, connecting to major social media platforms, 
                news outlets, and regional information sources across all continents in real-time.
              </p>

              {/* Platform Stats */}
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">100+</div>
                  <div className="text-sm text-muted-foreground">News Sources</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">15+</div>
                  <div className="text-sm text-muted-foreground">Social Platforms</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">50+</div>
                  <div className="text-sm text-muted-foreground">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">24/7</div>
                  <div className="text-sm text-muted-foreground">Real-time Updates</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" asChild className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  <Link
                    to={
                      loaderData?.isSignedIn
                        ? loaderData?.hasActiveSubscription
                          ? "/dashboard"
                          : "/pricing"
                        : "/sign-up"
                    }
                    prefetch="viewport"
                    className="flex items-center gap-2"
                  >
                    <Globe className="w-5 h-5" />
                    {loaderData?.isSignedIn
                      ? loaderData?.hasActiveSubscription
                        ? "Access Your News Atlas"
                        : "Upgrade to Pro"
                      : "Start Exploring Global News"}
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="border-blue-500 text-blue-500 hover:bg-blue-50">
                  <Link
                    to="#globe"
                    className="flex items-center gap-2"
                  >
                    <Radio className="w-5 h-5" />
                    View Live Demo
                  </Link>
                </Button>
              </div>

              {/* Supported Platforms */}
              <div className="pt-6 border-t">
                <p className="text-sm text-muted-foreground mb-3">Integrated Platforms:</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Twitter/X</Badge>
                  <Badge variant="secondary">VKontakte</Badge>
                  <Badge variant="secondary">Line</Badge>
                  <Badge variant="secondary">WeChat</Badge>
                  <Badge variant="secondary">Telegram</Badge>
                  <Badge variant="secondary">BBC</Badge>
                  <Badge variant="secondary">CNN</Badge>
                  <Badge variant="secondary">Reuters</Badge>
                  <Badge variant="secondary">+ 92 more</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const IntegrationCard = memo(({
  children,
  className,
  borderClassName,
  region,
}: {
  children: React.ReactNode;
  className?: string;
  borderClassName?: string;
  region?: string;
}) => {
  return (
    <div
      className={cn(
        "bg-background relative flex size-20 rounded-xl dark:bg-transparent group hover:scale-105 transition-transform cursor-pointer",
        className
      )}
      title={region ? `${region} Data Sources` : undefined}
    >
      <div
        role="presentation"
        className={cn(
          "absolute inset-0 rounded-xl border border-black/20 dark:border-white/25 group-hover:border-blue-400/50 transition-colors",
          borderClassName
        )}
      />
      <div className="relative z-20 m-auto size-fit *:size-8">{children}</div>
      {region && (
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Badge variant="outline" className="text-xs whitespace-nowrap">{region}</Badge>
        </div>
      )}
    </div>
  );
});
