import { describe, expect, it } from "vitest";
import { incomeTax, nationalInsurance, personalAllowance, selfEmployedNI } from "./2026-27";

const round = (n: number) => Math.round(n * 100) / 100;

describe("personalAllowance (2026/27)", () => {
  it("returns full PA below £100k", () => {
    expect(personalAllowance(50000)).toBe(12570);
  });
  it("tapers £1 for every £2 above £100k", () => {
    expect(personalAllowance(110000)).toBe(12570 - 5000);
  });
  it("is zero at and above £125,140", () => {
    expect(personalAllowance(125140)).toBe(0);
    expect(personalAllowance(200000)).toBe(0);
  });
});

describe("incomeTax (2026/27, rUK)", () => {
  it("no tax at or below PA", () => {
    expect(incomeTax(12570).total).toBe(0);
  });
  it("£35,000 basic-rate only: (35000-12570)*20%", () => {
    expect(round(incomeTax(35000).total)).toBe(round(22430 * 0.2));
  });
  it("£60,000 spans basic + higher", () => {
    const r = incomeTax(60000);
    expect(round(r.basic)).toBe(round(37700 * 0.2));
    expect(round(r.higher)).toBe(round((60000 - 12570 - 37700) * 0.4));
  });
  it("£150,000 hits additional rate after PA fully tapered", () => {
    const r = incomeTax(150000);
    expect(r.personalAllowance).toBe(0);
    // taxable = 150000; basic 37700 @20, higher up to 125140 = 87440 @40, additional 24860 @45
    expect(round(r.basic)).toBe(round(37700 * 0.2));
    expect(round(r.higher)).toBe(round(87440 * 0.4));
    expect(round(r.additional)).toBe(round(24860 * 0.45));
  });
});

describe("nationalInsurance (Class 1, 2026/27)", () => {
  it("zero at or below PT", () => {
    expect(nationalInsurance(12570).total).toBe(0);
  });
  it("£35,000 main band only at 8%", () => {
    expect(round(nationalInsurance(35000).total)).toBe(
      round((35000 - 12570) * 0.08)
    );
  });
  it("£80,000 splits main + upper band", () => {
    const r = nationalInsurance(80000);
    expect(round(r.mainBand)).toBe(round((50270 - 12570) * 0.08));
    expect(round(r.upperBand)).toBe(round((80000 - 50270) * 0.02));
  });
});

describe("selfEmployedNI (Class 4, 2026/27)", () => {
  it("is zero at or below the small-profits threshold (£12,570)", () => {
    expect(selfEmployedNI(12570).total).toBe(0);
    expect(selfEmployedNI(0).total).toBe(0);
  });

  it("charges 6% on profits between £12,570 and £50,270", () => {
    // (35,000 - 12,570) * 0.06 = 1,345.80
    expect(round(selfEmployedNI(35000).total)).toBe(1345.8);
  });

  it("splits main and upper bands above £50,270", () => {
    const r = selfEmployedNI(80000);
    // Main:  (50,270 - 12,570) * 0.06 = 2,262
    // Upper: (80,000 - 50,270) * 0.02 = 594.60
    expect(round(r.mainBand)).toBe(2262);
    expect(round(r.upperBand)).toBe(594.6);
    expect(round(r.total)).toBe(2856.6);
  });

  it("costs less than Class 1 at the same income level", () => {
    expect(selfEmployedNI(50000).total).toBeLessThan(
      nationalInsurance(50000).total
    );
  });
});
