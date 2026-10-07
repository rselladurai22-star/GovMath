import { describe, expect, it } from "vitest";
import { californiaWeek, dtiRoom, federalWeek } from "./pay-extra";

describe("californiaWeek", () => {
  it("pays daily overtime over 8 and double time over 12", () => {
    expect(californiaWeek([12.5, 12.5, 12.5, 12.5])).toEqual({ regular: 32, overtime: 16, doubleTime: 2 });
  });
  it("matches the federal split for five 8-hour days", () => {
    expect(californiaWeek([8, 8, 8, 8, 8])).toEqual({ regular: 40, overtime: 0, doubleTime: 0 });
    expect(federalWeek([8, 8, 8, 8, 8])).toEqual({ regular: 40, overtime: 0, doubleTime: 0 });
  });
  it("applies the seventh-day rule and the 40-hour week", () => {
    // Six 8-hour days: 48 regular hours, 8 become weekly overtime.
    expect(californiaWeek([8, 8, 8, 8, 8, 8])).toEqual({ regular: 40, overtime: 8, doubleTime: 0 });
    // Seven days: day seven is 8 at 1.5× and 2 at 2×.
    expect(californiaWeek([6, 6, 6, 6, 6, 6, 10])).toEqual({ regular: 36, overtime: 8, doubleTime: 2 });
  });
});

describe("dtiRoom", () => {
  it("finds the housing room under 28/36", () => {
    const r = dtiRoom(6_000, 1_500, 600, 0.28, 0.36);
    expect(r.maxHousing).toBeCloseTo(1_560);
    expect(r.maxOtherDebts).toBeCloseTo(660);
    expect(r.incomeNeeded).toBeCloseTo(5_833.33, 1);
    expect(r.fits).toBe(true);
  });
  it("handles a back-end-only limit and zero income", () => {
    expect(dtiRoom(6_000, 1_500, 600, Infinity, 0.5).maxHousing).toBeCloseTo(2_400);
    expect(dtiRoom(0, 1_500, 600, 0.28, 0.36).fits).toBe(false);
  });
});
