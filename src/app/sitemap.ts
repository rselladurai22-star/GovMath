import type { MetadataRoute } from "next";
import { CALCULATORS, CATEGORIES } from "@/lib/calculators";
import { getAllPosts } from "@/lib/blog";

const BASE = "https://govmath.co.uk";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/calculators`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/disclaimer`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
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
  const blogPages: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));
  return [...staticPages, ...categoryPages, ...calcPages, ...blogPages];
}
