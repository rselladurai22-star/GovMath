"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { commuterComparison } from "@/lib/vehicles/commuter-comparison";

export default function CommuterComparisonCalculator() {
  const [annualSeasonTicket, setSeason] = useState<number>(3200);
  const [oneWayMiles, setMiles] = useState<number>(15);
  const [mpg, setMpg] = useState<number>(45);
  const [pencePerLitre, setPpl] = useState<number>(145);
  const [parkingPerDay, setParking] = useState<number>(6);
  const [daysPerWeek, setDays] = useState<number>(5);
  const [weeksPerYear, setWeeks] = useState<number>(46);

  const r = useMemo(
    () =>
      commuterComparison({
        annualSeasonTicket,
        oneWayMiles,
        mpg,
        pencePerLitre,
        parkingPerDay,
        daysPerWeek,
        weeksPerYear,
      }),
    [annualSeasonTicket, oneWayMiles, mpg, pencePerLitre, parkingPerDay, daysPerWeek, weeksPerYear]
  );

  const verdict =
    r.cheaper === "equal"
      ? "Roughly equal"
      : r.cheaper === "rail"
      ? `Rail saves £${Math.abs(r.difference).toFixed(0)}/yr`
      : `Driving saves £${Math.abs(r.difference).toFixed(0)}/yr`;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <NumberInput label="Annual season ticket" value={annualSeasonTicket} onChange={setSeason} step={100} />
          <NumberInput label="One-way distance" value={oneWayMiles} onChange={setMiles} step={1} prefix="" suffix=" mi" />
          <NumberInput label="Real-world fuel economy" value={mpg} onChange={setMpg} step={1} prefix="" suffix=" mpg" />
          <NumberInput label="Pump price" value={pencePerLitre} onChange={setPpl} step={1} prefix="" suffix=" p/L" />
          <NumberInput label="Parking per day" value={parkingPerDay} onChange={setParking} step={1} />
          <NumberInput label="Days per week" value={daysPerWeek} onChange={setDays} step={1} min={0} max={7} prefix="" suffix=" days" />
          <NumberInput label="Weeks per year" value={weeksPerYear} onChange={setWeeks} step={1} min={0} max={52} prefix="" suffix=" wks" />
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-3">
          <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Verdict</p>
          <p className="text-3xl font-bold text-primary-dark">{verdict}</p>
          <p className="text-xs text-text/60">Compare the two annual totals below.</p>
          <ResultBreakdown
            title="Rail"
            rows={[{ label: "Annual season ticket", value: r.railAnnual, variant: "total" }]}
          />
          <ResultBreakdown
            title="Driving"
            rows={[
              { label: "Fuel", value: r.fuelAnnual },
              { label: "Parking", value: r.parkingAnnual },
              { label: "Wear & tear (12p/mi)", value: r.wearAnnual },
              { label: "Total annual driving cost", value: r.drivingAnnual, variant: "total" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
