import { describe, expect, it } from "vitest";
import { CHILD_BENEFIT_2027_28, childBenefitRates } from "./child-benefit";
import { childBenefitFor, hicbc, maternityPay, statutoryRates } from "./family";
import { BENEFIT_CAP, UC_CHILDCARE_2027, UC_DEFAULT_INPUT, ucRates, universalCredit2026 } from "./uc-engine";
import { workChange } from "./uc-work";
import { newStyleEsa, newStyleJsa, newStyleRates } from "./new-style";
import { pcRates, pensionCredit2026, PC_DEFAULT_INPUT, statePensionRates } from "./later-life";
import { carerEarnings, carerRates } from "./carers";
import { pipRates, pipScore } from "./pip-assessment";
import { housingBenefitCap } from "./benefit-cap";

// Figures from DWP "Proposed benefit and pension rates 2027 to 2028" (11 November 2026)
// and HM Treasury Budget 2026 Annex A (Child Benefit).

describe("proposed 2027/28 rates match the GOV.UK tables", () => {
  it("Universal Credit (monthly)", () => {
    const r = ucRates("2027/28");
    expect(r.standard).toEqual({ singleUnder25: 353.87, single25: 443.21, coupleUnder25: 551.11, couple25: 695.71 });
    expect(r.child).toEqual({ firstPre2017: 364.2, each: 314.58 });
    expect(r.disabledChild).toEqual({ lower: 170.56, higher: 532.72 });
    expect([r.lcw, r.lcwraNew, r.lcwraProtected, r.carer]).toEqual([158.76, 217.26, 441.41, 216.67]);
    expect(r.workAllowance).toEqual({ withHousing: 442, noHousing: 735 });
    expect(r.nonDependant).toBe(99.93);
    expect(UC_CHILDCARE_2027).toMatchObject({ maxOne: 1108.58, maxTwoPlus: 1900.43 });
    // 2026/27 is still the default.
    expect(ucRates().standard.single25).toBe(424.9);
  });
  it("Child Benefit", () => {
    expect(CHILD_BENEFIT_2027_28).toMatchObject({ firstChildWeekly: 28, additionalChildWeekly: 18.55 });
    expect(childBenefitRates().firstChildWeekly).toBe(27.05);
  });
  it("New Style JSA and ESA", () => {
    const r = newStyleRates("2027/28");
    expect([r.jsa.under25, r.jsa.over25]).toEqual([78.3, 98.9]);
    expect([r.esa.assessment.under25, r.esa.assessment.over25, r.esa.main, r.esa.wrac, r.esa.support]).toEqual([78.3, 98.9, 98.9, 39.3, 52.1]);
    expect(r.esa.permittedWorkHigher).toBe(211.5);
  });
  it("Pension Credit and State Pension", () => {
    const r = pcRates("2027/28");
    expect(r.guarantee).toEqual({ single: 247.3, couple: 377.4 });
    expect([r.severeDisability, r.carer]).toEqual([89.05, 49.85]);
    expect(r.child).toEqual({ firstPre2017: 83.91, other: 72.43 });
    expect(r.disabledChild).toEqual({ lower: 39.26, higher: 122.61 });
    expect(r.savingsThreshold).toEqual({ single: 216.32, couple: 342.74 });
    expect(r.savingsMax).toEqual({ single: 18.59, couple: 20.8 });
    expect(statePensionRates("2027/28")).toEqual({ newFull: 250.7, basicFull: 192.1 });
  });
  it("Carer's Allowance, PIP and statutory pay", () => {
    expect(carerRates("2027/28")).toMatchObject({ weekly: 89.5, earningsLimit: 212 });
    expect(pipRates("2027/28")).toEqual({ daily: { standard: 79.4, enhanced: 118.6 }, mobility: { standard: 31.35, enhanced: 82.8 } });
    expect(statutoryRates("2027/28")).toEqual({ flatRate: 201.11, lowerEarningsLimit: 133, maThreshold: 30 });
  });
  it("benefit cap is frozen", () => {
    expect(BENEFIT_CAP.elsewhere).toEqual({ single: 14753, family: 22020 });
    expect(BENEFIT_CAP.london).toEqual({ single: 16967, family: 25323 });
  });
});

