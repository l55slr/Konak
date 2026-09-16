"use client";

import * as React from "react";
import { CopyButton } from "@/components/copy-button";

function nodeText(node: React.ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeText).join("");
  if (React.isValidElement(node)) {
    const props = node.props as { children?: React.ReactNode };
    return nodeText(props.children);
  }
  return "";
}

export function CodeBlock({ children }: { children: React.ReactNode }) {
  const text = nodeText(children);
  return (
    <div className="group relative my-4 overflow-x-auto rounded-lg border border-border bg-surface p-4 font-mono text-sm">
      <pre className="whitespace-pre">{children}</pre>
      <CopyButton text={text} label="Copy command" />
    </div>
  );
}