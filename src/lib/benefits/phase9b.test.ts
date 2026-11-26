import { describe, expect, it } from "vitest";
import { contributionTest, newStyleEsa, newStyleJsa, relevantYears } from "./new-style";
import { budgetingAdvance, budgetingAdvanceMax, ucAdvance } from "./uc-advance";
import { checkEligibility, type EligibilityInput } from "./eligibility";

describe("New Style JSA and ESA", () => {
  it("uses the last two complete tax years before the benefit year", () => {
    expect(relevantYears("2026-10-06")).toEqual([2023, 2024]);
    expect(relevantYears("2026-01-03")).toEqual([2022, 2023]);
    expect(relevantYears("2026-01-04")).toEqual([2023, 2024]);
    expect(relevantYears("2027-01-03")).toEqual([2024, 2025]);
  });
  it("checks the contribution conditions", () => {
    const ok = contributionTest({ claimDate: "2026-10-06", earningsEarlier: 20_000, earningsLater: 20_000, creditedEarlier: false, creditedLater: false });
    expect(ok.met).toBe(true);
    expect(ok.eachYearNeeded).toEqual([6150, 6150]);
    const low = contributionTest({ claimDate: "2026-10-06", earningsEarlier: 0, earningsLater: 5_000, weeksLater: 26, creditedEarlier: true, creditedLater: false });
    expect(low.conditionA).toBe(true);
    expect(low.conditionB).toBe(false);
  });
  it("switches tax years on the first Sunday in January (GOV.UK: 2 and 3 January 2027)", () => {
    expect(contributionTest({ claimDate: "2027-01-02", earningsEarlier: 0, earningsLater: 0, creditedEarlier: false, creditedLater: false }).years).toEqual(["2023/24", "2024/25"]);
    expect(contributionTest({ claimDate: "2027-01-03", earningsEarlier: 0, earningsLater: 0, creditedEarlier: false, creditedLater: false }).years).toEqual(["2024/25", "2025/26"]);
    // 2025/26 has a Lower Earnings Limit of £125 a week.
    expect(contributionTest({ claimDate: "2027-01-03", earningsEarlier: 0, earningsLater: 0, creditedEarlier: false, creditedLater: false }).eachYearNeeded).toEqual([6150, 6250]);
  });
  it("counts no Class 1 on weekly pay under the Lower Earnings Limit", () => {
    // £6,000 over 52 weeks is £115.38 a week, under £123: nothing paid, so both conditions fail.
    const r = contributionTest({ claimDate: "2026-10-06", earningsEarlier: 6_000, earningsLater: 6_000, creditedEarlier: false, creditedLater: false });
    expect(r.detail[0].underLel).toBe(true);
    expect(r.met).toBe(false);
    expect(r.conditionA).toBe(false);
  });
  it("caps each week at the LEL for condition A, so 26 weeks of work are needed", () => {
    // £22,000 earned in 25 weeks counts 25 × £123 = £3,075, under 26 × £123 = £3,198.
    const short = contributionTest({ claimDate: "2026-10-06", earningsEarlier: 22_000, earningsLater: 22_000, weeksEarlier: 25, weeksLater: 25, creditedEarlier: false, creditedLater: false });
    expect(short.detail[1].counted).toBe(3_075);
    expect(short.conditionA).toBe(false);
    expect(short.conditionB).toBe(true);
    const enough = contributionTest({ claimDate: "2026-10-06", earningsEarlier: 22_000, earningsLater: 22_000, weeksEarlier: 25, weeksLater: 26, creditedEarlier: false, creditedLater: false });
    expect(enough.detail[1].counted).toBe(3_198);
    expect(enough.met).toBe(true);
  });
  it("lets credits fill condition B but never condition A", () => {
    const credits = contributionTest({ claimDate: "2026-10-06", earningsEarlier: 0, earningsLater: 0, creditedEarlier: true, creditedLater: true });
    expect(credits.conditionB).toBe(true);
    expect(credits.conditionA).toBe(false);
    expect(credits.met).toBe(false);
    const oneYearCredited = contributionTest({ claimDate: "2026-10-06", earningsEarlier: 0, earningsLater: 20_000, creditedEarlier: true, creditedLater: false });
    expect(oneYearCredited.met).toBe(true);
  });
  it("counts Class 2 self-employment for ESA but not JSA", () => {
    const base = { claimDate: "2026-10-06", earningsEarlier: 0, earningsLater: 0, creditedEarlier: false, creditedLater: false, selfEmployedEarlier: true, selfEmployedLater: true };
    expect(contributionTest({ ...base, benefit: "esa" }).met).toBe(true);
    expect(contributionTest({ ...base, benefit: "jsa" }).met).toBe(false);
  });
  it("pays JSA at the 2026/27 rates less pension and earnings", () => {
    expect(newStyleJsa({ over25: true, pension: 0, earnings: 0, hours: 0 }).weekly).toBe(95.55);
    expect(newStyleJsa({ over25: false, pension: 0, earnings: 0, hours: 0 }).weekly).toBe(75.65);
    const r = newStyleJsa({ over25: true, pension: 70, earnings: 25, hours: 8 });
    expect(r.weekly).toBeCloseTo(95.55 - 20 - 20, 2);
    expect(newStyleJsa({ over25: true, pension: 0, earnings: 10, hours: 16 }).weekly).toBe(0);
  });
  it("pays ESA by group", () => {
    expect(newStyleEsa({ over25: true, group: "assessment", pre2017: false, pension: 0, earnings: 0, hours: 0 }).weekly).toBe(95.55);
    expect(newStyleEsa({ over25: false, group: "wrag", pre2017: false, pension: 0, earnings: 0, hours: 0 }).weekly).toBe(95.55);
    expect(newStyleEsa({ over25: true, group: "support", pre2017: false, pension: 0, earnings: 0, hours: 0 }).weekly).toBeCloseTo(145.9, 2);
    expect(newStyleEsa({ over25: true, group: "wrag", pre2017: true, pension: 0, earnings: 0, hours: 0 }).weekly).toBeCloseTo(133.5, 2);
    expect(newStyleEsa({ over25: true, group: "support", pre2017: false, pension: 125, earnings: 0, hours: 0 }).weekly).toBeCloseTo(125.9, 2);
    expect(newStyleEsa({ over25: true, group: "support", pre2017: false, pension: 0, earnings: 250, hours: 10 }).weekly).toBe(0);
  });
  it("matches GOV.UK's ESA pension example: £100 a week takes off £7.50", () => {
    expect(newStyleEsa({ over25: true, group: "wrag", pre2017: false, pension: 100, earnings: 0, hours: 0 }).pensionDeduction).toBe(7.5);
    expect(newStyleEsa({ over25: true, group: "wrag", pre2017: false, pension: 85, earnings: 0, hours: 0 }).pensionDeduction).toBe(0);
  });
  it("allows permitted work up to £203.50 under 16 hours, and £20 at any hours", () => {
    const at = (earnings: number, hours: number) => newStyleEsa({ over25: true, group: "wrag", pre2017: false, pension: 0, earnings, hours }).permittedWorkOk;
    expect(at(203.5, 15)).toBe(true);
    expect(at(203.51, 15)).toBe(false);
    expect(at(100, 16)).toBe(false);
    expect(at(20, 30)).toBe(true);
    expect(at(20.01, 30)).toBe(false);
  });
  it("stops the work-related activity group at 365 days but not the support group", () => {
    expect(newStyleEsa({ over25: true, group: "wrag", pre2017: false, pension: 0, earnings: 0, hours: 0 }).limitWeeks).toBe(52);
    expect(newStyleEsa({ over25: true, group: "support", pre2017: false, pension: 0, earnings: 0, hours: 0 }).limitWeeks).toBeNull();
  });
  it("JSA: pension over £50 and earnings over £5 come off £1 for £1, under 25 rate", () => {
    expect(newStyleJsa({ over25: true, pension: 50, earnings: 5, hours: 10 }).weekly).toBe(95.55);
    expect(newStyleJsa({ over25: false, pension: 60, earnings: 15, hours: 10 }).weekly).toBe(55.65);
    expect(newStyleJsa({ over25: true, pension: 0, earnings: 0, hours: 15.5 }).tooManyHours).toBe(false);
    expect(newStyleJsa({ over25: true, pension: 500, earnings: 0, hours: 0 }).weekly).toBe(0);
    expect(newStyleJsa({ over25: true, pension: 0, earnings: 0, hours: 0 }).total).toBeCloseTo(95.55 * 26, 2);
  });
});

