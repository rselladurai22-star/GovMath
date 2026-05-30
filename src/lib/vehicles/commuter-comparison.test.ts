import { describe, it, expect } from "vitest";
import { commuterComparison } from "./commuter-comparison";

describe("commuterComparison", () => {
  it("flags rail as cheaper for an expensive driving setup", () => {
    const r = commuterComparison({
      annualSeasonTicket: 3000,
      oneWayMiles: 30,
      mpg: 40,
      pencePerLitre: 145,
      parkingPerDay: 12,
      daysPerWeek: 5,
      weeksPerYear: 48,
    });
    expect(r.cheaper).toBe("rail");
    expect(r.drivingAnnual).toBeGreaterThan(r.railAnnual);
  });

  it("flags driving as cheaper for short trip with free parking", () => {
    const r = commuterComparison({
      annualSeasonTicket: 2000,
      oneWayMiles: 4,
      mpg: 55,
      pencePerLitre: 140,
      parkingPerDay: 0,
      daysPerWeek: 5,
      weeksPerYear: 48,
    });
    expect(r.cheaper).toBe("drive");
  });

  it("computes annual fuel cost with UK gallon conversion", () => {
    const r = commuterComparison({
      annualSeasonTicket: 0,
      oneWayMiles: 10,
      mpg: 40,
      pencePerLitre: 150,
      parkingPerDay: 0,
      daysPerWeek: 5,
      weeksPerYear: 48,
    });
    // 10 mi × 2 × 5 × 48 = 4800 mi / 40 mpg = 120 gal × 4.546 L = 545.52 L × £1.50 ≈ £818.28
    expect(r.fuelAnnual).toBeGreaterThan(800);
    expect(r.fuelAnnual).toBeLessThan(830);
  });

  it("avoids divide-by-zero when mpg is 0", () => {
    const r = commuterComparison({
      annualSeasonTicket: 100,
      oneWayMiles: 5,
      mpg: 0,
      pencePerLitre: 140,
      parkingPerDay: 0,
      daysPerWeek: 5,
      weeksPerYear: 48,
    });
    expect(r.fuelAnnual).toBe(0);
  });
});
