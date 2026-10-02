/**
 * National Insurance, explained band by band — 2026/27.
 *
 * Wraps the Class 1 (employee) and Class 4 (self-employed) functions in
 * `2026-27.ts` with a display-ready breakdown, the thresholds that decide
 * whether a year counts towards the State Pension, and a sampled curve.
 */

import { nationalInsurance, selfEmployedNI, TAX_YEAR_2026_27 } from "./2026-27";

export type NIMode = "employee" | "self-employed";

/** Earnings at or above this (£129 a week) give an employee a qualifying year. */
export const NI_LOWER_EARNINGS_LIMIT = 6_708;
/** Profits at or above this give the self-employed a qualifying year for free. */
export const NI_SMALL_PROFITS_THRESHOLD = 7_105;
/** Voluntary Class 2 contributions for the self-employed below the threshold. */
export const CLASS2_VOLUNTARY_WEEKLY = 3.65;

export type NIBand = { label: string; rate: number; income: number; ni: number };

export function niBreakdown(income: number, mode: NIMode): { total: number; bands: NIBand[] } {
  const t = TAX_YEAR_2026_27.ni;
  const rates = mode === "employee" ? t.rates : t.class4Rates;
  const r = mode === "employee" ? nationalInsurance(income) : selfEmployedNI(income);
  const safe = Math.max(0, income || 0);
  const bands: NIBand[] = [
    { label: `Up to ${fmt(t.primaryThreshold)}`, rate: 0, income: Math.min(safe, t.primaryThreshold), ni: 0 },
    {
      label: `${fmt(t.primaryThreshold)} to ${fmt(t.upperEarningsLimit)}`,
      rate: rates.main,
      income: Math.max(0, Math.min(safe, t.upperEarningsLimit) - t.primaryThreshold),
      ni: r.mainBand,
    },
    { label: `Above ${fmt(t.upperEarningsLimit)}`, rate: rates.upper, income: Math.max(0, safe - t.upperEarningsLimit), ni: r.upperBand },
  ];
  return { total: r.total, bands: bands.filter((b, i) => i === 0 || b.income > 0) };
}

/** Rate on the next £1 of earnings or profit. */
export function niMarginalRate(income: number, mode: NIMode): number {
  const t = TAX_YEAR_2026_27.ni;
  const rates = mode === "employee" ? t.rates : t.class4Rates;
  if (income < t.primaryThreshold) return 0;
  return income < t.upperEarningsLimit ? rates.main : rates.upper;
}

/** Whether the year counts towards the State Pension without paying extra. */
export function qualifyingYear(income: number, mode: NIMode): boolean {
  return income >= (mode === "employee" ? NI_LOWER_EARNINGS_LIMIT : NI_SMALL_PROFITS_THRESHOLD);
}

/** NI for both modes at evenly spaced incomes from £0 to `top`. */
export function niCurve(top: number, steps: number): { income: number; employee: number; selfEmployed: number }[] {
  return Array.from({ length: steps + 1 }, (_, i) => {
    const income = (top * i) / steps;
    return { income, employee: nationalInsurance(income).total, selfEmployed: selfEmployedNI(income).total };
  });
}

function fmt(n: number) {
  return `£${n.toLocaleString("en-GB")}`;
}
