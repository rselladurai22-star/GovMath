import { describe, expect, it } from "vitest";
import { holidayEntitlement, holidayFromIrregularHours } from "./holiday-entitlement";

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
