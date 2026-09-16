import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import {
  allServices,
  getService,
  recommendedAlternatives,
  pickRecommendation,
  categoryMeta,
} from "@/lib/data";
import { getAllGuides } from "@/lib/guides";
import { AlternativeCard } from "@/components/alternative-card";
import { GuideCard } from "@/components/guide-card";
import { Callout } from "@/components/callout";
import { categoryIcons } from "@/lib/icons";

export const revalidate = 86400;

export function generateStaticParams() {
  return allServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Not found" };
  return {
    title: `Alternatives to ${service.name}`,
    description: `Privacy-respecting replacements for ${service.name}, sorted from easiest to hardest — with honest tradeoffs.`,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const cat = categoryMeta(service.category);
  const Icon = categoryIcons[service.category];
  const alts = recommendedAlternatives(service.slug);
  const recommendation = pickRecommendation(service.slug);
  const guides = (await getAllGuides()).filter(
    (g) => g.service === service.slug
  );

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6">
      <nav
        aria-label="Breadcrumb"
        className="mb-6 font-mono text-xs text-muted-foreground"
      >
        <Link href="/services" className="hover:text-foreground">
          Services
        </Link>
        <span className="mx-2">/</span>
        <span>{service.name}</span>
      </nav>

      <header className="max-w-3xl">
        <div className="flex items-center gap-3">
          <Icon className="h-5 w-5 text-muted-foreground" aria-hidden />
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {cat.label} · made by {service.vendor}
          </p>
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">
          Alternatives to {service.name}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {service.description}
        </p>
      </header>

      <section
        className="mt-10 max-w-3xl rounded-lg border border-border p-6"
        aria-labelledby="why"
      >
        <h2
          id="why"
          className="font-mono text-xs uppercase tracking-widest text-muted-foreground"
        >
          Why people replace it
        </h2>
        <ul className="mt-4 space-y-2.5">
          {service.whyReplace.map((reason) => (
            <li key={reason} className="flex gap-3 text-sm leading-relaxed">
              <span
                aria-hidden
                className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
              />
              {reason}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
          Using {service.name} doesn&apos;t make you a bad person. These are
          reasons, not judgments — move when and if it suits you.
        </p>
      </section>

      {recommendation && (
        <div className="mt-8 max-w-3xl">
          <Callout
            variant="info"
            title={`Still not sure? Start with ${recommendation.name}.`}
          >
            {recommendation.tagline} It&apos;s the gentlest option here, you
            can keep {service.name} while you try it, and undoing it takes
            minutes.{" "}
            <Link
              href={`/alternatives/${recommendation.slug}`}
              className="underline underline-offset-4"
            >
              See the details
            </Link>
            .
          </Callout>
        </div>
      )}

      <section className="mt-12" aria-labelledby="alternatives">
        <div className="mb-6 flex items-baseline justify-between">
          <h2
            id="alternatives"
            className="text-lg font-semibold tracking-[-0.02em]"
          >
            {alts.length} alternative{alts.length === 1 ? "" : "s"}, easiest
            first
          </h2>
          <span className="font-mono text-xs text-muted-foreground">
            &quot;Easy&quot; means easy for a non-technical person
          </span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {alts.map((alt) => (
            <AlternativeCard key={alt.slug} alternative={alt} />
          ))}
        </div>
      </section>

      {guides.length > 0 && (
        <section
          className="mt-16 border-t border-border pt-10"
          aria-labelledby="guides"
        >
          <h2
            id="guides"
            className="mb-6 text-lg font-semibold tracking-[-0.02em]"
          >
            Migration guides for {service.name}
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {guides.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>
        </section>
      )}

      <p className="mt-12 max-w-xl text-sm text-muted-foreground">
        Nothing here has to happen today. Pick one card above whenever
        you&apos;re ready — or go back to{" "}
        <Link
          href="/services"
          className="inline-flex items-center gap-1 underline underline-offset-4 hover:text-foreground"
        >
          all services <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
        .
      </p>
    </div>
  );
}