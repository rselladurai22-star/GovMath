import { countryForPath } from "../countries";

/**
 * Where "Home" links go (October 2026). Inside a country's section the home
 * page is that country's (/uk, /us), as the logo there already links; on
 * shared pages (about, Everyday, guides) it is the site's home page, "/".
 * Until 15 October 2026 "/" had no page and redirected by location, which
 * AdSense flagged under "Site Behavior: Navigation"; it is a real page now.
 */

export type Crumb = { href: string; label: string };

/** The home page for a path: /uk or /us inside a section, else "/". */
export function homeFor(path: string): string {
  const section = countryForPath(path);
  return section ? `/${section}` : "/";
}

/**
 * A breadcrumb with "Home" (href "/") pointing at the page's own home page.
 * When the next crumb goes to the same place ("Home › US calculators › …"),
 * the two become one: "Home", or the page's own name when it is the last.
 */
export function homeCrumbs(items: Crumb[]): Crumb[] {
  const home = homeFor(items.find((c) => countryForPath(c.href))?.href ?? "");
  const out: Crumb[] = [];
  items.forEach((c, i) => {
    const crumb = c.href === "/" ? { ...c, href: home } : c;
    if (out.length && out[out.length - 1].href === crumb.href) {
      if (i === items.length - 1) out[out.length - 1] = crumb;
      return;
    }
    out.push(crumb);
  });
  return out;
}
