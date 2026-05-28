/**
 * Universal Credit earnings taper — 2025/26.
 * Taper rate 55%: for every £1 of net earnings above your work allowance,
 * you lose £0.55 of UC.
 */

import { UC_RATES_2025_26 } from "./universal-credit";

export type UCTaperInput = {
  monthlyMaxUC: number;
  netMonthlyEarnings: number;
  receivingHousingElement: boolean;
};

export type UCTaperResult = {
  workAllowance: number;
  earningsAboveAllowance: number;
  taperReduction: number;
  finalUC: number;
};

export function ucTaper(input: UCTaperInput): UCTaperResult {
  const wa = input.receivingHousingElement
    ? UC_RATES_2025_26.workAllowance.withHousing
    : UC_RATES_2025_26.workAllowance.withoutHousing;

  const above = Math.max(0, input.netMonthlyEarnings - wa);
  const reduction = above * UC_RATES_2025_26.taperRate;
  const finalUC = Math.max(0, input.monthlyMaxUC - reduction);

  return {
    workAllowance: wa,
    earningsAboveAllowance: above,
    taperReduction: reduction,
    finalUC,
  };
}
