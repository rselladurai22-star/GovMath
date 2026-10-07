/**
 * The countries SumAtlas covers, in menu order. Live countries have their own
 * section (/uk/…); the others are listed as coming soon. `iso` is the
 * ISO 3166-1 alpha-2 code that Vercel reports for a visitor's location.
 */
export type Country = { code: string; iso: string; name: string; short: string; live: boolean };

export const COUNTRIES: Country[] = [
  { code: "uk", iso: "GB", name: "United Kingdom", short: "UK", live: true },
  { code: "us", iso: "US", name: "United States", short: "US", live: false },
  { code: "in", iso: "IN", name: "India", short: "India", live: false },
  { code: "sg", iso: "SG", name: "Singapore", short: "Singapore", live: false },
];

/** The default when a visitor's location is unknown or not one of ours. */
export const DEFAULT_COUNTRY = "uk";

/** Our country code for a visitor's ISO country (the UK's ISO code is GB). */
export function countryForIso(iso: string | null | undefined): string | undefined {
  const up = (iso ?? "").trim().toUpperCase();
  return COUNTRIES.find((c) => c.iso === up)?.code;
}

/** The country whose section a path belongs to (/uk/… is the UK), if any. */
export function countryForPath(path: string): string | undefined {
  const first = path.split("/")[1] ?? "";
  return COUNTRIES.find((c) => c.live && c.code === first)?.code;
}
