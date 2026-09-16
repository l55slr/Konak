import Link from "next/link";
import { DoorOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export function StartHere({ className }: { className?: string }) {
  return (
    <section
      aria-labelledby="start-here"
      className={cn("rounded-lg border border-accent/40 p-6 sm:p-8", className)}
    >
      <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent">
        <DoorOpen className="h-4 w-4" aria-hidden />
        Start here if you&apos;re overwhelmed
      </p>
      <h2 id="start-here" className="mt-4 text-xl font-semibold tracking-[-0.02em] sm:text-2xl">
        Switch your search engine. That&apos;s it. That&apos;s the first step.
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Change one setting to DuckDuckGo: five minutes, no new account, nothing
        imports, nothing breaks — and you can undo it in the same five minutes.
        It&apos;s a real, complete first move away from Google, and it&apos;s
        small on purpose.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/guides/replace-google-search"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity duration-150 hover:opacity-85"
        >
          Read the five-minute guide
        </Link>
        <Link
          href="/alternatives"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium transition-colors duration-150 hover:bg-surface"
        >
          Or browse everything
        </Link>
      </div>
      <p className="mt-4 font-mono text-xs text-muted-foreground">
        You can keep your Google account while you try this. That&apos;s true
        of every step on this site.
      </p>
    </section>
  );
}