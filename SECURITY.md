# Security policy

## Reporting a vulnerability

If you find a security issue in Konak, please report it privately rather
than opening a public issue:

1. Use GitHub's "Report a vulnerability" feature on the repository
   (Security → Advisories → New draft security advisory), or
2. Contact the maintainers through the address listed on the About page.

Please include how you found the issue, how to reproduce it, and what you
think the impact is. You will get an acknowledgement within 7 days. We will
credit you publicly on request, or keep the report anonymous — your choice.

## Scope

Konak is a fully static site: static HTML, CSS, and a small amount of
client-side JavaScript. There is no server-side runtime, no database, no
accounts, and no analytics. The realistic attack surface is:

- Client-side scripts bundled into the site (dependency compromise).
- The build pipeline and GitHub Actions workflows.
- The static hosting configuration (headers, redirects).

Out of scope: the third-party services listed in the directory. Their
security is their own; we link to them with an explicit "you are leaving
Konak" notice.

## Supported versions

Only the latest commit on `main` is supported. There are no release branches.
