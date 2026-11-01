import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      // Im hiding all pages except of main page. Its done on purpose.
      allow: ["/$", "/icon.png", "/apple-icon.png"],
      disallow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
