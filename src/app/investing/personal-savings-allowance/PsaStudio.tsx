"use client";

import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, Statement } from "@/components/flagship/results";
import { gbp } from "@/components/flagship/format";
import { bool, num, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import { psaTax } from "@/lib/investing/savings";

const BAND_LABEL = { basic: "Basic-rate taxpayer", higher: "Higher-rate taxpayer", additional: "Additional-rate taxpayer", none: "Non-taxpayer" } as const;

const SCHEMA = {
  income: num(35_000, 0, 10_000_000),
  interest: num(1_500, 0, 10_000_000),
  dividends: num(0, 0, 10_000_000),
  scotland: bool(false),
  r2027: bool(false),
};
const ADVANCED = ["dividends", "scotland", "r2027"] as const;

export default function PsaStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const r = psaTax({ nonSavings: v.income, savings: v.interest, dividends: v.dividends, scotland: v.scotland, rates2027: v.r2027 });
  const paFree = Math.max(0, r.taxFree - r.startingRate - r.psaUsed);
  const incomes = [12_570, 15_000, 30_000, 60_000, 130_000];
  const ladder = incomes.map((inc) => ({ inc, x: psaTax({ nonSavings: inc, savings: v.interest, dividends: 0, scotland: v.scotland, rates2027: v.r2027 }) }));
  const maxT = Math.max(1, ...ladder.map((l) => l.x.tax));

  return (
    <Studio
      title="Your income and interest"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Check tax on my savings"
      onReset={st.reset}
      dock={{ label: "Tax on interest", value: gbp(r.tax, true) }}
      inputs={
        <>
          <InputGroup title="Your income this tax year">
            <MoneyField label="Salary, pension and other income" value={v.income} onChange={st.bind("income")} big slider={{ min: 0, max: 150_000, step: 500, ends: ["£0", "£150k"] }} hint="Before tax. Include rental profit and self-employed profit, but not savings interest or dividends." />
            <MoneyField label="Savings interest" value={v.interest} onChange={st.bind("interest")} hint="Interest from all bank and building society accounts outside ISAs, for the tax year." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <MoneyField label="Dividends" value={v.dividends} onChange={st.bind("dividends")} optional hint="Dividends outside ISAs and pensions. They can push you into a higher band." />
            <Switch label="I pay Scottish Income Tax" checked={v.scotland} onChange={st.bind("scotland")} optional hint="Savings interest is taxed at UK rates and bands, even in Scotland. Your other income uses Scottish rates." />
            <Switch label="Use savings tax rates from April 2027" checked={v.r2027} onChange={st.bind("r2027")} optional hint="22%, 42% and 47%." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Tax on your interest"
        value={gbp(r.tax, true)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          r.tax <= 0 ? (
            <>
              All <b>{gbp(v.interest)}</b> of your interest is tax-free. You could earn up to <b>{gbp(r.headroom)}</b> a year in interest before paying any tax on it.
            </>
          ) : (
            <>
              Of your <b>{gbp(v.interest)}</b> of interest, <b>{gbp(r.taxFree)}</b> is tax-free and <b>{gbp(r.taxable)}</b> is taxed, costing <b>{gbp(r.tax, true)}</b>.
              {!v.r2027 && r.tax2027 > r.tax ? <> From April 2027 the same interest would cost {gbp(r.tax2027, true)}.</> : null}
            </>
          )
        }
        badges={[BAND_LABEL[r.band], `Allowance ${gbp(r.psa)}`, r.startingRate > 0 ? `Starting rate ${gbp(r.startingRate)}` : "No starting rate"]}
      />

      <Facts
        items={[
          { label: "Personal Savings Allowance", value: gbp(r.psa), note: `${gbp(r.psaUsed)} used` },
          { label: "Starting rate for savings", value: gbp(r.startingRate), note: "Interest at 0%" },
          { label: "Tax-free interest", value: gbp(r.taxFree), tone: "good" },
          { label: "Most tax-free interest", value: gbp(r.headroom), note: "With your other income" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Tax year", value: v.r2027 ? "2026/27 bands with April 2027 savings rates" : "2026/27" },
          { label: "Allowances", value: "Standard Personal Allowance, tapered above £100,000" },
          { label: "ISAs", value: "Interest in ISAs is not included and never taxed" },
          { label: "Pension contributions", value: "None that extend your basic-rate band" },
        ]}
      />

      <ResultCard title="How your interest is taxed">
        <Statement
          columns={["Interest"]}
          rows={[
            ...(paFree > 0 ? [{ label: "Covered by your unused Personal Allowance", values: [gbp(paFree)] }] : []),
            ...(r.startingRate > 0 ? [{ label: "Starting rate for savings (0%)", values: [gbp(r.startingRate)] }] : []),
            { label: "Personal Savings Allowance (0%)", values: [gbp(r.psaUsed)] },
            { label: "Taxed", values: [gbp(r.taxable)], kind: "deduction" as const },
            { label: "Tax due", values: [gbp(r.tax, true)], kind: "total" as const },
          ]}
        />
      </ResultCard>

      <ResultCard title="The same interest at other incomes" sub={`Tax on ${gbp(v.interest)} of interest.`}>
        <Compare head={["Other income", "Tax on interest"]} rows={ladder.map((l) => ({ label: gbp(l.inc), value: gbp(l.x.tax, true), delta: `${gbp(l.x.psa)} PSA`, bar: l.x.tax / maxT }))} />
      </ResultCard>

      <ResultCard title="What it means">
        {r.tax > 0 && (
          <Callout title="Move savings into an ISA">
            Interest in a cash or stocks and shares ISA is tax-free and does not use your Personal Savings Allowance. You can put up to £20,000 a year into ISAs.
          </Callout>
        )}
        {r.band === "higher" && v.income < 60_000 && (
          <Callout title="Close to the basic-rate band?">
            Paying more into a pension can bring your income back into the basic-rate band and double your allowance to £1,000.
          </Callout>
        )}
        <Callout title="How the tax is paid">
          Banks pay interest without taking tax off. HMRC usually collects any tax due by changing your tax code, using information from the banks. If you fill in a Self Assessment return, include the interest there.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        2026/27 Income Tax rules for savings. Includes the Personal Allowance, starting rate for savings and Personal Savings Allowance.
      </p>
    </Studio>
  );
}
