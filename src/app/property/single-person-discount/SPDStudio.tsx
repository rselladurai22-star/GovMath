"use client";

import { singlePersonDiscountForDays } from "@/lib/property/discounts";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { gbp } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const SCHEMA = {
  bill: num(2_280, 0, 20_000),
  others: num(0, 0, 10),
  disregarded: bool(false),
  days: num(365, 0, 365),
  months: oneOf<"10" | "12">("10", ["10", "12"]),
};
const ADVANCED = ["disregarded", "days", "months"] as const;
const COLORS = { pay: "#5b1e6e", save: "#0f9f6e" };

export default function SPDStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const others = Math.round(v.others);
  // Everyone else disregarded: one counted adult (you) gives 25%.
  const qualifies = others === 0 || v.disregarded;
  const r = singlePersonDiscountForDays({ annualBill: v.bill, daysAlone: qualifies ? v.days : 0 });
  const n = Number(v.months);
  const fullYear = singlePersonDiscountForDays({ annualBill: v.bill, daysAlone: 365 }).discount;

  return (
    <Studio
      title="Your household"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Check my discount"
      onReset={st.reset}
      dock={{ label: "You save", value: gbp(r.discount) }}
      inputs={
        <>
          <InputGroup title="Your bill and household">
            <MoneyField label="Full council tax bill for the year" value={v.bill} onChange={st.bind("bill")} big slider={{ min: 500, max: 5_000, step: 10, ends: ["£500", "£5k"] }} hint="Before any discount. It is on your bill or council's website." />
            <StepperField label="Other adults living with you" value={v.others} onChange={st.bind("others")} step={1} min={0} max={10} unit="" dp={0} hint="People aged 18 or over who live there as their main home." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            {others > 0 && (
              <Switch
                label="They are all disregarded"
                checked={v.disregarded}
                onChange={st.bind("disregarded")}
                optional
                hint="For example full-time students, apprentices, carers or someone severely mentally impaired."
              />
            )}
            <StepperField label="Days this year you live alone" value={v.days} onChange={st.bind("days")} step={1} min={0} max={365} unit="days" dp={0} optional hint="If you started or stopped living alone part way through the year." />
            <Segmented
              label="Pay in"
              value={v.months}
              onChange={st.bind("months")}
              optional
              options={[
                { value: "10", label: "10 instalments" },
                { value: "12", label: "12 instalments" },
              ]}
            />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={qualifies ? "Your single person discount" : "No single person discount"}
        value={gbp(r.discount)}
        unit={qualifies ? "off this year" : ""}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          qualifies ? (
            <>
              25% off a <b>{gbp(v.bill)}</b> bill{r.days < 365 && <> for {r.days} days</>} saves <b>{gbp(r.discount)}</b>. You pay <b>{gbp(r.payable)}</b>, or{" "}
              <b>{gbp(r.payable / n, true)}</b> a month over {n} months.
            </>
          ) : (
            <>
              With {others} other {others === 1 ? "adult" : "adults"} counted, you do not qualify. If they are all disregarded, such as full-time students, you could save{" "}
              <b>{gbp(fullYear)}</b> a year.
            </>
          )
        }
        badges={[qualifies ? "25% discount" : "Not eligible", `${gbp(r.payable)} to pay`, `${gbp(r.discount / 12, true)} a month saved`]}
      />

      <Facts
        items={[
          { label: "Discount", value: gbp(r.discount), tone: r.discount > 0 ? "good" : undefined },
          { label: "Bill after discount", value: gbp(r.payable) },
          { label: `Monthly (×${n})`, value: gbp(r.payable / n, true) },
          { label: "Saved a month", value: gbp(r.discount / 12, true) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Bill", value: `${gbp(v.bill)} before discounts` },
          { label: "Discount", value: "25% for one counted adult" },
          { label: "Period", value: r.days === 365 ? "The full year" : `${r.days} days` },
          { label: "Year", value: "2026/27" },
        ]}
      />

      {v.bill > 0 && (
        <ResultCard title="Your bill with the discount" sub="What you pay and what you save.">
          <SplitBar
            segments={[
              { label: "You pay", value: r.payable, display: gbp(r.payable), color: COLORS.pay },
              { label: "Discount", value: r.discount, display: gbp(r.discount), color: COLORS.save },
            ]}
          />
        </ResultCard>
      )}

      <ResultCard title="Worth knowing" sub="How to claim and keep the discount.">
        <Callout title="Apply to your council">
          The discount is not automatic. Apply on your council&apos;s website. Most councils backdate it to when you started living alone, if you can show the date.
        </Callout>
        <Callout tone="warn" title="Tell the council if things change">
          If someone moves in, you must tell the council within 21 days. Councils run regular checks against other records, and penalties can apply.
        </Callout>
        <Callout title="Other help">
          You may also get Council Tax Reduction if you are on a low income, or a disabled band reduction if your home has been adapted.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        The same 25% discount applies in England, Scotland and Wales. Northern Ireland has domestic rates instead of council tax.
      </p>
    </Studio>
  );
}
