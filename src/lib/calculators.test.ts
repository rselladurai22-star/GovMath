import { describe, expect, it } from "vitest";
import { CALCULATORS, CATEGORIES, getCalculatorsByCategory } from "./calculators";

describe("calculator registry", () => {
  it("has 31 calculators, each with a unique address under /uk", () => {
    expect(CALCULATORS).toHaveLength(31);
    expect(new Set(CALCULATORS.map((c) => c.href)).size).toBe(CALCULATORS.length);
    for (const c of CALCULATORS) expect(c.href).toMatch(new RegExp(`^/uk/[a-z-]+/${c.slug}$`));
  });

  it("puts every calculator in one of the three topics, and every topic has some", () => {
    expect(CATEGORIES.map((c) => c.slug)).toEqual(["benefits", "property", "students"]);
    for (const cat of CATEGORIES) {
      expect(cat.href).toBe(`/uk/${cat.slug}`);
      expect(getCalculatorsByCategory(cat.slug).length).toBeGreaterThan(0);
    }
    expect(getCalculatorsByCategory("benefits").length + getCalculatorsByCategory("property").length + getCalculatorsByCategory("students").length).toBe(31);
  });
});
