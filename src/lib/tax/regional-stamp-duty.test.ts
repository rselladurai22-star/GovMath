import { describe, expect, it } from "vitest";
import { lbtt, ltt } from "./regional-stamp-duty";

describe("LBTT", () => {
  it("zero below £145k nil band", () => {
    expect(lbtt(140_000).total).toBe(0);
  });
  it("£300k standard buyer", () => {
    // 145k @ 0 + 105k @ 2% + 50k @ 5% = 2100 + 2500 = 4600
    expect(lbtt(300_000).total).toBeCloseTo(4600, 2);
  });
  it("FTB extends nil to £175k", () => {
    // 175k @ 0 + 75k @ 2% + 50k @ 5% = 1500 + 2500 = 4000
    expect(lbtt(300_000, "first-time").total).toBeCloseTo(4000, 2);
  });
  it("adds 8% ADS for additional", () => {
    const r = lbtt(300_000, "additional");
    expect(r.total).toBeCloseTo(4600 + 24_000, 2);
  });
});

describe("LTT (Wales)", () => {
  it("zero below £225k nil band", () => {
    expect(ltt(200_000).total).toBe(0);
  });
  it("£300k main rate", () => {
    // 225k @ 0 + 75k @ 6% = 4500
    expect(ltt(300_000).total).toBeCloseTo(4500, 2);
  });
  it("higher rates apply from £1 on additional", () => {
    // 180k @ 5% = 9000
    expect(ltt(180_000, true).total).toBeCloseTo(9000, 2);
  });
});
