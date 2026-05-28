/**
 * Scottish LBTT and Welsh LTT — residential rates 2025/26.
 *
 * LBTT (Land & Buildings Transaction Tax) — Scotland.
 *   Operates 1 April 2015 onwards via Revenue Scotland.
 *   First-time buyer relief: nil rate extended to £175,000.
 *   Additional Dwelling Supplement (ADS): 8% on full price (≥£40k).
 *
 * LTT (Land Transaction Tax) — Wales.
 *   Operates 1 April 2018 onwards via the WRA.
 *   No first-time buyer relief.
 *   Higher residential rates: +5% surcharge from Dec 2024.
 */

export type RegionalBuyer = "standard" | "first-time" | "additional";

export type Band = { upTo: number | null; rate: number };

/** LBTT residential bands from April 2024. */
export const LBTT_BANDS: Band[] = [
  { upTo: 145_000, rate: 0 },
  { upTo: 250_000, rate: 0.02 },
  { upTo: 325_000, rate: 0.05 },
  { upTo: 750_000, rate: 0.1 },
  { upTo: null, rate: 0.12 },
];

/** First-time buyer LBTT — nil-rate threshold raised to £175,000. */
export const LBTT_FTB_NIL = 175_000;
export const LBTT_ADS_RATE = 0.08;
export const LBTT_ADS_THRESHOLD = 40_000;

/** LTT main residential bands from April 2025. */
export const LTT_MAIN_BANDS: Band[] = [
  { upTo: 225_000, rate: 0 },
  { upTo: 400_000, rate: 0.06 },
  { upTo: 750_000, rate: 0.075 },
  { upTo: 1_500_000, rate: 0.1 },
  { upTo: null, rate: 0.12 },
];

/** LTT higher residential rates (additional dwelling) — Dec 2024 onwards. */
export const LTT_HIGHER_BANDS: Band[] = [
  { upTo: 180_000, rate: 0.05 },
  { upTo: 250_000, rate: 0.085 },
  { upTo: 400_000, rate: 0.1 },
  { upTo: 750_000, rate: 0.125 },
  { upTo: 1_500_000, rate: 0.15 },
  { upTo: null, rate: 0.17 },
];

export type BreakdownRow = {
  band: string;
  rate: number;
  taxableInBand: number;
  tax: number;
};

export type RegionalResult = {
  price: number;
  total: number;
  effectiveRate: number;
  breakdown: BreakdownRow[];
};

function applyBands(price: number, bands: Band[], floor = 0): RegionalResult {
  let lower = floor;
  let remaining = Math.max(0, price - floor);
  let total = 0;
  const breakdown: BreakdownRow[] = [];

  for (const b of bands) {
    if (remaining <= 0) break;
    const upper = b.upTo ?? Infinity;
    if (upper <= lower) continue;
    const width = upper - lower;
    const taxable = Math.min(remaining, width);
    const tax = taxable * b.rate;
    breakdown.push({
      band:
        upper === Infinity
          ? `Above £${lower.toLocaleString("en-GB")}`
          : `£${(lower + 1).toLocaleString("en-GB")} – £${upper.toLocaleString("en-GB")}`,
      rate: b.rate,
      taxableInBand: taxable,
      tax,
    });
    total += tax;
    remaining -= taxable;
    lower = upper;
  }

  return {
    price,
    total,
    effectiveRate: price > 0 ? total / price : 0,
    breakdown,
  };
}

export function lbtt(price: number, buyer: RegionalBuyer = "standard"): RegionalResult {
  const p = Math.max(0, price || 0);
  if (buyer === "first-time") {
    // Treat as standard bands but with nil rate up to £175k.
    const customBands: Band[] = [
      { upTo: LBTT_FTB_NIL, rate: 0 },
      ...LBTT_BANDS.filter((b) => b.upTo === null || b.upTo > LBTT_FTB_NIL),
    ];
    return applyBands(p, customBands);
  }
  const main = applyBands(p, LBTT_BANDS);
  if (buyer === "additional" && p >= LBTT_ADS_THRESHOLD) {
    const ads = p * LBTT_ADS_RATE;
    main.breakdown.push({
      band: "Additional Dwelling Supplement (8%)",
      rate: LBTT_ADS_RATE,
      taxableInBand: p,
      tax: ads,
    });
    main.total += ads;
    main.effectiveRate = p > 0 ? main.total / p : 0;
  }
  return main;
}

export function ltt(price: number, additional = false): RegionalResult {
  const p = Math.max(0, price || 0);
  return applyBands(p, additional ? LTT_HIGHER_BANDS : LTT_MAIN_BANDS);
}
