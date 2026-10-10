"use client";

import { amortize } from "@/lib/us/loans";
import { yearly } from "@/lib/us/mortgage";
import { cashAdvanceApr, dscr, DSCR_TARGET, PRIME_2026, sba7a, SBA_7A_MAX, trueApr } from "@/lib/us/loan-math";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, DataTable, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { duration, usd, usdShort } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const SCHEMA = {
  kind: oneOf<"term" | "sba" | "mca">("sba", ["term", "sba", "mca"]),
  amount: num(250_000, 0, 50_000_000),
  rate: num(11, 0, 60),
  years: num(10, 1, 30),
  feePct: num(2, 0, 10),
  sbaFixed: bool(false),
  prime: num(PRIME_2026, 0, 20),
  waiver: bool(false),
  feeFinanced: bool(true),
  factor: num(1.3, 1, 2),
  mcaMonths: num(9, 1, 24),
  freq: oneOf<"daily" | "weekly">("daily", ["daily", "weekly"]),
  mcaFee: num(0, 0, 1_000_000),
  cashFlow: num(0, 0, 100_000_000),
  otherDebt: num(0, 0, 100_000_000),
};
const ADVANCED = ["sbaFixed", "prime", "waiver", "feeFinanced", "mcaFee", "cashFlow", "otherDebt"] as const;

const pct = (n: number) => `${n.toFixed(2)}%`;

