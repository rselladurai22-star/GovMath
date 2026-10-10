"use client";

import { FUND_FEES_2025, invest, investScenarios } from "@/lib/us/investing";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, RadioGroup, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, DataTable, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { per, percent, usd, usdShort } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const ACCOUNTS = ["advantaged", "taxable"] as const;
type Account = (typeof ACCOUNTS)[number];

const SCHEMA = {
  start: num(10_000, 0, 100_000_000),
  monthly: num(500, 0, 1_000_000),
  ret: num(7, -10, 20),
  years: num(30, 1, 70),
  fee: num(0.5, 0, 3),
  increase: num(0, 0, 20),
  infl: num(2.5, 0, 10),
  account: oneOf<Account>("advantaged", ACCOUNTS),
  yield: num(1.5, 0, 10),
  divTax: num(15, 0, 50),
  gainsTax: num(15, 0, 50),
};
const ADVANCED = ["increase", "infl", "account", "yield", "divTax", "gainsTax"] as const;
const FEE_STEPS = [0.05, FUND_FEES_2025.indexEquityEtfs, FUND_FEES_2025.equityMutualFunds, 1, 1.5];

export default function InvestStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const taxable = v.account === "taxable";
  const input = {
    start: v.start,
    monthly: v.monthly,
    returnPct: v.ret,
    feePct: v.fee,
    years: v.years,
    increasePct: v.increase,
    inflationPct: v.infl,
    taxable,
    yieldPct: v.yield,
    dividendTaxRate: v.divTax / 100,
    gainsTaxRate: v.gainsTax / 100,
  };
  const x = invest(input);
  const keep = taxable ? x.afterSale : x.balance;
  const scenarioRates = Array.from(new Set([4, 6, 8, 10, v.ret])).sort((a, b) => a - b);
  const scen = investScenarios(input, scenarioRates);
  const topScen = Math.max(1, ...scen.map((s) => s.afterSale));
  const fees = FEE_STEPS.map((f) => ({ fee: f, r: invest({ ...input, feePct: f }) }));
  const topFee = Math.max(1, ...fees.map((f) => f.r.balance));
  const advantaged = taxable ? invest({ ...input, taxable: false }) : null;

  const bal = [Math.max(0, v.start), ...x.years.map((y) => y.balance)];
  const noFee = [Math.max(0, v.start), ...x.years.map((y) => y.noFees)];
  const paid = [Math.max(0, v.start), ...x.years.map((y) => y.contributions)];
  const step = v.years > 30 ? 5 : v.years > 15 ? 2 : 1;
  const rows = x.years.filter((y) => y.year % step === 0 || y.year === x.years.length);

  return (
    <Studio
      title="Your investments"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate my investments"
      onReset={st.reset}
      dock={{ label: `After ${v.years} ${per(v.years, "years")}`, value: usd(keep) }}
      inputs={
        <>
          <InputGroup title="Money in">
            <MoneyField label="Amount invested now" value={v.start} onChange={st.bind("start")} symbol="$" />
            <MoneyField label="Monthly investment" value={v.monthly} onChange={st.bind("monthly")} symbol="$" slider={{ min: 0, max: 5_000, step: 50, ends: ["$0", "$5k"] }} />
          </InputGroup>
          <InputGroup title="Growth and costs">
            <StepperField label="Expected return a year" value={v.ret} onChange={st.bind("ret")} step={0.5} min={-10} max={20} unit="%" dp={1} info="Before fees and inflation. Stock index funds have returned roughly 10% a year over the very long run, with big swings; many planners use 6% to 7% to be cautious." />
            <StepperField label="Fund fees (expense ratio)" value={v.fee} onChange={st.bind("fee")} step={0.05} min={0} max={3} unit="%" dp={2} info="The yearly expense ratio of your funds plus any advisory fee, as a share of the balance. Broad index funds often charge under 0.10%." />
            <StepperField label="Years" value={v.years} onChange={(n) => st.set("years", Math.round(n))} step={1} min={1} max={70} unit="years" dp={0} />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <StepperField label="Raise the monthly amount each year by" value={v.increase} onChange={st.bind("increase")} step={0.5} min={0} max={20} unit="%" dp={1} optional info="For example, in line with pay raises." />
            <StepperField label="Inflation" value={v.infl} onChange={st.bind("infl")} step={0.25} min={0} max={10} unit="%" dp={2} optional info="Shows the result in today's dollars." />
            <RadioGroup
              label="Account type"
              value={v.account}
              onChange={st.bind("account")}
              optional
              options={[
                { value: "advantaged", label: "Tax-advantaged (401(k), IRA, Roth)" },
                { value: "taxable", label: "Taxable brokerage account" },
              ]}
              info="In a taxable account, dividends are taxed each year and gains when you sell."
            />
            {taxable && (
              <>
                <StepperField label="Dividend yield" value={v.yield} onChange={st.bind("yield")} step={0.1} min={0} max={10} unit="%" dp={1} optional info="The part of the return paid out as dividends. A broad US stock index yields about 1% to 2%." />
                <StepperField label="Tax rate on dividends" value={v.divTax} onChange={st.bind("divTax")} step={1} min={0} max={50} unit="%" dp={0} optional info="Qualified dividends are taxed at 0%, 15% or 20% federally, plus state tax and possibly the 3.8% NIIT." />
                <StepperField label="Tax rate on gains when you sell" value={v.gainsTax} onChange={st.bind("gainsTax")} step={1} min={0} max={50} unit="%" dp={0} optional info="Long-term capital gains rate: 0%, 15% or 20% federally, plus state tax." />
              </>
            )}
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={taxable ? `After ${v.years} ${per(v.years, "years")}, after tax` : `After ${v.years} ${per(v.years, "years")}`}
        value={usd(keep)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            You invest <b>{usd(x.contributions)}</b> and growth adds <b>{usd(x.growth)}</b>, for a balance of <b>{usd(x.balance)}</b>.
            {" "}Fees of {v.fee}% a year cost you <b>{usd(x.feeDrag)}</b> by the end, counting the growth the fees would have earned.
            {taxable ? <> Selling everything would cost <b>{usd(x.gainsTax)}</b> of capital gains tax.</> : null}
            {" "}In today&apos;s dollars that is about <b>{usd(x.realAfterSale)}</b>.
          </>
        }
        badges={[`${v.ret}% before fees`, `${(v.ret - v.fee).toFixed(2)}% after fees (about)`, `${percent(x.balance > 0 ? x.feeDrag / (x.balance + x.feeDrag) : 0, 1)} lost to fees`]}
      />

      <Facts
        items={[
          { label: "You invest", value: usd(x.contributions) },
          { label: "Investment growth", value: usd(x.growth), tone: x.growth >= 0 ? "good" : "bad" },
          { label: "Cost of fees", value: usd(x.feeDrag), tone: x.feeDrag > 0 ? "bad" : undefined },
          { label: "In today's dollars", value: usd(x.realAfterSale) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Return", value: `${v.ret}% a year, the same every year, before ${v.fee}% fees` },
          { label: "Contributions", value: `At the end of each month${v.increase ? `, rising ${v.increase}% a year` : ""}` },
          { label: "Tax", value: taxable ? `Dividends of ${v.yield}% taxed at ${v.divTax}% each year; gains taxed at ${v.gainsTax}% when sold` : "None while invested (as in a 401(k) or IRA); withdrawals from traditional accounts are taxed later" },
          { label: "Inflation", value: `${v.infl}% a year` },
        ]}
      />

      <ResultCard title="Growth and the cost of fees" sub="Your balance, the same plan with no fees, and what you put in.">
        <AreaChart
          ariaLabel="Balance, balance without fees and contributions by year"
          series={[
            { key: "nofee", label: "With no fees", color: "#94a3b8", values: noFee, dashed: true },
            { key: "bal", label: "Your balance", color: "#0f9f6e", values: bal, fill: true },
            { key: "paid", label: "Contributions", color: "#5b1e6e", values: paid, dashed: true },
          ]}
          xLabel={(i) => `Yr ${i}`}
          yFormat={usdShort}
          initial={bal.length - 1}
          readout={(i) => (
            <>
              Year <b>{i}</b>: balance <b>{usd(bal[i] ?? 0)}</b>, without fees <b>{usd(noFee[i] ?? 0)}</b>, contributions <b>{usd(paid[i] ?? 0)}</b>.
            </>
          )}
        />
        <SplitBar
          segments={[
            { label: "Contributions", value: x.contributions, display: usd(x.contributions), color: "#94a3b8" },
            { label: "Growth you keep", value: Math.max(0, x.growth), display: usd(x.growth), color: "#0f9f6e" },
            { label: "Lost to fees", value: Math.max(0, x.feeDrag), display: usd(x.feeDrag), color: "#f59e0b" },
            ...(taxable ? [{ label: "Lost to tax", value: x.dividendTax + x.gainsTax, display: usd(x.dividendTax + x.gainsTax), color: "#e34948" }] : []),
          ]}
        />
      </ResultCard>

      <ResultCard title="At different returns" sub={`The same plan at other yearly returns, before ${v.fee}% fees${taxable ? ", after tax" : ""}.`}>
        <Compare
          head={["Return a year", "Value at the end"]}
          rows={scen.map((s) => ({
            label: `${s.returnPct}%${s.returnPct === v.ret ? " (yours)" : ""}`,
            value: usd(s.afterSale),
            delta: `${usd(s.real)} today`,
            bar: Math.max(0, s.afterSale) / topScen,
            current: s.returnPct === v.ret,
          }))}
        />
        <Callout title="Returns are never smooth">
          Real markets rise and fall from year to year. The averages above are a planning range, not a forecast. A cautious plan should still work at the lower figures.
        </Callout>
      </ResultCard>

      <ResultCard title="What different fees would cost" sub={`Your plan at ${v.ret}% before each fee level.`}>
        <Compare
          head={["Yearly fee", "Balance at the end"]}
          rows={fees.map((f) => ({
            label: `${f.fee.toFixed(2)}%`,
            value: usd(f.r.balance),
            delta: f.r.feeDrag > 0.5 ? `−${usd(f.r.feeDrag)}` : "",
            deltaTone: "down",
            bar: Math.max(0, f.r.balance) / topFee,
          }))}
        />
        <Callout title="Fees compound against you">
          A fee is charged on the whole balance every year, not just on gains. In 2025 the average equity mutual fund charged about {FUND_FEES_2025.equityMutualFunds}% and the average index equity ETF about {FUND_FEES_2025.indexEquityEtfs}% (ICI).
        </Callout>
        {taxable && advantaged && (
          <Callout tone="warn" title={`Tax costs ${usd(advantaged.balance - x.afterSale)} in a taxable account`}>
            The same plan inside a 401(k), IRA or Roth IRA would end at {usd(advantaged.balance)} before any tax on withdrawal. In a Roth, qualified withdrawals are tax-free, so filling tax-advantaged accounts first usually leaves more.
          </Callout>
        )}
      </ResultCard>

      <ResultCard title="Year by year" sub="Contributions, fees and balance at the end of each year shown.">
        <DataTable
          summary="Show the yearly table"
          columns={["Year", "Contributions", "Fees so far", "Balance", "Today's dollars"]}
          rows={rows.map((y) => [y.year, usd(y.contributions), usd(y.fees), usd(y.balance), usd(y.real)])}
        />
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Illustration only. Investments can lose value and past returns don&apos;t guarantee future results. Not financial advice.
      </p>
    </Studio>
  );
}
