"use client";

import { useEffect, useReducer, useState } from "react";
import { computeMortgage, monthlyPaymentFor, nextLtvStep, yearlySeries, type MortgageType } from "@/lib/property/mortgage-engine";
import { stampDuty, type BuyerType } from "@/lib/tax/sdlt-2025";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, Chips, InputGroup, MoneyField, Segmented, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, DataTable, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { duration, gbp, gbpShort, percent, whole } from "@/components/flagship/format";
import s from "@/components/flagship/Flagship.module.css";

/** Typical one-off costs on top of deposit and Stamp Duty. */
const FEES = { arrangement: 999, legal: 1500, survey: 500 };
const COLORS = { capital: "#4353ff", interest: "#f59e0b", owed: "#94a3b8", baseline: "#9aa0bf" };

type State = {
  price: number;
  deposit: number;
  rate: number;
  term: number;
  type: MortgageType;
  overpay: number;
  buyer: BuyerType;
};
type Action = { [K in keyof State]: { key: K; value: State[K] } }[keyof State] | { key: "reset" };

const DEFAULTS: State = { price: 350_000, deposit: 70_000, rate: 4.75, term: 25, type: "repayment", overpay: 0, buyer: "standard" };

function reducer(st: State, a: Action): State {
  if (a.key === "reset") return DEFAULTS;
  const next = { ...st, [a.key]: a.value } as State;
  next.price = Math.max(0, next.price);
  next.deposit = Math.min(next.price, Math.max(0, next.deposit));
  return next;
}

