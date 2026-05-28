"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { hourlyToSalary, salaryToHourly } from "@/lib/salary-conversions";

const GBP0 = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});
const GBP2 = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 2,
});

type Direction = "to-salary" | "to-hourly";

export default function HourlyCalculator() {
  const [direction, setDirection] = useState<Direction>("to-salary");
  const [hourly, setHourly] = useState<number>(15);
  const [salary, setSalary] = useState<number>(30_000);
  const [hours, setHours] = useState<number>(37.5);
  const [weeks, setWeeks] = useState<number>(52);

  const toSalary = useMemo(
    () => hourlyToSalary({ hourlyRate: hourly, hoursPerWeek: hours, weeksPerYear: weeks }),
    [hourly, hours, weeks]
  );
  const toHourly = useMemo(
    () => salaryToHourly(salary, hours, weeks),
    [salary, hours, weeks]
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-text mb-2">
              I want to convert…
            </label>
            <div className="grid grid-cols-2 gap-2">
              {([
                { v: "to-salary" as const, label: "Hourly → Salary" },
                { v: "to-hourly" as const, label: "Salary → Hourly" },
              ]).map((opt) => (
                <label
                  key={opt.v}
                  className={`flex items-center justify-center gap-2 rounded-md border px-3 py-2 cursor-pointer text-sm ${
                    direction === opt.v
                      ? "border-primary bg-primary/5"
                      : "border-border bg-white"
                  }`}
                >
                  <input
                    type="radio"
                    name="direction"
                    value={opt.v}
                    checked={direction === opt.v}
                    onChange={() => setDirection(opt.v)}
                    className="accent-primary"
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>

          {direction === "to-salary" ? (
            <NumberInput
              label="Hourly rate"
              value={hourly}
              onChange={setHourly}
              min={0}
              step={0.5}
            />
          ) : (
            <NumberInput
              label="Annual salary"
              value={salary}
              onChange={setSalary}
              min={0}
              step={500}
            />
          )}

          <div className="grid grid-cols-2 gap-3">
            <NumberInput
              label="Hours per week"
              value={hours}
              onChange={setHours}
              min={1}
              max={80}
              step={0.5}
              prefix=""
              suffix=" hrs"
            />
            <NumberInput
              label="Weeks per year"
              value={weeks}
              onChange={setWeeks}
              min={1}
              max={52}
              step={1}
              prefix=""
              suffix=" wks"
              hint="Use 52 if you're salaried (holiday is paid)."
            />
          </div>
        </div>

        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-4">
          {direction === "to-salary" ? (
            <>
              <div>
                <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">
                  Annual gross salary
                </p>
                <p className="text-4xl font-bold text-primary-dark mt-1">
                  {GBP0.format(toSalary.annual)}
                </p>
              </div>
              <ResultBreakdown
                title="Salary breakdown"
                rows={[
                  { label: "Per week", value: toSalary.weekly },
                  { label: "Per month", value: toSalary.monthly },
                  { label: "Per year", value: toSalary.annual, variant: "total" },
                ]}
              />
            </>
          ) : (
            <>
              <div>
                <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">
                  Equivalent hourly rate
                </p>
                <p className="text-4xl font-bold text-primary-dark mt-1">
                  {GBP2.format(toHourly.hourly)}/hr
                </p>
              </div>
              <ResultBreakdown
                title="Hourly breakdown"
                rows={[
                  { label: "Per hour", value: toHourly.hourly, variant: "total" },
                  { label: "Per week", value: toHourly.weekly },
                  { label: "Per month", value: toHourly.monthly },
                ]}
              />
            </>
          )}
          <p className="text-xs text-text/60">
            Gross figures only. National Living Wage from April 2025 is £12.21/hr (21+).
          </p>
        </div>
      </div>
    </div>
  );
}
