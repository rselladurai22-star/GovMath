import { describe, expect, it } from "vitest";
import { childBenefitFor, fundedCost, hicbc, hicbcPayer, hicbcShare, maternityPay, taxFreeChildcarePlan } from "./family";

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

describe("HICBC edge cases from the page plan", () => {
  const at = (income: number, more: Partial<Parameters<typeof hicbc>[0]> = {}) => hicbc({ children: 2, income, pension: 0, giftAid: 0, weeks: 52, ...more });
  it("exactly £60,000 is not over the threshold; £60,199 still pays nothing", () => {
    expect(at(60_000).charge).toBe(0);
    expect(at(60_199).charge).toBe(0);
    expect(at(60_199).band).toBe("none");
  });
  it("£60,200 pays 1%, in whole pounds", () => {
    const r = at(60_200);
    expect(r.share).toBeCloseTo(0.01, 9);
    // 1% of £2,337 is £23.37, rounded down.
    expect(r.charge).toBe(23);
    expect(r.keep).toBeCloseTo(2314.4, 6);
  });
  it("£79,999 pays 99%; £80,000 pays it all", () => {
    expect(at(79_999).share).toBeCloseTo(0.99, 9);
    expect(at(79_999).charge).toBe(2313);
    expect(at(80_000).share).toBe(1);
    expect(at(80_000).keep).toBeCloseTo(0.4, 6);
  });
  it("Gift Aid and pension both come off before the test", () => {
    const r = at(72_000, { pension: 8_000, giftAid: 1_250 });
    expect(r.adjustedNetIncome).toBe(62_750);
    expect(r.share).toBeCloseTo(0.13, 9);
    expect(r.pensionToAvoid).toBe(2_750);
  });
  it("the higher earner pays", () => {
    expect(hicbcPayer(58_000, 66_000)).toBe("partner");
    expect(hicbcPayer(66_000, 58_000)).toBe("you");
    expect(hicbcPayer(66_000, 66_000)).toBe("you");
    // Two incomes of £59,000 are not added together.
    expect(at(59_000).charge).toBe(0);
  });
  it("part-year: the charge is a share of the weeks actually paid", () => {
    const r = at(70_000, { weeks: 26 });
    expect(r.benefit).toBeCloseTo(1168.7, 6);
    expect(r.charge).toBe(584);
  });
  it("proposed April 2027 rates", () => {
    expect(at(70_000, { year: "2027/28" }).charge).toBe(1210);
  });
});

