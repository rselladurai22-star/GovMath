import { describe, expect, it } from "vitest";
import { PC_DEFAULT_INPUT as D, pcTariffIncome, pensionCredit2026 } from "./later-life";

describe("Pension Credit 2026/27", () => {
  it("tops a single person up to £238", () => {
    const r = pensionCredit2026({ ...D, statePension: 200 });
    expect(r.guaranteeCredit).toBeCloseTo(38, 6);
    expect(r.savingsCredit).toBe(0);
  });
  it("adds severe disability and carer additions", () => {
    expect(pensionCredit2026({ ...D, severeDisability: 1 }).minimumGuarantee).toBeCloseTo(324.05, 6);
    expect(pensionCredit2026({ ...D, couple: true, severeDisability: 2, carers: 1 }).minimumGuarantee).toBeCloseTo(363.25 + 172.1 + 48.15, 6);
  });
  it("tariff income is £1 per £500 or part over £10,000", () => {
    expect(pcTariffIncome(10_000)).toBe(0);
    expect(pcTariffIncome(10_001)).toBe(1);
    expect(pcTariffIncome(12_000)).toBe(4);
  });
  it("ignores £5 of a single person's earnings", () => {
    const r = pensionCredit2026({ ...D, statePension: 200, earnings: 20 });
    expect(r.income).toBeCloseTo(215, 6);
  });
  it("savings credit reaches its maximum at the minimum guarantee", () => {
    const r = pensionCredit2026({ ...D, statePension: 238, savingsCreditEligible: true });
    expect(r.savingsCredit).toBeCloseTo(17.96, 2);
    expect(r.guaranteeCredit).toBe(0);
  });
  it("savings credit tapers away above the guarantee", () => {
    const r = pensionCredit2026({ ...D, statePension: 250, savingsCreditEligible: true });
    expect(r.savingsCredit).toBeCloseTo(17.96 - 0.4 * 12, 6);
    // Gone at 238 + 17.96 / 0.4
    expect(pensionCredit2026({ ...D, statePension: 283, savingsCreditEligible: true }).savingsCredit).toBe(0);
  });
  it("matches GOV.UK's savings example: £11,000 counts as £2 a week", () => {
    expect(pcTariffIncome(11_000)).toBe(2);
    expect(pensionCredit2026({ ...D, statePension: 200, savings: 11_000 }).guaranteeCredit).toBeCloseTo(36, 6);
  });
  it("pays no Savings Credit to someone who reached State Pension age after 5 April 2016", () => {
    const r = pensionCredit2026({ ...D, statePension: 245, otherPensions: 0, savingsCreditEligible: false });
    expect(r.weekly).toBe(0);
    expect(pensionCredit2026({ ...D, statePension: 245, savingsCreditEligible: true }).savingsCredit).toBeGreaterThan(0);
  });
  it("lets a severe disability addition lift income just above the standard guarantee back into Guarantee Credit", () => {
    expect(pensionCredit2026({ ...D, statePension: 241.3 }).guaranteeCredit).toBe(0);
    expect(pensionCredit2026({ ...D, statePension: 241.3, severeDisability: 1 }).guaranteeCredit).toBeCloseTo(238 + 86.05 - 241.3, 6);
  });
  it("uses the couple rate and DWP's proposed April 2027 figures", () => {
    expect(pensionCredit2026({ ...D, couple: true }).minimumGuarantee).toBe(363.25);
    expect(pensionCredit2026({ ...D, year: "2027/28" }).minimumGuarantee).toBe(247.3);
  });
});
