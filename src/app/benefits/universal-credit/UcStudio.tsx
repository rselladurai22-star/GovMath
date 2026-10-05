"use client";

import { UC_2026, universalCredit2026, type CapArea, type Health, type Tenure, type UcInput } from "@/lib/benefits/uc-engine";
import { LHA_AREAS, LHA_AREAS_BY_NATION, LHA_DEFAULT_AREA, lhaMonthly, lhaNation, weeklyToMonthly, type LhaCategory } from "@/lib/benefits/lha-engine";
import { SCOTLAND_AREA_COVERS } from "@/lib/benefits/lha-scotland-wales";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, SelectField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Facts, ResultCard, Statement } from "@/components/flagship/results";
import { gbp, gbpShort } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, text, useStudio, type Query } from "@/components/flagship/useStudio";

const axis = (n: number) => (n >= 10_000 ? gbpShort(n) : gbp(Math.round(n / 10) * 10));
const neg = (n: number): string => (n > 0.005 ? `−${gbp(n, true)}` : gbp(0, true));

const SCHEMA = {
  couple: bool(false),
  over25: bool(true),
  children: num(0, 0, 12),
  tenure: oneOf<Tenure>("private", ["none", "private", "social", "mortgage"]),
  rent: num(900, 0, 20_000),
  earnings: num(0, 0, 50_000),
  area: text("Bristol", 60),
  lhaCat: oneOf<"auto" | LhaCategory>("auto", ["auto", "shared", "1", "2", "3", "4"]),
  under35: bool(false),
  lhaManual: num(0, 0, 2_000),
  pre2017: bool(false),
  disLower: num(0, 0, 10),
  disHigher: num(0, 0, 10),
  health: oneOf<Health>("none", ["none", "lcw", "lcwra-new", "lcwra-protected"]),
  carer: bool(false),
  spare: num(0, 0, 4),
  nondeps: num(0, 0, 6),
  childcare: num(0, 0, 10_000),
  other: num(0, 0, 50_000),
  capital: num(0, 0, 1_000_000),
  london: bool(false),
  capExempt: bool(false),
  otherBen: num(0, 0, 10_000),
};
const ADVANCED = ["area", "lhaCat", "under35", "lhaManual", "pre2017", "disLower", "disHigher", "health", "carer", "spare", "nondeps", "childcare", "other", "capital", "london", "capExempt", "otherBen"] as const;
const POINTS = 31;

function autoCategory(couple: boolean, children: number, under35: boolean): LhaCategory {
  if (!couple && children === 0 && under35) return "shared";
  return String(Math.min(4, 1 + Math.ceil(children / 2))) as LhaCategory;
}

