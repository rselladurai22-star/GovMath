"use client";

import Link from "next/link";
import { pcRates, pensionCredit2026, statePensionRates, type PensionCreditInput } from "@/lib/benefits/later-life";
import { OTHER_HELP_2026 } from "@/lib/benefits/eligibility";
import { RatesChoice, ratesParam } from "@/components/benefits/RatesChoice";
import { Caveat, Foot, Inputs, Rows, Tool, type Row } from "@/components/calc/kit";
import { Mini, Pills } from "@/components/calc/fields";
import { AdvancedOptions, Switch } from "@/components/flagship/inputs";
import { gbp } from "@/components/flagship/format";
import { bool, num, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import PcLadder, { type LadderPart } from "./PcLadder";

// Keys kept from the earlier calculator, so old share links still work.
const SCHEMA = {
  couple: bool(false),
  sp: num(200, 0, 2_000),
  other: num(0, 0, 2_000),
  savings: num(0, 0, 2_000_000),
  earnings: num(0, 0, 2_000),
  otherIncome: num(0, 0, 2_000),
  sd: num(0, 0, 2),
  carers: num(0, 0, 2),
  children: num(0, 0, 10),
  pre2017: bool(false),
  disLower: num(0, 0, 10),
  disHigher: num(0, 0, 10),
  pre2016: bool(false),
  over75: bool(false),
  renting: bool(false),
  mixed: bool(false),
  rates: ratesParam(),
};
const MORE = ["earnings", "otherIncome", "sd", "carers", "children", "pre2017", "disLower", "disHigher"] as const;

type Unlock = { key: string; name: string; state: "yes" | "no" | "info"; note: string };

export default function PcStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const next = v.rates === "2027/28";
  const SP = statePensionRates(v.rates);
  const P = pcRates(v.rates);
  const input: PensionCreditInput = {
    couple: v.couple,
    statePension: v.sp,
    otherPensions: v.other,
    earnings: v.earnings,
    otherIncome: v.otherIncome,
    savings: v.savings,
    severeDisability: v.sd,
    carers: v.carers,
    children: v.children,
    firstChildPre2017: v.pre2017,
    disabledChildrenLower: v.disLower,
    disabledChildrenHigher: v.disHigher,
    savingsCreditEligible: v.pre2016,
    year: v.rates,
  };
  const r = pensionCredit2026(input);
  const blocked = v.couple && v.mixed;
  const weekly = blocked ? 0 : r.weekly;
  const gc = !blocked && r.guaranteeCredit > 0.005;
  const any = weekly > 0.005;
  const m = (n: number) => gbp(n, true);
  const counted = (n: number) => Math.max(0, n);

  const parts: LadderPart[] = [
    { key: "sp", label: "State Pension", amount: counted(v.sp), color: "#6880c8" },
    { key: "other", label: "Other pensions", amount: counted(v.other), color: "#9fb0e0" },
    { key: "earn", label: "Earnings counted", amount: counted(v.earnings - r.earningsDisregard), color: "#d8962a" },
    { key: "oth", label: "Other income", amount: counted(v.otherIncome), color: "#e8c07d" },
    { key: "sav", label: "Income from savings", amount: r.tariffIncome, color: "#a59f92" },
  ];

  const unlocks: Unlock[] = [
    {
      key: "ctr",
      name: "Council Tax Reduction",
      state: any ? "yes" : "no",
      note: gc ? "With Guarantee Credit there is usually no council tax left to pay." : any ? "Your council works it out from your income." : "Still worth asking your council on a low income.",
    },
    {
      key: "hb",
      name: "Housing Benefit for your rent",
      state: v.renting ? (any ? "yes" : "no") : "info",
      note: v.renting ? (gc ? "Guarantee Credit gives the maximum, up to the limit for your home." : any ? "Worked out from your income by the council." : "Claim from the council if your income is low.") : "Only if you rent.",
    },
    {
      key: "tv",
      name: "Free TV licence",
      state: any && v.over75 ? "yes" : "no",
      note: v.over75 ? (any ? "At 75 or over with any Pension Credit." : "Needs Pension Credit as well as being 75.") : "From 75, with any Pension Credit. You can apply at 74.",
    },
    { key: "cwp", name: "Cold Weather Payments", state: any ? "yes" : "no", note: "Paid automatically in very cold spells." },
    { key: "whd", name: "Warm Home Discount", state: any ? "yes" : "no", note: `${gbp(OTHER_HELP_2026.warmHome)} off your electricity bill each winter.` },
    { key: "nhs", name: "Help with NHS dental treatment, glasses and travel to hospital", state: gc ? "yes" : "no", note: "Guarantee Credit only." },
    { key: "wfp", name: "Winter Fuel Payment", state: "info", note: "Not tied to Pension Credit: paid if you were born on or before 27 June 1960, and taken back by HMRC if your own income is over £35,000." },
  ];

  const rows: Row[] = [
    ...r.guaranteeLines.map((l) => ({ label: l.label, value: m(l.amount) })),
    { label: "Your guarantee", value: m(r.minimumGuarantee), strong: true },
    { label: "Income counted", note: r.tariffIncome > 0 ? `Includes ${gbp(r.tariffIncome)} from savings over ${gbp(P.capitalDisregard)}` : undefined, value: `−${m(r.income)}`, tone: "bad" },
    { label: "Guarantee Credit", value: m(blocked ? 0 : r.guaranteeCredit) },
    ...(v.pre2016 ? [{ label: "Savings Credit", value: m(blocked ? 0 : r.savingsCredit) }] : []),
    { label: "Pension Credit a week", value: m(weekly), strong: true },
  ];

  return (
    <Tool label="Pension Credit calculator">
      <div className="sa-pc">
        <div className="sa-pc-answer" aria-live="polite">
          <div className={`sa-pc-verdict${any ? " is-yes" : " is-no"}`}>
            <p className="sa-pc-kicker">{blocked ? "Not as a mixed-age couple" : any ? `Pension Credit a week${next ? " from April 2027 (proposed)" : ""}` : "No Pension Credit on these figures"}</p>
            <p className="sa-pc-amount">
              <b>{m(weekly)}</b> <span>a week</span>
            </p>
            <p className="sa-pc-sub">
              {blocked ? (
                <>
                  A couple where one of you is under State Pension age claims <Link href="/uk/benefits/universal-credit">Universal Credit</Link>{" "}instead, unless you already get
                  pension-age Housing Benefit.
                </>
              ) : any ? (
                <>
                  {gbp(weekly * 52)} a year. {gc ? "It also unlocks the help below, which is often worth more." : "Even this small amount unlocks some of the help below."}
                </>
              ) : (
                <>
                  Your income counts as {m(r.income)}, {m(r.income - r.minimumGuarantee)} above your {m(r.minimumGuarantee)} guarantee. A disability, caring or rent can still
                  change that.
                </>
              )}
            </p>
          </div>
          <PcLadder parts={parts} guarantee={r.minimumGuarantee} guaranteeCredit={blocked ? 0 : r.guaranteeCredit} savingsCredit={blocked ? 0 : r.savingsCredit} money={m} />
        </div>

        <div className="sa-pc-inputs">
          <Inputs tone="plain">
            <Pills
              label="You are"
              value={v.couple ? "couple" : "single"}
              onChange={(x) => st.set("couple", x === "couple")}
              options={[
                { value: "single", label: "Single" },
                { value: "couple", label: "A couple" },
              ]}
            />
            <div className="sa-pc-fields">
              <Mini label={v.couple ? "State Pension, both of you" : "State Pension"} value={v.sp} onChange={st.bind("sp")} prefix="£" suffix="a week" dp={2} step={5} max={2_000} wide hint={`Full new State Pension ${m(SP.newFull)}, full basic ${m(SP.basicFull)}.`} />
              <Mini label="Private and workplace pensions" value={v.other} onChange={st.bind("other")} prefix="£" suffix="a week" dp={2} step={5} max={2_000} wide />
              <Mini label="Savings and investments" value={v.savings} onChange={st.bind("savings")} prefix="£" max={2_000_000} step={500} wide hint={`The first ${gbp(P.capitalDisregard)} is ignored. No upper limit.`} />
            </div>
            <div className="sa-pc-ticks">
              <label>
                <input type="checkbox" checked={v.pre2016} onChange={(e) => st.set("pre2016", e.target.checked)} />
                <span>{v.couple ? "One of us" : "I"} reached State Pension age before 6 April 2016</span>
              </label>
              <label>
                <input type="checkbox" checked={v.over75} onChange={(e) => st.set("over75", e.target.checked)} />
                <span>{v.couple ? "One of us is" : "I am"} 75 or over</span>
              </label>
              <label>
                <input type="checkbox" checked={v.renting} onChange={(e) => st.set("renting", e.target.checked)} />
                <span>{v.couple ? "We rent" : "I rent"} my home</span>
              </label>
              {v.couple && (
                <label>
                  <input type="checkbox" checked={v.mixed} onChange={(e) => st.set("mixed", e.target.checked)} />
                  <span>One of us is still under State Pension age</span>
                </label>
              )}
            </div>
            <AdvancedOptions description="Earnings, other income, a disability, caring, children." changed={st.changed([...MORE])} onReset={() => st.resetKeys([...MORE])}>
              <div className="sa-pc-more">
                <Mini label="Earnings after tax and NI" value={v.earnings} onChange={st.bind("earnings")} prefix="£" suffix="a week" dp={2} step={5} max={2_000} hint={`${gbp(P.earningsDisregard.single)} ignored, ${gbp(P.earningsDisregard.couple)} for a couple, ${gbp(P.earningsDisregard.higher)} for carers.`} />
                <Mini label="Other income" value={v.otherIncome} onChange={st.bind("otherIncome")} prefix="£" suffix="a week" dp={2} step={5} max={2_000} hint="Such as Carer's Allowance. PIP, DLA and Attendance Allowance are ignored." />
                <Mini label="People with the severe disability addition" value={v.sd} onChange={(x) => st.set("sd", Math.round(x))} min={0} max={v.couple ? 2 : 1} stepper hint={`${m(P.severeDisability)} each. Gets Attendance Allowance, PIP daily living or DLA middle or high care, lives with no other adult (a partner aside), and nobody is paid Carer's Allowance for caring for them.`} />
                <Mini label="Carers getting or entitled to Carer's Allowance" value={v.carers} onChange={(x) => st.set("carers", Math.round(x))} min={0} max={v.couple ? 2 : 1} stepper hint={`${m(P.carer)} each.`} />
                <Mini label="Children you look after" value={v.children} onChange={(x) => st.set("children", Math.round(x))} min={0} max={10} stepper />
                {v.children > 0 && <Mini label="Disabled children, lower rate" value={v.disLower} onChange={(x) => st.set("disLower", Math.round(x))} min={0} max={10} stepper />}
                {v.children > 0 && <Mini label="Disabled children, higher rate" value={v.disHigher} onChange={(x) => st.set("disHigher", Math.round(x))} min={0} max={10} stepper />}
              </div>
              {v.children > 0 && <Switch label="The eldest child was born before 6 April 2017" checked={v.pre2017} onChange={st.bind("pre2017")} />}
            </AdvancedOptions>
            <RatesChoice value={v.rates} onChange={st.bind("rates")} />
          </Inputs>
        </div>

        <section className="sa-pc-unlocks" aria-labelledby="pc-unlocks">
          <h2 id="pc-unlocks" className="sa-pc-h">
            What Pension Credit unlocks
          </h2>
          <ul>
            {unlocks.map((u) => (
              <li key={u.key} className={`is-${u.state}`}>
                <span className="sa-pc-mark" aria-hidden="true">
                  {u.state === "yes" ? "✓" : u.state === "no" ? "–" : "i"}
                </span>
                <span>
                  <b>{u.name}</b>
                  <span className="sr-only">{u.state === "yes" ? ": yes, on these figures." : u.state === "no" ? ": not on these figures." : ":"}</span>
                  <small>{u.note}</small>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <div className="sa-pc-sums">
          <Rows caption="How your Pension Credit is worked out" rows={rows} />
        </div>

        <Foot>
          <Caveat>
            An estimate at {next ? "DWP’s proposed rates from 6 April 2027 (enter your State Pension at its April 2027 rate too)" : "2026/27 rates"}. It leaves out housing costs such as
            ground rent and service charges, which can add to the guarantee.
          </Caveat>
          <ShareButton copied={st.copied} onClick={st.share} />
        </Foot>
      </div>
    </Tool>
  );
}
