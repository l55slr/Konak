import { z } from "zod";

/**
 * Sentinel for facts we have not independently confirmed. Stored literally
 * in data files and rendered honestly in the UI. Never guess a fact.
 */
export const NEEDS_VERIFICATION = "NEEDS_VERIFICATION";

const verifiable = <T extends z.ZodTypeAny>(inner: T) =>
  z.union([inner, z.literal(NEEDS_VERIFICATION)]);

export const serviceCategories = [
  "search",
  "email",
  "storage",
  "photos",
  "browser",
  "maps",
  "calendar",
  "docs",
  "video",
  "appstore",
  "authenticator",
  "notes",
  "translate",
  "dns",
  "analytics",
  "messaging",
  "os",
  "vpn",
] as const;

export const serviceCategorySchema = z.enum(serviceCategories);
export type ServiceCategory = (typeof serviceCategories)[number];

export const platforms = [
  "web",
  "ios",
  "android",
  "windows",
  "macos",
  "linux",
  "cli",
] as const;

export const platformSchema = z.enum(platforms);
export type Platform = (typeof platforms)[number];

export const pricingSchema = verifiable(
  z.enum(["free", "freemium", "paid", "self-host-only"])
);
export type Pricing = z.infer<typeof pricingSchema>;

export const difficultySchema = z.enum(["easy", "medium", "hard"]);
export type Difficulty = z.infer<typeof difficultySchema>;

export const statusSchema = verifiable(
  z.enum(["active", "beta", "caution", "unmaintained"])
);
export type Status = z.infer<typeof statusSchema>;

const isoDateOrSentinel = z.union([
  z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "must be an ISO date (YYYY-MM-DD)"),
  z.literal(NEEDS_VERIFICATION),
]);

export const serviceSchema = z.object({
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/, "slugs are lowercase kebab-case"),
  name: z.string().min(2),
  vendor: z.string().min(2),
  category: serviceCategorySchema,
  description: z.string().min(20),
  whyReplace: z.array(z.string().min(10)).min(3).max(5),
  icon: z.string().optional(),
});

export const alternativeSchema = z.object({
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/, "slugs are lowercase kebab-case"),
  name: z.string().min(2),
  url: z.string().url(),
  tagline: z.string().min(10).max(80),
  description: z.string().min(40),
  replaces: z.array(z.string().min(2)).min(1),
  category: serviceCategorySchema,
  pricing: pricingSchema,
  platforms: z.array(platformSchema).min(1),
  openSource: verifiable(z.boolean()),
  selfHostable: verifiable(z.boolean()),
  difficulty: difficultySchema,
  jurisdiction: z.string().optional(),
  license: z.string().optional(),
  pros: z.array(z.string().min(5)).min(1),
  cons: z.array(z.string().min(5)).min(1),
  privacyNotes: z.string().min(30),
  status: statusSchema,
  statusNote: z.string().optional(),
  lastVerified: isoDateOrSentinel,
  verifiedBy: z.string().optional(),
});

export const guideFrontmatterSchema = z.object({
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/, "slugs are lowercase kebab-case"),
  title: z.string().min(5),
  description: z.string().min(20),
  service: z.string().min(2),
  difficulty: difficultySchema,
  timeEstimate: z.string().min(3),
  lastUpdated: z.coerce.date(),
  steps: z.array(z.string().min(3)).min(1),
});

export type Service = z.infer<typeof serviceSchema>;
export type Alternative = z.infer<typeof alternativeSchema>;
export type GuideFrontmatter = z.infer<typeof guideFrontmatterSchema>;
