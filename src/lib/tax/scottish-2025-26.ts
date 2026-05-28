/**
 * Scottish Income Tax — 2025/26 bands.
 * Six bands: starter, basic, intermediate, higher, advanced, top.
 * Personal Allowance (£12,570) is set by Westminster and applies UK-wide.
 *
 * Bands measured against income ABOVE the Personal Allowance:
 *   starter      next £2,827    at 19%
 *   basic        next £11,485   at 20%
 *   intermediate next £18,232   at 21%
 *   higher       next £43,632   at 42%
 *   advanced     next £49,338   at 45%
 *   top          remainder      at 48%
 *
 * Source: gov.scot 2025/26 Scottish Budget rates.
 */

import { incomeTax, personalAllowance, TAX_YEAR_2025_26 } from "./2025-26";

export const SCOTTISH_RATES_2025_26 = {
  starter: { width: 2827, rate: 0.19 },
  basic: { width: 11485, rate: 0.2 },
  intermediate: { width: 18232, rate: 0.21 },
  higher: { width: 43632, rate: 0.42 },
  advanced: { width: 49338, rate: 0.45 },
  top: { rate: 0.48 },
} as const;

export type ScottishTaxBreakdown = {
  personalAllowance: number;
  taxableIncome: number;
  starter: number;
  basic: number;
  intermediate: number;
  higher: number;
  advanced: number;
  top: number;
  total: number;
};

export function scottishIncomeTax(gross: number): ScottishTaxBreakdown {
  const pa = personalAllowance(gross);
  let remaining = Math.max(0, gross - pa);
  const r = SCOTTISH_RATES_2025_26;

  const take = (width: number, rate: number) => {
    const amt = Math.min(remaining, width);
    remaining -= amt;
    return amt * rate;
  };

  const starter = take(r.starter.width, r.starter.rate);
  const basic = take(r.basic.width, r.basic.rate);
  const intermediate = take(r.intermediate.width, r.intermediate.rate);
  const higher = take(r.higher.width, r.higher.rate);
  const advanced = take(r.advanced.width, r.advanced.rate);
  const top = remaining * r.top.rate;

  return {
    personalAllowance: pa,
    taxableIncome: Math.max(0, gross - pa),
    starter,
    basic,
    intermediate,
    higher,
    advanced,
    top,
    total: starter + basic + intermediate + higher + advanced + top,
  };
}

/** Difference vs equivalent rUK (England/Wales/NI) tax on the same income. */
export function scottishVsRukDifference(gross: number): number {
  const scot = scottishIncomeTax(gross).total;
  const ruk = incomeTax(gross).total;
  return scot - ruk;
}

// Re-export for convenience.
export { TAX_YEAR_2025_26 };
