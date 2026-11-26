"use client";

import { useMemo } from "react";
import { BENEFIT_CAP, ucRates, UC_DEFAULT_INPUT, type Health, type UcInput } from "@/lib/benefits/uc-engine";
import { monthlyFromHours, workChange, workLandmarks, workPoint } from "@/lib/benefits/uc-work";
import { RatesChoice, ratesParam } from "@/components/benefits/RatesChoice";
import { Caveat, Flag, Hero, Inputs, Panel, SplitStrip, Tool } from "@/components/calc/kit";
import { Mini, Pills } from "@/components/calc/fields";
import { AdvancedOptions, MoneyField, SelectField, StepperField, Switch } from "@/components/flagship/inputs";
import { gbp } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import TaperChart, { type TaperMark } from "./TaperChart";

const SCHEMA = {
  couple: bool(false),
  children: num(1, 0, 12),
  rent: num(0, 0, 10_000),
  hourly: num(12.71, 0, 200),
  hours: num(16, 0, 80),
  extra: num(8, 0, 60),
  over25: bool(true),
  health: oneOf<Health>("none", ["none", "lcw", "lcwra-new", "lcwra-protected"]),
  pension: num(0, 0, 50),
  scotland: bool(false),
  partnerNet: num(0, 0, 20_000),
  childcare: num(0, 0, 10_000),
  other: num(0, 0, 20_000),
  rates: ratesParam(),
};
const ADVANCED = ["over25", "health", "pension", "scotland", "partnerNet", "childcare", "other"] as const;

const pence = (share: number) => `${Math.round(share * 100)}p`;
const signed = (n: number) => (Math.abs(n) < 0.005 ? gbp(0, true) : `${n > 0 ? "+" : "−"}${gbp(Math.abs(n), true)}`);
const hrs = (h: number) => `${Number(h.toFixed(1))} ${h === 1 ? "hour" : "hours"}`;

