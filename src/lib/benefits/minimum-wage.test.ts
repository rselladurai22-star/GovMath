import { describe, expect, it } from "vitest";
import { checkMinimumWage } from "./minimum-wage";

describe("minimum wage", () => {
  it("compliant at exact rate", () => {
    const r = checkMinimumWage({ band: "national-living-wage", hourlyPay: 12.21, hoursPerWeek: 40 });
    expect(r.compliant).toBe(true);
    expect(r.shortfallPerHour).toBe(0);
  });
  it("shortfall flagged", () => {
    const r = checkMinimumWage({ band: "national-living-wage", hourlyPay: 11, hoursPerWeek: 40 });
    expect(r.compliant).toBe(false);
    expect(r.shortfallPerHour).toBeCloseTo(1.21, 2);
    expect(r.weeklyShortfall).toBeCloseTo(48.4, 2);
  });
});
