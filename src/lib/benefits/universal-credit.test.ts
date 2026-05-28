import { describe, expect, it } from "vitest";
import { universalCredit, UC_RATES_2025_26 } from "./universal-credit";

const round = (n: number) => Math.round(n * 100) / 100;

describe("universalCredit (2025/26)", () => {
  it("single 25+, no children, no rent, no earnings → standard allowance only", () => {
    const r = universalCredit({
      household: "single-25-plus",
      children: 0,
      monthlyRent: 0,
      monthlyEarnings: 0,
      hasWorkAllowance: false,
      capital: 0,
    });
    expect(r.standardAllowance).toBe(400.14);
    expect(r.childElement).toBe(0);
    expect(r.housingElement).toBe(0);
    expect(r.estimatedAward).toBe(400.14);
  });

  it("couple 25+, two post-2017 children, £900 rent → max award sum", () => {
    const r = universalCredit({
      household: "couple-either-25-plus",
      children: 2,
      monthlyRent: 900,
      monthlyEarnings: 0,
      hasWorkAllowance: true,
      capital: 0,
    });
    expect(r.standardAllowance).toBe(628.10);
    expect(r.childElement).toBe(292.81 * 2);
    expect(r.housingElement).toBe(900);
    expect(r.maximumAward).toBe(628.10 + 292.81 * 2 + 900);
    // No earnings → no taper.
    expect(r.estimatedAward).toBe(r.maximumAward);
  });

  it("first child pre-Apr-2017 gets the higher rate", () => {
    const r = universalCredit({
      household: "single-25-plus",
      children: 1,
      firstChildPre2017: true,
      monthlyRent: 0,
      monthlyEarnings: 0,
      hasWorkAllowance: true,
      capital: 0,
    });
    expect(r.childElement).toBe(339.00);
  });

  it("two-child limit: third child does not add element", () => {
    const r = universalCredit({
      household: "couple-either-25-plus",
      children: 4,
      monthlyRent: 0,
      monthlyEarnings: 0,
      hasWorkAllowance: true,
      capital: 0,
    });
    expect(r.childElement).toBe(292.81 * 2);
  });

  it("earnings under the work allowance do not taper", () => {
    const r = universalCredit({
      household: "single-25-plus",
      children: 1,
      monthlyRent: 600,
      monthlyEarnings: 400, // under £411 with-housing WA
      hasWorkAllowance: true,
      capital: 0,
    });
    expect(r.workAllowance).toBe(411);
    expect(r.taperedEarnings).toBe(0);
  });

  it("earnings above work allowance are tapered at 55%", () => {
    const r = universalCredit({
      household: "single-25-plus",
      children: 1,
      monthlyRent: 600,
      monthlyEarnings: 1411, // £1000 above the £411 WA
      hasWorkAllowance: true,
      capital: 0,
    });
    expect(r.workAllowance).toBe(411);
    expect(round(r.taperedEarnings)).toBe(550);
  });

  it("no housing → higher work allowance £684", () => {
    const r = universalCredit({
      household: "single-25-plus",
      children: 1,
      monthlyRent: 0,
      monthlyEarnings: 800,
      hasWorkAllowance: true,
      capital: 0,
    });
    expect(r.workAllowance).toBe(684);
    expect(round(r.taperedEarnings)).toBe(round((800 - 684) * 0.55));
  });

  it("claimant without a work allowance tapers from £0", () => {
    const r = universalCredit({
      household: "single-25-plus",
      children: 0,
      monthlyRent: 0,
      monthlyEarnings: 200,
      hasWorkAllowance: false,
      capital: 0,
    });
    expect(r.workAllowance).toBe(0);
    expect(round(r.taperedEarnings)).toBe(110); // 200 × 0.55
  });

  it("capital between £6k and £16k adds £4.35 per £250 tariff", () => {
    const r = universalCredit({
      household: "single-25-plus",
      children: 0,
      monthlyRent: 0,
      monthlyEarnings: 0,
      hasWorkAllowance: false,
      capital: 8000, // £2000 above → 8 × £4.35 = £34.80
    });
    expect(r.capitalDeduction).toBe(34.8);
    expect(round(r.estimatedAward)).toBe(round(400.14 - 34.8));
  });

  it("capital ≥ £16k → ineligible (award is £0)", () => {
    const r = universalCredit({
      household: "single-25-plus",
      children: 2,
      monthlyRent: 800,
      monthlyEarnings: 0,
      hasWorkAllowance: true,
      capital: 16000,
    });
    expect(r.capitalIneligible).toBe(true);
    expect(r.estimatedAward).toBe(0);
  });

  it("award never goes negative", () => {
    const r = universalCredit({
      household: "single-25-plus",
      children: 0,
      monthlyRent: 0,
      monthlyEarnings: 5000, // massively over taper
      hasWorkAllowance: true,
      capital: 0,
    });
    expect(r.estimatedAward).toBe(0);
  });

  it("uses the documented taper rate (0.55)", () => {
    expect(UC_RATES_2025_26.taperRate).toBe(0.55);
  });
});
