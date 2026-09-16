import { getAllGuides } from "@/lib/guides";
import { SITE } from "@/lib/utils";

export const dynamic = "force-static";

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const guides = await getAllGuides();
  const items = guides
    .map(
      (guide) => `    <item>
      <title>${escapeXml(guide.title)}</title>
      <link>${SITE.url}/guides/${guide.slug}</link>
      <guid isPermaLink="true">${SITE.url}/guides/${guide.slug}</guid>
      <description>${escapeXml(guide.description)}</description>
      <pubDate>${guide.lastUpdated.toUTCString()}</pubDate>
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Konak — migration guides</title>
    <link>${SITE.url}/guides</link>
    <description>Plain-English guides for moving off surveillance-heavy services, one step at a time.</description>
    <language>en</language>
    <atom:link href="${SITE.url}/rss.xml" rel="self" type="application/rss+xml"/>
 ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}