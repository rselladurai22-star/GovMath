/**
 * Child Benefit + High Income Child Benefit Charge (HICBC) — 2026/27.
 *
 * Rates from 6 April 2026:
 *   First/eldest child:  £27.05/week
 *   Each additional:     £17.90/week
 * Paid every 4 weeks.
 *
 * HICBC clawback (2024+):
 *   Begins at adjusted net income £60,000.
 *   1% of benefit lost per £200 of income above threshold.
 *   Fully reclaimed at £80,000.
 */

import { forYear, type RatesYear } from "./rates-year";

export const CHILD_BENEFIT_2026_27 = {
  firstChildWeekly: 27.05,
  additionalChildWeekly: 17.90,
  hicbcStart: 60_000,
  hicbcEnd: 80_000,
} as const;

/**
 * Proposed rates from 6 April 2027: HM Treasury Budget 2026 Annex A,
 * "Child Benefit and Guardian's Allowance" (£28.00 eldest, £18.55 others).
 * The charge thresholds are unchanged.
 */
export const CHILD_BENEFIT_2027_28 = {
  firstChildWeekly: 28.0,
  additionalChildWeekly: 18.55,
  hicbcStart: 60_000,
  hicbcEnd: 80_000,
} as const;

export type ChildBenefitRates = { firstChildWeekly: number; additionalChildWeekly: number; hicbcStart: number; hicbcEnd: number };

export const childBenefitRates = (year?: RatesYear): ChildBenefitRates => forYear<ChildBenefitRates>(year, CHILD_BENEFIT_2026_27, CHILD_BENEFIT_2027_28);

export type ChildBenefitResult = {
  children: number;
  weekly: number;
  monthly: number;
  annual: number;
};

export type HICBCResult = {
  annualBenefit: number;
  adjustedNetIncome: number;
  chargePct: number;
  charge: number;
  netRetained: number;
};

