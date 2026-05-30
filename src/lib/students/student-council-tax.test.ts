import { describe, it, expect } from "vitest";
import { studentCouncilTax } from "./student-council-tax";

describe("studentCouncilTax", () => {
  it("100% exempt when all full-time students", () => {
    const r = studentCouncilTax({ fullTimeStudents: 4, nonStudents: 0 });
    expect(r.exempt).toBe(true);
    expect(r.discountPct).toBe(100);
  });
  it("25% discount with 1 non-student", () => {
    const r = studentCouncilTax({ fullTimeStudents: 3, nonStudents: 1 });
    expect(r.discountPct).toBe(25);
  });
  it("no discount with 2+ non-students", () => {
    const r = studentCouncilTax({ fullTimeStudents: 2, nonStudents: 2 });
    expect(r.discountPct).toBe(0);
  });
});
