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

export const CHILD_BENEFIT_2026_27 = {
  firstChildWeekly: 27.05,
  additionalChildWeekly: 17.90,
  hicbcStart: 60_000,
  hicbcEnd: 80_000,
} as const;

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

