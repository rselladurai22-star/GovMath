"use client";

import { monthEnd, monthlyToWeeklyRent, monthStart, proRataRent, weeklyToMonthlyRent, type ProRataMethod } from "@/lib/life/everyday";
import { formatDate } from "@/lib/life/calendar";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, DateField, InputGroup, MoneyField, Segmented } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, Statement } from "@/components/flagship/results";
import { gbp } from "@/components/flagship/format";
import { date, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import s from "@/components/flagship/Flagship.module.css";

type Situation = "in" | "out" | "custom";

const SCHEMA = {
  rent: num(1_200, 0, 100_000),
  period: oneOf<"month" | "week">("month", ["month", "week"]),
  situation: oneOf<Situation>("in", ["in", "out", "custom"]),
  from: date("2026-10-20"),
  to: date("2026-10-31"),
  method: oneOf<ProRataMethod>("annual", ["annual", "month"]),
};
const ADVANCED = ["method"] as const;

const long = (iso: string) => formatDate(iso, "medium");

export default function ProRataStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const monthly = v.period === "week" ? weeklyToMonthlyRent(v.rent) : v.rent;
  const weekly = v.period === "week" ? v.rent : monthlyToWeeklyRent(v.rent);
  const from = v.situation === "out" ? monthStart(v.to) : v.from;
  const to = v.situation === "in" ? monthEnd(v.from) : v.to;
  const valid = from <= to;
  const r = proRataRent(monthly, from, valid ? to : from, v.method);
  const other = proRataRent(monthly, from, valid ? to : from, v.method === "annual" ? "month" : "annual");
  const weeklyBased = (weekly / 7) * r.days;
  const options = [
    { label: "Annual daily rate (× 12 ÷ 365)", value: v.method === "annual" ? r.amount : other.amount, method: "annual" },
    { label: "Days in the month", value: v.method === "month" ? r.amount : other.amount, method: "month" },
    { label: "Weekly rent ÷ 7", value: weeklyBased, method: "week" },
  ];
  const maxOpt = Math.max(1, ...options.map((o) => o.value));
  const deposit = monthly * 12 < 50_000 ? weekly * 5 : weekly * 6;

  return (
    <Studio
      title="Rent and dates"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Work out the rent"
      onReset={st.reset}
      dock={{ label: "Pro-rata rent", value: gbp(r.amount, true) }}
      inputs={
        <>
          <InputGroup title="The rent">
            <MoneyField label={v.period === "week" ? "Weekly rent" : "Monthly rent"} value={v.rent} onChange={st.bind("rent")} />
            <Segmented
              label="Paid"
              value={v.period}
              onChange={st.bind("period")}
              options={[
                { value: "month", label: "Monthly" },
                { value: "week", label: "Weekly" },
              ]}
            />
          </InputGroup>
          <InputGroup title="The part period">
            <Segmented
              label="Situation"
              value={v.situation}
              onChange={st.bind("situation")}
              options={[
                { value: "in", label: "Moving in" },
                { value: "out", label: "Moving out" },
                { value: "custom", label: "Any dates" },
              ]}
            />
            {v.situation !== "out" && <DateField label={v.situation === "in" ? "Move-in date" : "From"} value={v.from} onChange={st.bind("from")} />}
            {v.situation !== "in" && <DateField label={v.situation === "out" ? "Last day of the tenancy" : "To (inclusive)"} value={v.to} onChange={st.bind("to")} />}
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <Segmented
              label="Daily rate method"
              value={v.method}
              onChange={st.bind("method")}
              options={[
                { value: "annual", label: "Annual", note: "Rent × 12 ÷ 365. Used by most agents." },
                { value: "month", label: "Calendar month", note: "Rent ÷ days in that month." },
              ]}
            />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Pro-rata rent"
        value={gbp(r.amount, true)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          !valid ? (
            <>The end date is before the start date. Check the dates.</>
          ) : (
            <>
              From <b>{long(from)}</b> to <b>{long(to)}</b> is <b>{r.days} {r.days === 1 ? "day" : "days"}</b>. At <b>{gbp(r.dailyRate, true)}</b> a day, the rent for that period is <b>{gbp(r.amount, true)}</b>.
              The other method gives <b>{gbp(other.amount, true)}</b>.
            </>
          )
        }
        badges={[`${gbp(r.dailyRate, true)} a day`, `${r.days} days`, v.method === "annual" ? "Annual method" : "Calendar month method"]}
      />

      <Facts
        items={[
          { label: "Monthly rent", value: gbp(monthly, true) },
          { label: "Weekly equivalent", value: gbp(weekly, true) },
          { label: "Daily rate", value: gbp(r.dailyRate, true) },
          { label: "Pro-rata rent", value: gbp(r.amount, true), tone: "good" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Dates", value: "Both the first and last day counted" },
          { label: "Method", value: v.method === "annual" ? `× 12 ÷ ${r.periodDays}` : `÷ ${r.periodDays} days in the month` },
          { label: "Weekly to monthly", value: "× 52 ÷ 12" },
          { label: "Check", value: "Your tenancy agreement may set a method" },
        ]}
      />

      <ResultCard title="Three ways to work it out" sub={`For ${r.days} days.`}>
        <Compare head={["Method", "Rent"]} rows={options.map((o) => ({ label: o.label, value: gbp(o.value, true), bar: o.value / maxOpt, current: o.method === v.method }))} />
      </ResultCard>

      <ResultCard title="The working" sub="Using your chosen method.">
        <Statement
          columns={["Amount"]}
          rows={[
            { label: v.method === "annual" ? `${gbp(monthly, true)} × 12` : `${gbp(monthly, true)} a month`, values: [gbp(v.method === "annual" ? monthly * 12 : monthly, true)] },
            { label: `÷ ${r.periodDays} days`, values: [gbp(r.dailyRate, true)] },
            { label: `× ${r.days} days`, values: [gbp(r.amount, true)], kind: "total" as const },
          ]}
        />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Rent and deposits.">
        <Callout title="Deposit cap">
          In England, a tenancy deposit is capped at 5 weeks&apos; rent where annual rent is under £50,000. For this rent that is {gbp(deposit, true)}. A holding deposit is capped at 1 week&apos;s rent, {gbp(weekly, true)}.
        </Callout>
        <Callout title="Moving out mid-month">
          You usually owe rent until the tenancy ends, not the day you leave. A tenancy that ends on the last day of a rent period avoids a part month.
        </Callout>
      </ResultCard>

      <p className={s.hint} style={{ textAlign: "center" }}>
        Your tenancy agreement decides how part periods are charged.
      </p>
    </Studio>
  );
}
