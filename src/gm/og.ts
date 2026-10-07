/**
 * A page's Open Graph settings with its own share image (built by
 * src/app/og/[[...path]]/route.tsx). Setting openGraph on a page replaces the
 * root layout's, so this repeats the site-wide fields.
 */
export function ogFor(path: string) {
  return {
    type: "website" as const,
    locale: "en_GB",
    siteName: "GovMath",
    images: [{ url: `/og${path === "/" ? "" : path}`, width: 1200, height: 630 }],
  };
}
