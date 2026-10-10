"use client";

import { CONFORMING_2026, downPaymentOptions, fhaAnnualMip, monthlyToSave, monthsToSave, type DownRow } from "@/lib/us/home-buying";
import { grow } from "@/lib/us/savings";
import { propertyTaxPct, STATES } from "@/lib/us/states";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, SelectField, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, DataTable, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { duration, usd, usdShort } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const CHOICES = ["c3", "f35", "c5", "c10", "c20", "custom"] as const;
type Choice = (typeof CHOICES)[number];

const SCHEMA = {
  price: num(400_000, 0, 100_000_000),
  choice: oneOf<Choice>("c10", CHOICES),
  customPct: num(15, 0, 100),
  saved: num(15_000, 0, 100_000_000),
  monthly: num(1_000, 0, 1_000_000),
  rate: num(7.25, 0, 30),
  state: oneOf<string>("US", ["US", ...STATES.map((s) => s.code)]),
  years: oneOf<"15" | "30">("30", ["15", "30"]),
  fhaRate: num(7.25, 0, 30),
  pmi: num(0.5, 0, 5),
  closing: num(3, 0, 20),
  taxRate: num(propertyTaxPct("US"), 0, 10),
  insurance: num(1_800, 0, 1_000_000),
  hoa: num(0, 0, 100_000),
  apy: num(4, 0, 20),
  goalYears: num(3, 1, 30),
};
const ADVANCED = ["years", "fhaRate", "pmi", "closing", "taxRate", "insurance", "hoa", "apy", "goalYears"] as const;

function timeText(months: number): string {
  if (!Number.isFinite(months)) return "Never at this rate";
  if (months === 0) return "You have it now";
  return duration(months);
}

function insuranceText(row: DownRow): string {
  if (row.insuranceMonthly <= 0) return "None";
  if (row.insuranceForLife) return "Life of the loan";
  return duration(row.insuranceMonths);
}

