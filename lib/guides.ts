import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import {
  guideFrontmatterSchema,
  type Difficulty,
} from "@/lib/schemas";
import { headingId } from "@/lib/utils";

export interface TocItem {
  id: string;
  title: string;
  level: 2 | 3;
}

export interface GuideMeta {
  slug: string;
  title: string;
  description: string;
  service: string;
  difficulty: Difficulty;
  timeEstimate: string;
  lastUpdated: Date;
  steps: string[];
}

export interface Guide extends GuideMeta {
  content: string;
  toc: TocItem[];
}

const guidesDir = path.join(process.cwd(), "content", "guides");

export function extractToc(markdown: string): TocItem[] {
  const items: TocItem[] = [];
  let inFence = false;
  for (const line of markdown.split("\n")) {
    if (line.startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const match = /^(#{2,3})\s+(.+)$/.exec(line);
    if (match) {
      const title = match[2].replace(/`/g, "").trim();
      items.push({
        id: headingId(title),
        title,
        level: match[1].length === 2 ? 2 : 3,
      });
    }
  }
  return items;
}

async function readGuideFile(fileName: string): Promise<Guide | null> {
  const raw = await fs.readFile(path.join(guidesDir, fileName), "utf8");
  const { data, content } = matter(raw);
  const parsed = guideFrontmatterSchema.safeParse(data);
  if (!parsed.success) {
    // Invalid frontmatter is a build error, surfaced by scripts/validate-data.ts.
    // Here we skip defensively so a bad file cannot crash a page render.
    return null;
  }
  const meta = parsed.data;
  return { ...meta, content, toc: extractToc(content) };
}

export async function getAllGuides(): Promise<GuideMeta[]> {
  const files = (await fs.readdir(guidesDir)).filter((f) => f.endsWith(".mdx"));
  const guides = await Promise.all(files.map(readGuideFile));
  return (guides.filter((g): g is Guide => g !== null)).sort(
    (a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime()
  );
}

export async function getGuide(slug: string): Promise<Guide | null> {
  const files = (await fs.readdir(guidesDir)).filter((f) => f.endsWith(".mdx"));
  for (const file of files) {
    const guide = await readGuideFile(file);
    if (guide && guide.slug === slug) return guide;
  }
  return null;
}

export function guideStaticSlugs(): string[] {
  // Synchronous shim for generateStaticParams: read dir without await.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const fsSync = require("node:fs") as typeof import("node:fs");
  return fsSync
    .readdirSync(guidesDir)
    .filter((f: string) => f.endsWith(".mdx"))
    .map((f: string) => f.replace(/\.mdx$/, ""));
}
