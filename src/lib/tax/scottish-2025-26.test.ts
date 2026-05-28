import { describe, expect, it } from "vitest";
import { scottishIncomeTax, scottishVsRukDifference } from "./scottish-2025-26";

const round = (n: number) => Math.round(n * 100) / 100;

describe("scottishIncomeTax (2025/26)", () => {
  it("income at PA → no tax", () => {
    expect(scottishIncomeTax(12_570).total).toBe(0);
  });

  it("starter band only: £14,000 → 19% on first £1,430 above PA = £271.70", () => {
    const r = scottishIncomeTax(14_000);
    expect(round(r.starter)).toBe(round((14_000 - 12_570) * 0.19));
    expect(r.basic).toBe(0);
  });

  it("full starter + into basic band", () => {
    // PA 12570 + starter 2827 = 15397. Add £100 of basic.
    const r = scottishIncomeTax(15_497);
    expect(round(r.starter)).toBe(round(2827 * 0.19));
    expect(round(r.basic)).toBe(round(100 * 0.2));
  });

  it("higher-rate Scottish 42% kicks in early (above £43,662)", () => {
    // PA + starter + basic + intermediate = 12570 + 2827 + 11485 + 18232 = 45114
    const r = scottishIncomeTax(50_000);
    // £50,000 − 45,114 = 4,886 at 42%
    expect(round(r.higher)).toBe(round(4886 * 0.42));
  });

  it("top rate 48% above £125,140", () => {
    const r = scottishIncomeTax(200_000);
    // PA fully tapered, so taxable = 200k
    expect(r.personalAllowance).toBe(0);
    expect(r.top).toBeGreaterThan(0);
  });

  it("scottishVsRukDifference is positive for £50k earner", () => {
    expect(scottishVsRukDifference(50_000)).toBeGreaterThan(0);
  });

  it("scottishVsRukDifference is ~0 at low earnings", () => {
    expect(Math.abs(scottishVsRukDifference(13_000))).toBeLessThan(20);
  });
});
