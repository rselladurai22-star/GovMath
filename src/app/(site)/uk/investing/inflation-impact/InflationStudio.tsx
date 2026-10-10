"use client";

import { CPI_LATEST, futureCost, halvingYears, realReturn } from "@/lib/investing/growth";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, Statement } from "@/components/flagship/results";
import { gbp, gbpShort, percent, per } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const SCHEMA = {
  mode: oneOf<"savings" | "prices">("savings", ["savings", "prices"]),
  amount: num(10_000, 0, 100_000_000),
  years: num(10, 1, 100),
  inflation: num(3.1, -5, 50),
  rate: num(0, -20, 50),
  tax: num(0, 0, 45),
};
const ADVANCED = ["rate", "tax"] as const;

/** Nominal and real value of an amount each year. */
function path(amount: number, nominal: number, inflation: number, years: number) {
  const nom: number[] = [];
  const real: number[] = [];
  for (let y = 0; y <= years; y++) {
    const n = amount * Math.pow(1 + nominal, y);
    nom.push(n);
    real.push(n / Math.pow(1 + inflation, y));
  }
  return { nom, real };
}

export default function InflationStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const years = Math.round(v.years);
  const inf = v.inflation / 100;
  const net = (v.rate / 100) * (1 - v.tax / 100);
  const savings = v.mode === "savings";
  const p = path(v.amount, savings ? net : 0, inf, years);
  const cost = futureCost(v.amount, inf, years);
  const realValue = p.real[years];
  const realRate = realReturn(savings ? net : 0, inf);
  const half = halvingYears(inf);
  const lost = v.amount - realValue;

  const scenarios = [0.02, CPI_LATEST.rate, 0.05].map((r) => ({
    r,
    value: savings ? (v.amount * Math.pow(1 + net, years)) / Math.pow(1 + r, years) : futureCost(v.amount, r, years),
  }));
  const maxScen = Math.max(1, ...scenarios.map((x) => x.value));
  const step = Math.max(1, Math.ceil(years / 10));
  const rows = Array.from({ length: years + 1 }, (_, y) => y).filter((y) => y > 0 && (y % step === 0 || y === years));

  return (
    <Studio
      title="Inflation"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate the impact"
      onReset={st.reset}
      dock={savings ? { label: "Worth in today's money", value: gbp(realValue) } : { label: `Cost in ${years} ${per(years, "years")}`, value: gbp(cost) }}
      inputs={
        <>
          <InputGroup title="What to work out">
            <Segmented
              label="I want to see"
              value={v.mode}
              onChange={st.bind("mode")}
              options={[
                { value: "savings", label: "What my money will be worth", note: "The buying power of savings in the future." },
                { value: "prices", label: "What things will cost", note: "How much a price today will rise to." },
              ]}
            />
            <MoneyField label={savings ? "Amount saved" : "Price today"} value={v.amount} onChange={st.bind("amount")} />
            <StepperField label="Years" value={v.years} onChange={(n) => st.set("years", Math.round(n))} step={1} min={1} max={100} unit="years" dp={0} />
            <StepperField
              label="Inflation a year"
              value={v.inflation}
              onChange={st.bind("inflation")}
              step={0.1}
              min={-5}
              max={50}
              unit="%"
              dp={1}
              hint={`CPI was ${percent(CPI_LATEST.rate, 1)} in the year to ${CPI_LATEST.month}. The Bank of England target is 2%.`}
            />
          </InputGroup>
          {savings && (
            <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
              <StepperField label="Interest or growth a year" value={v.rate} onChange={st.bind("rate")} step={0.25} min={-20} max={50} unit="%" dp={2} optional hint="Leave at 0 for cash under the mattress or a current account." />
              <StepperField label="Tax on the interest" value={v.tax} onChange={st.bind("tax")} step={20} min={0} max={45} unit="%" dp={0} optional hint="0 in an ISA, or if the interest stays within your Personal Savings Allowance." />
            </AdvancedOptions>
          )}
        </>
      }
    >
      {savings ? (
        <Answer
          eyebrow={`In ${years} ${per(years, "years")}, in today's money`}
          value={gbp(realValue)}
          actions={<ShareButton copied={st.copied} onClick={st.share} />}
          sentence={
            <>
              {gbp(v.amount)} {net !== 0 ? <>growing at {percent(net, 2)} a year after tax will be {gbp(p.nom[years])}</> : <>kept as cash will still be {gbp(v.amount)}</>}, but with{" "}
              {v.inflation}% inflation it will buy what <b>{gbp(realValue)}</b> buys today.{" "}
              {lost > 0 ? <>That is a loss of <b>{gbp(lost)}</b> in buying power.</> : <>That is a real gain of <b>{gbp(-lost)}</b>.</>}
            </>
          }
          badges={[`Real return ${percent(realRate, 2)} a year`, half === Infinity ? "No loss of value" : `Halves in ${half.toFixed(1)} ${per(half.toFixed(1), "years")} at 0%`]}
        />
      ) : (
        <Answer
          eyebrow={`In ${years} ${per(years, "years")}`}
          value={gbp(cost)}
          actions={<ShareButton copied={st.copied} onClick={st.share} />}
          sentence={
            <>
              Something that costs <b>{gbp(v.amount)}</b> today will cost about <b>{gbp(cost)}</b> in {years} {per(years, "years")} if prices rise by {v.inflation}% a year, an
              increase of {percent(v.amount > 0 ? cost / v.amount - 1 : 0, 0)}.
            </>
          }
          badges={[half === Infinity ? "Prices never double" : `Prices double in ${half.toFixed(1)} ${per(half.toFixed(1), "years")}`]}
        />
      )}

      <Facts
        items={
          savings
            ? [
                { label: "In pounds", value: gbp(p.nom[years]) },
                { label: "In today's money", value: gbp(realValue) },
                { label: lost >= 0 ? "Buying power lost" : "Real gain", value: gbp(Math.abs(lost)), tone: lost > 0 ? "bad" : "good" },
                { label: "Real return a year", value: percent(realRate, 2) },
              ]
            : [
                { label: "Price today", value: gbp(v.amount) },
                { label: `Price in ${years} ${per(years, "years")}`, value: gbp(cost) },
                { label: "Rise", value: gbp(cost - v.amount) },
                { label: "Prices double in", value: half === Infinity ? "Never" : `${half.toFixed(1)} ${per(half.toFixed(1), "years")}` },
              ]
        }
      />

      <Assumptions
        items={[
          { label: "Inflation", value: `${v.inflation}% every year` },
          ...(savings ? [{ label: "Growth", value: `${v.rate}% a year${v.tax ? `, taxed at ${v.tax}%` : ""}` }] : []),
          { label: "Method", value: "Compounded yearly. Real return = (1 + return) ÷ (1 + inflation) − 1" },
        ]}
      />

      <ResultCard title={savings ? "Value over time" : "Price over time"} sub={savings ? "In pounds and in today's money." : "Price rising with inflation."}>
        <AreaChart
          ariaLabel={savings ? "Value over time" : "Price over time"}
          series={
            savings
              ? [
                  { key: "nom", label: "In pounds", color: "#94a3b8", values: p.nom, dashed: true },
                  { key: "real", label: "In today's money", color: "#5b1e6e", values: p.real, fill: true },
                ]
              : [{ key: "cost", label: "Price", color: "#5b1e6e", values: p.nom.map((_, y) => futureCost(v.amount, inf, y)), fill: true }]
          }
          xLabel={(i) => `Yr ${i}`}
          yFormat={gbpShort}
          initial={years}
          hint="Drag across the chart, or use the arrow keys, to read any year."
          readout={(i) =>
            savings ? (
              <>
                Year <b>{i}</b>: <b>{gbp(p.nom[i] ?? 0)}</b> in pounds, worth <b>{gbp(p.real[i] ?? 0)}</b> today.
              </>
            ) : (
              <>
                Year <b>{i}</b>: <b>{gbp(futureCost(v.amount, inf, i))}</b>
              </>
            )
          }
        />
      </ResultCard>

      <ResultCard title="If inflation is different" sub={`After ${years} ${per(years, "years")}.`}>
        <Compare
          head={["Inflation", savings ? "Worth today" : "Price"]}
          rows={scenarios.map((x) => ({
            label: x.r === CPI_LATEST.rate ? `${percent(x.r, 1)} (latest CPI)` : percent(x.r, 0),
            value: gbp(x.value),
            bar: x.value / maxScen,
            current: Math.abs(x.r - inf) < 1e-9,
          }))}
        />
      </ResultCard>

      <ResultCard title="Year by year" sub="Selected years.">
        <Statement
          columns={savings ? ["In pounds", "Today's money"] : ["Price"]}
          rows={rows.map((y) => ({ label: `Year ${y}`, values: savings ? [gbp(p.nom[y]), gbp(p.real[y])] : [gbp(futureCost(v.amount, inf, y))] }))}
        />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Protecting your money.">
        {savings && net < inf && (
          <Callout tone="warn" title="Your money is losing value">
            Your return of {percent(net, 2)} after tax is below inflation of {percent(inf, 1)}, so your savings buy less each year. Compare rates, and consider an ISA to keep the interest tax-free.
          </Callout>
        )}
        <Callout title="Inflation compounds">
          Prices rising by {v.inflation}% a year do not just add {v.inflation}% each time: each rise is on the higher price. Over {years} {per(years, "years")} that adds up to{" "}
          {percent(Math.pow(1 + inf, years) - 1, 0)}.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Illustration only. Future inflation is uncertain. Not financial advice.
      </p>
    </Studio>
  );
}
