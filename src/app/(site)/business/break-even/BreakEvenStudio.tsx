"use client";

import { breakEvenStudy } from "@/lib/business/margins";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, Statement } from "@/components/flagship/results";
import { gbp, gbpShort, percent, whole } from "@/components/flagship/format";
import { num, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import s from "@/components/flagship/Flagship.module.css";

const SCHEMA = {
  fixed: num(30_000, 0, 100_000_000),
  price: num(25, 0, 10_000_000),
  variable: num(10, 0, 10_000_000),
  target: num(0, 0, 100_000_000),
  expected: num(0, 0, 100_000_000),
  change: num(10, 1, 50),
};
const ADVANCED = ["target", "expected", "change"] as const;
const COLORS = { revenue: "#0f9f6e", costs: "#e11d48" };
const POINTS = 21;

const units = (n: number) => (Number.isFinite(n) ? whole(Math.ceil(n)) : "Never");

export default function BreakEvenStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const r = breakEvenStudy({ fixedCosts: v.fixed, pricePerUnit: v.price, variableCostPerUnit: v.variable, targetProfit: v.target, expectedUnits: v.expected });
  const ok = Number.isFinite(r.units);
  const be = Math.ceil(r.units);
  const top = ok ? Math.max(be * 2, v.expected * 1.2, r.unitsForTarget * 1.2, 10) : 0;
  const volumes = Array.from({ length: POINTS }, (_, i) => (top * i) / (POINTS - 1));
  const step = (k: number) => {
    const price = v.price * (1 + k);
    return { k, price, r: breakEvenStudy({ fixedCosts: v.fixed, pricePerUnit: price, variableCostPerUnit: v.variable, targetProfit: 0, expectedUnits: 0 }) };
  };
  const c = v.change / 100;
  const scenarios = [step(-c), step(0), step(c)];
  const maxUnits = Math.max(...scenarios.map((x) => (Number.isFinite(x.r.units) ? x.r.units : 0)), 1);
  const costScenario = breakEvenStudy({ fixedCosts: v.fixed * (1 + c), pricePerUnit: v.price, variableCostPerUnit: v.variable, targetProfit: 0, expectedUnits: 0 });
  const hasExpected = v.expected > 0;
  const hasTarget = v.target > 0;

  return (
    <Studio
      title="Your costs and price"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Find my break-even point"
      onReset={st.reset}
      dock={{ label: "Break-even", value: ok ? `${units(r.units)} sales` : "Never" }}
      inputs={
        <>
          <InputGroup title="Your business">
            <MoneyField label="Fixed costs a year" value={v.fixed} onChange={st.bind("fixed")} big slider={{ min: 0, max: 250_000, step: 1_000, ends: ["£0", "£250k"] }} hint="Rent, wages, insurance, software: costs you pay however much you sell." />
            <MoneyField label="Price per sale" value={v.price} onChange={st.bind("price")} pence hint="Before VAT if you are VAT-registered." />
            <MoneyField label="Variable cost per sale" value={v.variable} onChange={st.bind("variable")} pence hint="Stock, materials, packaging, card fees: costs that come with each sale." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <MoneyField label="Profit you want a year" value={v.target} onChange={st.bind("target")} optional hint="Before tax. Shows the sales needed to reach it." />
            <StepperField label="Sales you expect a year" value={v.expected} onChange={st.bind("expected")} step={100} min={0} max={100_000_000} unit="sales" dp={0} optional hint="Shows your margin of safety and expected profit." />
            <StepperField label="Price and cost change to test" value={v.change} onChange={st.bind("change")} step={1} min={1} max={50} unit="%" dp={0} optional />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="You break even at"
        value={ok ? units(r.units) : "Never"}
        unit={ok ? "sales a year" : undefined}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          !ok ? (
            <>
              Each sale costs <b>{gbp(v.variable, true)}</b> but brings in only <b>{gbp(v.price, true)}</b>, so more sales mean a bigger loss. Raise the price or cut the
              cost per sale.
            </>
          ) : (
            <>
              Each sale leaves <b>{gbp(r.contributionPerUnit, true)}</b> towards your fixed costs. To cover <b>{gbp(v.fixed)}</b> you need <b>{units(r.units)}</b> sales a year, or{" "}
              <b>{gbp(r.revenue)}</b> of sales. That is about <b>{units(r.units / 12)}</b> a month or <b>{units(r.units / 52)}</b> a week.
            </>
          )
        }
        badges={ok ? [`${gbp(r.revenue)} of sales`, `${units(r.units / 12)} a month`, `${percent(r.contributionRatio, 1)} contribution margin`] : ["Loss on every sale"]}
      />

      <Facts
        items={[
          { label: "Contribution per sale", value: gbp(r.contributionPerUnit, true), tone: ok ? "good" : "bad", note: "Price − variable cost" },
          { label: "Break-even sales", value: ok ? gbp(r.revenue) : "Never", note: "A year, before VAT" },
          { label: "A month", value: ok ? `${units(r.units / 12)} sales` : "n/a" },
          hasExpected
            ? { label: "Profit at expected sales", value: gbp(r.profitAtExpected), tone: r.profitAtExpected >= 0 ? "good" : "bad" }
            : { label: "A week", value: ok ? `${units(r.units / 52)} sales` : "n/a" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Fixed costs", value: `${gbp(v.fixed)} a year, the same at any level of sales` },
          { label: "Price and cost per sale", value: "The same for every sale" },
          { label: "Figures", value: "Before VAT and before tax" },
        ]}
        note="Selling several products? Use average price and average variable cost per sale."
      />

      {ok && (
        <ResultCard title="Sales against costs" sub="Where the lines cross is your break-even point. Above it, every sale adds profit.">
          <AreaChart
            ariaLabel="Sales income and total costs by number of sales"
            series={[
              { key: "revenue", label: "Sales income", color: COLORS.revenue, values: volumes.map((q) => q * v.price), fill: true },
              { key: "costs", label: "Total costs", color: COLORS.costs, values: volumes.map((q) => v.fixed + q * v.variable) },
            ]}
            xLabel={(i) => whole(volumes[i] ?? 0)}
            yFormat={gbpShort}
            initial={10}
            hint="Drag across the chart, or use the arrow keys, to read any number of sales."
            readout={(i) => {
              const q = volumes[i] ?? 0;
              const profit = q * r.contributionPerUnit - v.fixed;
              return (
                <>
                  At <b>{whole(q)}</b> sales: income <b>{gbp(q * v.price)}</b>, costs <b>{gbp(v.fixed + q * v.variable)}</b>, {profit >= 0 ? "profit" : "loss"} <b>{gbp(Math.abs(profit))}</b>.
                </>
              );
            }}
          />
        </ResultCard>
      )}

      {ok && (hasTarget || hasExpected) && (
        <ResultCard title="Your targets" sub="Break-even is the floor. These show how far above it you need to be.">
          <Statement
            columns={["Sales a year", "Income"]}
            rows={[
              { label: "To break even", values: [units(r.units), gbp(r.revenue)] },
              ...(hasTarget ? [{ label: `To make ${gbp(v.target)} profit`, values: [units(r.unitsForTarget), gbp(r.revenueForTarget)], kind: "total" as const }] : []),
              ...(hasExpected ? [{ label: "You expect", values: [whole(v.expected), gbp(v.expected * v.price)] }] : []),
            ]}
          />
          {hasExpected && (
            <Callout tone={r.marginOfSafety >= 0 ? "good" : "warn"} title={r.marginOfSafety >= 0 ? `Margin of safety: ${percent(r.marginOfSafety, 1)}` : `${whole(be - v.expected)} sales short of break-even`}>
              {r.marginOfSafety >= 0
                ? `Your sales could fall by ${percent(r.marginOfSafety, 1)} before you start to make a loss. At ${whole(v.expected)} sales you make about ${gbp(r.profitAtExpected)} before tax.`
                : `At ${whole(v.expected)} sales you lose about ${gbp(-r.profitAtExpected)}. You need ${percent(be / v.expected - 1, 1)} more sales, a higher price or lower costs.`}
            </Callout>
          )}
        </ResultCard>
      )}

      {ok && (
        <ResultCard title={`What a ${v.change}% change does`} sub="Small changes in price move break-even a long way.">
          <Compare
            head={["Price per sale", "Break-even"]}
            rows={scenarios.map((x) => ({
              label: x.k === 0 ? `${gbp(x.price, true)} (now)` : `${gbp(x.price, true)} (${x.k > 0 ? "+" : "−"}${v.change}%)`,
              value: Number.isFinite(x.r.units) ? `${units(x.r.units)} sales` : "Never",
              delta: x.k === 0 || !Number.isFinite(x.r.units) ? undefined : `${x.r.units > r.units ? "+" : "−"}${units(Math.abs(Math.ceil(x.r.units) - be))}`,
              deltaTone: x.r.units > r.units ? "up" : "down",
              bar: Number.isFinite(x.r.units) ? x.r.units / maxUnits : 1,
              current: x.k === 0,
            }))}
          />
          <Callout title={`If fixed costs rise ${v.change}%`}>
            Fixed costs of {gbp(v.fixed * (1 + c))} would need {units(costScenario.units)} sales to break even, {units(costScenario.units - r.units)} more than now.
          </Callout>
        </ResultCard>
      )}

      <ResultCard title="Worth knowing" sub="Getting the inputs right.">
        <Callout title="Include your own pay if you need it">
          A sole trader&apos;s drawings are not a business cost, so break-even here means the business covers its costs but pays you nothing. Add the income you need to
          live on as the profit you want a year.
        </Callout>
        <Callout title="Card fees and delivery are variable costs">
          Anything that comes with each sale belongs in the variable cost, or you will understate the break-even point.
        </Callout>
      </ResultCard>

      <p className={s.hint} style={{ textAlign: "center" }}>
        Figures before VAT and tax. A planning guide, not financial advice.
      </p>
    </Studio>
  );
}
