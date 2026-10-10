"use client";

import { rentalProperty } from "@/lib/us/home-buying";
import { propertyTaxPct, STATES } from "@/lib/us/states";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, SelectField, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, DataTable, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { percent, usd, usdShort } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const SCHEMA = {
  price: num(300_000, 0, 100_000_000),
  downPct: num(25, 0, 100),
  rate: num(7.5, 0, 30),
  rent: num(2_500, 0, 1_000_000),
  state: oneOf<string>("US", ["US", ...STATES.map((s) => s.code)]),
  hold: num(10, 1, 30),
  years: oneOf<"15" | "30">("30", ["15", "30"]),
  closing: num(9_000, 0, 10_000_000),
  rehab: num(0, 0, 10_000_000),
  other: num(0, 0, 1_000_000),
  vacancy: num(5, 0, 100),
  management: num(8, 0, 50),
  maintenance: num(5, 0, 50),
  capex: num(5, 0, 50),
  taxRate: num(propertyTaxPct("US"), 0, 10),
  insurance: num(1_500, 0, 1_000_000),
  hoa: num(0, 0, 100_000),
  utilities: num(0, 0, 100_000),
  appreciation: num(3, -10, 20),
  rentGrowth: num(3, -10, 20),
  expenseGrowth: num(3, -10, 20),
  selling: num(6, 0, 20),
  land: num(20, 0, 100),
};
const ADVANCED = [
  "years",
  "closing",
  "rehab",
  "other",
  "vacancy",
  "management",
  "maintenance",
  "capex",
  "taxRate",
  "insurance",
  "hoa",
  "utilities",
  "appreciation",
  "rentGrowth",
  "expenseGrowth",
  "selling",
  "land",
] as const;

const pct = (n: number, dp = 1) => (Number.isFinite(n) ? percent(n, dp) : "n/a");

