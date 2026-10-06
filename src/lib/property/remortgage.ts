/**
 * Remortgaging: what a new deal saves against staying on your current rate,
 * after fees and any early repayment charge, over the length of the new deal.
 */

import { monthlyPaymentFor } from "./mortgage-engine";

export type RemortgageInput = {
  balance: number;
  /** Current rate, %, usually the lender's standard variable rate. */
  currentRate: number;
  /** New deal rate, %. */
  newRate: number;
  /** Years left on the mortgage. */
  termYears: number;
  /** Length of the new deal, years. */
  dealYears: number;
  /** Arrangement or product fee. */
  fee: number;
  /** Add the fee to the loan instead of paying it upfront. */
  addFee: boolean;
  /** Legal, valuation and other costs. */
  otherCosts: number;
  /** Early repayment charge on the current deal, % of the balance. */
  ercPct: number;
};

export type RemortgageResult = {
  currentMonthly: number;
  newMonthly: number;
  monthlySaving: number;
  /** Payments made over the deal period on each option. */
  currentPaid: number;
  newPaid: number;
  /** Balance at the end of the deal on each option. */
  currentEnd: number;
  newEnd: number;
  /** Upfront costs paid in cash: fee (if not added), other costs and the ERC. */
  upfront: number;
  erc: number;
  /** Overall gain over the deal: lower payments plus lower end balance, less upfront costs. */
  netSaving: number;
  /** Months for the lower payments to repay the upfront costs. */
  breakEvenMonths: number | null;
};

function run(loan: number, ratePct: number, termYears: number, months: number) {
  const pay = monthlyPaymentFor(loan, ratePct, termYears, "repayment");
  const r = ratePct / 100 / 12;
  let bal = loan;
  let paid = 0;
  for (let m = 0; m < months && bal > 0.005; m++) {
    const p = Math.min(pay, bal * (1 + r));
    bal = bal * (1 + r) - p;
    paid += p;
  }
  return { pay, paid, end: Math.max(0, bal) };
}

export function remortgage(i: RemortgageInput): RemortgageResult {
  const balance = Math.max(0, i.balance);
  const months = Math.max(1, Math.round(i.dealYears * 12));
  const erc = (balance * Math.max(0, i.ercPct)) / 100;
  const newLoan = balance + (i.addFee ? Math.max(0, i.fee) : 0);
  const cur = run(balance, i.currentRate, i.termYears, months);
  const nw = run(newLoan, i.newRate, i.termYears, months);
  const upfront = (i.addFee ? 0 : Math.max(0, i.fee)) + Math.max(0, i.otherCosts) + erc;
  const netSaving = cur.paid - nw.paid + (cur.end - nw.end) - upfront;
  const monthlySaving = cur.pay - nw.pay;
  const breakEvenMonths = monthlySaving > 0 ? Math.ceil(upfront / monthlySaving) : null;
  return {
    currentMonthly: cur.pay,
    newMonthly: nw.pay,
    monthlySaving,
    currentPaid: cur.paid,
    newPaid: nw.paid,
    currentEnd: cur.end,
    newEnd: nw.end,
    upfront,
    erc,
    netSaving,
    breakEvenMonths,
  };
}
