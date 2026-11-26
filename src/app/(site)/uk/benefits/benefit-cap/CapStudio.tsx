"use client";

import { BENEFIT_CAP, UC_DEFAULT_INPUT, universalCredit2026, type Health, type UcInput } from "@/lib/benefits/uc-engine";
import { childBenefitRates } from "@/lib/benefits/child-benefit";
import { housingBenefitCap } from "@/lib/benefits/benefit-cap";
import { NMW_2026 } from "@/lib/benefits/minimum-wage";
import { RatesChoice, ratesParam } from "@/components/benefits/RatesChoice";
import { Caveat, Foot, Inputs, Rows, Tool, type Row } from "@/components/calc/kit";
import { Mini, Pills } from "@/components/calc/fields";
import { AdvancedOptions, MoneyField, SelectField, Switch } from "@/components/flagship/inputs";
import { gbp } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import CapBar, { type CapPart } from "./CapBar";

type Route = "uc" | "hb";

const SCHEMA = {
  route: oneOf<Route>("uc", ["uc", "hb"]),
  couple: bool(true),
  children: num(3, 0, 12),
  rent: num(1_100, 0, 10_000),
  earnings: num(0, 0, 20_000),
  london: bool(false),
  over25: bool(true),
  pre2017: bool(false),
  disLower: num(0, 0, 10),
  health: oneOf<Health>("none", ["none", "lcw", "lcwra-new", "lcwra-protected"]),
  carer: bool(false),
  exemptBen: bool(false),
  grace: bool(false),
  newStyle: num(0, 0, 5_000),
  hbTotal: num(480, 0, 3_000),
  hbHousing: num(180, 0, 2_000),
  rates: ratesParam(),
};
const MORE = ["over25", "pre2017", "disLower", "health", "carer", "newStyle"] as const;
const LIMIT = BENEFIT_CAP.earningsExemption;
const YESNO = [
  { value: "no" as const, label: "No" },
  { value: "yes" as const, label: "Yes" },
];
/** Hours a week at the National Living Wage that reach the earnings exemption. */
const HOURS = Math.ceil(((LIMIT * 12) / 52 / NMW_2026["national-living-wage"].hourly) * 2) / 2;

