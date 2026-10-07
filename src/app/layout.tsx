import type { Metadata } from "next";
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
  metadataBase: new URL("https://govmath.co.uk"),
  // Every page title ends with the brand; pages give their own title without it.
  title: { default: "GovMath: Free UK Calculators", template: "%s | GovMath" },
  icons: {
    icon: "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2040%2040'%3E%3Crect%20width='40'%20height='40'%20rx='8'%20fill='%23510b38'/%3E%3Ctext%20x='8'%20y='29'%20fill='white'%20font-family='Arial'%20font-size='27'%20font-weight='bold'%3EG%3C/text%3E%3C/svg%3E",
  },
  openGraph: ogFor("/"),
  twitter: { card: "summary_large_image" },
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION },
  ...(ADSENSE_CLIENT ? { other: { "google-adsense-account": ADSENSE_CLIENT } } : {}),
};

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
