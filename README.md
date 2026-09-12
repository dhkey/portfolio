# portfolio

Terminal-styled personal site for Denys Yazan — [denys-yazan.lol](https://denys-yazan.lol).
Next.js 16 (App Router, React 19, TypeScript), plain CSS, fully static, deployed on Vercel.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build + typecheck
```

## Editing content

All copy lives in [`lib/content.ts`](lib/content.ts) — pages render from it, nothing is
hardcoded in JSX. Adding a project = appending one object to the `projects` array; its
link label is the `href` minus the protocol.

`siteUrl` in that file feeds canonical URLs, Open Graph tags, `sitemap.xml` and
`robots.txt`, so it must match the production domain.

## Layout

```
app/
  layout.tsx        root shell, fonts, metadata, JSON-LD
  page.tsx          index / interactive prompt
  projects|skills|about|contact/page.tsx
  not-found.tsx     404
  globals.css       design tokens + every component style
  sitemap.ts robots.ts
components/
  Terminal.tsx      the only client component — ls, help, cd <page>, tab, history
  Prompt.tsx        the `user@host:~$ cmd` chrome line
  PageShell.tsx     shared frame for inner pages and the 404
  Section.tsx       a labelled block under a `── heading ──` rule
  RouteChips.tsx    chip row of every inner page
  ExternalLink.tsx  new-tab anchor, plus UrlLink labelled with its own URL
lib/
  content.ts        all site copy
  stagger.ts        per-element delay for the `.rise` entrance animation
```

## Things worth knowing

- **No environment variables, no `vercel.json`.** Push to `main` and Vercel builds it;
  PRs get preview deployments.
- **Everything prerenders at build time.** No server data fetching — if a page starts
  needing runtime data, that assumption (and the `force-static` in `sitemap.ts` /
  `robots.ts`) breaks.
- **Security headers** live in [`next.config.ts`](next.config.ts). There is deliberately
  no CSP: the JSON-LD block in `layout.tsx` is an inline script, and nonce-ing it would
  force every page out of static rendering.
- **`trailingSlash: true`** — links and canonical URLs end in `/`.
