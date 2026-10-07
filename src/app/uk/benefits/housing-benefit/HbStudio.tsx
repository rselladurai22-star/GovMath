"use client";

import { HouseholdFields, MEANS_ADVANCED, MEANS_SCHEMA, MeansAdvancedFields, meansFrom } from "@/components/benefits/MeansFields";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, SelectField, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { gbp } from "@/components/flagship/format";
import { num, oneOf, ShareButton, text, useStudio, type Query } from "@/components/flagship/useStudio";
import { HB_2026, housingBenefit, type Landlord } from "@/lib/benefits/housing-support";
import { LHA_AREAS, LHA_AREAS_BY_NATION, LHA_DEFAULT_AREA, lhaNation, type LhaCategory } from "@/lib/benefits/lha-engine";

const SCHEMA = {
  ...MEANS_SCHEMA,
  landlord: oneOf<Landlord>("social", ["private", "social", "supported"]),
  area: text("Bristol", 60),
  cat: oneOf<LhaCategory>("1", ["shared", "1", "2", "3", "4"]),
  rent: num(500, 0, 20_000),
  period: oneOf<"month" | "week">("month", ["month", "week"]),
  ineligible: num(0, 0, 1_000),
  spare: num(0, 0, 3),
  lhaOwn: num(0, 0, 2_000),
};
const ADVANCED = [...MEANS_ADVANCED, "ineligible", "spare", "lhaOwn"] as const;
const CATS: { value: LhaCategory; label: string }[] = [
  { value: "shared", label: "Shared accommodation rate" },
  { value: "1", label: "1 bedroom" },
  { value: "2", label: "2 bedrooms" },
  { value: "3", label: "3 bedrooms" },
  { value: "4", label: "4 bedrooms" },
];
const monthly = (weekly: number) => (weekly * 52) / 12;

