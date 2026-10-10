"use client";

import { dividendPlan, dividendTax } from "@/lib/us/wealth";
import { FILING_LABEL, type FilingStatus } from "@/lib/us/tax-2026";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, RadioGroup, SelectField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, DataTable, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { per, percent, usd, usdShort } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const STATUSES = ["single", "mfj", "mfs", "hoh"] as const;
type Account = "taxable" | "sheltered";

const SCHEMA = {
  start: num(50_000, 0, 100_000_000),
  monthly: num(500, 0, 1_000_000),
  yield: num(3, 0, 15),
  divGrowth: num(5, -10, 20),
  years: num(20, 1, 60),
  drip: bool(true),
  price: num(4, -10, 20),
  account: oneOf<Account>("taxable", ["taxable", "sheltered"]),
  status: oneOf<FilingStatus>("single", STATUSES),
  agi: num(90_000, 0, 100_000_000),
  qualified: num(100, 0, 100),
};
const ADVANCED = ["price", "account", "status", "agi", "qualified"] as const;

export default function DividendStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const base = { start: v.start, monthly: v.monthly, yieldPct: v.yield, dividendGrowthPct: v.divGrowth, priceGrowthPct: v.price, years: v.years };
  const p = dividendPlan({ ...base, drip: v.drip });
  const other = dividendPlan({ ...base, drip: !v.drip });
  const drip = v.drip ? p : other;
  const cash = v.drip ? other : p;
  const taxable = v.account === "taxable";
  const tax = dividendTax(v.agi, p.firstYearDividends, v.qualified / 100, v.status);
  const lifetimeTax = taxable ? p.totalDividends * tax.effective : 0;
  const growth = Math.max(0, p.value - p.deposits - (v.drip ? p.totalDividends : 0));
  const priceLoss = p.value - p.deposits - (v.drip ? p.totalDividends : 0) < 0;
  const step = v.years > 30 ? 5 : v.years > 15 ? 2 : 1;
  const rows = p.years.filter((y) => y.year % step === 0 || y.year === p.years.length);
  const startIncome = (Math.max(0, v.start) * v.yield) / 100;
  const incDrip = [startIncome, ...drip.years.map((y) => y.dividends)];
  const incCash = [startIncome, ...cash.years.map((y) => y.dividends)];

  return (
    <Studio
      title="Your dividend plan"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate dividends"
      onReset={st.reset}
      dock={{ label: `Yearly income after ${v.years} ${per(v.years, "years")}`, value: usd(p.finalIncome) }}
      inputs={
        <>
          <InputGroup title="Your investment">
            <MoneyField label="Starting investment" value={v.start} onChange={st.bind("start")} symbol="$" />
            <MoneyField label="Monthly contribution" value={v.monthly} onChange={st.bind("monthly")} symbol="$" slider={{ min: 0, max: 5_000, step: 50, ends: ["$0", "$5k"] }} />
            <StepperField label="Dividend yield" value={v.yield} onChange={st.bind("yield")} step={0.1} min={0} max={15} unit="%" dp={2} info="Yearly dividends as a share of the price. A broad S&P 500 fund yielded only about 1% in 2026; dividend-focused funds often yield 2.5% to 4%." />
            <StepperField label="Dividend growth a year" value={v.divGrowth} onChange={st.bind("divGrowth")} step={0.5} min={-10} max={20} unit="%" dp={1} info="How fast the dividend per share rises. Companies that raise their dividends every year have often grown them by mid-single digits; cuts happen too." />
            <StepperField label="Years" value={v.years} onChange={(n) => st.set("years", Math.round(n))} step={1} min={1} max={60} unit="years" dp={0} />
            <Switch label="Reinvest dividends (DRIP)" checked={v.drip} onChange={st.bind("drip")} info="On: each dividend buys more shares. Off: dividends are paid to you in cash." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <StepperField label="Share price growth a year" value={v.price} onChange={st.bind("price")} step={0.5} min={-10} max={20} unit="%" dp={1} optional info="The total return is roughly the yield plus price growth. 3% yield and 4% price growth is about a 7% total return." />
            <RadioGroup label="Account" value={v.account} onChange={st.bind("account")} optional options={[{ value: "taxable", label: "Taxable brokerage" }, { value: "sheltered", label: "IRA, 401(k) or HSA" }]} />
            <SelectField label="Filing status" value={v.status} onChange={st.bind("status")} optional options={STATUSES.map((s) => ({ value: s, label: FILING_LABEL[s] }))} />
            <MoneyField label="Other income (AGI) before dividends" value={v.agi} onChange={st.bind("agi")} symbol="$" optional info="Your adjusted gross income without the dividends. We take off the 2026 standard deduction to find where the dividends land in the brackets." />
            <StepperField label="Share of dividends that are qualified" value={v.qualified} onChange={st.bind("qualified")} step={5} min={0} max={100} unit="%" dp={0} optional info="US stock funds held long enough are usually close to 100%. REITs, bond funds and money market funds pay mostly ordinary dividends. Box 1b of Form 1099-DIV shows the qualified part." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={`Dividend income a year after ${v.years} ${per(v.years, "years")}`}
        value={usd(p.finalIncome)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            Your portfolio grows to <b>{usd(p.value)}</b>{" "}from <b>{usd(p.deposits)}</b>{" "}of your own money and pays <b>{usd(p.totalDividends)}</b>{" "}of
            dividends along the way{v.drip ? ", all reinvested" : ", paid to you in cash"}. By the end it pays about <b>{usd(p.finalIncome / 12)}</b>{" "}a
            month, a yield on cost of <b>{percent(p.yieldOnCost, 1)}</b>.
          </>
        }
        badges={[`First year ${usd(p.firstYearDividends)}`, v.drip ? `DRIP adds ${usd(drip.value - cash.value - cash.cash)}` : `${usd(cash.cash)} paid out`, taxable ? `Tax ${percent(tax.effective, 1)} of dividends` : "Tax-sheltered"]}
      />

      <Facts
        items={[
          { label: "Portfolio value", value: usd(p.value) },
          { label: "Total dividends", value: usd(p.totalDividends), tone: "good" },
          { label: "Yield on cost", value: percent(p.yieldOnCost, 2), note: "final income ÷ money put in" },
          { label: taxable ? "Tax on year-one dividends" : "Tax each year", value: taxable ? usd(tax.total) : "$0" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Dividends", value: `Paid quarterly at a ${v.yield}% yield on the price at the start, rising ${v.divGrowth}% a year` },
          { label: "Share price", value: `Rises ${v.price}% a year; contributions at the end of each month` },
          { label: "Reinvesting", value: v.drip ? "Every dividend buys more shares at that day's price" : "Dividends paid out in cash, not reinvested" },
          { label: "Tax", value: taxable ? "Paid from other money, not from the account; 2026 rates" : "None while the money stays in the account" },
        ]}
      />

      <ResultCard title="Where the value comes from" sub={v.drip ? "Your money, reinvested dividends and price growth." : "Your money and price growth; the dividends were paid out separately."}>
        <SplitBar
          segments={[
            { label: "Your contributions", value: p.deposits, display: usd(p.deposits), color: "#94a3b8" },
            ...(v.drip ? [{ label: "Reinvested dividends", value: p.totalDividends, display: usd(p.totalDividends), color: "#0f9f6e" }] : []),
            { label: "Price growth", value: growth, display: usd(growth), color: "#f59e0b" },
          ]}
          caption={priceLoss ? "The share price fell over the period, so the value is below what went in." : undefined}
        />
      </ResultCard>

      <ResultCard title="Dividends each year" sub="Dividend income with reinvestment and without.">
        <AreaChart
          ariaLabel="Dividend income each year, with and without reinvestment"
          series={[
            { key: "drip", label: "With DRIP", color: "#0f9f6e", values: incDrip, fill: true },
            { key: "cash", label: "Without DRIP", color: "#94a3b8", values: incCash, dashed: true },
          ]}
          xLabel={(i) => `Yr ${i}`}
          yFormat={usdShort}
          initial={incDrip.length - 1}
          readout={(i) => (
            <>
              Year <b>{i}</b>: <b>{usd(incDrip[i] ?? 0)}</b>{" "}of dividends with reinvestment, <b>{usd(incCash[i] ?? 0)}</b>{" "}without.
            </>
          )}
        />
        <Statement
          columns={["With DRIP", "Without DRIP"]}
          rows={[
            { label: "Portfolio value", values: [usd(drip.value), usd(cash.value)] },
            { label: "Dividends paid to you in cash", values: [usd(0), usd(cash.cash)] },
            { label: "Value plus cash received", values: [usd(drip.value), usd(cash.value + cash.cash)], kind: "total" },
            { label: "Yearly income at the end", values: [usd(drip.finalIncome), usd(cash.finalIncome)] },
          ]}
        />
      </ResultCard>

      {taxable && (
        <ResultCard title="Tax on your dividends" sub={`Year one: ${usd(p.firstYearDividends)} of dividends, ${FILING_LABEL[v.status].toLowerCase()}, ${usd(v.agi)} of other income.`}>
          <Statement
            columns={["Tax"]}
            rows={[
              { label: `Qualified dividends (${usd(tax.qualified)}) at 0%, 15% or 20%, and ordinary dividends (${usd(tax.nonQualified)}) at your bracket`, values: [usd(tax.incomeTax)] },
              { label: "Net investment income tax (3.8%)", values: [usd(tax.niit)] },
              { label: "Total federal tax", values: [usd(tax.total)], kind: "total" },
              { label: "If all of it were taxed as ordinary income", values: [usd(tax.ifAllOrdinary)] },
            ]}
          />
          <Callout title={`About ${usd(lifetimeTax)} of tax over ${v.years} ${per(v.years, "years")}`}>
            At this year&apos;s rate of {percent(tax.effective, 1)}. Holding dividend payers in an IRA, 401(k) or Roth avoids this yearly tax. State income
            tax may apply on top.
          </Callout>
        </ResultCard>
      )}

      <ResultCard title="Year by year" sub="Contributions, dividends received in the year, value and yearly income at the end of each year shown.">
        <DataTable
          summary="Show the yearly table"
          columns={["Year", "Contributed", "Dividends that year", "Value", "Yearly income"]}
          rows={rows.map((y) => [y.year, usd(y.deposits), usd(y.dividends), usd(y.value), usd(y.income)])}
        />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Before you chase yield.">
        {v.yield >= 6 && (
          <Callout tone="warn" title="A very high yield can be a warning">
            A yield far above the market often means the share price has fallen because investors expect a dividend cut. Check whether earnings cover
            the dividend.
          </Callout>
        )}
        <Callout title="Dividends aren't free money">
          On the day a stock goes ex-dividend, its price drops by about the dividend. What matters is total return, dividends plus price growth, not
          the yield alone.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Illustration only. Dividends can be cut and share prices can fall. Not financial advice.
      </p>
    </Studio>
  );
}
