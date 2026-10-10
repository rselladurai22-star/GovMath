import { describe, expect, it } from "vitest";
import { autoLoan, monthlyPayment } from "./loans";
import {
  aprToMoneyFactor,
  carBudget,
  carLease,
  consolidate,
  fuelPerMonth,
  leaseVsBuy,
  loanForPayment,
  maxCarPrice,
  personalLoan,
  PERSONAL_LOAN_TIERS,
  rule20410,
  transferPlan,
  type LeaseInput,
} from "./borrowing";

describe("personal loans", () => {
  it("tiers rise as credit falls", () => {
    const t = PERSONAL_LOAN_TIERS;
    expect(t.excellent.aprPct).toBeLessThan(t.good.aprPct);
    expect(t.good.aprPct).toBeLessThan(t.fair.aprPct);
    expect(t.fair.aprPct).toBeLessThan(t.bad.aprPct);
  });

  it("with no fee matches the plain payment", () => {
    const p = personalLoan(10_000, 12, 36, 0, "deducted");
    expect(p.payment).toBeCloseTo(monthlyPayment(10_000, 12, 36), 6);
    expect(p.received).toBe(10_000);
    expect(p.totalCost).toBeCloseTo(p.totalInterest, 6);
  });

  it("deducts the fee from the cash", () => {
    const p = personalLoan(10_000, 12, 36, 5, "deducted");
    expect(p.fee).toBeCloseTo(500, 6);
    expect(p.received).toBeCloseTo(9_500, 6);
    expect(p.borrowed).toBe(10_000);
    expect(p.trueAprPct).toBeGreaterThan(12);
    expect(p.totalCost).toBeCloseTo(p.totalInterest + 500, 6);
  });

  it("grosses up so you receive the amount", () => {
    const p = personalLoan(10_000, 12, 36, 5, "deducted", true);
    expect(p.received).toBeCloseTo(10_000, 6);
    expect(p.borrowed).toBeCloseTo(10_526.32, 2);
  });

  it("adds the fee to the balance", () => {
    const p = personalLoan(10_000, 12, 36, 5, "added");
    expect(p.borrowed).toBeCloseTo(10_500, 6);
    expect(p.received).toBe(10_000);
  });
});

const LEASE: LeaseInput = {
  msrp: 40_000,
  price: 38_000,
  down: 2_000,
  tradeIn: 0,
  tradeOwed: 0,
  rebate: 0,
  residualPct: 58,
  moneyFactor: 0.0025,
  months: 36,
  acquisitionFee: 995,
  capitalizeAcquisitionFee: true,
  dispositionFee: 395,
  signingFees: 500,
  taxRate: 0.07,
  taxMethod: "payment",
  taxDown: true,
};

describe("car lease", () => {
  it("splits the payment into depreciation and rent charge", () => {
    const l = carLease(LEASE);
    expect(l.grossCap).toBeCloseTo(38_995, 6);
    expect(l.adjustedCap).toBeCloseTo(36_995, 6);
    expect(l.residual).toBeCloseTo(23_200, 6);
    expect(l.depreciation).toBeCloseTo((36_995 - 23_200) / 36, 6);
    expect(l.rentCharge).toBeCloseTo((36_995 + 23_200) * 0.0025, 6);
    expect(l.payment).toBeCloseTo(l.basePayment * 1.07, 6);
    expect(l.upfrontTax).toBeCloseTo(140, 6);
    expect(l.aprEquivalent).toBeCloseTo(6, 6);
    expect(l.dueAtSigning).toBeCloseTo(l.payment + 2_000 + 140 + 500, 6);
    expect(l.totalCost).toBeCloseTo(l.payment * 36 + 2_000 + 140 + 500 + 395, 6);
  });

  it("taxes upfront by the state's method", () => {
    const pay = carLease({ ...LEASE, taxMethod: "upfront-payments" });
    expect(pay.monthlyTax).toBe(0);
    expect(pay.upfrontTax).toBeCloseTo(pay.basePayment * 36 * 0.07 + 140, 6);
    const price = carLease({ ...LEASE, taxMethod: "upfront-price" });
    expect(price.upfrontTax).toBeCloseTo(38_000 * 0.07, 6);
    expect(carLease({ ...LEASE, taxMethod: "none" }).upfrontTax).toBe(0);
  });

  it("rolls negative equity into the cap cost", () => {
    const l = carLease({ ...LEASE, tradeIn: 5_000, tradeOwed: 7_000 });
    expect(l.grossCap).toBeCloseTo(38_995 + 2_000, 6);
    const pos = carLease({ ...LEASE, tradeIn: 5_000, tradeOwed: 1_000 });
    expect(pos.capReduction).toBeCloseTo(2_000 + 4_000, 6);
  });

  it("money factor converts from APR", () => {
    expect(aprToMoneyFactor(6)).toBeCloseTo(0.0025, 9);
  });

  it("compares with buying", () => {
    const c = leaseVsBuy(LEASE, 7, 60);
    expect(c.owedAtLeaseEnd).toBeGreaterThan(0);
    expect(c.carValue).toBeCloseTo(23_200, 6);
    expect(c.buyNetCost).toBeCloseTo(c.buyPaidByLeaseEnd + c.owedAtLeaseEnd - 23_200, 6);
    // A loan shorter than the lease is fully repaid by then.
    expect(leaseVsBuy(LEASE, 7, 24).owedAtLeaseEnd).toBe(0);
  });
});

