"use client";

import { rentVsBuy } from "@/lib/us/home-buying";
import { propertyTaxPct, STATES } from "@/lib/us/states";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, SelectField, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, DataTable, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { usd, usdShort } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const SCHEMA = {
  price: num(400_000, 0, 100_000_000),
  downPct: num(20, 0, 100),
  rate: num(7.25, 0, 30),
  rent: num(2_200, 0, 1_000_000),
  stay: num(10, 1, 30),
  state: oneOf<string>("US", ["US", ...STATES.map((s) => s.code)]),
  years: oneOf<"15" | "30">("30", ["15", "30"]),
  taxRate: num(propertyTaxPct("US"), 0, 10),
  insurance: num(1_800, 0, 1_000_000),
  hoa: num(0, 0, 100_000),
  maintenance: num(1, 0, 10),
  pmi: num(0.5, 0, 5),
  closing: num(3, 0, 20),
  selling: num(6, 0, 20),
  appreciation: num(3, -10, 20),
  rentGrowth: num(3, -10, 20),
  costGrowth: num(3, -10, 20),
  rentersIns: num(180, 0, 100_000),
  invest: num(6, -10, 20),
  gainsTax: num(15, 0, 50),
};
const ADVANCED = ["years", "taxRate", "insurance", "hoa", "maintenance", "pmi", "closing", "selling", "appreciation", "rentGrowth", "costGrowth", "rentersIns", "invest", "gainsTax"] as const;

const yr = (n: number) => (n === 1 ? "1 year" : `${n} years`);

