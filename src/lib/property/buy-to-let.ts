/**
 * Buy-to-let: yields, cash flow, Income Tax under the Section 24 rules and
 * return on the cash you put in. Individual landlord, 2026/27 tax year.
 * Pure functions.
 */

import { incomeTax } from "../tax/2026-27";
import { scottishIncomeTax } from "../tax/scottish-2026-27";
import { stampDuty } from "../tax/sdlt-2025";
import { lbtt, ltt } from "../tax/regional-stamp-duty";

export type Nation = "england" | "scotland" | "wales";

export type BuyToLetInput = {
  price: number;
  /** Monthly rent. */
  rent: number;
  /** Deposit as a % of price. 100 means a cash purchase. */
  depositPct: number;
  ratePct: number;
  interestOnly: boolean;
  termYears: number;
  /** Letting agent fee, % of rent collected. */
  agentPct: number;
  /** Weeks a year the property is empty. */
  voidWeeks: number;
  /** Insurance, maintenance, safety certificates, service charge: a year. */
  costs: number;
  /** Your other taxable income a year, e.g. salary. */
  otherIncome: number;
  /** Where the property is: sets the purchase tax. */
  nation: Nation;
  /** Where you pay Income Tax. */
  scottishTaxpayer: boolean;
  /** Legal fees, survey, mortgage fees on purchase. */
  buyingCosts: number;
};

export type BuyToLetResult = {
  rentYear: number;
  rentCollected: number;
  voidCost: number;
  agentFee: number;
  runningCosts: number;
  /** Rent collected minus running costs, before mortgage interest. */
  netOperating: number;
  grossYield: number;
  netYield: number;
  loan: number;
  interest: number;
  capitalRepaid: number;
  /** Cash left after costs and the whole mortgage payment, before tax. */
  cashFlow: number;
  /** Taxable property profit (mortgage interest is not deducted). */
  taxableProfit: number;
  taxBeforeCredit: number;
  /** 20% credit for mortgage interest. */
  financeCredit: number;
  tax: number;
  /** What you keep after tax, before capital repaid. */
  profitAfterTax: number;
  cashFlowAfterTax: number;
  purchaseTax: number;
  cashIn: number;
  /** Profit after tax as a % of cash put in. */
  cashReturn: number;
  /** Lender rental cover: rent ÷ interest at the stress rate. */
  icr: number;
  /** Largest loan meeting a rental cover test. */
  maxLoanByIcr: number;
};

const ICR_STRESS_RATE = 5.5;

export function purchaseTax(price: number, nation: Nation): number {
  if (nation === "scotland") return lbtt(price, "additional").total;
  if (nation === "wales") return ltt(price, true).total;
  return stampDuty(price, "additional").total;
}

function taxOn(income: number, scottish: boolean): number {
  return scottish ? scottishIncomeTax(income).total : incomeTax(income).total;
}

export function buyToLet(raw: BuyToLetInput, icrTarget = 1.25): BuyToLetResult {
  const price = Math.max(0, raw.price || 0);
  const rentYear = Math.max(0, raw.rent || 0) * 12;
  const voidShare = Math.min(52, Math.max(0, raw.voidWeeks || 0)) / 52;
  const voidCost = rentYear * voidShare;
  const rentCollected = rentYear - voidCost;
  const agentFee = rentCollected * (Math.max(0, raw.agentPct || 0) / 100);
  const runningCosts = agentFee + Math.max(0, raw.costs || 0);
  const netOperating = rentCollected - runningCosts;

  const depositPct = Math.min(100, Math.max(0, raw.depositPct));
  const loan = price * (1 - depositPct / 100);
  const r = Math.max(0, raw.ratePct || 0) / 100;
  // Interest in year one. For repayment loans, simulate twelve months.
  let interest = loan * r;
  let capitalRepaid = 0;
  if (!raw.interestOnly && loan > 0) {
    const m = r / 12;
    const n = Math.max(1, Math.round((raw.termYears || 25) * 12));
    const pay = m === 0 ? loan / n : (loan * m * Math.pow(1 + m, n)) / (Math.pow(1 + m, n) - 1);
    let bal = loan;
    interest = 0;
    for (let i = 0; i < 12; i++) {
      const int = bal * m;
      interest += int;
      capitalRepaid += pay - int;
      bal -= pay - int;
    }
  }
  const cashFlow = netOperating - interest - capitalRepaid;

  const taxableProfit = Math.max(0, netOperating);
  const other = Math.max(0, raw.otherIncome || 0);
  const taxBeforeCredit = taxOn(other + taxableProfit, raw.scottishTaxpayer) - taxOn(other, raw.scottishTaxpayer);
  // The 20% credit is limited to the lower of finance costs and property profit.
  const financeCredit = Math.min(taxBeforeCredit, 0.2 * Math.min(interest, taxableProfit));
  const tax = Math.max(0, taxBeforeCredit - financeCredit);
  const profitAfterTax = netOperating - interest - tax;
  const cashFlowAfterTax = cashFlow - tax;

  const pTax = purchaseTax(price, raw.nation);
  const cashIn = price - loan + pTax + Math.max(0, raw.buyingCosts || 0);

  const stressInterest = loan * (ICR_STRESS_RATE / 100);
  return {
    rentYear,
    rentCollected,
    voidCost,
    agentFee,
    runningCosts,
    netOperating,
    grossYield: price > 0 ? rentYear / price : 0,
    netYield: price > 0 ? netOperating / price : 0,
    loan,
    interest,
    capitalRepaid,
    cashFlow,
    taxableProfit,
    taxBeforeCredit,
    financeCredit,
    tax,
    profitAfterTax,
    cashFlowAfterTax,
    purchaseTax: pTax,
    cashIn,
    cashReturn: cashIn > 0 ? profitAfterTax / cashIn : 0,
    icr: stressInterest > 0 ? rentYear / stressInterest : Infinity,
    maxLoanByIcr: rentYear / icrTarget / (ICR_STRESS_RATE / 100),
  };
}

export { ICR_STRESS_RATE };
