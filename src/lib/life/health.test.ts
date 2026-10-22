import { describe, expect, it } from "vitest";
import {
  bestPrescriptionPlan,
  bmiAdult,
  bmiShown,
  bmiWeightRange,
  cmFromFtIn,
  healthyStartEligible,
  healthyStartOver,
  KG_PER_LB,
  kgFromStLb,
  prescriptionPlans,
  stLbFromKg,
  waistToHeight,
} from "./health";

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
  it("170 cm and 72 kg: healthy, top of the range 72.2 kg, nothing to change", () => {
    const r = bmiAdult(170, 72);
    expect(r.bmi).toBeCloseTo(24.913, 3);
    expect(r.bmiShown).toBe(24.9);
    expect(r.category).toBe("healthy");
    expect(r.healthyMinKg).toBe(53.5);
    expect(r.healthyMaxKg).toBe(72.2);
    expect(r.toHealthyKg).toBe(0);
    // The same limits as the "BMI ranges for your height" table.
    expect(bmiWeightRange(170, 18.5, 25)).toEqual({ minKg: 53.5, maxKg: 72.2 });
    // Each limit shown is itself healthy; 0.1 kg outside it is not.
    expect(bmiAdult(170, 72.2).category).toBe("healthy");
    expect(bmiAdult(170, 72.3).category).toBe("overweight");
    expect(bmiAdult(170, 53.5).category).toBe("healthy");
    expect(bmiAdult(170, 53.4).category).toBe("underweight");
  });
  it("exact boundaries belong to the higher range", () => {
    // 64 kg at 160 cm is exactly 25.0 (floating point gives 24.999999999999996).
    const r = bmiAdult(160, 64);
    expect(r.bmi).toBe(25);
    expect(r.bmiShown).toBe(25);
    expect(r.category).toBe("overweight");
    expect(r.healthyMaxKg).toBe(63.9);
    expect(r.toHealthyKg).toBeCloseTo(-0.1, 9);
    expect(bmiAdult(160, 63.9).category).toBe("healthy");
    expect(bmiAdult(170, 72.25).category).toBe("overweight");
    // 47.36 kg at 160 cm is exactly 18.5: healthy.
    expect(bmiAdult(160, 47.36).bmi).toBe(18.5);
    expect(bmiAdult(160, 47.36).category).toBe("healthy");
    expect(bmiAdult(160, 47.36).toHealthyKg).toBe(0);
  });
  it("the BMI shown is never rounded up into the next range", () => {
    const top = bmiAdult(170, 72.2); // 24.98
    expect(top.category).toBe("healthy");
    expect(top.bmiShown).toBe(24.9);
    const low = bmiAdult(170, 53.4); // 18.48
    expect(low.category).toBe("underweight");
    expect(low.bmiShown).toBe(18.4);
    expect(bmiAdult(175, 70).bmiShown).toBe(22.9); // ordinary rounding elsewhere
    expect(bmiShown(29.97)).toBe(29.9);
    expect(bmiShown(30)).toBe(30);
    expect(bmiShown(22.96, bmiAdult(170, 66, true).thresholds)).toBe(22.9);
  });
  it("overweight: lose enough to reach the top of the range shown", () => {
    const r = bmiAdult(175, 90);
    expect(r.bmiShown).toBe(29.4);
    expect(r.category).toBe("overweight");
    expect(r.healthyMinKg).toBe(56.7);
    expect(r.healthyMaxKg).toBe(76.5);
    expect(r.toHealthyKg).toBeCloseTo(-13.5, 9);
    expect(bmiAdult(175, 90 + r.toHealthyKg).category).toBe("healthy");
  });
  it("underweight: gain enough to reach the bottom of the range shown", () => {
    const r = bmiAdult(175, 50);
    expect(r.bmiShown).toBe(16.3);
    expect(r.category).toBe("underweight");
    expect(r.toHealthyKg).toBeCloseTo(6.7, 9);
    expect(bmiAdult(175, 50 + r.toHealthyKg).category).toBe("healthy");
    // Just under the range: 0.1 kg, never 0.0.
    expect(bmiAdult(170, 53.4).toHealthyKg).toBeCloseTo(0.1, 9);
    expect(bmiAdult(170, 72.3).toHealthyKg).toBeCloseTo(-0.1, 9);
  });
  it("lower thresholds follow the same rules", () => {
    const r = bmiAdult(170, 66.4, true);
    expect(r.category).toBe("healthy");
    expect(r.healthyMaxKg).toBe(66.4);
    expect(r.toHealthyKg).toBe(0);
    expect(bmiAdult(170, 66.5, true).category).toBe("overweight");
    expect(bmiAdult(170, 66.5, true).toHealthyKg).toBeCloseTo(-0.1, 9);
    expect(bmiAdult(160, 58.88, true).bmi).toBe(23);
    expect(bmiAdult(160, 58.88, true).category).toBe("overweight");
    expect(bmiWeightRange(170, 23, 27.5)).toEqual({ minKg: 66.5, maxKg: 79.4 });
  });
  it("pounds and stones: whole pounds, rounded inwards", () => {
    const h = cmFromFtIn(5, 7);
    const r = bmiAdult(h, kgFromStLb(11, 5), false, KG_PER_LB);
    expect(r.bmiShown).toBe(24.9);
    expect(r.category).toBe("healthy");
    // Exact limits are 118.1 lb and 159.6 lb.
    expect(r.healthyMinKg / KG_PER_LB).toBeCloseTo(119, 9);
    expect(r.healthyMaxKg / KG_PER_LB).toBeCloseTo(159, 9);
    expect(stLbFromKg(r.healthyMinKg)).toEqual({ st: 8, lb: 7 });
    expect(stLbFromKg(r.healthyMaxKg)).toEqual({ st: 11, lb: 5 });
    const over = bmiAdult(h, 160 * KG_PER_LB, false, KG_PER_LB);
    expect(over.category).toBe("overweight");
    expect(over.toHealthyKg / KG_PER_LB).toBeCloseTo(-1, 9);
    const under = bmiAdult(h, 118 * KG_PER_LB, false, KG_PER_LB);
    expect(under.category).toBe("underweight");
    expect(under.toHealthyKg / KG_PER_LB).toBeCloseTo(1, 9);
  });
  it("limits and changes agree with the category at every height", () => {
    const bad: string[] = [];
    const check = (ok: boolean, what: string) => {
      if (!ok) bad.push(what);
    };
    for (const step of [0.1, KG_PER_LB]) {
      for (const lower of [false, true]) {
        for (let h = 140; h <= 210; h += 0.5) {
          const { healthyMinKg: lo, healthyMaxKg: hi } = bmiAdult(h, 60, lower, step);
          const at = `${h} cm, step ${step}, lower ${lower}`;
          check(bmiAdult(h, lo, lower).category === "healthy", `${at}: min`);
          check(bmiAdult(h, hi, lower).category === "healthy", `${at}: max`);
          check(bmiAdult(h, lo - step, lower).category === "underweight", `${at}: below min`);
          check(bmiAdult(h, hi + step, lower).category === "overweight", `${at}: above max`);
          for (let w = 30; w <= 160; w += 0.7) {
            const r = bmiAdult(h, w, lower, step);
            if (r.category === "healthy") check(r.toHealthyKg === 0, `${at}, ${w} kg: change`);
            else {
              check(Math.abs(r.toHealthyKg) >= step - 1e-9, `${at}, ${w} kg: under a step`);
              check(Math.sign(r.toHealthyKg) === (r.category === "underweight" ? 1 : -1), `${at}, ${w} kg: sign`);
              check(bmiAdult(h, w + r.toHealthyKg, lower).category === "healthy", `${at}, ${w} kg: lands healthy`);
            }
          }
        }
      }
    }
    expect(bad).toEqual([]);
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
  it("best plan", () => {
    expect(bestPrescriptionPlan(0.5).key).toBe("payg");
    expect(bestPrescriptionPlan(2).key).toBe("ppc12");
    expect(bestPrescriptionPlan(0, 1).key).toBe("hrt-mix");
    expect(prescriptionPlans(2)[0].annual).toBeCloseTo(237.6, 6);
  });
});
