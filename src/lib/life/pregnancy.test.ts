import { describe, expect, it } from "vitest";
import { cycleDay, cycleFrom, cyclesAhead, datePregnancy, milestones, phaseOn, progressOn, trimesterFor, weeksAndDays } from "./pregnancy";

describe("due dates", () => {
  it("Naegele's rule: 280 days from the last period", () => {
    expect(datePregnancy({ method: "lmp", date: "2026-01-01" }).due).toBe("2026-10-08");
    expect(datePregnancy({ method: "lmp", date: "2026-01-01" }).conception).toBe("2026-01-15");
  });
  it("cycle length moves the due date", () => {
    expect(datePregnancy({ method: "lmp", date: "2026-01-01", cycle: 32 }).due).toBe("2026-10-12");
    expect(datePregnancy({ method: "lmp", date: "2026-01-01", cycle: 25 }).due).toBe("2026-10-05");
  });
  it("conception and IVF", () => {
    expect(datePregnancy({ method: "conception", date: "2026-01-15" }).due).toBe("2026-10-08");
    expect(datePregnancy({ method: "ivf5", date: "2026-01-20" }).due).toBe("2026-10-08");
    expect(datePregnancy({ method: "ivf3", date: "2026-01-18" }).due).toBe("2026-10-08");
  });
  it("dating scan", () => {
    // 12 weeks 3 days on 29 March 2026 → start 1 January 2026.
    const d = datePregnancy({ method: "scan", date: "2026-03-29", scanWeeks: 12, scanDays: 3 });
    expect(d.start).toBe("2026-01-01");
    expect(d.due).toBe("2026-10-08");
  });
});

describe("progress", () => {
  it("weeks, days and trimester", () => {
    const p = progressOn("2026-01-01", "2026-03-29");
    expect([p.weeks, p.days, p.trimester, p.status]).toEqual([12, 3, 1, "pregnant"]);
    expect(progressOn("2026-01-01", "2026-09-20").status).toBe("term");
    expect(progressOn("2026-01-01", "2026-10-10").status).toBe("overdue");
    expect(progressOn("2026-01-01", "2026-10-22").status).toBe("past42");
    expect(progressOn("2026-01-01", "2025-12-20").status).toBe("before");
    expect(trimesterFor(12)).toBe(1);
    expect(trimesterFor(13)).toBe(2);
    expect(trimesterFor(28)).toBe(3);
    expect(weeksAndDays(87)).toBe("12 weeks 3 days");
    expect(weeksAndDays(7)).toBe("1 week");
  });
  it("milestones", () => {
    const m = milestones("2026-01-01");
    expect(m.find((x) => x.key === "due")?.date).toBe("2026-10-08");
    expect(m.find((x) => x.key === "term")?.date).toBe("2026-09-17");
    expect(m.find((x) => x.key === "anomaly-end")?.date).toBe("2026-05-27");
    expect(milestones("2026-01-01", false).some((x) => x.uk)).toBe(false);
  });
});

describe("ovulation", () => {
  it("28-day cycle", () => {
    const c = cycleFrom("2026-10-01", { lastPeriod: "2026-10-01", cycle: 28 });
    expect(c.ovulation).toBe("2026-10-15");
    expect(c.fertileStart).toBe("2026-10-10");
    expect(c.nextPeriod).toBe("2026-10-29");
    expect(c.periodEnd).toBe("2026-10-05");
    expect(c.dueIfConceived).toBe("2027-07-08");
    expect(phaseOn(c, "2026-10-12")).toBe("fertile");
    expect(phaseOn(c, "2026-10-15")).toBe("ovulation");
    expect(cycleDay(c, "2026-10-15")).toBe(15);
  });
  it("luteal phase and irregular cycles", () => {
    const c = cycleFrom("2026-10-01", { lastPeriod: "2026-10-01", cycle: 32, luteal: 12, shortest: 26, longest: 35 });
    expect(c.ovulation).toBe("2026-10-21");
    expect(c.wideStart).toBe("2026-10-10");
    expect(c.wideEnd).toBe("2026-10-24");
  });
  it("rolls forward to the current cycle", () => {
    const list = cyclesAhead({ lastPeriod: "2026-08-01", cycle: 28 }, "2026-10-11", 4);
    expect(list).toHaveLength(4);
    expect(list[0].periodStart).toBe("2026-09-26");
    expect(list[1].periodStart).toBe("2026-10-24");
  });
});
