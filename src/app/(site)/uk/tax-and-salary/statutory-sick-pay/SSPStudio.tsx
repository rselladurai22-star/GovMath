"use client";

import { sickPeriod, SSP_WEEKLY_2026 } from "@/lib/benefits/statutory-pay";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard } from "@/components/flagship/results";
import { gbp, per } from "@/components/flagship/format";
import { num, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const SCHEMA = {
  awe: num(500, 0, 50_000),
  days: num(5, 0, 400),
  qdays: num(5, 1, 7),
  used: num(0, 0, 28),
  full: num(0, 0, 52),
  half: num(0, 0, 52),
};
const ADVANCED = ["used", "full", "half"] as const;
const pounds = (n: number) => gbp(n, true);

export default function SSPStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const r = sickPeriod({
    averageWeeklyEarnings: v.awe,
    qualifyingDays: v.qdays,
    daysOff: v.days,
    weeksAlreadyPaid: v.used,
    fullPayWeeks: v.full,
    halfPayWeeks: v.half,
  });
  const hasCompany = v.full > 0 || v.half > 0;
  const lostPay = Math.max(0, (v.awe / v.qdays) * v.days - r.youGet);

  return (
    <Studio
      title="Your pay and sickness"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Work out my sick pay"
      onReset={st.reset}
      dock={{ label: "Statutory Sick Pay", value: pounds(r.ssp) }}
      inputs={
        <>
          <InputGroup title="Your pay and sickness">
            <MoneyField
              label="Average weekly earnings (before tax)"
              value={v.awe}
              onChange={st.bind("awe")}
              big
              slider={{ min: 0, max: 1_500, step: 5, ends: ["£0", "£1,500"] }}
              hint="Usually your average over the 8 weeks before you went off sick."
            />
            <StepperField label="Working days off sick" value={v.days} onChange={st.bind("days")} step={1} min={0} max={400} unit="days" hint="Only days you would normally have worked." />
            <StepperField label="Days you normally work a week" value={v.qdays} onChange={st.bind("qdays")} step={1} min={1} max={7} unit="days" />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <StepperField
              label="Weeks of SSP already paid in a linked spell"
              value={v.used}
              onChange={st.bind("used")}
              step={1}
              min={0}
              max={28}
              unit="wks"
              optional
              hint="Spells of sickness less than 8 weeks apart are linked, and share one 28-week limit."
            />
            <StepperField label="Company sick pay: weeks on full pay" value={v.full} onChange={st.bind("full")} step={1} min={0} max={52} unit="wks" optional />
            <StepperField label="Then weeks on half pay" value={v.half} onChange={st.bind("half")} step={1} min={0} max={52} unit="wks" optional hint="Check your contract or staff handbook." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Your Statutory Sick Pay"
        value={pounds(r.ssp)}
        unit={`for ${r.daysPaid} day${r.daysPaid === 1 ? "" : "s"}`}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            From April 2026 SSP is paid from your <b>first day</b> off sick. You get <b>{pounds(r.weeklyRate)}</b> a week (
            {r.flatRateApplied ? <>the flat rate</> : <>80% of your earnings, as that is lower than {pounds(SSP_WEEKLY_2026)}</>}), which is <b>{pounds(r.dailyRate)}</b> for each
            working day.
            {hasCompany && (
              <>
                {" "}
                Your company scheme pays <b>{pounds(r.companyPay)}</b> for these days, so you get that instead.
              </>
            )}
          </>
        }
        badges={["Paid from day one", r.flatRateApplied ? "Flat weekly rate" : "80% of earnings", `${Math.round(r.daysLeft / v.qdays)} ${per(Math.round(r.daysLeft / v.qdays), "weeks")} of SSP left`]}
      />

      <Facts
        items={[
          { label: "Weekly rate", value: pounds(r.weeklyRate) },
          { label: "Daily rate", value: pounds(r.dailyRate), note: `${v.qdays}-day week` },
          { label: "You receive", value: pounds(r.youGet), tone: "good" },
          { label: "Pay you lose", value: pounds(lostPay), note: "Compared with working", tone: lostPay > 0 ? "warn" : "good" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Rules", value: "From 6 April 2026" },
          { label: "Maximum", value: "28 weeks in a spell" },
          { label: "Earnings test", value: "None from April 2026" },
          { label: "Tax", value: "SSP is taxed like pay" },
        ]}
      />

      {hasCompany && (
        <ResultCard title="SSP and your company sick pay" sub="Company schemes include SSP; you get whichever is higher, not both.">
          <Compare
            head={["Scheme", "For these days"]}
            rows={[
              { label: "Statutory Sick Pay", value: pounds(r.ssp), bar: r.youGet > 0 ? r.ssp / r.youGet : 0, current: r.ssp >= r.companyPay },
              { label: "Company sick pay", value: pounds(r.companyPay), bar: r.youGet > 0 ? r.companyPay / r.youGet : 0, current: r.companyPay > r.ssp },
            ]}
          />
        </ResultCard>
      )}

      <ResultCard title="Worth knowing" sub="What you need to do while you are off sick.">
        <Callout title="Tell your employer and get a fit note after 7 days">
          You can self-certify for the first 7 days in a row. After that, your employer can ask for a fit note from a GP, hospital doctor or other healthcare
          professional.
        </Callout>
        {r.daysLeft === 0 && r.daysPaid > 0 && (
          <Callout tone="warn" title="Your 28 weeks of SSP have run out">
            Your employer should give you form SSP1 so you can claim Employment and Support Allowance or Universal Credit.
          </Callout>
        )}
        <Callout title="Self-employed or not eligible?">
          SSP is for employees. If you are self-employed or SSP does not apply, you may be able to claim New Style Employment and Support Allowance or Universal Credit.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        2026/27 rules: the lower of {pounds(SSP_WEEKLY_2026)} a week or 80% of your average weekly earnings, paid from the first day of sickness.
      </p>
    </Studio>
  );
}
