import * as React from "react";
import { headingId } from "@/lib/utils";
import { Callout } from "@/components/callout";
import { CodeBlock } from "@/components/code-block";

function extractText(node: React.ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (React.isValidElement(node)) {
    const props = node.props as { children?: React.ReactNode };
    return extractText(props.children);
  }
  return "";
}

/** Shared MDX render components. Heading ids match the extracted TOC. */
export const mdxComponents = {
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 id={headingId(extractText(children))} className="scroll-mt-24">
      {children}
    </h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 id={headingId(extractText(children))} className="scroll-mt-24">
      {children}
    </h3>
  ),
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => {
    if (!href) return <a>{children}</a>;
    const external = /^https?:\/\//.test(href);
    return external ? (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ) : (
      <a href={href}>{children}</a>
    );
  },
  pre: ({ children }: { children?: React.ReactNode }) => (
    <CodeBlock>{children}</CodeBlock>
  ),
  Callout,
};