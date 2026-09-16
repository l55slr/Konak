import Link from "next/link";
import { PenLine, Rss } from "lucide-react";
import { getAllGuides } from "@/lib/guides";
import { GuideCard } from "@/components/guide-card";

export const revalidate = 86400;

export const metadata = {
  title: "Guides",
  description:
    "Plain-English migration guides for leaving surveillance-heavy services — one step at a time, with permission to stop and rest.",
};

export default async function GuidesPage() {
  const guides = await getAllGuides();

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6">
      <header className="mb-10 max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Waystation reading
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">
          Migration guides
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Short, calm, complete walkthroughs. Every guide assumes no technical
          background, tells you up front if a step is a bigger one, and gives
          you explicit permission to stop halfway and come back later.
        </p>
        <Link
          href="/rss.xml"
          className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors duration-150 hover:text-foreground"
        >
          <Rss className="h-3.5 w-3.5" aria-hidden />
          RSS feed for new guides
        </Link>
      </header>

      {guides.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border px-6 py-16 text-center">
          <h2 className="text-base font-semibold tracking-[-0.02em]">
            No guides yet.
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
            Guides live as files in content/guides — written slowly, tested on
            real people, and only published once they&apos;re genuinely
            followable. The first one is being written.
          </p>
          <p className="mt-6 inline-flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <PenLine className="h-3.5 w-3.5" aria-hidden />
            Draft one in content/guides to see it here
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
      )}
    </div>
  );
}