export const metadata = {
  title: "Privacy",
  description:
    "Konak's own privacy policy: no analytics, no cookies except your theme choice, no third-party requests.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6">
      <header className="mb-10 max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-[-0.03em]">
          Konak&apos;s privacy policy
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Short, because there isn&apos;t much to say. This page is the whole
          policy.
        </p>
      </header>

      <div className="prose max-w-2xl">
        <h2>What Konak collects</h2>
        <p>
          Nothing. There is no analytics, no telemetry, no logging service,
          and no error tracker on this site.
        </p>

        <h2>Cookies</h2>
        <p>
          Konak sets no cookies. Your light/dark theme choice is stored in
          your browser&apos;s <code>localStorage</code> under the key{" "}
          <code>konak-theme</code>, and guide checklists are stored under{" "}
          <code>konak-checklist:*</code>. That storage never leaves your
          browser and you can clear it anytime from your browser settings.
        </p>

        <h2>Third-party requests</h2>
        <p>
          Konak makes none at runtime. Fonts (Geist Sans and Geist Mono) are
          self-hosted as part of the site. There are no embedded fonts,
          analytics scripts, CDNs, or pixel trackers — you can verify this in
          your browser&apos;s network tab.
        </p>

        <h2>The stack builder</h2>
        <p>
          Your selections are encoded entirely in the page URL. They are
          never sent to a server or stored anywhere except in the link you
          choose to copy. If you share the link, you&apos;re sharing those
          choices — that&apos;s between you and whoever you send it to.
        </p>

        <h2>Hosting</h2>
        <p>
          The site is served as static files. Like any website, your network
          provider and the hosting provider can see which pages you request —
          that is how the internet works. Konak adds nothing on top of that.
        </p>

        <h2>Changes</h2>
        <p>
          If this policy ever changes, the change will be described here and
          in the repository&apos;s commit history. A privacy policy that
          grows quietly is a red flag; this one is meant to stay short.
        </p>
      </div>
    </div>
  );
}