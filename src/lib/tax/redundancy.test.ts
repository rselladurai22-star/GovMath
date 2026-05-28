import { describe, it, expect } from "vitest";
import { statutoryRedundancy } from "./redundancy";

describe("statutoryRedundancy", () => {
  it("uses 1 week per year for a 30-year-old with 5 years", () => {
    const r = statutoryRedundancy({ ageAtRedundancy: 30, yearsOfService: 5, weeklyPay: 500 });
    expect(r.weeksDue).toBe(5);
    expect(r.statutoryPayment).toBe(2500);
  });

  it("caps weekly pay at £719", () => {
    const r = statutoryRedundancy({ ageAtRedundancy: 30, yearsOfService: 1, weeklyPay: 1500 });
    expect(r.cappedWeeklyPay).toBe(719);
  });

  it("uses 1.5 weeks for service while 41+", () => {
    const r = statutoryRedundancy({ ageAtRedundancy: 45, yearsOfService: 3, weeklyPay: 500 });
    expect(r.weeksDue).toBe(4.5); // ages 42, 43, 44 all over 41
  });

  it("caps service years at 20", () => {
    const r = statutoryRedundancy({ ageAtRedundancy: 60, yearsOfService: 30, weeklyPay: 500 });
    expect(r.yearsCounted).toBe(20);
  });
});