export default function RentVsBuyStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const stay = Math.round(v.stay);
  const r = rentVsBuy({
    price: v.price,
    downPct: v.downPct,
    aprPct: v.rate,
    years: Number(v.years),
    buyClosingPct: v.closing,
    sellCostPct: v.selling,
    taxRatePct: v.taxRate,
    insurance: v.insurance,
    hoa: v.hoa,
    maintenancePct: v.maintenance,
    pmiPct: v.pmi,
    appreciationPct: v.appreciation,
    costGrowthPct: v.costGrowth,
    rent: v.rent,
    rentGrowthPct: v.rentGrowth,
    rentersInsurance: v.rentersIns,
    investReturnPct: v.invest,
    gainsTaxPct: v.gainsTax,
    stay,
  });
  const buyWins = r.advantage >= 0;
  const start = { buy: v.price * (1 - v.selling / 100) - r.loan, rent: r.upfront };
  const buyLine = [start.buy, ...r.years.map((y) => y.buyNetWorth)];
  const rentLine = [start.rent, ...r.years.map((y) => y.rentNetWorth)];
  const bu = r.buyUnrecoverable;
  const ptr = Number.isFinite(r.priceToRent) ? r.priceToRent.toFixed(1) : "n/a";

  return (
    <Studio
      title="Rent or buy"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Compare renting and buying"
      onReset={st.reset}
      dock={{ label: buyWins ? "Buying ahead by" : "Renting ahead by", value: usd(Math.abs(r.advantage)) }}
      inputs={
        <>
          <InputGroup title="The home and the rent">
            <MoneyField label="Home price" symbol="$" value={v.price} onChange={st.bind("price")} slider={{ min: 50_000, max: 2_000_000, step: 5_000, ends: ["$50k", "$2m"] }} />
            <StepperField label="Down payment" value={v.downPct} onChange={st.bind("downPct")} step={1} min={0} max={100} unit="%" dp={1} aside={usd((v.price * v.downPct) / 100)} />
            <StepperField
              label="Mortgage rate"
              value={v.rate}
              onChange={st.bind("rate")}
              step={0.125}
              min={0}
              max={30}
              unit="%"
              dp={3}
              info="Freddie Mac's weekly survey put the average 30-year fixed rate at about 7.3% on October 1, 2026. Use a real quote if you have one."
            />
            <MoneyField label="Rent a month for a similar home" symbol="$" value={v.rent} onChange={st.bind("rent")} info="Compare like with like: the rent for a home of the same size and area as the one you would buy." />
            <StepperField label="Years you expect to stay" value={v.stay} onChange={st.bind("stay")} step={1} min={1} max={30} unit="years" dp={0} />
            <SelectField
              label="State"
              value={v.state}
              onChange={(code) => {
                st.set("state", code);
                st.set("taxRate", propertyTaxPct(code));
              }}
              options={[{ value: "US", label: "US average" }, ...STATES.map((s) => ({ value: s.code, label: s.name }))]}
              info={`Sets the property tax rate to the typical figure for ${v.state === "US" ? "the US" : "the state"} (${propertyTaxPct(v.state)}%, Census Bureau 2024). Change it under More options.`}
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
            <StepperField label="Property tax rate" optional value={v.taxRate} onChange={st.bind("taxRate")} step={0.05} min={0} max={10} unit="%" dp={2} aside={`${usd((v.price * v.taxRate) / 100)} a year`} />
            <MoneyField label="Homeowners insurance a year" symbol="$" optional value={v.insurance} onChange={st.bind("insurance")} />
            <MoneyField label="HOA dues a month" symbol="$" optional value={v.hoa} onChange={st.bind("hoa")} />
            <StepperField
              label="Maintenance a year"
              optional
              value={v.maintenance}
              onChange={st.bind("maintenance")}
              step={0.25}
              min={0}
              max={10}
              unit="% of value"
              dp={2}
              info="A common rule of thumb is to set aside about 1% of the home's value a year for repairs and upkeep. Older homes often need more."
            />
            <StepperField label="PMI rate (under 20% down)" optional value={v.pmi} onChange={st.bind("pmi")} step={0.05} min={0} max={5} unit="%" dp={2} info="Charged on conventional loans until the balance reaches 78% of the price. Freddie Mac puts it at roughly 0.35% to 0.85% of the loan a year." />
            <StepperField label="Closing costs to buy" optional value={v.closing} onChange={st.bind("closing")} step={0.5} min={0} max={20} unit="% of price" dp={1} info="Freddie Mac puts closing costs at about 2% to 5% of the purchase price." />
            <StepperField label="Costs to sell" optional value={v.selling} onChange={st.bind("selling")} step={0.5} min={0} max={20} unit="% of price" dp={1} info="Agent commissions, transfer taxes, title and other fees when you sell. Commissions are negotiable; enter what you expect to pay." />
            <StepperField label="Home price growth a year" optional value={v.appreciation} onChange={st.bind("appreciation")} step={0.5} min={-10} max={20} unit="%" dp={1} />
            <StepperField label="Rent increase a year" optional value={v.rentGrowth} onChange={st.bind("rentGrowth")} step={0.5} min={-10} max={20} unit="%" dp={1} />
            <StepperField label="Insurance and HOA increase a year" optional value={v.costGrowth} onChange={st.bind("costGrowth")} step={0.5} min={-10} max={20} unit="%" dp={1} />
            <MoneyField label="Renters insurance a year" symbol="$" optional value={v.rentersIns} onChange={st.bind("rentersIns")} />
            <StepperField
              label="Return on money invested instead"
              optional
              value={v.invest}
              onChange={st.bind("invest")}
              step={0.5}
              min={-10}
              max={20}
              unit="%"
              dp={1}
              info="What the renter earns on the down payment and on any monthly savings, and what the buyer earns if owning is cheaper month to month. Lower it for a savings account, raise it for a stock-heavy portfolio."
            />
            <StepperField label="Tax on investment gains" optional value={v.gainsTax} onChange={st.bind("gainsTax")} step={1} min={0} max={50} unit="%" dp={0} info="Charged on investment gains when cashed in at the end. Most people pay 15% on long-term gains. Home gains are assumed tax-free under the $250,000 ($500,000 married) home sale exclusion." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={`After ${yr(stay)}, ${buyWins ? "buying" : "renting"} leaves you ahead by`}
        value={usd(Math.abs(r.advantage))}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            Buying costs <b>{usd(r.firstBuyMonthly)}</b>{" "}in the first month against <b>{usd(r.firstRentMonthly)}</b>{" "}to rent. If you sold after {yr(stay)}, you would have about{" "}
            <b>{usd(r.final.buyNetWorth)}</b>{" "}as an owner and <b>{usd(r.final.rentNetWorth)}</b>{" "}as a renter who invested the difference.{" "}
            {r.breakEvenYear !== null
              ? r.breakEvenYear <= 1
                ? "Buying is ahead from the first year."
                : `Buying pulls ahead in year ${r.breakEvenYear}.`
              : `Renting stays ahead for all ${yr(stay)}.`}
          </>
        }
        badges={[
          r.breakEvenYear !== null ? `Break-even: year ${r.breakEvenYear}` : "No break-even in this stay",
          `Price-to-rent ${ptr}`,
          `Cash needed to buy ${usd(r.upfront)}`,
        ]}
      />

      <Facts
        items={[
          { label: "Owner's net worth at the end", value: usd(r.final.buyNetWorth), tone: buyWins ? "good" : undefined },
          { label: "Renter's net worth at the end", value: usd(r.final.rentNetWorth), tone: buyWins ? undefined : "good" },
          { label: "Owning costs you never get back", value: usd(bu.total), tone: "warn" },
          { label: "Renting costs you never get back", value: usd(r.rentUnrecoverable.total), tone: "warn" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Same starting cash", value: `Both start with ${usd(r.upfront)}: the down payment and ${v.closing}% closing costs. The renter invests it at ${v.invest}% a year` },
          { label: "Monthly difference", value: "Whoever pays less each month invests the difference at the same return" },
          { label: "Home", value: `Grows ${v.appreciation}% a year; sold at the end for ${v.selling}% in selling costs; gain assumed tax-free` },
          { label: "Running costs", value: `Property tax ${v.taxRate}% and maintenance ${v.maintenance}% of the value; insurance ${usd(v.insurance)} and HOA rising ${v.costGrowth}% a year` },
          { label: "Rent", value: `${usd(v.rent)} a month, rising ${v.rentGrowth}% a year, plus ${usd(v.rentersIns)} renters insurance` },
          { label: "Not included", value: "Mortgage interest and property tax deductions (most people take the standard deduction), moving costs and big one-off repairs" },
        ]}
      />

      <ResultCard title="What owning costs you" sub={`Money that does not come back over ${yr(stay)}: it buys housing, not equity.`}>
        <SplitBar
          segments={[
            { label: "Mortgage interest", value: bu.interest, display: usd(bu.interest), color: "#f59e0b" },
            { label: "Property tax", value: bu.tax, display: usd(bu.tax), color: "#16a34a" },
            { label: "Maintenance", value: bu.maintenance, display: usd(bu.maintenance), color: "#5b1e6e" },
            { label: "Homeowners insurance", value: bu.insurance, display: usd(bu.insurance), color: "#2e0a3a" },
            { label: "HOA dues", value: bu.hoa, display: usd(bu.hoa), color: "#0ea5e9" },
            { label: "PMI", value: bu.pmi, display: usd(bu.pmi), color: "#db2777" },
            { label: "Closing costs", value: bu.closing, display: usd(bu.closing), color: "#dc2626" },
            { label: "Selling costs", value: bu.selling, display: usd(bu.selling), color: "#94a3b8" },
          ]}
          caption={`Renting costs ${usd(r.rentUnrecoverable.total)} in rent and renters insurance over the same years. The difference is what the renter can invest.`}
        />
      </ResultCard>

      <ResultCard title="Net worth, buying vs renting" sub="What you would walk away with if you sold (or cashed in) at the end of each year.">
        <AreaChart
          ariaLabel="Net worth if you buy and if you rent, by year"
          series={[
            { key: "buy", label: "Buy: home equity after selling costs, plus savings", color: "#16a34a", values: buyLine, fill: true },
            { key: "rent", label: "Rent: invested down payment and monthly savings", color: "#5b1e6e", values: rentLine },
          ]}
          xLabel={(i) => `Yr ${i}`}
          yFormat={usdShort}
          initial={Math.min(5, stay)}
          readout={(i) => (
            <>
              End of year <b>{i}</b>: buying <b>{usd(buyLine[i] ?? 0)}</b>, renting <b>{usd(rentLine[i] ?? 0)}</b>.{" "}
              {(buyLine[i] ?? 0) >= (rentLine[i] ?? 0) ? "Buying is ahead." : "Renting is ahead."}
            </>
          )}
        />
        <DataTable
          summary="Year-by-year comparison"
          columns={["Year", "Home value", "Loan balance", "Owning costs that year", "Renting costs that year", "Buy net worth", "Rent net worth"]}
          rows={r.years.map((y) => [y.year, usd(y.homeValue), usd(y.balance), usd(y.buyCostYear), usd(y.rentCostYear), usd(y.buyNetWorth), usd(y.rentNetWorth)])}
        />
      </ResultCard>

      {stay < 5 && (
        <Callout tone="warn" title="A short stay favors renting">
          Buying and selling costs about {v.closing + v.selling}% of the price in fees alone. Over {yr(stay)} the home rarely grows enough to cover that, so renting usually wins unless
          prices rise fast.
        </Callout>
      )}
      {r.breakEvenYear === null && stay >= 5 && (
        <Callout title="What would tip it toward buying">
          Try a longer stay, a lower price or rate, or higher rent growth. If the rent for a similar home is low next to the price (a price-to-rent ratio of {ptr}), renting and
          investing the difference often comes out ahead.
        </Callout>
      )}

      <p className="footnote" style={{ textAlign: "center" }}>
        A model, not a forecast. Home prices, rents and investment returns can all move against you.
      </p>
    </Studio>
  );
}
