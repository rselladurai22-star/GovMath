"use client";

import { balanceByLoanYear, earlyPayoff, extraForTarget, monthName, monthYear, parseYm, prepayVsInvest } from "@/lib/us/home-equity";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, DateField, InputGroup, MoneyField, Segmented, SelectField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, DataTable, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { duration, usd, usdShort } from "@/components/flagship/format";
import { bool, date, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const MONTHS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"] as const;
type MonthKey = (typeof MONTHS)[number];

const SCHEMA = {
  balance: num(300_000, 0, 100_000_000),
  rate: num(6.5, 0, 30),
  yearsLeft: num(27, 0, 40),
  monthsLeft: num(0, 0, 11),
  mode: oneOf<"extra" | "target">("extra", ["extra", "target"]),
  extra: num(200, 0, 10_000_000),
  targetYears: num(20, 1, 40),
  biweekly: bool(false),
  lump: num(0, 0, 100_000_000),
  extraYearly: num(0, 0, 10_000_000),
  yearlyMonth: oneOf<MonthKey>("4", MONTHS),
  next: date("2026-11-01"),
  invest: num(6, 0, 20),
};
const ADVANCED = ["monthsLeft", "lump", "extraYearly", "yearlyMonth", "next", "invest"] as const;

export default function PayoffStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const monthsLeft = Math.max(1, Math.round(v.yearsLeft * 12 + v.monthsLeft));
  const next = parseYm(v.next);
  const target = v.mode === "target";
  const targetMonths = Math.min(monthsLeft, Math.max(1, Math.round(v.targetYears * 12)));
  const lump = Math.min(v.lump, v.balance);
  const needed = target ? extraForTarget(v.balance, v.rate, monthsLeft, targetMonths, lump) : 0;
  const extraMonthly = target ? needed : v.extra;
  const biweekly = !target && v.biweekly;
  const yearly = target ? 0 : v.extraYearly;
  const p = earlyPayoff({ balance: v.balance, aprPct: v.rate, monthsLeft, extraMonthly, biweekly, lumpSum: lump, extraYearly: yearly, yearlyMonth: Number(v.yearlyMonth), next });
  const loan = v.balance > 0;
  const monthlyExtraTotal = extraMonthly + p.biweeklyExtra;
  const anyExtra = monthlyExtraTotal > 0 || lump > 0 || yearly > 0;
  const avgMonthlyExtra = monthlyExtraTotal + yearly / 12;
  const vs = prepayVsInvest(v.balance, v.rate, monthsLeft, avgMonthlyExtra, lump, v.invest);

  const bal = balanceByLoanYear(v.balance, p.plan);
  const baseBal = balanceByLoanYear(v.balance, p.base);
  const n = Math.max(bal.length, baseBal.length);
  const balPad = [...bal, ...Array(Math.max(0, n - bal.length)).fill(0)];

  const scenario = (label: string, monthly: number, bi: boolean, lumpSum: number) => {
    const x = earlyPayoff({ balance: v.balance, aprPct: v.rate, monthsLeft, extraMonthly: monthly, biweekly: bi, lumpSum, extraYearly: 0, yearlyMonth: 1, next });
    return [label, monthYear(x.plan.payoff), duration(x.monthsSaved), usd(x.interestSaved)];
  };
  const ideas = [
    scenario("No extra", 0, false, 0),
    scenario("$100 more a month", 100, false, 0),
    scenario("$250 more a month", 250, false, 0),
    scenario("$500 more a month", 500, false, 0),
    scenario("Biweekly payments", 0, true, 0),
    scenario("$10,000 lump sum now", 0, false, 10_000),
  ];

  const headline = target ? usd(needed, true) : loan ? monthYear(p.plan.payoff) : "No loan";

  return (
    <Studio
      title="Your mortgage payoff"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="See my payoff date"
      onReset={st.reset}
      dock={{ label: target ? "Extra needed a month" : "New payoff date", value: headline }}
      inputs={
        <>
          <InputGroup title="Your mortgage today">
            <MoneyField label="Balance left" symbol="$" value={v.balance} onChange={st.bind("balance")} slider={{ min: 10_000, max: 1_500_000, step: 5_000, ends: ["$10k", "$1.5m"] }} info="The principal balance on your latest mortgage statement, not the payoff quote (which adds interest to date)." />
            <StepperField label="Interest rate" value={v.rate} onChange={st.bind("rate")} step={0.125} min={0} max={30} unit="%" dp={3} />
            <StepperField label="Years left" value={v.yearsLeft} onChange={st.bind("yearsLeft")} step={1} min={0} max={40} unit="years" dp={0} info="Add any odd months under More options. A 30-year loan taken out three years ago has 27 years left." />
            <Segmented
              label="Plan"
              value={v.mode}
              onChange={st.bind("mode")}
              options={[
                { value: "extra", label: "Pay extra" },
                { value: "target", label: "Pick a payoff date" },
              ]}
            />
            {target ? (
              <StepperField label="Pay it off in" value={v.targetYears} onChange={st.bind("targetYears")} step={1} min={1} max={40} unit="years" dp={0} aside={monthYear(p.plan.payoff)} />
            ) : (
              <>
                <MoneyField label="Extra principal each month" symbol="$" value={v.extra} onChange={st.bind("extra")} slider={{ min: 0, max: 2_000, step: 25, ends: ["$0", "$2,000"] }} />
                <Switch label="Pay half the payment every two weeks" checked={v.biweekly} onChange={st.bind("biweekly")} info="26 half payments a year add up to one extra monthly payment. We model it as one-twelfth of a payment extra each month." />
              </>
            )}
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <StepperField label="Extra months left" optional value={v.monthsLeft} onChange={st.bind("monthsLeft")} step={1} min={0} max={11} unit="months" dp={0} />
            <MoneyField label="Lump sum now" symbol="$" optional value={v.lump} onChange={st.bind("lump")} info="Paid with your next payment, straight to principal." />
            {!target && <MoneyField label="Extra once a year" symbol="$" optional value={v.extraYearly} onChange={st.bind("extraYearly")} />}
            {!target && v.extraYearly > 0 && (
              <SelectField label="Month of the yearly extra" optional value={v.yearlyMonth} onChange={st.bind("yearlyMonth")} options={MONTHS.map((m) => ({ value: m, label: monthName(Number(m)) }))} />
            )}
            <DateField label="Next payment date" optional value={v.next} onChange={st.bind("next")} />
            <StepperField
              label="Investment return to compare"
              optional
              value={v.invest}
              onChange={st.bind("invest")}
              step={0.5}
              min={0}
              max={20}
              unit="%"
              dp={1}
              info="A yearly return, before tax, on money you would invest instead of prepaying. Stocks have no guaranteed return; a high-yield savings account or Treasury bill is closer to a sure thing."
            />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={target ? "Extra needed each month" : "New payoff date"}
        value={headline}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          !loan ? (
            <>Enter your balance to see your payoff plan.</>
          ) : target ? (
            <>
              To pay off <b>{usd(v.balance)}</b>{" "}at {v.rate}% in <b>{duration(targetMonths)}</b>{" "}instead of {duration(monthsLeft)}, pay <b>{usd(needed, true)}</b>{" "}more each month
              {lump > 0 ? ` after a ${usd(lump)} lump sum` : ""}. Your last payment would be in <b>{monthYear(p.plan.payoff)}</b>, saving <b>{usd(p.interestSaved)}</b>{" "}of
              interest.
            </>
          ) : anyExtra ? (
            <>
              Your payment is <b>{usd(p.payment, true)}</b>. With your extra payments you finish in <b>{monthYear(p.plan.payoff)}</b>, <b>{duration(p.monthsSaved)}</b>{" "}early,
              and save <b>{usd(p.interestSaved)}</b>{" "}of interest.
            </>
          ) : (
            <>
              Your payment is <b>{usd(p.payment, true)}</b>{" "}and your last payment is due in <b>{monthYear(p.base.payoff)}</b>. Add an extra amount to see how much sooner you could
              finish.
            </>
          )
        }
        badges={[`Payment ${usd(p.payment, true)}`, `Was ${monthYear(p.base.payoff)}`, `${duration(p.monthsSaved)} sooner`]}
      />

      <Facts
        items={[
          { label: "Interest saved", value: usd(p.interestSaved), tone: p.interestSaved > 0.5 ? "good" : undefined },
          { label: "Time saved", value: duration(p.monthsSaved), tone: p.monthsSaved > 0 ? "good" : undefined },
          { label: "Interest still to pay", value: usd(p.plan.totalInterest), tone: "warn", note: `Was ${usd(p.base.totalInterest)}` },
          { label: "Extra principal in all", value: usd(p.plan.totalExtra) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Loan", value: `${usd(v.balance)} at ${v.rate}% fixed, ${duration(monthsLeft)} left, payment ${usd(p.payment, true)} (principal and interest)` },
          {
            label: "Extra payments",
            value: [
              monthlyExtraTotal > 0 ? `${usd(monthlyExtraTotal, true)} a month${biweekly ? " (including the biweekly plan)" : ""}` : "",
              lump > 0 ? `${usd(lump)} with the next payment` : "",
              yearly > 0 ? `${usd(yearly)} each ${monthName(Number(v.yearlyMonth))}` : "",
            ]
              .filter(Boolean)
              .join(", ") || "None",
          },
          { label: "How extras are applied", value: "All to principal, with no prepayment penalty; the required payment stays the same" },
          { label: "Investing comparison", value: `${v.invest}% a year before tax, compounded monthly, until ${monthYear(p.base.payoff)}` },
        ]}
      />

      <ResultCard title="What is left to pay" sub="Principal and the interest still ahead, against the interest you avoid.">
        <SplitBar
          segments={[
            { label: "Principal", value: v.balance, display: usd(v.balance), color: "#16a34a" },
            { label: "Interest you still pay", value: p.plan.totalInterest, display: usd(p.plan.totalInterest), color: "#f59e0b" },
            { label: "Interest saved", value: Math.max(0, p.interestSaved), display: usd(Math.max(0, p.interestSaved)), color: "#5b1e6e" },
          ]}
        />
      </ResultCard>

      <ResultCard title="Your balance, year by year" sub={anyExtra ? "With your plan, against the normal schedule." : "On the normal schedule."}>
        <AreaChart
          ariaLabel="Mortgage balance by year"
          series={[
            { key: "plan", label: anyExtra ? "With your plan" : "Balance", color: "#16a34a", values: balPad, fill: true },
            ...(anyExtra ? [{ key: "base", label: "Normal schedule", color: "#94a3b8", values: baseBal, dashed: true }] : []),
          ]}
          xLabel={(i) => `Yr ${i}`}
          yFormat={usdShort}
          initial={Math.min(5, n - 1)}
          readout={(i) => (
            <>
              After <b>{i}</b>{" "}{i === 1 ? "year" : "years"}: <b>{usd(balPad[i] ?? 0)}</b>{" "}left with your plan{anyExtra ? <>, against <b>{usd(baseBal[i] ?? 0)}</b>{" "}normally</> : null}.
            </>
          )}
        />
      </ResultCard>

      <ResultCard title="Ways to pay off sooner" sub={`Each one on its own, for your ${usd(v.balance)} at ${v.rate}%.`}>
        <DataTable summary="Compare payoff strategies" columns={["Strategy", "Last payment", "Time saved", "Interest saved"]} rows={ideas} />
      </ResultCard>

      {anyExtra && (
        <ResultCard title="Prepay or invest?" sub={`The same money each month until ${monthYear(p.base.payoff)}, invested at ${v.invest}% instead.`}>
          <Facts
            items={[
              { label: "Invest the extra, keep the loan", value: usd(vs.investValue), note: "Investments at the original payoff date" },
              { label: "Prepay, then invest the payment", value: usd(vs.prepayValue), note: `Investing ${usd(p.payment + avgMonthlyExtra)} a month once the loan is gone` },
              {
                label: vs.difference >= 0 ? "Prepaying comes out ahead by" : "Investing comes out ahead by",
                value: usd(Math.abs(vs.difference)),
                tone: "good",
              },
              { label: "Break-even return", value: `${vs.breakEvenReturnPct.toFixed(2)}%`, note: "About your mortgage rate" },
            ]}
          />
          <p className="footnote">
            Prepaying earns your mortgage rate with no risk. Investing can earn more or less, and taxes on investment gains (or a mortgage interest deduction if you itemize) shift the
            line. Retirement accounts with an employer match usually come first.
          </p>
        </ResultCard>
      )}

      {target && targetMonths >= monthsLeft && (
        <Callout title="Your target is not sooner">
          The date you picked is not earlier than your current payoff of {monthYear(p.base.payoff)}, so no extra is needed. Pick fewer years.
        </Callout>
      )}

      {biweekly && (
        <Callout tone="warn" title="Avoid paying for a biweekly program">
          Some companies charge a setup or per-payment fee to run biweekly payments, and some hold the money until a full payment builds up. You get the same result free by
          adding {usd(p.biweeklyExtra, true)} to each monthly payment.
        </Callout>
      )}

      <p className="footnote" style={{ textAlign: "center" }}>
        An estimate. Before sending extra money, check your loan has no prepayment penalty and ask the servicer to apply it to principal.
      </p>
    </Studio>
  );
}
