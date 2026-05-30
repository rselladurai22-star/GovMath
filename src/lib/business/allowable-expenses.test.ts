import { describe, it, expect } from "vitest";
import { allowableExpenses } from "./allowable-expenses";

describe("allowableExpenses", () => {
  it("applies WFH simplified flat rate", () => {
    const r = allowableExpenses({
      officeAndAdmin: 0, finance: 0, marketing: 0, training: 0, stock: 0, other: 0,
      wfhHoursBand: "mid", wfhMonths: 12, businessMiles: 0,
    });
    expect(r.wfhFlat).toBe(18 * 12);
  });

  it("uses HMRC mileage tiers (45p then 25p)", () => {
    const r = allowableExpenses({
      officeAndAdmin: 0, finance: 0, marketing: 0, training: 0, stock: 0, other: 0,
      wfhHoursBand: "none", wfhMonths: 0, businessMiles: 15_000,
    });
    // 10000 × 0.45 + 5000 × 0.25 = 4500 + 1250 = 5750
    expect(r.mileageFlat).toBe(5750);
  });

  it("totals itemised + flat rates", () => {
    const r = allowableExpenses({
      officeAndAdmin: 1000, finance: 500, marketing: 200, training: 0, stock: 0, other: 0,
      wfhHoursBand: "low", wfhMonths: 12, businessMiles: 0,
    });
    expect(r.itemised).toBe(1700);
    expect(r.total).toBe(1700 + 120);
  });

  it("estimates 28% combined tax saved", () => {
    const r = allowableExpenses({
      officeAndAdmin: 1000, finance: 0, marketing: 0, training: 0, stock: 0, other: 0,
      wfhHoursBand: "none", wfhMonths: 0, businessMiles: 0,
    });
    expect(r.taxSavedApprox).toBe(280);
  });
});
