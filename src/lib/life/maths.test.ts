import { describe as group, expect, it } from "vitest";
import {
  addTax,
  applyDiscounts,
  approximateFraction,
  cumulativeGpa,
  decimalExpansion,
  describe,
  fillUpL100,
  finalNeeded,
  fractionOp,
  fromL100,
  fuelCost,
  gcd,
  gpa,
  lcm,
  letterFromPercent,
  mixedText,
  multiBuy,
  originalFromSale,
  parseFraction,
  parseNumbers,
  removeTax,
  stackedPercent,
  termGpaNeeded,
  toL100,
  ukClass,
  unitPrice,
  weightedGrade,
  weightedMean,
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

group("fractions", () => {
  it("gcd and lcm", () => {
    expect(gcd(12, 18)).toBe(6);
    expect(lcm(4, 6)).toBe(12);
  });
  it("parses fractions, mixed numbers and decimals", () => {
    expect(parseFraction("3/4")).toEqual({ n: 3, d: 4 });
    expect(parseFraction("1 1/2")).toEqual({ n: 3, d: 2 });
    expect(parseFraction("-2 3/5")).toEqual({ n: -13, d: 5 });
    expect(parseFraction("0.125")).toEqual({ n: 1, d: 8 });
    expect(parseFraction("6/8")).toEqual({ n: 3, d: 4 });
    expect(parseFraction("1/0")).toBeNull();
    expect(parseFraction("abc")).toBeNull();
    expect(parseFraction("")).toBeNull();
  });
  it("adds, subtracts, multiplies and divides", () => {
    expect(fractionOp({ n: 1, d: 4 }, { n: 1, d: 6 }, "add").result).toEqual({ n: 5, d: 12 });
    expect(fractionOp({ n: 3, d: 4 }, { n: 1, d: 6 }, "subtract").result).toEqual({ n: 7, d: 12 });
    expect(fractionOp({ n: 2, d: 3 }, { n: 3, d: 4 }, "multiply").result).toEqual({ n: 1, d: 2 });
    expect(fractionOp({ n: 3, d: 4 }, { n: 1, d: 2 }, "divide").result).toEqual({ n: 3, d: 2 });
    expect(fractionOp({ n: 3, d: 4 }, { n: 0, d: 1 }, "divide").result).toBeNull();
    expect(fractionOp({ n: 1, d: 2 }, { n: -3, d: 4 }, "divide").result).toEqual({ n: -2, d: 3 });
  });
  it("writes mixed numbers and decimals", () => {
    expect(mixedText({ n: 7, d: 4 })).toBe("1 3/4");
    expect(mixedText({ n: -7, d: 3 })).toBe("-2 1/3");
    expect(mixedText({ n: 8, d: 4 })).toBe("2");
    expect(decimalExpansion({ n: 1, d: 3 }).text).toBe("0.(3)");
    expect(decimalExpansion({ n: 1, d: 6 }).text).toBe("0.1(6)");
    expect(decimalExpansion({ n: 3, d: 8 })).toEqual({ text: "0.375", terminates: true });
    expect(decimalExpansion({ n: 1, d: 7 }).text).toBe("0.(142857)");
    expect(approximateFraction(0.3333333)).toEqual({ n: 1, d: 3 });
    expect(approximateFraction(3.14159, 1000)).toEqual({ n: 355, d: 113 });
  });
});

group("averages", () => {
  it("parses messy input", () => {
    const p = parseNumbers("4, 8\n15 16; 23  42, x, 1e2, ");
    expect(p.values).toEqual([4, 8, 15, 16, 23, 42, 100]);
    expect(p.rejected).toEqual(["x"]);
  });
  it("describes a list", () => {
    const s = describe([2, 4, 4, 4, 5, 5, 7, 9]);
    expect(s.mean).toBe(5);
    expect(s.median).toBe(4.5);
    expect(s.modes).toEqual([4]);
    expect(s.range).toBe(7);
    expect(s.populationSd).toBe(2);
    expect(s.sampleSd).toBeCloseTo(2.13809, 4);
    expect(describe([1, 2, 3]).modes).toEqual([]);
    expect(describe([2, 8]).geometricMean).toBeCloseTo(4, 9);
    expect(describe([0, 8]).geometricMean).toBeNull();
    expect(describe([5]).sampleSd).toBeNull();
    expect(describe([]).mean).toBe(0);
  });
  it("weighted mean", () => {
    expect(weightedMean([70, 80], [1, 3]).mean).toBe(77.5);
    expect(weightedMean([1], [0]).mean).toBeNull();
  });
});

group("GPA and grades", () => {
  it("unweighted and weighted GPA", () => {
    const g = gpa([
      { grade: "A", credits: 3, level: "ap" },
      { grade: "B+", credits: 4, level: "honors" },
      { grade: "C", credits: 3 },
      { grade: "F", credits: 1, level: "ap" },
    ]);
    expect(g.credits).toBe(11);
    expect(g.unweighted).toBeCloseTo((12 + 13.2 + 6) / 11, 9);
    expect(g.weighted).toBeCloseTo((15 + 15.2 + 6) / 11, 9);
    expect(gpa([]).unweighted).toBe(0);
  });
  it("cumulative and needed GPA", () => {
    expect(cumulativeGpa(3.2, 60, 3.8, 15)).toBeCloseTo(3.32, 9);
    expect(termGpaNeeded(3.2, 60, 3.3, 15)).toBeCloseTo(3.7, 9);
    expect(termGpaNeeded(3, 10, 3, 0)).toBeNull();
  });
  it("course grade and the final", () => {
    expect(weightedGrade([{ weight: 20, score: 90 }, { weight: 30, score: 80 }]).grade).toBeCloseTo(84, 9);
    expect(weightedGrade([]).grade).toBeNull();
    expect(finalNeeded(84, 25, 85)).toBeCloseTo(88, 9);
    expect(finalNeeded(84, 0, 85)).toBeNull();
    expect(letterFromPercent(92.9)).toBe("A-");
    expect(letterFromPercent(59)).toBe("F");
    expect(ukClass(68)).toBe("Upper second (2:1)");
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
