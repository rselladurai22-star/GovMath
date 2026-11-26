import { describe, expect, it } from "vitest";
import { householdBill, householdDiscount, singlePersonDiscount } from "./discounts";

describe("SPD", () => {
  it("25% off £2000 bill", () => {
    const r = singlePersonDiscount(2000);
    expect(r.discount).toBe(500);
    expect(r.payable).toBe(1500);
    expect(r.monthlySaving).toBeCloseTo(41.67, 2);
  });
});

describe("who counts (GOV.UK: Who has to pay)", () => {
  it("one adult who counts gets 25%", () => {
    expect(householdDiscount(["counts"]).rate).toBe(0.25);
    expect(householdDiscount(["counts", "student", "carer"]).rate).toBe(0.25);
  });
  it("two adults who count get nothing off", () => {
    expect(householdDiscount(["counts", "counts"]).rate).toBe(0);
    expect(householdDiscount(["counts", "counts", "student"]).status).toBe("none");
  });
  it("everyone disregarded gets 50%", () => {
    expect(householdDiscount(["carer", "apprentice"]).rate).toBe(0.5);
    expect(householdDiscount(["student", "carer"]).status).toBe("all-disregarded");
  });
  it("a home of full-time students is exempt", () => {
    expect(householdDiscount(["student"])).toMatchObject({ rate: 1, exemption: "students" });
    expect(householdDiscount(["student", "student", "student"]).exemption).toBe("students");
  });
  it("severely mentally impaired alone, or with only SMI adults or students, pay nothing", () => {
    expect(householdDiscount(["smi"]).exemption).toBe("smi");
    expect(householdDiscount(["smi", "student"]).exemption).toBe("smi");
    expect(householdDiscount(["smi", "counts"]).rate).toBe(0.25);
    expect(householdDiscount(["smi", "carer"]).rate).toBe(0.5);
  });
  it("part of a year is pro-rated by day, and instalments split the rest", () => {
    const r = householdBill({ annualBill: 2_190, people: ["counts"], days: 73, instalments: 10 });
    expect(r.discount).toBeCloseTo(2_190 * 0.25 * 0.2, 6);
    expect(r.instalment).toBeCloseTo((2_190 - 109.5) / 10, 6);
    expect(householdBill({ annualBill: 2_000, people: ["counts"], instalments: 12 }).instalment).toBe(125);
    expect(householdBill({ annualBill: 2_000, people: ["student"] }).payable).toBe(0);
  });
});
