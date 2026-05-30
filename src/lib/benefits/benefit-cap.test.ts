import { describe, it, expect } from "vitest";
import { benefitCap } from "./benefit-cap";

describe("benefitCap", () => {
  it("doesn't reduce when benefits are below the cap", () => {
    const r = benefitCap({ household: "family", location: "elsewhere", weeklyBenefits: 300 });
    expect(r.capApplies).toBe(false);
    expect(r.weeklyReduction).toBe(0);
  });

  it("reduces weekly benefits above the family cap outside London", () => {
    const r = benefitCap({ household: "family", location: "elsewhere", weeklyBenefits: 600 });
    expect(r.capApplies).toBe(true);
    expect(r.weeklyReduction).toBeCloseTo(600 - 24496.32 / 52, 2);
  });

  it("uses higher London cap for families", () => {
    const r = benefitCap({ household: "family", location: "london", weeklyBenefits: 600 });
    expect(r.annualCap).toBe(28116.72);
  });

  it("uses single-no-children band for single applicants", () => {
    const r = benefitCap({ household: "single-no-children", location: "elsewhere", weeklyBenefits: 400 });
    expect(r.annualCap).toBe(16395.66);
    expect(r.capApplies).toBe(true);
  });
});
