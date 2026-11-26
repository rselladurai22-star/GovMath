"use client";

import Link from "next/link";
import { HouseholdFields, MEANS_ADVANCED, MEANS_SCHEMA, MeansAdvancedFields, meansFrom } from "@/components/benefits/MeansFields";
import MeansStatement, { type MeansStep } from "@/components/benefits/MeansStatement";
import { Caveat, Flag, Foot, Inputs, Tool } from "@/components/calc/kit";
import { Mini, Pills } from "@/components/calc/fields";
import { AdvancedOptions, SelectField, Switch } from "@/components/flagship/inputs";
import { gbp } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, text, useStudio, type Query } from "@/components/flagship/useStudio";
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
  /** Working age, already getting Housing Benefit (an existing claim). */
  existing: bool(false),
};
const MORE = [...MEANS_ADVANCED, "ineligible", "spare", "lhaOwn"] as const;
const CATS: { value: LhaCategory; label: string }[] = [
  { value: "shared", label: "Shared accommodation rate" },
  { value: "1", label: "1 bedroom" },
  { value: "2", label: "2 bedrooms" },
  { value: "3", label: "3 bedrooms" },
  { value: "4", label: "4 bedrooms" },
];
const NATIONS = [
  { value: "england" as const, label: "England" },
  { value: "scotland" as const, label: "Scotland" },
  { value: "wales" as const, label: "Wales" },
  { value: "ni" as const, label: "Northern Ireland" },
];
const monthly = (weekly: number) => (weekly * 52) / 12;

