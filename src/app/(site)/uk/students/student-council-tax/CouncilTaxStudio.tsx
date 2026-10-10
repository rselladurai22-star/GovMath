"use client";

import { studentCouncilTax } from "@/lib/students/loans";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, SelectField, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard } from "@/components/flagship/results";
import { gbp, per } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

type Nation = "england" | "wales" | "scotland" | "ni";

const SCHEMA = {
  students: num(3, 0, 20),
  others: num(0, 0, 20),
  bill: num(2_200, 0, 20_000),
  months: num(12, 0, 12),
  nation: oneOf<Nation>("england", ["england", "wales", "scotland", "ni"]),
};
const ADVANCED = ["months", "nation"] as const;

export default function CouncilTaxStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const ni = v.nation === "ni";
  const r = studentCouncilTax({ students: v.students, others: v.others, bill: v.bill, months: v.months });
  const scenarios = [0, 1, 2].map((o) => ({ o, r: studentCouncilTax({ students: Math.max(1, Math.round(v.students)), others: o, bill: v.bill, months: v.months }) }));
  const maxPay = Math.max(1, ...scenarios.map((x) => x.r.pay));

  return (
    <Studio
      title="Your household"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Check my council tax"
      onReset={st.reset}
      dock={{ label: "Council tax to pay", value: ni ? "Rates apply" : gbp(r.pay) }}
      inputs={
        <>
          <InputGroup title="Who lives there">
            <StepperField label="Full-time students" value={v.students} onChange={(n) => st.set("students", Math.round(n))} step={1} min={0} max={20} unit="people" dp={0} hint="Include student nurses, under-20s at school or college, and other disregarded people." />
            <StepperField label="Adults who are not students" value={v.others} onChange={(n) => st.set("others", Math.round(n))} step={1} min={0} max={20} unit="people" dp={0} hint="Aged 18 or over." />
          </InputGroup>
          <InputGroup title="The bill">
            <MoneyField label="Full council tax for the year" value={v.bill} onChange={st.bind("bill")} hint="For the property's band, from your council's website." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <StepperField label="Months in this situation" value={v.months} onChange={(n) => st.set("months", Math.round(n))} step={1} min={0} max={12} unit="months" dp={0} optional hint="For example, the months until your course ends." />
            <SelectField
              label="Nation"
              value={v.nation}
              onChange={st.bind("nation")}
              optional
              options={[
                { value: "england", label: "England" },
                { value: "wales", label: "Wales" },
                { value: "scotland", label: "Scotland" },
                { value: "ni", label: "Northern Ireland" },
              ]}
            />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={ni ? "Northern Ireland" : r.kind === "exempt" ? "Your home is exempt" : "Council tax to pay"}
        value={ni ? "Domestic rates" : gbp(r.pay)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          ni ? (
            <>Northern Ireland has domestic rates instead of council tax, and there is no general exemption for student households. Rates are often included in the rent; check your tenancy agreement.</>
          ) : (
            <>
              {r.explanation} {r.saving > 0 ? <>That saves <b>{gbp(r.saving)}</b> on a full bill of {gbp(v.bill * (v.months / 12))}.</> : null}
            </>
          )
        }
        badges={ni ? ["Rates, not council tax"] : [r.kind === "exempt" ? "Exempt" : r.kind === "discount" ? "25% discount" : "Full bill", `${Math.round(v.months)} ${per(Math.round(v.months), "months")}`]}
      />

      <Facts
        items={[
          { label: "Full bill", value: gbp(v.bill * (v.months / 12)) },
          { label: "Saving", value: ni ? "n/a" : gbp(r.saving), tone: "good" },
          { label: "To pay", value: ni ? "n/a" : gbp(r.pay) },
          { label: "Each non-student", value: ni || v.others === 0 ? "n/a" : gbp(r.pay / Math.max(1, v.others)) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Student", value: "Course of at least 24 weeks a year and 21 hours a week" },
          { label: "Proof", value: "A council tax exemption certificate from your university or college" },
          { label: "Bill", value: "Your property's band, before any other discounts or support" },
        ]}
      />

      <ResultCard title="How the bill changes" sub={`${Math.max(1, Math.round(v.students))} student${Math.round(v.students) === 1 ? "" : "s"} plus other adults.`}>
        <Compare head={["Other adults", "To pay"]} rows={scenarios.map((x) => ({ label: x.o === 0 ? "None" : `${x.o}`, value: gbp(x.r.pay), bar: x.r.pay / maxPay, current: x.o === Math.min(2, Math.round(v.others)) }))} />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Claiming it.">
        <Callout title="Tell the council">The exemption is not automatic. Send each student&apos;s certificate to the council, usually online.</Callout>
        <Callout tone="warn" title="After you graduate">The exemption ends the day after your course finishes. Tell the council if you stay on in the property.</Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Check with your council: local rules, discounts and support can apply.
      </p>
    </Studio>
  );
}
