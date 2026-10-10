"use client";

import { FREQUENCY_LABEL, PERIODS, type PayFrequency } from "@/lib/us/pay";
import { STATES, stateByCode } from "@/lib/us/states";
import { FILING_LABEL, US_2026, type FilingStatus } from "@/lib/us/tax-2026";
import { bonusTax, grossUpBonus, STATE_BONUS_RATE, SUPPLEMENTAL_2026, type BonusInput } from "@/lib/us/withholding";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, RadioGroup, SelectField, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { percent, usd } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const FREQS = ["weekly", "biweekly", "semimonthly", "monthly"] as const;
const STATUSES = ["single", "mfj", "mfs", "hoh"] as const;
const CODES = STATES.map((s) => s.code);

const SCHEMA = {
  bonus: num(10_000, 0, 100_000_000),
  salary: num(80_000, 0, 100_000_000),
  status: oneOf<FilingStatus>("single", STATUSES),
  state: oneOf<string>("TX", CODES),
  method: oneOf<"flat" | "aggregate">("flat", ["flat", "aggregate"]),
  freq: oneOf<PayFrequency>("biweekly", FREQS),
  k401: num(0, 0, 100),
  salaryK401: num(0, 0, 1_000_000),
  children: num(0, 0, 15),
  others: num(0, 0, 15),
  earlier: num(0, 0, 100_000_000),
  local: num(0, 0, 10),
  net: num(0, 0, 100_000_000),
};
const ADVANCED = ["freq", "k401", "salaryK401", "children", "others", "earlier", "local", "net"] as const;

const C = { keep: "#2a78d6", federal: "#eb6834", fica: "#4a3aa7", state: "#eda100", save: "#1baf7a" };

