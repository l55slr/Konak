import Link from "next/link";
import { Logo } from "@/components/logo";
import { SITE } from "@/lib/utils";

const columns = [
  {
    heading: "Directory",
    links: [
      { href: "/alternatives", label: "Alternatives" },
      { href: "/services", label: "Services" },
      { href: "/guides", label: "Guides" },
      { href: "/stack", label: "Stack builder" },
    ],
  },
  {
    heading: "Konak",
    links: [
      { href: "/about", label: "About" },
      { href: "/privacy", label: "Privacy" },
      { href: "/contribute", label: "Contribute" },
      { href: "/credits", label: "Credits" },
    ],
  },
  {
    heading: "Elsewhere",
    links: [
      { href: SITE.repoUrl, label: "GitHub" },
      { href: "/rss.xml", label: "RSS (guides)" },
      { href: "/sitemap.xml", label: "Sitemap" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-[1fr_repeat(3,minmax(0,160px))]">
          <div>
            <Link href="/" className="flex items-center gap-2 font-semibold tracking-[-0.02em]">
              <Logo />
              Konak
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              A safe stop on the way out. Rest here, change one thing, continue
              when ready.
            </p>
          </div>
          {columns.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {column.heading}
              </p>
              <ul className="mt-3 space-y-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 font-mono text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>No analytics. No tracking. One localStorage key for your theme.</p>
          <p>Code: MIT · Content: CC0 1.0</p>
        </div>
      </div>
    </footer>
  );
}