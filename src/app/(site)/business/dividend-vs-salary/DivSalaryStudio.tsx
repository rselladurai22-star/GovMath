"use client";

import { bestSalary, directorPlan, LOWER_EARNINGS_LIMIT, type DirectorPlan } from "@/lib/business/company";
import { selfEmployedTax } from "@/lib/business/self-employed";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { gbp, gbpShort, percent } from "@/components/flagship/format";
import { bool, num, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import s from "@/components/flagship/Flagship.module.css";

const SCHEMA = {
  profit: num(80_000, 0, 10_000_000),
  salary: num(12_570, 0, 1_000_000),
  ea: bool(false),
  pension: num(0, 0, 1_000_000),
  scot: bool(false),
  associated: num(0, 0, 50),
  other: num(0, 0, 10_000_000),
};
const ADVANCED = ["salary", "ea", "pension", "scot", "associated", "other"] as const;
const COLORS = { ct: "#e11d48", eni: "#f97316", personal: "#f59e0b", div: "#a46bb8", keep: "#0f9f6e", pension: "#5b1e6e" };
const CHART_POINTS = 26;
const minus = (n: number) => (n > 0.5 ? `−${gbp(n)}` : "£0");

export default function DivSalaryStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const base = { profit: v.profit, pension: v.pension, employmentAllowance: v.ea, scottish: v.scot, associated: v.associated, otherIncome: v.other };
  const best = bestSalary(base);
  const chosen = directorPlan({ ...base, salary: v.salary });
  const scenarios: { label: string; p: DirectorPlan }[] = [
    { label: "£0 salary, all dividends", p: directorPlan({ ...base, salary: 0 }) },
    { label: "£5,000: employer NI threshold", p: directorPlan({ ...base, salary: 5_000 }) },
    { label: `${gbp(LOWER_EARNINGS_LIMIT)}: State Pension year`, p: directorPlan({ ...base, salary: LOWER_EARNINGS_LIMIT }) },
    { label: "£12,570: Personal Allowance", p: directorPlan({ ...base, salary: 12_570 }) },
    { label: `Best: ${gbp(best.salary)}`, p: best },
  ];
  const maxKeep = Math.max(...scenarios.map((x) => x.p.takeHome), chosen.takeHome, 1);
  const soleTrader = selfEmployedTax({ turnover: v.profit, expenses: 0, tradingAllowance: false, otherIncome: v.other, scottish: v.scot, plan: "none", pension: 0, voluntaryClass2: false });
  const chartMax = Math.min(Math.max(v.profit, 1), 60_000);
  const salaries = Array.from({ length: CHART_POINTS }, (_, i) => (chartMax * i) / (CHART_POINTS - 1));
  const curve = salaries.map((x) => directorPlan({ ...base, salary: x }).takeHome);
  const gain = best.takeHome - chosen.takeHome;
  const personal = best.incomeTax + best.employeeNi;

  return (
    <Studio
      title="Your company"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Find my best salary"
      onReset={st.reset}
      dock={{ label: "Best take-home", value: gbp(best.takeHome) }}
      inputs={
        <>
          <InputGroup title="The profit to take out">
            <MoneyField label="Company profit before your salary" value={v.profit} onChange={st.bind("profit")} big slider={{ min: 0, max: 250_000, step: 1_000, ends: ["£0", "£250k"] }} hint="Profit for the year before your salary, employer NI and Corporation Tax. We assume it is all paid out to you." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <MoneyField label="Salary to compare" value={v.salary} onChange={st.bind("salary")} optional hint="Your current or planned salary, shown against the best one." />
            <Switch label="The company can claim the Employment Allowance" checked={v.ea} onChange={st.bind("ea")} optional hint="Only if someone other than a sole director is on the payroll. Up to £10,500 off employer NI." />
            <MoneyField label="Employer pension contribution" value={v.pension} onChange={st.bind("pension")} optional hint="Paid by the company. Deductible, with no NI or Income Tax." />
            <Switch label="You pay Scottish Income Tax" checked={v.scot} onChange={st.bind("scot")} optional hint="Scottish rates apply to salary; dividends use UK rates." />
            <StepperField label="Associated companies" value={v.associated} onChange={(n) => st.set("associated", Math.round(n))} step={1} min={0} max={50} unit="companies" dp={0} optional />
            <MoneyField label="Your other income" value={v.other} onChange={st.bind("other")} optional hint="A job, pension or rent. It uses your tax-free allowance and bands first." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Best split: you keep"
        value={gbp(best.takeHome)}
        unit="a year"
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          v.profit <= 0 ? (
            <>Enter the company&apos;s profit to find the best split.</>
          ) : (
            <>
              Pay yourself a salary of <b>{gbp(best.salary)}</b> and take the rest as <b>{gbp(best.dividends)}</b> of dividends. After Corporation Tax, NI, Income Tax and dividend tax you keep{" "}
              <b>{gbp(best.takeHome)}</b>, about <b>{gbp(best.takeHome / 12)}</b> a month
              {gain > 1 ? (
                <>
                  , which is <b>{gbp(gain)}</b> more than a {gbp(chosen.salary)} salary
                </>
              ) : null}
              .
            </>
          )
        }
        badges={[`Salary ${gbp(best.salary)}`, `${percent(v.profit > 0 ? best.totalTax / v.profit : 0, 1)} total tax`, best.qualifyingYear ? "Counts for State Pension" : "No State Pension year"]}
      />

      <Facts
        items={[
          { label: "Best salary", value: gbp(best.salary) },
          { label: "Dividends", value: gbp(best.dividends) },
          { label: "All tax", value: gbp(best.totalTax), tone: "warn", note: "Company and personal" },
          { label: "As a sole trader", value: gbp(soleTrader.keep), note: soleTrader.keep > best.takeHome ? "Keeps more" : "Keeps less" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Company", value: "One director and shareholder" },
          { label: "Profit", value: "All paid out in the same tax year" },
          { label: "Employment Allowance", value: v.ea ? "Claimed" : "Not available" },
          { label: "Tax year", value: "2026/27" },
        ]}
      />

      {v.profit > 0 && (
        <ResultCard title="Where the profit goes" sub={`With the best salary of ${gbp(best.salary)}.`}>
          <SplitBar
            segments={[
              ...(best.corporationTax > 0 ? [{ label: "Corporation Tax", value: best.corporationTax, display: gbp(best.corporationTax), color: COLORS.ct }] : []),
              ...(best.employerNi > 0 ? [{ label: "Employer NI", value: best.employerNi, display: gbp(best.employerNi), color: COLORS.eni }] : []),
              ...(personal > 0 ? [{ label: "Income Tax and NI on salary", value: personal, display: gbp(personal), color: COLORS.personal }] : []),
              ...(best.dividendTax > 0 ? [{ label: "Dividend tax", value: best.dividendTax, display: gbp(best.dividendTax), color: COLORS.div }] : []),
              ...(best.pension > 0 ? [{ label: "Into your pension", value: best.pension, display: gbp(best.pension), color: COLORS.pension }] : []),
              { label: "You keep", value: Math.max(0, best.takeHome), display: gbp(best.takeHome), color: COLORS.keep },
            ]}
          />
        </ResultCard>
      )}

      {v.profit > 0 && (
        <ResultCard title="Common salaries compared" sub="All remaining profit taken as dividends.">
          <Compare
            head={["Salary", "You keep"]}
            rows={[
              ...scenarios.map((x) => ({
                label: x.label,
                value: gbp(x.p.takeHome),
                delta: x.p.takeHome < best.takeHome - 1 ? `−${gbp(best.takeHome - x.p.takeHome)}` : "Best",
                deltaTone: "up" as const,
                bar: x.p.takeHome / maxKeep,
                current: x.p === best,
              })),
              {
                label: `Your choice: ${gbp(chosen.salary)}`,
                value: gbp(chosen.takeHome),
                delta: gain > 1 ? `−${gbp(gain)}` : "Best",
                deltaTone: "up" as const,
                bar: chosen.takeHome / maxKeep,
              },
            ]}
          />
        </ResultCard>
      )}

      {v.profit > 0 && (
        <ResultCard title="Take-home at every salary" sub="Move along the line to see how the salary changes what you keep.">
          <AreaChart
            ariaLabel="Director take-home pay by salary level"
            series={[{ key: "keep", label: "You keep", color: COLORS.keep, values: curve, fill: true }]}
            xLabel={(i) => gbpShort(salaries[i] ?? 0)}
            yFormat={gbpShort}
            initial={Math.round((Math.min(best.salary, chartMax) / chartMax) * (CHART_POINTS - 1))}
            hint="Drag across the chart, or use the arrow keys, to read any salary."
            readout={(i) => (
              <>
                Salary <b>{gbp(salaries[i] ?? 0)}</b>: you keep <b>{gbp(curve[i] ?? 0)}</b>.
              </>
            )}
          />
        </ResultCard>
      )}

      {v.profit > 0 && (
        <ResultCard title="Best salary and your choice, side by side" sub="Every tax along the way.">
          <Statement
            columns={[`Best (${gbp(best.salary)})`, `Yours (${gbp(chosen.salary)})`]}
            rows={[
              { label: "Company profit", values: [gbp(v.profit), gbp(v.profit)] },
              { label: "Salary", values: [minus(best.salary), minus(chosen.salary)], kind: "deduction" },
              { label: "Employer NI", values: [minus(best.employerNi), minus(chosen.employerNi)], kind: "deduction" },
              ...(v.pension > 0 ? [{ label: "Employer pension", values: [minus(best.pension), minus(chosen.pension)], kind: "deduction" as const }] : []),
              { label: "Corporation Tax", values: [minus(best.corporationTax), minus(chosen.corporationTax)], kind: "deduction" },
              { label: "Dividends paid", values: [gbp(best.dividends), gbp(chosen.dividends)], kind: "total" },
              { label: "Income Tax on salary", values: [minus(best.incomeTax), minus(chosen.incomeTax)], kind: "deduction" },
              { label: "Employee NI", values: [minus(best.employeeNi), minus(chosen.employeeNi)], kind: "deduction" },
              { label: "Dividend tax", values: [minus(best.dividendTax), minus(chosen.dividendTax)], kind: "deduction" },
              { label: "You keep", values: [gbp(best.takeHome), gbp(chosen.takeHome)], kind: "total" },
            ]}
          />
        </ResultCard>
      )}

      <ResultCard title="Worth knowing" sub="Beyond the tax.">
        {!best.qualifyingYear && (
          <Callout tone="warn" title="This salary does not protect your State Pension">
            A salary of at least {gbp(LOWER_EARNINGS_LIMIT)} (the Lower Earnings Limit) makes the year count towards your State Pension without paying any NI. It costs{" "}
            {gbp(best.takeHome - directorPlan({ ...base, salary: LOWER_EARNINGS_LIMIT }).takeHome)} a year here.
          </Callout>
        )}
        {soleTrader.keep > best.takeHome && (
          <Callout title="A sole trader would keep more on this profit">
            On {gbp(v.profit)} of profit, a sole trader keeps {gbp(soleTrader.keep)}, {gbp(soleTrader.keep - best.takeHome)} more than the company route, before the extra costs of
            running a company.
          </Callout>
        )}
        <Callout title="Dividends need profits and paperwork">
          Dividends can only be paid from profits after tax. Hold a board decision, issue a dividend voucher, and remember the tax on them is paid through Self Assessment.
        </Callout>
        {best.salary + best.dividends + v.other > 100_000 && (
          <Callout tone="warn" title="Over £100,000 you lose your Personal Allowance">
            Leaving some profit in the company, or paying more into a pension, can keep your income below £100,000.
          </Callout>
        )}
      </ResultCard>

      <p className={s.hint} style={{ textAlign: "center" }}>
        Tax year 2026/27, all profit paid out in the year. Not tax advice; an accountant can tailor this to your company.
      </p>
    </Studio>
  );
}
