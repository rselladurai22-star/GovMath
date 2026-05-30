import { describe, it, expect } from "vitest";
import { smallBusinessRates } from "./small-business-rates";

describe("smallBusinessRates", () => {
  it("gives 100% relief at RV £12,000 or below", () => {
    const r = smallBusinessRates({ rateableValue: 12000, onlyProperty: true });
    expect(r.reliefPercent).toBe(100);
    expect(r.payable).toBe(0);
  });

  it("tapers relief between £12,001 and £14,999", () => {
    const r = smallBusinessRates({ rateableValue: 13500, onlyProperty: true });
    // (15000 - 13500) / 3000 = 0.5 → 50%
    expect(r.reliefPercent).toBe(50);
  });

  it("uses small multiplier 49.9p up to RV £50,999", () => {
    const r = smallBusinessRates({ rateableValue: 30000, onlyProperty: false });
    expect(r.multiplier).toBe(0.499);
    expect(r.grossRates).toBeCloseTo(30000 * 0.499, 2);
    expect(r.payable).toBeCloseTo(r.grossRates, 2);
  });

  it("uses standard multiplier 54.6p at RV £51,000+", () => {
    const r = smallBusinessRates({ rateableValue: 60000, onlyProperty: false });
    expect(r.multiplier).toBe(0.546);
  });

  it("denies relief if applicant has other properties", () => {
    const r = smallBusinessRates({ rateableValue: 11000, onlyProperty: false });
    expect(r.reliefPercent).toBe(0);
  });
});
