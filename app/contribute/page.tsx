import Link from "next/link";
import { SITE } from "@/lib/utils";

export const metadata = {
  title: "Contribute",
  description:
    "How to submit an alternative or a guide to Konak, and the rules entries must follow.",
};

export default function ContributePage() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6">
      <header className="mb-10 max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-[-0.03em]">
          Contribute
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Konak improves the way waystations do — by travellers leaving notes
          for the next ones.
        </p>
      </header>

      <div className="prose max-w-2xl">
        <h2>Report an error</h2>
        <p>
          The most valuable contribution is the smallest one: an issue saying
          &quot;this price changed&quot; or &quot;this project looks
          abandoned.&quot; Include the entry&apos;s name and, if you can, a
          link to the primary source. Error reports about pricing and
          maintenance status are treated as high priority. Open an issue on{" "}
          <a href={SITE.repoUrl} rel="noopener noreferrer">
            the GitHub repository
          </a>
          .
        </p>

        <h2>Submit an alternative</h2>
        <p>
          Add an entry to the directory and open a pull request. The rules
          are strict in one place only:{" "}
          <strong>accuracy beats completeness</strong>. If you can&apos;t
          confirm a fact from the project&apos;s own site, docs, or
          repository, write the literal string{" "}
          <code>NEEDS_VERIFICATION</code> in that field — never guess. Every
          entry must include honest cons and a real privacy note.
        </p>
        <p>
          If you make the product you&apos;re submitting: welcome, but say so
          in the pull request, and expect the same evidence bar as everyone
          else. Undisclosed self-promotion is the fastest way to get an entry
          removed.
        </p>

        <h2>Write or improve a guide</h2>
        <p>
          Guides live in <code>content/guides/</code> as MDX with validated
          frontmatter. The voice rules in CONTRIBUTING.md are product
          requirements: plain English, no assumed knowledge, honest
          tradeoffs, explicit permission to stop halfway. The best test for a
          draft: hand it to someone who has never opened a terminal and watch
          where they hesitate.
        </p>

        <h2>The rules, in short</h2>
        <ul>
          <li>Inbound = outbound licensing (MIT for code, CC0 for content).</li>
          <li>No CLA — you keep ownership of your contribution.</li>
          <li>No payment, sponsorship, or affiliate links, ever.</li>
          <li>Disclose any relationship you have with an entry you touch.</li>
          <li>Uncertain? Write NEEDS_VERIFICATION, not a guess.</li>
        </ul>
        <p>
          Full details are in{" "}
          <a
            href={`${SITE.repoUrl}/blob/main/CONTRIBUTING.md`}
            rel="noopener noreferrer"
          >
            CONTRIBUTING.md
          </a>
          .
        </p>
      </div>
    </div>
  );
}