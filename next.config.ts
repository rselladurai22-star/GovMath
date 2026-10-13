import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import type { NextConfig } from "next";
import { AMOUNT_PAGES_LIVE } from "./src/lib/seo/amounts";

// Version for the stylesheets in public/gm: a hash of their contents, added to
// each <link> as ?v=… so browsers can cache them for a year and still get the
// new file the moment any stylesheet changes.
const cssDir = "public/gm";
const cssHash = createHash("sha256");
for (const file of readdirSync(cssDir).filter((f) => f.endsWith(".css")).sort()) {
  cssHash.update(file).update(readFileSync(`${cssDir}/${file}`));
}
const YEAR = "public, max-age=31536000, immutable";

const SITE = "https://sumatlas.com";
/** govmath.co.uk and www.govmath.co.uk, the site's address until October 2026. */
const OLD_HOST = "(?:www\\.)?govmath\\.co\\.uk";
const UK_TOPICS = "tax-and-salary|property|business|investing|benefits|vehicles|students|life";
/** Calculators moved from the UK's Everyday Life topic to /everyday: [old slug, new slug]. */
const EVERYDAY_MOVES: [string, string][] = [
  ["percentage-calculator", "percentage-calculator"],
  ["timesheet-decimal", "timesheet-decimal"],
  ["bmi-uk-nhs", "bmi-calculator"],
];

/**
 * Plan 1, Plan 4 and Postgraduate loan pages merged into one student loan
 * repayment calculator (October 2026): [old slug, plan]. The plan goes in the
 * query so the calculator opens on it; Next adds any incoming query as well.
 */
const STUDENT_LOAN_MOVES: [string, string][] = [
  ["plan-1-student-loan", "plan1"],
  ["plan-4-student-loan", "plan4"],
  ["postgrad-loan", "postgrad"],
];
const STUDENT_LOAN_PAGE = "/uk/students/student-loan-repayment";

/**
 * While the fixed-amount pages are switched off (AMOUNT_PAGES_LIVE, until
 * AdSense approval), their addresses go to the matching calculator with a
 * temporary redirect instead of a 404, from both domains, so Google drops
 * them without "Not found" errors and can pick them up again later.
 */
const AMOUNT_REDIRECTS = AMOUNT_PAGES_LIVE
  ? []
  : [
      ["tax-and-salary/salary-after-tax", "tax-and-salary/salary-calculator"],
      ["property/stamp-duty-on", "property/stamp-duty-england"],
    ].flatMap(([from, to]) => [
      { source: `/${from}`, has: [{ type: "host" as const, value: OLD_HOST }], destination: `${SITE}/uk/${to}`, permanent: false },
      { source: `/${from}/:amount`, has: [{ type: "host" as const, value: OLD_HOST }], destination: `${SITE}/uk/${to}`, permanent: false },
      { source: `/uk/${from}`, destination: `/uk/${to}`, permanent: false },
      { source: `/uk/${from}/:amount`, destination: `/uk/${to}`, permanent: false },
    ]);

