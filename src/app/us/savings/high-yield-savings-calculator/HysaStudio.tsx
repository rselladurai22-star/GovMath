"use client";

import { FDIC_LIMIT, FDIC_NATIONAL_SAVINGS_2026, realReturn, savingsAccount } from "@/lib/us/wealth";
import { RATES } from "@/lib/us/tax-2026";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, SelectField, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, DataTable, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { per, percent, usd, usdShort } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const BRACKETS = ["0", ...RATES.map((r) => String(Math.round(r * 100)))] as const;
type Bracket = (typeof BRACKETS)[number];

const SCHEMA = {
  deposit: num(10_000, 0, 100_000_000),
  monthly: num(200, 0, 1_000_000),
  apy: num(4, 0, 15),
  regular: num(FDIC_NATIONAL_SAVINGS_2026, 0, 15),
  years: num(5, 1, 50),
  bracket: oneOf<Bracket>("22", BRACKETS),
  state: num(0, 0, 15),
  change: num(0, -10, 5),
  fee: num(0, 0, 100),
  infl: num(2.5, 0, 15),
};
const ADVANCED = ["bracket", "state", "change", "fee", "infl"] as const;

export default function HysaStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const taxRate = Number(v.bracket) / 100 + v.state / 100;
  const h = savingsAccount({ deposit: v.deposit, monthly: v.monthly, apyPct: v.apy, laterChange: v.change, years: v.years, taxRate, fee: 0 });
  const g = savingsAccount({ deposit: v.deposit, monthly: v.monthly, apyPct: v.regular, laterChange: 0, years: v.years, taxRate, fee: v.fee });
  const extra = h.balance - g.balance;
  const extraAfterTax = h.afterTax - g.afterTax;
  const yearOne = (Math.max(0, v.deposit) * v.apy) / 100;
  const yearOneReg = (Math.max(0, v.deposit) * v.regular) / 100;
  const realAfterTax = realReturn(v.apy * (1 - taxRate), v.infl);
  const hBal = [Math.max(0, v.deposit), ...h.years.map((y) => y.balance)];
  const gBal = [Math.max(0, v.deposit), ...g.years.map((y) => y.balance)];
  const step = v.years > 30 ? 5 : v.years > 15 ? 2 : 1;
  const rows = h.years.map((y, i) => ({ y, r: g.years[i] })).filter(({ y }) => y.year % step === 0 || y.year === h.years.length);
  const behind = extra < 0;

  return (
    <Studio
      title="High-yield vs regular savings"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Compare accounts"
      onReset={st.reset}
      dock={{ label: "Extra with high-yield", value: usd(extra) }}
      inputs={
        <>
          <InputGroup title="Your savings">
            <MoneyField label="Opening deposit" value={v.deposit} onChange={st.bind("deposit")} symbol="$" />
            <MoneyField label="Monthly addition" value={v.monthly} onChange={st.bind("monthly")} symbol="$" slider={{ min: 0, max: 3_000, step: 25, ends: ["$0", "$3k"] }} />
            <StepperField label="Years" value={v.years} onChange={(n) => st.set("years", Math.round(n))} step={1} min={1} max={50} unit="years" dp={0} />
          </InputGroup>
          <InputGroup title="The two accounts">
            <StepperField label="High-yield savings APY" value={v.apy} onChange={st.bind("apy")} step={0.05} min={0} max={15} unit="%" dp={2} info="Top online high-yield accounts paid around 4% to 4.3% in early October 2026. The rate is variable." />
            <StepperField label="Regular savings APY" value={v.regular} onChange={st.bind("regular")} step={0.05} min={0} max={15} unit="%" dp={2} info="The FDIC national average savings rate was 0.37% on September 21, 2026. Many big-bank accounts pay 0.01%." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <SelectField label="Federal tax bracket" value={v.bracket} onChange={st.bind("bracket")} optional options={BRACKETS.map((b) => ({ value: b, label: b === "0" ? "No federal tax" : `${b}%` }))} info="Interest is taxed as ordinary income at your top federal rate." />
            <StepperField label="State income tax rate" value={v.state} onChange={st.bind("state")} step={0.25} min={0} max={15} unit="%" dp={2} optional info="Most states tax interest as income. Nine states have no tax on wages and interest." />
            <StepperField label="High-yield rate change after year 1" value={v.change} onChange={st.bind("change")} step={0.25} min={-10} max={5} unit="points" dp={2} optional info="Savings rates follow the Federal Reserve. Enter −1 to see what happens if the rate falls a point after the first year, or if an intro bonus ends." />
            <MoneyField label="Regular account monthly fee" value={v.fee} onChange={st.bind("fee")} symbol="$" max={100} optional info="Some branch accounts charge a maintenance fee unless you keep a minimum balance. Most online accounts charge none." />
            <StepperField label="Inflation" value={v.infl} onChange={st.bind("infl")} step={0.25} min={0} max={15} unit="%" dp={2} optional />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={`Extra interest over ${v.years} ${per(v.years, "years")}`}
        value={usd(extra)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          behind ? (
            <>
              At these rates the regular account ends ahead, at <b>{usd(g.balance)}</b>{" "}against <b>{usd(h.balance)}</b>. Check the two APYs.
            </>
          ) : (
            <>
              At <b>{v.apy}%</b>{" "}APY your savings grow to <b>{usd(h.balance)}</b>, against <b>{usd(g.balance)}</b>{" "}at {v.regular}%. You earn{" "}
              <b>{usd(h.interest)}</b>{" "}of interest instead of {usd(g.interest)}
              {taxRate > 0 ? (
                <>
                  , and still keep <b>{usd(extraAfterTax)}</b>{" "}more after tax at {percent(taxRate, 1)}.
                </>
              ) : (
                "."
              )}
            </>
          )
        }
        badges={[`Year one: ${usd(yearOne)} vs ${usd(yearOneReg)}`, v.regular > 0 ? `${(v.apy / v.regular).toFixed(1)}× the rate` : "Regular pays nothing", `Real return after tax ${realAfterTax.toFixed(2)}%`]}
      />

      <Facts
        items={[
          { label: "High-yield balance", value: usd(h.balance) },
          { label: "Regular balance", value: usd(g.balance) },
          { label: "Difference before tax", value: usd(extra), tone: behind ? "bad" : "good" },
          { label: "Difference after tax", value: usd(extraAfterTax), tone: extraAfterTax < 0 ? "bad" : "good" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Interest", value: "Credited monthly, at the monthly equivalent of each APY" },
          { label: "Deposits", value: `${usd(v.deposit)} now and ${usd(v.monthly)} at the end of each month` },
          { label: "High-yield rate", value: v.change ? `${v.apy}% for 12 months, then ${Math.max(0, v.apy + v.change).toFixed(2)}%` : `${v.apy}% throughout` },
          { label: "Tax", value: taxRate > 0 ? `${percent(taxRate, 2)} on each year's interest, paid from the account each December` : "None" },
        ]}
      />

      <ResultCard title="Your high-yield balance" sub="What you put in and the interest it earns.">
        <SplitBar
          segments={[
            { label: "Your deposits", value: h.deposits, display: usd(h.deposits), color: "#94a3b8" },
            { label: "Interest", value: Math.max(0, h.interest), display: usd(h.interest), color: "#0f9f6e" },
          ]}
        />
      </ResultCard>

      <ResultCard title="Side by side" sub={`After ${v.years} ${per(v.years, "years")}, with the same deposits.`}>
        <Statement
          columns={["High-yield", "Regular"]}
          rows={[
            { label: "APY", values: [v.change ? `${v.apy}% → ${Math.max(0, v.apy + v.change).toFixed(2)}%` : `${v.apy}%`, `${v.regular}%`] },
            { label: "Interest earned", values: [usd(h.interest), usd(g.interest)] },
            ...(v.fee > 0 ? [{ label: "Fees", values: [usd(0), usd(g.fees)], kind: "deduction" as const }] : []),
            { label: "Balance before tax", values: [usd(h.balance), usd(g.balance)], kind: "total" },
            { label: "Tax on interest", values: [usd(h.tax), usd(g.tax)], kind: "deduction" },
            { label: "Balance after tax", values: [usd(h.afterTax), usd(g.afterTax)], kind: "total" },
          ]}
        />
      </ResultCard>

      <ResultCard title="Growth over time" sub="Both balances, before tax.">
        <AreaChart
          ariaLabel="High-yield and regular savings balances by year"
          series={[
            { key: "hy", label: "High-yield", color: "#0f9f6e", values: hBal, fill: true },
            { key: "reg", label: "Regular", color: "#94a3b8", values: gBal, dashed: true },
          ]}
          xLabel={(i) => `Yr ${i}`}
          yFormat={usdShort}
          initial={hBal.length - 1}
          readout={(i) => (
            <>
              Year <b>{i}</b>: high-yield <b>{usd(hBal[i] ?? 0)}</b>, regular <b>{usd(gBal[i] ?? 0)}</b>, a gap of <b>{usd((hBal[i] ?? 0) - (gBal[i] ?? 0))}</b>.
            </>
          )}
        />
        <DataTable
          summary="Show the yearly table"
          columns={["Year", "High-yield", "Regular", "Gap", "High-yield after tax"]}
          rows={rows.map(({ y, r }) => [y.year, usd(y.balance), usd(r?.balance ?? 0), usd(y.balance - (r?.balance ?? 0)), usd(y.afterTax)])}
        />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Before you move your money.">
        {h.balance > FDIC_LIMIT && (
          <Callout tone="warn" title="Above the FDIC limit">
            Your balance passes $250,000. FDIC insurance covers up to $250,000 per depositor, per insured bank, per ownership category. Spread larger
            sums across banks or ownership categories, such as a joint account.
          </Callout>
        )}
        <Callout title={realAfterTax < 0 ? "Losing ground to inflation" : "Beating inflation, just"}>
          After {percent(taxRate, 0)} tax and {v.infl}% inflation, {v.apy}% is a real return of about {realAfterTax.toFixed(2)}% a year. Savings accounts
          are for safety and short-term goals; long-term money usually belongs in investments.
        </Callout>
        <Callout title="Rates are variable">
          A high-yield rate can change at any time, usually after Federal Reserve rate decisions. Check whether a headline rate is a bonus for a few
          months or needs a minimum balance or direct deposit.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Illustration only. Savings rates are variable. Not financial advice.
      </p>
    </Studio>
  );
}
