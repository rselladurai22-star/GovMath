import { describe, expect, it } from "vitest";
import { catchUpMustBeRoth, doubling, goalPath, rothVsTaxable } from "./savings-extra";
import { depositForGoal, grow, monthsToGoal } from "./savings";

describe("US savings helpers", () => {
  it("applies the Roth catch-up rule above $150,000 of prior-year wages from age 50", () => {
    expect(catchUpMustBeRoth(49, 300_000)).toBe(false);
    expect(catchUpMustBeRoth(50, 150_000)).toBe(false);
    expect(catchUpMustBeRoth(50, 150_001)).toBe(true);
    expect(catchUpMustBeRoth(61, 90_000)).toBe(false);
  });

  it("gives the rule of 72 and the exact doubling time", () => {
    expect(doubling(6).rule72).toBe(12);
    expect(doubling(6).exact).toBeCloseTo(11.9, 1);
    expect(doubling(0).exact).toBe(Infinity);
  });

  it("matches the Roth with no tax and leaves less in a taxed account", () => {
    const none = rothVsTaxable(1_000, 500, 7, 30, 2, 0, 0);
    expect(none.taxableAfterSale).toBeCloseTo(none.roth, 4);
    expect(none.roth).toBeCloseTo(grow(1_000, 500, 7, 30).balance, 6);
    const taxed = rothVsTaxable(1_000, 500, 7, 30, 2, 0.15, 0.15);
    expect(taxed.dividendTax).toBeGreaterThan(0);
    expect(taxed.gainsTax).toBeGreaterThan(0);
    expect(taxed.taxableAfterSale).toBeLessThan(taxed.roth);
    expect(taxed.advantage).toBeCloseTo(taxed.roth - taxed.taxableAfterSale, 6);
    expect(taxed.taxable - taxed.gainsTax).toBeCloseTo(taxed.taxableAfterSale, 6);
  });

  it("handles zero years", () => {
    const z = rothVsTaxable(5_000, 100, 7, 0, 2, 0.15, 0.15);
    expect(z.roth).toBe(5_000);
    expect(z.taxableAfterSale).toBe(5_000);
  });

  it("builds a goal path that lands on the goal", () => {
    const dep = depositForGoal(15_000, 2_000, 4, 12);
    const path = goalPath(2_000, dep, 4, 12);
    expect(path).toHaveLength(13);
    expect(path[12].balance).toBeCloseTo(15_000, 6);
    expect(path[12].deposits).toBeCloseTo(2_000 + dep * 12, 6);
    const m = monthsToGoal(15_000, 2_000, 500, 4);
    expect(goalPath(2_000, 500, 4, m)[m].balance).toBeGreaterThanOrEqual(15_000);
    expect(goalPath(2_000, 500, 4, m - 1)[m - 1].balance).toBeLessThan(15_000);
    expect(goalPath(1_000, 100, 0, 3)[3].balance).toBe(1_300);
  });
});
