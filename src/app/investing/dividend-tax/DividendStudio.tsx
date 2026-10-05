"use client";

import { extraTax, incomeTax2026, INV_2026 } from "@/lib/investing/tax";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { gbp, gbpShort, percent } from "@/components/flagship/format";
import { bool, num, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import s from "@/components/flagship/Flagship.module.css";

const SCHEMA = {
  income: num(40_000, 0, 10_000_000),
  dividends: num(8_000, 0, 10_000_000),
  savings: num(0, 0, 10_000_000),
  pension: num(0, 0, 10_000_000),
  spouseIncome: num(15_000, 0, 10_000_000),
  scotland: bool(false),
};
const ADVANCED = ["savings", "pension", "spouseIncome", "scotland"] as const;
const POINTS = 31;

export default function DividendStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const base = { nonSavings: v.income, savings: v.savings, dividends: 0, bandExtension: v.pension, scotland: v.scotland };
  const full = incomeTax2026({ ...base, dividends: v.dividends });
  const divTax = full.dividendTax;
  const marginal = extraTax({ ...base, dividends: v.dividends }, { dividends: 100 }) / 100;
  const bands = (() => {
    // Work out how much of the taxed dividends fall in each band.
    const start = full.taxableNonSavings + full.taxableSavings + full.dividendAllowanceUsed;
    const end = full.taxableNonSavings + full.taxableSavings + full.taxableDividends;
    const seg = (a: number, b: number) => Math.max(0, Math.min(end, b) - Math.max(start, a));
    return { basic: seg(0, full.basicLimit), higher: seg(full.basicLimit, full.additionalLimit), additional: seg(full.additionalLimit, Infinity) };
  })();
  const paCovered = v.dividends - full.taxableDividends;
  const spouseTax = (amount: number) => incomeTax2026({ nonSavings: v.spouseIncome, savings: 0, dividends: amount }).dividendTax;
  const half = v.dividends / 2;
  const shared = incomeTax2026({ ...base, dividends: half }).dividendTax + spouseTax(half);
  const top = Math.max(20_000, Math.ceil((v.dividends * 2) / 5_000) * 5_000);
  const levels = Array.from({ length: POINTS }, (_, i) => (top * i) / (POINTS - 1));
  const curve = levels.map((d) => incomeTax2026({ ...base, dividends: d }).dividendTax);
  const options = [
    { label: "As now", tax: divTax },
    { label: "Half the shares in your spouse's name", tax: shared },
    { label: "Held in an ISA", tax: 0 },
  ];
  const maxOpt = Math.max(1, ...options.map((o) => o.tax));

  return (
    <Studio
      title="Your income"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Work out dividend tax"
      onReset={st.reset}
      dock={{ label: "Dividend tax", value: gbp(divTax) }}
      inputs={
        <>
          <InputGroup title="This tax year">
            <MoneyField label="Salary, pension and other income" value={v.income} onChange={st.bind("income")} hint="Before tax. Includes self-employed profit and rent." />
            <MoneyField label="Dividends" value={v.dividends} onChange={st.bind("dividends")} slider={{ min: 0, max: 100_000, step: 500, ends: ["£0", "£100k"] }} hint="From shares, funds and your own company, outside ISAs and pensions." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <MoneyField label="Savings interest" value={v.savings} onChange={st.bind("savings")} optional hint="Taxed before dividends." />
            <MoneyField label="Personal pension contributions and Gift Aid (gross)" value={v.pension} onChange={st.bind("pension")} optional hint="Extend the basic-rate band." />
            <MoneyField label="Spouse's or civil partner's income" value={v.spouseIncome} onChange={st.bind("spouseIncome")} optional hint="To compare sharing the shares." />
            <Switch label="Scottish taxpayer" checked={v.scotland} onChange={st.bind("scotland")} optional hint="Dividends use UK rates and bands, even in Scotland." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Tax on your dividends"
        value={gbp(divTax)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          divTax <= 0 ? (
            <>
              No tax is due on <b>{gbp(v.dividends)}</b> of dividends. {paCovered > 0 ? <>{gbp(paCovered)} is covered by your Personal Allowance and </> : null}the first <b>{gbp(INV_2026.dividendAllowance)}</b> is tax-free.
            </>
          ) : (
            <>
              On <b>{gbp(v.dividends)}</b> of dividends you pay <b>{gbp(divTax)}</b>, an average of <b>{percent(divTax / v.dividends, 1)}</b>. Your next £100 of dividends would be taxed at{" "}
              <b>{percent(marginal, 2)}</b>.
            </>
          )
        }
        badges={[`£${INV_2026.dividendAllowance} allowance`, full.topBand === "none" ? "Non-taxpayer" : `${full.topBand[0].toUpperCase()}${full.topBand.slice(1)}-rate taxpayer`, `Marginal ${percent(marginal, 2)}`]}
      />

      <Facts
        items={[
          { label: "Dividends", value: gbp(v.dividends) },
          { label: "Tax-free", value: gbp(paCovered + full.dividendAllowanceUsed) },
          { label: "Dividend tax", value: gbp(divTax), tone: divTax > 0 ? "warn" : "good" },
          { label: "Total Income Tax", value: gbp(full.total) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Rates", value: "10.75%, 35.75%, 39.35%" },
          { label: "Allowance", value: `${gbp(INV_2026.dividendAllowance)} at 0%` },
          { label: "Order", value: "Other income, then savings, then dividends" },
          { label: "Year", value: "2026/27" },
        ]}
      />

      <ResultCard title="How your dividends are taxed" sub="By band.">
        <Statement
          columns={["Dividends", "Tax"]}
          rows={[
            ...(paCovered > 0 ? [{ label: "Covered by the Personal Allowance", values: [gbp(paCovered), gbp(0)] }] : []),
            { label: "Dividend allowance at 0%", values: [gbp(full.dividendAllowanceUsed), gbp(0)] },
            { label: "Basic rate, 10.75%", values: [gbp(bands.basic), gbp(bands.basic * INV_2026.dividend[0])] },
            { label: "Higher rate, 35.75%", values: [gbp(bands.higher), gbp(bands.higher * INV_2026.dividend[1])] },
            ...(bands.additional > 0 ? [{ label: "Additional rate, 39.35%", values: [gbp(bands.additional), gbp(bands.additional * INV_2026.dividend[2])] }] : []),
            { label: "Total", values: [gbp(v.dividends), gbp(divTax)], kind: "total" as const },
          ]}
        />
        {v.dividends > 0 && (
          <SplitBar
            segments={[
              { label: "Tax-free", value: paCovered + full.dividendAllowanceUsed, display: gbp(paCovered + full.dividendAllowanceUsed), color: "#16a34a" },
              { label: "Basic rate", value: bands.basic, display: gbp(bands.basic), color: "#5b1e6e" },
              { label: "Higher rate", value: bands.higher, display: gbp(bands.higher), color: "#f59e0b" },
              ...(bands.additional > 0 ? [{ label: "Additional rate", value: bands.additional, display: gbp(bands.additional), color: "#ef4444" }] : []),
            ]}
          />
        )}
      </ResultCard>

      <ResultCard title="Tax at different dividend levels" sub={`With ${gbp(v.income)} of other income.`}>
        <AreaChart
          ariaLabel="Dividend tax by dividends received"
          series={[{ key: "tax", label: "Dividend tax", color: "#f59e0b", values: curve, fill: true }]}
          xLabel={(i) => gbpShort(levels[i] ?? 0)}
          yFormat={gbpShort}
          initial={Math.min(POINTS - 1, Math.round((v.dividends / top) * (POINTS - 1)))}
          hint="Drag across the chart, or use the arrow keys, to read any amount."
          readout={(i) => (
            <>
              Dividends <b>{gbp(levels[i] ?? 0)}</b>: tax <b>{gbp(curve[i] ?? 0)}</b>.
            </>
          )}
        />
      </ResultCard>

      {divTax > 0 && (
        <ResultCard title="Ways to pay less" sub="Same dividends, held differently.">
          <Compare head={["Option", "Dividend tax"]} rows={options.map((o, idx) => ({ label: o.label, value: gbp(o.tax), delta: o.tax < divTax - 1 ? `Save ${gbp(divTax - o.tax)}` : undefined, bar: o.tax / maxOpt, current: idx === 0 }))} />
        </ResultCard>
      )}

      <ResultCard title="Worth knowing" sub="Reporting dividends.">
        <Callout title="When you must tell HMRC">
          Dividends of £10,000 or more mean you must file a Self Assessment return. Below that, if tax is due, HMRC can usually collect it through your tax code.
        </Callout>
        <Callout title="Rates rose in April 2026">
          The basic and higher dividend rates went up by 2 percentage points, to 10.75% and 35.75%. The additional rate stayed at 39.35%.
        </Callout>
      </ResultCard>

      <p className={s.hint} style={{ textAlign: "center" }}>
        2026/27 rates. Not tax advice.
      </p>
    </Studio>
  );
}
