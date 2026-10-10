import { describe, expect, it } from "vitest";
import {
  addDays,
  aprFromPayment,
  aprIfRepaidEarly,
  breakEvenMonth,
  cardCycle,
  cardYear,
  cashAdvanceApr,
  compoundInterest,
  days30360,
  daysBetween,
  dscr,
  offer,
  sba7a,
  simpleInterest,
  simpleRateFor,
  trueApr,
  usDate,
} from "./loan-math";
import { monthlyPayment } from "./loans";

describe("dates", () => {
  it("formats US style", () => {
    expect(usDate("2027-04-15")).toBe("April 15, 2027");
    expect(usDate("bad")).toBe("");
  });
  it("counts actual and 30/360 days", () => {
    expect(daysBetween("2026-01-01", "2027-01-01")).toBe(365);
    expect(daysBetween("2028-01-01", "2029-01-01")).toBe(366);
    expect(days30360("2026-01-31", "2026-03-31")).toBe(60);
    expect(days30360("2026-01-15", "2026-07-15")).toBe(180);
    expect(addDays("2026-12-25", 10)).toBe("2027-01-04");
  });
});

describe("APR", () => {
  it("matches the note rate with no fees", () => {
    expect(trueApr(300_000, 6.25, 360, 0, 0, false).aprPct).toBeCloseTo(6.25, 6);
  });
  it("solves the rate from a payment", () => {
    const pay = monthlyPayment(20_000, 9, 60);
    expect(aprFromPayment(20_000, pay, 60)).toBeCloseTo(9, 6);
    expect(aprFromPayment(20_000, 300, 60)).toBeNull();
    expect(aprFromPayment(10_000, 10_000 / 12, 12)).toBeCloseTo(0, 6);
  });
  it("adds points and fees as prepaid finance charges", () => {
    const r = trueApr(300_000, 6.25, 360, 1, 3_000, false);
    expect(r.financeFees).toBe(6_000);
    expect(r.amountFinanced).toBe(294_000);
    expect(r.aprPct).toBeGreaterThan(6.4);
    expect(r.aprPct).toBeLessThan(6.5);
    expect(aprFromPayment(r.amountFinanced, r.payment, 360)).toBeCloseTo(r.aprPct, 6);
  });
  it("is higher when you repay early", () => {
    const r = trueApr(300_000, 6.25, 360, 1, 3_000, false);
    const five = aprIfRepaidEarly(r.amountFinanced, r.loan, 6.25, 360, 60);
    expect(five).toBeGreaterThan(r.aprPct);
    expect(aprIfRepaidEarly(r.amountFinanced, r.loan, 6.25, 360, 360)).toBeCloseTo(r.aprPct, 4);
  });
});

describe("simple interest", () => {
  it("is P × r × t", () => {
    expect(simpleInterest(10_000, 5, 365, "actual365")).toBeCloseTo(500, 8);
    expect(simpleInterest(10_000, 5, 365, "actual360")).toBeCloseTo(506.94, 2);
    expect(simpleRateFor(10_000, 500, 365, "actual365")).toBeCloseTo(5, 8);
  });
  it("compound beats simple over a year", () => {
    expect(compoundInterest(10_000, 5, 1, 12)).toBeCloseTo(511.62, 2);
    expect(compoundInterest(10_000, 5, 1, 1)).toBeCloseTo(500, 8);
  });
});

describe("business loans", () => {
  it("sets SBA guaranty fees by size", () => {
    expect(sba7a(150_000, 120, false, 6.75).upfrontFee).toBeCloseTo(150_000 * 0.85 * 0.02, 6);
    expect(sba7a(500_000, 120, false, 6.75).upfrontFee).toBeCloseTo(500_000 * 0.75 * 0.03, 6);
    const big = sba7a(2_000_000, 300, false, 6.75);
    expect(big.guaranteed).toBe(1_500_000);
    expect(big.upfrontFee).toBeCloseTo(35_000 + 18_750, 6);
    expect(sba7a(500_000, 12, false, 6.75).upfrontFee).toBeCloseTo(500_000 * 0.75 * 0.0025, 6);
    expect(sba7a(500_000, 120, false, 6.75, true).upfrontFee).toBe(0);
  });
  it("caps the rate at prime plus the spread", () => {
    expect(sba7a(40_000, 120, false, 6.75).maxRatePct).toBe(13.25);
    expect(sba7a(500_000, 120, false, 6.75).maxRatePct).toBe(9.75);
    expect(sba7a(20_000, 120, true, 6.75).maxRatePct).toBe(14.75);
    expect(sba7a(500_000, 120, true, 6.75).maxRatePct).toBe(11.75);
  });
  it("turns a factor rate into an APR", () => {
    const m = cashAdvanceApr(50_000, 1.3, 6, "daily");
    expect(m.payback).toBe(65_000);
    expect(m.payments).toBe(126);
    expect(m.aprPct).toBeGreaterThan(90);
    expect(m.aprPct).toBeLessThan(120);
  });
  it("divides cash flow by debt service", () => {
    expect(dscr(125_000, 100_000)).toBeCloseTo(1.25, 8);
    expect(dscr(1, 0)).toBe(Infinity);
  });
});

describe("credit card cycle", () => {
  it("charges ADB × daily rate × days", () => {
    const c = cardCycle({ balance: 3_000, aprPct: 36.5, days: 30, purchases: 0, purchaseDay: 1, payment: 0, paymentDay: 1, grace: false });
    expect(c.averageDailyBalance).toBeCloseTo(3_000, 8);
    expect(c.interest).toBeCloseTo(90, 8);
  });
  it("charges nothing with a grace period and full payment", () => {
    const c = cardCycle({ balance: 1_000, aprPct: 22, days: 30, purchases: 500, purchaseDay: 5, payment: 1_000, paymentDay: 20, grace: true });
    expect(c.interest).toBe(0);
    expect(c.endBalance).toBe(500);
  });
  it("runs a year and keeps the grace period when paid in full", () => {
    const y = cardYear({ balance: 0, aprPct: 22, days: 30, purchases: 500, purchaseDay: 10, payment: 10_000, paymentDay: 25, grace: true });
    expect(y.totalInterest).toBe(0);
  });
});

describe("offers", () => {
  it("finds the break-even for a higher fee and lower rate", () => {
    const a = offer(20_000, { ratePct: 8, months: 60, fees: 800, financed: false });
    const b = offer(20_000, { ratePct: 10, months: 60, fees: 0, financed: false });
    expect(a.totalCost).toBeLessThan(b.totalCost);
    const k = breakEvenMonth(a, b);
    expect(k).not.toBeNull();
    expect(k!).toBeGreaterThan(1);
    expect(k!).toBeLessThan(60);
    expect(breakEvenMonth(b, a)).toBe(0);
  });
});

describe("partial payment in the grace period", () => {
  it("charges interest only on the unpaid part and new purchases", () => {
    const c = cardCycle({ balance: 1_500, aprPct: 36.5, days: 30, purchases: 0, purchaseDay: 1, payment: 1_400, paymentDay: 20, grace: true });
    expect(c.averageDailyBalance).toBeCloseTo(100, 8);
    expect(c.interest).toBeCloseTo(3, 8);
  });
});
