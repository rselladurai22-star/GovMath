import { describe, expect, it } from "vitest";
import { AVERAGE_PRIZE, PREMIUM_BONDS, premiumBondsYear } from "./growth";

describe("Premium Bonds", () => {
  it("prize table matches the published rate", () => {
    expect((12 * AVERAGE_PRIZE) / PREMIUM_BONDS.odds).toBeCloseTo(0.0435, 3);
  });
  it("simulated year", () => {
    const r = premiumBondsYear(50_000);
    expect(r.expected).toBeCloseTo(2_175, 6);
    expect(r.chanceAnyWin).toBeGreaterThan(0.99);
    expect(r.median).toBeLessThan(r.expected);
    const small = premiumBondsYear(1_000);
    expect(small.chanceAnyWin).toBeCloseTo(1 - Math.exp(-12_000 / 21_000), 6);
  });
});
