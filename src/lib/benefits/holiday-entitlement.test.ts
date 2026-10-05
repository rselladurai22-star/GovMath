import { describe, expect, it } from "vitest";
import { holidayPlan } from "./holiday-entitlement";

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
