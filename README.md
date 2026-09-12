# portfolio

Terminal-styled personal site for Denys Yazan - a Next.js app deployed on Vercel.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, React 19, TypeScript) |
| Rendering | Every route prerendered at build time (no server data fetching) |
| Styling | Plain CSS with custom properties in `app/globals.css` |
| Hosting | Vercel |

## Develop

```bash
npm install
npm run dev          # http://localhost:3000
```

## Build

```bash
npm run build        # production build + typecheck
npm start            # serve the build at http://localhost:3000
```

## Deploy

Vercel auto-detects Next.js - no `vercel.json` needed. Push to `main` and it
builds; pull requests get preview deployments.

First-time setup:

1. Import the repo at [vercel.com/new](https://vercel.com/new). Leave framework,
   build command and output directory on their detected defaults.
2. Add `denysyazan.com` under **Settings -> Domains** and point the registrar's
   records at Vercel.
3. Nothing to configure beyond that - there are no environment variables.

`siteUrl` in [`lib/content.ts`](lib/content.ts) feeds canonical URLs, Open Graph
tags, `sitemap.xml` and `robots.txt`, so it has to match the production domain.

Security headers (`X-Content-Type-Options`, `X-Frame-Options`,
`Referrer-Policy`, `Permissions-Policy`, HSTS) are set in
[`next.config.ts`](next.config.ts).

## Editing content

All copy lives in [`lib/content.ts`](lib/content.ts) - projects, skills,
experience, education, languages and contact details. Pages read from it, so
adding a project means appending one object to the `projects` array.

## Layout

```
app/
  layout.tsx        root shell, fonts, metadata, JSON-LD
  page.tsx          the map / index with the interactive prompt
  projects|skills|about|contact/page.tsx
  not-found.tsx     404
  globals.css       design tokens + every component style
  sitemap.ts robots.ts
components/
  Prompt.tsx        the `user@host:~$ cmd` chrome line
  PageShell.tsx     shared frame for inner pages
  Terminal.tsx      client-side command input (ls, help, cd <page>, tab, history)
lib/content.ts      all site copy
public/denys.jpg    portrait
```
