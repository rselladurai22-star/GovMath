import { CALCULATORS, CATEGORIES } from "@/lib/calculators";
import { getAllPosts } from "@/lib/blog";

export const dynamic = "force-static";

const OLD = "https://govmath.co.uk";
/** The day the site moved to sumatlas.com; the date each old address started redirecting. */
const MOVED = "2026-10-08";

/**
 * The sitemap govmath.co.uk serves after the move (next.config.ts rewrites
 * its /sitemap.xml here): the old address of every page still live, each a
 * permanent redirect to sumatlas.com, dated the day of the move. Since the
 * focus on 31 calculators (26 November 2026) removed pages are left out:
 * their old addresses answer 404. Google's site-move advice is
 * to keep listing the old addresses for a while so they are recrawled and
 * the redirects are seen sooner. Remove once Search Console shows the old
 * property empty (several months after the move).
 */
export function GET() {
  const paths = [
    "/",
    ...CATEGORIES.map((c) => c.href.replace(/^\/uk/, "")),
    ...CALCULATORS.map((c) => c.href.replace(/^\/uk/, "")),
    ...["/calculators", "/blog", "/about", "/how-we-check", "/contact", "/privacy", "/terms", "/disclaimer"],
    // Articles published before the move.
    ...getAllPosts().filter((p) => p.date < MOVED).map((p) => `/blog/${p.slug}`),
  ];
  const urls = [...new Set(paths)].map((p) => `<url><loc>${OLD}${p === "/" ? "" : p}</loc><lastmod>${MOVED}</lastmod></url>`);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
