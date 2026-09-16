import Link from "next/link";
import { Compass } from "lucide-react";

export function EmptyState({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-dashed border-border px-6 py-16 text-center">
      <h2 className="text-base font-semibold tracking-[-0.02em]">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
      {children && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">{children}</div>
      )}
    </div>
  );
}

export function EmptyStateSuggestions() {
  return (
    <>
      <Link
        href="/alternatives"
        className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity duration-150 hover:opacity-85"
      >
        <Compass className="h-4 w-4" aria-hidden />
        Clear all filters
      </Link>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors duration-150 hover:bg-surface"
      >
        Or start with the easiest step
      </Link>
    </>
  );
}