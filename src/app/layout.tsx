import type { Metadata, Viewport } from "next";
import { preload } from "react-dom";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ADSENSE_CLIENT } from "@/lib/ads";
import { GA_ID, gaInitScript } from "@/lib/analytics";
import { siteJsonLd } from "@/gm/schema";
import { ogFor } from "@/gm/og";

/**
 * The one root layout. It loads no site-wide CSS: each page brings the
 * approved design's stylesheets itself (src/gm/GmDocument.tsx for the pages
 * taken straight from the design, src/gm/GmShell.tsx for the rest).
 *
 * When NEXT_PUBLIC_ADSENSE_CLIENT is set, every page carries the AdSense
 * account meta tag and loads the AdSense script (which also runs Auto ads),
 * so Google can verify the site and serve ads. With NEXT_PUBLIC_GA_ID set,
 * Google Analytics loads too, with consent defaults first (src/lib/analytics.ts).
 */
export const metadata: Metadata = {
  metadataBase: new URL("https://sumatlas.com"),
  // Every page title ends with the brand; pages give their own title without it.
  title: { default: "SumAtlas: Free Money and Tax Calculators", template: "%s | SumAtlas" },
  openGraph: ogFor("/"),
  twitter: { card: "summary_large_image" },
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION },
  ...(ADSENSE_CLIENT ? { other: { "google-adsense-account": ADSENSE_CLIENT } } : {}),
};

// The browser bar on phones takes the site's claret.
export const viewport: Viewport = { themeColor: "#8c1d40" };

// The tab icon, Google's favicon and home-screen icons come from the files
// src/app/favicon.ico, icon.png and apple-icon.png (the round SumAtlas badge).
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // Lato 400 and 700 are used on every page; fetch them before the CSS asks.
  preload("/gm/fonts/lato-400.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  preload("/gm/fonts/lato-700.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  return (
    <html lang="en-GB">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }} />
        {GA_ID && (
          <>
            <script dangerouslySetInnerHTML={{ __html: gaInitScript(GA_ID) }} />
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
          </>
        )}
        {children}
        {ADSENSE_CLIENT && (
          <script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`} crossOrigin="anonymous" />
        )}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
