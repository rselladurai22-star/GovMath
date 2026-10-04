import { describe, expect, it } from "vitest";
import { appropriatePercentage2026, companyCar2026, eved, evSalarySacrifice2026, lezPenalties, sornRefundMonths, ved2026, zoneCompliant, zoneCost } from "./tax-2026";

describe("VED 2026/27", () => {
  it("first year by CO2 and fuel", () => {
    expect(ved2026({ era: "2017", fuel: "petrol", co2: 120, listPrice: 25_000 }).firstYear).toBe(455);
    expect(ved2026({ era: "2017", fuel: "diesel", co2: 120, listPrice: 25_000 }).firstYear).toBe(560);
    expect(ved2026({ era: "2017", fuel: "electric", co2: 0, listPrice: 30_000 }).firstYear).toBe(10);
    expect(ved2026({ era: "2017", fuel: "petrol", co2: 300, listPrice: 25_000 }).firstYear).toBe(5_690);
  });
  it("expensive car supplement", () => {
    expect(ved2026({ era: "2017", fuel: "petrol", co2: 140, listPrice: 45_000 }).yearsTwoToSix).toBe(640);
    expect(ved2026({ era: "2017", fuel: "electric", co2: 0, listPrice: 45_000 }).supplement).toBe(0);
    expect(ved2026({ era: "2017", fuel: "electric", co2: 0, listPrice: 55_000 }).supplement).toBe(440);
    expect(ved2026({ era: "2017", fuel: "electric", co2: 0, listPrice: 55_000, zevBefore2025: true }).supplement).toBe(0);
  });
  it("2001 to 2017 bands", () => {
    const r = ved2026({ era: "2001", fuel: "petrol", co2: 158, listPrice: 0 });
    expect(r.band).toBe("G");
    expect(r.standard).toBe(275);
  });
  it("eVED", () => {
    expect(eved(10_000, "electric")).toBeCloseTo(300, 6);
    expect(eved(10_000, "plugIn")).toBeCloseTo(150, 6);
  });
});

describe("company car", () => {
  it("appropriate percentages match the 2026/27 table", () => {
    expect(appropriatePercentage2026("electric", 0)).toBe(0.04);
    expect(appropriatePercentage2026("hybrid", 30, 45)).toBe(0.1);
    expect(appropriatePercentage2026("petrol", 74)).toBe(0.21);
    expect(appropriatePercentage2026("petrol", 79)).toBe(0.21);
    expect(appropriatePercentage2026("petrol", 80)).toBe(0.22);
    expect(appropriatePercentage2026("petrol", 120)).toBe(0.3);
    expect(appropriatePercentage2026("petrol", 155)).toBe(0.37);
    expect(appropriatePercentage2026("diesel", 120)).toBe(0.34);
    expect(appropriatePercentage2026("diesel", 150)).toBe(0.37);
  });
  it("tax at the basic rate", () => {
    const r = companyCar2026({ listPrice: 40_000, options: 0, fuel: "electric", co2: 0, range: 300, capitalContribution: 0, privateUsePayment: 0, unavailableDays: 0, freeFuel: false, salary: 35_000, scotland: false });
    expect(r.cashEquivalent).toBeCloseTo(1_600, 6);
    expect(r.tax).toBeCloseTo(320, 6);
  });
});

describe("EV salary sacrifice", () => {
  it("saves tax and NI and adds BIK", () => {
    const r = evSalarySacrifice2026({ salary: 45_000, monthlySacrifice: 400, p11d: 40_000, scotland: false, year: "2026/27", privateLease: 400 });
    expect(r.taxSaved).toBeCloseTo(4_800 * 0.2, 6);
    expect(r.niSaved).toBeCloseTo(4_800 * 0.08, 6);
    expect(r.bikTax).toBeCloseTo(1_600 * 0.2, 6);
    expect(r.netCost).toBeCloseTo(4_800 - 960 - 384 + 320, 6);
  });
});

describe("zones", () => {
  it("compliance", () => {
    expect(zoneCompliant("petrol", 2006)).toBe(true);
    expect(zoneCompliant("diesel", 2014)).toBe(false);
  });
  it("ULEZ and congestion charge", () => {
    const r = zoneCost({ zone: "london-ulez", vehicle: "car", compliant: false, daysPerWeek: 5, weeks: 46, congestion: true, electric: false });
    expect(r.yearly).toBeCloseTo((12.5 + 18) * 230, 6);
  });
  it("LEZ penalties double and cap", () => {
    expect(lezPenalties(5)).toEqual([60, 120, 240, 480, 480]);
  });
});

describe("SORN", () => {
  it("full months left", () => {
    expect(sornRefundMonths("2026-10-15", "2027-04-01")).toBe(5);
    expect(sornRefundMonths("2026-10-15", "2026-11-01")).toBe(0);
  });
});
