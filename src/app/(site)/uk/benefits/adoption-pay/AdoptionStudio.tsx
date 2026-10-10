"use client";

import { LOWER_EARNINGS_LIMIT_WEEKLY, STATUTORY_FLAT_RATE } from "@/lib/benefits/family";
import { adoptionPay } from "@/lib/benefits/families";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, DateField, InputGroup, MoneyField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Facts, ResultCard, Statement } from "@/components/flagship/results";
import { gbp, gbpShort, per } from "@/components/flagship/format";
import { bool, date, num, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const SCHEMA = {
  salary: num(36_000, 0, 10_000_000),
  placed: date("2027-03-01"),
  service: bool(true),
  awe: num(0, 0, 100_000),
  full: num(0, 0, 52),
  half: num(0, 0, 52),
  leave: num(52, 1, 52),
};
const ADVANCED = ["awe", "full", "half", "leave"] as const;
const COLORS = { pay: "#5b1e6e", normal: "#94a3b8" };

function shift(iso: string, days: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  const t = new Date(Date.UTC(y, m - 1, d));
  t.setUTCDate(t.getUTCDate() + days);
  return t.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

export default function AdoptionStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const awe = v.awe > 0 ? v.awe : v.salary / 52;
  const r = adoptionPay({ awe, service: v.service, fullPayWeeks: v.full, halfPayWeeks: v.half, leaveWeeks: v.leave });
  const scheme = v.full > 0 || v.half > 0;
  const drop = r.normalPay > 0 ? 1 - r.total / r.normalPay : 0;
  const lowPay = awe < LOWER_EARNINGS_LIMIT_WEEKLY;

  return (
    <Studio
      title="Your pay and the placement"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Work out my adoption pay"
      onReset={st.reset}
      dock={{ label: "Adoption pay in total", value: gbp(r.total) }}
      inputs={
        <>
          <InputGroup title="You">
            <MoneyField label="Salary a year, before tax" value={v.salary} onChange={st.bind("salary")} big slider={{ min: 0, max: 100_000, step: 500, ends: ["£0", "£100k"] }} hint="Your normal gross pay. We divide by 52 to estimate your average weekly earnings." />
            <DateField label="Date the child is placed with you" value={v.placed} onChange={st.bind("placed")} hint="Or the date they arrive in the UK for an overseas adoption." />
            <Switch label="With my employer for 26 weeks by the week I was matched" checked={v.service} onChange={st.bind("service")} hint="You must have worked for your employer continuously for 26 weeks by the end of the week you were told you had been matched with a child." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <MoneyField label="Average weekly earnings, if you know them" value={v.awe} onChange={st.bind("awe")} pence optional hint="From the 8 weeks before the week you were matched. Overrides the salary." />
            <StepperField label="Employer pays full pay for" value={v.full} onChange={(n) => st.set("full", Math.round(n))} step={1} min={0} max={52} unit="weeks" dp={0} optional hint="Enhanced adoption pay, if your contract offers it." />
            <StepperField label="Then half pay for" value={v.half} onChange={(n) => st.set("half", Math.round(n))} step={1} min={0} max={52} unit="weeks" dp={0} optional />
            <StepperField label="Weeks of adoption leave" value={v.leave} onChange={(n) => st.set("leave", Math.round(n))} step={1} min={1} max={52} unit="weeks" dp={0} optional />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={`Statutory Adoption Pay${scheme && r.eligible ? " and employer pay" : ""}`}
        value={gbp(r.total)}
        unit={`over ${v.leave} ${per(v.leave, "weeks")}`}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          !r.eligible ? (
            <>
              {!v.service ? <>Without 26 weeks with your employer by the week you were matched</> : <>With average earnings under £{LOWER_EARNINGS_LIMIT_WEEKLY} a week</>}, you cannot get Statutory Adoption Pay. You can
              still take adoption leave, and you may be able to get Universal Credit.
            </>
          ) : (
            <>
              You get <b>{gbp(r.firstSix, true)}</b> a week for the first 6 weeks, then <b>{gbp(r.remaining, true)}</b> a week for 33 weeks
              {v.leave > 39 ? <>, then nothing for the last {v.leave - 39} {per(v.leave - 39, "weeks")}</> : null}.{" "}
              {scheme ? <>Your employer adds <b>{gbp(r.employerTopUp)}</b>. </> : null}
              In total that is <b>{gbp(r.total)}</b>, compared with <b>{gbp(r.normalPay)}</b> of normal pay.
            </>
          )
        }
        badges={[r.eligible ? "Statutory Adoption Pay" : "No statutory pay", `${Math.round(drop * 100)}% less than normal pay`, `Leave from ${shift(v.placed, -14)}`]}
      />

      <Facts
        items={[
          { label: "Weeks 1 to 6", value: `${gbp(r.firstSix, true)} a week`, note: r.eligible ? "90% of your earnings" : undefined },
          { label: "Weeks 7 to 39", value: `${gbp(r.remaining, true)} a week`, note: `Capped at ${gbp(STATUTORY_FLAT_RATE, true)}` },
          { label: "Statutory pay in total", value: gbp(r.statutoryTotal) },
          { label: "Average weekly earnings", value: gbp(awe, true), tone: lowPay ? "warn" : undefined, note: `SAP needs £${LOWER_EARNINGS_LIMIT_WEEKLY}+` },
        ]}
      />

      <Assumptions
        items={[
          { label: "Rates", value: "2026/27: £194.32 a week" },
          { label: "Earnings", value: v.awe > 0 ? "Average weekly earnings entered" : "Salary ÷ 52" },
          { label: "Employer scheme", value: scheme ? `${v.full} ${per(v.full, "weeks")} full, ${v.half} ${per(v.half, "weeks")} half pay` : "Statutory only" },
          { label: "Who claims", value: "The main adopter. The partner can get paternity pay" },
        ]}
      />

      {r.weeks.length > 0 && r.eligible && (
        <ResultCard title="Your pay week by week" sub="Before tax and National Insurance.">
          <AreaChart
            ariaLabel="Weekly adoption pay compared with normal pay"
            series={[
              { key: "total", label: "Adoption pay", color: COLORS.pay, values: r.weeks.map((w) => w.total), fill: true },
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

      <ResultCard title="Key dates" sub="Worked out from the placement date.">
        <Statement
          columns={["Around"]}
          rows={[
            { label: "Earliest you can start leave", values: [shift(v.placed, -14)] },
            { label: "Pay ends if leave starts on the placement date", values: [shift(v.placed, 39 * 7)] },
            { label: "Leave ends", values: [shift(v.placed, v.leave * 7)] },
          ]}
        />
      </ResultCard>

      <ResultCard title="Worth knowing">
        <Callout title="Tell your employer within 7 days of being matched">
          Give them the date the child will be placed and when you want leave to start, and the matching certificate from your agency.
        </Callout>
        <Callout title="Your partner can get paternity leave">
          The other adopter can take up to 2 weeks of paternity leave, paid at {gbp(STATUTORY_FLAT_RATE, true)} a week or 90% of earnings if lower, or share leave through shared parental leave. See the{" "}
          <a href="/uk/benefits/paternity-pay">paternity pay calculator</a>.
        </Callout>
        <Callout title="Adoption pay is taxed">
          Statutory Adoption Pay goes through payroll, so Income Tax and National Insurance come off as normal.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        2026/27 rates. Dates are approximate; check them with your employer and agency. Not financial advice.
      </p>
    </Studio>
  );
}
