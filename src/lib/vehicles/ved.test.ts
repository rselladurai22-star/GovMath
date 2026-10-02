import { describe, expect, it } from "vitest";
import { ved } from "./ved";

describe("ved (2026/27)", () => {
  it("ICE 0g/km → £10 first-year, standard £200 after", () => {
    const r = ved({ co2: 0, fuel: "petrol-diesel", listPrice: 20_000 });
    expect(r.firstYearRate).toBe(10);
    expect(r.standardRate).toBe(200);
    expect(r.expensiveCarSupplement).toBe(0);
  });

  it("Petrol 120g/km → first-year £455", () => {
    const r = ved({ co2: 120, fuel: "petrol-diesel", listPrice: 25_000 });
    expect(r.firstYearRate).toBe(455);
  });

  it("Alternative fuel pays the same as petrol and diesel", () => {
    const r = ved({ co2: 100, fuel: "alternative", listPrice: 25_000 });
    expect(r.standardRate).toBe(200);
    expect(r.firstYearRate).toBe(365);
  });

  it("Expensive car >£40k adds £440 for 5 years", () => {
    const r = ved({ co2: 120, fuel: "petrol-diesel", listPrice: 50_000 });
    expect(r.expensiveCarSupplement).toBe(440);
    expect(r.fiveYearTotal).toBe((200 + 440) * 5);
  });

  it("EV: £10 first year + standard £200; supplement only above £50k", () => {
    const r = ved({ co2: 0, fuel: "electric", listPrice: 50_000 });
    expect(r.firstYearRate).toBe(10);
    expect(r.standardRate).toBe(200);
    expect(r.expensiveCarSupplement).toBe(0);
    expect(ved({ co2: 0, fuel: "electric", listPrice: 50_001 }).expensiveCarSupplement).toBe(440);
  });

  it("Very high emissions go up to top band", () => {
    const r = ved({ co2: 300, fuel: "petrol-diesel", listPrice: 30_000 });
    expect(r.firstYearRate).toBe(5690);
  });

  it("6-year total sums correctly", () => {
    const r = ved({ co2: 100, fuel: "petrol-diesel", listPrice: 20_000 });
    expect(r.totalSixYears).toBe(r.firstYearRate + r.standardRate * 5);
  });
});
