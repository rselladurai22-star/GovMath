import { getCalculatorsByCategory, shortTitle, type CategorySlug } from "../lib/calculators";
import updated from "./updated.json";

/**
 * Structured data shared by every page type. The Organization and WebSite are
 * declared once (root layout) with stable @ids; calculator and topic pages
 * point back to them.
 */
export const SITE = "https://sumatlas.com";
export const ORG_ID = `${SITE}/#organization`;
const WEBSITE_ID = `${SITE}/#website`;

export const siteJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: "SumAtlas",
    url: SITE,
    logo: `${SITE}/gm/sumatlas-mark-green-512.png`,
    email: "hello@sumatlas.com",
    description:
      "An independent website of free UK benefits, family, renting and student money calculators. Not part of any government.",
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: "SumAtlas",
    url: SITE,
    inLanguage: "en-GB",
    description: "Free UK benefits, family, renting and student money calculators in plain English.",
    publisher: { "@id": ORG_ID },
  },
];

/** The date a page last changed, as an ISO date (from scripts/build-updated.py). */
export function updatedIso(path: string): string | undefined {
  return (updated as Record<string, string>)[path];
}

/** A calculator page as a free web application. */
export function calculatorJsonLd(path: string, name: string, description: string) {
  const modified = updatedIso(path);
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url: `${SITE}${path}`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    inLanguage: "en-GB",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
    ...(modified ? { dateModified: modified } : {}),
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": WEBSITE_ID },
  };
}

/** A topic page: its breadcrumb and the list of calculators it links to. */
export function topicJsonLd(slug: CategorySlug, label: string) {
  const tools = getCalculatorsByCategory(slug);
  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/uk` },
        { "@type": "ListItem", position: 2, name: label, item: `${SITE}/uk/${slug}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${label} calculators`,
      numberOfItems: tools.length,
      itemListElement: tools.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: shortTitle(t.title), url: `${SITE}${t.href}` })),
    },
  ];
}
