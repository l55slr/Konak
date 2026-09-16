"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import type { Alternative, Platform } from "@/lib/schemas";
import { platforms } from "@/lib/schemas";
import { categories } from "@/lib/data";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { pricingLabel } from "@/lib/utils";

const pricingOptions = ["free", "freemium", "paid", "self-host-only"] as const;
const difficultyOptions = ["easy", "medium", "hard"] as const;

export function useParamTools() {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const getList = (key: string) =>
    params.get(key)?.split(",").filter(Boolean) ?? [];

  const setParams = (mutate: (next: URLSearchParams) => void) => {
    const next = new URLSearchParams(params.toString());
    mutate(next);
    const query = next.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const toggleListValue = (key: string, value: string) =>
    setParams((next) => {
      const current = new Set(next.get(key)?.split(",").filter(Boolean) ?? []);
      if (current.has(value)) current.delete(value);
      else current.add(value);
      const joined = [...current].join(",");
      if (joined) next.set(key, joined);
      else next.delete(key);
    });

  const setFlag = (key: string, on: boolean) =>
    setParams((next) => {
      if (on) next.set(key, "1");
      else next.delete(key);
    });

  return { params, getList, setParams, toggleListValue, setFlag };
}

function Panel({
  alternatives,
  params,
  getList,
  toggleListValue,
  setFlag,
  setParams,
}: ReturnType<typeof useParamTools> & { alternatives: Alternative[] }) {
  const selectedCategories = getList("category");
  const selectedPricing = getList("pricing");
  const selectedPlatforms = getList("platform");
  const selectedDifficulty = getList("difficulty");
  const oss = params.get("oss") === "1";
  const selfhost = params.get("selfhost") === "1";

  const counts = useMemo(() => {
    const byCategory = new Map<string, number>();
    for (const alt of alternatives) {
      byCategory.set(alt.category, (byCategory.get(alt.category) ?? 0) + 1);
    }
    return byCategory;
  }, [alternatives]);

  const activeCount =
    selectedCategories.length +
    selectedPricing.length +
    selectedPlatforms.length +
    selectedDifficulty.length +
    (oss ? 1 : 0) +
    (selfhost ? 1 : 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Filters{activeCount > 0 ? ` (${activeCount})` : ""}
        </p>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={() =>
              setParams((next) => {
                for (const key of ["category", "pricing", "platform", "difficulty", "oss", "selfhost", "q"]) {
                  next.delete(key);
                }
              })
            }
            className="font-mono text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
          >
            Clear all
          </button>
        )}
      </div>

      <fieldset>
        <legend className="mb-2.5 text-xs font-medium">Category</legend>
        <div className="space-y-2">
          {categories.map((cat) => (
            <Label key={cat.id} className="flex cursor-pointer items-center gap-2.5 text-sm font-normal">
              <Checkbox
                checked={selectedCategories.includes(cat.id)}
                onCheckedChange={() => toggleListValue("category", cat.id)}
              />
              {cat.label}
              <span className="ml-auto font-mono text-xs text-muted-foreground">
                {counts.get(cat.id) ?? 0}
              </span>
            </Label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2.5 text-xs font-medium">Pricing</legend>
        <div className="space-y-2">
          {pricingOptions.map((option) => (
            <Label key={option} className="flex cursor-pointer items-center gap-2.5 text-sm font-normal">
              <Checkbox
                checked={selectedPricing.includes(option)}
                onCheckedChange={() => toggleListValue("pricing", option)}
              />
              {pricingLabel(option)}
            </Label>
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-2">
        <legend className="mb-2.5 text-xs font-medium">Properties</legend>
        <Label className="flex cursor-pointer items-center gap-2.5 text-sm font-normal">
          <Checkbox checked={oss} onCheckedChange={(v) => setFlag("oss", v === true)} />
          Open source
        </Label>
        <Label className="flex cursor-pointer items-center gap-2.5 text-sm font-normal">
          <Checkbox checked={selfhost} onCheckedChange={(v) => setFlag("selfhost", v === true)} />
          Self-hostable
        </Label>
      </fieldset>

      <fieldset>
        <legend className="mb-2.5 text-xs font-medium">Platform</legend>
        <div className="space-y-2">
          {platforms.map((platform: Platform) => (
            <Label key={platform} className="flex cursor-pointer items-center gap-2.5 text-sm font-normal capitalize">
              <Checkbox
                checked={selectedPlatforms.includes(platform)}
                onCheckedChange={() => toggleListValue("platform", platform)}
              />
              {platform === "cli" ? "Command line" : platform}
            </Label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2.5 text-xs font-medium">Difficulty</legend>
        <div className="space-y-2">
          {difficultyOptions.map((difficulty) => (
            <Label key={difficulty} className="flex cursor-pointer items-center gap-2.5 text-sm font-normal capitalize">
              <Checkbox
                checked={selectedDifficulty.includes(difficulty)}
                onCheckedChange={() => toggleListValue("difficulty", difficulty)}
              />
              {difficulty}
            </Label>
          ))}
        </div>
      </fieldset>
    </div>
  );
}

export function FilterSidebar({ alternatives }: { alternatives: Alternative[] }) {
  const tools = useParamTools();
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-20">
        <Panel alternatives={alternatives} {...tools} />
      </div>
    </aside>
  );
}

export function MobileFilterButton({ alternatives }: { alternatives: Alternative[] }) {
  const tools = useParamTools();
  const activeCount =
    tools.getList("category").length +
    tools.getList("pricing").length +
    tools.getList("platform").length +
    tools.getList("difficulty").length +
    (tools.params.get("oss") === "1" ? 1 : 0) +
    (tools.params.get("selfhost") === "1" ? 1 : 0);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="lg:hidden">
          <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden />
          Filters{activeCount > 0 ? ` (${activeCount})` : ""}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="pt-2">
          <Panel alternatives={alternatives} {...tools} />
        </div>
      </SheetContent>
    </Sheet>
  );
}