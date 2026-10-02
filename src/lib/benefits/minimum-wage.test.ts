import { describe, expect, it } from "vitest";
import { checkMinimumWage, minimumWageAudit } from "./minimum-wage";

describe("minimum wage", () => {
  it("compliant at exact rate", () => {
    const r = checkMinimumWage({ band: "national-living-wage", hourlyPay: 12.71, hoursPerWeek: 40 });
    expect(r.compliant).toBe(true);
    expect(r.shortfallPerHour).toBe(0);
  });
  it("shortfall flagged", () => {
    const r = checkMinimumWage({ band: "national-living-wage", hourlyPay: 11, hoursPerWeek: 40 });
    expect(r.compliant).toBe(false);
    expect(r.shortfallPerHour).toBeCloseTo(1.71, 2);
    expect(r.weeklyShortfall).toBeCloseTo(68.4, 2);
  });
});


describe("minimumWageAudit", () => {
  it("counts unpaid required time", () => {
    const r = minimumWageAudit({ band: "national-living-wage", hourlyPay: 13, paidHours: 37.5, unpaidHours: 2.5 });
    expect(r.effectiveRate).toBeCloseTo(487.5 / 40, 6);
    expect(r.compliant).toBe(false);
    expect(r.weeklyShortfall).toBeCloseTo(12.71 * 40 - 487.5, 6);
  });
  it("deducts uniform costs from pay that counts", () => {
    const r = minimumWageAudit({ band: "national-living-wage", hourlyPay: 12.71, paidHours: 40, deductionsPerWeek: 10 });
    expect(r.compliant).toBe(false);
    expect(r.weeklyShortfall).toBeCloseTo(10, 6);
  });
  it("only counts accommodation charges above the offset", () => {
    const ok = minimumWageAudit({ band: "national-living-wage", hourlyPay: 12.71, paidHours: 40, accommodationNights: 7, accommodationChargePerWeek: 77.7 });
    expect(ok.compliant).toBe(true);
    const over = minimumWageAudit({ band: "national-living-wage", hourlyPay: 12.71, paidHours: 40, accommodationNights: 7, accommodationChargePerWeek: 100 });
    expect(over.accommodationReduction).toBeCloseTo(22.3, 6);
  });
  it("works out back pay over a number of weeks", () => {
    const r = minimumWageAudit({ band: "18-20", hourlyPay: 10, paidHours: 20, weeks: 10 });
    expect(r.owed).toBeCloseTo((10.85 - 10) * 20 * 10, 6);
  });
});
