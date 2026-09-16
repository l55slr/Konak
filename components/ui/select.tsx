import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Styled native select. Deliberately not a Radix select: native selects work
 * with screen readers, keyboards and mobile without JS, which suits a site
 * about resilience.
 */
const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <div className={cn("relative", className)}>
    <select
      ref={ref}
      className="h-9 w-full cursor-pointer appearance-none rounded-md border border-border bg-background px-3 pr-8 text-sm transition-colors duration-150 hover:bg-surface"
      {...props}
    >
      {children}
    </select>
    <ChevronDown
      className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
      aria-hidden
    />
  </div>
));
Select.displayName = "Select";

export { Select };