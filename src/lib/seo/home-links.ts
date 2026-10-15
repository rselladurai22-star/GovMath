import { DEFAULT_COUNTRY, countryForPath } from "../countries";

/**
 * Where "Home" links go (October 2026, after AdSense flagged "Site Behavior:
 * Navigation" on govmath.co.uk). sumatlas.com/ has no page of its own:
 * src/proxy.ts sends it to /uk or /us by location, so a "Home" link to "/"
 * on a UK page could land a visitor abroad on the US hub. No link points at
 * "/": a UK or US page's home is its own section's home page, and a shared
 * page (about, Everyday, guides) links to the default country's, which
 * CountrySwitch.tsx then points at the visitor's country (`shared`).
 */

export type Crumb = { href: string; label: string };

/** `shared`: a shared page's home link, which the browser points at the visitor's country. */
export type HomeCrumb = Crumb & { shared?: true };

/** The home page for a path: /uk or /us inside a section, else the default country's. */
export function homeFor(path: string): { href: string; shared: boolean } {
  const section = countryForPath(path);
  return { href: `/${section ?? DEFAULT_COUNTRY}`, shared: !section };
}

/**
 * A breadcrumb with "Home" (href "/") pointing at the page's own home page.
 * When the next crumb goes to the same place ("Home › US calculators › …"),
 * the two become one: "Home", or the page's own name when it is the last.
 */
export function homeCrumbs(items: Crumb[]): HomeCrumb[] {
  const home = homeFor(items.find((c) => countryForPath(c.href))?.href ?? "");
  const out: HomeCrumb[] = [];
  items.forEach((c, i) => {
    const crumb: HomeCrumb = c.href === "/" ? { ...c, href: home.href, ...(home.shared ? { shared: true as const } : {}) } : c;
    if (out.length && out[out.length - 1].href === crumb.href) {
      if (i === items.length - 1) out[out.length - 1] = crumb;
      return;
    }
    out.push(crumb);
  });
  return out;
}
