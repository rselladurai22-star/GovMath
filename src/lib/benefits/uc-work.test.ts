import { describe, expect, it } from "vitest";
import { UC_DEFAULT_INPUT } from "./uc-engine";
import { monthlyFromHours, workChange, workPoint } from "./uc-work";

const base = { pensionPct: 0, region: "ruk" as const, partnerNet: 0, household: { ...UC_DEFAULT_INPUT, children: 1 } };

describe("uc-work", () => {
  it("converts hours to monthly pay", () => {
    expect(monthlyFromHours(12, 30)).toBeCloseTo(1560, 6);
  });

  it("no tax or NI below the allowances, award falls by the taper", () => {
    const p = workPoint({ ...base, grossMonthly: 1000 });
    expect(p.tax).toBe(0);
    expect(p.ni).toBe(0);
    expect(p.net).toBeCloseTo(1000, 6);
    // 424.90 + 303.94 − 55% × (1000 − 710)
    expect(p.uc).toBeCloseTo(569.34, 2);
  });

  it("basic-rate taxpayer keeps about 32p of an extra pound once tapered", () => {
    const c = workChange({ ...base, grossMonthly: 1800 }, 100);
    expect(c.keep).toBeCloseTo(0.72 * 0.45, 2);
    expect(c.lostToUc).toBeCloseTo(100 * 0.72 * 0.55, 1);
  });

  it("inside the work allowance nothing is lost", () => {
    const c = workChange({ ...base, grossMonthly: 200 }, 100);
    expect(c.keep).toBeCloseTo(1, 6);
  });

  it("pension contributions lower Universal Credit earnings", () => {
    const a = workPoint({ ...base, grossMonthly: 1800 });
    const b = workPoint({ ...base, grossMonthly: 1800, pensionPct: 5 });
    expect(b.uc).toBeGreaterThan(a.uc);
  });
});
