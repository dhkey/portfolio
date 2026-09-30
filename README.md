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
hardcoded in JSX. Adding a project = appending one object to the `projects` array.

`siteUrl` in that file feeds canonical URLs, Open Graph tags, `sitemap.xml` and
`robots.txt`, so it must match the production domain.

## Writing a blog post

Blog posts are Markdown files, not entries in `content.ts`. To publish one:

1. Add a new file to [`content/blog/`](content/blog), named `your-slug.md` — the
   filename becomes the URL, e.g. `content/blog/my-post.md` → `/blog/my-post`.
2. Start it with frontmatter, then write the post below in Markdown:

   ```md
   ---
   title: My post
   date: 2026-10-05
   summary: One sentence shown on the /blog listing and used as the meta description.
   tags: [nextjs, notes]
   ---

   Body goes here. Headings, **bold**, _italic_, links, lists, `code`,
   fenced code blocks and blockquotes are all supported.
   ```

3. `npm run dev` and check it at `/blog/your-slug`. `npm run build` prerenders it as
   static HTML — there's no draft state, so don't add the file until it's ready to publish.

That's it — no code changes, no registering the post anywhere. `date` controls sort
order on the listing (newest first) and `tags` are optional; leave the array empty
(`tags: []`) or omit it if a post doesn't need any.

## Layout

```
app/
  layout.tsx        root shell, fonts, metadata, JSON-LD
  page.tsx          index / interactive prompt
  projects|skills|about|contact/page.tsx
  blog/page.tsx      blog listing
  blog/[slug]/page.tsx  individual post
  not-found.tsx     404
  globals.css       design tokens + every component style
  sitemap.ts robots.ts
components/
  Terminal.tsx      the only client component — ls, help, cd <page>, tab, history
  Prompt.tsx        the `user@host:~$ cmd` chrome line
  PageShell.tsx     shared frame for inner pages
lib/content.ts      all site copy (except blog posts)
lib/posts.ts        reads and parses content/blog/*.md
content/blog/        blog posts, one Markdown file per post
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
