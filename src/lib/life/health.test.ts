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

describe("Healthy Start: pregnancy-only claims", () => {
  it("pays nothing for children on income-related ESA alone, and stops at the birth", async () => {
    const { healthyStartPregnancyOnly } = await import("./health");
    const q = { ucLowEarnings: false, otherBenefit: false, esa: true, under18: false, pregnant: true, hasChildUnder4: true };
    expect(healthyStartEligible(q)).toBe(true);
    expect(healthyStartPregnancyOnly(q)).toBe(true);
    const r = healthyStartOver(52, [6], 30, true);
    expect(r.weekly[0]).toBeCloseTo(4.65, 6);
    expect(r.weekly[10]).toBe(0);
    expect(r.total).toBeCloseTo(10 * 4.65, 6);
  });
  it("covers a pregnant under-18 with no benefit until the birth", async () => {
    const { healthyStartPregnancyOnly } = await import("./health");
    const q = { ucLowEarnings: false, otherBenefit: false, esa: false, under18: true, pregnant: true, hasChildUnder4: false };
    expect(healthyStartEligible(q)).toBe(true);
    expect(healthyStartPregnancyOnly(q)).toBe(true);
    expect(healthyStartPregnancyOnly({ ...q, ucLowEarnings: true })).toBe(false);
  });
  it("moves a child to the lower rate at 1 and stops at 4", () => {
    const at1 = healthyStartOver(8, [11], 0).weekly;
    expect(at1[0]).toBeCloseTo(9.3, 6);
    expect(at1[7]).toBeCloseTo(4.65, 6);
    const at4 = healthyStartOver(8, [47], 0).weekly;
    expect(at4[0]).toBeCloseTo(4.65, 6);
    expect(at4[7]).toBe(0);
  });
});
