import { describe, expect, it } from "vitest";
import { ved } from "./ved";

describe("ved (2025/26)", () => {
  it("ICE 0g/km → £10 first-year, standard £195 after", () => {
    const r = ved({ co2: 0, fuel: "petrol-diesel", listPrice: 20_000 });
    expect(r.firstYearRate).toBe(10);
    expect(r.standardRate).toBe(195);
    expect(r.expensiveCarSupplement).toBe(0);
  });

  it("Petrol 120g/km → first-year £440", () => {
    const r = ved({ co2: 120, fuel: "petrol-diesel", listPrice: 25_000 });
    expect(r.firstYearRate).toBe(440);
  });

  it("Alternative fuel gets £10 off standard", () => {
    const r = ved({ co2: 100, fuel: "alternative", listPrice: 25_000 });
    expect(r.standardRate).toBe(185);
  });

  it("Expensive car >£40k adds £425 for 5 years", () => {
    const r = ved({ co2: 120, fuel: "petrol-diesel", listPrice: 50_000 });
    expect(r.expensiveCarSupplement).toBe(425);
    expect(r.fiveYearTotal).toBe((195 + 425) * 5);
  });

  it("EV 2025/26: £10 first year + standard £195 + expensive supplement if >£40k", () => {
    const r = ved({ co2: 0, fuel: "electric", listPrice: 50_000 });
    expect(r.firstYearRate).toBe(10);
    expect(r.standardRate).toBe(195);
    expect(r.expensiveCarSupplement).toBe(425);
  });

  it("Very high emissions go up to top band", () => {
    const r = ved({ co2: 300, fuel: "petrol-diesel", listPrice: 30_000 });
    expect(r.firstYearRate).toBe(5490);
  });

  it("6-year total sums correctly", () => {
    const r = ved({ co2: 100, fuel: "petrol-diesel", listPrice: 20_000 });
    expect(r.totalSixYears).toBe(r.firstYearRate + r.standardRate * 5);
  });
});
