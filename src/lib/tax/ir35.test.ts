import { describe, expect, it } from "vitest";
import { insideIR35, outsideIR35 } from "./ir35";

describe("insideIR35", () => {
  it("leaves room for employer NI and the levy inside the assignment income", () => {
    const r = insideIR35({ dayRate: 500, days: 220, umbrellaWeekly: 25 });
    const g = r.grossSalary;
    const costs = 0.15 * (g - 5000) + 0.005 * g;
    expect(g + costs + r.margin).toBeCloseTo(110_000, 2);
    expect(r.takeHome).toBeGreaterThan(55_000);
    expect(r.takeHome).toBeLessThan(67_000);
  });
});

describe("outsideIR35", () => {
  it("pays £12,570 salary, corporation tax and dividends", () => {
    const r = outsideIR35({ dayRate: 500, days: 220 });
    expect(r.salary).toBe(12_570);
    expect(r.employerNI).toBeCloseTo((12_570 - 5_000) * 0.15, 6);
    expect(r.profit).toBeCloseTo(110_000 - 12_570 - 1_135.5, 6);
    expect(r.takeHome).toBeGreaterThan(insideIR35({ dayRate: 500, days: 220 }).takeHome);
  });
  it("lets expenses reduce profit", () => {
    const a = outsideIR35({ dayRate: 400, days: 200 });
    const b = outsideIR35({ dayRate: 400, days: 200, expenses: 5_000 });
    expect(b.profit).toBeCloseTo(a.profit - 5_000, 6);
  });
});
