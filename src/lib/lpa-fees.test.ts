import { describe, it, expect } from "vitest";
import { lpaFees } from "./lpa-fees";

describe("lpaFees", () => {
  it("charges £82 per LPA at standard rate", () => {
    expect(lpaFees({ numberOfLpas: 2, remission: "none" }).payable).toBe(164);
  });
  it("halves the fee with 50% remission", () => {
    expect(lpaFees({ numberOfLpas: 4, remission: "half" }).payable).toBe(164);
  });
  it("waives the fee entirely with full remission", () => {
    expect(lpaFees({ numberOfLpas: 4, remission: "full" }).payable).toBe(0);
  });
  it("calculates the discount delta", () => {
    const r = lpaFees({ numberOfLpas: 4, remission: "half" });
    expect(r.discount).toBe(164);
  });
});
