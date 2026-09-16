import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={cn("h-5 w-5 text-foreground", className)}
    >
      <rect
        x="1.5"
        y="1.5"
        width="21"
        height="21"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <rect x="7" y="9.5" width="5.5" height="9" rx="1" fill="currentColor" />
      <circle cx="16.5" cy="7.5" r="1.6" fill="currentColor" />
    </svg>
  );
}