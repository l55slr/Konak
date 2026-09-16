"use client";

import Link from "next/link";
import { X } from "lucide-react";
import type { Alternative } from "@/lib/schemas";
import { StatusBadge } from "@/components/status-badge";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { PlatformList } from "@/components/platform-icons";
import { NEEDS_VERIFICATION, pricingLabel } from "@/lib/utils";
import { getService } from "@/lib/data";

function cell(value: string | boolean | undefined | null): string {
  if (value === NEEDS_VERIFICATION) return NEEDS_VERIFICATION;
  if (value === undefined || value === null) return "—";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return value;
}

export function ComparisonTable({
  items,
  onRemove,
}: {
  items: Alternative[];
  onRemove: (slug: string) => void;
}) {
  const rows: { label: string; render: (alt: Alternative) => React.ReactNode }[] = [
    { label: "Pricing", render: (a) => pricingLabel(a.pricing) },
    { label: "Difficulty", render: (a) => <DifficultyBadge difficulty={a.difficulty} /> },
    { label: "Status", render: (a) => <StatusBadge status={a.status} /> },
    { label: "Open source", render: (a) => cell(a.openSource) },
    { label: "Self-hostable", render: (a) => cell(a.selfHostable) },
    { label: "Jurisdiction", render: (a) => cell(a.jurisdiction) },
    { label: "License", render: (a) => cell(a.license) },
    { label: "Platforms", render: (a) => <PlatformList platforms={a.platforms} /> },
    {
      label: "Replaces",
      render: (a) => a.replaces.map((s) => getService(s)?.name ?? s).join(", "),
    },
    { label: "Last verified", render: (a) => cell(a.lastVerified) },
  ];

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full border-collapse text-sm">
        <caption className="sr-only">Side-by-side comparison of selected alternatives</caption>
        <thead>
          <tr className="border-b border-border bg-surface">
            <th scope="col" className="px-4 py-3 text-left font-mono text-xs uppercase tracking-wide text-muted-foreground">
              Compare
            </th>
            {items.map((alt) => (
              <th key={alt.slug} scope="col" className="px-4 py-3 text-left">
                <span className="flex items-center gap-2">
                  <Link href={`/alternatives/${alt.slug}`} className="font-semibold underline-offset-4 hover:underline">
                    {alt.name}
                  </Link>
                  <button
                    type="button"
                    onClick={() => onRemove(alt.slug)}
                    aria-label={`Remove ${alt.name} from comparison`}
                    className="rounded p-0.5 text-muted-foreground transition-colors duration-150 hover:text-foreground"
                  >
                    <X className="h-3.5 w-3.5" aria-hidden />
                  </button>
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-border last:border-b-0">
              <th scope="row" className="px-4 py-3 text-left font-mono text-xs uppercase tracking-wide text-muted-foreground">
                {row.label}
              </th>
              {items.map((alt) => (
                <td key={alt.slug} className="px-4 py-3 align-top">
                  {row.render(alt)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}