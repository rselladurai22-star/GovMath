import type { Metadata } from "next";
import { Source_Serif_4, Figtree, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

// Reckon type system, applied site-wide: Source Serif 4 (display/headings),
// Figtree (UI/body — the default sans), IBM Plex Mono (figures, eyebrows).
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const figtree = Figtree({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-figtree",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://govmath.co.uk"),
  title: {
    default: "GovMath — UK government rules, in plain English",
    template: "%s | GovMath",
  },
  description:
    "Free UK calculators for tax, take-home pay, benefits, property and pensions. Government jargon translated into plain English. 2025/26 rates.",
  keywords: [
    "UK tax calculator",
    "take home pay calculator UK",
    "stamp duty calculator",
    "national insurance calculator",
    "self assessment",
    "mortgage calculator UK",
    "PAYE calculator",
    "UK salary calculator",
    "HMRC calculator",
  ],
  authors: [{ name: "GovMath" }],
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "GovMath",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={`h-full antialiased ${sourceSerif.variable} ${figtree.variable} ${plexMono.variable}`}
    >
      <body className="min-h-full flex flex-col bg-bg text-text">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "GovMath",
                url: "https://govmath.co.uk",
                description: "Free UK tax, salary, mortgage and benefits calculators in plain English.",
                potentialAction: {
                  "@type": "SearchAction",
                  target: "https://govmath.co.uk/calculators?q={search_term_string}",
                  "query-input": "required name=search_term_string",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "GovMath",
                url: "https://govmath.co.uk",
                logo: "https://govmath.co.uk/icon.png",
                description: "GovMath publishes free UK calculators that translate HMRC, DWP and DVLA rules into plain English.",
              },
            ]),
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:bg-text focus:text-white focus:px-3 focus:py-2 focus:rounded-md focus:z-50"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
