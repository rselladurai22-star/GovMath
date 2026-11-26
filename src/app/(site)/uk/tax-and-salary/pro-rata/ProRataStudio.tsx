"use client";

import { useState } from "react";
import { proRata, statutoryHolidayDays, termTime } from "@/lib/tax/pro-rata";
import { computeTakeHome } from "@/lib/tax/take-home-engine";
import { Caveat, Flag, Foot, Inputs, Tool } from "@/components/calc/kit";
import { Mini, Pills } from "@/components/calc/fields";
import { MoneyField } from "@/components/flagship/inputs";
import { gbp, percent } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import { REGION_LABEL, taxParams, TaxSituationFields } from "@/components/flagship/taxOptions";

type Basis = "hours" | "days";

const SCHEMA = {
  salary: num(40_000),
  basis: oneOf<Basis>("hours", ["hours", "days"]),
  hours: num(30, 0, 100),
  ftHours: num(37.5, 1, 100),
  days: num(3, 0, 7),
  ftDays: num(5, 1, 7),
  months: num(12, 1, 12),
  holiday: num(33, 0, 60),
  weeks: num(52, 1, 52),
  ...taxParams,
};

const oneDp = (n: number) => (Math.round(n * 10) / 10).toLocaleString("en-GB");
const DAY_PILLS = [1, 2, 3, 4] as const;

