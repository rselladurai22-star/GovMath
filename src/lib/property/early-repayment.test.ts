import { describe, expect, it } from "vitest";
import { ercPctAt, fullRepayment, overpayment, unusedAllowance, type ErcInput } from "./early-repayment";

const BASE: ErcInput = {
  balance: 200_000,
  rate: 5,
  termYears: 20,
  dealMonthsLeft: 30,
  ercNow: 3,
  stepDown: 1,
  allowancePct: 10,
  allowanceUsed: 0,
  deductAllowanceOnFull: false,
};

describe("ercPctAt", () => {
  it("steps down at each deal-year boundary counted back from the end", () => {
    // 30 months left: this deal year has 6 months left, then 2 full years.
    expect(ercPctAt(BASE, 0)).toBe(3);
    expect(ercPctAt(BASE, 5)).toBe(3);
    expect(ercPctAt(BASE, 6)).toBe(2);
    expect(ercPctAt(BASE, 18)).toBe(1);
    expect(ercPctAt(BASE, 30)).toBe(0);
  });
  it("never goes below zero and is flat when it does not step", () => {
    expect(ercPctAt({ ...BASE, stepDown: 5 }, 6)).toBe(0);
    expect(ercPctAt({ ...BASE, stepDown: 0 }, 29)).toBe(3);
  });
});

describe("overpayment", () => {
  it("charges only the amount above the unused 10% allowance", () => {
    expect(unusedAllowance({ ...BASE, allowanceUsed: 5_000 })).toBe(15_000);
    const r = overpayment({ ...BASE, lump: 30_000 });
    expect(r.freeAmount).toBe(20_000);
    expect(r.chargeable).toBe(10_000);
    expect(r.erc).toBe(300);
    expect(r.savedOverTerm).toBeGreaterThan(r.savedInDeal);
    expect(r.monthsSooner).toBeGreaterThan(0);
    expect(r.netOverTerm).toBeCloseTo(r.savedOverTerm - 300, 6);
  });
  it("is free within the allowance", () => {
    const r = overpayment({ ...BASE, lump: 15_000 });
    expect(r.erc).toBe(0);
    expect(r.netInDeal).toBeCloseTo(r.savedInDeal, 6);
  });
  it("splitting saves less interest than paying it all now, but avoids the charge", () => {
    const r = overpayment({ ...BASE, lump: 50_000 });
    expect(r.split.savedOverTerm).toBeLessThan(r.savedOverTerm);
    expect(r.split.savedOverTerm).toBeGreaterThan(0);
  });
});

describe("fullRepayment", () => {
  it("charges the whole balance unless the lender deducts the allowance", () => {
    const r = fullRepayment({ ...BASE, newRate: 4 });
    expect(r.erc).toBe(6_000);
    const d = fullRepayment({ ...BASE, newRate: 4, deductAllowanceOnFull: true });
    expect(d.chargeable).toBe(180_000);
    expect(d.erc).toBe(5_400);
  });
  it("lists each step-down and the deal end", () => {
    const r = fullRepayment({ ...BASE, newRate: 4 });
    expect(r.waits.map((w) => w.months)).toEqual([6, 18, 30]);
    expect(r.waits.map((w) => w.ercPct)).toEqual([2, 1, 0]);
    expect(r.waits[2].erc).toBe(0);
  });
  it("a 1-point cut does not pay a 3% charge with 30 months left; a big cut does", () => {
    expect(fullRepayment({ ...BASE, newRate: 4 }).gainVsDealEnd).toBeLessThan(0);
    expect(fullRepayment({ ...BASE, newRate: 1 }).gainVsDealEnd).toBeGreaterThan(0);
  });
  it("finds the break-even new rate", () => {
    const r = fullRepayment({ ...BASE, newRate: 4 });
    expect(r.breakEvenRate).not.toBeNull();
    const at = fullRepayment({ ...BASE, newRate: r.breakEvenRate! });
    expect(Math.abs(at.gainVsDealEnd)).toBeLessThan(1);
    expect(r.breakEvenRate!).toBeLessThan(4);
  });
  it("with no charge, any lower rate is worth switching to now", () => {
    const r = fullRepayment({ ...BASE, ercNow: 0, newRate: 4.9 });
    expect(r.erc).toBe(0);
    expect(r.gainVsDealEnd).toBeGreaterThan(0);
    expect(r.best.months).toBe(0);
  });
});
