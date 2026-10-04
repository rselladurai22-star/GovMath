import { describe, expect, it } from "vitest";
import { careMeansTest, spendDown, tariffIncome } from "./care";

const base = { nation: "england" as const, savings: 0, home: 0, homeDisregarded: false, income: 250, fee: 1_200, councilRate: 900, nursing: false };

describe("care home means test", () => {
  it("tariff income", () => {
    expect(tariffIncome(14_250, "england")).toBe(0);
    expect(tariffIncome(14_251, "england")).toBe(1);
    expect(tariffIncome(23_250, "england")).toBe(36);
    expect(tariffIncome(40_000, "wales")).toBe(0);
  });
  it("council-funded: income less allowance, top-up above the rate", () => {
    const r = careMeansTest(base);
    expect(r.you).toBeCloseTo(250 - 31.8, 6);
    expect(r.council).toBeCloseTo(900 - (250 - 31.8), 6);
    expect(r.topUp).toBe(300);
  });
  it("home counts unless disregarded", () => {
    expect(careMeansTest({ ...base, home: 200_000 }).selfFunder).toBe(true);
    expect(careMeansTest({ ...base, home: 200_000, homeDisregarded: true }).selfFunder).toBe(false);
  });
  it("self-funder spend-down", () => {
    const r = careMeansTest({ ...base, savings: 73_250 });
    expect(r.burn).toBe(950);
    expect(r.weeksToLimit).toBeCloseTo(50_000 / 950, 6);
  });
  it("nursing care contribution in England", () => {
    expect(careMeansTest({ ...base, savings: 100_000, nursing: true }).selfFundCost).toBeCloseTo(1_200 - 267.68, 6);
  });
  it("Wales single limit", () => {
    expect(careMeansTest({ ...base, nation: "wales", savings: 45_000 }).selfFunder).toBe(false);
    expect(careMeansTest({ ...base, nation: "wales", savings: 45_000 }).tariff).toBe(0);
  });
});

describe("spendDown", () => {
  it("falls to the upper limit, then by tariff income to the lower limit", () => {
    const pts = spendDown({ ...base, savings: 30_000 }, 3000);
    expect(pts[0].capital).toBe(30_000);
    expect(pts[1].capital).toBe(30_000 - 950);
    const atUpper = pts.findIndex((p) => p.capital <= 23_250);
    expect(atUpper).toBe(8);
    const last = pts[pts.length - 1];
    expect(last.capital).toBeGreaterThan(14_000);
    expect(last.capital).toBeLessThanOrEqual(14_250);
  });
});
