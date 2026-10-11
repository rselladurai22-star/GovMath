/**
 * Everyday maths: discounts and multi-buy deals, fractions with the working
 * shown, averages and spread, GPA and course grades, and fuel economy.
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

/* ── Fractions ──────────────────────────────────────────────────── */

export type Frac = { n: number; d: number };

export function gcd(a: number, b: number): number {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b) [a, b] = [b, a % b];
  return a;
}

export function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return Math.abs((a / gcd(a, b)) * b);
}

/** Lowest terms with a positive denominator. A zero denominator is left as is (invalid). */
export function simplify(f: Frac): Frac {
  if (f.d === 0) return { n: f.n, d: 0 };
  const g = gcd(f.n, f.d) || 1;
  const s = f.d < 0 ? -1 : 1;
  return { n: (s * f.n) / g, d: (s * f.d) / g };
}

/**
 * Reads "3/4", "1 1/2", "-2 3/5", "0.125", "7" or "1.5/2". Returns null for
 * anything else, or a zero denominator.
 */
export function parseFraction(raw: string): Frac | null {
  const s = raw.trim().replace(/\s+/g, " ").replace(/[−–]/g, "-");
  if (!s) return null;
  const dec = (t: string): Frac | null => {
    if (!/^-?\d+(\.\d+)?$|^-?\.\d+$/.test(t)) return null;
    const neg = t.startsWith("-");
    const body = neg ? t.slice(1) : t;
    const [i, f = ""] = body.split(".");
    if (f.length > 9) return null;
    const d = 10 ** f.length;
    const n = Number(i || "0") * d + Number(f || "0");
    return { n: neg ? -n : n, d };
  };
  let m = s.match(/^(-?)(\d+) (\d+)\/(\d+)$/);
  if (m) {
    const w = Number(m[2]);
    const n = Number(m[3]);
    const d = Number(m[4]);
    if (d === 0) return null;
    const total = w * d + n;
    return { n: m[1] ? -total : total, d };
  }
  m = s.match(/^([^/]+)\/([^/]+)$/);
  if (m) {
    const a = dec(m[1].trim());
    const b = dec(m[2].trim());
    if (!a || !b || b.n === 0) return null;
    return simplify({ n: a.n * b.d, d: a.d * b.n });
  }
  const d = dec(s);
  return d ? simplify(d) : null;
}

export type FracOp = "add" | "subtract" | "multiply" | "divide";
export type FracWorking = { result: Frac | null; raw: Frac | null; common?: number; steps: string[]; divisor: number };

const show = (f: Frac) => (f.d === 1 ? `${f.n}` : `${f.n}/${f.d}`);

/** Adds, subtracts, multiplies or divides two fractions and lists the working. */
export function fractionOp(a: Frac, b: Frac, op: FracOp): FracWorking {
  const steps: string[] = [];
  let raw: Frac;
  let common: number | undefined;
  if (op === "add" || op === "subtract") {
    common = lcm(a.d, b.d);
    const an = a.n * (common / a.d);
    const bn = b.n * (common / b.d);
    if (a.d !== b.d) {
      steps.push(`The lowest common denominator of ${a.d} and ${b.d} is ${common}.`);
      steps.push(`${show(a)} = ${an}/${common} and ${show(b)} = ${bn}/${common}.`);
    } else {
      steps.push(`Both fractions already have the denominator ${common}.`);
    }
    const n = op === "add" ? an + bn : an - bn;
    steps.push(`${op === "add" ? "Add" : "Subtract"} the numerators: ${an} ${op === "add" ? "+" : "−"} ${bn < 0 ? `(${bn})` : bn} = ${n}, giving ${n}/${common}.`);
    raw = { n, d: common };
  } else if (op === "multiply") {
    raw = { n: a.n * b.n, d: a.d * b.d };
    steps.push(`Multiply the tops and the bottoms: (${a.n} × ${b.n}) / (${a.d} × ${b.d}) = ${raw.n}/${raw.d}.`);
  } else {
    if (b.n === 0) return { result: null, raw: null, steps: ["You cannot divide by zero."], divisor: 1 };
    steps.push(`Dividing by ${show(b)} is the same as multiplying by its reciprocal, ${b.d}/${b.n}.`);
    raw = { n: a.n * b.d, d: a.d * b.n };
    if (raw.d < 0) raw = { n: -raw.n, d: -raw.d };
    steps.push(`(${a.n} × ${b.d}) / (${a.d} × ${b.n < 0 ? `(${b.n})` : b.n}) = ${raw.n}/${raw.d}.`);
  }
  const g = gcd(raw.n, raw.d) || 1;
  const result = simplify(raw);
  if (g > 1) steps.push(`The greatest common divisor of ${Math.abs(raw.n)} and ${Math.abs(raw.d)} is ${g}. Divide both by ${g}: ${show(result)}.`);
  else steps.push(`${show(result)} is already in its lowest terms.`);
  return { result, raw, common, steps, divisor: g };
}

