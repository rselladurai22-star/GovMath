import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { COUNTRIES, DEFAULT_COUNTRY, countryForIso } from "./lib/countries";

/**
 * sumatlas.com has no page of its own at "/": every visit goes to a country's
 * home page (owner's request, October 2026). The visitor's own choice from
 * the header's country menu (the sa-country cookie) wins; then the country
 * Vercel reports for their location, if it is one we cover; then the UK.
 * The redirect is temporary (307) and never cached, because it differs by
 * visitor. Every other address, including each country's pages, is served
 * as asked, so search engines crawling from abroad still reach every page.
 */
export function proxy(request: NextRequest) {
  const live = (code: string | undefined) => (code && COUNTRIES.some((c) => c.live && c.code === code) ? code : undefined);
  const country =
    live(request.cookies.get("sa-country")?.value) ?? live(countryForIso(request.headers.get("x-vercel-ip-country"))) ?? DEFAULT_COUNTRY;
  const url = request.nextUrl.clone();
  url.pathname = `/${country}`;
  const res = NextResponse.redirect(url, 307);
  res.headers.set("Cache-Control", "private, no-store");
  return res;
}

export const config = { matcher: "/" };
