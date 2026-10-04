import { describe, expect, it } from "vitest";
import { addWorkingDays, bankHolidays, countDays, dateDiff, easterSunday, formatDate, leavePlans, type Nation } from "./calendar";

// Official GOV.UK dates.
const OFFICIAL: Record<Nation, string[]> = {
  "england-and-wales": [
    "2025-01-01", "2025-04-18", "2025-04-21", "2025-05-05", "2025-05-26", "2025-08-25", "2025-12-25", "2025-12-26",
    "2026-01-01", "2026-04-03", "2026-04-06", "2026-05-04", "2026-05-25", "2026-08-31", "2026-12-25", "2026-12-28",
    "2027-01-01", "2027-03-26", "2027-03-29", "2027-05-03", "2027-05-31", "2027-08-30", "2027-12-27", "2027-12-28",
  ],
  scotland: [
    "2025-01-01", "2025-01-02", "2025-04-18", "2025-05-05", "2025-05-26", "2025-08-04", "2025-12-01", "2025-12-25", "2025-12-26",
    "2026-01-01", "2026-01-02", "2026-04-03", "2026-05-04", "2026-05-25", "2026-08-03", "2026-11-30", "2026-12-25", "2026-12-28",
    "2027-01-01", "2027-01-04", "2027-03-26", "2027-05-03", "2027-05-31", "2027-08-02", "2027-11-30", "2027-12-27", "2027-12-28",
  ],
  "northern-ireland": [
    "2025-01-01", "2025-03-17", "2025-04-18", "2025-04-21", "2025-05-05", "2025-05-26", "2025-07-14", "2025-08-25", "2025-12-25", "2025-12-26",
    "2026-01-01", "2026-03-17", "2026-04-03", "2026-04-06", "2026-05-04", "2026-05-25", "2026-07-13", "2026-08-31", "2026-12-25", "2026-12-28",
    "2027-01-01", "2027-03-17", "2027-03-26", "2027-03-29", "2027-05-03", "2027-05-31", "2027-07-12", "2027-08-30", "2027-12-27", "2027-12-28",
  ],
};

describe("bank holidays", () => {
  it("Easter", () => {
    expect(easterSunday(2026)).toBe("2026-04-05");
    expect(easterSunday(2027)).toBe("2027-03-28");
    expect(easterSunday(2028)).toBe("2028-04-16");
  });
  for (const nation of Object.keys(OFFICIAL) as Nation[]) {
    it(`matches GOV.UK for ${nation}`, () => {
      const got = [2025, 2026, 2027].flatMap((y) => bankHolidays(y, nation).map((h) => h.date));
      expect(got).toEqual(OFFICIAL[nation]);
    });
  }
  it("Christmas on a Sunday keeps Boxing Day on Monday", () => {
    const x = bankHolidays(2022, "england-and-wales").filter((h) => h.date >= "2022-12-01");
    expect(x).toEqual([
      { date: "2022-12-26", name: "Boxing Day" },
      { date: "2022-12-27", name: "Christmas Day (substitute day)" },
    ]);
  });
  it("one-offs", () => {
    expect(bankHolidays(2023, "england-and-wales").map((h) => h.date)).toContain("2023-05-08");
    expect(bankHolidays(2022, "scotland").map((h) => h.date)).toContain("2022-09-19");
  });
  it("Scotland 2023 New Year", () => {
    expect(bankHolidays(2023, "scotland").slice(0, 2).map((h) => h.date)).toEqual(["2023-01-02", "2023-01-03"]);
  });
});

describe("working days and differences", () => {
  it("counts working days", () => {
    const r = countDays("2026-12-21", "2027-01-01", "england-and-wales");
    expect(r.total).toBe(12);
    expect(r.weekends).toBe(2);
    expect(r.holidays.map((h) => h.date)).toEqual(["2026-12-25", "2026-12-28", "2027-01-01"]);
    expect(r.working).toBe(7);
  });
  it("adds working days", () => {
    expect(addWorkingDays("2026-12-24", 1, "england-and-wales")).toBe("2026-12-29");
    expect(addWorkingDays("2026-12-29", -1, "england-and-wales")).toBe("2026-12-24");
  });
  it("date difference", () => {
    const d = dateDiff("2026-01-31", "2026-03-15");
    expect(d.days).toBe(43);
    expect(d.months).toBe(1);
    expect(d.monthDays).toBe(15);
    expect(dateDiff("2026-01-01", "2026-12-31", true).days).toBe(365);
    expect(dateDiff("1990-06-15", "2026-10-04").years).toBe(36);
  });
  it("leave plans", () => {
    const p = leavePlans(2027, "england-and-wales", 4);
    const easter = p.find((x) => x.holidays.includes("Good Friday"));
    expect(easter).toBeDefined();
    expect(easter!.leaveDays).toBeLessThanOrEqual(4);
    expect(easter!.daysOff / easter!.leaveDays).toBeGreaterThanOrEqual(2.5);
  });
});

describe("formatDate", () => {
  it("formats without Intl", () => {
    expect(formatDate("2027-09-04")).toBe("Saturday 4 September 2027");
    expect(formatDate("2027-09-04", "short")).toBe("Sat 4 Sep");
    expect(formatDate("2027-09-04", "medium")).toBe("4 September 2027");
  });
});
