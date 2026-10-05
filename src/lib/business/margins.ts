/**
 * Generic small-business margin helpers.
 *
 *   margin    = (price - cost) / price       (as % of selling price)
 *   markup    = (price - cost) / cost        (as % of cost price)
 *   breakeven = fixed costs / (price - varCost per unit)
 */

export type MarginResult = {
  cost: number;
  price: number;
  profit: number;
  marginPct: number;
  markupPct: number;
};

export function margin(cost: number, price: number): MarginResult {
  const c = Math.max(0, cost);
  const p = Math.max(0, price);
  const profit = p - c;
  return {
    cost: c,
    price: p,
    profit,
    marginPct: p > 0 ? profit / p : 0,
    markupPct: c > 0 ? profit / c : 0,
  };
}

export type BreakEvenInput = {
  fixedCosts: number;
  pricePerUnit: number;
  variableCostPerUnit: number;
};

export type BreakEvenResult = {
  contributionPerUnit: number;
  units: number;
  revenue: number;
};

export function breakEven(input: BreakEvenInput): BreakEvenResult {
  const contribution = input.pricePerUnit - input.variableCostPerUnit;
  if (contribution <= 0) {
    return { contributionPerUnit: contribution, units: Infinity, revenue: Infinity };
  }
  const units = input.fixedCosts / contribution;
  return {
    contributionPerUnit: contribution,
    units,
    revenue: units * input.pricePerUnit,
  };
}

/* ── Flagship pricing helpers ─────────────────────────────── */

export type MarginStudyInput = {
  /** Selling price per unit, as entered. */
  price: number;
  /** Direct cost per unit (ex-VAT if you are VAT-registered). */
  cost: number;
  /** True when `price` already includes VAT. */
  priceIncVat: boolean;
  /** VAT rate on the sale, e.g. 0.2. 0 when not VAT-registered. */
  vatRate: number;
  /** Units sold a year (for totals). */
  units: number;
  /** Overheads a year: rent, wages, software, insurance. */
  overheads: number;
};

export type MarginStudy = MarginResult & {
  /** Price before VAT: the part of the price you keep. */
  netPrice: number;
  vat: number;
  /** What the customer pays. */
  grossPrice: number;
  units: number;
  revenue: number;
  grossProfit: number;
  overheads: number;
  netProfit: number;
  /** Net profit as a share of revenue (ex-VAT). */
  netMarginPct: number;
  /** Units needed for gross profit to cover overheads. Infinity if each sale loses money. */
  breakEvenUnits: number;
};

/** Margin, markup and annual totals from a price and a cost. Margin is always on the ex-VAT price. */
export function marginStudy(i: MarginStudyInput): MarginStudy {
  const rate = Math.max(0, i.vatRate);
  const entered = Math.max(0, i.price);
  const netPrice = i.priceIncVat ? entered / (1 + rate) : entered;
  const grossPrice = netPrice * (1 + rate);
  const m = margin(i.cost, netPrice);
  const units = Math.max(0, i.units);
  const overheads = Math.max(0, i.overheads);
  const revenue = netPrice * units;
  const grossProfit = m.profit * units;
  const netProfit = grossProfit - overheads;
  return {
    ...m,
    netPrice,
    vat: grossPrice - netPrice,
    grossPrice,
    units,
    revenue,
    grossProfit,
    overheads,
    netProfit,
    netMarginPct: revenue > 0 ? netProfit / revenue : 0,
    breakEvenUnits: m.profit > 0 ? overheads / m.profit : Infinity,
  };
}

export type DiscountImpact = {
  discount: number;
  price: number;
  profit: number;
  marginPct: number;
  /** Extra sales needed to earn the same gross profit, e.g. 0.5 = 50% more. Infinity if a sale no longer makes a profit. */
  extraSalesNeeded: number;
};

/** What a price cut does to margin, and how many more sales it needs to break even on gross profit. */
export function discountImpact(netPrice: number, cost: number, discount: number): DiscountImpact {
  const d = Math.min(1, Math.max(0, discount));
  const price = netPrice * (1 - d);
  const before = netPrice - cost;
  const profit = price - cost;
  return {
    discount: d,
    price,
    profit,
    marginPct: price > 0 ? profit / price : 0,
    extraSalesNeeded: profit > 0 && before > 0 ? before / profit - 1 : Infinity,
  };
}

export type PriceEnding = "none" | "99" | "95" | "whole";

