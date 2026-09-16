import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  alternativeSchema,
  guideFrontmatterSchema,
  serviceSchema,
  NEEDS_VERIFICATION,
} from "../lib/schemas";

let failures = 0;
let warnings = 0;

function fail(message: string) {
  failures += 1;
  console.error(`  ✗ ${message}`);
}

function warn(message: string) {
  warnings += 1;
  console.warn(`  ⚠ ${message}`);
}

function ok(message: string) {
  console.log(`  ✓ ${message}`);
}

function countSentinels(value: unknown): number {
  if (value === NEEDS_VERIFICATION) return 1;
  if (Array.isArray(value))
    return value.reduce((n: number, v) => n + countSentinels(v), 0);
  if (value !== null && typeof value === "object") {
    return Object.values(value).reduce(
      (n: number, v) => n + countSentinels(v),
      0
    );
  }
  return 0;
}

const dataDir = path.join(process.cwd(), "data");

function readList(fileName: string): unknown[] {
  return JSON.parse(
    fs.readFileSync(path.join(dataDir, fileName), "utf8")
  ) as unknown[];
}

const servicesRaw = readList("services.json");
const alternativesRaw = readList("alternatives.json");

console.log("\nValidating services…");
const serviceSlugs = new Set<string>();
const services: { slug: string; category: string }[] = [];
for (const raw of servicesRaw) {
  const result = serviceSchema.safeParse(raw);
  if (!result.success) {
    fail(
      `service: ${result.error.issues
        .map((i) => `${i.path.join(".")}: ${i.message}`)
        .join("; ")}`
    );
    continue;
  }
  const service = result.data;
  if (serviceSlugs.has(service.slug)) {
    fail(`duplicate service slug: ${service.slug}`);
    continue;
  }
  serviceSlugs.add(service.slug);
  services.push(service);
  ok(service.slug);
}

console.log("\nValidating alternatives…");
const alternativeSlugs = new Set<string>();
let sentinelFields = 0;
let sentinelEntries = 0;
for (const raw of alternativesRaw) {
  const result = alternativeSchema.safeParse(raw);
  if (!result.success) {
    fail(
      `alternative: ${result.error.issues
        .map((i) => `${i.path.join(".")}: ${i.message}`)
        .join("; ")}`
    );
    continue;
  }
  const alt = result.data;
  if (alternativeSlugs.has(alt.slug)) {
    fail(`duplicate alternative slug: ${alt.slug}`);
    continue;
  }
  alternativeSlugs.add(alt.slug);

  for (const target of alt.replaces) {
    const service = services.find((s) => s.slug === target);
    if (!service) {
      fail(`"${alt.slug}" replaces unknown service "${target}"`);
    } else if (service.category !== alt.category) {
      fail(
        `"${alt.slug}" category "${alt.category}" does not match service "${target}" category "${service.category}"`
      );
    }
  }

  const sentinels = countSentinels(alt);
  if (sentinels > 0) {
    sentinelFields += sentinels;
    sentinelEntries += 1;
  }

  if (alt.status === NEEDS_VERIFICATION) {
    warn(`"${alt.slug}" has unverified status`);
  }

  ok(
    `${alt.slug}${sentinels > 0 ? ` (${sentinels} field(s) NEEDS_VERIFICATION)` : ""}`
  );
}

console.log("\nValidating guides…");
const guidesDir = path.join(process.cwd(), "content", "guides");
const guideFiles = fs.readdirSync(guidesDir).filter((f) => f.endsWith(".mdx"));
for (const file of guideFiles) {
  const rawContent = fs.readFileSync(path.join(guidesDir, file), "utf8");
  const { data } = matter(rawContent);
  const result = guideFrontmatterSchema.safeParse(data);
  if (!result.success) {
    fail(
      `${file}: ${result.error.issues
        .map((i) => `${i.path.join(".")}: ${i.message}`)
        .join("; ")}`
    );
    continue;
  }
  const slug = result.data.slug;
  if (!serviceSlugs.has(result.data.service)) {
    fail(`${file}: references unknown service "${result.data.service}"`);
  }
  if (slug !== file.replace(/\.mdx$/, "")) {
    warn(`${file}: filename and slug "${slug}" differ (slug wins)`);
  }
  ok(`${file} → /guides/${slug}`);
}

console.log("\nSummary");
if (servicesRaw.length === 0 && alternativesRaw.length === 0) {
  console.log("  Directory is empty — a valid state. Entries land here via the admin dashboard.");
}
console.log(`  services:      ${servicesRaw.length}`);
console.log(`  alternatives:  ${alternativesRaw.length}`);
console.log(`  guides:        ${guideFiles.length}`);
console.log(
  `  NEEDS_VERIFICATION fields: ${sentinelFields} across ${sentinelEntries} entries`
);
console.log(`  warnings:      ${warnings}`);
console.log(`  failures:      ${failures}\n`);

if (failures > 0) {
  console.error(
    "Data validation FAILED. Fix the errors above before building.\n"
  );
  process.exit(1);
}
console.log("Data validation passed.\n");