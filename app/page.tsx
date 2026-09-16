import Link from "next/link";
import { ArrowRight, Compass, ShieldCheck } from "lucide-react";
import {
  allAlternatives,
  allServices,
  categoriesWithAlternatives,
  mostReplacedServices,
} from "@/lib/data";
import { getAllGuides } from "@/lib/guides";
import { ServiceCard } from "@/components/service-card";
import { GuideCard } from "@/components/guide-card";
import { StartHere } from "@/components/start-here";
import { SearchTrigger } from "@/components/search-command";
import { JsonLd } from "@/components/json-ld";
import { categoryIcons } from "@/lib/icons";
import { SITE } from "@/lib/utils";

export const revalidate = 86400;

export default async function HomePage() {
  const guides = await getAllGuides();
  const featured = guides.slice(0, 3);
  const topServices = mostReplacedServices(6);
  const cats = categoriesWithAlternatives();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: SITE.name,
          url: SITE.url,
          description: SITE.description,
        }}
      />

      {/* Hero */}
      <section className="relative border-b border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(560px 260px at 50% -40px, color-mix(in oklab, var(--accent) 14%, transparent), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-[1200px] px-4 py-20 sm:px-6 sm:py-28">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            A directory for leaving, at your own pace
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-6xl">
            A safe stop on the way out.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Konak is a directory of privacy-respecting alternatives to Google
            and other surveillance-heavy services — plus plain-English guides
            to move over, one step at a time. No accounts. No tracking. No
            pressure to do it all today.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <SearchTrigger variant="hero" />
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-3 text-sm font-medium transition-colors duration-150 hover:bg-surface"
            >
              <Compass className="h-4 w-4" aria-hidden />
              Browse what you can replace
            </Link>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-muted-foreground">
            <li className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden /> No accounts
            </li>
            <li>No analytics</li>
            <li>No cookies except your theme choice</li>
            <li>Uncertain facts marked NEEDS_VERIFICATION</li>
          </ul>
        </div>
      </section>

      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <StartHere className="mt-12" />

        {/* Most replaced */}
        <section className="py-16" aria-labelledby="most-replaced">
          <div className="mb-6 flex items-baseline justify-between">
            <h2
              id="most-replaced"
              className="text-xl font-semibold tracking-[-0.02em]"
            >
              Most replaced
            </h2>
            <Link
              href="/services"
              className="text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground"
            >
              All services →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topServices.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </section>

        {/* Categories */}
        <section
          className="border-t border-border py-16"
          aria-labelledby="categories"
        >
          <div className="mb-6 flex items-baseline justify-between">
            <h2
              id="categories"
              className="text-xl font-semibold tracking-[-0.02em]"
            >
              Categories
            </h2>
            <span className="font-mono text-xs text-muted-foreground">
              {allAlternatives.length} alternatives · {allServices.length}{" "}
              services
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {cats.map((cat) => {
              const Icon = categoryIcons[cat.id];
              return (
                <Link
                  key={cat.id}
                  href={`/alternatives?category=${cat.id}`}
                  className="group rounded-lg border border-border p-4 transition-colors duration-150 hover:bg-surface"
                >
                  <Icon
                    className="h-4 w-4 text-muted-foreground transition-colors duration-150 group-hover:text-accent"
                    aria-hidden
                  />
                  <div className="mt-3 text-sm font-medium">{cat.label}</div>
                  <div className="font-mono text-xs text-muted-foreground">
                    {cat.description}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Featured guides */}
        <section
          className="border-t border-border py-16"
          aria-labelledby="featured-guides"
        >
          <div className="mb-6 flex items-baseline justify-between">
            <h2
              id="featured-guides"
              className="text-xl font-semibold tracking-[-0.02em]"
            >
              Take one step
            </h2>
            <Link
              href="/guides"
              className="text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground"
            >
              All guides →
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {featured.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>
        </section>

        {/* Closing note */}
        <section className="border-t border-border py-16">
          <div className="max-w-2xl">
            <h2 className="text-xl font-semibold tracking-[-0.02em]">
              You don&apos;t have to do it all today.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              A konak was a waystation — a safe stop on a long journey, where
              travellers rested and continued when ready. Pick one service.
              Move it. Come back whenever.{" "}
              <Link
                href="/about"
                className="inline-flex items-center gap-1 text-foreground underline underline-offset-4 transition-colors duration-150 hover:text-accent"
              >
                Why we built this{" "}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </p>
          </div>
        </section>
      </div>
    </>
  );
}