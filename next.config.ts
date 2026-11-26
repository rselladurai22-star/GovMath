import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import type { NextConfig } from "next";
import { CALCULATORS, CATEGORIES } from "./src/lib/calculators";

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
/** The three topics kept in the November 2026 focus, each with a hub at /uk/<topic>. */
const KEPT_TOPICS = CATEGORIES.map((c) => c.slug).join("|");
/** Topics removed in the focus (26 November 2026): their hubs go to /uk. */
const REMOVED_TOPICS = "tax-and-salary|business|investing|vehicles|life";
/**
 * The kept calculators' paths without /uk (/benefits/child-benefit). Their old
 * addresses (govmath.co.uk/<topic>/<slug>, and sumatlas.com/<topic>/<slug>)
 * go to the page. Removed calculators get no redirect: they answer 404, and
 * Google drops them (owner's decision, 26 November 2026).
 */
const KEPT_CALCULATORS = CALCULATORS.map((c) => c.href.replace(/^\/uk/, ""));
/** Site-wide pages and the articles that existed on govmath.co.uk and are still live. */
const KEPT_SHARED = [
  "about",
  "how-we-check",
  "contact",
  "privacy",
  "terms",
  "disclaimer",
  "calculators",
  "blog",
  "blog/100k-tax-trap",
  "blog/plan-2-vs-plan-5-student-loans",
  "widgets",
].map((p) => `/${p}`);

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
    const old = { type: "host" as const, value: OLD_HOST };
    return [
      // October 2026: the site moved from govmath.co.uk to sumatlas.com, and
      // the UK calculators moved under /uk. Every old address of a page that is
      // still live goes straight to it in one permanent hop: the home page to
      // the UK hub, topic and calculator pages to /uk/<topic>/…, the site-wide
      // pages to the same path. Since the focus (26 November 2026) the removed
      // topics' hubs go to /uk, and removed pages have no redirect (404). Keep
      // these for as long as the old domain is renewed.
      { source: "/", has: [old], destination: `${SITE}/uk`, permanent: true },
      { source: `/:topic(${KEPT_TOPICS})`, has: [old], destination: `${SITE}/uk/:topic`, permanent: true },
      { source: `/:topic(${REMOVED_TOPICS})`, has: [old], destination: `${SITE}/uk`, permanent: true },
      ...KEPT_CALCULATORS.map((path) => ({ source: path, has: [old], destination: `${SITE}/uk${path}`, permanent: true })),
      ...KEPT_SHARED.map((path) => ({ source: path, has: [old], destination: `${SITE}${path}`, permanent: true })),
      // Anything else on the old domain that is still live on sumatlas.com
      // (/uk/… addresses), except its sitemap (see rewrites()).
      ...["/uk", ...CATEGORIES.map((c) => c.href), ...CALCULATORS.map((c) => c.href)].map((path) => ({
        source: path,
        has: [old],
        destination: `${SITE}${path}`,
        permanent: true,
      })),
      // One address for the site: www goes to the bare domain.
      { source: "/:path*", has: [{ type: "host", value: "www.sumatlas.com" }], destination: `${SITE}/:path*`, permanent: true },
      // Legacy hubs of the very first site structure.
      { source: "/:hub(tax|pensions)", destination: "/uk", permanent: true },
      // The hubs of the topics removed in the focus (26 November 2026).
      { source: `/uk/:topic(${REMOVED_TOPICS})`, destination: "/uk", permanent: true },
      { source: `/:topic(${REMOVED_TOPICS})`, destination: "/uk", permanent: true },
      // Old UK addresses on the new domain (links, bookmarks) go under /uk too.
      { source: `/:topic(${KEPT_TOPICS})`, destination: "/uk/:topic", permanent: true },
      ...KEPT_CALCULATORS.map((path) => ({ source: path, destination: `/uk${path}`, permanent: true })),
    ];
  },
};

export default nextConfig;
