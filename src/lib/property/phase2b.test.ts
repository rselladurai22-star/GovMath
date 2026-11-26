import { describe, expect, it } from "vitest";
import { bandsFor, councilBill } from "./council-tax-bands";
import { singlePersonDiscountForDays } from "./discounts";

const BILL = { nation: "england" as const, band: "D" as const, bandD: 2_000, adultsCounted: 2, disabledReduction: false, premiumPct: 0, instalments: 10 };

describe("council bill", () => {
  it("band ratios and discounts", () => {
    expect(councilBill(BILL).payable).toBe(2_000);
    expect(councilBill({ ...BILL, band: "A" }).payable).toBeCloseTo(2_000 * 6 / 9, 6);
    expect(councilBill({ ...BILL, adultsCounted: 1 }).payable).toBe(1_500);
    expect(councilBill({ ...BILL, adultsCounted: 0 }).payable).toBe(1_000);
    expect(councilBill(BILL).instalment).toBe(200);
  });
  it("disabled band reduction", () => {
    const r = councilBill({ ...BILL, disabledReduction: true });
    expect(r.billedBand).toBe("C");
    expect(r.payable).toBeCloseTo(2_000 * 8 / 9, 6);
    expect(councilBill({ ...BILL, band: "A", disabledReduction: true }).payable).toBeCloseTo(2_000 * 5 / 9, 6);
  });
  it("second home premium", () => {
    expect(councilBill({ ...BILL, premiumPct: 100 }).payable).toBe(4_000);
  });
  it("Wales has band I", () => {
    expect(bandsFor("wales")).toContain("I");
    expect(bandsFor("england")).not.toContain("I");
  });
});

describe("single person discount by days", () => {
  it("pro-rates", () => {
    const r = singlePersonDiscountForDays({ annualBill: 2_190, daysAlone: 73 });
    expect(r.discount).toBeCloseTo(2_190 * 0.25 * 0.2, 6);
  });
});

import { BAND_D_AVG, bandMultiplier } from "./council-tax-bands";
import { COUNCIL_BAND_D_2026, councilBandD } from "./council-band-d-2026";

describe("2026/27 Band D figures (MHCLG, Welsh Government, Scottish Government)", () => {
  it("national averages", () => {
    expect(BAND_D_AVG.england).toBe(2_392);
    expect(BAND_D_AVG.wales).toBe(2_283);
    expect(BAND_D_AVG.scotland).toBeCloseTo(1_653.44, 2);
  });
  it("every council, with the published extremes", () => {
    expect(COUNCIL_BAND_D_2026.england).toHaveLength(296);
    expect(COUNCIL_BAND_D_2026.wales).toHaveLength(22);
    expect(COUNCIL_BAND_D_2026.scotland).toHaveLength(32);
    expect(councilBandD("wales", "cardiff")?.[2]).toBeCloseTo(2_013.18, 2);
    expect(councilBandD("wales", "merthyr-tydfil")?.[2]).toBeCloseTo(2_593.6, 2);
    expect(councilBandD("scotland", "glasgow-city")?.[2]).toBe(1_706);
    expect(councilBandD("england", "westminster")?.[2]).toBeCloseTo(1_049.55, 2);
    const ids = Object.values(COUNCIL_BAND_D_2026).flat().map((c) => c[0]);
    expect(new Set(ids).size).toBe(ids.length);
  });
  it("band ratios: England and Wales ninths, Scotland 360ths, Wales band I", () => {
    expect(bandMultiplier("england", "H")).toBe(2);
    expect(bandMultiplier("wales", "I")).toBeCloseTo(21 / 9, 9);
    expect(bandMultiplier("scotland", "E")).toBeCloseTo(473 / 360, 9);
    expect(bandMultiplier("scotland", "H")).toBeCloseTo(882 / 360, 9);
    // Glasgow Band H as published: £4,179.70.
    expect(1_706 * bandMultiplier("scotland", "H")).toBeCloseTo(4_179.7, 2);
  });
  it("twelve instalments and a 300% premium", () => {
    const r = councilBill({ ...BILL, instalments: 12, premiumPct: 300 });
    expect(r.payable).toBe(8_000);
    expect(r.instalment).toBeCloseTo(8_000 / 12, 6);
  });
});
