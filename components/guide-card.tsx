import Link from "next/link";
import { Clock } from "lucide-react";
import type { GuideMeta } from "@/lib/guides";
import { getService } from "@/lib/data";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { formatDate } from "@/lib/utils";

export function GuideCard({ guide }: { guide: GuideMeta }) {
  const service = getService(guide.service);
  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="group flex flex-col rounded-lg border border-border p-5 transition-colors duration-150 hover:bg-surface"
    >
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {service ? service.name : "Migration"}
      </p>
      <h3 className="mt-2 text-base font-semibold leading-snug tracking-[-0.02em]">
        {guide.title}
      </h3>
      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {guide.description}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
        <DifficultyBadge difficulty={guide.difficulty} />
        <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" aria-hidden />
          {guide.timeEstimate}
        </span>
        <span className="font-mono text-xs text-muted-foreground">
          Updated {formatDate(guide.lastUpdated)}
        </span>
      </div>
    </Link>
  );
}