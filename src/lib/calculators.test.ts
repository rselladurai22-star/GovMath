import { describe, expect, it } from "vitest";
import { CALCULATORS, CATEGORIES, EVERYDAY, US_CATEGORIES, getCalculatorsByCategory, getCalculatorsByCountry } from "./calculators";

describe("calculator registry", () => {
  it("has a unique address for every calculator, built from its country and topic", () => {
    expect(new Set(CALCULATORS.map((c) => c.href)).size).toBe(CALCULATORS.length);
    for (const c of CALCULATORS) {
      if (c.country === "uk") expect(c.href).toBe(`/uk/${c.category}/${c.slug}`);
      if (c.country === "us") expect(c.href).toBe(`/us/${c.category.replace(/^us-/, "")}/${c.slug}`);
      if (c.country === "global") expect(c.href).toBe(`/everyday/${c.slug}`);
    }
  });

  it("puts every calculator in a known topic, and every topic has some", () => {
    const slugs = new Set<string>([...CATEGORIES.map((c) => c.slug), ...US_CATEGORIES.map((c) => c.slug), EVERYDAY.slug]);
    expect(CALCULATORS.every((c) => slugs.has(c.category))).toBe(true);
    for (const cat of [...CATEGORIES, ...US_CATEGORIES]) expect(getCalculatorsByCategory(cat.slug).length).toBeGreaterThan(0);
    expect(US_CATEGORIES.every((c) => c.href === `/us/${c.slug.replace(/^us-/, "")}`)).toBe(true);
  });

  it("has 75 US calculators and lists the Everyday ones in the UK's Everyday Life topic", () => {
    expect(getCalculatorsByCountry("us")).toHaveLength(75);
    const everyday = getCalculatorsByCategory("everyday");
    expect(everyday.length).toBeGreaterThan(0);
    const life = getCalculatorsByCategory("life").map((c) => c.href);
    for (const e of everyday) expect(life).toContain(e.href);
  });
});
