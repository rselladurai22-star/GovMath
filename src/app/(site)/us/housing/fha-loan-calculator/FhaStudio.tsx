"use client";

import { FHA_LIMITS_2026, FHA_RULES, fhaLoan, fhaMinDownPct } from "@/lib/us/home-buying";
import { mortgage } from "@/lib/us/mortgage";
import { propertyTaxPct, STATES } from "@/lib/us/states";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, SelectField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, DataTable, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { duration, percent, usd, usdShort } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const SCHEMA = {
  price: num(350_000, 0, 100_000_000),
  score: oneOf<"580" | "500" | "low">("580", ["580", "500", "low"]),
  downPct: num(3.5, 0, 100),
  rate: num(7.25, 0, 30),
  years: oneOf<"15" | "30">("30", ["15", "30"]),
  state: oneOf<string>("US", ["US", ...STATES.map((s) => s.code)]),
  financeUfmip: bool(true),
  taxRate: num(propertyTaxPct("US"), 0, 10),
  insurance: num(1_800, 0, 1_000_000),
  hoa: num(0, 0, 100_000),
  limit: num(FHA_LIMITS_2026.floor, 0, 10_000_000),
  convDown: num(5, 0, 100),
  convRate: num(7.25, 0, 30),
  pmi: num(0.5, 0, 5),
};
const ADVANCED = ["financeUfmip", "taxRate", "insurance", "hoa", "limit", "convDown", "convRate", "pmi"] as const;

