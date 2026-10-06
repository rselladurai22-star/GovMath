import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import type { NextConfig } from "next";

// Version for the stylesheets in public/gm: a hash of their contents, added to
// each <link> as ?v=… so browsers can cache them for a year and still get the
// new file the moment any stylesheet changes.
const cssDir = "public/gm";
const cssHash = createHash("sha256");
for (const file of readdirSync(cssDir).filter((f) => f.endsWith(".css")).sort()) {
  cssHash.update(file).update(readFileSync(`${cssDir}/${file}`));
}
const YEAR = "public, max-age=31536000, immutable";

const nextConfig: NextConfig = {
  env: { GM_CSS_VERSION: cssHash.digest("hex").slice(0, 10) },
  async headers() {
    return [
      {
        source: "/(.*)",
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
  async redirects() {
    return [
      // One address for the site: www goes to the bare domain.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.govmath.co.uk" }],
        destination: "https://govmath.co.uk/:path*",
        permanent: true,
      },
      // The take-home pay article's address no longer names a tax year.
      {
        source: "/blog/uk-take-home-pay-2025-26-explained",
        destination: "/blog/uk-take-home-pay-explained",
        permanent: true,
      },
      // Legacy taxonomy → new 8-category structure (permanent).
      { source: "/tax", destination: "/tax-and-salary", permanent: true },
      {
        source: "/tax/take-home-pay",
        destination: "/tax-and-salary/salary-calculator",
        permanent: true,
      },
      {
        source: "/tax/income-tax",
        destination: "/tax-and-salary/tax-bracket-checker",
        permanent: true,
      },
      {
        source: "/tax/national-insurance",
        destination: "/tax-and-salary/national-insurance",
        permanent: true,
      },
      {
        source: "/tax/vat",
        destination: "/business/vat-calculator",
        permanent: true,
      },
      { source: "/pensions", destination: "/investing", permanent: true },
      {
        source: "/pensions/:slug",
        destination: "/investing/:slug",
        permanent: true,
      },
      {
        source: "/property/stamp-duty",
        destination: "/property/stamp-duty-england",
        permanent: true,
      },
      {
        source: "/business/ir35-take-home",
        destination: "/tax-and-salary/ir35-take-home",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
