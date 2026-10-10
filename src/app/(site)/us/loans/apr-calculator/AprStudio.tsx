"use client";

import { amortize } from "@/lib/us/loans";
import { yearly } from "@/lib/us/mortgage";
import { APR_CAP, aprFromPayment, aprIfRepaidEarly, REG_Z_TOLERANCE, trueApr } from "@/lib/us/loan-math";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, DataTable, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { duration, usd } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const SCHEMA = {
  mode: oneOf<"rate" | "payment">("rate", ["rate", "payment"]),
  amount: num(300_000, 0, 100_000_000),
  rate: num(6.25, 0, 100),
  payment: num(1_850, 0, 10_000_000),
  unit: oneOf<"years" | "months">("years", ["years", "months"]),
  term: num(30, 1, 600),
  points: num(1, 0, 10),
  fees: num(3_000, 0, 10_000_000),
  feeHow: oneOf<"upfront" | "financed">("upfront", ["upfront", "financed"]),
  keep: num(0, 0, 50),
  other: num(0, 0, 10_000_000),
};
const ADVANCED = ["feeHow", "keep", "other"] as const;

const pct = (n: number) => `${n.toFixed(3)}%`;

export default function AprStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const months = Math.max(1, Math.min(600, Math.round(v.unit === "years" ? v.term * 12 : v.term)));
  const byPayment = v.mode === "payment";
  // With a quoted payment, the note rate is the rate those payments imply on the full loan.
  const impliedRate = byPayment ? aprFromPayment(v.amount, v.payment, months) : v.rate;
  const valid = impliedRate !== null && v.amount > 0;
  const noteRate = Math.min(APR_CAP, impliedRate ?? 0);
  const feeFinanced = !byPayment && v.feeHow === "financed";
  const r = trueApr(v.amount, noteRate, months, v.points, v.fees, feeFinanced);
  const pointsCost = (v.amount * v.points) / 100;
  const apr = byPayment ? (aprFromPayment(r.amountFinanced, v.payment, months) ?? 0) : r.aprPct;
  const payment = byPayment ? v.payment : r.payment;
  const tooHigh = r.amountFinanced <= 0;
  const gap = apr - noteRate;
  const keepMonths = Math.round(v.keep * 12);
  const early = keepMonths > 0 && keepMonths < months ? aprIfRepaidEarly(r.amountFinanced, r.loan, noteRate, months, keepMonths) : null;
  const horizons = [3, 5, 7, 10, 15].filter((y) => y * 12 < months);
  const plan = amortize(r.loan, noteRate, months);
  const yr = yearly(plan);
  const totalInterest = plan.totalInterest;
  const financeCharge = totalInterest + r.financeFees;
  const cashAtClosing = (feeFinanced ? 0 : r.financeFees) + v.other;
  const capped = apr >= APR_CAP - 0.01;

  return (
    <Studio
      title="Your loan"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate the APR"
      onReset={st.reset}
      dock={{ label: "APR", value: valid && !tooHigh ? pct(apr) : "n/a" }}
      inputs={
        <>
          <InputGroup title="The loan">
            <Segmented
              label="What do you know?"
              value={v.mode}
              onChange={st.bind("mode")}
              options={[
                { value: "rate", label: "The interest rate", note: "Enter the note rate from the offer; we add the points and fees." },
                { value: "payment", label: "The monthly payment", note: "Enter the payment you were quoted; we work back to the rate and the APR." },
              ]}
            />
            <MoneyField label="Loan amount" symbol="$" value={v.amount} onChange={st.bind("amount")} slider={{ min: 5_000, max: 1_000_000, step: 5_000, ends: ["$5k", "$1m"] }} />
            {byPayment ? (
              <MoneyField label="Monthly payment quoted" symbol="$" value={v.payment} onChange={st.bind("payment")} pence info="Principal and interest only. Leave out property tax, insurance and any add-ons the lender bundles into the payment." />
            ) : (
              <StepperField label="Interest rate (note rate)" value={v.rate} onChange={st.bind("rate")} step={0.125} min={0} max={30} unit="%" dp={3} info="The rate that sets your payment, before fees. Your Loan Estimate or loan offer shows it next to the APR." />
            )}
            <Segmented
              label="Enter the term in"
              value={v.unit}
              onChange={(u) => {
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
              label="Discount points"
              value={v.points}
              onChange={st.bind("points")}
              step={0.125}
              min={0}
              max={5}
              unit="%"
              dp={3}
              aside={usd(pointsCost)}
              info="One point is 1% of the loan amount, paid at closing to buy a lower rate. Enter 0 if there are none."
            />
            <MoneyField
              label="Lender fees in the APR"
              symbol="$"
              value={v.fees}
              onChange={st.bind("fees")}
              info="Fees that are finance charges: origination, underwriting, processing, broker fees and prepaid interest. Leave out appraisal, credit report, title and recording fees on a mortgage; they go under More options."
            />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            {!byPayment && (
              <Segmented
                label="How the points and fees are paid"
                optional
                value={v.feeHow}
                onChange={st.bind("feeHow")}
                options={[
                  { value: "upfront", label: "Paid at closing or taken from the loan" },
                  { value: "financed", label: "Added to the loan" },
                ]}
              />
            )}
            <StepperField
              label="Years you expect to keep the loan"
              optional
              value={v.keep}
              onChange={st.bind("keep")}
              step={1}
              min={0}
              max={30}
              unit="years"
              dp={0}
              aside={v.keep > 0 ? `${Math.round(v.keep * 12)} months` : "Full term"}
              info="Most mortgages are paid off early, when people sell or refinance. Fees spread over fewer years cost more each year. Leave at 0 for the full term."
            />
            <MoneyField label="Other closing costs (not in the APR)" symbol="$" optional value={v.other} onChange={st.bind("other")} info="Appraisal, credit report, title insurance, inspections and recording fees on a mortgage. They are real costs but Regulation Z leaves them out of the APR." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Annual percentage rate (APR)"
        value={valid && !tooHigh ? pct(apr) : "n/a"}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          !valid ? (
            <>The payments you entered add up to less than the loan, so there is no interest rate to find. Check the payment and the term.</>
          ) : tooHigh ? (
            <>The points and fees are as large as the loan itself, so no APR can be worked out. Check the figures.</>
          ) : (
            <>
              {byPayment ? (
                <>
                  A payment of <b>{usd(payment, true)}</b>{" "}on <b>{usd(v.amount)}</b>{" "}over {duration(months)} means a note rate of <b>{pct(noteRate)}</b>.{" "}
                </>
              ) : (
                <>
                  Borrowing <b>{usd(r.loan)}</b>{" "}at <b>{pct(noteRate)}</b>{" "}over {duration(months)} costs <b>{usd(payment, true)}</b>{" "}a month.{" "}
                </>
              )}
              With {usd(r.financeFees)}{" "}of points and fees, you really have the use of <b>{usd(r.amountFinanced)}</b>, so the APR is <b>{pct(apr)}</b>
              {gap > 0.0005 ? `, ${gap.toFixed(3)} percentage points above the rate` : ""}.
              {early !== null ? (
                <>
                  {" "}If you pay it off after {duration(keepMonths)}, the real yearly cost is <b>{pct(early)}</b>.
                </>
              ) : null}
            </>
          )
        }
        badges={[`Note rate ${pct(noteRate)}`, `${months} payments`, `Finance charge ${usd(financeCharge)}`]}
      />

      <Facts
        items={[
          { label: "Monthly payment", value: usd(payment, true) },
          { label: "Amount financed", value: usd(r.amountFinanced) },
          { label: "Points and fees", value: usd(r.financeFees), tone: r.financeFees > 0 ? "warn" : undefined },
          { label: "APR minus rate", value: `${gap.toFixed(3)} pts`, tone: gap > 0.25 ? "warn" : undefined },
        ]}
      />

      <Assumptions
        items={[
          { label: "Method", value: "Regulation Z actuarial method: one advance, equal monthly payments, APR = monthly rate × 12" },
          { label: "Payments", value: `${months} equal monthly payments of ${usd(payment, true)}, principal and interest` },
          { label: "Prepaid finance charges", value: `${usd(pointsCost)} points + ${usd(v.fees)} lender fees, ${feeFinanced ? "added to the loan" : "paid at closing or taken from the loan"}` },
          { label: "Not in the APR", value: "Appraisal, title, recording, taxes, insurance escrow and late fees; mortgage insurance is left out here too" },
        ]}
      />

      <ResultCard title="Where your money goes" sub="Every payment over the full term, plus fees paid at closing.">
        <SplitBar
          segments={[
            { label: "Money you get to use", value: r.amountFinanced, display: usd(r.amountFinanced), color: "#16a34a" },
            { label: "Interest", value: totalInterest, display: usd(totalInterest), color: "#f59e0b" },
            { label: "Points and fees", value: r.financeFees, display: usd(r.financeFees), color: "#db2777" },
          ]}
        />
      </ResultCard>

      <ResultCard title="Your Truth in Lending figures" sub="The four numbers a lender must show you, worked out the same way.">
        <Statement
          columns={["Figure"]}
          rows={[
            { label: "Annual percentage rate", values: [pct(apr)], kind: "total" },
            { label: "Finance charge (interest + points + fees)", values: [usd(financeCharge, true)] },
            { label: "Amount financed", values: [usd(r.amountFinanced, true)] },
            { label: "Total of payments", values: [usd(payment * months, true)] },
          ]}
        />
        <p className="footnote">
          A lender&apos;s APR counts as accurate if it is within one-eighth of a percentage point ({REG_Z_TOLERANCE} points) of the true figure. Small differences from your disclosure usually come from
          the first payment date and prepaid daily interest.
        </p>
      </ResultCard>

      {horizons.length > 0 && valid && !tooHigh && (
        <ResultCard title="If you pay it off early" sub="The real yearly cost if you sell or refinance after a few years.">
          <Compare
            head={["Paid off after", "Effective APR"]}
            rows={[
              ...horizons.map((y) => {
                const e = aprIfRepaidEarly(r.amountFinanced, r.loan, noteRate, months, y * 12);
                return { label: `${y} years`, value: pct(e), delta: `+${(e - noteRate).toFixed(3)} pts over the rate`, deltaTone: "up" as const, bar: 0, current: keepMonths === y * 12 };
              }),
              { label: `Full term (${duration(months)})`, value: pct(apr), delta: "the disclosed APR", bar: 0, current: keepMonths === 0 },
            ]}
          />
        </ResultCard>
      )}

      <ResultCard title="Cash at closing" sub="What you pay before the first payment.">
        <Facts
          items={[
            { label: "Points", value: feeFinanced ? "Added to loan" : usd(pointsCost) },
            { label: "Lender fees", value: feeFinanced ? "Added to loan" : usd(v.fees) },
            { label: "Other closing costs", value: usd(v.other) },
            { label: "Total", value: usd(cashAtClosing) },
          ]}
        />
      </ResultCard>

      <ResultCard title="Payment schedule" sub="Year by year on the note rate.">
        <DataTable
          summary="Year-by-year schedule"
          columns={["Year", "Payments", "Principal", "Interest", "Balance"]}
          rows={yr.map((y) => [y.year, usd(y.principal + y.interest), usd(y.principal), usd(y.interest), usd(y.balance)])}
        />
      </ResultCard>

      {capped && (
        <Callout tone="warn" title="An extremely high cost">
          The APR is {APR_CAP}% or more. Check the payment and term you entered, and be very careful with any loan that costs this much.
        </Callout>
      )}
      {gap > 0.5 && !capped && (
        <Callout tone="warn" title="The fees add a lot">
          The APR is {gap.toFixed(2)} points above the rate. Ask the lender which fees can be lowered or waived, and compare the APR with other offers over the same term.
        </Callout>
      )}

      <p className="footnote" style={{ textAlign: "center" }}>
        An estimate, not a loan disclosure. Your Loan Estimate or Truth in Lending disclosure shows the lender&apos;s figures.
      </p>
    </Studio>
  );
}
