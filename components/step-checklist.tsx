"use client";

import { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { slugify } from "@/lib/utils";

/**
 * Per-guide progress, persisted in localStorage only. No account, no sync,
 * nothing leaves the browser — clearing site data resets it, which is fine.
 */
export function StepChecklist({ slug, steps }: { slug: string; steps: string[] }) {
  const storageKey = `konak-checklist:${slug}`;
  const ids = steps.map((step) => slugify(step));
  const [done, setDone] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setDone(JSON.parse(raw) as string[]);
    } catch {
      // Corrupt or unavailable storage — start fresh.
    }
    setLoaded(true);
  }, [storageKey]);

  function toggle(id: string, checked: boolean) {
    const next = checked ? [...done, id] : done.filter((d) => d !== id);
    setDone(next);
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      // Nothing to do; state stays for this session.
    }
  }

  function reset() {
    setDone([]);
    try {
      localStorage.removeItem(storageKey);
    } catch {
      // Ignore.
    }
  }

  const completed = ids.filter((id) => done.includes(id)).length;
  const percent = steps.length > 0 ? Math.round((completed / steps.length) * 100) : 0;

  return (
    <section
      aria-label="Your progress through this guide"
      className="rounded-lg border border-border p-5"
    >
      <div className="flex items-center justify-between gap-4">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Your progress — {completed} of {steps.length}
          {loaded && percent === 100 ? " · done. Nicely walked." : ""}
        </p>
        {completed > 0 && (
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors duration-150 hover:text-foreground"
          >
            <RotateCcw className="h-3 w-3" aria-hidden />
            Reset
          </button>
        )}
      </div>
      <div
        className="mt-3 h-1 overflow-hidden rounded-full bg-surface"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Guide progress"
      >
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
      <ol className="mt-4 space-y-3">
        {steps.map((step, index) => {
          const id = ids[index];
          const checked = done.includes(id);
          return (
            <li key={id}>
              <label className="flex cursor-pointer items-start gap-3 text-sm">
                <Checkbox
                  checked={checked}
                  onCheckedChange={(value) => toggle(id, value === true)}
                  className="mt-0.5"
                  aria-label={`Step ${index + 1}: ${step}`}
                />
                <span className={checked ? "text-muted-foreground line-through" : ""}>
                  <span className="mr-2 font-mono text-xs text-muted-foreground">
                    {index + 1}.
                  </span>
                  {step}
                </span>
              </label>
            </li>
          );
        })}
      </ol>
    </section>
  );
}