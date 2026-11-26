import { describe, expect, it } from "vitest";
import { monthlyToWeeklyRent, proRataRent, weeklyToMonthlyRent } from "./everyday";

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
  it("February: 28 days in the month method, so half of February is half the rent", () => {
    const r = proRataRent(1000, "2027-02-01", "2027-02-14", "month");
    expect(r.periodDays).toBe(28);
    expect(r.amount).toBeCloseTo(500, 9);
    // The annual method charges the same daily rate in every month.
    expect(proRataRent(1000, "2027-02-01", "2027-02-14", "annual").amount).toBeCloseTo(((1000 * 12) / 365) * 14, 9);
  });
  it("leap year: 366 days in the annual method, 29 in February", () => {
    const a = proRataRent(1200, "2028-02-20", "2028-02-29", "annual");
    expect(a.days).toBe(10);
    expect(a.periodDays).toBe(366);
    expect(a.dailyRate).toBeCloseTo((1200 * 12) / 366, 9);
    const m = proRataRent(1200, "2028-02-20", "2028-02-29", "month");
    expect(m.periodDays).toBe(29);
    expect(m.amount).toBeCloseTo((1200 / 29) * 10, 9);
  });
  it("a period across two months is charged month by month", () => {
    // 20 to 31 October (12 of 31 days) and 1 to 10 November (10 of 30 days).
    const m = proRataRent(1200, "2026-10-20", "2026-11-10", "month");
    expect(m.days).toBe(22);
    expect(m.parts.map((p) => [p.from, p.to, p.days, p.periodDays])).toEqual([
      ["2026-10-20", "2026-10-31", 12, 31],
      ["2026-11-01", "2026-11-10", 10, 30],
    ]);
    expect(m.amount).toBeCloseTo((1200 / 31) * 12 + (1200 / 30) * 10, 9);
    // A whole calendar month inside the period costs exactly one month's rent.
    const whole = proRataRent(1200, "2026-10-20", "2026-12-05", "month");
    expect(whole.parts[1].amount).toBeCloseTo(1200, 9);
    // The annual method is one daily rate throughout.
    expect(proRataRent(1200, "2026-10-20", "2026-11-10", "annual").amount).toBeCloseTo(((1200 * 12) / 365) * 22, 9);
  });
  it("across a year end, each year uses its own length", () => {
    const r = proRataRent(1200, "2027-12-30", "2028-01-02", "annual");
    expect(r.amount).toBeCloseTo(((1200 * 12) / 365) * 2 + ((1200 * 12) / 366) * 2, 9);
  });
  it("the same day is one day; an end before the start is nothing", () => {
    const one = proRataRent(1200, "2026-10-20", "2026-10-20", "annual");
    expect(one.days).toBe(1);
    expect(one.amount).toBeCloseTo((1200 * 12) / 365, 9);
    const none = proRataRent(1200, "2026-10-20", "2026-10-19", "month");
    expect(none.days).toBe(0);
    expect(none.amount).toBe(0);
    expect(none.parts).toEqual([]);
  });
  it("a whole calendar month is the month's rent in the month method only", () => {
    expect(proRataRent(1200, "2026-10-01", "2026-10-31", "month").amount).toBeCloseTo(1200, 9);
    expect(proRataRent(1200, "2026-10-01", "2026-10-31", "annual").amount).toBeCloseTo(((1200 * 12) / 365) * 31, 9);
  });
  it("monthly to weekly and back", () => {
    expect(monthlyToWeeklyRent(1300)).toBeCloseTo(300, 9);
    expect(weeklyToMonthlyRent(monthlyToWeeklyRent(950))).toBeCloseTo(950, 9);
  });
  it("weekly to monthly", () => {
    expect(weeklyToMonthlyRent(300)).toBe(1300);
  });
});
