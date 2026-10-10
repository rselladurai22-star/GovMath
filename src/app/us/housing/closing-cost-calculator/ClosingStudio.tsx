"use client";

import { closingCosts } from "@/lib/us/estate-property";
import { propertyTaxPct, STATES } from "@/lib/us/states";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, SelectField, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, DataTable, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { percent, usd } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const SCHEMA = {
  price: num(400_000, 0, 100_000_000),
  downPct: num(10, 0, 100),
  rate: num(7.25, 0, 30),
  state: oneOf<string>("US", ["US", ...STATES.map((s) => s.code)]),
  transferPct: num(0, 0, 10),
  years: oneOf<"15" | "20" | "30">("30", ["15", "20", "30"]),
  originationPct: num(0.5, 0, 5),
  points: num(0, 0, 5),
  lenderFees: num(1_200, 0, 100_000),
  appraisal: num(650, 0, 10_000),
  titlePct: num(0.5, 0, 5),
  settlement: num(800, 0, 100_000),
  recording: num(150, 0, 100_000),
  mortgageTaxPct: num(0, 0, 5),
  inspection: num(450, 0, 10_000),
  prepaidDays: num(15, 0, 31),
  insuranceYear: num(1_800, 0, 1_000_000),
  taxMonths: num(3, 0, 12),
  insuranceMonths: num(2, 0, 12),
  sellerCredit: num(0, 0, 10_000_000),
  lenderCredit: num(0, 0, 10_000_000),
  earnest: num(0, 0, 10_000_000),
};
const ADVANCED = [
  "years",
  "originationPct",
  "points",
  "lenderFees",
  "appraisal",
  "titlePct",
  "settlement",
  "recording",
  "mortgageTaxPct",
  "inspection",
  "prepaidDays",
  "insuranceYear",
  "taxMonths",
  "insuranceMonths",
  "sellerCredit",
  "lenderCredit",
  "earnest",
] as const;

const C = { lender: "#2a78d6", services: "#1baf7a", government: "#4a3aa7", prepaids: "#eb6834", escrow: "#eda100" };
const GROUP_LABEL = { lender: "Lender fees", services: "Title and services", government: "Government fees and taxes", prepaids: "Prepaids", escrow: "Escrow deposits" } as const;
const PRICES = [200_000, 300_000, 400_000, 500_000, 750_000, 1_000_000];

