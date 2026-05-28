import { describe, it, expect } from "vitest";
import { capitalGainsTax } from "./cgt";

describe("capitalGainsTax", () => {
  it("applies £3k AEA", () => {
    const r = capitalGainsTax({ gain: 3000, taxableIncome: 0, assetType: "other" });
    expect(r.taxableGain).toBe(0);
    expect(r.totalTax).toBe(0);
  });

  it("taxes basic-rate gains at 18%", () => {
    const r = capitalGainsTax({ gain: 10_000, taxableIncome: 20_000, assetType: "other" });
    expect(r.taxableGain).toBe(7000);
    expect(r.totalTax).toBeCloseTo(1260, 0);
  });

  it("splits across basic/higher when income high", () => {
    const r = capitalGainsTax({ gain: 50_000, taxableIncome: 37_000, assetType: "property" });
    expect(r.basicRateGain).toBe(700);
    expect(r.higherRateGain).toBe(50_000 - 3000 - 700);
  });

  it("all higher-rate when income above threshold", () => {
    const r = capitalGainsTax({ gain: 10_000, taxableIncome: 60_000, assetType: "other" });
    expect(r.higherRateGain).toBe(7000);
    expect(r.totalTax).toBeCloseTo(1680, 0);
  });
});
