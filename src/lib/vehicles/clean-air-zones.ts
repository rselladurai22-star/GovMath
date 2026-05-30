/**
 * UK Clean Air Zone (CAZ) and Ultra Low Emission Zone (ULEZ) daily charges.
 *
 * Sources (rates as at 2025):
 *  - London ULEZ:        gov.uk / tfl.gov.uk
 *  - Birmingham CAZ D:   birmingham.gov.uk
 *  - Bristol CAZ D:      bristol.gov.uk
 *  - Bath CAZ C:         bathnes.gov.uk
 *  - Sheffield CAZ C:    sheffield.gov.uk
 *  - Tyneside CAZ C:     newcastle.gov.uk
 *  - Bradford CAZ C:     bradford.gov.uk
 *  - Portsmouth CAZ B:   portsmouth.gov.uk
 *
 * Compliant vehicles pay nothing. The charge applies per calendar day inside the zone,
 * not per trip — so multiple journeys in the same day count once.
 */

export type CazVehicle = "car" | "van" | "minibus" | "hgv" | "coach" | "motorcycle";

export type ZoneKey =
  | "london-ulez"
  | "birmingham"
  | "bristol"
  | "bath"
  | "sheffield"
  | "tyneside"
  | "bradford"
  | "portsmouth";

type Zone = {
  key: ZoneKey;
  label: string;
  /** Daily charge per vehicle class (non-compliant). */
  charges: Partial<Record<CazVehicle, number>>;
};

export const ZONES: Zone[] = [
  {
    key: "london-ulez",
    label: "London ULEZ",
    charges: { car: 12.5, van: 12.5, motorcycle: 12.5, minibus: 12.5, hgv: 100, coach: 100 },
  },
  {
    key: "birmingham",
    label: "Birmingham CAZ (Class D)",
    charges: { car: 8, van: 8, minibus: 8, hgv: 50, coach: 50 },
  },
  {
    key: "bristol",
    label: "Bristol CAZ (Class D)",
    charges: { car: 9, van: 9, minibus: 9, hgv: 100, coach: 100 },
  },
  {
    key: "bath",
    label: "Bath CAZ (Class C)",
    charges: { van: 9, minibus: 9, hgv: 100, coach: 100 },
  },
  {
    key: "sheffield",
    label: "Sheffield CAZ (Class C)",
    charges: { van: 10, minibus: 10, hgv: 50, coach: 50 },
  },
  {
    key: "tyneside",
    label: "Tyneside CAZ (Class C)",
    charges: { van: 12.5, minibus: 12.5, hgv: 50, coach: 50 },
  },
  {
    key: "bradford",
    label: "Bradford CAZ (Class C+)",
    charges: { van: 9, minibus: 9, hgv: 50, coach: 50 },
  },
  {
    key: "portsmouth",
    label: "Portsmouth CAZ (Class B)",
    charges: { hgv: 50, coach: 50 },
  },
];

export type CazInput = {
  zoneKey: ZoneKey;
  vehicle: CazVehicle;
  daysPerWeek: number;
  weeksPerYear: number;
};

export type CazResult = {
  zone: string;
  dailyCharge: number;
  weeklyCost: number;
  annualCost: number;
  /** True when this vehicle class is not charged in the chosen zone. */
  exemptVehicle: boolean;
};

export function cazCost(input: CazInput): CazResult {
  const zone = ZONES.find((z) => z.key === input.zoneKey) ?? ZONES[0];
  const dailyCharge = zone.charges[input.vehicle] ?? 0;
  const days = Math.max(0, Math.min(7, input.daysPerWeek));
  const weeks = Math.max(0, Math.min(53, input.weeksPerYear));
  return {
    zone: zone.label,
    dailyCharge,
    weeklyCost: dailyCharge * days,
    annualCost: dailyCharge * days * weeks,
    exemptVehicle: dailyCharge === 0,
  };
}
