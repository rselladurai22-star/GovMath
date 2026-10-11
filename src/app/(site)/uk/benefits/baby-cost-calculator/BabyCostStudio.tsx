"use client";

import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, SelectField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, DataTable, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { gbp } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import { babyCosts, EXAMPLE_COSTS, ITEMS, itemsFor, type Feeding, type ItemKey, type Level, type Nation } from "@/lib/benefits/baby-costs";

const MID = itemsFor("mid");
const E = EXAMPLE_COSTS;

/** URL keys for the one-off items. */
const ITEM_KEYS: Record<ItemKey, "pram" | "seat" | "cot" | "crib" | "mon" | "chg" | "carr" | "hc" | "fk"> = {
  pram: "pram",
  carSeat: "seat",
  cot: "cot",
  crib: "crib",
  monitor: "mon",
  changing: "chg",
  carrier: "carr",
  highchair: "hc",
  feedingKit: "fk",
};

const SCHEMA = {
  nation: oneOf<Nation>("england", ["england", "wales", "scotland", "ni"]),
  level: oneOf<Level>("mid", ["budget", "mid", "premium"]),
  feed: oneOf<Feeding>("formula", ["formula", "mixed", "breast"]),
  nap: oneOf<"disposable" | "reusable">("disposable", ["disposable", "reusable"]),
  ch: num(E.childcareHours, 0, 60),
  mw: num(600, 0, 10_000),
  pram: num(MID.pram, 0, 5000),
  seat: num(MID.carSeat, 0, 2000),
  cot: num(MID.cot, 0, 3000),
  crib: num(MID.crib, 0, 2000),
  mon: num(MID.monitor, 0, 1000),
  chg: num(MID.changing, 0, 1000),
  carr: num(MID.carrier, 0, 1000),
  hc: num(MID.highchair, 0, 1000),
  fk: num(MID.feedingKit, 0, 1000),
  fm: num(E.formulaMonthly, 0, 500),
  dm: num(E.disposableMonthly, 0, 500),
  rk: num(E.reusableKit, 0, 2000),
  rw: num(E.reusableWashMonthly, 0, 200),
  potty: num(E.pottyAge, 1, 5),
  c1: num(E.clothesYear1, 0, 5000),
  cl: num(E.clothesLater, 0, 5000),
  wf: num(E.weaningFoodMonthly, 0, 500),
  tf: num(E.toddlerFoodMonthly, 0, 1000),
  oth: num(E.otherMonthly, 0, 2000),
  rate: num(E.childcareRate, 0, 30),
  wk: num(E.childcareWeeks, 1, 52),
  start: num(E.childcareStartMonth, 0, 48),
  working: bool(true),
  rich: bool(false),
  tfc: bool(true),
  kids: num(0, 0, 10),
  ben: bool(false),
  hs: bool(false),
  inc: num(35_000, 0, 1_000_000),
  ms: bool(true),
  lw: num(39, 0, 52),
  fp: num(0, 0, 52),
  hp: num(0, 0, 52),
  pw: num(600, 0, 10_000),
  ps: bool(true),
  pwk: num(2, 0, 2),
  pfp: num(0, 0, 2),
};

const ADVANCED = [
  ...Object.values(ITEM_KEYS),
  "fm", "dm", "rk", "rw", "potty", "c1", "cl", "wf", "tf", "oth",
  "rate", "wk", "start", "working", "rich", "tfc",
  "kids", "ben", "hs", "inc",
  "ms", "lw", "fp", "hp", "pw", "ps", "pwk", "pfp",
] as const;

const NATION_LABEL: Record<Nation, string> = { england: "England", wales: "Wales", scotland: "Scotland", ni: "Northern Ireland" };
const LEVEL_LABEL: Record<Level, string> = { budget: "Budget", mid: "Mid-range", premium: "Premium" };
const FEED_LABEL: Record<Feeding, string> = { formula: "Formula", mixed: "Mixed", breast: "Breastfeeding" };