export default function RentalStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const propertyTax = (v.price * v.taxRate) / 100;
  const hold = Math.round(v.hold);
  const r = rentalProperty({
    price: v.price,
    downPct: v.downPct,
    closingCosts: v.closing,
    rehab: v.rehab,
    aprPct: v.rate,
    years: Number(v.years),
    rent: v.rent,
    otherIncome: v.other,
    vacancyPct: v.vacancy,
    managementPct: v.management,
    maintenancePct: v.maintenance,
    capexPct: v.capex,
    propertyTax,
    insurance: v.insurance,
    hoa: v.hoa,
    utilities: v.utilities,
    appreciationPct: v.appreciation,
    rentGrowthPct: v.rentGrowth,
    expenseGrowthPct: v.expenseGrowth,
    hold,
    sellCostPct: v.selling,
    landPct: v.land,
  });
  const monthly = r.cashFlow / 12;
  const positive = r.cashFlow >= 0;
  const e = r.expenses;
  const dscrText = Number.isFinite(r.dscr) ? r.dscr.toFixed(2) : "No loan";
  const cumCash = r.years.reduce<number[]>((acc, y) => [...acc, acc[acc.length - 1] + y.cashFlow], [0]);
  const equity = [v.price - r.loan, ...r.years.map((y) => y.equity)];
  const irrText = r.irr === null ? "n/a" : percent(r.irr, 1);

  return (
    <Studio
      title="Your rental property"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate cash flow and returns"
      onReset={st.reset}
      dock={{ label: "Cash flow a month", value: usd(monthly) }}
      inputs={
        <>
          <InputGroup title="The property and the loan">
            <MoneyField label="Purchase price" symbol="$" value={v.price} onChange={st.bind("price")} slider={{ min: 50_000, max: 2_000_000, step: 5_000, ends: ["$50k", "$2m"] }} />
            <StepperField
              label="Down payment"
              value={v.downPct}
              onChange={st.bind("downPct")}
              step={5}
              min={0}
              max={100}
              unit="%"
              dp={1}
              aside={usd((v.price * v.downPct) / 100)}
              info="Conventional loans on an investment property usually need 15% to 25% down. Enter 100% for an all-cash purchase."
            />
            <StepperField label="Mortgage rate" value={v.rate} onChange={st.bind("rate")} step={0.125} min={0} max={30} unit="%" dp={3} info="Investment property loans usually cost more than a loan on the home you live in. Use a real quote." />
            <MoneyField label="Rent a month" symbol="$" value={v.rent} onChange={st.bind("rent")} info="Check comparable listings for the same size of home nearby." />
            <StepperField label="Years you plan to hold it" value={v.hold} onChange={st.bind("hold")} step={1} min={1} max={30} unit="years" dp={0} />
            <SelectField
              label="State"
              value={v.state}
              onChange={(code) => {
                st.set("state", code);
                st.set("taxRate", propertyTaxPct(code));
              }}
              options={[{ value: "US", label: "US average" }, ...STATES.map((s) => ({ value: s.code, label: s.name }))]}
              info={`Sets the property tax rate to the typical figure (${propertyTaxPct(v.state)}%, Census Bureau 2024). Some states tax rentals at higher rates than owner-occupied homes; check with the county.`}
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
            <MoneyField label="Closing costs" symbol="$" optional value={v.closing} onChange={st.bind("closing")} />
            <MoneyField label="Repairs before renting" symbol="$" optional value={v.rehab} onChange={st.bind("rehab")} />
            <MoneyField label="Other income a month" symbol="$" optional value={v.other} onChange={st.bind("other")} info="Parking, laundry, storage or pet fees." />
            <StepperField label="Vacancy" optional value={v.vacancy} onChange={st.bind("vacancy")} step={1} min={0} max={100} unit="% of rent" dp={1} info="The share of the year the home sits empty or rent goes unpaid. 5% is about 18 days a year." />
            <StepperField label="Property management" optional value={v.management} onChange={st.bind("management")} step={1} min={0} max={50} unit="% of rent" dp={1} info="Set to 0 if you manage it yourself, but count your time." />
            <StepperField label="Repairs and maintenance" optional value={v.maintenance} onChange={st.bind("maintenance")} step={1} min={0} max={50} unit="% of rent" dp={1} />
            <StepperField label="Capital expenses reserve" optional value={v.capex} onChange={st.bind("capex")} step={1} min={0} max={50} unit="% of rent" dp={1} info="Money set aside for big replacements: roof, water heater, HVAC, flooring, appliances." />
            <StepperField label="Property tax rate" optional value={v.taxRate} onChange={st.bind("taxRate")} step={0.05} min={0} max={10} unit="%" dp={2} aside={`${usd(propertyTax)} a year`} />
            <MoneyField label="Landlord insurance a year" symbol="$" optional value={v.insurance} onChange={st.bind("insurance")} />
            <MoneyField label="HOA dues a month" symbol="$" optional value={v.hoa} onChange={st.bind("hoa")} />
            <MoneyField label="Utilities you pay a month" symbol="$" optional value={v.utilities} onChange={st.bind("utilities")} />
            <StepperField label="Property value growth a year" optional value={v.appreciation} onChange={st.bind("appreciation")} step={0.5} min={-10} max={20} unit="%" dp={1} />
            <StepperField label="Rent increase a year" optional value={v.rentGrowth} onChange={st.bind("rentGrowth")} step={0.5} min={-10} max={20} unit="%" dp={1} />
            <StepperField label="Expense increase a year" optional value={v.expenseGrowth} onChange={st.bind("expenseGrowth")} step={0.5} min={-10} max={20} unit="%" dp={1} />
            <StepperField label="Costs to sell" optional value={v.selling} onChange={st.bind("selling")} step={0.5} min={0} max={20} unit="% of price" dp={1} />
            <StepperField label="Land share of the price" optional value={v.land} onChange={st.bind("land")} step={5} min={0} max={100} unit="%" dp={0} info="Land can't be depreciated. Your county's assessment often splits land and building values." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={positive ? "Cash flow a month" : "Monthly shortfall"}
        value={usd(Math.abs(monthly))}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            Rent of {usd(v.rent)} brings in <b>{usd(r.effectiveIncome)}</b>{" "}a year after vacancy. Operating costs of <b>{usd(e.total)}</b>{" "}leave a net operating income of{" "}
            <b>{usd(r.noi)}</b>, a <b>{pct(r.capRate)}</b>{" "}cap rate. After the mortgage of {usd(r.debtService)} a year, the property {positive ? "makes" : "loses"}{" "}
            <b>{usd(Math.abs(r.cashFlow))}</b>{" "}a year: a {pct(r.cashOnCash)} cash-on-cash return on the {usd(r.cashInvested)} you put in.
          </>
        }
        badges={[`Cap rate ${pct(r.capRate)}`, `Cash-on-cash ${pct(r.cashOnCash)}`, `DSCR ${dscrText}`, `Rent-to-price ${pct(r.onePercent, 2)}`]}
      />

      <Facts
        items={[
          { label: "Net operating income", value: usd(r.noi), note: "A year, before the mortgage" },
          { label: "Cash flow a year", value: usd(r.cashFlow), tone: positive ? "good" : "bad" },
          { label: `Return over ${hold} ${hold === 1 ? "year" : "years"} (IRR)`, value: irrText, note: "Cash flow plus the sale, a year" },
          { label: "Total profit at sale", value: usd(r.totalProfit), tone: r.totalProfit >= 0 ? "good" : "bad" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Cash in", value: `${usd(r.down)} down, ${usd(v.closing)} closing costs${v.rehab > 0 ? `, ${usd(v.rehab)} repairs` : ""}: ${usd(r.cashInvested)}` },
          { label: "Loan", value: r.loan > 0 ? `${usd(r.loan)} at ${v.rate}% over ${v.years} years` : "None: all cash" },
          { label: "Income", value: `Rent rising ${v.rentGrowth}% a year with ${v.vacancy}% vacancy` },
          { label: "Expenses", value: `Management ${v.management}% of collected rent; repairs ${v.maintenance}% and reserves ${v.capex}% of rent; other costs rise ${v.expenseGrowth}% a year` },
          { label: "Sale", value: `After ${hold} ${hold === 1 ? "year" : "years"}, value grown ${v.appreciation}% a year, less ${v.selling}% selling costs` },
          { label: "Tax", value: "Figures are before income tax. Depreciation is shown for your return; tax on the sale, including depreciation recapture, is not taken off" },
        ]}
      />

      <ResultCard title="Where the rent goes" sub="The first year's gross income, split.">
        <SplitBar
          segments={[
            { label: "Vacancy", value: r.vacancy, display: usd(r.vacancy), color: "#94a3b8" },
            { label: "Management", value: e.management, display: usd(e.management), color: "#5b1e6e" },
            { label: "Repairs", value: e.maintenance, display: usd(e.maintenance), color: "#0ea5e9" },
            { label: "Capital reserve", value: e.capex, display: usd(e.capex), color: "#2e0a3a" },
            { label: "Property tax", value: e.tax, display: usd(e.tax), color: "#f59e0b" },
            { label: "Insurance", value: e.insurance, display: usd(e.insurance), color: "#db2777" },
            { label: "HOA and utilities", value: e.hoa + e.utilities, display: usd(e.hoa + e.utilities), color: "#dc2626" },
            { label: "Mortgage", value: Math.min(r.debtService, Math.max(0, r.noi)), display: usd(r.debtService), color: "#16a34a" },
            { label: "Cash flow", value: Math.max(0, r.cashFlow), display: usd(r.cashFlow), color: "#eda100" },
          ]}
          caption={`Operating costs take ${pct(r.effectiveIncome > 0 ? e.total / r.effectiveIncome : 0, 0)} of collected rent. Break-even occupancy: ${pct(r.breakEvenOccupancy, 0)}.`}
        />
      </ResultCard>

      <ResultCard title="The investor's ratios" sub="How the deal compares with common rules of thumb.">
        <DataTable
          summary="Rental property ratios"
          columns={["Measure", "This property", "What it means"]}
          rows={[
            ["Cap rate", pct(r.capRate), "NOI ÷ price: the return if you paid cash, before tax"],
            ["Cash-on-cash", pct(r.cashOnCash), "Year-one cash flow ÷ cash you put in"],
            ["DSCR", dscrText, "NOI ÷ mortgage payments; under 1.00 the rent doesn't cover the loan"],
            ["Rent-to-price (1% rule)", pct(r.onePercent, 2), "Monthly rent ÷ price; the rule of thumb looks for 1% or more"],
            ["Gross rent multiplier", Number.isFinite(r.grm) ? r.grm.toFixed(1) : "n/a", "Price ÷ a year's rent; lower is cheaper for the rent"],
            ["Break-even occupancy", pct(r.breakEvenOccupancy, 0), "Share of the year it must be let to cover all costs and the loan"],
            ["Depreciation a year", usd(r.depreciationYear), "Building cost ÷ 27.5 years, a tax deduction"],
            ["Equity multiple", `${r.equityMultiple.toFixed(2)}×`, `Everything you get back ÷ cash in, over ${hold} ${hold === 1 ? "year" : "years"}`],
          ]}
        />
      </ResultCard>

      <ResultCard title="Your return over time" sub="Equity in the property and the cash flow you have collected.">
        <AreaChart
          ariaLabel="Equity and cumulative cash flow by year"
          series={[
            { key: "eq", label: "Equity (value less loan)", color: "#16a34a", values: equity, fill: true },
            { key: "cf", label: "Cash flow collected so far", color: "#f59e0b", values: cumCash },
          ]}
          xLabel={(i) => `Yr ${i}`}
          yFormat={usdShort}
          initial={Math.min(5, hold)}
          readout={(i) => (
            <>
              End of year <b>{i}</b>: equity <b>{usd(equity[i] ?? 0)}</b>, cash flow so far <b>{usd(cumCash[i] ?? 0)}</b>.
            </>
          )}
        />
        <DataTable
          summary="Year-by-year rental figures"
          columns={["Year", "Income", "Expenses", "NOI", "Cash flow", "Depreciation", "Taxable profit", "Equity"]}
          rows={r.years.map((y) => [y.year, usd(y.income), usd(y.expenses), usd(y.noi), usd(y.cashFlow), usd(y.depreciation), usd(y.taxable), usd(y.equity)])}
        />
        <p className="footnote">
          Sale after {hold} {hold === 1 ? "year" : "years"}: {usd(r.sale.price)} less {usd(r.sale.costs)} costs and {usd(r.sale.payoff)} loan payoff leaves {usd(r.sale.proceeds)}.
          Depreciation taken, {usd(r.depreciationTotal)}, is taxed at up to 25% when you sell.
        </p>
      </ResultCard>

      {!positive && (
        <Callout tone="warn" title="The rent doesn't cover the costs">
          You would add {usd(-monthly)} a month from your own pocket. Deals like this rely on the property rising in value. A bigger down payment, a lower price or higher rent would
          change that.
        </Callout>
      )}
      {Number.isFinite(r.dscr) && r.dscr < 1.2 && positive && (
        <Callout title="Thin cover for the loan">
          A DSCR of {dscrText} leaves little room for a long vacancy or a big repair. Lenders that underwrite on rental income commonly look for about 1.2 or more.
        </Callout>
      )}

      <p className="footnote" style={{ textAlign: "center" }}>
        An estimate before income tax, not investment advice. Check rents, taxes and insurance locally.
      </p>
    </Studio>
  );
}
