import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ADSENSE_CLIENT } from "@/lib/ads";

/**
 * The one root layout. It loads no site-wide CSS: each page brings the
 * approved design's stylesheets itself (src/gm/GmDocument.tsx for the pages
 * taken straight from the design, src/gm/GmShell.tsx for the rest).
 *
 * When NEXT_PUBLIC_ADSENSE_CLIENT is set, every page carries the AdSense
 * account meta tag and loads the AdSense script (which also runs Auto ads),
 * so Google can verify the site and serve ads.
 */
export const metadata: Metadata = {
  metadataBase: new URL("https://govmath.co.uk"),
  icons: {
    icon: "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2040%2040'%3E%3Crect%20width='40'%20height='40'%20rx='8'%20fill='%23510b38'/%3E%3Ctext%20x='8'%20y='29'%20fill='white'%20font-family='Arial'%20font-size='27'%20font-weight='bold'%3EG%3C/text%3E%3C/svg%3E",
  },
  openGraph: { type: "website", locale: "en_GB", siteName: "GovMath" },
  twitter: { card: "summary_large_image" },
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION },
  ...(ADSENSE_CLIENT ? { other: { "google-adsense-account": ADSENSE_CLIENT } } : {}),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "GovMath",
              url: "https://govmath.co.uk",
              description: "Free UK tax, salary, mortgage and benefits calculators in plain English.",
            }),
          }}
        />
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
