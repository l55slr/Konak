import {
  Apple,
  AppWindow,
  Globe,
  Monitor,
  Smartphone,
  TabletSmartphone,
  Terminal,
  type LucideIcon,
} from "lucide-react";
import type { Platform } from "@/lib/schemas";

const icons: Record<Platform, { Icon: LucideIcon; label: string }> = {
  web: { Icon: Globe, label: "Web" },
  ios: { Icon: Smartphone, label: "iOS" },
  android: { Icon: TabletSmartphone, label: "Android" },
  windows: { Icon: AppWindow, label: "Windows" },
  macos: { Icon: Apple, label: "macOS" },
  linux: { Icon: Monitor, label: "Linux" },
  cli: { Icon: Terminal, label: "Command line" },
};

export function PlatformIcons({ platforms }: { platforms: Platform[] }) {
  return (
    <span className="inline-flex flex-wrap items-center gap-1.5">
      {platforms.map((platform) => {
        const { Icon, label } = icons[platform];
        return (
          <span
            key={platform}
            title={label}
            className="inline-flex items-center gap-1 text-muted-foreground"
          >
            <Icon className="h-3.5 w-3.5" aria-hidden />
            <span className="sr-only">{label}</span>
          </span>
        );
      })}
    </span>
  );
}

export function PlatformList({ platforms }: { platforms: Platform[] }) {
  return (
    <span className="font-mono text-xs text-muted-foreground">
      {platforms.map((p) => icons[p].label).join(" · ")}
    </span>
  );
}