export default function TaperStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const next = v.rates === "2027/28";
  const R = ucRates(v.rates);
  const newHours = v.hours + v.extra;
  const maxHours = Math.max(48, Math.ceil(newHours / 8) * 8);

  const base = useMemo(() => {
    const household: UcInput = {
      ...UC_DEFAULT_INPUT,
      couple: v.couple,
      over25: v.over25,
      children: v.children,
      health: v.health,
      tenure: v.rent > 0 ? "social" : "none",
      rent: v.rent,
      childcare: v.childcare,
      otherIncome: v.other,
      // The cap is a separate question; this page is about the taper.
      capExemptBenefit: true,
      year: v.rates,
    };
    return { pensionPct: v.pension, region: (v.scotland ? "scotland" : "ruk") as "scotland" | "ruk", partnerNet: v.partnerNet, household };
  }, [v.couple, v.over25, v.children, v.health, v.rent, v.childcare, v.other, v.rates, v.pension, v.scotland, v.partnerNet]);

  const points = useMemo(
    () =>
      Array.from({ length: maxHours + 1 }, (_, h) => {
        const p = workPoint({ ...base, grossMonthly: monthlyFromHours(v.hourly, h) });
        return { h, pay: p.ucEarnings, uc: p.uc, total: p.total };
      }),
    [base, v.hourly, maxHours],
  );
  const marks = useMemo<TaperMark[]>(() => {
    const perHour = monthlyFromHours(v.hourly, 1);
    if (perHour <= 0) return [];
    const l = workLandmarks(base, perHour * maxHours);
    const at = (gross: number | null) => (gross === null ? null : gross / perHour);
    const list: (TaperMark | null)[] = [
      at(l.taperStarts) === null ? null : { key: "taper", label: "The 55% taper starts", h: at(l.taperStarts)! },
      at(l.deductionsStart) === null ? null : { key: "tax", label: "National Insurance and tax start", h: at(l.deductionsStart)! },
      at(l.ucEnds) === null ? null : { key: "end", label: "Universal Credit ends", h: at(l.ucEnds)! },
    ];
    return list.filter((m): m is TaperMark => m !== null).sort((a, b) => a.h - b.h);
  }, [base, v.hourly, maxHours]);

  const gross = monthlyFromHours(v.hourly, v.hours);
  // With no extra hours chosen, show what one more hour would do.
  const exploring = v.extra <= 0;
  const c = workChange({ ...base, grossMonthly: gross }, monthlyFromHours(v.hourly, exploring ? 1 : v.extra));
  const point = (p: typeof c.before, h: number) => ({ h, pay: p.ucEarnings, uc: p.uc, total: p.total });
  const nowPoint = point(c.before, v.hours);
  const shownAfter = exploring ? c.before : c.after;
  const nextPoint = point(shownAfter, newHours);
  const workAllowance = v.children > 0 || v.health !== "none" ? (v.rent > 0 ? R.workAllowance.withHousing : R.workAllowance.noHousing) : 0;
  const noPay = v.hourly <= 0;

  const setNow = (h: number) => {
    st.set("hours", h);
    st.set("extra", Math.max(0, Math.min(60, Number((newHours - h).toFixed(1)))));
  };
  const setNew = (h: number) => st.set("extra", Math.max(0, Math.min(60, Number((h - v.hours).toFixed(1)))));

  const strip = [
    { label: "You keep", value: Math.max(0, c.gain), display: gbp(Math.max(0, c.gain), true), color: "var(--sa-brand-fill)" },
    { label: "Universal Credit lost", value: Math.max(0, c.lostToUc), display: gbp(Math.max(0, c.lostToUc), true), color: "#d8962a" },
    { label: "Tax and NI", value: Math.max(0, c.lostToTaxNi), display: gbp(Math.max(0, c.lostToTaxNi), true), color: "#6880c8" },
    ...(c.lostToPension > 0.005 ? [{ label: "Into your pension", value: c.lostToPension, display: gbp(c.lostToPension, true), color: "#8a8f98" }] : []),
  ];
  const rows = [
    { label: v.couple && v.partnerNet > 0 ? "Take-home pay (both of you)" : "Take-home pay", a: nowPoint.pay, b: nextPoint.pay },
    { label: "Universal Credit", a: nowPoint.uc, b: nextPoint.uc },
    { label: "Total a month", a: nowPoint.total, b: nextPoint.total, total: true },
  ];

  return (
    <Tool label="Universal Credit taper calculator">
      <div className="sa-taper">
        <div className="sa-taper-bar">
          <Inputs>
            <div className="sa-taper-fields">
              <Pills
                label="Claiming as"
                value={v.couple ? "couple" : "single"}
                onChange={(x) => st.set("couple", x === "couple")}
                options={[
                  { value: "single", label: "Single" },
                  { value: "couple", label: "Couple" },
                ]}
              />
              <Mini label="Children" value={v.children} onChange={(n) => st.set("children", Math.round(n))} min={0} max={12} stepper />
              <Mini label="Rent in your claim" value={v.rent} onChange={st.bind("rent")} prefix="£" suffix="a month" max={10_000} wide />
              <Mini label="Hourly pay" value={v.hourly} onChange={st.bind("hourly")} prefix="£" dp={2} max={200} step={0.5} />
              <Mini label="Hours a week now" value={v.hours} onChange={setNow} max={80} dp={1} stepper />
              <Mini label="New hours" value={newHours} onChange={setNew} min={0} max={Math.min(140, v.hours + 60)} dp={1} stepper />
            </div>
          </Inputs>
        </div>

        <div className="sa-taper-answer">
          {noPay ? (
            <Hero label="From each extra £1 of pay you keep" value="–" tone="ink" sub="Enter your hourly pay to see what you keep." />
          ) : (
            <Hero
              label={`From each extra £1 of pay you keep${next ? " (April 2027, proposed)" : ""}`}
              value={pence(c.keep)}
              sub={
                exploring ? (
                  <>That is for your next hour. Drag the New marker, or raise New hours, to price a change.</>
                ) : (
                  <>
                    <strong className="sa-taper-gain">{gbp(c.gain, true)}</strong> a month better off working {hrs(newHours)} a week instead of {hrs(v.hours)}.
                  </>
                )
              }
            />
          )}
          {!noPay && (
            <div className="sa-taper-split">
              <h3 className="sa-taper-h">{exploring ? `Where one more hour’s ${gbp(c.extraGross, true)} goes` : `Where the extra ${gbp(c.extraGross, true)} of pay goes`}</h3>
              <SplitStrip label="Where the extra pay goes each month" parts={strip} />
            </div>
          )}
          {!noPay && workAllowance === 0 && nowPoint.uc + nextPoint.uc > 0 && (
            <Flag title="No work allowance">With no children and no health element, the taper applies from your first pound of take-home pay.</Flag>
          )}
          {!noPay && !exploring && c.after.uc <= 0.005 && c.before.uc > 0.005 && (
            <Flag tone="good" title={`At ${hrs(newHours)} your Universal Credit stops`}>
              Your claim reopens by itself if your pay drops again within six months of your last payment.
            </Flag>
          )}
          {!noPay && c.before.uc <= 0.005 && nextPoint.uc <= 0.005 && <Flag title="No Universal Credit at these hours">At this pay your award is already nil, so the taper no longer touches extra pay.</Flag>}
          <Caveat>
            An estimate using {next ? "DWP’s proposed 2027/28 Universal Credit rates with 2026/27 tax and National Insurance" : "2026/27 rates"}, with a month as 52 weeks ÷ 12. It leaves out Council Tax
            Reduction, free school meals and the benefit cap, which household earnings of {gbp(BENEFIT_CAP.earningsExemption)} a month lift.
          </Caveat>
          <ShareButton copied={st.copied} onClick={st.share} />
        </div>

        <Panel className="sa-taper-chartpanel" title="Monthly income by hours worked">
          {noPay ? (
            <p className="sa-taper-empty">Enter your hourly pay to draw the chart.</p>
          ) : (
            <>
              <p className="sa-taper-hint">Drag Now and New along the line, or focus one and use the arrow keys.</p>
              <TaperChart points={points} now={v.hours} next={newHours} nowPoint={nowPoint} nextPoint={nextPoint} marks={marks} maxHours={maxHours} hourly={v.hourly} onNow={setNow} onNext={setNew} />
              <div className="sa-tablewrap">
                <table className="sa-taper-table">
                  <caption className="sr-only">Monthly income now and at the new hours</caption>
                  <thead>
                    <tr>
                      <td />
                      <th scope="col">Now · {Number(v.hours.toFixed(1))}h</th>
                      <th scope="col">New · {Number(newHours.toFixed(1))}h</th>
                      <th scope="col">Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r) => (
                      <tr key={r.label} className={r.total ? "is-total" : undefined}>
                        <th scope="row">{r.label}</th>
                        <td>{gbp(r.a, true)}</td>
                        <td>{gbp(r.b, true)}</td>
                        <td className={r.b - r.a < -0.005 ? "is-down" : undefined}>{signed(r.b - r.a)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </Panel>

        <div className="sa-taper-more">
          <Inputs tone="plain">
            <RatesChoice value={v.rates} onChange={st.bind("rates")} universalCredit />
            <AdvancedOptions description="Age, health element, pension, partner’s pay, childcare and other income." changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
              <Switch label={v.couple ? "At least one of you is 25 or over" : "I am 25 or over"} checked={v.over25} onChange={st.bind("over25")} optional />
              <SelectField
                label="Health condition affecting work"
                value={v.health}
                onChange={st.bind("health")}
                optional
                options={[
                  { value: "none", label: "None" },
                  { value: "lcwra-new", label: "LCWRA (new claim)" },
                  { value: "lcwra-protected", label: "LCWRA (earlier claim or protected)" },
                  { value: "lcw", label: "LCW (claim before April 2017)" },
                ]}
                hint="Gives you a work allowance even with no children."
              />
              <StepperField label="Pension contribution" value={v.pension} onChange={st.bind("pension")} step={1} min={0} max={50} unit="%" dp={1} optional hint="Taken from gross pay before tax, as with salary sacrifice." />
              <Switch label="I pay Scottish Income Tax" checked={v.scotland} onChange={st.bind("scotland")} optional />
              {v.couple && <MoneyField label="Partner’s take-home pay a month" value={v.partnerNet} onChange={st.bind("partnerNet")} optional hint="Shares the same work allowance and taper." />}
              {v.children > 0 && <MoneyField label="Childcare costs a month" value={v.childcare} onChange={st.bind("childcare")} optional hint="85% is added to your award while you work." />}
              <MoneyField label="Other income a month" value={v.other} onChange={st.bind("other")} optional hint="Pensions, New Style benefits. Taken off in full." />
            </AdvancedOptions>
          </Inputs>
        </div>
      </div>
    </Tool>
  );
}
