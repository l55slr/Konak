import { Suspense } from "react";
import { allAlternatives, allServices } from "@/lib/data";
import { AlternativesExplorer } from "@/components/alternatives-explorer";
import { JsonLd } from "@/components/json-ld";
import { SITE } from "@/lib/utils";

export const revalidate = 86400;

export const metadata = {
  title: "Alternatives",
  description:
    "Every privacy-respecting alternative in the Konak directory, filterable by category, pricing, platform, and difficulty.",
};

export default function AlternativesPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Privacy-respecting alternatives",
          itemListElement: allAlternatives.map((alt, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: alt.name,
            url: `${SITE.url}/alternatives/${alt.slug}`,
          })),
        }}
      />
      <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6">
        <header className="mb-10 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            The directory
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">
            Alternatives
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {allAlternatives.length} replacements across {allServices.length}{" "}
            Google services, with honest pros, cons, and privacy notes. Every
            filter combination has its own URL — share whatever view you like.
          </p>
        </header>
        <Suspense
          fallback={
            <p className="py-16 text-sm text-muted-foreground">
              Loading the directory…
            </p>
          }
        >
          <AlternativesExplorer alternatives={allAlternatives} />
        </Suspense>
      </div>
    </>
  );
}