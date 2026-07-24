import { describe, expect, it } from "vitest";
import { mortgageRepayment } from "../mortgage";
import {
  computeMortgage,
  monthlyPaymentFor,
  paymentAtRateShift,
  nextLtvBand,
  type MortgageInputs,
} from "./mortgage-engine";

const base: MortgageInputs = {
  price: 300000,
  deposit: 60000,
  ratePct: 4.5,
  termYears: 25,
  type: "repayment",
  overpayment: 0,
};

describe("mortgage engine", () => {
  it("matches the standard PMT payment and LTV", () => {
    const snap = computeMortgage(base);
    const ref = mortgageRepayment(240000, 4.5, 25, 300000);
    expect(snap.loan).toBe(240000);
    expect(snap.ltv).toBeCloseTo(0.8, 4);
    expect(snap.monthlyPayment).toBeCloseTo(ref.monthlyPayment, 2);
  });

  it("overpaying shortens the term and saves interest", () => {
    const withOver = computeMortgage({ ...base, overpayment: 200 });
    expect(withOver.overpayment.active).toBe(true);
    expect(withOver.overpayment.monthsSaved).toBeGreaterThan(12);
    expect(withOver.overpayment.interestSaved).toBeGreaterThan(10000);
    expect(withOver.payoffMonths).toBeLessThan(25 * 12);
  });

  it("interest-only leaves the full loan owed at the end", () => {
    const io = computeMortgage({ ...base, type: "interest-only" });
    expect(io.monthlyPayment).toBeCloseTo((240000 * 4.5) / 100 / 12, 2);
    expect(io.balloon).toBeCloseTo(240000, 0);
    // Interest-only pays no capital, so total interest > repayment interest.
    const rep = computeMortgage(base);
    expect(io.totalInterest).toBeGreaterThan(rep.totalInterest);
  });

  it("rate shocks raise the contractual payment", () => {
    const now = monthlyPaymentFor(240000, 4.5, 25, "repayment");
    expect(paymentAtRateShift(base, 0)).toBeCloseTo(now, 2);
    expect(paymentAtRateShift(base, 1)).toBeGreaterThan(now);
    expect(paymentAtRateShift(base, -1)).toBeLessThan(now);
  });

  it("flags LTV above the cheapest band", () => {
    expect(nextLtvBand(0.9)?.band.max).toBe(0.6);
    expect(nextLtvBand(0.55)).toBeNull();
  });

  it("total repaid = loan + total interest for a repayment mortgage", () => {
    const snap = computeMortgage(base);
    expect(snap.totalRepaid).toBeCloseTo(snap.loan + snap.totalInterest, 0);
  });
});
