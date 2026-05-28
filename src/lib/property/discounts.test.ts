import { describe, expect, it } from "vitest";
import { rentARoom, singlePersonDiscount } from "./discounts";

describe("Rent a Room", () => {
  it("under £7500 is fully tax-free", () => {
    const r = rentARoom(6000);
    expect(r.underAllowance).toBe(true);
    expect(r.taxableAmount).toBe(0);
  });
  it("£10k → £2500 taxable", () => {
    expect(rentARoom(10_000).taxableAmount).toBe(2500);
  });
});

describe("SPD", () => {
  it("25% off £2000 bill", () => {
    const r = singlePersonDiscount(2000);
    expect(r.discount).toBe(500);
    expect(r.payable).toBe(1500);
    expect(r.monthlySaving).toBeCloseTo(41.67, 2);
  });
});
