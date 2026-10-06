"use client";

import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { gbp, percent } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import { carFinance, type FinanceType } from "@/lib/vehicles/car-finance";

const SCHEMA = {
  type: oneOf<FinanceType>("pcp", ["pcp", "hp"]),
  price: num(25_000, 0, 1_000_000),
  deposit: num(2_500, 0, 1_000_000),
  apr: num(9.9, 0, 50),
  months: num(48, 6, 84),
  balloon: num(9_000, 0, 1_000_000),
  fee: num(10, 0, 1_000),
};
const ADVANCED = ["fee"] as const;

export default function CarFinanceStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const base = { price: v.price, deposit: v.deposit, apr: v.apr, months: v.months, balloon: v.balloon, optionFee: v.fee };
  const r = carFinance({ ...base, type: v.type });
  const hp = carFinance({ ...base, type: "hp" });
  const pcp = carFinance({ ...base, type: "pcp" });
  const isPcp = v.type === "pcp";
  const years = v.months / 12;

  return (
    <Studio
      title="The car and the finance deal"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Work out my car finance"
      onReset={st.reset}
      dock={{ label: "A month", value: gbp(r.monthly, true) }}
      inputs={
        <>
          <InputGroup title="The deal">
            <Segmented
              label="Type of finance"
              value={v.type}
              onChange={st.bind("type")}
              options={[
                { value: "pcp", label: "PCP", note: "Lower payments, then a final balloon payment to keep the car, or hand it back." },
                { value: "hp", label: "Hire purchase", note: "Pay off the whole car over the term, then it is yours." },
              ]}
            />
            <MoneyField label="Price of the car" value={v.price} onChange={st.bind("price")} big slider={{ min: 0, max: 80_000, step: 500, ends: ["£0", "£80k"] }} />
            <MoneyField label="Deposit" value={v.deposit} onChange={st.bind("deposit")} hint="Including any part-exchange or dealer deposit contribution." />
            <StepperField label="APR" value={v.apr} onChange={st.bind("apr")} step={0.1} min={0} max={50} unit="%" dp={1} />
            <StepperField label="Length of agreement" value={v.months} onChange={(n) => st.set("months", Math.round(n))} step={6} min={6} max={84} unit="months" dp={0} />
            {isPcp && <MoneyField label="Final balloon payment (GFV)" value={v.balloon} onChange={st.bind("balloon")} hint="The guaranteed future value the lender sets, from the car's expected value and your mileage." />}
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <MoneyField label="Option to purchase fee" value={v.fee} onChange={st.bind("fee")} optional hint="A small fee, often £10, paid to take ownership at the end." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Monthly payment"
        value={gbp(r.monthly, true)}
        unit={`for ${v.months} months`}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          isPcp ? (
            <>
              You borrow <b>{gbp(r.borrowed)}</b> and pay <b>{gbp(r.monthly, true)}</b> a month. At the end you can pay <b>{gbp(r.finalPayment)}</b> to keep the car, making <b>{gbp(r.totalToOwn)}</b> in total, or hand it back
              having paid {gbp(r.totalIfReturned)}. Interest and fees cost <b>{gbp(r.interest)}</b>.
            </>
          ) : (
            <>
              You borrow <b>{gbp(r.borrowed)}</b> and pay <b>{gbp(r.monthly, true)}</b> a month for {v.months} months, then the car is yours. In total you pay <b>{gbp(r.totalToOwn)}</b>, of which <b>{gbp(r.interest)}</b> is
              interest and fees.
            </>
          )
        }
        badges={[isPcp ? "PCP" : "Hire purchase", `${percent(v.apr / 100, 1)} APR`, `${years % 1 === 0 ? years : years.toFixed(1)} years`]}
      />

      <Facts
        items={[
          { label: "Amount borrowed", value: gbp(r.borrowed) },
          { label: "Total of monthly payments", value: gbp(r.payments) },
          { label: isPcp ? "Final payment to keep it" : "Final fee", value: gbp(r.finalPayment) },
          { label: "Cost of credit", value: gbp(r.interest), tone: r.interest > 0 ? "warn" : "good" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Rate", value: `${percent(v.apr / 100, 1)} APR, fixed, with fees included in the APR` },
          { label: "Payments", value: `${v.months} equal monthly payments` },
          { label: "PCP end", value: "No excess mileage or damage charges" },
          { label: "Price", value: "Cash price, after any discounts" },
        ]}
      />

      <ResultCard title="What you pay to own the car">
        <SplitBar
          segments={[
            { label: "Price of the car", value: v.price, display: gbp(v.price), color: "#0f9f6e" },
            { label: "Interest and fees", value: Math.max(0, r.interest), display: gbp(Math.max(0, r.interest)), color: "#f59e0b" },
          ]}
        />
      </ResultCard>

      <ResultCard title="PCP or hire purchase?" sub="Same car, deposit, APR and length.">
        <Statement
          columns={["PCP", "HP"]}
          rows={[
            { label: "Monthly payment", values: [gbp(pcp.monthly, true), gbp(hp.monthly, true)] },
            { label: "Monthly payments in total", values: [gbp(pcp.payments), gbp(hp.payments)] },
            { label: "Final payment to own it", values: [gbp(pcp.finalPayment), gbp(hp.finalPayment)] },
            { label: "Cost of credit", values: [gbp(pcp.interest), gbp(hp.interest)], kind: "deduction" },
            { label: "Total to own the car", values: [gbp(pcp.totalToOwn), gbp(hp.totalToOwn)], kind: "total" },
          ]}
        />
      </ResultCard>

      <ResultCard title="Things to know">
        {isPcp && (
          <Callout title="PCP costs more if you keep the car">
            Because the balloon is not paid off until the end, you pay interest on it for the whole term. Keeping the car costs {gbp(pcp.totalToOwn - hp.totalToOwn)} more than hire purchase here.
          </Callout>
        )}
        <Callout title="Voluntary termination">
          Under both PCP and HP you can hand the car back once you have paid half of the total amount payable, with nothing more to pay if it is in good condition.
        </Callout>
        <Callout title="Older agreements and commission">
          If you had car finance between 2007 and 2024, you may be owed compensation under the FCA&rsquo;s redress scheme for undisclosed commission. Your lender should contact you; you do not need a claims firm.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        An illustration using your APR. Your lender&rsquo;s quote shows the exact payments, fees and total amount payable.
      </p>
    </Studio>
  );
}
