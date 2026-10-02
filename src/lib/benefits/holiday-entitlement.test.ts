import { describe, expect, it } from "vitest";
import { holidayEntitlement, holidayFromIrregularHours, holidayPlan } from "./holiday-entitlement";

describe("holiday entitlement", () => {
  it("5-day week capped at 28", () => {
    expect(holidayEntitlement({ daysPerWeek: 5 }).annualDays).toBe(28);
  });
  it("3-day week → 16.8 days", () => {
    expect(holidayEntitlement({ daysPerWeek: 3 }).annualDays).toBeCloseTo(16.8, 2);
  });
  it("6-day week without cap = 33.6", () => {
    expect(holidayEntitlement({ daysPerWeek: 6, applyStatutoryCap: false }).annualDays).toBeCloseTo(33.6, 2);
  });
  it("6-day week with cap stays at 28", () => {
    expect(holidayEntitlement({ daysPerWeek: 6 }).annualDays).toBe(28);
  });
});

describe("irregular hours", () => {
  it("12.07% accrual", () => {
    expect(holidayFromIrregularHours(100).hoursAccrued).toBeCloseTo(12.07, 2);
  });
});

describe("holidayPlan", () => {
  it("gives 28 days for a five-day week", () => {
    expect(holidayPlan({ basis: "days", daysPerWeek: 5 }).statutory).toBe(28);
  });
  it("gives 5.6 weeks of hours", () => {
    expect(holidayPlan({ basis: "hours", hoursPerWeek: 20 }).statutory).toBeCloseTo(112, 6);
  });
  it("uses a bigger contract entitlement and pro-rates part years", () => {
    const r = holidayPlan({ basis: "days", daysPerWeek: 5, contractDays: 33, monthsEmployed: 6 });
    expect(r.fullYear).toBe(33);
    expect(r.thisYear).toBeCloseTo(16.5, 6);
  });
  it("values a day of holiday from weekly pay", () => {
    expect(holidayPlan({ basis: "days", daysPerWeek: 5, weeklyPay: 600 }).unitPay).toBe(120);
  });
});
