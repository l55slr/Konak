"use client";

import Link from "next/link";
import { Check, Plus } from "lucide-react";
import type { Alternative } from "@/lib/schemas";
import { StatusBadge } from "@/components/status-badge";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { PlatformList } from "@/components/platform-icons";
import { cn, pricingLabel } from "@/lib/utils";

export function AlternativeCard({
  alternative,
  inCompare = false,
  compareFull = false,
  onToggleCompare,
  view = "grid",
}: {
  alternative: Alternative;
  inCompare?: boolean;
  compareFull?: boolean;
  onToggleCompare?: (slug: string) => void;
  view?: "grid" | "list";
}) {
  return (
    <article
      className={cn(
        "group relative rounded-lg border border-border p-5 transition-colors duration-150 hover:bg-surface",
        view === "list" && "sm:flex sm:items-start sm:gap-6"
      )}
    >
      <div className={cn(view === "list" && "sm:flex-1")}>
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-base font-semibold tracking-[-0.02em]">
            <Link href={`/alternatives/${alternative.slug}`} className="after:absolute after:inset-0">
              {alternative.name}
            </Link>
          </h3>
          <StatusBadge status={alternative.status} />
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {alternative.tagline}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
          <DifficultyBadge difficulty={alternative.difficulty} />
          <span className="font-mono text-xs text-muted-foreground">
            {pricingLabel(alternative.pricing)}
          </span>
          <PlatformList platforms={alternative.platforms} />
        </div>
      </div>
      {onToggleCompare && (
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            onToggleCompare(alternative.slug);
          }}
          disabled={!inCompare && compareFull}
          aria-pressed={inCompare}
          aria-label={`${inCompare ? "Remove" : "Add"} ${alternative.name} ${inCompare ? "from" : "to"} comparison`}
          className={cn(
            "relative z-10 mt-4 inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-xs transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-40 sm:mt-0",
            inCompare
              ? "border-accent/50 bg-accent/10 text-accent"
              : "border-border text-muted-foreground hover:bg-background"
          )}
        >
          {inCompare ? <Check className="h-3 w-3" aria-hidden /> : <Plus className="h-3 w-3" aria-hidden />}
          Compare
        </button>
      )}
    </article>
  );
}