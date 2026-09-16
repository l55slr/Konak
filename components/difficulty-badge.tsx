import type { Difficulty } from "@/lib/schemas";
import { cn } from "@/lib/utils";

const dot: Record<Difficulty, string> = {
  easy: "bg-emerald-500",
  medium: "bg-amber-500",
  hard: "bg-red-500",
};

const label: Record<Difficulty, string> = {
  easy: "Easy switch",
  medium: "Medium",
  hard: "Hard",
};

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
      <span aria-hidden className={cn("h-2 w-2 rounded-full", dot[difficulty])} />
      {label[difficulty]}
    </span>
  );
}