describe("worked results with 2027/28 rates", () => {
  it("Universal Credit: single, 25 or over, no income", () => {
    expect(universalCredit2026({ ...UC_DEFAULT_INPUT, year: "2027/28" }).award).toBeCloseTo(443.21, 2);
    expect(universalCredit2026({ ...UC_DEFAULT_INPUT }).award).toBeCloseTo(424.9, 2);
  });
  it("Universal Credit: lone parent, 2 children, £1,000 earnings, no housing", () => {
    const i = { ...UC_DEFAULT_INPUT, children: 2, earnings: 1000, year: "2027/28" as const };
    // 443.21 + 314.58 × 2 − 55% × (1,000 − 735)
    expect(universalCredit2026(i).award).toBeCloseTo(443.21 + 629.16 - 0.55 * 265, 2);
  });
  it("UC taper: extra pay with the higher work allowance", () => {
    const household = { ...UC_DEFAULT_INPUT, children: 1, year: "2027/28" as const };
    const c = workChange({ grossMonthly: 500, pensionPct: 0, region: "ruk", partnerNet: 0, household }, 200);
    // £500 gross is all take-home and under the £735 work allowance; £700 is still under it.
    expect(c.lostToUc).toBeCloseTo(0, 2);
    const c2 = workChange({ grossMonthly: 800, pensionPct: 0, region: "ruk", partnerNet: 0, household }, 100);
    expect(c2.lostToUc).toBeCloseTo(55, 2);
  });
  it("Child Benefit for 2 children", () => {
    expect(childBenefitFor(2, 52, "2027/28").weekly).toBeCloseTo(46.55, 2);
    expect(childBenefitFor(2, 52, "2027/28").annual).toBeCloseTo(2420.6, 2);
  });
  it("High Income Child Benefit Charge at £70,000", () => {
    const h = hicbc({ children: 2, income: 70_000, pension: 0, giftAid: 0, weeks: 52, year: "2027/28" });
    expect(h.benefit).toBeCloseTo(2420.6, 2);
    expect(h.charge).toBe(1210);
  });
  it("New Style JSA and ESA", () => {
    expect(newStyleJsa({ over25: true, pension: 0, earnings: 0, hours: 0, year: "2027/28" }).weekly).toBe(98.9);
    expect(newStyleEsa({ over25: true, group: "support", pre2017: false, pension: 0, earnings: 0, hours: 0, year: "2027/28" }).weekly).toBe(151);
  });
  it("Pension Credit: single, £200 State Pension", () => {
    const r = pensionCredit2026({ ...PC_DEFAULT_INPUT, statePension: 200, year: "2027/28" });
    expect(r.guaranteeCredit).toBeCloseTo(47.3, 2);
  });
  it("Carer's Allowance: £210 counted earnings is within the new £212 limit", () => {
    const r = carerEarnings({ grossWeekly: 210, pensionWeekly: 0, careCostsWeekly: 0, scotland: false, overlapping: 0, year: "2027/28" });
    expect(r.withinLimit).toBe(true);
    expect(r.payable).toBe(89.5);
    expect(carerEarnings({ grossWeekly: 210, pensionWeekly: 0, careCostsWeekly: 0, scotland: false, overlapping: 0 }).withinLimit).toBe(false);
  });
  it("PIP: both enhanced rates", () => {
    const s = pipScore({ moving: "f", food: "f", eating: "f" }, "2027/28");
    expect(s.dailyWeekly).toBe(118.6);
    expect(s.mobilityWeekly).toBe(82.8);
    expect(s.weekly).toBeCloseTo(201.4, 2);
  });
  it("Statutory Maternity Pay at £500 a week", () => {
    const r = maternityPay({ awe: 500, service: true, fullPayWeeks: 0, halfPayWeeks: 0, leaveWeeks: 39, year: "2027/28" });
    expect(r.remaining).toBe(201.11);
    expect(r.statutoryTotal).toBeCloseTo(6 * 450 + 33 * 201.11, 2);
    // £130 a week now qualifies for SMP, but not from April 2027 (threshold £133).
    expect(maternityPay({ awe: 130, service: true, fullPayWeeks: 0, halfPayWeeks: 0, leaveWeeks: 39 }).route).toBe("smp");
    expect(maternityPay({ awe: 130, service: true, fullPayWeeks: 0, halfPayWeeks: 0, leaveWeeks: 39, year: "2027/28" }).route).toBe("ma");
  });
  it("Benefit cap (Housing Benefit route) is unchanged", () => {
    const r = housingBenefitCap({ household: "family", location: "elsewhere", weeklyBenefits: 500, weeklyHousingBenefit: 200 });
    expect(r.weeklyCap).toBeCloseTo(22020 / 52, 6);
  });
});
