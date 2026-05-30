import { describe, it, expect } from "vitest";
import { pensionCredit } from "./pension-credit";

describe("pensionCredit", () => {
  it("tops up to £227.10/wk for singles below threshold", () => {
    const r = pensionCredit({ household: "single", weeklyIncome: 180, capital: 5000 });
    expect(r.weeklyAward).toBeCloseTo(47.10, 2);
  });

  it("returns 0 if income already above guarantee", () => {
    const r = pensionCredit({ household: "single", weeklyIncome: 240, capital: 0 });
    expect(r.weeklyAward).toBe(0);
  });

  it("applies tariff income for capital above £10,000", () => {
    const r = pensionCredit({ household: "single", weeklyIncome: 180, capital: 12000 });
    expect(r.tariffIncome).toBe(4); // (12000-10000)/500 = 4
  });

  it("uses higher threshold for couples", () => {
    const r = pensionCredit({ household: "couple", weeklyIncome: 300, capital: 5000 });
    expect(r.threshold).toBe(346.60);
    expect(r.weeklyAward).toBeCloseTo(46.60, 2);
  });
});
