"use client";

import { amortize } from "@/lib/us/loans";
import { CREDIT_TIERS, PERSONAL_LOAN_TIERS, personalLoan, type CreditTier, type FeeMode } from "@/lib/us/borrowing";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, SelectField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, DataTable, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { duration, usd, usdShort } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const TERMS = ["24", "36", "48", "60", "72", "84"] as const;
type Term = (typeof TERMS)[number];
const COMPARE_TERMS = [24, 36, 48, 60];

const SCHEMA = {
  amount: num(10_000, 0, 1_000_000),
  tier: oneOf<CreditTier>("good", CREDIT_TIERS),
  apr: num(19.47, 0, 100),
  term: oneOf<Term>("36", TERMS),
  feePct: num(5, 0, 12),
  feeHow: oneOf<FeeMode>("deducted", ["deducted", "added"]),
  grossUp: bool(false),
  extra: num(0, 0, 1_000_000),
};
const ADVANCED = ["feeHow", "grossUp", "extra"] as const;

const pct = (n: number) => `${n.toFixed(2)}%`;

export default function PersonalLoanStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const months = Number(v.term);
  const loan = personalLoan(v.amount, v.apr, months, v.feePct, v.feeHow, v.grossUp);
  const plan = amortize(loan.borrowed, v.apr, months, v.extra);
  const hasExtra = v.extra > 0 && loan.borrowed > 0;
  const hasFee = loan.fee > 0;
  const terms = Array.from(new Set([...COMPARE_TERMS, months])).sort((a, b) => a - b);
  const byTerm = terms.map((m) => ({ m, r: personalLoan(v.amount, v.apr, m, v.feePct, v.feeHow, v.grossUp) }));
  const maxTermCost = Math.max(1, ...byTerm.map((x) => x.r.totalCost));
  const byTier = CREDIT_TIERS.map((t) => ({ t, r: personalLoan(v.amount, PERSONAL_LOAN_TIERS[t].aprPct, months, v.feePct, v.feeHow, v.grossUp) }));
  const maxTierCost = Math.max(1, ...byTier.map((x) => x.r.totalCost));
  const bal = [loan.borrowed, ...plan.rows.map((r) => r.balance)];
  const paidInt = plan.rows.reduce<number[]>((acc, r) => [...acc, acc[acc.length - 1] + r.interest], [0]);
  const tier = PERSONAL_LOAN_TIERS[v.tier];
  const shortfall = v.feeHow === "deducted" && !v.grossUp && hasFee;
  const neededLoan = shortfall ? personalLoan(v.amount, v.apr, months, v.feePct, "deducted", true).borrowed : 0;
  const interestSaved = loan.totalInterest - plan.totalInterest;

  const pickTier = (t: CreditTier) => {
    st.set("tier", t);
    st.set("apr", PERSONAL_LOAN_TIERS[t].aprPct);
  };

  return (
    <Studio
      title="Your personal loan"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate my loan"
      onReset={st.reset}
      dock={{ label: "Monthly payment", value: usd(loan.payment, true) }}
      inputs={
        <>
          <InputGroup title="The loan">
            <MoneyField label="Loan amount" symbol="$" value={v.amount} onChange={st.bind("amount")} slider={{ min: 1_000, max: 50_000, step: 500, ends: ["$1k", "$50k"] }} />
            <SelectField
              label="Your credit score"
              value={v.tier}
              onChange={pickTier}
              options={CREDIT_TIERS.map((t) => ({ value: t, label: `${PERSONAL_LOAN_TIERS[t].label} (${PERSONAL_LOAN_TIERS[t].scores})` }))}
              info="Fills in the average APR offered to borrowers with that score: about 15.2% for excellent, 19.5% for good, 24.2% for fair and 29.7% for bad credit (NerdWallet pre-qualified offers, October 2026). Enter your own quote below if you have one."
            />
            <StepperField label="Interest rate (APR before fees)" value={v.apr} onChange={st.bind("apr")} step={0.25} min={0} max={100} unit="%" dp={2} />
            <SelectField label="Loan term" value={v.term} onChange={st.bind("term")} options={TERMS.map((t) => ({ value: t, label: `${t} months (${Number(t) / 12} years)` }))} />
            <StepperField
              label="Origination fee"
              value={v.feePct}
              onChange={st.bind("feePct")}
              step={0.5}
              min={0}
              max={12}
              unit="%"
              dp={2}
              aside={usd(loan.fee)}
              info="A one-time charge for setting up the loan. Many lenders charge none; others charge about 1% to 10%, and a few up to about 12%."
            />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <Segmented
              label="How the fee is paid"
              optional
              value={v.feeHow}
              onChange={st.bind("feeHow")}
              options={[
                { value: "deducted", label: "Taken from the money", note: "The usual way: the lender sends you the loan minus the fee." },
                { value: "added", label: "Added to the balance", note: "You receive the full amount and repay it plus the fee." },
              ]}
            />
            {v.feeHow === "deducted" && (
              <Switch
                label="Borrow enough to receive the full amount"
                checked={v.grossUp}
                onChange={st.bind("grossUp")}
                optional
                info="Raises the loan so that, after the fee is taken out, you still receive the amount you entered."
              />
            )}
            <MoneyField label="Extra payment each month" symbol="$" optional value={v.extra} onChange={st.bind("extra")} info="Paid on top of the required payment. Most personal loans have no prepayment penalty, but check your agreement." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={`Monthly payment over ${months} months`}
        value={usd(loan.payment, true)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          loan.borrowed <= 0 ? (
            <>Enter the amount you want to borrow.</>
          ) : (
            <>
              You borrow <b>{usd(loan.borrowed)}</b>, receive <b>{usd(loan.received)}</b>{" "}and repay <b>{usd(loan.totalPaid)}</b>{" "}in total. Interest and fees come to{" "}
              <b>{usd(loan.totalCost)}</b>
              {hasFee ? (
                <>
                  , and the fee lifts the true APR to <b>{pct(loan.trueAprPct)}</b>
                </>
              ) : null}
              .
            </>
          )
        }
        badges={[`${tier.label} credit`, `APR ${pct(hasFee ? loan.trueAprPct : v.apr)}`, `Cost ${usd(loan.totalCost)}`]}
      />

      <Facts
        items={[
          { label: "You receive", value: usd(loan.received), tone: "good" },
          { label: "Total interest", value: usd(loan.totalInterest), tone: "warn" },
          { label: "Origination fee", value: usd(loan.fee) },
          { label: "True APR with the fee", value: pct(hasFee ? loan.trueAprPct : v.apr), tone: hasFee ? "warn" : undefined },
        ]}
      />

      <Assumptions
        items={[
          { label: "Rate", value: `${v.apr}% a year, fixed, charged monthly (rate ÷ 12)` },
          { label: "Payments", value: `${months} equal monthly payments, starting a month after you receive the money` },
          {
            label: "Fee",
            value: hasFee ? (v.feeHow === "deducted" ? `${usd(loan.fee)} taken from the money you receive` : `${usd(loan.fee)} added to the balance`) : "None",
          },
          { label: "Not included", value: "Late fees, optional insurance and any prepayment penalty" },
        ]}
      />

      <ResultCard title="Where the money goes" sub="Every dollar you repay.">
        <SplitBar
          segments={[
            { label: "Money you receive", value: loan.received, display: usd(loan.received), color: "#16a34a" },
            { label: "Interest", value: loan.totalInterest, display: usd(loan.totalInterest), color: "#f59e0b" },
            { label: "Origination fee", value: loan.fee, display: usd(loan.fee), color: "#db2777" },
          ]}
        />
      </ResultCard>

      <ResultCard title="Payment and cost by term" sub={`${usd(v.amount)} at ${v.apr}% with the same fee.`}>
        <Compare
          head={["Term · monthly payment", "Interest and fee"]}
          rows={byTerm.map(({ m, r }) => ({
            label: `${m} months · ${usd(r.payment, true)} a month`,
            value: usd(r.totalCost),
            bar: r.totalCost / maxTermCost,
            current: m === months,
            delta: m === months ? "Your term" : r.totalCost < loan.totalCost ? `${usd(loan.totalCost - r.totalCost)} less` : `${usd(r.totalCost - loan.totalCost)} more`,
            deltaTone: m === months ? undefined : r.totalCost < loan.totalCost ? "down" : "up",
          }))}
        />
      </ResultCard>

      <ResultCard title="What your credit score changes" sub={`Average APRs offered by credit score, ${months} months.`}>
        <Compare
          head={["Credit score · APR", "Interest and fee"]}
          rows={byTier.map(({ t, r }) => ({
            label: `${PERSONAL_LOAN_TIERS[t].label} (${PERSONAL_LOAN_TIERS[t].scores}) · ${PERSONAL_LOAN_TIERS[t].aprPct}% · ${usd(r.payment, true)} a month`,
            value: usd(r.totalCost),
            bar: r.totalCost / maxTierCost,
            current: t === v.tier && v.apr === PERSONAL_LOAN_TIERS[t].aprPct,
          }))}
        />
        <p className="footnote">Averages of offers to people who pre-qualified through NerdWallet in the 30 days to October 1, 2026. Your own offer can be higher or lower.</p>
      </ResultCard>

      {hasExtra && (
        <ResultCard title="What your extra payments save" sub={`Paying ${usd(v.extra)} more each month.`}>
          <Facts
            items={[
              { label: "Interest saved", value: usd(interestSaved), tone: "good" },
              { label: "Paid off sooner by", value: duration(months - plan.months), tone: "good" },
              { label: "New payoff time", value: duration(plan.months) },
            ]}
          />
        </ResultCard>
      )}

      <ResultCard title="Your balance over time" sub="How the balance falls and the interest adds up.">
        <AreaChart
          ariaLabel="Loan balance by month"
          series={[
            { key: "bal", label: "Balance", color: "#16a34a", values: bal, fill: true },
            { key: "int", label: "Interest paid so far", color: "#f59e0b", values: paidInt },
          ]}
          xLabel={(i) => `${i}`}
          yFormat={usdShort}
          initial={Math.min(12, bal.length - 1)}
          hint="Drag across the chart, or use the arrow keys, to read any month."
          readout={(i) => (
            <>
              Month <b>{i}</b>: balance <b>{usd(bal[i] ?? 0)}</b>, interest paid so far <b>{usd(paidInt[i] ?? 0)}</b>.
            </>
          )}
        />
        <DataTable
          summary="Month-by-month payment schedule"
          columns={["Month", "Payment", "Principal", "Interest", "Balance"]}
          rows={plan.rows.map((r) => [r.month, usd(r.payment, true), usd(r.principal, true), usd(r.interest, true), usd(r.balance, true)])}
        />
      </ResultCard>

      {shortfall && (
        <Callout title="You receive less than you borrow">
          With the {usd(loan.fee)} fee taken out, {usd(loan.borrowed)} puts {usd(loan.received)} in your account. If you need the full {usd(v.amount)}, you would have to borrow
          about {usd(neededLoan)}. Switch on &ldquo;Borrow enough to receive the full amount&rdquo; under More options to see that loan.
        </Callout>
      )}
      {loan.trueAprPct > 36 && (
        <Callout tone="warn" title="This loan costs more than 36% a year">
          The Military Lending Act caps most loans to service members at 36%, and consumer advocates use the same line for an affordable loan. Ask a credit union about a lower-cost loan before you sign.
        </Callout>
      )}

      <p className="footnote" style={{ textAlign: "center" }}>
        An estimate, not a loan offer. The lender&apos;s Truth in Lending disclosure shows the exact APR, payment and fee.
      </p>
    </Studio>
  );
}
