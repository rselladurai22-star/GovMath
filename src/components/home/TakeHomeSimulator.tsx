"use client";

import { useState } from "react";
import Link from "next/link";
import {
  computeTakeHome,
  STUDENT_PLANS,
  STUDENT_PLAN_ORDER,
  type StudentPlan,
} from "@/lib/tax/take-home-engine";
import { scottishIncomeTax } from "@/lib/tax/scottish-2025-26";
import { useTween } from "./Motion";
import s from "../GovmathHome.module.css";

const GBP = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", minimumFractionDigits: 2, maximumFractionDigits: 2 });
const WHOLE = new Intl.NumberFormat("en-GB", { maximumFractionDigits: 0 });
const PRESETS = [
  { label: "£25k", value: 25000 },
  { label: "£35k", value: 35000 },
  { label: "£55k", value: 55000 },
  { label: "£85k", value: 85000 },
  { label: "£125k", value: 125000 },
];
const MAX = 2_000_000;

/** Live take-home calculator using GovMath's 2025/26 engines (rUK + Scotland). */
export default function TakeHomeSimulator() {
  const [gross, setGross] = useState(35000);
  const [text, setText] = useState("35,000");
  const [pension, setPension] = useState(5);
  const [plan, setPlan] = useState<StudentPlan>("none");
  const [scotland, setScotland] = useState(false);

  const setSalary = (v: number) => {
    const n = Math.min(Math.max(0, Math.round(v)), MAX);
    setGross(n);
    setText(WHOLE.format(n));
  };

  const r = computeTakeHome({ gross, bonus: 0, pensionPct: pension, plan });
  const incomeTax = scotland ? scottishIncomeTax(r.adjustedGross).total : r.incomeTax.total;
  const ni = r.ni.total;
  const loan = r.studentLoan;
  const pensionAmt = r.pensionContribution;
  const net = Math.max(0, r.adjustedGross - incomeTax - ni - loan);
  const pct = (n: number) => (gross > 0 ? (n / gross) * 100 : 0);
  const netShown = useTween(net);

  const parts = [
    { key: "net", label: "Take-home pay", value: net, color: "#12855a", sign: "" },
    { key: "tax", label: scotland ? "Income Tax (Scottish rates)" : "Income Tax", value: incomeTax, color: "#d97706", sign: "−" },
    { key: "ni", label: "National Insurance", value: ni, color: "#2563eb", sign: "−" },
    { key: "pension", label: "Pension", value: pensionAmt, color: "#7c3aed", sign: "−" },
    ...(loan > 0 ? [{ key: "loan", label: `Student loan (${STUDENT_PLANS[plan].short})`, value: loan, color: "#db2777", sign: "−" }] : []),
  ];

  return (
    <div className={s.sim}>
      <div className={s.simInner}>
      <div className={s.simHead}>
        <div>
          <span className={s.simBadge}>2025/26 rates</span>
          <h2 id="simulator-heading">Salary &amp; take-home pay calculator</h2>
          <p>Change any number and your result updates straight away.</p>
        </div>
        <div className={s.toggle} role="group" aria-label="Where you pay tax">
          <button type="button" aria-pressed={!scotland} onClick={() => setScotland(false)}>
            England, Wales &amp; NI
          </button>
          <button type="button" aria-pressed={scotland} onClick={() => setScotland(true)}>
            Scotland
          </button>
        </div>
      </div>

      <div className={s.simBody}>
        {/* Inputs */}
        <div className={s.simInputs}>
          <div>
            <label htmlFor="sim-salary" className={s.fieldLabel}>
              Your yearly salary (before tax)
            </label>
            <div className={s.salaryField}>
              <span aria-hidden="true">£</span>
              <input
                id="sim-salary"
                type="text"
                inputMode="numeric"
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  setGross(Math.min(Number(e.target.value.replace(/[^\d]/g, "") || 0), MAX));
                }}
                onBlur={() => setText(WHOLE.format(gross))}
              />
              <button type="button" aria-label="Decrease salary by £1,000" onClick={() => setSalary(gross - 1000)}>
                −
              </button>
              <button type="button" aria-label="Increase salary by £1,000" onClick={() => setSalary(gross + 1000)}>
                +
              </button>
            </div>
            <input
              type="range"
              aria-label="Yearly salary"
              min={10000}
              max={200000}
              step={1000}
              value={Math.min(Math.max(gross, 10000), 200000)}
              onChange={(e) => setSalary(Number(e.target.value))}
              className={s.range}
              style={{ ["--fill" as string]: `${((Math.min(Math.max(gross, 10000), 200000) - 10000) / 190000) * 100}%` }}
            />
            <div className={s.rangeEnds}>
              <span>£10,000</span>
              <span>£200,000</span>
            </div>
          </div>

          <div>
            <span className={s.fieldLabel}>Quick examples</span>
            <div className={s.presets}>
              {PRESETS.map((p) => (
                <button key={p.value} type="button" aria-pressed={gross === p.value} onClick={() => setSalary(p.value)}>
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className={s.simExtras}>
            <div>
              <div className={s.fieldRow}>
                <label htmlFor="sim-pension" className={s.fieldLabel}>
                  Pension contribution
                </label>
                <strong>{pension}%</strong>
              </div>
              <input
                id="sim-pension"
                type="range"
                min={0}
                max={25}
                step={1}
                value={pension}
                onChange={(e) => setPension(Number(e.target.value))}
                className={s.range}
                style={{ ["--fill" as string]: `${(pension / 25) * 100}%` }}
              />
            </div>
            <div>
              <label htmlFor="sim-loan" className={s.fieldLabel}>
                Student loan
              </label>
              <select id="sim-loan" value={plan} onChange={(e) => setPlan(e.target.value as StudentPlan)} className={s.select}>
                {STUDENT_PLAN_ORDER.map((id) => {
                  const p = STUDENT_PLANS[id];
                  return (
                    <option key={id} value={id}>
                      {id === "none" ? p.label : `${p.label} — ${Math.round(p.rate * 100)}% over £${WHOLE.format(p.threshold)}`}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className={s.simResults} aria-live="polite">
          <div className={s.kpis}>
            <div className={s.kpiMain}>
              <span>You take home each month</span>
              <strong>{GBP.format(netShown / 12)}</strong>
              <small>You keep {pct(net).toFixed(1)}% of your salary</small>
            </div>
            <div className={s.kpi}>
              <span>You take home each year</span>
              <strong>{GBP.format(netShown)}</strong>
              <small>Tax-free allowance: £{WHOLE.format(r.incomeTax.personalAllowance)}</small>
            </div>
          </div>

          <div>
            <div className={s.barTitle}>Where your salary goes</div>
            <div className={s.bar} aria-hidden="true">
              {parts.map((p) => (
                <span key={p.key} style={{ width: `${pct(p.value)}%`, background: p.color }} />
              ))}
            </div>
          </div>

          <table className={s.table}>
            <thead>
              <tr>
                <th scope="col">Breakdown</th>
                <th scope="col">Per month</th>
                <th scope="col">Per year</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">
                  <i style={{ background: "#98a2b3" }} aria-hidden="true" />
                  Salary before tax
                </th>
                <td>{GBP.format(gross / 12)}</td>
                <td>{GBP.format(gross)}</td>
              </tr>
              {parts.slice(1).map((p) => (
                <tr key={p.key}>
                  <th scope="row">
                    <i style={{ background: p.color }} aria-hidden="true" />
                    {p.label} <em>{Math.round(pct(p.value))}%</em>
                  </th>
                  <td>
                    {p.sign}
                    {GBP.format(p.value / 12)}
                  </td>
                  <td>
                    {p.sign}
                    {GBP.format(p.value)}
                  </td>
                </tr>
              ))}
              <tr className={s.totalRow}>
                <th scope="row">
                  <i style={{ background: parts[0].color }} aria-hidden="true" />
                  Take-home pay <em>{Math.round(pct(net))}%</em>
                </th>
                <td>{GBP.format(net / 12)}</td>
                <td>{GBP.format(net)}</td>
              </tr>
            </tbody>
          </table>

          <div className={s.simFoot}>
            <p>
              Estimate for 6 April 2025 – 5 April 2026, tax code 1257L. Pension is treated as salary sacrifice. Bonuses and
              benefits in kind are not included.
            </p>
            <Link href="/tax-and-salary/salary-calculator" className="gm-btn">
              Open the full salary calculator
            </Link>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
