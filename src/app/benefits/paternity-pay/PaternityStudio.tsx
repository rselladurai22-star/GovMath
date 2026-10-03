"use client";

import { LOWER_EARNINGS_LIMIT_WEEKLY, paternityPay } from "@/lib/benefits/family";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { gbp } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import s from "@/components/flagship/Flagship.module.css";

const SCHEMA = {
  salary: num(35_000, 0, 10_000_000),
  weeks: oneOf<"1" | "2">("2", ["1", "2"]),
  service: bool(true),
  awe: num(0, 0, 100_000),
  full: num(0, 0, 2),
};
const ADVANCED = ["awe", "full"] as const;
const COLORS = { spp: "#4353ff", employer: "#0f9f6e", lost: "#e11d48" };

export default function PaternityStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const awe = v.awe > 0 ? v.awe : v.salary / 52;
  const weeks = v.weeks === "1" ? 1 : 2;
  const r = paternityPay({ awe, service: v.service, weeks, fullPayWeeks: v.full });
  const ladder = [15_000, 25_000, 35_000, 50_000, 75_000].map((x) => ({ x, p: paternityPay({ awe: x / 52, service: true, weeks, fullPayWeeks: 0 }) }));
  const maxLoss = Math.max(...ladder.map((l) => l.p.shortfall), 1);

  return (
    <Studio
      title="Your paternity leave"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Work out my paternity pay"
      onReset={st.reset}
      dock={{ label: "Paternity pay", value: gbp(r.total, true) }}
      inputs={
        <>
          <InputGroup title="You">
            <MoneyField label="Salary a year, before tax" value={v.salary} onChange={st.bind("salary")} big slider={{ min: 0, max: 100_000, step: 500, ends: ["£0", "£100k"] }} />
            <Segmented
              label="Leave you plan to take"
              value={v.weeks}
              onChange={st.bind("weeks")}
              options={[
                { value: "1", label: "1 week" },
                { value: "2", label: "2 weeks", note: "Taken together or as two separate weeks, within 52 weeks of the birth." },
              ]}
            />
            <Switch label="With my employer for 26 weeks by the 15th week before the due week" checked={v.service} onChange={st.bind("service")} hint="Needed for the pay. The leave itself is a day-one right from April 2026." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <MoneyField label="Average weekly earnings, if you know them" value={v.awe} onChange={st.bind("awe")} pence optional hint="From the 8 weeks before the qualifying week. Overrides the salary." />
            <StepperField label="Weeks your employer pays in full" value={v.full} onChange={(n) => st.set("full", Math.round(n))} step={1} min={0} max={2} unit="weeks" dp={0} optional hint="Some employers top up to full pay." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Paternity pay"
        value={gbp(r.total, true)}
        unit={`for ${weeks} ${weeks === 1 ? "week" : "weeks"}`}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          !r.eligiblePay ? (
            <>
              You can still take {weeks === 1 ? "a week" : "two weeks"} of paternity leave, but you do not qualify for Statutory Paternity Pay
              {!v.service ? " without 26 weeks' service" : ` on earnings under £${LOWER_EARNINGS_LIMIT_WEEKLY} a week`}. Your employer may pay you anyway; check your contract.
            </>
          ) : (
            <>
              Statutory Paternity Pay is <b>{gbp(r.weekly, true)}</b> a week, the lower of £194.32 or 90% of your earnings.{" "}
              {r.employerTopUp > 0 ? <>Your employer adds <b>{gbp(r.employerTopUp, true)}</b>. </> : null}
              Compared with normal pay of <b>{gbp(r.normalPay, true)}</b>, you are <b>{gbp(r.shortfall, true)}</b> down before tax.
            </>
          )
        }
        badges={[`${gbp(r.weekly, true)} a week`, `${gbp(awe, true)} normal weekly pay`, r.eligiblePay ? "Qualifies for SPP" : "Leave only"]}
      />

      <Facts
        items={[
          { label: "SPP a week", value: gbp(r.weekly, true) },
          { label: "SPP in total", value: gbp(r.statutory, true) },
          { label: "Normal pay for the same weeks", value: gbp(r.normalPay, true) },
          { label: "Pay you lose", value: gbp(r.shortfall, true), tone: r.shortfall > 0 ? "warn" : "good" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Rate", value: "£194.32 a week or 90% of earnings" },
          { label: "Earnings", value: v.awe > 0 ? "Average weekly earnings entered" : "Salary ÷ 52" },
          { label: "Employer top-up", value: v.full > 0 ? `${v.full} ${v.full === 1 ? "week" : "weeks"} at full pay` : "None" },
          { label: "Pay shown", value: "Before tax and NI" },
        ]}
      />

      {r.normalPay > 0 && (
        <ResultCard title="Your pay while on leave" sub="Compared with a normal week's pay.">
          <SplitBar
            segments={[
              ...(r.statutory > 0 ? [{ label: "Statutory Paternity Pay", value: r.statutory, display: gbp(r.statutory, true), color: COLORS.spp }] : []),
              ...(r.employerTopUp > 0 ? [{ label: "Employer top-up", value: r.employerTopUp, display: gbp(r.employerTopUp, true), color: COLORS.employer }] : []),
              ...(r.shortfall > 0 ? [{ label: "Pay you lose", value: r.shortfall, display: gbp(r.shortfall, true), color: COLORS.lost }] : []),
            ]}
          />
        </ResultCard>
      )}

      <ResultCard title="Pay lost at other salaries" sub={`${weeks} ${weeks === 1 ? "week" : "weeks"} on statutory pay only.`}>
        <Compare
          head={["Salary", "Pay lost"]}
          rows={ladder.map(({ x, p }) => ({ label: gbp(x), value: gbp(p.shortfall, true), delta: `SPP ${gbp(p.statutory, true)}`, bar: p.shortfall / maxLoss }))}
        />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Planning your leave.">
        <Callout title="A day-one right from April 2026">
          Paternity leave no longer needs 26 weeks&apos; service for leave starting on or after 6 April 2026. The pay still does.
        </Callout>
        <Callout title="Give notice">
          Tell your employer at least 15 weeks before the due week, and at least 28 days before each week of leave. You can take the weeks together or separately within 52 weeks of the
          birth.
        </Callout>
        <Callout title="Want more time off?">
          Shared Parental Leave lets your partner end maternity leave early and share up to 50 weeks of leave and 37 weeks of pay with you. You can now take paternity leave even after
          shared parental leave.
        </Callout>
        {r.eligiblePay && <Callout title="Paternity pay is taxed">SPP goes through payroll, so Income Tax and National Insurance come off as normal.</Callout>}
      </ResultCard>

      <p className={s.hint} style={{ textAlign: "center" }}>
        Great Britain, 2026/27 rates. Not financial advice.
      </p>
    </Studio>
  );
}
