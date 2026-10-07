import type { MetadataRoute } from "next";

/** Web app manifest: the name, colours and icons used when the site is saved to a phone's home screen. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GovMath: Free UK Calculators",
    short_name: "GovMath",
    description: "Free UK tax, salary, mortgage and benefits calculators in plain English.",
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#8c1d40",
    icons: [
      { src: "/gm/govmath-icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/gm/govmath-icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
