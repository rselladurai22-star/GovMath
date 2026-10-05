"use client";

import { LOWER_EARNINGS_LIMIT_WEEKLY, maternityPay, STATUTORY_FLAT_RATE } from "@/lib/benefits/family";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, DateField, InputGroup, MoneyField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Facts, ResultCard, Statement } from "@/components/flagship/results";
import { gbp, gbpShort, per } from "@/components/flagship/format";
import { bool, date, num, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const SCHEMA = {
  salary: num(36_000, 0, 10_000_000),
  due: date("2027-03-01"),
  service: bool(true),
  awe: num(0, 0, 100_000),
  full: num(0, 0, 52),
  half: num(0, 0, 52),
  leave: num(52, 1, 52),
};
const ADVANCED = ["awe", "full", "half", "leave"] as const;
const COLORS = { statutory: "#5b1e6e", employer: "#0f9f6e", normal: "#94a3b8" };

function shift(iso: string, weeks: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  const t = new Date(Date.UTC(y, m - 1, d));
  t.setUTCDate(t.getUTCDate() + weeks * 7);
  return t.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

export default function MaternityStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const awe = v.awe > 0 ? v.awe : v.salary / 52;
  const r = maternityPay({ awe, service: v.service, fullPayWeeks: v.full, halfPayWeeks: v.half, leaveWeeks: v.leave });
  const scheme = v.full > 0 || v.half > 0;
  const statutoryName = r.route === "smp" ? "Statutory Maternity Pay" : r.route === "ma" ? "Maternity Allowance" : "No statutory pay";
  const drop = r.normalPay > 0 ? 1 - r.total / r.normalPay : 0;

  return (
    <Studio
      title="Your pay and due date"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Work out my maternity pay"
      onReset={st.reset}
      dock={{ label: "Maternity pay in total", value: gbp(r.total) }}
      inputs={
        <>
          <InputGroup title="You">
            <MoneyField label="Salary a year, before tax" value={v.salary} onChange={st.bind("salary")} big slider={{ min: 0, max: 100_000, step: 500, ends: ["£0", "£100k"] }} hint="Your normal gross pay. We divide by 52 to estimate your average weekly earnings." />
            <DateField label="Baby's due date" value={v.due} onChange={st.bind("due")} />
            <Switch label="With my employer for 26 weeks by the qualifying week" checked={v.service} onChange={st.bind("service")} hint="Roughly, you started before you got pregnant. If not, you may get Maternity Allowance instead." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <MoneyField label="Average weekly earnings, if you know them" value={v.awe} onChange={st.bind("awe")} pence optional hint="From the 8 weeks before the qualifying week. Includes overtime and bonuses paid then. Overrides the salary." />
            <StepperField label="Employer pays full pay for" value={v.full} onChange={(n) => st.set("full", Math.round(n))} step={1} min={0} max={52} unit="weeks" dp={0} optional hint="Enhanced maternity pay, if your contract offers it." />
            <StepperField label="Then half pay for" value={v.half} onChange={(n) => st.set("half", Math.round(n))} step={1} min={0} max={52} unit="weeks" dp={0} optional />
            <StepperField label="Weeks of maternity leave" value={v.leave} onChange={(n) => st.set("leave", Math.round(n))} step={1} min={1} max={52} unit="weeks" dp={0} optional />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={`${statutoryName}${scheme && r.route === "smp" ? " and employer pay" : ""}`}
        value={gbp(r.total)}
        unit={`over ${v.leave} ${per(v.leave, "weeks")}`}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          r.route === "none" ? (
            <>Average earnings under £30 a week do not qualify for maternity pay. You may be able to get Universal Credit or other help.</>
          ) : (
            <>
              You get <b>{gbp(r.firstSix, true)}</b> a week for the first 6 weeks, then <b>{gbp(r.remaining, true)}</b> a week for 33 weeks
              {v.leave > 39 ? <>, then nothing for the last {v.leave - 39} {per(v.leave - 39, "weeks")}</> : null}.{" "}
              {scheme && r.route === "smp" ? <>Your employer adds <b>{gbp(r.employerTopUp)}</b>. </> : null}
              In total that is <b>{gbp(r.total)}</b>, compared with <b>{gbp(r.normalPay)}</b> of normal pay.
            </>
          )
        }
        badges={[statutoryName, `${Math.round(drop * 100)}% less than normal pay`, `Leave from ${shift(v.due, -11)}`]}
      />

      <Facts
        items={[
          { label: "Weeks 1 to 6", value: `${gbp(r.firstSix, true)} a week`, note: r.route === "smp" ? "90% of your earnings" : undefined },
          { label: "Weeks 7 to 39", value: `${gbp(r.remaining, true)} a week`, note: `Capped at ${gbp(STATUTORY_FLAT_RATE, true)}` },
          { label: "Statutory pay in total", value: gbp(r.statutoryTotal) },
          { label: "Average weekly earnings", value: gbp(awe, true), tone: awe < LOWER_EARNINGS_LIMIT_WEEKLY ? "warn" : undefined, note: `SMP needs £${LOWER_EARNINGS_LIMIT_WEEKLY}+` },
        ]}
      />

      <Assumptions
        items={[
          { label: "Rates", value: "2026/27: £194.32 a week" },
          { label: "Earnings", value: v.awe > 0 ? "Average weekly earnings entered" : "Salary ÷ 52" },
          { label: "Employer scheme", value: scheme ? `${v.full} ${per(v.full, "weeks")} full, ${v.half} ${per(v.half, "weeks")} half pay` : "Statutory only" },
          { label: "Pay shown", value: "Before tax and NI" },
        ]}
      />

      {r.weeks.length > 0 && (
        <ResultCard title="Your pay week by week" sub="Before tax and National Insurance.">
          <AreaChart
            ariaLabel="Weekly maternity pay compared with normal pay"
            series={[
              { key: "total", label: "Maternity pay", color: COLORS.statutory, values: r.weeks.map((w) => w.total), fill: true },
              { key: "normal", label: "Normal pay", color: COLORS.normal, values: r.weeks.map(() => awe), dashed: true },
            ]}
            xLabel={(i) => `Week ${i + 1}`}
            yFormat={gbpShort}
            initial={0}
            hint="Drag across the chart, or use the arrow keys, to read any week."
            readout={(i) => {
              const w = r.weeks[i];
              if (!w) return null;
              return (
                <>
                  Week <b>{w.week}</b>: <b>{gbp(w.total, true)}</b>
                  {w.employer > 0 ? <> (including {gbp(w.employer, true)} from your employer)</> : null}.
                </>
              );
            }}
          />
          <Statement
            columns={["A week", "In total"]}
            rows={[
              { label: "Weeks 1 to 6", values: [gbp(r.firstSix, true), gbp(r.firstSix * Math.min(6, v.leave))] },
              { label: "Weeks 7 to 39", values: [gbp(r.remaining, true), gbp(r.remaining * Math.max(0, Math.min(39, v.leave) - 6))] },
              ...(v.leave > 39 ? [{ label: `Weeks 40 to ${v.leave}`, values: ["£0", "£0"] }] : []),
              ...(r.employerTopUp > 0 ? [{ label: "Employer top-up", values: ["", gbp(r.employerTopUp)] }] : []),
              { label: "Total", values: ["", gbp(r.total)], kind: "total" },
            ]}
          />
        </ResultCard>
      )}

      <ResultCard title="Key dates" sub="Worked out from your due date.">
        <Statement
          columns={["Around"]}
          rows={[
            { label: "Qualifying week: 26 weeks' service needed by now", values: [shift(v.due, -15)] },
            { label: "Tell your employer by", values: [shift(v.due, -15)] },
            { label: "Earliest you can start leave", values: [shift(v.due, -11)] },
            { label: "Pay ends if leave starts on the due date", values: [shift(v.due, 39)] },
            { label: "Leave ends", values: [shift(v.due, v.leave)] },
          ]}
        />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Making the most of your leave.">
        {r.route === "ma" && (
          <Callout tone="warn" title="You may get Maternity Allowance instead">
            Without 26 weeks with your employer, or with earnings under £{LOWER_EARNINGS_LIMIT_WEEKLY} a week, you can claim Maternity Allowance from Jobcentre Plus: 90% of your earnings up to{" "}
            {gbp(STATUTORY_FLAT_RATE, true)} a week for 39 weeks. You need to have worked 26 of the 66 weeks before the due date.
          </Callout>
        )}
        <Callout title="Maternity pay is taxed">
          SMP and employer pay go through payroll, so Income Tax and National Insurance come off as normal. Maternity Allowance is not taxed.
        </Callout>
        <Callout title="Keep in touch days">
          You can work up to 10 keeping in touch days without losing pay for that week. Shared parental leave adds another 20.
        </Callout>
        <Callout title="Holiday builds up while you are off">
          You keep accruing paid holiday during maternity leave. Many people add it to the start or end of their leave.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        2026/27 rates. Dates are approximate; check them with your employer. Not financial advice.
      </p>
    </Studio>
  );
}
