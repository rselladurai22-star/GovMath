import { describe, expect, it } from "vitest";
import { inheritanceTax } from "./iht";

describe("inheritanceTax (2025/26)", () => {
  it("estate below NRB → no tax", () => {
    const r = inheritanceTax({
      estateValue: 300_000,
      passingHomeToDescendants: false,
    });
    expect(r.ihtDue).toBe(0);
  });

  it("£500k estate, no descendants: (500k − 325k) × 40% = £70k", () => {
    const r = inheritanceTax({
      estateValue: 500_000,
      passingHomeToDescendants: false,
    });
    expect(r.ihtDue).toBe(70_000);
  });

  it("RNRB unlocked: £500k estate to descendants → tax-free", () => {
    const r = inheritanceTax({
      estateValue: 500_000,
      passingHomeToDescendants: true,
    });
    expect(r.totalAllowance).toBe(500_000);
    expect(r.ihtDue).toBe(0);
  });

  it("Spouse transfer 100% doubles NRB and RNRB", () => {
    const r = inheritanceTax({
      estateValue: 1_000_000,
      passingHomeToDescendants: true,
      spouseTransferPct: 100,
    });
    expect(r.totalAllowance).toBe(1_000_000);
    expect(r.ihtDue).toBe(0);
  });

  it("RNRB tapers above £2m estate", () => {
    // £2.5m estate, single, with descendants:
    // RNRB taper = (2.5m − 2m) / 2 = 250k loss → £0 RNRB left
    const r = inheritanceTax({
      estateValue: 2_500_000,
      passingHomeToDescendants: true,
    });
    expect(r.residenceNilRateBand).toBe(0);
    // Only NRB 325k available
    expect(r.totalAllowance).toBe(325_000);
  });

  it("RNRB partial taper at £2.1m", () => {
    // Taper = (2.1m − 2m) / 2 = 50k off the 175k RNRB → 125k left
    const r = inheritanceTax({
      estateValue: 2_100_000,
      passingHomeToDescendants: true,
    });
    expect(r.residenceNilRateBand).toBe(125_000);
  });

  it("effective rate is 0 when estate is below allowance", () => {
    const r = inheritanceTax({
      estateValue: 200_000,
      passingHomeToDescendants: false,
    });
    expect(r.effectiveRate).toBe(0);
  });
});