export default function CapStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const next = v.rates === "2027/28";
  const isUc = v.route === "uc";
  const CB = childBenefitRates(v.rates);
  const family = v.couple || v.children > 0;
  const area = v.london ? "london" : "elsewhere";

  const household: UcInput = {
    ...UC_DEFAULT_INPUT,
    couple: v.couple,
    over25: v.over25,
    children: v.children,
    firstBornPre2017: v.pre2017,
    disabledLower: v.disLower,
    health: v.health,
    carer: v.carer,
    tenure: v.rent > 0 ? "social" : "none",
    rent: v.rent,
    earnings: v.earnings,
    otherIncome: v.newStyle,
    otherCappedBenefits: v.newStyle,
    capArea: area,
    capExemptBenefit: v.exemptBen || v.grace,
    year: v.rates,
  };
  const r = universalCredit2026(household);
  const cb = v.children > 0 ? ((CB.firstChildWeekly + (v.children - 1) * CB.additionalChildWeekly) * 52) / 12 : 0;
  // What the cap will do once the nine months are up, with nothing else changed.
  const afterGrace = universalCredit2026({ ...household, capExemptBenefit: v.exemptBen });
  const at881 = universalCredit2026({ ...household, earnings: Math.max(v.earnings, LIMIT) });
  const gainAt881 = at881.award + Math.max(v.earnings, LIMIT) - (r.award + v.earnings);

  const hb = housingBenefitCap({ household: family ? "family" : "single-no-children", location: area, weeklyBenefits: v.hbTotal, weeklyHousingBenefit: v.hbHousing });

  const earnsEnough = isUc && v.earnings >= LIMIT;
  const inAward = isUc && (v.health === "lcwra-new" || v.health === "lcwra-protected" || v.carer);
  const why = earnsEnough
    ? `Your household earns ${gbp(LIMIT)} a month or more after tax.`
    : v.exemptBen
      ? "Someone in your household gets a disability or carer benefit."
      : inAward
        ? `Your Universal Credit includes the ${v.carer ? "carer" : "health"} element.`
        : v.grace
          ? "You are in the nine-month grace period."
          : null;
  const exempt = why !== null;
  // In the grace period the sums still matter: they show what happens when it ends.
  const showSums = !exempt || (v.grace && !earnsEnough && !v.exemptBen && !inAward);
  const sums = v.grace ? afterGrace : r;

  const ucParts: CapPart[] = [
    { key: "cb", label: "Child Benefit", amount: cb, color: "#6880c8" },
    { key: "ns", label: "New Style JSA or ESA", amount: v.newStyle, color: "#d8962a" },
    { key: "uc", label: "Universal Credit", amount: Math.max(0, sums.beforeCap - sums.childcareElement), color: "var(--sa-brand-fill)" },
  ];
  const hbParts: CapPart[] = [
    { key: "other", label: "Other benefits", amount: Math.max(0, v.hbTotal - Math.min(v.hbHousing, v.hbTotal)), color: "#6880c8" },
    { key: "hb", label: "Housing Benefit", amount: Math.min(v.hbHousing, v.hbTotal), color: "var(--sa-brand-fill)" },
  ];
  const cut = isUc ? sums.capReduction : hb.weeklyReduction;
  const per = isUc ? "a month" : "a week";
  const m = (n: number) => gbp(n, true);
  const capNow = isUc ? r.capMonthly : hb.weeklyCap;
  const counted = (isUc ? ucParts : hbParts).reduce((a, p) => a + p.amount, 0);
  const rows: Row[] = isUc
    ? [
        { label: "Universal Credit before the cap", value: m(sums.beforeCap) },
        { label: "Taken off by the cap", value: cut > 0 ? `−${m(cut)}` : m(0), tone: cut > 0 ? "bad" : undefined },
        { label: "Universal Credit you are paid", value: m(sums.award), strong: true },
      ]
    : [
        { label: "Housing Benefit before the cap", value: m(Math.min(v.hbHousing, v.hbTotal)) },
        { label: "Taken off by the cap", value: cut > 0 ? `−${m(cut)}` : m(0), tone: cut > 0 ? "bad" : undefined },
        { label: "Housing Benefit you are paid", value: m(hb.housingBenefitAfter), strong: true },
      ];

  return (
    <Tool label="Benefit cap calculator">
      <div className="sa-cap">
        <div className="sa-cap-check">
          <Inputs tone="plain">
            <div className="sa-cap-route">
              <Pills
                label="Your housing costs are paid through"
                value={v.route}
                onChange={st.bind("route")}
                options={[
                  { value: "uc", label: "Universal Credit" },
                  { value: "hb", label: "Housing Benefit" },
                ]}
              />
            </div>
            <ol className="sa-cap-questions">
              {isUc && (
                <li className={earnsEnough ? "is-yes" : undefined}>
                  <p>
                    <b>Do you{v.couple ? " and your partner" : ""} take home {gbp(LIMIT)} a month or more from work?</b>
                    <span>After tax and National Insurance. About {HOURS} hours a week at the minimum wage.</span>
                  </p>
                  <Pills label={`Earning ${gbp(LIMIT)} a month or more`} hideLabel value={earnsEnough ? "yes" : "no"} onChange={(x) => st.set("earnings", x === "yes" ? Math.max(v.earnings, LIMIT) : 0)} options={YESNO} />
                </li>
              )}
              <li className={v.exemptBen ? "is-yes" : undefined}>
                <p>
                  <b>Does anyone in your household get a disability or carer benefit?</b>
                  <span>PIP, DLA, Attendance Allowance, Carer&rsquo;s Allowance, the Scottish equivalents, a war pension or Guardian&rsquo;s Allowance, for you, your partner or a child.</span>
                </p>
                <Pills label="A disability or carer benefit in the household" hideLabel value={v.exemptBen ? "yes" : "no"} onChange={(x) => st.set("exemptBen", x === "yes")} options={YESNO} />
              </li>
              <li className={v.grace ? "is-yes" : undefined}>
                <p>
                  <b>Did you stop work, or lose pay, in the last nine months?</b>
                  <span>
                    {isUc
                      ? `Only if you earned ${gbp(LIMIT)} a month or more in each of the 12 months before that.`
                      : "Only if you had worked for 50 of the 52 weeks before, and were not on Income Support, JSA or ESA while you did."}
                  </span>
                </p>
                <Pills label="Stopped work or lost pay in the last nine months" hideLabel value={v.grace ? "yes" : "no"} onChange={(x) => st.set("grace", x === "yes")} options={YESNO} />
              </li>
            </ol>
          </Inputs>
        </div>

        <div className={`sa-cap-verdict${exempt ? " is-exempt" : cut > 0 ? " is-capped" : " is-under"}`} aria-live="polite">
          {exempt ? (
            <>
              <p className="sa-cap-vhead">The cap does not apply to you</p>
              <p className="sa-cap-vsub">
                {why}
                {showSums && (cut > 0 ? ` When it ends, you would lose ${m(cut)} ${per} unless something below changes.` : " When it ends you would still be under the limit.")}
              </p>
            </>
          ) : cut > 0 ? (
            <>
              <p className="sa-cap-vhead">
                You are capped: <b>{m(cut)}</b> {per} is taken off{next ? " from April 2027" : ""}
              </p>
              <p className="sa-cap-vsub">
                Your benefits come to {m(counted)} against a limit of {m(capNow)}.
                {isUc && gainAt881 > 0 && ` Taking home ${gbp(LIMIT)} a month would lift the cap and leave you ${m(gainAt881)} a month better off.`}
                {!isUc && hb.unrecovered > 0.005 && ` Housing Benefit cannot go below 50p a week, so ${m(hb.unrecovered)} of the excess is not taken.`}
              </p>
            </>
          ) : (
            <>
              <p className="sa-cap-vhead">You are not capped</p>
              <p className="sa-cap-vsub">
                Your benefits come to {m(counted)} {per}, which is {m(Math.max(0, capNow - counted))} under your limit of {m(capNow)}.
              </p>
            </>
          )}
        </div>

        {showSums && (
          <div className="sa-cap-sums">
            <div className="sa-cap-household">
              <h2 className="sa-cap-h">Your household</h2>
              <Inputs tone="plain">
                <div className="sa-cap-fields">
                  <Pills
                    label="Claiming as"
                    value={v.couple ? "couple" : "single"}
                    onChange={(x) => st.set("couple", x === "couple")}
                    options={[
                      { value: "single", label: "Single" },
                      { value: "couple", label: "Couple" },
                    ]}
                  />
                  <Pills
                    label="Where you live"
                    value={v.london ? "london" : "elsewhere"}
                    onChange={(x) => st.set("london", x === "london")}
                    options={[
                      { value: "elsewhere", label: "Outside London" },
                      { value: "london", label: "London" },
                    ]}
                  />
                  <Mini label="Children" value={v.children} onChange={(n) => st.set("children", Math.round(n))} min={0} max={12} stepper />
                  {isUc ? (
                    <>
                      <Mini label="Rent covered by Universal Credit" value={v.rent} onChange={st.bind("rent")} prefix="£" suffix="a month" max={10_000} step={25} wide hint="Your rent, or the Local Housing Allowance if that is lower." />
                      <Mini label="Take-home pay" value={v.earnings} onChange={st.bind("earnings")} prefix="£" suffix="a month" max={20_000} step={25} wide hint={`Under ${gbp(LIMIT)} it lowers your Universal Credit but does not lift the cap.`} />
                    </>
                  ) : (
                    <>
                      <Mini label="All capped benefits" value={v.hbTotal} onChange={st.bind("hbTotal")} prefix="£" suffix="a week" max={3_000} step={5} dp={2} wide hint="Housing Benefit, Child Benefit, Child Tax Credit, Income Support, JSA and ESA." />
                      <Mini label="Of which Housing Benefit" value={v.hbHousing} onChange={st.bind("hbHousing")} prefix="£" suffix="a week" max={2_000} step={5} dp={2} wide hint="The cap is taken from this." />
                    </>
                  )}
                </div>
                <RatesChoice value={v.rates} onChange={st.bind("rates")} universalCredit={isUc} />
                {isUc && (
                  <AdvancedOptions description="Age, a disabled child, health and carer elements, New Style benefits." changed={st.changed([...MORE])} onReset={() => st.resetKeys([...MORE])}>
                    <Switch label={v.couple ? "At least one of you is 25 or over" : "I am 25 or over"} checked={v.over25} onChange={st.bind("over25")} />
                    {v.children > 0 && <Switch label="The eldest child was born before 6 April 2017" checked={v.pre2017} onChange={st.bind("pre2017")} />}
                    {v.children > 0 && (
                      <div className="sa-cap-morecount">
                        <Mini label="Children with the lower disabled child addition" value={v.disLower} onChange={(n) => st.set("disLower", Math.round(n))} min={0} max={10} stepper hint="If the child gets DLA or PIP, answer yes to the second question instead." />
                      </div>
                    )}
                    <SelectField
                      label="Health element"
                      value={v.health}
                      onChange={st.bind("health")}
                      options={[
                        { value: "none", label: "None" },
                        { value: "lcw", label: "Limited capability for work (still capped)" },
                        { value: "lcwra-new", label: "LCWRA, health claim from April 2026 (not capped)" },
                        { value: "lcwra-protected", label: "LCWRA, earlier or protected rate (not capped)" },
                      ]}
                    />
                    <Switch label="My Universal Credit includes the carer element" checked={v.carer} onChange={st.bind("carer")} hint="Lifts the cap." />
                    <MoneyField label="New Style JSA or ESA a month" value={v.newStyle} onChange={st.bind("newStyle")} hint="It counts towards the cap and comes off your Universal Credit." />
                  </AdvancedOptions>
                )}
              </Inputs>
            </div>
            <div className="sa-cap-result">
              <h2 className="sa-cap-h">{exempt ? "When the nine months end" : `What counts against your ${m(capNow)} limit`}</h2>
              <CapBar parts={isUc ? ucParts : hbParts} cap={capNow} money={m} per={per} />
              <Rows caption={isUc ? "Universal Credit before and after the cap" : "Housing Benefit before and after the cap"} rows={rows} />
            </div>
          </div>
        )}

        <Foot>
          <Caveat>
            {isUc
              ? `An estimate at ${next ? "DWP’s proposed 2027/28 Universal Credit rates; the cap itself is frozen" : "2026/27 rates"}. It takes the rent you enter as fully covered and leaves out Maternity Allowance and bereavement benefits, which also count.`
              : "Exact for the weekly figures you enter, at the 2026/27 cap. The council applies it to your Housing Benefit."}
          </Caveat>
          <ShareButton copied={st.copied} onClick={st.share} />
        </Foot>
      </div>
    </Tool>
  );
}
