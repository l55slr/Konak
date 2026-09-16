import type { ServiceCategory } from "@/lib/schemas";

export interface CategoryMeta {
  id: ServiceCategory;
  label: string;
  description: string;
  /** Lucide icon name; resolved via lib/icons.tsx */
  icon: string;
}

export const categories: CategoryMeta[] = [
  { id: "search", label: "Search", description: "Web search engines", icon: "Search" },
  { id: "email", label: "Email", description: "Mail providers", icon: "Mail" },
  { id: "storage", label: "Files", description: "Cloud storage and sync", icon: "HardDrive" },
  { id: "photos", label: "Photos", description: "Photo backup and libraries", icon: "Image" },
  { id: "browser", label: "Browser", description: "Web browsers", icon: "Globe" },
  { id: "maps", label: "Maps", description: "Maps and navigation", icon: "Map" },
  { id: "calendar", label: "Calendar", description: "Calendars and scheduling", icon: "Calendar" },
  { id: "docs", label: "Docs", description: "Documents and writing", icon: "FileText" },
  { id: "video", label: "Video", description: "Video platforms and players", icon: "Clapperboard" },
  { id: "appstore", label: "App stores", description: "Where your apps come from", icon: "LayoutGrid" },
  { id: "authenticator", label: "2FA", description: "Two-factor authenticator apps", icon: "KeyRound" },
  { id: "notes", label: "Notes", description: "Note-taking apps", icon: "StickyNote" },
  { id: "translate", label: "Translate", description: "Machine translation", icon: "Languages" },
  { id: "dns", label: "DNS", description: "Domain name resolvers", icon: "Network" },
  { id: "analytics", label: "Analytics", description: "Web analytics for your own sites", icon: "BarChart3" },
  { id: "messaging", label: "Messaging", description: "Chat and messaging", icon: "MessageSquare" },
  { id: "os", label: "Operating systems", description: "Phone and desktop OS", icon: "Monitor" },
  { id: "vpn", label: "VPN", description: "Virtual private networks", icon: "Shield" },
];
