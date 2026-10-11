"use client";

import { noticeAndFinalPay } from "@/lib/tax/employment-rights";
import { formatDate, type Nation } from "@/lib/life/calendar";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, DateField, InputGroup, MoneyField, Segmented, SelectField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, DataTable, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { gbp } from "@/components/flagship/format";
import { bool, date, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const COLORS = { basic: "#2a78d6", holiday: "#1baf7a", pilon: "#4a3aa7" };

type Giver = "employer" | "employee";
type Unit = "weeks" | "months";
type DayRate = "working-days" | "calendar-days";

const SCHEMA = {
  giver: oneOf<Giver>("employer", ["employer", "employee"]),
  started: date("2020-01-15"),
  given: date("2026-10-30"),
  contract: num(1, 0, 24),
  unit: oneOf<Unit>("months", ["weeks", "months"]),
  salary: num(36_000),
  nation: oneOf<Nation>("england-and-wales", ["england-and-wales", "scotland", "northern-ireland"]),
  pilon: bool(false),
  garden: bool(false),
  days: num(5, 1, 7),
  leaveStart: date("2026-01-01"),
  entitlement: num(0, 0, 60),
  taken: num(15, 0, 60),
  deductions: num(0),
  rate: oneOf<DayRate>("working-days", ["working-days", "calendar-days"]),
};
const ADVANCED = ["nation", "pilon", "garden", "days", "leaveStart", "entitlement", "taken", "deductions", "rate"] as const;

const plural = (n: number, w: string) => `${n} ${w}${n === 1 ? "" : "s"}`;
const dayText = (n: number) => `${Number.isInteger(n) ? n : n.toFixed(1)} day${n === 1 ? "" : "s"}`;

export default function NoticeStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const pilon = v.giver === "employer" && v.pilon;
  const garden = !pilon && v.garden;
  const r = noticeAndFinalPay({
    giver: v.giver,
    started: v.started,
    noticeGiven: v.given,
    contract: v.contract,
    unit: v.unit,
    nation: v.nation,
    salary: v.salary,
    daysPerWeek: v.days,
    pilon,
    gardenLeave: garden,
    leaveYearStart: v.leaveStart,
    entitlementDays: v.entitlement,
    takenDays: v.taken,
    deductions: v.deductions,
    dayRate: v.rate,
  });
  const contractText = v.contract > 0 ? plural(v.contract, v.unit === "months" ? "month" : "week") : "none";
  const noticeText =
    r.source === "contract" ? contractText : r.source === "statutory" ? plural(r.statutoryWeeks, "week") : "no notice";
  const owesHoliday = r.holidayLeft < 0;

  return (
    <Studio
      title="Your notice and final pay"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Work out my notice and final pay"
      onReset={st.reset}
      dock={{ label: "Final pay", value: gbp(r.finalPay) }}
      inputs={
        <>
          <InputGroup title="Your notice">
            <Segmented
              label="Who is giving notice"
              value={v.giver}
              onChange={st.bind("giver")}
              options={[
                { value: "employer", label: "My employer", note: "Dismissal or redundancy: at least 1 week per full year of service, up to 12 weeks." },
                { value: "employee", label: "I am resigning", note: "The legal minimum is 1 week once you have worked there a month, unless your contract says more." },
              ]}
            />
            <DateField label="Date your job started" value={v.started} onChange={st.bind("started")} max={v.given} />
            <DateField label="Date notice is given" value={v.given} onChange={st.bind("given")} hint="Notice starts the day after it is given." />
            <StepperField
              label="Notice in your contract"
              value={v.contract}
              onChange={st.bind("contract")}
              step={1}
              min={0}
              max={24}
              unit={v.unit}
              dp={0}
              hint="Enter 0 if your contract does not say. The longer of this and the legal minimum applies."
            />
            <Segmented
              label="Contract notice is in"
              value={v.unit}
              onChange={st.bind("unit")}
              options={[
                { value: "weeks", label: "Weeks" },
                { value: "months", label: "Months" },
              ]}
            />
            <MoneyField
              label="Yearly salary (before tax)"
              value={v.salary}
              onChange={st.bind("salary")}
              slider={{ min: 0, max: 150_000, step: 500, ends: ["£0", "£150k"] }}
            />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <SelectField
              label="Where you work"
              value={v.nation}
              onChange={st.bind("nation")}
              optional
              options={[
                { value: "england-and-wales", label: "England and Wales" },
                { value: "scotland", label: "Scotland" },
                { value: "northern-ireland", label: "Northern Ireland" },
              ]}
              info="Used for bank holidays when counting working days."
            />
            {v.giver === "employer" && (
              <Switch
                label="Notice paid in lieu (PILON)"
                checked={v.pilon}
                onChange={st.bind("pilon")}
                optional
                hint="Your employer ends your job on the day notice is given and pays your notice as a lump sum. It needs a PILON clause in your contract, or your agreement."
              />
            )}
            {!pilon && (
              <Switch
                label="Garden leave"
                checked={v.garden}
                onChange={st.bind("garden")}
                optional
                hint="You stop working now but stay employed, and on full pay, until your notice ends."
              />
            )}
            <StepperField label="Days you work a week" value={v.days} onChange={st.bind("days")} step={0.5} min={1} max={7} unit="days" dp={1} optional />
            <DateField label="Your holiday year started on" value={v.leaveStart} onChange={st.bind("leaveStart")} optional hint="Often 1 January or 1 April. Check your contract." />
            <StepperField
              label="Holiday a year"
              value={v.entitlement}
              onChange={st.bind("entitlement")}
              step={0.5}
              min={0}
              max={60}
              unit="days"
              dp={1}
              optional
              hint="Including bank holidays. Leave at 0 for the statutory 5.6 weeks (28 days for a 5-day week)."
            />
            <StepperField label="Holiday taken this holiday year" value={v.taken} onChange={st.bind("taken")} step={0.5} min={0} max={60} unit="days" dp={1} optional />
            <MoneyField label="Other deductions from final pay" value={v.deductions} onChange={st.bind("deductions")} optional hint="For example a season ticket loan or an overpayment your contract lets your employer take back." />
            <Segmented
              label="Part-month pay worked out on"
              value={v.rate}
              onChange={st.bind("rate")}
              optional
              options={[
                { value: "working-days", label: "Working days", note: "Monthly salary × working days paid ÷ working days in the month. Bank holidays count as paid days." },
                { value: "calendar-days", label: "Calendar days", note: "Monthly salary × calendar days paid ÷ days in the month." },
              ]}
            />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={pilon ? "Your job ends on" : "Your notice ends on"}
        value={formatDate(pilon ? r.employmentEnds : r.noticeEnd, "medium")}
        unit={pilon ? "with notice paid in lieu" : `${noticeText} of notice`}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            {r.source === "none" ? (
              <>With under a month&rsquo;s service and nothing in your contract, no minimum notice applies.</>
            ) : (
              <>
                The {r.source === "contract" ? "notice in your contract" : "statutory minimum"} applies: <b>{noticeText}</b>
                {r.source === "contract" && r.statutoryWeeks > 0 && <> (the legal minimum is {plural(r.statutoryWeeks, "week")})</>}.
              </>
            )}{" "}
            Your last working day is <b>{formatDate(r.lastWorkingDay)}</b> and your final pay is about <b>{gbp(r.finalPay)}</b> before tax.
          </>
        }
        badges={[`${r.years} full year${r.years === 1 ? "" : "s"} of service`, v.giver === "employer" ? "Employer gives notice" : "You resign", garden ? "Garden leave" : pilon ? "PILON" : "Notice worked"]}
      />

      <Facts
        items={[
          { label: "Pay for days worked", value: gbp(r.basicPay), note: `${dayText(r.paidDays)} of ${dayText(r.periodDays)}` },
          { label: "Holiday pay", value: gbp(r.holidayPay), note: `${dayText(Math.round(r.holidayLeft * 10) / 10)} untaken`, tone: owesHoliday ? ("bad" as const) : undefined },
          { label: "Pay in lieu of notice", value: gbp(r.pilonPay) },
          { label: "Final pay before tax", value: gbp(r.finalPay), tone: "good" as const },
        ]}
      />

      <Assumptions
        items={[
          { label: "Pay period", value: "Calendar month, paid monthly" },
          { label: "A day’s pay", value: `${gbp(r.dayPay, true)} (salary ÷ 52 ÷ days a week)` },
          { label: "Holiday built up", value: `${dayText(Math.round(r.holidayAccrued * 10) / 10)} this holiday year` },
          { label: "Bank holidays", value: v.nation === "england-and-wales" ? "England and Wales" : v.nation === "scotland" ? "Scotland" : "Northern Ireland" },
        ]}
        note="Gross figures. Your final payslip also takes off Income Tax, National Insurance, pension and any student loan as usual."
      />

      <DataTable
        summary="Your key dates"
        columns={["Date", "What happens"]}
        rows={[
          [formatDate(v.given), "Notice is given"],
          ...(r.statutoryWeeks > 0 ? [[formatDate(r.statutoryEnd), `Statutory notice (${plural(r.statutoryWeeks, "week")}) would end`]] : []),
          ...(v.contract > 0 ? [[formatDate(r.contractEnd), `Contract notice (${contractText}) would end`]] : []),
          [formatDate(r.lastWorkingDay), "Last working day"],
          [formatDate(r.employmentEnds), "Employment ends"],
        ]}
      />

      {r.finalPay > 0 && (
        <ResultCard title="What makes up your final pay" sub="Gross pay in your last pay period, before tax.">
          <SplitBar
            segments={[
              { label: "Pay for days worked", value: Math.max(0, r.basicPay), display: gbp(r.basicPay), color: COLORS.basic },
              ...(r.holidayPay > 0 ? [{ label: "Untaken holiday", value: r.holidayPay, display: gbp(r.holidayPay), color: COLORS.holiday }] : []),
              ...(r.pilonPay > 0 ? [{ label: "Pay in lieu of notice", value: r.pilonPay, display: gbp(r.pilonPay), color: COLORS.pilon }] : []),
            ]}
          />
        </ResultCard>
      )}

      <ResultCard title="Your final payslip" sub={`For ${formatDate(r.periodStart, "medium")} to ${formatDate(r.employmentEnds, "medium")}.`}>
        <Statement
          columns={["Amount"]}
          rows={[
            { label: `Salary for ${dayText(r.paidDays)}`, values: [gbp(r.basicPay, true)] },
            { label: owesHoliday ? "Holiday taken over entitlement" : "Untaken holiday", values: [gbp(r.holidayPay, true)], ...(owesHoliday ? { kind: "deduction" as const } : {}) },
            ...(r.pilonPay > 0 ? [{ label: "Pay in lieu of notice", values: [gbp(r.pilonPay, true)] }] : []),
            ...(r.deductions > 0 ? [{ label: "Other deductions", values: [gbp(-r.deductions, true)], kind: "deduction" as const }] : []),
            { label: "Final pay before tax", values: [gbp(r.finalPay, true)], kind: "total" },
          ]}
        />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Checks for your last weeks.">
        {owesHoliday && (
          <Callout tone="warn" title="You have taken more holiday than you have built up">
            Your employer can only take back the extra {dayText(Math.round(-r.holidayLeft * 10) / 10)} from your final pay if your contract or a written agreement allows it.
          </Callout>
        )}
        {garden && (
          <Callout title="On garden leave">
            You stay employed and paid until {formatDate(r.employmentEnds)}, and you keep building up holiday. You cannot start a new job before then without your employer&rsquo;s
            agreement.
          </Callout>
        )}
        {pilon && (
          <Callout title="Pay in lieu is taxed as pay">
            All of the basic pay for notice you do not work is taxed as earnings, with National Insurance, even if it is paid alongside a tax-free redundancy payment.
          </Callout>
        )}
        {v.giver === "employee" && r.source === "contract" && (
          <Callout title="Leaving early">
            If you leave before your contract notice ends without agreement, your employer could claim its losses. Most employers agree a shorter notice if you ask.
          </Callout>
        )}
        <Callout title="Your P45">
          Your employer must give you a P45 when you leave. Payments made after it is issued are taxed on code 0T, which can take too much tax for now.
        </Callout>
      </ResultCard>
    </Studio>
  );
}