describe("UC advance", () => {
  it("repays over the chosen months and checks the 15% cap", () => {
    const r = ucAdvance({ estimate: 800, advance: 800, months: 24, standard: "single25", otherDeductions: 0 });
    expect(r.monthly).toBeCloseTo(33.33, 2);
    expect(r.cap).toBe(63.74);
    expect(r.overCap).toBe(false);
    const big = ucAdvance({ estimate: 1200, advance: 2000, months: 12, standard: "single25", otherDeductions: 0 });
    expect(big.advance).toBe(1200);
    expect(big.overCap).toBe(true);
    expect(big.minMonthsForCap).toBe(19);
    expect(budgetingAdvanceMax(true, true)).toBe(812);
  });
  it("matches GOV.UK's worked example: £344 over 24 months", () => {
    const r = ucAdvance({ estimate: 344, advance: 344, months: 24, standard: "singleUnder25", otherDeductions: 0 });
    expect(r.monthly).toBeCloseTo(14.33, 2);
    expect(r.paymentAfter).toBeCloseTo(329.67, 2);
  });
  it("flags a repayment above the 15% cap and finds the months that fit", () => {
    // Single 25 or over: 15% of £424.90 is £63.74.
    const r = ucAdvance({ estimate: 1125, advance: 1125, months: 12, standard: "single25", otherDeductions: 0 });
    expect(r.monthly).toBeCloseTo(93.75, 2);
    expect(r.overCap).toBe(true);
    expect(r.minMonthsForCap).toBe(18);
    expect(ucAdvance({ estimate: 1125, advance: 1125, months: 18, standard: "single25", otherDeductions: 0 }).overCap).toBe(false);
    // Too large to fit even over 24 months.
    expect(ucAdvance({ estimate: 2000, advance: 2000, months: 24, standard: "single25", otherDeductions: 0 }).minMonthsForCap).toBeNull();
  });
  it("existing deductions share the same cap", () => {
    const r = ucAdvance({ estimate: 900, advance: 600, months: 24, standard: "couple25", otherDeductions: 80 });
    expect(r.cap).toBe(100.05);
    expect(r.totalDeductions).toBeCloseTo(105, 6);
    expect(r.overCap).toBe(true);
    expect(r.minMonthsForCap).toBeNull();
    expect(r.paymentAfter).toBeCloseTo(795, 6);
    const smaller = ucAdvance({ estimate: 900, advance: 400, months: 24, standard: "couple25", otherDeductions: 80 });
    expect(smaller.overCap).toBe(false);
    expect(smaller.minMonthsForCap).toBe(20);
  });
  it("budgeting advance: limits, and earnings over £2,600 (£3,600 for couples) rule it out", () => {
    expect(budgetingAdvance(false, false, 2600)).toEqual({ eligible: true, max: 348, min: 100, earningsLimit: 2600 });
    expect(budgetingAdvance(false, false, 2600.01).eligible).toBe(false);
    expect(budgetingAdvance(true, false, 3600).max).toBe(464);
    expect(budgetingAdvance(true, false, 3601).eligible).toBe(false);
    expect(budgetingAdvance(false, true, 0).max).toBe(812);
  });
});

