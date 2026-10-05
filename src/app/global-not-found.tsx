import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import NotFound from "./(site)/not-found";

// The site has two root layouts (the approved design pages and the rest), so
// unmatched addresses get this stand-alone 404 page.
const lato = Lato({ subsets: ["latin"], display: "swap", weight: ["400", "700", "900"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "Page not found | GovMath",
  description: "The page you are looking for does not exist.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en-GB" className={`h-full antialiased ${lato.variable}`}>
      <body className="min-h-full flex flex-col bg-bg text-text">
        <SiteHeader />
        <main id="main" className="flex-1">
          <NotFound />
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
