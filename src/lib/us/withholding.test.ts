import { describe, expect, it } from "vitest";
import { BLANK_W4, bonusTax, deductionsWorksheet, estimatedPenalty, estimatedPlan, grossUpBonus, stateComparison, supplementalFlat, underpaymentInterest, w4Plan, withholdingPerPaycheck, type W4Input } from "./withholding";
import { STATES } from "./states";

describe("Publication 15-T percentage method (2026)", () => {
  it("matches the standard annual tables", () => {
    // Single $65,000: adjusted $56,400 → $1,240 + 12% over $19,900 = $5,620.
    expect(withholdingPerPaycheck(65_000 / 26, 26, "single") * 26).toBeCloseTo(5_620, 6);
    // Married filing jointly: adjusted $120,100 → $11,600.
    expect(withholdingPerPaycheck(133_000 / 12, 12, "mfj") * 12).toBeCloseTo(11_600, 6);
    // Head of household: adjusted $83,000 → $7,740.
    expect(withholdingPerPaycheck(91_600 / 24, 24, "hoh") * 24).toBeCloseTo(7_740, 6);
    // Single, top row: adjusted $648,100 → $192,979.25.
    expect(withholdingPerPaycheck(656_700 / 52, 52, "single") * 52).toBeCloseTo(192_979.25, 4);
    // Married filing separately uses the single table.
    expect(withholdingPerPaycheck(65_000 / 26, 26, "mfs")).toBeCloseTo(withholdingPerPaycheck(65_000 / 26, 26, "single"), 9);
  });
  it("matches the Step 2 checkbox tables", () => {
    expect(withholdingPerPaycheck(33_250 / 12, 12, "single", { ...BLANK_W4, step2: true }) * 12).toBeCloseTo(2_900, 6);
    expect(withholdingPerPaycheck(66_500 / 12, 12, "mfj", { ...BLANK_W4, step2: true }) * 12).toBeCloseTo(5_800, 6);
    expect(withholdingPerPaycheck(45_800 / 12, 12, "hoh", { ...BLANK_W4, step2: true }) * 12).toBeCloseTo(3_870, 6);
  });
  it("applies Steps 3, 4(a), 4(b) and 4(c)", () => {
    const base = withholdingPerPaycheck(3_000, 26, "single");
    expect(withholdingPerPaycheck(3_000, 26, "single", { ...BLANK_W4, step4c: 50 })).toBeCloseTo(base + 50, 9);
    expect(withholdingPerPaycheck(3_000, 26, "single", { ...BLANK_W4, step3: 2_200 })).toBeCloseTo(base - 2_200 / 26, 9);
    expect(withholdingPerPaycheck(3_000, 26, "single", { ...BLANK_W4, step4a: 1_000 })).toBeCloseTo(base + 220 / 26, 9);
    expect(withholdingPerPaycheck(3_000, 26, "single", { ...BLANK_W4, step4b: 1_000 })).toBeCloseTo(base - 220 / 26, 9);
    expect(withholdingPerPaycheck(500, 26, "single", { ...BLANK_W4, step3: 10_000 })).toBe(0);
  });
});

describe("Form W-4 Deductions Worksheet", () => {
  it("adds the new deductions under their income limits and itemized above the standard deduction", () => {
    expect(deductionsWorksheet({ status: "single", totalIncome: 60_000, tips: 8_000, overtimePremium: 0, over65: 1, adjustments: 2_500, itemized: 20_000 })).toBe(8_000 + 6_000 + 2_500 + 3_900);
    expect(deductionsWorksheet({ status: "single", totalIncome: 160_000, tips: 8_000, overtimePremium: 3_000, over65: 1, adjustments: 0, itemized: 10_000 })).toBe(0);
    expect(deductionsWorksheet({ status: "mfj", totalIncome: 160_000, tips: 0, overtimePremium: 30_000, over65: 2, adjustments: 0, itemized: 0 })).toBe(25_000);
  });
});

