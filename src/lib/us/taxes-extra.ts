/**
 * Extra pieces for the US tax calculators, built on tax-2026.ts:
 * the qualified business income (QBI) deduction, a return with it applied,
 * estimated tax payments for the self-employed, the capital loss limit and
 * the home sale exclusion.
 *
 * Sources: IRS Rev. Proc. 2025-32 §4.26 (2026 QBI thresholds and phase-in
 * ranges) and §3.12 (the $400 minimum deduction from 2026); IRS Publication
 * 505 and Form 1040-ES (estimated tax safe harbors and 2026 due dates);
 * IRS Topic 409 (capital loss limit); IRS Topic 701 (home sale exclusion).
 */

import { childTaxCredit, federalReturn, longTermGainsTax, ordinaryTax, type FilingStatus, type ReturnInput, type ReturnResult } from "./tax-2026";

export const QBI_2026 = {
  rate: 0.2,
  threshold: { single: 201_750, hoh: 201_750, mfs: 201_775, mfj: 403_500 } as Record<FilingStatus, number>,
  /** Width of the phase-in range above the threshold. */
  range: { single: 75_000, hoh: 75_000, mfs: 75_000, mfj: 150_000 } as Record<FilingStatus, number>,
  /** From 2026: at least $400 for anyone with $1,000 or more of QBI from a business they actively run. */
  minimum: 400,
  minimumQbi: 1_000,
};

/**
 * The QBI deduction for a sole proprietor with no employees and no major
 * business property. Below the threshold it is 20% of QBI; across the
 * phase-in range it falls in a straight line to nothing (with no W-2 wages
 * paid, the wage limit is zero). It can't be more than 20% of taxable income
 * before the deduction, less net capital gain.
 */
export function qbiDeduction(qbi: number, taxableBeforeQbi: number, netCapitalGain: number, status: FilingStatus): number {
  const q = Math.max(0, qbi);
  if (q <= 0) return 0;
  const tentative = q * QBI_2026.rate;
  const excess = Math.max(0, taxableBeforeQbi - QBI_2026.threshold[status]);
  let d = tentative * Math.max(0, 1 - excess / QBI_2026.range[status]);
  if (q >= QBI_2026.minimumQbi) d = Math.max(d, QBI_2026.minimum);
  const cap = Math.max(0, taxableBeforeQbi - Math.max(0, netCapitalGain)) * QBI_2026.rate;
  return Math.max(0, Math.min(d, cap, Math.max(0, taxableBeforeQbi)));
}

export type QbiReturn = ReturnResult & { qbiDeduction: number; taxableBeforeQbi: number };

/**
 * federalReturn with the QBI deduction applied to self-employment profit.
 * `qbiReductions` is anything that lowers QBI besides half the SE tax, such as
 * self-employed retirement contributions and health insurance.
 */
export function returnWithQbi(i: ReturnInput, useQbi = true, qbiReductions = 0): QbiReturn {
  const r = federalReturn(i);
  const qbi = Math.max(0, Math.max(0, i.selfEmployment) - r.se.deduction - Math.max(0, qbiReductions));
  const gainsBefore = Math.min(Math.max(0, i.longTermGains), r.taxable);
  const d = useQbi ? qbiDeduction(qbi, r.taxable, gainsBefore, i.status) : 0;
  if (d <= 0) return { ...r, qbiDeduction: 0, taxableBeforeQbi: r.taxable };
  const s = i.status;
  const taxable = Math.max(0, r.taxable - d);
  const gainsInTaxable = Math.min(Math.max(0, i.longTermGains), taxable);
  const ordinaryTaxable = taxable - gainsInTaxable;
  const ordinary = ordinaryTax(ordinaryTaxable, s);
  const gains = longTermGainsTax(ordinaryTaxable, gainsInTaxable, s);
  const before = ordinary.tax + gains.tax;
  const earned = Math.max(0, i.wages - i.preTax) + Math.max(0, r.se.earnings - r.se.deduction);
  const credits = childTaxCredit(i.children, i.otherDependents, r.agi, s, before, earned);
  const incomeTax = before - credits.nonRefundable;
  const gross = incomeTax + r.se.seTax + r.niit + r.additionalMedicare;
  const totalTax = gross - credits.refundable;
  return {
    ...r,
    taxable,
    ordinaryTaxable,
    ordinary,
    gains,
    incomeTax,
    credits,
    totalTax,
    refund: Math.max(0, i.withheld) + credits.refundable - gross,
    effectiveRate: r.grossIncome > 0 ? totalTax / r.grossIncome : 0,
    qbiDeduction: d,
    taxableBeforeQbi: r.taxable,
  };
}

