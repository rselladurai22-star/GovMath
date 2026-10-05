/**
 * Scottish Income Tax — 2026/27 bands.
 * Six bands: starter, basic, intermediate, higher, advanced, top.
 * Personal Allowance (£12,570) is set by Westminster and applies UK-wide.
 *
 * Bands measured against income ABOVE the Personal Allowance:
 *   starter      next £3,967    at 19%   (£12,571 – £16,537 gross)
 *   basic        next £12,989   at 20%   (£16,538 – £29,526)
 *   intermediate next £14,136   at 21%   (£29,527 – £43,662)
 *   higher       next £31,338   at 42%   (£43,663 – £75,000)
 *   advanced     next £62,710   at 45%   (£75,001 – £125,140)
 *   top          remainder      at 48%
 *
 * Source: gov.scot Scottish Income Tax 2026 to 2027.
 */

import { personalAllowance } from "./2026-27";

export const SCOTTISH_RATES_2026_27 = {
  starter: { width: 3967, rate: 0.19 },
  basic: { width: 12989, rate: 0.2 },
  intermediate: { width: 14136, rate: 0.21 },
  higher: { width: 31338, rate: 0.42 },
  advanced: { width: 62710, rate: 0.45 },
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
  const r = SCOTTISH_RATES_2026_27;

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

// Re-export for convenience.
