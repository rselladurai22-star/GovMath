import type { Metadata } from "next";
import { preload } from "react-dom";
import NotFound from "./(site)/not-found";

export const metadata: Metadata = { title: "Page not found | SumAtlas" };

/**
 * 404 for addresses that match no page. The site and the embeddable
 * calculators have separate root layouts, so this page brings its own
 * <html> and the site's frame (through the site's not-found page).
 */
export default function GlobalNotFound() {
  preload("/gm/fonts/lato-400.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  preload("/gm/fonts/lato-700.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  return (
    <html lang="en-GB">
      <body>
        <NotFound />
      </body>
    </html>
  );
}
