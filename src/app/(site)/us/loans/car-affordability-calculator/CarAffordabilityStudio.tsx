"use client";

import { carBudget, fuelPerMonth, rule20410, type CarBudgetInput } from "@/lib/us/borrowing";
import { STATES, stateByCode } from "@/lib/us/states";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, SelectField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { usd } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const TERMS = ["36", "48", "60", "72", "84"] as const;
type Term = (typeof TERMS)[number];
const STATE_CODES = ["--", ...STATES.map((s) => s.code)] as const;
/** States that charge sales tax on the full price, with no credit for a trade-in. */
const NO_TRADE_CREDIT = ["CA", "HI", "VA"];

const SCHEMA = {
  income: num(72_000, 0, 100_000_000),
  basis: oneOf<"gross" | "takehome">("gross", ["gross", "takehome"]),
  takehome: num(4_700, 0, 10_000_000),
  share: num(10, 0, 100),
  down: num(4_000, 0, 10_000_000),
  apr: num(7.5, 0, 40),
  term: oneOf<Term>("60", TERMS),
  running: bool(true),
  insurance: num(140, 0, 100_000),
  miles: num(15_000, 0, 200_000),
  mpg: num(28, 1, 200),
  gas: num(4.15, 0, 20),
  trade: num(0, 0, 10_000_000),
  owed: num(0, 0, 10_000_000),
  state: oneOf<string>("--", STATE_CODES),
  tax: num(7, 0, 15),
  afterTrade: bool(true),
  fees: num(800, 0, 100_000),
};
const ADVANCED = ["running", "insurance", "miles", "mpg", "gas", "trade", "owed", "state", "tax", "afterTrade", "fees"] as const;

