"use client";

import { consolidate, type DebtLine, type FeeMode } from "@/lib/us/borrowing";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, SelectField, StepperField, TextField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, DataTable, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { duration, usd, usdShort } from "@/components/flagship/format";
import { num, oneOf, ShareButton, text, useStudio, type Query } from "@/components/flagship/useStudio";

const TERMS = ["24", "36", "48", "60", "72", "84"] as const;
type Term = (typeof TERMS)[number];

const SCHEMA = {
  d1Name: text("Visa card", 24),
  d1Bal: num(8_000, 0, 10_000_000),
  d1Apr: num(23.99, 0, 40),
  d1Pay: num(240, 0, 1_000_000),
  d2Name: text("Store card", 24),
  d2Bal: num(3_500, 0, 10_000_000),
  d2Apr: num(28.99, 0, 40),
  d2Pay: num(120, 0, 1_000_000),
  d3Name: text("Mastercard", 24),
  d3Bal: num(1_500, 0, 10_000_000),
  d3Apr: num(21, 0, 40),
  d3Pay: num(60, 0, 1_000_000),
  d4Name: text("Debt 4", 24),
  d4Bal: num(0, 0, 10_000_000),
  d4Apr: num(0, 0, 40),
  d4Pay: num(0, 0, 1_000_000),
  d5Name: text("Debt 5", 24),
  d5Bal: num(0, 0, 10_000_000),
  d5Apr: num(0, 0, 40),
  d5Pay: num(0, 0, 1_000_000),
  apr: num(14, 0, 40),
  term: oneOf<Term>("36", TERMS),
  feePct: num(4, 0, 12),
  feeHow: oneOf<FeeMode>("deducted", ["deducted", "added"]),
};
type Values = { [K in keyof typeof SCHEMA]: (typeof SCHEMA)[K]["def"] };
type Slot = 1 | 2 | 3 | 4 | 5;
const keys = (i: Slot) => ({ name: `d${i}Name`, bal: `d${i}Bal`, apr: `d${i}Apr`, pay: `d${i}Pay` }) as { name: keyof Values; bal: keyof Values; apr: keyof Values; pay: keyof Values };
const ADVANCED = ["feeHow", "d4Name", "d4Bal", "d4Apr", "d4Pay", "d5Name", "d5Bal", "d5Apr", "d5Pay"] as const;