describe("car affordability", () => {
  it("fuel per month", () => {
    expect(fuelPerMonth(12_000, 30, 3.5)).toBeCloseTo(116.67, 2);
    expect(fuelPerMonth(12_000, 0, 3.5)).toBe(0);
  });

  it("loanForPayment inverts the payment", () => {
    const l = loanForPayment(500, 7, 60);
    expect(monthlyPayment(l, 7, 60)).toBeCloseTo(500, 6);
  });

  it("maxCarPrice inverts autoLoan", () => {
    for (const after of [true, false]) {
      const price = maxCarPrice({ loan: 25_000, down: 3_000, tradeIn: 4_000, tradeOwed: 1_000, salesTaxRate: 0.07, taxAfterTradeIn: after, fees: 800 });
      const a = autoLoan({ price, down: 3_000, tradeIn: 4_000, tradeOwed: 1_000, rebate: 0, salesTaxRate: 0.07, taxAfterTradeIn: after, fees: 800, financeTaxAndFees: true, aprPct: 7, months: 60 });
      expect(a.amountFinanced).toBeCloseTo(25_000, 4);
    }
  });

  it("carBudget payment matches the check loan", () => {
    const b = carBudget({ monthlyIncome: 6_000, sharePct: 15, includeRunning: true, insurance: 150, fuel: 150, down: 4_000, tradeIn: 0, tradeOwed: 0, aprPct: 7, months: 60, salesTaxRate: 0.07, taxAfterTradeIn: true, fees: 800 });
    expect(b.payment).toBeCloseTo(600, 6);
    expect(b.check.payment).toBeCloseTo(600, 4);
    expect(b.monthlyCarCost).toBeCloseTo(900, 4);
  });

  it("returns zero when the running costs use up the budget", () => {
    const b = carBudget({ monthlyIncome: 2_000, sharePct: 10, includeRunning: true, insurance: 150, fuel: 150, down: 0, tradeIn: 0, tradeOwed: 0, aprPct: 7, months: 60, salesTaxRate: 0.07, taxAfterTradeIn: true, fees: 800 });
    expect(b.payment).toBe(0);
    expect(b.maxPrice).toBe(0);
  });

  it("20/4/10 rule", () => {
    const r = rule20410(8_000, 7, 150, 0, 0.07, 0);
    expect(r.payment).toBeCloseTo(650, 6);
    expect(r.loan).toBeCloseTo(0.87 * r.price, 4);
    expect(r.downNeeded).toBeCloseTo(0.2 * r.price, 6);
  });
});

describe("debt consolidation", () => {
  const debts = [
    { name: "Card A", balance: 8_000, aprPct: 24, payment: 250 },
    { name: "Card B", balance: 4_000, aprPct: 28, payment: 140 },
    { name: "Empty", balance: 0, aprPct: 20, payment: 50 },
  ];

  it("borrows enough to clear the debts after the fee", () => {
    const c = consolidate(debts, 13, 36, 5, "deducted");
    expect(c.total).toBe(12_000);
    expect(c.currentPayment).toBe(390);
    expect(c.loan.received).toBeCloseTo(12_000, 6);
    expect(c.averageAprPct).toBeCloseTo((8_000 * 24 + 4_000 * 28) / 12_000, 6);
    expect(c.saving).toBeCloseTo(c.current.totalInterest - c.loan.totalCost, 6);
    expect(c.saving).toBeGreaterThan(0);
  });

  it("paying the old budget on the new loan clears it sooner", () => {
    const c = consolidate(debts, 13, 60, 0, "deducted");
    expect(c.loan.payment).toBeLessThan(390);
    expect(c.sameBudget.months).toBeLessThan(60);
  });

  it("flags a debt whose payment never clears it", () => {
    const c = consolidate([{ name: "X", balance: 10_000, aprPct: 24, payment: 150 }], 12, 36, 0, "deducted");
    expect(c.current.months).toBe(Infinity);
  });
});

describe("balance transfer", () => {
  it("saves interest at 0% and gives the payment to clear", () => {
    const p = transferPlan(6_000, 24, 3, 18, 0, 26, 300);
    expect(p.transfer.fee).toBeCloseTo(180, 6);
    expect(p.payToClear).toBeCloseTo(6_180 / 18, 6);
    expect(p.comparable).toBe(true);
    expect(p.saving).toBeGreaterThan(0);
    expect(p.saving).toBeCloseTo(p.stay.totalPaid - p.transfer.totalPaid, 6);
  });

  it("is not comparable when the current card never clears", () => {
    const p = transferPlan(6_000, 24, 3, 18, 0, 26, 100);
    expect(p.stay.months).toBe(Infinity);
    expect(p.comparable).toBe(false);
    expect(p.saving).toBe(0);
  });
});
