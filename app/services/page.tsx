import { allServices, alternativesCount } from "@/lib/data";
import { ServiceCard } from "@/components/service-card";
import { JsonLd } from "@/components/json-ld";
import { SITE } from "@/lib/utils";

export const revalidate = 86400;

export const metadata = {
  title: "Services",
  description:
    "Every surveillance-heavy service Konak can help you replace, starting with Google's.",
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Services being replaced",
          itemListElement: allServices.map((service, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: service.name,
            url: `${SITE.url}/services/${service.slug}`,
          })),
        }}
      />
      <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6">
        <header className="mb-10 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            The directory
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">
            Services being replaced
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Pick the service that bothers you most. Not the one that&apos;s
            worst in the abstract — the one that annoys you today. That&apos;s
            the right place to start.
          </p>
        </header>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {allServices.map((service) => (
            <ServiceCard
              key={service.slug}
              service={service}
              count={alternativesCount(service.slug)}
            />
          ))}
        </div>
      </div>
    </>
  );
}