import { describe, expect, it } from "vitest";
import { PRICE_AMOUNTS, SALARY_AMOUNTS, nearestAtOrBelow, neighbours, parseAmount, priceExtras, salaryExtras, salaryFacts, stampDutyFacts } from "./amounts";

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

  it("adds employer, loan, family and mortgage figures for £30,000", () => {
    const x = salaryExtras(30_000);
    // Employer NI: 15% of £25,000. Pension: 3% of £30,000 - £6,240.
    expect(x.employer.ni).toBeCloseTo(3_750, 2);
    expect(x.employer.pension).toBeCloseTo(712.8, 2);
    expect(x.employer.total).toBeCloseTo(34_462.8, 2);
    // Plan 2: 9% of £615. Plan 4 threshold not reached.
    expect(x.loans.find((l) => l.plan === "plan2")?.yearly).toBeCloseTo(55.35, 2);
    expect(x.loans.find((l) => l.plan === "plan4")?.yearly).toBe(0);
    expect(x.marriageGain).toBeCloseTo(252, 2);
    expect(x.childBenefit[0].charge).toBe(0);
    // A £1,000 rise keeps 72% at the basic rate.
    expect(x.rise1000).toBeCloseTo(720, 0);
    expect(x.pension100).toBeCloseTo(72, 0);
    expect(x.mortgage.loan).toBe(135_000);
  });

  it("charges Child Benefit back between £60,000 and £80,000", () => {
    const x = salaryExtras(70_000);
    expect(x.childBenefit[0].charge).toBeCloseTo(x.childBenefit[0].benefit / 2, 2);
    expect(salaryExtras(90_000).childBenefit[1].keep).toBe(0);
    expect(salaryExtras(60_000).marriageGain).toBe(0);
  });

  it("works out deposits, cash and thresholds on £300,000", () => {
    const x = priceExtras(300_000);
    expect(x.deposits[1]).toMatchObject({ pct: 10, deposit: 30_000, loan: 270_000, incomeNeeded: 60_000 });
    expect(x.nextThousand).toBeCloseTo(50, 6);
    expect(x.edgeBelow).toEqual({ price: 250_000, tax: 2_500 });
    const ftb = x.cash.find((c) => c.buyer === "first-time");
    expect(ftb?.tax).toBe(0);
    expect(ftb?.fees).toBeCloseTo(1_500 + 600 + 999 + 1_000, 6);
    expect(ftb?.cashNeeded).toBeCloseTo(34_099, 6);
    expect(priceExtras(100_000).edgeBelow).toBeNull();
    expect(nearestAtOrBelow(312_000, PRICE_AMOUNTS)).toBe(300_000);
  });
});
