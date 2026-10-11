import { describe, expect, it } from "vitest";
import { babyCosts, EXAMPLE_INPUT, itemsFor } from "./baby-costs";

describe("baby costs", () => {
  const r = babyCosts(EXAMPLE_INPUT);
  it("year one adds up", () => {
    const y = r.year1;
    expect(y.items).toBe(1190);
    expect(y.feeding).toBe(600);
    expect(y.nappies).toBe(420);
    expect(y.food).toBe(180);
    expect(y.childBenefit).toBeCloseTo(27.05 * 52, 6);
    expect(y.childcare).toBe(0);
    expect(y.net).toBeCloseTo(y.spend - y.help, 6);
  });
  it("childcare uses England's funded hours", () => {
    const y2 = r.years[1];
    // 30 hours x 48 weeks at £7.50 = £10,800; 30 funded hours x 38 weeks at £7.50 = £8,550.
    expect(y2.funded).toBeCloseTo(8550, 6);
    expect(y2.childcare).toBeCloseTo(2250, 6);
    expect(y2.tfc).toBeCloseTo(450, 6);
    const wales = babyCosts({ ...EXAMPLE_INPUT, nation: "wales" });
    expect(wales.years[1].funded).toBe(0);
    expect(wales.years[1].tfc).toBe(2000);
  });
  it("nappies stop at potty age and formula after a year", () => {
    expect(r.years[2].nappies).toBe(6 * 35);
    expect(r.years[3].nappies).toBe(0);
    expect(r.years[1].feeding).toBe(0);
  });
  it("help: grant, Healthy Start and the charge", () => {
    const low = babyCosts({ ...EXAMPLE_INPUT, benefit: true, healthyStart: true });
    expect(low.year1.grant).toBe(500);
    expect(low.year1.healthyStart).toBeCloseTo(52 * 9.3, 6);
    expect(low.years[4].healthyStart).toBe(0);
    const rich = babyCosts({ ...EXAMPLE_INPUT, higherIncome: 85_000 });
    expect(rich.year1.childBenefit).toBe(0);
    const second = babyCosts({ ...EXAMPLE_INPUT, otherChildren: 1 });
    expect(second.year1.childBenefit).toBeCloseTo(17.9 * 52, 6);
  });
  it("pay drop during leave", () => {
    // SMP: 6 x £540 + 33 x £194.32 = £9,652.56 against normal pay of 39 x £600 = £23,400.
    expect(r.leave.motherPay).toBeCloseTo(9652.56, 2);
    expect(r.leave.motherDrop).toBeCloseTo(23400 - 9652.56, 2);
    expect(r.leave.partnerDrop).toBeCloseTo(2 * (600 - 194.32), 2);
  });
  it("never returns NaN", () => {
    const z = babyCosts({ ...EXAMPLE_INPUT, items: itemsFor("budget"), motherWeekly: 0, partnerWeekly: 0, childcareHours: 0, formulaMonthly: NaN });
    expect(Number.isFinite(z.total.net)).toBe(true);
    expect(z.leave.drop).toBe(0);
  });
});
