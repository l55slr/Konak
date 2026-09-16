import Link from "next/link";
import type { GuideMeta } from "@/lib/guides";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { SearchCommand, SearchTrigger } from "@/components/search-command";

const nav = [
  { href: "/alternatives", label: "Alternatives" },
  { href: "/services", label: "Services" },
  { href: "/guides", label: "Guides" },
  { href: "/stack", label: "Stack" },
  { href: "/about", label: "About" },
];

export function SiteHeader({ guides }: { guides: GuideMeta[] }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="mx-auto flex h-14 max-w-[1200px] items-center gap-6 px-4 sm:px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 text-base font-semibold tracking-[-0.02em]"
          aria-label="Konak — home"
        >
          <Logo />
          Konak
        </Link>
        <nav aria-label="Main" className="hidden flex-1 items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-2.5 py-1.5 text-sm text-muted-foreground transition-colors duration-150 hover:bg-surface hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <SearchTrigger />
          <ThemeToggle />
        </div>
      </div>
      <nav aria-label="Main mobile" className="flex gap-1 overflow-x-auto px-4 pb-2 md:hidden">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="shrink-0 rounded-md px-2.5 py-1.5 text-sm text-muted-foreground transition-colors duration-150 hover:bg-surface hover:text-foreground"
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <SearchCommand guides={guides} />
    </header>
  );
}