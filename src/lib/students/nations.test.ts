import { describe, expect, it } from "vitest";
import { saas2026, wales2026 } from "./nations";

describe("SAAS 2026/27", () => {
  it("matches the published young student bands", () => {
    expect(saas2026(18_000, false)).toMatchObject({ bursary: 2000, loan: 9400, total: 11400 });
    expect(saas2026(22_000, false).total).toBe(10525);
    expect(saas2026(30_000, false).total).toBe(9900);
    expect(saas2026(34_000, false).total).toBe(8400);
    expect(saas2026(18_000, true).total).toBe(11400);
  });
});

describe("SAAS 2026/27 band edges and independent students (saas.gov.uk, April 2026)", () => {
  it("young students change band at £21,000, £24,000 and £34,000", () => {
    expect(saas2026(20_999, false)).toMatchObject({ bursary: 2_000, loan: 9_400, band: 0 });
    expect(saas2026(21_000, false)).toMatchObject({ bursary: 1_125, loan: 9_400, band: 1 });
    expect(saas2026(23_999, false).band).toBe(1);
    expect(saas2026(24_000, false)).toMatchObject({ bursary: 500, loan: 9_400, band: 2 });
    expect(saas2026(33_999, false).total).toBe(9_900);
    expect(saas2026(34_000, false)).toMatchObject({ bursary: 0, loan: 8_400, band: 3 });
    expect(saas2026(0, false).total).toBe(11_400);
  });
  it("independent students get a smaller bursary and a bigger loan", () => {
    expect(saas2026(20_999, true)).toMatchObject({ bursary: 1_000, loan: 10_400, total: 11_400 });
    expect(saas2026(21_000, true)).toMatchObject({ bursary: 0, loan: 10_400, total: 10_400 });
    expect(saas2026(24_000, true)).toMatchObject({ bursary: 0, loan: 9_900, total: 9_900 });
    expect(saas2026(60_000, true)).toMatchObject({ bursary: 0, loan: 8_400, total: 8_400 });
  });
});

describe("Student Finance Wales 2026/27", () => {
  it("everyone gets the same total; the grant never falls below £1,020", () => {
    for (const living of ["home", "away", "london"] as const) {
      for (const x of [0, 10_000, 18_370, 33_333, 59_200, 120_000]) {
        const r = wales2026(x, living);
        expect(r.grant + r.loan).toBe(r.total);
        expect(r.grant).toBeGreaterThanOrEqual(1_020);
      }
    }
    expect(wales2026(10_000, "away")).toMatchObject({ grant: 8_260, loan: 4_330, total: 12_590 });
    expect(wales2026(120_000, "london")).toMatchObject({ grant: 1_020, loan: 14_700, total: 15_720 });
    expect(wales2026(120_000, "home")).toMatchObject({ grant: 1_020, loan: 9_665, total: 10_685 });
  });

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
