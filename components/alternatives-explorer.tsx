"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { LayoutGrid, List, Search } from "lucide-react";
import type { Alternative } from "@/lib/schemas";
import { sortAlternatives } from "@/lib/data";
import { AlternativeCard } from "@/components/alternative-card";
import { ComparisonTable } from "@/components/comparison-table";
import { EmptyState, EmptyStateSuggestions } from "@/components/empty-state";
import {
  FilterSidebar,
  MobileFilterButton,
  useParamTools,
} from "@/components/filter-sidebar";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export function AlternativesExplorer({
  alternatives,
}: {
  alternatives: Alternative[];
}) {
  const { params, setParams } = useParamTools();

  const q = (params.get("q") ?? "").toLowerCase();
  const sort = params.get("sort") ?? "name-asc";
  const view = params.get("view") === "list" ? "list" : "grid";
  const compareSlugs = (params.get("compare") ?? "")
    .split(",")
    .filter(Boolean)
    .slice(0, 3);

  const filtered = useMemo(() => {
    const getList = (key: string) =>
      (params.get(key) ?? "").split(",").filter(Boolean);
    const cats = getList("category");
    const pricing = getList("pricing");
    const platformList = getList("platform");
    const diffs = getList("difficulty");
    const oss = params.get("oss") === "1";
    const selfhost = params.get("selfhost") === "1";

    const result = alternatives.filter((alt) => {
      if (cats.length > 0 && !cats.includes(alt.category)) return false;
      if (pricing.length > 0 && !(alt.pricing !== "NEEDS_VERIFICATION" && pricing.includes(alt.pricing))) return false;
      if (platformList.length > 0 && !platformList.some((p) => alt.platforms.includes(p as Alternative["platforms"][number]))) return false;
      if (diffs.length > 0 && !diffs.includes(alt.difficulty)) return false;
      if (oss && alt.openSource !== true) return false;
      if (selfhost && alt.selfHostable !== true) return false;
      if (q && !`${alt.name} ${alt.tagline} ${alt.description}`.toLowerCase().includes(q)) return false;
      return true;
    });
    return sortAlternatives(result, sort);
  }, [alternatives, params, q, sort]);

  const compareItems = compareSlugs
    .map((slug) => alternatives.find((a) => a.slug === slug))
    .filter((a): a is Alternative => Boolean(a));

  const toggleCompare = (slug: string) => {
    const next = compareSlugs.includes(slug)
      ? compareSlugs.filter((s) => s !== slug)
      : [...compareSlugs, slug].slice(0, 3);
    setParams((p) => {
      if (next.length > 0) p.set("compare", next.join(","));
      else p.delete("compare");
    });
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
      <FilterSidebar alternatives={alternatives} />

      <div>
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <MobileFilterButton alternatives={alternatives} />
          <div className="relative min-w-48 flex-1">
            <Search
              className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              defaultValue={params.get("q") ?? ""}
              placeholder="Filter by name…"
              aria-label="Filter alternatives by name"
              className="pl-8"
              onChange={(event) =>
                setParams((p) => {
                  const value = event.target.value.trim();
                  if (value) p.set("q", value);
                  else p.delete("q");
                })
              }
            />
          </div>
          <Select
            value={sort}
            onChange={(event) =>
              setParams((p) => {
                if (event.target.value === "name-asc") p.delete("sort");
                else p.set("sort", event.target.value);
              })
            }
            aria-label="Sort alternatives"
            className="w-44"
          >
            <option value="name-asc">Name (A–Z)</option>
            <option value="difficulty-asc">Easiest first</option>
            <option value="verified-desc">Recently verified</option>
          </Select>
          <div role="group" aria-label="View mode" className="flex overflow-hidden rounded-md border border-border">
            <button
              type="button"
              aria-label="Grid view"
              aria-pressed={view === "grid"}
              onClick={() => setParams((p) => p.delete("view"))}
              className={cn(
                "p-2 transition-colors duration-150",
                view === "grid" ? "bg-surface text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <LayoutGrid className="h-4 w-4" aria-hidden />
            </button>
            <button
              type="button"
              aria-label="List view"
              aria-pressed={view === "list"}
              onClick={() => setParams((p) => p.set("view", "list"))}
              className={cn(
                "p-2 transition-colors duration-150",
                view === "list" ? "bg-surface text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <List className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>

        <p className="mb-4 font-mono text-xs text-muted-foreground" role="status">
          {filtered.length} of {alternatives.length} alternatives
          {compareSlugs.length > 0
            ? ` · comparing ${compareSlugs.length}/3`
            : " · tick Compare on cards to compare up to three"}
        </p>

        {compareItems.length > 0 && (
          <div className="mb-8">
            <ComparisonTable items={compareItems} onRemove={(slug) => toggleCompare(slug)} />
          </div>
        )}

        {filtered.length === 0 ? (
          <EmptyState
            title="Nothing matches those filters."
            description="That combination doesn't exist yet — which is worth knowing, not a dead end. Loosen a filter, or take the pressure off and start with the easiest switch."
          >
            <EmptyStateSuggestions />
          </EmptyState>
        ) : (
          <div
            className={cn(
              view === "grid"
                ? "grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
                : "flex flex-col gap-3"
            )}
          >
            {filtered.map((alt) => (
              <AlternativeCard
                key={alt.slug}
                alternative={alt}
                view={view}
                inCompare={compareSlugs.includes(alt.slug)}
                compareFull={compareSlugs.length >= 3 && !compareSlugs.includes(alt.slug)}
                onToggleCompare={toggleCompare}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}