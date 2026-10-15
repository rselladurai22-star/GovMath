/**
 * Everyday maths: discounts and multi-buy deals, and fuel economy.
 *
 * Pure functions with no locale formatting; the pages format the numbers.
 */

import { UK_GALLON } from "../vehicles/running";

/* ── Units (exact by definition) ────────────────────────────────── */

/** US liquid gallon in litres (231 cubic inches). NIST SP 811, Appendix B.8. */
export const US_GALLON = 3.785411784;
/** Imperial gallon in litres, re-exported for the fuel page. Weights and Measures Act 1985; NIST SP 811, Appendix B.8. */
export const IMPERIAL_GALLON = UK_GALLON;
/** International mile in kilometres. NIST SP 811, Appendix B.8. */
export const MILE_KM = 1.609344;

const fin = (x: number) => (Number.isFinite(x) ? x : 0);

/* ── Discounts ──────────────────────────────────────────────────── */

export type Discount = { kind: "percent" | "amount"; value: number };
export type DiscountStep = { label: string; before: number; off: number; after: number };

/**
 * Applies discounts one after another, each to the price left by the one
 * before (how "20% off, then an extra 10%" works at the till). Never goes
 * below zero.
 */
export function applyDiscounts(price: number, discounts: Discount[]): { final: number; saved: number; effectivePercent: number; steps: DiscountStep[] } {
  const start = Math.max(0, fin(price));
  let p = start;
  const steps: DiscountStep[] = [];
  for (const d of discounts) {
    const v = Math.max(0, fin(d.value));
    if (v === 0) continue;
    const off = Math.min(p, d.kind === "percent" ? (p * Math.min(v, 100)) / 100 : v);
    steps.push({ label: d.kind === "percent" ? `${v}% off` : `${v} off`, before: p, off, after: p - off });
    p -= off;
  }
  const saved = start - p;
  return { final: p, saved, effectivePercent: start > 0 ? (saved / start) * 100 : 0, steps };
}

/** Two percentage discounts in a row as one: 20% then 10% is 28%, not 30%. */
export function stackedPercent(percents: number[]): number {
  const keep = percents.reduce((k, p) => k * (1 - Math.min(100, Math.max(0, fin(p))) / 100), 1);
  return (1 - keep) * 100;
}

/** The price before a percentage discount: a sale price of 60 after 25% off was 80. */
export function originalFromSale(sale: number, percentOff: number): number {
  const keep = 1 - fin(percentOff) / 100;
  return keep > 0 ? fin(sale) / keep : 0;
}

/**
 * "Buy X, get Y free" (3 for 2 is buy 2 get 1). Returns what you pay for one
 * full deal, the price per item and the saving as a percentage.
 */
export function multiBuy(unitPrice: number, buy: number, free: number): { items: number; pay: number; perItem: number; percentOff: number } {
  const b = Math.max(0, Math.round(fin(buy)));
  const f = Math.max(0, Math.round(fin(free)));
  const items = b + f;
  const pay = Math.max(0, fin(unitPrice)) * b;
  return { items, pay, perItem: items > 0 ? pay / items : 0, percentOff: items > 0 ? (f / items) * 100 : 0 };
}

/** Price per unit (per kg, litre, item…). Zero quantity gives 0. */
export function unitPrice(price: number, quantity: number): number {
  return quantity > 0 ? fin(price) / quantity : 0;
}

/** Adds a sales tax or VAT at `rate` per cent. */
export function addTax(price: number, rate: number): number {
  return fin(price) * (1 + fin(rate) / 100);
}

/** Removes a sales tax or VAT at `rate` per cent from a tax-inclusive price. */
export function removeTax(price: number, rate: number): number {
  return fin(price) / (1 + fin(rate) / 100);
}

/* ── Fuel economy ───────────────────────────────────────────────── */

export type EconomyUnit = "mpg-uk" | "mpg-us" | "l100" | "kml";

/** Any economy figure as litres per 100 km. Zero or less gives 0. */
export function toL100(value: number, unit: EconomyUnit): number {
  if (!(value > 0)) return 0;
  switch (unit) {
    case "l100":
      return value;
    case "kml":
      return 100 / value;
    case "mpg-uk":
      return (100 * IMPERIAL_GALLON) / (value * MILE_KM);
    case "mpg-us":
      return (100 * US_GALLON) / (value * MILE_KM);
  }
}

/** Litres per 100 km as any economy unit. */
export function fromL100(l100: number, unit: EconomyUnit): number {
  if (!(l100 > 0)) return 0;
  switch (unit) {
    case "l100":
      return l100;
    case "kml":
      return 100 / l100;
    case "mpg-uk":
      return (100 * IMPERIAL_GALLON) / (l100 * MILE_KM);
    case "mpg-us":
      return (100 * US_GALLON) / (l100 * MILE_KM);
  }
}

export type VolumeUnit = "litre" | "uk-gallon" | "us-gallon";
export const LITRES: Record<VolumeUnit, number> = { litre: 1, "uk-gallon": IMPERIAL_GALLON, "us-gallon": US_GALLON };

/** Economy from a fill-up: distance since the last full tank ÷ fuel added to fill it again. */
export function fillUpL100(distance: number, distanceUnit: "mi" | "km", fuel: number, fuelUnit: VolumeUnit): number {
  const km = distance * (distanceUnit === "mi" ? MILE_KM : 1);
  const litres = fuel * LITRES[fuelUnit];
  return km > 0 && litres > 0 ? (litres / km) * 100 : 0;
}

/** Cost of driving: per km, per mile and for a trip of `distance` in `unit`. */
export function fuelCost(l100: number, price: number, priceUnit: VolumeUnit, distance: number, unit: "mi" | "km"): { perKm: number; perMile: number; litres: number; trip: number; perLitre: number } {
  const perLitre = LITRES[priceUnit] > 0 ? Math.max(0, fin(price)) / LITRES[priceUnit] : 0;
  const perKm = (Math.max(0, fin(l100)) / 100) * perLitre;
  const km = Math.max(0, fin(distance)) * (unit === "mi" ? MILE_KM : 1);
  const litres = (Math.max(0, fin(l100)) / 100) * km;
  return { perKm, perMile: perKm * MILE_KM, litres, trip: litres * perLitre, perLitre };
}
