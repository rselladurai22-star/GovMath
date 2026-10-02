/**
 * AdSense settings, read from environment variables at build time.
 *
 *   NEXT_PUBLIC_ADSENSE_CLIENT  your publisher ID, e.g. ca-pub-1234567890123456
 *   NEXT_PUBLIC_ADSENSE_SLOT    optional display ad unit ID for in-page slots
 *
 * With no client ID the site shows no ad placeholders, loads no ad script and
 * serves no ads.txt. With only the client ID, AdSense Auto ads place the ads.
 */
const raw = (process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "").trim();
const normalised = /^pub-\d+$/.test(raw) ? `ca-${raw}` : raw;

export const ADSENSE_CLIENT = /^ca-pub-\d{10,20}$/.test(normalised) ? normalised : "";
export const ADSENSE_SLOT = (process.env.NEXT_PUBLIC_ADSENSE_SLOT ?? "").trim().replace(/\D/g, "");
/** Publisher ID as ads.txt wants it: pub-XXXXXXXXXXXXXXXX. */
export const ADSENSE_PUBLISHER = ADSENSE_CLIENT.replace(/^ca-/, "");
