import { describe, it, expect } from "vitest";
import { companyCarBIK } from "./bik";

describe("companyCarBIK", () => {
  it("uses 3% for electric", () => {
    const r = companyCarBIK({ listPrice: 50_000, fuelType: "electric", marginalRate: 0.4 });
    expect(r.bikPercent).toBe(0.03);
    expect(r.annualTax).toBe(600);
  });

  it("uses higher bands for high-CO2 petrol", () => {
    const r = companyCarBIK({ listPrice: 30_000, fuelType: "petrol", co2gPerKm: 150, marginalRate: 0.4 });
    expect(r.bikPercent).toBe(0.36);
  });

  it("adds 4% diesel supplement", () => {
    const r = companyCarBIK({ listPrice: 30_000, fuelType: "diesel", co2gPerKm: 100, marginalRate: 0.4 });
    expect(r.bikPercent).toBe(0.30);
  });
});
