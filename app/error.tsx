"use client";

import Link from "next/link";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalRouteError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-24 sm:px-6">
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        Something went wrong
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">
        The lamp went out for a moment.
      </h1>
      <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
        An error interrupted this page. Nothing was saved about you —
        there&apos;s nothing to save — so you can simply try again.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button onClick={reset}>
          <RotateCcw className="h-4 w-4" aria-hidden />
          Try again
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Back to safety</Link>
        </Button>
      </div>
    </div>
  );
}