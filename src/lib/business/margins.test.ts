import { describe, expect, it } from "vitest";
import { breakEven, margin } from "./margins";

describe("margins", () => {
  it("£10 cost sold for £25 → 60% margin, 150% markup", () => {
    const m = margin(10, 25);
    expect(m.marginPct).toBeCloseTo(0.6, 4);
    expect(m.markupPct).toBeCloseTo(1.5, 4);
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
