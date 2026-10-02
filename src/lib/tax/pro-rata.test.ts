import { describe, expect, it } from "vitest";
import { proRata } from "./pro-rata";

describe("proRata", () => {
  it("scales a £40,000 salary to 30 of 37.5 hours", () => {
    const r = proRata({ fullTimeSalary: 40_000, hours: 30, fullTimeHours: 37.5 });
    expect(r.fte).toBeCloseTo(0.8, 6);
    expect(r.salary).toBeCloseTo(32_000, 2);
  });
  it("scales by days", () => {
    const r = proRata({ fullTimeSalary: 40_000, basis: "days", days: 3 });
    expect(r.salary).toBeCloseTo(24_000, 2);
  });
  it("pro-rates holiday, including bank holidays", () => {
    const r = proRata({ fullTimeSalary: 40_000, basis: "days", days: 3, fullTimeHolidayDays: 33 });
    expect(r.holidayDays).toBeCloseTo(19.8, 6);
    expect(r.holidayHours).toBeCloseTo(19.8 * 7.5, 6);
  });
  it("counts only the months worked", () => {
    const r = proRata({ fullTimeSalary: 40_000, hours: 37.5, months: 6 });
    expect(r.earnedThisYear).toBeCloseTo(20_000, 2);
    expect(r.holidayDays).toBeCloseTo(16.5, 6);
  });
  it("keeps the hourly rate the same as full time", () => {
    const ft = proRata({ fullTimeSalary: 39_000, hours: 37.5 });
    const pt = proRata({ fullTimeSalary: 39_000, hours: 20 });
    expect(pt.hourly).toBeCloseTo(ft.hourly, 6);
  });
});
