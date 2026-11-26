import { describe, expect, it } from "vitest";
import { BENEFIT_CAP, UC_DEFAULT_INPUT, universalCredit2026 } from "./uc-engine";
import { monthlyFromHours, workChange, workLandmarks, workPoint } from "./uc-work";

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

  it("no work allowance: the taper bites from the first pound (no children, no health element)", () => {
    const single = { ...base, household: { ...UC_DEFAULT_INPUT } };
    const c = workChange({ ...single, grossMonthly: 0 }, 100);
    expect(c.lostToUc).toBeCloseTo(55, 6);
    expect(c.keep).toBeCloseTo(0.45, 6);
    expect(workLandmarks(single, 3000).taperStarts).toBe(0);
  });

  it("GOV.UK work allowances: £710 with no housing costs, £427 when the award includes rent", () => {
    const rent = { ...base, household: { ...UC_DEFAULT_INPUT, children: 1, tenure: "social" as const, rent: 600 } };
    expect(workLandmarks(base, 3000).taperStarts).toBeCloseTo(710, 1);
    expect(workLandmarks(rent, 3000).taperStarts).toBeCloseTo(427, 1);
    // A limited capability for work element also gives one, with no children.
    const health = { ...base, household: { ...UC_DEFAULT_INPUT, health: "lcwra-new" as const } };
    expect(workLandmarks(health, 3000).taperStarts).toBeCloseTo(710, 1);
  });

  it("tax and NI start at £1,047.50 a month, where the rate kept drops from 45p to about 32p", () => {
    const l = workLandmarks(base, 3000);
    expect(l.deductionsStart).toBeCloseTo(12_570 / 12, 0);
    expect(workChange({ ...base, grossMonthly: 900 }, 100).keep).toBeCloseTo(0.45, 6);
    expect(workChange({ ...base, grossMonthly: 1100 }, 100).keep).toBeCloseTo(0.72 * 0.45, 6);
  });

  it("Universal Credit reaches zero mid-range, and above that only tax and NI are lost", () => {
    const l = workLandmarks(base, 5000);
    // Award 424.90 + 303.94 = 728.84; it ends at take-home pay of 710 + 728.84 ÷ 0.55.
    expect(l.ucEnds).not.toBeNull();
    const end = workPoint({ ...base, grossMonthly: l.ucEnds! });
    expect(end.uc).toBeCloseTo(0, 1);
    expect(end.net).toBeCloseTo(710 + 728.84 / 0.55, 0);
    const beyond = workChange({ ...base, grossMonthly: l.ucEnds! + 50 }, 100);
    expect(beyond.lostToUc).toBe(0);
    expect(beyond.keep).toBeCloseTo(0.72, 6);
    // Straddling the end point: the award cannot go below zero.
    const across = workChange({ ...base, grossMonthly: l.ucEnds! - 50 }, 100);
    expect(across.after.uc).toBe(0);
    expect(across.keep).toBeGreaterThan(0.72 * 0.45);
    expect(across.keep).toBeLessThan(0.72);
  });

  it("no landmark for Universal Credit ending when it does not end within the range", () => {
    expect(workLandmarks(base, 1500).ucEnds).toBeNull();
  });

  it("benefit cap: earnings of £881 a month or more lift it", () => {
    const capped = { ...UC_DEFAULT_INPUT, children: 4, tenure: "private" as const, rent: 1500, lhaMonthly: 1500, includeChildBenefit: true };
    const below = universalCredit2026({ ...capped, earnings: BENEFIT_CAP.earningsExemption - 1 });
    const at = universalCredit2026({ ...capped, earnings: BENEFIT_CAP.earningsExemption });
    expect(below.capApplies).toBe(true);
    expect(at.capApplies).toBe(false);
    expect(at.capExemptReason).toMatch(/881/);
    // So a capped household gains more than the taper suggests when it crosses the line.
    expect(at.award).toBeGreaterThan(below.award);
  });

  it("April 2027 (proposed): work allowances of £735 and £442, taper still 55%", () => {
    const next = { ...base, household: { ...UC_DEFAULT_INPUT, children: 1, year: "2027/28" as const } };
    expect(workLandmarks(next, 3000).taperStarts).toBeCloseTo(735, 1);
    const rent = { ...next, household: { ...next.household, tenure: "social" as const, rent: 600 } };
    expect(workLandmarks(rent, 3000).taperStarts).toBeCloseTo(442, 1);
    const c = workChange({ ...next, grossMonthly: 800 }, 100);
    expect(c.keep).toBeCloseTo(0.45, 6);
    // Same pay, higher allowance: £25 more is ignored, worth 55% of it.
    const now = workPoint({ ...base, grossMonthly: 1000 });
    const then = workPoint({ ...next, grossMonthly: 1000 });
    expect(then.uc - now.uc).toBeCloseTo(443.21 + 314.58 - 424.9 - 303.94 + 25 * 0.55, 2);
  });
});
