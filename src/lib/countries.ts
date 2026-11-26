/**
 * The countries SumAtlas covers. Since 26 November 2026 only the UK is live:
 * the site covers UK benefits, family, renting and student money. A live
 * country has its own section (/uk/…); the others appear nowhere.
 */
export type Country = { code: string; name: string; live: boolean };

export const COUNTRIES: Country[] = [
  { code: "uk", name: "United Kingdom", live: true },
  { code: "us", name: "United States", live: false },
];

/** The country whose section a path belongs to (/uk/… is the UK), if any. */
export function countryForPath(path: string): string | undefined {
  const first = path.split("/")[1] ?? "";
  return COUNTRIES.find((c) => c.live && c.code === first)?.code;
}
