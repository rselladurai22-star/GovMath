import { describe, expect, it } from "vitest";
import {
  addMonths,
  ageMilestones,
  ageOn,
  birthdayIn,
  clockLabel,
  countdown,
  dayOfYear,
  decimalHours,
  hhmm,
  hoursMinutes,
  isIsoDate,
  isoWeek,
  parseClock,
  parseDuration,
  presetDate,
  shiftDate,
  shiftWorkingDays,
  splitSeconds,
  sumDurations,
  timeBetween,
  weekdayName,
  workingDaysBetween,
} from "./dates";

describe("basic dates", () => {
  it("validates ISO dates", () => {
    expect(isIsoDate("2026-02-28")).toBe(true);
    expect(isIsoDate("2026-02-29")).toBe(false);
    expect(isIsoDate("2024-02-29")).toBe(true);
    expect(isIsoDate("")).toBe(false);
    expect(isIsoDate("2026-13-01")).toBe(false);
  });
  it("clamps months to the month end", () => {
    expect(addMonths("2026-01-31", 1)).toBe("2026-02-28");
    expect(addMonths("2024-01-31", 1)).toBe("2024-02-29");
    expect(addMonths("2026-03-31", -1)).toBe("2026-02-28");
    expect(addMonths("2026-10-11", 12)).toBe("2027-10-11");
  });
  it("gives weekday, day of year and ISO week", () => {
    expect(weekdayName("2026-10-11")).toBe("Sunday");
    expect(dayOfYear("2026-12-31")).toBe(365);
    expect(dayOfYear("2024-12-31")).toBe(366);
    expect(isoWeek("2026-01-01")).toBe(1);
    expect(isoWeek("2027-01-01")).toBe(53);
    expect(isoWeek("2026-10-11")).toBe(41);
  });
});

describe("age", () => {
  it("works out years, months and days", () => {
    const a = ageOn("1990-06-15", "2026-10-11")!;
    expect([a.years, a.months, a.days]).toEqual([36, 3, 26]);
    expect(a.totalMonths).toBe(435);
    expect(a.nextBirthday).toBe("2027-06-15");
    expect(a.turning).toBe(37);
    expect(a.bornOn).toBe("Friday");
    expect(a.totalDays).toBe(13267);
  });
  it("is zero on the birth date and null before it", () => {
    const a = ageOn("2026-10-11", "2026-10-11")!;
    expect([a.years, a.months, a.days, a.totalDays]).toEqual([0, 0, 0, 0]);
    expect(ageOn("2026-10-12", "2026-10-11")).toBeNull();
  });
  it("counts a birthday today", () => {
    const a = ageOn("2000-10-11", "2026-10-11")!;
    expect([a.years, a.months, a.days]).toEqual([26, 0, 0]);
    expect(a.daysToNext).toBe(365);
  });
  it("handles 29 February births", () => {
    expect(birthdayIn("2024-02-29", 2025, "mar1")).toBe("2025-03-01");
    expect(birthdayIn("2024-02-29", 2025, "feb28")).toBe("2025-02-28");
    expect(birthdayIn("2024-02-29", 2028)).toBe("2028-02-29");
    const m = ageOn("2008-02-29", "2026-02-28", "mar1")!;
    expect([m.years, m.months, m.days]).toEqual([17, 11, 27]);
    const f = ageOn("2008-02-29", "2026-02-28", "feb28")!;
    expect([f.years, f.months, f.days]).toEqual([18, 0, 0]);
    expect(ageOn("2008-02-29", "2026-03-01", "mar1")!.years).toBe(18);
  });
  it("handles month ends", () => {
    const a = ageOn("2000-01-31", "2026-03-01")!;
    expect([a.years, a.months, a.days]).toEqual([26, 1, 1]);
  });
  it("lists milestones in order", () => {
    const m = ageMilestones("1990-06-15");
    expect(m.find((x) => x.label === "10,000 days old")!.date).toBe("2017-10-31");
    expect(m.find((x) => x.label === "1 billion seconds old")!.date).toBe("2022-02-21");
    for (let i = 1; i < m.length; i++) expect(m[i].date >= m[i - 1].date).toBe(true);
  });
  it("finds the next half birthday", () => {
    expect(ageOn("1990-06-15", "2026-10-11")!.nextHalfBirthday).toBe("2026-12-15");
    expect(ageOn("1990-06-15", "2026-12-20")!.nextHalfBirthday).toBe("2027-12-15");
  });
});

