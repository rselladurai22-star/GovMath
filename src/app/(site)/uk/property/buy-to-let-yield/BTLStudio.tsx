"use client";

import { buyToLet, ICR_STRESS_RATE, type Nation } from "@/lib/property/buy-to-let";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { gbp, percent } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const SCHEMA = {
  price: num(250_000, 0, 20_000_000),
  rent: num(1_300, 0, 100_000),
  deposit: num(25, 0, 100),
  rate: num(5, 0, 15),
  io: bool(true),
  term: num(25, 5, 40),
  agent: num(10, 0, 25),
  voids: num(2, 0, 26),
  costs: num(2_000, 0, 200_000),
  other: num(40_000, 0, 5_000_000),
  nation: oneOf<Nation>("england", ["england", "scotland", "wales"]),
  scot: bool(false),
  buying: num(3_000, 0, 200_000),
};
const ADVANCED = ["io", "term", "agent", "voids", "costs", "other", "nation", "scot", "buying"] as const;
const COLORS = { costs: "#94a3b8", interest: "#f59e0b", tax: "#e11d48", profit: "#0f9f6e", capital: "#5b1e6e" };
const NATION_TAX: Record<Nation, string> = { england: "Stamp Duty", scotland: "LBTT and ADS", wales: "LTT higher rates" };

