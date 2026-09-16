"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      // Clipboard unavailable (permissions/HTTP) — fail silently, it's a convenience.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Copied" : label}
      className="absolute right-2 top-2 rounded-md border border-border bg-background p-1.5 text-muted-foreground opacity-0 transition-all duration-150 hover:text-foreground focus-visible:opacity-100 group-hover:opacity-100"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" aria-hidden /> : <Copy className="h-3.5 w-3.5" aria-hidden />}
    </button>
  );
}