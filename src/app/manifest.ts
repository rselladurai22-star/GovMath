import type { MetadataRoute } from "next";

/** Web app manifest: the name, colours and icons used when the site is saved to a phone's home screen. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SumAtlas: Free Money and Tax Calculators",
    short_name: "SumAtlas",
    description: "Free money, tax and everyday calculators with plain-English guides.",
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#8c1d40",
    icons: [
      { src: "/gm/sumatlas-icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/gm/sumatlas-icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
