import { describe, expect, it } from "vitest";
import { childBenefitFor, freeHours, hicbc, hicbcShare, maternityPay, taxFreeChildcarePlan } from "./family";

describe("Child Benefit", () => {
  it("two children", () => {
    const r = childBenefitFor(2);
    expect(r.weekly).toBeCloseTo(44.95, 6);
    expect(r.annual).toBeCloseTo(2337.4, 6);
    expect(r.fourWeekly).toBeCloseTo(179.8, 6);
  });
  it("one child gets the eldest rate only (GOV.UK: £27.05 a week)", () => {
    const r = childBenefitFor(1);
    expect(r.weekly).toBeCloseTo(27.05, 6);
    expect(r.fourWeekly).toBeCloseTo(108.2, 6);
    expect(r.annual).toBeCloseTo(1406.6, 6);
  });
  it("eight children: no limit on the number of children", () => {
    const r = childBenefitFor(8);
    expect(r.weekly).toBeCloseTo(27.05 + 7 * 17.9, 6);
    expect(r.annual).toBeCloseTo(7922.2, 6);
  });
  it("part of a year", () => {
    expect(childBenefitFor(1, 30).forWeeks).toBeCloseTo(811.5, 6);
  });
  it("proposed rates from April 2027", () => {
    expect(childBenefitFor(1, 52, "2027/28").weekly).toBeCloseTo(28, 6);
    expect(childBenefitFor(3, 52, "2027/28").weekly).toBeCloseTo(65.1, 6);
  });
});

describe("HICBC", () => {
  it("rounds down to whole 1% steps", () => {
    expect(hicbcShare(60_199)).toBe(0);
    expect(hicbcShare(60_200)).toBeCloseTo(0.01, 9);
    expect(hicbcShare(70_000)).toBeCloseTo(0.5, 9);
    expect(hicbcShare(80_000)).toBe(1);
  });
  it("pension contributions reduce adjusted net income", () => {
    const r = hicbc({ children: 2, income: 70_000, pension: 10_000, giftAid: 0, weeks: 52 });
    expect(r.adjustedNetIncome).toBe(60_000);
    expect(r.charge).toBe(0);
  });
  it("half the benefit at £70,000", () => {
    const r = hicbc({ children: 2, income: 70_000, pension: 0, giftAid: 0, weeks: 52 });
    // ITEPA 2003 s681C(3): £2,337.40 rounds down to £2,337; half is £1,168.50, rounded down again.
    expect(r.charge).toBe(1168);
    expect(r.keep).toBeCloseTo(1169.4, 6);
    expect(r.pensionToAvoid).toBe(10_000);
  });
  it("nothing at £60,000, everything (in whole pounds) at £80,000", () => {
    const at = (income: number, children = 2) => hicbc({ children, income, pension: 0, giftAid: 0, weeks: 52 });
    expect(at(60_000).charge).toBe(0);
    expect(at(60_000).band).toBe("none");
    expect(at(80_000).charge).toBe(2337);
    expect(at(80_000).band).toBe("full");
    expect(at(120_000).charge).toBe(2337);
    // Four children: £4,199.00 exactly, which must not be cut to £4,198 by floating point.
    expect(at(80_000, 4).charge).toBe(4199);
  });
});

describe("free hours", () => {
  it("working parents of a 3-year-old get 1,140 hours", () => {
    const r = freeHours({ stage: "3-4", working: true, lowIncome: false, hoursUsed: 40, weeksUsed: 48, hourlyRate: 8, extrasWeekly: 0 });
    expect(r.annualHours).toBe(1140);
    expect(r.value).toBe(9120);
    expect(r.fullCost).toBe(15_360);
    expect(r.youPay).toBe(6240);
  });
  it("no funded hours for a non-working 1-year-old", () => {
    expect(freeHours({ stage: "9m-2", working: false, lowIncome: true, hoursUsed: 20, weeksUsed: 48, hourlyRate: 8, extrasWeekly: 0 }).hoursPerWeek).toBe(0);
  });
});

describe("Tax-Free Childcare", () => {
  it("20% top-up capped at £2,000", () => {
    const r = taxFreeChildcarePlan([{ cost: 6000, disabled: false }, { cost: 12_000, disabled: false }]);
    expect(r.topUp).toBe(1200 + 2000);
    expect(r.spendForMaxTopUp).toBe(10_000);
  });
});

describe("maternity pay", () => {
  it("SMP on £600 a week", () => {
    const r = maternityPay({ awe: 600, service: true, fullPayWeeks: 0, halfPayWeeks: 0, leaveWeeks: 52 });
    expect(r.firstSix).toBeCloseTo(540, 6);
    expect(r.remaining).toBeCloseTo(194.32, 6);
    expect(r.statutoryTotal).toBeCloseTo(6 * 540 + 33 * 194.32, 6);
  });
  it("Maternity Allowance without enough service", () => {
    const r = maternityPay({ awe: 300, service: false, fullPayWeeks: 0, halfPayWeeks: 0, leaveWeeks: 52 });
    expect(r.route).toBe("ma");
    expect(r.statutoryTotal).toBeCloseTo(39 * 194.32, 6);
  });
  it("employer scheme tops up SMP", () => {
    const r = maternityPay({ awe: 600, service: true, fullPayWeeks: 6, halfPayWeeks: 12, leaveWeeks: 52 });
    expect(r.employerTopUp).toBeCloseTo(6 * 60 + 12 * (300 - 194.32), 6);
  });
});
