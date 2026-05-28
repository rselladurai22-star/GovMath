import { describe, expect, it } from "vitest";
import { inflationImpact } from "./inflation";

describe("inflation impact", () => {
  it("zero growth, 3% inflation, 10 yrs erodes value", () => {
    const r = inflationImpact(10_000, 10, 0, 3);
    expect(r.realFuture).toBeLessThan(10_000);
    expect(r.realFuture).toBeCloseTo(10_000 / Math.pow(1.03, 10), 2);
  });
  it("nominal = inflation: real future = present", () => {
    const r = inflationImpact(10_000, 20, 5, 5);
    expect(r.realFuture).toBeCloseTo(10_000, 2);
  });
});
