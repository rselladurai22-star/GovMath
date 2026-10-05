"use client";

import { rentARoomCompare, RENT_A_ROOM_ALLOWANCE } from "@/lib/property/discounts";
import { incomeTax } from "@/lib/tax/2026-27";
import { scottishIncomeTax } from "@/lib/tax/scottish-2026-27";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { gbp } from "@/components/flagship/format";
import { bool, num, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const SCHEMA = {
  rent: num(650, 0, 20_000),
  months: num(12, 1, 12),
  extras: num(0, 0, 10_000),
  expenses: num(0, 0, 200_000),
  shared: bool(false),
  income: num(35_000, 0, 10_000_000),
  scot: bool(false),
};
const ADVANCED = ["months", "extras", "expenses", "shared", "income", "scot"] as const;
const COLORS = { free: "#0f9f6e", taxed: "#f59e0b", tax: "#e11d48" };

export default function RentARoomStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const receipts = (v.rent + v.extras) * v.months;
  const taxOn = (i: number) => (v.scot ? scottishIncomeTax(i).total : incomeTax(i).total);
  const r = rentARoomCompare({ receipts, expenses: v.expenses, shared: v.shared, otherIncome: v.income }, taxOn);
  const bestTax = Math.min(r.schemeTax, r.normalTax);
  const keep = receipts - bestTax;
  const freeShare = Math.min(receipts, r.allowance);
  const method = r.best === "normal" ? "the normal method" : "Rent a Room";

  return (
    <Studio
      title="Your lodger"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Check my tax"
      onReset={st.reset}
      dock={{ label: "Tax on the rent", value: gbp(bestTax) }}
      inputs={
        <>
          <InputGroup title="The rent">
            <MoneyField label="Rent a month" value={v.rent} onChange={st.bind("rent")} big slider={{ min: 0, max: 2_000, step: 10, ends: ["£0", "£2k"] }} hint="For a furnished room in your own home." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <StepperField label="Months let this tax year" value={v.months} onChange={st.bind("months")} step={1} min={1} max={12} unit="months" dp={0} optional />
            <MoneyField label="Extra charges a month" value={v.extras} onChange={st.bind("extras")} optional hint="Meals, cleaning, laundry or bills you charge for. They count towards the limit." />
            <MoneyField label="Your costs for the room a year" value={v.expenses} onChange={st.bind("expenses")} optional hint="Only needed to compare with the normal method: a share of bills, insurance, repairs." />
            <Switch label="Someone else also gets rent from this home" checked={v.shared} onChange={st.bind("shared")} optional hint="For example a joint owner or partner. The limit halves to £3,750 each." />
            <MoneyField label="Your other income this tax year" value={v.income} onChange={st.bind("income")} optional hint="Salary, pension and so on, to work out your tax rate." />
            <Switch label="You pay Scottish Income Tax" checked={v.scot} onChange={st.bind("scot")} optional />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={r.automatic ? "Tax-free under Rent a Room" : "Tax on your rent"}
        value={r.automatic ? "£0" : gbp(bestTax)}
        unit={r.automatic ? "tax to pay" : "a year"}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          r.automatic ? (
            <>
              Your <b>{gbp(receipts)}</b> of rent this tax year is within the <b>{gbp(r.allowance)}</b> Rent a Room limit, so it is tax-free and you do not need to tell HMRC.
            </>
          ) : (
            <>
              Your <b>{gbp(receipts)}</b> of rent is over the <b>{gbp(r.allowance)}</b> limit. Using {method}, you pay about <b>{gbp(bestTax)}</b> tax and keep <b>{gbp(keep)}</b>. You
              must register for Self Assessment and report it.
            </>
          )
        }
        badges={[`${gbp(receipts)} rent a year`, `${gbp(r.allowance)} tax-free limit`, r.mustReport ? "Report on a tax return" : "Nothing to report"]}
      />

      <Facts
        items={[
          { label: "Rent this tax year", value: gbp(receipts) },
          { label: "Tax-free limit", value: gbp(r.allowance), note: v.shared ? "Halved: shared" : undefined },
          { label: "Tax to pay", value: gbp(bestTax), tone: bestTax > 0 ? "warn" : "good" },
          { label: "You keep", value: gbp(keep), tone: "good" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Room", value: "Furnished, in your main home" },
          { label: "Tax year", value: "2026/27" },
          { label: "Tax rates", value: v.scot ? "Scottish" : "England, Wales or NI" },
          { label: "Other income", value: gbp(v.income) },
        ]}
      />

      {receipts > 0 && (
        <ResultCard title="Your rent and the tax" sub="How much is tax-free under the scheme.">
          <SplitBar
            segments={[
              { label: "Tax-free", value: freeShare, display: gbp(freeShare), color: COLORS.free },
              ...(r.schemeTaxable > 0 ? [{ label: "Above the limit", value: r.schemeTaxable, display: gbp(r.schemeTaxable), color: COLORS.taxed }] : []),
            ]}
            caption={r.schemeTaxable > 0 ? <>Only the part above the limit is taxed, at your Income Tax rate.</> : <>All of it is tax-free.</>}
          />
        </ResultCard>
      )}

      {!r.automatic && (
        <ResultCard title="Rent a Room or the normal method?" sub="Over the limit you can choose whichever gives less tax.">
          <Statement
            columns={["Rent a Room", "Normal method"]}
            rows={[
              { label: "Rent received", values: [gbp(receipts), gbp(receipts)] },
              { label: "Deduct", values: [`−${gbp(r.allowance)} limit`, `−${gbp(v.expenses)} costs`], kind: "deduction" },
              { label: "Taxable", values: [gbp(r.schemeTaxable), gbp(r.normalTaxable)] },
              { label: "Tax", values: [gbp(r.schemeTax), gbp(r.normalTax)], kind: "total" },
            ]}
          />
          <Callout tone="good" title={r.best === "either" ? "Both give the same result" : `${r.best === "scheme" ? "Rent a Room" : "The normal method"} saves ${gbp(Math.abs(r.schemeTax - r.normalTax))}`}>
            {r.best === "normal"
              ? `Your costs are more than the ${gbp(r.allowance)} limit, so claiming actual expenses gives less tax. Use the normal method on your tax return.`
              : "Claim the scheme on your tax return by ticking the Rent a Room box. You cannot also claim expenses."}
          </Callout>
        </ResultCard>
      )}

      <ResultCard title="Worth knowing" sub="The rules for taking in a lodger.">
        <Callout title="It must be your main home">
          Rent a Room only applies to furnished accommodation in the home you live in. It does not cover a separate self-contained flat let unfurnished, or a home you do not live in.
        </Callout>
        <Callout title="Check your mortgage and insurance">
          Tell your lender and home insurer that you have a lodger. Most allow it, but some have conditions.
        </Callout>
        {v.months < 12 && (
          <Callout title="The limit is for the whole tax year">
            The £{RENT_A_ROOM_ALLOWANCE.toLocaleString("en-GB")} limit is not reduced if you only let the room for part of the year.
          </Callout>
        )}
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Tax year 6 April 2026 to 5 April 2027. Not tax advice.
      </p>
    </Studio>
  );
}
