/**
 * Investment tax engine, 2026/27 (England, Wales and Northern Ireland bands;
 * Scottish rates for non-savings income only, as the law requires).
 *
 * Income is taxed in a fixed order: non-savings (pay, pensions, profits),
 * then savings interest, then dividends. Each uses up band space, even where an
 * allowance makes part of it tax-free. Capital gains are then taxed at 18% in
 * any basic-rate band left and 24% above it.
 *
 * 2026/27:
 *  - Personal Allowance £12,570, tapered by £1 for every £2 of adjusted net
 *    income over £100,000.
 *  - Basic-rate band £37,700; additional rate on taxable income over £125,140.
 *  - Savings: starting rate band £5,000 at 0%, reduced by non-savings income;
 *    Personal Savings Allowance £1,000 (basic), £500 (higher), £0 (additional).
 *    Rates 20/40/45%, rising to 22/42/47% from April 2027.
 *  - Dividends: £500 allowance; 10.75/35.75/39.35%.
 *  - CGT: £3,000 annual exempt amount; 18% / 24%; Business Asset Disposal
 *    Relief and Investors' Relief 18% from 6 April 2026.
 *  - Relief-at-source pension contributions and Gift Aid extend the basic and
 *    higher rate limits by their gross amount and reduce adjusted net income.
 */

import { personalAllowance, TAX_YEAR_2026_27 } from "../tax/2026-27";
import { scottishIncomeTax } from "../tax/scottish-2026-27";

export const INV_2026 = {
  basicBand: TAX_YEAR_2026_27.incomeTax.basicRateBand,
  additionalThreshold: TAX_YEAR_2026_27.incomeTax.higherRateUpper,
  nonSavings: [0.2, 0.4, 0.45] as const,
  savings2026: [0.2, 0.4, 0.45] as const,
  savings2027: [0.22, 0.42, 0.47] as const,
  startingRateBand: 5_000,
  psa: { basic: 1_000, higher: 500, additional: 0 },
  dividendAllowance: 500,
  dividend: [0.1075, 0.3575, 0.3935] as const,
  cgtExempt: 3_000,
  cgtBasic: 0.18,
  cgtHigher: 0.24,
  badrRate: 0.18,
  badrLifetime: 1_000_000,
  isaAllowance: 20_000,
  cashIsaLimit2027: 12_000,
} as const;

export type Band = "basic" | "higher" | "additional" | "none";

export type IncomeInput = {
  /** Pay, pensions, rental profit and other non-savings income. */
  nonSavings: number;
  savings: number;
  dividends: number;
  /** Gross relief-at-source pension contributions plus gross Gift Aid. */
  bandExtension?: number;
  scotland?: boolean;
  /** Use the savings rates from April 2027. */
  savings2027?: boolean;
};

export type IncomeTaxResult = {
  ani: number;
  pa: number;
  basicLimit: number;
  additionalLimit: number;
  taxableNonSavings: number;
  taxableSavings: number;
  taxableDividends: number;
  totalTaxable: number;
  nonSavingsTax: number;
  savingsTax: number;
  dividendTax: number;
  startingRateUsed: number;
  psa: number;
  psaUsed: number;
  dividendAllowanceUsed: number;
  total: number;
  topBand: Band;
};

/** Tax on the slice [from, to) of taxable income, given band limits and three rates. */
function sliceTax(from: number, to: number, basicLimit: number, additionalLimit: number, rates: readonly [number, number, number]): number {
  if (to <= from) return 0;
  const seg = (a: number, b: number) => Math.max(0, Math.min(to, b) - Math.max(from, a));
  return seg(0, basicLimit) * rates[0] + seg(basicLimit, additionalLimit) * rates[1] + seg(additionalLimit, Infinity) * rates[2];
}

export function incomeTax2026(i: IncomeInput): IncomeTaxResult {
  const ns = Math.max(0, i.nonSavings);
  const sv = Math.max(0, i.savings);
  const dv = Math.max(0, i.dividends);
  const ext = Math.max(0, i.bandExtension ?? 0);
  const ani = Math.max(0, ns + sv + dv - ext);
  const pa = personalAllowance(ani);
  const basicLimit = INV_2026.basicBand + ext;
  const additionalLimit = INV_2026.additionalThreshold + ext;

  // Personal Allowance is set against non-savings, then savings, then dividends.
  const paNs = Math.min(ns, pa);
  const paSv = Math.min(sv, pa - paNs);
  const paDv = Math.min(dv, pa - paNs - paSv);
  const tNs = ns - paNs;
  const tSv = sv - paSv;
  const tDv = dv - paDv;
  const totalTaxable = tNs + tSv + tDv;
  const topBand: Band = totalTaxable <= 0 ? "none" : totalTaxable <= basicLimit ? "basic" : totalTaxable <= additionalLimit ? "higher" : "additional";

  // Non-savings income.
  let nonSavingsTax: number;
  if (i.scotland) {
    // Scottish bands apply to non-savings income. Extending the bands by a
    // relief-at-source contribution is the same as taxing income less the
    // contribution, plus 20% on the contribution itself.
    const extNs = Math.min(ext, ns);
    nonSavingsTax = scottishIncomeTax(Math.max(0, ns - extNs)).total + 0.2 * extNs;
  } else {
    nonSavingsTax = sliceTax(0, tNs, basicLimit, additionalLimit, INV_2026.nonSavings);
  }

  // Savings: starting rate band, then the Personal Savings Allowance, then tax.
  const savingsRates = i.savings2027 ? INV_2026.savings2027 : INV_2026.savings2026;
  const startingRateUsed = Math.min(tSv, Math.max(0, INV_2026.startingRateBand - tNs));
  const psa = topBand === "additional" ? INV_2026.psa.additional : topBand === "higher" ? INV_2026.psa.higher : INV_2026.psa.basic;
  const psaUsed = Math.min(tSv - startingRateUsed, psa);
  const svFree = startingRateUsed + psaUsed;
  const savingsTax = sliceTax(tNs + svFree, tNs + tSv, basicLimit, additionalLimit, savingsRates);

  // Dividends: allowance, then tax.
  const dividendAllowanceUsed = Math.min(tDv, INV_2026.dividendAllowance);
  const dStart = tNs + tSv;
  const dividendTax = sliceTax(dStart + dividendAllowanceUsed, dStart + tDv, basicLimit, additionalLimit, INV_2026.dividend);

  return {
    ani,
    pa,
    basicLimit,
    additionalLimit,
    taxableNonSavings: tNs,
    taxableSavings: tSv,
    taxableDividends: tDv,
    totalTaxable,
    nonSavingsTax,
    savingsTax,
    dividendTax,
    startingRateUsed,
    psa,
    psaUsed,
    dividendAllowanceUsed,
    total: nonSavingsTax + savingsTax + dividendTax,
    topBand,
  };
}

