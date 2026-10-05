import { describe, expect, it } from "vitest";
import { singlePersonDiscount } from "./discounts";

describe("SPD", () => {
  it("25% off £2000 bill", () => {
    const r = singlePersonDiscount(2000);
    expect(r.discount).toBe(500);
    expect(r.payable).toBe(1500);
    expect(r.monthlySaving).toBeCloseTo(41.67, 2);
  });
});
