import { describe, expect, it } from "vitest";
import { stampDuty } from "./sdlt-2025";

const round = (n: number) => Math.round(n);

describe("stampDuty — standard buyer (England, April 2025)", () => {
  it("is zero at or below the £125k nil-rate threshold", () => {
    expect(stampDuty(0).total).toBe(0);
    expect(stampDuty(125_000).total).toBe(0);
  });

  it("charges 2% on the slice from £125k to £250k", () => {
    // (200,000 - 125,000) * 0.02 = 1,500
    expect(round(stampDuty(200_000).total)).toBe(1_500);
    // Full slice: 125,000 * 0.02 = 2,500
    expect(round(stampDuty(250_000).total)).toBe(2_500);
  });

  it("charges 5% on the slice from £250k to £925k", () => {
    // 2,500 (first slice) + (295,000 - 250,000) * 0.05 = 2,500 + 2,250
    expect(round(stampDuty(295_000).total)).toBe(4_750);
    // 2,500 + (500,000 - 250,000) * 0.05 = 2,500 + 12,500
    expect(round(stampDuty(500_000).total)).toBe(15_000);
    // Full slice: 2,500 + 675,000 * 0.05 = 2,500 + 33,750
    expect(round(stampDuty(925_000).total)).toBe(36_250);
  });

  it("charges 10% on the slice from £925k to £1.5m", () => {
    // 36,250 + (1,500,000 - 925,000) * 0.10 = 36,250 + 57,500
    expect(round(stampDuty(1_500_000).total)).toBe(93_750);
  });

  it("charges 12% on everything above £1.5m", () => {
    // 93,750 + 500,000 * 0.12 = 93,750 + 60,000
    expect(round(stampDuty(2_000_000).total)).toBe(153_750);
  });

  it("returns a breakdown row per band touched", () => {
    const r = stampDuty(295_000);
    expect(r.breakdown).toHaveLength(3);
    expect(r.breakdown[0].rate).toBe(0);
    expect(r.breakdown[1].rate).toBe(0.02);
    expect(r.breakdown[2].rate).toBe(0.05);
  });

  it("computes an effective rate", () => {
    const r = stampDuty(500_000);
    expect(r.effectiveRate).toBeCloseTo(15_000 / 500_000, 6);
    expect(stampDuty(0).effectiveRate).toBe(0);
  });
});

describe("stampDuty — first-time buyer relief", () => {
  it("is zero up to £300k", () => {
    expect(stampDuty(300_000, "first-time").total).toBe(0);
  });

  it("charges 5% on the slice from £300k to £500k", () => {
    // (400,000 - 300,000) * 0.05 = 5,000
    expect(round(stampDuty(400_000, "first-time").total)).toBe(5_000);
    // (500,000 - 300,000) * 0.05 = 10,000
    expect(round(stampDuty(500_000, "first-time").total)).toBe(10_000);
  });

  it("falls back to standard rates above £500k (no relief)", () => {
    const r = stampDuty(600_000, "first-time");
    // 2,500 + (600,000 - 250,000) * 0.05 = 2,500 + 17,500
    expect(round(r.total)).toBe(20_000);
    expect(r.appliedScheme).toBe("standard");
  });

  it("flags the applied scheme as 'first-time' when relief applies", () => {
    expect(stampDuty(400_000, "first-time").appliedScheme).toBe("first-time");
  });
});

describe("stampDuty — additional property (+5% surcharge)", () => {
  it("applies the surcharge on every band, including the nil-rate slice", () => {
    // 125,000 * 0.05 + (200,000 - 125,000) * 0.07 = 6,250 + 5,250
    expect(round(stampDuty(200_000, "additional").total)).toBe(11_500);
  });

  it("matches a hand-worked £500k example", () => {
    // 125k*0.05 + 125k*0.07 + 250k*0.10 = 6,250 + 8,750 + 25,000
    expect(round(stampDuty(500_000, "additional").total)).toBe(40_000);
  });

  it("flags the applied scheme as 'additional'", () => {
    expect(stampDuty(500_000, "additional").appliedScheme).toBe("additional");
  });
});

describe("stampDuty — edge cases", () => {
  it("clamps negative input to zero", () => {
    expect(stampDuty(-100).total).toBe(0);
  });

  it("handles a NaN price safely", () => {
    expect(stampDuty(Number.NaN).total).toBe(0);
  });
});
