import { describe, expect, it } from "vitest";
import { ucTaper } from "./uc-taper";

describe("UC taper", () => {
  it("below work allowance: full UC", () => {
    const r = ucTaper({ monthlyMaxUC: 800, netMonthlyEarnings: 300, receivingHousingElement: true });
    expect(r.finalUC).toBe(800);
  });
  it("£1000 earnings, no housing: WA 684, taper on 316 × 55% = 173.80", () => {
    const r = ucTaper({ monthlyMaxUC: 400, netMonthlyEarnings: 1000, receivingHousingElement: false });
    expect(r.taperReduction).toBeCloseTo(173.8, 2);
    expect(r.finalUC).toBeCloseTo(400 - 173.8, 2);
  });
  it("clamps at zero", () => {
    expect(ucTaper({ monthlyMaxUC: 100, netMonthlyEarnings: 5000, receivingHousingElement: true }).finalUC).toBe(0);
  });
});
