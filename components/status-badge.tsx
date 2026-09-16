import { Check, CircleDashed, CircleSlash, TriangleAlert } from "lucide-react";
import type { Status } from "@/lib/schemas";
import { NEEDS_VERIFICATION } from "@/lib/utils";
import { cn } from "@/lib/utils";

const styles: Record<string, string> = {
  active: "border-emerald-600/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  beta: "border-sky-600/40 bg-sky-500/10 text-sky-700 dark:text-sky-400",
  caution: "border-amber-600/40 bg-amber-500/10 text-amber-700 dark:text-amber-400",
  unmaintained: "border-red-600/40 bg-red-500/10 text-red-700 dark:text-red-400",
  unverified: "border-dashed border-border bg-surface text-muted-foreground",
};

const labels: Record<string, string> = {
  active: "Active",
  beta: "Beta",
  caution: "Caution",
  unmaintained: "Unmaintained",
  unverified: "Status unverified",
};

export function StatusBadge({ status }: { status: Status }) {
  if (status === NEEDS_VERIFICATION) {
    return (
      <span className={cn("inline-flex items-center gap-1 rounded-md border px-2 py-0.5 font-mono text-xs", styles.unverified)}>
        <CircleDashed className="h-3 w-3" aria-hidden />
        {labels.unverified}
      </span>
    );
  }
  const icons = {
    active: Check,
    beta: CircleDashed,
    caution: TriangleAlert,
    unmaintained: CircleSlash,
  } as const;
  const Icon = icons[status];
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-md border px-2 py-0.5 font-mono text-xs", styles[status])}>
      <Icon className="h-3 w-3" aria-hidden />
      {labels[status]}
    </span>
  );
}