export default function ProRataStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const byHours = v.basis === "hours";
  const r = proRata({ fullTimeSalary: v.salary, basis: v.basis, hours: v.hours, fullTimeHours: v.ftHours, days: v.days, fullTimeDays: v.ftDays, months: v.months, fullTimeHolidayDays: v.holiday });
  const termOn = v.weeks < 52;
  const term = termTime(r.salary, v.weeks);
  const yearly = termOn ? term.salary : r.salary;
  const tax = { pensionPct: v.pension, plan: v.plan, region: v.region, bonus: 0 };
  const yours = computeTakeHome({ ...tax, gross: yearly });
  const partYear = v.months < 12;
  const earned = yearly * (v.months / 12);
  const yearSnap = computeTakeHome({ ...tax, gross: earned });
  const [taxOpen, setTaxOpen] = useState(v.region !== "ruk" || v.plan !== "none" || v.pension > 0);
  const [moreOpen, setMoreOpen] = useState(termOn || partYear || v.holiday !== 33);

  const yourDays = byHours ? (v.hours / v.ftHours) * v.ftDays : v.days;
  const legalMin = statutoryHolidayDays(yourDays) * (v.months / 12);
  // Pro-rated holiday, in days of the reader's own length (the same hours a day as full time).
  const holidayOwn = r.holidayDays;
  const belowMin = !termOn && holidayOwn + 0.05 < legalMin;
  const fraction = byHours ? `${oneDp(v.hours)} of ${oneDp(v.ftHours)} hours` : `${oneDp(v.days)} of ${oneDp(v.ftDays)} days`;

  return (
    <Tool label="Pro rata salary calculator">
      <div className="sa-pr">
        <div className="sa-pr-inputs">
          <Inputs title="The job and your hours">
            <MoneyField label="Full-time salary" value={v.salary} onChange={st.bind("salary")} slider={{ min: 10_000, max: 150_000, step: 500, ends: ["£10,000", "£150,000"] }} hint="The advertised salary for the full-time role (FTE)." />
            <Pills
              label="Your pattern is set in"
              value={v.basis}
              onChange={st.bind("basis")}
              options={[
                { value: "hours", label: "Hours a week" },
                { value: "days", label: "Days a week" },
              ]}
            />
            {byHours ? (
              <div className="sa-pr-pair">
                <Mini label="Your hours a week" value={v.hours} onChange={st.bind("hours")} step={0.5} dp={2} max={100} stepper />
                <Mini label="Full-time hours" value={v.ftHours} onChange={st.bind("ftHours")} step={0.5} dp={2} min={1} max={100} stepper />
              </div>
            ) : (
              <div className="sa-pr-days">
                <div className="sa-pr-daypills" role="group" aria-label="Days a week">
                  {DAY_PILLS.map((d) => (
                    <button key={d} type="button" aria-pressed={v.days === d} onClick={() => st.set("days", d)}>
                      {d} {d === 1 ? "day" : "days"}
                    </button>
                  ))}
                </div>
                <div className="sa-pr-pair">
                  <Mini label="Your days a week" value={v.days} onChange={st.bind("days")} step={0.5} dp={1} max={7} stepper />
                  <Mini label="Full-time days" value={v.ftDays} onChange={st.bind("ftDays")} step={1} min={1} max={7} stepper />
                </div>
              </div>
            )}
            <button type="button" className="sa-pr-toggle" aria-expanded={moreOpen} onClick={() => setMoreOpen((o) => !o)}>
              Term-time, part of the year or holiday
            </button>
            {moreOpen && (
              <div className="sa-pr-more">
                <Mini label="Weeks you work a year" value={v.weeks} onChange={(x) => st.set("weeks", Math.max(1, Math.min(52, Math.round(x))))} min={1} max={52} suffix="of 52" stepper hint="Term-time only is usually 38 or 39." />
                <Mini label="Months you work this tax year" value={v.months} onChange={(x) => st.set("months", Math.max(1, Math.min(12, Math.round(x))))} min={1} max={12} suffix="of 12" stepper hint="Starting or leaving part-way." />
                <Mini label="Full-time holiday, with bank holidays" value={v.holiday} onChange={st.bind("holiday")} min={0} max={60} suffix="days" stepper hint="25 days plus 8 bank holidays is 33." />
              </div>
            )}
          </Inputs>
        </div>

        <div className="sa-pr-result">
          <figure className="sa-pr-pairs" role="img" aria-label={`Full time ${gbp(v.salary)} a year; ${fraction} is ${percent(r.fte, 1)}; your pro rata salary ${gbp(yearly)} a year`}>
            <div className="sa-pr-side">
              <span>Full time</span>
              <b>{gbp(v.salary)}</b>
              <small>{gbp(v.salary / 12)} a month</small>
            </div>
            <div className="sa-pr-join" aria-hidden="true">
              <span className="sa-pr-frac">{fraction}</span>
              <span className="sa-pr-pct">× {percent(r.fte, 1)}</span>
              {termOn && <span className="sa-pr-frac">× {oneDp(term.paidWeeks)} of 52 weeks paid</span>}
              <span className="sa-pr-meter">
                <span style={{ width: `${Math.min(1, r.fte * (termOn ? term.paidWeeks / 52 : 1)) * 100}%` }} />
              </span>
            </div>
            <div className="sa-pr-side is-yours" aria-live="polite">
              <span>Your pro rata salary</span>
              <b>{gbp(yearly)}</b>
              <small>
                <strong>{gbp(yearly / 12)}</strong> a month before tax
              </small>
            </div>
          </figure>

          <div className="sa-pr-facts">
            <p>
              <b>{gbp(yours.takeHome / 12)}</b>
              <span>
                a month take-home{" "}
                <button type="button" className="sa-pr-link" aria-expanded={taxOpen} onClick={() => setTaxOpen((o) => !o)}>
                  ({REGION_LABEL[v.region]}
                  {v.plan !== "none" ? ", student loan" : ""}
                  {v.pension > 0 ? `, ${v.pension}% pension` : ""})
                </button>
              </span>
            </p>
            <p>
              <b>{termOn ? `${oneDp(term.holidayWeeks)} weeks` : `${oneDp(holidayOwn)} days`}</b>
              <span>{termOn ? "paid holiday a year, at 12.07% of the weeks you work" : `holiday a year${partYear ? ` for ${v.months} months` : ""}, including bank holidays${byHours ? `: ${oneDp(r.holidayHours)} hours` : ""}`}</span>
            </p>
            <p>
              <b>{gbp(r.hourly, true)}</b>
              <span>an hour, the same as full time</span>
            </p>
          </div>

          {taxOpen && (
            <Inputs tone="plain">
              <div className="sa-pr-tax">
                <TaxSituationFields
                  region={v.region}
                  plan={v.plan}
                  pension={v.pension}
                  onRegion={st.bind("region")}
                  onPlan={st.bind("plan")}
                  onPension={st.bind("pension")}
                  pensionAside={`${gbp(yours.pensionContribution)} a year`}
                />
              </div>
            </Inputs>
          )}

          {partYear && (
            <Flag title={`Working ${v.months} of 12 months this tax year`}>
              You earn {gbp(earned)} by 5 April and keep about {gbp(yearSnap.takeHome)}. If you stop working part-way, payroll will have taxed you as if you earned all year, so with no other income HMRC usually refunds the extra after 5 April.
            </Flag>
          )}
          {belowMin && (
            <Flag tone="warn" title="Below the legal minimum">
              On {oneDp(yourDays)} days a week the law gives at least {oneDp(legalMin)} days a year, including bank holidays. A full-time allowance of {v.holiday} days pro-rated falls short.
            </Flag>
          )}

          <Foot>
            <Caveat>
              Exact pro rata arithmetic; take-home is an estimate at 2026/27 rates on tax code 1257L.{termOn ? " Term-time pay uses the statutory 12.07% holiday; your contract may give more." : ""}
            </Caveat>
            <ShareButton copied={st.copied} onClick={st.share} />
          </Foot>
        </div>
      </div>
    </Tool>
  );
}
