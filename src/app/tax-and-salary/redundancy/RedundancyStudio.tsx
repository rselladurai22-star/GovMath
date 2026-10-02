"use client";

import { MAX_YEARS, redundancyPackage, TAX_FREE_TERMINATION } from "@/lib/tax/redundancy";
import { computeTakeHome } from "@/lib/tax/take-home-engine";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, DataTable, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { gbp } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import s from "@/components/flagship/Flagship.module.css";

const COLORS = { free: "#0f9f6e", taxable: "#f59e0b", notice: "#4353ff", holiday: "#7c3aed" };
const SCHEMA = {
  age: num(45, 16, 80),
  years: num(8, 0, 50),
  pay: num(650, 0, 100_000),
  nation: oneOf<"gb" | "ni">("gb", ["gb", "ni"]),
  uncapped: bool(false),
  extra: num(0),
  notice: num(0, 0, 52),
  pilon: bool(false),
  holiday: num(0, 0, 60),
  dpw: num(5, 1, 7),
};
const ADVANCED = ["nation", "uncapped", "extra", "notice", "pilon", "holiday", "dpw"] as const;

export default function RedundancyStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const eligible = v.years >= 2;
  const r = redundancyPackage({
    age: v.age,
    years: eligible ? v.years : 0,
    weeklyPay: v.pay,
    nation: v.nation,
    uncapped: v.uncapped,
    enhancedExtra: v.extra,
    contractNoticeWeeks: v.notice,
    payInLieu: v.pilon,
    holidayDays: v.holiday,
    daysPerWeek: v.dpw,
  });

  // Rough tax on the taxable parts, assuming a full year's salary as well.
  const salary = v.pay * 52;
  const base = computeTakeHome({ gross: salary, bonus: 0, pensionPct: 0, plan: "none" });
  const redundancyTaxable = Math.max(0, r.redundancy - TAX_FREE_TERMINATION);
  const earnings = r.noticePay + r.holidayPay;
  const withEarnings = computeTakeHome({ gross: salary + earnings, bonus: 0, pensionPct: 0, plan: "none" });
  const withAll = computeTakeHome({ gross: salary + earnings + redundancyTaxable, bonus: 0, pensionPct: 0, plan: "none" });
  const taxOnEarnings = withEarnings.totalDeductions - base.totalDeductions;
  const taxOnExcess = withAll.incomeTaxTotal - withEarnings.incomeTaxTotal;
  const netTotal = r.total - taxOnEarnings - taxOnExcess;

  const years = Math.min(Math.floor(eligible ? v.years : 0), MAX_YEARS);
  const rows = Array.from({ length: years }, (_, y) => {
    const ageThen = v.age - y - 1;
    const w = ageThen < 22 ? 0.5 : ageThen < 41 ? 1 : 1.5;
    return [`Year ${years - y}`, `${ageThen}`, `${w}`, gbp(w * Math.min(v.pay, r.capUsed))];
  }).reverse();

  return (
    <Studio
      title="Your job"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Work out my redundancy pay"
      onReset={st.reset}
      dock={{ label: "Redundancy pay", value: gbp(r.redundancy) }}
      inputs={
        <>
          <InputGroup title="You and your job">
            <StepperField label="Your age" value={v.age} onChange={st.bind("age")} step={1} min={16} max={80} unit="years" />
            <StepperField label="Full years with this employer" value={v.years} onChange={st.bind("years")} step={1} min={0} max={50} unit="years" hint="Only complete years count, up to 20." />
            <MoneyField label="Weekly pay before tax" value={v.pay} onChange={st.bind("pay")} big slider={{ min: 0, max: 2_000, step: 10, ends: ["£0", "£2k"] }} hint="Your normal gross weekly pay. Statutory pay caps this at £751 (£783 in NI)." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <Segmented
              label="Where you work"
              value={v.nation}
              onChange={st.bind("nation")}
              optional
              options={[
                { value: "gb", label: "England, Scotland, Wales" },
                { value: "ni", label: "Northern Ireland", note: "Northern Ireland has a higher weekly pay cap of £783." },
              ]}
            />
            <Switch label="Employer uses your full weekly pay" checked={v.uncapped} onChange={st.bind("uncapped")} optional hint="Some enhanced schemes ignore the statutory weekly cap." />
            <MoneyField label="Extra redundancy payment" value={v.extra} onChange={st.bind("extra")} optional hint="Any enhanced or ex-gratia payment on top." />
            <StepperField label="Notice in your contract" value={v.notice} onChange={st.bind("notice")} step={1} min={0} max={52} unit="weeks" optional hint="Leave at 0 for the statutory minimum." />
            <Switch label="Paid in lieu of notice" checked={v.pilon} onChange={st.bind("pilon")} optional hint="If you will not work your notice, it is paid as a lump sum and taxed like salary." />
            <StepperField label="Holiday owed when you leave" value={v.holiday} onChange={st.bind("holiday")} step={0.5} min={0} max={60} unit="days" dp={1} optional />
            <StepperField label="Days you work a week" value={v.dpw} onChange={st.bind("dpw")} step={1} min={1} max={7} unit="days" optional />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={eligible ? "Your redundancy pay" : "Not yet eligible"}
        value={gbp(r.redundancy)}
        unit={r.redundancy > r.statutory ? "including extra pay" : "statutory minimum"}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          !eligible ? (
            <>You need at least <b>2 full years</b> with your employer to qualify for statutory redundancy pay. You are still entitled to your notice and holiday pay.</>
          ) : (
            <>
              <b>{years} years</b> of service give <b>{r.weeksDue} weeks&apos;</b> pay at <b>{gbp(Math.min(v.pay, r.capUsed))}</b> a week
              {r.capApplies && !v.uncapped && <> (capped)</>}: <b>{gbp(r.statutory)}</b> statutory.{" "}
              {r.noticePay + r.holidayPay > 0 || r.redundancy > r.statutory ? (
                <>
                  Your whole package is about <b>{gbp(r.total)}</b>, or <b>{gbp(netTotal)}</b> after tax.
                </>
              ) : (
                <>
                  You are also entitled to <b>{r.noticeWeeks} weeks&apos; notice</b>, worked or paid.
                </>
              )}
            </>
          )
        }
        badges={[`${r.weeksDue} weeks' pay`, `${r.noticeWeeks} weeks' notice`, r.redundancy <= TAX_FREE_TERMINATION ? "Redundancy pay tax-free" : "Above £30,000 is taxed"]}
      />

      <Facts
        items={[
          { label: "Statutory redundancy", value: gbp(r.statutory) },
          { label: v.pilon ? "Notice pay" : "Notice period", value: v.pilon ? gbp(r.noticePay) : `${r.noticeWeeks} weeks` },
          { label: "Holiday pay", value: gbp(r.holidayPay) },
          { label: "After tax, about", value: gbp(netTotal), tone: "good" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Weekly pay cap", value: `${gbp(r.capUsed)} (from April 2026)` },
          { label: "Years counted", value: `Up to ${MAX_YEARS}` },
          { label: "Tax estimate", value: "Rest of UK, full year's salary" },
          { label: "Employment", value: "Employee, 2+ years" },
        ]}
      />

      {r.total > 0 && (
        <ResultCard title="Your leaving package" sub="What is tax-free and what is taxed.">
          <SplitBar
            segments={[
              { label: "Redundancy pay, tax-free", value: r.taxFree, display: gbp(r.taxFree), color: COLORS.free },
              ...(redundancyTaxable > 0 ? [{ label: "Redundancy pay above £30,000", value: redundancyTaxable, display: gbp(redundancyTaxable), color: COLORS.taxable }] : []),
              ...(r.noticePay > 0 ? [{ label: "Notice pay (taxed)", value: r.noticePay, display: gbp(r.noticePay), color: COLORS.notice }] : []),
              ...(r.holidayPay > 0 ? [{ label: "Holiday pay (taxed)", value: r.holidayPay, display: gbp(r.holidayPay), color: COLORS.holiday }] : []),
            ]}
            caption={
              <>
                Estimated tax and NI: <b>{gbp(taxOnEarnings + taxOnExcess)}</b>. Notice and holiday pay are taxed like salary; redundancy pay above £30,000 pays Income
                Tax but no employee National Insurance.
              </>
            }
          />
        </ResultCard>
      )}

      {years > 0 && (
        <DataTable summary="How each year of service counts" columns={["Year of service", "Your age that year", "Weeks' pay", "Amount"]} rows={rows} />
      )}

      <ResultCard title="Worth knowing" sub="Your rights when you are made redundant.">
        {r.capApplies && !v.uncapped && (
          <Callout title="Your pay is above the weekly cap">
            Statutory redundancy uses at most {gbp(r.capUsed)} a week. Check whether your employer offers an enhanced scheme based on your actual pay.
          </Callout>
        )}
        <Callout title="Time off to look for work">
          After 2 years&apos; service you can take reasonable paid time off during your notice to look for work or arrange training, paid up to 40% of a week&apos;s pay.
        </Callout>
        <Callout tone="warn" title="Claim within 6 months">
          If your employer does not pay, write to them asking for payment, then claim through an employment tribunal within 6 months. If the employer is insolvent, apply to
          the Redundancy Payments Service.
        </Callout>
      </ResultCard>

      <p className={s.hint} style={{ textAlign: "center" }}>
        Statutory figures from April 2026. Tax is an estimate; your employer&apos;s payroll will calculate the exact deductions.
      </p>
    </Studio>
  );
}
