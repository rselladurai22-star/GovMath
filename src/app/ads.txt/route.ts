import { ADSENSE_PUBLISHER } from "@/lib/ads";

export const dynamic = "force-static";

/** Authorised Digital Sellers file, generated from the AdSense publisher ID. */
export function GET() {
  if (!ADSENSE_PUBLISHER) return new Response("Not found", { status: 404 });
  return new Response(`google.com, ${ADSENSE_PUBLISHER}, DIRECT, f08c47fec0942fa0\n`, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
