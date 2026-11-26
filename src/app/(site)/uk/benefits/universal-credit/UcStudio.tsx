"use client";

import { useState, type ReactNode } from "react";
import { BENEFIT_CAP, ucChildcare, ucRates, universalCredit2026, type CapArea, type Health, type Tenure, type UcInput } from "@/lib/benefits/uc-engine";
import { LHA_AREAS, LHA_AREAS_BY_NATION, LHA_DEFAULT_AREA, lhaMonthly, lhaNation, weeklyToMonthly, type LhaCategory } from "@/lib/benefits/lha-engine";
import { SCOTLAND_AREA_COVERS } from "@/lib/benefits/lha-scotland-wales";
import { NORTHERN_IRELAND_AREA_COVERS } from "@/lib/benefits/lha-northern-ireland";
import { RatesChoice, ratesParam } from "@/components/benefits/RatesChoice";
import { Caveat, Flag, Foot, Inputs, Tool } from "@/components/calc/kit";
import { Mini } from "@/components/calc/fields";
import { MoneyField, Segmented, SelectField, Switch } from "@/components/flagship/inputs";
import { gbp } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, text, useStudio, type Query } from "@/components/flagship/useStudio";
import QuestionGroup from "./QuestionGroup";
import Statement, { type StatementLine } from "./Statement";

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
  rates: ratesParam(),
};

const GROUPS = ["you", "home", "children", "work", "savings"] as const;
type GroupKey = (typeof GROUPS)[number];
const TITLE: Record<GroupKey, string> = { you: "You", home: "Your home", children: "Children", work: "Work and other income", savings: "Savings" };
const TENURE: Record<Tenure, string> = { private: "Renting privately", social: "Renting from a council or housing association", mortgage: "Own with a mortgage", none: "No rent to pay" };
const COVERS: Record<string, string> = { ...SCOTLAND_AREA_COVERS, ...NORTHERN_IRELAND_AREA_COVERS };
const catName = (c: LhaCategory) => (c === "shared" ? "shared room" : `${c}-bedroom home`);

function autoCategory(couple: boolean, children: number, under35: boolean): LhaCategory {
  if (!couple && children === 0 && under35) return "shared";
  return String(Math.min(4, 1 + Math.ceil(children / 2))) as LhaCategory;
}

