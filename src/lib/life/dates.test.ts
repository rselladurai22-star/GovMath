import { describe, expect, it } from "vitest";
import {
  addMonths,
  ageMilestones,
  ageOn,
  birthdayIn,
  dayOfYear,
  isIsoDate,
  isoWeek,
  shiftDate,
  shiftWorkingDays,
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
