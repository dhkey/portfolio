import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import { PageShell } from "@/components/PageShell";
import { getAllBlogs, getBlog } from "@/lib/blogs";

export function generateStaticParams() {
  return getAllBlogs().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Readonly<{
  params: Promise<{ slug: string }>;
}>): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlog(slug);
  if (!blog) return {};

  return {
    title: blog.title,
    description: blog.summary,
    alternates: { canonical: `/blog/${blog.slug}` },
    openGraph: {
      type: "article",
      title: blog.title,
      description: blog.summary,
      publishedTime: blog.date,
    },
  };
}

export default async function Blogblog({ params }: Readonly<{
  params: Promise<{ slug: string }>;
}>) {
  const { slug } = await params;
  const blog = getBlog(slug);
  if (!blog) notFound();

  return (
    <PageShell
      path={`~/blog/${blog.slug}`}
      cmd="cat blog.md"
      title={blog.title}
      intro={blog.date}
    >
      <div className="prose">
        <Markdown>{blog.content}</Markdown>
      </div>
    </PageShell>
  );
}
