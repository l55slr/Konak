import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Clock, RotateCcw } from "lucide-react";
import { getAllGuides, getGuide } from "@/lib/guides";
import { getService } from "@/lib/data";
import { mdxComponents } from "@/components/mdx";
import { StepChecklist } from "@/components/step-checklist";
import { TableOfContents } from "@/components/table-of-contents";
import { Callout } from "@/components/callout";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { JsonLd } from "@/components/json-ld";
import { SITE, formatDate } from "@/lib/utils";

export const revalidate = 86400;

const guidesDir = path.join(process.cwd(), "content", "guides");

export function generateStaticParams() {
  return fs
    .readdirSync(guidesDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => ({ slug: f.replace(/\.mdx$/, "") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = await getGuide(slug);
  if (!guide) return { title: "Not found" };
  return {
    title: guide.title,
    description: guide.description,
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = await getGuide(slug);
  if (!guide) notFound();

  const service = getService(guide.service);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: guide.title,
          description: guide.description,
          totalTime: guide.timeEstimate,
          step: guide.steps.map((step, index) => ({
            "@type": "HowToStep",
            position: index + 1,
            name: step,
            url: `${SITE.url}/guides/${guide.slug}`,
          })),
        }}
      />
      <article className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6">
        <header className="max-w-3xl">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 font-mono text-xs text-muted-foreground"
          >
            <Link href="/guides" className="hover:text-foreground">
              Guides
            </Link>
            <span className="mx-2">/</span>
            {service ? (
              <Link
                href={`/services/${service.slug}`}
                className="hover:text-foreground"
              >
                {service.name}
              </Link>
            ) : (
              <span>Migration</span>
            )}
          </nav>
          <h1 className="text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-4xl">
            {guide.title}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {guide.description}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-muted-foreground">
            <DifficultyBadge difficulty={guide.difficulty} />
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" aria-hidden />
              {guide.timeEstimate}
            </span>
            <span>{guide.steps.length} steps</span>
            <span>Updated {formatDate(guide.lastUpdated)}</span>
          </div>
        </header>

        <div className="mt-8 max-w-3xl">
          <StepChecklist slug={guide.slug} steps={guide.steps} />
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[240px_1fr]">
          <aside className="hidden lg:block">
            <TableOfContents items={guide.toc} />
          </aside>
          <div className="prose max-w-3xl">
            <MDXRemote source={guide.content} components={mdxComponents} />
            <Callout variant="info" title="You can stop here and come back later">
              This guide keeps your place: the checklist above remembers which
              steps you&apos;ve finished, in this browser. Close the tab, sleep
              on it, come back next weekend. The journey doesn&apos;t expire.
            </Callout>
            {service && (
              <p>
                Related:{" "}
                <Link href={`/services/${service.slug}`}>
                  all alternatives to {service.name}
                </Link>
                .
              </p>
            )}
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <RotateCcw className="h-3.5 w-3.5" aria-hidden />
              Spotted something wrong or outdated?{" "}
              <Link href="/contribute" className="underline underline-offset-2">
                Tell us
              </Link>{" "}
              — accuracy matters more than completeness here.
            </p>
          </div>
        </div>
      </article>
    </>
  );
}