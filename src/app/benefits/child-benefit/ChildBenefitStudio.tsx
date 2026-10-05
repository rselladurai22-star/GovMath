"use client";

import { childBenefitFor, hicbc } from "@/lib/benefits/family";
import { CHILD_BENEFIT_2026_27 } from "@/lib/benefits/child-benefit";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, Statement } from "@/components/flagship/results";
import { gbp, percent } from "@/components/flagship/format";
import { bool, num, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const SCHEMA = {
  children: num(2, 1, 15),
  weeks: num(52, 1, 52),
  income: num(0, 0, 10_000_000),
  stayHome: bool(false),
};
const ADVANCED = ["weeks", "income", "stayHome"] as const;

export default function ChildBenefitStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const r = childBenefitFor(v.children, v.weeks);
  const charge = v.income > 0 ? hicbc({ children: v.children, income: v.income, pension: 0, giftAid: 0, weeks: v.weeks }) : null;
  const ladder = [1, 2, 3, 4, 5].map((n) => ({ n, b: childBenefitFor(n) }));
  const maxAnnual = Math.max(...ladder.map((l) => l.b.annual), 1);

  return (
    <Studio
      title="Your family"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Work out my Child Benefit"
      onReset={st.reset}
      dock={{ label: "Child Benefit a year", value: gbp(r.forWeeks, true) }}
      inputs={
        <>
          <InputGroup title="Your children">
            <StepperField label="Children you claim for" value={v.children} onChange={(n) => st.set("children", Math.max(1, Math.round(n)))} step={1} min={1} max={15} unit="children" dp={0} hint="Under 16, or under 20 and in approved education or training." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <StepperField label="Weeks you claim in this tax year" value={v.weeks} onChange={(n) => st.set("weeks", Math.round(n))} step={1} min={1} max={52} unit="weeks" dp={0} optional hint="Fewer if a baby is born, or a child leaves education, during the year." />
            <MoneyField label="Higher earner's income a year" value={v.income} onChange={st.bind("income")} optional hint="To check the High Income Child Benefit Charge, which starts at £60,000." />
            <Switch label="One parent is not working, or earns under £6,708" checked={v.stayHome} onChange={st.bind("stayHome")} optional hint="Child Benefit can protect their State Pension." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={v.weeks < 52 ? `Child Benefit for ${v.weeks} weeks` : "Child Benefit a year"}
        value={gbp(r.forWeeks, true)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            For {v.children} {v.children === 1 ? "child" : "children"} you get <b>{gbp(r.weekly, true)}</b> a week, paid as <b>{gbp(r.fourWeekly, true)}</b> every four weeks.
            {charge && charge.charge > 0 ? (
              <>
                {" "}
                With an income of {gbp(v.income)}, the High Income Child Benefit Charge takes back <b>{gbp(charge.charge, true)}</b>, so you keep <b>{gbp(charge.keep, true)}</b>.
              </>
            ) : null}
          </>
        }
        badges={[`${gbp(CHILD_BENEFIT_2026_27.firstChildWeekly, true)} eldest`, `${gbp(CHILD_BENEFIT_2026_27.additionalChildWeekly, true)} each other child`, "Paid every 4 weeks"]}
      />

      <Facts
        items={[
          { label: "A week", value: gbp(r.weekly, true) },
          { label: "Every 4 weeks", value: gbp(r.fourWeekly, true) },
          { label: "A year", value: gbp(r.annual, true) },
          charge
            ? { label: "Tax charge", value: gbp(charge.charge, true), tone: charge.charge > 0 ? "warn" : "good", note: `${percent(charge.share, 0)} clawed back` }
            : { label: "A month (average)", value: gbp(r.annual / 12, true) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Tax year", value: "2026/27" },
          { label: "Rates", value: "£27.05 eldest, £17.90 others" },
          { label: "Weeks", value: `${v.weeks} of 52` },
          { label: "Income", value: v.income > 0 ? gbp(v.income) : "Not entered" },
        ]}
      />

      <ResultCard title="How it adds up" sub="Weekly rates for 2026/27.">
        <Statement
          columns={["A week", "A year"]}
          rows={[
            { label: "Eldest or only child", values: [gbp(CHILD_BENEFIT_2026_27.firstChildWeekly, true), gbp(CHILD_BENEFIT_2026_27.firstChildWeekly * 52, true)] },
            ...(v.children > 1
              ? [
                  {
                    label: `${v.children - 1} other ${v.children - 1 === 1 ? "child" : "children"}`,
                    values: [gbp(CHILD_BENEFIT_2026_27.additionalChildWeekly * (v.children - 1), true), gbp(CHILD_BENEFIT_2026_27.additionalChildWeekly * (v.children - 1) * 52, true)],
                  },
                ]
              : []),
            { label: "Total", values: [gbp(r.weekly, true), gbp(r.annual, true)], kind: "total" },
            ...(charge && charge.charge > 0 ? [{ label: "High Income Child Benefit Charge", values: ["", `−${gbp(charge.charge, true)}`], kind: "deduction" as const }] : []),
          ]}
        />
      </ResultCard>

      <ResultCard title="By number of children" sub="A full year.">
        <Compare
          head={["Children", "A year"]}
          rows={ladder.map(({ n, b }) => ({ label: `${n} ${n === 1 ? "child" : "children"}`, value: gbp(b.annual), bar: b.annual / maxAnnual, current: n === v.children }))}
        />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Getting the most from your claim.">
        {charge && charge.charge > 0 && (
          <Callout tone="warn" title={`You may need to pay ${gbp(charge.charge)} back`}>
            The higher earner pays the charge through Self Assessment or their tax code. Paying {gbp(charge.pensionToAvoid)} more into a pension would bring income down to £60,000 and remove
            it. The High Income Child Benefit Charge calculator has the detail.
          </Callout>
        )}
        {v.stayHome && (
          <Callout tone="good" title="Claim even if you pay it all back">
            The parent named on the claim gets National Insurance credits towards their State Pension while a child is under 12. If income is over £80,000, claim and choose not to be paid:
            you keep the credits and avoid the charge.
          </Callout>
        )}
        <Callout title="Claim soon after the birth">
          Claims can only be backdated three months. Registering the birth first, then claiming online, is the quickest route.
        </Callout>
        <Callout title="Tell HMRC when a 16-year-old stays on">
          Child Benefit stops at 16 unless you confirm they are in approved education or training, such as A levels or a T level. University does not count.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        2026/27 rates. Not financial advice.
      </p>
    </Studio>
  );
}
