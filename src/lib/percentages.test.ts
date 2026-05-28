import { describe, expect, it } from "vitest";
import {
  percentOf,
  whatPercent,
  percentChange,
  addPercent,
  subtractPercent,
} from "./percentages";

const round = (n: number) => Math.round(n * 100) / 100;

describe("percentages", () => {
  it("percentOf: 20% of 250 = 50", () => {
    expect(percentOf(20, 250)).toBe(50);
  });

  it("whatPercent: 25 of 200 = 12.5%", () => {
    expect(whatPercent(25, 200)).toBe(12.5);
  });

  it("whatPercent of zero whole = 0%", () => {
    expect(whatPercent(10, 0)).toBe(0);
  });

  it("percentChange: 80 → 100 is +25%", () => {
    expect(round(percentChange(80, 100))).toBe(25);
  });

  it("percentChange: 100 → 80 is -20%", () => {
    expect(round(percentChange(100, 80))).toBe(-20);
  });

  it("percentChange from zero is 0", () => {
    expect(percentChange(0, 50)).toBe(0);
  });

  it("addPercent: 200 + 15% = 230", () => {
    expect(round(addPercent(200, 15))).toBe(230);
  });

  it("subtractPercent: 200 − 15% = 170", () => {
    expect(round(subtractPercent(200, 15))).toBe(170);
  });
});