export default function BabyCostStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const items = Object.fromEntries(ITEMS.map((i) => [i.key, v[ITEM_KEYS[i.key]]])) as Record<ItemKey, number>;
  const r = babyCosts({
    nation: v.nation,
    items,
    feeding: v.feed,
    formulaMonthly: v.fm,
    nappies: v.nap,
    disposableMonthly: v.dm,
    reusableKit: v.rk,
    reusableWashMonthly: v.rw,
    pottyAge: v.potty,
    clothesYear1: v.c1,
    clothesLater: v.cl,
    weaningFoodMonthly: v.wf,
    toddlerFoodMonthly: v.tf,
    otherMonthly: v.oth,
    childcareHours: v.ch,
    childcareRate: v.rate,
    childcareWeeks: v.wk,
    childcareStartMonth: v.start,
    working: v.working,
    over100k: v.rich,
    useTfc: v.tfc,
    otherChildren: v.kids,
    benefit: v.ben,
    healthyStart: v.hs,
    higherIncome: v.inc,
    motherWeekly: v.mw,
    motherService: v.ms,
    leaveWeeks: v.lw,
    fullPayWeeks: v.fp,
    halfPayWeeks: v.hp,
    partnerWeekly: v.pw,
    partnerService: v.ps,
    partnerWeeks: (Math.max(0, Math.min(2, Math.round(v.pwk))) as 0 | 1 | 2),
    partnerFullPayWeeks: v.pfp,
  });
  const y1 = r.year1;
  const setLevel = (level: Level) => {
    const preset = itemsFor(level);
    st.set("level", level);
    for (const i of ITEMS) st.set(ITEM_KEYS[i.key], preset[i.key]);
  };
  const childcareFrom = v.start === 0 ? "birth" : `${v.start} months`;
  const england = v.nation === "england";
  const leaveText =
    r.leave.route === "smp" ? "Statutory Maternity Pay" : r.leave.route === "ma" ? "Maternity Allowance" : "no statutory pay";

  return (
    <Studio
      title="Your baby and your family"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Work out the cost"
      onReset={st.reset}
      dock={{ label: "Net cost, year one", value: gbp(y1.net) }}
      inputs={
        <>
          <InputGroup title="Your plans">
            <SelectField
              label="Where you live"
              value={v.nation}
              onChange={st.bind("nation")}
              options={(Object.keys(NATION_LABEL) as Nation[]).map((n) => ({ value: n, label: NATION_LABEL[n] }))}
              info="Funded childcare hours here follow England's scheme. Scotland pays the Best Start Grant instead of the Sure Start Maternity Grant."
            />
            <Segmented
              label="Big items"
              value={v.level}
              onChange={setLevel}
              options={[
                { value: "budget", label: "Budget", note: "Example prices for basic or second-hand items." },
                { value: "mid", label: "Mid-range", note: "Example prices for mid-range new items." },
                { value: "premium", label: "Premium", note: "Example prices for premium brands." },
              ]}
            />
            <Segmented
              label="Feeding"
              value={v.feed}
              onChange={st.bind("feed")}
              options={[
                { value: "formula", label: "Formula", note: "First infant formula for 12 months." },
                { value: "mixed", label: "Mixed", note: "Half the formula cost." },
                { value: "breast", label: "Breast", note: "No formula cost." },
              ]}
            />
            <Segmented
              label="Nappies"
              value={v.nap}
              onChange={st.bind("nap")}
              options={[
                { value: "disposable", label: "Disposable" },
                { value: "reusable", label: "Reusable", note: "A kit up front, then washing costs." },
              ]}
            />
            <StepperField
              label="Childcare a week"
              value={v.ch}
              onChange={(n) => st.set("ch", Math.round(n))}
              step={1}
              min={0}
              max={60}
              unit="hours"
              dp={0}
              hint={`Paid childcare from ${childcareFrom}. 0 if a parent or family will look after the baby.`}
            />
            <MoneyField label="Mother's usual pay a week, before tax" value={v.mw} onChange={st.bind("mw")} max={10_000} hint="Average gross weekly earnings. 0 if not working." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <p className="footnote">Example costs: change any of them to your own prices.</p>
            {ITEMS.map((i) => (
              <MoneyField key={i.key} label={i.label} value={v[ITEM_KEYS[i.key]]} onChange={st.bind(ITEM_KEYS[i.key])} max={5000} optional />
            ))}
            {v.feed !== "breast" && <MoneyField label="Formula a month (full formula feeding)" value={v.fm} onChange={st.bind("fm")} max={500} optional />}
            {v.nap === "disposable" ? (
              <MoneyField label="Nappies and wipes a month" value={v.dm} onChange={st.bind("dm")} max={500} optional />
            ) : (
              <>
                <MoneyField label="Reusable nappy kit" value={v.rk} onChange={st.bind("rk")} max={2000} optional />
                <MoneyField label="Washing and wipes a month" value={v.rw} onChange={st.bind("rw")} max={200} optional />
              </>
            )}
            <StepperField label="Out of nappies at age" value={v.potty} onChange={st.bind("potty")} step={0.5} min={1} max={5} unit="years" dp={1} optional />
            <MoneyField label="Clothes in year one" value={v.c1} onChange={st.bind("c1")} max={5000} optional />
            <MoneyField label="Clothes a year after that" value={v.cl} onChange={st.bind("cl")} max={5000} optional />
            <MoneyField label="Baby food a month, 6 to 12 months" value={v.wf} onChange={st.bind("wf")} max={500} optional />
            <MoneyField label="Food and milk a month, age 1 to 5" value={v.tf} onChange={st.bind("tf")} max={1000} optional />
            <MoneyField label="Toiletries, toys and other costs a month" value={v.oth} onChange={st.bind("oth")} max={2000} optional />
            <MoneyField label="Childcare: hourly rate" value={v.rate} onChange={st.bind("rate")} max={30} pence optional hint="Ask your nursery or childminder." />
            <StepperField label="Childcare: weeks a year" value={v.wk} onChange={(n) => st.set("wk", Math.round(n))} step={1} min={1} max={52} unit="weeks" dp={0} optional />
            <StepperField label="Childcare starts at age" value={v.start} onChange={(n) => st.set("start", Math.round(n))} step={1} min={0} max={48} unit="months" dp={0} optional />
            <Switch label="Both parents work (or a single parent works)" checked={v.working} onChange={st.bind("working")} optional hint="Needed for working-parent funded hours and Tax-Free Childcare." />
            <Switch label="A parent earns over £100,000" checked={v.rich} onChange={st.bind("rich")} optional hint="No working-parent funded hours or Tax-Free Childcare." />
            <Switch label="Use Tax-Free Childcare" checked={v.tfc} onChange={st.bind("tfc")} optional hint="20% top-up, up to £2,000 a year per child. Not with Universal Credit childcare costs." />
            <StepperField label="Other children under 16" value={v.kids} onChange={(n) => st.set("kids", Math.round(n))} step={1} min={0} max={10} unit="children" dp={0} optional />
            <Switch label="We get Universal Credit or another qualifying benefit" checked={v.ben} onChange={st.bind("ben")} optional hint="For the Sure Start Maternity Grant or Best Start Grant." />
            <Switch label="We qualify for Healthy Start" checked={v.hs} onChange={st.bind("hs")} optional hint="For example Universal Credit with take-home pay of £408 a month or less." />
            <MoneyField label="Higher earner's income a year" value={v.inc} onChange={st.bind("inc")} max={1_000_000} optional hint="Above £60,000 the High Income Child Benefit Charge takes back some Child Benefit." />
            <Switch label="Mother has worked for her employer for 26 weeks by the 15th week before the due date" checked={v.ms} onChange={st.bind("ms")} optional hint="Needed for Statutory Maternity Pay; otherwise Maternity Allowance may apply." />
            <StepperField label="Maternity leave" value={v.lw} onChange={(n) => st.set("lw", Math.round(n))} step={1} min={0} max={52} unit="weeks" dp={0} optional />
            <StepperField label="Employer pays full pay for" value={v.fp} onChange={(n) => st.set("fp", Math.round(n))} step={1} min={0} max={52} unit="weeks" dp={0} optional />
            <StepperField label="Then half pay for" value={v.hp} onChange={(n) => st.set("hp", Math.round(n))} step={1} min={0} max={52} unit="weeks" dp={0} optional />
            <MoneyField label="Partner's usual pay a week, before tax" value={v.pw} onChange={st.bind("pw")} max={10_000} optional />
            <Switch label="Partner qualifies for Statutory Paternity Pay" checked={v.ps} onChange={st.bind("ps")} optional />
            <StepperField label="Paternity leave" value={v.pwk} onChange={(n) => st.set("pwk", Math.round(n))} step={1} min={0} max={2} unit="weeks" dp={0} optional />
            <StepperField label="Employer pays partner full pay for" value={v.pfp} onChange={(n) => st.set("pfp", Math.round(n))} step={1} min={0} max={2} unit="weeks" dp={0} optional />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Net cost in year one"
        value={gbp(y1.net)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            In the first year you could spend about <b>{gbp(y1.spend)}</b>{" "}on your baby and get <b>{gbp(y1.help)}</b>{" "}back in help, a net cost of{" "}
            <b>{gbp(y1.net)}</b>.
            {r.leave.drop > 0 && (
              <>
                {" "}Add the drop in pay during leave (<b>{gbp(r.leave.drop)}</b>{" "}before tax) and the first year costs your household about{" "}
                <b>{gbp(r.year1WithLeave)}</b>.
              </>
            )}{" "}
            To age 5 the net cost comes to about <b>{gbp(r.total.net)}</b>.
          </>
        }
        badges={[NATION_LABEL[v.nation], LEVEL_LABEL[v.level], FEED_LABEL[v.feed], "Example prices"]}
      />

      <Facts
        items={[
          { label: "Spending, year one", value: gbp(y1.spend) },
          { label: "Help, year one", value: gbp(y1.help), tone: "good" },
          { label: "Net cost to age 5", value: gbp(r.total.net) },
          { label: "Pay drop during leave", value: gbp(r.leave.drop), note: "Before tax." },
        ]}
      />

      <Assumptions
        items={[
          { label: "Prices", value: "Examples at today's prices, no inflation" },
          { label: "Childcare", value: v.ch > 0 ? `${v.ch} hours a week from ${childcareFrom}, ${gbp(v.rate, true)} an hour, ${v.wk} weeks a year` : "None" },
          { label: "Funded hours", value: england ? "England's scheme for working parents" : "Not included outside England" },
          { label: "Child Benefit", value: `${gbp(r.childBenefitWeekly, true)} a week${r.hicbcShare > 0 ? ` after the charge (${Math.round(r.hicbcShare * 100)}% taken back)` : ""}` },
        ]}
      />

      <ResultCard title="Year one: where the money goes" sub={`${gbp(y1.spend)} before help.`}>
        <SplitBar
          segments={[
            { label: "Big items", value: y1.items, display: gbp(y1.items), color: "#2a78d6" },
            { label: "Formula", value: y1.feeding, display: gbp(y1.feeding), color: "#eb6834" },
            { label: "Nappies", value: y1.nappies, display: gbp(y1.nappies), color: "#1baf7a" },
            { label: "Clothes", value: y1.clothes, display: gbp(y1.clothes), color: "#4a3aa7" },
            { label: "Food", value: y1.food, display: gbp(y1.food), color: "#eda100" },
            { label: "Other", value: y1.other, display: gbp(y1.other), color: "#9aa1a9" },
            { label: "Childcare", value: y1.childcare, display: gbp(y1.childcare), color: "#e87ba4" },
          ]}
        />
      </ResultCard>

      <ResultCard title="Help you could get" sub="Year one and the total to age 5.">
        <Statement
          columns={["Year one", "To age 5"]}
          rows={[
            { label: "Child Benefit", values: [gbp(y1.childBenefit), gbp(r.years.reduce((a, y) => a + y.childBenefit, 0))] },
            { label: v.nation === "scotland" ? "Best Start Grant" : "Sure Start Maternity Grant", values: [gbp(y1.grant), gbp(y1.grant)] },
            { label: "Healthy Start", values: [gbp(y1.healthyStart), gbp(r.years.reduce((a, y) => a + y.healthyStart, 0))] },
            { label: "Tax-Free Childcare", values: [gbp(y1.tfc), gbp(r.years.reduce((a, y) => a + y.tfc, 0))] },
            { label: "Total help", values: [gbp(y1.help), gbp(r.total.help)], kind: "total" },
          ]}
        />
        {england && r.years.some((y) => y.funded > 0) && (
          <p className="footnote">
            Funded childcare hours are worth a further {gbp(r.years.reduce((a, y) => a + y.funded, 0))}{" "}to age 5; they are already taken off the childcare cost.
          </p>
        )}
      </ResultCard>

      <ResultCard title="Year by year to age 5">
        <Statement
          columns={["Spending", "Help", "Net cost"]}
          rows={[
            ...r.years.map((y) => ({ label: `Year ${y.year} (age ${y.year - 1} to ${y.year})`, values: [gbp(y.spend), gbp(y.help), gbp(y.net)] })),
            { label: "Total to age 5", values: [gbp(r.total.spend), gbp(r.total.help), gbp(r.total.net)], kind: "total" as const },
          ]}
        />
        <DataTable
          summary="Show every cost, year by year"
          columns={["Year", "Big items", "Formula", "Nappies", "Clothes", "Food", "Other", "Childcare", "Help"]}
          rows={r.years.map((y) => [y.year, gbp(y.items), gbp(y.feeding), gbp(y.nappies), gbp(y.clothes), gbp(y.food), gbp(y.other), gbp(y.childcare), gbp(y.help)])}
        />
      </ResultCard>

      <ResultCard title="Pay during parental leave" sub="Before tax and National Insurance.">
        <Statement
          columns={["Usual pay", "Pay on leave", "Drop"]}
          rows={[
            { label: `Mother: ${v.lw} weeks, ${leaveText}`, values: [gbp(r.leave.motherNormal), gbp(r.leave.motherPay), gbp(r.leave.motherDrop)] },
            { label: `Partner: ${Math.round(v.pwk)} weeks' paternity leave`, values: [gbp(v.pw * Math.round(v.pwk)), gbp(r.leave.partnerPay), gbp(r.leave.partnerDrop)] },
            { label: "Total drop in pay", values: ["", "", gbp(r.leave.drop)], kind: "total" },
          ]}
        />
        <p className="footnote">
          Check the details with the <a href="/uk/benefits/maternity-pay">maternity pay</a>{" "}and <a href="/uk/benefits/paternity-pay">paternity pay</a>{" "}calculators, or
          share leave with <a href="/uk/benefits/shared-parental-leave">Shared Parental Leave</a>.
        </p>
      </ResultCard>

      <ResultCard title="Worth knowing">
        <Callout title="These are example prices">
          Spending figures are examples to start from, not averages. Second-hand items, gifts and hand-me-downs can cut the big-item cost a lot. Always buy a
          new car seat or check a used one&rsquo;s history, and use a new cot mattress.
        </Callout>
        {!england && v.ch > 0 && (
          <Callout tone="warn" title={`Funded childcare in ${NATION_LABEL[v.nation]}`}>
            {NATION_LABEL[v.nation]} has its own funded childcare scheme, which this estimate leaves out, so the childcare cost here is before any funding.
            Check your local council for what applies.
          </Callout>
        )}
        {v.ch > 0 && (
          <Callout title="Childcare is usually the biggest cost">
            See what you pay after funded hours in the <a href="/uk/benefits/childcare-costs">childcare costs calculator</a>, and check the{" "}
            <a href="/uk/benefits/free-childcare-hours">free childcare hours</a>{" "}you can get. On Universal Credit, you can usually get back up to 85% of
            childcare costs instead of using Tax-Free Childcare.
          </Callout>
        )}
        <Callout title="Check what else you can claim">
          A new baby can increase <a href="/uk/benefits/universal-credit">Universal Credit</a>. Claim <a href="/uk/benefits/child-benefit">Child Benefit</a>{" "}
          even if you earn over £60,000, to protect National Insurance credits.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        2026/27 benefit and statutory pay rates. Spending figures are examples you can change. An estimate, not financial advice.
      </p>
    </Studio>
  );
}
