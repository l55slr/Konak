"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

/**
 * Outbound links from directory detail pages pass through this notice.
 * Konak never tracks clicks; the notice exists so the hand-off is explicit.
 */
export function LeaveNotice({ href, name }: { href: string; name: string }) {
  const [open, setOpen] = useState(false);
  let hostname = href;
  try {
    hostname = new URL(href).hostname;
  } catch {
    // Data is build-validated as a URL; this branch is unreachable in practice.
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <ExternalLink className="h-4 w-4" aria-hidden />
          Visit {name}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>You&apos;re leaving Konak</DialogTitle>
        <DialogDescription className="mt-2">
          This link goes to <span className="font-mono text-foreground">{hostname}</span>{" "}
          — a site we don&apos;t run and can&apos;t vouch for. Konak doesn&apos;t
          track clicks, so this hand-off is invisible to us too.
        </DialogDescription>
        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Stay here
          </Button>
          <Button asChild>
            <a href={href} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
              Continue to {hostname}
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}