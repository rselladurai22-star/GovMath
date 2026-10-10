"use client";

import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, RadioGroup, Segmented, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Facts, ResultCard, Statement } from "@/components/flagship/results";
import { gbp } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import { checkEligibility, type Disability, type Help, type Tenure } from "@/lib/benefits/eligibility";

const SCHEMA = {
  stage: oneOf<"working" | "pension">("working", ["working", "pension"]),
  couple: bool(false),
  under25: bool(false),
  kids: num(0, 0, 10),
  youngest: num(5, 0, 19),
  pregnant: bool(false),
  tenure: oneOf<Tenure>("private", ["private", "social", "own", "none"]),
  rent: num(750, 0, 10_000),
  earnings: num(0, 0, 50_000),
  other: num(0, 0, 50_000),
  savings: num(0, 0, 10_000_000),
  disability: oneOf<Disability>("none", ["none", "daily", "work", "both"]),
  carer: bool(false),
  worked: bool(true),
  childcare: num(0, 0, 5_000),
  highest: num(0, 0, 1_000_000),
  over80: bool(false),
};
const ADVANCED = ["worked", "childcare", "highest", "over80"] as const;

function value(h: Help): string {
  if (h.monthly !== null) return `${gbp(h.monthly)} a month`;
  if (h.oneOff !== undefined) return h.key === "ssmg" ? `${gbp(h.oneOff)} once` : `${gbp(h.oneOff)} a year`;
  return h.status === "unlikely" ? "Unlikely" : "Check";
}

function Rows({ items }: { items: Help[] }) {
  return (
    <Statement
      columns={["Value"]}
      rows={items.map((h) => ({
        label: (
          <>
            {h.href ? <a href={h.href}>{h.name}</a> : <b>{h.name}</b>}
            <span className="gm-rowhint">{h.why}</span>
          </>
        ),
        values: [value(h)],
      }))}
    />
  );
}

