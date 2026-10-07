import { describe, expect, it } from "vitest";
import { PRICE_AMOUNTS, SALARY_AMOUNTS, neighbours, parseAmount, salaryFacts, stampDutyFacts } from "./amounts";

describe("amount pages", () => {
  it("lists unique, sorted amounts", () => {
    for (const list of [SALARY_AMOUNTS, PRICE_AMOUNTS]) {
      expect(new Set(list).size).toBe(list.length);
      expect([...list].sort((a, b) => a - b)).toEqual(list);
    }
    expect(SALARY_AMOUNTS[0]).toBe(15_000);
    expect(SALARY_AMOUNTS).toContain(150_000);
    expect(PRICE_AMOUNTS).toContain(1_000_000);
    expect(PRICE_AMOUNTS.at(-1)).toBe(2_000_000);
  });

  it("only accepts listed amounts", () => {
    expect(parseAmount("30000", SALARY_AMOUNTS)).toBe(30_000);
    expect(parseAmount("30500", SALARY_AMOUNTS)).toBeUndefined();
    expect(parseAmount("3e4", SALARY_AMOUNTS)).toBeUndefined();
    expect(neighbours(15_000, SALARY_AMOUNTS, 2)).toEqual([15_000, 16_000, 17_000]);
  });

  it("works out take-home pay on £30,000 (England, 2026/27)", () => {
    const f = salaryFacts(30_000);
    // Tax: 20% of £17,430 = £3,486. NI: 8% of £17,430 = £1,394.40.
    expect(f.tax).toBeCloseTo(3_486, 2);
    expect(f.ni).toBeCloseTo(1_394.4, 2);
    expect(f.takeHome).toBeCloseTo(25_119.6, 2);
    expect(f.variants[0].takeHome).toBeCloseTo(f.takeHome, 6);
    expect(f.variants[1].pension).toBeCloseTo(1_500, 6);
    expect(f.scotland.takeHome).toBeLessThan(f.takeHome + 100);
  });

  it("shows the Personal Allowance taper above £100,000", () => {
    expect(salaryFacts(110_000).personalAllowance).toBe(7_570);
    expect(salaryFacts(110_000).marginalRate).toBeCloseTo(0.62, 2);
  });

  it("works out Stamp Duty on £300,000", () => {
    const f = stampDutyFacts(300_000);
    expect(f.mover.total).toBe(5_000);
    expect(f.firstTime.total).toBe(0);
    expect(f.additional.total).toBe(20_000);
  });
});
