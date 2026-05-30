import { describe, it, expect } from "vitest";
import { careHomeMeansTest } from "./care-home-means";

describe("careHomeMeansTest", () => {
  it("flags full self-funder when capital ≥ £23,250", () => {
    const r = careHomeMeansTest({ capital: 30000, weeklyIncome: 200, weeklyCareCost: 900 });
    expect(r.selfFunder).toBe(true);
    expect(r.yourContribution).toBe(900);
  });

  it("uses income only when capital below £14,250", () => {
    const r = careHomeMeansTest({ capital: 10000, weeklyIncome: 250, weeklyCareCost: 700 });
    expect(r.tariffIncome).toBe(0);
    expect(r.yourContribution).toBeCloseTo(250 - 30.65, 2);
  });

  it("applies tariff income £1/wk per £250 above £14,250", () => {
    const r = careHomeMeansTest({ capital: 20000, weeklyIncome: 200, weeklyCareCost: 800 });
    expect(r.tariffIncome).toBe(Math.ceil((20000 - 14250) / 250));
  });

  it("council pays the shortfall when contribution is less than cost", () => {
    const r = careHomeMeansTest({ capital: 5000, weeklyIncome: 200, weeklyCareCost: 800 });
    expect(r.councilContribution).toBeCloseTo(800 - (200 - 30.65), 2);
  });
});
