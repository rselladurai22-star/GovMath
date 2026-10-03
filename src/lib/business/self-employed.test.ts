import { describe, expect, it } from "vitest";
import { cisInvoice, cisYear, incomeTaxWithPension, poaPlan, selfEmployedTax } from "./self-employed";
import { mileageClaim } from "./mileage";
import { incomeTax } from "../tax/2026-27";

const base = { turnover: 0, expenses: 0, tradingAllowance: false, otherIncome: 0, scottish: false, plan: "none" as const, pension: 0, voluntaryClass2: false };

describe("selfEmployedTax", () => {
  it("£40,000 profit: Income Tax and Class 4", () => {
    const r = selfEmployedTax({ ...base, turnover: 50_000, expenses: 10_000 });
    expect(r.profit).toBe(40_000);
    expect(r.incomeTaxOnProfit).toBeCloseTo(5486, 2);
    expect(r.class4).toBeCloseTo(1645.8, 2);
    expect(r.keep).toBeCloseTo(40_000 - 5486 - 1645.8, 2);
    expect(r.marginalRate).toBeCloseTo(0.26, 4);
  });
  it("trading allowance replaces expenses", () => {
    const r = selfEmployedTax({ ...base, turnover: 20_000, expenses: 500, tradingAllowance: true });
    expect(r.deduction).toBe(1000);
    expect(r.profit).toBe(19_000);
  });
  it("side income on top of a salary is taxed at the salary's top rate", () => {
    const r = selfEmployedTax({ ...base, turnover: 10_000, otherIncome: 60_000 });
    expect(r.incomeTaxOnProfit).toBeCloseTo(4000, 2);
    expect(r.class4).toBeCloseTo(0, 2);
  });
  it("voluntary Class 2 below the Small Profits Threshold", () => {
    const r = selfEmployedTax({ ...base, turnover: 5000, voluntaryClass2: true });
    expect(r.getsNiCredit).toBe(false);
    expect(r.class2).toBeCloseTo(189.8, 2);
  });
  it("student loan on total income", () => {
    const r = selfEmployedTax({ ...base, turnover: 40_000, plan: "plan2" });
    expect(r.studentLoan).toBeCloseTo((40_000 - 29_385) * 0.09, 2);
  });
});

describe("incomeTaxWithPension", () => {
  it("basic-rate taxpayer gets no extra relief", () => {
    expect(incomeTaxWithPension(40_000, 5000, false)).toBeCloseTo(incomeTax(40_000).total, 2);
  });
  it("higher-rate taxpayer saves 20% more through band extension", () => {
    expect(incomeTaxWithPension(70_000, 10_000, false)).toBeCloseTo(incomeTax(70_000).total - 2000, 2);
  });
  it("contribution below the personal allowance", () => {
    expect(incomeTaxWithPension(15_000, 5000, false)).toBeCloseTo(incomeTax(15_000).total, 2);
  });
});

describe("poaPlan", () => {
  it("first year: full bill plus 50% in January", () => {
    const r = poaPlan({ lastBill: 8000, lastOther: 0, lastPoasPaid: 0, lastAtSource: 0, thisBill: 8000, thisOther: 0, reduceTo: -1 });
    expect(r.january).toBe(12_000);
    expect(r.july).toBe(4000);
    expect(r.thisBalance).toBe(0);
    expect(r.nextJanuary).toBe(4000);
  });
  it("no POAs under £1,000", () => {
    const r = poaPlan({ lastBill: 900, lastOther: 0, lastPoasPaid: 0, lastAtSource: 0, thisBill: 900, thisOther: 0, reduceTo: -1 });
    expect(r.needsPoa).toBe(false);
    expect(r.reason).toBe("under-1000");
  });
  it("no POAs when over 80% collected at source", () => {
    const r = poaPlan({ lastBill: 2000, lastOther: 0, lastPoasPaid: 0, lastAtSource: 9000, thisBill: 2000, thisOther: 0, reduceTo: -1 });
    expect(r.reason).toBe("at-source");
  });
  it("reduced POAs and a balancing payment", () => {
    const r = poaPlan({ lastBill: 10_000, lastOther: 0, lastPoasPaid: 8000, lastAtSource: 0, thisBill: 6000, thisOther: 500, reduceTo: 3000 });
    expect(r.lastBalance).toBe(2000);
    expect(r.poa).toBe(3000);
    expect(r.thisBalance).toBe(500);
    expect(r.underpaidByReduction).toBe(false);
  });
});

describe("CIS", () => {
  it("deducts on labour only", () => {
    const r = cisInvoice({ labour: 2000, materials: 800, status: "registered", vatRegistered: false, reverseCharge: false });
    expect(r.deduction).toBe(400);
    expect(r.paid).toBe(2400);
  });
  it("reverse charge: no VAT paid to the subcontractor", () => {
    const r = cisInvoice({ labour: 2000, materials: 800, status: "registered", vatRegistered: true, reverseCharge: true });
    expect(r.vat).toBe(0);
    expect(r.reverseChargeVat).toBe(560);
    expect(r.paid).toBe(2400);
  });
  it("a year's refund", () => {
    const r = cisYear({ labour: 30_000, materials: 5000, expenses: 9000, status: "registered", otherIncome: 0, scottish: false });
    expect(r.profit).toBe(26_000);
    expect(r.deducted).toBe(6000);
    expect(r.refund).toBeCloseTo(6000 - (2686 + 805.8), 2);
  });
});

describe("mileageClaim", () => {
  it("prior miles use up the 45p band", () => {
    const r = mileageClaim({ role: "self", vehicle: "car", miles: 4000, priorMiles: 8000, passengerMiles: 0, employerPence: 0, reliefRate: 0.26 });
    expect(r.atFirstRate).toBe(2000);
    expect(r.atSecondRate).toBe(2000);
    expect(r.approved).toBeCloseTo(1400, 6);
    expect(r.taxSaved).toBeCloseTo(364, 6);
  });
  it("employee claims relief on the shortfall", () => {
    const r = mileageClaim({ role: "employee", vehicle: "car", miles: 5000, priorMiles: 0, passengerMiles: 0, employerPence: 25, reliefRate: 0.2 });
    expect(r.reliefClaim).toBeCloseTo(1000, 6);
    expect(r.taxSaved).toBeCloseTo(200, 6);
  });
  it("employer paying above 45p creates a taxable excess", () => {
    const r = mileageClaim({ role: "employee", vehicle: "car", miles: 1000, priorMiles: 0, passengerMiles: 0, employerPence: 55, reliefRate: 0.2 });
    expect(r.taxableExcess).toBeCloseTo(100, 6);
  });
});

import { expensesStudy } from "./allowable-expenses";

describe("expensesStudy", () => {
  it("saves tax at 26% for a basic-rate sole trader", () => {
    const r = expensesStudy({ turnover: 40_000, costs: { office: 1000, marketing: 500 }, miles: 2000, wfhBand: "mid", wfhMonths: 12, otherIncome: 0, scottish: false });
    expect(r.mileage).toBe(900);
    expect(r.wfh).toBe(216);
    expect(r.total).toBe(2616);
    expect(r.saved).toBeCloseTo(2616 * 0.26, 2);
    expect(r.allowanceBetter).toBe(false);
  });
  it("trading allowance wins for small costs", () => {
    const r = expensesStudy({ turnover: 5000, costs: { office: 300 }, miles: 0, wfhBand: "none", wfhMonths: 0, otherIncome: 30_000, scottish: false });
    expect(r.allowanceBetter).toBe(true);
  });
});
