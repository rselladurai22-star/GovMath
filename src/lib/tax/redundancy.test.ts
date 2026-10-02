import { describe, it, expect } from "vitest";
import { redundancyPackage, statutoryNoticeWeeks, statutoryRedundancy } from "./redundancy";

describe("statutoryRedundancy", () => {
  it("uses 1 week per year for a 30-year-old with 5 years", () => {
    const r = statutoryRedundancy({ ageAtRedundancy: 30, yearsOfService: 5, weeklyPay: 500 });
    expect(r.weeksDue).toBe(5);
    expect(r.statutoryPayment).toBe(2500);
  });

  it("caps weekly pay at £751", () => {
    const r = statutoryRedundancy({ ageAtRedundancy: 30, yearsOfService: 1, weeklyPay: 1500 });
    expect(r.cappedWeeklyPay).toBe(751);
  });

  it("uses 1.5 weeks for service while 41+", () => {
    const r = statutoryRedundancy({ ageAtRedundancy: 45, yearsOfService: 3, weeklyPay: 500 });
    expect(r.weeksDue).toBe(4.5); // ages 42, 43, 44 all over 41
  });

  it("caps service years at 20", () => {
    const r = statutoryRedundancy({ ageAtRedundancy: 60, yearsOfService: 30, weeklyPay: 500 });
    expect(r.yearsCounted).toBe(20);
  });
});

describe("redundancyPackage", () => {
  it("uses the higher Northern Ireland cap", () => {
    const r = redundancyPackage({ age: 45, years: 10, weeklyPay: 900, nation: "ni" });
    expect(r.capUsed).toBe(783);
    expect(r.statutory).toBeCloseTo(r.weeksDue * 783, 6);
  });
  it("adds pay in lieu of notice using statutory notice", () => {
    const r = redundancyPackage({ age: 45, years: 8, weeklyPay: 600, payInLieu: true });
    expect(r.noticeWeeks).toBe(8);
    expect(r.noticePay).toBe(4800);
  });
  it("keeps the first £30,000 of redundancy pay tax-free and taxes notice pay", () => {
    const r = redundancyPackage({ age: 50, years: 20, weeklyPay: 1500, uncapped: true, enhancedExtra: 10_000, payInLieu: true });
    expect(r.taxFree).toBe(30_000);
    expect(r.taxable).toBeCloseTo(r.redundancy - 30_000 + r.noticePay, 6);
  });
  it("caps statutory notice at 12 weeks", () => {
    expect(statutoryNoticeWeeks(30)).toBe(12);
    expect(statutoryNoticeWeeks(1)).toBe(1);
  });
});
