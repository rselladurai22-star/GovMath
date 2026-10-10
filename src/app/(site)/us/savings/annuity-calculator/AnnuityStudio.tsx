"use client";

import { annuityBalances, annuityCost, annuityIncome, lifeExpectancy, type AnnuityTiming } from "@/lib/us/investing";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, RadioGroup, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { percent, usd, usdShort } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const MODES = ["income", "cost"] as const;
const TERMS = ["life", "term"] as const;
const TIMINGS = ["ordinary", "due"] as const;
const FREQS = ["12", "4", "1"] as const;
const FREQ_WORD: Record<(typeof FREQS)[number], string> = { "12": "month", "4": "quarter", "1": "year" };

const SCHEMA = {
  mode: oneOf<(typeof MODES)[number]>("income", MODES),
  premium: num(200_000, 0, 100_000_000),
  payment: num(1_000, 0, 10_000_000),
  rate: num(5, 0, 15),
  term: oneOf<(typeof TERMS)[number]>("life", TERMS),
  age: num(65, 40, 100),
  years: num(20, 1, 60),
  timing: oneOf<AnnuityTiming>("ordinary", TIMINGS),
  freq: oneOf<(typeof FREQS)[number]>("12", FREQS),
  rise: num(0, 0, 10),
  infl: num(2.5, 0, 10),
};
const ADVANCED = ["timing", "freq", "rise", "infl"] as const;

const fmt = (n: number) => (n < 10_000 ? usd(n, true) : usd(n));

