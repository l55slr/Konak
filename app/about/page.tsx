import Link from "next/link";
import { SITE } from "@/lib/utils";

export const metadata = {
  title: "About",
  description:
    "Who runs Konak, how alternatives are evaluated, and how to report an error.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6">
      <header className="mb-10 max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-[-0.03em]">
          About Konak
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          A safe stop on the way out — what that means, who&apos;s behind it,
          and exactly how entries earn their place.
        </p>
      </header>

      <div className="prose max-w-2xl">
        <h2>The name</h2>
        <p>
          In Turkish, a <em>konak</em> is a mansion — but historically it was
          also a waystation: a safe, welcoming stop on a long journey where
          travellers rested, resupplied, and continued on. Both meanings are
          the point. Konak is not a destination you migrate everything to at
          once. It&apos;s a place you stop at on the road out of
          surveillance-heavy services, where you can catch your breath and
          take the next step when you&apos;re ready.
        </p>

        <h2>Who runs it</h2>
        <p>
          Konak is maintained by a small volunteer team and published as free
          software (MIT) with free content (CC0). There is no company, no
          investors, and no revenue — which is also why there are no ads and
          no analytics anywhere on the site. The source lives on{" "}
          <a href={SITE.repoUrl} rel="noopener noreferrer">
            GitHub
          </a>
          .
        </p>

        <h2>Editorial criteria</h2>
        <p>An alternative is only listed if, at minimum:</p>
        <ul>
          <li>
            It meaningfully reduces the data collected about you compared to
            the service it replaces — not just swaps one ad company for
            another.
          </li>
          <li>
            It is usable by a non-technical person, or its difficulty is
            honestly labeled so non-technical people can avoid it.
          </li>
          <li>
            Its cons are documented as carefully as its pros. An entry with no
            listed cons is an error; tell us.
          </li>
          <li>
            Any fact the maintainers have not confirmed is marked{" "}
            <code>NEEDS_VERIFICATION</code> rather than guessed. Accuracy
            beats completeness, always.
          </li>
        </ul>

        <h2>How alternatives are evaluated</h2>
        <p>
          Every entry is weighed on four axes: what it actually collects and
          stores, who operates it and under which jurisdiction, how hard it
          is for a non-technical person to move to, and how easy it is to
          leave again. Open source is valued but not required — some good
          options are proprietary, and we say so plainly when they are. Where
          a claim comes from the vendor itself (a privacy policy, a blog
          post), the entry says so.
        </p>

        <h2>Conflict of interest</h2>
        <p>
          Konak accepts no payment, sponsorship, affiliate links, or referral
          credits from any listed product — now or ever. If a maintainer has
          any relationship with a listed project, it must be disclosed in the
          pull request that adds or edits the entry. If you ever find a
          violation of this, it is the most serious kind of error the project
          can have: report it and it will be fixed loudly.
        </p>

        <h2>Report an error</h2>
        <p>
          Wrong price, dead project, changed policy? That&apos;s exactly the
          kind of report we want.{" "}
          <Link href="/contribute">See how to reach us</Link> — error reports
          are treated as high priority, and you don&apos;t need to be certain
          to raise your hand.
        </p>
      </div>
    </div>
  );
}