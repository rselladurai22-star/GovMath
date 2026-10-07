import type { NextRequest } from "next/server";
import { countryForIso } from "@/lib/countries";

/**
 * The visitor's country, for the header's country menu: { country: "uk" }
 * when Vercel reports a location we cover, otherwise { country: null }.
 * Vercel sets x-vercel-ip-country on every request; it is absent locally.
 * Only the country code is used; nothing is stored.
 */
export const dynamic = "force-dynamic";

export function GET(request: NextRequest) {
  const country = countryForIso(request.headers.get("x-vercel-ip-country")) ?? null;
  return Response.json({ country }, { headers: { "Cache-Control": "private, no-store" } });
}
