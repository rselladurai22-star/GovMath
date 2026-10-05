"use client";

import { UC_2026, UC_DEFAULT_INPUT, type Health, type UcInput } from "@/lib/benefits/uc-engine";
import { monthlyFromHours, workChange, workPoint } from "@/lib/benefits/uc-work";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, SelectField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { gbp, gbpShort } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import s from "@/components/flagship/Flagship.module.css";

const axis = (n: number) => (n >= 10_000 ? gbpShort(n) : gbp(Math.round(n / 10) * 10));
const neg = (n: number): string => (n > 0.005 ? `−${gbp(n, true)}` : gbp(0, true));

const SCHEMA = {
  couple: bool(false),
  children: num(1, 0, 12),
  rent: num(0, 0, 10_000),
  hourly: num(12.71, 0, 200),
  hours: num(16, 0, 80),
  extra: num(8, 0, 60),
  over25: bool(true),
  health: oneOf<Health>("none", ["none", "lcw", "lcwra-new", "lcwra-protected"]),
  pension: num(0, 0, 50),
  scotland: bool(false),
  partnerNet: num(0, 0, 20_000),
  childcare: num(0, 0, 10_000),
  other: num(0, 0, 20_000),
};
const ADVANCED = ["over25", "health", "pension", "scotland", "partnerNet", "childcare", "other"] as const;
const HOURS = Array.from({ length: 26 }, (_, i) => i * 2);
const LADDER = [0, 8, 16, 24, 30, 37.5];

const pence = (n: number) => `${Math.round(n * 100)}p`;

