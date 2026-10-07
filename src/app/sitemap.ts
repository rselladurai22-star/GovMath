import type { MetadataRoute } from "next";
import { CALCULATORS, CATEGORIES, EVERYDAY, US_CATEGORIES } from "@/lib/calculators";
import { getAllPosts } from "@/lib/blog";
import { updatedIso } from "@/gm/schema";
import { AMOUNT_PAGES_LIVE, PRICE_AMOUNTS, SALARY_AMOUNTS } from "@/lib/seo/amounts";

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
    dated("", newest(calcDates)),
    dated("/uk", newest(CALCULATORS.filter((c) => c.country === "uk").map((c) => updatedIso(c.href)))),
    dated("/us", newest(CALCULATORS.filter((c) => c.country === "us").map((c) => updatedIso(c.href)))),
    ...US_CATEGORIES.map((c) => dated(c.href, newest(CALCULATORS.filter((x) => x.category === c.slug).map((x) => updatedIso(x.href))))),
    dated(EVERYDAY.href, newest(CALCULATORS.filter((x) => x.category === "everyday").map((x) => updatedIso(x.href)))),
    dated("/calculators", newest(calcDates)),
    dated("/blog", newest(getAllPosts().map((p) => p.date))),
    ...["/about", "/how-we-check", "/contact", "/privacy", "/terms", "/disclaimer"].map((u) => dated(u)),
    ...CATEGORIES.map((c) => dated(c.href, newest(CALCULATORS.filter((x) => x.category === c.slug).map((x) => updatedIso(x.href))))),
    ...CALCULATORS.map((c) => dated(c.href, updatedIso(c.href))),
    ...getAllPosts().map((p) => dated(`/blog/${p.slug}`, p.date)),
    // Fixed-amount pages share their calculator's date (the rates they use).
    ...(AMOUNT_PAGES_LIVE
      ? [
          dated("/uk/tax-and-salary/salary-after-tax", updatedIso("/uk/tax-and-salary/salary-calculator")),
          ...SALARY_AMOUNTS.map((n) => dated(`/uk/tax-and-salary/salary-after-tax/${n}`, updatedIso("/uk/tax-and-salary/salary-calculator"))),
          dated("/uk/property/stamp-duty-on", updatedIso("/uk/property/stamp-duty-england")),
          ...PRICE_AMOUNTS.map((n) => dated(`/uk/property/stamp-duty-on/${n}`, updatedIso("/uk/property/stamp-duty-england"))),
        ]
      : []),
  ];
}
