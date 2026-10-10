import { describe, expect, it } from "vitest";
import {
  aimeFromSalary,
  benefitTax,
  breakEvenMonths,
  claimFactor,
  claimTable,
  collegePlan,
  deductionSaving,
  earningsTestWithheld,
  fullRetirementAgeMonths,
  iraCompare,
  iraDeduction,
  jointDivisor,
  pia,
  rmdPenalty,
  rmdSchedule,
  rmdStartAge,
  roomInBracket,
  rothConversion,
  taxableBenefits,
  uniformDivisor,
} from "./retirement-income";

describe("Social Security", () => {
  it("gives full retirement age by year of birth", () => {
    expect(fullRetirementAgeMonths(1954)).toBe(792);
    expect(fullRetirementAgeMonths(1957)).toBe(798);
    expect(fullRetirementAgeMonths(1959)).toBe(802);
    expect(fullRetirementAgeMonths(1964)).toBe(804);
  });

  it("reduces early claims and adds delayed credits", () => {
    expect(claimFactor(62 * 12, 67 * 12)).toBeCloseTo(0.7, 10);
    expect(claimFactor(64 * 12, 67 * 12)).toBeCloseTo(0.8, 10);
    expect(claimFactor(70 * 12, 67 * 12)).toBeCloseTo(1.24, 10);
    expect(claimFactor(72 * 12, 67 * 12)).toBeCloseTo(1.24, 10);
    expect(claimFactor(62 * 12, 66 * 12)).toBeCloseTo(0.75, 10);
  });

  it("applies the 2026 bend points", () => {
    expect(pia(1_286)).toBeCloseTo(1_157.4, 5);
    expect(pia(7_749)).toBe(3_225.5);
    expect(pia(10_000)).toBeCloseTo(1_157.4 + 0.32 * 6_463 + 0.15 * 2_251, 0);
    expect(aimeFromSalary(300_000, 40)).toBe(Math.floor(184_500 / 12));
    expect(aimeFromSalary(70_000, 35)).toBe(5_833);
  });

  it("builds the claim table and break-even", () => {
    const t = claimTable(2_000, 1964, 85);
    expect(t.rows[0].monthly).toBe(1_400);
    expect(t.atFra.monthly).toBe(2_000);
    expect(t.rows[8].monthly).toBe(2_480);
    const be = breakEvenMonths(1_400, 62 * 12, 2_000, 67 * 12);
    expect(be / 12).toBeCloseTo(78.67, 1);
    expect(breakEvenMonths(2_000, 744, 1_900, 804)).toBe(Infinity);
  });

  it("withholds benefits under the earnings test", () => {
    expect(earningsTestWithheld(20_000, 34_480, false)).toBe(5_000);
    expect(earningsTestWithheld(20_000, 20_000, false)).toBe(0);
    expect(earningsTestWithheld(20_000, 74_160, true)).toBe(3_000);
    expect(earningsTestWithheld(1_000, 100_000, false)).toBe(1_000);
  });

  it("taxes benefits with the provisional income rules", () => {
    expect(taxableBenefits(20_000, 10_000, "single").taxable).toBe(0);
    expect(taxableBenefits(20_000, 20_000, "single").taxable).toBe(2_500);
    // Provisional 50,000: 0.85 × 16,000 + 4,500 = 18,100, capped at 85% of 24,000.
    expect(taxableBenefits(24_000, 38_000, "single").taxable).toBe(18_100);
    expect(taxableBenefits(30_000, 100_000, "mfj").taxable).toBe(25_500);
    const t = benefitTax(24_000, 38_000, "single", 1);
    expect(t.extra).toBeGreaterThan(0);
  });
});

describe("RMDs", () => {
  it("reads the IRS tables", () => {
    expect(uniformDivisor(73)).toBe(26.5);
    expect(uniformDivisor(90)).toBe(12.2);
    expect(uniformDivisor(125)).toBe(2);
    expect(jointDivisor(75, 60)).toBe(28.3);
    expect(jointDivisor(80, 65)).toBe(23.8);
    expect(jointDivisor(75, 66)).toBeNull();
  });

  it("sets the starting age by birth year", () => {
    expect(rmdStartAge(1950)).toBe(72);
    expect(rmdStartAge(1953)).toBe(73);
    expect(rmdStartAge(1960)).toBe(75);
  });

  it("projects RMDs", () => {
    const s = rmdSchedule({ balance: 500_000, birthYear: 1953, spouseBirthYear: 0, returnPct: 5, fromYear: 2026, years: 3 });
    expect(s[0].age).toBe(73);
    expect(s[0].rmd).toBeCloseTo(500_000 / 26.5, 6);
    expect(s[1].startBalance).toBeCloseTo(500_000 * 1.05 - 500_000 / 26.5, 6);
    const young = rmdSchedule({ balance: 500_000, birthYear: 1960, spouseBirthYear: 0, returnPct: 5, fromYear: 2026, years: 1 });
    expect(young[0].rmd).toBe(0);
    const joint = rmdSchedule({ balance: 500_000, birthYear: 1951, spouseBirthYear: 1966, returnPct: 0, fromYear: 2026, years: 1 });
    expect(joint[0].table).toBe("joint");
    expect(joint[0].divisor).toBe(jointDivisor(75, 60));
    expect(rmdPenalty(10_000, false)).toBe(2_500);
    expect(rmdPenalty(10_000, true)).toBe(1_000);
  });
});

