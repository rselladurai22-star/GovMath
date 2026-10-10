"use client";

import { leaseVsBuy, type LeaseInput, type LeaseTaxMethod } from "@/lib/us/borrowing";
import { STATES, stateByCode } from "@/lib/us/states";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, SelectField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, DataTable, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { usd } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const TERMS = ["24", "36", "39", "42", "48"] as const;
type Term = (typeof TERMS)[number];
const LOAN_TERMS = ["36", "48", "60", "72", "84"] as const;
type LoanTerm = (typeof LOAN_TERMS)[number];
const METHODS = ["payment", "upfront-payments", "upfront-price", "none"] as const;
const STATE_CODES = ["--", ...STATES.map((s) => s.code)] as const;
/** States whose lease tax is not charged on each monthly payment (check with the state). */
const STATE_METHOD: Record<string, LeaseTaxMethod> = { NY: "upfront-payments", TX: "upfront-price", MD: "upfront-price", VA: "upfront-price" };

const METHOD_LABEL: Record<LeaseTaxMethod, string> = {
  payment: "On each monthly payment (most states)",
  "upfront-payments": "On the total of the payments, at signing",
  "upfront-price": "On the car's price, at signing",
  none: "No sales tax",
};

const SCHEMA = {
  msrp: num(40_000, 0, 1_000_000),
  price: num(38_000, 0, 1_000_000),
  down: num(2_000, 0, 1_000_000),
  residual: num(58, 0, 100),
  mf: num(0.0025, 0, 0.01),
  term: oneOf<Term>("36", TERMS),
  state: oneOf<string>("--", STATE_CODES),
  tax: num(7, 0, 15),
  method: oneOf<LeaseTaxMethod>("payment", METHODS),
  taxDown: bool(true),
  trade: num(0, 0, 1_000_000),
  owed: num(0, 0, 1_000_000),
  rebate: num(0, 0, 100_000),
  acq: num(995, 0, 5_000),
  capAcq: bool(true),
  disp: num(395, 0, 5_000),
  fees: num(500, 0, 20_000),
  loanApr: num(7.5, 0, 40),
  loanTerm: oneOf<LoanTerm>("60", LOAN_TERMS),
};
const ADVANCED = ["state", "tax", "method", "taxDown", "trade", "owed", "rebate", "acq", "capAcq", "disp", "fees", "loanApr", "loanTerm"] as const;

