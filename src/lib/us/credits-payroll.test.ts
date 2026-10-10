import { describe, expect, it } from "vitest";
import { childCredit, childCreditZeroAt, eitc, eitcCurve, EITC_2026, employerCost, familyCredits, hourlyPaycheck, raise, raisePath, SUTA_2026, yearsToDouble } from "./credits-payroll";
import { childTaxCredit } from "./tax-2026";

describe("childCredit (Schedule 8812)", () => {
  it("gives $2,200 a child when tax covers it", () => {
    const r = childCredit({ status: "mfj", children: 2, otherDependents: 0, magi: 100_000, taxBeforeCredits: 8_000, earnedIncome: 100_000 });
    expect(r.credit).toBe(4_400);
    expect(r.nonRefundable).toBe(4_400);
    expect(r.refundable).toBe(0);
  });
  it("refunds up to $1,700 a child, limited to 15% of earnings over $2,500", () => {
    const r = childCredit({ status: "single", children: 2, otherDependents: 0, magi: 20_000, taxBeforeCredits: 0, earnedIncome: 20_000 });
    expect(r.earnedLimit).toBeCloseTo(2_625);
    expect(r.refundable).toBeCloseTo(2_625);
    expect(r.lost).toBeCloseTo(4_400 - 2_625);
  });
  it("counts the unused other-dependent credit in line 16a, as the form does", () => {
    const r = childCredit({ status: "single", children: 1, otherDependents: 1, magi: 40_000, taxBeforeCredits: 1_000, earnedIncome: 40_000 });
    expect(r.unused).toBe(1_700);
    expect(r.refundable).toBe(1_700);
    // The shared engine applies the tax against the child part only, so it gives less.
    expect(childTaxCredit(1, 1, 40_000, "single", 1_000, 40_000).refundable).toBe(1_200);
  });
  it("phases out $50 per $1,000 or part above $200,000 / $400,000", () => {
    expect(childCredit({ status: "single", children: 1, otherDependents: 0, magi: 200_001, taxBeforeCredits: 50_000, earnedIncome: 200_001 }).credit).toBe(2_150);
    expect(childCredit({ status: "mfj", children: 2, otherDependents: 0, magi: 450_000, taxBeforeCredits: 90_000, earnedIncome: 450_000 }).credit).toBe(1_900);
    expect(childCreditZeroAt("single", 2_200)).toBe(243_001);
    expect(childCredit({ status: "single", children: 1, otherDependents: 0, magi: 243_001, taxBeforeCredits: 50_000, earnedIncome: 243_001 }).credit).toBe(0);
    expect(childCredit({ status: "single", children: 1, otherDependents: 0, magi: 243_000, taxBeforeCredits: 50_000, earnedIncome: 243_000 }).credit).toBe(50);
  });
  it("uses payroll taxes less the EITC with three or more children", () => {
    const r = childCredit({ status: "mfj", children: 3, otherDependents: 0, magi: 10_000, taxBeforeCredits: 0, earnedIncome: 10_000, payrollTaxes: 6_000, eitc: 1_000 });
    expect(r.earnedLimit).toBeCloseTo(1_125);
    expect(r.payrollLimit).toBe(5_000);
    expect(r.refundable).toBe(5_000);
  });
  it("works from income", () => {
    const f = familyCredits({ status: "hoh", wages: 30_000, children: 2, otherDependents: 0 });
    expect(f.agi).toBe(30_000);
    expect(f.taxBeforeCredits).toBeCloseTo(585);
    expect(f.ctc.nonRefundable).toBeCloseTo(585);
    expect(f.ctc.refundable).toBe(3_400);
    expect(f.eitc).toBeGreaterThan(5_000);
  });
});

describe("eitc", () => {
  it("matches the Rev. Proc. 2025-32 maximums and end points", () => {
    EITC_2026.forEach((row, k) => {
      expect(Math.round(row.rate * row.earnedAmount)).toBe(row.max);
      expect(eitc({ status: "single", children: k, earnedIncome: row.earnedAmount, agi: row.earnedAmount }).credit).toBe(row.max);
      expect(Math.abs((row.end - row.start) * row.phaseRate - row.max)).toBeLessThan(1);
      expect(Math.abs((row.endJoint - row.startJoint) * row.phaseRate - row.max)).toBeLessThan(1);
      expect(eitc({ status: "single", children: k, earnedIncome: row.end, agi: row.end }).credit).toBe(0);
    });
  });
  it("phases in and out", () => {
    expect(eitc({ status: "single", children: 1, earnedIncome: 10_000, agi: 10_000 }).credit).toBe(3_400);
    const out = eitc({ status: "single", children: 2, earnedIncome: 35_000, agi: 35_000 });
    expect(out.stage).toBe("phase-out");
    expect(out.credit).toBe(Math.round(7_316 - (35_000 - 23_890) * 0.2106));
    expect(eitc({ status: "mfj", children: 2, earnedIncome: 35_000, agi: 35_000 }).credit).toBe(Math.round(7_316 - (35_000 - 31_160) * 0.2106));
  });
  it("uses the larger of AGI and earned income", () => {
    expect(eitc({ status: "single", children: 1, earnedIncome: 20_000, agi: 30_000 }).credit).toBe(Math.round(4_427 - (30_000 - 23_890) * 0.1598));
  });
  it("blocks on investment income, age, separate returns", () => {
    expect(eitc({ status: "single", children: 1, earnedIncome: 20_000, agi: 20_000, investmentIncome: 12_201 }).blocked).toBe("investment");
    expect(eitc({ status: "single", children: 0, earnedIncome: 9_000, agi: 9_000, ageOk: false }).credit).toBe(0);
    expect(eitc({ status: "mfs", children: 1, earnedIncome: 20_000, agi: 20_000 }).credit).toBe(0);
    expect(eitc({ status: "mfs", children: 1, earnedIncome: 20_000, agi: 20_000, separatedSpouse: true }).credit).toBe(4_427);
  });
  it("draws a curve", () => {
    const c = eitcCurve("single", 1);
    expect(Math.max(...c.map((p) => p.credit))).toBe(4_427);
    expect(c[c.length - 1].credit).toBe(0);
  });
});

