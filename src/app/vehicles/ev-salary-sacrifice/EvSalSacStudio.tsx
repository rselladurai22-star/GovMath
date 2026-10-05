"use client";

import { BIK_2026, evSalarySacrifice2026 } from "@/lib/vehicles/tax-2026";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, SelectField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { gbp, percent } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import s from "@/components/flagship/Flagship.module.css";

type Year = "2026/27" | "2027/28" | "2028/29" | "2029/30";

const SCHEMA = {
  salary: num(45_000, 0, 10_000_000),
  monthly: num(450, 0, 10_000),
  p11d: num(40_000, 0, 1_000_000),
  scotland: bool(false),
  year: oneOf<Year>("2026/27", ["2026/27", "2027/28", "2028/29", "2029/30"]),
  privateLease: num(450, 0, 10_000),
};
const ADVANCED = ["scotland", "year", "privateLease"] as const;

const MIN_WAGE_YEAR = 12.71 * 37.5 * 52;

export default function EvSalSacStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const base = { salary: v.salary, monthlySacrifice: v.monthly, p11d: v.p11d, scotland: v.scotland, year: v.year, privateLease: v.privateLease };
  const r = evSalarySacrifice2026(base);
  const years = (["2026/27", "2027/28", "2028/29", "2029/30"] as Year[]).map((y) => ({ y, r: evSalarySacrifice2026({ ...base, year: y }) }));
  const maxNet = Math.max(1, ...years.map((x) => x.r.netCost));
  const lowPay = r.newSalary < MIN_WAGE_YEAR;

  return (
    <Studio
      title="Your salary sacrifice"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate my saving"
      onReset={st.reset}
      dock={{ label: "Real cost a month", value: gbp(r.netMonthly) }}
      inputs={
        <>
          <InputGroup title="You">
            <MoneyField label="Salary a year" value={v.salary} onChange={st.bind("salary")} hint="Before the sacrifice." />
          </InputGroup>
          <InputGroup title="The car">
            <MoneyField label="Monthly salary sacrifice" value={v.monthly} onChange={st.bind("monthly")} hint="The gross amount from the scheme quote, usually including insurance and servicing." />
            <MoneyField label="List price (P11D value)" value={v.p11d} onChange={st.bind("p11d")} />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <Switch label="Scottish taxpayer" checked={v.scotland} onChange={st.bind("scotland")} optional />
            <SelectField label="Tax year" value={v.year} onChange={st.bind("year")} optional options={(["2026/27", "2027/28", "2028/29", "2029/30"] as Year[]).map((y) => ({ value: y, label: `${y} (${percent(BIK_2026.zevByYear[y], 0)} benefit rate)` }))} />
            <MoneyField label="Cost of a private lease, a month" value={v.privateLease} onChange={st.bind("privateLease")} optional hint="For the same car with similar insurance and servicing, paid from take-home pay." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Real cost to you a month"
        value={gbp(r.netMonthly)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            You give up <b>{gbp(r.sacrifice)}</b> of salary a year, but save {gbp(r.taxSaved)} in income tax and {gbp(r.niSaved)} in National Insurance. You pay {gbp(r.bikTax)} of company car tax.
            Your take-home pay falls by <b>{gbp(r.netCost)}</b> a year, about {gbp(r.netMonthly)} a month.
            {r.privateYearly > 0 ? (
              <>
                {" "}
                That is <b>{gbp(r.saving)}</b> a year {r.saving >= 0 ? "less" : "more"} than leasing privately.
              </>
            ) : null}
          </>
        }
        badges={[`${percent(BIK_2026.zevByYear[v.year], 0)} benefit rate`, r.privateYearly > 0 ? `${percent(Math.max(0, r.savingPct), 0)} saving` : "No comparison", v.scotland ? "Scottish rates" : "rUK rates"]}
      />

      <Facts
        items={[
          { label: "Salary sacrificed", value: gbp(r.sacrifice) },
          { label: "Tax and NI saved", value: gbp(r.taxSaved + r.niSaved), tone: "good" },
          { label: "Company car tax", value: gbp(r.bikTax), tone: "bad" },
          { label: "Net cost a year", value: gbp(r.netCost) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Car", value: "Fully electric, so no optional remuneration rules apply" },
          { label: "Benefit", value: `${gbp(r.bik)} (${percent(BIK_2026.zevByYear[v.year], 0)} of ${gbp(v.p11d)})` },
          { label: "National Insurance", value: "Employee Class 1 at 8% and 2%" },
          { label: "Not included", value: "Effects on pension, student loan or benefits" },
        ]}
      />

      <ResultCard title="Where the money goes" sub="Your yearly sacrifice.">
        <SplitBar
          segments={[
            { label: "Tax saved", value: r.taxSaved, display: gbp(r.taxSaved), color: "#16a34a" },
            { label: "NI saved", value: r.niSaved, display: gbp(r.niSaved), color: "#22c55e" },
            { label: "You pay", value: Math.max(0, r.sacrifice - r.taxSaved - r.niSaved), display: gbp(r.sacrifice - r.taxSaved - r.niSaved), color: "#5b1e6e" },
          ]}
        />
      </ResultCard>

      <ResultCard title="As the benefit rate rises" sub="Net cost a year with the same sacrifice.">
        <Compare
          head={["Tax year", "Net cost"]}
          rows={years.map((x) => ({ label: `${x.y} (${percent(BIK_2026.zevByYear[x.y], 0)})`, value: gbp(x.r.netCost), bar: x.r.netCost / maxNet, current: x.y === v.year }))}
        />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Before you sign.">
        {lowPay && (
          <Callout tone="warn" title="Check the minimum wage">
            Your salary after the sacrifice would be {gbp(r.newSalary)}. A sacrifice cannot take your pay below the National Living Wage, so the scheme may turn you down.
          </Callout>
        )}
        <Callout title="Lower salary, other effects">
          A lower salary can reduce pension contributions based on salary, mortgage borrowing, statutory pay like maternity pay, and life cover. It can also lower student loan repayments and restore lost allowances above £100,000.
        </Callout>
        <Callout title="Leaving early">Most schemes charge an early termination fee if you leave your job or end the agreement early, unless an insurance policy covers it.</Callout>
      </ResultCard>

      <p className={s.hint} style={{ textAlign: "center" }}>
        Estimate only. Use your scheme&apos;s own quote before you sign.
      </p>
    </Studio>
  );
}
