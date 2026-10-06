/**
 * Savings, ISAs and retirement income, 2026/27: fixed versus easy-access
 * savings after tax, the Personal Savings Allowance, Junior ISAs, pension
 * drawdown and annuities.
 *
 * Tax uses incomeTax2026 (src/lib/investing/tax.ts) at 2026/27 rates and
 * thresholds for every year, which are frozen until April 2031 except the
 * savings rates, which rise by 2 points from April 2027 when chosen.
 */

import { incomeTax2026 } from "./tax";
import { PENSION_2026 } from "./wrappers";

/* ── Fixed versus easy access ──────────────────────────────────── */

export type SavingsCompareInput = {
  amount: number;
  /** Easy-access AER, as a decimal. */
  easyRate: number;
  /** Fixed-rate AER, as a decimal. */
  fixedRate: number;
  years: number;
  /** Fixed account pays all interest at the end (taxed in that year) rather than each year. */
  atMaturity: boolean;
  /** Other taxable income a year (pay, pensions). */
  otherIncome: number;
  scotland: boolean;
  /** Use the higher savings tax rates from April 2027. */
  rates2027: boolean;
  /** Cash ISA: no tax on either account. */
  isa: boolean;
};

export type SavingsYear = { year: number; easy: number; fixed: number; easyTax: number; fixedTax: number };

export type SavingsCompareResult = {
  path: SavingsYear[];
  easyInterest: number;
  fixedInterest: number;
  easyTax: number;
  fixedTax: number;
  easyAfterTax: number;
  fixedAfterTax: number;
  /** Fixed minus easy, after tax. */
  advantage: number;
};

function taxOnInterest(otherIncome: number, interest: number, scotland: boolean, rates2027: boolean): number {
  if (interest <= 0) return 0;
  const base = incomeTax2026({ nonSavings: otherIncome, savings: 0, dividends: 0, scotland, savings2027: rates2027 }).total;
  return incomeTax2026({ nonSavings: otherIncome, savings: interest, dividends: 0, scotland, savings2027: rates2027 }).total - base;
}

export function compareSavings(i: SavingsCompareInput): SavingsCompareResult {
  const n = Math.max(1, Math.min(10, Math.round(i.years)));
  const amount = Math.max(0, i.amount);
  let easy = amount;
  let fixed = amount;
  let easyTax = 0;
  let fixedTax = 0;
  const path: SavingsYear[] = [];
  for (let y = 1; y <= n; y++) {
    const ei = easy * i.easyRate;
    easy += ei;
    const fi = fixed * i.fixedRate;
    fixed += fi;
    const et = i.isa ? 0 : taxOnInterest(i.otherIncome, ei, i.scotland, i.rates2027);
    const fixedPaid = i.atMaturity ? (y === n ? fixed - amount : 0) : fi;
    const ft = i.isa ? 0 : taxOnInterest(i.otherIncome, fixedPaid, i.scotland, i.rates2027);
    easyTax += et;
    fixedTax += ft;
    path.push({ year: y, easy, fixed, easyTax: et, fixedTax: ft });
  }
  const easyInterest = easy - amount;
  const fixedInterest = fixed - amount;
  const easyAfterTax = easy - easyTax;
  const fixedAfterTax = fixed - fixedTax;
  return {
    path,
    easyInterest,
    fixedInterest,
    easyTax,
    fixedTax,
    easyAfterTax,
    fixedAfterTax,
    advantage: fixedAfterTax - easyAfterTax,
  };
}

/* ── Personal Savings Allowance ────────────────────────────────── */

export type PsaInput = { nonSavings: number; savings: number; dividends: number; scotland: boolean; rates2027: boolean };

export type PsaResult = {
  band: "basic" | "higher" | "additional" | "none";
  psa: number;
  startingRate: number;
  psaUsed: number;
  taxFree: number;
  taxable: number;
  tax: number;
  /** Tax on the same savings with the April 2027 rates. */
  tax2027: number;
  /** Interest you could earn before paying any tax on savings. */
  headroom: number;
};

export function psaTax(i: PsaInput): PsaResult {
  const base = { nonSavings: i.nonSavings, savings: 0, dividends: i.dividends, scotland: i.scotland };
  const without = incomeTax2026(base).total;
  const r = incomeTax2026({ ...base, savings: i.savings, savings2027: i.rates2027 });
  const r27 = incomeTax2026({ ...base, savings: i.savings, savings2027: true });
  const paFree = Math.max(0, Math.min(i.savings, r.pa - Math.min(i.nonSavings, r.pa)));
  const taxFree = paFree + r.startingRateUsed + r.psaUsed;
  // Headroom: largest interest with no tax on it, found by stepping up.
  let lo = 0;
  let hi = 200_000;
  for (let k = 0; k < 40; k++) {
    const mid = (lo + hi) / 2;
    const t = incomeTax2026({ ...base, savings: mid }).total - without;
    if (t <= 0.004) lo = mid;
    else hi = mid;
  }
  return {
    band: r.topBand,
    psa: r.psa,
    startingRate: r.startingRateUsed,
    psaUsed: r.psaUsed,
    taxFree,
    taxable: Math.max(0, i.savings - taxFree),
    tax: r.total - without,
    tax2027: r27.total - without,
    headroom: Math.floor(lo),
  };
}

/* ── Junior ISA ────────────────────────────────────────────────── */

export const JISA_2026 = { allowance: 9_000, settlementLimit: 100 } as const;

export type JisaInput = { lump: number; monthly: number; childAge: number; growth: number; fees: number };

export type JisaResult = {
  years: number;
  contributed: number;
  value: number;
  growth: number;
  firstYear: number;
  overAllowance: boolean;
  path: { age: number; value: number; contributed: number }[];
};

