import type { MetadataRoute } from "next";
import { CALCULATORS, CATEGORIES } from "@/lib/calculators";
import { getAllPosts } from "@/lib/blog";
import { updatedIso } from "@/gm/schema";

const BASE = "https://sumatlas.com";

/**
 * Every page, with a real last-changed date where we have one (calculators
 * from src/gm/updated.json; topic pages and the home page from their newest
 * calculator; articles from their date). Pages with no reliable date have
 * none, so Google can trust the dates it does see.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const dated = (url: string, iso?: string) => ({ url: `${BASE}${url}`, ...(iso ? { lastModified: iso } : {}) });
  const newest = (isos: (string | undefined)[]) => isos.filter(Boolean).sort().at(-1);
  const calcDates = CALCULATORS.map((c) => updatedIso(c.href));
  return [
    dated("/", newest(calcDates)),
    dated("/uk", newest(calcDates)),
    dated("/calculators", newest(calcDates)),
    dated("/blog", newest(getAllPosts().map((p) => p.date))),
    ...["/about", "/how-we-check", "/widgets", "/contact", "/privacy", "/terms", "/disclaimer"].map((u) => dated(u)),
    ...CATEGORIES.map((c) => dated(c.href, newest(CALCULATORS.filter((x) => x.category === c.slug).map((x) => updatedIso(x.href))))),
    ...CALCULATORS.map((c) => dated(c.href, updatedIso(c.href))),
    ...getAllPosts().map((p) => dated(`/blog/${p.slug}`, p.date)),
  ];
}
