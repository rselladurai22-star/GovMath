/**
 * CD helpers for the US CD calculator: turning a quoted APY back into the
 * nominal rate the `cd` engine takes, and a CD's value month by month.
 */

import { PER_YEAR, type Compounding } from "./savings";

/** The nominal yearly rate (%) that gives `apyPct` with this compounding. */
export function rateFromApy(apyPct: number, compounding: Compounding): number {
  const n = PER_YEAR[compounding];
  return n * (Math.pow(1 + apyPct / 100, 1 / n) - 1) * 100;
}

/** Value of a deposit after each month 0..months at an APY (as a share, e.g. 0.04). */
export function valueByMonth(deposit: number, apyShare: number, months: number): number[] {
  const d = Math.max(0, deposit);
  return Array.from({ length: Math.max(0, Math.round(months)) + 1 }, (_, m) => d * Math.pow(1 + apyShare, m / 12));
}
