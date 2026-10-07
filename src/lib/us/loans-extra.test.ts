import { describe, expect, it } from "vitest";
import { amortize } from "./loans";
import { balanceTransfer, carInterestDeductionLimit } from "./loans-extra";

describe("balance transfer", () => {
  it("adds the fee and charges nothing during the promotion", () => {
    const t = balanceTransfer(6_000, 3, 18, 0, 24, 400);
    expect(t.fee).toBe(180);
    expect(t.totalInterest).toBe(0);
    expect(t.months).toBe(16); // 6,180 ÷ 400 = 15.45
    expect(t.totalPaid).toBeCloseTo(6_180, 6);
  });
  it("charges the go-to rate on what is left after the promotion", () => {
    const t = balanceTransfer(6_000, 3, 12, 0, 24, 300);
    expect(t.leftAtPromoEnd).toBeCloseTo(6_180 - 3_600, 6);
    expect(t.totalInterest).toBeGreaterThan(0);
    expect(Number.isFinite(t.months)).toBe(true);
  });
  it("matches a plain card at the same rate with no fee or promotion", () => {
    const t = balanceTransfer(5_000, 0, 0, 0, 22, 200);
    const s = amortize(5_000, 22, 0, 0, 200);
    expect(t.months).toBe(s.months);
    expect(t.totalInterest).toBeCloseTo(s.totalInterest, 6);
  });
  it("never ends when the payment does not cover the interest", () => {
    expect(balanceTransfer(10_000, 3, 0, 0, 30, 100).months).toBe(Infinity);
  });
});

describe("car loan interest deduction", () => {
  it("phases out by $200 per $1,000 over the threshold", () => {
    expect(carInterestDeductionLimit(90_000, false)).toBe(10_000);
    expect(carInterestDeductionLimit(100_000, false)).toBe(10_000);
    expect(carInterestDeductionLimit(100_500, false)).toBe(9_800);
    expect(carInterestDeductionLimit(120_000, false)).toBe(6_000);
    expect(carInterestDeductionLimit(150_000, false)).toBe(0);
    expect(carInterestDeductionLimit(220_000, true)).toBe(6_000);
    expect(carInterestDeductionLimit(260_000, true)).toBe(0);
  });
});
