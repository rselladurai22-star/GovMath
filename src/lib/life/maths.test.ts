import { describe as group, expect, it } from "vitest";
import {
  addTax,
  applyDiscounts,
  fillUpL100,
  fromL100,
  fuelCost,
  multiBuy,
  originalFromSale,
  removeTax,
  stackedPercent,
  toL100,
  unitPrice,
} from "./maths";

group("discounts", () => {
  it("stacks discounts on the reduced price", () => {
    const r = applyDiscounts(100, [{ kind: "percent", value: 20 }, { kind: "percent", value: 10 }]);
    expect(r.final).toBeCloseTo(72, 9);
    expect(r.effectivePercent).toBeCloseTo(28, 9);
    expect(stackedPercent([20, 10])).toBeCloseTo(28, 9);
  });
  it("handles amounts and never goes below zero", () => {
    expect(applyDiscounts(50, [{ kind: "amount", value: 10 }]).final).toBe(40);
    expect(applyDiscounts(5, [{ kind: "amount", value: 10 }]).final).toBe(0);
    expect(applyDiscounts(0, [{ kind: "percent", value: 10 }]).effectivePercent).toBe(0);
  });
  it("reverses a sale price and prices deals", () => {
    expect(originalFromSale(60, 25)).toBeCloseTo(80, 9);
    expect(originalFromSale(60, 100)).toBe(0);
    const d = multiBuy(3, 2, 1);
    expect(d.pay).toBe(6);
    expect(d.perItem).toBe(2);
    expect(d.percentOff).toBeCloseTo(33.333, 2);
    expect(unitPrice(2.5, 0)).toBe(0);
    expect(unitPrice(3, 1.5)).toBe(2);
    expect(addTax(100, 20)).toBeCloseTo(120, 9);
    expect(removeTax(120, 20)).toBeCloseTo(100, 9);
  });
});

group("fuel economy", () => {
  it("converts between units", () => {
    expect(toL100(50, "mpg-uk")).toBeCloseTo(5.6496, 3);
    expect(toL100(30, "mpg-us")).toBeCloseTo(7.8405, 3);
    expect(fromL100(toL100(42, "mpg-uk"), "mpg-us")).toBeCloseTo(42 / 1.20095, 2);
    expect(toL100(20, "kml")).toBe(5);
    expect(toL100(0, "mpg-uk")).toBe(0);
    expect(fromL100(0, "kml")).toBe(0);
  });
  it("fill-up method and cost", () => {
    expect(fillUpL100(500, "km", 30, "litre")).toBe(6);
    const c = fuelCost(6, 1.5, "litre", 100, "km");
    expect(c.trip).toBeCloseTo(9, 9);
    expect(c.perKm).toBeCloseTo(0.09, 9);
    expect(fuelCost(6, 0, "litre", 0, "km").trip).toBe(0);
  });
});
