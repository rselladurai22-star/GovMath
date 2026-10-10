"use client";

import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { gbp, percent } from "@/components/flagship/format";
import { bool, num, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import { annuity, drawdown } from "@/lib/investing/savings";
import { STATE_PENSION } from "@/lib/investing/retirement";

const FULL_SP = Math.round(STATE_PENSION.newWeekly * 52 * 100) / 100;

const SCHEMA = {
  pot: num(100_000, 0, 10_000_000),
  age: num(66, 55, 90),
  lump: bool(true),
  rate: num(7.5, 1, 20),
  escalation: num(0, 0, 5),
  sp: num(FULL_SP, 0, 50_000),
  other: num(0, 0, 1_000_000),
  growth: num(4, -5, 15),
  scotland: bool(false),
};
const ADVANCED = ["escalation", "sp", "other", "growth", "scotland"] as const;

export default function AnnuityStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const input = { pot: v.pot, takeTaxFree: v.lump, rate: v.rate / 100, escalation: v.escalation / 100, age: v.age, statePension: v.sp, otherIncome: v.other, scotland: v.scotland };
  const r = annuity(input);
  const dd = drawdown({ pot: r.price, age: v.age, taxFree: "none", withdrawal: r.gross, growth: v.growth / 100, inflation: v.escalation / 100, statePension: 0, spAge: 200, otherIncome: 0, scotland: v.scotland });
  const rates = [6, 6.5, 7, 7.5, 8, 8.5].map((x) => ({ x, a: annuity({ ...input, rate: x / 100 }) }));
  const maxR = Math.max(1, ...rates.map((x) => x.a.gross));

  return (
    <Studio
      title="Your pension pot and annuity quote"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Work out my annuity income"
      onReset={st.reset}
      dock={{ label: "Income a month after tax", value: gbp(r.monthlyNet) }}
      inputs={
        <>
          <InputGroup title="Your pension">
            <MoneyField label="Pension pot" value={v.pot} onChange={st.bind("pot")} big slider={{ min: 0, max: 500_000, step: 5_000, ends: ["£0", "£500k"] }} />
            <StepperField label="Your age" value={v.age} onChange={(n) => st.set("age", Math.round(n))} step={1} min={55} max={90} unit="years" dp={0} />
            <Switch label="Take 25% tax-free cash first" checked={v.lump} onChange={st.bind("lump")} hint="Up to £268,275. The rest buys the annuity." />
          </InputGroup>
          <InputGroup title="The annuity">
            <StepperField
              label="Annuity rate"
              value={v.rate}
              onChange={st.bind("rate")}
              step={0.05}
              min={1}
              max={20}
              unit="%"
              dp={2}
              hint="First year's income as a % of the price. Use your quote: rates depend on age, health, postcode and the options you choose. 7.5% is an example for a healthy 65-year-old's level annuity in 2026."
            />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <StepperField label="Yearly increase in income" value={v.escalation} onChange={st.bind("escalation")} step={0.5} min={0} max={5} unit="%" dp={1} optional hint="0% for a level annuity. An increasing annuity starts with a lower rate." />
            <MoneyField label="State Pension a year" value={v.sp} onChange={st.bind("sp")} optional hint="To work out the tax on the annuity." />
            <MoneyField label="Other taxable income a year" value={v.other} onChange={st.bind("other")} optional />
            <StepperField label="Drawdown growth, for comparison" value={v.growth} onChange={st.bind("growth")} step={0.5} min={-5} max={15} unit="%" dp={1} optional />
            <Switch label="I pay Scottish Income Tax" checked={v.scotland} onChange={st.bind("scotland")} optional />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Annuity income a month, after tax"
        value={gbp(r.monthlyNet)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            {r.lumpSum > 0 ? <>After taking <b>{gbp(r.lumpSum)}</b> tax-free, </> : null}
            <b>{gbp(r.price)}</b> buys a guaranteed income of <b>{gbp(r.gross)}</b> a year for life{v.escalation > 0 ? <>, rising {percent(v.escalation / 100, 1)} a year</> : null}. After{" "}
            {gbp(r.tax)} of Income Tax that is <b>{gbp(r.net)}</b> a year. You get the purchase price back in income by about age <b>{Math.round(r.paybackAge)}</b>.
          </>
        }
        badges={[`${percent(v.rate / 100, 2)} rate`, v.escalation > 0 ? `Rising ${percent(v.escalation / 100, 1)}` : "Level", "Guaranteed for life"]}
      />

      <Facts
        items={[
          { label: "Tax-free lump sum", value: gbp(r.lumpSum) },
          { label: "Income a year before tax", value: gbp(r.gross) },
          { label: "Income Tax a year", value: gbp(r.tax), note: "On top of the State Pension" },
          { label: "Price paid back by", value: `Age ${Math.round(r.paybackAge)}`, note: `${r.paybackYears.toFixed(1)} years` },
        ]}
      />

      <Assumptions
        items={[
          { label: "Annuity", value: `Single life, ${v.escalation > 0 ? "increasing" : "level"}, no guarantee period, paid monthly` },
          { label: "Rate", value: `${percent(v.rate / 100, 2)}: your quote will differ` },
          { label: "Tax", value: "2026/27 rates, with your State Pension and other income" },
          { label: "Payback", value: "Cash income received, without interest" },
        ]}
      />

      <ResultCard title="Where your pot goes">
        <SplitBar
          segments={[
            { label: "Tax-free cash", value: r.lumpSum, display: gbp(r.lumpSum), color: "#0f9f6e" },
            { label: "Annuity price", value: r.price, display: gbp(r.price), color: "#5b1e6e" },
          ]}
        />
      </ResultCard>

      <ResultCard title="If your rate were different" sub={`Yearly income before tax from ${gbp(r.price)}.`}>
        <Compare head={["Annuity rate", "Income a year"]} rows={rates.map((x) => ({ label: percent(x.x / 100, 1), value: gbp(x.a.gross), bar: x.a.gross / maxR, current: x.x === v.rate }))} />
      </ResultCard>

      <ResultCard title="Compared with drawdown">
        <Callout title={dd.runsOutAt === null ? "Drawdown at this income lasts beyond 100" : `Drawdown at this income runs out at ${dd.runsOutAt}`}>
          Taking the same {gbp(r.gross)} a year from {gbp(r.price)} left invested at {percent(v.growth / 100, 1)} growth {dd.runsOutAt === null ? "would last beyond age 100" : `would last until about age ${dd.runsOutAt}`}. The annuity pays for life however long you live, but stops when you die unless you add a guarantee or a spouse&rsquo;s pension. See the{" "}
          <a href="/uk/investing/pension-drawdown">drawdown calculator</a>.
        </Callout>
        <Callout title="Shop around and declare your health">
          Your pension provider must show how its quote compares with the market. Smokers and people with health conditions such as high blood pressure or diabetes can get a higher enhanced annuity rate.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Annuity rates change daily. Use a real quote for an accurate figure. Not financial advice.
      </p>
    </Studio>
  );
}
