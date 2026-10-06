"use client";

import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Facts, ResultCard, Statement } from "@/components/flagship/results";
import { gbp } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import { NiConditions, NiRecordFields, NI_SCHEMA, niTest } from "@/components/benefits/NiRecordFields";
import { NEW_STYLE_2026, newStyleJsa } from "@/lib/benefits/new-style";

const SCHEMA = {
  age: oneOf<"over25" | "under25">("over25", ["over25", "under25"]),
  ...NI_SCHEMA,
  pension: num(0, 0, 5_000),
  earnings: num(0, 0, 5_000),
  hours: num(0, 0, 60),
};
const ADVANCED = ["pension", "earnings", "hours"] as const;

export default function JsaStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const t = niTest(v);
  const r = newStyleJsa({ over25: v.age === "over25", pension: v.pension, earnings: v.earnings, hours: v.hours });
  const weekly = t.met ? r.weekly : 0;
  const J = NEW_STYLE_2026.jsa;

  return (
    <Studio
      title="Your age and National Insurance record"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Check my New Style JSA"
      onReset={st.reset}
      dock={{ label: "JSA a week", value: gbp(weekly, true) }}
      inputs={
        <>
          <InputGroup title="About you">
            <Segmented
              label="Your age"
              value={v.age}
              onChange={st.bind("age")}
              options={[
                { value: "over25", label: "25 or over" },
                { value: "under25", label: "Under 25" },
              ]}
            />
          </InputGroup>
          <InputGroup title="Your National Insurance record">
            <NiRecordFields v={v} set={(k, value) => st.set(k, value as never)} />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <MoneyField label="Private or workplace pension, a week" value={v.pension} onChange={st.bind("pension")} optional pence hint="Before tax. Pension over £50 a week reduces JSA pound for pound." />
            <MoneyField label="Part-time earnings, a week" value={v.earnings} onChange={st.bind("earnings")} optional pence hint="After tax, National Insurance and half of any pension contribution. The first £5 is ignored." />
            <StepperField label="Hours of paid work a week" value={v.hours} onChange={st.bind("hours")} step={1} min={0} max={60} unit="hours" dp={0} optional hint="Working 16 hours or more a week stops JSA." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="New Style JSA a week"
        value={gbp(weekly, true)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          !t.met ? (
            <>
              On these figures you do <b>not</b> meet the National Insurance conditions for {t.years[0]} and {t.years[1]}. You may still get{" "}
              <a href="/benefits/universal-credit">Universal Credit</a>, which depends on income and savings instead.
            </>
          ) : r.tooManyHours ? (
            <>
              You meet the National Insurance conditions, but working <b>16 hours or more</b> a week stops New Style JSA.
            </>
          ) : (
            <>
              You could get <b>{gbp(weekly, true)}</b> a week, paid every two weeks as <b>{gbp(weekly * 2, true)}</b>, for up to <b>26 weeks</b>: <b>{gbp(weekly * J.weeks)}</b>{" "}in all. It is not affected by
              savings or a partner&rsquo;s income.
            </>
          )
        }
        badges={[v.age === "over25" ? "25 or over" : "Under 25", t.met ? "NI conditions met" : "NI conditions not met", "Up to 26 weeks"]}
      />

      <Facts
        items={[
          { label: "Every two weeks", value: gbp(weekly * 2, true) },
          { label: "Over 26 weeks", value: gbp(weekly * J.weeks) },
          { label: "Counted by UC a month", value: gbp((weekly * 52) / 12, true) },
          { label: "NI conditions", value: t.met ? "Met" : "Not met", tone: t.met ? "good" : "bad" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Rates", value: `2026/27: ${gbp(J.over25, true)} a week at 25 or over, ${gbp(J.under25, true)} under 25` },
          { label: "Tax years used", value: `${t.years[0]} and ${t.years[1]}, for a claim on this date` },
          { label: "Pay", value: "Paid evenly through each year, as an employee" },
          { label: "Work search", value: "You are available for and looking for work, as agreed in your Claimant Commitment" },
        ]}
      />

      <ResultCard title="National Insurance conditions" sub="You need all three.">
        <NiConditions t={t} />
      </ResultCard>

      <ResultCard title="How your weekly amount is worked out">
        <Statement
          columns={["A week"]}
          rows={[
            { label: "Personal rate", values: [gbp(r.personal, true)] },
            { label: `Pension over £${J.pensionThreshold} a week`, values: [`− ${gbp(r.pensionDeduction, true)}`], kind: "deduction" },
            { label: `Earnings over £${J.earningsDisregard} a week`, values: [`− ${gbp(r.earningsDeduction, true)}`], kind: "deduction" },
            { label: "New Style JSA", values: [gbp(weekly, true)], kind: "total" },
          ]}
        />
      </ResultCard>

      <ResultCard title="What to do next">
        <Callout title="Claiming alongside Universal Credit">
          You can get both. Universal Credit counts New Style JSA as income, so your UC award falls by {gbp((weekly * 52) / 12, true)} a month, but JSA is still worth claiming: it is not affected by savings or a
          partner&rsquo;s earnings, and it can keep paying if your UC stops. Check with the <a href="/benefits/universal-credit">Universal Credit calculator</a>.
        </Callout>
        {!t.met && (
          <Callout tone="warn" title="Check your National Insurance record">
            Your record on GOV.UK shows each year as full or not. Gaps from caring, sickness or claiming benefits are often filled by credits, which count for the second condition.
          </Callout>
        )}
        <Callout title="Claim online">
          Claim New Style JSA on GOV.UK. Payment starts after 7 waiting days. Your work coach agrees a Claimant Commitment with you; missing appointments can lead to a sanction.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        2026/27 rates from the DWP. The National Insurance check is an estimate from yearly pay; the DWP decides from your actual record.
      </p>
    </Studio>
  );
}
