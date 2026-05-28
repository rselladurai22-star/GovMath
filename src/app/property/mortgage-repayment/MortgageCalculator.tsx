"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import {
  affordabilityEstimate,
  amortisationSchedule,
  mortgageRepayment,
} from "@/lib/mortgage";

const GBP0 = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

const GBP2 = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 2,
});

export default function MortgageCalculator({
  initialPrice = 300_000,
  initialDeposit = 30_000,
  initialRate = 4.5,
  initialTerm = 25,
}: {
  initialPrice?: number;
  initialDeposit?: number;
  initialRate?: number;
  initialTerm?: number;
}) {
  const [price, setPrice] = useState<number>(initialPrice);
  const [deposit, setDeposit] = useState<number>(initialDeposit);
  const [rate, setRate] = useState<number>(initialRate);
  const [term, setTerm] = useState<number>(initialTerm);
  const [salary1, setSalary1] = useState<number>(45_000);
  const [salary2, setSalary2] = useState<number>(0);

  const loan = Math.max(0, price - deposit);

  const result = useMemo(
    () => mortgageRepayment(loan, rate, term, price),
    [loan, rate, term, price]
  );

  const schedule = useMemo(
    () => amortisationSchedule(loan, rate, term),
    [loan, rate, term]
  );

  const afford = useMemo(
    () => affordabilityEstimate(salary1, salary2),
    [salary1, salary2]
  );

  const ltvPct = result.ltv * 100;
  const ltvWarn = ltvPct > 95;

  // Only show every 5th year row + final to keep the table digestible.
  const condensed = schedule.filter(
    (r) => r.year % 5 === 0 || r.year === schedule.length
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <h2 className="text-lg font-bold text-primary-dark">Your mortgage</h2>

          <NumberInput
            label="Property price"
            value={price}
            onChange={setPrice}
            min={0}
            step={5000}
          />

          <NumberInput
            label="Deposit"
            value={deposit}
            onChange={setDeposit}
            min={0}
            step={1000}
            hint={`${ltvPct.toFixed(1)}% loan-to-value (LTV)`}
          />

          <div className="grid grid-cols-2 gap-3">
            <NumberInput
              label="Interest rate"
              value={rate}
              onChange={setRate}
              min={0}
              step={0.1}
              prefix=""
              suffix="%"
            />
            <NumberInput
              label="Term"
              value={term}
              onChange={setTerm}
              min={1}
              step={1}
              prefix=""
              suffix=" yrs"
            />
          </div>

          {ltvWarn && (
            <p className="text-xs bg-error/10 border border-error/30 text-error rounded-md p-3">
              ⚠ Most UK lenders cap residential mortgages at 95% LTV. Your
              deposit is too small for the typical high-street range.
            </p>
          )}

          <p className="text-xs text-text/60">
            Assumes a standard capital-and-interest repayment mortgage at a
            fixed rate. Real deals change rate after the fixed period.
          </p>
        </div>

        <div className="space-y-5">
          <div className="rounded-xl bg-primary-dark text-white p-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-white/70">
              Monthly payment
            </div>
            <div className="text-4xl font-extrabold mt-1 font-mono tabular-nums">
              {GBP2.format(result.monthlyPayment)}
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
              <div className="rounded-md bg-white/10 p-3">
                <div className="text-white/70 text-xs">Loan</div>
                <div className="font-bold font-mono tabular-nums">
                  {GBP0.format(loan)}
                </div>
              </div>
              <div className="rounded-md bg-white/10 p-3">
                <div className="text-white/70 text-xs">Total interest</div>
                <div className="font-bold font-mono tabular-nums">
                  {GBP0.format(result.totalInterest)}
                </div>
              </div>
              <div className="rounded-md bg-white/10 p-3">
                <div className="text-white/70 text-xs">Total repaid</div>
                <div className="font-bold font-mono tabular-nums">
                  {GBP0.format(result.totalRepaid)}
                </div>
              </div>
            </div>
            <div className="mt-4 text-xs text-white/70">
              LTV:{" "}
              <span className="font-semibold text-white">
                {ltvPct.toFixed(1)}%
              </span>{" "}
              · Term:{" "}
              <span className="font-semibold text-white">{term} years</span>
            </div>
          </div>

          <ResultBreakdown
            title="What you’re paying for"
            rows={[
              { label: "Property price", value: price },
              { label: "Deposit", value: deposit, hint: "What you put down up front" },
              { label: "Loan from lender", value: loan, variant: "default" },
              {
                label: "Total interest over term",
                value: result.totalInterest,
                variant: "deduction",
                hint: `Spread across ${term * 12} monthly payments`,
              },
              {
                label: "Total cost of borrowing",
                value: result.totalRepaid,
                variant: "total",
              },
            ]}
          />
        </div>
      </div>

      {/* Year-by-year condensed schedule */}
      <div className="rounded-xl bg-surface border border-border overflow-hidden">
        <div className="px-5 py-3 border-b border-border bg-bg">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-text/70">
            Balance over time (every 5 years)
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-text/60 border-b border-border">
                <th className="px-5 py-2 font-medium">Year</th>
                <th className="px-5 py-2 font-medium text-right">Interest paid</th>
                <th className="px-5 py-2 font-medium text-right">Capital paid</th>
                <th className="px-5 py-2 font-medium text-right">Balance left</th>
              </tr>
            </thead>
            <tbody>
              {condensed.map((row) => (
                <tr key={row.year} className="border-b border-border last:border-0">
                  <td className="px-5 py-2 font-semibold">Year {row.year}</td>
                  <td className="px-5 py-2 text-right font-mono tabular-nums text-error">
                    {GBP0.format(row.interestPaid)}
                  </td>
                  <td className="px-5 py-2 text-right font-mono tabular-nums">
                    {GBP0.format(row.capitalPaid)}
                  </td>
                  <td className="px-5 py-2 text-right font-mono tabular-nums font-semibold">
                    {GBP0.format(row.balance)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Affordability widget */}
      <div className="rounded-xl bg-surface border border-border p-6 space-y-4">
        <div>
          <h2 className="text-lg font-bold text-primary-dark">
            How much could a lender offer you?
          </h2>
          <p className="text-sm text-text/75 mt-1">
            Quick estimate based on UK lenders’ typical income multiples (4–5× combined salary).
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <NumberInput
            label="Applicant 1 salary"
            value={salary1}
            onChange={setSalary1}
            min={0}
            step={1000}
          />
          <NumberInput
            label="Applicant 2 salary (optional)"
            value={salary2}
            onChange={setSalary2}
            min={0}
            step={1000}
          />
        </div>

        <div className="grid sm:grid-cols-3 gap-3 text-sm">
          <div className="rounded-md border border-border p-4">
            <div className="text-text/60 text-xs uppercase tracking-wider">
              Cautious (4×)
            </div>
            <div className="font-mono tabular-nums text-xl font-bold text-primary-dark mt-1">
              {GBP0.format(afford.low)}
            </div>
          </div>
          <div className="rounded-md border-2 border-primary bg-card-hover p-4">
            <div className="text-primary text-xs uppercase tracking-wider font-bold">
              Typical (4.5×)
            </div>
            <div className="font-mono tabular-nums text-xl font-bold text-primary-dark mt-1">
              {GBP0.format(afford.mid)}
            </div>
          </div>
          <div className="rounded-md border border-border p-4">
            <div className="text-text/60 text-xs uppercase tracking-wider">
              Generous (5×)
            </div>
            <div className="font-mono tabular-nums text-xl font-bold text-primary-dark mt-1">
              {GBP0.format(afford.high)}
            </div>
          </div>
        </div>

        <p className="text-xs text-text/60">
          Lenders also stress-test your monthly outgoings against the
          payment. A clean credit file and low existing debt push you toward
          the higher end; childcare, loans, or thin credit history push you down.
        </p>
      </div>
    </div>
  );
}
