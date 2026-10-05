import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

/**
 * Root layout for the pages built from the approved GovMath design package
 * (home, the eight topic pages, take-home pay and mortgage repayment). It
 * loads none of the site-wide CSS: each page brings the design's own
 * stylesheets in their original order (see src/gm/GmDocument.tsx).
 */
export const metadata: Metadata = {
  metadataBase: new URL("https://govmath.co.uk"),
  icons: {
    icon: "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2040%2040'%3E%3Crect%20width='40'%20height='40'%20rx='8'%20fill='%23510b38'/%3E%3Ctext%20x='8'%20y='29'%20fill='white'%20font-family='Arial'%20font-size='27'%20font-weight='bold'%3EG%3C/text%3E%3C/svg%3E",
  },
  openGraph: { type: "website", locale: "en_GB", siteName: "GovMath" },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION },
};

export default function GmLayout({ children }: Readonly<{ children: React.ReactNode }>) {
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
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
