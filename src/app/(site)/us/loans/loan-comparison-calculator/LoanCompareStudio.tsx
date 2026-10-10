"use client";

import { breakEvenMonth, offer, type OfferResult } from "@/lib/us/loan-math";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, DataTable, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { duration, usd, usdShort } from "@/components/flagship/format";
import { bool, num, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const SCHEMA = {
  amount: num(20_000, 0, 100_000_000),
  rateA: num(8, 0, 100),
  monthsA: num(60, 1, 480),
  feesA: num(800, 0, 10_000_000),
  rateB: num(10, 0, 100),
  monthsB: num(60, 1, 480),
  feesB: num(0, 0, 10_000_000),
  three: bool(false),
  rateC: num(9, 0, 100),
  monthsC: num(48, 1, 480),
  feesC: num(400, 0, 10_000_000),
  finA: bool(false),
  finB: bool(false),
  finC: bool(false),
};
const ADVANCED = ["three", "rateC", "monthsC", "feesC", "finA", "finB", "finC"] as const;

const NAMES = ["Offer A", "Offer B", "Offer C"];
const COLORS = ["#16a34a", "#f59e0b", "#6366f1"];
const pct = (n: number) => `${n.toFixed(2)}%`;

export default function LoanCompareStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const inputs = [
    { ratePct: v.rateA, months: Math.round(v.monthsA), fees: v.feesA, financed: v.finA },
    { ratePct: v.rateB, months: Math.round(v.monthsB), fees: v.feesB, financed: v.finB },
    ...(v.three ? [{ ratePct: v.rateC, months: Math.round(v.monthsC), fees: v.feesC, financed: v.finC }] : []),
  ];
  const res: OfferResult[] = inputs.map((o) => offer(v.amount, o));
  const order = res.map((_, i) => i).sort((a, b) => res[a].totalCost - res[b].totalCost);
  const best = order[0];
  const next = order[1];
  const saving = res[next].totalCost - res[best].totalCost;
  const lowestPay = res.map((_, i) => i).sort((a, b) => res[a].payment - res[b].payment)[0];
  const maxCost = Math.max(1, ...res.map((r) => r.totalCost));
  // Break-evens: for each pair, the dearer-upfront offer against the other.
  const pairs: { hi: number; lo: number; month: number | null }[] = [];
  for (let i = 0; i < res.length; i++)
    for (let j = 0; j < res.length; j++)
      if (i !== j && res[i].fees > res[j].fees) pairs.push({ hi: i, lo: j, month: breakEvenMonth(res[i], res[j]) });
  const longest = Math.max(...inputs.map((o) => o.months));
  const cum = res.map((r) => Array.from({ length: longest + 1 }, (_, k) => r.cumulativeCost[Math.min(k, r.cumulativeCost.length - 1)]));
  const checkpoints = [12, 24, 36, 48, 60, 84, 120, 180, 240, 360].filter((m) => m < longest);
  const tie = saving < 0.5;

  return (
    <Studio
      title="Your loan offers"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Compare the offers"
      onReset={st.reset}
      dock={{ label: "Cheapest overall", value: tie ? "A tie" : NAMES[best] }}
      inputs={
        <>
          <InputGroup title="The amount you need">
            <MoneyField label="Loan amount" symbol="$" value={v.amount} onChange={st.bind("amount")} slider={{ min: 1_000, max: 500_000, step: 1_000, ends: ["$1k", "$500k"] }} info="The cash you need. Fees are paid on top, or added to the loan if you choose that under More options." />
          </InputGroup>
          <InputGroup title="Offer A">
            <StepperField label="Interest rate" value={v.rateA} onChange={st.bind("rateA")} step={0.125} min={0} max={36} unit="%" dp={3} />
            <StepperField label="Term" value={v.monthsA} onChange={(n) => st.set("monthsA", Math.round(n))} step={6} min={6} max={360} unit="months" dp={0} aside={duration(v.monthsA)} />
            <MoneyField label="Upfront fees" symbol="$" value={v.feesA} onChange={st.bind("feesA")} info="Origination fee, points and lender closing costs." />
          </InputGroup>
          <InputGroup title="Offer B">
            <StepperField label="Interest rate" value={v.rateB} onChange={st.bind("rateB")} step={0.125} min={0} max={36} unit="%" dp={3} />
            <StepperField label="Term" value={v.monthsB} onChange={(n) => st.set("monthsB", Math.round(n))} step={6} min={6} max={360} unit="months" dp={0} aside={duration(v.monthsB)} />
            <MoneyField label="Upfront fees" symbol="$" value={v.feesB} onChange={st.bind("feesB")} />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <Switch label="Add a third offer" optional checked={v.three} onChange={st.bind("three")} />
            {v.three && (
              <>
                <StepperField label="Offer C interest rate" optional value={v.rateC} onChange={st.bind("rateC")} step={0.125} min={0} max={36} unit="%" dp={3} />
                <StepperField label="Offer C term" optional value={v.monthsC} onChange={(n) => st.set("monthsC", Math.round(n))} step={6} min={6} max={360} unit="months" dp={0} aside={duration(v.monthsC)} />
                <MoneyField label="Offer C upfront fees" symbol="$" optional value={v.feesC} onChange={st.bind("feesC")} />
              </>
            )}
            <Switch label="Offer A: add the fees to the loan" optional checked={v.finA} onChange={st.bind("finA")} />
            <Switch label="Offer B: add the fees to the loan" optional checked={v.finB} onChange={st.bind("finB")} />
            {v.three && <Switch label="Offer C: add the fees to the loan" optional checked={v.finC} onChange={st.bind("finC")} />}
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Cheapest over the full term"
        value={tie ? "A tie" : NAMES[best]}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          tie ? (
            <>The offers cost the same in interest and fees over their full terms. Choose on payment, flexibility and the lender.</>
          ) : (
            <>
              {NAMES[best]}{" "}costs <b>{usd(res[best].totalCost)}</b>{" "}in interest and fees, <b>{usd(saving)}</b>{" "}less than {NAMES[next]}. Its payment is{" "}
              {usd(res[best].payment, true)}{" "}a month for {duration(inputs[best].months)}.
              {lowestPay !== best ? ` ${NAMES[lowestPay]} has the lowest payment (${usd(res[lowestPay].payment, true)}), but costs more in total.` : ""}
            </>
          )
        }
        badges={res.map((r, i) => `${NAMES[i]}: APR ${pct(r.aprPct)}`)}
      />

      <Facts
        items={res.map((r, i) => ({ label: `${NAMES[i]} total cost`, value: usd(r.totalCost), tone: i === best && !tie ? ("good" as const) : undefined, note: `${usd(r.payment, true)} a month` }))}
      />

      <Assumptions
        items={[
          { label: "Loans", value: "Fixed rates, equal monthly payments, interest at the rate ÷ 12 a month" },
          { label: "Fees", value: "Paid upfront in cash unless you add them to the loan under More options" },
          { label: "Total cost", value: "All interest plus all fees, if you keep each loan for its full term" },
          { label: "Not included", value: "Prepayment penalties, late fees, insurance add-ons and autopay discounts" },
        ]}
      />

      <ResultCard title={`What ${NAMES[best]} costs`} sub="The money you borrow, the interest and the fees.">
        <SplitBar
          segments={[
            { label: "Amount borrowed", value: v.amount, display: usd(v.amount), color: "#16a34a" },
            { label: "Interest", value: res[best].totalInterest, display: usd(res[best].totalInterest), color: "#f59e0b" },
            { label: "Fees", value: res[best].fees, display: usd(res[best].fees), color: "#db2777" },
          ]}
        />
      </ResultCard>

      <ResultCard title="Side by side" sub="Every figure for each offer.">
        <Statement
          columns={res.map((_, i) => NAMES[i])}
          rows={[
            { label: "Interest rate", values: inputs.map((o) => pct(o.ratePct)) },
            { label: "Term", values: inputs.map((o) => duration(o.months)) },
            { label: "Monthly payment", values: res.map((r) => usd(r.payment, true)) },
            { label: "Total interest", values: res.map((r) => usd(r.totalInterest)) },
            { label: "Fees", values: res.map((r) => usd(r.fees)) },
            { label: "APR with fees", values: res.map((r) => pct(r.aprPct)) },
            { label: "Total paid", values: res.map((r) => usd(r.totalPaid)) },
            { label: "Total cost (interest + fees)", values: res.map((r) => usd(r.totalCost)), kind: "total" },
          ]}
        />
        <Compare
          head={["Offer", "Total cost"]}
          rows={res.map((r, i) => ({
            label: NAMES[i],
            value: usd(r.totalCost),
            delta: i === best ? "cheapest" : `+${usd(r.totalCost - res[best].totalCost)}`,
            deltaTone: i === best ? undefined : ("up" as const),
            bar: r.totalCost / maxCost,
            current: i === best,
          }))}
        />
      </ResultCard>

      <ResultCard title="If you pay off early" sub="Interest and fees paid so far, if you repay the loan at each point.">
        <AreaChart
          ariaLabel="Cost so far for each offer"
          series={res.map((_, i) => ({ key: `o${i}`, label: NAMES[i], color: COLORS[i], values: cum[i] }))}
          xLabel={(i) => `${i}`}
          yFormat={usdShort}
          initial={Math.min(24, longest)}
          hint="Drag across the chart, or use the arrow keys, to read any month."
          readout={(k) => (
            <>
              Month <b>{k}</b>:{" "}
              {res.map((_, i) => (
                <span key={i}>
                  {i > 0 ? ", " : ""}
                  {NAMES[i]} <b>{usd(cum[i][k] ?? 0)}</b>
                </span>
              ))}
              .
            </>
          )}
        />
        {pairs.length > 0 && (
          <ul>
            {pairs.map((p) => (
              <li key={`${p.hi}-${p.lo}`}>
                {p.month === null
                  ? `${NAMES[p.hi]} has higher fees than ${NAMES[p.lo]} and never catches up: ${NAMES[p.lo]} is cheaper however long you keep it.`
                  : `${NAMES[p.hi]} costs more at first because of its fees, but is cheaper than ${NAMES[p.lo]} if you keep the loan ${p.month} months or more (${duration(p.month)}).`}
              </li>
            ))}
          </ul>
        )}
        <DataTable
          summary="Cost if repaid early"
          columns={["Repaid after", ...res.map((_, i) => NAMES[i])]}
          rows={checkpoints.map((m) => [duration(m), ...cum.map((c) => usd(c[m] ?? 0))])}
        />
      </ResultCard>

      {lowestPay !== best && !tie && (
        <Callout tone="warn" title="The lowest payment is not the cheapest loan">
          {NAMES[lowestPay]} saves {usd(res[best].payment - res[lowestPay].payment, true)} a month but costs {usd(res[lowestPay].totalCost - res[best].totalCost)} more in total, mostly
          because of its {inputs[lowestPay].months > inputs[best].months ? "longer term" : "rate and fees"}.
        </Callout>
      )}

      <p className="footnote" style={{ textAlign: "center" }}>
        An estimate, not a loan offer. Compare the lenders&apos; own disclosures before you choose.
      </p>
    </Studio>
  );
}
