"use client";

import Studio from "@/components/flagship/Studio";
import { DateField, InputGroup, Segmented, StepperField, Switch, AdvancedOptions } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Facts, ResultCard, Statement } from "@/components/flagship/results";
import { gbp } from "@/components/flagship/format";
import { bool, date, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import { MATERNITY_GRANT_2026, maternityGrant } from "@/lib/benefits/families";

type Nation = "england" | "ni" | "scotland";

const SCHEMA = {
  nation: oneOf<Nation>("england", ["england", "ni", "scotland"]),
  benefit: bool(true),
  babies: num(1, 1, 4),
  others: num(0, 0, 10),
  due: date("2027-03-01"),
  young: bool(false),
};
const ADVANCED = ["young"] as const;

function shift(iso: string, days: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  const t = new Date(Date.UTC(y, m - 1, d));
  t.setUTCDate(t.getUTCDate() + days);
  return t.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}
function addMonths(iso: string, months: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  const t = new Date(Date.UTC(y, m - 1 + months, d));
  return t.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

export default function GrantStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const scotland = v.nation === "scotland";
  const r = maternityGrant({ scotland, benefit: v.benefit, babies: v.babies, otherChildren: v.others, youngParent: v.young });
  // England, Wales and NI: from 11 weeks before the due date. Scotland: from 24 weeks of pregnancy (16 weeks before).
  const from = shift(v.due, scotland ? -16 * 7 : -11 * 7);
  const until = addMonths(v.due, 6);
  const b = MATERNITY_GRANT_2026.bestStart;

  return (
    <Studio
      title="Your pregnancy and family"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Check my maternity grant"
      onReset={st.reset}
      dock={{ label: "Grant", value: gbp(r.amount, true) }}
      inputs={
        <>
          <InputGroup title="Where and when">
            <Segmented
              label="Where you live"
              value={v.nation}
              onChange={st.bind("nation")}
              options={[
                { value: "england", label: "England or Wales" },
                { value: "ni", label: "Northern Ireland" },
                { value: "scotland", label: "Scotland", note: "Scotland pays the Pregnancy and Baby Payment of the Best Start Grant instead." },
              ]}
            />
            <DateField label="Baby's due date (or date of birth)" value={v.due} onChange={st.bind("due")} />
          </InputGroup>
          <InputGroup title="Your family">
            <Switch label="We get a qualifying benefit" checked={v.benefit} onChange={st.bind("benefit")} hint="Universal Credit, Pension Credit, income-based JSA, income-related ESA, Income Support, or (in Scotland) Housing Benefit." />
            <StepperField label="Babies expected" value={v.babies} onChange={(n) => st.set("babies", Math.round(n))} step={1} min={1} max={4} unit="babies" dp={0} hint="2 for twins." />
            <StepperField label="Other children under 16 in the family" value={v.others} onChange={(n) => st.set("others", Math.round(n))} step={1} min={0} max={10} unit="children" dp={0} />
          </InputGroup>
          {scotland && (
            <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
              <Switch label="I am under 18, or 18 or 19 and dependent on a parent" checked={v.young} onChange={st.bind("young")} optional hint="In Scotland, young parents can get the Best Start Grant without a qualifying benefit." />
            </AdvancedOptions>
          )}
        </>
      }
    >
      <Answer
        eyebrow={r.scheme}
        value={gbp(r.amount, true)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          r.eligible ? (
            <>
              You could get <b>{gbp(r.amount, true)}</b> once, to help with the costs of a new baby. {r.reason} Claim between <b>{from}</b> and <b>{until}</b>.
            </>
          ) : (
            <>
              You are unlikely to get the {r.scheme}. {r.reason}
            </>
          )
        }
        badges={[r.scheme, r.eligible ? "Likely to qualify" : "Unlikely to qualify", "One-off, tax-free"]}
      />

      <Facts
        items={[
          { label: "Grant", value: gbp(r.amount, true), tone: r.eligible ? "good" : undefined },
          { label: "Claim from", value: from },
          { label: "Claim by", value: until },
          { label: "Repayable", value: "No" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Rates", value: scotland ? `2026/27: ${gbp(b.first, true)} first child, ${gbp(b.later, true)} later children` : "£500 for each eligible baby" },
          { label: "Benefit", value: v.benefit ? "Someone in the household gets a qualifying benefit" : "No qualifying benefit" },
          { label: "Children", value: `${v.others} other ${v.others === 1 ? "child" : "children"} under 16` },
          { label: "Claim", value: "Made within the time limit" },
        ]}
      />

      {scotland && (
        <ResultCard title="Best Start Grant payments in Scotland" sub="2026/27 rates.">
          <Statement
            columns={["Amount"]}
            rows={[
              { label: "Pregnancy and Baby Payment: first child", values: [gbp(b.first, true)] },
              { label: "Pregnancy and Baby Payment: later children", values: [gbp(b.later, true)] },
              { label: "Extra for each additional baby in a multiple birth", values: [gbp(b.extraBaby, true)] },
              { label: "Early Learning Payment (age 2 to 3½)", values: ["£331.95"] },
              { label: "School Age Payment (starting school)", values: ["£331.95"] },
            ]}
          />
        </ResultCard>
      )}

      <ResultCard title="Other help for a new baby">
        <Callout title="Healthy Start">
          Families on Universal Credit with take-home pay of £408 a month or less get £4.65 a week in pregnancy and £9.30 a week for a baby under 1. Check the{" "}
          <a href="/uk/life/healthy-start">Healthy Start calculator</a>.
        </Callout>
        <Callout title="Child Benefit">
          Claim as soon as the baby is born: £27.05 a week for a first child. See the <a href="/uk/benefits/child-benefit">Child Benefit calculator</a>.
        </Callout>
        <Callout title="Maternity pay or Maternity Allowance">
          If you work, check your <a href="/uk/benefits/maternity-pay">maternity pay</a>. Universal Credit goes up when the baby is born, too.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        2026/27 rules. The DWP (or Social Security Scotland) decides your claim. Some exceptions apply, for example if you care for someone else&rsquo;s child.
      </p>
    </Studio>
  );
}
