import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { SITE } from "@/lib/utils";
import { getAllGuides } from "@/lib/guides";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

// Runs before first paint: honors a stored choice, else the OS preference,
// defaulting to dark. Konak stores nothing else about the visitor.
const themeScript = `(function(){try{var s=localStorage.getItem('konak-theme');var t=(s==='light'||s==='dark')?s:(window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');var c=document.documentElement.classList;t==='dark'?c.add('dark'):c.remove('dark');document.documentElement.style.colorScheme=t}catch(e){}})()`;

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const guides = await getAllGuides();
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body
        suppressHydrationWarning
        className="min-h-dvh bg-background font-sans text-foreground antialiased"
      >
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:border focus:border-border focus:bg-background focus:px-3 focus:py-2 focus:text-sm"
        >
          Skip to content
        </a>
        <SiteHeader guides={guides} />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}