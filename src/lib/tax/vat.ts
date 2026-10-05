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