export default function BusinessLoanStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const isSba = v.kind === "sba";
  const isMca = v.kind === "mca";
  const months = Math.round(v.years * 12);
  const amount = isSba ? Math.min(SBA_7A_MAX, v.amount) : v.amount;
  const sba = sba7a(amount, months, v.sbaFixed, v.prime, v.waiver);
  // Fees: an origination fee on a bank loan; the SBA guaranty fee on a 7(a) loan.
  const fee = isSba ? sba.upfrontFee : (amount * v.feePct) / 100;
  const financed = isSba ? v.feeFinanced : false;
  const loan = trueApr(amount, v.rate, months, 0, fee, financed);
  const plan = amortize(loan.loan, v.rate, months);
  const yr = yearly(plan);
  const mca = cashAdvanceApr(amount, v.factor, v.mcaMonths, v.freq, v.mcaFee);
  // The same money as a term loan over the advance's term, at the rate entered.
  const mcaAlt = amortize(amount, v.rate, Math.max(1, Math.round(v.mcaMonths)));
  const yearlyDebt = isMca ? mca.payment * mca.periodsPerYear : loan.payment * 12;
  const cover = dscr(v.cashFlow, yearlyDebt + v.otherDebt);
  const showDscr = v.cashFlow > 0;
  const overCap = isSba && v.rate > sba.maxRatePct + 1e-9;
  const capped = isSba && v.amount > SBA_7A_MAX;
  const totalCost = isMca ? mca.cost : plan.totalInterest + fee;
  const bal = [loan.loan, ...yr.map((y) => y.balance)];
  const paidInt = yr.reduce<number[]>((acc, y) => [...acc, acc[acc.length - 1] + y.interest], [0]);
  const perWord = v.freq === "daily" ? "each business day" : "each week";

  return (
    <Studio
      title="Your business loan"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate my payment"
      onReset={st.reset}
      dock={{ label: isMca ? (v.freq === "daily" ? "Daily payment" : "Weekly payment") : "Monthly payment", value: usd(isMca ? mca.payment : loan.payment, true) }}
      inputs={
        <>
          <InputGroup title="The financing">
            <Segmented
              label="Type of financing"
              value={v.kind}
              onChange={st.bind("kind")}
              options={[
                { value: "sba", label: "SBA 7(a) loan", note: "A bank loan with a partial SBA guarantee, capped rates and an upfront guaranty fee." },
                { value: "term", label: "Bank or online term loan" },
                { value: "mca", label: "Merchant cash advance", note: "A lump sum repaid from your sales at a factor rate, usually each business day." },
              ]}
            />
            <MoneyField
              label={isMca ? "Advance amount" : "Loan amount"}
              symbol="$"
              value={v.amount}
              onChange={st.bind("amount")}
              slider={{ min: 10_000, max: 2_000_000, step: 5_000, ends: ["$10k", "$2m"] }}
              hint={capped ? `SBA 7(a) loans are capped at ${usd(SBA_7A_MAX)}; we use that.` : undefined}
            />
            {isMca ? (
              <>
                <StepperField label="Factor rate" value={v.factor} onChange={st.bind("factor")} step={0.01} min={1} max={2} unit="×" dp={2} aside={`Repay ${usd(amount * v.factor)}`} info="You repay the advance times the factor rate. 1.3 means $1.30 for every $1 advanced, whatever the time it takes." />
                <StepperField label="Expected time to repay" value={v.mcaMonths} onChange={st.bind("mcaMonths")} step={1} min={1} max={24} unit="months" dp={0} info="Advances are repaid as a share of your sales, so the time depends on how fast you sell. Use the provider's estimate." />
                <Segmented
                  label="Payments"
                  value={v.freq}
                  onChange={st.bind("freq")}
                  options={[
                    { value: "daily", label: "Each business day" },
                    { value: "weekly", label: "Weekly" },
                  ]}
                />
              </>
            ) : (
              <>
                <StepperField
                  label="Interest rate"
                  value={v.rate}
                  onChange={st.bind("rate")}
                  step={0.25}
                  min={0}
                  max={40}
                  unit="%"
                  dp={2}
                  aside={isSba ? `SBA cap ${pct(sba.maxRatePct)}` : undefined}
                  info={isSba ? `The SBA caps 7(a) rates at the prime rate (${pct(v.prime)}) plus a spread that depends on the loan size and whether the rate is fixed or variable.` : "The yearly interest rate on your offer, before fees."}
                />
                <StepperField label="Loan term" value={v.years} onChange={st.bind("years")} step={1} min={1} max={isSba ? 25 : 30} unit="years" dp={0} aside={`${months} payments`} info={isSba ? "Up to 10 years for working capital and equipment in most cases, up to 25 years for real estate." : undefined} />
                {!isSba && (
                  <StepperField label="Origination fee" value={v.feePct} onChange={st.bind("feePct")} step={0.25} min={0} max={10} unit="%" dp={2} aside={usd(fee)} info="Taken from the money you receive. Online lenders often charge a few percent; many banks charge less." />
                )}
              </>
            )}
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            {isSba && (
              <>
                <Switch label="Fixed rate (not variable)" optional checked={v.sbaFixed} onChange={st.bind("sbaFixed")} info="Fixed-rate 7(a) loans have higher caps than variable ones." />
                <StepperField label="Prime rate" optional value={v.prime} onChange={st.bind("prime")} step={0.25} min={0} max={15} unit="%" dp={2} info="The Wall Street Journal prime rate has been 6.75% since December 11, 2025." />
                <Switch label="Manufacturer, food supply chain or rural business" optional checked={v.waiver} onChange={st.bind("waiver")} info="For loans approved from October 1, 2026 to September 30, 2027, there is no upfront guaranty fee on loans of $700,000 or less to these businesses." />
                <Switch label="Add the guaranty fee to the loan" optional checked={v.feeFinanced} onChange={st.bind("feeFinanced")} />
              </>
            )}
            {isMca && <MoneyField label="Fees taken from the advance" symbol="$" optional value={v.mcaFee} onChange={st.bind("mcaFee")} info="Origination, underwriting or administration fees the provider deducts before paying you." />}
            {isMca && (
              <StepperField label="Term loan rate to compare" optional value={v.rate} onChange={st.bind("rate")} step={0.25} min={0} max={40} unit="%" dp={2} info="We show what the same money would cost as a term loan at this rate over the same time." />
            )}
            <MoneyField label="Yearly cash flow for debt payments" symbol="$" optional value={v.cashFlow} onChange={st.bind("cashFlow")} info="Net operating income: profit before interest, depreciation and amortization, and owner's draws or extra pay. Used for the debt service coverage ratio." />
            <MoneyField label="Other business debt payments a year" symbol="$" optional value={v.otherDebt} onChange={st.bind("otherDebt")} />
          </AdvancedOptions>
        </>
      }
    >
      {isMca ? (
        <Answer
          eyebrow={v.freq === "daily" ? "Payment each business day" : "Payment each week"}
          value={usd(mca.payment, true)}
          actions={<ShareButton copied={st.copied} onClick={st.share} />}
          sentence={
            <>
              An advance of <b>{usd(amount)}</b>{" "}at a factor rate of {v.factor.toFixed(2)} means repaying <b>{usd(mca.payback)}</b>: {mca.payments} payments of{" "}
              {usd(mca.payment, true)}{" "}{perWord}. Repaid over about {duration(v.mcaMonths)}, that is an APR of <b>{mca.capped ? "over 600%" : pct(mca.aprPct)}</b>.
            </>
          }
          badges={[`Cost ${usd(mca.cost)}`, `${mca.payments} payments`, `APR ${mca.capped ? "600%+" : pct(mca.aprPct)}`]}
        />
      ) : (
        <Answer
          eyebrow="Monthly payment"
          value={usd(loan.payment, true)}
          actions={<ShareButton copied={st.copied} onClick={st.share} />}
          sentence={
            <>
              {isSba ? "An SBA 7(a) loan of " : "A term loan of "}
              <b>{usd(amount)}</b>{" "}at {pct(v.rate)}{" "}over {v.years} {v.years === 1 ? "year" : "years"}{" "}costs <b>{usd(loan.payment, true)}</b>{" "}a month and{" "}
              <b>{usd(plan.totalInterest)}</b>{" "}in interest.
              {fee > 0 ? (
                <>
                  {" "}
                  {isSba ? `The SBA guaranty fee is ${usd(fee)}` : `The ${usd(fee)} origination fee`}
                  {financed ? ", added to the loan" : ", paid upfront"}, so the APR is <b>{pct(loan.aprPct)}</b>.
                </>
              ) : null}
            </>
          }
          badges={[`${months} payments`, `APR ${pct(loan.aprPct)}`, isSba ? `${Math.round(sba.guaranteeShare * 100)}% SBA guarantee` : `Total ${usd(plan.totalPaid)}`]}
        />
      )}

      <Facts
        items={
          isMca
            ? [
                { label: "Total repaid", value: usd(mca.payback) },
                { label: "Cost of the advance", value: usd(mca.cost), tone: "warn" },
                { label: "APR equivalent", value: mca.capped ? "600%+" : pct(mca.aprPct), tone: "bad" },
                { label: "Paid a year (annualized)", value: usd(yearlyDebt) },
              ]
            : [
                { label: "Total interest", value: usd(plan.totalInterest), tone: "warn" },
                { label: isSba ? "SBA guaranty fee" : "Origination fee", value: usd(fee) },
                { label: "Total cost of borrowing", value: usd(totalCost) },
                { label: "APR with fees", value: pct(loan.aprPct) },
              ]
        }
      />

      <Assumptions
        items={
          isMca
            ? [
                { label: "Repayment", value: `${mca.payments} equal payments ${perWord} (${v.freq === "daily" ? "252 business days a year" : "52 weeks a year"})` },
                { label: "APR", value: "Per-payment rate × payments a year, Regulation Z style, on the cash you receive" },
                { label: "Time", value: `About ${duration(v.mcaMonths)}; a faster payoff means a higher APR, a slower one a lower APR` },
                { label: "Not included", value: "Default fees, reconciliation and renewals (stacking)" },
              ]
            : [
                { label: "Payments", value: `${months} equal monthly payments; interest at ${pct(v.rate)} ÷ 12 a month` },
                {
                  label: "Fees",
                  value: isSba
                    ? `FY 2027 guaranty fee on the ${Math.round(sba.guaranteeShare * 100)}% guaranteed part (${usd(sba.guaranteed)})${financed ? ", added to the loan" : ", paid at closing"}`
                    : `${v.feePct}% origination fee taken from the money you receive`,
                },
                { label: "Rate", value: isSba ? `Fixed for the whole term (a variable rate moves with prime); SBA ${v.sbaFixed ? "fixed" : "variable"} cap ${pct(sba.maxRatePct)}` : "Fixed for the whole term" },
                { label: "Not included", value: "Packaging and closing costs, collateral and personal guarantee costs, prepayment fees" },
              ]
        }
      />

      <ResultCard title="What the financing costs" sub="Money you receive against what it costs.">
        <SplitBar
          segments={
            isMca
              ? [
                  { label: "Cash you receive", value: Math.max(0, amount - v.mcaFee), display: usd(Math.max(0, amount - v.mcaFee)), color: "#16a34a" },
                  { label: "Factor cost", value: mca.payback - amount, display: usd(mca.payback - amount), color: "#f59e0b" },
                  { label: "Fees", value: v.mcaFee, display: usd(v.mcaFee), color: "#db2777" },
                ]
              : [
                  { label: "Cash you receive", value: loan.amountFinanced, display: usd(loan.amountFinanced), color: "#16a34a" },
                  { label: "Interest", value: plan.totalInterest, display: usd(plan.totalInterest), color: "#f59e0b" },
                  { label: isSba ? "Guaranty fee" : "Origination fee", value: fee, display: usd(fee), color: "#db2777" },
                ]
          }
        />
      </ResultCard>

      {isSba && (
        <ResultCard title="SBA 7(a) figures for this loan" sub="Loans approved October 1, 2026 to September 30, 2027.">
          <Facts
            items={[
              { label: "SBA guarantee", value: `${Math.round(sba.guaranteeShare * 100)}% (${usd(sba.guaranteed)})` },
              { label: "Upfront guaranty fee", value: usd(sba.upfrontFee) },
              { label: `Maximum ${v.sbaFixed ? "fixed" : "variable"} rate`, value: `${pct(sba.maxRatePct)} (prime + ${sba.spreadPct}%)` },
              { label: "Largest 7(a) loan", value: usd(SBA_7A_MAX) },
            ]}
          />
          {overCap && (
            <Callout tone="warn" title="Above the SBA maximum">
              {pct(v.rate)} is above the {pct(sba.maxRatePct)} cap for a {v.sbaFixed ? "fixed" : "variable"}-rate 7(a) loan of this size. A lender cannot charge more on an SBA 7(a) loan;
              check the quote.
            </Callout>
          )}
        </ResultCard>
      )}

      {isMca && (
        <ResultCard title="Against a term loan" sub={`The same ${usd(amount)} over ${duration(v.mcaMonths)}.`}>
          <Compare
            head={["Option", "Total cost"]}
            rows={[
              { label: `Cash advance, factor ${v.factor.toFixed(2)}`, value: usd(mca.cost), bar: 1, current: true },
              {
                label: `Term loan at ${pct(v.rate)}`,
                value: usd(mcaAlt.totalInterest),
                delta: mca.cost >= mcaAlt.totalInterest ? `${usd(mca.cost - mcaAlt.totalInterest)} less` : `${usd(mcaAlt.totalInterest - mca.cost)} more`,
                deltaTone: mca.cost >= mcaAlt.totalInterest ? "down" : "up",
                bar: mca.cost > 0 ? mcaAlt.totalInterest / mca.cost : 0,
              },
            ]}
          />
        </ResultCard>
      )}

      {showDscr && (
        <ResultCard title="Debt service coverage" sub="How many times your cash flow covers your debt payments.">
          <Facts
            items={[
              { label: "DSCR", value: Number.isFinite(cover) ? `${cover.toFixed(2)}×` : "No debt", tone: cover >= DSCR_TARGET ? "good" : cover >= 1 ? "warn" : "bad" },
              { label: "Debt payments a year", value: usd(yearlyDebt + v.otherDebt) },
              { label: "Cash flow a year", value: usd(v.cashFlow) },
              { label: `Cash flow needed for ${DSCR_TARGET}×`, value: usd((yearlyDebt + v.otherDebt) * DSCR_TARGET) },
            ]}
          />
          <Callout tone={cover >= DSCR_TARGET ? "good" : "warn"} title={cover >= DSCR_TARGET ? "Comfortably covered" : cover >= 1 ? "Tight" : "Cash flow does not cover the payments"}>
            {cover >= DSCR_TARGET
              ? `Most lenders look for a DSCR of at least ${DSCR_TARGET}. Yours is ${cover.toFixed(2)}.`
              : `Most lenders look for at least ${DSCR_TARGET}. Borrowing less, over a longer term, or at a lower rate would raise it.`}
          </Callout>
        </ResultCard>
      )}

      {!isMca && (
        <ResultCard title="Your balance over time" sub="Year by year.">
          <AreaChart
            ariaLabel="Loan balance over time"
            series={[
              { key: "bal", label: "Balance", color: "#16a34a", values: bal, fill: true },
              { key: "int", label: "Interest paid so far", color: "#f59e0b", values: paidInt },
            ]}
            xLabel={(i) => `Yr ${i}`}
            yFormat={usdShort}
            initial={Math.min(3, bal.length - 1)}
            readout={(i) => (
              <>
                Year <b>{i}</b>: balance <b>{usd(bal[i] ?? 0)}</b>, interest paid so far <b>{usd(paidInt[i] ?? 0)}</b>.
              </>
            )}
          />
          <DataTable
            summary="Year-by-year schedule"
            columns={["Year", "Payments", "Principal", "Interest", "Balance"]}
            rows={yr.map((y) => [y.year, usd(y.principal + y.interest), usd(y.principal), usd(y.interest), usd(y.balance)])}
          />
        </ResultCard>
      )}

      {isMca && (
        <Callout tone="warn" title="Factor rates hide the yearly cost">
          A factor rate of {v.factor.toFixed(2)} sounds like {Math.round((v.factor - 1) * 100)}%, but you repay it over months, not years, while the balance is falling. As an APR it
          is {mca.capped ? "over 600%" : pct(mca.aprPct)}. Repay faster and the APR rises further.
        </Callout>
      )}

      <p className="footnote" style={{ textAlign: "center" }}>
        An estimate, not a loan offer. Lenders set rates and fees on your business&apos;s credit, cash flow and collateral.
      </p>
    </Studio>
  );
}
