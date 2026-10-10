"use client";

import { fhaLoan, VA_RESIDUAL, vaLoan, vaResidualIncome } from "@/lib/us/home-buying";
import { mortgage, yearly } from "@/lib/us/mortgage";
import { propertyTaxPct, STATES } from "@/lib/us/states";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, SelectField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, DataTable, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { percent, usd, usdShort } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const SCHEMA = {
  price: num(400_000, 0, 100_000_000),
  down: num(0, 0, 100_000_000),
  rate: num(7.25, 0, 30),
  years: oneOf<"15" | "30">("30", ["15", "30"]),
  use: oneOf<"first" | "subsequent">("first", ["first", "subsequent"]),
  exempt: bool(false),
  state: oneOf<string>("US", ["US", ...STATES.map((s) => s.code)]),
  financeFee: bool(true),
  taxRate: num(propertyTaxPct("US"), 0, 10),
  insurance: num(1_800, 0, 1_000_000),
  hoa: num(0, 0, 100_000),
  family: num(3, 1, 12),
  region: oneOf<"0" | "1" | "2" | "3">("2", ["0", "1", "2", "3"]),
  otherRate: num(7.25, 0, 30),
  pmi: num(0.5, 0, 5),
};
const ADVANCED = ["financeFee", "taxRate", "insurance", "hoa", "family", "region", "otherRate", "pmi"] as const;

