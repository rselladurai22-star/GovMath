import { describe, expect, it } from "vitest";
import { addPercent, compoundChange, decimalToHhmm, percentChange, percentOf, percentagePoints, proRataRent, reversePercent, shiftHours, timesheet, weeklyToMonthlyRent, whatPercent } from "./everyday";

describe("percentages", () => {
  it("basics", () => {
    expect(percentOf(20, 150)).toBe(30);
    expect(whatPercent(30, 150)).toBe(20);
    expect(percentChange(80, 100)).toBe(25);
    expect(percentChange(100, 80)).toBe(-20);
    expect(addPercent(100, 20)).toBeCloseTo(120, 9);
  });
  it("reverse and points", () => {
    expect(reversePercent(120, 20)).toBeCloseTo(100, 9);
    expect(percentagePoints(4.5, 5.25)).toBeCloseTo(0.75, 9);
  });
  it("compound changes", () => {
    expect(compoundChange([10, -10])).toBeCloseTo(-1, 9);
    expect(compoundChange([50, -50])).toBeCloseTo(-25, 9);
  });
});

describe("pro-rata rent", () => {
  it("annual method", () => {
    const r = proRataRent(1200, "2026-10-20", "2026-10-31", "annual");
    expect(r.days).toBe(12);
    expect(r.dailyRate).toBeCloseTo((1200 * 12) / 365, 9);
    expect(r.amount).toBeCloseTo(((1200 * 12) / 365) * 12, 9);
  });
  it("month method", () => {
    const r = proRataRent(1200, "2027-02-15", "2027-02-28", "month");
    expect(r.days).toBe(14);
    expect(r.amount).toBeCloseTo(600, 9);
  });
  it("weekly to monthly", () => {
    expect(weeklyToMonthlyRent(300)).toBe(1300);
  });
});

describe("timesheets", () => {
  it("shift hours and overnight", () => {
    expect(shiftHours({ start: "09:00", end: "17:30", breakMins: 30 })).toBe(8);
    expect(shiftHours({ start: "22:00", end: "06:00", breakMins: 0 })).toBe(8);
  });
  it("hh:mm formatting", () => {
    expect(decimalToHhmm(7.75)).toBe("7:45");
  });
  it("overtime", () => {
    const shifts = Array.from({ length: 5 }, () => ({ start: "08:00", end: "18:00", breakMins: 60 }));
    const r = timesheet(shifts, 12, 37.5, 1.5);
    expect(r.total).toBe(45);
    expect(r.overtime).toBe(7.5);
    expect(r.pay).toBeCloseTo(37.5 * 12 + 7.5 * 18, 9);
  });
});
