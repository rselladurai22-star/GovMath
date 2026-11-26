import { describe, expect, it } from "vitest";
import { healthyStartEligible, healthyStartOver } from "./health";

describe("Healthy Start", () => {
  it("eligibility", () => {
    expect(healthyStartEligible({ ucLowEarnings: true, otherBenefit: false, esa: false, under18: false, pregnant: false, hasChildUnder4: true })).toBe(true);
    expect(healthyStartEligible({ ucLowEarnings: false, otherBenefit: false, esa: false, under18: true, pregnant: true, hasChildUnder4: false })).toBe(true);
    expect(healthyStartEligible({ ucLowEarnings: false, otherBenefit: false, esa: true, under18: false, pregnant: false, hasChildUnder4: true })).toBe(false);
  });
  it("a year's payments", () => {
    expect(healthyStartOver(52, [24], 0).total).toBeCloseTo(52 * 4.65, 6);
    expect(healthyStartOver(52, [0], 0).total).toBeCloseTo(52 * 9.3, 6);
    const r = healthyStartOver(52, [], 12);
    expect(r.weekly[0]).toBe(4.65);
    expect(r.weekly[28]).toBe(9.3);
  });
  it("from 10 weeks pregnant to the 4th birthday", () => {
    expect(healthyStartOver(30 + 52 * 4, [], 10).total).toBeCloseTo(30 * 4.65 + 52 * 9.3 + 156 * 4.65, 6);
  });
});