export default function FhaStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const years = Number(v.years);
  const minDown = fhaMinDownPct(v.score === "580" ? 580 : v.score === "500" ? 500 : 0);
  const downPct = Math.max(v.downPct, minDown ?? FHA_RULES.lowScoreDownPct);
  const raised = minDown !== null && v.downPct < minDown;
  const propertyTax = (v.price * v.taxRate) / 100;
  const f = fhaLoan({ price: v.price, downPct, aprPct: v.rate, years, propertyTax, insurance: v.insurance, hoa: v.hoa, financeUfmip: v.financeUfmip });
  const conv = mortgage({ price: v.price, down: (v.price * v.convDown) / 100, aprPct: v.convRate, years, propertyTax, insurance: v.insurance, hoa: v.hoa, pmiRate: v.pmi / 100, extra: 0 });
  const overLimit = f.baseLoan > v.limit;
  const mipLabel = f.mip.elevenYears ? "11 years" : `the life of the loan (${years} years)`;
  const fhaInsuranceTotal = f.annualMipTotal + f.ufmip;
  const convCash = (v.price * v.convDown) / 100;
  const n = f.mipByYear.length;
  const cumFha: number[] = [f.ufmip];
  const cumConv: number[] = [0];
  for (let y = 0; y < n; y++) {
    cumFha.push(cumFha[y] + f.mipByYear[y] * 12);
    const pmiMonthsThisYear = Math.max(0, Math.min(12, conv.pmiMonths - y * 12));
    cumConv.push(cumConv[y] + conv.pmiMonthly * pmiMonthsThisYear);
  }
  const yearsRows = f.mipByYear.map((m, y) => [y + 1, usd(m), usd(cumFha[y + 1]), usd(f.schedule.rows[Math.min(f.schedule.rows.length - 1, y * 12 + 11)]?.balance ?? 0)]);

  return (
    <Studio
      title="Your FHA loan"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate my FHA payment"
      onReset={st.reset}
      dock={{ label: "Monthly payment", value: usd(f.total) }}
      inputs={
        <>
          <InputGroup title="The home and the loan">
            <MoneyField label="Home price" symbol="$" value={v.price} onChange={st.bind("price")} slider={{ min: 50_000, max: 1_300_000, step: 5_000, ends: ["$50k", "$1.3m"] }} />
            <Segmented
              label="Credit score"
              value={v.score}
              onChange={(s) => {
                st.set("score", s);
                if (s === "500" && v.downPct < 10) st.set("downPct", 10);
              }}
              options={[
                { value: "580", label: "580 or more" },
                { value: "500", label: "500 to 579" },
                { value: "low", label: "Under 500" },
              ]}
            />
            <StepperField
              label="Down payment"
              value={v.downPct}
              onChange={st.bind("downPct")}
              step={0.5}
              min={0}
              max={100}
              unit="%"
              dp={1}
              aside={usd((v.price * downPct) / 100)}
              info="FHA's minimum is 3.5% with a credit score of 580 or more and 10% with 500 to 579. Gifts from family can cover it."
            />
            <StepperField label="Interest rate" value={v.rate} onChange={st.bind("rate")} step={0.125} min={0} max={30} unit="%" dp={3} info="Use the FHA rate on your Loan Estimate. Freddie Mac's survey average for all 30-year fixed loans was about 7.3% on October 1, 2026." />
            <Segmented
              label="Loan term"
              value={v.years}
              onChange={st.bind("years")}
              options={[
                { value: "15", label: "15 years" },
                { value: "30", label: "30 years" },
              ]}
            />
            <SelectField
              label="State"
              value={v.state}
              onChange={(code) => {
                st.set("state", code);
                st.set("taxRate", propertyTaxPct(code));
              }}
              options={[{ value: "US", label: "US average" }, ...STATES.map((s) => ({ value: s.code, label: s.name }))]}
              info={`Sets the property tax rate to the typical figure (${propertyTaxPct(v.state)}%, Census Bureau 2024).`}
            />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <Switch label="Add the upfront MIP to the loan" optional checked={v.financeUfmip} onChange={st.bind("financeUfmip")} info="Most borrowers finance the 1.75% upfront premium. Turn this off to pay it in cash at closing." />
            <StepperField label="Property tax rate" optional value={v.taxRate} onChange={st.bind("taxRate")} step={0.05} min={0} max={10} unit="%" dp={2} aside={`${usd(propertyTax)} a year`} />
            <MoneyField label="Homeowners insurance a year" symbol="$" optional value={v.insurance} onChange={st.bind("insurance")} />
            <MoneyField label="HOA dues a month" symbol="$" optional value={v.hoa} onChange={st.bind("hoa")} />
            <MoneyField
              label="FHA limit in your county"
              symbol="$"
              optional
              value={v.limit}
              onChange={st.bind("limit")}
              info={`2026 one-unit limits run from ${usd(FHA_LIMITS_2026.floor)} in most counties to ${usd(FHA_LIMITS_2026.ceiling)} in the most expensive. Look up your county on HUD's FHA mortgage limits page.`}
            />
            <StepperField label="Conventional down payment" optional value={v.convDown} onChange={st.bind("convDown")} step={0.5} min={0} max={100} unit="%" dp={1} />
            <StepperField label="Conventional rate" optional value={v.convRate} onChange={st.bind("convRate")} step={0.125} min={0} max={30} unit="%" dp={3} />
            <StepperField label="Conventional PMI rate" optional value={v.pmi} onChange={st.bind("pmi")} step={0.05} min={0} max={5} unit="%" dp={2} info="Freddie Mac puts PMI at roughly 0.35% to 0.85% of the loan a year. It is lower with a high credit score." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="FHA monthly payment"
        value={usd(f.total)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            {downPct}% down on {usd(v.price)} leaves a base loan of <b>{usd(f.baseLoan)}</b>. The 1.75% upfront MIP is <b>{usd(f.ufmip)}</b>
            {v.financeUfmip ? `, added to the loan for ${usd(f.loan)}` : ", paid at closing"}. Principal and interest is <b>{usd(f.principalAndInterest)}</b>, and annual MIP at{" "}
            {percent(f.mip.rate, 2)} adds <b>{usd(f.mipMonthly)}</b>{" "}a month for {mipLabel}.
          </>
        }
        badges={[`Loan ${usd(f.loan)}`, `${percent(f.ltv, 1)} loan-to-value`, `MIP ${percent(f.mip.rate, 2)} for ${f.mip.elevenYears ? "11 years" : "the loan's life"}`]}
      />

      <Facts
        items={[
          { label: "Upfront MIP", value: usd(f.ufmip) },
          { label: "Annual MIP a month", value: usd(f.mipMonthly), note: `${percent(f.mip.rate, 2)} of the average balance` },
          { label: "Mortgage insurance in total", value: usd(fhaInsuranceTotal), tone: "warn" },
          { label: "Total interest", value: usd(f.schedule.totalInterest), tone: "warn" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Rate", value: `${v.rate}% fixed for ${years} years` },
          { label: "Down payment", value: `${usd(f.down)} (${downPct}%)` },
          { label: "Upfront MIP", value: `1.75% of the base loan${v.financeUfmip ? ", added to the loan" : ", paid in cash at closing"}` },
          { label: "Annual MIP", value: `${percent(f.mip.rate, 2)} a year of the average scheduled balance, for ${mipLabel} (HUD Mortgagee Letter 2023-05)` },
          { label: "Tax and insurance", value: `${usd(propertyTax)} property tax and ${usd(v.insurance)} insurance a year, flat` },
          { label: "Not included", value: "Closing costs, rises in tax and insurance, and lender overlays such as higher score minimums" },
        ]}
      />

      <ResultCard title="Where your payment goes" sub="Your first month's FHA payment.">
        <SplitBar
          segments={[
            { label: "Principal and interest", value: f.principalAndInterest, display: usd(f.principalAndInterest), color: "#16a34a" },
            { label: "Annual MIP", value: f.mipMonthly, display: usd(f.mipMonthly), color: "#db2777" },
            { label: "Property tax", value: f.taxMonthly, display: usd(f.taxMonthly), color: "#f59e0b" },
            { label: "Homeowners insurance", value: f.insuranceMonthly, display: usd(f.insuranceMonthly), color: "#5b1e6e" },
            { label: "HOA dues", value: f.hoa, display: usd(f.hoa), color: "#2e0a3a" },
          ]}
          caption="Annual MIP falls a little each year because it is worked out on the average balance you owe that year."
        />
      </ResultCard>

      <ResultCard title="FHA vs conventional" sub={`The same home with ${v.convDown}% down on a conventional loan.`}>
        <DataTable
          summary="FHA and conventional loans compared"
          columns={["", "FHA", "Conventional"]}
          rows={[
            ["Down payment", usd(f.down), usd(convCash)],
            ["Loan", usd(f.loan), usd(conv.loan)],
            ["Rate", `${v.rate}%`, `${v.convRate}%`],
            ["First monthly payment", usd(f.total), usd(conv.total)],
            ["Mortgage insurance a month", usd(f.mipMonthly), usd(conv.pmiMonthly)],
            ["Mortgage insurance lasts", f.mip.elevenYears ? "11 years" : "Life of the loan", conv.pmiMonthly > 0 ? duration(conv.pmiMonths) : "None"],
            ["Mortgage insurance in total", usd(fhaInsuranceTotal), usd(conv.pmiTotal)],
            ["Total interest", usd(f.schedule.totalInterest), usd(conv.schedule.totalInterest)],
          ]}
        />
        <AreaChart
          ariaLabel="Mortgage insurance paid so far, FHA and conventional"
          series={[
            { key: "fha", label: "FHA: upfront and annual MIP paid so far", color: "#db2777", values: cumFha, fill: true },
            { key: "conv", label: "Conventional: PMI paid so far", color: "#5b1e6e", values: cumConv },
          ]}
          xLabel={(i) => `Yr ${i}`}
          yFormat={usdShort}
          initial={Math.min(10, cumFha.length - 1)}
          readout={(i) => (
            <>
              By year <b>{i}</b>: <b>{usd(cumFha[i] ?? 0)}</b>{" "}of FHA mortgage insurance against <b>{usd(cumConv[i] ?? 0)}</b>{" "}of PMI.
            </>
          )}
        />
      </ResultCard>

      <ResultCard title="Annual MIP year by year" sub="The monthly MIP in each year and the running total, including the upfront premium.">
        <DataTable summary="FHA annual MIP by year" columns={["Year", "MIP a month", "Mortgage insurance so far", "Balance at year end"]} rows={yearsRows} />
      </ResultCard>

      {v.score === "low" && (
        <Callout tone="warn" title="FHA needs a credit score of at least 500">
          Below 500, FHA will not insure the loan. The figures assume 10% down for illustration only. Paying down card balances and fixing report errors can lift a score quickly.
        </Callout>
      )}
      {raised && (
        <Callout tone="warn" title={`The minimum is ${minDown}% down`}>
          With your credit score, FHA needs at least {minDown}% down, so the figures use {minDown}% ({usd((v.price * downPct) / 100)}).
        </Callout>
      )}
      {overLimit && (
        <Callout tone="warn" title="Over the FHA limit you entered">
          The base loan of {usd(f.baseLoan)} is above {usd(v.limit)}. Put down at least {usd(Math.max(0, v.price - v.limit))} or check your county&apos;s 2026 limit (up to{" "}
          {usd(FHA_LIMITS_2026.ceiling)} in high-cost areas).
        </Callout>
      )}
      {!f.mip.elevenYears && (
        <Callout title="How to stop paying MIP">
          With less than 10% down, annual MIP lasts as long as the loan. The usual way out is to refinance into a conventional loan once you have about 20% equity, which then needs
          no PMI.
        </Callout>
      )}

      <p className="footnote" style={{ textAlign: "center" }}>
        An estimate, not a loan offer. Lenders can set stricter rules than FHA&apos;s minimums.
      </p>
    </Studio>
  );
}
