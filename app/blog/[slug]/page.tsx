import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { getAllPosts, getPost } from "@/lib/posts";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      publishedTime: post.date,
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <PageShell
      path={`~/blog/${post.slug}`}
      cmd="cat post.md"
      title={post.title}
      intro={post.date}
    >
      <div className="stack-m">
        {post.tags.length > 0 ? (
          <ul className="chip-row">
            {post.tags.map((t) => (
              <li key={t} className="chip" data-variant="ghost">
                {t}
              </li>
            ))}
          </ul>
        ) : null}
        <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </PageShell>
  );
}
