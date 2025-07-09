import { Globe } from "lucide-react";

export default function CloudAtlasLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <Globe className={`${className} text-blue-500`} />
        <div className="absolute inset-0 animate-ping">
          <Globe className={`${className} text-blue-300 opacity-30`} />
        </div>
      </div>
      <span className="font-bold text-xl bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        Cloud Atlas
      </span>
    </div>
  );
}
