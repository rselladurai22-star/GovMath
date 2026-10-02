import { describe, expect, it } from "vitest";
import { acrossNations, additionalSurcharge, nearThreshold, sdltCurve } from "./stamp-duty-insights";

describe("nearThreshold", () => {
  it("prices just over a band edge show the saving at the edge", () => {
    // £260k mover: 2% × £125k + 5% × £10k = £3,000; at £250k it's £2,500.
    expect(nearThreshold(260_000, "standard")).toEqual({ threshold: 250_000, over: 10_000, saving: 500 });
  });

  it("flags the first-time buyer cliff at £500,000", () => {
    // £510k falls back to standard rates (£15,500) vs £10,000 at £500k.
    expect(nearThreshold(510_000, "first-time")).toEqual({ threshold: 500_000, over: 10_000, saving: 5_500 });
  });

  it("stays quiet when the price is well clear of a threshold", () => {
    expect(nearThreshold(300_000, "standard")).toBeNull();
    expect(nearThreshold(100_000, "standard")).toBeNull();
    expect(nearThreshold(0, "standard")).toBeNull();
  });
});

describe("additionalSurcharge", () => {
  it("is 5% of the whole price", () => {
    expect(additionalSurcharge(300_000)).toBeCloseTo(15_000, 2);
  });
});

describe("acrossNations", () => {
  it("taxes a £300k home in each nation", () => {
    const [eng, scot, wales] = acrossNations(300_000, "standard");
    expect(eng.total).toBeCloseTo(5_000, 2); // 2% × 125k + 5% × 50k
    expect(scot.total).toBeCloseTo(4_600, 2); // 2% × 105k + 5% × 50k
    expect(wales.total).toBeCloseTo(4_500, 2); // 6% × 75k
  });
});

describe("sdltCurve", () => {
  it("samples every buyer type from £0 to the top price", () => {
    const c = sdltCurve(1_000_000, 4);
    expect(c).toHaveLength(5);
    expect(c[0]).toEqual({ price: 0, standard: 0, firstTime: 0, additional: 0 });
    expect(c[4].price).toBe(1_000_000);
    expect(c[4].additional - c[4].standard).toBeCloseTo(50_000, 2);
  });
});