export default function CarLeaseStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const months = Number(v.term);
  const input: LeaseInput = {
    msrp: v.msrp,
    price: v.price,
    down: v.down,
    tradeIn: v.trade,
    tradeOwed: v.owed,
    rebate: v.rebate,
    residualPct: v.residual,
    moneyFactor: v.mf,
    months,
    acquisitionFee: v.acq,
    capitalizeAcquisitionFee: v.capAcq,
    dispositionFee: v.disp,
    signingFees: v.fees,
    taxRate: v.tax / 100,
    taxMethod: v.method,
    taxDown: v.taxDown,
  };
  const c = leaseVsBuy(input, v.loanApr, Number(v.loanTerm));
  const l = c.lease;
  const apr = l.aprEquivalent;
  const leaseCheaper = c.leaseExtra < 0;
  const residualAbove = l.residual >= l.adjustedCap && l.adjustedCap > 0;
  const priceOverMsrp = v.price > v.msrp && v.msrp > 0;
  const downs = [0, 2_000, 5_000].map((d) => ({ d, r: leaseVsBuy({ ...input, down: d }, v.loanApr, Number(v.loanTerm)).lease }));
  const maxDownCost = Math.max(1, ...downs.map((x) => x.r.totalCost));

  const pickState = (code: string) => {
    st.set("state", code);
    const s = stateByCode(code);
    if (s) {
      const rate = Number(((s.sales + s.localAvg) * 100).toFixed(2));
      st.set("tax", rate);
      st.set("method", rate === 0 ? "none" : STATE_METHOD[code] ?? "payment");
    }
  };

  return (
    <Studio
      title="Your car lease"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate my lease payment"
      onReset={st.reset}
      dock={{ label: "Monthly payment", value: usd(l.payment, true) }}
      inputs={
        <>
          <InputGroup title="The lease">
            <MoneyField symbol="$" label="MSRP (sticker price)" value={v.msrp} onChange={st.bind("msrp")} slider={{ min: 15_000, max: 100_000, step: 500, ends: ["$15k", "$100k"] }} info="The manufacturer's suggested retail price. The residual value is a share of this figure, not of the price you negotiate." />
            <MoneyField symbol="$" label="Negotiated price (cap cost)" value={v.price} onChange={st.bind("price")} info="The selling price you agree with the dealer. You can negotiate it on a lease just as when buying." />
            <MoneyField symbol="$" label="Cash down (cap cost reduction)" value={v.down} onChange={st.bind("down")} />
            <StepperField label="Residual value" value={v.residual} onChange={st.bind("residual")} step={1} min={0} max={100} unit="%" dp={0} aside={usd(l.residual)} info="What the leasing company expects the car to be worth at the end, as a share of MSRP. Ask the dealer; it is set by the lender for each model and term." />
            <StepperField label="Money factor" value={v.mf} onChange={st.bind("mf")} step={0.0001} min={0} max={0.01} unit="" dp={5} aside={`≈ ${apr.toFixed(2)}% APR`} info="The lease's interest rate in another form. Multiply by 2,400 for the rough APR: 0.0025 is about 6%." />
            <SelectField label="Lease term" value={v.term} onChange={st.bind("term")} options={TERMS.map((t) => ({ value: t, label: `${t} months` }))} />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <SelectField
              label="State"
              optional
              value={v.state}
              onChange={pickState}
              options={[{ value: "--", label: "Choose your state" }, ...STATES.map((s) => ({ value: s.code, label: s.name }))]}
              info="Fills in the state's sales tax plus its average local rate and the usual way leases are taxed there. Vehicle rates and rules differ in many states, so check yours."
            />
            <StepperField label="Sales tax rate" optional value={v.tax} onChange={st.bind("tax")} step={0.05} min={0} max={15} unit="%" dp={3} />
            <SelectField label="How the lease is taxed" optional value={v.method} onChange={st.bind("method")} options={METHODS.map((m) => ({ value: m, label: METHOD_LABEL[m] }))} />
            <Switch label="Tax the cash down too" optional checked={v.taxDown} onChange={st.bind("taxDown")} info="Most states that tax lease payments also tax a cash cap cost reduction." />
            <MoneyField symbol="$" label="Trade-in value" optional value={v.trade} onChange={st.bind("trade")} />
            <MoneyField symbol="$" label="Still owed on the trade-in" optional value={v.owed} onChange={st.bind("owed")} info="If you owe more than the car is worth, the difference is added to the lease's capitalized cost." />
            <MoneyField symbol="$" label="Rebate or lease cash" optional value={v.rebate} onChange={st.bind("rebate")} />
            <MoneyField symbol="$" label="Acquisition fee" optional value={v.acq} onChange={st.bind("acq")} info="The leasing company's fee for setting up the lease, often about $600 to $1,100." />
            <Switch label="Roll the acquisition fee into the lease" optional checked={v.capAcq} onChange={st.bind("capAcq")} info="Off means you pay it at signing." />
            <MoneyField symbol="$" label="Disposition fee at the end" optional value={v.disp} onChange={st.bind("disp")} info="Charged when you hand the car back, often about $300 to $600. Often waived if you lease or buy another car from the same brand." />
            <MoneyField symbol="$" label="Title, registration and doc fees" optional value={v.fees} onChange={st.bind("fees")} />
            <StepperField label="Auto loan APR, to compare buying" optional value={v.loanApr} onChange={st.bind("loanApr")} step={0.1} min={0} max={30} unit="%" dp={2} />
            <SelectField label="Auto loan term, to compare buying" optional value={v.loanTerm} onChange={st.bind("loanTerm")} options={LOAN_TERMS.map((t) => ({ value: t, label: `${t} months` }))} />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={`Monthly lease payment, ${months} months`}
        value={usd(l.payment, true)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            <b>{usd(l.depreciation, true)}</b>{" "}a month pays for the car&rsquo;s loss in value and <b>{usd(l.rentCharge, true)}</b>{" "}is the rent charge
            {l.monthlyTax > 0 ? (
              <>
                , plus <b>{usd(l.monthlyTax, true)}</b>{" "}of sales tax
              </>
            ) : null}
            . You pay <b>{usd(l.dueAtSigning)}</b>{" "}at signing and <b>{usd(l.totalCost)}</b>{" "}over the whole lease, then hand the car back.
          </>
        }
        badges={[`Money factor ${v.mf} ≈ ${apr.toFixed(2)}% APR`, `Residual ${usd(l.residual)}`, `Due at signing ${usd(l.dueAtSigning)}`]}
      />

      <Facts
        items={[
          { label: "Due at signing", value: usd(l.dueAtSigning) },
          { label: "Total of payments", value: usd(l.totalPayments) },
          { label: "Total lease cost", value: usd(l.totalCost), tone: "warn" },
          { label: "Rent charge in total", value: usd(l.totalRent) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Payment", value: "Depreciation (adjusted cap cost − residual) ÷ term, plus rent charge (adjusted cap cost + residual) × money factor" },
          { label: "Sales tax", value: `${v.tax}%, ${METHOD_LABEL[v.method].toLowerCase()}${v.taxDown && v.method !== "upfront-price" && v.method !== "none" ? ", cash down taxed too" : ""}` },
          { label: "Mileage", value: "You stay within the mileage allowance and return the car with normal wear only" },
          { label: "Buying instead", value: `Same price, cash and trade-in, ${v.loanApr}% over ${v.loanTerm} months, tax and fees financed; the car is worth the residual value at the end of the lease term` },
        ]}
      />

      <ResultCard title="What the lease costs" sub="Everything you pay from signing to handing the car back.">
        <SplitBar
          segments={[
            { label: "Depreciation", value: l.totalDepreciation, display: usd(l.totalDepreciation), color: "#16a34a" },
            { label: "Rent charge", value: l.totalRent, display: usd(l.totalRent), color: "#f59e0b" },
            { label: "Sales tax", value: l.monthlyTax * months + l.upfrontTax, display: usd(l.monthlyTax * months + l.upfrontTax), color: "#5b1e6e" },
            { label: "Fees", value: (v.capAcq ? 0 : v.acq) + v.fees + v.disp, display: usd((v.capAcq ? 0 : v.acq) + v.fees + v.disp), color: "#db2777" },
          ]}
        />
        <DataTable
          summary="How the payment is built"
          columns={["Step", "Amount"]}
          rows={[
            ["Negotiated price", usd(v.price)],
            ...(v.capAcq && v.acq > 0 ? [["+ Acquisition fee rolled in", usd(v.acq)]] : []),
            ...(l.equity < 0 ? [["+ Negative equity rolled in", usd(-l.equity)]] : []),
            ["= Gross capitalized cost", usd(l.grossCap)],
            ["− Cap cost reductions (cash, trade-in equity, rebates)", usd(l.capReduction)],
            ["= Adjusted capitalized cost", usd(l.adjustedCap)],
            [`− Residual value (${v.residual}% of MSRP)`, usd(l.residual)],
            [`= Depreciation ÷ ${months} months`, usd(l.depreciation, true)],
            [`Rent charge: (${usd(l.adjustedCap)} + ${usd(l.residual)}) × ${v.mf}`, usd(l.rentCharge, true)],
            ["Base payment", usd(l.basePayment, true)],
            ["Sales tax each month", usd(l.monthlyTax, true)],
            ["Monthly payment", usd(l.payment, true)],
          ]}
        />
      </ResultCard>

      <ResultCard title="Lease or buy?" sub={`Over the same ${months} months, buying with a ${v.loanTerm}-month loan at ${v.loanApr}%.`}>
        <Facts
          items={[
            { label: "Lease: total cost", value: usd(l.totalCost) },
            { label: "Buy: loan payment", value: usd(c.loan.payment, true) },
            { label: `Buy: cash paid in ${months} months`, value: usd(c.buyPaidByLeaseEnd) },
            { label: "Buy: loan still owed then", value: usd(c.owedAtLeaseEnd) },
            { label: "Buy: car worth about", value: usd(c.carValue) },
            { label: "Buy: net cost", value: usd(c.buyNetCost) },
          ]}
        />
        <Callout tone={leaseCheaper ? "good" : "info"} title={leaseCheaper ? `Leasing costs about ${usd(-c.leaseExtra)} less over ${months} months` : `Buying costs about ${usd(c.leaseExtra)} less over ${months} months`}>
          {leaseCheaper
            ? "Mostly because you pay sales tax only on the part of the car you use, and the loan's interest is on the whole price. Buying wins the longer you keep the car after the loan is paid off."
            : "Buying builds equity: the car is worth more than you still owe. The gap grows the longer you keep the car after the loan is paid off."}{" "}
          The buying payment is {usd(c.loan.payment, true)}, against {usd(l.payment, true)} to lease.
        </Callout>
      </ResultCard>

      <ResultCard title="What cash down does" sub="The same lease with different amounts down.">
        <Compare
          head={["Cash down · monthly payment", "Total lease cost"]}
          rows={downs.map(({ d, r }) => ({
            label: `${usd(d)} down · ${usd(r.payment, true)} a month`,
            value: usd(r.totalCost),
            bar: r.totalCost / maxDownCost,
            current: d === v.down,
          }))}
        />
        <Callout title="Keep the down payment small">
          Cash down lowers the payment but barely changes the total, and if the car is stolen or written off early, the insurer pays the leasing company, not you: the down payment
          is usually lost. Gap coverage, often built into leases, does not refund it.
        </Callout>
      </ResultCard>

      {residualAbove && (
        <Callout tone="warn" title="The residual is above the adjusted cap cost">
          With this much paid down, there is no depreciation left to pay. Check the figures: real leases rarely look like this.
        </Callout>
      )}
      {priceOverMsrp && (
        <Callout tone="warn" title="The price is above MSRP">
          You are paying more than the sticker price. On a lease every dollar over MSRP is pure depreciation you pay for. Try negotiating, or compare another dealer.
        </Callout>
      )}

      <p className="footnote" style={{ textAlign: "center" }}>
        An estimate, not a lease offer. The lease contract&apos;s federal Consumer Leasing Act disclosure shows the exact figures.
      </p>
    </Studio>
  );
}
