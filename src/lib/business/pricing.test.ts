import { describe, expect, it } from "vitest";
import { breakEvenStudy, discountImpact, marginFromMarkup, marginStudy, markupFromMargin, priceForTarget, roundPriceUp } from "./margins";
import { flatRateStudy } from "./flat-rate-vat";

describe("marginStudy", () => {
  it("strips VAT before working out margin", () => {
    const r = marginStudy({ price: 30, cost: 10, priceIncVat: true, vatRate: 0.2, units: 1000, overheads: 5000 });
    expect(r.netPrice).toBeCloseTo(25, 6);
    expect(r.vat).toBeCloseTo(5, 6);
    expect(r.marginPct).toBeCloseTo(0.6, 6);
    expect(r.grossProfit).toBeCloseTo(15_000, 6);
    expect(r.netProfit).toBeCloseTo(10_000, 6);
    expect(r.breakEvenUnits).toBeCloseTo(333.333, 2);
  });
  it("loss-making sale never breaks even", () => {
    expect(marginStudy({ price: 5, cost: 6, priceIncVat: false, vatRate: 0, units: 10, overheads: 100 }).breakEvenUnits).toBe(Infinity);
  });
});

describe("discountImpact", () => {
  it("a 10% discount on a 40% margin needs 33% more sales", () => {
    const r = discountImpact(100, 60, 0.1);
    expect(r.profit).toBeCloseTo(30, 6);
    expect(r.marginPct).toBeCloseTo(1 / 3, 6);
    expect(r.extraSalesNeeded).toBeCloseTo(1 / 3, 6);
  });
  it("discount wiping out the margin needs infinite sales", () => {
    expect(discountImpact(100, 60, 0.4).extraSalesNeeded).toBe(Infinity);
  });
});

describe("pricing", () => {
  it("rounds up to price endings", () => {
    expect(roundPriceUp(12.3, "99")).toBe(12.99);
    expect(roundPriceUp(12.99, "99")).toBe(12.99);
    expect(roundPriceUp(12.991, "99")).toBe(12.99);
    expect(roundPriceUp(13.0, "99")).toBe(13.99);
    expect(roundPriceUp(12.96, "95")).toBe(13.95);
    expect(roundPriceUp(12.01, "whole")).toBe(13);
  });
  it("converts margin and markup", () => {
    expect(marginFromMarkup(1)).toBeCloseTo(0.5, 6);
    expect(markupFromMargin(0.5)).toBeCloseTo(1, 6);
  });
  it("hits a margin target with no fees", () => {
    const r = priceForTarget({ cost: 30, extraCost: 0, mode: "margin", target: 0.4, feePct: 0, vatRate: 0, ending: "none" });
    expect(r.shelf).toBeCloseTo(50, 6);
    expect(r.marginPct).toBeCloseTo(0.4, 6);
  });
  it("hits a margin target after fees and VAT", () => {
    const r = priceForTarget({ cost: 30, extraCost: 0, mode: "margin", target: 0.4, feePct: 0.1, vatRate: 0.2, ending: "none" });
    expect(r.marginPct).toBeCloseTo(0.4, 3);
    expect(r.shelf).toBeCloseTo(r.net * 1.2, 6);
  });
  it("hits a markup target", () => {
    const r = priceForTarget({ cost: 20, extraCost: 0, mode: "markup", target: 1, feePct: 0, vatRate: 0, ending: "none" });
    expect(r.shelf).toBeCloseTo(40, 6);
  });
  it("flags impossible targets", () => {
    expect(priceForTarget({ cost: 20, extraCost: 0, mode: "margin", target: 0.95, feePct: 0.1, vatRate: 0, ending: "none" }).possible).toBe(false);
  });
});

describe("breakEvenStudy", () => {
  it("adds target profit and margin of safety", () => {
    const r = breakEvenStudy({ fixedCosts: 30_000, pricePerUnit: 25, variableCostPerUnit: 10, targetProfit: 15_000, expectedUnits: 2500 });
    expect(r.units).toBe(2000);
    expect(r.unitsForTarget).toBe(3000);
    expect(r.marginOfSafety).toBeCloseTo(0.2, 6);
    expect(r.profitAtExpected).toBe(7500);
    expect(r.contributionRatio).toBeCloseTo(0.6, 6);
  });
});

describe("flatRateStudy", () => {
  it("IT contractor with few costs is a limited cost trader", () => {
    const r = flatRateStudy({ sales: 60_000, otherSales: 0, costs: 3000, goods: 600, capital: 0, sectorRate: 0.145, firstYear: false });
    expect(r.limitedCost).toBe(true);
    expect(r.rateUsed).toBeCloseTo(0.165, 6);
    expect(r.flatVat).toBeCloseTo(72_000 * 0.165, 6);
    expect(r.standardVat).toBeCloseTo(12_000 - 500, 6);
    expect(r.better).toBe("standard");
  });
  it("first-year discount and sector rate when goods pass the test", () => {
    const r = flatRateStudy({ sales: 60_000, otherSales: 0, costs: 3000, goods: 2000, capital: 0, sectorRate: 0.145, firstYear: true });
    expect(r.limitedCost).toBe(false);
    expect(r.rateUsed).toBeCloseTo(0.135, 6);
    expect(r.flatVat).toBeCloseTo(9720, 6);
    expect(r.saving).toBeCloseTo(11_500 - 9720, 6);
  });
  it("capital goods of £2,000+ are reclaimable on both schemes", () => {
    const r = flatRateStudy({ sales: 60_000, otherSales: 0, costs: 0, goods: 0, capital: 2400, sectorRate: 0.12, firstYear: false });
    expect(r.capitalVat).toBeCloseTo(400, 6);
  });
  it("zero-rated sales still count in flat-rate turnover", () => {
    const r = flatRateStudy({ sales: 50_000, otherSales: 10_000, costs: 0, goods: 5000, capital: 0, sectorRate: 0.12, firstYear: false });
    expect(r.flatTurnover).toBe(70_000);
  });
});