export default function DownPaymentStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const input = {
    price: v.price,
    aprPct: v.rate,
    fhaAprPct: v.fhaRate,
    years: Number(v.years),
    pmiRate: v.pmi / 100,
    propertyTax: (v.price * v.taxRate) / 100,
    insurance: v.insurance,
    hoa: v.hoa,
    closingShare: v.closing / 100,
  };
  const rows = downPaymentOptions(input, v.choice === "custom" ? v.customPct : undefined);
  const chosen = rows.find((r) => (v.choice === "custom" ? r.program === "conventional" && r.pct === v.customPct : r.key === v.choice)) ?? rows[0];
  const target = chosen.cashToClose;
  const months = monthsToSave(target, v.saved, v.monthly, v.apy);
  const gap = Math.max(0, target - v.saved);
  const needMonthly = monthlyToSave(target, v.saved, v.goalYears * 12, v.apy);
  const chartYears = Number.isFinite(months) && months > 0 ? Math.min(30, Math.ceil(months / 12)) : 0;
  const path = chartYears > 0 ? grow(v.saved, v.monthly, v.apy, chartYears, "annually") : null;
  const balances = path ? [v.saved, ...path.years.map((y) => y.balance)] : [];
  const twenty = rows.find((r) => r.key === "c20");
  const maxPay = Math.max(...rows.map((r) => r.total), 1);
  const fhaMip = fhaAnnualMip(v.price * 0.965, 0.965, Number(v.years));

  return (
    <Studio
      title="Your down payment"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Work out my down payment"
      onReset={st.reset}
      dock={{ label: "Time to save", value: timeText(months) }}
      inputs={
        <>
          <InputGroup title="The home and your savings">
            <MoneyField label="Home price" symbol="$" value={v.price} onChange={st.bind("price")} slider={{ min: 50_000, max: 2_000_000, step: 5_000, ends: ["$50k", "$2m"] }} />
            <SelectField
              label="Down payment to aim for"
              value={v.choice}
              onChange={st.bind("choice")}
              options={[
                { value: "c3", label: "3% (conventional)" },
                { value: "f35", label: "3.5% (FHA)" },
                { value: "c5", label: "5% (conventional)" },
                { value: "c10", label: "10% (conventional)" },
                { value: "c20", label: "20% (conventional, no PMI)" },
                { value: "custom", label: "My own percentage" },
              ]}
            />
            {v.choice === "custom" && (
              <StepperField label="Your down payment" value={v.customPct} onChange={st.bind("customPct")} step={1} min={0} max={100} unit="%" dp={1} aside={usd((v.price * v.customPct) / 100)} />
            )}
            <MoneyField label="Saved so far" symbol="$" value={v.saved} onChange={st.bind("saved")} />
            <MoneyField label="You can save each month" symbol="$" value={v.monthly} onChange={st.bind("monthly")} />
            <StepperField label="Mortgage rate" value={v.rate} onChange={st.bind("rate")} step={0.125} min={0} max={30} unit="%" dp={3} info="Freddie Mac's weekly survey put the average 30-year fixed rate at about 7.3% on October 1, 2026." />
            <SelectField
              label="State"
              value={v.state}
              onChange={(code) => {
                st.set("state", code);
                st.set("taxRate", propertyTaxPct(code));
              }}
              options={[{ value: "US", label: "US average" }, ...STATES.map((s) => ({ value: s.code, label: s.name }))]}
              info={`Sets the property tax rate to the typical figure (${propertyTaxPct(v.state)}%, Census Bureau 2024). Change it under More options.`}
            />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <Segmented
              label="Loan term"
              optional
              value={v.years}
              onChange={st.bind("years")}
              options={[
                { value: "15", label: "15 years" },
                { value: "30", label: "30 years" },
              ]}
            />
            <StepperField label="FHA rate" optional value={v.fhaRate} onChange={st.bind("fhaRate")} step={0.125} min={0} max={30} unit="%" dp={3} info="FHA quotes can differ from conventional ones. Enter the rate a lender gives you for the 3.5% FHA option." />
            <StepperField label="PMI rate a year" optional value={v.pmi} onChange={st.bind("pmi")} step={0.05} min={0} max={5} unit="%" dp={2} info="Conventional loans under 20% down. Freddie Mac puts PMI at roughly 0.35% to 0.85% of the loan a year: smaller down payments and lower credit scores sit at the high end." />
            <StepperField label="Closing costs" optional value={v.closing} onChange={st.bind("closing")} step={0.5} min={0} max={20} unit="% of price" dp={1} info="Freddie Mac puts closing costs at about 2% to 5% of the purchase price." />
            <StepperField label="Property tax rate" optional value={v.taxRate} onChange={st.bind("taxRate")} step={0.05} min={0} max={10} unit="%" dp={2} />
            <MoneyField label="Homeowners insurance a year" symbol="$" optional value={v.insurance} onChange={st.bind("insurance")} />
            <MoneyField label="HOA dues a month" symbol="$" optional value={v.hoa} onChange={st.bind("hoa")} />
            <StepperField label="Savings account APY" optional value={v.apy} onChange={st.bind("apy")} step={0.25} min={0} max={20} unit="%" dp={2} info="High-yield savings accounts paid around 4% in September 2026; the FDIC national average for savings accounts was about 0.38%." />
            <StepperField label="Years you want to buy in" optional value={v.goalYears} onChange={st.bind("goalYears")} step={1} min={1} max={30} unit="years" dp={0} />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={`Time to save for ${chosen.label}`}
        value={timeText(months)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            {chosen.pct}% down on {usd(v.price)} is <b>{usd(chosen.down)}</b>. With {v.closing}% closing costs, you need <b>{usd(target)}</b>{" "}in cash at closing.{" "}
            {months === 0 ? (
              <>Your {usd(v.saved)} already covers it.</>
            ) : Number.isFinite(months) ? (
              <>
                Saving {usd(v.monthly)} a month at {v.apy}% APY on top of {usd(v.saved)} gets you there in <b>{duration(months)}</b>.
              </>
            ) : (
              <>Add a monthly saving to see how long it takes.</>
            )}{" "}
            The monthly payment would be <b>{usd(chosen.total)}</b>.
          </>
        }
        badges={[
          `Loan ${usd(chosen.loan)}`,
          chosen.insuranceMonthly > 0 ? `${chosen.program === "fha" ? "MIP" : "PMI"} ${usd(chosen.insuranceMonthly)} a month` : "No PMI",
          gap > 0 ? `${usd(gap)} still to save` : "Fully saved",
        ]}
      />

      <Facts
        items={[
          { label: "Down payment", value: usd(chosen.down) },
          { label: "Cash to close", value: usd(target), note: `Down payment plus ${usd(chosen.closingCosts)} closing costs` },
          { label: "Monthly payment", value: usd(chosen.total) },
          { label: `To buy in ${v.goalYears} ${v.goalYears === 1 ? "year" : "years"}, save`, value: `${usd(needMonthly)} a month` },
        ]}
      />

      <Assumptions
        items={[
          { label: "Rate", value: `${v.rate}% conventional, ${v.fhaRate}% FHA, fixed for ${v.years} years` },
          { label: "PMI", value: `${v.pmi}% of the loan a year on conventional loans under 20% down, until the balance reaches 78% of the price` },
          { label: "FHA", value: `1.75% upfront MIP added to the loan, then annual MIP of ${(fhaMip.rate * 100).toFixed(2)}% for the life of the loan (3.5% down)` },
          { label: "Payment", value: `Includes ${v.taxRate}% property tax and ${usd(v.insurance)} insurance a year${v.hoa > 0 ? ` and ${usd(v.hoa)} HOA` : ""}` },
          { label: "Savings", value: `${v.apy}% APY, deposits at the end of each month; the price is assumed not to change while you save` },
          { label: "Not included", value: "Moving costs, reserves lenders may ask for, an emergency fund and down payment assistance" },
        ]}
      />

      <ResultCard title="Your cash to close" sub={`What ${chosen.label} needs on closing day.`}>
        <SplitBar
          segments={[
            { label: "Down payment", value: chosen.down, display: usd(chosen.down), color: "#16a34a" },
            { label: "Closing costs", value: chosen.closingCosts, display: usd(chosen.closingCosts), color: "#f59e0b" },
          ]}
          caption="Sellers can sometimes pay part of the closing costs as a credit. Lenders may also want a few months of payments left in savings after closing."
        />
      </ResultCard>

      <ResultCard title="Every option side by side" sub={`${usd(v.price)} home, ${v.years}-year loan.`}>
        <DataTable
          summary="Down payment options compared"
          columns={["Option", "Down payment", "Cash to close", "Loan", "Monthly payment", "PMI or MIP a month", "Mortgage insurance lasts", "Time to save"]}
          rows={rows.map((r) => [
            r.label,
            usd(r.down),
            usd(r.cashToClose),
            usd(r.loan),
            usd(r.total),
            usd(r.insuranceMonthly),
            insuranceText(r),
            timeText(monthsToSave(r.cashToClose, v.saved, v.monthly, v.apy)),
          ])}
        />
        <Compare
          head={["Monthly payment", "Total"]}
          rows={rows.map((r) => ({
            label: r.label,
            value: usd(r.total),
            delta: twenty && r.key !== "c20" ? `+${usd(r.total - twenty.total)} vs 20%` : undefined,
            deltaTone: "up" as const,
            bar: r.total / maxPay,
            current: r === chosen,
          }))}
        />
      </ResultCard>

      {path && (
        <ResultCard title="Your savings path" sub={`Growing to ${usd(target)}.`}>
          <AreaChart
            ariaLabel="Savings balance by year"
            series={[
              { key: "bal", label: "Savings", color: "#16a34a", values: balances, fill: true },
              { key: "goal", label: "Cash to close", color: "#94a3b8", values: balances.map(() => target), dashed: true },
            ]}
            xLabel={(i) => `Yr ${i}`}
            yFormat={usdShort}
            initial={Math.min(1, balances.length - 1)}
            readout={(i) => (
              <>
                End of year <b>{i}</b>: about <b>{usd(balances[i] ?? 0)}</b>{" "}saved.
              </>
            )}
          />
        </ResultCard>
      )}

      {chosen.jumbo && (
        <Callout tone="warn" title="Above the conforming loan limit">
          A loan of {usd(chosen.loan)} is over the 2026 baseline conforming limit of {usd(CONFORMING_2026.baseline)} (higher in high-cost counties, up to {usd(CONFORMING_2026.ceiling)}).
          Jumbo loans often need a bigger down payment and stronger credit.
        </Callout>
      )}
      {chosen.program === "fha" && (
        <Callout title="FHA mortgage insurance lasts">
          With 3.5% down, FHA&apos;s annual MIP stays for the life of the loan. Putting 10% down limits it to 11 years; refinancing to a conventional loan once you have 20% equity
          also ends it.
        </Callout>
      )}

      <p className="footnote" style={{ textAlign: "center" }}>
        An estimate for planning, not a loan offer. Your Loan Estimate shows the real cash to close.
      </p>
    </Studio>
  );
}