export default function AnnuityStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const perYear = Number(v.freq);
  const word = FREQ_WORD[v.freq];
  const life = v.term === "life";
  const le = lifeExpectancy(v.age);
  const years = life ? le : v.years;
  const a = v.mode === "income" ? annuityIncome(v.premium, v.rate, years, perYear, v.timing, v.rise) : annuityCost(v.payment, v.rate, years, perYear, v.timing, v.rise);
  const other = v.mode === "income"
    ? annuityIncome(v.premium, v.rate, years, perYear, v.timing === "due" ? "ordinary" : "due", v.rise)
    : annuityCost(v.payment, v.rate, years, perYear, v.timing === "due" ? "ordinary" : "due", v.rise);
  const balances = annuityBalances(a.premium, a.payment, v.rate, years, perYear, v.timing, v.rise);
  const labels = balances.map((_, i) => (i === balances.length - 1 ? Number(years.toFixed(1)) : i));
  const yearly = a.payment * perYear;
  const lastPayment = a.payment * Math.pow(1 + v.rise / 100, Math.max(0, Math.ceil(years) - 1));
  const lastReal = lastPayment / Math.pow(1 + v.infl / 100, Math.max(0, Math.ceil(years) - 1));
  const rates = Array.from(new Set([3, 4, 5, 6, 7, v.rate])).sort((x, y) => x - y);
  const byRate = rates.map((r) => ({ r, x: v.mode === "income" ? annuityIncome(v.premium, r, years, perYear, v.timing, v.rise).payment : annuityCost(v.payment, r, years, perYear, v.timing, v.rise).premium }));
  const topRate = Math.max(1, ...byRate.map((b) => b.x));
  const longLife = life ? Math.min(100, v.age + Math.ceil(le) + 8) : 0;
  const yearsLabel = `${Number(years.toFixed(1))} years`;

  return (
    <Studio
      title="Your annuity"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel={v.mode === "income" ? "Calculate my income" : "Calculate the cost"}
      onReset={st.reset}
      dock={v.mode === "income" ? { label: `Income a ${word}`, value: fmt(a.payment) } : { label: "Cost", value: usd(a.premium) }}
      inputs={
        <>
          <InputGroup title="What you want to know">
            <RadioGroup
              label="Calculate"
              value={v.mode}
              onChange={st.bind("mode")}
              options={[
                { value: "income", label: "Income from a lump sum" },
                { value: "cost", label: "Cost of a target income" },
              ]}
            />
            {v.mode === "income" ? (
              <MoneyField label="Lump sum (premium)" value={v.premium} onChange={st.bind("premium")} symbol="$" slider={{ min: 0, max: 1_000_000, step: 5_000, ends: ["$0", "$1m"] }} />
            ) : (
              <MoneyField label={`Income wanted each ${word}`} value={v.payment} onChange={st.bind("payment")} symbol="$" slider={{ min: 0, max: 10_000, step: 50, ends: ["$0", "$10k"] }} />
            )}
            <StepperField label="Interest rate" value={v.rate} onChange={st.bind("rate")} step={0.25} min={0} max={15} unit="%" dp={2} info="The yearly rate the annuity is priced on. Insurers set it from bond yields; compare real quotes, which also reflect their costs and, for lifetime income, mortality." />
          </InputGroup>
          <InputGroup title="How long it pays">
            <RadioGroup
              label="Payments last"
              value={v.term}
              onChange={st.bind("term")}
              options={[
                { value: "life", label: "For life (estimate)" },
                { value: "term", label: "A set number of years" },
              ]}
              info="A lifetime annuity is priced on how long people your age live on average. We use the IRS Single Life Table as an estimate; an insurer's own quote will differ."
            />
            {life ? (
              <StepperField label="Your age when payments start" value={v.age} onChange={(n) => st.set("age", Math.round(n))} step={1} min={40} max={100} unit="years" dp={0} />
            ) : (
              <StepperField label="Years of payments" value={v.years} onChange={(n) => st.set("years", Math.round(n))} step={1} min={1} max={60} unit="years" dp={0} />
            )}
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <RadioGroup
              label="Payment timing"
              value={v.timing}
              onChange={st.bind("timing")}
              optional
              options={[
                { value: "ordinary", label: "End of each period (ordinary)" },
                { value: "due", label: "Start of each period (due)" },
              ]}
              info="Most immediate annuities pay at the end of each period. An annuity due pays at the start, like rent."
            />
            <RadioGroup
              label="Paid every"
              value={v.freq}
              onChange={st.bind("freq")}
              optional
              options={[
                { value: "12", label: "Month" },
                { value: "4", label: "Quarter" },
                { value: "1", label: "Year" },
              ]}
            />
            <StepperField label="Payments rise each year by" value={v.rise} onChange={st.bind("rise")} step={0.5} min={0} max={10} unit="%" dp={1} optional info="A cost-of-living rider. Rising payments start lower for the same premium." />
            <StepperField label="Inflation" value={v.infl} onChange={st.bind("infl")} step={0.25} min={0} max={10} unit="%" dp={2} optional info="Shows what the last payment is worth in today's dollars." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={v.mode === "income" ? `Income each ${word}` : "Lump sum needed"}
        value={v.mode === "income" ? fmt(a.payment) : usd(a.premium)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          v.mode === "income" ? (
            <>
              <b>{usd(a.premium)}</b> at {v.rate}% pays about <b>{fmt(a.payment)}</b> a {word} ({usd(yearly)} a year{v.rise ? " to start" : ""}) for{" "}
              {life ? <>an estimated <b>{yearsLabel}</b>, the average life expectancy at {v.age}</> : <b>{yearsLabel}</b>}. In total you receive <b>{usd(a.totalPaid)}</b>.
            </>
          ) : (
            <>
              An income of <b>{fmt(a.payment)}</b> a {word}{v.rise ? `, rising ${v.rise}% a year,` : ""} for {life ? <>an estimated <b>{yearsLabel}</b> from age {v.age}</> : <b>{yearsLabel}</b>}{" "}
              costs about <b>{usd(a.premium)}</b> at {v.rate}%. You would receive <b>{usd(a.totalPaid)}</b> in total.
            </>
          )
        }
        badges={[
          `${usd(yearly)} a year${v.rise ? " to start" : ""}`,
          a.breakEvenYears === Infinity ? "Premium not paid back" : `Premium back in ${a.breakEvenYears.toFixed(1)} years`,
          `Payout rate ${percent(a.premium > 0 ? yearly / a.premium : 0, 2)}`,
        ]}
      />

      <Facts
        items={[
          { label: "Lump sum", value: usd(a.premium) },
          { label: `Payment each ${word}`, value: fmt(a.payment) },
          { label: "Total paid out", value: usd(a.totalPaid) },
          { label: "Interest earned", value: usd(a.interest), tone: a.interest >= 0 ? "good" : "bad" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Rate", value: `${v.rate}% a year, compounded ${perYear === 12 ? "monthly" : perYear === 4 ? "quarterly" : "yearly"}` },
          { label: "Length", value: life ? `${yearsLabel}: IRS Single Life Table at age ${v.age}, an average, not a guarantee` : yearsLabel },
          { label: "Timing", value: v.timing === "due" ? "Paid at the start of each period (annuity due)" : "Paid at the end of each period (ordinary annuity)" },
          { label: "Costs", value: "No fees, commissions or rider charges; real quotes include them" },
        ]}
      />

      <ResultCard title="How the money is paid back" sub="The premium shrinking as payments come out, with interest added along the way.">
        {balances.length > 1 && (
          <AreaChart
            ariaLabel="Value left in the annuity by year"
            series={[{ key: "bal", label: "Value left", color: "#0f9f6e", values: balances, fill: true }]}
            xLabel={(i) => `Yr ${labels[i] ?? i}`}
            yFormat={usdShort}
            initial={0}
            readout={(i) => (
              <>
                After year <b>{labels[i]}</b>: <b>{usd(balances[i] ?? 0)}</b> of value left at {v.rate}%.
              </>
            )}
          />
        )}
        <SplitBar
          segments={[
            { label: "Your premium back", value: Math.min(a.premium, a.totalPaid), display: usd(Math.min(a.premium, a.totalPaid)), color: "#94a3b8" },
            { label: "Interest", value: Math.max(0, a.interest), display: usd(Math.max(0, a.interest)), color: "#0f9f6e" },
          ]}
          caption={`About ${percent(a.returnOfPremium, 1)} of each payment is your own money coming back.`}
        />
      </ResultCard>

      <ResultCard title="Present and future value" sub="The same payments valued today and at the end, at the same rate.">
        <Facts
          items={[
            { label: "Present value of the payments", value: usd(a.premium) },
            { label: `Future value after ${yearsLabel}`, value: usd(a.futureValue) },
            { label: v.timing === "due" ? "Same, paid at the end (ordinary)" : "Same, paid at the start (due)", value: v.mode === "income" ? `${fmt(other.payment)} a ${word}` : usd(other.premium) },
          ]}
        />
        <Compare
          head={["Interest rate", v.mode === "income" ? `Income a ${word}` : "Lump sum needed"]}
          rows={byRate.map((b) => ({
            label: `${b.r}%${b.r === v.rate ? " (yours)" : ""}`,
            value: v.mode === "income" ? fmt(b.x) : usd(b.x),
            bar: Math.max(0, b.x) / topRate,
            current: b.r === v.rate,
          }))}
        />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Before you buy.">
        {life && (
          <Callout tone="warn" title="Life expectancy is an average">
            About half of people live longer than average. A true lifetime annuity keeps paying even if you reach {longLife}; the figures here assume payments stop after {yearsLabel}, so they are an estimate of value, not of what an insurer will quote.
          </Callout>
        )}
        {v.rise === 0 && v.infl > 0 && years > 1 && (
          <Callout title="Fixed payments lose buying power">
            At {v.infl}% inflation, the last payment of {fmt(lastPayment)} is worth about {fmt(lastReal)} in today&apos;s dollars.
          </Callout>
        )}
        <Callout title="Compare real quotes">
          Insurers price annuities on interest rates, their costs and, for lifetime income, how long they expect you to live. Get several quotes and check the insurer&apos;s financial strength rating; state guaranty associations cover annuities only up to set limits.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        An estimate. Actual annuity quotes depend on the insurer, your age, sex, health and the contract. Not financial advice.
      </p>
    </Studio>
  );
}
