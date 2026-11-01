import type { MetadataRoute } from "next";
import { routes, siteUrl } from "@/content/site";
import { getAllPosts } from "@/lib/posts";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    ...routes.map((r) => r.path),
    ...getAllPosts().map((p) => `/blog/${p.slug}`),
  ];
  return paths.map((path) => ({ url: `${siteUrl}${path}/` }));
}
