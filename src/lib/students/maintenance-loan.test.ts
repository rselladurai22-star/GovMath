import { describe, it, expect } from "vitest";
import { maintenanceLoan } from "./maintenance-loan";

describe("maintenanceLoan (Plan 5, 2026/27)", () => {
  it("gives full London maximum at the £25k threshold", () => {
    const r = maintenanceLoan({ householdIncome: 25000, accommodation: "london" });
    expect(r.loan).toBe(14135);
    expect(r.reduction).toBe(0);
  });

  it("tapers down to the away minimum for high household income", () => {
    const r = maintenanceLoan({ householdIncome: 100000, accommodation: "away" });
    expect(r.loan).toBe(5048);
  });

  it("returns max loan for income below the threshold", () => {
    const r = maintenanceLoan({ householdIncome: 18000, accommodation: "home" });
    expect(r.loan).toBe(9118);
  });

  it("splits into 3 termly instalments", () => {
    const r = maintenanceLoan({ householdIncome: 25000, accommodation: "away" });
    expect(r.perTerm).toBe(Math.round(10830 / 3));
  });
});