describe("free hours", () => {
  it("30 hours a week are 1,140 hours a year", () => {
    const r = fundedCost(30, { hoursUsed: 40, weeksUsed: 48, hourlyRate: 8, extrasWeekly: 0 });
    expect(r.annualHours).toBe(1140);
    expect(r.value).toBe(9120);
    expect(r.fullCost).toBe(15_360);
    expect(r.youPay).toBe(6240);
  });
  it("cannot fund more hours than are used, and stretches over the weeks used", () => {
    const r = fundedCost(30, { hoursUsed: 10, weeksUsed: 38, hourlyRate: 8, extrasWeekly: 5 });
    expect(r.value).toBe(10 * 38 * 8);
    expect(r.youPay).toBe(5 * 38);
    expect(fundedCost(15, { hoursUsed: 20, weeksUsed: 51, hourlyRate: 8, extrasWeekly: 0 }).stretchedWeekly).toBeCloseTo(570 / 51, 6);
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

describe("working parent test (GOV.UK 2026/27 earnings floor)", () => {
  const adult = { works: true, band: "national-living-wage" as const, over100k: false };
  it("is 16 hours at each parent's minimum wage", async () => {
    const { minimumWeeklyEarnings, minimumQuarterEarnings } = await import("./family");
    expect(minimumWeeklyEarnings("national-living-wage")).toBe(203.36);
    expect(minimumWeeklyEarnings("18-20")).toBe(173.6);
    expect(minimumWeeklyEarnings("apprentice")).toBe(128);
    expect(minimumQuarterEarnings("national-living-wage")).toBe(2_643.68);
    expect(minimumQuarterEarnings("18-20")).toBe(2_256.8);
    expect(minimumQuarterEarnings("16-17")).toBe(1_664);
  });
  it("passes at exactly the floor and fails a penny under", async () => {
    const { workingParentTest } = await import("./family");
    expect(workingParentTest([{ ...adult, weekly: 203.36 }]).passes).toBe(true);
    expect(workingParentTest([{ ...adult, weekly: 203.35 }]).parents).toEqual(["low-earnings"]);
    expect(workingParentTest([{ ...adult, weekly: 50, newlySelfEmployed: true }]).passes).toBe(true);
  });
  it("needs both parents in work, unless one is covered by a benefit or carer's leave", async () => {
    const { workingParentTest } = await import("./family");
    expect(workingParentTest([adult, { ...adult, works: false }]).parents).toEqual([null, "not-working"]);
    expect(workingParentTest([adult, { ...adult, works: false, covered: true }]).passes).toBe(true);
    expect(workingParentTest([{ ...adult, works: false, covered: true }]).passes).toBe(false);
  });
  it("rules out a household where either parent is over £100,000", async () => {
    const { workingParentTest } = await import("./family");
    expect(workingParentTest([adult, { ...adult, over100k: true }]).passes).toBe(false);
  });
});

describe("Tax-Free Childcare edges", () => {
  it("stops at £2,000 a child, £4,000 if disabled", () => {
    expect(taxFreeChildcarePlan([{ cost: 10_000, disabled: false }]).topUp).toBe(2_000);
    expect(taxFreeChildcarePlan([{ cost: 15_000, disabled: false }]).topUp).toBe(2_000);
    expect(taxFreeChildcarePlan([{ cost: 15_000, disabled: true }]).topUp).toBe(3_000);
    expect(taxFreeChildcarePlan([{ cost: 25_000, disabled: true }]).topUp).toBe(4_000);
  });
  it("gives each child their own limit", () => {
    const r = taxFreeChildcarePlan([{ cost: 12_000, disabled: false }, { cost: 4_000, disabled: false }]);
    expect(r.topUp).toBe(2_000 + 800);
  });
  it("compares with the Universal Credit ceiling of 85% up to the monthly maximum", async () => {
    const { ucChildcareCeiling } = await import("./family");
    expect(ucChildcareCeiling([{ cost: 6_000, disabled: false }]).annual).toBeCloseTo(5_100, 6);
    expect(ucChildcareCeiling([{ cost: 20_000, disabled: false }]).annual).toBeCloseTo(1_071.09 * 12, 6);
    expect(ucChildcareCeiling([{ cost: 20_000, disabled: false }, { cost: 20_000, disabled: false }]).annual).toBeCloseTo(1_836.16 * 12, 6);
  });
});

describe("maternity dates and the April 2027 uprating", () => {
  it("counts back from the expected week of childbirth", async () => {
    const { maternityDates } = await import("./family");
    // Monday 1 March 2027: the expected week starts Sunday 28 February.
    const d = maternityDates("2027-03-01");
    expect(d.ewcStart).toBe("2027-02-28");
    expect(d.qwStart).toBe("2026-11-15");
    expect(d.qwEnd).toBe("2026-11-21");
    expect(d.noticeBy).toBe("2026-11-21");
    expect(d.earliestStart).toBe("2026-12-13");
  });
  it("keeps the 2026/27 rate for weeks starting before 4 April 2027", () => {
    const r = maternityPay({ awe: 600, service: true, fullPayWeeks: 0, halfPayWeeks: 0, leaveWeeks: 52, year: "2027/28", startIso: "2027-02-14", qualifyingYear: "2026/27" });
    expect(r.weeks[6].statutory).toBe(194.32); // week 7 starts 28 March
    expect(r.weeks[7].statutory).toBe(201.11); // week 8 starts 4 April
    expect(r.threshold).toBe(129);
  });
  it("pays 90% for all 39 weeks when that is below the flat rate", () => {
    const r = maternityPay({ awe: 200, service: true, fullPayWeeks: 0, halfPayWeeks: 0, leaveWeeks: 52 });
    expect(r.weeks[38].statutory).toBeCloseTo(180, 6);
    expect(r.weeks[39].statutory).toBe(0);
    expect(r.statutoryTotal).toBeCloseTo(180 * 39, 6);
  });
  it("sends earnings under the threshold to Maternity Allowance", () => {
    expect(maternityPay({ awe: 128.99, service: true, fullPayWeeks: 0, halfPayWeeks: 0, leaveWeeks: 39 }).route).toBe("ma");
    expect(maternityPay({ awe: 129, service: true, fullPayWeeks: 0, halfPayWeeks: 0, leaveWeeks: 39 }).route).toBe("smp");
    expect(maternityPay({ awe: 29.99, service: false, fullPayWeeks: 0, halfPayWeeks: 0, leaveWeeks: 39 }).route).toBe("none");
  });
});
