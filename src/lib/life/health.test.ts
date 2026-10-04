import { describe, expect, it } from "vitest";
import { bestPrescriptionPlan, bmiAdult, cmFromFtIn, healthyStartEligible, healthyStartOver, kgFromStLb, ppcBreakEven, PRESCRIPTION, prescriptionPlans, stLbFromKg, waistToHeight } from "./health";

describe("BMI", () => {
  it("calculates and bands", () => {
    const r = bmiAdult(175, 70);
    expect(r.bmi).toBeCloseTo(22.857, 3);
    expect(r.category).toBe("healthy");
    expect(r.toHealthyKg).toBe(0);
    expect(bmiAdult(175, 70, true).category).toBe("healthy");
    expect(bmiAdult(175, 75, true).category).toBe("overweight");
    expect(bmiAdult(175, 95).category).toBe("obese1");
  });
  it("healthy range and change needed", () => {
    const r = bmiAdult(175, 90);
    expect(r.healthyMinKg).toBeCloseTo(18.5 * 1.75 * 1.75, 6);
    expect(r.healthyMaxKg).toBeCloseTo(24.9 * 1.75 * 1.75, 6);
    expect(r.toHealthyKg).toBeCloseTo(24.9 * 1.75 * 1.75 - 90, 6);
  });
  it("waist-to-height and units", () => {
    expect(waistToHeight(85, 175).band).toBe("healthy");
    expect(waistToHeight(95, 175).band).toBe("increased");
    expect(cmFromFtIn(5, 9)).toBeCloseTo(175.26, 2);
    expect(kgFromStLb(11, 0)).toBeCloseTo(69.85, 2);
    expect(stLbFromKg(69.85)).toEqual({ st: 11, lb: 0 });
  });
});

describe("Healthy Start", () => {
  it("eligibility", () => {
    expect(healthyStartEligible({ ucLowEarnings: true, otherBenefit: false, esa: false, under18: false, pregnant: false, hasChildUnder4: true })).toBe(true);
    expect(healthyStartEligible({ ucLowEarnings: false, otherBenefit: false, esa: false, under18: true, pregnant: true, hasChildUnder4: false })).toBe(true);
    expect(healthyStartEligible({ ucLowEarnings: false, otherBenefit: false, esa: true, under18: false, pregnant: false, hasChildUnder4: true })).toBe(false);
  });
  it("a year's payments", () => {
    expect(healthyStartOver(52, [24], 0).total).toBeCloseTo(52 * 4.65, 6);
    expect(healthyStartOver(52, [0], 0).total).toBeCloseTo(52 * 9.3, 6);
    const r = healthyStartOver(52, [], 12);
    expect(r.weekly[0]).toBe(4.65);
    expect(r.weekly[28]).toBe(9.3);
  });
  it("from 10 weeks pregnant to the 4th birthday", () => {
    expect(healthyStartOver(30 + 52 * 4, [], 10).total).toBeCloseTo(30 * 4.65 + 52 * 9.3 + 156 * 4.65, 6);
  });
});

describe("prescriptions", () => {
  it("break-evens", () => {
    expect(ppcBreakEven(PRESCRIPTION.ppc3)).toBe(4);
    expect(ppcBreakEven(PRESCRIPTION.ppc12)).toBe(12);
  });
  it("best plan", () => {
    expect(bestPrescriptionPlan(0.5).key).toBe("payg");
    expect(bestPrescriptionPlan(2).key).toBe("ppc12");
    expect(bestPrescriptionPlan(0, 1).key).toBe("hrt-mix");
    expect(prescriptionPlans(2)[0].annual).toBeCloseTo(237.6, 6);
  });
});
