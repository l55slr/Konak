import { CircleAlert, Info, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

const variants = {
  info: {
    icon: Info,
    className: "border-sky-600/40 bg-sky-500/5",
    iconClass: "text-sky-600 dark:text-sky-400",
  },
  warning: {
    icon: TriangleAlert,
    className: "border-amber-600/40 bg-amber-500/5",
    iconClass: "text-amber-600 dark:text-amber-400",
  },
  danger: {
    icon: CircleAlert,
    className: "border-red-600/40 bg-red-500/5",
    iconClass: "text-red-600 dark:text-red-400",
  },
} as const;

export function Callout({
  variant = "info",
  title,
  children,
  className,
}: {
  variant?: keyof typeof variants;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { icon: Icon, className: boxClass, iconClass } = variants[variant];
  return (
    <div className={cn("rounded-lg border p-4", boxClass, className)}>
      <p className="flex items-center gap-2 text-sm font-semibold">
        <Icon className={cn("h-4 w-4 shrink-0", iconClass)} aria-hidden />
        {title}
      </p>
      <div className="mt-2 text-sm leading-relaxed text-muted-foreground [&_a]:underline [&_a]:underline-offset-4">
        {children}
      </div>
    </div>
  );
}