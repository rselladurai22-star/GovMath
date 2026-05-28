import { describe, expect, it } from "vitest";
import { daysBetween } from "./dates";

describe("daysBetween", () => {
  it("same day: 0 exclusive, 1 inclusive", () => {
    const d = new Date(Date.UTC(2025, 0, 1));
    const r = daysBetween(d, d);
    expect(r.exclusiveDays).toBe(0);
    expect(r.inclusiveDays).toBe(1);
  });

  it("a → next day: 1 exclusive, 2 inclusive", () => {
    const a = new Date(Date.UTC(2025, 0, 1));
    const b = new Date(Date.UTC(2025, 0, 2));
    const r = daysBetween(a, b);
    expect(r.exclusiveDays).toBe(1);
    expect(r.inclusiveDays).toBe(2);
  });

  it("order doesn't matter", () => {
    const a = new Date(Date.UTC(2025, 0, 1));
    const b = new Date(Date.UTC(2025, 11, 31));
    expect(daysBetween(a, b).exclusiveDays).toBe(daysBetween(b, a).exclusiveDays);
  });

  it("1 Jan 2025 → 31 Dec 2025: 364 days exclusive", () => {
    const a = new Date(Date.UTC(2025, 0, 1));
    const b = new Date(Date.UTC(2025, 11, 31));
    expect(daysBetween(a, b).exclusiveDays).toBe(364);
  });

  it("leap year: Feb 28 → Mar 1 2024 = 2 days, but 2025 = 1 day", () => {
    const a24 = new Date(Date.UTC(2024, 1, 28));
    const b24 = new Date(Date.UTC(2024, 2, 1));
    expect(daysBetween(a24, b24).exclusiveDays).toBe(2);

    const a25 = new Date(Date.UTC(2025, 1, 28));
    const b25 = new Date(Date.UTC(2025, 2, 1));
    expect(daysBetween(a25, b25).exclusiveDays).toBe(1);
  });

  it("working-day count excludes weekends", () => {
    // Mon 6 Jan 2025 → Fri 10 Jan 2025: 5 working days inclusive
    const mon = new Date(Date.UTC(2025, 0, 6));
    const fri = new Date(Date.UTC(2025, 0, 10));
    expect(daysBetween(mon, fri).workingDays).toBe(5);

    // Mon 6 Jan → Sun 12 Jan: still 5 working days
    const sun = new Date(Date.UTC(2025, 0, 12));
    expect(daysBetween(mon, sun).workingDays).toBe(5);
  });

  it("years/months/days breakdown is calendar-aware", () => {
    const a = new Date(Date.UTC(2020, 0, 15));
    const b = new Date(Date.UTC(2025, 3, 20));
    const r = daysBetween(a, b);
    expect(r.years).toBe(5);
    expect(r.months).toBe(3);
    expect(r.days).toBe(5);
  });
});
