"use client";

import { TFC, taxFreeChildcarePlan } from "@/lib/benefits/family";
import { UC_CHILDCARE } from "@/lib/benefits/uc-engine";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { gbp } from "@/components/flagship/format";
import { bool, num, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import s from "@/components/flagship/Flagship.module.css";

const SCHEMA = {
  c1: num(6_000, 0, 200_000),
  c2: num(0, 0, 200_000),
  c3: num(0, 0, 200_000),
  d1: bool(false),
  d2: bool(false),
  d3: bool(false),
  uc: bool(false),
};
const ADVANCED = ["c3", "d1", "d2", "d3", "uc"] as const;
const COLORS = { gov: "#0f9f6e", you: "#f59e0b" };

export default function TfcStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const kids = [
    { cost: v.c1, disabled: v.d1 },
    { cost: v.c2, disabled: v.d2 },
    { cost: v.c3, disabled: v.d3 },
  ].filter((k, i) => i === 0 || k.cost > 0);
  const r = taxFreeChildcarePlan(kids);
  const ucHelp = (() => {
    const n = kids.filter((k) => k.cost > 0).length;
    const capMonthly = n >= 2 ? UC_CHILDCARE.maxTwoPlus : UC_CHILDCARE.maxOne;
    return Math.min(r.cost * UC_CHILDCARE.share, capMonthly * 12);
  })();
  const ucBetter = v.uc && ucHelp > r.topUp;

  return (
    <Studio
      title="Your childcare costs"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Work out my top-up"
      onReset={st.reset}
      dock={{ label: "Government top-up", value: gbp(r.topUp) }}
      inputs={
        <>
          <InputGroup title="Childcare a year">
            <MoneyField label="First child" value={v.c1} onChange={st.bind("c1")} big slider={{ min: 0, max: 20_000, step: 250, ends: ["£0", "£20k"] }} hint="What you pay a registered provider: nursery, childminder, after-school club, holiday club or nanny." />
            <MoneyField label="Second child" value={v.c2} onChange={st.bind("c2")} hint="Leave at £0 if you have one child in childcare." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <MoneyField label="Third child" value={v.c3} onChange={st.bind("c3")} optional />
            <Switch label="First child is disabled" checked={v.d1} onChange={st.bind("d1")} optional hint="Disabled children get up to £4,000 a year and can be claimed for until 17." />
            {v.c2 > 0 && <Switch label="Second child is disabled" checked={v.d2} onChange={st.bind("d2")} optional />}
            {v.c3 > 0 && <Switch label="Third child is disabled" checked={v.d3} onChange={st.bind("d3")} optional />}
            <Switch label="Compare with Universal Credit" checked={v.uc} onChange={st.bind("uc")} optional hint="If you could get Universal Credit, it may pay back more of your childcare. You cannot use both." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="The government adds"
        value={gbp(r.topUp)}
        unit="a year"
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            On <b>{gbp(r.cost)}</b> of childcare you pay in <b>{gbp(r.youPay)}</b> and the government adds <b>{gbp(r.topUp)}</b>: £2 for every £8 you pay.
            {r.children.some((c) => c.capped) ? <> At least one child is at the yearly limit, so extra spending gets no more top-up.</> : null}
          </>
        }
        badges={[`${gbp(r.youPay / 12)} a month from you`, `${gbp(r.topUp / 4)} a quarter top-up`, r.children.some((c) => c.capped) ? "Limit reached" : "Under the limit"]}
      />

      <Facts
        items={[
          { label: "Childcare cost", value: gbp(r.cost) },
          { label: "Government top-up", value: gbp(r.topUp), tone: "good" },
          { label: "You pay", value: gbp(r.youPay) },
          { label: "Spend for maximum top-up", value: gbp(r.spendForMaxTopUp), note: "Per child a year" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Top-up", value: "20% of what you spend" },
          { label: "Limit", value: "£2,000 a year per child, £4,000 if disabled" },
          { label: "Provider", value: "Registered and signed up to Tax-Free Childcare" },
          { label: "Eligibility", value: "Working parents, each under £100,000" },
        ]}
      />

      {r.cost > 0 && (
        <ResultCard title="Who pays for your childcare" sub="A year, all children.">
          <SplitBar
            segments={[
              { label: "Government top-up", value: r.topUp, display: gbp(r.topUp), color: COLORS.gov },
              { label: "You pay", value: r.youPay, display: gbp(r.youPay), color: COLORS.you },
            ]}
          />
          <Statement
            columns={["Cost", "Top-up", "Limit"]}
            rows={r.children.map((c, i) => ({
              label: `Child ${i + 1}${kids[i]?.disabled ? " (disabled)" : ""}`,
              values: [gbp(c.cost), gbp(c.topUp), c.capped ? "Reached" : gbp(c.cap)],
            }))}
          />
        </ResultCard>
      )}

      {v.uc && (
        <ResultCard title="Tax-Free Childcare or Universal Credit?" sub="Universal Credit can pay back 85% of childcare costs, up to a monthly limit.">
          <Compare
            head={["Scheme", "Help a year"]}
            rows={[
              { label: "Tax-Free Childcare (20%)", value: gbp(r.topUp), bar: r.topUp / Math.max(r.topUp, ucHelp, 1), current: !ucBetter },
              { label: "Universal Credit childcare (85%)", value: gbp(ucHelp), bar: ucHelp / Math.max(r.topUp, ucHelp, 1), current: ucBetter },
            ]}
          />
          <Callout tone="warn" title="Check your whole Universal Credit award first">
            The 85% is only paid if you are entitled to some Universal Credit, and it is reduced by the taper like the rest of your award. Use the Universal Credit calculator before switching.
          </Callout>
        </ResultCard>
      )}

      <ResultCard title="Worth knowing" sub="Using your account well.">
        <Callout title="Pay in, then pay your provider">
          You pay into an online childcare account and the top-up is added straight away. You then pay your provider from the account. The top-up limit resets every three months: £500 a quarter
          per child, or £1,000 for a disabled child.
        </Callout>
        <Callout title="Reconfirm every three months">
          You must reconfirm that you still work and earn enough every three months, or the account is frozen.
        </Callout>
        <Callout title="Works with free hours">
          Use the account for hours above the funded hours, meals, holiday clubs and after-school care until your child turns 12.
        </Callout>
      </ResultCard>

      <p className={s.hint} style={{ textAlign: "center" }}>
        UK-wide scheme, 2026/27. Limits: {gbp(TFC.capPerChild)} a child, {gbp(TFC.capDisabled)} if disabled. Not financial advice.
      </p>
    </Studio>
  );
}
