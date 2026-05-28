/**
 * Child Benefit + High Income Child Benefit Charge (HICBC) — 2025/26.
 *
 * Rates from 6 April 2025:
 *   First/eldest child:  £26.05/week
 *   Each additional:     £17.25/week
 * Paid every 4 weeks.
 *
 * HICBC clawback (2024+):
 *   Begins at adjusted net income £60,000.
 *   1% of benefit lost per £200 of income above threshold.
 *   Fully reclaimed at £80,000.
 */

export const CHILD_BENEFIT_2025_26 = {
  firstChildWeekly: 26.05,
  additionalChildWeekly: 17.25,
  hicbcStart: 60_000,
  hicbcEnd: 80_000,
} as const;

export type ChildBenefitResult = {
  children: number;
  weekly: number;
  monthly: number;
  annual: number;
};

export function childBenefit(children: number): ChildBenefitResult {
  const n = Math.max(0, Math.floor(children));
  if (n === 0) return { children: 0, weekly: 0, monthly: 0, annual: 0 };
  const c = CHILD_BENEFIT_2025_26;
  const weekly = c.firstChildWeekly + Math.max(0, n - 1) * c.additionalChildWeekly;
  const annual = weekly * 52;
  return { children: n, weekly, monthly: annual / 12, annual };
}

export type HICBCResult = {
  annualBenefit: number;
  adjustedNetIncome: number;
  chargePct: number;
  charge: number;
  netRetained: number;
};

export function highIncomeChildBenefitCharge(
  annualBenefit: number,
  adjustedNetIncome: number
): HICBCResult {
  const c = CHILD_BENEFIT_2025_26;
  if (adjustedNetIncome <= c.hicbcStart) {
    return { annualBenefit, adjustedNetIncome, chargePct: 0, charge: 0, netRetained: annualBenefit };
  }
  if (adjustedNetIncome >= c.hicbcEnd) {
    return { annualBenefit, adjustedNetIncome, chargePct: 1, charge: annualBenefit, netRetained: 0 };
  }
  const pct = (adjustedNetIncome - c.hicbcStart) / (c.hicbcEnd - c.hicbcStart);
  const charge = annualBenefit * pct;
  return {
    annualBenefit,
    adjustedNetIncome,
    chargePct: pct,
    charge,
    netRetained: annualBenefit - charge,
  };
}