describe("hourlyPaycheck", () => {
  const base = { frequency: "biweekly" as const, status: "single" as const, k401Pct: 0, rothPct: 0, section125: 0, children: 0, otherDependents: 0, state: "TX", localRate: 0, extraWithholding: 0 };
  it("adds overtime at time and a half", () => {
    const r = hourlyPaycheck({ ...base, rate: 20, hours: 40, overtimeHours: 5, overtimeMultiplier: 1.5, weeks: 52 });
    expect(r.weeklyGross).toBe(950);
    expect(r.annualGross).toBe(49_400);
    expect(r.overtimePremium).toBe(2_600);
    expect(r.overtimeTaxSaving).toBeCloseTo(312);
    expect(r.netPerHour).toBeGreaterThan(15);
    expect(r.netPerHour).toBeLessThan(20);
  });
  it("handles zero hours", () => {
    const r = hourlyPaycheck({ ...base, rate: 20, hours: 0, overtimeHours: 0, overtimeMultiplier: 1.5, weeks: 52 });
    expect(r.netPerHour).toBe(0);
    expect(r.pay.net.year).toBe(0);
  });
});

describe("raise", () => {
  const base = { frequency: "biweekly" as const, status: "single" as const, k401Pct: 0, rothPct: 0, section125: 0, children: 0, otherDependents: 0, state: "TX", localRate: 0, extraWithholding: 0 };
  it("works out the raise in dollars and after tax", () => {
    const r = raise({ ...base, oldPay: 60_000, mode: "pct", value: 0.04, inflation: 0.034 });
    expect(r.raise).toBeCloseTo(2_400);
    expect(r.newPay).toBeCloseTo(62_400);
    // 12% bracket + 7.65% FICA in Texas.
    expect(r.taxOnRaise).toBeCloseTo(0.1965, 3);
    expect(r.real).toBeCloseTo(1.04 / 1.034 - 1, 6);
    const d = raise({ ...base, oldPay: 60_000, mode: "amount", value: 3_000, inflation: 0 });
    expect(d.pct).toBeCloseTo(0.05);
  });
  it("compounds", () => {
    const p = raisePath(50_000, 0.03, 0.03, 10);
    expect(p).toHaveLength(11);
    expect(p[10].pay).toBeCloseTo(50_000 * 1.03 ** 10);
    expect(p[10].real).toBeCloseTo(50_000);
    expect(yearsToDouble(0.03)).toBeCloseTo(23.45, 1);
    expect(yearsToDouble(0)).toBeNull();
  });
});

describe("employerCost", () => {
  it("adds FICA, FUTA and SUTA", () => {
    const s = SUTA_2026.TX;
    const r = employerCost({ wages: 50_000, hours: 40, weeks: 52, sutaRate: s.newRate ?? 0, sutaBase: s.base, futaReduction: 0, benefits: 0, matchPct: 0, workersCompPct: 0, otherPct: 0, paidDaysOff: 0 });
    expect(r.socialSecurity).toBeCloseTo(3_100);
    expect(r.medicare).toBeCloseTo(725);
    expect(r.futa).toBeCloseTo(42);
    expect(r.suta).toBeCloseTo(243);
    expect(r.total).toBeCloseTo(54_110);
  });
  it("applies the California credit reduction and the Social Security cap", () => {
    const r = employerCost({ wages: 200_000, hours: 40, weeks: 52, sutaRate: 0.034, sutaBase: 7_000, futaReduction: 0.015, benefits: 0, matchPct: 0, workersCompPct: 0, otherPct: 0, paidDaysOff: 0 });
    expect(r.futa).toBeCloseTo(147);
    expect(r.socialSecurity).toBeCloseTo(11_439);
  });
  it("costs per hour worked after paid time off", () => {
    const r = employerCost({ wages: 52_000, hours: 40, weeks: 52, sutaRate: 0, sutaBase: 0, futaReduction: 0, benefits: 0, matchPct: 0, workersCompPct: 0, otherPct: 0, paidDaysOff: 20, futaExempt: true });
    expect(r.paidHours).toBe(2_080);
    expect(r.workedHours).toBe(1_920);
    expect(r.hourlyWage).toBe(25);
  });
  it("covers every state and DC", () => {
    expect(Object.keys(SUTA_2026)).toHaveLength(51);
  });
});