describe("Traditional IRA", () => {
  it("phases out the deduction", () => {
    expect(iraDeduction(70_000, "single", true, false, 40, 70_000).deductible).toBe(7_500);
    expect(iraDeduction(86_000, "single", true, false, 40, 86_000).deductible).toBe(3_750);
    expect(iraDeduction(90_990, "single", true, false, 40, 90_990).deductible).toBe(200);
    expect(iraDeduction(95_000, "single", true, false, 40, 95_000).deductible).toBe(0);
    expect(iraDeduction(300_000, "single", false, false, 55, 300_000).deductible).toBe(8_600);
    expect(iraDeduction(139_000, "mfj", true, false, 40, 139_000).deductible).toBe(3_750);
    expect(iraDeduction(247_000, "mfj", false, true, 40, 247_000).deductible).toBe(3_750);
    expect(iraDeduction(5_000, "mfs", true, false, 40, 5_000).limit).toBe(5_000);
  });

  it("finds the tax saved and compares accounts", () => {
    const s = deductionSaving(70_000, 7_500, "single");
    expect(s.federal).toBeCloseTo(1_250, 0);
    const c = iraCompare(0, 7_500, 7_500, 0.22, 0.22, 7, 30, 1.5, 0.15);
    expect(c.iraAfterTax).toBeCloseTo(c.roth, 0);
    expect(c.taxableAfterSale).toBeLessThan(c.roth);
    const nd = iraCompare(0, 7_500, 0, 0.22, 0.22, 7, 30, 1.5, 0.15);
    expect(nd.basis).toBe(225_000);
  });
});

describe("Roth conversion", () => {
  it("prices a conversion with the federal engine", () => {
    const c = rothConversion({ status: "single", income: 60_000, conversion: 20_000, over65: 0, state: "", years: 20, returnPct: 6, retireRate: 0.22, payOutside: false, yieldPct: 1.5, investTaxRate: 0.15 });
    expect(c.tax).toBeGreaterThan(20_000 * 0.12);
    expect(c.tax).toBeLessThanOrEqual(20_000 * 0.22 + 0.01);
    expect(c.breakEvenRate).toBeCloseTo(c.rate, 6);
    const room = roomInBracket(60_000, "single", 0);
    expect(room.rate).toBe(0.12);
    expect(room.room).toBe(6_500);
    const inside = rothConversion({ status: "single", income: 60_000, conversion: room.room, over65: 0, state: "", years: 0, returnPct: 0, retireRate: 0, payOutside: false, yieldPct: 0, investTaxRate: 0 });
    expect(inside.marginalAfter).toBe(0.12);
    expect(Number.isFinite(c.advantage)).toBe(true);
  });
});

describe("529 plan", () => {
  it("finds the monthly saving needed", () => {
    const p = collegePlan({ costToday: 25_850, yearsUntil: 0, yearsInCollege: 4, inflationPct: 0, saved: 0, returnPct: 6, cover: 1, monthlyPlanned: 0 });
    expect(p.totalFuture).toBe(103_400);
    expect(p.monthlyNeeded).toBe(0);
    const q = collegePlan({ costToday: 20_000, yearsUntil: 10, yearsInCollege: 4, inflationPct: 0, saved: 0, returnPct: 0, cover: 0.5, monthlyPlanned: 100 });
    expect(q.target).toBe(40_000);
    expect(q.monthlyNeeded).toBeCloseTo(40_000 / 120, 6);
    expect(q.projected).toBeCloseTo(12_000, 6);
    const r = collegePlan({ costToday: 25_850, yearsUntil: 15, yearsInCollege: 4, inflationPct: 4, saved: 5_000, returnPct: 6, cover: 1, monthlyPlanned: 0 });
    const check = collegePlan({ costToday: 25_850, yearsUntil: 15, yearsInCollege: 4, inflationPct: 4, saved: 5_000, returnPct: 6, cover: 1, monthlyPlanned: r.monthlyNeeded });
    expect(check.projected).toBeCloseTo(r.target, 0);
  });
});
