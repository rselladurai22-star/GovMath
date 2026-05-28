/**
 * Dividend tax — 2025/26.
 *
 * Allowance: £500 of dividends tax-free.
 * Rates above allowance depend on which Income Tax band the dividends fall in,
 * which depends on your OTHER income (salary/self-employment).
 *
 * Rates:
 *   basic       8.75%
 *   higher      33.75%
 *   additional  39.35%
 *
 * Dividends sit on top of other income. The Personal Allowance is used by
 * the other income first; remaining PA can absorb dividends tax-free
 * (separate from the £500 dividend allowance, which only saves rate not
 * "uses" any band space).
 */

import { personalAllowance, TAX_YEAR_2025_26 } from "./2025-26";

export const DIVIDEND_2025_26 = {
  allowance: 500,
  rates: { basic: 0.0875, higher: 0.3375, additional: 0.3935 },
} as const;

export type DividendTaxBreakdown = {
  totalIncome: number;
  dividends: number;
  otherIncome: number;
  paUsedByDividends: number;
  allowanceUsed: number;
  basic: number;
  higher: number;
  additional: number;
  total: number;
};

export function dividendTax(
  otherIncome: number,
  dividends: number
): DividendTaxBreakdown {
  const other = Math.max(0, otherIncome);
  const div = Math.max(0, dividends);
  const total = other + div;

  const pa = personalAllowance(total);
  // PA used by other income first
  const paUsedByOther = Math.min(other, pa);
  const paLeftForDividends = Math.max(0, pa - paUsedByOther);
  const paUsedByDividends = Math.min(div, paLeftForDividends);

  // Dividends after PA absorption
  const divAfterPA = div - paUsedByDividends;

  // Apply £500 allowance at zero rate
  const allowanceUsed = Math.min(divAfterPA, DIVIDEND_2025_26.allowance);
  const divToTax = divAfterPA - allowanceUsed;

  // Bands: basic-rate band ends at PA + £37,700.
  // Other income (above PA) consumes the band first.
  const basicBandTop = pa + TAX_YEAR_2025_26.incomeTax.basicRateBand; // £50,270 standard
  const higherBandTop = TAX_YEAR_2025_26.incomeTax.higherRateUpper; // £125,140

  // "Income level" where dividend allowance/taxed dividends sit.
  // Other income occupies [0, other]. Allowance sits at [other, other+allowanceUsed].
  // Taxed dividends sit from there upward.
  const taxedStartIncomeLevel = other + paUsedByDividends + allowanceUsed;
  const taxedEndIncomeLevel = taxedStartIncomeLevel + divToTax;

  // Width of taxed dividends in each band:
  const inBasic = Math.max(
    0,
    Math.min(taxedEndIncomeLevel, basicBandTop) -
      Math.max(taxedStartIncomeLevel, pa)
  );
  const inHigher = Math.max(
    0,
    Math.min(taxedEndIncomeLevel, higherBandTop) -
      Math.max(taxedStartIncomeLevel, basicBandTop)
  );
  const inAdditional = Math.max(
    0,
    taxedEndIncomeLevel - Math.max(taxedStartIncomeLevel, higherBandTop)
  );

  const r = DIVIDEND_2025_26.rates;
  const basic = inBasic * r.basic;
  const higher = inHigher * r.higher;
  const additional = inAdditional * r.additional;

  return {
    totalIncome: total,
    dividends: div,
    otherIncome: other,
    paUsedByDividends,
    allowanceUsed,
    basic,
    higher,
    additional,
    total: basic + higher + additional,
  };
}