export default function CheckerStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const pension = v.stage === "pension";
  const renting = v.tenure === "private" || v.tenure === "social";
  const r = checkEligibility({
    pensionAge: pension,
    over80: v.over80,
    couple: v.couple,
    over25: !v.under25,
    children: v.kids,
    youngest: v.youngest,
    pregnant: v.pregnant,
    tenure: v.tenure,
    rent: renting ? v.rent : 0,
    earnings: v.earnings,
    otherIncome: v.other,
    savings: v.savings,
    disability: v.disability,
    carer: v.carer,
    workedRecently: v.worked,
    childcare: v.childcare,
    highestIncome: v.highest,
  });
  const likely = r.items.filter((x) => x.status === "likely");
  const check = r.items.filter((x) => x.status === "check");
  const no = r.items.filter((x) => x.status === "unlikely");

  return (
    <Studio
      title="Your household"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Check what I can get"
      onReset={st.reset}
      dock={{ label: "Likely a month", value: gbp(r.likelyMonthly) }}
      inputs={
        <>
          <InputGroup title="Who lives with you">
            <Segmented
              label="Your age"
              value={v.stage}
              onChange={st.bind("stage")}
              options={[
                { value: "working", label: "Working age" },
                { value: "pension", label: "State Pension age", note: "You, and your partner if you have one, have reached State Pension age (66, rising to 67 between 2026 and 2028)." },
              ]}
            />
            <Switch label="I live with a partner" checked={v.couple} onChange={st.bind("couple")} />
            {!pension && <Switch label="I am under 25" checked={v.under25} onChange={st.bind("under25")} hint={v.couple ? "Both of you are under 25." : undefined} />}
            <StepperField label="Children" value={v.kids} onChange={(n) => st.set("kids", Math.round(n))} step={1} min={0} max={10} unit="children" dp={0} hint="Under 16, or under 20 in approved education or training." />
            {v.kids > 0 && <StepperField label="Age of your youngest child" value={v.youngest} onChange={(n) => st.set("youngest", Math.round(n))} step={1} min={0} max={19} unit="years" dp={0} />}
            <Switch label="Someone in the household is pregnant" checked={v.pregnant} onChange={st.bind("pregnant")} />
          </InputGroup>
          <InputGroup title="Your home">
            <Segmented
              label="Your home"
              value={v.tenure}
              onChange={st.bind("tenure")}
              options={[
                { value: "private", label: "Rent privately" },
                { value: "social", label: "Council or HA" },
                { value: "own", label: "Own it" },
                { value: "none", label: "Other" },
              ]}
            />
            {renting && <MoneyField label="Rent a month" value={v.rent} onChange={st.bind("rent")} hint="Including service charges, but not bills like water or energy." />}
          </InputGroup>
          <InputGroup title="Money coming in">
            <MoneyField label="Take-home pay a month" value={v.earnings} onChange={st.bind("earnings")} hint={v.couple ? "For both of you, after tax and National Insurance." : "After tax and National Insurance."} />
            <MoneyField label={pension ? "State Pension and other pensions a month" : "Other income a month"} value={v.other} onChange={st.bind("other")} hint="Pensions, maintenance for you (not for children) and other benefits apart from Child Benefit and disability benefits." />
            <MoneyField label="Savings and investments" value={v.savings} onChange={st.bind("savings")} />
          </InputGroup>
          <InputGroup title="Health and caring">
            <RadioGroup
              label="Health"
              value={v.disability}
              onChange={st.bind("disability")}
              options={[
                { value: "none", label: "No long-term condition" },
                { value: "daily", label: "A condition makes daily life or getting around harder" },
                { value: "work", label: "A condition stops me working" },
                { value: "both", label: "Both of these" },
              ]}
            />
            <Switch label="I care for someone 35 hours a week or more" checked={v.carer} onChange={st.bind("carer")} hint="Someone who gets a disability benefit such as PIP or Attendance Allowance." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <Switch label="Worked as an employee in the last 2 to 3 years" checked={v.worked} onChange={st.bind("worked")} optional hint="For New Style JSA and ESA, which depend on National Insurance." />
            <MoneyField label="Registered childcare costs a month" value={v.childcare} onChange={st.bind("childcare")} optional />
            <MoneyField label="Highest earner's yearly income before tax" value={v.highest} onChange={st.bind("highest")} optional hint="For the High Income Child Benefit Charge and Tax-Free Childcare limit." />
            {pension && <Switch label="Aged 80 or over" checked={v.over80} onChange={st.bind("over80")} optional />}
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Likely help a month"
        value={gbp(r.likelyMonthly)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            You are likely to get <b>{likely.length}</b> {likely.length === 1 ? "kind" : "kinds"} of help worth about <b>{gbp(r.likelyMonthly)}</b> a month
            {r.likelyOneOff > 0 ? (
              <>
                {" "}
                plus <b>{gbp(r.likelyOneOff)}</b> in one-off or yearly payments
              </>
            ) : null}
            , and <b>{check.length}</b> more {check.length === 1 ? "is" : "are"} worth checking.
          </>
        }
        badges={[pension ? "State Pension age" : "Working age", v.couple ? "Couple" : "Single", v.kids > 0 ? `${v.kids} ${v.kids === 1 ? "child" : "children"}` : "No children"]}
      />

      <Facts
        items={[
          { label: "Likely", value: String(likely.length), tone: "good" },
          { label: "Worth checking", value: String(check.length) },
          { label: "One-off and yearly", value: gbp(r.likelyOneOff) },
          { label: pension ? "Pension Credit a week" : "Universal Credit a month", value: pension ? gbp(r.pcWeekly, true) : gbp(r.ucAward) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Rates", value: "2026/27 benefit rates, England" },
          { label: "Rent", value: renting ? "Covered in full, as if within your Local Housing Allowance" : "No help with housing costs" },
          { label: "Health", value: "A condition that stops you working is assumed to qualify for the Universal Credit health element (new claim rate)" },
          { label: "Immigration", value: "Everyone can claim public funds and lives in the UK" },
        ]}
      />

      {likely.length > 0 && (
        <ResultCard title="Likely to get" sub="Based on your answers.">
          <Rows items={likely} />
        </ResultCard>
      )}
      {check.length > 0 && (
        <ResultCard title="Worth checking" sub="Depends on an assessment or details we have not asked.">
          <Rows items={check} />
        </ResultCard>
      )}
      {no.length > 0 && (
        <ResultCard title="Probably not" sub="On these answers.">
          <Rows items={no} />
        </ResultCard>
      )}

      <ResultCard title="Next steps">
        <Callout title="Use the full calculator for each one">
          Each name above links to its own calculator, which asks the details this checker skips: your Local Housing Allowance, council tax band, disability needs and so on.
        </Callout>
        {r.ucAward >= 1 && (
          <Callout title="Claim Universal Credit as soon as possible">
            It is paid from the date you claim, not the date you became eligible. If you need money before the first payment, see the <a href="/uk/benefits/uc-advance">UC advance calculator</a>.
          </Callout>
        )}
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        A first look based on 2026/27 rules, not a decision. Scotland, Wales and Northern Ireland have some different schemes.
      </p>
    </Studio>
  );
}
