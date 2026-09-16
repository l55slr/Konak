import { categories, type CategoryMeta } from "@/data/categories";
import servicesJson from "@/data/services.json";
import alternativesJson from "@/data/alternatives.json";
import {
  alternativeSchema,
  serviceSchema,
  type Alternative,
  type Service,
  type ServiceCategory,
} from "@/lib/schemas";
import { difficultyRank, verifiedDate } from "@/lib/utils";

export { categories };
export type { CategoryMeta };

// Every entry is Zod-validated as it loads. A malformed entry fails loudly
// at build/dev time instead of rendering half-broken pages.
export const allServices: Service[] = servicesJson.map((s) =>
  serviceSchema.parse(s)
);
export const allAlternatives: Alternative[] = alternativesJson.map((a) =>
  alternativeSchema.parse(a)
);

export function getService(slug: string): Service | undefined {
  return allServices.find((s) => s.slug === slug);
}

export function getAlternative(slug: string): Alternative | undefined {
  return allAlternatives.find((a) => a.slug === slug);
}

export function alternativesForService(serviceSlug: string): Alternative[] {
  return allAlternatives.filter((a) => a.replaces.includes(serviceSlug));
}

export function alternativesForCategory(
  category: ServiceCategory
): Alternative[] {
  return allAlternatives.filter((a) => a.category === category);
}

export function categoryMeta(id: ServiceCategory): CategoryMeta {
  return categories.find((c) => c.id === id) ?? categories[0];
}

export function alternativesCount(serviceSlug: string): number {
  return alternativesForService(serviceSlug).length;
}

/** Services sorted by how many alternatives exist, descending. */
export function mostReplacedServices(limit: number): Service[] {
  return [...allServices]
    .map((service) => ({
      service,
      count: alternativesForService(service.slug).length,
    }))
    .filter((entry) => entry.count > 0)
    .sort(
      (a, b) =>
        b.count - a.count || a.service.name.localeCompare(b.service.name)
    )
    .slice(0, limit)
    .map((entry) => entry.service);
}

export function categoriesWithAlternatives(): CategoryMeta[] {
  return categories.filter((c) => alternativesForCategory(c.id).length > 0);
}

export function sortAlternatives(
  list: Alternative[],
  sort: string
): Alternative[] {
  const sorted = [...list];
  switch (sort) {
    case "difficulty-asc":
      sorted.sort(
        (a, b) =>
          difficultyRank(a.difficulty) - difficultyRank(b.difficulty) ||
          a.name.localeCompare(b.name)
      );
      break;
    case "verified-desc":
      sorted.sort(
        (a, b) =>
          verifiedDate(b).localeCompare(verifiedDate(a)) ||
          a.name.localeCompare(b.name)
      );
      break;
    default:
      sorted.sort((a, b) => a.name.localeCompare(b.name));
  }
  return sorted;
}

/** Alternatives for a service, easiest first. */
export function recommendedAlternatives(serviceSlug: string): Alternative[] {
  return sortAlternatives(alternativesForService(serviceSlug), "difficulty-asc");
}

export function pickRecommendation(
  serviceSlug: string
): Alternative | undefined {
  const list = recommendedAlternatives(serviceSlug);
  return (
    list.find((a) => a.status === "active" && a.difficulty === "easy") ??
    list[0]
  );
}