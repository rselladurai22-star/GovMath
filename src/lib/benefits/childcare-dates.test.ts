import { describe, expect, it } from "vitest";
import { addMonths, childcareTimeline, fundedHoursOn, fundedSteps, septemberAfter, termAfter } from "./childcare-dates";

describe("term starts (GOV.UK tables)", () => {
  it("starts the term after the age is reached", () => {
    expect(termAfter("2026-09-01")).toBe("2027-01-01");
    expect(termAfter("2026-12-31")).toBe("2027-01-01");
    expect(termAfter("2027-01-01")).toBe("2027-04-01");
    expect(termAfter("2027-03-31")).toBe("2027-04-01");
    expect(termAfter("2027-04-01")).toBe("2027-09-01");
    expect(termAfter("2027-08-31")).toBe("2027-09-01");
  });

  it("adds months without overflowing short months", () => {
    expect(addMonths("2026-05-31", 9)).toBe("2027-02-28");
    expect(addMonths("2027-05-31", 9)).toBe("2028-02-29");
    expect(addMonths("2024-02-29", 12)).toBe("2025-02-28");
  });

  it("puts a birthday just either side of a cut-off in different terms", () => {
    // 9 months on 31 August: hours from 1 September. On 1 September: from 1 January.
    expect(childcareTimeline("2026-11-30").working.starts).toBe("2027-09-01");
    expect(childcareTimeline("2026-12-01").working.starts).toBe("2028-01-01");
    expect(childcareTimeline("2026-11-30").working.applyBy).toBe("2027-08-31");
  });

  it("lets working parents apply from 23 weeks old", () => {
    expect(childcareTimeline("2026-06-01").working.applyFrom).toBe("2026-11-09");
  });

  it("starts school the September after the fourth birthday", () => {
    expect(septemberAfter("2026-08-31")).toBe("2026-09-01");
    expect(septemberAfter("2026-09-01")).toBe("2027-09-01");
    expect(childcareTimeline("2022-08-31").school).toBe("2026-09-01");
    expect(childcareTimeline("2022-09-01").school).toBe("2027-09-01");
  });

  it("sets the three start dates for one child", () => {
    const t = childcareTimeline("2025-10-15");
    expect(t.working.starts).toBe("2026-09-01"); // 9 months on 15 July 2026
    expect(t.twos.starts).toBe("2028-01-01"); // 2 on 15 October 2027
    expect(t.twos.applyFrom).toBe("2027-09-01");
    expect(t.universal.starts).toBe("2029-01-01"); // 3 on 15 October 2028
    expect(t.school).toBe("2030-09-01");
  });
});

describe("funded hours by date", () => {
  const t = childcareTimeline("2025-10-15");
  it("gives working parents 30 hours from the 9-month term until school", () => {
    const w = { working: true, twosEligible: false };
    expect(fundedHoursOn(t, "2026-08-31", w)).toBe(0);
    expect(fundedHoursOn(t, "2026-09-01", w)).toBe(30);
    expect(fundedHoursOn(t, "2030-08-31", w)).toBe(30);
    expect(fundedHoursOn(t, "2030-09-01", w)).toBe(0);
  });
  it("gives everyone else 15 hours from the term after the third birthday", () => {
    const n = { working: false, twosEligible: false };
    expect(fundedHoursOn(t, "2028-12-31", n)).toBe(0);
    expect(fundedHoursOn(t, "2029-01-01", n)).toBe(15);
  });
  it("gives 15 hours to eligible 2-year-olds", () => {
    const b = { working: false, twosEligible: true };
    expect(fundedHoursOn(t, "2028-01-01", b)).toBe(15);
    expect(fundedSteps(t, b).map((s) => [s.from, s.hours])).toEqual([
      ["2025-10-15", 0],
      ["2028-01-01", 15],
      ["2029-01-01", 15], // the universal offer takes over at 3
      ["2030-09-01", 0],
    ]);
  });
});
