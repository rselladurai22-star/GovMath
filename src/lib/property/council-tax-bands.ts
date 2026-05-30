/**
 * UK Council Tax — typical annual Band D bills × band ratio (2025/26).
 *
 * Council tax is set by each local authority, so figures here are NATIONAL AVERAGES
 * for Band D (April 2025) sourced from gov.uk / gov.scot / gov.wales:
 *  - England:    £2,280 (Band D average)
 *  - Wales:      £2,212 (Band D average)
 *  - Scotland:   £1,569 (Band D average) — different banding from £58,001
 *
 * Multipliers (relative to Band D = 9/9):
 *   A 6/9, B 7/9, C 8/9, D 9/9, E 11/9, F 13/9, G 15/9, H 18/9 (England & Wales)
 *   I = 21/9 (Wales only — extra band)
 *
 * Scotland multipliers (from 2017 revaluation):
 *   A 240/360, B 280/360, C 320/360, D 360/360, E 473/360, F 585/360, G 705/360, H 882/360
 */

export type CtBand = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I";
export type CtNation = "england" | "wales" | "scotland";

const BAND_D_AVG: Record<CtNation, number> = {
  england: 2280,
  wales:   2212,
  scotland: 1569,
};

const EW_MULT: Record<CtBand, number> = {
  A: 6/9, B: 7/9, C: 8/9, D: 1, E: 11/9, F: 13/9, G: 15/9, H: 18/9, I: 21/9,
};

const SCOT_MULT: Record<CtBand, number> = {
  A: 240/360, B: 280/360, C: 320/360, D: 1, E: 473/360, F: 585/360, G: 705/360, H: 882/360, I: 0,
};

export type CouncilTaxInput = {
  band: CtBand;
  nation: CtNation;
  /** Apply 25% single person discount. */
  singlePerson: boolean;
};

export type CouncilTaxResult = {
  bandDAverage: number;
  multiplier: number;
  annualBill: number;
  monthlyBill: number;
  discount: number;
  payable: number;
};

export function councilTax(input: CouncilTaxInput): CouncilTaxResult {
  const bandDAverage = BAND_D_AVG[input.nation];
  const mults = input.nation === "scotland" ? SCOT_MULT : EW_MULT;
  const multiplier = mults[input.band] ?? 1;
  const annualBill = Math.round(bandDAverage * multiplier);
  const discount = input.singlePerson ? annualBill * 0.25 : 0;
  const payable = annualBill - discount;
  return {
    bandDAverage,
    multiplier,
    annualBill,
    monthlyBill: payable / 12,
    discount,
    payable,
  };
}
