import type { MetadataRoute } from "next";
import { routes, siteUrl } from "@/content/site";
import { getAllBlogs } from "@/lib/blogs";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    ...routes.map((r) => r.path),
    ...getAllBlogs().map((p) => `/blog/${p.slug}`),
  ];
  return paths.map((path) => ({ url: `${siteUrl}${path}/` }));
}
