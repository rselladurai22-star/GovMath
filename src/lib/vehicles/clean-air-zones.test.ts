import { describe, it, expect } from "vitest";
import { cazCost } from "./clean-air-zones";

describe("cazCost", () => {
  it("charges £12.50/day for a non-compliant car in London ULEZ", () => {
    const r = cazCost({ zoneKey: "london-ulez", vehicle: "car", daysPerWeek: 5, weeksPerYear: 48 });
    expect(r.dailyCharge).toBe(12.5);
    expect(r.weeklyCost).toBe(62.5);
    expect(r.annualCost).toBe(3000);
  });

  it("charges £8/day for a non-compliant car in Birmingham CAZ", () => {
    const r = cazCost({ zoneKey: "birmingham", vehicle: "car", daysPerWeek: 5, weeksPerYear: 48 });
    expect(r.dailyCharge).toBe(8);
    expect(r.annualCost).toBe(1920);
  });

  it("flags cars as exempt in Bath CAZ Class C", () => {
    const r = cazCost({ zoneKey: "bath", vehicle: "car", daysPerWeek: 5, weeksPerYear: 48 });
    expect(r.exemptVehicle).toBe(true);
    expect(r.annualCost).toBe(0);
  });

  it("clamps days per week to 0–7", () => {
    const r = cazCost({ zoneKey: "london-ulez", vehicle: "car", daysPerWeek: 99, weeksPerYear: 52 });
    expect(r.weeklyCost).toBe(12.5 * 7);
  });
});
