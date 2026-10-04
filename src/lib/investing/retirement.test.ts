import { describe, expect, it } from "vitest";
import { deferral, newStatePension, statePensionAge2026, workplacePension } from "./retirement";

describe("State Pension age", () => {
  it("66 to 67 transition uses the 6th-to-5th periods", () => {
    expect(statePensionAge2026("1960-04-06").date).toBe("2026-05-06");
    expect(statePensionAge2026("1960-05-03").ageText).toBe("66 years and 1 month");
    expect(statePensionAge2026("1960-05-06").ageText).toBe("66 years and 2 months");
    expect(statePensionAge2026("1961-03-05").ageText).toBe("66 years and 11 months");
  });
  it("67 and 68", () => {
    expect(statePensionAge2026("1970-07-15").date).toBe("2037-07-15");
    expect(statePensionAge2026("1977-04-20").date).toBe("2044-05-06");
    expect(statePensionAge2026("1978-03-10").date).toBe("2046-03-06");
    expect(statePensionAge2026("1990-01-01").date).toBe("2058-01-01");
  });
  it("already reached", () => {
    expect(statePensionAge2026("1955-01-01").already).toBe(true);
  });
});

describe("State Pension amounts", () => {
  it("pro rata on qualifying years", () => {
    expect(newStatePension(35).weekly).toBeCloseTo(241.3, 6);
    expect(newStatePension(20).weekly).toBeCloseTo((241.3 * 20) / 35, 6);
    expect(newStatePension(9).eligible).toBe(false);
  });
  it("deferral", () => {
    const d = deferral(241.3, 52);
    expect(d.extra).toBeCloseTo((241.3 * 52) / 900, 6);
    expect(deferral(241.3, 8).extra).toBe(0);
  });
});

describe("workplace pension", () => {
  it("minimum on qualifying earnings", () => {
    const r = workplacePension({ salary: 30_000, employeePct: 5, employerPct: 3, basis: "qualifying", age: 30, retireAge: 30, pot: 0, salaryGrowth: 0, realReturn: 0 });
    expect(r.pensionable).toBe(23_760);
    expect(r.total).toBeCloseTo(1_900.8, 6);
    expect(r.meetsMinimum).toBe(true);
  });
  it("projection", () => {
    const r = workplacePension({ salary: 30_000, employeePct: 5, employerPct: 3, basis: "qualifying", age: 30, retireAge: 31, pot: 0, salaryGrowth: 0, realReturn: 0 });
    expect(r.pot).toBeCloseTo(1_900.8, 6);
  });
});
