/**
 * UK Council Tax — typical annual Band D bills × band ratio (2026/27).
 *
 * Council tax is set by each local authority, so figures here are NATIONAL AVERAGES
 * for Band D (April 2026) sourced from gov.uk / gov.scot / gov.wales:
 *  - England:    £2,392 (Band D average)
 *  - Wales:      £2,283 (Band D average)
 *  - Scotland:   £1,662 (Band D average) — different banding from £58,001
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
  england: 2392,
  wales:   2283,
  scotland: 1662,
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

/** Property values on the valuation date that set each band. */
export const BAND_RANGES: Record<CtNation, { band: CtBand; upTo: number | null }[]> = {
  // England: values at 1 April 1991.
  england: [
    { band: "A", upTo: 40_000 },
    { band: "B", upTo: 52_000 },
    { band: "C", upTo: 68_000 },
    { band: "D", upTo: 88_000 },
    { band: "E", upTo: 120_000 },
    { band: "F", upTo: 160_000 },
    { band: "G", upTo: 320_000 },
    { band: "H", upTo: null },
  ],
  // Wales: values at 1 April 2003.
  wales: [
    { band: "A", upTo: 44_000 },
    { band: "B", upTo: 65_000 },
    { band: "C", upTo: 91_000 },
    { band: "D", upTo: 123_000 },
    { band: "E", upTo: 162_000 },
    { band: "F", upTo: 223_000 },
    { band: "G", upTo: 324_000 },
    { band: "H", upTo: 424_000 },
    { band: "I", upTo: null },
  ],
  // Scotland: values at 1 April 1991.
  scotland: [
    { band: "A", upTo: 27_000 },
    { band: "B", upTo: 35_000 },
    { band: "C", upTo: 45_000 },
    { band: "D", upTo: 58_000 },
    { band: "E", upTo: 80_000 },
    { band: "F", upTo: 106_000 },
    { band: "G", upTo: 212_000 },
    { band: "H", upTo: null },
  ],
};

export function bandsFor(nation: CtNation): CtBand[] {
  return BAND_RANGES[nation].map((b) => b.band);
}

export function bandMultiplier(nation: CtNation, band: CtBand): number {
  return (nation === "scotland" ? SCOT_MULT : EW_MULT)[band] ?? 1;
}

export type BillInput = {
  nation: CtNation;
  band: CtBand;
  /** Your council's Band D charge. 0 uses the national average. */
  bandD: number;
  /** Adults (18+) living there who are not disregarded. */
  adultsCounted: number;
  /** Disabled band reduction: billed one band lower. */
  disabledReduction: boolean;
  /** Second home or long-term empty premium, % of the bill (0–300). */
  premiumPct: number;
  /** 10 or 12 monthly instalments. */
  instalments: number;
};

export type BillResult = {
  bandD: number;
  billedBand: CtBand;
  multiplier: number;
  fullBill: number;
  reduction: number;
  discountRate: number;
  discount: number;
  premium: number;
  payable: number;
  instalment: number;
  weekly: number;
};

/**
 * A household's council tax bill. Discounts: 25% if one adult counts, 50% if
 * none do. A disabled band reduction bills one band lower; Band A is reduced by
 * one-ninth of Band D instead. Premiums apply to the unreduced bill.
 */
export function councilBill(input: BillInput): BillResult {
  const bandD = input.bandD > 0 ? input.bandD : BAND_D_AVG[input.nation];
  const order = bandsFor(input.nation);
  const multiplier = bandMultiplier(input.nation, input.band);
  const fullBill = bandD * multiplier;
  let billedBand = input.band;
  let reducedMult = multiplier;
  if (input.disabledReduction) {
    const i = order.indexOf(input.band);
    if (i > 0) {
      billedBand = order[i - 1];
      reducedMult = bandMultiplier(input.nation, billedBand);
    } else {
      // Band A: reduced by 1/9 of Band D (England and Wales; Scotland similar).
      reducedMult = multiplier - (input.nation === "scotland" ? 40 / 360 : 1 / 9);
    }
  }
  const afterReduction = bandD * reducedMult;
  const reduction = fullBill - afterReduction;
  const adults = Math.max(0, Math.round(input.adultsCounted));
  const discountRate = adults === 0 ? 0.5 : adults === 1 ? 0.25 : 0;
  const discount = afterReduction * discountRate;
  const premium = fullBill * (Math.max(0, Math.min(300, input.premiumPct)) / 100);
  const payable = Math.max(0, afterReduction - discount + premium);
  const n = input.instalments === 12 ? 12 : 10;
  return {
    bandD,
    billedBand,
    multiplier,
    fullBill,
    reduction,
    discountRate,
    discount,
    premium,
    payable,
    instalment: payable / n,
    weekly: payable / 52,
  };
}

export { BAND_D_AVG };
