import { describe, it, expect } from "vitest";
import { probateFees } from "./probate";

describe("probateFees", () => {
  it("waives the fee for estates worth £5,000 or less", () => {
    const r = probateFees({ estateValue: 5000, extraCopies: 0 });
    expect(r.feeWaived).toBe(true);
    expect(r.applicationFee).toBe(0);
  });

  it("charges £300 for estates over the threshold", () => {
    const r = probateFees({ estateValue: 5001, extraCopies: 0 });
    expect(r.applicationFee).toBe(300);
    expect(r.totalFee).toBe(300);
  });

  it("adds £1.50 per sealed copy", () => {
    const r = probateFees({ estateValue: 100000, extraCopies: 4 });
    expect(r.copiesFee).toBe(6);
    expect(r.totalFee).toBe(306);
  });

  it("clamps negative inputs", () => {
    const r = probateFees({ estateValue: -100, extraCopies: -2 });
    expect(r.estateValue).toBe(0);
    expect(r.copiesFee).toBe(0);
  });
});
