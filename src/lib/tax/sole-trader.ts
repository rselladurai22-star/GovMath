/**
 * Sole Trader tax — Income Tax (rUK) + Class 2 + Class 4 NI on trading profit.
 *
 * Class 2 NI changes from April 2024: it is no longer compulsory.
 * Self-employed with profits ≥ £7,105 (Small Profits Threshold) get
 * a Class 2 NI credit toward State Pension automatically, without paying.
 * Voluntary Class 2 is £3.65/week (£189.80/year, 2026/27) for those below SPT
 * who want the credit. We omit voluntary contributions from the headline.
 */

import { incomeTax, selfEmployedNI } from "./2026-27";

export const SELF_EMPLOYED_2026_27 = {
  smallProfitsThreshold: 7105,
  voluntaryClass2WeeklyRate: 3.65,
} as const;

export type SoleTraderResult = {
  profit: number;
  incomeTax: number;
  class4NI: number;
  totalTax: number;
  netProfit: number;
  effectiveRate: number;
  /** True when profits are at/above the SPT (£7,105) — gets free NI credit. */
  getsAutomaticNICredit: boolean;
};

export function soleTraderTax(profit: number): SoleTraderResult {
  const safe = Math.max(0, profit || 0);
  const it = incomeTax(safe).total;
  const ni = selfEmployedNI(safe).total;
  const total = it + ni;
  return {
    profit: safe,
    incomeTax: it,
    class4NI: ni,
    totalTax: total,
    netProfit: safe - total,
    effectiveRate: safe > 0 ? total / safe : 0,
    getsAutomaticNICredit: safe >= SELF_EMPLOYED_2026_27.smallProfitsThreshold,
  };
}
