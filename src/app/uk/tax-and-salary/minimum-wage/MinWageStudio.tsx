"use client";

import { ACCOMMODATION_OFFSET_DAILY, minimumWageAudit, NMW_2026, type NMWBand } from "@/lib/benefits/minimum-wage";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, SelectField, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard } from "@/components/flagship/results";
import { gbp, per } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const BANDS = Object.keys(NMW_2026) as NMWBand[];
const SCHEMA = {
  age: oneOf<NMWBand>("national-living-wage", BANDS),
  pay: num(12.5, 0, 1_000),
  hours: num(37.5, 0, 100),
  unpaid: num(0, 0, 40),
  deductions: num(0, 0, 1_000),
  nights: num(0, 0, 7),
  rent: num(0, 0, 2_000),
  weeks: num(0, 0, 312),
};
const ADVANCED = ["unpaid", "deductions", "nights", "rent", "weeks"] as const;
const pounds = (n: number) => gbp(n, true);

export default function MinWageStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const r = minimumWageAudit({
    band: v.age,
    hourlyPay: v.pay,
    paidHours: v.hours,
    unpaidHours: v.unpaid,
    deductionsPerWeek: v.deductions,
    accommodationNights: v.nights,
    accommodationChargePerWeek: v.rent,
    weeks: v.weeks,
  });
  const ageLabel = NMW_2026[v.age].age;
  const simple = v.unpaid === 0 && v.deductions === 0 && r.accommodationReduction === 0;

  return (
    <Studio
      title="Your pay"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Check my pay"
      onReset={st.reset}
      dock={{ label: r.compliant ? "Meets the minimum" : "Short each week", value: r.compliant ? pounds(r.effectiveRate) : gbp(r.weeklyShortfall, true) }}
      inputs={
        <>
          <InputGroup title="You and your job">
            <SelectField
              label="Your age or status"
              value={v.age}
              onChange={st.bind("age")}
              options={BANDS.map((b) => ({ value: b, label: `${NMW_2026[b].age}: ${pounds(NMW_2026[b].hourly)}` }))}
            />
            <MoneyField label="Your hourly pay (before tax)" value={v.pay} onChange={st.bind("pay")} pence big max={1_000} slider={{ min: 0, max: 25, step: 0.05, ends: ["£0", "£25"] }} />
            <StepperField label="Paid hours a week" value={v.hours} onChange={st.bind("hours")} step={0.5} min={0} max={100} unit="hrs" dp={1} />
          </InputGroup>
          <AdvancedOptions
            changed={st.changed([...ADVANCED])}
            onReset={() => st.resetKeys([...ADVANCED])}
            description="Optional. These can take your real pay below the minimum even when your hourly rate looks fine."
          >
            <StepperField
              label="Unpaid work a week"
              value={v.unpaid}
              onChange={st.bind("unpaid")}
              step={0.25}
              min={0}
              max={40}
              unit="hrs"
              dp={2}
              optional
              hint="Required time you are not paid for: opening up, cashing up, security checks, training, or travel between jobs."
            />
            <MoneyField
              label="Work costs taken from your pay, a week"
              value={v.deductions}
              onChange={st.bind("deductions")}
              pence
              optional
              hint="Uniform, tools or training your employer charges you for, or that you must pay yourself."
            />
            <StepperField label="Nights of accommodation from your employer" value={v.nights} onChange={st.bind("nights")} step={1} min={0} max={7} unit="nights" optional />
            <MoneyField
              label="What they charge for it, a week"
              value={v.rent}
              onChange={st.bind("rent")}
              pence
              optional
              hint={`Up to ${pounds(ACCOMMODATION_OFFSET_DAILY)} a night can count towards the minimum wage. Anything above that is treated as a cut in pay.`}
            />
            <StepperField label="Weeks paid like this" value={v.weeks} onChange={st.bind("weeks")} step={1} min={0} max={312} unit="wks" optional hint="To estimate back pay you may be owed." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={r.compliant ? "Your pay meets the minimum" : "You are paid below the minimum"}
        value={pounds(r.effectiveRate)}
        unit="an hour for minimum wage purposes"
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          r.hours <= 0 ? (
            <>Enter your pay and hours to check them.</>
          ) : r.compliant ? (
            <>
              The legal minimum for <b>{ageLabel.toLowerCase()}</b> is <b>{pounds(r.required)}</b> an hour from April 2026. Your pay is{" "}
              <b>{pounds(r.effectiveRate - r.required)}</b> an hour above it.
            </>
          ) : (
            <>
              The legal minimum for <b>{ageLabel.toLowerCase()}</b> is <b>{pounds(r.required)}</b> an hour. You are <b>{pounds(r.shortfallPerHour)}</b> an hour short, which is{" "}
              <b>{pounds(r.weeklyShortfall)}</b> a week.
            </>
          )
        }
        badges={[`Minimum ${pounds(r.required)}`, `${r.hours} ${per(r.hours, "hours")} counted`, simple ? "Basic rate check" : "Includes deductions and unpaid time"]}
      />

      <Facts
        items={[
          { label: "Pay that counts, a week", value: pounds(r.countedPay) },
          { label: "Minimum for these hours", value: pounds(r.required * r.hours) },
          { label: "Short a week", value: pounds(r.weeklyShortfall), tone: r.compliant ? "good" : "bad" },
          v.weeks > 0
            ? { label: `Owed for ${v.weeks} ${per(v.weeks, "weeks")}`, value: gbp(r.owed), tone: r.owed > 0 ? "bad" : "good" }
            : { label: "Short a year", value: gbp(r.weeklyShortfall * 52), tone: r.compliant ? "good" : "bad" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Rates from", value: "1 April 2026" },
          { label: "Your rate", value: `${ageLabel}: ${pounds(r.required)}` },
          { label: "Pay period", value: "Checked weekly" },
          { label: "Tips and service charges", value: "Do not count" },
        ]}
      />

      <ResultCard title="How your pay compares" sub="Your rate against the legal minimums from April 2026.">
        <Compare
          head={["Rate", "An hour"]}
          rows={[
            { label: "Your rate for minimum wage purposes", value: pounds(r.effectiveRate), bar: Math.min(1, r.effectiveRate / 15), current: true },
            ...BANDS.map((b) => ({
              label: NMW_2026[b].age,
              value: pounds(NMW_2026[b].hourly),
              bar: Math.min(1, NMW_2026[b].hourly / 15),
              current: false,
            })),
          ]}
        />
      </ResultCard>

      <ResultCard title={r.compliant ? "Worth knowing" : "What you can do"} sub={r.compliant ? "Things that can still take pay below the minimum." : "Steps to get the pay you are owed."}>
        {!r.compliant && (
          <>
            <Callout tone="warn" title="Raise it with your employer first">
              Ask for a breakdown of your pay and hours. Many underpayments are mistakes in how working time or deductions are counted, and are put right quickly.
            </Callout>
            <Callout title="Contact Acas or complain to HMRC">
              Acas gives free, confidential advice on 0300 123 1100. You can also complain to HMRC, which enforces the minimum wage, without your employer knowing it was
              you. Employers must pay arrears at today&apos;s rates and can be fined.
            </Callout>
          </>
        )}
        {r.compliant && (
          <Callout tone="good" title="Your basic rate is above the minimum">
            Check that all required working time is paid, that work costs are not taken from your pay, and that accommodation charges are within the limit. Add them under
            More options to see the effect.
          </Callout>
        )}
        {r.accommodationReduction > 0 && (
          <Callout tone="warn" title={`${pounds(r.accommodationReduction)} of your accommodation charge reduces your pay`}>
            Employers can count up to {pounds(ACCOMMODATION_OFFSET_DAILY)} a night ({pounds(ACCOMMODATION_OFFSET_DAILY * 7)} a week). The rest of the charge is treated as a
            deduction from pay for minimum wage purposes.
          </Callout>
        )}
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Rates from 1 April 2026. A simplified weekly check; HMRC checks pay over each pay reference period.
      </p>
    </Studio>
  );
}
