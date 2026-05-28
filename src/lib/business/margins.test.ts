import { describe, expect, it } from "vitest";
import { breakEven, margin, priceFromMargin, priceFromMarkup } from "./margins";

describe("margins", () => {
  it("£10 cost sold for £25 → 60% margin, 150% markup", () => {
    const m = margin(10, 25);
    expect(m.marginPct).toBeCloseTo(0.6, 4);
    expect(m.markupPct).toBeCloseTo(1.5, 4);
  });
  it("price from 40% margin on £30 cost = £50", () => {
    expect(priceFromMargin(30, 0.4)).toBeCloseTo(50, 4);
  });
  it("price from 100% markup on £20 = £40", () => {
    expect(priceFromMarkup(20, 1.0)).toBeCloseTo(40, 4);
  });
});

describe("break-even", () => {
  it("standard case", () => {
    const r = breakEven({ fixedCosts: 10_000, pricePerUnit: 25, variableCostPerUnit: 15 });
    expect(r.units).toBe(1000);
    expect(r.revenue).toBe(25_000);
  });
  it("non-positive contribution = infinite", () => {
    expect(breakEven({ fixedCosts: 1000, pricePerUnit: 10, variableCostPerUnit: 12 }).units).toBe(Infinity);
  });
});