export default function BTLStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const r = buyToLet({
    price: v.price,
    rent: v.rent,
    depositPct: v.deposit,
    ratePct: v.rate,
    interestOnly: v.io,
    termYears: v.term,
    agentPct: v.agent,
    voidWeeks: v.voids,
    costs: v.costs,
    otherIncome: v.other,
    nation: v.nation,
    scottishTaxpayer: v.scot,
    buyingCosts: v.buying,
  });
  const cash = v.deposit >= 100;
  const icrOk = r.icr >= 1.25;
  const loss = r.profitAfterTax < 0;
  const taxOnLoss = r.tax > 0 && r.netOperating - r.interest <= 0;

  return (
    <Studio
      title="Your rental property"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Work out my yield and profit"
      onReset={st.reset}
      dock={{ label: "Net yield", value: percent(r.netYield, 2) }}
      inputs={
        <>
          <InputGroup title="The property">
            <MoneyField label="Purchase price" value={v.price} onChange={st.bind("price")} big slider={{ min: 50_000, max: 1_000_000, step: 5_000, ends: ["£50k", "£1m"] }} />
            <MoneyField label="Monthly rent" value={v.rent} onChange={st.bind("rent")} slider={{ min: 0, max: 5_000, step: 25, ends: ["£0", "£5k"] }} />
          </InputGroup>
          <InputGroup title="Your mortgage">
            <StepperField label="Deposit" value={v.deposit} onChange={st.bind("deposit")} step={5} min={0} max={100} unit="%" dp={0} hint="As a % of the price. Buy-to-let usually needs 25%. Enter 100% for a cash purchase." />
            {!cash && <StepperField label="Mortgage rate" value={v.rate} onChange={st.bind("rate")} step={0.1} min={0} max={15} unit="%" />}
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            {!cash && <Switch label="Interest-only mortgage" checked={v.io} onChange={st.bind("io")} optional hint="Most buy-to-let mortgages are interest-only." />}
            {!cash && !v.io && <StepperField label="Mortgage term" value={v.term} onChange={st.bind("term")} step={1} min={5} max={40} unit="years" dp={0} optional />}
            <StepperField label="Letting agent fee" value={v.agent} onChange={st.bind("agent")} step={1} min={0} max={25} unit="% of rent" dp={0} optional hint="About 10% to 15% for full management. 0% if you manage it." />
            <StepperField label="Empty weeks a year" value={v.voids} onChange={st.bind("voids")} step={1} min={0} max={26} unit="weeks" dp={0} optional />
            <MoneyField label="Other running costs a year" value={v.costs} onChange={st.bind("costs")} optional hint="Insurance, repairs, safety certificates, service charge and ground rent." />
            <MoneyField label="Your other income a year" value={v.other} onChange={st.bind("other")} optional hint="Salary, pension and so on. Sets your tax rate on the rent." />
            <Switch label="You pay Scottish Income Tax" checked={v.scot} onChange={st.bind("scot")} optional />
            <Segmented
              label="Where the property is"
              value={v.nation}
              onChange={st.bind("nation")}
              optional
              options={[
                { value: "england", label: "England or NI" },
                { value: "scotland", label: "Scotland" },
                { value: "wales", label: "Wales" },
              ]}
            />
            <MoneyField label="Legal, survey and mortgage fees" value={v.buying} onChange={st.bind("buying")} optional />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Your net yield"
        value={percent(r.netYield, 2)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          v.price <= 0 ? (
            <>Enter the price and rent to see your yield.</>
          ) : (
            <>
              Rent of <b>{gbp(v.rent)}</b> a month is a <b>{percent(r.grossYield, 2)}</b> gross yield. After costs and empty weeks it is <b>{percent(r.netYield, 2)}</b>.{" "}
              {loss ? (
                <>
                  After mortgage interest and tax you would <b>lose {gbp(-r.profitAfterTax)}</b> a year.
                </>
              ) : (
                <>
                  After mortgage interest and tax you keep about <b>{gbp(r.profitAfterTax)}</b> a year, a <b>{percent(r.cashReturn, 1)}</b> return on the {gbp(r.cashIn)} you put in.
                </>
              )}
            </>
          )
        }
        badges={[`${percent(r.grossYield, 2)} gross yield`, `${gbp(r.profitAfterTax / 12)} a month after tax`, cash ? "Cash purchase" : `Rental cover ${Number.isFinite(r.icr) ? `${Math.round(r.icr * 100)}%` : "n/a"}`]}
      />

      <Facts
        items={[
          { label: "Gross yield", value: percent(r.grossYield, 2) },
          { label: "Profit after tax", value: gbp(r.profitAfterTax), tone: loss ? "bad" : "good", note: "A year" },
          { label: "Cash put in", value: gbp(r.cashIn), note: `Including ${gbp(r.purchaseTax)} ${NATION_TAX[v.nation]}` },
          { label: "Return on cash", value: percent(r.cashReturn, 1), tone: r.cashReturn < 0 ? "bad" : undefined },
        ]}
      />

      <Assumptions
        items={[
          { label: "Owner", value: "You personally, not a company" },
          { label: "Tax year", value: "2026/27" },
          { label: "Mortgage", value: cash ? "None" : `${v.rate}%, ${v.io ? "interest-only" : "repayment"}` },
          { label: "Rent", value: `${v.voids} empty weeks a year` },
        ]}
      />

      {r.rentYear > 0 && (
        <ResultCard title="Where the rent goes" sub="A year's rent, before any growth in the property's value.">
          <SplitBar
            segments={[
              { label: "Empty weeks and costs", value: r.voidCost + r.runningCosts, display: gbp(r.voidCost + r.runningCosts), color: COLORS.costs },
              ...(r.interest > 0 ? [{ label: "Mortgage interest", value: r.interest, display: gbp(r.interest), color: COLORS.interest }] : []),
              ...(r.tax > 0 ? [{ label: "Income Tax", value: r.tax, display: gbp(r.tax), color: COLORS.tax }] : []),
              ...(r.profitAfterTax > 0 ? [{ label: "Yours to keep", value: r.profitAfterTax, display: gbp(r.profitAfterTax), color: COLORS.profit }] : []),
            ]}
            caption={<>Gross rent of <b>{gbp(r.rentYear)}</b> a year.</>}
          />
        </ResultCard>
      )}

      {r.rentYear > 0 && (
        <ResultCard title="Your year in figures" sub="Income Tax under the Section 24 rules for individual landlords.">
          <Statement
            columns={["A year"]}
            rows={[
              { label: "Rent due", values: [gbp(r.rentYear)] },
              { label: "Empty weeks", values: [`−${gbp(r.voidCost)}`], kind: "deduction" },
              { label: "Letting agent", values: [`−${gbp(r.agentFee)}`], kind: "deduction" },
              { label: "Other running costs", values: [`−${gbp(v.costs)}`], kind: "deduction" },
              { label: "Taxable profit", values: [gbp(r.taxableProfit)], kind: "total" },
              { label: "Income Tax on the profit", values: [`−${gbp(r.taxBeforeCredit)}`], kind: "deduction" },
              { label: "20% credit for mortgage interest", values: [`+${gbp(r.financeCredit)}`] },
              { label: "Mortgage interest", values: [`−${gbp(r.interest)}`], kind: "deduction" },
              { label: "Profit after tax", values: [gbp(r.profitAfterTax)], kind: "total" },
              ...(r.capitalRepaid > 0 ? [{ label: "Capital repaid (cash out, but builds equity)", values: [`−${gbp(r.capitalRepaid)}`], kind: "deduction" as const }] : []),
              { label: "Cash left after tax", values: [gbp(r.cashFlowAfterTax)], kind: "total" },
            ]}
          />
        </ResultCard>
      )}

      {v.price > 0 && (
        <ResultCard title="Worth knowing" sub="What could change the numbers.">
          {taxOnLoss && (
            <Callout tone="warn" title="Tax even though you make a loss">
              Mortgage interest is not deducted from rental profit. You get a 20% tax credit instead, so a higher-rate taxpayer can owe tax on a property that loses money.
            </Callout>
          )}
          {!cash && (
            <Callout tone={icrOk ? "good" : "warn"} title={`Rental cover: ${Math.round(r.icr * 100)}%`}>
              Lenders usually want rent of at least 125% to 145% of the interest at a stress rate of around {ICR_STRESS_RATE}%. At 125%, this rent supports a loan of up to{" "}
              <b>{gbp(r.maxLoanByIcr)}</b>; you need {gbp(r.loan)}.
            </Callout>
          )}
          <Callout title={`${gbp(r.purchaseTax)} ${NATION_TAX[v.nation]} on purchase`}>
            {v.nation === "england"
              ? "Buy-to-let pays the 5% higher rates on top of standard Stamp Duty."
              : v.nation === "scotland"
                ? "Scotland adds the 8% Additional Dwelling Supplement to the whole price."
                : "Wales charges the higher residential rates from the first pound."}{" "}
            It is part of the cash you put in, so it lowers your return.
          </Callout>
          <Callout title="Capital gains when you sell">
            Any rise in value is taxed when you sell, at 18% or 24% after the £3,000 annual exempt amount. Report and pay within 60 days of completion.
          </Callout>
        </ResultCard>
      )}

      <p className="footnote" style={{ textAlign: "center" }}>
        Individual landlord, 2026/27 tax rules, first year. Not tax advice; an accountant can check your figures.
      </p>
    </Studio>
  );
}
