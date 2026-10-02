import { describe, expect, it } from "vitest";
import { CATEGORIES, getCalculatorsByCategory, getHomeCalculators } from "./calculators";

describe("getHomeCalculators", () => {
  for (const cat of CATEGORIES) {
    it(`${cat.slug}: up to 10 unique tools from its own category`, () => {
      const all = getCalculatorsByCategory(cat.slug);
      const home = getHomeCalculators(cat.slug);
      // A mistyped slug in the shortlist would silently shrink the list.
      expect(home).toHaveLength(Math.min(10, all.length));
      expect(new Set(home.map((c) => c.slug)).size).toBe(home.length);
      expect(home.every((c) => c.category === cat.slug)).toBe(true);
    });
  }

  it("leads with the headline tool", () => {
    expect(getHomeCalculators("tax-and-salary")[0].slug).toBe("salary-calculator");
    expect(getHomeCalculators("property")[0].slug).toBe("stamp-duty-england");
  });
});
