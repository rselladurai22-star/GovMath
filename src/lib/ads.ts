/**
 * AdSense settings.
 *
 *   NEXT_PUBLIC_ADSENSE_CLIENT  publisher ID; defaults to GovMath's own
 *   NEXT_PUBLIC_ADSENSE_SLOT    optional display ad unit ID for in-page slots
 *
 * With a publisher ID, every page loads the AdSense script (Auto ads place the
 * ads) and /ads.txt is served. Set NEXT_PUBLIC_ADSENSE_CLIENT to "off" to
 * switch ads off. In-page slots only show once a slot ID is set.
 */
const GOVMATH_PUBLISHER = "ca-pub-3942263076624028";
const env = (process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "").trim();
const raw = env.toLowerCase() === "off" ? "" : env || GOVMATH_PUBLISHER;
const normalised = /^pub-\d+$/.test(raw) ? `ca-${raw}` : raw;

export const ADSENSE_CLIENT = /^ca-pub-\d{10,20}$/.test(normalised) ? normalised : "";
export const ADSENSE_SLOT = (process.env.NEXT_PUBLIC_ADSENSE_SLOT ?? "").trim().replace(/\D/g, "");
/** Publisher ID as ads.txt wants it: pub-XXXXXXXXXXXXXXXX. */
export const ADSENSE_PUBLISHER = ADSENSE_CLIENT.replace(/^ca-/, "");
