import { describe, expect, it } from "vitest";
import { marriageAllowance, payRise, salarySacrifice } from "./tax/pay-and-perks";
import { remortgage } from "./property/remortgage";
import { dayRate, vatThreshold } from "./business/freelance";
import { carFinance } from "./vehicles/car-finance";
import { computeTakeHome } from "./tax/take-home-engine";

describe("Pay rise", () => {
  it("keeps 72p in the pound at basic rate", () => {
    const r = payRise({ salary: 30_000, newSalary: 31_000, region: "ruk", plan: "none", pensionPct: 0, inflation: 0, children: 0 });
    expect(r.extra).toBeCloseTo(720, 6);
    expect(r.keptShare).toBeCloseTo(0.72, 6);
  });
  it("counts the Child Benefit charge", () => {
    const r = payRise({ salary: 60_000, newSalary: 62_000, region: "ruk", plan: "none", pensionPct: 0, inflation: 0, children: 2 });
    expect(r.extraCharge).toBeGreaterThan(0);
    expect(r.extraAfterCharge).toBeLessThan(r.extra);
  });
});

describe("Salary sacrifice", () => {
  it("saves tax and NI on a pension sacrifice", () => {
    const r = salarySacrifice({ salary: 40_000, amount: 2_000, kind: "pension", region: "ruk", plan: "none", employerShare: 0, hours: 37.5 });
    expect(r.cost).toBeCloseTo(2_000 * 0.72, 6);
    expect(r.employerNiSaved).toBeCloseTo(300, 6);
  });
  it("saves only NI on other benefits", () => {
    const r = salarySacrifice({ salary: 40_000, amount: 2_000, kind: "other", region: "ruk", plan: "none", employerShare: 0, hours: 37.5 });
    expect(r.taxSaved).toBe(0);
    expect(r.cost).toBeCloseTo(2_000 * 0.92, 6);
  });
  it("flags pay below the minimum wage", () => {
    expect(salarySacrifice({ salary: 25_000, amount: 1_000, kind: "pension", region: "ruk", plan: "none", employerShare: 0, hours: 37.5 }).belowMinimumWage).toBe(true);
  });
});

describe("Marriage Allowance", () => {
  it("saves £252 for a basic-rate couple", () => {
    const r = marriageAllowance({ transferorIncome: 8_000, recipientIncome: 30_000, transferorScotland: false, recipientScotland: false, backdate: 4 });
    expect(r.netGain).toBe(252);
    expect(r.total).toBe(1_260);
  });
  it("is reduced when the lower earner is close to the allowance", () => {
    expect(marriageAllowance({ transferorIncome: 12_000, recipientIncome: 30_000, transferorScotland: false, recipientScotland: false, backdate: 0 }).netGain).toBeCloseTo(252 - 690 * 0.2, 6);
  });
  it("rules out higher-rate recipients", () => {
    expect(marriageAllowance({ transferorIncome: 0, recipientIncome: 55_000, transferorScotland: false, recipientScotland: false, backdate: 0 }).eligible).toBe(false);
    expect(marriageAllowance({ transferorIncome: 0, recipientIncome: 45_000, transferorScotland: false, recipientScotland: true, backdate: 0 }).eligible).toBe(false);
  });
});

describe("Remortgage", () => {
  it("compares payments and adds up fees", () => {
    const r = remortgage({ balance: 200_000, currentRate: 7.5, newRate: 4.5, termYears: 20, dealYears: 2, fee: 999, addFee: false, otherCosts: 0, ercPct: 0 });
    expect(r.monthlySaving).toBeGreaterThan(300);
    expect(r.upfront).toBe(999);
    expect(r.breakEvenMonths).toBeLessThan(4);
    expect(r.netSaving).toBeGreaterThan(r.monthlySaving * 24 - 999);
  });
});

describe("VAT threshold and day rate", () => {
  it("sets the registration dates", () => {
    const r = vatThreshold({ rolling: 91_000, next30: 5_000, nextMonth: 8_000, droppingOut: 7_000, monthEnd: "2026-09-30", consumerShare: 1, costsWithVat: 0 });
    expect(r.notifyBy).toBe("2026-10-30");
    expect(r.registeredFrom).toBe("2026-11-01");
    expect(r.yearlyCost).toBeCloseTo(91_000 / 6, 6);
  });
  it("finds a day rate for a take-home", () => {
    const r = dayRate({ target: 40_000, expenses: 3_000, pension: 0, weeksOff: 5, bankHolidays: 8, sickDays: 5, nonBillable: 20, daysPerWeek: 5, scottish: false, plan: "none" });
    expect(r.billableDays).toBe(202);
    expect(r.dayRate).toBeCloseTo(r.turnover / 202, 6);
    expect(r.profit - r.tax - r.ni).toBeGreaterThanOrEqual(40_000 - 1);
    // Self-employed NI is lower than employee NI, so the profit needed is below the equivalent salary.
    expect(computeTakeHome({ gross: r.profit, bonus: 0, pensionPct: 0, plan: "none" }).takeHome).toBeLessThan(40_000);
  });
});

describe("Car finance", () => {
  it("prices HP and PCP", () => {
    const hp = carFinance({ price: 20_000, deposit: 2_000, apr: 0, months: 48, type: "hp", balloon: 0, optionFee: 10 });
    expect(hp.monthly).toBeCloseTo(375, 6);
    const pcp = carFinance({ price: 20_000, deposit: 2_000, apr: 9.9, months: 48, type: "pcp", balloon: 8_000, optionFee: 10 });
    expect(pcp.monthly).toBeLessThan(carFinance({ price: 20_000, deposit: 2_000, apr: 9.9, months: 48, type: "hp", balloon: 0, optionFee: 10 }).monthly);
    expect(pcp.totalToOwn).toBeCloseTo(2_000 + pcp.payments + 8_010, 6);
  });
});
