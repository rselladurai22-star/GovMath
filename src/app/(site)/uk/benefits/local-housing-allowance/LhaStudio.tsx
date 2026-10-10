"use client";

import { bedroomEntitlement, LHA_AREAS, LHA_AREAS_BY_NATION, LHA_DEFAULT_AREA, lhaHelp, lhaMonthly, lhaNation, lhaWeekly, weeklyToMonthly, LHA_NATION_LABEL, type LhaCategory } from "@/lib/benefits/lha-engine";
import { SCOTLAND_AREA_COVERS } from "@/lib/benefits/lha-scotland-wales";
import { NORTHERN_IRELAND_AREA_COVERS } from "@/lib/benefits/lha-northern-ireland";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, SelectField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { gbp, per } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, text, useStudio, type Query } from "@/components/flagship/useStudio";

const SCHEMA = {
  area: text("Bristol", 60),
  rent: num(1_100, 0, 20_000),
  period: oneOf<"month" | "week">("month", ["month", "week"]),
  claim: oneOf<"uc" | "hb">("uc", ["uc", "hb"]),
  couple: bool(false),
  under35: bool(false),
  boysU10: num(0, 0, 8),
  girlsU10: num(0, 0, 8),
  boys10: num(0, 0, 8),
  girls10: num(0, 0, 8),
  adults: num(0, 0, 6),
  exempt: bool(false),
  carer: bool(false),
  disabledOwn: num(0, 0, 6),
  manual: num(0, 0, 2_000),
};
const ADVANCED = ["adults", "exempt", "carer", "disabledOwn", "manual"] as const;
const CATS: { key: LhaCategory; label: string }[] = [
  { key: "shared", label: "Shared accommodation" },
  { key: "1", label: "1 bedroom" },
  { key: "2", label: "2 bedrooms" },
  { key: "3", label: "3 bedrooms" },
  { key: "4", label: "4 bedrooms" },
];
const catLabel = (c: LhaCategory) => CATS.find((x) => x.key === c)?.label ?? c;
const COVERS: Record<string, string> = { ...SCOTLAND_AREA_COVERS, ...NORTHERN_IRELAND_AREA_COVERS };
const areaLabel = (a: string) => (COVERS[a] ? `${a} (${COVERS[a]})` : a);

