import { describe, it, expect } from "vitest";
import { sharedParentalLeave } from "./shared-parental-leave";

describe("sharedParentalLeave", () => {
  it("caps statutory pay at £187.18/week for high earners", () => {
    const r = sharedParentalLeave({
      parent1Weeks: 20, parent2Weeks: 10,
      parent1WeeklyEarnings: 1000, parent2WeeklyEarnings: 800,
      parent1PaidWeeks: 20, parent2PaidWeeks: 10,
    });
    expect(r.parent1WeeklyPay).toBe(187.18);
    expect(r.parent2WeeklyPay).toBe(187.18);
  });

  it("uses 90% of earnings for low earners", () => {
    const r = sharedParentalLeave({
      parent1Weeks: 10, parent2Weeks: 0,
      parent1WeeklyEarnings: 150, parent2WeeklyEarnings: 0,
      parent1PaidWeeks: 10, parent2PaidWeeks: 0,
    });
    expect(r.parent1WeeklyPay).toBeCloseTo(135, 2);
  });

  it("flags when combined leave exceeds the 50-week cap", () => {
    const r = sharedParentalLeave({
      parent1Weeks: 30, parent2Weeks: 25,
      parent1WeeklyEarnings: 500, parent2WeeklyEarnings: 500,
      parent1PaidWeeks: 25, parent2PaidWeeks: 12,
    });
    expect(r.exceedsLeaveCap).toBe(true);
  });

  it("flags when combined pay exceeds 37 weeks", () => {
    const r = sharedParentalLeave({
      parent1Weeks: 30, parent2Weeks: 20,
      parent1WeeklyEarnings: 500, parent2WeeklyEarnings: 500,
      parent1PaidWeeks: 25, parent2PaidWeeks: 15,
    });
    expect(r.exceedsPayCap).toBe(true);
  });
});
