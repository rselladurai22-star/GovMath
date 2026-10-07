"use client";

import { refinance } from "@/lib/us/mortgage";
import { refiTimeline } from "@/lib/us/housing-loans-extra";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { duration, usd, usdShort } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const SCHEMA = {
  balance: num(300_000, 0, 100_000_000),
  currentRate: num(7.75, 0, 30),
  monthsLeft: num(300, 1, 480),
  newRate: num(6.5, 0, 30),
  newYears: oneOf<"10" | "15" | "20" | "25" | "30">("30", ["10", "15", "20", "25", "30"]),
  closing: num(9_000, 0, 10_000_000),
  rollIn: bool(false),
  cashOut: num(0, 0, 100_000_000),
};
const ADVANCED = ["rollIn", "cashOut"] as const;

export default function RefiStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const newYears = Number(v.newYears);
  const input = { balance: v.balance, currentAprPct: v.currentRate, monthsLeft: v.monthsLeft, newAprPct: v.newRate, newYears, closingCosts: v.closing, rollIn: v.rollIn, cashOut: v.cashOut };
  const r = refinance(input);
  const sameTerm = refinance({ ...input, newYears: v.monthsLeft / 12 });
  const newMonths = newYears * 12;
  const upfront = v.rollIn ? 0 : v.closing;
  const timeline = refiTimeline(v.balance, v.currentRate, v.monthsLeft, r.newLoan, v.newRate, newYears, upfront);
  const keep = timeline.map((t) => t.keep);
  const refi = timeline.map((t) => t.refi);
  const saves = r.monthlySaving > 0;
  const breakEven = Number.isFinite(r.breakEvenMonths) ? (r.breakEvenMonths === 0 ? "Right away" : duration(r.breakEvenMonths)) : "Never";
  const longer = newMonths > v.monthsLeft;
  const resetWarning = saves && longer && r.lifetimeDifference > 0;
  const keepTotal = r.currentPayment * v.monthsLeft;
  const refiTotal = r.newPayment * newMonths + upfront;

  return (
    <Studio
      title="Your refinance"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Compare my options"
      onReset={st.reset}
      dock={{ label: saves ? "Monthly saving" : "Monthly change", value: usd(Math.abs(r.monthlySaving)) }}
      inputs={
        <>
          <InputGroup title="Your current mortgage">
            <MoneyField label="Balance left" symbol="$" value={v.balance} onChange={st.bind("balance")} slider={{ min: 20_000, max: 1_500_000, step: 5_000, ends: ["$20k", "$1.5m"] }} />
            <StepperField label="Current interest rate" value={v.currentRate} onChange={st.bind("currentRate")} step={0.125} min={0} max={30} unit="%" dp={3} />
            <StepperField
              label="Months left to pay"
              value={v.monthsLeft}
              onChange={(n) => st.set("monthsLeft", Math.max(1, Math.round(n)))}
              step={12}
              min={1}
              max={480}
              unit="months"
              dp={0}
              aside={duration(v.monthsLeft)}
              info="Five years into a 30-year loan, 300 months are left. Your monthly statement shows the remaining term or the payoff date."
            />
          </InputGroup>
          <InputGroup title="The new loan">
            <StepperField
              label="New interest rate"
              value={v.newRate}
              onChange={st.bind("newRate")}
              step={0.125}
              min={0}
              max={30}
              unit="%"
              dp={3}
              info="Freddie Mac's survey put the average 30-year fixed rate at about 7.3% and the 15-year at about 6.6% on October 1, 2026. Use your own quote."
            />
            <Segmented
              label="New loan term"
              value={v.newYears}
              onChange={st.bind("newYears")}
              options={[
                { value: "10", label: "10 yrs" },
                { value: "15", label: "15 yrs" },
                { value: "20", label: "20 yrs" },
                { value: "25", label: "25 yrs" },
                { value: "30", label: "30 yrs" },
              ]}
            />
            <MoneyField
              label="Closing costs"
              symbol="$"
              value={v.closing}
              onChange={st.bind("closing")}
              info="Freddie Mac says to expect about 3% to 6% of the loan: appraisal, title, lender and recording fees, plus any points."
            />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <Switch label="Roll closing costs into the new loan" optional checked={v.rollIn} onChange={st.bind("rollIn")} hint="No cash needed at closing, but you pay interest on the costs." />
            <MoneyField label="Cash out" symbol="$" optional value={v.cashOut} onChange={st.bind("cashOut")} info="Extra borrowed on top of your balance and paid to you at closing. Lenders usually keep the new loan at or below 80% of the home's value." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={saves ? "You would save each month" : "Your payment would rise by"}
        value={usd(Math.abs(r.monthlySaving))}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          saves ? (
            <>
              Your payment would fall from <b>{usd(r.currentPayment)}</b> to <b>{usd(r.newPayment)}</b>. {v.closing > 0 ? (
                <>
                  The {usd(v.closing)} of closing costs is paid back by the saving in <b>{breakEven.toLowerCase()}</b>.
                </>
              ) : (
                "There are no closing costs to pay back."
              )} Over the whole loan you would pay <b>{usd(Math.abs(r.lifetimeDifference))}</b>{" "}
              {r.lifetimeDifference > 0 ? "more" : "less"} than keeping your current mortgage{v.cashOut > 0 ? ", after counting the cash you take out" : ""}.
            </>
          ) : (
            <>
              Your payment would go from <b>{usd(r.currentPayment)}</b> to <b>{usd(r.newPayment)}</b>
              {v.cashOut > 0 ? " because of the cash out" : longer ? "" : " because the new term is shorter"}. Over the whole loan you would pay{" "}
              <b>{usd(Math.abs(r.lifetimeDifference))}</b> {r.lifetimeDifference > 0 ? "more" : "less"} than keeping your current mortgage.
            </>
          )
        }
        badges={[`New loan ${usd(r.newLoan)}`, `Break-even: ${breakEven}`, `New term ${newYears} years`, r.lifetimeDifference > 0 ? "Costs more overall" : "Saves overall"]}
      />

      <Facts
        items={[
          { label: "Current payment", value: usd(r.currentPayment) },
          { label: "New payment", value: usd(r.newPayment), tone: saves ? "good" : "warn" },
          { label: "Break-even", value: breakEven, tone: Number.isFinite(r.breakEvenMonths) ? undefined : "bad" },
          { label: "Lifetime difference", value: `${r.lifetimeDifference > 0 ? "+" : "−"}${usd(Math.abs(r.lifetimeDifference))}`, tone: r.lifetimeDifference > 0 ? "bad" : "good" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Both loans", value: "Fixed rate, paid monthly to the end of the term" },
          { label: "Closing costs", value: v.rollIn ? `${usd(v.closing)} added to the new loan` : `${usd(v.closing)} paid in cash at closing` },
          { label: "Break-even", value: "Closing costs ÷ the monthly saving" },
          { label: "Lifetime difference", value: "All new payments plus cash costs, less cash out, less all remaining current payments" },
          { label: "Not included", value: "Escrow, PMI, tax effects and what you could earn on the money saved" },
        ]}
      />

      <ResultCard title="What the new loan is made of" sub={`A new loan of ${usd(r.newLoan)}.`}>
        <SplitBar
          segments={[
            { label: "Your current balance", value: v.balance, display: usd(v.balance), color: "#16a34a" },
            { label: "Cash out", value: v.cashOut, display: usd(v.cashOut), color: "#5b1e6e" },
            { label: "Closing costs rolled in", value: v.rollIn ? v.closing : 0, display: usd(v.rollIn ? v.closing : 0), color: "#f59e0b" },
          ]}
        />
      </ResultCard>

      <ResultCard title="Interest still to pay" sub="Keeping your loan against refinancing.">
        <Statement
          columns={["Keep", "Refinance"]}
          rows={[
            { label: "Monthly payment", values: [usd(r.currentPayment), usd(r.newPayment)] },
            { label: "Payments left", values: [duration(v.monthsLeft), duration(newMonths)] },
            { label: "Interest left to pay", values: [usd(r.currentInterest), usd(r.newInterest)] },
            { label: "Cash closing costs", values: ["$0", usd(upfront)] },
            { label: "Total still to pay", values: [usd(keepTotal), usd(refiTotal)], kind: "total" },
          ]}
        />
      </ResultCard>

      <ResultCard title="Money paid out over time" sub="Cumulative payments, including cash closing costs.">
        <AreaChart
          ariaLabel="Cumulative payments: keep vs refinance"
          series={[
            { key: "keep", label: "Keep current loan", color: "#94a3b8", values: keep, dashed: true },
            { key: "refi", label: "Refinance", color: "#16a34a", values: refi, fill: true },
          ]}
          xLabel={(i) => `Yr ${i}`}
          yFormat={usdShort}
          initial={Math.min(5, keep.length - 1)}
          readout={(i) => (
            <>
              By year <b>{i}</b>: keeping costs <b>{usd(keep[i] ?? 0)}</b>, refinancing <b>{usd(refi[i] ?? 0)}</b>.
            </>
          )}
        />
      </ResultCard>

      {longer && Math.abs(sameTerm.newPayment - r.newPayment) > 1 && (
        <ResultCard title="Keeping your payoff date" sub={`A new loan over your remaining ${duration(v.monthsLeft)} instead.`}>
          <Facts
            items={[
              { label: "Payment", value: usd(sameTerm.newPayment) },
              { label: "Monthly saving", value: sameTerm.monthlySaving >= 0 ? usd(sameTerm.monthlySaving) : `−${usd(-sameTerm.monthlySaving)}` },
              { label: "Interest left", value: usd(sameTerm.newInterest) },
              {
                label: "Lifetime difference",
                value: `${sameTerm.lifetimeDifference > 0 ? "+" : "−"}${usd(Math.abs(sameTerm.lifetimeDifference))}`,
                tone: sameTerm.lifetimeDifference > 0 ? "bad" : "good",
              },
            ]}
          />
          <p className="footnote">Lenders offer set terms, often 10, 15, 20, 25 and 30 years, but you can pay a longer loan on a shorter schedule by paying extra each month.</p>
        </ResultCard>
      )}

      {resetWarning && (
        <Callout tone="warn" title="A lower payment, but a higher total cost">
          Starting a new {newYears}-year loan stretches your remaining {duration(v.monthsLeft)} out again. The payment falls by {usd(r.monthlySaving)}, but you would pay{" "}
          {usd(r.lifetimeDifference)} more in total. Paying the new loan off on your old schedule, or picking a shorter term, avoids this.
        </Callout>
      )}
      {!Number.isFinite(r.breakEvenMonths) && (
        <Callout tone="warn" title="No monthly saving">
          The new payment is not lower, so the closing costs are never paid back through the payment. Refinancing can still make sense to shorten the term or take cash out, but
          compare the total cost.
        </Callout>
      )}

      <p className="footnote" style={{ textAlign: "center" }}>
        An estimate for planning, not a loan offer. Compare Loan Estimates from several lenders.
      </p>
    </Studio>
  );
}
