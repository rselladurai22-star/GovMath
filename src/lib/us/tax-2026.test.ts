import { describe, expect, it } from "vitest";
import { childTaxCredit, federalReturn, fica, longTermGainsTax, niit, ordinaryTax, overtimeDeduction, selfEmploymentTax, seniorDeduction, standardDeduction, tipsDeduction, type ReturnInput } from "./tax-2026";

const base: ReturnInput = {
  status: "single",
  wages: 0,
  otherIncome: 0,
  longTermGains: 0,
  selfEmployment: 0,
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
};

describe("2026 federal income tax", () => {
  it("taxes ordinary income band by band", () => {
    // Single, $58,900 taxable: 10% of 12,400 + 12% of 38,000 + 22% of 8,500.
    const r = ordinaryTax(58_900, "single");
    expect(r.tax).toBeCloseTo(1_240 + 4_560 + 1_870, 6);
    expect(r.marginal).toBe(0.22);
    // Married filing jointly, $117,800 taxable: 2,480 + 9,120 + 3,740.
    expect(ordinaryTax(117_800, "mfj").tax).toBeCloseTo(15_340, 6);
    // Head of household top of the 12% band.
    expect(ordinaryTax(67_450, "hoh").tax).toBeCloseTo(1_770 + 0.12 * 49_750, 6);
    expect(ordinaryTax(0, "single").tax).toBe(0);
  });

  it("uses the 2026 standard deduction and the extra amount at 65", () => {
    expect(standardDeduction("single")).toBe(16_100);
    expect(standardDeduction("mfj")).toBe(32_200);
    expect(standardDeduction("hoh")).toBe(24_150);
    expect(standardDeduction("single", 1)).toBe(18_150);
    expect(standardDeduction("mfj", 2)).toBe(35_500);
  });

  it("works out a simple return", () => {
    const r = federalReturn({ ...base, wages: 75_000, withheld: 8_000 });
    expect(r.taxable).toBe(58_900);
    expect(r.incomeTax).toBeCloseTo(7_670, 6);
    expect(r.refund).toBeCloseTo(330, 6);
    const pre = federalReturn({ ...base, wages: 75_000, preTax: 7_500 });
    expect(pre.taxable).toBe(51_400);
  });

  it("phases out the senior deduction at 6% above $75,000 single", () => {
    expect(seniorDeduction("single", 70_000, 1)).toBe(6_000);
    expect(seniorDeduction("single", 100_000, 1)).toBeCloseTo(4_500, 6);
    expect(seniorDeduction("single", 175_000, 1)).toBe(0);
    expect(seniorDeduction("mfj", 120_000, 2)).toBe(12_000);
  });

  it("caps the overtime and tips deductions and phases them out", () => {
    expect(overtimeDeduction(8_000, 100_000, "single")).toBe(8_000);
    expect(overtimeDeduction(20_000, 100_000, "single")).toBe(12_500);
    expect(overtimeDeduction(20_000, 100_000, "mfj")).toBe(20_000);
    // $160,000: $10,000 over, so $1,000 less.
    expect(overtimeDeduction(20_000, 160_000, "single")).toBe(11_500);
    expect(overtimeDeduction(5_000, 100_000, "mfs")).toBe(0);
    expect(tipsDeduction(30_000, 100_000, "single")).toBe(25_000);
    expect(tipsDeduction(30_000, 100_000, "mfs")).toBe(0);
  });
});

describe("2026 payroll taxes", () => {
  it("charges 7.65% up to the Social Security wage base", () => {
    expect(fica(75_000, "single").total).toBeCloseTo(5_737.5, 6);
    const high = fica(250_000, "single");
    expect(high.socialSecurity).toBeCloseTo(11_439, 6);
    expect(high.medicare).toBeCloseTo(3_625, 6);
    expect(high.additionalMedicare).toBeCloseTo(450, 6);
  });

  it("works out self-employment tax on 92.35% of profit", () => {
    const r = selfEmploymentTax(50_000, "single");
    expect(r.earnings).toBeCloseTo(46_175, 6);
    expect(r.socialSecurity).toBeCloseTo(5_725.7, 6);
    expect(r.medicare).toBeCloseTo(1_339.075, 6);
    expect(r.seTax).toBeCloseTo(7_064.775, 6);
    expect(r.deduction).toBeCloseTo(3_532.3875, 6);
    expect(selfEmploymentTax(400, "single").seTax).toBe(0);
    // W-2 wages above the wage base leave only Medicare.
    expect(selfEmploymentTax(50_000, "single", 200_000).socialSecurity).toBe(0);
  });
});

describe("2026 investment taxes and credits", () => {
  it("stacks long-term gains on ordinary income", () => {
    const r = longTermGainsTax(30_000, 30_000, "single");
    expect(r.zero).toBeCloseTo(19_450, 6);
    expect(r.fifteen).toBeCloseTo(10_550, 6);
    expect(r.tax).toBeCloseTo(1_582.5, 6);
    expect(longTermGainsTax(600_000, 100_000, "single").tax).toBeCloseTo(20_000, 6);
    expect(longTermGainsTax(0, 98_900, "mfj").tax).toBe(0);
  });

  it("charges the 3.8% net investment income tax above $200,000", () => {
    expect(niit(250_000, 30_000, "single")).toBeCloseTo(1_140, 6);
    expect(niit(210_000, 30_000, "single")).toBeCloseTo(380, 6);
    expect(niit(150_000, 30_000, "single")).toBe(0);
    // Pension income counts toward the threshold but is not itself investment income:
    // $250,000 MAGI is $50,000 over, but only the $30,000 of investment income is taxed.
    const r = federalReturn({ ...base, wages: 180_000, otherIncome: 30_000, nonInvestmentIncome: 40_000 });
    expect(r.niit).toBeCloseTo(30_000 * 0.038, 6);
  });

  it("gives $2,200 a child, with up to $1,700 refundable", () => {
    const r = childTaxCredit(2, 0, 100_000, "mfj", 8_000, 100_000);
    expect(r.credit).toBe(4_400);
    expect(r.nonRefundable).toBe(4_400);
    expect(r.refundable).toBe(0);
    const low = childTaxCredit(2, 0, 30_000, "hoh", 500, 30_000);
    expect(low.nonRefundable).toBe(500);
    expect(low.refundable).toBe(3_400);
    // $410,000 MFJ: $10,000 over, $500 less.
    expect(childTaxCredit(1, 0, 410_000, "mfj", 50_000, 410_000).credit).toBe(1_700);
  });
});
