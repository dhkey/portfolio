import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { getAllBlogs } from "@/lib/blogs";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes and write-ups by Denys Yazan - engineering, projects and whatever else is worth putting into words.",
};

export default function Blog() {
  const blogs = getAllBlogs();

  return (
    <PageShell
      path="~/blog" cmd="ls -l"
      title="blog" intro={"Notes, write-ups and whatever else seemed worth putting into words."}
    >
      
      {blogs.length === 0 ? (
        <p className="muted">nothing here yet</p>
      ) : (
        <ol className="stack-s">
          {blogs.map((blog) => (
            <li key={blog.slug}>
              <Link href={`/blog/${blog.slug}`} className="entry entry-link">
                <div className="entry-head">
                  <time className="entry-index" dateTime={blog.date}>
                    {blog.date}
                  </time>
                  <h2 className="entry-name">{blog.title}</h2>
                </div>
                {blog.summary}
              </Link>
            </li>
          ))}
        </ol>
      )}
    </PageShell>
  );
}
