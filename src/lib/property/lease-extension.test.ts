import { describe, expect, it } from "vitest";
import { defaultRelativity, deferFactor, leaseExtension, premiumCurve, yearsPurchase, type LeaseInput } from "./lease-extension";

const BASE: LeaseInput = {
  value: 250_000,
  basis: "long",
  years: 75,
  groundRent: 250,
  deferment: 0.05,
  capitalisation: 0.065,
  ownLegal: 1_500,
  ownValuer: 800,
  landlordCosts: 1_500,
};

describe("valuation helpers", () => {
  it("years purchase and deferment match the textbook formulas", () => {
    expect(yearsPurchase(10, 0.05)).toBeCloseTo(7.7217, 4);
    expect(deferFactor(10, 0.05)).toBeCloseTo(0.6139, 4);
    expect(yearsPurchase(0, 0.05)).toBe(0);
  });

  it("default relativity follows the Savills 2016 table", () => {
    expect(defaultRelativity(80)).toBeCloseTo(0.894, 3);
    expect(defaultRelativity(60)).toBeCloseTo(0.783, 3);
    expect(defaultRelativity(60.5)).toBeCloseTo(0.7865, 4);
    expect(defaultRelativity(11)).toBeCloseTo(0.261, 3);
    expect(defaultRelativity(5)).toBeLessThan(0.261);
    expect(defaultRelativity(150)).toBeLessThanOrEqual(0.99);
    expect(defaultRelativity(0)).toBe(0);
  });
});

describe("1993 Act premium", () => {
  it("adds half the marriage value below 80 years", () => {
    const r = leaseExtension(BASE).current;
    expect(r.freeholdValue).toBeCloseTo(250_000 / 0.99, 2);
    expect(r.term).toBeCloseTo(250 * yearsPurchase(75, 0.065), 6);
    expect(r.reversion).toBeCloseTo(r.freeholdValue * Math.pow(1.05, -75), 6);
    expect(r.marriageValue).toBeGreaterThan(0);
    expect(r.premium).toBeCloseTo(r.diminution + r.marriageValue / 2, 6);
    expect(r.costs).toBe(3_800);
    expect(r.total).toBeCloseTo(r.premium + 3_800, 6);
  });

  it("ignores marriage value above 80 years, so there is a cliff", () => {
    const over = leaseExtension({ ...BASE, years: 81 });
    const at = leaseExtension({ ...BASE, years: 80 });
    expect(over.current.marriageValue).toBe(0);
    expect(at.current.marriageValue).toBeGreaterThan(0);
    expect(at.current.premium - over.current.premium).toBeGreaterThan(5_000);
    expect(over.yearsTo80).toBe(1);
  });

  it("converts a current-lease value with the relativity", () => {
    const r = leaseExtension({ ...BASE, basis: "current", value: 200_000, relativity: 0.8 });
    expect(r.current.freeholdValue).toBeCloseTo(250_000, 6);
    expect(r.current.existingValue).toBeCloseTo(200_000, 6);
  });
});

describe("2024 Act method", () => {
  it("has no marriage value, caps the rent and drops the landlord's costs", () => {
    const r = leaseExtension({ ...BASE, groundRent: 1_000 }).act2024;
    expect(r.marriageValue).toBe(0);
    expect(r.cappedRent).toBeCloseTo(0.001 * (250_000 / 0.99), 6);
    expect(r.costs).toBe(2_300);
  });

  it("is cheaper than the current rules for a short lease", () => {
    const r = leaseExtension({ ...BASE, years: 60 });
    expect(r.act2024.premium).toBeLessThan(r.current.premium);
  });
});

describe("edge inputs", () => {
  it("never returns NaN", () => {
    const r = leaseExtension({ ...BASE, value: 0, years: 0, groundRent: 0, deferment: 0, capitalisation: 0 });
    for (const v of Object.values(r.current)) expect(Number.isFinite(v)).toBe(true);
    for (const v of Object.values(r.act2024)) expect(Number.isFinite(v)).toBe(true);
  });

  it("premium rises as the lease runs down", () => {
    const c = premiumCurve(BASE, 99, 20);
    expect(c[0].years).toBe(99);
    expect(c[c.length - 1].years).toBe(20);
    for (let k = 1; k < c.length; k++) expect(c[k].current).toBeGreaterThanOrEqual(c[k - 1].current);
  });
});