export default function DebtConsolidationStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values as Values;
  const slots: Slot[] = [1, 2, 3, 4, 5];
  const debts: DebtLine[] = slots
    .map((i) => {
      const k = keys(i);
      return { name: String(v[k.name]).trim() || `Debt ${i}`, balance: Number(v[k.bal]), aprPct: Number(v[k.apr]), payment: Number(v[k.pay]) };
    })
    .filter((d) => d.balance > 0);
  const months = Number(v.term);
  const c = consolidate(debts, v.apr, months, v.feePct, v.feeHow);
  const loan = c.loan;
  const currentDone = Number.isFinite(c.current.months);
  const saves = currentDone && c.saving > 0;
  const longer = currentDone && months > c.current.months;
  const sameDone = Number.isFinite(c.sameBudget.months);
  const sameSaving = currentDone ? c.current.totalInterest - (c.sameBudget.totalInterest + loan.fee) : 0;
  const terms = TERMS.map((t) => ({ t: Number(t), r: consolidate(debts, v.apr, Number(t), v.feePct, v.feeHow) }));
  const maxCost = Math.max(1, ...terms.map((x) => x.r.loan.totalCost), currentDone ? c.current.totalInterest : 0);
  const stuck = debts.filter((d) => d.payment <= (d.balance * d.aprPct) / 1200);
  const chartLen = Math.min(240, Math.max(loan.months, currentDone ? c.current.months : 120));
  const currentBal = Array.from({ length: chartLen + 1 }, (_, m) =>
    m === 0 ? c.total : c.current.perDebt.reduce((s, sch) => s + (sch.rows[m - 1]?.balance ?? (Number.isFinite(sch.months) ? 0 : sch.rows[sch.rows.length - 1]?.balance ?? 0)), 0),
  );
  const loanBal = Array.from({ length: chartLen + 1 }, (_, m) => (m === 0 ? loan.borrowed : c.loanSchedule.rows[m - 1]?.balance ?? 0));

  const debtFields = (i: Slot, optional = false) => {
    const k = keys(i);
    return (
      <InputGroup key={i} title={`Debt ${i}`}>
        <TextField label={`Debt ${i} name`} value={String(v[k.name])} onChange={(s) => st.set(k.name, s as never)} maxLength={24} optional={optional} />
        <MoneyField symbol="$" label="Balance" value={Number(v[k.bal])} onChange={(n) => st.set(k.bal, n as never)} optional={optional} />
        <StepperField label="Interest rate (APR)" value={Number(v[k.apr])} onChange={(n) => st.set(k.apr, n as never)} step={0.25} min={0} max={40} unit="%" dp={2} optional={optional} />
        <MoneyField symbol="$" label="Monthly payment" value={Number(v[k.pay])} onChange={(n) => st.set(k.pay, n as never)} optional={optional} info="What you pay now each month. We assume you keep paying this amount until the debt is gone." />
      </InputGroup>
    );
  };

  return (
    <Studio
      title="Your debts and the consolidation loan"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Compare consolidation"
      onReset={st.reset}
      dock={{ label: saves ? "Consolidation saves" : "Consolidation costs", value: currentDone ? usd(Math.abs(c.saving)) : "See results" }}
      inputs={
        <>
          {debtFields(1)}
          {debtFields(2)}
          {debtFields(3)}
          <InputGroup title="The consolidation loan">
            <StepperField label="Loan APR (before fees)" value={v.apr} onChange={st.bind("apr")} step={0.25} min={0} max={40} unit="%" dp={2} info="Your quoted rate. Average personal loan offers ran from about 15% for excellent credit to about 30% for bad credit in October 2026." />
            <SelectField label="Loan term" value={v.term} onChange={st.bind("term")} options={TERMS.map((t) => ({ value: t, label: `${t} months (${Number(t) / 12} years)` }))} />
            <StepperField label="Origination fee" value={v.feePct} onChange={st.bind("feePct")} step={0.5} min={0} max={12} unit="%" dp={2} aside={usd(loan.fee)} />
          </InputGroup>
          <AdvancedOptions title="More options" description="Optional. How the fee is paid, and a fourth and fifth debt." changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <Segmented
              label="How the fee is paid"
              optional
              value={v.feeHow}
              onChange={st.bind("feeHow")}
              options={[
                { value: "deducted", label: "Taken from the loan", note: "We raise the loan so that, after the fee, it still pays off every debt." },
                { value: "added", label: "Added to the balance" },
              ]}
            />
            {debtFields(4, true)}
            {debtFields(5, true)}
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={currentDone ? (saves ? "Consolidating saves" : "Consolidating costs more by") : "New loan payment"}
        value={currentDone ? usd(Math.abs(c.saving)) : usd(loan.payment, true)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          c.total <= 0 ? (
            <>Enter at least one debt.</>
          ) : !currentDone ? (
            <>
              At your current payments, at least one debt never gets paid off. A <b>{usd(loan.borrowed)}</b>{" "}loan at {v.apr}% would clear everything in <b>{duration(months)}</b>{" "}at{" "}
              <b>{usd(loan.payment, true)}</b>{" "}a month.
            </>
          ) : (
            <>
              Today you pay <b>{usd(c.currentPayment)}</b>{" "}a month and are debt-free in <b>{duration(c.current.months)}</b>, with <b>{usd(c.current.totalInterest)}</b>{" "}of interest.
              A <b>{usd(loan.borrowed)}</b>{" "}loan at {v.apr}% costs <b>{usd(loan.payment, true)}</b>{" "}a month for {duration(months)}, with <b>{usd(loan.totalCost)}</b>{" "}of interest and fees.
            </>
          )
        }
        badges={[
          `${debts.length} ${debts.length === 1 ? "debt" : "debts"}, ${usd(c.total)}`,
          `Average APR ${c.averageAprPct.toFixed(2)}%`,
          `Loan APR with fee ${loan.trueAprPct.toFixed(2)}%`,
        ]}
      />

      <Facts
        items={[
          { label: "Monthly payment now", value: usd(c.currentPayment) },
          { label: "Loan payment", value: usd(loan.payment, true), tone: loan.payment < c.currentPayment ? "good" : undefined },
          { label: "Interest now", value: currentDone ? usd(c.current.totalInterest) : "Never paid off", tone: "warn" },
          { label: "Loan interest and fee", value: usd(loan.totalCost) },
          { label: "Debt-free now", value: currentDone ? duration(c.current.months) : "Never" },
          { label: "Debt-free with the loan", value: duration(months) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Your debts", value: "Each paid at its current monthly payment until cleared, interest at APR ÷ 12, no new spending" },
          { label: "The loan", value: `${v.apr}% fixed for ${months} months; ${v.feeHow === "deducted" ? "the fee is taken out, so the loan is raised to cover every balance" : "the fee is added to the balance"}` },
          { label: "Fee", value: `${v.feePct}% (${usd(loan.fee)})` },
          { label: "Not included", value: "Annual fees, late fees, promotional rates and any change to your credit score" },
        ]}
      />

      <ResultCard title="What the loan costs" sub="Paying off your debts with one loan.">
        <SplitBar
          segments={[
            { label: "Debts paid off", value: c.total, display: usd(c.total), color: "#16a34a" },
            { label: "Loan interest", value: loan.totalInterest, display: usd(loan.totalInterest), color: "#f59e0b" },
            { label: "Origination fee", value: loan.fee, display: usd(loan.fee), color: "#db2777" },
          ]}
        />
      </ResultCard>

      <ResultCard title="Your debts now vs the loan" sub="Interest and fees, by loan term.">
        <Compare
          head={["Plan · monthly payment · time", "Interest and fees"]}
          rows={[
            {
              label: `Keep paying your debts · ${usd(c.currentPayment)} · ${currentDone ? duration(c.current.months) : "never"}`,
              value: currentDone ? usd(c.current.totalInterest) : "Never paid off",
              bar: currentDone ? c.current.totalInterest / maxCost : 1,
            },
            ...terms.map(({ t, r }) => ({
              label: `${t}-month loan · ${usd(r.loan.payment)} · ${duration(t)}`,
              value: usd(r.loan.totalCost),
              bar: r.loan.totalCost / maxCost,
              current: t === months,
              delta: currentDone ? (r.saving >= 0 ? `saves ${usd(r.saving)}` : `costs ${usd(-r.saving)} more`) : undefined,
              deltaTone: (currentDone ? (r.saving >= 0 ? "down" : "up") : undefined) as "down" | "up" | undefined,
            })),
          ]}
        />
      </ResultCard>

      {c.currentPayment > loan.payment && sameDone && (
        <ResultCard title="Keep paying what you pay now" sub={`Put the full ${usd(c.currentPayment)} a month on the loan.`}>
          <Facts
            items={[
              { label: "Debt-free in", value: duration(c.sameBudget.months), tone: "good" },
              { label: "Interest and fee", value: usd(c.sameBudget.totalInterest + loan.fee) },
              ...(currentDone ? [{ label: "Saving vs your debts now", value: usd(sameSaving), tone: sameSaving > 0 ? ("good" as const) : ("warn" as const) }] : []),
            ]}
          />
          <p className="footnote">The lower loan payment frees up {usd(c.currentPayment - loan.payment)} a month. Paying it toward the loan instead clears it sooner, if the lender allows extra payments without a penalty.</p>
        </ResultCard>
      )}

      <ResultCard title="Total balance over time" sub="Your debts at today's payments vs the new loan.">
        <AreaChart
          ariaLabel="Total debt by month"
          series={[
            { key: "now", label: "Debts at today's payments", color: "#f59e0b", values: currentBal, dashed: true },
            { key: "loan", label: "Consolidation loan", color: "#16a34a", values: loanBal, fill: true },
          ]}
          xLabel={(i) => `M${i}`}
          yFormat={usdShort}
          initial={Math.min(12, chartLen)}
          hint="Drag across the chart, or use the arrow keys, to read any month."
          readout={(i) => (
            <>
              Month <b>{i}</b>: debts now <b>{usd(currentBal[i] ?? 0)}</b>, loan <b>{usd(loanBal[i] ?? 0)}</b>.
            </>
          )}
        />
        <DataTable
          summary="Each debt at its current payment"
          columns={["Debt", "Balance", "APR", "Payment", "Paid off in", "Interest"]}
          rows={debts.map((d, i) => {
            const s = c.current.perDebt[i];
            const done = Number.isFinite(s.months);
            return [d.name, usd(d.balance), `${d.aprPct}%`, usd(d.payment), done ? duration(s.months) : "Never", done ? usd(s.totalInterest) : "—"];
          })}
        />
      </ResultCard>

      {longer && (
        <Callout tone="warn" title="This loan runs longer than your current debts">
          You would be paying for {duration(months)} instead of {duration(c.current.months)}. A lower rate can still cost more in total when it is spread over more months. Try a
          shorter term, or keep paying your current {usd(c.currentPayment)} a month on the new loan.
        </Callout>
      )}
      {currentDone && c.saving < 0 && (
        <Callout tone="warn" title="The loan costs more than your debts">
          With this rate, fee and term, consolidating adds {usd(-c.saving)} of cost. A lower payment alone is not a saving.
        </Callout>
      )}
      {stuck.length > 0 && (
        <Callout tone="warn" title="A payment does not cover its interest">
          {stuck.map((d) => d.name).join(", ")}: the payment is no more than the monthly interest, so this debt never shrinks. Consolidating, or raising the payment, is needed to
          get it paid off.
        </Callout>
      )}
      <Callout title="Keep the cards paid off">
        Consolidation only works if the cards stay paid off. Keep them open for your credit score if you like, but do not run them back up.
      </Callout>

      <p className="footnote" style={{ textAlign: "center" }}>
        An estimate, not a loan offer. Card issuers charge interest daily and may change rates or minimum payments.
      </p>
    </Studio>
  );
}