export default function LhaStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const area = LHA_AREAS.includes(v.area) ? v.area : "Bristol";
  const nation = lhaNation(area);
  const uc = v.claim === "uc";
  const rooms = bedroomEntitlement({
    couple: v.couple,
    under35: v.under35,
    sharedExempt: v.exempt,
    otherAdults: v.adults,
    children: { boysUnder10: v.boysU10, girlsUnder10: v.girlsU10, boys10to15: v.boys10, girls10to15: v.girls10 },
    overnightCarer: v.carer,
    disabledChildrenOwnRoom: v.disabledOwn,
  });
  const weekly = v.manual > 0 ? v.manual : lhaWeekly(area, rooms.category);
  const rentMonthly = v.period === "week" ? weeklyToMonthly(v.rent) : v.rent;
  const nextCat: LhaCategory | null = rooms.category === "shared" ? "1" : rooms.category === "4" ? null : (String(Number(rooms.category) + 1) as LhaCategory);
  const nextWeekly = nextCat ? lhaWeekly(area, nextCat) : 0;
  // Universal Credit has its own monthly rates; Housing Benefit uses the weekly rate.
  const ucMonthly = v.manual > 0 ? weeklyToMonthly(v.manual) : lhaMonthly(area, rooms.category);
  const h = uc ? lhaHelp(weekly, rentMonthly, nextWeekly, ucMonthly, nextCat ? lhaMonthly(area, nextCat) : 0) : lhaHelp(weekly, rentMonthly, nextWeekly);
  const rateText = uc ? `${gbp(h.monthlyRate, true)} a month` : `${gbp(weekly, true)} a week`;
  const rateOf = (c: LhaCategory) => (uc ? `${gbp(lhaMonthly(area, c), true)} a month` : `${gbp(lhaWeekly(area, c), true)} a week`);
  const kids = v.boysU10 + v.girlsU10 + v.boys10 + v.girls10;
  const areaRates = CATS.map((c) => ({ ...c, weekly: lhaWeekly(area, c.key), monthly: lhaMonthly(area, c.key) }));
  const maxRate = Math.max(1, ...areaRates.map((x) => x.weekly));
  const show = (m: number) => (v.period === "week" ? gbp((m * 12) / 52, true) : gbp(m, true));
  const perLabel = v.period === "week" ? "a week" : "a month";

  const stepper = (key: "boysU10" | "girlsU10" | "boys10" | "girls10" | "adults" | "disabledOwn", label: string, optional = false, hint?: string) => (
    <StepperField label={label} value={v[key]} onChange={(n) => st.set(key, Math.round(n))} step={1} min={0} max={key === "adults" || key === "disabledOwn" ? 6 : 8} unit="people" dp={0} optional={optional} hint={hint} />
  );

  return (
    <Studio
      title="Your home and household"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Check my Local Housing Allowance"
      onReset={st.reset}
      dock={{ label: `LHA ${perLabel}`, value: show(h.monthlyRate) }}
      inputs={
        <>
          <InputGroup title="Where you rent">
            <Segmented
              label="Country"
              value={nation}
              onChange={(n) => st.set("area", LHA_DEFAULT_AREA[n])}
              options={[
                { value: "england", label: "England" },
                { value: "scotland", label: "Scotland" },
                { value: "wales", label: "Wales" },
                { value: "ni", label: "Northern Ireland" },
              ]}
            />
            <SelectField label="Broad Rental Market Area" value={area} onChange={st.bind("area")} options={LHA_AREAS_BY_NATION[nation].map((a) => ({ value: a, label: areaLabel(a) }))} hint={nation === "ni" ? "Find your postcode district in the list, or ask the Housing Executive." : "Your council can confirm which area you are in."} />
            <Segmented
              label="Claiming"
              value={v.claim}
              onChange={st.bind("claim")}
              options={[
                { value: "uc", label: "Universal Credit", note: "Universal Credit has its own monthly rates." },
                { value: "hb", label: "Housing Benefit", note: "Housing Benefit uses weekly rates. It is mostly for people over State Pension age or in supported housing." },
              ]}
            />
            <Segmented
              label="Rent is paid"
              value={v.period}
              onChange={st.bind("period")}
              options={[
                { value: "month", label: "Monthly" },
                { value: "week", label: "Weekly" },
              ]}
            />
            <MoneyField label={v.period === "week" ? "Rent a week" : "Rent a month"} value={v.rent} onChange={st.bind("rent")} hint="Including eligible service charges, not energy or water." />
          </InputGroup>
          <InputGroup title="Who lives with you">
            <Segmented
              label="You are"
              value={v.couple ? "couple" : "single"}
              onChange={(x) => st.set("couple", x === "couple")}
              options={[
                { value: "single", label: "Single" },
                { value: "couple", label: "A couple" },
              ]}
            />
            {!v.couple && kids === 0 && v.adults === 0 && <Switch label="I am under 35" checked={v.under35} onChange={st.bind("under35")} hint="Single people under 35 usually get the shared accommodation rate." />}
            {stepper("boysU10", "Boys under 10")}
            {stepper("girlsU10", "Girls under 10")}
            {stepper("boys10", "Boys aged 10 to 15")}
            {stepper("girls10", "Girls aged 10 to 15")}
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            {stepper("adults", "Other people aged 16 or over", true, "Such as grown-up children. Each gets their own bedroom.")}
            {!v.couple && v.under35 && kids === 0 && <Switch label="Exempt from the shared rate" checked={v.exempt} onChange={st.bind("exempt")} optional hint="For example a care leaver under 25, getting PIP daily living or DLA middle or higher care, or leaving a hostel or refuge." />}
            <Switch label="A non-resident carer stays overnight" checked={v.carer} onChange={st.bind("carer")} optional hint="Gives an extra bedroom." />
            {kids > 0 && stepper("disabledOwn", "Disabled children who cannot share", true, "Each gets their own bedroom.")}
            <MoneyField label="Or enter a weekly LHA rate" value={v.manual} onChange={st.bind("manual")} pence optional hint="A rate from your council or the Housing Executive, if you have one." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={`Local Housing Allowance ${perLabel}`}
        value={show(h.monthlyRate)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            {v.manual > 0 ? "Using your rate, " : <>In {area}{nation === "ni" && area !== "Belfast" ? ", Northern Ireland" : ""}, </>}your household gets the <b>{catLabel(rooms.category).toLowerCase()}</b> rate of <b>{rateText}</b>.{" "}
            {h.monthlyShortfall > 0 ? (
              <>
                Your rent is <b>{show(h.monthlyShortfall)}</b> {perLabel} more than that, so you would pay the difference yourself.
              </>
            ) : (
              <>Your rent is within the limit, so all of it can be covered, subject to your income.</>
            )}
          </>
        }
        badges={[`${rooms.sharedRate ? "Shared rate" : `${Math.min(4, rooms.rooms)} bedroom${rooms.rooms === 1 ? "" : "s"}`}`, rateText, h.monthlyShortfall > 0 ? `${show(h.monthlyShortfall)} shortfall` : "No shortfall"]}
      />

      <Facts
        items={[
          { label: "Bedrooms allowed", value: rooms.sharedRate ? "Shared" : String(Math.min(4, rooms.rooms)), note: rooms.overCap ? `${rooms.rooms} needed, capped at 4` : undefined },
          { label: "LHA a month", value: gbp(h.monthlyRate, true) },
          { label: "Help towards rent", value: show(h.monthlyHelp), tone: "good" },
          { label: "Shortfall", value: show(h.monthlyShortfall), tone: h.monthlyShortfall > 0 ? "warn" : undefined },
        ]}
      />

      <Assumptions
        items={[
          { label: "Rates", value: "April 2024 rates, frozen for 2026/27" },
          { label: "Area", value: v.manual > 0 ? "Your own rate" : `${area}, ${LHA_NATION_LABEL[nation]}` },
          { label: "Claim", value: uc ? "Universal Credit (monthly rates)" : "Housing Benefit (weekly rates)" },
          { label: "Monthly", value: uc && v.manual === 0 ? "Universal Credit's published monthly rate" : "Weekly rate × 52 ÷ 12" },
          { label: "Means test", value: "Not applied: this is the most rent covered" },
        ]}
      />

      {rentMonthly > 0 && (
        <ResultCard title="Your rent" sub={`${show(rentMonthly)} ${perLabel}.`}>
          <SplitBar
            segments={[
              { label: "Covered by LHA", value: h.monthlyHelp, display: show(h.monthlyHelp), color: "#5b1e6e" },
              { label: "You pay", value: h.monthlyShortfall, display: show(h.monthlyShortfall), color: "#f59e0b" },
            ]}
          />
        </ResultCard>
      )}

      {v.manual === 0 && (
        <ResultCard title={`All rates in ${area}`} sub="Universal Credit a month and Housing Benefit a week.">
          <Compare
            head={uc ? ["Category", "Universal Credit"] : ["Category", "Housing Benefit"]}
            rows={areaRates.map((c) => ({
              label: c.label,
              value: uc ? `${gbp(c.monthly, true)} a month` : `${gbp(c.weekly, true)} a week`,
              delta: uc ? `HB ${gbp(c.weekly, true)} a week` : `UC ${gbp(c.monthly, true)} a month`,
              bar: c.weekly / maxRate,
              current: c.key === rooms.category,
            }))}
          />
        </ResultCard>
      )}

      <ResultCard title="Worth knowing" sub="About your entitlement.">
        {rooms.sharedRate && (
          <Callout title="The shared accommodation rate">
            Single people under 35 without children are limited to the cost of a room in a shared house, {rateOf("shared")} here. Exemptions include care leavers under 25, people getting the
            daily living part of PIP, and people who have lived in a homeless hostel for three months.
          </Callout>
        )}
        {rooms.overCap && (
          <Callout tone="warn" title="LHA stops at four bedrooms">
            Your household needs {rooms.rooms} {per(rooms.rooms, "bedrooms")}, but the highest rate is for four.
          </Callout>
        )}
        {h.monthlyShortfall > 0 && nextCat && v.manual === 0 && (
          <Callout title="Could you need another bedroom?">
            The {catLabel(nextCat).toLowerCase()} rate here is {rateOf(nextCat)}. Check the rules on overnight carers, disabled children and foster carers under More options.
          </Callout>
        )}
        {h.monthlyShortfall > 0 && (
          <Callout title="Ask for a Discretionary Housing Payment">
            Your council can help with a shortfall for a time, especially while you look for a cheaper home or if moving would be very difficult.
          </Callout>
        )}
        <Callout title="What you actually get depends on your income">
          LHA is the most rent that Universal Credit or Housing Benefit will cover. Your award also depends on your income, savings and the benefit cap. Use the{" "}
          <a href="/uk/benefits/universal-credit">Universal Credit calculator</a> for the full picture.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Rates from the Valuation Office Agency (England), the Scottish Government, Rent Officers Wales and the Northern Ireland Housing Executive; Universal Credit monthly rates from the DWP and the Housing Executive. An estimate, not a decision on your claim.
      </p>
    </Studio>
  );
}
