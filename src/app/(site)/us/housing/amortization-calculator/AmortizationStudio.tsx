"use client";

import {
  balanceByLoanYear,
  byCalendarYear,
  datedSchedule,
  interestByLoanYear,
  monthName,
  monthsBetween,
  monthYear,
  NO_EXTRA,
  parseYm,
  tippingPoint,
} from "@/lib/us/home-equity";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, DateField, InputGroup, MoneyField, SelectField, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, DataTable, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { duration, percent, usd, usdShort } from "@/components/flagship/format";
import { date, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const MONTHS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"] as const;
type MonthKey = (typeof MONTHS)[number];

const SCHEMA = {
  amount: num(300_000, 0, 100_000_000),
  rate: num(7.25, 0, 30),
  years: num(30, 1, 40),
  first: date("2026-12-01"),
  extraMonthly: num(0, 0, 10_000_000),
  extraYearly: num(0, 0, 10_000_000),
  yearlyMonth: oneOf<MonthKey>("12", MONTHS),
  oneTime: num(0, 0, 100_000_000),
  oneTimeDate: date("2027-06-01"),
};
const ADVANCED = ["extraMonthly", "extraYearly", "yearlyMonth", "oneTime", "oneTimeDate"] as const;

export default function AmortizationStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const months = Math.round(v.years * 12);
  const first = parseYm(v.first);
  const oneTimeAt = monthsBetween(first, parseYm(v.oneTimeDate)) + 1;
  const oneTimeFits = v.oneTime > 0 && oneTimeAt >= 1 && oneTimeAt <= months;
  const extra = {
    monthly: v.extraMonthly,
    yearly: v.extraYearly,
    yearlyMonth: Number(v.yearlyMonth),
    oneTime: oneTimeFits ? v.oneTime : 0,
    oneTimeAt: oneTimeFits ? oneTimeAt : 1,
  };
  const s = datedSchedule(v.amount, v.rate, months, first, extra);
  const base = datedSchedule(v.amount, v.rate, months, first, NO_EXTRA);
  const hasExtra = s.totalExtra > 0;
  const years = byCalendarYear(s);
  const bal = balanceByLoanYear(v.amount, s);
  const baseBal = balanceByLoanYear(v.amount, base);
  const interestPaid = interestByLoanYear(s);
  const tip = tippingPoint(s);
  const tipRow = Number.isFinite(tip) ? s.rows[tip - 1] : undefined;
  const firstRow = s.rows[0];
  const firstYear = s.rows.slice(0, 12);
  const firstYearInterest = firstYear.reduce((a, r) => a + r.interest, 0);
  const firstYearPrincipal = firstYear.reduce((a, r) => a + r.principal + r.extra, 0);
  const loan = v.amount > 0;
  const payoffDate = loan ? monthYear(s.payoff) : "No loan";
  const interestSaved = base.totalInterest - s.totalInterest;
  const monthsSaved = base.months - s.months;
  const chartYears = Math.max(bal.length, baseBal.length);
  const pad = (arr: number[]) => [...arr, ...Array(Math.max(0, chartYears - arr.length)).fill(0)];
  const balPadded = pad(bal);
  const interestPadded = [...interestPaid, ...Array(Math.max(0, chartYears - interestPaid.length)).fill(interestPaid[interestPaid.length - 1] ?? 0)];
  const yearLabel = (i: number) => (i === 0 ? "Start" : `${addYear(first.year, first.month, i)}`);

  return (
    <Studio
      title="Your loan"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="See my amortization schedule"
      onReset={st.reset}
      dock={{ label: "Monthly payment", value: usd(s.payment, true) }}
      inputs={
        <>
          <InputGroup title="The loan">
            <MoneyField label="Loan amount" symbol="$" value={v.amount} onChange={st.bind("amount")} slider={{ min: 10_000, max: 1_500_000, step: 5_000, ends: ["$10k", "$1.5m"] }} />
            <StepperField
              label="Interest rate"
              value={v.rate}
              onChange={st.bind("rate")}
              step={0.125}
              min={0}
              max={30}
              unit="%"
              dp={3}
              info="The note rate on your loan, not the APR. Freddie Mac's weekly survey put the average 30-year fixed rate at about 7.3% and the 15-year at about 6.6% on October 1, 2026."
            />
            <StepperField label="Loan term" value={v.years} onChange={st.bind("years")} step={1} min={1} max={40} unit="years" dp={0} info="Most US mortgages run 15 or 30 years. Car and personal loans are usually 2 to 7 years." />
            <DateField label="First payment date" value={v.first} onChange={st.bind("first")} hint="Mortgage payments are usually due on the 1st. The first one is often due about a month after the first full month you own the home." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <MoneyField label="Extra principal every month" symbol="$" optional value={v.extraMonthly} onChange={st.bind("extraMonthly")} />
            <MoneyField label="Extra principal once a year" symbol="$" optional value={v.extraYearly} onChange={st.bind("extraYearly")} info="For example a tax refund or a bonus, paid in the same month each year." />
            {v.extraYearly > 0 && (
              <SelectField label="Month of the yearly extra" optional value={v.yearlyMonth} onChange={st.bind("yearlyMonth")} options={MONTHS.map((m) => ({ value: m, label: monthName(Number(m)) }))} />
            )}
            <MoneyField label="One-time extra payment" symbol="$" optional value={v.oneTime} onChange={st.bind("oneTime")} info="A lump sum, such as an inheritance or the proceeds of a sale. Ask your servicer to apply it to principal." />
            {v.oneTime > 0 && <DateField label="Month of the one-time payment" optional value={v.oneTimeDate} onChange={st.bind("oneTimeDate")} />}
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Monthly payment"
        value={usd(s.payment, true)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          loan ? (
            <>
              Borrowing <b>{usd(v.amount)}</b>{" "}at {v.rate}% over {duration(months)} costs <b>{usd(s.payment, true)}</b>{" "}a month in principal and interest. You pay{" "}
              <b>{usd(s.totalInterest)}</b>{" "}in interest and make your last payment in <b>{payoffDate}</b>.
            </>
          ) : (
            <>Enter a loan amount to see the schedule.</>
          )
        }
        badges={[
          `${s.rows.length} payments`,
          `Paid off ${payoffDate}`,
          hasExtra ? `${usd(interestSaved)} interest saved` : `First payment ${monthYear(first)}`,
        ]}
      />

      <Facts
        items={[
          { label: "Total interest", value: usd(s.totalInterest), tone: "warn" },
          { label: "Total of payments", value: usd(s.totalPaid) },
          { label: "First month's interest", value: usd(firstRow?.interest ?? 0, true), note: `${usd(firstRow?.principal ?? 0, true)} goes to principal` },
          { label: "Payoff date", value: payoffDate, note: hasExtra ? `${duration(monthsSaved)} early` : undefined, tone: hasExtra ? "good" : undefined },
        ]}
      />

      <Assumptions
        items={[
          { label: "Rate", value: `${v.rate}% fixed, charged monthly at ${(v.rate / 12).toFixed(4)}% of the balance` },
          { label: "Term", value: `${duration(months)}, ${months} monthly payments from ${monthYear(first)}` },
          {
            label: "Extra payments",
            value: hasExtra
              ? [
                  v.extraMonthly > 0 ? `${usd(v.extraMonthly)} a month` : "",
                  v.extraYearly > 0 ? `${usd(v.extraYearly)} each ${monthName(Number(v.yearlyMonth))}` : "",
                  oneTimeFits ? `${usd(v.oneTime)} in ${monthYear(parseYm(v.oneTimeDate))}` : "",
                ]
                  .filter(Boolean)
                  .join(", ") + ", all to principal; the payment stays the same"
              : "None",
          },
          { label: "Not included", value: "Property tax, insurance, PMI and HOA dues (escrow), and any rate change on an adjustable loan" },
        ]}
      />

      {v.oneTime > 0 && !oneTimeFits && (
        <Callout tone="warn" title="One-time payment not counted">
          The month you chose for the one-time payment falls outside the loan ({monthYear(first)} to {monthYear(base.payoff)}). Pick a month inside it.
        </Callout>
      )}

      <ResultCard title="Where your payments go" sub="Principal against interest over the whole loan.">
        <SplitBar
          segments={[
            { label: "Principal", value: v.amount, display: usd(v.amount), color: "#16a34a" },
            { label: "Interest", value: s.totalInterest, display: usd(s.totalInterest), color: "#f59e0b" },
          ]}
          caption={
            loan
              ? `Interest adds ${percent(v.amount > 0 ? s.totalInterest / v.amount : 0)} to the amount you borrowed.`
              : undefined
          }
        />
      </ResultCard>

      <ResultCard title="The first year" sub={`Your first 12 payments, ${monthYear(first)} to ${monthYear(s.rows[Math.min(11, s.rows.length - 1)]?.date ?? first)}.`}>
        <Facts
          items={[
            { label: "Interest paid", value: usd(firstYearInterest), tone: "warn" },
            { label: "Principal paid", value: usd(firstYearPrincipal) },
            { label: "Share that is interest", value: percent(firstYearInterest + firstYearPrincipal > 0 ? firstYearInterest / (firstYearInterest + firstYearPrincipal) : 0) },
            {
              label: "More principal than interest from",
              value: tipRow ? monthYear(tipRow.date) : "Never",
              note: tipRow ? `Payment ${tipRow.n} of ${s.rows.length}` : undefined,
            },
          ]}
        />
      </ResultCard>

      <ResultCard title="Your balance over time" sub={hasExtra ? "With your extra payments, against the plain schedule." : "How the balance falls and the interest adds up."}>
        <AreaChart
          ariaLabel="Loan balance by year"
          series={[
            { key: "bal", label: hasExtra ? "Balance with extra payments" : "Balance", color: "#16a34a", values: balPadded, fill: true },
            ...(hasExtra ? [{ key: "base", label: "Balance with no extra", color: "#94a3b8", values: baseBal, dashed: true }] : []),
            { key: "int", label: "Interest paid so far", color: "#f59e0b", values: interestPadded },
          ]}
          xLabel={yearLabel}
          yFormat={usdShort}
          initial={Math.min(5, chartYears - 1)}
          readout={(i) =>
            i === 0 ? (
              <>
                At the start you owe <b>{usd(v.amount)}</b>.
              </>
            ) : (
              <>
                After <b>{i}</b>{" "}{i === 1 ? "year" : "years"} ({monthYear(s.rows[Math.min(i * 12, s.rows.length) - 1]?.date ?? s.payoff)}): you owe <b>{usd(balPadded[i] ?? 0)}</b>{" "}and have paid{" "}
                <b>{usd(interestPadded[i] ?? 0)}</b>{" "}in interest.
              </>
            )
          }
        />
      </ResultCard>

      <ResultCard title="Amortization schedule by year" sub="Calendar years. Open a year below to see each month.">
        <DataTable
          summary="Yearly totals"
          columns={["Year", "Payments", "Principal", "Interest", "Balance at year end"]}
          rows={years.map((y) => [y.year, usd(y.payments), usd(y.principal), usd(y.interest), usd(y.balance)])}
        />
        <div className="gm-yearmonths">
          {years.map((y) => (
            <details key={y.year} className="schedule">
              <summary>
                {y.year}: {usd(y.principal)} principal, {usd(y.interest)} interest, {usd(y.balance)} left
              </summary>
              <div className="tablewrap">
                <table>
                  <thead>
                    <tr>
                      <th scope="col">Month</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Principal</th>
                      <th scope="col">Interest</th>
                      {hasExtra && <th scope="col">Extra</th>}
                      <th scope="col">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {y.rows.map((r) => (
                      <tr key={r.n}>
                        <td>
                          {monthYear(r.date, true)} <small>#{r.n}</small>
                        </td>
                        <td>{usd(r.payment + r.extra, true)}</td>
                        <td>{usd(r.principal, true)}</td>
                        <td>{usd(r.interest, true)}</td>
                        {hasExtra && <td>{r.extra > 0 ? usd(r.extra, true) : "–"}</td>}
                        <td>{usd(r.balance, true)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
          ))}
        </div>
      </ResultCard>

      {hasExtra ? (
        <ResultCard title="What your extra payments do" sub={`${usd(s.totalExtra)} of extra principal in all.`}>
          <Facts
            items={[
              { label: "Interest saved", value: usd(interestSaved), tone: "good" },
              { label: "Paid off sooner by", value: duration(monthsSaved), tone: "good" },
              { label: "New payoff date", value: payoffDate, note: `Was ${monthYear(base.payoff)}` },
              { label: "Saved per extra dollar", value: usd(s.totalExtra > 0 ? interestSaved / s.totalExtra : 0, true) },
            ]}
          />
        </ResultCard>
      ) : (
        <ResultCard title="Paying extra" sub="Every extra dollar goes straight to principal.">
          <Callout title="Try an extra payment">
            Add a monthly, yearly or one-time extra payment under More options to see the new payoff date and the interest saved. For a full payoff plan, including biweekly payments
            and a target date, use the <a href="/us/housing/mortgage-payoff-calculator">mortgage payoff calculator</a>.
          </Callout>
        </ResultCard>
      )}

      <p className="footnote" style={{ textAlign: "center" }}>
        An estimate. Your servicer&apos;s figures can differ by a few cents a month because of rounding and the day interest is charged.
      </p>
    </Studio>
  );
}

/** The calendar year at the end of loan year `i`. */
function addYear(year: number, month: number, i: number): number {
  // Loan year i ends with payment 12 × i, which falls 12 × i − 1 months after the first.
  const idx = year * 12 + (month - 1) + 12 * i - 1;
  return Math.floor(idx / 12);
}
