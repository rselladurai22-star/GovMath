import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  metadataBase: new URL("https://gov-math.vercel.app"),
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
    url: "https://gov-math.vercel.app",
    siteName: "GovMath",
    title: "GovMath — UK government rules, in plain English",
    description: "Free UK tax, salary, mortgage, benefits and pension calculators. 2025/26 rates, no signup, plain-English explanations.",
  },
  twitter: {
    card: "summary_large_image",
    title: "GovMath — UK calculators in plain English",
    description: "Free UK tax, salary, mortgage and benefits calculators. 2025/26 rates.",
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
    <html lang="en-GB" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-bg text-text">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "GovMath",
              url: "https://gov-math.vercel.app",
              description: "Free UK tax, salary, mortgage and benefits calculators in plain English.",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://gov-math.vercel.app/calculators?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
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
      </body>
    </html>
  );
}
