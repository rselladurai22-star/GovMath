"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { cazCost, ZONES, type CazVehicle, type ZoneKey } from "@/lib/vehicles/clean-air-zones";

const VEHICLES: { key: CazVehicle; label: string }[] = [
  { key: "car", label: "Car" },
  { key: "van", label: "Van / minibus" },
  { key: "motorcycle", label: "Motorcycle" },
  { key: "hgv", label: "HGV / lorry" },
  { key: "coach", label: "Coach / bus" },
];

export default function CleanAirZonesCalculator() {
  const [zoneKey, setZoneKey] = useState<ZoneKey>("london-ulez");
  const [vehicle, setVehicle] = useState<CazVehicle>("car");
  const [daysPerWeek, setDaysPerWeek] = useState<number>(5);
  const [weeksPerYear, setWeeksPerYear] = useState<number>(48);

  const r = useMemo(
    () => cazCost({ zoneKey, vehicle, daysPerWeek, weeksPerYear }),
    [zoneKey, vehicle, daysPerWeek, weeksPerYear]
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-text mb-1">Zone</label>
            <select
              value={zoneKey}
              onChange={(e) => setZoneKey(e.target.value as ZoneKey)}
              className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm"
            >
              {ZONES.map((z) => (
                <option key={z.key} value={z.key}>{z.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-text mb-1">Vehicle</label>
            <select
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value as CazVehicle)}
              className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm"
            >
              {VEHICLES.map((v) => (
                <option key={v.key} value={v.key}>{v.label}</option>
              ))}
            </select>
          </div>
          <NumberInput label="Days per week in zone" value={daysPerWeek} onChange={setDaysPerWeek} step={1} min={0} max={7} prefix="" suffix=" days" />
          <NumberInput label="Weeks per year" value={weeksPerYear} onChange={setWeeksPerYear} step={1} min={0} max={52} prefix="" suffix=" wks" />
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-3">
          <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Annual cost</p>
          <p className="text-4xl font-bold text-primary-dark">
            £{r.annualCost.toLocaleString("en-GB", { maximumFractionDigits: 0 })}
          </p>
          <p className="text-xs text-text/60">
            {r.exemptVehicle
              ? `${VEHICLES.find((v) => v.key === vehicle)?.label}s aren’t charged in ${r.zone}.`
              : `Based on £${r.dailyCharge.toFixed(2)}/day in ${r.zone}.`}
          </p>
          <ResultBreakdown
            title="Breakdown"
            rows={[
              { label: "Daily charge", value: r.dailyCharge },
              { label: "Weekly cost", value: r.weeklyCost },
              { label: "Annual cost", value: r.annualCost, variant: "total" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
