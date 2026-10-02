import { describe, expect, it } from "vitest";
import { fromHourly, fromSalary } from "./hourly";

describe("hourly conversions", () => {
  it("turns £15 an hour at 37.5 hours into £29,250 a year", () => {
    expect(fromHourly(15, { hours: 37.5 }).annual).toBeCloseTo(29_250, 2);
  });
  it("adds overtime at time and a half", () => {
    const r = fromHourly(20, { hours: 40, overtimeHours: 5, overtimeRate: 1.5 });
    expect(r.annualOvertime).toBeCloseTo(20 * 1.5 * 5 * 52, 2);
  });
  it("uses fewer paid weeks when holiday is unpaid", () => {
    expect(fromHourly(20, { hours: 40, weeks: 47 }).annual).toBeCloseTo(37_600, 2);
  });
  it("turns a £30,000 salary at 37.5 hours into £15.38 an hour", () => {
    expect(fromSalary(30_000, { hours: 37.5 }).hourly).toBeCloseTo(15.38, 2);
  });
  it("returns zero with no hours", () => {
    expect(fromSalary(30_000, { hours: 0 }).hourly).toBe(0);
  });
});
