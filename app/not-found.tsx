import Link from "next/link";
import { Compass } from "lucide-react";
import { SearchTrigger } from "@/components/search-command";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-24 sm:px-6">
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        404
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">
        This door doesn&apos;t lead anywhere.
      </h1>
      <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
        The page you were looking for isn&apos;t here. That&apos;s our fault,
        not yours. Nothing broke on your end — take a breath and pick a door
        that does lead somewhere.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <SearchTrigger />
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium transition-colors duration-150 hover:bg-surface"
        >
          <Compass className="h-4 w-4" aria-hidden />
          Back to the front door
        </Link>
      </div>
    </div>
  );
}