/** Round a price up to the next 99p, 95p or whole-pound ending. */
export function roundPriceUp(price: number, ending: PriceEnding): number {
  const pence = Math.round(price * 100);
  if (ending === "none" || pence <= 0) return pence / 100;
  if (ending === "whole") return Math.ceil(pence / 100);
  const end = ending === "99" ? 99 : 95;
  let pounds = Math.floor(pence / 100);
  if (pounds * 100 + end < pence) pounds += 1;
  return (pounds * 100 + end) / 100;
}

export type TargetPriceInput = {
  /** Cost of the item. */
  cost: number;
  /** Extra cost per sale: postage, packaging. */
  extraCost: number;
  mode: "margin" | "markup";
  /** Target as a fraction, e.g. 0.4. */
  target: number;
  /** Card, marketplace or platform fee, as a share of what the customer pays. */
  feePct: number;
  /** VAT added to the shelf price. 0 when not VAT-registered. */
  vatRate: number;
  ending: PriceEnding;
};

export type TargetPrice = {
  unitCost: number;
  /** Price before VAT that hits the target exactly. */
  exactNet: number;
  /** Shelf price after rounding, including any VAT. */
  shelf: number;
  /** Price before VAT after rounding. */
  net: number;
  vat: number;
  fee: number;
  profit: number;
  marginPct: number;
  markupPct: number;
  /** False when fees and the target margin leave nothing to cover the cost. */
  possible: boolean;
};

/**
 * The selling price that hits a target margin or markup after fees and VAT.
 *
 *   profit = net − cost − fee,  fee = feePct × net × (1 + VAT)
 *   margin target m:  net = cost ÷ (1 − m − feePct × (1 + VAT))
 *   markup target k:  net = cost × (1 + k) ÷ (1 − feePct × (1 + VAT))
 */
export function priceForTarget(i: TargetPriceInput): TargetPrice {
  const unitCost = Math.max(0, i.cost) + Math.max(0, i.extraCost);
  const v = Math.max(0, i.vatRate);
  const f = Math.max(0, i.feePct) * (1 + v);
  const t = Math.max(0, i.target);
  const denom = i.mode === "margin" ? 1 - t - f : 1 - f;
  const possible = denom > 0.0001;
  const exactNet = possible ? (i.mode === "margin" ? unitCost / denom : (unitCost * (1 + t)) / denom) : 0;
  const shelf = possible ? roundPriceUp(exactNet * (1 + v), i.ending) : 0;
  const net = shelf / (1 + v);
  const fee = Math.max(0, i.feePct) * shelf;
  const profit = net - unitCost - fee;
  return {
    unitCost,
    exactNet,
    shelf,
    net,
    vat: shelf - net,
    fee,
    profit,
    marginPct: net > 0 ? profit / net : 0,
    markupPct: unitCost > 0 ? profit / unitCost : 0,
    possible,
  };
}

/** Margin ↔ markup conversions. */
export const marginFromMarkup = (k: number) => (k <= -1 ? 0 : k / (1 + k));
export const markupFromMargin = (m: number) => (m >= 1 ? Infinity : m / (1 - m));

export type BreakEvenStudyInput = BreakEvenInput & {
  /** Profit you want a year on top of breaking even. */
  targetProfit: number;
  /** Units you expect to sell a year (for the margin of safety). 0 to skip. */
  expectedUnits: number;
};

export type BreakEvenStudy = BreakEvenResult & {
  /** Contribution as a share of price. */
  contributionRatio: number;
  unitsForTarget: number;
  revenueForTarget: number;
  expectedUnits: number;
  profitAtExpected: number;
  /** (expected − break-even) ÷ expected. Negative when below break-even. */
  marginOfSafety: number;
};

export function breakEvenStudy(i: BreakEvenStudyInput): BreakEvenStudy {
  const base = breakEven(i);
  const c = base.contributionPerUnit;
  const ok = c > 0;
  const fixed = Math.max(0, i.fixedCosts);
  const target = Math.max(0, i.targetProfit);
  const expected = Math.max(0, i.expectedUnits);
  const unitsForTarget = ok ? (fixed + target) / c : Infinity;
  return {
    ...base,
    contributionRatio: i.pricePerUnit > 0 ? c / i.pricePerUnit : 0,
    unitsForTarget,
    revenueForTarget: ok ? unitsForTarget * i.pricePerUnit : Infinity,
    expectedUnits: expected,
    profitAtExpected: expected * c - fixed,
    marginOfSafety: ok && expected > 0 ? (expected - base.units) / expected : 0,
  };
}
