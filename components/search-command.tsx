"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import {
  BookOpen,
  CornerDownLeft,
  Layers,
  RefreshCcw,
  Search,
  SquareStack,
} from "lucide-react";
import type { GuideMeta } from "@/lib/guides";
import { allAlternatives, allServices } from "@/lib/data";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface SearchItem {
  group: "Services" | "Alternatives" | "Guides" | "Pages";
  title: string;
  subtitle: string;
  href: string;
  keywords: string;
}

export function openSearch() {
  window.dispatchEvent(new CustomEvent("konak:open-search"));
}

export function SearchTrigger({
  variant = "default",
}: {
  variant?: "default" | "hero";
}) {
  const hero = variant === "hero";
  return (
    <button
      type="button"
      onClick={openSearch}
      className={cn(
        "inline-flex items-center gap-2 rounded-lg border border-border text-left transition-colors duration-150 hover:bg-surface",
        hero ? "w-full px-4 py-3 text-sm sm:w-80" : "h-9 px-3 text-sm"
      )}
      aria-label="Search the directory"
    >
      <Search className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
      <span className={cn(hero ? "flex-1 text-muted-foreground" : "hidden sm:inline")}>
        Search…
      </span>
      <kbd className="hidden shrink-0 rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline">
        Ctrl K
      </kbd>
    </button>
  );
}

export function SearchCommand({ guides }: { guides: GuideMeta[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("konak:open-search", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("konak:open-search", onOpen);
    };
  }, []);

  const items = useMemo<SearchItem[]>(() => {
    const serviceItems: SearchItem[] = allServices.map((service) => ({
      group: "Services",
      title: service.name,
      subtitle: `Made by ${service.vendor}`,
      href: `/services/${service.slug}`,
      keywords: `${service.vendor} ${service.category} ${service.description}`,
    }));
    const alternativeItems: SearchItem[] = allAlternatives.map((alt) => ({
      group: "Alternatives",
      title: alt.name,
      subtitle: alt.tagline,
      href: `/alternatives/${alt.slug}`,
      keywords: `${alt.category} ${alt.pricing} ${alt.jurisdiction ?? ""}`,
    }));
    const guideItems: SearchItem[] = guides.map((guide) => ({
      group: "Guides",
      title: guide.title,
      subtitle: guide.description,
      href: `/guides/${guide.slug}`,
      keywords: `${guide.service} ${guide.difficulty}`,
    }));
    const pages: SearchItem[] = [
      { group: "Pages", title: "All alternatives", subtitle: "The full directory", href: "/alternatives", keywords: "directory browse" },
      { group: "Pages", title: "All services", subtitle: "What you can replace", href: "/services", keywords: "google directory" },
      { group: "Pages", title: "Stack builder", subtitle: "Plan your route, share a link", href: "/stack", keywords: "plan share" },
      { group: "Pages", title: "About", subtitle: "Who runs Konak", href: "/about", keywords: "criteria editorial" },
      { group: "Pages", title: "Privacy", subtitle: "Konak's own policy", href: "/privacy", keywords: "policy cookies" },
      { group: "Pages", title: "Contribute", subtitle: "Submit an entry", href: "/contribute", keywords: "github issue" },
    ];
    return [...serviceItems, ...alternativeItems, ...guideItems, ...pages];
  }, [guides]);

  const fuse = useMemo(
    () =>
      new Fuse(items, {
        keys: ["title", "subtitle", "keywords"],
        threshold: 0.35,
        ignoreLocation: true,
      }),
    [items]
  );

  const [query, setQuery] = useState("");
  const results = useMemo(
    () => (query.trim() ? fuse.search(query.trim()).map((r) => r.item) : items),
    [fuse, items, query]
  );

  const grouped = useMemo(() => {
    const map = new Map<SearchItem["group"], SearchItem[]>();
    for (const item of results) {
      const list = map.get(item.group) ?? [];
      list.push(item);
      map.set(item.group, list);
    }
    return map;
  }, [results]);

  const select = useCallback(
    (href: string) => {
      setOpen(false);
      setQuery("");
      router.push(href);
    },
    [router]
  );

  const groupIcons = {
    Services: RefreshCcw,
    Alternatives: Layers,
    Guides: BookOpen,
    Pages: SquareStack,
  } as const;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-xl overflow-hidden p-0">
        <DialogTitle className="sr-only">Search Konak</DialogTitle>
        <DialogDescription className="sr-only">
          Fuzzy search across services, alternatives, and guides.
        </DialogDescription>
        <Command shouldFilter={false} loop>
          <CommandInput
            placeholder="Search services, alternatives, guides…"
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            <CommandEmpty>
              Nothing found. Try &quot;email&quot;, &quot;photos&quot;, or
              &quot;maps&quot; — or browse the directory instead.
            </CommandEmpty>
            {[...grouped.entries()].map(([group, groupItems]) => {
              const Icon = groupIcons[group];
              return (
                <CommandGroup key={group} heading={group}>
                  {groupItems.map((item) => (
                    <CommandItem
                      key={item.href}
                      value={`${item.title} ${item.href}`}
                      onSelect={() => select(item.href)}
                    >
                      <Icon className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                      <span className="flex-1 truncate">{item.title}</span>
                      <span className="hidden truncate font-mono text-xs text-muted-foreground sm:block">
                        {item.subtitle.length > 44 ? `${item.subtitle.slice(0, 44)}…` : item.subtitle}
                      </span>
                      <CornerDownLeft className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden />
                    </CommandItem>
                  ))}
                </CommandGroup>
              );
            })}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}