const nextConfig: NextConfig = {
  env: { GM_CSS_VERSION: cssHash.digest("hex").slice(0, 10) },
  // The site and the embeddable calculators have separate root layouts, so
  // unmatched addresses use src/app/global-not-found.tsx.
  experimental: { globalNotFound: true },
  async headers() {
    return [
      {
        // Everything but the embeddable calculators, which other sites frame.
        source: "/((?!embed/).*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          // Safe with AdSense: it limits framing, <base>, plugins and plain
          // http, but not which scripts or frames load, so ads still work.
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self'; base-uri 'self'; object-src 'none'; upgrade-insecure-requests",
          },
        ],
      },
      {
        // Embeddable calculators (src/app/(embed)): any site may frame them.
        source: "/embed/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Content-Security-Policy", value: "frame-ancestors *; base-uri 'self'; object-src 'none'; upgrade-insecure-requests" },
        ],
      },
      // Fonts and images never change in place: a changed file gets a new name.
      { source: "/gm/fonts/:file*", headers: [{ key: "Cache-Control", value: YEAR }] },
      { source: "/gm/:file(.*\\.(?:webp|png|jpg|svg))", headers: [{ key: "Cache-Control", value: YEAR }] },
      // Stylesheets are linked with ?v=<content hash> (GM_CSS_VERSION above).
      {
        source: "/gm/:file(.*\\.css)",
        has: [{ type: "query", key: "v" }],
        headers: [{ key: "Cache-Control", value: YEAR }],
      },
    ];
  },
  async rewrites() {
    return {
      // govmath.co.uk/sitemap.xml lists the old addresses (see the route's notes).
      beforeFiles: [{ source: "/sitemap.xml", has: [{ type: "host", value: OLD_HOST }], destination: "/legacy-sitemap.xml" }],
    };
  },
  async redirects() {
    return [
      // October 2026: the site moved from govmath.co.uk to sumatlas.com, and
      // the UK calculators moved under /uk. Every old address goes straight
      // to its new page in one permanent hop: the home page to the UK hub,
      // topic and calculator pages to /uk/<topic>/…, everything else (about,
      // blog, privacy…) to the same path. Keep these for as long as the old
      // domain is renewed.
      { source: "/", has: [{ type: "host", value: OLD_HOST }], destination: `${SITE}/uk`, permanent: true },
      ...AMOUNT_REDIRECTS,
      // The Everyday calculators (October 2026) left the UK's Everyday Life topic.
      ...EVERYDAY_MOVES.map(([from, to]) => ({ source: `/life/${from}`, has: [{ type: "host" as const, value: OLD_HOST }], destination: `${SITE}/everyday/${to}`, permanent: true })),
      ...STUDENT_LOAN_MOVES.map(([from, plan]) => ({ source: `/students/${from}`, has: [{ type: "host" as const, value: OLD_HOST }], destination: `${SITE}${STUDENT_LOAN_PAGE}?plan=${plan}`, permanent: true })),
      // A topic's own page needs its own rule: on Vercel an empty :path* leaves
      // a trailing slash (/uk/benefits/), which would cost a second hop.
      { source: `/:topic(${UK_TOPICS})`, has: [{ type: "host", value: OLD_HOST }], destination: `${SITE}/uk/:topic`, permanent: true },
      {
        source: `/:topic(${UK_TOPICS})/:path*`,
        has: [{ type: "host", value: OLD_HOST }],
        destination: `${SITE}/uk/:topic/:path*`,
        permanent: true,
      },
      // Everything else on the old domain, except its sitemap (see rewrites()).
      { source: "/:path((?!sitemap\\.xml$).*)", has: [{ type: "host", value: OLD_HOST }], destination: `${SITE}/:path`, permanent: true },
      // One address for the site: www goes to the bare domain.
      { source: "/:path*", has: [{ type: "host", value: "www.sumatlas.com" }], destination: `${SITE}/:path*`, permanent: true },
      // The take-home pay article's address no longer names a tax year.
      {
        source: "/blog/uk-take-home-pay-2025-26-explained",
        destination: "/blog/uk-take-home-pay-explained",
        permanent: true,
      },
      // Legacy taxonomy → new 8-category structure (permanent).
      { source: "/tax", destination: "/uk/tax-and-salary", permanent: true },
      {
        source: "/tax/take-home-pay",
        destination: "/uk/tax-and-salary/salary-calculator",
        permanent: true,
      },
      {
        source: "/tax/income-tax",
        destination: "/uk/tax-and-salary/tax-bracket-checker",
        permanent: true,
      },
      {
        source: "/tax/national-insurance",
        destination: "/uk/tax-and-salary/national-insurance",
        permanent: true,
      },
      {
        source: "/tax/vat",
        destination: "/uk/business/vat-calculator",
        permanent: true,
      },
      { source: "/pensions", destination: "/uk/investing", permanent: true },
      {
        source: "/pensions/:slug",
        destination: "/uk/investing/:slug",
        permanent: true,
      },
      {
        source: "/property/stamp-duty",
        destination: "/uk/property/stamp-duty-england",
        permanent: true,
      },
      {
        source: "/business/ir35-take-home",
        destination: "/uk/tax-and-salary/ir35-take-home",
        permanent: true,
      },
      // The same two old addresses arriving from govmath.co.uk, now under /uk.
      { source: "/uk/property/stamp-duty", destination: "/uk/property/stamp-duty-england", permanent: true },
      { source: "/uk/business/ir35-take-home", destination: "/uk/tax-and-salary/ir35-take-home", permanent: true },
      // Old UK addresses on the new domain (links, bookmarks) go under /uk too.
      // Everyday calculators moved out of /uk/life (and the even older /life).
      ...EVERYDAY_MOVES.flatMap(([from, to]) => [
        { source: `/uk/life/${from}`, destination: `/everyday/${to}`, permanent: true },
        { source: `/life/${from}`, destination: `/everyday/${to}`, permanent: true },
      ]),
      ...STUDENT_LOAN_MOVES.flatMap(([from, plan]) => [
        { source: `/uk/students/${from}`, destination: `${STUDENT_LOAN_PAGE}?plan=${plan}`, permanent: true },
        { source: `/students/${from}`, destination: `${STUDENT_LOAN_PAGE}?plan=${plan}`, permanent: true },
      ]),
      { source: `/:topic(${UK_TOPICS})`, destination: "/uk/:topic", permanent: true },
      { source: `/:topic(${UK_TOPICS})/:path*`, destination: "/uk/:topic/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
