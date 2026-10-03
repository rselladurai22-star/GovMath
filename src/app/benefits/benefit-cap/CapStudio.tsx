"use client";

import { BENEFIT_CAP, UC_DEFAULT_INPUT, universalCredit2026, type Health, type UcInput } from "@/lib/benefits/uc-engine";
import { CHILD_BENEFIT_2026_27 } from "@/lib/benefits/child-benefit";
import { housingBenefitCap } from "@/lib/benefits/benefit-cap";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, SelectField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { gbp, gbpShort } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import s from "@/components/flagship/Flagship.module.css";

type Route = "uc" | "hb";

const axis = (n: number) => (n >= 10_000 ? gbpShort(n) : gbp(Math.round(n / 10) * 10));
const neg = (n: number): string => (n > 0.005 ? `−${gbp(n, true)}` : gbp(0, true));

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
};
const ADVANCED = ["over25", "pre2017", "disLower", "health", "carer", "exemptBen", "grace", "newStyle"] as const;
const POINTS = 41;
const TOP = 2000;

export default function CapStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const family = v.couple || v.children > 0;
  const area = v.london ? "london" : "elsewhere";
  const capAnnual = BENEFIT_CAP[area][family ? "family" : "single"];

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
  };
  const r = universalCredit2026(household);
  const uncapped = universalCredit2026({ ...household, capExemptBenefit: true });
  const cb = v.children > 0 ? ((CHILD_BENEFIT_2026_27.firstChildWeekly + (v.children - 1) * CHILD_BENEFIT_2026_27.additionalChildWeekly) * 52) / 12 : 0;
  const counted = Math.max(0, r.beforeCap - r.childcareElement) + cb + v.newStyle;
  const reason = v.grace && !r.capExemptReason?.startsWith("Household") ? "In the nine-month grace period" : r.capExemptReason;
  const at881 = universalCredit2026({ ...household, earnings: Math.max(v.earnings, BENEFIT_CAP.earningsExemption) });
  const levels = Array.from({ length: POINTS }, (_, i) => (TOP * i) / (POINTS - 1));
  const curve = levels.map((e) => universalCredit2026({ ...household, earnings: e }));
  const income = curve.map((c, i) => c.award + levels[i] + cb);

  const hb = housingBenefitCap({ household: family ? "family" : "single-no-children", location: area, weeklyBenefits: v.hbTotal, weeklyHousingBenefit: v.hbHousing });
  const hbExempt = v.exemptBen || v.grace;
  const hbCut = hbExempt ? 0 : hb.weeklyReduction;

  const isUc = v.route === "uc";
  const reduction = isUc ? r.capReduction : hbCut;
  const headline = isUc ? gbp(reduction, true) : gbp(hbCut, true);

  return (
    <Studio
      title="Your household"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Check the benefit cap"
      onReset={st.reset}
      dock={{ label: isUc ? "Cap takes off a month" : "Cap takes off a week", value: headline }}
      inputs={
        <>
          <InputGroup title="Your claim">
            <Segmented
              label="Main benefit"
              value={v.route}
              onChange={st.bind("route")}
              options={[
                { value: "uc", label: "Universal Credit" },
                { value: "hb", label: "Housing Benefit", note: "For households still on legacy benefits or tax credits." },
              ]}
            />
            <Segmented
              label="Household"
              value={v.couple ? "couple" : "single"}
              onChange={(x) => st.set("couple", x === "couple")}
              options={[
                { value: "single", label: "Single" },
                { value: "couple", label: "Couple" },
              ]}
            />
            <StepperField label="Children" value={v.children} onChange={(n) => st.set("children", Math.round(n))} step={1} min={0} max={12} unit="children" dp={0} />
            <Switch label="Live in Greater London" checked={v.london} onChange={st.bind("london")} />
          </InputGroup>
          {isUc ? (
            <InputGroup title="Rent and work">
              <MoneyField label="Rent covered by Universal Credit a month" value={v.rent} onChange={st.bind("rent")} hint="Your rent, or your Local Housing Allowance if that is lower." />
              <MoneyField label="Household take-home pay a month" value={v.earnings} onChange={st.bind("earnings")} slider={{ min: 0, max: 2_000, step: 25, ends: ["£0", "£2k"] }} hint="£881 or more after tax removes the cap." />
            </InputGroup>
          ) : (
            <InputGroup title="Your benefits a week">
              <MoneyField label="All capped benefits a week" value={v.hbTotal} onChange={st.bind("hbTotal")} pence hint="Housing Benefit, Child Benefit, Child Tax Credit, income-related ESA, JSA and Income Support." />
              <MoneyField label="Of which Housing Benefit" value={v.hbHousing} onChange={st.bind("hbHousing")} pence hint="The cap is taken from this." />
            </InputGroup>
          )}
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <Switch label="Someone gets PIP, DLA, Attendance Allowance or Carer's Allowance" checked={v.exemptBen} onChange={st.bind("exemptBen")} optional hint="Also War Pensions, Industrial Injuries Benefits, Guardian's Allowance, or support-group ESA." />
            <Switch label="Lost a job in the last 9 months" checked={v.grace} onChange={st.bind("grace")} optional hint="If you earned at least £881 a month in each of the 12 months before, the cap waits nine months." />
            {isUc && (
              <>
                <Switch label={v.couple ? "At least one of you is 25 or over" : "I am 25 or over"} checked={v.over25} onChange={st.bind("over25")} optional />
                {v.children > 0 && <Switch label="Eldest child born before 6 April 2017" checked={v.pre2017} onChange={st.bind("pre2017")} optional />}
                {v.children > 0 && <StepperField label="Disabled children (lower addition)" value={v.disLower} onChange={(n) => st.set("disLower", Math.round(n))} step={1} min={0} max={10} unit="children" dp={0} optional />}
                <SelectField
                  label="Health condition"
                  value={v.health}
                  onChange={st.bind("health")}
                  optional
                  options={[
                    { value: "none", label: "None" },
                    { value: "lcw", label: "Limited capability for work (LCW)" },
                    { value: "lcwra-new", label: "LCWRA: exempt from the cap" },
                    { value: "lcwra-protected", label: "LCWRA (protected rate): exempt from the cap" },
                  ]}
                />
                <Switch label="Universal Credit includes the carer element" checked={v.carer} onChange={st.bind("carer")} optional hint="Exempt from the cap." />
                <MoneyField label="New Style JSA or ESA a month" value={v.newStyle} onChange={st.bind("newStyle")} optional hint="Counted for the cap and taken off Universal Credit." />
              </>
            )}
          </AdvancedOptions>
        </>
      }
    >
      {isUc ? (
        <Answer
          eyebrow="The benefit cap takes off"
          value={gbp(r.capReduction, true)}
          unit="a month"
          actions={<ShareButton copied={st.copied} onClick={st.share} />}
          sentence={
            reason ? (
              <>
                You are <b>exempt</b> from the benefit cap: {reason.toLowerCase()}. Your Universal Credit is <b>{gbp(r.award, true)}</b> a month.
              </>
            ) : r.capReduction > 0 ? (
              <>
                Your benefits come to <b>{gbp(counted, true)}</b> a month, over the cap of <b>{gbp(r.capMonthly, true)}</b>. Universal Credit falls from <b>{gbp(r.beforeCap, true)}</b> to{" "}
                <b>{gbp(r.award, true)}</b>, a loss of <b>{gbp(r.capReduction * 12)}</b> a year.
              </>
            ) : (
              <>
                Your benefits come to <b>{gbp(counted, true)}</b> a month, under the cap of <b>{gbp(r.capMonthly, true)}</b>, so nothing is taken off.
              </>
            )
          }
          badges={[`Cap ${gbp(capAnnual)} a year`, v.london ? "Greater London" : "Outside London", reason ? "Exempt" : r.capReduction > 0 ? "Capped" : "Under the cap"]}
        />
      ) : (
        <Answer
          eyebrow="The benefit cap takes off"
          value={gbp(hbCut, true)}
          unit="a week"
          actions={<ShareButton copied={st.copied} onClick={st.share} />}
          sentence={
            hbExempt ? (
              <>You are exempt from the benefit cap, so your Housing Benefit is not reduced.</>
            ) : hbCut > 0 ? (
              <>
                Your benefits of <b>{gbp(v.hbTotal, true)}</b> a week are over the cap of <b>{gbp(hb.weeklyCap, true)}</b>. Housing Benefit falls to <b>{gbp(hb.housingBenefitAfter, true)}</b> a week,
                a loss of <b>{gbp(hbCut * 52)}</b> a year.
              </>
            ) : (
              <>
                Your benefits of <b>{gbp(v.hbTotal, true)}</b> a week are under the cap of <b>{gbp(hb.weeklyCap, true)}</b>.
              </>
            )
          }
          badges={[`Cap ${gbp(hb.weeklyCap, true)} a week`, v.london ? "Greater London" : "Outside London"]}
        />
      )}

      {isUc ? (
        <Facts
          items={[
            { label: "Cap a month", value: gbp(r.capMonthly, true) },
            { label: "Benefits counted", value: gbp(counted, true) },
            { label: "Taken off", value: gbp(r.capReduction, true), tone: r.capReduction > 0 ? "warn" : undefined },
            { label: "Universal Credit", value: gbp(r.award, true), tone: "good" },
          ]}
        />
      ) : (
        <Facts
          items={[
            { label: "Cap a week", value: gbp(hb.weeklyCap, true) },
            { label: "Benefits counted", value: gbp(v.hbTotal, true) },
            { label: "Taken off", value: gbp(hbCut, true), tone: hbCut > 0 ? "warn" : undefined },
            { label: "Housing Benefit left", value: gbp(hbExempt ? v.hbHousing : hb.housingBenefitAfter, true), tone: "good" },
          ]}
        />
      )}

      <Assumptions
        items={[
          { label: "Cap", value: `${gbp(capAnnual)} a year, ${family ? "couple or family" : "single"}` },
          { label: "Rates", value: "2026/27" },
          { label: "Child Benefit", value: isUc ? `${gbp(cb, true)} a month counted` : "Include it in your total" },
          { label: "Childcare element", value: "Not capped" },
        ]}
      />

      {isUc && (
        <ResultCard title="What counts towards the cap" sub="A month, before the cap.">
          <Statement
            columns={["A month"]}
            rows={[
              { label: "Universal Credit before the cap", values: [gbp(r.beforeCap, true)] },
              ...(r.childcareElement > 0 ? [{ label: "Less childcare element (not capped)", values: [neg(r.childcareElement)], kind: "deduction" as const }] : []),
              ...(cb > 0 ? [{ label: "Child Benefit", values: [gbp(cb, true)] }] : []),
              ...(v.newStyle > 0 ? [{ label: "New Style JSA or ESA", values: [gbp(v.newStyle, true)] }] : []),
              { label: "Benefits counted", values: [gbp(counted, true)], kind: "total" as const },
              { label: "Benefit cap", values: [gbp(r.capMonthly, true)] },
              { label: "Reduction to Universal Credit", values: [reason ? "Exempt" : gbp(r.capReduction, true)], kind: "total" as const },
            ]}
          />
          {!reason && r.capReduction > 0 && (
            <SplitBar
              segments={[
                { label: "Paid", value: r.award + cb + v.newStyle, display: gbp(r.award + cb + v.newStyle, true), color: "#4353ff" },
                { label: "Lost to the cap", value: r.capReduction, display: gbp(r.capReduction, true), color: "#f59e0b" },
              ]}
            />
          )}
        </ResultCard>
      )}

      {isUc && (
        <ResultCard title="Income at different earnings" sub="Take-home pay, Universal Credit and Child Benefit a month.">
          <AreaChart
            ariaLabel="Household income by monthly take-home pay"
            series={[{ key: "income", label: "Household income", color: "#4353ff", values: income, fill: true }]}
            xLabel={(i) => gbpShort(levels[i] ?? 0)}
            yFormat={axis}
            initial={Math.min(POINTS - 1, Math.round((v.earnings / TOP) * (POINTS - 1)))}
            hint="Drag across the chart, or use the arrow keys, to read any level of pay."
            readout={(i) => {
              const c = curve[i];
              if (!c) return null;
              return (
                <>
                  Take-home pay <b>{gbp(levels[i] ?? 0)}</b>: Universal Credit <b>{gbp(c.award, true)}</b>
                  {c.capReduction > 0 ? <> after a cap of {gbp(c.capReduction, true)}</> : null}, total <b>{gbp(income[i] ?? 0, true)}</b>.
                </>
              );
            }}
          />
        </ResultCard>
      )}

      <ResultCard title="Worth knowing" sub="Ways out of the cap.">
        {isUc && r.capReduction > 0 && (
          <Callout tone="good" title={`Earning ${gbp(BENEFIT_CAP.earningsExemption)} a month would lift the cap`}>
            With take-home pay of {gbp(Math.max(v.earnings, BENEFIT_CAP.earningsExemption))}, your Universal Credit would be {gbp(at881.award, true)} a month instead of {gbp(r.award, true)}. That is about 16 hours a
            week at the National Living Wage.
          </Callout>
        )}
        {isUc && uncapped.award - r.award > 0.005 && !reason && (
          <Callout title="Check for exemptions">
            If anyone in the household gets PIP, DLA, Attendance Allowance or Carer&apos;s Allowance, or a Work Capability Assessment finds you have limited capability for work and work-related activity, you
            would get {gbp(uncapped.award - r.award, true)} a month more.
          </Callout>
        )}
        {!isUc && hb.unrecovered > 0 && !hbExempt && (
          <Callout title="Housing Benefit runs out first">
            Housing Benefit cannot fall below 50p a week, so {gbp(hb.unrecovered, true)} a week of the excess is not taken.
          </Callout>
        )}
        <Callout title="Discretionary Housing Payments">
          Councils can top up rent for capped households with a Discretionary Housing Payment, usually for a limited time while you look for work or cheaper housing.
        </Callout>
      </ResultCard>

      <p className={s.hint} style={{ textAlign: "center" }}>
        2026/27 benefit cap. An estimate, not a decision on your claim.
      </p>
    </Studio>
  );
}
