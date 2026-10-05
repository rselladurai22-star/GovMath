import { describe, expect, it } from "vitest";
import { commuteCosts, cycleToWork, driveCost, journeyCost, petrolVsEv, UK_GALLON } from "./running";
import { licenceRenewal, motDates, validReg } from "./rules";

describe("journey", () => {
  it("mpg to litres and cost", () => {
    const d = driveCost(100, { kind: "mpg", value: 50 }, 150);
    expect(d.units).toBeCloseTo(2 * UK_GALLON, 6);
    expect(d.cost).toBeCloseTo(2 * UK_GALLON * 1.5, 6);
  });
  it("electric", () => {
    expect(driveCost(100, { kind: "mikwh", value: 4 }, 20).cost).toBeCloseTo(5, 6);
  });
  it("return trip and sharing", () => {
    const r = journeyCost({ miles: 50, returnTrip: true, eff: { kind: "mpg", value: 50 }, price: 150, people: 2, tolls: 0, parking: 0 });
    expect(r.miles).toBe(100);
    expect(r.perPerson).toBeCloseTo(r.total / 2, 6);
  });
});

describe("petrol vs EV", () => {
  it("break-even year", () => {
    const r = petrolVsEv({ milesPerYear: 10_000, years: 8, mpg: 45, fuelPrice: 170, petrolServicing: 300, petrolTax: 200, petrolInsurance: 600, petrolPrice: 25_000, miPerKwh: 3.5, homePrice: 8, publicPrice: 75, publicShare: 0.2, evServicing: 200, evTax: 200, evInsurance: 700, evPrice: 28_000, eved: false, petrolResidual: 0, evResidual: 0 });
    expect(r.evPerKwh).toBeCloseTo(8 * 0.8 + 75 * 0.2, 6);
    expect(r.breakEven).not.toBeNull();
  });
});

describe("commute", () => {
  it("car, train and bus", () => {
    const r = commuteCosts({ oneWayMiles: 10, daysPerWeek: 5, weeks: 46, mpg: 45, fuelPrice: 170, parkingPerDay: 5, wearPence: 10, zonePerDay: 0, seasonTicket: 2_000, dailyRail: 12, busSingle: 3, bikeYearly: 150 });
    expect(r.days).toBe(230);
    expect(r.miles).toBe(4_600);
    expect(r.options.find((o) => o.key === "train")!.yearly).toBe(2_000);
    expect(r.options.find((o) => o.key === "bus")!.yearly).toBe(1_380);
  });
  it("cycle to work", () => {
    expect(cycleToWork(1_000, 0.2, 0.08).saving).toBeCloseTo(280, 6);
  });
});

describe("licence and MOT", () => {
  it("renewal at 70 then every 3 years", () => {
    const r = licenceRenewal("1956-03-10", "2026-10-04");
    expect(r.next).toBe("2026-03-10" > "2026-10-04" ? "2026-03-10" : "2029-03-10");
    expect(r.applyFrom).toBe("2028-12-10");
  });
  it("MOT first due and earliest test", () => {
    const r = motDates({ firstReg: "2023-05-15", northernIreland: false, today: "2026-04-01" });
    expect(r.firstDue).toBe("2026-05-15");
    expect(r.earliest).toBe("2026-04-16");
    expect(motDates({ firstReg: "2023-05-15", northernIreland: true, today: "2026-04-01" }).firstDue).toBe("2027-05-15");
  });
  it("plates", () => {
    expect(validReg("AB12 CDE")).toBe(true);
    expect(validReg("hello world")).toBe(false);
  });
});
