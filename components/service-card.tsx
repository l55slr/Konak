import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/lib/schemas";
import { categoryMeta, alternativesCount } from "@/lib/data";
import { categoryIcons } from "@/lib/icons";

export function ServiceCard({
  service,
  count,
}: {
  service: Service;
  count?: number;
}) {
  const cat = categoryMeta(service.category);
  const Icon = categoryIcons[service.category];
  const alternatives = count ?? alternativesCount(service.slug);
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex flex-col rounded-lg border border-border p-5 transition-colors duration-150 hover:bg-surface"
    >
      <div className="flex items-center justify-between">
        <Icon
          className="h-4 w-4 text-muted-foreground transition-colors duration-150 group-hover:text-accent"
          aria-hidden
        />
        <ArrowRight
          className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity duration-150 group-hover:opacity-100"
          aria-hidden
        />
      </div>
      <h3 className="mt-4 text-base font-semibold tracking-[-0.02em]">
        {service.name}
      </h3>
      <p className="mt-1 font-mono text-xs text-muted-foreground">
        {service.vendor} · {cat.label}
      </p>
      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
        {service.description}
      </p>
      <p className="mt-4 font-mono text-xs text-muted-foreground">
        {alternatives} alternative{alternatives === 1 ? "" : "s"}
      </p>
    </Link>
  );
}