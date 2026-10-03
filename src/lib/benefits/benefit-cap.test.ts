import { describe, it, expect } from "vitest";
import { benefitCap, housingBenefitCap } from "./benefit-cap";

describe("benefitCap", () => {
  it("doesn't reduce when benefits are below the cap", () => {
    const r = benefitCap({ household: "family", location: "elsewhere", weeklyBenefits: 300 });
    expect(r.capApplies).toBe(false);
    expect(r.weeklyReduction).toBe(0);
  });

  it("reduces weekly benefits above the family cap outside London", () => {
    const r = benefitCap({ household: "family", location: "elsewhere", weeklyBenefits: 600 });
    expect(r.capApplies).toBe(true);
    expect(r.weeklyReduction).toBeCloseTo(600 - 22020 / 52, 2);
  });

  it("uses higher London cap for families", () => {
    const r = benefitCap({ household: "family", location: "london", weeklyBenefits: 600 });
    expect(r.annualCap).toBe(25323);
  });

  it("uses single-no-children band for single applicants", () => {
    const r = benefitCap({ household: "single-no-children", location: "elsewhere", weeklyBenefits: 400 });
    expect(r.annualCap).toBe(14753);
    expect(r.capApplies).toBe(true);
  });
});

describe("housingBenefitCap", () => {
  it("takes the excess from Housing Benefit", () => {
    const r = housingBenefitCap({ household: "family", location: "elsewhere", weeklyBenefits: 500, weeklyHousingBenefit: 200 });
    expect(r.weeklyCap).toBeCloseTo(22020 / 52, 6);
    expect(r.weeklyReduction).toBeCloseTo(500 - 22020 / 52, 6);
    expect(r.housingBenefitAfter).toBeCloseTo(200 - (500 - 22020 / 52), 6);
  });
  it("leaves at least 50p of Housing Benefit", () => {
    const r = housingBenefitCap({ household: "single-no-children", location: "elsewhere", weeklyBenefits: 400, weeklyHousingBenefit: 60 });
    expect(r.housingBenefitAfter).toBeCloseTo(0.5, 6);
    expect(r.weeklyReduction).toBeCloseTo(59.5, 6);
    expect(r.unrecovered).toBeGreaterThan(0);
  });
});
