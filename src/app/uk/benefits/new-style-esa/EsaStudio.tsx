"use client";

import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, RadioGroup, Segmented, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, Statement } from "@/components/flagship/results";
import { gbp } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import { NiConditions, NiRecordFields, NI_SCHEMA, niTest } from "@/components/benefits/NiRecordFields";
import { NEW_STYLE_2026, newStyleEsa, type EsaGroup } from "@/lib/benefits/new-style";

const GROUP_LABEL: Record<EsaGroup, string> = {
  assessment: "Assessment phase (first 13 weeks)",
  wrag: "Work-related activity group",
  support: "Support group",
};

const SCHEMA = {
  age: oneOf<"over25" | "under25">("over25", ["over25", "under25"]),
  group: oneOf<EsaGroup>("assessment", ["assessment", "wrag", "support"]),
  ...NI_SCHEMA,
  pension: num(0, 0, 5_000),
  earnings: num(0, 0, 5_000),
  hours: num(0, 0, 60),
  pre2017: bool(false),
};
const ADVANCED = ["pension", "earnings", "hours", "pre2017"] as const;

export default function EsaStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const t = niTest(v);
  const over25 = v.age === "over25";
  const r = newStyleEsa({ over25, group: v.group, pre2017: v.pre2017, pension: v.pension, earnings: v.earnings, hours: v.hours });
  const weekly = t.met ? r.weekly : 0;
  const E = NEW_STYLE_2026.esa;
  const groups = (["assessment", "wrag", "support"] as EsaGroup[]).map((g) => ({
    g,
    w: newStyleEsa({ over25, group: g, pre2017: v.pre2017, pension: v.pension, earnings: v.earnings, hours: v.hours }).weekly,
  }));
  const maxW = Math.max(1, ...groups.map((x) => x.w));

  return (
    <Studio
      title="Your claim and National Insurance record"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Check my New Style ESA"
      onReset={st.reset}
      dock={{ label: "ESA a week", value: gbp(weekly, true) }}
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
            <RadioGroup
              label="Stage of your claim"
              value={v.group}
              onChange={st.bind("group")}
              options={[
                { value: "assessment", label: GROUP_LABEL.assessment },
                { value: "wrag", label: "Work-related activity group (after assessment)" },
                { value: "support", label: "Support group (after assessment)" },
              ]}
              info="After about 13 weeks, the Work Capability Assessment decides your group. The support group is for people who cannot do any work-related activity."
            />
          </InputGroup>
          <InputGroup title="Your National Insurance record">
            <NiRecordFields v={v} set={(k, value) => st.set(k, value as never)} />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <MoneyField label="Private or workplace pension, a week" value={v.pension} onChange={st.bind("pension")} optional pence hint="Before tax. Half of anything over £85 a week is taken off ESA." />
            <MoneyField label="Permitted work earnings, a week" value={v.earnings} onChange={st.bind("earnings")} optional pence hint="You can earn up to £203.50 a week, working under 16 hours, without affecting ESA." />
            <StepperField label="Hours of permitted work a week" value={v.hours} onChange={st.bind("hours")} step={1} min={0} max={60} unit="hours" dp={0} optional />
            <Switch label="Claim started before 3 April 2017" checked={v.pre2017} onChange={st.bind("pre2017")} optional hint="Older claims in the work-related activity group keep the £37.95 component." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="New Style ESA a week"
        value={gbp(weekly, true)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          !t.met ? (
            <>
              On these figures you do <b>not</b> meet the National Insurance conditions for {t.years[0]} and {t.years[1]}. Universal Credit, which depends on income and savings, can include a health element instead.
            </>
          ) : !r.permittedWorkOk ? (
            <>Your work is above the permitted work limit (under 16 hours and up to £203.50 a week), so New Style ESA would stop.</>
          ) : (
            <>
              In the <b>{GROUP_LABEL[v.group].toLowerCase()}</b> you could get <b>{gbp(weekly, true)}</b> a week, or <b>{gbp(weekly * 2, true)}</b> every two weeks.{" "}
              {v.group === "support" ? <>There is no time limit in the support group.</> : v.group === "wrag" ? <>It is paid for up to 365 days in this group.</> : <>After the assessment it may go up.</>}
            </>
          )
        }
        badges={[over25 ? "25 or over" : "Under 25", GROUP_LABEL[v.group].replace(" (first 13 weeks)", ""), t.met ? "NI conditions met" : "NI conditions not met"]}
      />

      <Facts
        items={[
          { label: "Every two weeks", value: gbp(weekly * 2, true) },
          { label: "Time limit", value: r.limitWeeks === null ? "None" : "365 days", tone: r.limitWeeks === null ? "good" : undefined },
          { label: "Counted by UC a month", value: gbp((weekly * 52) / 12, true) },
          { label: "NI conditions", value: t.met ? "Met" : "Not met", tone: t.met ? "good" : "bad" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Rates", value: `2026/27: ${gbp(E.main, true)} main rate, support component ${gbp(E.support, true)}` },
          { label: "Tax years used", value: `${t.years[0]} and ${t.years[1]}, for a claim on this date` },
          { label: "Fit note", value: "You have a fit note from your doctor and are under State Pension age" },
          { label: "Pay", value: "Paid evenly through each year, as an employee" },
        ]}
      />

      <ResultCard title="By stage of claim" sub="Weekly amount on your figures.">
        <Compare head={["Stage", "A week"]} rows={groups.map((x) => ({ label: GROUP_LABEL[x.g], value: gbp(t.met ? x.w : 0, true), bar: x.w / maxW, current: x.g === v.group }))} />
      </ResultCard>

      <ResultCard title="How your weekly amount is worked out">
        <Statement
          columns={["A week"]}
          rows={[
            { label: v.group === "assessment" ? "Assessment rate" : "Main phase rate", values: [gbp(r.basic, true)] },
            ...(r.component > 0 ? [{ label: r.componentLabel ?? "Component", values: [`+ ${gbp(r.component, true)}`] }] : []),
            { label: `Half of pension over £${E.pensionThreshold} a week`, values: [`− ${gbp(r.pensionDeduction, true)}`], kind: "deduction" as const },
            { label: "New Style ESA", values: [gbp(weekly, true)], kind: "total" as const },
          ]}
        />
      </ResultCard>

      <ResultCard title="National Insurance conditions" sub="You need all three.">
        <NiConditions t={t} />
      </ResultCard>

      <ResultCard title="What to do next">
        <Callout title="Claim Universal Credit too">
          Universal Credit counts New Style ESA as income, but can add a health element and help with rent. You will usually have one Work Capability Assessment for both. Check with the{" "}
          <a href="/uk/benefits/universal-credit">Universal Credit calculator</a>.
        </Callout>
        {v.group === "wrag" && (
          <Callout tone="warn" title="365-day limit">
            In the work-related activity group, New Style ESA stops after 365 days. If your condition gets worse, ask to be reassessed: the support group has no time limit.
          </Callout>
        )}
        <Callout title="PIP is separate">
          Personal Independence Payment helps with the extra costs of a condition and is not affected by ESA. Try the <a href="/uk/benefits/pip-points">PIP points self-check</a>.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        2026/27 rates from the DWP. The National Insurance check is an estimate from yearly pay; the DWP decides from your actual record.
      </p>
    </Studio>
  );
}
