/**
 * Which year's benefit rates a calculator uses.
 *
 * "2027/28" figures are DWP's proposed rates from 6 April 2027, published on
 * 11 November 2026 in "Proposed benefit and pension rates 2027 to 2028"
 * (gov.uk/government/publications/benefit-and-pension-rates-2027-to-2028),
 * and Child Benefit from HM Treasury's Budget 2026 Annex A. They become final
 * when Parliament approves the uprating order. Universal Credit changes from
 * the first assessment period that starts on or after 6 April 2027.
 */

export type RatesYear = "2026/27" | "2027/28";

export const RATES_YEARS = ["2026/27", "2027/28"] as const satisfies readonly RatesYear[];

export const RATES_YEAR_OPTIONS: { value: RatesYear; label: string }[] = [
  { value: "2026/27", label: "2026/27 (now)" },
  { value: "2027/28", label: "From April 2027 (proposed)" },
];

/** Picks the rates object for a year. */
export function forYear<T>(year: RatesYear | undefined, now: T, next: T): T {
  return year === "2027/28" ? next : now;
}
