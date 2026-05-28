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

/** Solve for selling price given a target margin %. */
export function priceFromMargin(cost: number, targetMarginPct: number): number {
  const m = Math.min(0.999, Math.max(0, targetMarginPct));
  return cost / (1 - m);
}

/** Solve for selling price given a target markup %. */
export function priceFromMarkup(cost: number, targetMarkupPct: number): number {
  return cost * (1 + Math.max(0, targetMarkupPct));
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
