import { describe, expect, it } from "vitest";
import { bonusOutcome } from "./bonus";

describe("bonusOutcome", () => {
  it("basic-rate earner keeps 72% after 20% tax and 8% NI", () => {
    const r = bonusOutcome({ salary: 30_000, bonus: 1_000 });
    expect(r.tax).toBeCloseTo(200, 2);
    expect(r.ni).toBeCloseTo(80, 2);
    expect(r.kept).toBeCloseTo(720, 2);
  });

  it("charges 2% NI on the part of the bonus month above the monthly upper limit", () => {
    const r = bonusOutcome({ salary: 36_000, bonus: 5_000 });
    expect(r.ni).toBeCloseTo((4189 - 3000) * 0.08 + (8000 - 4189) * 0.02, 2);
  });

  it("taxes a bonus that crosses £100k at the 60% trap rate", () => {
    const r = bonusOutcome({ salary: 100_000, bonus: 10_000 });
    expect(r.tax).toBeCloseTo(6_000, 0);
  });

  it("sends the pension share of a bonus past tax", () => {
    const r = bonusOutcome({ salary: 30_000, bonus: 1_000, bonusToPension: 1_000 });
    expect(r.cashBonus).toBe(0);
    expect(r.kept).toBe(0);
    expect(r.tax).toBe(0);
  });

  it("applies student loan on the bonus month using the monthly threshold", () => {
    const r = bonusOutcome({ salary: 30_000, bonus: 2_000, plan: "plan2" });
    const monthly = 30_000 / 12;
    const threshold = 29_385 / 12;
    expect(r.studentLoan).toBeCloseTo((monthly + 2000 - threshold) * 0.09 - (monthly - threshold) * 0.09, 2);
  });

  it("uses Scottish bands when asked", () => {
    const r = bonusOutcome({ salary: 45_000, bonus: 1_000, region: "scotland" });
    expect(r.tax).toBeCloseTo(420, 2);
  });
});