/** The four 2026 estimated tax due dates (Form 1040-ES). */
export const ESTIMATED_DUE_2026 = [
  { label: "Payment 1", period: "January 1 to March 31, 2026", due: "April 15, 2026" },
  { label: "Payment 2", period: "April 1 to May 31, 2026", due: "June 15, 2026" },
  { label: "Payment 3", period: "June 1 to August 31, 2026", due: "September 15, 2026" },
  { label: "Payment 4", period: "September 1 to December 31, 2026", due: "January 15, 2027" },
];

export type Estimated = {
  /** Tax for the year less withholding. */
  owed: number;
  /** The least you must pay in (withholding plus estimates) to avoid the penalty. */
  required: number;
  /** Which safe harbor sets `required`. */
  basis: "current" | "prior" | "prior110";
  /** Each quarterly payment to meet the safe harbor. */
  safeQuarter: number;
  /** Each quarterly payment to cover the whole bill. */
  fullQuarter: number;
  /** Under $1,000 owed after withholding: no penalty either way. */
  underThreshold: boolean;
};

/**
 * Quarterly estimated tax. To avoid the underpayment penalty, pay in the
 * smaller of 90% of this year's tax and 100% of last year's (110% if last
 * year's AGI was over $150,000, or $75,000 married filing separately), or
 * owe less than $1,000 after withholding.
 */
export function estimatedPayments(totalTax: number, withheld: number, status: FilingStatus, priorYearTax?: number | null, priorAgi = 0): Estimated {
  const tax = Math.max(0, totalTax);
  const w = Math.max(0, withheld);
  const owed = Math.max(0, tax - w);
  const current = tax * 0.9;
  let required = current;
  let basis: Estimated["basis"] = "current";
  if (priorYearTax !== undefined && priorYearTax !== null && priorYearTax >= 0) {
    const high = priorAgi > (status === "mfs" ? 75_000 : 150_000);
    const prior = priorYearTax * (high ? 1.1 : 1);
    if (prior < current) {
      required = prior;
      basis = high ? "prior110" : "prior";
    }
  }
  return {
    owed,
    required,
    basis,
    safeQuarter: Math.max(0, required - w) / 4,
    fullQuarter: owed / 4,
    underThreshold: owed < 1_000,
  };
}

export type CapitalLoss = { netGain: number; deduction: number; carryforward: number };

/** Net gains and losses; a net loss offsets up to $3,000 of other income ($1,500 married filing separately), the rest carries forward. */
export function capitalLoss(gains: number, losses: number, status: FilingStatus): CapitalLoss {
  const net = Math.max(0, gains) - Math.max(0, losses);
  if (net >= 0) return { netGain: net, deduction: 0, carryforward: 0 };
  const limit = status === "mfs" ? 1_500 : 3_000;
  const deduction = Math.min(-net, limit);
  return { netGain: 0, deduction, carryforward: -net - deduction };
}

/** The home sale exclusion: up to $250,000 of gain ($500,000 married filing jointly) on a main home owned and lived in for 2 of the last 5 years. */
export function homeExclusion(gain: number, status: FilingStatus): number {
  return Math.min(Math.max(0, gain), status === "mfj" ? 500_000 : 250_000);
}
