/**
 * Stamp Duty Land Tax (SDLT) — England & Northern Ireland.
 *
 * Rates effective from 1 April 2025 (residential, freehold purchase).
 *
 * Out of scope (v1):
 *   - Scotland (LBTT) and Wales (LTT) — separate modules.
 *   - Non-residential and mixed-use property.
 *   - Leasehold premium + rent NPV calculations.
 *
 * All values GBP. Functions are pure.
 */

export type BuyerType = "standard" | "first-time" | "additional";

export type SdltBand = {
  upTo: number | null; // null = no upper bound
  rate: number;
};

/** Standard residential bands (main home, not a first-time buyer). */
const STANDARD_BANDS: SdltBand[] = [
  { upTo: 125_000, rate: 0 },
  { upTo: 250_000, rate: 0.02 },
  { upTo: 925_000, rate: 0.05 },
  { upTo: 1_500_000, rate: 0.1 },
  { upTo: null, rate: 0.12 },
];

/** First-time buyer relief, only available when price ≤ £500,000. */
const FIRST_TIME_BANDS: SdltBand[] = [
  { upTo: 300_000, rate: 0 },
  { upTo: 500_000, rate: 0.05 },
];

const FIRST_TIME_RELIEF_CAP = 500_000;

/** Surcharge added to every band for additional/second properties. */
const ADDITIONAL_SURCHARGE = 0.05;

export type SdltBreakdownRow = {
  band: string;
  rate: number;
  taxableInBand: number;
  tax: number;
};

export type SdltResult = {
  price: number;
  buyerType: BuyerType;
  /** Which rate table was actually applied (e.g. first-time buyers above £500k fall back to standard). */
  appliedScheme: "standard" | "first-time" | "additional";
  total: number;
  effectiveRate: number;
  breakdown: SdltBreakdownRow[];
};

function applyBands(
  price: number,
  bands: SdltBand[],
  surcharge = 0
): { total: number; breakdown: SdltBreakdownRow[] } {
  let remaining = price;
  let lowerEdge = 0;
  let total = 0;
  const breakdown: SdltBreakdownRow[] = [];

  for (const band of bands) {
    if (remaining <= 0) break;
    const bandUpper = band.upTo ?? Infinity;
    const bandWidth = bandUpper - lowerEdge;
    const taxableInBand = Math.min(remaining, bandWidth);
    const rate = band.rate + surcharge;
    const tax = taxableInBand * rate;

    breakdown.push({
      band:
        bandUpper === Infinity
          ? `Above £${lowerEdge.toLocaleString("en-GB")}`
          : `£${(lowerEdge + 1).toLocaleString("en-GB")} – £${bandUpper.toLocaleString(
              "en-GB"
            )}`,
      rate,
      taxableInBand,
      tax,
    });

    total += tax;
    remaining -= taxableInBand;
    lowerEdge = bandUpper;
  }

  return { total, breakdown };
}

export function stampDuty(
  price: number,
  buyerType: BuyerType = "standard"
): SdltResult {
  const safePrice = Math.max(0, price || 0);

  // First-time buyer relief only applies up to £500k. Above that, fall back to standard.
  if (buyerType === "first-time" && safePrice <= FIRST_TIME_RELIEF_CAP) {
    const { total, breakdown } = applyBands(safePrice, FIRST_TIME_BANDS);
    return {
      price: safePrice,
      buyerType,
      appliedScheme: "first-time",
      total,
      effectiveRate: safePrice > 0 ? total / safePrice : 0,
      breakdown,
    };
  }

  const surcharge = buyerType === "additional" ? ADDITIONAL_SURCHARGE : 0;
  const { total, breakdown } = applyBands(safePrice, STANDARD_BANDS, surcharge);

  return {
    price: safePrice,
    buyerType,
    appliedScheme: buyerType === "additional" ? "additional" : "standard",
    total,
    effectiveRate: safePrice > 0 ? total / safePrice : 0,
    breakdown,
  };
}
