import { describe, expect, it } from "vitest";
import { childBenefit, highIncomeChildBenefitCharge } from "./child-benefit";

describe("childBenefit", () => {
  it("zero for no children", () => {
    expect(childBenefit(0).weekly).toBe(0);
  });
  it("first child weekly rate", () => {
    expect(childBenefit(1).weekly).toBeCloseTo(26.05, 2);
  });
  it("3 children", () => {
    expect(childBenefit(3).weekly).toBeCloseTo(26.05 + 17.25 * 2, 2);
  });
  it("annualises × 52", () => {
    expect(childBenefit(1).annual).toBeCloseTo(26.05 * 52, 2);
  });
});

describe("HICBC", () => {
  it("no charge below £60k", () => {
    expect(highIncomeChildBenefitCharge(2000, 50_000).charge).toBe(0);
  });
  it("full charge at £80k+", () => {
    expect(highIncomeChildBenefitCharge(2000, 85_000).charge).toBe(2000);
  });
  it("50% at £70k midpoint", () => {
    expect(highIncomeChildBenefitCharge(2000, 70_000).charge).toBeCloseTo(1000, 2);
  });
});
