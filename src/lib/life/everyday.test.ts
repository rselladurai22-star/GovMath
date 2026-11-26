import { describe, expect, it } from "vitest";
import { proRataRent, weeklyToMonthlyRent } from "./everyday";

describe("pro-rata rent", () => {
  it("annual method", () => {
    const r = proRataRent(1200, "2026-10-20", "2026-10-31", "annual");
    expect(r.days).toBe(12);
    expect(r.dailyRate).toBeCloseTo((1200 * 12) / 365, 9);
    expect(r.amount).toBeCloseTo(((1200 * 12) / 365) * 12, 9);
  });
  it("month method", () => {
    const r = proRataRent(1200, "2027-02-15", "2027-02-28", "month");
    expect(r.days).toBe(14);
    expect(r.amount).toBeCloseTo(600, 9);
  });
  it("weekly to monthly", () => {
    expect(weeklyToMonthlyRent(300)).toBe(1300);
  });
});
