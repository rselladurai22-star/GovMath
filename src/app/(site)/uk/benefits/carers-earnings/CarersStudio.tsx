"use client";

import { carerEarnings, carerRates } from "@/lib/benefits/carers";
import { RatesChoice, ratesParam } from "@/components/benefits/RatesChoice";
import { Caveat, Flag, Foot, Inputs, Rows, Tool, type Row } from "@/components/calc/kit";
import { Mini } from "@/components/calc/fields";
import { AdvancedOptions, Switch } from "@/components/flagship/inputs";
import { gbp } from "@/components/flagship/format";
import { bool, num, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import LimitGauge from "./LimitGauge";

// Keys kept from the earlier calculator, so old share links still work.
const SCHEMA = {
  hourly: num(12.71, 0, 200),
  hours: num(16, 0, 60),
  pensionPct: num(0, 0, 50),
  care: num(0, 0, 2_000),
  scotland: bool(false),
  statePension: num(0, 0, 1_000),
  caring35: bool(true),
  qualifying: bool(true),
  student: bool(false),
  rates: ratesParam(),
};
const MORE = ["scotland", "statePension"] as const;
/** Hours rounded down to a tenth, so the figure never lands over the limit. */
const hoursText = (h: number) => {
  const t = Math.floor(h * 10) / 10;
  return Number.isInteger(t) ? String(t) : t.toFixed(1);
};

export default function CarersStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const next = v.rates === "2027/28";
  const CA = carerRates(v.rates);
  const eligible = v.caring35 && v.qualifying && !v.student;
  const gross = v.hourly * v.hours;
  const at = (g: number) => carerEarnings({ grossWeekly: g, pensionWeekly: (g * v.pensionPct) / 100, careCostsWeekly: v.care, scotland: v.scotland, overlapping: v.statePension, year: v.rates });
  const r = at(gross);
  // Highest gross pay that stays within the limit, with the pension as a share of pay.
  let lo = 0;
  let hi = 5_000;
  for (let k = 0; k < 60; k++) {
    const mid = (lo + hi) / 2;
    if (at(mid).withinLimit) lo = mid;
    else hi = mid;
  }
  const maxHours = v.hourly > 0 ? lo / v.hourly : 0;
  const m = (n: number) => gbp(n, true);
  const neg = (n: number) => (n > 0.005 ? `−${m(n)}` : m(0));
  const pension = (gross * v.pensionPct) / 100;
  const over = !r.withinLimit;
  const payable = eligible ? r.payable : 0;

  const rows: Row[] = [
    { label: "Gross pay", note: `${m(v.hourly)} × ${v.hours} hours`, value: m(gross) },
    { label: "Income Tax", value: neg(r.tax), tone: r.tax > 0.005 ? "bad" : "muted" },
    { label: "National Insurance", value: neg(r.ni), tone: r.ni > 0.005 ? "bad" : "muted" },
    ...(pension > 0 ? [{ label: "Half of your pension contributions", value: `−${m(r.pensionAllowed)}`, tone: "bad" as const }] : []),
    ...(v.care > 0 ? [{ label: "Care costs allowed", note: r.careAllowed < v.care - 0.005 ? "Capped at half your earnings" : undefined, value: `−${m(r.careAllowed)}`, tone: "bad" as const }] : []),
    { label: "Earnings that count", value: m(r.counted), strong: true },
  ];

  return (
    <Tool label="Carer's Allowance earnings calculator">
      <div className="sa-ca">
        <div className={`sa-ca-verdict${over ? " is-over" : " is-under"}`} aria-live="polite">
          <p className="sa-ca-kicker">{over ? "Over the limit this week" : "Under the limit this week"}</p>
          <p className="sa-ca-gap">
            <b>{m(Math.abs(r.headroom))}</b> <span>{over ? "over" : "to spare"}</span>
          </p>
          <p className="sa-ca-sub">
            {over ? (
              <>
                Earnings of {m(r.counted)} against the {gbp(CA.earningsLimit)} limit{next ? " from April 2027" : ""}: you would lose the whole {m(CA.weekly)} for the week.
              </>
            ) : !eligible ? (
              <>Your earnings are fine, but on your answers below you would not qualify for Carer&rsquo;s Allowance.</>
            ) : r.underlying ? (
              <>Your State Pension is paid instead, so you keep the underlying entitlement but no payment.</>
            ) : (
              <>
                You keep {m(payable)} a week{payable < CA.weekly - 0.005 ? ", topped up from your State Pension" : ""}{next ? " from April 2027" : ""}.
              </>
            )}
          </p>
          <p className="sa-ca-hours">
            <b>{hoursText(maxHours)}</b> hours a week is the most you can work at {m(v.hourly)} an hour.
          </p>
        </div>

        <div className="sa-ca-inputs">
          <Inputs tone="plain">
            <div className="sa-ca-pay">
              <Mini label="Hourly pay" value={v.hourly} onChange={st.bind("hourly")} prefix="£" dp={2} step={0.25} max={200} />
              <Mini label="Hours a week" value={v.hours} onChange={st.bind("hours")} dp={1} step={1} max={60} stepper hint="Your average, if they vary." />
            </div>
            <p className="sa-ca-h">What comes off</p>
            <div className="sa-ca-pay">
              <Mini label="Pension contribution" value={v.pensionPct} onChange={st.bind("pensionPct")} suffix="% of pay" dp={1} step={1} max={50} hint="Half of it is taken off." />
              <Mini label="Care costs while you work" value={v.care} onChange={st.bind("care")} prefix="£" suffix="a week" dp={2} step={5} max={2_000} hint="Not paid to a close relative." />
            </div>
          </Inputs>
        </div>

        <div className="sa-ca-gauge">
          <LimitGauge counted={r.counted} limit={CA.earningsLimit} money={m} deductions={[
            { key: "care", label: "Care costs", amount: r.careAllowed },
            { key: "pension", label: "Half your pension", amount: r.pensionAllowed },
            { key: "ni", label: "National Insurance", amount: r.ni },
            { key: "tax", label: "Income Tax", amount: r.tax },
          ]} />
        </div>

        <div className="sa-ca-lower">
          <Rows caption="How your earnings are counted" rows={rows} />
          <Inputs tone="plain">
            <fieldset className="sa-ca-qual">
              <legend>Do you qualify?</legend>
              <label>
                <input type="checkbox" checked={v.caring35} onChange={(e) => st.set("caring35", e.target.checked)} />
                <span>I care for someone at least 35 hours a week</span>
              </label>
              <label>
                <input type="checkbox" checked={v.qualifying} onChange={(e) => st.set("qualifying", e.target.checked)} />
                <span>They get PIP daily living, Attendance Allowance, DLA middle or highest care, or a similar benefit</span>
              </label>
              <label>
                <input type="checkbox" checked={v.student} onChange={(e) => st.set("student", e.target.checked)} />
                <span>I am in full-time education, or study 21 hours a week or more</span>
              </label>
            </fieldset>
            <AdvancedOptions description="Scottish Income Tax, a State Pension." changed={st.changed([...MORE])} onReset={() => st.resetKeys([...MORE])}>
              <Switch label="I pay Scottish Income Tax" checked={v.scotland} onChange={st.bind("scotland")} hint="Carer Support Payment, Scotland's version, has the same earnings limit." />
              <div className="sa-ca-sp">
                <Mini label="State Pension, or another overlapping benefit" value={v.statePension} onChange={st.bind("statePension")} prefix="£" suffix="a week" dp={2} step={5} max={1_000} hint="Paid instead of Carer's Allowance." />
              </div>
            </AdvancedOptions>
            <RatesChoice value={v.rates} onChange={st.bind("rates")} />
          </Inputs>
        </div>

        {over && (
          <Flag tone="warn" title="It is a cliff edge, not a taper">
            A penny over loses the whole week. A slightly bigger pension contribution, or care costs you already pay, can bring you back under.
          </Flag>
        )}

        <Foot>
          <Caveat>
            An estimate for one week, with tax and National Insurance worked out as if this pay continued all year at 2026/27 rates{next ? " and the proposed April 2027 allowance and limit" : ""}. It leaves out
            other expenses, such as work equipment and travel between workplaces, which also come off.
          </Caveat>
          <ShareButton copied={st.copied} onClick={st.share} />
        </Foot>
      </div>
    </Tool>
  );
}
