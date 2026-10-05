"use client";

import { HEALTHY_START, healthyStartEligible, healthyStartOver } from "@/lib/life/health";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, SelectField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Facts, ResultCard, Statement } from "@/components/flagship/results";
import { gbp } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import s from "@/components/flagship/Flagship.module.css";

type Benefit = "uc-low" | "uc-high" | "other" | "esa" | "none";

const SCHEMA = {
  benefit: oneOf<Benefit>("uc-low", ["uc-low", "uc-high", "other", "esa", "none"]),
  pregnant: bool(false),
  weeks: num(14, 0, 42),
  kids: num(1, 0, 4),
  age1: num(6, 0, 59),
  age2: num(30, 0, 59),
  age3: num(30, 0, 59),
  age4: num(30, 0, 59),
  under18: bool(false),
};
const ADVANCED = ["under18"] as const;
const AGE_KEYS = ["age1", "age2", "age3", "age4"] as const;

export default function HealthyStartStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const ages = AGE_KEYS.slice(0, v.kids).map((k) => v[k]);
  const under4 = ages.filter((a) => a < 48);
  const pregnantWeeks = v.pregnant ? Math.max(1, v.weeks) : 0;
  const eligible = healthyStartEligible({
    ucLowEarnings: v.benefit === "uc-low",
    otherBenefit: v.benefit === "other",
    esa: v.benefit === "esa",
    under18: v.under18,
    pregnant: v.pregnant,
    hasChildUnder4: under4.length > 0,
  });
  const year = healthyStartOver(52, under4, pregnantWeeks);
  const weekly = eligible ? year.weekly[0] : 0;
  const total = eligible ? year.total : 0;
  const nowUnder1 = under4.filter((a) => a < 12).length;
  const now1to4 = under4.length - nowUnder1;
  const pregNow = v.pregnant && v.weeks >= HEALTHY_START.pregnancyFromWeek && v.weeks < 40;
  const waitWeeks = v.pregnant && v.weeks < HEALTHY_START.pregnancyFromWeek ? HEALTHY_START.pregnancyFromWeek - v.weeks : 0;

  return (
    <Studio
      title="Your family"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Check Healthy Start"
      onReset={st.reset}
      dock={{ label: "Healthy Start a week", value: gbp(weekly, true) }}
      inputs={
        <>
          <InputGroup title="Your benefits">
            <SelectField
              label="What you get"
              value={v.benefit}
              onChange={st.bind("benefit")}
              options={[
                { value: "uc-low", label: "Universal Credit, family take-home pay £408 a month or less" },
                { value: "uc-high", label: "Universal Credit, family take-home pay over £408 a month" },
                { value: "other", label: "Income Support, income-based JSA, or Pension Credit with a child addition" },
                { value: "esa", label: "Income-related ESA only" },
                { value: "none", label: "None of these" },
              ]}
              hint="Take-home pay means earnings after tax and National Insurance."
            />
          </InputGroup>
          <InputGroup title="Pregnancy and children">
            <Switch label="Pregnant" checked={v.pregnant} onChange={st.bind("pregnant")} />
            {v.pregnant && <StepperField label="Weeks pregnant" value={v.weeks} onChange={st.bind("weeks")} step={1} min={1} max={42} unit="weeks" dp={0} hint="Payments start from 10 weeks." />}
            <StepperField label="Children under 4" value={v.kids} onChange={(n) => st.set("kids", Math.round(n))} step={1} min={0} max={4} unit="children" dp={0} />
            {AGE_KEYS.slice(0, v.kids).map((k, i) => (
              <StepperField key={k} label={`Child ${i + 1}: age in months`} value={v[k]} onChange={(n) => st.set(k, Math.round(n))} step={1} min={0} max={47} unit="months" dp={0} />
            ))}
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <Switch label="I am under 18" checked={v.under18} onChange={st.bind("under18")} optional hint="Pregnant under-18s qualify without any benefit." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={eligible ? "Healthy Start a week" : "Healthy Start"}
        value={gbp(weekly, true)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          !v.pregnant && under4.length === 0 ? (
            <>Healthy Start is for people at least 10 weeks pregnant or with a child under 4. Add a pregnancy or a child to check.</>
          ) : !eligible ? (
            <>
              On these answers you would not qualify.{" "}
              {v.benefit === "uc-high" ? "On Universal Credit, family take-home pay must be £408 a month or less." : v.benefit === "esa" ? "Income-related ESA only qualifies during pregnancy." : "You need one of the qualifying benefits, unless you are pregnant and under 18."}
            </>
          ) : (
            <>
              You could get <b>{gbp(weekly, true)}</b> a week, paid onto a Healthy Start card every 4 weeks as <b>{gbp(weekly * 4, true)}</b>. Over the next year that adds up to about{" "}
              <b>{gbp(total)}</b>, plus free vitamins.
              {waitWeeks > 0 ? <> Pregnancy payments start in {waitWeeks} {waitWeeks === 1 ? "week" : "weeks"}.</> : null}
            </>
          )
        }
        badges={[eligible ? "Likely eligible" : "Not eligible on these answers", `${gbp(weekly * 4, true)} every 4 weeks`, "Free vitamins"]}
      />

      <Facts
        items={[
          { label: "A week now", value: gbp(weekly, true) },
          { label: "Every 4 weeks", value: gbp(weekly * 4, true) },
          { label: "Next 12 months", value: gbp(total), tone: total > 0 ? "good" : undefined },
          { label: "Vitamins", value: eligible ? "Free" : "—" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Rates", value: "From April 2026" },
          { label: "Pregnancy", value: "From 10 weeks; birth taken as 40 weeks" },
          { label: "Where", value: "England, Wales and Northern Ireland" },
          { label: "Projection", value: "Children move to the lower rate at 1 and stop at 4" },
        ]}
      />

      {eligible && (
        <ResultCard title="What makes up your payment" sub="A week, now.">
          <Statement
            columns={["A week"]}
            rows={[
              ...(pregNow ? [{ label: "Pregnancy", values: [gbp(HEALTHY_START.pregnancy, true)] }] : []),
              ...(nowUnder1 > 0 ? [{ label: `${nowUnder1} ${nowUnder1 === 1 ? "child" : "children"} under 1`, values: [gbp(nowUnder1 * HEALTHY_START.under1, true)] }] : []),
              ...(now1to4 > 0 ? [{ label: `${now1to4} ${now1to4 === 1 ? "child" : "children"} aged 1 to 3`, values: [gbp(now1to4 * HEALTHY_START.age1to4, true)] }] : []),
              { label: "Total", values: [gbp(weekly, true)], kind: "total" as const },
            ]}
          />
        </ResultCard>
      )}

      {eligible && total > 0 && (
        <ResultCard title="Your payments over the next year" sub="A week. Rates change as children have birthdays.">
          <AreaChart
            ariaLabel="Healthy Start each week for a year"
            series={[{ key: "hs", label: "Healthy Start", color: "#16a34a", values: year.weekly, fill: true }]}
            xLabel={(i) => `Wk ${i}`}
            yFormat={(n) => gbp(n, true)}
            initial={0}
            hint="Drag across the chart, or use the arrow keys, to read any week."
            readout={(i) => (
              <>
                In week <b>{i}</b>: <b>{gbp(year.weekly[i] ?? 0, true)}</b>.
              </>
            )}
          />
        </ResultCard>
      )}

      <ResultCard title="Worth knowing" sub="Using your card.">
        <Callout title="What you can buy">
          Plain cow&apos;s milk, fresh, frozen or tinned fruit and vegetables, fresh, dried and tinned pulses, and first infant formula, in any shop that takes Mastercard.
        </Callout>
        <Callout title="Free vitamins">
          The scheme also gives free vitamins: pregnancy vitamins with folic acid and vitamin D, and vitamin drops for children from birth to 4.
        </Callout>
        {v.benefit === "none" && (
          <Callout title="Check your benefits first">
            Many families on low incomes are entitled to Universal Credit without knowing. The <a href="/benefits/universal-credit">Universal Credit calculator</a> gives an estimate.
          </Callout>
        )}
      </ResultCard>

      <p className={s.hint} style={{ textAlign: "center" }}>
        April 2026 rates. Scotland has Best Start Foods instead. An estimate, not a decision.
      </p>
    </Studio>
  );
}