export default function BonusStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const input: BonusInput = {
    bonus: v.bonus,
    salary: v.salary,
    periods: PERIODS[v.freq],
    status: v.status,
    state: v.state,
    children: Math.round(v.children),
    otherDependents: Math.round(v.others),
    k401Pct: v.k401 / 100,
    salaryK401: v.salaryK401,
    earlierSupplemental: v.earlier,
    method: v.method,
    localRate: v.local / 100,
  };
  const r = bonusTax(input);
  const other = bonusTax({ ...input, method: v.method === "flat" ? "aggregate" : "flat" });
  const state = stateByCode(v.state);
  const fica = r.socialSecurity + r.medicare;
  const stateLocal = r.stateWithheld + r.local;
  const keepShare = v.bonus > 0 ? r.takeHome / v.bonus : 0;
  const gross = v.net > 0 ? grossUpBonus(v.net, input) : 0;
  const stateDiff = r.stateWithheld - r.trueState;
  const forced37 = r.taxableBonus > Math.max(0, SUPPLEMENTAL_2026.million - v.earlier);

  const sizes = [1_000, 5_000, 10_000, 25_000, 50_000].map((b) => ({ b, x: bonusTax({ ...input, bonus: b }) }));
  const maxSize = Math.max(1, ...sizes.map((s) => s.x.takeHome));

  const stateLine =
    r.stateBasis === "none"
      ? `${state?.name ?? "This state"} has no state income tax on wages.`
      : r.stateBasis === "published"
        ? STATE_BONUS_RATE[v.state].source + (v.state === "CA" ? ", plus 1.3% SDI." : ".")
        : r.stateBasis === "flat"
          ? `${state?.name} has a flat income tax, so we withheld its flat rate on the bonus.`
          : `${state?.name} has no flat bonus rate we could confirm, so we show the extra state tax the bonus adds to your year.`;

  return (
    <Studio
      title="Your bonus after tax"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate my bonus"
      onReset={st.reset}
      dock={{ label: "Bonus take-home", value: usd(r.takeHome, true) }}
      inputs={
        <>
          <InputGroup title="Your bonus">
            <MoneyField label="Bonus before tax" symbol="$" value={v.bonus} onChange={st.bind("bonus")} slider={{ min: 0, max: 100_000, step: 500, ends: ["$0", "$100k"] }} />
            <MoneyField label="Yearly salary (not counting the bonus)" symbol="$" value={v.salary} onChange={st.bind("salary")} info="Your regular gross pay for 2026. It sets your real tax rate and how much Social Security room is left." />
            <RadioGroup label="Filing status" value={v.status} onChange={st.bind("status")} options={STATUSES.map((s) => ({ value: s, label: FILING_LABEL[s] }))} />
            <SelectField label="State you work in" value={v.state} onChange={st.bind("state")} options={STATES.map((s) => ({ value: s.code, label: s.name }))} />
            <RadioGroup
              label="How your employer withholds"
              value={v.method}
              onChange={st.bind("method")}
              options={[
                { value: "flat", label: "Flat 22% (paid on its own)" },
                { value: "aggregate", label: "Added to a regular paycheck" },
              ]}
              info="Most employers pay bonuses separately and withhold a flat 22%. If the bonus is lumped into a normal paycheck, the aggregate method treats the whole check as your usual pay, which often withholds more."
            />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <SelectField label="How often you are paid" value={v.freq} onChange={st.bind("freq")} optional options={FREQS.map((f) => ({ value: f, label: `${FREQUENCY_LABEL[f]} (${PERIODS[f]} paychecks)` }))} info="Used for the aggregate method." />
            <StepperField label="401(k) taken from the bonus" value={v.k401} onChange={st.bind("k401")} step={1} min={0} max={100} unit="%" dp={0} optional info={`If your plan takes your usual percentage from bonuses. Limited to the ${usd(US_2026.limits.k401)} yearly limit.`} />
            <MoneyField label="401(k) from your salary this year" symbol="$" value={v.salaryK401} onChange={st.bind("salaryK401")} optional info="Traditional 401(k) taken from regular pay in 2026, so we know how much of the limit is left." />
            <StepperField label="Children under 17 on your W-4" value={v.children} onChange={(n) => st.set("children", Math.round(n))} step={1} min={0} max={15} unit="children" dp={0} optional />
            <StepperField label="Other dependents" value={v.others} onChange={(n) => st.set("others", Math.round(n))} step={1} min={0} max={15} unit="people" dp={0} optional />
            <MoneyField label="Bonuses and commissions already paid in 2026" symbol="$" value={v.earlier} onChange={st.bind("earlier")} optional info="Supplemental wages over $1 million in a year must be withheld at 37%." />
            <StepperField label="Local income tax" value={v.local} onChange={st.bind("local")} step={0.1} min={0} max={10} unit="%" dp={2} optional info="City or county income tax, for example New York City's 4.25% supplemental rate." />
            <MoneyField label="Take-home you want to give (gross-up)" symbol="$" value={v.net} onChange={st.bind("net")} optional info="For employers: the bonus to pay so the employee gets this much after withholding." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Bonus take-home"
        value={usd(r.takeHome, true)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            From a <b>{usd(v.bonus)}</b>{" "}bonus, <b>{usd(r.federalWithheld, true)}</b>{" "}is withheld for federal income tax, <b>{usd(fica, true)}</b>{" "}for Social Security and Medicare
            {stateLocal > 0 ? (
              <>
                {" "}and <b>{usd(stateLocal, true)}</b>{" "}for state and local tax
              </>
            ) : null}
            {r.k401 > 0 ? (
              <>
                , and <b>{usd(r.k401, true)}</b>{" "}goes into your 401(k)
              </>
            ) : null}
            . You keep <b>{usd(r.takeHome, true)}</b>.
          </>
        }
        badges={[`You keep ${percent(keepShare)}`, `Real federal rate ${percent(r.federalRate, 1)}`, v.method === "flat" || forced37 ? "Flat-rate withholding" : "Aggregate withholding"]}
      />

      <Facts
        items={[
          { label: "Federal withholding", value: usd(r.federalWithheld, true) },
          { label: "Social Security and Medicare", value: usd(fica, true) },
          { label: "State and local", value: usd(stateLocal, true) },
          {
            label: r.federalDifference >= 0 ? "Federal back at tax time" : "Federal owed at tax time",
            value: usd(Math.abs(r.federalDifference)),
            tone: Math.abs(r.federalDifference) < 50 ? "good" : r.federalDifference > 0 ? "good" : "warn",
          },
        ]}
      />

      <Assumptions
        items={[
          { label: "Tax year", value: "2026" },
          { label: "Federal withholding", value: v.method === "flat" || forced37 ? "22% flat rate (37% on supplemental wages over $1 million in the year)" : "Aggregate method: IRS Publication 15-T 2026 percentage method on the regular paycheck plus the bonus" },
          { label: "Social Security", value: `6.2% until your 2026 pay passes ${usd(US_2026.socialSecurity.wageBase)}; we assume the bonus comes on top of your full year's salary` },
          { label: "Medicare", value: "1.45%, plus 0.9% on pay over $200,000 in the year" },
          { label: "State", value: stateLine },
        ]}
      />

      <ResultCard title="Where your bonus goes" sub={`${usd(v.bonus)} split into tax, savings and take-home.`}>
        <SplitBar
          segments={[
            { label: "Take-home", value: Math.max(0, r.takeHome), display: usd(r.takeHome, true), color: C.keep },
            { label: "Federal income tax", value: r.federalWithheld, display: usd(r.federalWithheld, true), color: C.federal },
            { label: "Social Security and Medicare", value: fica, display: usd(fica, true), color: C.fica },
            { label: "State and local tax", value: stateLocal, display: usd(stateLocal, true), color: C.state },
            { label: "401(k)", value: r.k401, display: usd(r.k401, true), color: C.save },
          ].filter((s, i) => i === 0 || s.value > 0)}
        />
      </ResultCard>

      <ResultCard title="Withheld now versus your real tax" sub="Withholding is a down payment. Your return settles the real bill.">
        <Statement
          columns={["Withheld", "Real extra tax"]}
          rows={[
            { label: "Federal income tax", values: [usd(r.federalWithheld, true), usd(r.trueFederal, true)] },
            ...(r.stateBasis !== "none" ? [{ label: `${state?.name ?? "State"} income tax${v.state === "CA" ? " and SDI" : ""}`, values: [usd(r.stateWithheld, true), usd(r.trueState, true)] }] : []),
            { label: "Social Security and Medicare", values: [usd(fica, true), usd(fica, true)] },
            {
              label: r.federalDifference + (r.stateBasis === "none" ? 0 : stateDiff) >= 0 ? "Comes back as a refund" : "Extra to pay at tax time",
              values: [usd(Math.abs(r.federalDifference + (r.stateBasis === "none" ? 0 : stateDiff)), true), ""],
              kind: "total",
            },
          ]}
        />
        <p className="footnote">The real extra tax is the difference between your 2026 tax with and without the bonus, at your salary and filing status, with the standard deduction.</p>
      </ResultCard>

      <ResultCard title="Flat rate or aggregate" sub="Federal withholding on this bonus by each method.">
        <Compare
          head={["Method", "Federal withheld"]}
          rows={[
            { label: "Flat 22% (separate payment)", value: usd(v.method === "flat" ? r.flatFederal : other.flatFederal, true), bar: 1, current: v.method === "flat" },
            {
              label: `Aggregate (with a ${FREQUENCY_LABEL[v.freq].toLowerCase()} paycheck)`,
              value: usd(r.aggregateFederal, true),
              bar: r.flatFederal > 0 ? Math.min(1, r.aggregateFederal / Math.max(r.flatFederal, r.aggregateFederal)) : 0,
              current: v.method === "aggregate",
            },
            { label: "Your real extra federal tax", value: usd(r.trueFederal, true), bar: Math.min(1, Math.max(0, r.trueFederal) / Math.max(1, r.flatFederal, r.aggregateFederal)) },
          ]}
        />
        <p className="footnote">Either way, the tax you finally pay is the same: only the timing differs.</p>
      </ResultCard>

      <ResultCard title="Take-home by bonus size" sub="Same salary, state and method.">
        <Compare
          head={["Bonus", "You keep"]}
          rows={sizes.map((s) => ({ label: usd(s.b), value: usd(s.x.takeHome, true), delta: `${percent(s.b > 0 ? s.x.takeHome / s.b : 0)} kept`, bar: s.x.takeHome / maxSize, current: s.b === v.bonus }))}
        />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Bonuses in 2026.">
        {gross > 0 && (
          <Callout tone="good" title="Grossed-up bonus">
            To leave {usd(v.net)} after withholding, the bonus would need to be about {usd(gross)}.
          </Callout>
        )}
        {r.federalDifference > 50 && (
          <Callout tone="good" title="Too much withheld">
            Your real federal rate on this bonus is {percent(r.federalRate, 1)}, below what was withheld, so about {usd(r.federalDifference)} should come back in your refund.
          </Callout>
        )}
        {r.federalDifference < -50 && (
          <Callout tone="warn" title="Not enough withheld">
            Your salary puts this bonus in a higher bracket than the flat 22%, so you could owe about {usd(-r.federalDifference)} more when you file. Ask for extra withholding on Step 4(c) of your W-4, or set the money aside.
          </Callout>
        )}
        {forced37 && (
          <Callout title="Over $1 million">
            Supplemental wages above $1 million in a year must be withheld at 37%, whatever your W-4 says.
          </Callout>
        )}
        {r.k401 > 0 && (
          <Callout title="401(k) from the bonus">
            Putting {usd(r.k401)} into your 401(k) saves income tax on it now; Social Security and Medicare still apply.
          </Callout>
        )}
        <Callout title="A bonus is not taxed more than salary">
          The tax on a bonus is the same as on any other pay. Withholding only looks heavy because the flat rate ignores your deductions and brackets.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Estimate for 2026. Not tax advice.
      </p>
    </Studio>
  );
}
