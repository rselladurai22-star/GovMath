import { describe, expect, it } from "vitest";
import {
  APPLIANCES,
  CAP_JUL_SEP_2026,
  CAP_OCT_DEC_2026,
  TDCV_2026,
  applianceById,
  energyBill,
  gasHeatCost,
  runningCost,
  usageFromSpend,
} from "./costs";

describe("price cap figures", () => {
  it("reproduce Ofgem's typical Direct Debit bills at medium use", () => {
    const now = energyBill({ elecKwh: TDCV_2026.elec.medium, gasKwh: TDCV_2026.gas.medium, hasGas: true, cap: CAP_OCT_DEC_2026 });
    const before = energyBill({ elecKwh: TDCV_2026.elec.medium, gasKwh: TDCV_2026.gas.medium, hasGas: true, cap: CAP_JUL_SEP_2026 });
    expect(Math.abs(now.year - CAP_OCT_DEC_2026.typical.dd)).toBeLessThan(2);
    expect(Math.abs(before.year - CAP_JUL_SEP_2026.typical.dd)).toBeLessThan(2);
  });

  it("charges no VAT on electricity from October 2026 but 5% on gas", () => {
    const b = energyBill({ elecKwh: 2500, gasKwh: 9500, hasGas: true, cap: CAP_OCT_DEC_2026 });
    expect(b.elec.vat).toBe(0);
    expect(b.gas.vat).toBeCloseTo(b.gas.total * (0.05 / 1.05), 6);
  });

  it("drops gas for an electricity-only home and keeps standing charges", () => {
    const b = energyBill({ elecKwh: 0, gasKwh: 9500, hasGas: false, cap: CAP_OCT_DEC_2026 });
    expect(b.gas.total).toBe(0);
    expect(b.year).toBeCloseTo((54.83 * 365) / 100, 6);
  });

  it("scales standard credit and prepayment from the typical bills", () => {
    const sc = energyBill({ elecKwh: 2500, gasKwh: 9500, hasGas: true, cap: CAP_OCT_DEC_2026, payment: "sc" });
    expect(Math.abs(sc.year - 1861)).toBeLessThan(3);
    const ppm = energyBill({ elecKwh: 2500, gasKwh: 9500, hasGas: true, cap: CAP_OCT_DEC_2026, payment: "ppm" });
    expect(ppm.year).toBeLessThan(sc.year);
  });

  it("uses own rates when given", () => {
    const b = energyBill({ elecKwh: 1000, gasKwh: 0, hasGas: false, cap: CAP_OCT_DEC_2026, own: { elecUnit: 20, elecStanding: 50 } });
    expect(b.year).toBeCloseTo(200 + 182.5, 6);
  });

  it("works back from a monthly payment", () => {
    const bill = energyBill({ elecKwh: 2500, gasKwh: 9500, hasGas: true, cap: CAP_OCT_DEC_2026 });
    const u = usageFromSpend(bill.month, CAP_OCT_DEC_2026, true);
    expect(u.scale).toBeCloseTo(1, 6);
    expect(usageFromSpend(0, CAP_OCT_DEC_2026, true).scale).toBe(0);
  });
});

describe("appliance running costs", () => {
  it("prices a kettle", () => {
    const r = runningCost({ watts: 3000, minutes: 3, freq: 4, per: "day", cycling: 100, rate: 26.32 });
    expect(r.kwhPerUse).toBeCloseTo(0.15, 6);
    expect(r.perUse).toBeCloseTo(0.03948, 6);
    expect(r.perYear).toBeCloseTo(0.03948 * 4 * 365, 6);
    expect(r.perHour).toBeCloseTo(0.7896, 6);
  });

  it("handles weekly use and cycling", () => {
    const r = runningCost({ watts: 1500, minutes: 240, freq: 7, per: "week", cycling: 60, rate: 26.32 });
    expect(r.usesPerDay).toBe(1);
    expect(r.kwhPerDay).toBeCloseTo(3.6, 6);
  });

  it("never returns NaN for empty or silly inputs", () => {
    const r = runningCost({ watts: NaN, minutes: -5, freq: 0, per: "day", cycling: 200, rate: 0 });
    for (const v of Object.values(r)) expect(Number.isFinite(v)).toBe(true);
  });

  it("compares heat from gas", () => {
    expect(gasHeatCost(9, 7.97, 0.9)).toBeCloseTo(0.797, 6);
    expect(Number.isFinite(gasHeatCost(5, 7.97, 0))).toBe(true);
  });

  it("has a unique id for each appliance and falls back to custom", () => {
    expect(new Set(APPLIANCES.map((a) => a.id)).size).toBe(APPLIANCES.length);
    expect(applianceById("nope").id).toBe("custom");
  });
});
