"use client";

import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, DataTable, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { gbp } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import { BUDGET_2026_DATE, budgetChanges, CHANGES, dividendRise2026, TAX_YEARS } from "@/lib/tax/budget-changes";

const COLORS = { savings: "#2a78d6", property: "#eb6834", sacrifice: "#4a3aa7", growth: "#9aa1a9", dividends: "#1baf7a" };

type Region = "ruk" | "scotland";
type Plan = "none" | "plan2";

const SCHEMA = {
  salary: num(45_000),
  sacrifice: num(0, 0, 100),
  savings: num(0),
  dividends: num(0),
  property: num(0),
  region: oneOf<Region>("ruk", ["ruk", "scotland"]),
  finance: num(0),
  ras: num(0),
  plan: oneOf<Plan>("none", ["none", "plan2"]),
  growth: num(0, 0, 20),
};
const ADVANCED = ["region", "finance", "ras", "plan", "growth"] as const;

const signed = (n: number) => (Math.abs(n) < 0.5 ? "£0" : n > 0 ? `+${gbp(n)}` : `−${gbp(-n)}`);

export default function BudgetStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const input = {
    salary: v.salary,
    sacrificePct: v.sacrifice,
    rasGross: v.ras,
    savings: v.savings,
    dividends: v.dividends,
    property: v.property,
    financeCosts: v.finance,
    region: v.region,
    plan: v.plan,
    payGrowth: v.growth,
  };
  const r = budgetChanges(input);
  const first = r.years[0];
  const last = r.years[r.years.length - 1];
  const rules = r.ruleEffect[r.ruleEffect.length - 1];
  const freeze = r.freezeCost[r.freezeCost.length - 1];
  const fromGrowth = r.totalChange - rules.total;
  const divRise = dividendRise2026(input);
  const anyIncome = v.salary + v.savings + v.dividends + v.property > 0;
  const scotland = v.region === "scotland";
  const sacrificeNow = first.sacrifice;
  const capHits = r.years[3].sacrificeOverCap > 0;

  const rows = r.years.map((y, t) => [
    y.year,
    gbp(y.salary),
    gbp(y.incomeTax),
    gbp(y.employeeNi),
    ...(v.plan === "plan2" ? [gbp(y.studentLoan)] : []),
    gbp(y.totalTax),
    t === 0 ? "—" : signed(y.totalTax - first.totalTax),
    gbp(y.net),
  ]);
  const maxTax = Math.max(1, ...r.years.map((y) => y.totalTax));

  return (
    <Studio
      title="Your income"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="See what changes for me"
      onReset={st.reset}
      dock={{ label: "Change by 2030/31", value: signed(r.totalChange) }}
      inputs={
        <>
          <InputGroup title="Your income in 2026/27">
            <MoneyField
              label="Yearly salary (before tax)"
              value={v.salary}
              onChange={st.bind("salary")}
              big
              slider={{ min: 0, max: 200_000, step: 500, ends: ["£0", "£200k"] }}
            />
            <StepperField
              label="Pension by salary sacrifice"
              value={v.sacrifice}
              onChange={st.bind("sacrifice")}
              step={0.5}
              min={0}
              max={60}
              unit="%"
              dp={1}
              hint="The share of your salary you give up for pension contributions through salary sacrifice (sometimes called salary exchange). Check your payslip or ask HR."
            />
            <MoneyField
              label="Savings interest a year"
              value={v.savings}
              onChange={st.bind("savings")}
              hint="Interest from accounts outside ISAs and pensions. ISA interest stays tax-free."
            />
            <MoneyField label="Dividends a year" value={v.dividends} onChange={st.bind("dividends")} hint="Dividends from shares or your own company, outside ISAs and pensions." />
            <MoneyField
              label="Rental profit a year"
              value={v.property}
              onChange={st.bind("property")}
              hint="Rent less allowable expenses, before mortgage interest (enter mortgage interest under More options)."
            />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <Segmented
              label="Where you live"
              value={v.region}
              onChange={st.bind("region")}
              options={[
                { value: "ruk", label: "England, Wales or NI" },
                { value: "scotland", label: "Scotland", note: "Scottish rates and bands for pay and rent are set each year by the Scottish Parliament. We hold them at 2026/27 levels." },
              ]}
            />
            <MoneyField
              label="Mortgage interest on lets"
              value={v.finance}
              onChange={st.bind("finance")}
              optional
              hint="Interest and other finance costs on residential lettings. You get tax relief on them at the basic rate, 22% for property from April 2027."
            />
            <MoneyField
              label="Personal pension (gross)"
              value={v.ras}
              onChange={st.bind("ras")}
              optional
              hint="Contributions to a personal pension or SIPP with relief at source, including the 20% the government adds. They extend your basic-rate band."
            />
            <Segmented
              label="Student loan"
              value={v.plan}
              onChange={st.bind("plan")}
              optional
              options={[
                { value: "none", label: "None or other" },
                { value: "plan2", label: "Plan 2", note: "The Plan 2 threshold is held at £29,385 from April 2027 to 2029/30. We assume it stays there in 2030/31, as nothing has been announced." },
              ]}
            />
            <StepperField
              label="Pay rise each year"
              value={v.growth}
              onChange={st.bind("growth")}
              step={0.5}
              min={0}
              max={20}
              unit="%"
              dp={1}
              hint="Leave at 0% to see the rule changes alone. Add a pay rise to see how frozen thresholds take a bigger share as your pay grows."
            />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Change in your yearly tax, 2026/27 to 2030/31"
        value={signed(r.totalChange)}
        unit="a year by 2030/31"
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          !anyIncome ? (
            <>Enter your salary or other income to see what the announced changes mean for you.</>
          ) : Math.abs(r.totalChange) < 0.5 ? (
            <>
              None of the announced changes affects your tax at this income. Thresholds are frozen, so your tax stays at <b>{gbp(first.totalTax)}</b>{" "}a year while your
              pay stays the same.
            </>
          ) : (
            <>
              Your Income Tax, National Insurance{v.plan === "plan2" ? " and student loan" : ""} go from <b>{gbp(first.totalTax)}</b>{" "}in 2026/27 to{" "}
              <b>{gbp(last.totalTax)}</b>{" "}in 2030/31.
              {Math.abs(rules.total) >= 0.5 && (
                <>
                  {" "}
                  The rule changes alone add <b>{gbp(rules.total)}</b>{" "}a year.
                </>
              )}
              {freeze > 0.5 && (
                <>
                  {" "}
                  Frozen thresholds cost you <b>{gbp(freeze)}</b>{" "}more than if they had risen with your pay.
                </>
              )}
            </>
          )
        }
        badges={["Announced measures only", scotland ? "Scotland" : "England, Wales or NI", v.growth > 0 ? `${v.growth}% pay rises` : "Same income each year"]}
      />

      <Facts
        items={[
          { label: "Tax in 2026/27", value: gbp(first.totalTax) },
          { label: "Tax in 2030/31", value: gbp(last.totalTax) },
          { label: "From the rule changes", value: signed(rules.total), tone: rules.total > 0.5 ? ("warn" as const) : undefined },
          v.growth > 0
            ? { label: "Cost of the freeze by 2030/31", value: gbp(freeze), note: "Against thresholds rising with your pay", tone: freeze > 0.5 ? ("warn" as const) : undefined }
            : { label: "Take-home in 2030/31", value: gbp(last.net), note: "After tax, pension and mortgage interest" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Years", value: `${TAX_YEARS[0]} to ${TAX_YEARS[TAX_YEARS.length - 1]}` },
          { label: "Thresholds", value: `Frozen to ${CHANGES.thresholdsFrozenTo}` },
          { label: "Where", value: scotland ? "Scotland (Scottish rates held at 2026/27)" : "England, Wales or Northern Ireland" },
          { label: "Pay rise", value: v.growth > 0 ? `${v.growth}% a year, salary only` : "None" },
          { label: "Tax code", value: "Standard, no other income or reliefs" },
        ]}
        note={`Only changes announced by October 2026. The Budget on ${BUDGET_2026_DATE} may add more; we will update this page on Budget day.`}
      />

      {anyIncome && (
        <ResultCard title="Your tax each year" sub="Income Tax, employee National Insurance and student loan, from every source you entered.">
          <Compare
            head={["Tax year", "Total tax"]}
            rows={r.years.map((y, t) => ({
              label: y.year,
              value: gbp(y.totalTax),
              bar: y.totalTax / maxTax,
              current: t === 0,
              delta: t === 0 ? undefined : signed(y.totalTax - first.totalTax),
              deltaTone: y.totalTax >= first.totalTax ? ("up" as const) : ("down" as const),
            }))}
          />
        </ResultCard>
      )}

      {anyIncome && r.totalChange > 0.5 && (
        <ResultCard title="Where the extra tax comes from" sub="The rise between 2026/27 and 2030/31, split by cause.">
          <SplitBar
            segments={[
              ...(rules.savings > 0.5 ? [{ label: "Savings rates +2 points", value: rules.savings, display: gbp(rules.savings), color: COLORS.savings }] : []),
              ...(rules.property > 0.5 ? [{ label: "Property rates +2 points", value: rules.property, display: gbp(rules.property), color: COLORS.property }] : []),
              ...(rules.sacrifice > 0.5 ? [{ label: "Salary sacrifice NI cap", value: rules.sacrifice, display: gbp(rules.sacrifice), color: COLORS.sacrifice }] : []),
              ...(fromGrowth > 0.5 ? [{ label: "Tax on your pay rises", value: fromGrowth, display: gbp(fromGrowth), color: COLORS.growth }] : []),
            ]}
          />
          {fromGrowth > 0.5 && (
            <p className="footnote">
              Tax on your pay rises includes {gbp(freeze)} from frozen thresholds: the tax you would not pay if allowances and bands had risen with your pay.
            </p>
          )}
        </ResultCard>
      )}

      <ResultCard title="Change by change" sub="Each announced measure and what it does at your income.">
        <Compare
          head={["Measure", "Effect a year"]}
          rows={[
            { label: "Frozen thresholds to April 2031", value: v.growth > 0 ? gbp(freeze) : "£0 at the same pay", bar: 0, delta: v.growth > 0 ? "by 2030/31" : undefined },
            { label: "Savings rates 22/42/47% from April 2027", value: signed(rules.savings), bar: 0 },
            {
              label: scotland ? "Property rates (not in Scotland yet)" : "Property rates 22/42/47% from April 2027",
              value: signed(rules.property),
              bar: 0,
            },
            { label: "Salary sacrifice NI cap from April 2029", value: signed(rules.sacrifice), bar: 0 },
            { label: "Dividend rates up 2 points (April 2026)", value: signed(divRise), bar: 0, delta: "already in 2026/27" },
          ]}
        />
      </ResultCard>

      {anyIncome && (
        <ResultCard title="Worth knowing" sub="What you could do, and what is still to come.">
          <Callout tone="warn" title={`The Budget on ${BUDGET_2026_DATE}`}>
            These figures include only measures announced by October 2026. The Chancellor may announce more on {BUDGET_2026_DATE}. We will update this calculator on Budget
            day, so check back.
          </Callout>
          {capHits && (
            <Callout title="Your salary sacrifice goes over £2,000">
              From April 2029 you pay National Insurance on sacrifice above £2,000 a year: {gbp(r.years[3].sacrificeOverCap)} in 2029/30 by these figures. Your employer
              also pays about {gbp(r.years[3].employerNiExtra)} more in employer NI, and some employers share their savings with staff now, so ask whether that will change.
              Income Tax relief on pension contributions is not affected.
            </Callout>
          )}
          {sacrificeNow === 0 && v.salary > 0 && (
            <Callout title="Salary sacrifice under £2,000 stays fully free of NI">
              The cap only charges NI on sacrifice above £2,000 a year. If you are not using salary sacrifice, see what it would save with the{" "}
              <a href="/uk/tax-and-salary/salary-sacrifice">salary sacrifice calculator</a>.
            </Callout>
          )}
          {(rules.savings > 0.5 || first.savingsTax > 0.5) && (
            <Callout title="Shelter savings in an ISA">
              Interest inside an ISA stays tax-free. From 6 April 2027 the cash ISA limit for under-65s falls to £12,000 within the £20,000 overall ISA limit; over-65s keep
              £20,000.
            </Callout>
          )}
          {scotland && v.property > 0 && (
            <Callout title="Rental income in Scotland">
              The new property rates apply in England, Wales and Northern Ireland. The UK government has said it will work with the Scottish Government on property
              rates, so Scottish landlords may see a change later.
            </Callout>
          )}
        </ResultCard>
      )}

      <DataTable
        summary="Year by year in full"
        columns={["Tax year", "Salary", "Income Tax", "NI", ...(v.plan === "plan2" ? ["Student loan"] : []), "Total", "Change", "Take-home"]}
        rows={rows}
      />

      <p className="footnote" style={{ textAlign: "center" }}>
        Announced measures only, from Budget 2025 and later announcements. Take-home is after tax, pension contributions and mortgage interest.
      </p>
    </Studio>
  );
}
