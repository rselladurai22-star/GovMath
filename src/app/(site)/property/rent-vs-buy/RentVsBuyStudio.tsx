"use client";

import { rentVsBuy } from "@/lib/property/rent-vs-buy";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, DataTable, Facts, ResultCard, Statement } from "@/components/flagship/results";
import { gbp, gbpShort } from "@/components/flagship/format";
import { bool, num, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import s from "@/components/flagship/Flagship.module.css";

const SCHEMA = {
  price: num(300_000, 0, 20_000_000),
  deposit: num(30_000, 0, 20_000_000),
  rent: num(1_300, 0, 50_000),
  years: num(10, 1, 30),
  rate: num(4.5, 0, 15),
  term: num(25, 5, 40),
  growth: num(3, -5, 15),
  rentGrowth: num(3, -5, 15),
  invest: num(5, 0, 15),
  maint: num(1, 0, 5),
  fees: num(2_500, 0, 100_000),
  sell: num(1.5, 0, 10),
  ftb: bool(true),
};
const ADVANCED = ["rate", "term", "growth", "rentGrowth", "invest", "maint", "fees", "sell", "ftb"] as const;
const COLORS = { buy: "#5b1e6e", rent: "#f59e0b" };

export default function RentVsBuyStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const r = rentVsBuy({
    price: v.price,
    deposit: v.deposit,
    ratePct: v.rate,
    termYears: v.term,
    rent: v.rent,
    years: v.years,
    houseGrowthPct: v.growth,
    rentGrowthPct: v.rentGrowth,
    investReturnPct: v.invest,
    maintenancePct: v.maint,
    buyingFees: v.fees,
    sellingPct: v.sell,
    firstTimeBuyer: v.ftb,
  });
  const buyWins = r.advantage >= 0;
  const yrs = Math.round(v.years);
  const firstOwnMonthly = r.firstYearOwn / 12;

  return (
    <Studio
      title="Rent or buy"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Compare renting and buying"
      onReset={st.reset}
      dock={{ label: buyWins ? "Buying ahead by" : "Renting ahead by", value: gbp(Math.abs(r.advantage)) }}
      inputs={
        <>
          <InputGroup title="Buying">
            <MoneyField label="Price of the home" value={v.price} onChange={st.bind("price")} big slider={{ min: 50_000, max: 1_000_000, step: 5_000, ends: ["£50k", "£1m"] }} />
            <MoneyField label="Your deposit" value={v.deposit} onChange={st.bind("deposit")} />
          </InputGroup>
          <InputGroup title="Renting">
            <MoneyField label="Rent a month for a similar home" value={v.rent} onChange={st.bind("rent")} slider={{ min: 300, max: 4_000, step: 25, ends: ["£300", "£4k"] }} />
            <StepperField label="Years to compare" value={v.years} onChange={st.bind("years")} step={1} min={1} max={30} unit="years" dp={0} hint="How long you expect to stay." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <StepperField label="Mortgage rate" value={v.rate} onChange={st.bind("rate")} step={0.1} min={0} max={15} unit="%" optional />
            <StepperField label="Mortgage term" value={v.term} onChange={st.bind("term")} step={1} min={5} max={40} unit="years" dp={0} optional />
            <StepperField label="House prices rise a year" value={v.growth} onChange={st.bind("growth")} step={0.5} min={-5} max={15} unit="%" dp={1} optional />
            <StepperField label="Rents rise a year" value={v.rentGrowth} onChange={st.bind("rentGrowth")} step={0.5} min={-5} max={15} unit="%" dp={1} optional />
            <StepperField label="Return on savings and investments" value={v.invest} onChange={st.bind("invest")} step={0.5} min={0} max={15} unit="%" dp={1} optional hint="What the renter earns on the deposit, and either side on money left over." />
            <StepperField label="Maintenance and insurance" value={v.maint} onChange={st.bind("maint")} step={0.25} min={0} max={5} unit="% of value" optional />
            <MoneyField label="Legal, survey and mortgage fees" value={v.fees} onChange={st.bind("fees")} optional />
            <StepperField label="Cost of selling" value={v.sell} onChange={st.bind("sell")} step={0.25} min={0} max={10} unit="% of value" optional hint="Estate agent and legal fees at the end." />
            <Switch label="First-time buyer" checked={v.ftb} onChange={st.bind("ftb")} optional hint="For Stamp Duty (England and NI)." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={buyWins ? `Buying comes out ahead after ${yrs} years` : `Renting comes out ahead after ${yrs} years`}
        value={gbp(Math.abs(r.advantage))}
        unit="better off"
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            After <b>{yrs} years</b>, the buyer would have about <b>{gbp(r.final.buyerWealth)}</b> in home equity and savings, against <b>{gbp(r.final.renterWealth)}</b> for the renter
            who invested the same cash.{" "}
            {r.breakEvenYear ? (
              <>
                Buying pulls ahead in <b>year {r.breakEvenYear}</b>.
              </>
            ) : (
              <>Within this period, buying never catches up.</>
            )}
          </>
        }
        badges={[`${gbp(r.monthlyPayment)} mortgage a month`, `${gbp(v.rent)} rent a month`, r.breakEvenYear ? `Break-even year ${r.breakEvenYear}` : "No break-even"]}
      />

      <Facts
        items={[
          { label: "Cash to buy", value: gbp(r.upfront), note: `Including ${gbp(r.stampDuty)} Stamp Duty` },
          { label: "Owning, first year", value: `${gbp(firstOwnMonthly)} a month`, note: "Mortgage and upkeep" },
          { label: "Home value then", value: gbp(r.final.homeValue) },
          { label: "Mortgage left then", value: gbp(r.final.balance) },
        ]}
      />

      <Assumptions
        items={[
          { label: "House prices", value: `${v.growth}% a year` },
          { label: "Rents", value: `${v.rentGrowth}% a year` },
          { label: "Investments", value: `${v.invest}% a year` },
          { label: "Mortgage", value: `${v.rate}% fixed, ${v.term} years` },
        ]}
        note="Small changes to these assumptions can change the answer. Try a few under More options."
      />

      <ResultCard title="Your wealth over time" sub="Buyer: home equity after selling costs, plus savings. Renter: the deposit and costs invested, plus savings.">
        <AreaChart
          ariaLabel="Net wealth for buying and renting by year"
          series={[
            { key: "buy", label: "Buying", color: COLORS.buy, values: r.years.map((y) => Math.max(0, y.buyerWealth)), fill: true },
            { key: "rent", label: "Renting and investing", color: COLORS.rent, values: r.years.map((y) => Math.max(0, y.renterWealth)) },
          ]}
          xLabel={(i) => (i === 0 ? "Today" : `Year ${i}`)}
          yFormat={gbpShort}
          initial={r.years.length - 1}
          readout={(i) => {
            const y = r.years[i];
            if (!y) return null;
            return (
              <>
                {i === 0 ? "Today" : `After ${i} ${i === 1 ? "year" : "years"}`}: buying <b>{gbp(y.buyerWealth)}</b>, renting <b>{gbp(y.renterWealth)}</b>.
              </>
            );
          }}
        />
      </ResultCard>

      <ResultCard title="The first year side by side" sub="What each choice costs before any growth.">
        <Statement
          columns={["Buying", "Renting"]}
          rows={[
            { label: "Cash at the start", values: [gbp(r.upfront), "£0 (invested instead)"] },
            { label: "Housing cost, first year", values: [gbp(r.firstYearOwn), gbp(r.firstYearRent)] },
            { label: "A month", values: [gbp(r.firstYearOwn / 12), gbp(r.firstYearRent / 12)], kind: "total" },
          ]}
        />
      </ResultCard>

      <DataTable
        summary="Year by year"
        columns={["Year", "Home value", "Mortgage left", "Buyer's wealth", "Renter's wealth"]}
        rows={r.years.slice(1).map((y) => [`${y.year}`, gbp(y.homeValue), gbp(y.balance), gbp(y.buyerWealth), gbp(y.renterWealth)])}
      />

      <ResultCard title="Worth knowing" sub="What the numbers leave out.">
        {!buyWins && r.breakEvenYear === null && (
          <Callout title="Staying longer helps buying">
            Buying has large one-off costs. The longer you stay, the more they are spread out. Try a longer period under Years to compare.
          </Callout>
        )}
        <Callout title="It only works if the renter invests">
          The renting figures assume the deposit, and any monthly saving, is actually invested. If it would be spent, buying looks better.
        </Callout>
        <Callout tone="warn" title="Prices can fall">
          A fall in house prices hits buyers with small deposits hardest. Try 0% or a negative figure for house prices to see the effect.
        </Callout>
      </ResultCard>

      <p className={s.hint} style={{ textAlign: "center" }}>
        Illustrative. Ignores tax on investment returns, which an ISA can avoid, and assumes a fixed mortgage rate.
      </p>
    </Studio>
  );
}
