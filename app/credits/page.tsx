export const metadata = {
  title: "Credits",
  description:
    "Prior art and inspiration behind Konak: awesome-privacy, PrivacyGuides, and the wider privacy community.",
};

export default function CreditsPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6">
      <header className="mb-10 max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-[-0.03em]">Credits</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Konak is not original research. It is a calm front door built in
          front of a decade of other people&apos;s careful work.
        </p>
      </header>

      <div className="prose max-w-2xl">
        <h2>Prior art</h2>
        <p>
          <a
            href="https://github.com/pluja/awesome-privacy"
            rel="noopener noreferrer"
          >
            awesome-privacy
          </a>{" "}
          — the community-maintained list of privacy-respecting services and
          tools. Much of the collective knowledge about which alternatives
          are worth recommending exists because this list curated it,
          category by category. Konak&apos;s category structure is indebted
          to it.
        </p>
        <p>
          <a href="https://www.privacyguides.org" rel="noopener noreferrer">
            PrivacyGuides
          </a>{" "}
          — their tool recommendations and, more importantly, their editorial
          discipline: evidence over vibes, tradeoffs stated plainly,
          recommendations revisited when facts change. That discipline is the
          standard Konak aims at.
        </p>
        <p>
          Neither project is affiliated with Konak, endorses it, or bears any
          responsibility for what appears here. Errors in Konak are
          Konak&apos;s alone.
        </p>

        <h2>Also worth your time</h2>
        <ul>
          <li>
            <a
              href="https://www.openstreetmap.org"
              rel="noopener noreferrer"
            >
              OpenStreetMap
            </a>{" "}
            — the volunteer-built map underneath most of the maps
            alternatives listed here.
          </li>
          <li>
            The maintainers of the hundreds of small open-source projects in
            the directory, most of whom are a few people doing this in their
            spare time.
          </li>
        </ul>

        <h2>Licenses of this site</h2>
        <p>
          Code is MIT; directory data and guides are CC0 1.0 Universal. Take
          both, use them, fork the whole idea — that&apos;s what the licenses
          are for.
        </p>
      </div>
    </div>
  );
}