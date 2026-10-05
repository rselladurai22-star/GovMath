"use client";

import { isaVsGia } from "@/lib/investing/wrappers";
import { INV_2026 } from "@/lib/investing/tax";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Facts, ResultCard, Statement } from "@/components/flagship/results";
import { gbp, gbpShort } from "@/components/flagship/format";
import { bool, num, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const SCHEMA = {
  lump: num(20_000, 0, 10_000_000),
  monthly: num(500, 0, 100_000),
  years: num(20, 1, 50),
  growth: num(4, -10, 20),
  divYield: num(2, 0, 15),
  intYield: num(0, 0, 15),
  turnover: num(10, 0, 100),
  income: num(55_000, 0, 10_000_000),
  sell: bool(true),
  y2027: bool(true),
  scotland: bool(false),
};
const ADVANCED = ["intYield", "turnover", "income", "sell", "y2027", "scotland"] as const;

export default function IsaStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const r = isaVsGia({
    lump: v.lump,
    monthly: v.monthly,
    years: v.years,
    growth: v.growth / 100,
    dividendYield: v.divYield / 100,
    interestYield: v.intYield / 100,
    turnover: v.turnover / 100,
    otherIncome: v.income,
    scotland: v.scotland,
    sellAtEnd: v.sell,
    savings2027: v.y2027,
  });
  const isaSeries = r.years.map((y) => y.isa);
  const giaSeries = r.years.map((y) => (v.sell ? y.giaAfterSale : y.gia));
  const pct = r.giaFinal > 0 ? (r.advantage / r.giaFinal) * 100 : 0;

  return (
    <Studio
      title="Your investments"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Compare ISA and GIA"
      onReset={st.reset}
      dock={{ label: "ISA advantage", value: gbp(r.advantage) }}
      inputs={
        <>
          <InputGroup title="What you invest">
            <MoneyField label="Lump sum now" value={v.lump} onChange={st.bind("lump")} />
            <MoneyField label="Monthly" value={v.monthly} onChange={st.bind("monthly")} />
            <StepperField label="Years" value={v.years} onChange={(n) => st.set("years", Math.round(n))} step={1} min={1} max={50} unit="years" dp={0} />
          </InputGroup>
          <InputGroup title="Returns">
            <StepperField label="Growth in value a year" value={v.growth} onChange={st.bind("growth")} step={0.5} min={-10} max={20} unit="%" dp={1} hint="Before dividends. Shares have averaged around 4% to 5% above inflation over long periods, with large swings." />
            <StepperField label="Dividend yield" value={v.divYield} onChange={st.bind("divYield")} step={0.25} min={0} max={15} unit="%" dp={2} hint="A global tracker yields about 1.5% to 2%; UK income funds 3% to 5%." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <StepperField label="Interest yield (bonds or cash)" value={v.intYield} onChange={st.bind("intYield")} step={0.25} min={0} max={15} unit="%" dp={2} optional hint="Taxed as savings income." />
            <StepperField label="Gains taken each year" value={v.turnover} onChange={st.bind("turnover")} step={5} min={0} max={100} unit="%" dp={0} optional hint="Share of unrealised gains sold yearly, from switching or rebalancing." />
            <MoneyField label="Your other income a year" value={v.income} onChange={st.bind("income")} optional hint="Sets your tax bands." />
            <Switch label="Sell everything at the end" checked={v.sell} onChange={st.bind("sell")} optional hint="Includes Capital Gains Tax on the remaining gain in the GIA." />
            <Switch label="Use savings tax rates from April 2027" checked={v.y2027} onChange={st.bind("y2027")} optional hint="Savings rates rise by 2 points." />
            <Switch label="Scottish taxpayer" checked={v.scotland} onChange={st.bind("scotland")} optional />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Better off in an ISA by"
        value={gbp(r.advantage)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            Investing <b>{gbp(r.contributed)}</b> over <b>{v.years} years</b> grows to <b>{gbp(r.isaFinal)}</b> in a stocks and shares ISA, against <b>{gbp(r.giaFinal)}</b> in a general investment account
            {v.sell ? " after selling" : ""}. The GIA pays <b>{gbp(r.giaTaxPaid + r.giaExitTax)}</b> in tax{r.giaExitTax > 0 ? <>, including <b>{gbp(r.giaExitTax)}</b> of Capital Gains Tax at the end</> : null}.
            {r.overAllowance ? <> Contributions over £20,000 a year go into a GIA in the ISA plan too.</> : null}
          </>
        }
        badges={[`${pct.toFixed(1)}% more`, `ISA ${gbpShort(r.isaFinal)}`, `GIA ${gbpShort(r.giaFinal)}`]}
      />

      <Facts
        items={[
          { label: "You invest", value: gbp(r.contributed) },
          { label: "ISA", value: gbp(r.isaFinal), tone: "good" },
          { label: "GIA", value: gbp(r.giaFinal) },
          { label: "Tax in the GIA", value: gbp(r.giaTaxPaid + r.giaExitTax), tone: "warn" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Returns", value: `${v.growth}% growth, ${v.divYield}% dividends${v.intYield ? `, ${v.intYield}% interest` : ""}` },
          { label: "Tax", value: "2026/27 rates and allowances, held flat" },
          { label: "ISA limit", value: `${gbp(INV_2026.isaAllowance)} a year` },
          { label: "Charges", value: "Not included; usually the same for both" },
        ]}
      />

      <ResultCard title="Value over time" sub={v.sell ? "GIA shown after selling and paying Capital Gains Tax." : "Before any sale."}>
        <AreaChart
          ariaLabel="ISA and GIA value over time"
          series={[
            { key: "isa", label: "Stocks and shares ISA", color: "#16a34a", values: isaSeries, fill: true },
            { key: "gia", label: "General investment account", color: "#f59e0b", values: giaSeries },
          ]}
          xLabel={(i) => `Yr ${i}`}
          yFormat={gbpShort}
          initial={v.years}
          hint="Drag across the chart, or use the arrow keys, to read any year."
          readout={(i) => (
            <>
              Year <b>{i}</b>: ISA <b>{gbp(isaSeries[i] ?? 0)}</b>, GIA <b>{gbp(giaSeries[i] ?? 0)}</b>, difference <b>{gbp((isaSeries[i] ?? 0) - (giaSeries[i] ?? 0))}</b>.
            </>
          )}
        />
      </ResultCard>

      <ResultCard title="Where the GIA loses out" sub={`Over ${v.years} years.`}>
        <Statement
          columns={["Amount"]}
          rows={[
            { label: "Tax on dividends, interest and gains along the way", values: [gbp(r.giaTaxPaid)] },
            ...(v.sell ? [{ label: "Capital Gains Tax on selling at the end", values: [gbp(r.giaExitTax)] }] : []),
            { label: "Growth lost on tax paid", values: [gbp(Math.max(0, r.advantage - r.giaTaxPaid - r.giaExitTax))] },
            { label: "ISA advantage", values: [gbp(r.advantage)], kind: "total" as const },
          ]}
        />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Using the allowance.">
        <Callout title="Use it or lose it">
          The £20,000 ISA allowance resets every 6 April and cannot be carried forward. &ldquo;Bed and ISA&rdquo; moves existing investments into an ISA each year.
        </Callout>
        <Callout title="Cash ISA limit from April 2027">
          From 6 April 2027, savers under 65 can put no more than £12,000 a year into cash ISAs. The overall £20,000 limit stays, so the rest can go into stocks and shares.
        </Callout>
        {r.advantage < 100 && (
          <Callout title="Small amounts may not need an ISA yet">
            Within the £500 dividend allowance and £3,000 Capital Gains Tax exemption, a GIA costs little tax. But the ISA advantage grows as the pot grows and the allowances stay frozen.
          </Callout>
        )}
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Illustration only. Investments can fall as well as rise. Not financial advice.
      </p>
    </Studio>
  );
}
