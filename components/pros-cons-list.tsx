import { Minus, Plus } from "lucide-react";

export function ProsConsList({ pros, cons }: { pros: string[]; cons: string[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div>
        <h3 className="font-mono text-xs uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
          Good
        </h3>
        <ul className="mt-3 space-y-2.5">
          {pros.map((item) => (
            <li key={item} className="flex gap-2.5 text-sm leading-relaxed">
              <Plus className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-mono text-xs uppercase tracking-widest text-red-600 dark:text-red-400">
          The catch
        </h3>
        <ul className="mt-3 space-y-2.5">
          {cons.map((item) => (
            <li key={item} className="flex gap-2.5 text-sm leading-relaxed">
              <Minus className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-600 dark:text-red-400" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}