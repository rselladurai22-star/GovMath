/**
 * Plain-English insights layered on the SDLT engine: what a price just over
 * a threshold costs you, what the second-home surcharge adds, and how the
 * same price is taxed elsewhere in the UK. Pure functions.
 */

import { stampDuty, type BuyerType } from "./sdlt-2025";
import { lbtt, ltt } from "./regional-stamp-duty";

/** Price points where the SDLT rate steps up, per buyer type. */
const THRESHOLDS: Record<BuyerType, number[]> = {
  standard: [125_000, 250_000, 925_000, 1_500_000],
  "first-time": [300_000, 500_000, 925_000, 1_500_000],
  additional: [125_000, 250_000, 925_000, 1_500_000],
};

/**
 * If the price sits just above a threshold, how much tax a price at the
 * threshold would save. "Just above" is within 5% of the price, or £25,000
 * for the first-time buyer cliff at £500,000, where relief is lost entirely.
 */
export function nearThreshold(price: number, buyer: BuyerType): { threshold: number; over: number; saving: number } | null {
  if (price <= 0) return null;
  const below = THRESHOLDS[buyer].filter((t) => t < price);
  const threshold = below[below.length - 1];
  if (threshold === undefined) return null;
  const over = price - threshold;
  const window = buyer === "first-time" && threshold === 500_000 ? 25_000 : price * 0.05;
  if (over > window) return null;
  const saving = stampDuty(price, buyer).total - stampDuty(threshold, buyer).total;
  return saving >= 1 ? { threshold, over, saving } : null;
}

/** Extra SDLT a second home or buy-to-let pays over a home mover. */
export function additionalSurcharge(price: number): number {
  return stampDuty(price, "additional").total - stampDuty(price, "standard").total;
}

export type NationTax = { nation: string; tax: string; total: number };

/** The same purchase taxed in each UK nation. */
export function acrossNations(price: number, buyer: BuyerType): NationTax[] {
  return [
    { nation: "England & Northern Ireland", tax: "Stamp Duty (SDLT)", total: stampDuty(price, buyer).total },
    { nation: "Scotland", tax: "LBTT", total: lbtt(price, buyer).total },
    { nation: "Wales", tax: "LTT", total: ltt(price, buyer === "additional").total },
  ];
}

/** SDLT for each buyer type at evenly spaced prices from £0 to `top`. */
export function sdltCurve(top: number, steps: number): { price: number; standard: number; firstTime: number; additional: number }[] {
  return Array.from({ length: steps + 1 }, (_, i) => {
    const price = (top * i) / steps;
    return {
      price,
      standard: stampDuty(price, "standard").total,
      firstTime: stampDuty(price, "first-time").total,
      additional: stampDuty(price, "additional").total,
    };
  });
}
