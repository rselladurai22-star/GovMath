import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://gov-math.vercel.app/sitemap.xml",
    host: "https://gov-math.vercel.app",
  };
}