export default function HbStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const area = LHA_AREAS.includes(v.area) ? v.area : "Bristol";
  const nation = lhaNation(area);
  const weeklyRent = v.period === "week" ? v.rent : (v.rent * 12) / 52;
  const input = {
    ...meansFrom(v),
    landlord: v.landlord,
    rent: weeklyRent,
    ineligible: v.ineligible,
    lhaArea: area,
    lhaCategory: v.cat,
    lhaOverride: v.lhaOwn,
    spareRooms: v.spare,
  };
  const r = housingBenefit(input);
  const pension = v.age === "pension";
  const canClaim = pension || v.landlord === "supported";
  const inPeriod = (w: number) => (v.period === "week" ? w : monthly(w));
  const shown = (w: number) => gbp(inPeriod(w), true);
  const perLabel = v.period === "week" ? "a week" : "a month";

  // How the award falls as weekly income rises.
  const steps = [0, 25, 50, 100, 150, 200].map((extra) => {
    const x = housingBenefit({ ...input, otherIncome: input.otherIncome + extra });
    return { extra, weekly: x.weekly };
  });
  const maxStep = Math.max(1, ...steps.map((s) => s.weekly));

  return (
    <Studio
      title="Your home, household and income"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate my Housing Benefit"
      onReset={st.reset}
      dock={{ label: `Housing Benefit ${perLabel}`, value: shown(r.weekly) }}
      inputs={
        <>
          <InputGroup title="Your home">
            <Segmented
              label="Landlord"
              value={v.landlord}
              onChange={st.bind("landlord")}
              options={[
                { value: "social", label: "Council or housing association" },
                { value: "private", label: "Private landlord", note: "Private rents are limited to the Local Housing Allowance for your area." },
                { value: "supported", label: "Supported or temporary housing", note: "Supported, sheltered or temporary accommodation. Working-age people can still claim Housing Benefit for this." },
              ]}
            />
            {v.landlord === "private" && (
              <>
                <Segmented
                  label="Country"
                  value={nation}
                  onChange={(n) => st.set("area", LHA_DEFAULT_AREA[n])}
                  options={[
                    { value: "england", label: "England" },
                    { value: "scotland", label: "Scotland" },
                    { value: "wales", label: "Wales" },
                    { value: "ni", label: "Northern Ireland" },
                  ]}
                />
                <SelectField label="Local Housing Allowance area" value={area} onChange={st.bind("area")} options={LHA_AREAS_BY_NATION[nation].map((a) => ({ value: a, label: a }))} hint="Your council can confirm your area." />
                <SelectField label="Bedrooms you are allowed" value={v.cat} onChange={st.bind("cat")} options={CATS} hint={<>Not sure? Our <a href="/uk/benefits/local-housing-allowance">Local Housing Allowance calculator</a> works it out.</>} />
              </>
            )}
            <Segmented
              label="Rent is paid"
              value={v.period}
              onChange={st.bind("period")}
              options={[
                { value: "month", label: "Monthly" },
                { value: "week", label: "Weekly" },
              ]}
            />
            <MoneyField label={v.period === "week" ? "Rent a week" : "Rent a month"} value={v.rent} onChange={st.bind("rent")} hint="Including service charges. Leave out water, heating and other bills you pay separately." />
          </InputGroup>
          <InputGroup title="You and your income">
            <HouseholdFields v={v} set={st.set} />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <MeansAdvancedFields v={v} set={st.set} />
            <MoneyField label="Charges in your rent that are not covered, a week" value={v.ineligible} onChange={st.bind("ineligible")} pence optional hint="For example heating, hot water, lighting, cooking or meals included in the rent." />
            {v.landlord === "social" && !pension && (
              <StepperField label="Spare bedrooms" value={v.spare} onChange={(n) => st.set("spare", Math.round(n))} step={1} min={0} max={3} unit="bedrooms" dp={0} optional hint="Bedrooms beyond what your household is allowed. Cuts eligible rent by 14% for one, 25% for two or more." />
            )}
            {v.landlord === "private" && <MoneyField label="Or enter a weekly LHA rate" value={v.lhaOwn} onChange={st.bind("lhaOwn")} pence optional hint="A rate from your council, if you have one." />}
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={`Housing Benefit ${perLabel}`}
        value={shown(r.weekly)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          r.overCapital ? (
            <>
              Savings over <b>£16,000</b> rule you out of Housing Benefit, unless you get Pension Credit Guarantee Credit.
            </>
          ) : r.weekly > 0 ? (
            <>
              You could get about <b>{gbp(r.weekly, true)} a week</b> ({gbp(monthly(r.weekly), true)} a month) towards your rent.{" "}
              {r.shortfall > 0.5 ? (
                <>
                  That leaves <b>{shown(r.shortfall)}</b> {perLabel} for you to pay.
                </>
              ) : (
                <>That covers all of your rent.</>
              )}
            </>
          ) : (
            <>
              On these figures your income is too high for Housing Benefit: it is <b>{gbp(r.excess, true)} a week</b> above what the law says you need.
            </>
          )
        }
        badges={[pension ? "Pension age" : "Working age", v.passport ? "Passported: maximum award" : `65% taper`, r.lhaRate !== null ? `LHA ${gbp(r.lhaRate, true)} a week` : "Actual rent used"]}
      />

      <Facts
        items={[
          { label: "Eligible rent a week", value: gbp(r.eligibleRent, true) },
          { label: "Applicable amount", value: gbp(r.applicableAmount, true), note: "What the law says you need a week" },
          { label: "Income counted", value: v.passport ? "Not checked" : gbp(r.income, true) },
          { label: `You pay ${perLabel}`, value: shown(r.shortfall), tone: r.shortfall > 0.5 ? "warn" : "good" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Rates", value: "2026/27 Housing Benefit rates (DWP)" },
          { label: "Weeks", value: "Monthly figures × 12 ÷ 52" },
          { label: "Income ignored", value: "Child Benefit, child maintenance, PIP, DLA and Attendance Allowance" },
          { label: "Taper", value: "65p of each £1 above your applicable amount" },
          { label: "Benefit cap", value: "Not applied: check it separately if you are working age" },
        ]}
      />

      <ResultCard title="How it is worked out" sub="Weekly figures, as the council uses them.">
        <Statement
          columns={["A week"]}
          rows={[
            { label: "Rent", values: [gbp(weeklyRent, true)] },
            ...(v.ineligible > 0 ? [{ label: "Charges not covered", values: [`−${gbp(v.ineligible, true)}`], kind: "deduction" as const }] : []),
            ...(r.lhaRate !== null && r.eligibleRent < weeklyRent - v.ineligible ? [{ label: "Limited to the LHA rate", values: [gbp(r.lhaRate, true)] }] : []),
            ...(r.spareRoomCut > 0 ? [{ label: `Spare room cut (${v.spare >= 2 ? 25 : 14}%)`, values: [`−${gbp(r.spareRoomCut, true)}`], kind: "deduction" as const }] : []),
            { label: "Eligible rent", values: [gbp(r.eligibleRent, true)] },
            ...(r.nonDepDeduction > 0 ? [{ label: "Non-dependant deductions", values: [`−${gbp(r.nonDepDeduction, true)}`], kind: "deduction" as const }] : []),
            { label: "Maximum Housing Benefit", values: [gbp(r.maximum, true)] },
            ...(r.taperCut > 0 ? [{ label: `65% of income above ${gbp(r.applicableAmount, true)}`, values: [`−${gbp(r.taperCut, true)}`], kind: "deduction" as const }] : []),
            { label: "Housing Benefit", values: [gbp(r.weekly, true)], kind: "total" as const },
          ]}
        />
      </ResultCard>

      {weeklyRent > 0 && (
        <ResultCard title="Your rent" sub={`${shown(weeklyRent)} ${perLabel}.`}>
          <SplitBar
            segments={[
              { label: "Housing Benefit", value: inPeriod(r.weekly), display: shown(r.weekly), color: "#5b1e6e" },
              { label: "You pay", value: inPeriod(r.shortfall), display: shown(r.shortfall), color: "#f59e0b" },
            ]}
          />
        </ResultCard>
      )}

      <ResultCard title="Your applicable amount" sub="The weekly needs allowance your income is compared with.">
        <Statement
          columns={["A week"]}
          rows={[...r.lines.map((l) => ({ label: l.label, values: [gbp(l.amount, true)] })), { label: "Applicable amount", values: [gbp(r.applicableAmount, true)], kind: "total" as const }]}
        />
      </ResultCard>

      {!r.overCapital && !v.passport && (
        <ResultCard title="If your income went up" sub="Housing Benefit a week with more weekly income.">
          <Compare
            head={["Extra income a week", "Housing Benefit"]}
            rows={steps.map((s) => ({ label: s.extra === 0 ? "As now" : `+${gbp(s.extra)}`, value: `${gbp(s.weekly, true)} a week`, bar: s.weekly / maxStep, current: s.extra === 0 }))}
          />
        </ResultCard>
      )}

      <ResultCard title="Worth knowing" sub="About your claim.">
        {!canClaim && (
          <Callout tone="warn" title="You probably need Universal Credit instead">
            Most people under State Pension age cannot make a new claim for Housing Benefit. They claim help with rent through Universal Credit, unless they live in supported,
            sheltered or temporary housing. See our <a href="/uk/benefits/universal-credit">Universal Credit calculator</a>.
          </Callout>
        )}
        {v.landlord === "private" && r.lhaRate !== null && weeklyRent - v.ineligible > r.lhaRate && (
          <Callout title="Your rent is above the Local Housing Allowance">
            Housing Benefit only covers up to {gbp(r.lhaRate, true)} a week here. Your council may pay a Discretionary Housing Payment for a time.
          </Callout>
        )}
        {r.tariffIncome > 0 && (
          <Callout title="Your savings count as income">
            Your savings add {gbp(r.tariffIncome)} a week of assumed income: £1 for every £{pension ? HB_2026.capital.stepPension : HB_2026.capital.stepWorkingAge} over £
            {(pension ? HB_2026.capital.lowerPension : HB_2026.capital.lowerWorkingAge).toLocaleString("en-GB")}.
          </Callout>
        )}
        <Callout title="Claim Council Tax Reduction at the same time">
          Most councils deal with both together. See what you could get with our <a href="/uk/benefits/council-tax-reduction">Council Tax Reduction calculator</a>.
        </Callout>
        {pension && !v.passport && (
          <Callout title="Check Pension Credit too">
            Pension Credit Guarantee Credit gives you maximum Housing Benefit without an income check. Use the <a href="/uk/benefits/pension-credit">Pension Credit calculator</a>.
          </Callout>
        )}
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Rates from the DWP&rsquo;s Benefit and pension rates 2026 to 2027 and the Local Housing Allowance rates. An estimate, not a decision on your claim.
      </p>
    </Studio>
  );
}
