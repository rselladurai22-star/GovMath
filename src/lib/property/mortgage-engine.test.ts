import { describe, expect, it } from "vitest";
import { monthlyPaymentFor } from "./mortgage-engine";

describe("monthlyPaymentFor", () => {
  it("matches the standard repayment (PMT) formula", () => {
    expect(monthlyPaymentFor(200_000, 5, 25, "repayment")).toBeCloseTo(1169.18, 2);
  });
  it("interest-only pays just the interest", () => {
    expect(monthlyPaymentFor(200_000, 5, 25, "interest-only")).toBeCloseTo(833.33, 2);
  });
  it("splits the loan evenly at a 0% rate", () => {
    expect(monthlyPaymentFor(120_000, 0, 10, "repayment")).toBe(1000);
  });
});
