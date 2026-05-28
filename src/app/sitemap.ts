import type { MetadataRoute } from "next";
import { CALCULATORS, CATEGORIES } from "@/lib/calculators";

const BASE = "https://gov-math.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/calculators`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
  ];
  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map((c) => ({
    url: `${BASE}${c.href}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));
  const calcPages: MetadataRoute.Sitemap = CALCULATORS.filter((c) => c.status === "live").map((c) => ({
    url: `${BASE}${c.href}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: c.popular ? 0.9 : 0.7,
  }));
  return [...staticPages, ...categoryPages, ...calcPages];
}