/** A fraction as a whole number and a proper fraction: 7/4 → 1 and 3/4. */
export function toMixed(f: Frac): { sign: 1 | -1; whole: number; n: number; d: number } {
  const s = simplify(f);
  const sign = s.n < 0 ? -1 : 1;
  const a = Math.abs(s.n);
  return { sign, whole: Math.floor(a / s.d), n: a % s.d, d: s.d };
}

/** "1 3/4", "-2 1/3", "5" or "3/8". */
export function mixedText(f: Frac): string {
  if (f.d === 0) return "undefined";
  const m = toMixed(f);
  const sign = m.sign < 0 ? "-" : "";
  if (m.n === 0) return `${sign}${m.whole}`;
  if (m.whole === 0) return `${sign}${m.n}/${m.d}`;
  return `${sign}${m.whole} ${m.n}/${m.d}`;
}

/**
 * The exact decimal by long division, with any repeating part in brackets:
 * 1/3 → "0.(3)", 1/6 → "0.1(6)", 3/8 → "0.375". Stops after `maxDigits`.
 */
export function decimalExpansion(f: Frac, maxDigits = 60): { text: string; terminates: boolean } {
  const s = simplify(f);
  if (s.d === 0) return { text: "undefined", terminates: false };
  const neg = s.n < 0;
  const a = Math.abs(s.n);
  const whole = Math.floor(a / s.d);
  let r = a % s.d;
  const digits: number[] = [];
  const seen = new Map<number, number>();
  while (r !== 0 && !seen.has(r) && digits.length < maxDigits) {
    seen.set(r, digits.length);
    r *= 10;
    digits.push(Math.floor(r / s.d));
    r %= s.d;
  }
  let frac = digits.join("");
  let terminates = r === 0;
  if (r !== 0 && seen.has(r)) {
    const at = seen.get(r)!;
    frac = `${frac.slice(0, at)}(${frac.slice(at)})`;
  } else if (r !== 0) {
    frac += "…";
    terminates = false;
  }
  return { text: `${neg ? "-" : ""}${whole}${frac ? `.${frac}` : ""}`, terminates };
}

/** A decimal as the nearest fraction with a denominator up to `maxDen` (continued fractions). */
export function approximateFraction(x: number, maxDen = 1000): Frac {
  if (!Number.isFinite(x)) return { n: 0, d: 1 };
  const neg = x < 0;
  let v = Math.abs(x);
  let [h0, h1, k0, k1] = [0, 1, 1, 0];
  for (let i = 0; i < 40; i++) {
    const a = Math.floor(v);
    const h2 = a * h1 + h0;
    const k2 = a * k1 + k0;
    if (k2 > maxDen) break;
    [h0, h1, k0, k1] = [h1, h2, k1, k2];
    const rest = v - a;
    if (rest < 1e-12) break;
    v = 1 / rest;
  }
  return simplify({ n: neg ? -h1 : h1, d: k1 || 1 });
}

