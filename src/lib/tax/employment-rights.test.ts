import { describe, expect, it } from "vitest";
import {
  accrueHours,
  addMonths,
  employeeNoticeWeeks,
  employerNoticeWeeks,
  irregularHoliday,
  maxStatutory,
  noticeAndFinalPay,
  redundancyPay,
  rolledUpPay,
  serviceYears,
  weeksForAge,
} from "./employment-rights";

describe("redundancy pay", () => {
  it("uses the age bands", () => {
    expect(weeksForAge(21)).toBe(0.5);
    expect(weeksForAge(22)).toBe(1);
    expect(weeksForAge(40)).toBe(1);
    expect(weeksForAge(41)).toBe(1.5);
  });

  it("matches the 2026 caps", () => {
    expect(maxStatutory()).toBe(22_530);
    expect(maxStatutory("northern-ireland")).toBe(23_490);
  });

  it("counts back year by year", () => {
    const r = redundancyPay({ age: 45, years: 10, weeklyPay: 800 });
    expect(r.weeks).toBe(12);
    expect(r.cappedWeekPay).toBe(751);
    expect(r.statutory).toBe(9_012);
    expect(r.rows[0]).toMatchObject({ year: 1, age: 44, weeks: 1.5 });
    expect(r.rows[9]).toMatchObject({ year: 10, age: 35, weeks: 1 });
  });

  it("caps service at 20 years and needs 2", () => {
    expect(redundancyPay({ age: 64, years: 30, weeklyPay: 1_000 }).statutory).toBe(22_530);
    expect(redundancyPay({ age: 30, years: 1.9, weeklyPay: 500 }).eligible).toBe(false);
    expect(serviceYears(18, 5, 400).length).toBe(2);
  });

  it("uses Northern Ireland's cap", () => {
    expect(redundancyPay({ age: 64, years: 25, weeklyPay: 900, workplace: "northern-ireland" }).statutory).toBe(23_490);
  });

  it("keeps the first £30,000 tax-free and taxes notice and holiday pay", () => {
    const r = redundancyPay({ age: 50, years: 20, weeklyPay: 1_000, uncapped: true, multiple: 2, pilon: true, contractNoticeWeeks: 12, holidayDays: 5, otherPay: 30_000 });
    expect(r.redundancy).toBe(1_000 * 24.5 * 2);
    expect(r.taxFree).toBe(30_000);
    expect(r.excess).toBe(19_000);
    expect(r.noticePay).toBe(12_000);
    expect(r.holidayPay).toBe(1_000);
    expect(r.incomeTax).toBeGreaterThan(0);
    expect(r.employerClass1A).toBeCloseTo(2_850);
    expect(r.net).toBeLessThan(r.gross);
  });

  it("charges no tax when the award is under £30,000 and nothing else is paid", () => {
    const r = redundancyPay({ age: 40, years: 8, weeklyPay: 600, otherPay: 20_000 });
    expect(r.incomeTax).toBe(0);
    expect(r.ni).toBe(0);
  });

  it("guards empty input", () => {
    const r = redundancyPay({ age: NaN, years: NaN, weeklyPay: NaN });
    expect(r.gross).toBe(0);
    expect(Number.isFinite(r.net)).toBe(true);
  });
});

describe("notice", () => {
  it("sets the statutory minimums", () => {
    expect(employerNoticeWeeks(0, 0)).toBe(0);
    expect(employerNoticeWeeks(0, 3)).toBe(1);
    expect(employerNoticeWeeks(1)).toBe(1);
    expect(employerNoticeWeeks(6)).toBe(6);
    expect(employerNoticeWeeks(15)).toBe(12);
    expect(employeeNoticeWeeks(0)).toBe(0);
    expect(employeeNoticeWeeks(30)).toBe(1);
  });

  it("adds months with clamping", () => {
    expect(addMonths("2026-01-31", 1)).toBe("2026-02-28");
    expect(addMonths("2026-10-30", 3)).toBe("2027-01-30");
  });

  it("picks the longer notice and works out final pay", () => {
    const r = noticeAndFinalPay({
      giver: "employer",
      started: "2020-01-15",
      noticeGiven: "2026-10-30",
      contract: 1,
      unit: "months",
      salary: 36_000,
      leaveYearStart: "2026-01-01",
      takenDays: 15,
    });
    expect(r.years).toBe(6);
    expect(r.statutoryWeeks).toBe(6);
    expect(r.source).toBe("statutory");
    expect(r.noticeEnd).toBe("2026-12-11");
    expect(r.lastWorkingDay).toBe("2026-12-11");
    expect(r.holidayAccrued).toBeGreaterThan(25);
    expect(r.finalPay).toBeGreaterThan(0);
  });

  it("ends employment on the day with PILON", () => {
    const r = noticeAndFinalPay({ giver: "employer", started: "2024-03-01", noticeGiven: "2026-10-30", contract: 3, unit: "months", salary: 52_000, pilon: true, leaveYearStart: "2026-04-01" });
    expect(r.source).toBe("contract");
    expect(r.employmentEnds).toBe("2026-10-30");
    expect(r.pilonPay).toBe(13_000);
  });

  it("moves the last working day off a weekend", () => {
    const r = noticeAndFinalPay({ giver: "employee", started: "2025-01-01", noticeGiven: "2026-10-31", contract: 0, unit: "weeks", salary: 30_000, leaveYearStart: "2026-01-01" });
    expect(r.noticeEnd).toBe("2026-11-07");
    expect(r.lastWorkingDay).toBe("2026-11-06");
  });
});

describe("irregular hours holiday", () => {
  it("matches GOV.UK's examples", () => {
    expect(accrueHours(68).rounded).toBe(8);
    expect(rolledUpPay(364.7)).toBe(44.02); // GOV.UK shows £44.06 after rounding £3.647 to £3.65 first
    expect(rolledUpPay(460)).toBe(55.52);
  });

  it("matches 5.6 weeks for a full year", () => {
    const r = irregularHoliday({ hours: 30, pay: 381.3, period: "week" });
    expect(r.yearAccrued).toBeCloseTo(r.regularHours, 0);
  });

  it("uses the reference period when given", () => {
    const r = irregularHoliday({ hours: 30, pay: 381.3, period: "week", refPay: 20_000, refHours: 1_500, refWeeks: 52 });
    expect(r.avgHourly).toBeCloseTo(13.333, 2);
    expect(r.avgWeekPay).toBeCloseTo(384.62, 2);
  });

  it("guards zero hours", () => {
    const r = irregularHoliday({ hours: 0, pay: 0, period: "month" });
    expect(r.hourly).toBe(0);
    expect(Number.isFinite(r.yearValue)).toBe(true);
  });
});
