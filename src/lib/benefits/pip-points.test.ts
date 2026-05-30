import { describe, it, expect } from "vitest";
import { pipPoints } from "./pip-points";

describe("pipPoints", () => {
  it("awards nothing below 8 points", () => {
    const r = pipPoints({ dailyLivingPoints: 6, mobilityPoints: 4 });
    expect(r.dailyLivingAward).toBe("none");
    expect(r.weeklyTotal).toBe(0);
  });
  it("awards standard rate at 8 points", () => {
    const r = pipPoints({ dailyLivingPoints: 8, mobilityPoints: 0 });
    expect(r.dailyLivingAward).toBe("standard");
    expect(r.weeklyTotal).toBeCloseTo(73.90, 2);
  });
  it("awards enhanced at 12+ points", () => {
    const r = pipPoints({ dailyLivingPoints: 14, mobilityPoints: 12 });
    expect(r.dailyLivingAward).toBe("enhanced");
    expect(r.mobilityAward).toBe("enhanced");
    expect(r.weeklyTotal).toBeCloseTo(110.40 + 77.05, 2);
  });
});