export function juniorIsa(i: JisaInput): JisaResult {
  const years = Math.max(0, 18 - Math.floor(i.childAge));
  const r = Math.max(-0.99, i.growth - i.fees);
  const monthlyRate = Math.pow(1 + r, 1 / 12) - 1;
  let value = Math.max(0, i.lump);
  let contributed = value;
  const path = [{ age: Math.floor(i.childAge), value, contributed }];
  for (let y = 1; y <= years; y++) {
    for (let m = 0; m < 12; m++) {
      value = value * (1 + monthlyRate) + Math.max(0, i.monthly);
      contributed += Math.max(0, i.monthly);
    }
    path.push({ age: Math.floor(i.childAge) + y, value, contributed });
  }
  const firstYear = Math.max(0, i.lump) + Math.max(0, i.monthly) * 12;
  return { years, contributed, value, growth: value - contributed, firstYear, overAllowance: firstYear > JISA_2026.allowance, path };
}

/* ── Pension drawdown ──────────────────────────────────────────── */

export type TaxFreeMode = "upfront" | "phased" | "none";

export type DrawdownInput = {
  pot: number;
  age: number;
  taxFree: TaxFreeMode;
  /** Gross withdrawal a year in today's money, rising with inflation. */
  withdrawal: number;
  /** Investment growth after charges, as a decimal. */
  growth: number;
  inflation: number;
  /** State Pension a year in today's money, from State Pension age. */
  statePension: number;
  spAge: number;
  /** Other taxable income a year (part-time work, other pensions). */
  otherIncome: number;
  scotland: boolean;
};

export type DrawdownYear = { age: number; withdrawal: number; taxable: number; statePension: number; tax: number; net: number; pot: number };

export type DrawdownResult = {
  lumpSum: number;
  path: DrawdownYear[];
  /** Age at which the pot runs out, or null if it lasts to 100. */
  runsOutAt: number | null;
  totalWithdrawn: number;
  totalTax: number;
  firstYear: DrawdownYear | null;
};

export function drawdown(i: DrawdownInput): DrawdownResult {
  let pot = Math.max(0, i.pot);
  const lumpSum = i.taxFree === "upfront" ? Math.min(pot * 0.25, PENSION_2026.lumpSumAllowance) : 0;
  pot -= lumpSum;
  let phasedLeft = i.taxFree === "phased" ? PENSION_2026.lumpSumAllowance : 0;
  const path: DrawdownYear[] = [];
  let runsOutAt: number | null = null;
  let totalWithdrawn = 0;
  let totalTax = 0;
  for (let age = Math.floor(i.age), y = 0; age < 100; age++, y++) {
    if (pot <= 0.5) {
      runsOutAt = age;
      break;
    }
    const lift = Math.pow(1 + i.inflation, y);
    const want = Math.max(0, i.withdrawal) * lift;
    const withdrawal = Math.min(pot, want);
    pot -= withdrawal;
    let taxFreePart = 0;
    if (i.taxFree === "phased") {
      taxFreePart = Math.min(withdrawal * 0.25, phasedLeft);
      phasedLeft -= taxFreePart;
    }
    const taxable = withdrawal - taxFreePart;
    const sp = age >= i.spAge ? Math.max(0, i.statePension) * lift : 0;
    const other = Math.max(0, i.otherIncome) * lift;
    const tax = incomeTax2026({ nonSavings: sp + other + taxable, savings: 0, dividends: 0, scotland: i.scotland }).total;
    const net = withdrawal + sp + other - tax;
    pot *= 1 + i.growth;
    totalWithdrawn += withdrawal;
    totalTax += tax;
    path.push({ age, withdrawal, taxable, statePension: sp, tax, net, pot });
    if (withdrawal < want - 0.5) {
      runsOutAt = age;
      break;
    }
  }
  return { lumpSum, path, runsOutAt, totalWithdrawn, totalTax, firstYear: path[0] ?? null };
}

/* ── Annuity ───────────────────────────────────────────────────── */

export type AnnuityInput = {
  pot: number;
  /** Take 25% tax-free first (up to the Lump Sum Allowance). */
  takeTaxFree: boolean;
  /** Annuity rate: first year's income as a share of the price, as a decimal. */
  rate: number;
  /** Yearly increase in the annuity income, as a decimal (0 for level). */
  escalation: number;
  age: number;
  statePension: number;
  otherIncome: number;
  scotland: boolean;
};

export type AnnuityResult = {
  lumpSum: number;
  price: number;
  gross: number;
  tax: number;
  net: number;
  monthlyNet: number;
  /** Years of income to get the price back (cash, no growth). */
  paybackYears: number;
  paybackAge: number;
};

export function annuity(i: AnnuityInput): AnnuityResult {
  const pot = Math.max(0, i.pot);
  const lumpSum = i.takeTaxFree ? Math.min(pot * 0.25, PENSION_2026.lumpSumAllowance) : 0;
  const price = pot - lumpSum;
  const gross = price * Math.max(0, i.rate);
  const base = Math.max(0, i.statePension) + Math.max(0, i.otherIncome);
  const tax = incomeTax2026({ nonSavings: base + gross, savings: 0, dividends: 0, scotland: i.scotland }).total - incomeTax2026({ nonSavings: base, savings: 0, dividends: 0, scotland: i.scotland }).total;
  let paid = 0;
  let years = 0;
  while (paid < price && years < 60 && gross > 0) {
    paid += gross * Math.pow(1 + i.escalation, years);
    years++;
  }
  const paybackYears = gross > 0 ? years - (paid - price) / (gross * Math.pow(1 + i.escalation, years - 1)) : Infinity;
  return { lumpSum, price, gross, tax, net: gross - tax, monthlyNet: (gross - tax) / 12, paybackYears, paybackAge: i.age + paybackYears };
}