describe("adding to dates", () => {
  it("adds and subtracts calendar periods", () => {
    expect(shiftDate("2026-10-11", { years: 0, months: 0, weeks: 0, days: 90 }, 1)).toBe("2027-01-09");
    expect(shiftDate("2026-01-31", { years: 0, months: 1, weeks: 0, days: 0 }, 1)).toBe("2026-02-28");
    expect(shiftDate("2026-10-11", { years: 1, months: 2, weeks: 1, days: 3 }, -1)).toBe("2025-08-01");
    expect(shiftDate("2024-02-29", { years: 1, months: 0, weeks: 0, days: 0 }, 1)).toBe("2025-02-28");
  });
  it("adds working days, skipping weekends and bank holidays", () => {
    const fri = shiftWorkingDays("2026-10-09", 1, { kind: "weekdays" });
    expect(fri.date).toBe("2026-10-12");
    expect(fri.weekendDays).toBe(2);
    const xmas = shiftWorkingDays("2026-12-24", 1, { kind: "uk", nation: "england-and-wales" });
    expect(xmas.date).toBe("2026-12-29");
    expect(xmas.holidays.map((h) => h.date)).toEqual(["2026-12-25", "2026-12-28"]);
    const scot = shiftWorkingDays("2026-12-31", 1, { kind: "uk", nation: "scotland" });
    expect(scot.date).toBe("2027-01-05");
    expect(shiftWorkingDays("2026-10-12", -1, { kind: "weekdays" }).date).toBe("2026-10-09");
    expect(shiftWorkingDays("2026-10-11", 10, { kind: "calendar" }).date).toBe("2026-10-21");
  });
  it("counts working days between dates", () => {
    const w = workingDaysBetween("2026-12-20", "2027-01-04", { kind: "uk", nation: "england-and-wales" });
    expect(w.working).toBe(7);
    expect(w.holidays.length).toBe(3);
  });
});

describe("countdowns", () => {
  const ew = { kind: "uk", nation: "england-and-wales" } as const;
  it("finds preset dates", () => {
    expect(presetDate("christmas", "2026-10-11", "england-and-wales").date).toBe("2026-12-25");
    expect(presetDate("christmas", "2026-12-26", "england-and-wales").date).toBe("2027-12-25");
    expect(presetDate("christmas", "2026-12-25", "england-and-wales").date).toBe("2026-12-25");
    expect(presetDate("newyear", "2026-10-11", "england-and-wales").date).toBe("2027-01-01");
    expect(presetDate("easter", "2026-10-11", "england-and-wales").date).toBe("2027-03-28");
    expect(presetDate("bankholiday", "2026-10-11", "england-and-wales").date).toBe("2026-12-25");
    expect(presetDate("bankholiday", "2026-10-11", "scotland").date).toBe("2026-11-30");
  });
  it("counts down to a date", () => {
    const c = countdown("2026-10-11", "2026-12-25", ew);
    expect(c.days).toBe(75);
    expect([c.weeks, c.weekDays]).toEqual([10, 5]);
    expect([c.months, c.monthDays]).toEqual([2, 14]);
    expect(c.saturdays).toBe(10);
    expect(c.working).toBe(54);
    expect(c.past).toBe(false);
  });
  it("counts up from a past date", () => {
    const c = countdown("2026-10-11", "2026-10-01", { kind: "weekdays" });
    expect(c.past).toBe(true);
    expect(c.days).toBe(10);
  });
  it("splits seconds", () => {
    expect(splitSeconds(90_061)).toEqual({ d: 1, h: 1, m: 1, s: 1 });
    expect(splitSeconds(-5)).toEqual({ d: 0, h: 0, m: 0, s: 0 });
  });
});

describe("times", () => {
  it("reads clock times", () => {
    expect(parseClock("09:30")).toBe(570);
    expect(parseClock("9.30")).toBe(570);
    expect(parseClock("1730")).toBe(1050);
    expect(parseClock("9:30pm")).toBe(1290);
    expect(parseClock("12am")).toBe(0);
    expect(parseClock("12pm")).toBe(720);
    expect(parseClock("9")).toBe(540);
    expect(parseClock("25:00")).toBeNaN();
    expect(parseClock("9:75")).toBeNaN();
    expect(parseClock("")).toBeNaN();
  });
  it("reads durations", () => {
    expect(parseDuration("7:30")).toBe(450);
    expect(parseDuration("7h 30m")).toBe(450);
    expect(parseDuration("7.5")).toBe(450);
    expect(parseDuration("45m")).toBe(45);
    expect(parseDuration("90 min")).toBe(90);
    expect(parseDuration("2h")).toBe(120);
    expect(parseDuration("abc")).toBeNaN();
    expect(parseDuration("1:75")).toBeNaN();
  });
  it("works out time between, across midnight", () => {
    expect(timeBetween(540, 1050, 30)).toEqual({ gross: 510, net: 480, overnight: false, breakTooLong: false });
    expect(timeBetween(1320, 360, 45)).toEqual({ gross: 480, net: 435, overnight: true, breakTooLong: false });
    expect(timeBetween(NaN, 360).net).toBe(0);
    expect(timeBetween(540, 600, 90).breakTooLong).toBe(true);
  });
  it("adds durations", () => {
    const r = sumDurations([
      { text: "7:30", sign: 1 },
      { text: "8:15", sign: 1 },
      { text: "0:45", sign: -1 },
      { text: "", sign: 1 },
      { text: "bad", sign: 1 },
    ]);
    expect(r.total).toBe(900);
    expect(r.used).toBe(3);
    expect(r.invalid).toEqual([4]);
  });
  it("formats", () => {
    expect(hhmm(450)).toBe("7:30");
    expect(hhmm(-75)).toBe("−1:15");
    expect(hoursMinutes(450)).toBe("7 hours 30 minutes");
    expect(hoursMinutes(60)).toBe("1 hour");
    expect(hoursMinutes(0)).toBe("0 minutes");
    expect(decimalHours(465)).toBe(7.75);
    expect(decimalHours(NaN)).toBe(0);
    expect(clockLabel(1290, "12h")).toBe("9:30pm");
    expect(clockLabel(1500)).toBe("01:00");
  });
});
