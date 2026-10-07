"use client";

import { amortize } from "@/lib/us/loans";
import { yearly } from "@/lib/us/mortgage";
import { loanWithFee } from "@/lib/us/housing-loans-extra";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, DataTable, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { duration, usd, usdShort } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const SCHEMA = {
  amount: num(15_000, 0, 100_000_000),
  rate: num(12, 0, 100),
  unit: oneOf<"years" | "months">("years", ["years", "months"]),
  term: num(3, 1, 600),
  feePct: num(0, 0, 20),
  feeHow: oneOf<"deducted" | "financed">("deducted", ["deducted", "financed"]),
  extra: num(0, 0, 10_000_000),
};
const ADVANCED = ["feeHow", "extra"] as const;

const pct = (n: number) => `${n.toFixed(2)}%`;

export default function LoanStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const months = Math.max(1, Math.min(600, Math.round(v.unit === "years" ? v.term * 12 : v.term)));
  const fee = (v.amount * v.feePct) / 100;
  const lf = loanWithFee(v.amount, v.rate, months, fee, v.feeHow === "financed");
  const plan = amortize(lf.borrowed, v.rate, months, v.extra);
  const base = amortize(lf.borrowed, v.rate, months);
  const hasExtra = v.extra > 0 && lf.borrowed > 0;
  const interestSaved = base.totalInterest - plan.totalInterest;
  const monthsSaved = base.months - plan.months;
  const monthly = plan.rows.length <= 120;
  const yr = yearly(plan);
  const bal = monthly ? [lf.borrowed, ...plan.rows.map((r) => r.balance)] : [lf.borrowed, ...yr.map((y) => y.balance)];
  const paidInt = monthly
    ? plan.rows.reduce<number[]>((acc, r) => [...acc, acc[acc.length - 1] + r.interest], [0])
    : yr.reduce<number[]>((acc, y) => [...acc, acc[acc.length - 1] + y.interest], [0]);
  const unitWord = monthly ? "Month" : "Year";
  const hasFee = fee > 0 && v.amount > 0;
  const totalCost = plan.totalInterest + fee;

  return (
    <Studio
      title="Your loan"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate my payment"
      onReset={st.reset}
      dock={{ label: "Monthly payment", value: usd(lf.payment, true) }}
      inputs={
        <>
          <InputGroup title="The loan">
            <MoneyField label="Loan amount" symbol="$" value={v.amount} onChange={st.bind("amount")} slider={{ min: 1_000, max: 100_000, step: 500, ends: ["$1k", "$100k"] }} />
            <StepperField
              label="Interest rate (APR before fees)"
              value={v.rate}
              onChange={st.bind("rate")}
              step={0.25}
              min={0}
              max={100}
              unit="%"
              dp={2}
              info="If your offer shows a rate and an APR, enter the rate here and the origination fee below. The Federal Reserve's survey put the average 24-month personal loan rate at banks at about 11.9% in August 2026."
            />
            <Segmented
              label="Enter the term in"
              value={v.unit}
              onChange={(u) => {
                // Keep the same length when switching units.
                st.set("term", u === "months" ? months : Math.max(1, Math.round((months / 12) * 10) / 10));
                st.set("unit", u);
              }}
              options={[
                { value: "years", label: "Years" },
                { value: "months", label: "Months" },
              ]}
            />
            {v.unit === "years" ? (
              <StepperField label="Loan term" value={v.term} onChange={st.bind("term")} step={1} min={1} max={50} unit="years" dp={1} aside={`${months} payments`} />
            ) : (
              <StepperField label="Loan term" value={v.term} onChange={(n) => st.set("term", Math.round(n))} step={6} min={1} max={600} unit="months" dp={0} aside={duration(months)} />
            )}
            <StepperField
              label="Origination fee"
              value={v.feePct}
              onChange={st.bind("feePct")}
              step={0.5}
              min={0}
              max={20}
              unit="%"
              dp={2}
              aside={usd(fee)}
              info="A one-time fee some lenders charge, often between about 1% and 10% of the loan for personal loans. Many lenders charge none."
            />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <Segmented
              label="How the fee is paid"
              optional
              value={v.feeHow}
              onChange={st.bind("feeHow")}
              options={[
                { value: "deducted", label: "Taken from the loan" },
                { value: "financed", label: "Added to the loan" },
              ]}
            />
            <MoneyField label="Extra payment each month" symbol="$" optional value={v.extra} onChange={st.bind("extra")} info="Paid on top of the required payment, straight off the balance. Check there is no prepayment penalty." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Monthly payment"
        value={usd(lf.payment, true)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            Borrowing <b>{usd(lf.borrowed)}</b> at {v.rate}% over {duration(months)} costs <b>{usd(lf.payment, true)}</b> a month and <b>{usd(plan.totalInterest)}</b> in interest
            {hasExtra ? ` with your extra ${usd(v.extra)} a month` : ""}.
            {hasFee ? (
              <>
                {" "}With the {usd(fee)} fee {v.feeHow === "deducted" ? `taken out, you receive ${usd(lf.received)}` : "added to the balance"}, so the true APR is{" "}
                <b>{pct(lf.trueAprPct)}</b>.
              </>
            ) : null}
          </>
        }
        badges={[
          `${months} payments`,
          `APR ${pct(hasFee ? lf.trueAprPct : v.rate)}`,
          hasExtra ? `Paid off in ${duration(plan.months)}` : `Total ${usd(plan.totalPaid)}`,
        ]}
      />

      <Facts
        items={[
          { label: "Total interest", value: usd(plan.totalInterest), tone: "warn" },
          { label: "Origination fee", value: usd(fee) },
          { label: "Total cost of borrowing", value: usd(totalCost) },
          { label: "APR with the fee", value: pct(hasFee ? lf.trueAprPct : v.rate), tone: hasFee ? "warn" : undefined },
        ]}
      />

      <Assumptions
        items={[
          { label: "Interest", value: `${v.rate}% a year, charged monthly on the balance (rate ÷ 12)` },
          { label: "Payments", value: `${months} equal monthly payments${hasExtra ? `, plus ${usd(v.extra)} extra` : ""}` },
          { label: "Fee", value: hasFee ? (v.feeHow === "deducted" ? `${usd(fee)} taken from the money you receive` : `${usd(fee)} added to the balance`) : "None" },
          { label: "Not included", value: "Late fees, insurance add-ons and prepayment penalties" },
        ]}
      />

      <ResultCard title="What you pay in total" sub="Every dollar over the life of the loan.">
        <SplitBar
          segments={[
            { label: "Money you receive", value: lf.received, display: usd(lf.received), color: "#16a34a" },
            { label: "Interest", value: plan.totalInterest, display: usd(plan.totalInterest), color: "#f59e0b" },
            { label: "Origination fee", value: fee, display: usd(fee), color: "#db2777" },
          ]}
        />
      </ResultCard>

      {hasExtra ? (
        <ResultCard title="What your extra payments save" sub={`Paying ${usd(v.extra)} more each month.`}>
          <Facts
            items={[
              { label: "Interest saved", value: usd(interestSaved), tone: "good" },
              { label: "Paid off sooner by", value: duration(monthsSaved), tone: "good" },
              { label: "New payoff time", value: duration(plan.months) },
              { label: "Interest paid", value: usd(plan.totalInterest) },
            ]}
          />
        </ResultCard>
      ) : (
        <ResultCard title="Paying it off faster" sub="Extra payments cut the interest.">
          <Callout title="Try an extra payment">Add a monthly amount under More options to see how much interest you would save and how much sooner the loan would be paid off.</Callout>
        </ResultCard>
      )}

      <ResultCard title="Your balance over time" sub="How the balance falls and the interest adds up.">
        <AreaChart
          ariaLabel="Loan balance over time"
          series={[
            { key: "bal", label: "Balance", color: "#16a34a", values: bal, fill: true },
            { key: "int", label: "Interest paid so far", color: "#f59e0b", values: paidInt },
          ]}
          xLabel={(i) => (monthly ? `${i}` : `Yr ${i}`)}
          yFormat={usdShort}
          initial={Math.min(monthly ? 12 : 5, bal.length - 1)}
          hint={monthly ? "Drag across the chart, or use the arrow keys, to read any month." : undefined}
          readout={(i) => (
            <>
              {unitWord} <b>{i}</b>: balance <b>{usd(bal[i] ?? 0)}</b>, interest paid so far <b>{usd(paidInt[i] ?? 0)}</b>.
            </>
          )}
        />
        <DataTable
          summary={monthly ? "Month-by-month payment schedule" : "Year-by-year payment schedule"}
          columns={[unitWord, "Payment", "Principal", "Interest", "Balance"]}
          rows={
            monthly
              ? plan.rows.map((r) => [r.month, usd(r.payment, true), usd(r.principal, true), usd(r.interest, true), usd(r.balance, true)])
              : yr.map((y) => [y.year, usd(y.principal + y.interest), usd(y.principal), usd(y.interest), usd(y.balance)])
          }
        />
      </ResultCard>

      {hasFee && (
        <Callout tone="warn" title="The fee raises the real cost">
          A {v.feePct}% fee on a {duration(months)} loan lifts the APR from {pct(v.rate)} to {pct(lf.trueAprPct)}. Compare offers by APR, and remember that a shorter loan spreads the
          fee over fewer months, so its APR effect is larger.
        </Callout>
      )}

      <p className="footnote" style={{ textAlign: "center" }}>
        An estimate, not a loan offer. Your lender&apos;s disclosure shows the exact APR and payment.
      </p>
    </Studio>
  );
}
