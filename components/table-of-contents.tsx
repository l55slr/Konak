import type { TocItem } from "@/lib/guides";

export function TableOfContents({ items }: { items: TocItem[] }) {
  if (items.length === 0) return null;
  return (
    <nav aria-label="On this page" className="sticky top-20">
      <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        On this page
      </p>
      <ul className="space-y-1.5 border-l border-border">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={
                item.level === 2
                  ? "-ml-px block border-l border-transparent pl-3 text-sm text-muted-foreground transition-colors duration-150 hover:border-accent hover:text-foreground"
                  : "-ml-px block border-l border-transparent pl-6 text-xs text-muted-foreground transition-colors duration-150 hover:border-accent hover:text-foreground"
              }
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}