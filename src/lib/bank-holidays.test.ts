import { describe, it, expect } from "vitest";
import { workingDaysBetween } from "./bank-holidays";

describe("workingDaysBetween", () => {
  it("counts working days excluding weekends and bank holidays", () => {
    // April 2025: Good Friday 18th, Easter Monday 21st
    const r = workingDaysBetween({ start: "2025-04-14", end: "2025-04-25", nation: "england-and-wales" });
    expect(r.totalDays).toBe(12);
    expect(r.bankHolidaysInRange).toEqual(["2025-04-18", "2025-04-21"]);
    // 12 total - 2 weekend (19th Sat, 20th Sun) - 2 holidays = 8
    expect(r.workingDays).toBe(8);
  });

  it("includes Scotland-specific 2 Jan", () => {
    const r = workingDaysBetween({ start: "2025-01-01", end: "2025-01-03", nation: "scotland" });
    expect(r.bankHolidaysInRange).toContain("2025-01-02");
  });

  it("returns zeros when end is before start", () => {
    const r = workingDaysBetween({ start: "2025-06-01", end: "2025-05-01", nation: "england-and-wales" });
    expect(r.totalDays).toBe(0);
  });

  it("handles a single working day", () => {
    const r = workingDaysBetween({ start: "2025-06-04", end: "2025-06-04", nation: "england-and-wales" });
    expect(r.workingDays).toBe(1);
  });
});
