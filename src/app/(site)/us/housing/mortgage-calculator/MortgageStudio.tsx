"use client";

import { mortgage, yearly } from "@/lib/us/mortgage";
import { pmiMilestones } from "@/lib/us/housing-loans-extra";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, SelectField, StepperField } from "@/components/flagship/inputs";
import { propertyTaxPct, STATES } from "@/lib/us/states";
import { Answer, Assumptions, Callout, DataTable, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { duration, percent, usd, usdShort } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const SCHEMA = {
  price: num(400_000, 0, 100_000_000),
  downMode: oneOf<"pct" | "usd">("pct", ["pct", "usd"]),
  downPct: num(10, 0, 100),
  down: num(40_000, 0, 100_000_000),
  rate: num(7.25, 0, 30),
  years: oneOf<"15" | "20" | "30">("30", ["15", "20", "30"]),
  taxMode: oneOf<"rate" | "usd">("rate", ["rate", "usd"]),
  state: oneOf<string>("US", ["US", ...STATES.map((s) => s.code)]),
  taxRate: num(propertyTaxPct("US"), 0, 10),
  taxAmount: num(4_000, 0, 10_000_000),
  insurance: num(1_800, 0, 1_000_000),
  hoa: num(0, 0, 100_000),
  pmiRate: num(0.5, 0, 5),
  extra: num(0, 0, 1_000_000),
};
const ADVANCED = ["taxMode", "taxRate", "taxAmount", "insurance", "hoa", "pmiRate", "extra"] as const;

/** "month 118" → "year 10, month 10". */
function when(month: number): string {
  if (month <= 0) return "from the start";
  return `after ${duration(month)}`;
}

export default function MortgageStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const years = Number(v.years);
  const down = Math.min(v.price, v.downMode === "pct" ? (v.price * v.downPct) / 100 : v.down);
  const propertyTax = v.taxMode === "rate" ? (v.price * v.taxRate) / 100 : v.taxAmount;
  const m = mortgage({ price: v.price, down, aprPct: v.rate, years, propertyTax, insurance: v.insurance, hoa: v.hoa, pmiRate: v.pmiRate / 100, extra: v.extra });
  const pmi = pmiMilestones(v.price, m.loan, v.rate, years, v.extra);
  const yr = yearly(m.schedule);
  const base = yearly(m.baseline);
  const bal = [m.loan, ...yr.map((y) => y.balance)];
  const baseBal = [m.loan, ...base.map((y) => y.balance)];
  const interestPaid = yr.reduce<number[]>((acc, y) => [...acc, acc[acc.length - 1] + y.interest], [0]);
  const hasExtra = v.extra > 0 && m.loan > 0;
  const downShare = v.price > 0 ? down / v.price : 0;
  const payoff = m.schedule.months;

  return (
    <Studio
      title="Your mortgage"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate my payment"
      onReset={st.reset}
      dock={{ label: "Monthly payment", value: usd(m.total) }}
      inputs={
        <>
          <InputGroup title="The home and the loan">
            <MoneyField label="Home price" symbol="$" value={v.price} onChange={st.bind("price")} slider={{ min: 50_000, max: 2_000_000, step: 5_000, ends: ["$50k", "$2m"] }} />
            <Segmented
              label="Enter the down payment as"
              value={v.downMode}
              onChange={(mode) => {
                // Carry the amount across so switching does not change the answer.
                if (mode === "usd") st.set("down", Math.round(down));
                else st.set("downPct", v.price > 0 ? Math.round((down / v.price) * 1000) / 10 : 0);
                st.set("downMode", mode);
              }}
              options={[
                { value: "pct", label: "Percent" },
                { value: "usd", label: "Dollars" },
              ]}
            />
            {v.downMode === "pct" ? (
              <StepperField label="Down payment" value={v.downPct} onChange={st.bind("downPct")} step={1} min={0} max={100} unit="%" dp={1} aside={usd(down)} />
            ) : (
              <MoneyField label="Down payment" symbol="$" value={v.down} onChange={st.bind("down")} aside={percent(downShare, 1)} />
            )}
            <StepperField
              label="Interest rate"
              value={v.rate}
              onChange={st.bind("rate")}
              step={0.125}
              min={0}
              max={30}
              unit="%"
              dp={3}
              info="Freddie Mac's weekly survey put the average 30-year fixed rate at about 7.3% and the 15-year at about 6.6% on October 1, 2026. Use the rate on your Loan Estimate if you have one."
            />
            <Segmented
              label="Loan term"
              value={v.years}
              onChange={st.bind("years")}
              options={[
                { value: "15", label: "15 years" },
                { value: "20", label: "20 years" },
                { value: "30", label: "30 years" },
              ]}
            />
            <SelectField
              label="State"
              value={v.state}
              onChange={(code) => {
                st.set("state", code);
                st.set("taxRate", propertyTaxPct(code)); st.set("taxMode", "rate");
              }}
              options={[{ value: "US", label: "US average" }, ...STATES.map((s) => ({ value: s.code, label: s.name }))]}
              info={`Sets the property tax rate to the ${v.state === "US" ? "national" : "state"} typical figure (${propertyTaxPct(v.state)}%). You can change it under More options.`}
            />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <Segmented
              label="Enter property tax as"
              optional
              value={v.taxMode}
              onChange={st.bind("taxMode")}
              options={[
                { value: "rate", label: "Rate of the price" },
                { value: "usd", label: "Dollars a year" },
              ]}
            />
            {v.taxMode === "rate" ? (
              <StepperField
                label="Property tax rate"
                optional
                value={v.taxRate}
                onChange={st.bind("taxRate")}
                step={0.05}
                min={0}
                max={10}
                unit="%"
                dp={2}
                aside={`${usd(propertyTax)} a year`}
                info="Statewide typical rates run from about 0.27% in Hawaii to about 1.9% in New Jersey and Illinois (Census Bureau, 2024). Your county assessor's site has the real figure."
              />
            ) : (
              <MoneyField label="Property tax a year" symbol="$" optional value={v.taxAmount} onChange={st.bind("taxAmount")} />
            )}
            <MoneyField label="Homeowners insurance a year" symbol="$" optional value={v.insurance} onChange={st.bind("insurance")} info="Get a quote: premiums vary a lot by state, with storm and wildfire areas costing far more." />
            <MoneyField label="HOA dues a month" symbol="$" optional value={v.hoa} onChange={st.bind("hoa")} />
            <StepperField
              label="PMI rate a year"
              optional
              value={v.pmiRate}
              onChange={st.bind("pmiRate")}
              step={0.05}
              min={0}
              max={5}
              unit="%"
              dp={2}
              info="Private mortgage insurance applies to conventional loans with less than 20% down. Freddie Mac puts it at about $30 to $70 a month per $100,000 borrowed, roughly 0.35% to 0.85% a year, depending on your credit score and down payment."
            />
            <MoneyField label="Extra principal each month" symbol="$" optional value={v.extra} onChange={st.bind("extra")} />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Monthly payment"
        value={usd(m.total)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            Borrowing <b>{usd(m.loan)}</b>{" "}over {years} years at {v.rate}% costs <b>{usd(m.principalAndInterest)}</b>{" "}a month in principal and interest. With property tax,
            insurance{m.hoa > 0 ? ", HOA dues" : ""}
            {m.pmiMonthly > 0 ? " and PMI" : ""}, your first payment is <b>{usd(m.total)}</b>.
            {m.pmiMonthly > 0 ? (
              <>
                {" "}PMI of {usd(m.pmiMonthly)} drops off {when(m.pmiMonths)}, taking the payment to {usd(m.total - m.pmiMonthly)}.
              </>
            ) : null}
          </>
        }
        badges={[
          `Loan ${usd(m.loan)}`,
          `${percent(m.ltv, 0)} loan-to-value`,
          m.pmiMonthly > 0 ? `PMI for ${duration(m.pmiMonths)}` : "No PMI",
          m.loan > 0 ? `Paid off in ${duration(payoff)}` : "No loan",
        ]}
      />

      <Facts
        items={[
          { label: "Principal and interest", value: usd(m.principalAndInterest) },
          { label: "Tax and insurance", value: usd(m.taxMonthly + m.insuranceMonthly) },
          { label: "Total interest", value: usd(m.schedule.totalInterest), tone: "warn" },
          { label: "Total of loan payments", value: usd(m.schedule.totalPaid) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Rate", value: `${v.rate}% fixed for ${years} years, charged monthly` },
          { label: "Down payment", value: `${usd(down)} (${percent(downShare, 1)})` },
          { label: "Property tax", value: `${usd(propertyTax)} a year${v.taxMode === "rate" ? ` (${v.taxRate}% of the price)` : ""}, flat` },
          { label: "Insurance", value: `${usd(v.insurance)} a year, flat` },
          { label: "PMI", value: m.pmiMonthly > 0 ? `${v.pmiRate}% a year of the loan until the balance reaches 78% of the price` : "None: 20% or more down" },
          { label: "Not included", value: "Closing costs, utilities, repairs and rises in tax or insurance" },
        ]}
      />

      <ResultCard title="Where your payment goes" sub="Your first month's payment, split into its parts.">
        <SplitBar
          segments={[
            { label: "Principal and interest", value: m.principalAndInterest, display: usd(m.principalAndInterest), color: "#16a34a" },
            { label: "Property tax", value: m.taxMonthly, display: usd(m.taxMonthly), color: "#f59e0b" },
            { label: "Homeowners insurance", value: m.insuranceMonthly, display: usd(m.insuranceMonthly), color: "#5b1e6e" },
            { label: "PMI", value: m.pmiMonthly, display: usd(m.pmiMonthly), color: "#db2777" },
            { label: "HOA dues", value: m.hoa, display: usd(m.hoa), color: "#2e0a3a" },
          ]}
          caption="Tax and insurance are usually paid into an escrow account with your mortgage payment, and can rise each year."
        />
      </ResultCard>

      <ResultCard title="Private mortgage insurance" sub={m.pmiMonthly > 0 ? "When PMI can stop under the Homeowners Protection Act." : "Why you pay none."}>
        {m.pmiMonthly > 0 ? (
          <Facts
            items={[
              { label: "PMI a month", value: usd(m.pmiMonthly) },
              { label: "You can ask to cancel", value: duration(pmi.requestMonth), note: "Balance at 80% of the price" },
              { label: "Ends automatically", value: duration(pmi.automaticMonth), note: "78% on the original schedule" },
              { label: "Total PMI, about", value: usd(m.pmiTotal) },
            ]}
          />
        ) : (
          <p>
            {m.loan > 0
              ? "With at least 20% down, a conventional loan has no PMI. That keeps the payment lower from day one."
              : "There is no loan, so there is no PMI."}
          </p>
        )}
      </ResultCard>

      <ResultCard title="Your balance over time" sub={hasExtra ? "With your extra payments, compared with none." : "How the balance falls and the interest adds up."}>
        <AreaChart
          ariaLabel="Mortgage balance by year"
          series={[
            { key: "bal", label: hasExtra ? "Balance with extra payments" : "Balance", color: "#16a34a", values: bal, fill: true },
            ...(hasExtra ? [{ key: "base", label: "Balance with no extra", color: "#94a3b8", values: baseBal, dashed: true }] : []),
            { key: "int", label: "Interest paid so far", color: "#f59e0b", values: interestPaid },
          ]}
          xLabel={(i) => `Yr ${i}`}
          yFormat={usdShort}
          initial={Math.min(5, bal.length - 1)}
          readout={(i) => (
            <>
              End of year <b>{i}</b>: you owe <b>{usd(bal[i] ?? 0)}</b>{" "}and have paid <b>{usd(interestPaid[i] ?? interestPaid[interestPaid.length - 1])}</b>{" "}in interest.
            </>
          )}
        />
        <DataTable
          summary="Year-by-year amortization schedule"
          columns={["Year", "Principal", "Interest", "Balance at year end"]}
          rows={yr.map((y) => [y.year, usd(y.principal), usd(y.interest), usd(y.balance)])}
        />
      </ResultCard>

      {hasExtra ? (
        <ResultCard title="What your extra payments save" sub={`Paying ${usd(v.extra)} more each month.`}>
          <Facts
            items={[
              { label: "Interest saved", value: usd(m.interestSaved), tone: "good" },
              { label: "Paid off sooner by", value: duration(m.monthsSaved), tone: "good" },
              { label: "New payoff time", value: duration(payoff) },
              { label: "PMI request date", value: duration(pmi.requestMonth) },
            ]}
          />
          <p className="footnote">Extra payments bring forward the date you can ask to cancel PMI (at 80%). The automatic 78% date follows the original schedule, so ask your servicer in writing.</p>
        </ResultCard>
      ) : (
        <ResultCard title="Paying extra" sub="Small extra payments go straight to principal.">
          <Callout title="Try an extra payment">
            Add an amount under More options to see the interest saved and how much sooner you would own your home. Check your loan has no prepayment penalty first.
          </Callout>
        </ResultCard>
      )}

      {m.loan > 0 && downShare < 0.2 && (
        <Callout tone="warn" title="Less than 20% down">
          Lenders add PMI to conventional loans until you reach 20% equity. Putting {usd(v.price * 0.2 - down)} more down would remove it. FHA, VA and USDA loans have their own fees
          instead of PMI.
        </Callout>
      )}

      <p className="footnote" style={{ textAlign: "center" }}>
        An estimate, not a loan offer. Your Loan Estimate shows the lender&apos;s real figures.
      </p>
    </Studio>
  );
}
