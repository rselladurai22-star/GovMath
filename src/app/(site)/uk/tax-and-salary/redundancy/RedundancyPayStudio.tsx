"use client";

import { MAX_SERVICE_YEARS, redundancyPay, TAX_FREE_TERMINATION, type Workplace } from "@/lib/tax/employment-rights";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, DataTable, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { gbp } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const COLORS = { free: "#0f9f6e", taxed: "#2a78d6", tax: "#f59e0b", ni: "#5b1e6e" };

const SCHEMA = {
  age: num(45, 16, 80),
  years: num(10, 0, 60),
  weekly: num(800),
  workplace: oneOf<Workplace>("england-wales", ["england-wales", "scotland", "northern-ireland"]),
  multiple: num(1, 1, 10),
  uncapped: bool(false),
  notice: num(0, 0, 52),
  pilon: bool(false),
  holiday: num(0, 0, 60),
  days: num(5, 1, 7),
  other: num(20_000),
};
const ADVANCED = ["multiple", "uncapped", "notice", "pilon", "holiday", "days", "other"] as const;

const PLACE: Record<Workplace, string> = {
  "england-wales": "England and Wales",
  scotland: "Scotland",
  "northern-ireland": "Northern Ireland",
};

const weeksText = (w: number) => `${w % 1 === 0 ? w : w.toFixed(1)} week${w === 1 ? "" : "s"}`;

