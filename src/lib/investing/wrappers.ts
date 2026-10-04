/**
 * Tax wrappers: pension tax relief and ISA versus a general investment account.
 */

import { nationalInsurance } from "../tax/2026-27";
import { capitalGains2026, extraTax, incomeTax2026, INV_2026 } from "./tax";

/* ── Pension tax relief, 2026/27 ─────────────────────────────────── */

export const PENSION_2026 = {
  annualAllowance: 60_000,
  minimumTapered: 10_000,
  adjustedIncomeLimit: 260_000,
  thresholdIncomeLimit: 200_000,
  mpaa: 10_000,
  lumpSumAllowance: 268_275,
  nonEarnerMax: 3_600,
  employerNiRate: 0.15,
  employerNiThreshold: 5_000,
} as const;

export type ReliefMethod = "ras" | "net-pay" | "sacrifice";

export type PensionReliefInput = {
  salary: number;
  /** Gross contribution a year (what goes into the pension from you, including tax relief). */
  contribution: number;
  method: ReliefMethod;
  scotland?: boolean;
  /** Share (0 to 1) of the employer's NI saving added to the pension under salary sacrifice. */
  employerNiShare?: number;
  /** Employer's own contribution a year, for the annual allowance test. */
  employerContribution?: number;
};

export type PensionReliefResult = {
  contribution: number;
  relievable: number;
  taxBefore: number;
  taxAfter: number;
  incomeTaxRelief: number;
  /** Relief added by the provider at source (relief at source only). */
  basicAtSource: number;
  /** Extra relief claimed through Self Assessment (relief at source, higher earners). */
  claimBack: number;
  employeeNiSaving: number;
  employerNiSaving: number;
  employerNiToPension: number;
  /** What it really costs you, after all relief. */
  netCost: number;
  /** Relief as a share of the contribution. */
  reliefRate: number;
  /** How much leaves your pay (relief at source: 80%; others: after tax effects). */
  fromPay: number;
  totalIntoPension: number;
  paBefore: number;
  paAfter: number;
};

const employerNi = (pay: number) => Math.max(0, pay - PENSION_2026.employerNiThreshold) * PENSION_2026.employerNiRate;

export function pensionRelief(i: PensionReliefInput): PensionReliefResult {
  const salary = Math.max(0, i.salary);
  const g = Math.max(0, i.contribution);
  const scot = !!i.scotland;
  const before = incomeTax2026({ nonSavings: salary, savings: 0, dividends: 0, scotland: scot });
  let taxAfter = before.total;
  let basicAtSource = 0;
  let claimBack = 0;
  let employeeNiSaving = 0;
  let employerNiSaving = 0;
  let relievable = g;
  let paAfter = before.pa;

  if (i.method === "ras") {
    // Relief is limited to the higher of earnings and £3,600 gross.
    relievable = Math.min(g, Math.max(salary, PENSION_2026.nonEarnerMax));
    const after = incomeTax2026({ nonSavings: salary, savings: 0, dividends: 0, scotland: scot, bandExtension: relievable });
    basicAtSource = relievable * 0.2;
    claimBack = Math.max(0, before.total - after.total);
    taxAfter = after.total;
    paAfter = after.pa;
  } else {
    // Net pay and salary sacrifice reduce taxable pay. Net pay gives no relief to non-taxpayers.
    relievable = Math.min(g, salary);
    const after = incomeTax2026({ nonSavings: salary - relievable, savings: 0, dividends: 0, scotland: scot });
    taxAfter = after.total;
    paAfter = after.pa;
    if (i.method === "sacrifice") {
      employeeNiSaving = nationalInsurance(salary).total - nationalInsurance(salary - relievable).total;
      employerNiSaving = employerNi(salary) - employerNi(salary - relievable);
    }
  }

  const incomeTaxRelief = i.method === "ras" ? basicAtSource + claimBack : before.total - taxAfter;
  const employerNiToPension = employerNiSaving * Math.min(1, Math.max(0, i.employerNiShare ?? 0));
  const netCost = Math.max(0, g - incomeTaxRelief - employeeNiSaving);
  const fromPay = i.method === "ras" ? g - basicAtSource : g - (before.total - taxAfter) - employeeNiSaving;
  return {
    contribution: g,
    relievable,
    taxBefore: before.total,
    taxAfter,
    incomeTaxRelief,
    basicAtSource,
    claimBack,
    employeeNiSaving,
    employerNiSaving,
    employerNiToPension,
    netCost,
    reliefRate: g > 0 ? 1 - netCost / g : 0,
    fromPay,
    totalIntoPension: g + employerNiToPension,
    paBefore: before.pa,
    paAfter,
  };
}

