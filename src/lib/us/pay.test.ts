import { describe, expect, it } from "vitest";
import { addSalesTax, fromHourly, fromSalary, overtimeSaving, overtimeWeek, paycheck, removeSalesTax, tip, type PaycheckInput } from "./pay";
import { stateIncomeTax, STATES } from "./states";

const base: PaycheckInput = {
  salary: 75_000,
  frequency: "biweekly",
  status: "single",
  k401Pct: 0,
  rothPct: 0,
  section125: 0,
  children: 0,
  otherDependents: 0,
  state: "TX",
  localRate: 0,
  extraWithholding: 0,
};

describe("US paycheck", () => {
  it("takes federal tax and FICA from a Texas salary", () => {
    const p = paycheck(base);
    // Taxable 58,900 → $7,670 federal; FICA 7.65% of $75,000 = $5,737.50.
    expect(p.federal.year).toBeCloseTo(7_670, 6);
    expect(p.socialSecurity.year + p.medicare.year).toBeCloseTo(5_737.5, 6);
    expect(p.state.year).toBe(0);
    expect(p.net.year).toBeCloseTo(75_000 - 7_670 - 5_737.5, 6);
    expect(p.net.period).toBeCloseTo(p.net.year / 26, 6);
  });

  it("lets a 401(k) cut income tax but not FICA, and a cafeteria plan cut both", () => {
    const k = paycheck({ ...base, k401Pct: 0.1 });
    expect(k.k401.year).toBe(7_500);
    expect(k.federalWages).toBe(67_500);
    expect(k.socialSecurity.year).toBeCloseTo(75_000 * 0.062, 6);
    const c = paycheck({ ...base, section125: 3_000 });
    expect(c.socialSecurity.year).toBeCloseTo(72_000 * 0.062, 6);
    expect(c.federalWages).toBe(72_000);
  });

  it("caps 401(k) deferrals at $24,500 and applies flat state rates", () => {
    const k = paycheck({ ...base, salary: 300_000, k401Pct: 0.15 });
    expect(k.k401.year).toBe(24_500);
    expect(k.k401Capped).toBe(true);
    // Illinois: 4.95% after the $2,925 exemption.
    expect(paycheck({ ...base, state: "IL" }).state.year).toBeCloseTo((75_000 - 2_925) * 0.0495, 6);
    expect(stateIncomeTax("FL", 50_000)).toBe(0);
    // California adds 1.3% SDI on wages to the state line.
    const ca = paycheck({ ...base, state: "CA" });
    expect(ca.state.year).toBeCloseTo(stateIncomeTax("CA", 75_000) + 75_000 * 0.013, 6);
  });

  it("gives the child tax credit through withholding", () => {
    const p = paycheck({ ...base, status: "mfj", children: 2, salary: 100_000 });
    // Taxable 67,800: 2,480 + 12% of 43,000 = 7,640; less $4,400.
    expect(p.federal.year).toBeCloseTo(3_240, 6);
  });

  it("has every state and DC once", () => {
    expect(STATES).toHaveLength(51);
    expect(new Set(STATES.map((s) => s.code)).size).toBe(51);
  });
});

describe("US pay conversions", () => {
  it("converts hourly to salary and back", () => {
    const r = fromHourly(25, 40);
    expect(r.annual).toBe(52_000);
    expect(r.biweekly).toBe(2_000);
    expect(r.monthly).toBeCloseTo(4_333.33, 2);
    expect(fromSalary(52_000, 40).hourly).toBe(25);
    expect(fromSalary(50_000, 40, 50).hourly).toBe(25);
  });

  it("pays time and a half and works out the overtime deduction", () => {
    const w = overtimeWeek(20, 40, 10);
    expect(w.regularPay).toBe(800);
    expect(w.overtimePay).toBe(300);
    expect(w.premium).toBe(100);
    // $100 a week for 50 weeks is $5,000 of premium; at the 12% rate it saves $600.
    const y = overtimeSaving(5_000, 45_000, "single");
    expect(y.deduction).toBe(5_000);
    expect(y.taxSaved).toBeCloseTo(600, 6);
  });
});

describe("Sales tax and tips", () => {
  it("adds and removes sales tax", () => {
    expect(addSalesTax(100, 0.0725).gross).toBeCloseTo(107.25, 6);
    expect(removeSalesTax(107.25, 0.0725).net).toBeCloseTo(100, 6);
  });

  it("works out and splits a tip", () => {
    const t = tip(80, 6.4, 0.2, 2);
    expect(t.tip).toBeCloseTo(16, 6);
    expect(t.total).toBeCloseTo(102.4, 6);
    expect(t.perPerson).toBeCloseTo(51.2, 6);
    const r = tip(80, 6.4, 0.2, 2, false, true);
    expect(r.roundedPerPerson).toBe(52);
    expect(r.effectiveTip).toBeCloseTo(17.6, 6);
    expect(tip(80, 6.4, 0.2, 1, true).tip).toBeCloseTo(17.28, 6);
  });
});
