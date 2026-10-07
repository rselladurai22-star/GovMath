import { describe, expect, it } from "vitest";
import { CALCULATORS, CATEGORIES, getCalculatorsByCategory } from "./calculators";

describe("calculator registry", () => {
  it("has a unique slug and address for every calculator", () => {
    expect(new Set(CALCULATORS.map((c) => c.href)).size).toBe(CALCULATORS.length);
    expect(CALCULATORS.every((c) => c.href === `/uk/${c.category}/${c.slug}`)).toBe(true);
  });

  it("puts every calculator in a known category, and every category has some", () => {
    const slugs = new Set(CATEGORIES.map((c) => c.slug));
    expect(CALCULATORS.every((c) => slugs.has(c.category))).toBe(true);
    for (const cat of CATEGORIES) expect(getCalculatorsByCategory(cat.slug).length).toBeGreaterThan(0);
  });
});