describe("Eligibility checker", () => {
  const base: EligibilityInput = {
    pensionAge: false, over80: false, couple: false, over25: true, children: 0, youngest: 0, pregnant: false, tenure: "private", rent: 700,
    earnings: 0, otherIncome: 0, savings: 0, disability: "none", carer: false, workedRecently: true, childcare: 0, highestIncome: 0,
  };
  it("finds Universal Credit for an out-of-work renter", () => {
    const r = checkEligibility(base);
    expect(r.ucAward).toBeCloseTo(424.9 + 700, 2);
    expect(r.items.find((x) => x.key === "uc")?.status).toBe("likely");
    expect(r.items.find((x) => x.key === "jsa")?.status).toBe("check");
  });
  it("finds Pension Credit and Winter Fuel Payment for a pensioner", () => {
    const r = checkEligibility({ ...base, pensionAge: true, otherIncome: 700, tenure: "own" });
    expect(r.pcWeekly).toBeGreaterThan(0);
    expect(r.items.some((x) => x.key === "wfp" && x.oneOff === 200)).toBe(true);
  });
  it("gives a family Child Benefit and the maternity grant", () => {
    const r = checkEligibility({ ...base, pregnant: true });
    expect(r.items.find((x) => x.key === "ssmg")?.oneOff).toBe(500);
    const f = checkEligibility({ ...base, children: 2, youngest: 3, earnings: 3000 });
    expect(f.items.find((x) => x.key === "cb")?.monthly).toBeCloseTo(((27.05 + 17.9) * 52) / 12, 2);
  });
  it("sends a mixed-age couple to Universal Credit, not Pension Credit", () => {
    const r = checkEligibility({ ...base, couple: true, mixedAge: true, otherIncome: 900 });
    expect(r.pcWeekly).toBe(0);
    expect(r.items.find((x) => x.key === "uc")).toBeDefined();
    expect(r.items.find((x) => x.key === "pc")?.status).toBe("unlikely");
  });
  it("does not assess public funds when the household has no recourse to them", () => {
    const r = checkEligibility({ ...base, nrpf: true, children: 2, youngest: 3 });
    expect(r.nrpf).toBe(true);
    expect(r.likelyMonthly).toBe(0);
    expect(r.items.every((x) => x.key === "jsa" || x.key === "esa")).toBe(true);
  });
  it("does not put a figure on a pensioner's Housing Benefit", () => {
    const r = checkEligibility({ ...base, pensionAge: true, otherIncome: 700, rent: 650 });
    expect(r.items.find((x) => x.key === "hb")?.monthly).toBeNull();
  });
  it("finds no Pension Credit on the full new State Pension alone", () => {
    // £241.30 a week is just over the £238 guarantee: no Pension Credit.
    const r = checkEligibility({ ...base, pensionAge: true, otherIncome: (241.3 * 52) / 12, tenure: "own" });
    expect(r.pcWeekly).toBe(0);
  });
});
