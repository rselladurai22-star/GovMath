import type { Metadata } from "next";
import { preload } from "react-dom";
import { Analytics } from "@vercel/analytics/next";
import { CALCULATOR_CSS, THEME_AFTER, THEME_BEFORE } from "@/gm/GmShell";

/**
 * Root layout for calculators embedded on other sites (/embed/…). Unlike the
 * site's layout it loads no AdSense (ads must not run inside other people's
 * pages) and no Google Analytics (its cookies would be third-party there);
 * Vercel Analytics is cookieless, so it still counts embed views.
 */
export const metadata: Metadata = {
  metadataBase: new URL("https://sumatlas.com"),
  title: { default: "SumAtlas calculator", template: "%s | SumAtlas" },
  robots: { index: false, follow: true },
};

const CSS = [...CALCULATOR_CSS, ...THEME_BEFORE, "govmath-site.css", ...THEME_AFTER];

export default function EmbedLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  preload("/gm/fonts/lato-400.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  preload("/gm/fonts/lato-700.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  return (
    <html lang="en">
      <body className="gm-embedbody">
        {CSS.map((href) => (
          <link key={href} rel="stylesheet" href={`/gm/${href}?v=${process.env.GM_CSS_VERSION}`} precedence="gm" />
        ))}
        <div className="gm-claret">
          <main className="gm-neutral">{children}</main>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
