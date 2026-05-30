import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://govmath.co.uk/sitemap.xml",
    host: "https://govmath.co.uk",
  };
}
