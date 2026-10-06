/**
 * Reverse take-home: the gross salary needed for a target take-home pay,
 * 2026/27. Searches the take-home engine, so every rule it applies (the
 * Personal Allowance taper, Scottish bands, NI, student loans and
 * salary-sacrifice pension) is reflected.
 */

import { computeTakeHome, type StudentPlan, type TaxRegion } from "./take-home-engine";

export type ReverseInput = {
  /** Target take-home pay a year. */
  target: number;
  region: TaxRegion;
  plan: StudentPlan;
  /** Salary-sacrifice pension, % of salary. */
  pensionPct: number;
};

export const takeHomeFor = (gross: number, i: Omit<ReverseInput, "target">) =>
  computeTakeHome({ gross, bonus: 0, pensionPct: i.pensionPct, plan: i.plan, region: i.region }).takeHome;

/** Smallest gross salary (to the penny) whose take-home reaches the target. */
export function grossForTakeHome(i: ReverseInput): number {
  const target = Math.max(0, i.target);
  if (target <= 0) return 0;
  let lo = 0;
  let hi = Math.max(1_000, target * 3);
  while (takeHomeFor(hi, i) < target && hi < 1e8) hi *= 2;
  for (let n = 0; n < 80 && hi - lo > 0.005; n++) {
    const mid = (lo + hi) / 2;
    if (takeHomeFor(mid, i) >= target) hi = mid;
    else lo = mid;
  }
  return Math.ceil(hi * 100) / 100;
}

/** Gross hourly rate for a yearly salary, at the given paid hours a week. */
export const hourlyFor = (gross: number, hoursPerWeek: number) => (hoursPerWeek > 0 ? gross / 52 / hoursPerWeek : 0);
