import { describe, expect, it } from "vitest";
import { loanWithFee, pmiMilestones, refiTimeline } from "./housing-loans-extra";
import { monthlyPayment } from "./loans";

describe("pmiMilestones", () => {
  it("is zero with 20% down", () => {
    expect(pmiMilestones(400_000, 320_000, 7, 30, 0).requestMonth).toBe(0);
  });
  it("orders request (80%) before automatic (78%) and caps at the midpoint", () => {
    const m = pmiMilestones(400_000, 360_000, 7.25, 30, 0);
    expect(m.requestMonth).toBeGreaterThan(0);
    expect(m.requestMonth).toBeLessThan(m.automaticMonth);
    expect(m.automaticMonth).toBeLessThanOrEqual(180);
    expect(m.midpointMonth).toBe(180);
  });
  it("extra payments bring the request date forward but not the automatic date", () => {
    const a = pmiMilestones(400_000, 360_000, 7.25, 30, 0);
    const b = pmiMilestones(400_000, 360_000, 7.25, 30, 300);
    expect(b.requestMonth).toBeLessThan(a.requestMonth);
    expect(b.automaticMonth).toBe(a.automaticMonth);
  });
});

describe("loanWithFee", () => {
  it("equals the APR with no fee", () => {
    const r = loanWithFee(10_000, 12, 36, 0, false);
    expect(r.trueAprPct).toBeCloseTo(12, 6);
    expect(r.received).toBe(10_000);
  });
  it("raises the APR when the fee is taken from the cash", () => {
    const r = loanWithFee(10_000, 12, 36, 500, false);
    expect(r.received).toBe(9_500);
    expect(r.payment).toBeCloseTo(monthlyPayment(10_000, 12, 36), 6);
    expect(r.trueAprPct).toBeGreaterThan(15);
    expect(monthlyPayment(9_500, r.trueAprPct, 36)).toBeCloseTo(r.payment, 4);
  });
  it("raises the APR when the fee is added to the balance", () => {
    const r = loanWithFee(10_000, 12, 36, 500, true);
    expect(r.borrowed).toBe(10_500);
    expect(monthlyPayment(10_000, r.trueAprPct, 36)).toBeCloseTo(r.payment, 4);
    expect(r.financeCharge).toBeCloseTo(r.totalInterest + 500, 6);
  });
  it("handles a zero rate", () => {
    const r = loanWithFee(1_200, 0, 12, 0, false);
    expect(r.payment).toBe(100);
    expect(r.trueAprPct).toBe(0);
  });
});

describe("refiTimeline", () => {
  it("starts at the upfront cost and ends at the total paid", () => {
    const t = refiTimeline(300_000, 7.5, 300, 300_000, 6.5, 30, 9_000);
    expect(t[0]).toEqual({ year: 0, keep: 0, refi: 9_000 });
    expect(t.at(-1)!.year).toBe(30);
    expect(t.at(-1)!.keep).toBeCloseTo(monthlyPayment(300_000, 7.5, 300) * 300, 4);
    expect(t.at(-1)!.refi).toBeCloseTo(9_000 + monthlyPayment(300_000, 6.5, 360) * 360, 4);
  });
});
