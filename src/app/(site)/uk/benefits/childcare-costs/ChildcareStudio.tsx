"use client";

import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, SelectField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { gbp } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import { childcareCosts, type CareStage } from "@/lib/benefits/families";

const STAGES: CareStage[] = ["under9m", "9m-2", "2", "3-4", "school"];
const STAGE_LABEL: Record<CareStage, string> = {
  under9m: "Under 9 months",
  "9m-2": "9 months to 2 years",
  "2": "2 years old",
  "3-4": "3 or 4 years old",
  school: "At school (5 to 11)",
};

const SCHEMA = {
  kids: num(1, 1, 3),
  s1: oneOf<CareStage>("3-4", STAGES),
  h1: num(40, 0, 60),
  s2: oneOf<CareStage>("school", STAGES),
  h2: num(15, 0, 60),
  s3: oneOf<CareStage>("school", STAGES),
  h3: num(15, 0, 60),
  rate: num(7.5, 0, 50),
  weeks: num(48, 1, 52),
  working: bool(true),
  uc: bool(false),
  lowIncome: bool(false),
  over100k: bool(false),
};
const ADVANCED = ["weeks", "lowIncome", "over100k"] as const;

export default function ChildcareStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const kids = [
    { stage: v.s1, hours: v.h1 },
    { stage: v.s2, hours: v.h2 },
    { stage: v.s3, hours: v.h3 },
  ].slice(0, v.kids);
  const r = childcareCosts({ children: kids, hourlyRate: v.rate, weeks: v.weeks, working: v.working, lowIncome: v.lowIncome, over100k: v.over100k });
  const help = v.uc ? r.uc : r.tfc;
  const pay = r.afterFunded - help;
  const funded = r.children.find((c) => c.hoursPerWeek > 0);
  const scheme = v.uc ? "Universal Credit childcare" : r.tfcAvailable ? "Tax-Free Childcare" : "No top-up";
  const slots = [
    ["s1", "h1"],
    ["s2", "h2"],
    ["s3", "h3"],
  ] as const;

  return (
    <Studio
      title="Your children and childcare"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Work out my childcare costs"
      onReset={st.reset}
      dock={{ label: "You pay a month", value: gbp(pay / 12) }}
      inputs={
        <>
          <InputGroup title="Your children">
            <StepperField label="Children in childcare" value={v.kids} onChange={(n) => st.set("kids", Math.round(n))} step={1} min={1} max={3} unit="children" dp={0} />
            {slots.slice(0, v.kids).map(([s, h], i) => (
              <div key={s}>
                <SelectField label={`Child ${i + 1}: age`} value={v[s]} onChange={st.bind(s)} options={STAGES.map((x) => ({ value: x, label: STAGE_LABEL[x] }))} />
                <StepperField label={`Child ${i + 1}: hours a week`} value={v[h]} onChange={st.bind(h)} step={1} min={0} max={60} unit="hours" dp={0} />
              </div>
            ))}
          </InputGroup>
          <InputGroup title="Cost and your situation">
            <MoneyField label="Hourly rate" value={v.rate} onChange={st.bind("rate")} pence hint="What your nursery, childminder or club charges an hour. Divide a daily rate by the hours in the day." />
            <Switch label="Every parent in the home works" checked={v.working} onChange={st.bind("working")} hint="Earning at least 16 hours a week at the minimum wage (about £203 a week at 21 or over). Needed for 30 hours and Tax-Free Childcare." />
            <Switch label="We get Universal Credit" checked={v.uc} onChange={st.bind("uc")} hint="Universal Credit pays back 85% of childcare costs instead of Tax-Free Childcare. You cannot have both." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <StepperField label="Weeks a year you use childcare" value={v.weeks} onChange={st.bind("weeks")} step={1} min={1} max={52} unit="weeks" dp={0} optional hint="Term time only is 38 weeks; most nurseries charge for 48 to 51." />
            <Switch label="On certain benefits or a low income" checked={v.lowIncome} onChange={st.bind("lowIncome")} optional hint="For 15 free hours for some 2-year-olds when parents are not working." />
            <Switch label="Either parent earns over £100,000" checked={v.over100k} onChange={st.bind("over100k")} optional hint="Adjusted net income over £100,000 rules out Tax-Free Childcare and the working-parent hours." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="You pay a month"
        value={gbp(pay / 12)}
        unit={`${gbp(pay)} a year`}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            Childcare would cost <b>{gbp(r.fullCost)}</b> a year. Funded hours cover <b>{gbp(r.funded)}</b>
            {help > 0 ? (
              <>
                {" "}
                and {scheme} pays <b>{gbp(help)}</b>
              </>
            ) : null}
            , so you pay <b>{gbp(pay)}</b>, about <b>{gbp(pay / 12)}</b> a month.
          </>
        }
        badges={[`${v.kids} ${v.kids === 1 ? "child" : "children"}`, scheme, `${v.weeks} weeks a year`]}
      />

      <Facts
        items={[
          { label: "Full cost a year", value: gbp(r.fullCost) },
          { label: "Funded hours worth", value: gbp(r.funded), tone: r.funded > 0 ? "good" : undefined },
          { label: v.uc ? "UC childcare a year" : "Tax-Free Childcare", value: gbp(help), tone: help > 0 ? "good" : undefined },
          { label: "You pay a week", value: gbp(pay / v.weeks) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Where", value: "England, from September 2025 funded hours" },
          { label: "Funded hours", value: "Used in term time (38 weeks), worth your provider's hourly rate" },
          { label: "Extras", value: "No charges for meals or consumables" },
          { label: "Universal Credit", value: v.uc ? "Costs paid by you are reported each month, up to the cap" : "Not claimed" },
        ]}
      />

      <ResultCard title="Who pays for your childcare" sub="A year.">
        <SplitBar
          segments={[
            { label: "Funded hours", value: r.funded, display: gbp(r.funded), color: "#0f9f6e" },
            { label: v.uc ? "Universal Credit" : "Tax-Free Childcare", value: help, display: gbp(help), color: "#5b1e6e" },
            { label: "You pay", value: pay, display: gbp(pay), color: "#f59e0b" },
          ]}
        />
      </ResultCard>

      <ResultCard title="Tax-Free Childcare or Universal Credit?" sub="On the costs left after funded hours.">
        <Compare
          head={["Scheme", "You pay a year"]}
          rows={[
            { label: "No help", value: gbp(r.afterFunded), bar: 1 },
            { label: "Tax-Free Childcare (20%, up to £2,000 a child)", value: gbp(r.afterTfc), bar: r.afterFunded > 0 ? r.afterTfc / r.afterFunded : 0, current: !v.uc },
            { label: "Universal Credit (85%, capped)", value: gbp(r.afterUc), bar: r.afterFunded > 0 ? r.afterUc / r.afterFunded : 0, current: v.uc },
          ]}
        />
      </ResultCard>

      <ResultCard title="By child">
        <Statement
          columns={["Full cost", "Funded", "Left to pay"]}
          rows={r.children.map((c, i) => ({ label: `Child ${i + 1}: ${STAGE_LABEL[c.stage]}${c.hoursPerWeek ? `, ${c.hoursPerWeek} funded hours` : ""}`, values: [gbp(c.fullCost), gbp(c.funded), gbp(c.afterFunded)] }))}
        />
      </ResultCard>

      <ResultCard title="Things to know">
        {!v.uc && r.afterUc < r.afterTfc && (
          <Callout title="Universal Credit could pay more">
            If you are entitled to Universal Credit, it refunds 85% of childcare costs, far more than Tax-Free Childcare. Check with the <a href="/uk/benefits/universal-credit">Universal Credit calculator</a>.
          </Callout>
        )}
        {r.children.some((c) => c.stage === "under9m") && (
          <Callout title="Funded hours start at 9 months">
            Working parents in England can get 30 funded hours from the term after their child turns 9 months.
          </Callout>
        )}
        {funded && (
          <Callout title="Funded hours are term time">
            {funded.hoursPerWeek} hours a week for 38 weeks is {funded.hoursPerWeek * 38} hours a year. Many nurseries spread them over the year instead: about {Math.round(funded.fundedWeekly * 10) / 10} hours a week
            over {v.weeks} weeks.
          </Callout>
        )}
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        England, 2026/27. Scotland, Wales and Northern Ireland have different funded hours. Your provider may charge for extras that funding does not cover.
      </p>
    </Studio>
  );
}
