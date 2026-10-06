import { describe, expect, it } from "vitest";
import { adoptionPay, childcareCosts, childMaintenance, maternityGrant, sharedCareShare } from "./families";

const base = { grossWeekly: 500, pensionWeekly: 0, children: 1, otherChildren: 0, nights: 0, onBenefits: false, collect: false };

describe("Child maintenance", () => {
  it("applies the basic rate", () => {
    expect(childMaintenance(base).weekly).toBe(60);
    expect(childMaintenance({ ...base, children: 2 }).weekly).toBe(80);
    expect(childMaintenance({ ...base, children: 3 }).weekly).toBe(95);
  });
  it("reduces income for other children", () => {
    expect(childMaintenance({ ...base, otherChildren: 1 }).weekly).toBeCloseTo(500 * 0.89 * 0.12, 2);
  });
  it("applies basic plus above £800", () => {
    expect(childMaintenance({ ...base, grossWeekly: 1000 }).weekly).toBeCloseTo(800 * 0.12 + 200 * 0.09, 2);
    expect(childMaintenance({ ...base, grossWeekly: 5000 }).income).toBe(3000);
  });
  it("applies the reduced, flat and nil rates", () => {
    expect(childMaintenance({ ...base, grossWeekly: 150 }).weekly).toBeCloseTo(7 + 50 * 0.17, 2);
    expect(childMaintenance({ ...base, grossWeekly: 150, children: 2, otherChildren: 1 }).weekly).toBeCloseTo(7 + 50 * 0.212, 2);
    expect(childMaintenance({ ...base, grossWeekly: 80 }).weekly).toBe(7);
    expect(childMaintenance({ ...base, grossWeekly: 5 }).weekly).toBe(0);
    expect(childMaintenance({ ...base, onBenefits: true }).weekly).toBe(7);
    expect(childMaintenance({ ...base, onBenefits: true, nights: 60 }).weekly).toBe(0);
  });
  it("takes off shared care", () => {
    expect(sharedCareShare(51)).toBe(0);
    expect(sharedCareShare(104)).toBeCloseTo(2 / 7, 6);
    expect(childMaintenance({ ...base, nights: 104 }).weekly).toBeCloseTo(60 * (5 / 7), 2);
    expect(childMaintenance({ ...base, nights: 182 }).weekly).toBe(23);
  });
  it("adds Collect and Pay fees", () => {
    const r = childMaintenance({ ...base, collect: true });
    expect(r.payingWeekly).toBeCloseTo(72, 2);
    expect(r.receivingWeekly).toBeCloseTo(57.6, 2);
  });
});

describe("Childcare costs", () => {
  it("takes off funded hours, then Tax-Free Childcare", () => {
    const r = childcareCosts({ children: [{ stage: "3-4", hours: 40 }], hourlyRate: 7, weeks: 48, working: true, lowIncome: false, over100k: false });
    expect(r.fullCost).toBeCloseTo(40 * 48 * 7, 2);
    expect(r.funded).toBeCloseTo(30 * 38 * 7, 2);
    expect(r.tfc).toBeCloseTo(Math.min(2000, r.afterFunded * 0.2), 2);
  });
  it("gives school-age children no funded hours", () => {
    const r = childcareCosts({ children: [{ stage: "school", hours: 10 }], hourlyRate: 6, weeks: 39, working: true, lowIncome: false, over100k: true });
    expect(r.funded).toBe(0);
    expect(r.tfc).toBe(0);
  });
});

describe("Adoption pay", () => {
  it("pays 6 weeks at 90% then the flat rate", () => {
    const r = adoptionPay({ awe: 600, service: true, fullPayWeeks: 0, halfPayWeeks: 0, leaveWeeks: 52 });
    expect(r.statutoryTotal).toBeCloseTo(6 * 540 + 33 * 194.32, 2);
    expect(adoptionPay({ awe: 600, service: false, fullPayWeeks: 0, halfPayWeeks: 0, leaveWeeks: 52 }).total).toBe(0);
  });
});

describe("Maternity grant", () => {
  it("pays £500 per baby for a first child", () => {
    expect(maternityGrant({ scotland: false, benefit: true, babies: 2, otherChildren: 0, youngParent: false }).amount).toBe(1000);
    expect(maternityGrant({ scotland: false, benefit: true, babies: 1, otherChildren: 1, youngParent: false }).eligible).toBe(false);
    expect(maternityGrant({ scotland: false, benefit: true, babies: 2, otherChildren: 1, youngParent: false }).amount).toBe(500);
  });
  it("pays the Best Start Grant in Scotland", () => {
    expect(maternityGrant({ scotland: true, benefit: true, babies: 1, otherChildren: 0, youngParent: false }).amount).toBe(796.65);
    expect(maternityGrant({ scotland: true, benefit: true, babies: 1, otherChildren: 2, youngParent: false }).amount).toBe(398.35);
    expect(maternityGrant({ scotland: true, benefit: false, babies: 1, otherChildren: 0, youngParent: true }).eligible).toBe(true);
  });
});
