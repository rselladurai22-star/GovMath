"use client";

import { useState } from "react";
import { Mini } from "@/components/calc/fields";

type Unit = "week" | "fourWeeks" | "month" | "year";

/** Each period as a number of weeks, with a month as 52 ÷ 12 weeks. */
const WEEKS: Record<Unit, number> = { week: 1, fourWeeks: 4, month: 52 / 12, year: 52 };
const FIELDS: { unit: Unit; label: string }[] = [
  { unit: "week", label: "A week" },
  { unit: "fourWeeks", label: "Every four weeks" },
  { unit: "month", label: "A calendar month" },
  { unit: "year", label: "A year" },
];

/**
 * Rent converter: type in any one box and the other three follow. It keeps
 * the weekly figure and derives the rest, so nothing drifts as you edit.
 */
export default function RentConverter({ startWeekly }: { startWeekly: number }) {
  const [weekly, setWeekly] = useState(startWeekly);
  return (
    <section className="sa-rent-convert" aria-labelledby="rent-convert-title">
      <div className="sa-rent-converthead">
        <h2 id="rent-convert-title">Weekly, four-weekly, monthly, yearly</h2>
        <p>Type in any box. A month is 52 weeks ÷ 12, about 4.33 weeks, so a monthly rent is more than four weeks&rsquo; rent.</p>
      </div>
      <form className="gm-form sa-rent-convertrow" noValidate onSubmit={(e) => e.preventDefault()}>
        {FIELDS.map((f, i) => (
          <div key={f.unit} className="sa-rent-convertcell">
            {i > 0 && (
              <span className="sa-rent-eq" aria-hidden="true">
                =
              </span>
            )}
            <Mini label={f.label} value={Math.round(weekly * WEEKS[f.unit] * 100) / 100} onChange={(n) => setWeekly(n / WEEKS[f.unit])} prefix="£" dp={2} max={10_000_000} wide />
          </div>
        ))}
      </form>
    </section>
  );
}
