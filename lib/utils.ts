import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Alternative, Pricing } from "@/lib/schemas";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SITE = {
  name: "Konak",
  tagline: "A safe stop on the way out.",
  description:
    "A directory of privacy-respecting alternatives to Google and other surveillance-heavy services — plus plain-English guides to move over, one step at a time.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://konak.example",
  repoUrl: "https://github.com/l55slr/konak",
} as const;

export function formatDate(input: string | Date): string {
  return new Date(input).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function headingId(text: string): string {
  return slugify(text);
}

export const NEEDS_VERIFICATION = "NEEDS_VERIFICATION";

export function isUnverified(value: unknown): boolean {
  return value === NEEDS_VERIFICATION;
}

export function pricingLabel(pricing: Pricing): string {
  switch (pricing) {
    case "free":
      return "Free";
    case "freemium":
      return "Free + paid";
    case "paid":
      return "Paid";
    case "self-host-only":
      return "Self-host";
    default:
      return "Pricing unverified";
  }
}

export function difficultyRank(difficulty: Alternative["difficulty"]): number {
  return difficulty === "easy" ? 0 : difficulty === "medium" ? 1 : 2;
}

export function verifiedDate(alternative: Alternative): string {
  return isUnverified(alternative.lastVerified) ? "" : alternative.lastVerified;
}
