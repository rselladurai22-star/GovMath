"use client";

import { sharedParental } from "@/lib/benefits/family";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { gbp } from "@/components/flagship/format";
import { num, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import s from "@/components/flagship/Flagship.module.css";

const SCHEMA = {
  salaryA: num(36_000, 0, 10_000_000),
  salaryB: num(42_000, 0, 10_000_000),
  mat: num(20, 2, 52),
  partner: num(12, 0, 50),
  motherShared: num(0, 0, 50),
};
const ADVANCED = ["motherShared"] as const;
const COLORS = { mother: "#5b1e6e", partner: "#0f9f6e", unpaid: "#cbd5e1" };

export default function SharedStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const base = { aweA: v.salaryA / 52, aweB: v.salaryB / 52 };
  const r = sharedParental({ ...base, maternityWeeks: v.mat, partnerWeeks: v.partner, motherSharedWeeks: v.motherShared });
  const scenarios = [
    { label: "Mother takes all 52 weeks", x: sharedParental({ ...base, maternityWeeks: 52, partnerWeeks: 0, motherSharedWeeks: 0 }) },
    { label: "Switch after 6 weeks, partner takes 33", x: sharedParental({ ...base, maternityWeeks: 6, partnerWeeks: 33, motherSharedWeeks: 0 }) },
    { label: "Split equally: 26 weeks each", x: sharedParental({ ...base, maternityWeeks: 26, partnerWeeks: 26, motherSharedWeeks: 0 }) },
    { label: "Your plan", x: r },
  ];
  const maxTotal = Math.max(...scenarios.map((x) => x.x.total), 1);
  const totalWeeks = r.maternityWeeks + r.partnerWeeks + r.motherSharedWeeks;

  return (
    <Studio
      title="Your leave plan"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Work out our shared pay"
      onReset={st.reset}
      dock={{ label: "Statutory pay in total", value: gbp(r.total) }}
      inputs={
        <>
          <InputGroup title="Your pay">
            <MoneyField label="Mother's salary a year" value={v.salaryA} onChange={st.bind("salaryA")} big hint="Or the main adopter. Before tax." />
            <MoneyField label="Partner's salary a year" value={v.salaryB} onChange={st.bind("salaryB")} />
          </InputGroup>
          <InputGroup title="How you split the year">
            <StepperField label="Weeks of maternity leave before switching" value={v.mat} onChange={(n) => st.set("mat", Math.round(n))} step={1} min={2} max={52} unit="weeks" dp={0} hint="At least 2 weeks after the birth are compulsory. The rest of the 52 weeks can be shared." />
            <StepperField label="Weeks of shared leave the partner takes" value={v.partner} onChange={(n) => st.set("partner", Math.round(n))} step={1} min={0} max={50} unit="weeks" dp={0} />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <StepperField label="Weeks of shared leave the mother takes" value={v.motherShared} onChange={(n) => st.set("motherShared", Math.round(n))} step={1} min={0} max={50} unit="weeks" dp={0} optional hint="Shared leave the mother takes after ending maternity leave, for example to be off at the same time as the partner." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Statutory pay for the family"
        value={gbp(r.total)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            The mother gets <b>{gbp(r.motherPay)}</b> over {r.maternityWeeks} weeks of maternity leave{r.motherSharedWeeks > 0 ? " and her shared weeks" : ""}. The partner gets{" "}
            <b>{gbp(r.partnerPay)}</b> for {r.partnerPaidWeeks} paid {r.partnerPaidWeeks === 1 ? "week" : "weeks"}
            {r.partnerWeeks > r.partnerPaidWeeks ? <> and {r.partnerWeeks - r.partnerPaidWeeks} unpaid</> : null}.{" "}
            {r.unusedPay > 0 ? <>{r.unusedPay} paid weeks are left unused.</> : <>All 39 paid weeks are used.</>}
          </>
        }
        badges={[`${r.sharedLeaveAvailable} weeks to share`, `${r.sharedPayAvailable} paid weeks to share`, `${totalWeeks} of 52 weeks used`]}
      />

      <Facts
        items={[
          { label: "Mother's pay", value: gbp(r.motherPay) },
          { label: "Partner's pay", value: gbp(r.partnerPay) },
          { label: "Leave left unused", value: `${r.unusedLeave} weeks`, tone: r.unusedLeave > 0 ? "warn" : "good" },
          { label: "Paid weeks unused", value: `${r.unusedPay} weeks`, tone: r.unusedPay > 0 ? "warn" : "good" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Both parents", value: "Eligible for statutory pay" },
          { label: "Weekly pay", value: "£194.32 or 90% of earnings" },
          { label: "Employer schemes", value: "Not included" },
          { label: "Pay", value: "Before tax and NI" },
        ]}
      />

      {r.overLeave && (
        <Callout tone="warn" title="That is more leave than you can share">
          After {r.maternityWeeks} weeks of maternity leave, there are {r.sharedLeaveAvailable} weeks left to share. Reduce the shared weeks.
        </Callout>
      )}

      <ResultCard title="How the 52 weeks are used" sub="Weeks, not pounds.">
        <SplitBar
          segments={[
            { label: "Mother: maternity leave", value: r.maternityWeeks, display: `${r.maternityWeeks} weeks`, color: COLORS.mother },
            ...(r.motherSharedWeeks > 0 ? [{ label: "Mother: shared leave", value: r.motherSharedWeeks, display: `${r.motherSharedWeeks} weeks`, color: "#6366f1" }] : []),
            ...(r.partnerWeeks > 0 ? [{ label: "Partner: shared leave", value: r.partnerWeeks, display: `${r.partnerWeeks} weeks`, color: COLORS.partner }] : []),
            ...(r.unusedLeave > 0 ? [{ label: "Unused", value: r.unusedLeave, display: `${r.unusedLeave} weeks`, color: COLORS.unpaid }] : []),
          ]}
        />
        <Statement
          columns={["Weeks", "Pay"]}
          rows={[
            { label: "Mother: maternity leave", values: [String(r.maternityWeeks), gbp(r.motherPay - r.motherShppWeekly * r.motherSharedPaidWeeks)] },
            ...(r.motherSharedWeeks > 0 ? [{ label: "Mother: shared parental leave", values: [String(r.motherSharedWeeks), gbp(r.motherShppWeekly * r.motherSharedPaidWeeks)] }] : []),
            { label: `Partner: shared parental leave at ${gbp(r.partnerWeekly, true)}`, values: [String(r.partnerWeeks), gbp(r.partnerPay)] },
            { label: "Total", values: [String(totalWeeks), gbp(r.total)], kind: "total" },
          ]}
        />
      </ResultCard>

      <ResultCard title="Other ways to split it" sub="Statutory pay only, same salaries.">
        <Compare
          head={["Plan", "Total pay"]}
          rows={scenarios.map((x, i) => ({ label: x.label, value: gbp(x.x.total), bar: x.x.total / maxTotal, current: i === scenarios.length - 1 }))}
        />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Before you book the leave.">
        {r.maternityWeeks < 6 && (
          <Callout tone="warn" title="Switching before 6 weeks loses money">
            The first 6 weeks of maternity pay are at 90% of earnings with no cap. Shared parental pay is never more than £194.32 a week, so ending maternity leave earlier gives up
            the higher rate.
          </Callout>
        )}
        <Callout title="Both parents must qualify">
          The parent taking shared leave needs 26 weeks with their employer by the 15th week before the due week and earnings of at least £129 a week. The other parent must have worked
          26 of the 66 weeks before the due week and earned £390 in 13 of them.
        </Callout>
        <Callout title="Up to three blocks each, with 8 weeks' notice">
          Each parent can book up to three separate blocks of leave and must give 8 weeks&apos; notice of each. Employers can refuse a discontinuous block but not a continuous one.
        </Callout>
        <Callout title="Check employer schemes">
          Many employers pay enhanced maternity pay but only statutory shared parental pay. The best plan in pounds may differ from the statutory figures here.
        </Callout>
      </ResultCard>

      <p className={s.hint} style={{ textAlign: "center" }}>
        Great Britain, 2026/27 rates. Not financial advice.
      </p>
    </Studio>
  );
}