export default function UcStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const category = v.lhaCat === "auto" ? autoCategory(v.couple, v.children, v.under35) : v.lhaCat;
  const areaKnown = LHA_AREAS.includes(v.area);
  const area = areaKnown ? v.area : "Bristol";
  const nation = lhaNation(area);
  // Universal Credit's own monthly LHA rate, or the weekly rate you entered converted to monthly.
  const lhaMonthlyRate = v.lhaManual > 0 ? weeklyToMonthly(v.lhaManual) : areaKnown ? lhaMonthly(v.area, category) : 0;
  const input: UcInput = {
    couple: v.couple,
    over25: v.over25,
    children: v.children,
    firstBornPre2017: v.pre2017,
    disabledLower: v.disLower,
    disabledHigher: v.disHigher,
    health: v.health,
    carer: v.carer,
    tenure: v.tenure,
    rent: v.rent,
    lhaMonthly: lhaMonthlyRate,
    spareBedrooms: v.spare,
    nonDependants: v.nondeps,
    childcare: v.childcare,
    earnings: v.earnings,
    otherIncome: v.other,
    capital: v.capital,
    capArea: (v.london ? "london" : "elsewhere") as CapArea,
    capExemptBenefit: v.capExempt,
    otherCappedBenefits: v.otherBen,
    includeChildBenefit: true,
  };
  const r = universalCredit2026(input);
  const top = Math.max(3000, Math.ceil(r.breakEvenEarnings / 500) * 500 + 500);
  const levels = Array.from({ length: POINTS }, (_, i) => (top * i) / (POINTS - 1));
  const curve = levels.map((e) => universalCredit2026({ ...input, earnings: e }).award);
  const deductions = r.earningsDeduction + r.otherIncomeDeduction + r.capitalDeduction;

  return (
    <Studio
      title="Your household"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Work out my Universal Credit"
      onReset={st.reset}
      dock={{ label: "Universal Credit a month", value: gbp(r.award, true) }}
      inputs={
        <>
          <InputGroup title="Who lives with you">
            <Segmented
              label="Claiming as"
              value={v.couple ? "couple" : "single"}
              onChange={(x) => st.set("couple", x === "couple")}
              options={[
                { value: "single", label: "Single" },
                { value: "couple", label: "Couple", note: "Couples living together must claim jointly." },
              ]}
            />
            <Switch label={v.couple ? "At least one of you is 25 or over" : "I am 25 or over"} checked={v.over25} onChange={st.bind("over25")} />
            <StepperField label="Children you are responsible for" value={v.children} onChange={(n) => st.set("children", Math.round(n))} step={1} min={0} max={12} unit="children" dp={0} hint="Under 16, or under 20 in approved education. Every child counts from April 2026." />
          </InputGroup>
          <InputGroup title="Housing and work">
            <SelectField
              label="Your home"
              value={v.tenure}
              onChange={st.bind("tenure")}
              options={[
                { value: "private", label: "Renting privately" },
                { value: "social", label: "Renting from a council or housing association" },
                { value: "mortgage", label: "Own with a mortgage" },
                { value: "none", label: "Live with family or no rent" },
              ]}
            />
            {(v.tenure === "private" || v.tenure === "social") && <MoneyField label="Rent a month" value={v.rent} onChange={st.bind("rent")} hint="Including eligible service charges, not bills such as energy or water." />}
            <MoneyField label="Take-home pay a month" value={v.earnings} onChange={st.bind("earnings")} slider={{ min: 0, max: 4_000, step: 50, ends: ["£0", "£4k"] }} hint={v.couple ? "Both of you together, after tax, NI and pension." : "After tax, NI and pension."} />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            {v.tenure === "private" && (
              <>
                <Segmented
                  label="Country"
                  value={nation}
                  onChange={(n) => st.set("area", LHA_DEFAULT_AREA[n])}
                  optional
                  options={[
                    { value: "england", label: "England" },
                    { value: "scotland", label: "Scotland" },
                    { value: "wales", label: "Wales" },
                  ]}
                />
                <SelectField
                  label="Your area"
                  value={area}
                  onChange={st.bind("area")}
                  optional
                  options={LHA_AREAS_BY_NATION[nation].map((a) => ({ value: a, label: SCOTLAND_AREA_COVERS[a] ? `${a} (${SCOTLAND_AREA_COVERS[a]})` : a }))}
                  hint="Your Broad Rental Market Area sets your Local Housing Allowance."
                />
                <SelectField
                  label="Bedrooms allowed"
                  value={v.lhaCat}
                  onChange={st.bind("lhaCat")}
                  optional
                  options={[
                    { value: "auto", label: `Work it out (${category === "shared" ? "shared" : `${category} bed`})` },
                    { value: "shared", label: "Shared accommodation rate" },
                    { value: "1", label: "1 bedroom" },
                    { value: "2", label: "2 bedrooms" },
                    { value: "3", label: "3 bedrooms" },
                    { value: "4", label: "4 bedrooms" },
                  ]}
                  hint="The Local Housing Allowance calculator works this out exactly from your children's ages."
                />
                {!v.couple && v.children === 0 && <Switch label="I am under 35" checked={v.under35} onChange={st.bind("under35")} optional hint="Single people under 35 usually get the lower shared accommodation rate." />}
                <MoneyField label="Or enter your weekly LHA rate" value={v.lhaManual} onChange={st.bind("lhaManual")} pence optional hint="To use a figure from your council instead." />
              </>
            )}
            {v.tenure === "social" && <StepperField label="Spare bedrooms" value={v.spare} onChange={(n) => st.set("spare", Math.round(n))} step={1} min={0} max={4} unit="rooms" dp={0} optional hint="The removal of the spare room subsidy cuts housing help by 14% for one, 25% for two or more." />}
            {(v.tenure === "private" || v.tenure === "social") && <StepperField label="Other adults living with you" value={v.nondeps} onChange={(n) => st.set("nondeps", Math.round(n))} step={1} min={0} max={6} unit="adults" dp={0} optional hint={`Such as grown-up children. Each usually reduces housing help by ${gbp(UC_2026.nonDependant, true)} a month.`} />}
            {v.children > 0 && <Switch label="Eldest child born before 6 April 2017" checked={v.pre2017} onChange={st.bind("pre2017")} optional hint="Gives a higher first-child rate." />}
            {v.children > 0 && <StepperField label="Children getting DLA or PIP (lower addition)" value={v.disLower} onChange={(n) => st.set("disLower", Math.round(n))} step={1} min={0} max={10} unit="children" dp={0} optional />}
            {v.children > 0 && <StepperField label="Children on the highest DLA care rate, enhanced PIP daily living, or blind" value={v.disHigher} onChange={(n) => st.set("disHigher", Math.round(n))} step={1} min={0} max={10} unit="children" dp={0} optional />}
            {v.children > 0 && <MoneyField label="Childcare costs a month" value={v.childcare} onChange={st.bind("childcare")} optional hint="Paid to a registered provider. Universal Credit pays back 85%, up to a limit, if you work." />}
            <SelectField
              label="Health condition affecting work"
              value={v.health}
              onChange={st.bind("health")}
              optional
              options={[
                { value: "none", label: "None" },
                { value: "lcwra-new", label: "Limited capability for work and work-related activity (new claim)" },
                { value: "lcwra-protected", label: "LCWRA: claim before April 2026, severe condition or terminally ill" },
                { value: "lcw", label: "Limited capability for work (claim before April 2017)" },
              ]}
            />
            <Switch label="Caring for a disabled person 35+ hours a week" checked={v.carer} onChange={st.bind("carer")} optional hint="For someone getting a qualifying disability benefit." />
            <MoneyField label="Other income a month" value={v.other} onChange={st.bind("other")} optional hint="Pensions, New Style JSA or ESA, and similar. Taken off in full. Child maintenance is ignored." />
            <MoneyField label="Savings and investments" value={v.capital} onChange={st.bind("capital")} optional hint="Over £6,000 reduces the award; over £16,000 you cannot claim." />
            <Switch label="Live in Greater London" checked={v.london} onChange={st.bind("london")} optional hint="For the benefit cap." />
            <Switch label="Someone gets PIP, DLA, Attendance Allowance or Carer's Allowance" checked={v.capExempt} onChange={st.bind("capExempt")} optional hint="This makes you exempt from the benefit cap." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Universal Credit a month"
        value={gbp(r.award, true)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          r.capitalTooHigh ? (
            <>With savings over £16,000 you cannot get Universal Credit.</>
          ) : r.award <= 0 ? (
            <>
              Your income is too high for Universal Credit at the moment. Your maximum award is <b>{gbp(r.maximum, true)}</b> but deductions of <b>{gbp(deductions, true)}</b> take it to
              nothing.
            </>
          ) : (
            <>
              Your maximum award is <b>{gbp(r.maximum, true)}</b> a month. {r.earningsDeduction > 0 ? <>Earnings reduce it by <b>{gbp(r.earningsDeduction, true)}</b>. </> : null}
              {r.capReduction > 0 ? <>The benefit cap takes off <b>{gbp(r.capReduction, true)}</b>. </> : null}
              You would get about <b>{gbp(r.award, true)}</b> a month, or <b>{gbp(r.award * 12)}</b> a year.
            </>
          )
        }
        badges={[`${gbp(r.maximum, true)} maximum`, r.workAllowance > 0 ? `${gbp(r.workAllowance)} work allowance` : "No work allowance", r.capApplies ? "Benefit cap applies" : r.capExempt ? "Exempt from the cap" : "Under the cap"]}
      />

      <Facts
        items={[
          { label: "Maximum award", value: gbp(r.maximum, true) },
          { label: "Taken off", value: gbp(deductions + r.capReduction, true), tone: "warn" },
          { label: "Housing element", value: gbp(r.housing, true), note: r.housingShortfall > 0 && v.tenure !== "none" ? `${gbp(r.housingShortfall, true)} rent not covered` : undefined },
          { label: "Universal Credit", value: gbp(r.award, true), tone: r.award > 0 ? "good" : undefined },
        ]}
      />

      <Assumptions
        items={[
          { label: "Rates", value: "2026/27, monthly" },
          { label: "Housing", value: v.tenure === "private" ? (lhaMonthlyRate > 0 ? `LHA ${gbp(lhaMonthlyRate, true)} a month (${category === "shared" ? "shared" : `${category} bed`})` : "No LHA rate found") : v.tenure === "social" ? "Social rent" : "No housing costs" },
          { label: "Earnings", value: `${gbp(v.earnings)} a month after tax` },
          { label: "Child Benefit", value: "Counted towards the cap only" },
        ]}
      />

      <ResultCard title="How your award is worked out" sub="Elements added together, then deductions.">
        <Statement
          columns={["A month"]}
          rows={[
            ...r.elements.map((e) => ({ label: e.label, values: [gbp(e.amount, true)] })),
            { label: "Maximum award", values: [gbp(r.maximum, true)], kind: "total" as const },
            ...(r.earningsDeduction > 0
              ? [{ label: `55% of earnings above ${r.workAllowance > 0 ? `the ${gbp(r.workAllowance)} work allowance` : "£0"}`, values: [neg(r.earningsDeduction)], kind: "deduction" as const }]
              : []),
            ...(r.otherIncomeDeduction > 0 ? [{ label: "Other income", values: [neg(r.otherIncomeDeduction)], kind: "deduction" as const }] : []),
            ...(r.capitalDeduction > 0 ? [{ label: "Assumed income from savings", values: [neg(r.capitalDeduction)], kind: "deduction" as const }] : []),
            ...(r.capReduction > 0 ? [{ label: "Benefit cap", values: [neg(r.capReduction)], kind: "deduction" as const }] : []),
            { label: "Universal Credit", values: [gbp(r.award, true)], kind: "total" as const },
          ]}
        />
      </ResultCard>

      {!r.capitalTooHigh && r.maximum > 0 && (
        <ResultCard title="Universal Credit at different earnings" sub="Take-home pay a month on the bottom axis.">
          <AreaChart
            ariaLabel="Universal Credit award by monthly take-home pay"
            series={[{ key: "uc", label: "Universal Credit", color: "#5b1e6e", values: curve, fill: true }]}
            xLabel={(i) => gbpShort(levels[i] ?? 0)}
            yFormat={axis}
            initial={Math.min(POINTS - 1, Math.round((v.earnings / top) * (POINTS - 1)))}
            hint="Drag across the chart, or use the arrow keys, to read any level of pay."
            readout={(i) => (
              <>
                Take-home pay <b>{gbp(levels[i] ?? 0)}</b>: Universal Credit <b>{gbp(curve[i] ?? 0, true)}</b>, total <b>{gbp((levels[i] ?? 0) + (curve[i] ?? 0))}</b> a month.
              </>
            )}
          />
          {r.breakEvenEarnings > 0 && (
            <p className="footnote" style={{ marginTop: "0.9rem" }}>
              Universal Credit stops at about {gbp(r.breakEvenEarnings)} a month of take-home pay for your household.
            </p>
          )}
        </ResultCard>
      )}

      <ResultCard title="Worth knowing" sub="Things that affect your claim.">
        {r.capApplies && (
          <Callout tone="warn" title={`The benefit cap reduces your award by ${gbp(r.capReduction, true)}`}>
            The cap is {gbp(r.capMonthly, true)} a month for your household. Earning {gbp(881)} a month or more after tax, or someone getting a disability or carer&apos;s benefit, would
            remove it.
          </Callout>
        )}
        {r.housingShortfall > 0 && (v.tenure === "private" || v.tenure === "social") && (
          <Callout tone="warn" title={`${gbp(r.housingShortfall, true)} of your rent is not covered`}>
            {v.tenure === "private"
              ? "Private rents are limited to the Local Housing Allowance for your area and household size. Your council may help with a Discretionary Housing Payment."
              : "Spare bedrooms or other adults in the home reduce the help. A Discretionary Housing Payment from your council may help."}
          </Callout>
        )}
        {v.capital > 6000 && !r.capitalTooHigh && (
          <Callout title="Savings over £6,000">
            Each £250 (or part) between £6,000 and £16,000 is treated as £4.35 a month of income, so your savings reduce your award by {gbp(r.capitalDeduction, true)} a month.
          </Callout>
        )}
        {v.health === "lcwra-new" && (
          <Callout title="Lower health element for new claims">
            From 6 April 2026, new claims get a health element of {gbp(UC_2026.lcwraNew, true)} a month. Claims assessed before then keep {gbp(UC_2026.lcwraProtected, true)}, as do people
            meeting the severe conditions criteria or who are terminally ill.
          </Callout>
        )}
        <Callout title="Paid monthly, in arrears">
          Your first payment usually arrives about five weeks after you claim. You can ask for an advance, repaid from later payments.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        2026/27 rates. An estimate, not a decision on your claim. Not financial advice.
      </p>
    </Studio>
  );
}