/** Tapered annual allowance from threshold income and adjusted income. */
export function annualAllowance(thresholdIncome: number, adjustedIncome: number): number {
  const p = PENSION_2026;
  if (thresholdIncome <= p.thresholdIncomeLimit || adjustedIncome <= p.adjustedIncomeLimit) return p.annualAllowance;
  return Math.max(p.minimumTapered, p.annualAllowance - (adjustedIncome - p.adjustedIncomeLimit) / 2);
}

/* ── ISA versus general investment account ───────────────────────── */

export type IsaInput = {
  lump: number;
  monthly: number;
  years: number;
  /** Capital growth a year, as a decimal (0.04 = 4%). */
  growth: number;
  dividendYield: number;
  interestYield: number;
  /** Share of unrealised gains sold each year (fund switches, rebalancing). */
  turnover: number;
  /** Other income a year (non-savings), which sets your tax bands. */
  otherIncome: number;
  /** Other savings interest outside this investment. */
  otherSavings?: number;
  scotland?: boolean;
  sellAtEnd: boolean;
  /** Savings rates from April 2027. */
  savings2027?: boolean;
};

export type IsaYear = { year: number; isa: number; gia: number; giaTax: number; giaAfterSale: number };

export type IsaResult = {
  years: IsaYear[];
  contributed: number;
  isaFinal: number;
  giaFinal: number;
  giaTaxPaid: number;
  giaExitTax: number;
  advantage: number;
  overAllowance: boolean;
};

/**
 * Two scenarios with the same money: everything in a stocks and shares ISA
 * (up to £20,000 a year, any excess in a GIA), or everything in a GIA.
 */
export function isaVsGia(i: IsaInput): IsaResult {
  const yearsN = Math.max(1, Math.min(60, Math.round(i.years)));
  const total = Math.max(0, i.growth) + Math.max(0, i.dividendYield) + Math.max(0, i.interestYield);
  const base = { nonSavings: Math.max(0, i.otherIncome), savings: Math.max(0, i.otherSavings ?? 0), dividends: 0, scotland: i.scotland, savings2027: i.savings2027 };

  type Pot = { value: number; cost: number };
  const runGia = (pot: Pot, add: number) => {
    pot.value += add;
    pot.cost += add;
    const div = pot.value * Math.max(0, i.dividendYield);
    const int = pot.value * Math.max(0, i.interestYield);
    const incomeTax = extraTax(base, { dividends: div, savings: int });
    const growth = pot.value * Math.max(0, i.growth);
    pot.value += growth;
    // Income is reinvested after tax and adds to the base cost.
    const netIncome = div + int - incomeTax;
    pot.value += netIncome;
    pot.cost += netIncome;
    const unrealised = Math.max(0, pot.value - pot.cost);
    const realised = unrealised * Math.min(1, Math.max(0, i.turnover));
    const cgt = realised > 0 ? capitalGains2026({ ...base, savings: base.savings + int, dividends: div, gains: realised }).tax : 0;
    pot.value -= cgt;
    pot.cost += realised - cgt;
    return incomeTax + cgt;
  };
  const exitTax = (pot: Pot) => capitalGains2026({ ...base, gains: Math.max(0, pot.value - pot.cost) }).tax;

  const giaOnly: Pot = { value: 0, cost: 0 };
  const isaSide: Pot = { value: 0, cost: 0 };
  let isa = 0;
  let giaTaxPaid = 0;
  const years: IsaYear[] = [{ year: 0, isa: 0, gia: 0, giaTax: 0, giaAfterSale: 0 }];
  let contributed = 0;
  let overAllowance = false;
  for (let y = 1; y <= yearsN; y++) {
    const add = (y === 1 ? Math.max(0, i.lump) : 0) + Math.max(0, i.monthly) * 12;
    contributed += add;
    const toIsa = Math.min(add, INV_2026.isaAllowance);
    if (add > INV_2026.isaAllowance) overAllowance = true;
    // ISA scenario: up to the allowance in the ISA, the rest in a GIA.
    isa = (isa + toIsa) * (1 + total);
    runGia(isaSide, add - toIsa);
    // GIA-only scenario.
    giaTaxPaid += runGia(giaOnly, add);
    years.push({ year: y, isa: isa + isaSide.value, gia: giaOnly.value, giaTax: giaTaxPaid, giaAfterSale: giaOnly.value - exitTax(giaOnly) });
  }
  const giaExitTax = i.sellAtEnd ? exitTax(giaOnly) : 0;
  const isaExit = i.sellAtEnd ? exitTax(isaSide) : 0;
  const isaFinal = isa + isaSide.value - isaExit;
  const giaFinal = giaOnly.value - giaExitTax;
  return { years, contributed, isaFinal, giaFinal, giaTaxPaid, giaExitTax, advantage: isaFinal - giaFinal, overAllowance };
}