const W4: W4Input = {
  status: "single",
  periods: 26,
  payPerPeriod: 2_500,
  preTaxPerPeriod: 0,
  paychecksLeft: 6,
  ytdWithheld: 216.15 * 20,
  currentPerPeriod: 216.15,
  ytdPay: 0,
  otherJobWages: 0,
  otherJobWithholding: 0,
  otherIncome: 0,
  adjustments: 0,
  itemized: 0,
  children: 0,
  otherDependents: 0,
  over65: 0,
  tips: 0,
  overtimePremium: 0,
  targetRefund: 0,
};

describe("W-4 plan", () => {
  it("leaves a small refund for a single job with the basic W-4", () => {
    const p = w4Plan(W4);
    expect(p.jobWages).toBe(65_000);
    expect(Math.abs(p.refundIfUnchanged)).toBeLessThan(10);
    expect(p.w4.step4c).toBe(0);
  });
  it("adds Step 4(c) for untaxed side income left off the W-4", () => {
    const p = w4Plan({ ...W4, otherIncome: 10_000 });
    expect(p.refundIfUnchanged).toBeLessThan(-2_000);
    expect(p.w4.step4a).toBe(10_000);
    expect(Math.abs(p.refundWithNew)).toBeLessThanOrEqual(6);
  });
  it("covers a second job through Step 4(c)", () => {
    const p = w4Plan({ ...W4, otherJobWages: 30_000, otherJobWithholding: 1_000 });
    expect(p.w4.step4c).toBeGreaterThan(0);
    expect(Math.abs(p.refundWithNew)).toBeLessThanOrEqual(6);
  });
  it("raises Step 4(b) when too much is being withheld", () => {
    const p = w4Plan({ ...W4, currentPerPeriod: 400, ytdWithheld: 400 * 20, paychecksLeft: 6 });
    expect(p.overWithheldAlready).toBe(true);
    const q = w4Plan({ ...W4, children: 2, ytdWithheld: 0, paychecksLeft: 26, currentPerPeriod: 216 });
    expect(q.w4.step3).toBe(4_400);
    expect(Math.abs(q.refundWithNew)).toBeLessThanOrEqual(26);
  });
  it("aims for the refund asked for", () => {
    const p = w4Plan({ ...W4, targetRefund: 500 });
    expect(Math.abs(p.refundWithNew - 500)).toBeLessThanOrEqual(6);
  });
  it("has no paychecks to change at the end of the year", () => {
    const p = w4Plan({ ...W4, paychecksLeft: 0 });
    expect(p.noPaychecksLeft).toBe(true);
    expect(Number.isFinite(p.refundWithNew)).toBe(true);
  });
});

describe("Bonuses", () => {
  it("withholds 22%, then 37% over $1 million", () => {
    expect(supplementalFlat(10_000)).toBeCloseTo(2_200, 9);
    expect(supplementalFlat(1_200_000)).toBeCloseTo(220_000 + 74_000, 6);
    expect(supplementalFlat(100_000, 950_000)).toBeCloseTo(11_000 + 18_500, 6);
  });
  const base = { bonus: 10_000, salary: 80_000, periods: 26, status: "single" as const, state: "TX", children: 0, otherDependents: 0, k401Pct: 0, salaryK401: 0, earlierSupplemental: 0, method: "flat" as const, localRate: 0 };
  it("works out take-home in a no-tax state", () => {
    const r = bonusTax(base);
    expect(r.federalWithheld).toBeCloseTo(2_200, 6);
    expect(r.socialSecurity).toBeCloseTo(620, 6);
    expect(r.medicare).toBeCloseTo(145, 6);
    expect(r.stateWithheld).toBe(0);
    expect(r.takeHome).toBeCloseTo(10_000 - 2_200 - 765, 6);
    // $80,000 salary: the bonus is taxed at 22%, so the flat rate is right on.
    expect(r.trueFederal).toBeCloseTo(2_200, 6);
  });
  it("uses the published California and New York rates", () => {
    expect(bonusTax({ ...base, state: "CA" }).stateWithheld).toBeCloseTo(1_023 + 130, 6);
    expect(bonusTax({ ...base, state: "NY" }).stateWithheld).toBeCloseTo(1_170, 6);
    expect(bonusTax({ ...base, state: "IL" }).stateWithheld).toBeCloseTo(495, 6);
  });
  it("stops Social Security at the wage base", () => {
    expect(bonusTax({ ...base, salary: 180_000 }).socialSecurity).toBeCloseTo(4_500 * 0.062, 6);
    expect(bonusTax({ ...base, salary: 200_000 }).socialSecurity).toBe(0);
  });
  it("aggregate method withholds more than the flat rate at a 22% bracket salary", () => {
    const r = bonusTax({ ...base, method: "aggregate" });
    expect(r.aggregateFederal).toBeGreaterThan(r.flatFederal);
  });
  it("grosses up a bonus", () => {
    const g = grossUpBonus(5_000, base);
    expect(bonusTax({ ...base, bonus: g }).takeHome).toBeCloseTo(5_000, 2);
  });
});

