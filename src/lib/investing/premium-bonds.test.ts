import { describe, it, expect } from "vitest";
import { premiumBonds, DEFAULT_PRIZE_RATE } from "./premium-bonds";

describe("premiumBonds", () => {
  it("computes expected annual prizes as rate × holding", () => {
    const r = premiumBonds({ holding: 10_000, prizeFundRate: DEFAULT_PRIZE_RATE, years: 1 });
    expect(r.expectedAnnualPrizes).toBeCloseTo(380, 2);
  });

  it("caps holding at £50,000", () => {
    const r = premiumBonds({ holding: 100_000, prizeFundRate: DEFAULT_PRIZE_RATE, years: 1 });
    expect(r.holding).toBe(50_000);
  });

  it("computes basic-rate equivalent gross yield", () => {
    const r = premiumBonds({ holding: 1000, prizeFundRate: 0.04, years: 1 });
    expect(r.basicRateEquivalent).toBeCloseTo(0.05, 4);
  });

  it("scales total over multiple years", () => {
    const r = premiumBonds({ holding: 5000, prizeFundRate: 0.04, years: 5 });
    expect(r.expectedTotal).toBeCloseTo(5000 * 0.04 * 5, 2);
  });
});
