import { describe, expect, it } from "vitest";
import { bmi } from "./bmi";

describe("BMI", () => {
  it("180cm, 75kg = ~23.1 healthy", () => {
    const r = bmi({ heightCm: 180, weightKg: 75 });
    expect(r.bmi).toBeCloseTo(23.15, 1);
    expect(r.category).toBe("healthy");
  });
  it("classifies obese", () => {
    expect(bmi({ heightCm: 170, weightKg: 100 }).category).toBe("obese");
  });
  it("lower thresholds for higher-risk", () => {
    expect(bmi({ heightCm: 170, weightKg: 68, higherRiskBackground: true }).category).toBe("overweight");
  });
});
