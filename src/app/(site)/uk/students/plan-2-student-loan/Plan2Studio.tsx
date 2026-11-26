"use client";

import { interestRate, monthlyPayroll, PLANS_2026, projectLoan } from "@/lib/students/loans";
import { Caveat, Flag, Foot, Hero, Inputs, Rows, Tool } from "@/components/calc/kit";
import { Mini } from "@/components/calc/fields";
import { MoneyField, Switch } from "@/components/flagship/inputs";
import { gbp, percent } from "@/components/flagship/format";
import { bool, num, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import BalanceChart from "./BalanceChart";

const SCHEMA = {
  salary: num(35_000, 0, 10_000_000),
  balance: num(45_000, 0, 1_000_000),
  growth: num(3, -5, 15),
  rpi: num(3, 0, 15),
  yearsRepaying: num(0, 0, 40),
  extra: num(0, 0, 10_000),
  postgrad: bool(false),
};

const P2 = PLANS_2026.plan2;
const NOW = 2026;
const cumulative = (xs: number[]) => xs.reduce<number[]>((acc, x) => [...acc, (acc[acc.length - 1] ?? 0) + x], [0]);

export default function Plan2Studio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const base = { plan: "plan2" as const, balance: v.balance, salary: v.salary, salaryGrowth: v.growth / 100, rpi: v.rpi / 100, yearsRepaying: v.yearsRepaying };
  const proj = projectLoan({ ...base, extraMonthly: v.extra });
  const plain = v.extra > 0 ? projectLoan({ ...base, extraMonthly: 0 }) : proj;
  const monthly = monthlyPayroll("plan2", v.salary);
  const pgMonthly = v.postgrad ? monthlyPayroll("postgrad", v.salary) : 0;
  const rate = interestRate("plan2", v.salary);
  const balances = [Math.max(0, v.balance), ...proj.path.map((p) => p.balance)];
  const repaid = cumulative(proj.path.map((p) => p.repaid));
  const endYear = NOW + proj.yearsLeft;
  const below = v.salary <= P2.threshold;
  const overpaying = v.extra > 0;
  const diff = proj.totalRepaid - plain.totalRepaid;

  return (
    <Tool label="Plan 2 student loan calculator">
      <div className="sa-p2">
        <div className="sa-p2-inputs">
          <Inputs title="Your pay and your loan">
            <MoneyField
              label="Salary a year"
              value={v.salary}
              onChange={st.bind("salary")}
              slider={{ min: 20_000, max: 100_000, step: 500, ends: ["£20,000", "£100,000"] }}
              hint="Before tax. After salary sacrifice, if your employer uses it; include other income if you file a Self Assessment return."
            />
            <MoneyField label="Loan balance now" value={v.balance} onChange={st.bind("balance")} hint="From your Student Loans Company online account." />
            <Mini
              label="Years since you were first due to repay"
              value={v.yearsRepaying}
              onChange={(n) => st.set("yearsRepaying", Math.max(0, Math.min(30, Math.round(n))))}
              min={0}
              max={30}
              stepper
              suffix="years"
              hint="0 if your first April of repaying is April 2026."
            />
            <Switch label="Overpay each month" checked={overpaying} onChange={(on) => st.set("extra", on ? 100 : 0)} hint="Extra payments on top of what comes out of your pay." />
            {overpaying && <Mini label="Extra a month" value={v.extra} onChange={(n) => st.set("extra", Math.max(0, Math.round(n)))} prefix="£" step={25} stepper wide />}
            <details className="sa-p2-more" open={v.growth !== 3 || v.rpi !== 3 || v.postgrad || undefined}>
              <summary>Pay rises, inflation and a Postgraduate Loan</summary>
              <div className="sa-p2-moregrid">
                <Mini label="Pay rises a year" value={v.growth} onChange={st.bind("growth")} suffix="%" step={0.5} dp={1} min={-5} max={15} stepper />
                <Mini label="Inflation (RPI) after this year" value={v.rpi} onChange={st.bind("rpi")} suffix="%" step={0.25} dp={2} max={15} stepper hint="Sets future interest, and the threshold from April 2030." />
                <Switch label="I also have a Postgraduate Loan" checked={v.postgrad} onChange={st.bind("postgrad")} hint="Repaid at 6% of income above £21,000, on top of Plan 2." />
              </div>
            </details>
          </Inputs>
        </div>

        <div className="sa-p2-main">
          <Hero
            label="Taken from your pay each month"
            value={gbp(monthly + pgMonthly)}
            tone={below ? "ink" : "brand"}
            sub={
              below ? (
                <>
                  Nothing: you earn no more than the {gbp(P2.threshold)} threshold. Interest of {percent(rate, 1)} is still added, and{" "}
                  {proj.clearedIn === null ? (
                    <>
                      the balance, then <b>{gbp(proj.writtenOff)}</b>, is written off in April {endYear}.
                    </>
                  ) : (
                    <>the loan is cleared by April {NOW + proj.clearedIn} on these assumptions.</>
                  )}
                </>
              ) : proj.clearedIn !== null ? (
                <>
                  {P2.label} takes 9% of pay above {gbp(P2.threshold)}
                  {v.postgrad ? <>, and {gbp(pgMonthly)} of this is your Postgraduate Loan</> : null}. On these assumptions you <b>clear the loan by April {NOW + proj.clearedIn}</b>, after
                  repaying {gbp(proj.totalRepaid)}.
                </>
              ) : (
                <>
                  {P2.label} takes 9% of pay above {gbp(P2.threshold)}
                  {v.postgrad ? <>, and {gbp(pgMonthly)} of this is your Postgraduate Loan</> : null}. On these assumptions you repay {gbp(proj.totalRepaid)}, and{" "}
                  <b>
                    {gbp(proj.writtenOff)} is written off in April {endYear}
                  </b>
                  .
                </>
              )
            }
          />

          <BalanceChart balances={balances} repaid={repaid} startYear={NOW} years={proj.yearsLeft} clearedIn={proj.clearedIn} writtenOff={proj.writtenOff} />

          <Rows
            caption="Your loan to the end"
            rows={[
              { label: "Interest this year", value: percent(rate, 2), note: "From September 2026: RPI of 4.1% plus up to 3% by income, capped at 6%" },
              { label: "Interest added over the term", value: gbp(proj.totalInterest) },
              { label: proj.clearedIn !== null ? `Repaid in total, over ${proj.clearedIn} years` : `Repaid in total, over ${proj.yearsLeft} years`, value: gbp(proj.totalRepaid), strong: true },
            ]}
          />

          {overpaying && (
            <Flag tone={diff > 0 ? "warn" : "good"} title={diff > 0 ? "Overpaying costs you more" : "Overpaying saves you money"}>
              {diff > 0 ? (
                <>
                  With {gbp(v.extra)} a month extra you would repay {gbp(proj.totalRepaid)} in all, {gbp(diff)} more than the {gbp(plain.totalRepaid)} you pay without it, because more of the
                  balance would otherwise be written off.
                </>
              ) : (
                <>
                  With {gbp(v.extra)} a month extra you would repay {gbp(proj.totalRepaid)} in all, {gbp(-diff)} less than the {gbp(plain.totalRepaid)} you pay without it
                  {proj.clearedIn !== null && plain.clearedIn !== null ? <>, and clear it {plain.clearedIn - proj.clearedIn} years sooner</> : proj.clearedIn !== null ? <>, and clear it instead of having it written off</> : null}.
                </>
              )}
            </Flag>
          )}

          <Foot>
            <Caveat>
              An estimate. This year&rsquo;s repayment is exact at the 2026/27 threshold; the projection assumes steady pay rises, yearly interest and the threshold frozen to April 2030,
              and leaves out career breaks and future rule changes.
            </Caveat>
            <ShareButton copied={st.copied} onClick={st.share} />
          </Foot>
        </div>
      </div>
    </Tool>
  );
}
