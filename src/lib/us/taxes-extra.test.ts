import { describe, expect, it } from "vitest";
import { federalReturn, type ReturnInput } from "./tax-2026";
import { capitalLoss, estimatedPayments, homeExclusion, qbiDeduction, returnWithQbi } from "./taxes-extra";

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

describe("QBI deduction", () => {
  it("is 20% of QBI below the threshold, capped at 20% of taxable income", () => {
    expect(qbiDeduction(50_000, 100_000, 0, "single")).toBeCloseTo(10_000, 6);
    expect(qbiDeduction(50_000, 30_000, 0, "single")).toBeCloseTo(6_000, 6);
    expect(qbiDeduction(50_000, 30_000, 10_000, "single")).toBeCloseTo(4_000, 6);
  });
  it("phases out across the range with no wages paid, with a $400 floor", () => {
    expect(qbiDeduction(100_000, 201_750 + 37_500, 0, "single")).toBeCloseTo(10_000, 6);
    expect(qbiDeduction(100_000, 276_750, 0, "single")).toBe(400);
    expect(qbiDeduction(900, 50_000, 0, "single")).toBeCloseTo(180, 6);
    expect(qbiDeduction(2_000, 50_000, 0, "single")).toBe(400);
    expect(qbiDeduction(100_000, 500_000, 0, "mfj")).toBeCloseTo(20_000 * (1 - 96_500 / 150_000), 6);
  });
  it("lowers taxable income and tax in the return", () => {
    const i = { ...base, selfEmployment: 60_000 };
    const plain = federalReturn(i);
    const q = returnWithQbi(i);
    // Capped at 20% of taxable income before the deduction.
    expect(q.qbiDeduction).toBeCloseTo(Math.min(60_000 - plain.se.deduction, plain.taxable) * 0.2, 6);
    expect(q.taxable).toBeCloseTo(plain.taxable - q.qbiDeduction, 6);
    expect(q.totalTax).toBeLessThan(plain.totalTax);
    expect(returnWithQbi(i, false).totalTax).toBeCloseTo(plain.totalTax, 6);
    expect(returnWithQbi({ ...base, wages: 50_000 }).qbiDeduction).toBe(0);
  });
});

describe("estimated tax", () => {
  it("uses the smaller safe harbor", () => {
    const e = estimatedPayments(20_000, 0, "single", 12_000, 90_000);
    expect(e.required).toBe(12_000);
    expect(e.basis).toBe("prior");
    expect(e.safeQuarter).toBe(3_000);
    expect(e.fullQuarter).toBe(5_000);
    expect(estimatedPayments(20_000, 0, "single", 12_000, 200_000).required).toBeCloseTo(13_200, 6);
    expect(estimatedPayments(20_000, 0, "single").required).toBe(18_000);
    expect(estimatedPayments(20_000, 19_500, "single").underThreshold).toBe(true);
  });
});

describe("capital losses and the home exclusion", () => {
  it("limits net losses to $3,000 a year", () => {
    expect(capitalLoss(4_000, 10_000, "single")).toEqual({ netGain: 0, deduction: 3_000, carryforward: 3_000 });
    expect(capitalLoss(4_000, 10_000, "mfs").deduction).toBe(1_500);
    expect(capitalLoss(10_000, 4_000, "single").netGain).toBe(6_000);
  });
  it("excludes up to $250,000 or $500,000", () => {
    expect(homeExclusion(600_000, "mfj")).toBe(500_000);
    expect(homeExclusion(600_000, "single")).toBe(250_000);
    expect(homeExclusion(100_000, "single")).toBe(100_000);
  });
});
