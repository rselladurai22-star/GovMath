import { describe, it, expect } from "vitest";
import { mortgageOverpayment } from "./overpayment";

describe("mortgageOverpayment", () => {
  it("no overpayment matches original", () => {
    const r = mortgageOverpayment({ balance: 200_000, annualRatePct: 5, remainingYears: 25 });
    expect(r.monthsSaved).toBeLessThanOrEqual(1);
    expect(r.interestSaved).toBeLessThan(50);
  });

  it("monthly overpayment shortens term", () => {
    const r = mortgageOverpayment({ balance: 200_000, annualRatePct: 5, remainingYears: 25, monthlyOverpayment: 200 });
    expect(r.monthsSaved).toBeGreaterThan(40);
    expect(r.interestSaved).toBeGreaterThan(15_000);
  });

  it("lump sum reduces balance immediately", () => {
    const r = mortgageOverpayment({ balance: 200_000, annualRatePct: 5, remainingYears: 25, lumpSumNow: 20_000 });
    expect(r.interestSaved).toBeGreaterThan(15_000);
  });
});