export default function CarAffordabilityStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const months = Number(v.term);
  const grossMonthly = v.income / 12;
  const monthlyIncome = v.basis === "gross" ? grossMonthly : v.takehome;
  const fuel = fuelPerMonth(v.miles, v.mpg, v.gas);
  const input: CarBudgetInput = {
    monthlyIncome,
    sharePct: v.share,
    includeRunning: v.running,
    insurance: v.insurance,
    fuel,
    down: v.down,
    tradeIn: v.trade,
    tradeOwed: v.owed,
    aprPct: v.apr,
    months,
    salesTaxRate: v.tax / 100,
    taxAfterTradeIn: v.afterTrade,
    fees: v.fees,
  };
  const b = carBudget(input);
  const rule = rule20410(grossMonthly, v.apr, v.insurance, fuel, v.tax / 100, v.fees);
  const equity = v.trade - v.owed;
  const yourDownShare = b.maxPrice > 0 ? (v.down + Math.max(0, equity)) / b.maxPrice : 0;
  const byTerm = TERMS.map((t) => ({ t: Number(t), r: carBudget({ ...input, months: Number(t) }) }));
  const maxTermPrice = Math.max(1, ...byTerm.map((x) => x.r.maxPrice));
  const shares = Array.from(new Set([10, 15, 20, v.share])).sort((a, c) => a - c);
  const byShare = shares.map((s) => ({ s, r: carBudget({ ...input, sharePct: s }) }));
  const maxSharePrice = Math.max(1, ...byShare.map((x) => x.r.maxPrice));
  const noRoom = b.payment <= 0;
  const basisWord = v.basis === "gross" ? "gross pay" : "take-home pay";

  const pickState = (code: string) => {
    st.set("state", code);
    const s = stateByCode(code);
    if (s) {
      st.set("tax", Number(((s.sales + s.localAvg) * 100).toFixed(2)));
      st.set("afterTrade", !NO_TRADE_CREDIT.includes(code));
    }
  };

  return (
    <Studio
      title="Your car budget"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Find my car budget"
      onReset={st.reset}
      dock={{ label: "Car price you can afford", value: usd(b.maxPrice) }}
      inputs={
        <>
          <InputGroup title="Income and budget">
            <MoneyField symbol="$" label="Yearly income before tax" value={v.income} onChange={st.bind("income")} slider={{ min: 20_000, max: 250_000, step: 1_000, ends: ["$20k", "$250k"] }} />
            <Segmented
              label="Measure the budget against"
              value={v.basis}
              onChange={st.bind("basis")}
              options={[
                { value: "gross", label: "Gross pay", note: "The 20/4/10 rule uses gross pay: income before tax." },
                { value: "takehome", label: "Take-home pay", note: "What reaches your bank account after tax and deductions. A stricter test." },
              ]}
            />
            {v.basis === "takehome" && (
              <MoneyField symbol="$" label="Monthly take-home pay" value={v.takehome} onChange={st.bind("takehome")} info="From your pay stubs, or our paycheck calculator." />
            )}
            <StepperField label="Share of monthly pay for the car" value={v.share} onChange={st.bind("share")} step={1} min={0} max={50} unit="%" dp={0} aside={usd((monthlyIncome * v.share) / 100)} info="10% of gross pay, including insurance and fuel, is the 20/4/10 rule. Some planners allow 15% to 20% of take-home pay for all car costs." />
            <MoneyField symbol="$" label="Down payment" value={v.down} onChange={st.bind("down")} />
            <StepperField label="Auto loan APR" value={v.apr} onChange={st.bind("apr")} step={0.1} min={0} max={30} unit="%" dp={2} info="The Federal Reserve's survey put the average bank rate on new car loans at about 7.2% to 7.5% in August 2026. Used car loans and weaker credit cost more." />
            <SelectField label="Loan term" value={v.term} onChange={st.bind("term")} options={TERMS.map((t) => ({ value: t, label: `${t} months (${Number(t) / 12} years)` }))} />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <Switch label="Count insurance and fuel in the budget" optional checked={v.running} onChange={st.bind("running")} info="On: the share covers the payment, insurance and fuel, as in the 20/4/10 rule. Off: the share is for the loan payment alone." />
            <MoneyField symbol="$" label="Car insurance a month" optional value={v.insurance} onChange={st.bind("insurance")} info="AAA's 2025 driving cost study put full coverage at about $1,700 a year. Get a quote for the car you want: rates vary widely by state, age and record." />
            <StepperField label="Miles a year" optional value={v.miles} onChange={st.bind("miles")} step={500} min={0} max={50_000} unit="miles" dp={0} />
            <StepperField label="Fuel economy" optional value={v.mpg} onChange={st.bind("mpg")} step={1} min={1} max={150} unit="mpg" dp={0} />
            <StepperField label="Gas price per gallon" optional value={v.gas} onChange={st.bind("gas")} step={0.05} min={0} max={10} unit="dollars" dp={2} aside={`${usd(fuel)} a month`} info="AAA's 2026 study used $4.152 a gallon for regular. Use your local price." />
            <MoneyField symbol="$" label="Trade-in value" optional value={v.trade} onChange={st.bind("trade")} />
            <MoneyField symbol="$" label="Still owed on the trade-in" optional value={v.owed} onChange={st.bind("owed")} />
            <SelectField
              label="State"
              optional
              value={v.state}
              onChange={pickState}
              options={[{ value: "--", label: "Choose your state" }, ...STATES.map((s) => ({ value: s.code, label: s.name }))]}
              info="Fills in the state's sales tax plus its average local rate. Many states charge a different rate on vehicles, so check yours."
            />
            <StepperField label="Sales tax rate" optional value={v.tax} onChange={st.bind("tax")} step={0.05} min={0} max={15} unit="%" dp={3} />
            <Switch label="Tax the price after the trade-in" optional checked={v.afterTrade} onChange={st.bind("afterTrade")} info="Most states tax only the price minus your trade-in. California, Hawaii and Virginia tax the full price." />
            <MoneyField symbol="$" label="Title, registration and dealer fees" optional value={v.fees} onChange={st.bind("fees")} />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Car price you can afford"
        value={usd(b.maxPrice)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          noRoom ? (
            <>
              {v.share}% of your {basisWord} is <b>{usd(b.carBudget)}</b>{" "}a month, and insurance and fuel already take <b>{usd(v.insurance + fuel)}</b>. There is no room for a
              loan payment: raise the share, cut running costs, or look at a car you can buy with your <b>{usd(v.down + equity)}</b>{" "}in cash and trade-in.
            </>
          ) : (
            <>
              {v.share}% of your {basisWord} is <b>{usd(b.carBudget)}</b>{" "}a month.
              {v.running ? (
                <>
                  {" "}After <b>{usd(v.insurance + fuel)}</b>{" "}for insurance and fuel, <b>{usd(b.payment)}</b>{" "}is left for the payment.
                </>
              ) : null}{" "}
              At {v.apr}% over {months} months that supports a <b>{usd(b.maxLoan)}</b>{" "}loan, which with your {usd(v.down)} down buys a car of about <b>{usd(b.maxPrice)}</b>{" "}
              including tax and fees.
            </>
          )
        }
        badges={[`Payment ${usd(b.payment)} a month`, `All car costs ${usd(b.monthlyCarCost)} a month`, `20/4/10 rule: ${usd(rule.price)}`]}
      />

      <Facts
        items={[
          { label: "Maximum price", value: usd(b.maxPrice), tone: "good" },
          { label: "Maximum loan", value: usd(b.maxLoan) },
          { label: "Monthly payment", value: usd(b.payment) },
          { label: "Total interest", value: usd(b.check.totalInterest), tone: "warn" },
          { label: "Sales tax on that price", value: usd(b.check.salesTax) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Budget", value: `${v.share}% of ${basisWord} (${usd(monthlyIncome)} a month)${v.running ? ", covering the payment, insurance and fuel" : ", for the payment alone"}` },
          { label: "Loan", value: `${v.apr}% over ${months} months, with sales tax and fees financed` },
          { label: "Fuel", value: `${v.miles.toLocaleString("en-US")} miles a year at ${v.mpg} mpg and $${v.gas.toFixed(2)} a gallon: ${usd(fuel)} a month` },
          { label: "Not included", value: "Maintenance, repairs, tires, parking, tolls and registration renewals" },
        ]}
      />

      <ResultCard title="Your monthly car costs" sub="The payment plus what it costs to run the car.">
        <SplitBar
          segments={[
            { label: "Loan payment", value: b.check.payment, display: usd(b.check.payment), color: "#16a34a" },
            { label: "Insurance", value: v.insurance, display: usd(v.insurance), color: "#f59e0b" },
            { label: "Fuel", value: fuel, display: usd(fuel), color: "#5b1e6e" },
          ]}
        />
      </ResultCard>

      <ResultCard title="The 20/4/10 rule" sub="20% down, a loan of 4 years at most, and payment, insurance and fuel under 10% of gross pay.">
        <Facts
          items={[
            { label: "Price under the rule", value: usd(rule.price), tone: "good" },
            { label: "20% down needed", value: usd(rule.downNeeded) },
            { label: "Payment over 48 months", value: usd(rule.payment) },
            { label: "Your down payment and equity", value: usd(v.down + Math.max(0, equity)), tone: yourDownShare >= 0.2 ? "good" : "warn" },
          ]}
        />
        {rule.price <= 0 ? (
          <Callout tone="warn" title="Insurance and fuel take the whole 10%">
            At this income the running costs alone use up 10% of gross pay. A cheaper-to-run car, or a used car bought for cash, keeps you inside the rule.
          </Callout>
        ) : (
          <Callout tone={months > 48 || yourDownShare < 0.2 ? "info" : "good"} title={months > 48 ? `Your ${months}-month loan is longer than the rule's 4 years` : "Your term fits the rule"}>
            The rule keeps you from owing more than the car is worth. A big down payment and a short loan mean you build equity faster than the car loses value.
          </Callout>
        )}
      </ResultCard>

      <ResultCard title="Price by loan term" sub="The same monthly payment over longer loans.">
        <Compare
          head={["Term · total interest", "Car price"]}
          rows={byTerm.map(({ t, r }) => ({
            label: `${t} months · ${usd(r.check.totalInterest)} interest`,
            value: usd(r.maxPrice),
            bar: r.maxPrice / maxTermPrice,
            current: t === months,
          }))}
        />
        <Callout tone="warn" title="A longer loan is not more affordable">
          Stretching the term buys a pricier car with the same payment, but you pay far more interest and can owe more than the car is worth for years.
        </Callout>
      </ResultCard>

      <ResultCard title="Price by budget share" sub={`Share of ${basisWord}, same loan.`}>
        <Compare
          head={["Share · monthly budget", "Car price"]}
          rows={byShare.map(({ s, r }) => ({
            label: `${s}% · ${usd(r.carBudget)} a month`,
            value: usd(r.maxPrice),
            bar: r.maxPrice / maxSharePrice,
            current: s === v.share,
          }))}
        />
      </ResultCard>

      {v.owed > v.trade && (
        <Callout tone="warn" title="Negative equity on your trade-in">
          You owe {usd(v.owed - v.trade)} more than your trade-in is worth. That amount is added to the new loan, so it cuts the price you can afford.
        </Callout>
      )}

      <p className="footnote" style={{ textAlign: "center" }}>
        A budget guide, not a loan offer. Your lender sets the rate and how much it will lend.
      </p>
    </Studio>
  );
}
