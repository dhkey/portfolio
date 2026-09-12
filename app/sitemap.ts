import type { MetadataRoute } from "next";
import { routes, siteUrl } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${siteUrl}/`, lastModified: now, priority: 1 },
    ...routes.map((r) => ({
      url: `${siteUrl}${r.path}/`,
      lastModified: now,
      priority: 0.8,
    })),
  ];
}
