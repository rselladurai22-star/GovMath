import { describe, expect, it } from "vitest";
import { proRataSalary, hourlyToSalary, salaryToHourly } from "./salary-conversions";

const round = (n: number) => Math.round(n * 100) / 100;

describe("proRataSalary", () => {
  it("full time = same salary", () => {
    const r = proRataSalary({ fullTimeSalary: 40_000, partTimeHoursPerWeek: 37.5 });
    expect(r.annual).toBe(40_000);
    expect(r.fraction).toBe(1);
  });

  it("half time = half salary", () => {
    const r = proRataSalary({ fullTimeSalary: 40_000, partTimeHoursPerWeek: 18.75 });
    expect(r.annual).toBe(20_000);
    expect(r.fraction).toBe(0.5);
  });

  it("4-day week on a 37.5h base = 80% of salary", () => {
    const r = proRataSalary({ fullTimeSalary: 50_000, partTimeHoursPerWeek: 30 });
    expect(r.annual).toBe(40_000);
    expect(round(r.fraction)).toBe(0.8);
  });

  it("monthly/weekly/daily derived from annual", () => {
    const r = proRataSalary({ fullTimeSalary: 52_000, partTimeHoursPerWeek: 37.5 });
    expect(round(r.monthly)).toBe(round(52_000 / 12));
    expect(round(r.weekly)).toBe(1000);
    expect(round(r.daily)).toBe(200);
  });

  it("zero hours = zero", () => {
    const r = proRataSalary({ fullTimeSalary: 50_000, partTimeHoursPerWeek: 0 });
    expect(r.annual).toBe(0);
  });

  it("custom full-time base (40h) is respected", () => {
    const r = proRataSalary({
      fullTimeSalary: 40_000,
      partTimeHoursPerWeek: 20,
      fullTimeHoursPerWeek: 40,
    });
    expect(r.fraction).toBe(0.5);
    expect(r.annual).toBe(20_000);
  });
});

describe("hourlyToSalary", () => {
  it("£15/h × 37.5h × 52w = £29,250", () => {
    const r = hourlyToSalary({ hourlyRate: 15, hoursPerWeek: 37.5 });
    expect(r.annual).toBe(29_250);
    expect(round(r.weekly)).toBe(562.5);
    expect(round(r.monthly)).toBe(round(29_250 / 12));
  });

  it("£0/h → £0", () => {
    const r = hourlyToSalary({ hourlyRate: 0, hoursPerWeek: 40 });
    expect(r.annual).toBe(0);
  });
});

describe("salaryToHourly", () => {
  it("£29,250 / (37.5h × 52w) = £15/h", () => {
    const r = salaryToHourly(29_250, 37.5);
    expect(round(r.hourly)).toBe(15);
  });

  it("invalid hours → 0", () => {
    const r = salaryToHourly(50_000, 0);
    expect(r.hourly).toBe(0);
  });
});
