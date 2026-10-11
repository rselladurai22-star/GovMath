import { describe, expect, it } from "vitest";
import {
  bmr,
  calories,
  cmFromFtIn,
  deurenbergBodyFat,
  fatAndLean,
  fatBand,
  ftInFromCm,
  ftInText,
  heightTable,
  kgFromLb,
  kgFromLbOz,
  kgFromStLb,
  lbFromKg,
  lbOzText,
  macros,
  navyBodyFat,
  stLbFromKg,
  stLbText,
  weightTable,
} from "./body";

describe("weight", () => {
  it("uses the exact pound", () => {
    expect(kgFromLb(1)).toBe(0.45359237);
    expect(kgFromStLb(1, 0)).toBeCloseTo(6.35029318, 8);
    expect(lbFromKg(100)).toBeCloseTo(220.462262, 5);
    expect(kgFromLbOz(7, 8)).toBeCloseTo(3.40194, 4);
  });
  it("splits into stones and pounds with carrying", () => {
    expect(stLbFromKg(kgFromStLb(11, 4))).toEqual({ st: 11, lb: 4 });
    // 13.97 lb rounds to 14.0 and carries into the next stone.
    expect(stLbFromKg(kgFromStLb(10, 13.97), 1)).toEqual({ st: 11, lb: 0 });
    expect(stLbText(70)).toBe("11 st 0.3 lb");
    expect(lbOzText(3.4)).toBe("7 lb 8 oz");
  });
  it("builds a half-stone table", () => {
    const t = weightTable(7, 25, 0.5);
    expect(t).toHaveLength(37);
    expect(t[1].label).toBe("7 st 7 lb");
    expect(t[t.length - 1].kg).toBeCloseTo(158.757, 3);
  });
  it("never returns NaN for odd input", () => {
    expect(kgFromLb(NaN)).toBe(0);
    expect(stLbFromKg(-5)).toEqual({ st: 0, lb: 0 });
  });
});

describe("height", () => {
  it("uses the exact inch", () => {
    expect(cmFromFtIn(6, 0)).toBeCloseTo(182.88, 10);
    expect(ftInFromCm(170)).toEqual({ ft: 5, inches: 6.9 });
    expect(ftInFromCm(182.8, 0)).toEqual({ ft: 6, inches: 0 });
    expect(ftInText(152.4)).toBe("5 ft 0 in");
  });
  it("builds 4′10″ to 6′8″", () => {
    const t = heightTable(58, 80);
    expect(t).toHaveLength(23);
    expect(t[0].label).toBe("4′10″");
    expect(t[22].cm).toBeCloseTo(203.2, 10);
  });
});

describe("calories", () => {
  const base = { sex: "female" as const, kg: 70, cm: 165, age: 35 };
  it("Mifflin-St Jeor, Harris-Benedict and Katch-McArdle", () => {
    expect(bmr({ ...base, formula: "mifflin" })).toBeCloseTo(1395.25, 2);
    expect(bmr({ ...base, sex: "male", formula: "mifflin" })).toBeCloseTo(1561.25, 2);
    expect(bmr({ ...base, formula: "harris" })).toBeCloseTo(1454.5, 1);
    expect(bmr({ ...base, formula: "katch", bodyFatPct: 30 })).toBeCloseTo(1428.4, 1);
    // Katch-McArdle falls back to Mifflin without body fat.
    expect(bmr({ ...base, formula: "katch" })).toBeCloseTo(1395.25, 2);
  });
  it("targets with the floor", () => {
    const r = calories({ ...base, formula: "mifflin", activity: "moderate", goal: "lose", rateKg: 0.5, goalKg: 65 });
    expect(r.tdee).toBeCloseTo(2162.64, 1);
    expect(r.target).toBeCloseTo(1612.64, 1);
    expect(r.weeksToGoal).toBeCloseTo(10, 5);
    const low = calories({ ...base, kg: 55, cm: 155, formula: "mifflin", activity: "sedentary", goal: "lose", rateKg: 1 });
    expect(low.floored).toBe(true);
    expect(low.target).toBe(1200);
    expect(low.fast).toBe(false);
    const gain = calories({ ...base, formula: "mifflin", activity: "light", goal: "gain", rateKg: 0.25 });
    expect(gain.target - gain.tdee).toBeCloseTo(275, 5);
  });
  it("macros", () => {
    const m = macros(2000, "balanced");
    expect(m.protein).toBe(100);
    expect(m.carbs).toBe(250);
    expect(m.fat).toBeCloseTo(66.67, 2);
  });
});

describe("body fat", () => {
  it("US Navy method", () => {
    const man = navyBodyFat({ sex: "male", heightCm: 178, neckCm: 38, waistCm: 90 });
    expect(man).toBeCloseTo(20.27, 1);
    const woman = navyBodyFat({ sex: "female", heightCm: 165, neckCm: 33, waistCm: 76, hipCm: 100 });
    expect(woman).toBeCloseTo(30.24, 1);
    expect(navyBodyFat({ sex: "male", heightCm: 178, neckCm: 40, waistCm: 38 })).toBeNull();
    expect(navyBodyFat({ sex: "female", heightCm: 165, neckCm: 33, waistCm: 76 })).toBeNull();
  });
  it("Deurenberg and bands", () => {
    expect(deurenbergBodyFat({ sex: "male", bmi: 25, age: 40 })).toBeCloseTo(23.0, 5);
    expect(deurenbergBodyFat({ sex: "female", bmi: 0, age: 40 })).toBeNull();
    expect(fatBand("male", 17.9).band).toBe("fitness");
    expect(fatBand("female", 32).band).toBe("obese");
    expect(fatBand("female", 8).below).toBe(true);
    expect(fatAndLean(80, 25)).toEqual({ fatKg: 20, leanKg: 60 });
  });
});
