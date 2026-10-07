"use client";

import { autoLoan, type AutoLoanInput } from "@/lib/us/loans";
import { carInterestDeductionLimit } from "@/lib/us/loans-extra";
import { STATES, stateByCode } from "@/lib/us/states";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, SelectField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, DataTable, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { percent, usd, usdShort } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

/** States that charge sales tax on the full price, with no credit for a trade-in. */
const NO_TRADE_CREDIT = ["CA", "HI", "VA"];
const STATE_CODES = ["--", ...STATES.map((s) => s.code)] as const;
const TERMS = ["36", "48", "60", "72", "84"] as const;
type Term = (typeof TERMS)[number];

const SCHEMA = {
  price: num(35_000, 0, 1_000_000),
  down: num(4_000, 0, 1_000_000),
  trade: num(6_000, 0, 1_000_000),
  owed: num(0, 0, 1_000_000),
  apr: num(7.2, 0, 40),
  term: oneOf<Term>("60", TERMS),
  state: oneOf<string>("--", STATE_CODES),
  tax: num(7, 0, 15),
  afterTrade: bool(true),
  rebate: num(0, 0, 100_000),
  fees: num(800, 0, 50_000),
  finance: bool(true),
  usNew: bool(false),
  magi: num(80_000, 0, 10_000_000),
  joint: bool(false),
  bracket: oneOf("22", ["10", "12", "22", "24", "32", "35", "37"] as const),
};
const ADVANCED = ["afterTrade", "rebate", "fees", "finance", "usNew", "magi", "joint", "bracket"] as const;

