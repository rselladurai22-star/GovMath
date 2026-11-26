"use client";

import { useId } from "react";
import { monthEnd, monthlyToWeeklyRent, monthStart, proRataRent, weeklyToMonthlyRent, type ProRataMethod, type ProRataResult } from "@/lib/life/everyday";
import { formatDate, parse } from "@/lib/life/calendar";
import { Caveat, Flag, Foot, Inputs, Panel, Tool } from "@/components/calc/kit";
import { Mini, Pills } from "@/components/calc/fields";
import { DateField } from "@/components/flagship/inputs";
import { gbp } from "@/components/flagship/format";
import { date, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import RentCalendar from "./RentCalendar";
import RentConverter from "./RentConverter";

type Situation = "in" | "out" | "custom";

const SCHEMA = {
  rent: num(1_200, 0, 100_000),
  period: oneOf<"month" | "week">("month", ["month", "week"]),
  // "in" runs to the end of the first day's month and "out" from the 1st of the
  // last day's month (older share links rely on this); picking both dates is "custom".
  situation: oneOf<Situation>("in", ["in", "out", "custom"]),
  from: date("2026-10-20"),
  to: date("2026-10-31"),
  method: oneOf<ProRataMethod>("annual", ["annual", "month"]),
};

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const monthName = (iso: string) => MONTHS[parse(iso).getUTCMonth()];
const days = (n: number) => `${n} ${n === 1 ? "day" : "days"}`;

/** The sum behind a method's figure, as lines of phrasing content (it sits inside a label). */
function Working({ r, monthly }: { r: ProRataResult; monthly: number }) {
  if (r.days === 0) return null;
  if (r.method === "annual") {
    const mixedYears = r.parts.some((p) => p.periodDays !== r.periodDays);
    return (
      <span className="sa-rent-working">
        <span>
          {mixedYears ? (
            <>
              {gbp(monthly, true)} × 12 ÷ the days in each year, for {days(r.days)}
            </>
          ) : (
            <>
              {gbp(monthly, true)} × 12 ÷ {r.periodDays} = <b>{gbp(r.dailyRate, true)} a day</b>, × {days(r.days)}
            </>
          )}
        </span>
      </span>
    );
  }
  return (
    <span className="sa-rent-working">
      {r.parts.map((p) => (
        <span key={p.from}>
          {p.days === p.periodDays ? (
            <>
              All of {monthName(p.from)}: {gbp(p.amount, true)}
            </>
          ) : (
            <>
              {monthName(p.from)}: {gbp(monthly, true)} ÷ {p.periodDays} = <b>{gbp(p.dailyRate, true)} a day</b>, × {days(p.days)}
              {r.parts.length > 1 ? <> = {gbp(p.amount, true)}</> : null}
            </>
          )}
        </span>
      ))}
    </span>
  );
}

export default function ProRataStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const group = useId();
  const monthly = v.period === "week" ? weeklyToMonthlyRent(v.rent) : v.rent;
  const from = v.situation === "out" ? monthStart(v.to) : v.from;
  const to = v.situation === "in" ? monthEnd(v.from) : v.to;
  const valid = from <= to;
  const results: Record<ProRataMethod, ProRataResult> = {
    annual: proRataRent(monthly, from, valid ? to : from, "annual"),
    month: proRataRent(monthly, from, valid ? to : from, "month"),
  };
  const count = valid ? results.annual.days : 0;
  const gap = results.annual.amount - results.month.amount;
  const wholeMonth = valid && from === monthStart(from) && to === monthEnd(from);

  const setFrom = (iso: string) => {
    if (!iso) return;
    // Pin the other end first, so changing one date never moves the other.
    if (v.situation === "out") {
      st.set("to", to);
      st.set("situation", "custom");
    }
    st.set("from", iso);
  };
  const setTo = (iso: string) => {
    if (!iso) return;
    st.set("from", from);
    st.set("to", iso);
    st.set("situation", "custom");
  };
  const toMonthEnd = () => {
    st.set("from", from);
    st.set("situation", "in");
  };
  const fromMonthStart = () => {
    st.set("to", to);
    st.set("situation", "out");
  };

  const cards: { method: ProRataMethod; name: string; tag: string | null; blurb: string }[] = [
    { method: "annual", name: "365-day method", tag: "What most agreements mean", blurb: "One daily rate all year, so a day costs the same in February as in August." },
    { method: "month", name: "Calendar-month method", tag: null, blurb: "Each month’s rent is split over that month’s own days, so a whole month is exactly a month’s rent." },
  ];

  return (
    <Tool label="Rent calculator for part of a month">
      <div className="sa-rent">
        <div className="sa-rent-inputs">
          <Inputs title="The rent and the days">
            <div className="sa-rent-rentrow">
              <Mini label="Rent" value={v.rent} onChange={st.bind("rent")} prefix="£" dp={2} max={100_000} wide />
              <Pills
                label="Rent is charged"
                hideLabel
                value={v.period}
                onChange={st.bind("period")}
                options={[
                  { value: "month", label: "a month" },
                  { value: "week", label: "a week" },
                ]}
              />
            </div>
            {v.period === "week" && v.rent > 0 && (
              <p className="sa-rent-weeknote">
                {gbp(v.rent, true)} a week is {gbp(monthly, true)} a calendar month (× 52 ÷ 12).
              </p>
            )}
            <DateField label="First day charged" value={from} onChange={setFrom} />
            <DateField label="Last day charged" value={to} onChange={setTo} />
            <div className="sa-rent-quick">
              <button type="button" className="sa-rent-chip" aria-pressed={valid && to === monthEnd(from)} onClick={toMonthEnd}>
                To month end
              </button>
              <button type="button" className="sa-rent-chip" aria-pressed={valid && from === monthStart(to)} onClick={fromMonthStart}>
                From the 1st
              </button>
            </div>
          </Inputs>
        </div>

        <Panel className="sa-rent-calpanel">
          <div className="sa-rent-count" aria-live="polite">
            {valid ? (
              <>
                <p className="sa-rent-countn">
                  <b>{count}</b> {count === 1 ? "day" : "days"} to pay for
                </p>
                <p className="sa-rent-range">
                  {formatDate(from, "short")} to {formatDate(to, "short")} {parse(to).getUTCFullYear()}, counting both days
                </p>
              </>
            ) : (
              <Flag tone="warn" title="Check the dates">
                The last day is before the first day.
              </Flag>
            )}
          </div>
          <RentCalendar from={from} to={to} days={count} />
        </Panel>

        <div className="sa-rent-methods" role="radiogroup" aria-label="How the daily rate is worked out">
          {cards.map((c) => {
            const r = results[c.method];
            const on = v.method === c.method;
            return (
              <label key={c.method} className={`sa-rent-method${on ? " is-on" : ""}`}>
                <input type="radio" name={group} value={c.method} checked={on} onChange={() => st.set("method", c.method)} />
                <span className="sa-rent-methodhead">
                  <span className="sa-rent-methodname">{c.name}</span>
                  {c.tag && <span className="sa-rent-tag">{c.tag}</span>}
                </span>
                <span className="sa-rent-amount" aria-live={on ? "polite" : undefined}>
                  {gbp(valid ? r.amount : 0, true)}
                </span>
                {valid && <Working r={r} monthly={monthly} />}
                <span className="sa-rent-blurb">{c.blurb}</span>
                <span className="sa-rent-pick">{on ? "The method you are using" : "Use this method"}</span>
              </label>
            );
          })}
        </div>

        <Foot>
          <Caveat>
            {valid && Math.abs(gap) >= 0.005 ? (
              <>
                The 365-day method comes to {gbp(Math.abs(gap), true)} {gap > 0 ? "more" : "less"} here.{" "}
              </>
            ) : null}
            {wholeMonth ? "This is a whole calendar month, which is normally just the month’s rent. " : ""}
            Exact arithmetic for either method. Your tenancy agreement decides which one applies; if it says nothing, the 365-day method is the usual reading.
          </Caveat>
          <ShareButton copied={st.copied} onClick={st.share} />
        </Foot>
      </div>

      <RentConverter startWeekly={v.period === "week" ? v.rent : monthlyToWeeklyRent(v.rent)} />
    </Tool>
  );
}
