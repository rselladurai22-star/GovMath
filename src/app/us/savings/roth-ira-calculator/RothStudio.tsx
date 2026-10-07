"use client";

import { grow, rothLimit } from "@/lib/us/savings";
import { rothVsTaxable } from "@/lib/us/savings-extra";
import { FILING_LABEL, US_2026, type FilingStatus } from "@/lib/us/tax-2026";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, SelectField, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { per, usd, usdShort } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const STATUSES = ["single", "mfj", "hoh", "mfs"] as const;

const SCHEMA = {
  age: num(30, 18, 90),
  retire: num(65, 19, 100),
  status: oneOf<FilingStatus>("single", STATUSES),
  magi: num(90_000, 0, 10_000_000),
  want: num(7_500, 0, 100_000),
  balance: num(0, 0, 100_000_000),
  ret: num(7, -10, 20),
  earned: num(0, 0, 10_000_000),
  yieldPct: num(1.5, 0, 10),
  taxRate: oneOf<"0" | "15" | "20" | "23.8">("15", ["0", "15", "20", "23.8"]),
  infl: num(2.5, 0, 10),
};
const ADVANCED = ["earned", "yieldPct", "taxRate", "infl"] as const;

export default function RothStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const earned = v.earned > 0 ? v.earned : v.magi;
  const lim = rothLimit(v.magi, v.status, v.age, earned);
  const yearly = Math.min(v.want, lim.limit);
  const years = Math.max(0, Math.round(v.retire - v.age));
  const g = grow(v.balance, yearly / 12, v.ret, years, "monthly", v.infl);
  const rate = Number(v.taxRate) / 100;
  const cmp = rothVsTaxable(v.balance, yearly / 12, v.ret, years, v.yieldPct, rate, rate);
  const [lo, hi] = US_2026.rothPhaseOut[v.status];

  const bal = [Math.max(0, v.balance), ...g.years.map((y) => y.balance)];
  const paid = [Math.max(0, v.balance), ...g.years.map((y) => y.deposits)];

  const phaseText =
    lim.phase === "full" ? "Full contribution allowed" : lim.phase === "partial" ? `Reduced: inside the ${usd(lo)} to ${usd(hi)} phase-out` : `None: income above ${usd(hi)}`;

  return (
    <Studio
      title="Your Roth IRA"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate my Roth IRA"
      onReset={st.reset}
      dock={{ label: `At ${v.retire}`, value: usd(g.balance) }}
      inputs={
        <>
          <InputGroup title="You">
            <StepperField label="Your age" value={v.age} onChange={(n) => st.set("age", Math.round(n))} step={1} min={18} max={90} unit="years" dp={0} info="From 50 (by December 31) you can add a $1,100 catch-up." />
            <StepperField label="Age you'll stop and look" value={v.retire} onChange={(n) => st.set("retire", Math.round(n))} step={1} min={19} max={100} unit="years" dp={0} info="Usually your retirement age. Earnings are tax-free from 59½ once the account is five years old." />
            <SelectField label="Filing status" value={v.status} onChange={st.bind("status")} options={STATUSES.map((s) => ({ value: s, label: FILING_LABEL[s] }))} />
            <MoneyField label="Modified AGI for 2026" value={v.magi} onChange={st.bind("magi")} symbol="$" slider={{ min: 0, max: 300_000, step: 1_000, ends: ["$0", "$300k"] }} info="Roughly your adjusted gross income from your tax return. Traditional 401(k) contributions lower it." />
          </InputGroup>
          <InputGroup title="Saving">
            <MoneyField label="You want to contribute each year" value={v.want} onChange={st.bind("want")} symbol="$" info="We cap it at the limit your income and age allow." />
            <MoneyField label="Roth IRA balance now" value={v.balance} onChange={st.bind("balance")} symbol="$" />
            <StepperField label="Investment return a year" value={v.ret} onChange={st.bind("ret")} step={0.5} min={-10} max={20} unit="%" dp={1} info="7% is a common long-run assumption for a mostly stock portfolio. Not guaranteed." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <MoneyField label="Earned income, if different" value={v.earned} onChange={st.bind("earned")} symbol="$" optional info="Wages and self-employment income. You can't contribute more than this. Leave at $0 to use your modified AGI." />
            <StepperField label="Dividend yield in a taxable account" value={v.yieldPct} onChange={st.bind("yieldPct")} step={0.25} min={0} max={10} unit="%" dp={2} optional info="The part of the return paid out each year as dividends, taxed every year in a taxable account. A broad US stock fund yields roughly 1% to 2%." />
            <SelectField
              label="Your capital gains and dividend tax rate"
              value={v.taxRate}
              onChange={st.bind("taxRate")}
              optional
              info="Federal rate on qualified dividends and long-term gains. 23.8% includes the 3.8% net investment income tax. State tax is not included."
              options={[
                { value: "0", label: "0%" },
                { value: "15", label: "15%" },
                { value: "20", label: "20%" },
                { value: "23.8", label: "23.8% (20% + 3.8% NIIT)" },
              ]}
            />
            <StepperField label="Inflation" value={v.infl} onChange={st.bind("infl")} step={0.25} min={0} max={10} unit="%" dp={2} optional />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={`Your Roth IRA at ${v.retire}`}
        value={usd(g.balance)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          lim.limit === 0 ? (
            <>
              With modified AGI of <b>{usd(v.magi)}</b> you can&apos;t contribute to a Roth IRA directly in 2026. {v.balance > 0 ? <>Your current balance could still grow to <b>{usd(g.balance)}</b>.</> : null} A backdoor Roth may still be open to you.
            </>
          ) : (
            <>
              Your 2026 limit is <b>{usd(lim.limit)}</b>. Putting in <b>{usd(yearly)}</b> a year for {years} {per(years, "years")} could grow to <b>{usd(g.balance)}</b>, all of it tax-free in retirement. That is
              about <b>{usd(g.real)}</b> in today&apos;s dollars.
            </>
          )
        }
        badges={[`2026 limit ${usd(lim.limit)}`, phaseText, `${usd(Math.max(0, cmp.advantage))} more than taxable`]}
      />

      <Facts
        items={[
          { label: "Your 2026 limit", value: usd(lim.limit), tone: lim.phase === "full" ? "good" : lim.phase === "partial" ? "warn" : "bad" },
          { label: "Total put in", value: usd(g.deposits) },
          { label: "Tax-free growth", value: usd(g.interest), tone: "good" },
          { label: "In today's dollars", value: usd(g.real) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Contributions", value: `${usd(yearly)} a year, spread monthly, the same every year` },
          { label: "Return", value: `${v.ret}% a year, steady, after fund costs` },
          { label: "Taxable account", value: `${v.yieldPct}% dividends taxed yearly and gains taxed on sale, both at ${v.taxRate}% (federal only)` },
          { label: "Withdrawals", value: "Qualified: after 59½ and five years, so tax-free" },
          { label: "Limits", value: "Held at 2026 levels" },
        ]}
      />

      <ResultCard title="Growth over time" sub="Your Roth IRA balance compared with what you put in.">
        <AreaChart
          ariaLabel="Roth IRA balance by age"
          series={[
            { key: "bal", label: "Balance", color: "#0f9f6e", values: bal, fill: true },
            { key: "paid", label: "Put in", color: "#94a3b8", values: paid, dashed: true },
          ]}
          xLabel={(i) => `${v.age + i}`}
          yFormat={usdShort}
          initial={bal.length - 1}
          hint="Drag across the chart, or use the arrow keys, to read any age."
          readout={(i) => (
            <>
              At <b>{v.age + i}</b>: balance <b>{usd(bal[i] ?? 0)}</b>, of which <b>{usd((bal[i] ?? 0) - (paid[i] ?? 0))}</b> is growth.
            </>
          )}
        />
        <SplitBar
          segments={[
            { label: "Put in", value: g.deposits, display: usd(g.deposits), color: "#94a3b8" },
            { label: "Tax-free growth", value: Math.max(0, g.interest), display: usd(g.interest), color: "#0f9f6e" },
          ]}
        />
      </ResultCard>

      <ResultCard title="Roth IRA vs a taxable account" sub="The same saving, after tax, if you sold everything at the end.">
        <Compare
          head={["Account", "You keep"]}
          rows={[
            { label: "Roth IRA", value: usd(cmp.roth), bar: 1, current: true },
            {
              label: "Taxable brokerage account",
              value: usd(cmp.taxableAfterSale),
              delta: cmp.advantage > 0.5 ? `−${usd(cmp.advantage)}` : undefined,
              deltaTone: "down",
              bar: cmp.roth > 0 ? Math.max(0, cmp.taxableAfterSale / cmp.roth) : 0,
            },
          ]}
        />
        <p className="footnote">
          In the taxable account you would pay about {usd(cmp.dividendTax)} of tax on dividends along the way and {usd(cmp.gainsTax)} of capital gains tax on selling.
        </p>
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Rules that affect your Roth IRA.">
        {lim.phase !== "full" && (
          <Callout tone="warn" title={lim.phase === "none" ? "Over the income limit" : "Reduced contribution"}>
            {lim.phase === "none"
              ? `For ${FILING_LABEL[v.status].toLowerCase()} filers the Roth IRA phases out completely at ${usd(hi)} of modified AGI. A backdoor Roth (a nondeductible traditional IRA contribution converted to Roth) is the usual route; watch the pro-rata rule if you hold other pre-tax IRA money.`
              : `Your income is inside the ${usd(lo)} to ${usd(hi)} phase-out, so your limit falls from ${usd(lim.full)} to ${usd(lim.limit)}. Lowering your modified AGI, for example with traditional 401(k) contributions, raises it.`}
          </Callout>
        )}
        {v.want > lim.limit && lim.limit > 0 && (
          <Callout title={`Capped at ${usd(lim.limit)}`}>Contributions above your limit are charged a 6% excise tax each year they stay in. We used {usd(lim.limit)}.</Callout>
        )}
        <Callout title="The five-year rule">
          Earnings are tax-free only once you are 59½ and five tax years have passed since your first Roth IRA contribution. Your contributions themselves can come out at any time without tax or penalty.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Illustration only. Returns vary and are not guaranteed. Not tax or financial advice.
      </p>
    </Studio>
  );
}
