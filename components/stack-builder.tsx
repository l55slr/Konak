"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Check, Copy, Printer } from "lucide-react";
import type { Alternative } from "@/lib/schemas";
import { categories } from "@/lib/data";
import { difficultyRank, pricingLabel } from "@/lib/utils";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const difficultyShort = { easy: "Easy", medium: "Medium", hard: "Hard" } as const;

export function StackBuilder({ alternatives }: { alternatives: Alternative[] }) {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => setMounted(true), []);

  const byCategory = useMemo(() => {
    const map = new Map<string, Alternative[]>();
    for (const alt of alternatives) {
      const list = map.get(alt.category) ?? [];
      list.push(alt);
      map.set(alt.category, list);
    }
    for (const list of map.values()) {
      list.sort(
        (a, b) =>
          difficultyRank(a.difficulty) - difficultyRank(b.difficulty) ||
          a.name.localeCompare(b.name)
      );
    }
    return map;
  }, [alternatives]);

  const activeCategories = categories.filter((c) => byCategory.has(c.id));

  const picks = activeCategories.flatMap((cat) => {
    const slug = params.get(cat.id);
    if (!slug) return [];
    const alt = byCategory.get(cat.id)?.find((a) => a.slug === slug);
    return alt ? [{ cat, alt }] : [];
  });

  function setPick(categoryId: string, slug: string) {
    const next = new URLSearchParams(params.toString());
    if (slug) next.set(categoryId, slug);
    else next.delete(categoryId);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  const qs = params.toString();
  const shareUrl = mounted
    ? `${window.location.origin}${pathname}${qs ? `?${qs}` : ""}`
    : "";

  async function copyShareUrl() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable — the URL is visible in the address bar anyway.
    }
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
      <div className="space-y-5">
        {activeCategories.map((cat) => (
          <div key={cat.id} className="rounded-lg border border-border p-4">
            <div className="mb-3 flex items-baseline justify-between gap-4">
              <div>
                <p className="text-sm font-medium">{cat.label}</p>
                <p className="font-mono text-xs text-muted-foreground">{cat.description}</p>
              </div>
              {picks.some((p) => p.cat.id === cat.id) && (
                <span className="inline-flex items-center gap-1 font-mono text-xs text-accent">
                  <Check className="h-3 w-3" aria-hidden />
                  picked
                </span>
              )}
            </div>
            <Select
              value={params.get(cat.id) ?? ""}
              onChange={(event) => setPick(cat.id, event.target.value)}
              aria-label={`Choose your ${cat.label.toLowerCase()} alternative`}
            >
              <option value="">— decide later —</option>
              {(byCategory.get(cat.id) ?? []).map((alt) => (
                <option key={alt.slug} value={alt.slug}>
                  {alt.name} ({difficultyShort[alt.difficulty]} · {pricingLabel(alt.pricing)})
                </option>
              ))}
            </Select>
          </div>
        ))}
      </div>

      <aside className="no-print">
        <div className="sticky top-20 space-y-4">
          <div className="rounded-lg border border-border p-4">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Your route — {picks.length} of {activeCategories.length} picked
            </p>
            {picks.length === 0 ? (
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Empty is a fine place to start. Pick one category — or none —
                and come back whenever. Nothing here is sent anywhere.
              </p>
            ) : (
              <ol className="mt-3 space-y-2.5">
                {picks.map(({ cat, alt }) => (
                  <li key={cat.id} className="text-sm">
                    <span className="font-mono text-xs text-muted-foreground">
                      {cat.label}:{" "}
                    </span>
                    {alt.name}
                    <span className="ml-1.5 font-mono text-xs text-muted-foreground">
                      ({difficultyShort[alt.difficulty]})
                    </span>
                  </li>
                ))}
              </ol>
            )}
          </div>

          <div className="rounded-lg border border-border p-4">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Share this stack
            </p>
            <input
              readOnly
              value={shareUrl}
              aria-label="Shareable link to your stack"
              className="mt-3 w-full rounded-md border border-border bg-surface px-2.5 py-2 font-mono text-xs text-muted-foreground"
              placeholder="Pick something to generate your link"
            />
            <div className="mt-3 flex gap-2">
              <Button size="sm" className="flex-1" onClick={copyShareUrl} disabled={!shareUrl}>
                {copied ? <Check className="h-3.5 w-3.5" aria-hidden /> : <Copy className="h-3.5 w-3.5" aria-hidden />}
                {copied ? "Copied" : "Copy link"}
              </Button>
              <Button size="sm" variant="outline" className="flex-1" onClick={() => window.print()}>
                <Printer className="h-3.5 w-3.5" aria-hidden />
                Print
              </Button>
            </div>
            <p className="mt-3 font-mono text-xs leading-relaxed text-muted-foreground">
              Your choices live only in this link — no account, no server, no
              storage. Opening the link recreates the list; that&apos;s the
              whole system.
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}