export default function VaStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const years = Number(v.years);
  const propertyTax = (v.price * v.taxRate) / 100;
  const va = vaLoan({
    price: v.price,
    down: v.down,
    aprPct: v.rate,
    years,
    firstUse: v.use === "first",
    exempt: v.exempt,
    financeFee: v.financeFee,
    propertyTax,
    insurance: v.insurance,
    hoa: v.hoa,
  });
  const fha = fhaLoan({ price: v.price, downPct: 3.5, aprPct: v.otherRate, years, propertyTax, insurance: v.insurance, hoa: v.hoa, financeUfmip: true });
  const conv = mortgage({ price: v.price, down: v.price * 0.05, aprPct: v.otherRate, years, propertyTax, insurance: v.insurance, hoa: v.hoa, pmiRate: v.pmi / 100, extra: 0 });
  const residual = vaResidualIncome(v.family, Number(v.region));
  const yr = yearly(va.schedule);
  const bal = [va.loan, ...yr.map((y) => y.balance)];
  const interestPaid = yr.reduce<number[]>((acc, y) => [...acc, acc[acc.length - 1] + y.interest], [0]);
  const tierNote = va.downShare >= 0.1 ? "10% or more down" : va.downShare >= 0.05 ? "5% to 9.99% down" : "less than 5% down";

  return (
    <Studio
      title="Your VA loan"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate my VA payment"
      onReset={st.reset}
      dock={{ label: "Monthly payment", value: usd(va.total) }}
      inputs={
        <>
          <InputGroup title="The home and the loan">
            <MoneyField label="Home price" symbol="$" value={v.price} onChange={st.bind("price")} slider={{ min: 50_000, max: 2_000_000, step: 5_000, ends: ["$50k", "$2m"] }} />
            <MoneyField
              label="Down payment"
              symbol="$"
              value={v.down}
              onChange={st.bind("down")}
              aside={v.price > 0 ? percent(Math.min(1, v.down / v.price), 1) : undefined}
              info="VA loans need no down payment with full entitlement. Putting 5% or 10% down lowers the funding fee."
            />
            <StepperField label="Interest rate" value={v.rate} onChange={st.bind("rate")} step={0.125} min={0} max={30} unit="%" dp={3} info="Use the VA rate on your Loan Estimate. Freddie Mac's survey average for all 30-year fixed loans was about 7.3% on October 1, 2026." />
            <Segmented
              label="Loan term"
              value={v.years}
              onChange={st.bind("years")}
              options={[
                { value: "15", label: "15 years" },
                { value: "30", label: "30 years" },
              ]}
            />
            <Segmented
              label="VA loan use"
              value={v.use}
              onChange={st.bind("use")}
              options={[
                { value: "first", label: "First use" },
                { value: "subsequent", label: "Used before" },
              ]}
            />
            <Switch
              label="Exempt from the funding fee"
              checked={v.exempt}
              onChange={st.bind("exempt")}
              info="For example, if you receive VA compensation for a service-connected disability, are a surviving spouse receiving DIC, or are on active duty with a Purple Heart. Your Certificate of Eligibility shows it."
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
            <Switch label="Add the funding fee to the loan" optional checked={v.financeFee} onChange={st.bind("financeFee")} info="You can finance the funding fee or pay it in cash at closing. Financing it means paying interest on it." />
            <StepperField label="Property tax rate" optional value={v.taxRate} onChange={st.bind("taxRate")} step={0.05} min={0} max={10} unit="%" dp={2} aside={`${usd(propertyTax)} a year`} />
            <MoneyField label="Homeowners insurance a year" symbol="$" optional value={v.insurance} onChange={st.bind("insurance")} />
            <MoneyField label="HOA dues a month" symbol="$" optional value={v.hoa} onChange={st.bind("hoa")} />
            <StepperField label="People in your household" optional value={v.family} onChange={st.bind("family")} step={1} min={1} max={12} unit="people" dp={0} info="Used for VA's residual income guide: the money left each month after the mortgage, taxes, debts and living costs." />
            <SelectField
              label="Region"
              optional
              value={v.region}
              onChange={st.bind("region")}
              options={VA_RESIDUAL.regions.map((r, k) => ({ value: String(k) as "0" | "1" | "2" | "3", label: r }))}
            />
            <StepperField label="FHA and conventional rate" optional value={v.otherRate} onChange={st.bind("otherRate")} step={0.125} min={0} max={30} unit="%" dp={3} info="The rate used for the comparison loans." />
            <StepperField label="Conventional PMI rate" optional value={v.pmi} onChange={st.bind("pmi")} step={0.05} min={0} max={5} unit="%" dp={2} />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="VA monthly payment"
        value={usd(va.total)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            {va.fee > 0 ? (
              <>
                The funding fee is <b>{percent(va.feePct / 100, 2)}</b>{" "}({tierNote}, {v.use === "first" ? "first use" : "used before"}), or <b>{usd(va.fee)}</b>
                {v.financeFee ? `, added to the loan for ${usd(va.loan)}` : ", paid at closing"}.{" "}
              </>
            ) : (
              <>{v.exempt ? "You pay no funding fee. " : ""}</>
            )}
            Principal and interest is <b>{usd(va.principalAndInterest)}</b>, and with tax and insurance your payment is <b>{usd(va.total)}</b>. There is no monthly mortgage
            insurance.
          </>
        }
        badges={[`Loan ${usd(va.loan)}`, va.fee > 0 ? `Funding fee ${usd(va.fee)}` : "No funding fee", "No PMI", `Cash for the loan ${usd(va.cashForLoan)}`]}
      />

      <Facts
        items={[
          { label: "Funding fee", value: usd(va.fee), note: va.fee > 0 ? `${va.feePct}% of ${usd(va.baseLoan)}` : v.exempt ? "Exempt" : undefined },
          { label: "Interest on the financed fee", value: usd(va.feeInterest), note: v.financeFee ? `Over ${years} years` : "Fee paid in cash" },
          { label: "Total interest", value: usd(va.schedule.totalInterest), tone: "warn" },
          { label: "VA residual income guide", value: `${usd(residual)} a month`, note: `${v.family} ${v.family === 1 ? "person" : "people"}, ${VA_RESIDUAL.regions[Number(v.region)]}` },
        ]}
      />

      <Assumptions
        items={[
          { label: "Rate", value: `${v.rate}% fixed for ${years} years` },
          { label: "Funding fee", value: v.exempt ? "Exempt" : `${va.feePct}% (VA's table since April 7, 2023)${v.financeFee ? ", added to the loan" : ", paid in cash"}` },
          { label: "Entitlement", value: "Full entitlement, so no VA loan limit applies (with reduced entitlement, county limits set how much you can borrow with no money down)" },
          { label: "Tax and insurance", value: `${usd(propertyTax)} property tax and ${usd(v.insurance)} insurance a year, flat` },
          { label: "Comparison loans", value: `FHA at 3.5% down and conventional at 5% down, both at ${v.otherRate}%` },
          { label: "Not included", value: "Closing costs (VA limits what lenders can charge you), rises in tax and insurance" },
        ]}
      />

      <ResultCard title="Where your payment goes" sub="Your first month's VA payment.">
        <SplitBar
          segments={[
            { label: "Principal and interest", value: va.principalAndInterest, display: usd(va.principalAndInterest), color: "#16a34a" },
            { label: "Property tax", value: va.taxMonthly, display: usd(va.taxMonthly), color: "#f59e0b" },
            { label: "Homeowners insurance", value: va.insuranceMonthly, display: usd(va.insuranceMonthly), color: "#5b1e6e" },
            { label: "HOA dues", value: va.hoa, display: usd(va.hoa), color: "#2e0a3a" },
          ]}
          caption="No mortgage insurance: the VA guaranty protects the lender instead."
        />
      </ResultCard>

      <ResultCard title="VA vs FHA vs conventional" sub="The same home with each program's usual low down payment.">
        <DataTable
          summary="VA, FHA and conventional loans compared"
          columns={["", "VA", "FHA (3.5% down)", "Conventional (5% down)"]}
          rows={[
            ["Down payment", usd(va.down), usd(fha.down), usd(v.price * 0.05)],
            ["Upfront fee", usd(va.fee), usd(fha.ufmip), "$0"],
            ["Loan", usd(va.loan), usd(fha.loan), usd(conv.loan)],
            ["Mortgage insurance a month", "$0", usd(fha.mipMonthly), usd(conv.pmiMonthly)],
            ["First monthly payment", usd(va.total), usd(fha.total), usd(conv.total)],
            ["Total interest", usd(va.schedule.totalInterest), usd(fha.schedule.totalInterest), usd(conv.schedule.totalInterest)],
          ]}
        />
      </ResultCard>

      <ResultCard title="Your balance over time" sub="How the balance falls and interest adds up.">
        <AreaChart
          ariaLabel="VA loan balance by year"
          series={[
            { key: "bal", label: "Balance", color: "#16a34a", values: bal, fill: true },
            { key: "int", label: "Interest paid so far", color: "#f59e0b", values: interestPaid },
          ]}
          xLabel={(i) => `Yr ${i}`}
          yFormat={usdShort}
          initial={Math.min(5, bal.length - 1)}
          readout={(i) => (
            <>
              End of year <b>{i}</b>: you owe <b>{usd(bal[i] ?? 0)}</b>{" "}and have paid <b>{usd(interestPaid[i] ?? 0)}</b>{" "}in interest.
            </>
          )}
        />
      </ResultCard>

      {va.fee > 0 && va.downShare < 0.05 && (
        <Callout title="A down payment cuts the fee">
          Putting {usd(v.price * 0.05)} (5%) down would lower the funding fee to 1.5%; 10% down lowers it to 1.25%.
        </Callout>
      )}
      {va.downShare < 0.1 && v.price > 0 && (
        <Callout tone="warn" title="Little equity at the start">
          With {percent(va.downShare, 1)} down{v.financeFee && va.fee > 0 ? " and the fee financed" : ""}, you owe {percent(va.loan / v.price, 1)} of the price. If prices dip and you need
          to sell early, the sale may not cover the loan and selling costs.
        </Callout>
      )}

      <p className="footnote" style={{ textAlign: "center" }}>
        An estimate, not a loan offer. Your Certificate of Eligibility confirms your entitlement and funding fee status.
      </p>
    </Studio>
  );
}
