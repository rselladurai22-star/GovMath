"use client";

import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, Statement } from "@/components/flagship/results";
import { gbp, percent } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import { fullRepayment, overpayment, unusedAllowance, type ErcInput } from "@/lib/property/early-repayment";

type Mode = "full" | "part";

const SCHEMA = {
  mode: oneOf<Mode>("full", ["full", "part"]),
  balance: num(200_000, 0, 5_000_000),
  rate: num(5, 0, 20),
  left: num(30, 0, 120),
  erc: num(3, 0, 10),
  newRate: num(4, 0, 20),
  lump: num(30_000, 0, 5_000_000),
  step: num(1, 0, 5),
  term: num(20, 1, 40),
  allowance: num(10, 0, 100),
  used: num(0, 0, 5_000_000),
  deduct: bool(false),
};
const ADVANCED = ["step", "term", "allowance", "used", "deduct"] as const;

function months(n: number): string {
  if (n <= 0) return "now";
  const y = Math.floor(n / 12);
  const m = n % 12;
  const parts = [y ? `${y} ${y === 1 ? "year" : "years"}` : "", m ? `${m} ${m === 1 ? "month" : "months"}` : ""].filter(Boolean);
  return parts.join(" ");
}

export default function ErcStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const base: ErcInput = {
    balance: v.balance,
    rate: v.rate,
    termYears: v.term,
    dealMonthsLeft: v.left,
    ercNow: v.erc,
    stepDown: v.step,
    allowancePct: v.allowance,
    allowanceUsed: v.used,
    deductAllowanceOnFull: v.deduct,
  };
  const full = v.mode === "full";
  const f = fullRepayment({ ...base, newRate: v.newRate });
  const o = overpayment({ ...base, lump: v.lump });
  const free = unusedAllowance(base);
  const erc = full ? f.erc : o.erc;
  const worth = full ? f.gainVsDealEnd > 0 : o.netInDeal > 0;
  const noDeal = v.left <= 0;

  const waitRows = [
    { months: 0, erc: f.erc, gain: f.gainVsDealEnd },
    ...f.waits.map((w) => ({ months: w.months, erc: w.erc, gain: f.gainVsDealEnd - w.switchNowGain })),
  ];
  const maxGain = Math.max(1, ...waitRows.map((w) => Math.abs(w.gain)));

  return (
    <Studio
      title="Your mortgage deal and the charge"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Work out my charge"
      onReset={st.reset}
      dock={{ label: "Charge now", value: gbp(erc) }}
      inputs={
        <>
          <InputGroup title="What you want to do">
            <Segmented
              label="I want to"
              value={v.mode}
              onChange={st.bind("mode")}
              options={[
                { value: "full", label: "Leave the deal or repay it all" },
                { value: "part", label: "Overpay a lump sum" },
              ]}
            />
          </InputGroup>
          <InputGroup title="Your mortgage deal">
            <MoneyField label="Mortgage balance" value={v.balance} onChange={st.bind("balance")} big slider={{ min: 0, max: 1_000_000, step: 5_000, ends: ["£0", "£1m"] }} />
            <StepperField label="Rate on your current deal" value={v.rate} onChange={st.bind("rate")} step={0.05} min={0} max={20} unit="%" dp={2} />
            <StepperField label="Months left on the deal" value={v.left} onChange={(n) => st.set("left", Math.round(n))} step={1} min={0} max={120} unit="months" dp={0} hint="Until your fixed or discounted rate ends. Your mortgage offer or annual statement shows the date." />
            <StepperField label="Early repayment charge now" value={v.erc} onChange={st.bind("erc")} step={0.5} min={0} max={10} unit="%" dp={1} hint="The percentage for the current year of your deal, from your mortgage offer (often in the section headed 'What happens if you do not want this mortgage any more')." />
            {full ? (
              <StepperField label="Rate on the new deal" value={v.newRate} onChange={st.bind("newRate")} step={0.05} min={0} max={20} unit="%" dp={2} hint="The rate you could switch to now. Leave it the same as your current rate if you are moving or selling." />
            ) : (
              <MoneyField label="Lump sum to overpay" value={v.lump} onChange={st.bind("lump")} slider={{ min: 0, max: 200_000, step: 1_000, ends: ["£0", "£200k"] }} />
            )}
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <StepperField label="Charge falls each deal year by" value={v.step} onChange={st.bind("step")} step={0.5} min={0} max={5} unit="points" dp={1} optional hint="For example 5%, 4%, 3%, 2%, 1% falls by 1 point a year. Use 0 if the charge is the same for the whole deal." />
            <StepperField label="Years left on the mortgage" value={v.term} onChange={(n) => st.set("term", Math.round(n))} step={1} min={1} max={40} unit="years" dp={0} optional />
            <StepperField label="Yearly overpayment allowance" value={v.allowance} onChange={st.bind("allowance")} step={1} min={0} max={100} unit="%" dp={0} optional hint="Most lenders let you overpay 10% of the balance each year without a charge." />
            <MoneyField label="Already overpaid this year" value={v.used} onChange={st.bind("used")} optional hint="Overpayments made since the start of this year of your deal, which use up the allowance." />
            {full && <Switch label="Lender deducts the allowance when you repay in full" checked={v.deduct} onChange={st.bind("deduct")} optional hint="Some lenders charge only on the amount above your unused allowance, even when you repay everything. Many charge on the whole balance." />}
          </AdvancedOptions>
        </>
      }
    >
      {full ? (
        <Answer
          eyebrow="Early repayment charge now"
          value={gbp(f.erc)}
          actions={<ShareButton copied={st.copied} onClick={st.share} />}
          sentence={
            noDeal ? (
              <>Your deal has ended, so there is no early repayment charge. You can switch or repay without one.</>
            ) : (
              <>
                Repaying {gbp(v.balance)} today costs <b>{gbp(f.erc)}</b> ({percent(f.ercPct / 100, 1)} of {gbp(f.chargeable)}).{" "}
                {v.newRate < v.rate ? (
                  <>
                    Switching to {percent(v.newRate / 100, 2)} now instead of waiting {months(v.left)} for the deal to end leaves you <b>{gbp(Math.abs(f.gainVsDealEnd))}</b>{" "}
                    {worth ? "better" : "worse"} off.{" "}
                    {f.best.months > 0 && f.best.months < v.left ? <>The best time to switch is in {months(f.best.months)}, when the charge falls.</> : null}
                  </>
                ) : (
                  <>Waiting {months(v.left)} until the deal ends avoids it entirely.</>
                )}
              </>
            )
          }
          badges={[`${percent(f.ercPct / 100, 1)} charge`, `${months(v.left)} left`, noDeal ? "No charge" : worth ? "Worth switching now" : "Better to wait"]}
        />
      ) : (
        <Answer
          eyebrow="Charge on this overpayment"
          value={gbp(o.erc)}
          actions={<ShareButton copied={st.copied} onClick={st.share} />}
          sentence={
            <>
              You can overpay <b>{gbp(o.freeAmount)}</b> free this year. The other <b>{gbp(o.chargeable)}</b>{" "}
              {o.chargeable > 0 ? <>costs {gbp(o.erc)} at {percent(o.ercPct / 100, 1)}</> : "has no charge"}. Overpaying {gbp(o.lump)} saves{" "}
              <b>{gbp(o.savedOverTerm)}</b> of interest over the mortgage and clears it {months(o.monthsSooner)} sooner, so you are{" "}
              <b>{gbp(Math.abs(o.netOverTerm))}</b> {o.netOverTerm >= 0 ? "better" : "worse"} off after the charge.
            </>
          }
          badges={[`${gbp(free)} free this year`, `${percent(o.ercPct / 100, 1)} charge`, o.erc === 0 ? "No charge" : worth ? "Saves more than it costs" : "Costs more than it saves in the deal"]}
        />
      )}

      <Facts
        items={
          full
            ? [
                { label: "Charge now", value: gbp(f.erc), tone: f.erc > 0 ? "warn" : "good" },
                { label: "Monthly payment now", value: gbp(f.currentMonthly, true) },
                { label: "On the new rate", value: gbp(f.newMonthly, true), tone: f.newMonthly < f.currentMonthly ? "good" : undefined },
                { label: "Break-even new rate", value: f.breakEvenRate === null ? "None" : percent(f.breakEvenRate / 100, 2), note: "To switch now rather than wait" },
              ]
            : [
                { label: "Free to overpay", value: gbp(o.freeAmount) },
                { label: "Charge", value: gbp(o.erc), tone: o.erc > 0 ? "warn" : "good" },
                { label: "Interest saved in the deal", value: gbp(o.savedInDeal) },
                { label: "Interest saved overall", value: gbp(o.savedOverTerm), tone: "good" },
              ]
        }
      />

      <Assumptions
        items={[
          { label: "Charge", value: `${percent(v.erc / 100, 1)} now${v.step > 0 ? `, falling ${v.step} ${v.step === 1 ? "point" : "points"} at the start of each new deal year` : ", the same until the deal ends"}` },
          { label: "Deal years", value: "Counted back from the date the deal ends" },
          { label: "Allowance", value: `${v.allowance}% of today's balance a year, less ${gbp(v.used)} already used` },
          { label: "Mortgage", value: `Repayment, ${v.term} years left, monthly payments kept the same after an overpayment` },
          ...(full ? [{ label: "Comparison", value: "Interest at your current and new rate until the deal ends; the new deal's fees are paid either way" }] : []),
        ]}
      />

      {full && !noDeal && (
        <ResultCard title="When to switch" sub="Gain against waiting until the deal ends.">
          <Compare
            head={["Switch", "Gain"]}
            rows={waitRows.map((w) => ({
              label: w.months >= v.left ? `When the deal ends, in ${months(w.months)}: no charge` : `${w.months === 0 ? "Now" : `In ${months(w.months)}`}: charge ${gbp(w.erc)}`,
              value: gbp(w.gain),
              deltaTone: w.gain < 0 ? "up" : undefined,
              bar: Math.abs(w.gain) / maxGain,
              current: w.months === f.best.months,
            }))}
          />
        </ResultCard>
      )}

      {!full && (
        <ResultCard title="Pay it now or split it?" sub="The free amount now and the rest the day the deal ends.">
          <Statement
            columns={["All now", "Split"]}
            rows={[
              { label: "Paid now", values: [gbp(o.lump), gbp(o.freeAmount)] },
              { label: "Paid when the deal ends", values: ["£0", gbp(o.chargeable)] },
              { label: "Interest saved", values: [gbp(o.savedOverTerm), gbp(o.split.savedOverTerm)] },
              { label: "Charge", values: [gbp(o.erc), "£0"], kind: "deduction" },
              { label: "Net saving", values: [gbp(o.netOverTerm), gbp(o.split.savedOverTerm)], kind: "total" },
            ]}
          />
        </ResultCard>
      )}

      <ResultCard title="Things to check">
        {full && v.newRate >= v.rate && !noDeal && (
          <Callout title="Moving home? Ask about porting">
            Most deals can move with you to a new property, so no charge is due on the part you take with you. Any extra borrowing is usually on a new rate.
          </Callout>
        )}
        {full && !noDeal && (
          <Callout title="Book a new deal early">
            Most lenders let you secure a new rate up to six months before your deal ends, to start the day after it ends with no charge.
          </Callout>
        )}
        {!full && o.chargeable > 0 && (
          <Callout title="Wait for the new allowance">
            Your allowance usually resets each year of the deal. Overpaying {gbp(o.freeAmount)} now and the same again next year can avoid the charge.
          </Callout>
        )}
        <Callout tone="warn" title="Check your mortgage offer">
          Lenders work out charges differently: on the whole balance or above the allowance, by calendar year or deal year. Your lender can give you a redemption statement with the exact figure.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        An illustration. Your lender&rsquo;s redemption statement shows the exact charge.
      </p>
    </Studio>
  );
}
