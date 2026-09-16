import type { MetadataRoute } from "next";
import { allAlternatives, allServices } from "@/lib/data";
import { getAllGuides } from "@/lib/guides";
import { SITE } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const guides = await getAllGuides();
  const staticRoutes = [
    "",
    "/alternatives",
    "/services",
    "/guides",
    "/stack",
    "/about",
    "/privacy",
    "/contribute",
    "/credits",
  ].map((route) => ({
    url: `${SITE.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.7,
  }));

  return [
    ...staticRoutes,
    ...allServices.map((s) => ({
      url: `${SITE.url}/services/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...allAlternatives.map((a) => ({
      url: `${SITE.url}/alternatives/${a.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...guides.map((g) => ({
      url: `${SITE.url}/guides/${g.slug}`,
      lastModified: g.lastUpdated,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}