export default function AutoLoanStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const months = Number(v.term);
  const input: AutoLoanInput = {
    price: v.price,
    down: v.down,
    tradeIn: v.trade,
    tradeOwed: v.owed,
    rebate: v.rebate,
    salesTaxRate: v.tax / 100,
    taxAfterTradeIn: v.afterTrade,
    fees: v.fees,
    financeTaxAndFees: v.finance,
    aprPct: v.apr,
    months,
  };
  const a = autoLoan(input);
  const equity = v.trade - v.owed;
  const rows = a.schedule.rows;
  const firstYearInterest = rows.slice(0, 12).reduce((s, r) => s + r.interest, 0);
  const dedLimit = carInterestDeductionLimit(v.magi, v.joint);
  const deductible = v.usNew ? Math.min(firstYearInterest, dedLimit) : 0;
  const saving = deductible * (Number(v.bracket) / 100);
  const terms = TERMS.map((t) => ({ t, r: autoLoan({ ...input, months: Number(t) }) }));
  const maxInterest = Math.max(1, ...terms.map((x) => x.r.totalInterest));
  const state = stateByCode(v.state);
  const balances = [a.amountFinanced, ...rows.map((r) => r.balance)];
  const paidInterest = rows.reduce<number[]>((acc, r) => [...acc, (acc[acc.length - 1] ?? 0) + r.interest], [0]);
  const yearly = Array.from({ length: Math.ceil(rows.length / 12) }, (_, y) => {
    const part = rows.slice(y * 12, y * 12 + 12);
    return [`Year ${y + 1}`, usd(part.reduce((s, r) => s + r.payment, 0)), usd(part.reduce((s, r) => s + r.principal, 0)), usd(part.reduce((s, r) => s + r.interest, 0)), usd(part[part.length - 1]?.balance ?? 0)];
  });

  const pickState = (code: string) => {
    st.set("state", code);
    const s = stateByCode(code);
    if (s) {
      st.set("tax", Number(((s.sales + s.localAvg) * 100).toFixed(2)));
      st.set("afterTrade", !NO_TRADE_CREDIT.includes(code));
    }
  };

  return (
    <Studio
      title="Your car loan"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate my car payment"
      onReset={st.reset}
      dock={{ label: "Monthly payment", value: usd(a.payment, true) }}
      inputs={
        <>
          <InputGroup title="The car">
            <MoneyField symbol="$" label="Vehicle price" value={v.price} onChange={st.bind("price")} slider={{ min: 5_000, max: 100_000, step: 500, ends: ["$5k", "$100k"] }} />
            <MoneyField symbol="$" label="Down payment" value={v.down} onChange={st.bind("down")} />
            <MoneyField symbol="$" label="Trade-in value" value={v.trade} onChange={st.bind("trade")} info="What the dealer will give you for your current car." />
            <MoneyField symbol="$" label="Still owed on the trade-in" value={v.owed} onChange={st.bind("owed")} info="Any loan left on the car you trade in. If you owe more than it is worth, the difference is added to the new loan." />
          </InputGroup>
          <InputGroup title="The loan">
            <StepperField label="Interest rate (APR)" value={v.apr} onChange={st.bind("apr")} step={0.1} min={0} max={30} unit="%" dp={2} />
            <SelectField
              label="Loan term"
              value={v.term}
              onChange={st.bind("term")}
              options={TERMS.map((t) => ({ value: t, label: `${t} months (${Number(t) / 12} years)` }))}
            />
            <SelectField
              label="State"
              value={v.state}
              onChange={pickState}
              options={[{ value: "--", label: "Choose your state" }, ...STATES.map((s) => ({ value: s.code, label: s.name }))]}
              info="Fills in the state's sales tax plus its average local rate. Many states charge a different rate on vehicles, so check yours and edit the rate below."
            />
            <StepperField label="Sales tax rate" value={v.tax} onChange={st.bind("tax")} step={0.05} min={0} max={15} unit="%" dp={3} />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <Switch label="Tax the price after the trade-in" checked={v.afterTrade} onChange={st.bind("afterTrade")} optional info="Most states tax only the price minus your trade-in. California, Hawaii and Virginia tax the full price, and a few states limit the credit." />
            <MoneyField symbol="$" label="Cash rebate" value={v.rebate} onChange={st.bind("rebate")} optional info="A maker's rebate taken off the price. Most states still charge sales tax on the price before the rebate, as we do here." />
            <MoneyField symbol="$" label="Title, registration and dealer fees" value={v.fees} onChange={st.bind("fees")} optional />
            <Switch label="Add tax and fees to the loan" checked={v.finance} onChange={st.bind("finance")} optional info="Off means you pay the sales tax and fees in cash at signing." />
            <Switch label="New car assembled in the US (interest deduction)" checked={v.usNew} onChange={st.bind("usNew")} optional info="From 2025 to 2028 you can deduct up to $10,000 a year of interest on a loan for a new, US-assembled car for personal use." />
            {v.usNew && (
              <>
                <MoneyField symbol="$" label="Modified adjusted gross income" value={v.magi} onChange={st.bind("magi")} optional />
                <Switch label="Married filing jointly" checked={v.joint} onChange={st.bind("joint")} optional />
                <SelectField label="Your federal tax bracket" value={v.bracket} onChange={st.bind("bracket")} optional options={["10", "12", "22", "24", "32", "35", "37"].map((b) => ({ value: b as typeof v.bracket, label: `${b}%` }))} />
              </>
            )}
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={`Monthly payment over ${months} months`}
        value={usd(a.payment, true)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            You borrow <b>{usd(a.amountFinanced)}</b> at {v.apr}% and pay <b>{usd(a.totalInterest)}</b> in interest. With {usd(a.upfront)} paid at signing
            {equity !== 0 ? <> and {usd(Math.abs(equity))} of {equity > 0 ? "trade-in equity" : "negative equity rolled in"}</> : null}, the car costs <b>{usd(a.totalCost)}</b> in all.
          </>
        }
        badges={[`Sales tax ${usd(a.salesTax)}`, `${percent(a.totalCost > 0 ? a.totalInterest / a.totalCost : 0)} of the cost is interest`, `${months / 12} years`]}
      />

      <Facts
        items={[
          { label: "Amount financed", value: usd(a.amountFinanced) },
          { label: "Total interest", value: usd(a.totalInterest), tone: "warn" },
          { label: "Sales tax", value: usd(a.salesTax) },
          { label: "Paid at signing", value: usd(a.upfront) },
          { label: "Total cost of the car", value: usd(a.totalCost) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Sales tax", value: `${v.tax}% on ${v.afterTrade ? "the price after the trade-in" : "the full price"}${state ? ` (${state.name} state rate plus average local rate)` : ""}` },
          { label: "Rebate", value: v.rebate > 0 ? `${usd(v.rebate)} off the price after tax is worked out` : "None" },
          { label: "Tax and fees", value: v.finance ? "Added to the loan" : "Paid in cash at signing" },
          { label: "Interest", value: `${v.apr}% APR, charged monthly on the balance; fixed for the whole loan` },
          { label: "Payments", value: "Equal monthly payments, the first one month after signing" },
        ]}
      />

      <ResultCard title="Where your money goes" sub="Everything you pay for the car.">
        <SplitBar
          segments={[
            { label: "Car price after rebate", value: Math.max(0, v.price - v.rebate), display: usd(Math.max(0, v.price - v.rebate)), color: "#0f9f6e" },
            { label: "Interest", value: a.totalInterest, display: usd(a.totalInterest), color: "#f59e0b" },
            { label: "Sales tax", value: a.salesTax, display: usd(a.salesTax), color: "#5b1e6e" },
            { label: "Fees", value: v.fees, display: usd(v.fees), color: "#2e0a3a" },
            ...(equity < 0 ? [{ label: "Negative equity", value: -equity, display: usd(-equity), color: "#db2777" }] : []),
          ]}
        />
      </ResultCard>

      <ResultCard title="Compare loan terms" sub="Same car, same rate, different lengths.">
        <Compare
          head={["Term", "Monthly payment"]}
          rows={terms.map((x) => ({
            label: `${x.t} months · ${usd(x.r.totalInterest)} interest`,
            value: usd(x.r.payment, true),
            delta: x.t === v.term ? "Your term" : `${x.r.totalInterest >= a.totalInterest ? "+" : "−"}${usd(Math.abs(x.r.totalInterest - a.totalInterest))} interest`,
            deltaTone: x.r.totalInterest > a.totalInterest ? "up" : "down",
            bar: x.r.totalInterest / maxInterest,
            current: x.t === v.term,
          }))}
        />
      </ResultCard>

      <ResultCard title="Your balance over time" sub="Loan balance and the interest paid so far.">
        <AreaChart
          ariaLabel="Loan balance by month"
          series={[
            { key: "bal", label: "Balance", color: "#0f9f6e", values: balances, fill: true },
            { key: "int", label: "Interest paid", color: "#f59e0b", values: paidInterest },
          ]}
          xLabel={(i) => `M${i}`}
          yFormat={usdShort}
          initial={Math.min(12, balances.length - 1)}
          hint="Drag across the chart, or use the arrow keys, to read any month."
          readout={(i) => (
            <>
              After month <b>{i}</b>: you owe <b>{usd(balances[i] ?? 0)}</b> and have paid <b>{usd(paidInterest[i] ?? 0)}</b> in interest.
            </>
          )}
        />
        <DataTable summary="Year-by-year schedule" columns={["Year", "Paid", "Principal", "Interest", "Balance left"]} rows={yearly} />
      </ResultCard>

      {v.usNew && (
        <ResultCard title="Car loan interest deduction" sub="Tax years 2025 to 2028.">
          <Facts
            items={[
              { label: "Interest in the first 12 months", value: usd(firstYearInterest) },
              { label: "Your deduction limit", value: usd(dedLimit) },
              { label: "Deductible (first 12 months)", value: usd(deductible), tone: "good" },
              { label: `Tax saved at ${v.bracket}%`, value: usd(saving), tone: "good" },
            ]}
          />
          <p className="footnote">
            The limit is $10,000, cut by $200 for each $1,000 of modified AGI over {v.joint ? "$200,000" : "$100,000"}. The car must be new, bought for personal use, with final
            assembly in the US; leases and used cars do not qualify. You claim it on Schedule 1-A with the car&apos;s VIN.
          </p>
        </ResultCard>
      )}

      <ResultCard title="Worth knowing" sub="Before you sign.">
        {equity < 0 && (
          <Callout tone="warn" title="You are rolling over negative equity">
            You owe {usd(-equity)} more on your trade-in than it is worth. That amount is added to the new loan and you pay interest on it, so you start the new loan owing more than
            the car is worth.
          </Callout>
        )}
        {months >= 72 && (
          <Callout tone="warn" title="Long loans cost more and leave you upside down for longer">
            A {months}-month loan lowers the payment but adds interest, and a new car usually loses value faster than a long loan is paid down.
          </Callout>
        )}
        <Callout title="Negotiate the price, not the payment">
          Agree the price of the car first, then the trade-in, then the financing. A dealer can hit any monthly payment by stretching the term. Get a preapproval from a bank or credit
          union so you can compare the dealer&apos;s rate.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Estimate only. Your lender&apos;s figures, your state&apos;s vehicle tax rules and dealer fees may differ.
      </p>
    </Studio>
  );
}
