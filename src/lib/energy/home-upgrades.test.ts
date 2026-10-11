import { describe, expect, it } from "vitest";
import { BOILER_EFFICIENCY, CAP_OCT_DEC_2026 as CAP, TDCV_2026 } from "./costs";
import {
  BUS_GRANT,
  ELEC_CO2_KG,
  HOUSE_GAS,
  HP_MEDIAN_COST,
  ORIENTATION,
  SEG_AVERAGE_PENCE,
  SOLAR_REGIONS,
  heatDemand,
  heatPumpVsBoiler,
  solarKwp,
  solarRegion,
  solarStudy,
  solarTypicalCost,
} from "./home-upgrades";

const base = {
  kwp: 4,
  yieldPerKwp: 1000,
  orientation: "s" as const,
  shading: "none" as const,
  useKwh: 2500,
  selfUsePct: 40,
  unitRate: 20,
  segRate: 10,
  cost: 6000,
  degradation: 0,
  priceRise: 0,
};

describe("solar panels", () => {
  it("splits output into used and exported energy", () => {
    const r = solarStudy(base);
    expect(r.generation).toBe(4000);
    expect(r.selfUsed).toBe(1600);
    expect(r.exported).toBe(2400);
    expect(r.billSaving).toBeCloseTo(320, 6);
    expect(r.exportIncome).toBeCloseTo(240, 6);
    expect(r.payback).toBeCloseTo(6000 / 560, 6);
    expect(r.totalBenefit).toBeCloseTo(560 * 25, 6);
    expect(r.co2).toBeCloseTo(4000 * ELEC_CO2_KG, 6);
  });

  it("never counts more home use than the household uses", () => {
    const r = solarStudy({ ...base, useKwh: 1000, selfUsePct: 80 });
    expect(r.selfUsed).toBe(1000);
    expect(r.coverage).toBe(1);
  });

  it("applies orientation, shading and degradation", () => {
    const r = solarStudy({ ...base, orientation: "e-w", shading: "some", degradation: 0.5 });
    expect(r.generation).toBeCloseTo(4000 * ORIENTATION["e-w"].factor * 0.9, 6);
    expect(r.years[1].generation).toBeCloseTo(r.generation * 0.995, 6);
  });

  it("returns no payback when it never pays", () => {
    expect(solarStudy({ ...base, cost: 1e7 }).payback).toBeNull();
    expect(solarStudy({ ...base, kwp: 0 }).payback).toBeNull();
    expect(solarStudy({ ...base, cost: 0 }).payback).toBe(0);
  });

  it("guards empty inputs", () => {
    const r = solarStudy({ ...base, kwp: NaN, useKwh: NaN, unitRate: NaN });
    expect(r.generation).toBe(0);
    expect(Number.isFinite(r.netReturn)).toBe(true);
  });

  it("sizes from panels and prices from the DESNZ medians", () => {
    expect(solarKwp({ by: "panels", kwp: 0, panels: 10, panelWatts: 430 })).toBeCloseTo(4.3, 6);
    expect(solarKwp({ by: "kwp", kwp: 3.5, panels: 10, panelWatts: 430 })).toBe(3.5);
    expect(solarTypicalCost(4)).toBeCloseTo(4 * 1595.06, 6);
    expect(solarTypicalCost(5)).toBeCloseTo(5 * 1545.89, 6);
  });

  it("has sensible regional yields and the Ofgem SEG average", () => {
    for (const r of SOLAR_REGIONS) {
      expect(r.yield).toBeGreaterThan(750);
      expect(r.yield).toBeLessThan(1200);
    }
    expect(solarRegion("nowhere").id).toBe("london");
    expect(SEG_AVERAGE_PENCE).toBe(12.9);
  });
});

describe("heat pump vs gas boiler", () => {
  const hp = {
    heatKwh: heatDemand(TDCV_2026.gas.medium, BOILER_EFFICIENCY),
    boilerEff: BOILER_EFFICIENCY,
    scop: 2.8,
    gasUnit: CAP.gasUnit,
    gasStanding: CAP.gasStanding,
    elecUnit: CAP.elecUnit,
    keepGas: false,
    boilerCost: 3000,
    hpCost: HP_MEDIAN_COST,
    grant: BUS_GRANT,
  };

  it("costs the boiler with gas and standing charge, the heat pump with electricity", () => {
    const r = heatPumpVsBoiler(hp);
    expect(r.gasKwh).toBeCloseTo(9500, 6);
    expect(r.boiler.total).toBeCloseTo(9500 * 0.0797 + 29.68 * 3.65, 6);
    expect(r.heatPump.total).toBeCloseTo((8550 / 2.8) * 0.2632, 6);
    expect(r.extraUpfront).toBeCloseTo(12908 - 7500 - 3000, 6);
    expect(r.years).toHaveLength(15);
  });

  it("keeps the gas standing charge if you keep gas", () => {
    const r = heatPumpVsBoiler({ ...hp, keepGas: true });
    expect(r.heatPump.standing).toBeCloseTo(29.68 * 3.65, 6);
  });

  it("finds the break-even SCOP", () => {
    const r = heatPumpVsBoiler(hp);
    const at = heatPumpVsBoiler({ ...hp, scop: r.breakEvenScop ?? 1 });
    expect(at.saving).toBeCloseTo(0, 6);
  });

  it("pays back at once when the heat pump costs less upfront", () => {
    expect(heatPumpVsBoiler({ ...hp, hpCost: 9000 }).payback).toBe(0);
    expect(heatPumpVsBoiler({ ...hp, scop: 1.5 }).payback).toBeNull();
  });

  it("house sizes follow Ofgem's typical gas use", () => {
    expect(HOUSE_GAS.medium.kwh).toBe(9500);
    expect(heatDemand(NaN)).toBe(0);
    const r = heatPumpVsBoiler({ ...hp, heatKwh: 0, scop: NaN });
    expect(Number.isFinite(r.saving)).toBe(true);
  });
});