export default function TaperStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const household: UcInput = {
    ...UC_DEFAULT_INPUT,
    couple: v.couple,
    over25: v.over25,
    children: v.children,
    health: v.health,
    tenure: v.rent > 0 ? "social" : "none",
    rent: v.rent,
    childcare: v.childcare,
    otherIncome: v.other,
    // The cap is a separate question; this page is about the taper.
    capExemptBenefit: true,
  };
  const base = { pensionPct: v.pension, region: (v.scotland ? "scotland" : "ruk") as "scotland" | "ruk", partnerNet: v.partnerNet, household };
  const gross = monthlyFromHours(v.hourly, v.hours);
  const extraGross = monthlyFromHours(v.hourly, v.extra);
  const c = workChange({ ...base, grossMonthly: gross }, extraGross);
  const at = (h: number) => workPoint({ ...base, grossMonthly: monthlyFromHours(v.hourly, h) });
  const curve = HOURS.map(at);
  const ladder = LADDER.map((h) => ({ h, p: at(h) }));
  const maxTotal = Math.max(1, ...ladder.map((x) => x.p.total));
  const workAllowance = v.children > 0 || v.health !== "none" ? (v.rent > 0 ? UC_2026.workAllowance.withHousing : UC_2026.workAllowance.noHousing) : 0;
  const hourGain = v.extra > 0 ? c.gain / v.extra / (52 / 12) : 0;
  const lostSegments = [
    { label: "You keep", value: Math.max(0, c.gain), display: gbp(c.gain, true), color: "#16a34a" },
    { label: "Universal Credit", value: Math.max(0, c.lostToUc), display: gbp(c.lostToUc, true), color: "#5b1e6e" },
    { label: "Tax and NI", value: Math.max(0, c.lostToTaxNi), display: gbp(c.lostToTaxNi, true), color: "#f59e0b" },
    ...(c.lostToPension > 0.005 ? [{ label: "Pension", value: c.lostToPension, display: gbp(c.lostToPension, true), color: "#8e4ba3" }] : []),
  ];

  return (
    <Studio
      title="Your work and household"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Work out what I keep"
      onReset={st.reset}
      dock={{ label: "Better off a month", value: gbp(c.gain, true) }}
      inputs={
        <>
          <InputGroup title="Your household">
            <Segmented
              label="Claiming as"
              value={v.couple ? "couple" : "single"}
              onChange={(x) => st.set("couple", x === "couple")}
              options={[
                { value: "single", label: "Single" },
                { value: "couple", label: "Couple" },
              ]}
            />
            <StepperField label="Children" value={v.children} onChange={(n) => st.set("children", Math.round(n))} step={1} min={0} max={12} unit="children" dp={0} hint="Children give you a work allowance." />
            <MoneyField label="Rent covered by Universal Credit a month" value={v.rent} onChange={st.bind("rent")} hint="Leave at £0 if you own your home or have no rent. Any rent lowers the work allowance to £427." />
          </InputGroup>
          <InputGroup title="Your work">
            <MoneyField label="Hourly pay" value={v.hourly} onChange={st.bind("hourly")} pence hint="The National Living Wage is £12.71 from April 2026." />
            <StepperField label="Hours a week now" value={v.hours} onChange={st.bind("hours")} step={1} min={0} max={80} unit="hours" dp={1} />
            <StepperField label="Extra hours a week" value={v.extra} onChange={st.bind("extra")} step={1} min={0} max={60} unit="hours" dp={1} hint="Or a pay rise: enter the hours it is worth." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <Switch label={v.couple ? "At least one of you is 25 or over" : "I am 25 or over"} checked={v.over25} onChange={st.bind("over25")} optional />
            <SelectField
              label="Health condition affecting work"
              value={v.health}
              onChange={st.bind("health")}
              optional
              options={[
                { value: "none", label: "None" },
                { value: "lcwra-new", label: "LCWRA (new claim)" },
                { value: "lcwra-protected", label: "LCWRA (earlier claim or protected)" },
                { value: "lcw", label: "LCW (claim before April 2017)" },
              ]}
              hint="Gives you a work allowance even with no children."
            />
            <StepperField label="Pension contribution" value={v.pension} onChange={st.bind("pension")} step={1} min={0} max={50} unit="%" dp={1} optional hint="Taken from gross pay before tax, as with salary sacrifice." />
            <Switch label="I pay Scottish Income Tax" checked={v.scotland} onChange={st.bind("scotland")} optional />
            {v.couple && <MoneyField label="Partner's take-home pay a month" value={v.partnerNet} onChange={st.bind("partnerNet")} optional hint="Shares the same work allowance and taper." />}
            {v.children > 0 && <MoneyField label="Childcare costs a month" value={v.childcare} onChange={st.bind("childcare")} optional hint="85% is added to your award while you work." />}
            <MoneyField label="Other income a month" value={v.other} onChange={st.bind("other")} optional hint="Pensions, New Style benefits. Taken off in full." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Extra hours make you better off by"
        value={gbp(c.gain, true)}
        unit="a month"
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          v.extra <= 0 || v.hourly <= 0 ? (
            <>Add some extra hours to see how much of the extra pay you keep.</>
          ) : (
            <>
              Working {v.extra} more hours a week adds <b>{gbp(c.extraGross, true)}</b> of gross pay a month. After tax, National Insurance{c.lostToPension > 0.005 ? ", pension" : ""} and the
              Universal Credit taper you keep <b>{gbp(c.gain, true)}</b>, which is <b>{pence(c.keep)}</b> in every pound, or about <b>{gbp(hourGain, true)}</b> for each extra hour.
            </>
          )
        }
        badges={[`${pence(c.keep)} kept per £1`, workAllowance > 0 ? `${gbp(workAllowance)} work allowance` : "No work allowance", `${Math.round(c.effectiveRate * 100)}% effective rate`]}
      />

      <Facts
        items={[
          { label: "Income now", value: gbp(c.before.total, true), note: "Pay plus Universal Credit" },
          { label: "With extra hours", value: gbp(c.after.total, true) },
          { label: "Universal Credit lost", value: gbp(c.lostToUc, true), tone: "warn" },
          { label: "You keep", value: gbp(c.gain, true), tone: "good" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Rates", value: "2026/27 tax, NI and Universal Credit" },
          { label: "Pay", value: `${gbp(v.hourly, true)} an hour, ${v.hours} hours now` },
          { label: "Months", value: "52 weeks ÷ 12, paid monthly" },
          { label: "Benefit cap", value: "Not applied" },
        ]}
      />

      <ResultCard title="Where the extra pay goes" sub={`${gbp(c.extraGross, true)} of extra gross pay a month.`}>
        <SplitBar segments={lostSegments} />
      </ResultCard>

      <ResultCard title="Before and after" sub="A month.">
        <Statement
          columns={["Now", "With extra hours"]}
          rows={[
            { label: "Gross pay", values: [gbp(c.before.gross, true), gbp(c.after.gross, true)] },
            ...(c.after.pension > 0.005 ? [{ label: "Pension", values: [neg(c.before.pension), neg(c.after.pension)], kind: "deduction" as const }] : []),
            { label: "Income Tax", values: [neg(c.before.tax), neg(c.after.tax)], kind: "deduction" as const },
            { label: "National Insurance", values: [neg(c.before.ni), neg(c.after.ni)], kind: "deduction" as const },
            { label: "Take-home pay", values: [gbp(c.before.net, true), gbp(c.after.net, true)], kind: "total" as const },
            ...(v.couple && v.partnerNet > 0 ? [{ label: "Partner's take-home pay", values: [gbp(v.partnerNet, true), gbp(v.partnerNet, true)] }] : []),
            { label: "Universal Credit", values: [gbp(c.before.uc, true), gbp(c.after.uc, true)] },
            { label: "Household income", values: [gbp(c.before.total, true), gbp(c.after.total, true)], kind: "total" as const },
          ]}
        />
      </ResultCard>

      <ResultCard title="Income by hours worked" sub={`At ${gbp(v.hourly, true)} an hour.`}>
        <AreaChart
          ariaLabel="Household income by hours worked a week"
          series={[
            { key: "total", label: "Pay plus Universal Credit", color: "#5b1e6e", values: curve.map((p) => p.total), fill: true },
            { key: "net", label: "Take-home pay only", color: "#16a34a", values: curve.map((p) => p.ucEarnings), dashed: true },
          ]}
          xLabel={(i) => `${HOURS[i] ?? 0}h`}
          yFormat={axis}
          initial={Math.min(HOURS.length - 1, Math.round(v.hours / 2))}
          hint="Drag across the chart, or use the arrow keys, to read any number of hours."
          readout={(i) => {
            const p = curve[i];
            if (!p) return null;
            return (
              <>
                <b>{HOURS[i]} hours</b> a week: take-home <b>{gbp(p.net, true)}</b>, Universal Credit <b>{gbp(p.uc, true)}</b>, total <b>{gbp(p.total, true)}</b> a month.
              </>
            );
          }}
        />
      </ResultCard>

      <ResultCard title="Step by step" sub="Household income a month at different hours.">
        <Compare
          head={["Hours a week", "Income"]}
          rows={ladder.map(({ h, p }, i) => {
            const prev = i > 0 ? ladder[i - 1].p.total : null;
            return {
              label: `${h} hours`,
              value: gbp(p.total, true),
              delta: prev === null ? undefined : `+${gbp(p.total - prev, true)}`,
              bar: p.total / maxTotal,
              current: Math.abs(h - v.hours) < 0.01,
            };
          })}
        />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Getting more from working.">
        {workAllowance === 0 && (
          <Callout title="No work allowance">
            Without children or a health element, the taper starts with your first pound of take-home pay.
          </Callout>
        )}
        {c.after.uc <= 0 && c.before.uc > 0 && (
          <Callout tone="good" title="The extra hours take you off Universal Credit">
            Your claim can stay open for six months, so payments restart automatically if your pay falls again.
          </Callout>
        )}
        {v.pension === 0 && c.before.uc > 0 && (
          <Callout title="Pension contributions cost you less on Universal Credit">
            Universal Credit counts pay after pension contributions, so a pound into your pension reduces take-home pay by much less than a pound. Try a pension percentage under More options.
          </Callout>
        )}
        <Callout title="Paid in arrears, by assessment period">
          Extra pay reduces Universal Credit in the assessment period you are paid it. Weekly or four-weekly pay sometimes puts two paydays in one month, which lowers that month&apos;s award.
        </Callout>
      </ResultCard>

      <p className={s.hint} style={{ textAlign: "center" }}>
        2026/27 rates. Ignores the benefit cap, which earning £881 a month removes. Not financial advice.
      </p>
    </Studio>
  );
}