export default function MortgageStudio({
  showResults,
  ...initial
}: {
  price: number;
  deposit: number;
  rate: number;
  term: number;
  /** Open with results showing, e.g. when arriving from a shared link. */
  showResults: boolean;
}) {
  const [st, set] = useReducer(reducer, { ...DEFAULTS, ...initial });
  const [ready, setReady] = useState(showResults);
  const [copied, setCopied] = useState(false);

  const inputs = { price: st.price, deposit: st.deposit, ratePct: st.rate, termYears: st.term, type: st.type };
  // A full month-by-month simulation is a few hundred steps, so recomputing
  // on every render is cheaper than memo bookkeeping.
  const snap = computeMortgage({ ...inputs, overpayment: st.overpay });
  const base = st.overpay > 0 ? computeMortgage({ ...inputs, overpayment: 0 }) : snap;
  const series = yearlySeries(snap, st.term);
  const baseSeries = yearlySeries(base, st.term);
  const sdlt = stampDuty(st.price, st.buyer).total;
  const ltvStep = nextLtvStep(st.price, st.deposit);
  const interestOnly = st.type === "interest-only";
  const depositPct = st.price > 0 ? st.deposit / st.price : 0;
  const freeYear = new Date().getFullYear() + Math.ceil(snap.payoffMonths / 12);

  // Once there are results, keep the address bar in step so the page can be
  // bookmarked or shared.
  useEffect(() => {
    if (!ready) return;
    const t = window.setTimeout(() => {
      const q = new URLSearchParams({ price: String(st.price), deposit: String(st.deposit), rate: String(st.rate), term: String(st.term) });
      window.history.replaceState(null, "", `${window.location.pathname}?${q}`);
    }, 400);
    return () => window.clearTimeout(t);
  }, [ready, st.price, st.deposit, st.rate, st.term]);

  const advancedChanged = [st.type !== DEFAULTS.type, st.overpay !== DEFAULTS.overpay, st.buyer !== DEFAULTS.buyer].filter(Boolean).length;

  const reset = () => {
    set({ key: "reset" });
    setReady(false);
    window.history.replaceState(null, "", window.location.pathname);
  };

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — the URL is still in the address bar */
    }
  };

  // What-if helpers
  const overpayPreview = (amount: number) => {
    const o = computeMortgage({ ...inputs, overpayment: amount });
    return { saved: base.totalInterest - o.totalInterest, months: base.payoffMonths - o.payoffMonths };
  };
  const rateRows = [-1, 0, 1, 2, 3]
    .map((d) => ({ d, rate: st.rate + d }))
    .filter((r) => r.rate >= 0)
    .map((r) => ({ ...r, pay: monthlyPaymentFor(snap.loan, r.rate, st.term, st.type) }));
  const maxPay = Math.max(...rateRows.map((r) => r.pay), 1);
  const upfront = st.deposit + sdlt + FEES.arrangement + FEES.legal + FEES.survey;

  return (
    <Studio
      title="Your mortgage"
      ready={ready}
      onCalculate={() => setReady(true)}
      calculateLabel="Calculate my mortgage"
      onReset={reset}
      dock={{ label: "Monthly payment", value: gbp(snap.monthlyOutgoing, true) }}
      inputs={
        <>
          <InputGroup title="The property">
            <MoneyField
              label="Property price"
              value={st.price}
              onChange={(v) => set({ key: "price", value: v })}
              big
              slider={{ min: 50_000, max: 2_000_000, step: 5_000, ends: ["£50k", "£2m"] }}
            />
            <MoneyField
              label="Deposit"
              value={st.deposit}
              onChange={(v) => set({ key: "deposit", value: v })}
              aside={`${percent(depositPct, depositPct < 0.1 && depositPct > 0 ? 1 : 0)} of price`}
              slider={{ min: 0, max: Math.max(st.price, 1), step: 1_000 }}
            />
            <Chips
              label="Deposit as a share of the price"
              value={[0.05, 0.1, 0.15, 0.25, 0.4].find((p) => Math.abs(p - depositPct) < 0.0005) ?? null}
              onChange={(p) => set({ key: "deposit", value: Math.round(st.price * p) })}
              options={[0.05, 0.1, 0.15, 0.25, 0.4].map((p) => ({ value: p, label: `${p * 100}%` }))}
            />
          </InputGroup>

          <InputGroup title="The mortgage">
            <StepperField
              label="Interest rate"
              value={st.rate}
              onChange={(v) => set({ key: "rate", value: v })}
              step={0.05}
              min={0}
              max={15}
              unit="%"
              hint="Typical fixed rates in 2025 are roughly 4% to 5.5%."
            />
            <StepperField
              label="Mortgage term"
              value={st.term}
              onChange={(v) => set({ key: "term", value: Math.round(v) })}
              step={1}
              min={1}
              max={40}
              unit="years"
              dp={0}
            />
            <Chips
              label="Common terms"
              value={st.term}
              onChange={(v) => set({ key: "term", value: v })}
              options={[15, 20, 25, 30, 35].map((t) => ({ value: t, label: `${t} yrs` }))}
            />
          </InputGroup>

          <AdvancedOptions
            changed={advancedChanged}
            onReset={() => {
              set({ key: "type", value: DEFAULTS.type });
              set({ key: "overpay", value: DEFAULTS.overpay });
              set({ key: "buyer", value: DEFAULTS.buyer });
            }}
          >
            <Segmented
              label="Mortgage type"
              value={st.type}
              onChange={(v) => set({ key: "type", value: v })}
              options={[
                { value: "repayment", label: "Repayment", note: "You pay off interest and the loan, so you own the home outright at the end." },
                { value: "interest-only", label: "Interest-only", note: "You only pay interest. The full loan is still owed at the end of the term." },
              ]}
            />
            <MoneyField
              label="Overpay each month"
              value={st.overpay}
              onChange={(v) => set({ key: "overpay", value: v })}
              max={50_000}
              hint="Most lenders let you overpay up to 10% of the balance a year without a fee."
            />
            <Segmented
              label="For Stamp Duty, you are a"
              value={st.buyer}
              onChange={(v) => set({ key: "buyer", value: v })}
              options={[
                { value: "standard", label: "Mover" },
                { value: "first-time", label: "First-time" },
                { value: "additional", label: "2nd home" },
              ]}
            />
          </AdvancedOptions>
        </>
      }
    >
      {/* 1. The answer */}
      <Answer
        eyebrow={st.overpay > 0 ? "You'll pay each month (incl. overpayment)" : "Your monthly payment"}
        value={gbp(snap.monthlyOutgoing, true)}
        unit="a month"
        actions={
          <button type="button" className={s.ghostBtn} onClick={share}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" />
            </svg>
            {copied ? "Link copied" : "Share"}
          </button>
        }
        sentence={
          snap.loan <= 0 ? (
            <>Your deposit covers the whole price, so there’s nothing to borrow.</>
          ) : interestOnly ? (
            <>
              Borrowing <b>{gbp(snap.loan)}</b> at <b>{st.rate}%</b>, you pay only the interest. After <b>{st.term} years</b> you’ll still owe
              the full <b>{gbp(snap.balloon || snap.loan)}</b>, and you’ll have paid <b>{gbp(snap.totalInterest)}</b> in interest.
            </>
          ) : (
            <>
              Borrowing <b>{gbp(snap.loan)}</b> over <b>{st.term} years</b> at <b>{st.rate}%</b>, you’ll repay <b>{gbp(snap.totalRepaid)}</b> in
              total. <b>{gbp(snap.totalInterest)}</b> of that is interest.
            </>
          )
        }
        badges={[
          interestOnly ? "Interest-only" : `Mortgage-free by ${freeYear}`,
          `${percent(snap.ltv)} loan-to-value`,
          ...(snap.overpayment.active ? [`${gbp(snap.overpayment.interestSaved)} interest saved`] : []),
        ]}
      />

      {/* 2. Key figures */}
      <Facts
        items={[
          { label: "You borrow", value: gbp(snap.loan), note: `${percent(depositPct)} deposit` },
          {
            label: "Total interest",
            value: gbp(snap.totalInterest),
            note: `${percent(snap.interestShare)} of all you repay`,
            tone: snap.interestShare > 0.4 ? "warn" : undefined,
          },
          { label: "Total you repay", value: gbp(snap.totalRepaid + snap.balloon) },
          interestOnly
            ? { label: "Still owed at the end", value: gbp(snap.balloon), tone: "bad", note: "Needs a plan to repay" }
            : {
                label: "Mortgage-free in",
                value: duration(snap.payoffMonths),
                note: snap.overpayment.monthsSaved > 0 ? `${duration(snap.overpayment.monthsSaved)} sooner` : undefined,
                tone: snap.overpayment.monthsSaved > 0 ? "good" : undefined,
              },
        ]}
      />

      <Assumptions
        items={[
          { label: "Mortgage type", value: interestOnly ? "Interest-only" : "Repayment" },
          { label: "Interest rate", value: `${st.rate}% for the whole term` },
          { label: "Overpayments", value: st.overpay > 0 ? `${gbp(st.overpay)} a month` : "None" },
          { label: "Stamp Duty", value: st.buyer === "first-time" ? "First-time buyer, England & NI" : st.buyer === "additional" ? "Second home, England & NI" : "Home mover, England & NI" },
        ]}
      />

      {/* 3. Where the money goes */}
      {snap.loan > 0 && (
        <ResultCard title="Where your money goes" sub="Everything you pay over the life of the mortgage, split into what clears the loan and what the lender charges.">
          <SplitBar
            segments={[
              { label: "Paying off the loan", value: snap.loan - snap.balloon, display: gbp(snap.loan - snap.balloon), color: COLORS.capital },
              { label: "Interest to the lender", value: snap.totalInterest, display: gbp(snap.totalInterest), color: COLORS.interest },
              ...(snap.balloon > 0 ? [{ label: "Still owed at the end", value: snap.balloon, display: gbp(snap.balloon), color: COLORS.owed }] : []),
            ]}
            caption={
              <>
                For every <b>£1</b> you borrow, you’ll pay back <b>£{((snap.totalRepaid + snap.balloon) / Math.max(1, snap.loan)).toFixed(2)}</b>.
              </>
            }
          />
        </ResultCard>
      )}

      {/* 4. Balance over time */}
      {snap.loan > 0 && (
        <ResultCard
          title="How your balance falls"
          sub={interestOnly ? "On interest-only the balance doesn't fall, while the interest keeps adding up." : "Early on most of each payment is interest, so the balance falls slowly at first and faster later."}
        >
          <AreaChart
            ariaLabel="Mortgage balance by year"
            series={[
              { key: "balance", label: "What you still owe", color: COLORS.capital, values: series.balance, fill: true },
              ...(snap.overpayment.active
                ? [{ key: "base", label: "Without overpaying", color: COLORS.baseline, values: baseSeries.balance, dashed: true }]
                : []),
              { key: "interest", label: "Interest paid so far", color: COLORS.interest, values: series.interestPaid },
            ]}
            xLabel={(i) => (i === 0 ? "Today" : `Year ${i}`)}
            yFormat={gbpShort}
            initial={Math.min(st.term, 10)}
            readout={(i) =>
              i === 0 ? (
                <>
                  <b>Today:</b> you owe <b>{gbp(snap.loan)}</b>.
                </>
              ) : (
                <>
                  <b>After {i === 1 ? "1 year" : `${i} years`}:</b> you still owe <b>{gbp(series.balance[i])}</b>, you’ve paid off{" "}
                  <b>{gbp(snap.loan - series.balance[i])}</b> of the loan and <b>{gbp(series.interestPaid[i])}</b> in interest.
                </>
              )
            }
          />
        </ResultCard>
      )}

      {/* 5. Overpayments + LTV tips */}
      {snap.loan > 0 && (
        <ResultCard title="Ways to pay less" sub="Small changes that make a big difference over the years.">
          {snap.overpayment.active ? (
            <Callout tone="good" title={`Overpaying ${gbp(st.overpay)} a month saves you ${gbp(snap.overpayment.interestSaved)}`}>
              {snap.overpayment.monthsSaved > 0 ? (
                <>
                  You’d be mortgage-free <b>{duration(snap.overpayment.monthsSaved)}</b> sooner, in <b>{duration(snap.payoffMonths)}</b>.
                </>
              ) : (
                <>On interest-only, overpayments reduce what you owe at the end.</>
              )}
            </Callout>
          ) : (
            <Callout
              title="Try overpaying a little each month"
              action={[100, 250].map((a) => (
                <button key={a} type="button" className={s.actionBtn} onClick={() => set({ key: "overpay", value: a })}>
                  Try {gbp(a)} a month
                </button>
              ))}
            >
              {(() => {
                const p = overpayPreview(100);
                return (
                  <>
                    Just <b>£100 a month</b> extra would save about <b>{gbp(p.saved)}</b> in interest
                    {p.months > 0 && (
                      <>
                        {" "}
                        and clear your mortgage <b>{duration(p.months)}</b> sooner
                      </>
                    )}
                    .
                  </>
                );
              })()}
            </Callout>
          )}
          {ltvStep && ltvStep.extraDeposit <= st.price * 0.1 && (
            <Callout title={`${gbp(ltvStep.extraDeposit)} more deposit gets you to ${percent(ltvStep.threshold)} LTV`}>
              Lenders price rates in loan-to-value bands. Dropping into the <b>{percent(ltvStep.threshold)}</b> band usually unlocks a lower rate
              for the whole deal.
            </Callout>
          )}
          {snap.ltv > 0.95 && (
            <Callout tone="warn" title="Most lenders need at least a 5% deposit">
              At {percent(snap.ltv)} loan-to-value you may struggle to find a mortgage. Aim for a deposit of at least <b>{gbp(st.price * 0.05)}</b>.
            </Callout>
          )}
        </ResultCard>
      )}

      {/* 6. Rate stress test */}
      {snap.loan > 0 && (
        <ResultCard
          title="If interest rates change"
          sub="Most fixed deals last 2 to 5 years. Check you could still afford the payment if rates are higher when you remortgage."
        >
          <Compare
            head={["Interest rate", "Monthly payment"]}
            rows={rateRows.map((r) => ({
              label: (
                <>
                  {r.rate.toFixed(2)}%{r.d === 0 ? " (yours)" : ""}
                </>
              ),
              value: gbp(r.pay, true),
              delta: r.d === 0 ? undefined : `${r.pay > snap.monthlyPayment ? "+" : "−"}${gbp(Math.abs(r.pay - snap.monthlyPayment))}`,
              deltaTone: r.pay > snap.monthlyPayment ? "up" : "down",
              bar: r.pay / maxPay,
              current: r.d === 0,
            }))}
          />
        </ResultCard>
      )}

      {/* 7. Cash needed upfront */}
      <ResultCard title="Cash you need to buy" sub="What you need on completion day, on top of the mortgage.">
        <SplitBar
          segments={[
            { label: "Deposit", value: st.deposit, display: gbp(st.deposit), color: COLORS.capital },
            {
              label: `Stamp Duty (${st.buyer === "first-time" ? "first-time buyer" : st.buyer === "additional" ? "second home" : "home mover"})`,
              value: sdlt,
              display: gbp(sdlt),
              color: COLORS.interest,
            },
            { label: "Typical fees (lender, legal, survey)", value: upfront - st.deposit - sdlt, display: gbp(upfront - st.deposit - sdlt), color: COLORS.owed },
          ]}
          caption={
            <>
              In total you’ll need about <b>{gbp(upfront)}</b>. Fees vary by lender and solicitor; Stamp Duty uses England and Northern
              Ireland rates.
            </>
          }
        />
      </ResultCard>

      {/* 8. Full schedule */}
      {snap.loan > 0 && (
        <DataTable
          summary="Year-by-year breakdown"
          columns={["Year", "Interest paid", "Loan paid off", "Still owed"]}
          rows={snap.schedule.map((y) => [y.year, gbp(y.interest), gbp(y.capital), gbp(y.balance)])}
        />
      )}
      <p className={s.hint} style={{ textAlign: "center" }}>
        Estimates based on a constant {st.rate}% rate over {whole(st.term)} years. Your lender’s Key Facts Illustration is the final word.
      </p>
    </Studio>
  );
}
