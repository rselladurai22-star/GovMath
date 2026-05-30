/**
 * Lasting Power of Attorney (LPA) — fees calculator.
 *
 * Source: gov.uk/power-of-attorney/register
 *
 * 2025/26 fees (England & Wales):
 *   £82 per LPA registered with the Office of the Public Guardian.
 *
 * Two LPA types:
 *  - Property & Financial Affairs
 *  - Health & Welfare
 *
 * Most couples register 4 LPAs (2 each): £328 total.
 *
 * Fee remission (50% off) if gross income under £12,000.
 * Fee exemption (100% off) if on Universal Credit, Income Support, JSA, ESA,
 *   Pension Credit guarantee, Housing Benefit, or NHS tax credit exemption.
 */

export const LPA_FEE = 82;

export type LpaInput = {
  numberOfLpas: number;
  remission: "none" | "half" | "full";
};

export type LpaResult = {
  standardFee: number;
  discount: number;
  payable: number;
};

export function lpaFees(input: LpaInput): LpaResult {
  const count = Math.max(0, Math.floor(input.numberOfLpas));
  const standardFee = count * LPA_FEE;
  const multiplier = input.remission === "full" ? 0 : input.remission === "half" ? 0.5 : 1;
  const payable = standardFee * multiplier;
  return {
    standardFee,
    discount: standardFee - payable,
    payable,
  };
}
