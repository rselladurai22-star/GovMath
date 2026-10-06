import { describe, expect, it } from "vitest";
import { contributionTest, newStyleEsa, newStyleJsa, relevantYears } from "./new-style";
import { budgetingAdvanceMax, ucAdvance } from "./uc-advance";
import { checkEligibility, type EligibilityInput } from "./eligibility";
import { grossForTakeHome, takeHomeFor } from "../tax/reverse";

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
    const low = contributionTest({ claimDate: "2026-10-06", earningsEarlier: 0, earningsLater: 5_000, creditedEarlier: true, creditedLater: false });
    expect(low.conditionA).toBe(true);
    expect(low.conditionB).toBe(false);
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
});

describe("UC advance", () => {
  it("repays over the chosen months and checks the 15% cap", () => {
    const r = ucAdvance({ estimate: 800, advance: 800, months: 24, standard: "single25", otherDeductions: 0 });
    expect(r.monthly).toBeCloseTo(33.33, 2);
    expect(r.cap).toBeCloseTo(63.735, 3);
    expect(r.overCap).toBe(false);
    const big = ucAdvance({ estimate: 1200, advance: 2000, months: 12, standard: "single25", otherDeductions: 0 });
    expect(big.advance).toBe(1200);
    expect(big.overCap).toBe(true);
    expect(big.minMonthsForCap).toBe(19);
    expect(budgetingAdvanceMax(true, true)).toBe(812);
  });
});

describe("Reverse take-home", () => {
  it("finds the salary that gives a take-home", () => {
    for (const target of [20_000, 30_000, 45_000, 70_000]) {
      const g = grossForTakeHome({ target, region: "ruk", plan: "none", pensionPct: 0 });
      expect(takeHomeFor(g, { region: "ruk", plan: "none", pensionPct: 0 })).toBeGreaterThanOrEqual(target - 0.01);
      expect(takeHomeFor(g - 1, { region: "ruk", plan: "none", pensionPct: 0 })).toBeLessThan(target);
    }
    // Inside the Personal Allowance, gross equals take-home.
    expect(grossForTakeHome({ target: 12_000, region: "ruk", plan: "none", pensionPct: 0 })).toBeCloseTo(12_000, 1);
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
});