/* ── Averages and spread ────────────────────────────────────────── */

/**
 * Reads numbers separated by commas, spaces, semicolons, tabs or new lines.
 * Blanks are skipped; anything that is not a number is returned in `rejected`.
 */
export function parseNumbers(text: string): { values: number[]; rejected: string[] } {
  const values: number[] = [];
  const rejected: string[] = [];
  for (const tok of text.split(/[\s,;]+/)) {
    const t = tok.trim().replace(/[−–]/g, "-");
    if (!t) continue;
    const n = /^[-+]?(\d+\.?\d*|\.\d+)(e[-+]?\d+)?$/i.test(t) ? Number(t) : NaN;
    if (Number.isFinite(n)) values.push(n);
    else rejected.push(tok);
  }
  return { values, rejected };
}

export type Stats = {
  count: number;
  sum: number;
  mean: number;
  median: number;
  modes: number[];
  modeCount: number;
  min: number;
  max: number;
  range: number;
  sorted: number[];
  populationVariance: number;
  populationSd: number;
  /** Null with fewer than two numbers. */
  sampleVariance: number | null;
  sampleSd: number | null;
  /** Null unless every number is above zero. */
  geometricMean: number | null;
  /** Null unless every number is above zero. */
  harmonicMean: number | null;
};

export function median(sorted: number[]): number {
  const n = sorted.length;
  if (n === 0) return 0;
  return n % 2 ? sorted[(n - 1) / 2] : (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
}

/** Every summary statistic for a list. An empty list gives zeros. */
export function describe(values: number[]): Stats {
  const xs = values.filter(Number.isFinite);
  const sorted = [...xs].sort((a, b) => a - b);
  const count = xs.length;
  const sum = xs.reduce((a, b) => a + b, 0);
  const mean = count ? sum / count : 0;
  const counts = new Map<number, number>();
  for (const x of sorted) counts.set(x, (counts.get(x) ?? 0) + 1);
  const top = Math.max(0, ...counts.values());
  const modes = top > 1 ? [...counts].filter(([, c]) => c === top).map(([x]) => x) : [];
  const ss = xs.reduce((a, x) => a + (x - mean) ** 2, 0);
  const allPositive = count > 0 && xs.every((x) => x > 0);
  return {
    count,
    sum,
    mean,
    median: median(sorted),
    modes,
    modeCount: top > 1 ? top : 0,
    min: count ? sorted[0] : 0,
    max: count ? sorted[count - 1] : 0,
    range: count ? sorted[count - 1] - sorted[0] : 0,
    sorted,
    populationVariance: count ? ss / count : 0,
    populationSd: count ? Math.sqrt(ss / count) : 0,
    sampleVariance: count > 1 ? ss / (count - 1) : null,
    sampleSd: count > 1 ? Math.sqrt(ss / (count - 1)) : null,
    geometricMean: allPositive ? Math.exp(xs.reduce((a, x) => a + Math.log(x), 0) / count) : null,
    harmonicMean: allPositive ? count / xs.reduce((a, x) => a + 1 / x, 0) : null,
  };
}

/**
 * Weighted mean: Σ(value × weight) ÷ Σ weight. Uses pairs up to the shorter
 * list; null if the weights add up to zero.
 */
export function weightedMean(values: number[], weights: number[]): { mean: number | null; pairs: number; totalWeight: number } {
  const pairs = Math.min(values.length, weights.length);
  let sw = 0;
  let swx = 0;
  for (let i = 0; i < pairs; i++) {
    sw += weights[i];
    swx += values[i] * weights[i];
  }
  return { mean: sw !== 0 ? swx / sw : null, pairs, totalWeight: sw };
}

/* ── GPA and grades ─────────────────────────────────────────────── */

export const LETTERS = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F"] as const;
export type Letter = (typeof LETTERS)[number];

/** The common US 4.0 scale. Some schools give A+ 4.33; schools set their own. */
export const GRADE_POINTS: Record<Letter, number> = {
  "A+": 4.0, A: 4.0, "A-": 3.7, "B+": 3.3, B: 3.0, "B-": 2.7, "C+": 2.3, C: 2.0, "C-": 1.7, "D+": 1.3, D: 1.0, "D-": 0.7, F: 0,
};

export type CourseLevel = "regular" | "honors" | "ap";
export type Course = { grade: Letter; credits: number; level?: CourseLevel };
export type GpaOptions = { aPlus?: number; honorsBonus?: number; apBonus?: number };

/** Unweighted and weighted GPA. Bonuses are added only to passing grades. */
export function gpa(courses: Course[], opts: GpaOptions = {}): { unweighted: number; weighted: number; credits: number; points: number; weightedPoints: number } {
  const aPlus = opts.aPlus ?? 4.0;
  const hb = opts.honorsBonus ?? 0.5;
  const ab = opts.apBonus ?? 1.0;
  let credits = 0;
  let points = 0;
  let wpoints = 0;
  for (const c of courses) {
    const cr = Math.max(0, fin(c.credits));
    if (cr === 0) continue;
    const base = c.grade === "A+" ? aPlus : GRADE_POINTS[c.grade];
    const bonus = base > 0 ? (c.level === "ap" ? ab : c.level === "honors" ? hb : 0) : 0;
    credits += cr;
    points += base * cr;
    wpoints += (base + bonus) * cr;
  }
  return { unweighted: credits ? points / credits : 0, weighted: credits ? wpoints / credits : 0, credits, points, weightedPoints: wpoints };
}

/** Cumulative GPA from the GPA and credits so far plus this term. */
export function cumulativeGpa(prevGpa: number, prevCredits: number, termGpa: number, termCredits: number): number {
  const total = Math.max(0, prevCredits) + Math.max(0, termCredits);
  return total > 0 ? (prevGpa * Math.max(0, prevCredits) + termGpa * Math.max(0, termCredits)) / total : 0;
}

/** The term GPA needed over `termCredits` to reach `target` overall. May be above 4 (out of reach). */
export function termGpaNeeded(prevGpa: number, prevCredits: number, target: number, termCredits: number): number | null {
  if (termCredits <= 0) return null;
  return (target * (prevCredits + termCredits) - prevGpa * prevCredits) / termCredits;
}

export type Category = { weight: number; score: number };

/** Weighted course grade from categories, scaled to the weights entered. */
export function weightedGrade(cats: Category[]): { grade: number | null; weight: number } {
  const used = cats.filter((c) => c.weight > 0);
  const w = used.reduce((a, c) => a + c.weight, 0);
  return { grade: w > 0 ? used.reduce((a, c) => a + c.weight * c.score, 0) / w : null, weight: w };
}

/** Score needed on a final worth `finalWeight` per cent to finish on `target`. */
export function finalNeeded(current: number, finalWeight: number, target: number): number | null {
  const w = finalWeight / 100;
  if (w <= 0 || w > 1) return null;
  return (target - current * (1 - w)) / w;
}

/** The common US letter cut-offs (93, 90, 87…). Schools vary. */
export function letterFromPercent(p: number): Letter {
  const cuts: [number, Letter][] = [[97, "A+"], [93, "A"], [90, "A-"], [87, "B+"], [83, "B"], [80, "B-"], [77, "C+"], [73, "C"], [70, "C-"], [67, "D+"], [63, "D"], [60, "D-"]];
  for (const [c, l] of cuts) if (p >= c) return l;
  return "F";
}

/** Usual UK honours degree bands. Universities set their own rules. */
export function ukClass(p: number): string {
  if (p >= 70) return "First";
  if (p >= 60) return "Upper second (2:1)";
  if (p >= 50) return "Lower second (2:2)";
  if (p >= 40) return "Third";
  return "Below honours";
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