describe("Estimated tax", () => {
  it("charges simple interest at each quarter's rate", () => {
    expect(underpaymentInterest(1_000, "2026-10-01", "2027-01-01")).toBeCloseTo((1_000 * 0.07 * 92) / 365, 9);
    expect(underpaymentInterest(1_000, "2026-04-15", "2026-07-15")).toBeCloseTo((1_000 * (0.06 * 77 + 0.07 * 14)) / 365, 9);
    expect(underpaymentInterest(1_000, "2026-04-15", "2026-04-15")).toBe(0);
  });
  it("has no penalty when every installment is paid on time", () => {
    const p = estimatedPenalty(8_000, 0, ["2026-04-15", "2026-06-15", "2026-09-15", "2027-01-15"].map((date) => ({ date, amount: 2_000 })));
    expect(p.penalty).toBe(0);
  });
  it("charges for a missed installment until it is paid", () => {
    const p = estimatedPenalty(8_000, 0, [
      { date: "2026-04-15", amount: 0 },
      { date: "2026-06-15", amount: 4_000 },
      { date: "2026-09-15", amount: 2_000 },
      { date: "2027-01-15", amount: 2_000 },
    ]);
    expect(p.penalty).toBeCloseTo(underpaymentInterest(2_000, "2026-04-15", "2026-06-15"), 9);
  });
  it("plans the remaining payments", () => {
    const plan = estimatedPlan({
      status: "single",
      wages: 0,
      otherIncome: 0,
      longTermGains: 0,
      selfEmployment: 80_000,
      preTax: 0,
      adjustments: 0,
      itemized: 0,
      over65: 0,
      blind: 0,
      children: 0,
      otherDependents: 0,
      overtimePremium: 0,
      tips: 0,
      withheld: 0,
      priorTax: 12_000,
      priorAgi: 70_000,
      paid: [3_000, 3_000, 0, 0],
      next: 2,
      useQbi: true,
    });
    expect(plan.est.required).toBe(12_000);
    expect(plan.stillNeeded).toBe(6_000);
    expect(plan.perRemaining).toBe(3_000);
    expect(plan.penaltyIfCaughtUp).toBe(0);
    expect(plan.penaltyIfNothing).toBeGreaterThan(0);
  });
});

describe("State comparison", () => {
  it("ranks all 51 and puts no-tax states first", () => {
    const rows = stateComparison(STATES.map((s) => s.code), 75_000, "single", 0);
    expect(rows).toHaveLength(51);
    expect(rows[0].tax).toBe(0);
    expect(rows.filter((r) => r.tax === 0).length).toBeGreaterThanOrEqual(9);
    rows.forEach((r) => expect(Number.isFinite(r.marginal)).toBe(true));
  });
});
