"use client";

import { CPI_FIRST_YEAR, CPI_LAST_YEAR, CPI_LATEST, cpiAdjust, cpiFor, doublingYears, futureInflation, inflationIn, latestAnnualInflation } from "@/lib/us/investing";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, DataTable, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { per, percent, usd, usdShort } from "@/components/flagship/format";
import { num, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const SCHEMA = {
  amount: num(100, 0, 1_000_000_000),
  from: num(2000, CPI_FIRST_YEAR, CPI_LAST_YEAR),
  to: num(CPI_LAST_YEAR, CPI_FIRST_YEAR, CPI_LAST_YEAR),
  rate: num(3, 0, 20),
  ahead: num(10, 1, 60),
};
const ADVANCED = ["rate", "ahead"] as const;

const yearLabel = (y: number) => (y === CPI_LAST_YEAR ? `${y} (${CPI_LATEST.month})` : String(y));
const money = (n: number) => (Math.abs(n) < 1_000 ? usd(n, true) : usd(n));

export default function InflationStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const from = Math.round(v.from);
  const to = Math.round(v.to);
  const a = cpiAdjust(v.amount, from, to);
  const forward = to >= from;
  const lo = Math.min(from, to);
  const hi = Math.max(from, to);
  const span = Array.from({ length: hi - lo + 1 }, (_, k) => lo + k);
  const values = span.map((y) => (v.amount * cpiFor(y)) / cpiFor(from));
  const step = span.length > 60 ? 10 : span.length > 25 ? 5 : span.length > 12 ? 2 : 1;
  const tableYears = span.filter((y, i) => i === 0 || i === span.length - 1 || (y - lo) % step === 0);
  const f = futureInflation(v.amount, v.rate, v.ahead);
  const latest = latestAnnualInflation();
  const dbl = doublingYears(v.rate);
  const bigger = Math.max(v.amount, a.value);
  const smaller = Math.min(v.amount, a.value);

  return (
    <Studio
      title="Inflation"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate inflation"
      onReset={st.reset}
      dock={{ label: `In ${to} dollars`, value: money(a.value) }}
      inputs={
        <>
          <InputGroup title="Amount and years">
            <MoneyField label="Amount" value={v.amount} onChange={st.bind("amount")} symbol="$" pence />
            <StepperField label="In the year" value={v.from} onChange={(n) => st.set("from", Math.round(n))} step={1} min={CPI_FIRST_YEAR} max={CPI_LAST_YEAR} unit="" dp={0} info="Any year from 1913. Each year uses its average CPI-U." />
            <StepperField label="Is worth in" value={v.to} onChange={(n) => st.set("to", Math.round(n))} step={1} min={CPI_FIRST_YEAR} max={CPI_LAST_YEAR} unit="" dp={0} info={`${CPI_LAST_YEAR} uses the latest index, for ${CPI_LATEST.month} ${CPI_LAST_YEAR}. You can also go backward, for example to see what today's price would have been in 1990.`} />
          </InputGroup>
          <AdvancedOptions title="Future inflation" description="Optional. What the same amount will cost in the years ahead at an assumed rate." changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <StepperField label="Assumed inflation a year" value={v.rate} onChange={st.bind("rate")} step={0.25} min={0} max={20} unit="%" dp={2} optional info="The Federal Reserve aims for 2% over time. Inflation averaged about 3.2% a year from 1913 to 2025." />
            <StepperField label="Years ahead" value={v.ahead} onChange={(n) => st.set("ahead", Math.round(n))} step={1} min={1} max={60} unit="years" dp={0} optional />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={`${money(v.amount)} in ${from} is worth, in ${to}`}
        value={money(a.value)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          from === to ? (
            <>Choose two different years to compare prices.</>
          ) : (
            <>
              Prices {a.cumulative >= 0 ? "rose" : "fell"} <b>{percent(Math.abs(a.cumulative), 1)}</b> between {from} and {to}, an average of{" "}
              <b>{percent(a.average, 2)}</b> a year {forward ? (a.cumulative >= 0 ? "of inflation" : "of deflation") : "(going back in time)"}. So{" "}
              <b>{money(v.amount)}</b> in {from} buys about what <b>{money(a.value)}</b> buys in {to}.
            </>
          )
        }
        badges={[`CPI ${from}: ${a.fromIndex}`, `CPI ${yearLabel(to)}: ${a.toIndex}`, `Latest 12 months: ${percent(latest, 1)}`]}
      />

      <Facts
        items={[
          { label: "Total price change", value: percent(a.cumulative, 1), tone: a.cumulative > 0 ? "warn" : undefined },
          { label: "Average a year", value: percent(a.average, 2) },
          { label: `$1 in ${from} buys, in ${to}`, value: usd(a.dollarWorth, true) },
          { label: "Years", value: `${a.years}` },
        ]}
      />

      <Assumptions
        items={[
          { label: "Index", value: "CPI-U, all items, US city average (BLS), not seasonally adjusted" },
          { label: "Each year", value: `The annual average index; ${CPI_LAST_YEAR} uses ${CPI_LATEST.month} ${CPI_LAST_YEAR}` },
          { label: "What it measures", value: "Average prices for urban consumers; your own costs may have risen faster or slower" },
        ]}
      />

      <ResultCard title={`${money(v.amount)} in ${from} prices, year by year`} sub="The same buying power in each year's dollars.">
        {span.length > 1 && (
          <AreaChart
            ariaLabel="Equivalent value by year"
            series={[{ key: "val", label: `Value of ${money(v.amount)} from ${from}`, color: "#0f9f6e", values, fill: true }]}
            xLabel={(i) => `${span[i] ?? ""}`}
            yFormat={usdShort}
            initial={forward ? values.length - 1 : 0}
            readout={(i) => (
              <>
                In <b>{yearLabel(span[i])}</b>, {money(v.amount)} of {from} buying power is <b>{money(values[i] ?? 0)}</b>.
              </>
            )}
          />
        )}
        <SplitBar
          segments={[
            { label: forward ? `Amount in ${from}` : `Amount in ${to}`, value: smaller, display: money(smaller), color: "#94a3b8" },
            { label: a.cumulative >= 0 ? "Added by inflation" : "Removed by deflation", value: bigger - smaller, display: money(bigger - smaller), color: "#f59e0b" },
          ]}
        />
        <DataTable
          summary="Show the yearly table"
          columns={["Year", "CPI-U", "Inflation that year", "Value"]}
          rows={tableYears.map((y) => [yearLabel(y), cpiFor(y), y === CPI_FIRST_YEAR ? "—" : percent(inflationIn(y), 1), money((v.amount * cpiFor(y)) / cpiFor(from))])}
        />
      </ResultCard>

      <ResultCard title={`The next ${v.ahead} ${per(v.ahead, "years")}`} sub={`At an assumed ${v.rate}% a year.`}>
        <Facts
          items={[
            { label: `What ${money(v.amount)} of things will cost`, value: money(f.cost) },
            { label: `What ${money(v.amount)} will buy, in today's dollars`, value: money(f.buyingPower) },
            { label: "Prices double in", value: dbl === Infinity ? "Never" : `${dbl.toFixed(1)} years` },
          ]}
        />
        <Callout title="Keeping up with inflation">
          Savings that earn less than inflation lose buying power even as the balance grows. To keep pace at {v.rate}%, money needs to earn at least {v.rate}% a year after tax.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        CPI-U from the Bureau of Labor Statistics. Figures are averages and may differ from your own costs.
      </p>
    </Studio>
  );
}
