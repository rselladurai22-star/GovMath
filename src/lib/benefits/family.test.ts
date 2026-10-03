import { describe, expect, it } from "vitest";
import { childBenefitFor, freeHours, hicbc, hicbcShare, maternityPay, paternityPay, sharedParental, taxFreeChildcarePlan } from "./family";

describe("Child Benefit", () => {
  it("two children", () => {
    const r = childBenefitFor(2);
    expect(r.weekly).toBeCloseTo(44.95, 6);
    expect(r.annual).toBeCloseTo(2337.4, 6);
    expect(r.fourWeekly).toBeCloseTo(179.8, 6);
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
    expect(r.charge).toBeCloseTo(1168.7, 6);
    expect(r.pensionToAvoid).toBe(10_000);
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

describe("paternity and shared parental pay", () => {
  it("two weeks of SPP", () => {
    const r = paternityPay({ awe: 700, service: true, weeks: 2, fullPayWeeks: 0 });
    expect(r.total).toBeCloseTo(388.64, 6);
  });
  it("no pay without 26 weeks' service", () => {
    expect(paternityPay({ awe: 700, service: false, weeks: 2, fullPayWeeks: 0 }).total).toBe(0);
  });
  it("splits the remaining 37 paid weeks", () => {
    const r = sharedParental({ aweA: 600, aweB: 700, maternityWeeks: 20, partnerWeeks: 12, motherSharedWeeks: 0 });
    expect(r.sharedLeaveAvailable).toBe(32);
    expect(r.sharedPayAvailable).toBe(19);
    expect(r.partnerPaidWeeks).toBe(12);
    expect(r.partnerPay).toBeCloseTo(12 * 194.32, 6);
    expect(r.unusedPay).toBe(7);
  });
});