/* ── Capital Gains Tax ───────────────────────────────────────────── */

export type CgtInput = IncomeInput & {
  /** Gains qualifying for Business Asset Disposal Relief or Investors' Relief. */
  reliefGains?: number;
  /** Other gains (shares, funds, property, crypto and so on). */
  gains: number;
  /** Allowable losses made in the same tax year. */
  currentLosses?: number;
  /** Unused losses brought forward from earlier years. */
  broughtForward?: number;
  /** Annual exempt amount already used this year. */
  exemptUsed?: number;
};

export type CgtResult = {
  netGains: number;
  lossesUsedCurrent: number;
  lossesUsedBroughtForward: number;
  lossesCarriedForward: number;
  exempt: number;
  taxableGains: number;
  reliefTaxable: number;
  basicBandLeft: number;
  atBasic: number;
  atHigher: number;
  reliefTax: number;
  tax: number;
  effectiveRate: number;
};

export function capitalGains2026(i: CgtInput): CgtResult {
  const relief = Math.max(0, i.reliefGains ?? 0);
  const other = Math.max(0, i.gains);
  const current = Math.max(0, i.currentLosses ?? 0);
  const bf = Math.max(0, i.broughtForward ?? 0);
  const exemptAvail = Math.max(0, INV_2026.cgtExempt - Math.max(0, i.exemptUsed ?? 0));

  // Current-year losses come off first, against other gains before relief gains.
  const curOther = Math.min(current, other);
  const curRelief = Math.min(current - curOther, relief);
  let otherNet = other - curOther;
  let reliefNet = relief - curRelief;
  const lossesUsedCurrent = curOther + curRelief;
  const netGains = otherNet + reliefNet;

  // Brought-forward losses only reduce gains down to the annual exempt amount.
  const bfUsed = Math.min(bf, Math.max(0, netGains - exemptAvail));
  const bfOther = Math.min(bfUsed, otherNet);
  otherNet -= bfOther;
  reliefNet -= bfUsed - bfOther;

  // The exempt amount goes against the gains taxed at the highest rate first (other gains).
  const exOther = Math.min(exemptAvail, otherNet);
  const exRelief = Math.min(exemptAvail - exOther, reliefNet);
  otherNet -= exOther;
  reliefNet -= exRelief;

  const inc = incomeTax2026(i);
  const basicBandLeft = Math.max(0, inc.basicLimit - inc.totalTaxable);
  // Relief gains use the basic-rate band first.
  const reliefTax = reliefNet * INV_2026.badrRate;
  const bandForOther = Math.max(0, basicBandLeft - reliefNet);
  const atBasic = Math.min(otherNet, bandForOther);
  const atHigher = otherNet - atBasic;
  const tax = reliefTax + atBasic * INV_2026.cgtBasic + atHigher * INV_2026.cgtHigher;
  const taxableGains = otherNet + reliefNet;
  return {
    netGains,
    lossesUsedCurrent,
    lossesUsedBroughtForward: bfUsed,
    lossesCarriedForward: bf - bfUsed,
    exempt: exOther + exRelief,
    taxableGains,
    reliefTaxable: reliefNet,
    basicBandLeft,
    atBasic,
    atHigher,
    reliefTax,
    tax,
    effectiveRate: netGains > 0 ? tax / netGains : 0,
  };
}

/** Extra Income Tax caused by a slice of income (marginal comparison). */
export function extraTax(base: IncomeInput, more: Partial<IncomeInput>): number {
  const a = incomeTax2026(base).total;
  const b = incomeTax2026({
    ...base,
    nonSavings: base.nonSavings + (more.nonSavings ?? 0),
    savings: base.savings + (more.savings ?? 0),
    dividends: base.dividends + (more.dividends ?? 0),
  }).total;
  return b - a;
}
