# Konak

**A safe stop on the way out.**

In Turkish, a *konak* is a mansion — but historically it was also a
waystation: a safe, welcoming stop on a long journey where travellers rested,
resupplied, and continued on. That double meaning is the whole idea. Konak is
not a destination you migrate everything to at once. It is a place you stop
at on the road out of surveillance-heavy services, where you can catch your
breath, pick **one** thing to change today, and keep travelling when you're
ready.

Konak is a curated directory of privacy-respecting alternatives to Google and
other surveillance-heavy services, plus plain-English migration guides
written for people who are not sysadmins and do not want to be.

## What's in the box

- **Directory** of services being replaced and alternatives that replace
  them, with honest pros, cons, and privacy notes. Every uncertain fact is
  marked `NEEDS_VERIFICATION` rather than guessed.
- **Migration guides** in MDX, with numbered steps, copyable commands,
  per-step checklists that persist in `localStorage`, and explicit
  "you can stop here" break points.
- **Stack builder** — pick one alternative per category and get a shareable
  URL encoded entirely in the query string. No server storage, no accounts.
- **Cmd+K search** across everything, fully client-side (Fuse.js).
- **Static generation + ISR** on Vercel. No server runtime, no database,
  no CMS.

## Privacy guarantees (Konak itself)

- No analytics. No telemetry. No trackers. No ad networks.
- No third-party requests at runtime. Fonts (Geist Sans, Geist Mono) are
  self-hosted via the `geist` package — never loaded from Google.
- The only storage is your color-theme preference in `localStorage`.
- Stack-builder links live entirely in the URL. Nothing is sent to a server.

## Stack

- Next.js 15 (App Router), TypeScript strict
- Tailwind CSS v4, CSS-first config via `@theme` in `app/globals.css`
  (there is no `tailwind.config.js`, by design)
- shadcn/ui components vendored as source in `components/ui`
- MDX guides via `next-mdx-remote`, validated with Zod
- Fuse.js for client-side search
- Deployment target: Vercel, static generation with ISR (`revalidate = 86400`)

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run validate   # Zod-validate all data + guide frontmatter
npm run build      # validates, then builds (fails on invalid data)
