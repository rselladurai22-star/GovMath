/**
 * UK VAT — current rates (effective since 4 January 2011).
 *
 * VAT rates change rarely, so they are not tied to a specific tax year.
 * If HMRC ever amends them, update VAT_RATES and the table in the page.
 */

export const VAT_RATES = {
  standard: 0.2,
  reduced: 0.05,
  zero: 0,
} as const;

export type VatRateKey = keyof typeof VAT_RATES;

export type VatResult = {
  /** Price before VAT. */
  net: number;
  /** VAT amount. */
  vat: number;
  /** Price after VAT (what the customer pays). */
  gross: number;
  /** Applied rate, e.g. 0.2. */
  rate: number;
};

/** Add VAT to a net (ex-VAT) amount. */
export function addVat(net: number, rate: number): VatResult {
  const safeNet = Math.max(0, net || 0);
  const vat = safeNet * rate;
  return { net: safeNet, vat, gross: safeNet + vat, rate };
}

/** Remove VAT from a gross (inc-VAT) amount. */
export function removeVat(gross: number, rate: number): VatResult {
  const safeGross = Math.max(0, gross || 0);
  const net = safeGross / (1 + rate);
  return { net, vat: safeGross - net, gross: safeGross, rate };
}

/**
 * Flat Rate Scheme comparison.
 *
 * Under FRS you charge customers the normal rate (usually 20%) but pay HMRC
 * a single flat percentage of your VAT-inclusive turnover. You generally
 * can't reclaim input VAT on purchases (with limited capital-goods exceptions).
 *
 * `flatRate` is the trade-specific percentage HMRC assigns (e.g. 0.145 for
 * a "limited cost trader"). Returns the VAT you'd pay HMRC under each scheme
 * and the difference.
 */
export function flatRateComparison(
  netSales: number,
  standardRate: number,
  flatRate: number
): {
  grossSales: number;
  standardSchemeVat: number;
  flatSchemeVat: number;
  difference: number;
  betterScheme: "standard" | "flat" | "tie";
} {
  const safeNet = Math.max(0, netSales || 0);
  const grossSales = safeNet * (1 + standardRate);
  const standardSchemeVat = safeNet * standardRate;
  const flatSchemeVat = grossSales * flatRate;
  const difference = standardSchemeVat - flatSchemeVat;
  const betterScheme =
    Math.abs(difference) < 0.005
      ? "tie"
      : difference > 0
      ? "flat"
      : "standard";

  return {
    grossSales,
    standardSchemeVat,
    flatSchemeVat,
    difference,
    betterScheme,
  };
}
