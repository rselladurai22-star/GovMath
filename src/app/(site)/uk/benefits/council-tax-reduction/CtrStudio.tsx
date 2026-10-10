"use client";

import { HouseholdFields, MEANS_ADVANCED, MEANS_SCHEMA, MeansAdvancedFields, meansFrom } from "@/components/benefits/MeansFields";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { gbp, percent } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import { councilTaxReduction, type CtrNation } from "@/lib/benefits/housing-support";

const SCHEMA = {
  ...MEANS_SCHEMA,
  nation: oneOf<CtrNation>("england", ["england", "wales", "scotland"]),
  bill: num(2_000, 0, 20_000),
  maxPct: num(80, 0, 100),
  taperPct: num(20, 0, 100),
};
const ADVANCED = [...MEANS_ADVANCED, "maxPct", "taperPct"] as const;
const NATION_LABEL: Record<CtrNation, string> = { england: "England", wales: "Wales", scotland: "Scotland" };

export default function CtrStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const input = { ...meansFrom(v), nation: v.nation, annualBill: v.bill, maxShare: v.maxPct / 100, taper: v.taperPct / 100 };
  const r = councilTaxReduction(input);
  const pension = v.age === "pension";
  const localScheme = !r.national;

  const steps = [0, 25, 50, 100, 150, 200].map((extra) => ({ extra, annual: councilTaxReduction({ ...input, otherIncome: input.otherIncome + extra }).annual }));
  const maxStep = Math.max(1, ...steps.map((s) => s.annual));

  return (
    <Studio
      title="Your bill, household and income"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate my Council Tax Reduction"
      onReset={st.reset}
      dock={{ label: "Reduction a year", value: gbp(r.annual) }}
      inputs={
        <>
          <InputGroup title="Your council tax">
            <Segmented
              label="Country"
              value={v.nation}
              onChange={st.bind("nation")}
              options={[
                { value: "england", label: "England", note: "Pensioners follow national rules. Each council sets its own scheme for working-age people." },
                { value: "wales", label: "Wales", note: "One national scheme for everyone." },
                { value: "scotland", label: "Scotland", note: "One national scheme for everyone." },
              ]}
            />
            <MoneyField
              label="Council tax bill for the year"
              value={v.bill}
              onChange={st.bind("bill")}
              hint={
                <>
                  After any discount, such as the <a href="/uk/property/single-person-discount">25% single person discount</a>. Not sure? See{" "}
                  <a href="/uk/property/council-tax-bands">council tax bands</a>.
                </>
              }
            />
          </InputGroup>
          <InputGroup title="You and your income">
            <HouseholdFields v={v} set={st.set} />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <MeansAdvancedFields v={v} set={st.set} />
            {localScheme && (
              <>
                <StepperField label="Most your council pays" value={v.maxPct} onChange={st.bind("maxPct")} step={5} min={0} max={100} unit="%" dp={0} optional hint="Many English councils cap working-age support below 100%. Check your council's scheme." />
                <StepperField label="Your council's taper" value={v.taperPct} onChange={st.bind("taperPct")} step={1} min={0} max={100} unit="%" dp={0} optional hint="How much support falls for each £1 of income above your needs. 20% is the usual figure." />
              </>
            )}
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Council Tax Reduction a year"
        value={gbp(r.annual)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          r.overCapital ? (
            <>
              Savings over <b>£16,000</b> usually rule you out, unless you get Pension Credit Guarantee Credit.
            </>
          ) : r.annual > 0.5 ? (
            <>
              You could get about <b>{gbp(r.annual)} a year</b> off your council tax ({gbp(r.weekly, true)} a week). That leaves <b>{gbp(r.leftToPay)}</b> to pay,
              about {gbp(r.leftToPay / 12)} a month.
            </>
          ) : (
            <>
              On these figures your income is too high for a reduction: it is <b>{gbp(r.excess, true)} a week</b> above what the scheme says you need.
            </>
          )
        }
        badges={[NATION_LABEL[v.nation], pension ? "Pensioner scheme" : localScheme ? "Your council's scheme" : "National scheme", `Up to ${percent(r.maxShare)} of the bill`]}
      />

      <Facts
        items={[
          { label: "Reduction a year", value: gbp(r.annual), tone: "good" },
          { label: "Left to pay a year", value: gbp(r.leftToPay), tone: r.leftToPay > 0.5 ? "warn" : undefined },
          { label: "Applicable amount", value: gbp(r.applicableAmount, true), note: "What the scheme says you need a week" },
          { label: "Income counted", value: v.passport ? "Not checked" : gbp(r.income, true) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Rules", value: r.national ? (pension ? "National pensioner scheme" : `${NATION_LABEL[v.nation]} national scheme`) : `Working-age scheme: up to ${v.maxPct}%, ${v.taperPct}% taper` },
          { label: "Needs and income", value: "2026/27 Housing Benefit rates, which the schemes follow" },
          { label: "Other adults", value: "England's 2026/27 pensioner deductions (£5.20 to £15.95 a week)" },
          { label: "Weeks", value: "Yearly bill × 7 ÷ 365" },
        ]}
        note={localScheme ? "Working-age schemes in England vary by council. Check yours for the exact rules." : undefined}
      />

      <ResultCard title="How it is worked out" sub="Weekly figures, as councils use them.">
        <Statement
          columns={["A week"]}
          rows={[
            { label: "Council tax", values: [gbp(r.weeklyBill, true)] },
            ...(r.maxShare < 1 ? [{ label: `Scheme pays up to ${percent(r.maxShare)}`, values: [gbp(r.weeklyBill * r.maxShare, true)] }] : []),
            ...(r.nonDepDeduction > 0 ? [{ label: "Non-dependant deductions", values: [`−${gbp(r.nonDepDeduction, true)}`], kind: "deduction" as const }] : []),
            { label: "Maximum reduction", values: [gbp(r.maximum, true)] },
            ...(r.taperCut > 0 ? [{ label: `${percent(r.taper)} of income above ${gbp(r.applicableAmount, true)}`, values: [`−${gbp(r.taperCut, true)}`], kind: "deduction" as const }] : []),
            { label: "Council Tax Reduction", values: [gbp(r.weekly, true)], kind: "total" as const },
          ]}
        />
      </ResultCard>

      {v.bill > 0 && (
        <ResultCard title="Your bill" sub={`${gbp(v.bill)} a year.`}>
          <SplitBar
            segments={[
              { label: "Reduction", value: r.annual, display: gbp(r.annual), color: "#5b1e6e" },
              { label: "You pay", value: r.leftToPay, display: gbp(r.leftToPay), color: "#f59e0b" },
            ]}
          />
        </ResultCard>
      )}

      {!r.overCapital && !v.passport && (
        <ResultCard title="If your income went up" sub="Reduction a year with more weekly income.">
          <Compare
            head={["Extra income a week", "Reduction a year"]}
            rows={steps.map((s) => ({ label: s.extra === 0 ? "As now" : `+${gbp(s.extra)}`, value: gbp(s.annual), bar: s.annual / maxStep, current: s.extra === 0 }))}
          />
        </ResultCard>
      )}

      <ResultCard title="Worth knowing" sub="About your claim.">
        {localScheme && (
          <Callout title="Your council's scheme may differ">
            In England each council sets its own rules for working-age people. Some pay up to 100% of the bill, others less, and some use income bands instead of a taper. Search
            &ldquo;council tax support&rdquo; and your council&rsquo;s name to check.
          </Callout>
        )}
        {v.bill > 0 && !v.couple && v.nondeps === 0 && (
          <Callout title="Living alone? Check the single person discount">
            If no other adult lives with you, you should also get <a href="/uk/property/single-person-discount">25% off your bill</a>. Apply that first, then enter the bill after
            the discount.
          </Callout>
        )}
        <Callout title="Claim Housing Benefit too">
          If you rent and are over State Pension age, or live in supported housing, see our <a href="/uk/benefits/housing-benefit">Housing Benefit calculator</a>. Councils usually
          deal with both claims together.
        </Callout>
        {pension && !v.passport && (
          <Callout title="Pension Credit means a full reduction">
            Pensioners on Pension Credit Guarantee Credit get their whole council tax paid. Check with the <a href="/uk/benefits/pension-credit">Pension Credit calculator</a>.
          </Callout>
        )}
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Based on the Council Tax Reduction rules for 2026/27 and the DWP&rsquo;s Housing Benefit rates. An estimate, not a decision on your claim.
      </p>
    </Studio>
  );
}