export default function HbStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const pension = v.age === "pension";
  const canClaim = pension || v.landlord === "supported" || v.existing;
  const area = LHA_AREAS.includes(v.area) ? v.area : "Bristol";
  const nation = lhaNation(area);
  const weeklyRent = v.period === "week" ? v.rent : (v.rent * 12) / 52;
  const input = { ...meansFrom(v), landlord: v.landlord, rent: weeklyRent, ineligible: v.ineligible, lhaArea: area, lhaCategory: v.cat, lhaOverride: v.lhaOwn, spareRooms: v.spare };
  const r = housingBenefit(input);
  const w = (n: number) => gbp(n, true);
  const rentLeft = Math.max(0, weeklyRent - Math.max(0, v.ineligible));

  const steps: MeansStep[] = [
    { label: "Charges in the rent it does not cover", note: "Heating, hot water, lighting, meals and similar", cut: Math.min(weeklyRent, Math.max(0, v.ineligible)) },
    { label: "Limited to your Local Housing Allowance", note: r.lhaRate !== null ? `${w(r.lhaRate)} a week for ${CATS.find((c) => c.value === v.cat)?.label.toLowerCase()}` : undefined, cut: r.lhaRate !== null ? Math.max(0, rentLeft - r.eligibleRent) : 0 },
    { label: `Spare bedroom cut, ${v.spare >= 2 ? 25 : 14}%`, note: "Working-age social tenants only", cut: r.spareRoomCut },
    { label: "For other adults living with you", note: `${Math.round(v.nondeps)} non-dependant deduction${v.nondeps === 1 ? "" : "s"}`, cut: r.nonDepDeduction },
    { label: `65% of income above your applicable amount`, note: `Income ${w(r.income)} a week against ${w(r.applicableAmount)}`, cut: r.overCapital ? 0 : r.taperCut },
    { label: "Savings over £16,000", note: "Without Guarantee Credit, nothing is paid", cut: r.overCapital ? r.maximum : 0 },
    { label: "Under 50p a week is not paid", cut: !r.overCapital && r.weekly === 0 && r.maximum - r.taperCut > 0 ? r.maximum - r.taperCut : 0 },
  ];

  return (
    <Tool label="Housing Benefit calculator">
      <div className="sa-hb">
        <div className="sa-hb-route">
          <Inputs tone="plain">
            <div className="sa-hb-routeq">
              <Pills
                label="Who is claiming"
                value={v.age}
                onChange={st.bind("age")}
                options={[
                  { value: "pension", label: "State Pension age" },
                  { value: "working", label: "Working age" },
                ]}
              />
              <Pills
                label="Your home"
                value={v.landlord}
                onChange={st.bind("landlord")}
                options={[
                  { value: "social", label: "Council or HA" },
                  { value: "private", label: "Private" },
                  { value: "supported", label: "Supported" },
                ]}
              />
            </div>
            <p className="sa-hb-routehint">
              {v.landlord === "supported"
                ? "Supported, sheltered or temporary housing with care, support or supervision, a refuge, or council-arranged temporary accommodation such as a B&B."
                : pension && v.couple
                  ? "A couple can make a new claim only if you have both reached State Pension age, or one of you claimed Pension Credit as a couple before 15 May 2019."
                  : pension
                    ? "Council or housing association rent is used in full; private rent is limited to the Local Housing Allowance."
                    : "Most people under State Pension age claim help with rent through Universal Credit instead."}
            </p>
          </Inputs>
        </div>

        {!canClaim ? (
          <div className="sa-hb-out">
            <p className="sa-hb-kicker">You probably need Universal Credit</p>
            <p>
              Under State Pension age you can only make a new Housing Benefit claim for supported, sheltered or temporary housing. Rent help for everyone else comes through the housing
              element of Universal Credit, which has its own rules.
            </p>
            <p className="sa-hb-outlinks">
              <Link href="/uk/benefits/universal-credit">Estimate your Universal Credit</Link>
              <Link href="/uk/benefits/local-housing-allowance">Check your Local Housing Allowance</Link>
            </p>
            <Inputs tone="plain">
              <Switch label="I already get Housing Benefit and want to check it" checked={v.existing} onChange={st.bind("existing")} hint="An existing working-age claim carries on until you move to Universal Credit." />
            </Inputs>
          </div>
        ) : (
          <>
            <div className="sa-hb-inputs">
              <Inputs tone="plain">
                <h2 className="sa-hb-h">Your rent</h2>
                <div className="sa-hb-rent">
                  <Mini label={v.period === "week" ? "Rent a week" : "Rent a month"} value={v.rent} onChange={st.bind("rent")} prefix="£" max={20_000} step={v.period === "week" ? 5 : 25} dp={2} wide hint="With service charges, but not bills you pay separately." />
                  <Pills
                    label="Paid"
                    value={v.period}
                    onChange={st.bind("period")}
                    options={[
                      { value: "month", label: "Monthly" },
                      { value: "week", label: "Weekly" },
                    ]}
                  />
                </div>
                {v.landlord === "private" && (
                  <div className="sa-hb-lha">
                    <SelectField label="Country" value={nation} onChange={(n) => st.set("area", LHA_DEFAULT_AREA[n])} options={NATIONS} />
                    <SelectField label="Local Housing Allowance area" value={area} onChange={st.bind("area")} options={LHA_AREAS_BY_NATION[nation].map((a) => ({ value: a, label: a }))} />
                    <SelectField label="Bedrooms you are allowed" value={v.cat} onChange={st.bind("cat")} options={CATS} hint={<>Not sure? The <Link href="/uk/benefits/local-housing-allowance">LHA calculator</Link> works it out.</>} />
                  </div>
                )}
                <h2 className="sa-hb-h">You and your income</h2>
                <HouseholdFields v={v} set={st.set} />
                <AdvancedOptions description="Other adults at home, disability, carers, childcare and charges in the rent." changed={st.changed([...MORE])} onReset={() => st.resetKeys([...MORE])}>
                  <MeansAdvancedFields v={v} set={st.set} />
                  <Mini label="Charges in your rent that are not covered, a week" value={v.ineligible} onChange={st.bind("ineligible")} prefix="£" max={1_000} step={1} dp={2} wide hint={`If the landlord pays your heating, DWP's set amounts are ${w(HB_2026.fuel.heating)} heating, ${w(HB_2026.fuel.hotWater)} hot water, ${w(HB_2026.fuel.lighting)} lighting and ${w(HB_2026.fuel.cooking)} cooking.`} />
                  {v.landlord === "social" && !pension && <Mini label="Spare bedrooms" value={v.spare} onChange={(n) => st.set("spare", Math.round(n))} min={0} max={3} stepper hint="Beyond what your household is allowed: 14% off for one, 25% for two or more." />}
                  {v.landlord === "private" && <Mini label="Or a weekly LHA rate from your council" value={v.lhaOwn} onChange={st.bind("lhaOwn")} prefix="£" max={2_000} step={1} dp={2} wide />}
                </AdvancedOptions>
              </Inputs>
            </div>

            <div className="sa-hb-result">
              <div className={`sa-hb-answer${r.weekly > 0 ? "" : " is-none"}`} aria-live="polite">
                <p className="sa-hb-kicker">Housing Benefit</p>
                <p className="sa-hb-big">
                  <b>{w(r.weekly)}</b> a week
                </p>
                <p className="sa-hb-sub">
                  {r.overCapital
                    ? "Savings over £16,000 rule you out, unless you get Pension Credit Guarantee Credit."
                    : r.weekly > 0
                      ? `About ${w(monthly(r.weekly))} a month. ${r.shortfall > 0.5 ? `You pay the other ${w(v.period === "week" ? r.shortfall : monthly(r.shortfall))} a ${v.period}.` : "That covers all of your rent."}`
                      : `Your income is ${w(r.excess)} a week above what the law says you need, enough to taper the award away.`}
                </p>
              </div>
              <MeansStatement
                start={weeklyRent}
                startLabel="Your rent a week"
                steps={steps}
                resultLabel="Housing Benefit a week"
                money={w}
                caption="How your Housing Benefit is worked out, week by week"
                note={
                  v.passport
                    ? "On a passport benefit, income is not checked."
                    : !r.overCapital && r.excess <= 0
                      ? `Your income of ${w(r.income)} a week is within your applicable amount of ${w(r.applicableAmount)}, so nothing is tapered.`
                      : undefined
                }
              />
            </div>
          </>
        )}

        {canClaim && pension && !v.passport && !r.overCapital && r.income < (v.couple ? HB_2026.personal.pensionCouple : HB_2026.personal.pensionSingle) && (
          <Flag title="Check Pension Credit first">
            Your income is below the {w(v.couple ? HB_2026.personal.pensionCouple : HB_2026.personal.pensionSingle)} a week that Guarantee Credit tops {v.couple ? "a couple" : "a single pensioner"} up to, so you may be missing it. It also gives you the maximum Housing Benefit with no income check. The <Link href="/uk/benefits/pension-credit">Pension Credit calculator</Link>{" "}takes two minutes.
          </Flag>
        )}

        <Foot>
          <Caveat>An estimate at 2026/27 rates under the national rules, before the benefit cap for working-age claims. Your council makes the decision and can add a Discretionary Housing Payment.</Caveat>
          <ShareButton copied={st.copied} onClick={st.share} />
        </Foot>
      </div>
    </Tool>
  );
}
