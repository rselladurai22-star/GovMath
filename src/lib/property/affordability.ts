/**
 * Mortgage affordability, modelled the way most UK lenders work in practice:
 * an income multiple on assessed income, reduced by regular commitments, then
 * checked against what the monthly payment would be at a higher "stress" rate.
 *
 * Lenders' own models differ. These are transparent rules of thumb, not a
 * lending decision. Pure functions.
 */

import { monthlyPaymentFor } from "./mortgage-engine";
import { computeTakeHome } from "../tax/take-home-engine";

export type AffordabilityInput = {
  income1: number;
  income2: number;
  /** Yearly bonus, overtime or commission on top of basic pay. */
  variable: number;
  /** Share of variable pay a lender counts (0–1). Often 0.5. */
  variableShare: number;
  /** Monthly loan, car finance, credit card and childcare payments. */
  commitments: number;
  multiple: number;
  deposit: number;
  ratePct: number;
  termYears: number;
  /** Points added to the rate for the stress test. */
  stressPts: number;
};

export type AffordabilityResult = {
  assessedIncome: number;
  /** Yearly commitments taken off assessed income before the multiple. */
  commitmentsYearly: number;
  maxLoan: number;
  maxPrice: number;
  ltv: number;
  monthlyPayment: number;
  stressedPayment: number;
  /** Combined take-home pay a month, before the mortgage. */
  takeHomeMonthly: number;
  /** Mortgage payment as a share of take-home pay. */
  paymentShare: number;
  stressedShare: number;
  /** How much less a lender might offer for each £100 a month of commitments. */
  costPer100: number;
};

const clampNum = (n: number, min = 0) => Math.max(min, Number.isFinite(n) ? n : 0);

export function affordability(raw: AffordabilityInput): AffordabilityResult {
  const income1 = clampNum(raw.income1);
  const income2 = clampNum(raw.income2);
  const variable = clampNum(raw.variable);
  const share = Math.min(1, clampNum(raw.variableShare));
  const multiple = clampNum(raw.multiple);
  const deposit = clampNum(raw.deposit);
  const commitmentsYearly = clampNum(raw.commitments) * 12;

  const assessedIncome = income1 + income2 + variable * share;
  const maxLoan = Math.max(0, (assessedIncome - commitmentsYearly) * multiple);
  const maxPrice = maxLoan + deposit;
  const term = Math.max(1, raw.termYears || 25);
  const monthlyPayment = monthlyPaymentFor(maxLoan, clampNum(raw.ratePct), term, "repayment");
  const stressedPayment = monthlyPaymentFor(maxLoan, clampNum(raw.ratePct) + clampNum(raw.stressPts), term, "repayment");

  // Variable pay is split across the two incomes in proportion to basic pay.
  const basic = income1 + income2;
  const v1 = basic > 0 ? variable * (income1 / basic) : variable;
  const takeHomeYear =
    (income1 + v1 > 0 ? computeTakeHome({ gross: income1, bonus: v1, pensionPct: 0, plan: "none" }).takeHome : 0) +
    (income2 > 0 ? computeTakeHome({ gross: income2, bonus: variable - v1, pensionPct: 0, plan: "none" }).takeHome : 0);
  const takeHomeMonthly = takeHomeYear / 12;

  return {
    assessedIncome,
    commitmentsYearly,
    maxLoan,
    maxPrice,
    ltv: maxPrice > 0 ? maxLoan / maxPrice : 0,
    monthlyPayment,
    stressedPayment,
    takeHomeMonthly,
    paymentShare: takeHomeMonthly > 0 ? monthlyPayment / takeHomeMonthly : 0,
    stressedShare: takeHomeMonthly > 0 ? stressedPayment / takeHomeMonthly : 0,
    costPer100: 1200 * multiple,
  };
}

/** Loan, LTV and income multiple needed to buy at a given price. */
export function targetCheck(price: number, deposit: number, assessedIncome: number) {
  const loan = Math.max(0, price - deposit);
  return {
    loan,
    ltv: price > 0 ? loan / price : 0,
    multipleNeeded: assessedIncome > 0 ? loan / assessedIncome : Infinity,
  };
}

/** Deposit needed to reach each common LTV band at a given price. */
export function depositForLtv(price: number, ltv: number): number {
  return Math.max(0, price * (1 - ltv));
}
