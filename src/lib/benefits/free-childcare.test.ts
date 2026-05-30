import { describe, it, expect } from "vitest";
import { freeChildcare } from "./free-childcare";

describe("freeChildcare", () => {
  it("gives 30 hours for working parents of 1-year-olds", () => {
    const r = freeChildcare({ childAge: "9-months-to-2", parentWorking: true, lowIncomeFamily: false, hourlyRate: 8, stretchYear: false });
    expect(r.hoursPerWeek).toBe(30);
  });

  it("gives 15 hours universal for 3-4 yo non-working", () => {
    const r = freeChildcare({ childAge: "3-to-4-year", parentWorking: false, lowIncomeFamily: false, hourlyRate: 7, stretchYear: false });
    expect(r.hoursPerWeek).toBe(15);
  });

  it("returns 0 hours for under 9 months", () => {
    const r = freeChildcare({ childAge: "under-9-months", parentWorking: true, lowIncomeFamily: false, hourlyRate: 8, stretchYear: false });
    expect(r.hoursPerWeek).toBe(0);
  });

  it("stretches to lower weekly hours over 51 weeks", () => {
    const r = freeChildcare({ childAge: "3-to-4-year", parentWorking: true, lowIncomeFamily: false, hourlyRate: 8, stretchYear: true });
    expect(r.weeklyStretchedHours).toBeCloseTo((30 * 38) / 51, 2);
  });
});
