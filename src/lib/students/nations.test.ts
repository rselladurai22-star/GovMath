import { describe, expect, it } from "vitest";
import { degreeCost, saas2026, studentBudget, wales2026 } from "./nations";

describe("SAAS 2026/27", () => {
  it("matches the published young student bands", () => {
    expect(saas2026(18_000, false)).toMatchObject({ bursary: 2000, loan: 9400, total: 11400 });
    expect(saas2026(22_000, false).total).toBe(10525);
    expect(saas2026(30_000, false).total).toBe(9900);
    expect(saas2026(34_000, false).total).toBe(8400);
    expect(saas2026(18_000, true).total).toBe(11400);
  });
});

describe("Student Finance Wales 2026/27", () => {
  // Grant at each income in the published table (home, away, London).
  const table: [number, number, number, number][] = [
    [18_370, 7020, 8260, 10325],
    [20_000, 6781, 7971, 9954],
    [25_000, 6046, 7085, 8814],
    [30_000, 5311, 6198, 7674],
    [35_000, 4577, 5311, 6535],
    [40_000, 3842, 4425, 5395],
    [45_000, 3107, 3538, 4255],
    [50_000, 2372, 2651, 3116],
    [55_000, 1638, 1765, 1976],
    [59_200, 1020, 1020, 1020],
  ];
  it("matches the published grant table", () => {
    for (const [inc, h, a, l] of table) {
      expect(Math.abs(wales2026(inc, "home").grant - h)).toBeLessThanOrEqual(0);
      expect(Math.abs(wales2026(inc, "away").grant - a)).toBeLessThanOrEqual(0);
      expect(Math.abs(wales2026(inc, "london").grant - l)).toBeLessThanOrEqual(0);
    }
    expect(wales2026(30_000, "home").loan + wales2026(30_000, "home").grant).toBe(10685);
  });
});

describe("Degree cost and budget", () => {
  it("adds up three years of loans with interest", () => {
    const r = degreeCost({ years: 3, tuition: 9790, feeGrowth: 0, living: "away", income: 70_000, maintenance: true, rpi: 0.041, salary: 28_000, salaryGrowth: 0.03 });
    expect(r.tuitionTotal).toBeCloseTo(29_370, 6);
    expect(r.borrowed).toBeCloseTo(29_370 + 3 * 5048, 6);
    expect(r.balanceAtGraduation).toBeGreaterThan(r.borrowed);
  });
  it("balances a student budget", () => {
    const b = studentBudget({ loan: 10_830, grants: 0, parents: 0, jobHours: 10, jobRate: 12.71, jobWeeks: 30, rentWeekly: 180, rentWeeks: 44, livingWeekly: 100, livingWeeks: 39, course: 300 });
    expect(b.job).toBeCloseTo(3813, 6);
    expect(b.balance).toBeCloseTo(10_830 + 3813 - 7920 - 3900 - 300, 6);
  });
});
