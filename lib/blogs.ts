import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export type blogMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
};

export type blog = blogMeta & { content: string };

function readSlugs(): string[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

function readMeta(slug: string): blogMeta {
  const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.md`), "utf8");
  const { data } = matter(raw);
  return {
    slug,
    title: data.title as string,
    date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date),
    summary: (data.summary as string) ?? "",
  };
}

export function getAllBlogs(): blogMeta[] {
  return readSlugs()
    .map(readMeta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getBlog(slug: string): blog | null {
  const file = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;

  const { content } = matter(fs.readFileSync(file, "utf8"));
  return { ...readMeta(slug), content };
}