export default function ClosingStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const taxPct = propertyTaxPct(v.state);
  const inputFor = (price: number) => ({
    price,
    downPct: v.downPct,
    ratePct: v.rate,
    years: Number(v.years),
    originationPct: v.originationPct,
    points: v.points,
    lenderFees: v.lenderFees,
    appraisal: v.appraisal,
    titlePct: v.titlePct,
    settlement: v.settlement,
    recording: v.recording,
    transferPct: v.transferPct,
    mortgageTaxPct: v.mortgageTaxPct,
    inspection: v.inspection,
    prepaidDays: v.prepaidDays,
    insuranceYear: v.insuranceYear,
    propertyTaxYear: (price * taxPct) / 100,
    taxMonths: v.taxMonths,
    insuranceMonths: v.insuranceMonths,
    sellerCredit: v.sellerCredit,
    lenderCredit: v.lenderCredit,
    earnest: v.earnest,
  });
  const r = closingCosts(inputFor(v.price));
  const groups = (["lender", "services", "government", "prepaids", "escrow"] as const).map((g) => ({ g, value: r[g] }));

  return (
    <Studio
      title="Your closing costs"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate my closing costs"
      onReset={st.reset}
      dock={{ label: "Cash to close", value: usd(r.cashToClose) }}
      inputs={
        <>
          <InputGroup title="The purchase">
            <MoneyField label="Home price" symbol="$" value={v.price} onChange={st.bind("price")} slider={{ min: 50_000, max: 2_000_000, step: 5_000, ends: ["$50k", "$2m"] }} />
            <StepperField label="Down payment" value={v.downPct} onChange={st.bind("downPct")} step={0.5} min={0} max={100} unit="%" dp={1} aside={usd(r.down)} />
            <StepperField label="Interest rate" value={v.rate} onChange={st.bind("rate")} step={0.125} min={0} max={30} unit="%" dp={3} info="Sets the prepaid interest. Use the rate on your Loan Estimate." />
            <SelectField
              label="State"
              value={v.state}
              onChange={st.bind("state")}
              options={[{ value: "US", label: "US average" }, ...STATES.map((s) => ({ value: s.code, label: s.name }))]}
              info={`Sets the property tax prepaid into escrow at the typical rate for ${v.state === "US" ? "the US" : "the state"} (${taxPct}% of the price a year).`}
            />
            <StepperField
              label="Transfer tax you pay"
              value={v.transferPct}
              onChange={st.bind("transferPct")}
              step={0.05}
              min={0}
              max={10}
              unit="% of price"
              dp={3}
              info="State, county and city transfer or deed taxes, and who pays them, vary by place and by contract. Many states charge none; some are split or paid by the seller. Ask your title company."
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
                { value: "20", label: "20 years" },
                { value: "30", label: "30 years" },
              ]}
            />
            <StepperField label="Origination fee" optional value={v.originationPct} onChange={st.bind("originationPct")} step={0.125} min={0} max={5} unit="% of loan" dp={3} />
            <StepperField label="Discount points" optional value={v.points} onChange={st.bind("points")} step={0.125} min={0} max={5} unit="points" dp={3} info="Each point costs 1% of the loan and buys a lower rate." />
            <MoneyField label="Other lender fees" symbol="$" optional value={v.lenderFees} onChange={st.bind("lenderFees")} info="Underwriting, processing, credit report, flood and tax service fees." />
            <MoneyField label="Appraisal" symbol="$" optional value={v.appraisal} onChange={st.bind("appraisal")} />
            <StepperField label="Title insurance" optional value={v.titlePct} onChange={st.bind("titlePct")} step={0.05} min={0} max={5} unit="% of price" dp={2} info="Lender's policy (required) and owner's policy (optional but common). Rates are set or filed by state." />
            <MoneyField label="Settlement, escrow or attorney fee" symbol="$" optional value={v.settlement} onChange={st.bind("settlement")} />
            <MoneyField label="Recording fees" symbol="$" optional value={v.recording} onChange={st.bind("recording")} />
            <StepperField label="Mortgage or intangible tax" optional value={v.mortgageTaxPct} onChange={st.bind("mortgageTaxPct")} step={0.05} min={0} max={5} unit="% of loan" dp={3} info="A few states tax the mortgage itself, such as New York's mortgage recording tax and Florida's intangible tax." />
            <MoneyField label="Home inspection" symbol="$" optional value={v.inspection} onChange={st.bind("inspection")} info="Usually paid before closing, but part of the cash you need." />
            <StepperField label="Days of prepaid interest" optional value={v.prepaidDays} onChange={(n) => st.set("prepaidDays", Math.round(n))} step={1} min={0} max={31} unit="days" dp={0} info="From the closing date to the end of the month. Closing late in the month means fewer days." />
            <MoneyField label="Homeowners insurance a year" symbol="$" optional value={v.insuranceYear} onChange={st.bind("insuranceYear")} info="The first year is usually paid at or before closing." />
            <StepperField label="Months of property tax into escrow" optional value={v.taxMonths} onChange={(n) => st.set("taxMonths", Math.round(n))} step={1} min={0} max={12} unit="months" dp={0} />
            <StepperField label="Months of insurance into escrow" optional value={v.insuranceMonths} onChange={(n) => st.set("insuranceMonths", Math.round(n))} step={1} min={0} max={12} unit="months" dp={0} />
            <MoneyField label="Seller credit" symbol="$" optional value={v.sellerCredit} onChange={st.bind("sellerCredit")} info="Seller concessions toward your costs. Loan programs cap them, often at 3% to 6% of the price." />
            <MoneyField label="Lender credit" symbol="$" optional value={v.lenderCredit} onChange={st.bind("lenderCredit")} info="Paid by the lender in exchange for a higher rate." />
            <MoneyField label="Earnest money already paid" symbol="$" optional value={v.earnest} onChange={st.bind("earnest")} />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Cash to close"
        value={usd(r.cashToClose)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            Closing costs come to <b>{usd(r.total)}</b>, {percent(r.totalPct, 1)} of the price
            {r.credits > 0 ? <>, or {usd(r.net)} after {usd(r.credits)} of credits</> : null}. With the {usd(r.down)} down payment
            {v.earnest > 0 ? <> and less the {usd(v.earnest)} earnest money already paid</> : null}, you need <b>{usd(r.cashToClose)}</b>{" "}at closing.
          </>
        }
        badges={[`Loan ${usd(r.loan)}`, `Fees ${percent(r.feesPct, 1)} of price`, `Prepaids and escrow ${usd(r.prepaids + r.escrow)}`, r.payment > 0 ? `Payment ${usd(r.payment)} P&I` : "Cash purchase"]}
      />

      <Facts
        items={[
          { label: "Closing costs", value: usd(r.total) },
          { label: "Share of the price", value: percent(r.totalPct, 2) },
          { label: "Down payment", value: usd(r.down) },
          { label: "Cash to close", value: usd(r.cashToClose), tone: "warn" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Loan", value: `${usd(r.loan)} at ${v.rate}% for ${v.years} years` },
          { label: "Fees", value: "The example amounts above; replace them with your Loan Estimate" },
          { label: "Transfer tax", value: v.transferPct > 0 ? `${v.transferPct}% of the price, paid by you` : "None paid by you" },
          { label: "Property tax", value: `${taxPct}% of the price a year, ${v.taxMonths} months into escrow` },
          { label: "Prepaid interest", value: `${v.prepaidDays} days at ${usd(r.dailyInterest, true)} a day` },
          { label: "Not included", value: "HOA transfer fees, moving costs, repairs and furniture" },
        ]}
      />

      <ResultCard title="Where the money goes" sub="Your closing costs in five groups.">
        <SplitBar segments={groups.map(({ g, value }) => ({ label: GROUP_LABEL[g], value, display: usd(value), color: C[g] }))} caption="Prepaids and escrow deposits are your own money paid in advance, not fees: they would be due anyway." />
      </ResultCard>

      <ResultCard title="Itemized" sub="Laid out roughly as on a Loan Estimate.">
        <Statement
          columns={["Amount"]}
          rows={[
            ...r.items.filter((x) => x.amount > 0).map((x) => ({ label: x.label, values: [usd(x.amount)] })),
            { label: "Closing costs", values: [usd(r.total)], kind: "total" as const },
            ...(r.credits > 0 ? [{ label: "Seller and lender credits", values: [`−${usd(r.credits)}`], kind: "deduction" as const }] : []),
            { label: "Down payment", values: [usd(r.down)] },
            ...(v.earnest > 0 ? [{ label: "Earnest money already paid", values: [`−${usd(v.earnest)}`], kind: "deduction" as const }] : []),
            { label: "Cash to close", values: [usd(r.cashToClose)], kind: "total" as const },
          ]}
        />
      </ResultCard>

      <ResultCard title="At other prices" sub="With the same down payment, rate and fee settings.">
        <DataTable
          summary="Closing costs by home price"
          columns={["Price", "Closing costs", "Share of price", "Cash to close"]}
          rows={PRICES.map((p) => {
            const x = closingCosts(inputFor(p));
            return [usd(p), usd(x.total), percent(x.totalPct, 1), usd(x.cashToClose)];
          })}
        />
      </ResultCard>

      {v.points > 0 && r.payment > 0 && (
        <Callout title="Points are prepaid interest">
          {v.points} {v.points === 1 ? "point costs" : "points cost"} {usd((r.loan * v.points) / 100)}. They pay off only if the lower rate saves more than that before you sell or refinance.
          Our refinance calculator shows the same break-even logic.
        </Callout>
      )}

      {r.totalPct > 0.05 && (
        <Callout tone="warn" title="Higher than usual">
          These costs are over 5% of the price. Compare Loan Estimates from at least three lenders, and ask the seller for a credit.
        </Callout>
      )}

      <Callout tone="warn" title="Watch for wire fraud">
        Before you wire money, call your title company or attorney on a number you already know to confirm the instructions. Scammers send fake closing emails.
      </Callout>

      <p className="footnote" style={{ textAlign: "center" }}>
        An estimate, not a Loan Estimate. Your lender must send the real figures within three business days of your application.
      </p>
    </Studio>
  );
}