export default function RedundancyPayStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const r = redundancyPay({
    age: v.age,
    years: v.years,
    weeklyPay: v.weekly,
    workplace: v.workplace,
    multiple: v.multiple,
    uncapped: v.uncapped,
    contractNoticeWeeks: v.notice,
    pilon: v.pilon,
    holidayDays: v.holiday,
    daysPerWeek: v.days,
    otherPay: v.other,
  });
  const enhanced = r.enhancedExtra > 0;
  const tooYoung = Math.floor(v.years) > r.yearsCounted && r.yearsCounted < MAX_SERVICE_YEARS;

  return (
    <Studio
      title="Your redundancy"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate my redundancy pay"
      onReset={st.reset}
      dock={{ label: "You get", value: gbp(r.net) }}
      inputs={
        <>
          <InputGroup title="Your job">
            <StepperField label="Your age on the redundancy date" value={v.age} onChange={st.bind("age")} step={1} min={16} max={80} unit="years" dp={0} />
            <StepperField
              label="Full years of service"
              value={v.years}
              onChange={st.bind("years")}
              step={1}
              min={0}
              max={60}
              unit="years"
              dp={0}
              hint="Count only complete years of continuous service with this employer (or an associated one). You need at least 2. Up to 20 years count."
            />
            <MoneyField
              label="Weekly pay (before tax)"
              value={v.weekly}
              onChange={st.bind("weekly")}
              big
              slider={{ min: 0, max: 2_000, step: 10, ends: ["£0", "£2,000"] }}
              hint="Your normal gross weekly pay. For a yearly salary, divide by 52. If your hours vary, use the average over the last 12 weeks."
            />
            <Segmented
              label="Where you work"
              value={v.workplace}
              onChange={st.bind("workplace")}
              options={[
                { value: "england-wales", label: "England or Wales" },
                { value: "scotland", label: "Scotland" },
                { value: "northern-ireland", label: "Northern Ireland", note: "Northern Ireland has its own weekly pay cap of £783." },
              ]}
            />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <StepperField
              label="Enhanced scheme: times statutory"
              value={v.multiple}
              onChange={st.bind("multiple")}
              step={0.5}
              min={1}
              max={10}
              unit="×"
              dp={1}
              optional
              hint="If your contract or a redundancy policy pays more than the legal minimum, for example double statutory pay, enter 2. Leave at 1 for statutory pay only."
            />
            <Switch
              label="Enhanced pay uses your full weekly pay (no cap)"
              checked={v.uncapped}
              onChange={st.bind("uncapped")}
              optional
              hint="Many enhanced schemes ignore the £751 cap and use your real weekly pay."
            />
            <StepperField
              label="Notice in your contract"
              value={v.notice}
              onChange={st.bind("notice")}
              step={1}
              min={0}
              max={52}
              unit="weeks"
              dp={0}
              optional
              hint="Leave at 0 to use the statutory minimum: 1 week per full year of service, up to 12 weeks. A month is about 4.3 weeks."
            />
            <Switch
              label="Notice paid in lieu (PILON)"
              checked={v.pilon}
              onChange={st.bind("pilon")}
              optional
              hint="Your employer ends your job straight away and pays your notice as a lump sum. If you work your notice, it is paid as normal salary instead."
            />
            <StepperField label="Untaken holiday owed" value={v.holiday} onChange={st.bind("holiday")} step={0.5} min={0} max={60} unit="days" dp={1} optional />
            <StepperField label="Days you work a week" value={v.days} onChange={st.bind("days")} step={0.5} min={1} max={7} unit="days" dp={1} optional hint="Used to turn holiday days into pay." />
            <MoneyField
              label="Other pay this tax year"
              value={v.other}
              onChange={st.bind("other")}
              optional
              hint="Your salary and other taxable income from 6 April to your leaving date. It decides the tax rate on the taxable part of your payout."
            />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Your payout after tax"
        value={gbp(r.net)}
        unit={`from ${gbp(r.gross)} before tax`}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          !r.eligible ? (
            <>
              You need <b>2 full years</b> of service to get statutory redundancy pay.
              {r.gross > 0 ? <> You still get your notice and holiday pay.</> : <> You are still owed notice and any untaken holiday.</>}
            </>
          ) : (
            <>
              Your <b>{weeksText(r.weeks)}</b> of pay at <b>{gbp(r.cappedWeekPay, true)}</b> a week gives statutory redundancy pay of <b>{gbp(r.statutory, true)}</b>.
              {enhanced && (
                <>
                  {" "}
                  Your enhanced scheme raises it to <b>{gbp(r.redundancy, true)}</b>.
                </>
              )}
              {r.excess > 0 ? (
                <>
                  {" "}
                  The first {gbp(TAX_FREE_TERMINATION)} is tax-free; the other <b>{gbp(r.excess)}</b> is taxed.
                </>
              ) : (
                <> All of it is tax-free.</>
              )}
            </>
          )
        }
        badges={[`${r.yearsCounted} year${r.yearsCounted === 1 ? "" : "s"} counted`, `Cap ${gbp(r.cap)} a week`, PLACE[v.workplace]]}
      />

      <Facts
        items={[
          { label: "Redundancy pay", value: gbp(r.redundancy), note: enhanced ? `Statutory ${gbp(r.statutory)}` : "Statutory" },
          { label: `Notice (${weeksText(r.noticeWeeks)})`, value: v.pilon ? gbp(r.noticePay) : "Worked", note: v.pilon ? "Paid in lieu" : "Paid as normal salary" },
          { label: "Holiday pay", value: gbp(r.holidayPay) },
          { label: "Tax and NI", value: gbp(r.incomeTax + r.ni), tone: r.incomeTax + r.ni > 0 ? ("warn" as const) : ("good" as const) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Weekly pay cap", value: `${gbp(r.cap)} (from 6 April 2026)` },
          { label: "Tax year", value: "2026/27, tax code 1257L" },
          { label: "Tax-free", value: `First ${gbp(TAX_FREE_TERMINATION)} of redundancy pay` },
          { label: "Notice pay and holiday pay", value: "Taxed as earnings, with NI" },
        ]}
        note="National Insurance on notice and holiday pay is worked out as if paid in one month with your normal monthly pay."
      />

      {r.gross > 0 && (
        <ResultCard title="What is taxed and what is not" sub="Every pound of your payout, by how it is treated.">
          <SplitBar
            segments={[
              { label: "Tax-free redundancy pay", value: r.taxFree, display: gbp(r.taxFree), color: COLORS.free },
              ...(r.excess > 0 ? [{ label: "Redundancy pay over £30,000", value: r.excess, display: gbp(r.excess), color: COLORS.taxed }] : []),
              ...(r.earnings > 0 ? [{ label: "Notice and holiday pay", value: r.earnings, display: gbp(r.earnings), color: COLORS.ni }] : []),
            ]}
          />
        </ResultCard>
      )}

      {r.gross > 0 && (
        <ResultCard title="Your leaving payment" sub="Gross amounts, then the tax and National Insurance on the taxable parts.">
          <Statement
            columns={["Amount"]}
            rows={[
              { label: "Redundancy pay", values: [gbp(r.redundancy, true)] },
              ...(r.noticePay > 0 ? [{ label: "Pay in lieu of notice", values: [gbp(r.noticePay, true)] }] : []),
              ...(r.holidayPay > 0 ? [{ label: "Holiday pay", values: [gbp(r.holidayPay, true)] }] : []),
              { label: "Income Tax", values: [gbp(-r.incomeTax, true)], kind: "deduction", swatch: COLORS.tax },
              { label: "National Insurance", values: [gbp(-r.ni, true)], kind: "deduction", swatch: COLORS.ni },
              { label: "You receive", values: [gbp(r.net, true)], kind: "total" },
            ]}
          />
        </ResultCard>
      )}

      {r.rows.length > 0 && (
        <DataTable
          summary="How each year of service counts"
          columns={["Year (most recent first)", "Your age that year", "Weeks of pay", "Statutory pay"]}
          rows={r.rows.map((row) => [row.year, row.age, row.weeks, r.eligible ? gbp(row.pay, true) : "Not yet eligible"])}
        />
      )}

      <ResultCard title="Worth knowing" sub="Checks before you sign anything.">
        {r.capApplies && (
          <Callout title="Your weekly pay is above the cap">
            Statutory pay uses at most {gbp(r.cap)} a week, so each week counts as {gbp(r.cap)}, not {gbp(v.weekly)}. Check whether your employer has an enhanced scheme that
            uses full pay.
          </Callout>
        )}
        {tooYoung && (
          <Callout title="Only service from age 16 can be counted here">
            We counted {r.yearsCounted} years. Check your start date and age.
          </Callout>
        )}
        {r.excess > 0 && (
          <Callout tone="warn" title="Tax on the part over £30,000">
            The {gbp(r.excess)} over £30,000 is taxed at your top rate, but there is no employee National Insurance on it. Your employer pays Class 1A NI of about{" "}
            {gbp(r.employerClass1A)} on it. Paying some into your pension before you leave may cut the tax.
          </Callout>
        )}
        <Callout title="Payments after your P45">
          If your employer pays you after issuing your P45, it must use tax code 0T, which can take too much tax. HMRC refunds any overpayment, often after the tax year ends.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Statutory redundancy pay for redundancies on or after 6 April 2026. Tax at 2026/27 rates.
      </p>
    </Studio>
  );
}