export default function UcStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  // A shared link arrives with every group answered; a fresh visit starts on the first.
  const [open, setOpen] = useState<GroupKey | null>(st.ready ? null : "you");
  const [seen, setSeen] = useState<ReadonlySet<GroupKey>>(() => new Set<GroupKey>(st.ready ? GROUPS : ["you"]));
  const show = (g: GroupKey | null) => {
    setOpen(g);
    if (g) setSeen((s) => new Set(s).add(g));
  };

  const next = v.rates === "2027/28";
  const R = ucRates(v.rates);
  const CC = ucChildcare(v.rates);
  const renting = v.tenure === "private" || v.tenure === "social";
  const category = v.lhaCat === "auto" ? autoCategory(v.couple, v.children, v.under35) : v.lhaCat;
  const areaKnown = LHA_AREAS.includes(v.area);
  const area = areaKnown ? v.area : "Bristol";
  const nation = lhaNation(area);
  // Universal Credit's own monthly LHA rate, or the weekly rate you entered converted to monthly.
  const lhaRate = v.lhaManual > 0 ? weeklyToMonthly(v.lhaManual) : areaKnown ? lhaMonthly(v.area, category) : 0;
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
    lhaMonthly: lhaRate,
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
    year: v.rates,
  };
  const r = universalCredit2026(input);
  const kids = `${v.children} ${v.children === 1 ? "child" : "children"}`;

  const summary: Record<GroupKey, string> = {
    you: [v.couple ? "Couple" : "Single", v.over25 ? "25 or over" : "under 25", v.health !== "none" ? "health element" : "", v.carer ? "carer" : ""].filter(Boolean).join(", "),
    home: renting ? `${v.tenure === "private" ? `Renting privately in ${v.lhaManual > 0 ? "your area" : area}` : "Social rent"}, ${gbp(v.rent)} a month` : TENURE[v.tenure],
    children: v.children === 0 ? "None" : `${kids}${v.childcare > 0 ? `, ${gbp(v.childcare)} childcare` : ""}`,
    work: `${v.earnings > 0 ? `${gbp(v.earnings)} take-home pay` : "Not working"}${v.other > 0 ? `, ${gbp(v.other)} other income` : ""}`,
    savings: v.capital > 0 ? gbp(v.capital) : "Under £6,000",
  };

  const noteFor: Record<string, ReactNode> = {
    standard: `${v.couple ? "Couple" : "Single"}, ${v.over25 ? "25 or over" : "under 25"}`,
    child: v.pre2017 ? `${gbp(R.child.firstPre2017, true)} for the eldest, ${gbp(R.child.each, true)} for each other child` : `${gbp(R.child.each, true)} for each child`,
    childcare: `85% of ${gbp(v.childcare)}, up to ${gbp(v.children >= 2 ? CC.maxTwoPlus : CC.maxOne, true)}`,
    housing:
      v.tenure === "private" ? (
        <>
          Rent {gbp(v.rent)}; the limit for a {catName(category)} {v.lhaManual > 0 ? "at your rate" : `in ${area}`} is {gbp(lhaRate, true)}
          {r.housingShortfall > 0.005 && <b> · {gbp(r.housingShortfall, true)} of your rent is not covered</b>}
        </>
      ) : (
        <>
          Rent {gbp(v.rent)}
          {v.spare > 0 ? `, less ${v.spare >= 2 ? "25%" : "14%"} for ${v.spare === 1 ? "a spare bedroom" : "spare bedrooms"}` : ""}
          {v.nondeps > 0 ? `, less ${gbp(R.nonDependant, true)} for each other adult` : ""}
        </>
      ),
  };
  const added: StatementLine[] = r.elements.map((e) => ({ ...e, note: noteFor[e.key] }));
  const takenOff: StatementLine[] = r.capitalTooHigh
    ? [{ key: "capital", label: "Savings over £16,000", note: "No Universal Credit is paid", amount: r.maximum }]
    : [
        ...(r.earningsDeduction > 0
          ? [{ key: "earnings", label: "Earnings", note: r.workAllowance > 0 ? `55% of take-home pay over your ${gbp(r.workAllowance)} work allowance` : "55% of all take-home pay: you have no work allowance", amount: r.earningsDeduction }]
          : []),
        ...(r.otherIncomeDeduction > 0 ? [{ key: "other", label: "Other income", note: "Taken off pound for pound", amount: r.otherIncomeDeduction }] : []),
        ...(r.capitalDeduction > 0 ? [{ key: "capital", label: "Savings", note: `${gbp(R.capital.per250, true)} for each £250, or part of £250, over £6,000`, amount: r.capitalDeduction }] : []),
      ];
  const cap: StatementLine | undefined = r.capReduction > 0 ? { key: "cap", label: "Benefit cap", note: `Your limit is ${gbp(r.capMonthly, true)} a month${v.children > 0 ? ", counting Child Benefit" : ""}`, amount: r.capReduction } : undefined;
  const wipedOut = !r.capitalTooHigh && r.award <= 0 && r.maximum > 0;

  const group = (g: GroupKey, children: ReactNode) => {
    const i = GROUPS.indexOf(g);
    const following = GROUPS[i + 1];
    return (
      <QuestionGroup
        id={`uc-${g}`}
        step={i + 1}
        title={TITLE[g]}
        summary={summary[g]}
        open={open === g}
        seen={seen.has(g)}
        onToggle={() => show(open === g ? null : g)}
        next={following ? { label: `Next: ${TITLE[following].toLowerCase()}`, onClick: () => show(following) } : { label: "Done", onClick: () => show(null) }}
      >
        {children}
      </QuestionGroup>
    );
  };
  const count = (key: "children" | "disLower" | "disHigher" | "spare" | "nondeps", label: string, max: number, hint?: string) => (
    <div className="sa-uc-count">
      <Mini label={label} value={v[key]} onChange={(n) => st.set(key, Math.round(n))} min={0} max={max} stepper hint={hint} />
    </div>
  );

  return (
    <Tool label="Universal Credit calculator">
      <div className="sa-uc">
        <p className="sa-uc-topline" aria-hidden="true">
          <span>Universal Credit{next ? " from April 2027" : ""}</span>
          <b>{gbp(r.award, true)}</b>
          <span>a month</span>
          <a href="#statement">How it is worked out</a>
        </p>

        <div className="sa-uc-questions">
          <Inputs tone="plain">
            {group(
              "you",
              <>
                <Segmented
                  label="Claiming as"
                  value={v.couple ? "couple" : "single"}
                  onChange={(x) => st.set("couple", x === "couple")}
                  options={[
                    { value: "single", label: "Single" },
                    { value: "couple", label: "Couple", note: "Couples who live together claim jointly, even if only one of you needs help." },
                  ]}
                />
                <Switch label={v.couple ? "At least one of you is 25 or over" : "I am 25 or over"} checked={v.over25} onChange={st.bind("over25")} />
                <SelectField
                  label="Health condition that limits work"
                  value={v.health}
                  onChange={st.bind("health")}
                  options={[
                    { value: "none", label: "None, or not assessed yet" },
                    { value: "lcwra-new", label: "LCWRA, health claim from April 2026" },
                    { value: "lcwra-protected", label: "LCWRA, before April 2026, severe condition or terminally ill" },
                    { value: "lcw", label: "Limited capability for work (claim before April 2017)" },
                  ]}
                  hint="Only after a work capability assessment has found limited capability for work and work-related activity (LCWRA)."
                />
                <Switch label="I care for a disabled person 35 hours a week or more" checked={v.carer} onChange={st.bind("carer")} hint="They must get a qualifying disability benefit, such as PIP daily living or Attendance Allowance." />
                <Switch
                  label="Someone at home gets PIP, DLA, Attendance Allowance or Carer’s Allowance"
                  checked={v.capExempt}
                  onChange={st.bind("capExempt")}
                  hint="You, your partner or a child. It lifts the benefit cap."
                />
              </>,
            )}
            {group(
              "home",
              <>
                <SelectField label="Your home" value={v.tenure} onChange={st.bind("tenure")} options={(["private", "social", "mortgage", "none"] as const).map((t) => ({ value: t, label: TENURE[t] }))} />
                {renting && <MoneyField label="Rent a month" value={v.rent} onChange={st.bind("rent")} hint="With service charges you must pay, but not energy, water or council tax." />}
                {v.tenure === "private" && (
                  <>
                    <SelectField
                      label="Country"
                      value={nation}
                      onChange={(x) => st.set("area", LHA_DEFAULT_AREA[x])}
                      options={[
                        { value: "england", label: "England" },
                        { value: "scotland", label: "Scotland" },
                        { value: "wales", label: "Wales" },
                        { value: "ni", label: "Northern Ireland" },
                      ]}
                    />
                    <SelectField
                      label="Rental market area"
                      value={area}
                      onChange={st.bind("area")}
                      options={LHA_AREAS_BY_NATION[nation].map((a) => ({ value: a, label: COVERS[a] ? `${a} (${COVERS[a]})` : a }))}
                      hint="The Broad Rental Market Area your home is in. It sets the most rent Universal Credit will cover."
                    />
                    {!v.couple && v.children === 0 && <Switch label="I am under 35" checked={v.under35} onChange={st.bind("under35")} hint="Single renters under 35 are usually limited to the rate for a room in a shared house." />}
                    <SelectField
                      label="Bedrooms you are allowed"
                      value={v.lhaCat}
                      onChange={st.bind("lhaCat")}
                      options={[
                        { value: "auto", label: `Estimate for me (${catName(category)})` },
                        { value: "shared", label: "Shared room rate" },
                        { value: "1", label: "1 bedroom" },
                        { value: "2", label: "2 bedrooms" },
                        { value: "3", label: "3 bedrooms" },
                        { value: "4", label: "4 bedrooms" },
                      ]}
                      hint="The estimate allows one room for you and one for every two children. The Local Housing Allowance calculator works it out from their ages."
                    />
                    <MoneyField label="Or your own weekly LHA rate" value={v.lhaManual} onChange={st.bind("lhaManual")} pence optional hint="If your council has given you a figure." />
                  </>
                )}
                {v.tenure === "social" && count("spare", "Spare bedrooms", 4, "Working-age social tenants lose 14% of the rent for one spare room and 25% for two or more.")}
                {renting && count("nondeps", "Other adults aged 21 or over", 6, `Such as a grown-up child. Each one usually takes ${gbp(R.nonDependant, true)} a month off your housing help.`)}
                <Switch label="I live in Greater London" checked={v.london} onChange={st.bind("london")} hint="The benefit cap is higher in London." />
              </>,
            )}
            {group(
              "children",
              <>
                {count("children", "Children who live with you", 12, "Under 16, or under 20 and still in school or college. Every child counts since April 2026.")}
                {v.children > 0 && (
                  <>
                    <Switch label="The eldest was born before 6 April 2017" checked={v.pre2017} onChange={st.bind("pre2017")} hint="Pays a higher amount for that child." />
                    {count("disLower", "Children on DLA or PIP", 10, "Any rate, apart from those you count on the next line.")}
                    {count("disHigher", "Children on the highest rate of care, or blind", 10, "DLA highest care, PIP enhanced daily living, or registered blind.")}
                    <MoneyField
                      label="Childcare you pay for a month"
                      value={v.childcare}
                      onChange={st.bind("childcare")}
                      hint={v.couple ? "Registered childcare. Only added if you both work." : "Registered childcare. Only added while you work."}
                    />
                  </>
                )}
              </>,
            )}
            {group(
              "work",
              <>
                <MoneyField
                  label="Take-home pay a month"
                  value={v.earnings}
                  onChange={st.bind("earnings")}
                  slider={{ min: 0, max: 4_000, step: 50, ends: ["£0", "£4,000"] }}
                  hint={v.couple ? "Both of you together, after tax, National Insurance and pension contributions." : "After tax, National Insurance and pension contributions."}
                />
                <MoneyField label="Other income a month" value={v.other} onChange={st.bind("other")} hint="Pensions, New Style JSA or ESA, Carer’s Allowance, maternity allowance. Leave out Child Benefit, PIP and child maintenance." />
              </>,
            )}
            {group(
              "savings",
              <MoneyField
                label="Savings and investments"
                value={v.capital}
                onChange={st.bind("capital")}
                hint={v.couple ? "Both of you together: cash, bank accounts, ISAs, shares and Premium Bonds. Not your home or your pension pot." : "Cash, bank accounts, ISAs, shares and Premium Bonds. Not your home or your pension pot."}
              />,
            )}
            <RatesChoice value={v.rates} onChange={st.bind("rates")} universalCredit />
          </Inputs>
        </div>

        <div className="sa-uc-side">
          <Statement
            heading={next ? "Universal Credit from April 2027 (proposed rates)" : "Your Universal Credit, 2026/27"}
            award={r.award}
            added={added}
            maximum={r.maximum}
            takenOff={takenOff}
            cap={cap}
            footer={
              <>
                {wipedOut && <p className="sa-uc-slipnote">The amounts taken off are more than your maximum award, so nothing is paid.</p>}
                {r.capReduction > 0 && (
                  <Flag tone="warn" title="You are capped">
                    Take-home pay of {gbp(BENEFIT_CAP.earningsExemption)} a month, or a disability or carer benefit in the household, would lift it.
                  </Flag>
                )}
                {v.tenure === "mortgage" && <Flag title="Mortgage payments are not covered">After three months on Universal Credit you can apply for a Support for Mortgage Interest loan instead.</Flag>}
                {v.childcare > 0 && v.children > 0 && v.earnings <= 0 && <Flag title="Childcare is not counted yet">Enter your take-home pay: childcare costs are only met while you are in paid work.</Flag>}
              </>
            }
          />
          <Foot>
            <Caveat>
              An estimate at {next ? "DWP’s proposed 2027/28 rates, with today’s Local Housing Allowance" : "2026/27 rates"}. It leaves out deductions for debts and advances, transitional protection and sanctions, and treats every other adult
              at home as paying the full contribution.
            </Caveat>
            <ShareButton copied={st.copied} onClick={st.share} />
          </Foot>
        </div>
      </div>
    </Tool>
  );
}
