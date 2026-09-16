import { Suspense } from "react";
import { allAlternatives } from "@/lib/data";
import { StackBuilder } from "@/components/stack-builder";

export const metadata = {
  title: "Stack builder",
  description:
    "Pick one alternative per category and get a shareable link. Encoded entirely in the URL — no accounts, no server storage.",
};

export default function StackPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6">
      <header className="mb-10 max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Plan your route
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">
          Stack builder
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Choose one alternative per category — or leave categories empty for
          now, that&apos;s normal. You&apos;ll get a shareable link encoded
          entirely in the URL: no account, no server, no storage. Your choices
          travel inside the link itself.
        </p>
      </header>
      <Suspense
        fallback={
          <p className="py-16 text-sm text-muted-foreground">Loading…</p>
        }
      >
        <StackBuilder alternatives={allAlternatives} />
      </Suspense>
    </div>
  );
}