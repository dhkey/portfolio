import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes and write-ups by Denys Yazan - engineering, projects and whatever else is worth putting into words.",
};

export default function Blog() {
  const posts = getAllPosts();

  return (
    <PageShell
      path="~/blog"
      cmd="ls -l"
      title="blog"
      intro={posts.length ? "Notes, write-ups and whatever else seemed worth putting into words." : undefined}
    >
      {posts.length === 0 ? (
        <p className="muted">nothing here yet</p>
      ) : (
        <ol className="stack-s">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link href={`/blog/${p.slug}`} className="entry entry-link">
                <div className="entry-head">
                  <time className="entry-index" dateTime={p.date}>
                    {p.date}
                  </time>
                  <h2 className="entry-name">{p.title}</h2>
                </div>
                {p.summary ? <p className="entry-summary">{p.summary}</p> : null}
                {p.tags.length > 0 ? (
                  <div className="entry-meta">
                    <span className="tags">{p.tags.join(" · ")}</span>
                  </div>
                ) : null}
              </Link>
            </li>
          ))}
        </ol>
      )}
    </PageShell>
  );
}
