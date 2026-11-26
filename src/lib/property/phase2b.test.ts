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
