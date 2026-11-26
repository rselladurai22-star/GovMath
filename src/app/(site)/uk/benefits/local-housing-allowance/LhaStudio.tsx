"use client";

import { bedroomEntitlement, bedroomPlan, LHA_AREAS, LHA_AREAS_BY_NATION, LHA_DEFAULT_AREA, lhaHelp, lhaMonthly, lhaNation, lhaWeekly, weeklyToMonthly, type BedroomInput, type LhaCategory } from "@/lib/benefits/lha-engine";
import { SCOTLAND_AREA_COVERS } from "@/lib/benefits/lha-scotland-wales";
import { NORTHERN_IRELAND_AREA_COVERS } from "@/lib/benefits/lha-northern-ireland";
import { Caveat, Flag, Foot, Inputs, Tool } from "@/components/calc/kit";
import { Mini, Pills } from "@/components/calc/fields";
import { AdvancedOptions, MoneyField, SelectField, Switch } from "@/components/flagship/inputs";
import { gbp } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, text, useStudio, type Query } from "@/components/flagship/useStudio";
import BedroomTiles from "./BedroomTiles";
import RentBar from "./RentBar";

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
const HOUSEHOLD_MORE = ["adults", "exempt", "carer", "disabledOwn"] as const;
const CATS: { key: LhaCategory; label: string; short: string }[] = [
  { key: "shared", label: "Room in a shared home", short: "Shared-room" },
  { key: "1", label: "1 bedroom", short: "1-bedroom" },
  { key: "2", label: "2 bedrooms", short: "2-bedroom" },
  { key: "3", label: "3 bedrooms", short: "3-bedroom" },
  { key: "4", label: "4 bedrooms", short: "4-bedroom" },
];
const COVERS: Record<string, string> = { ...SCOTLAND_AREA_COVERS, ...NORTHERN_IRELAND_AREA_COVERS };

export default function LhaStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const area = LHA_AREAS.includes(v.area) ? v.area : "Bristol";
  const nation = lhaNation(area);
  const uc = v.claim === "uc";
  const household: BedroomInput = {
    couple: v.couple,
    under35: v.under35,
    sharedExempt: v.exempt,
    otherAdults: v.adults,
    children: { boysUnder10: v.boysU10, girlsUnder10: v.girlsU10, boys10to15: v.boys10, girls10to15: v.girls10 },
    overnightCarer: v.carer,
    disabledChildrenOwnRoom: v.disabledOwn,
  };
  const rooms = bedroomEntitlement(household);
  const tiles = bedroomPlan(household);
  const cat = CATS.find((c) => c.key === rooms.category) ?? CATS[1];
  const weekly = v.manual > 0 ? v.manual : lhaWeekly(area, rooms.category);
  const rentMonthly = v.period === "week" ? weeklyToMonthly(v.rent) : v.rent;
  // Universal Credit has its own monthly rates; Housing Benefit uses the weekly rate.
  const ucMonthly = v.manual > 0 ? weeklyToMonthly(v.manual) : lhaMonthly(area, rooms.category);
  const h = uc ? lhaHelp(weekly, rentMonthly, 0, ucMonthly) : lhaHelp(weekly, rentMonthly);
  const kids = v.boysU10 + v.girlsU10 + v.boys10 + v.girls10;
  const byWeek = v.period === "week";
  const money = (monthly: number) => gbp(byWeek ? (monthly * 12) / 52 : monthly, true);
  const per = byWeek ? "a week" : "a month";
  const canBeShared = !v.couple && kids === 0 && v.adults === 0;
  const short = h.monthlyShortfall > 0.005;

  const kid = (key: "boysU10" | "girlsU10" | "boys10" | "girls10", label: string) => <Mini label={label} value={v[key]} onChange={(n) => st.set(key, Math.round(n))} min={0} max={8} stepper />;

  return (
    <Tool label="Local Housing Allowance calculator">
      <div className="sa-lha">
        <p className="sa-lha-topline" aria-hidden="true">
          <span>
            Most rent covered <b>{money(h.monthlyRate)}</b> {per}
          </span>
          {rentMonthly > 0 && <span className={short ? "is-short" : undefined}>{short ? `${money(h.monthlyShortfall)} short` : "Rent within the limit"}</span>}
        </p>
        <section className="sa-lha-step sa-lha-step--who" aria-labelledby="lha-step1">
          <h2 className="sa-lha-h" id="lha-step1">
            <span aria-hidden="true">1</span> Who lives with you
          </h2>
          <Inputs tone="plain">
            <div className="sa-lha-who-top">
              <Pills
                label="You are"
                value={v.couple ? "couple" : "single"}
                onChange={(x) => st.set("couple", x === "couple")}
                options={[
                  { value: "single", label: "Single" },
                  { value: "couple", label: "A couple" },
                ]}
              />
              {canBeShared && (
                <Pills
                  label="Your age"
                  value={v.under35 ? "under" : "over"}
                  onChange={(x) => st.set("under35", x === "under")}
                  options={[
                    { value: "under", label: "Under 35" },
                    { value: "over", label: "35 or over" },
                  ]}
                />
              )}
            </div>
            <fieldset className="sa-lha-kids">
              <legend>Children under 16</legend>
              <div>
                {kid("boysU10", "Boys under 10")}
                {kid("girlsU10", "Girls under 10")}
                {kid("boys10", "Boys 10 to 15")}
                {kid("girls10", "Girls 10 to 15")}
              </div>
            </fieldset>
          </Inputs>
          <div className="sa-lha-entitled" aria-live="polite">
            <p>
              You are allowed{" "}
              <b>{rooms.sharedRate ? "a room in a shared home" : `${Math.min(4, rooms.rooms)} ${Math.min(4, rooms.rooms) === 1 ? "bedroom" : "bedrooms"}`}</b>
              {rooms.overCap ? `: you need ${rooms.rooms}, but the rates stop at four` : ""}
            </p>
            <BedroomTiles tiles={tiles} shared={rooms.sharedRate} />
          </div>
          <div className="sa-lha-more">
          <Inputs tone="plain">
            <AdvancedOptions description="Other adults, an overnight carer, a disabled child, shared-rate exemptions." changed={st.changed([...HOUSEHOLD_MORE])} onReset={() => st.resetKeys([...HOUSEHOLD_MORE])}>
              <div className="sa-lha-morecount">
                <Mini label="Other people aged 16 or over" value={v.adults} onChange={(n) => st.set("adults", Math.round(n))} min={0} max={6} stepper hint="A grown-up child, parent or other relative. One room each." />
                {kids > 0 && <Mini label="Disabled children who cannot share" value={v.disabledOwn} onChange={(n) => st.set("disabledOwn", Math.round(n))} min={0} max={Math.min(6, kids)} stepper hint="On DLA middle or highest rate care." />}
              </div>
              <Switch label="A carer who lives elsewhere stays overnight" checked={v.carer} onChange={st.bind("carer")} hint="For you, your partner or a child, where the person cared for gets a disability benefit. Adds a bedroom." />
              {canBeShared && v.under35 && (
                <Switch
                  label="I am exempt from the shared rate"
                  checked={v.exempt}
                  onChange={st.bind("exempt")}
                  hint="Care leaver under 25; getting PIP daily living, DLA middle or highest rate care or Attendance Allowance; three months in a homeless hostel; survivor of domestic abuse or modern slavery."
                />
              )}
            </AdvancedOptions>
          </Inputs>
          </div>
        </section>

        <section className="sa-lha-step sa-lha-step--rent" aria-labelledby="lha-step2">
          <h2 className="sa-lha-h" id="lha-step2">
            <span aria-hidden="true">2</span> Where you rent and what you pay
          </h2>
          <Inputs tone="plain">
            <div className="sa-lha-place">
              <SelectField
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
              <SelectField
                label="Rental market area"
                value={area}
                onChange={st.bind("area")}
                options={LHA_AREAS_BY_NATION[nation].map((a) => ({ value: a, label: COVERS[a] ? `${a} (${COVERS[a]})` : a }))}
                hint={nation === "ni" ? "Find your postcode district in the list, or ask the Housing Executive." : "Your Broad Rental Market Area. It can cross council boundaries: check a postcode on LHA Direct, linked under Sources."}
              />
            </div>
            <div className="sa-lha-pay">
              <Mini label={byWeek ? "Rent a week" : "Rent a month"} value={v.rent} onChange={st.bind("rent")} prefix="£" max={20_000} step={byWeek ? 5 : 25} dp={byWeek ? 2 : 0} wide />
              <Pills
                label="Paid"
                value={v.period}
                onChange={st.bind("period")}
                options={[
                  { value: "month", label: "Monthly" },
                  { value: "week", label: "Weekly" },
                ]}
              />
              <Pills
                label="Claiming"
                value={v.claim}
                onChange={st.bind("claim")}
                options={[
                  { value: "uc", label: "Universal Credit" },
                  { value: "hb", label: "Housing Benefit" },
                ]}
              />
            </div>
          </Inputs>

          <div className="sa-lha-answer" aria-live="polite">
            <p className="sa-lha-kicker">
              {v.manual > 0 ? "Your own rate" : `${cat.short} rate in ${area}`}, {uc ? "Universal Credit" : "Housing Benefit"}
            </p>
            <p className="sa-lha-rate">
              <b>{money(h.monthlyRate)}</b> <span>{per}</span>
            </p>
            {rentMonthly > 0 && (
              <>
                <RentBar rent={rentMonthly} limit={h.monthlyRate} money={money} per={per} />
                <p className={`sa-lha-verdict${short ? " is-short" : ""}`}>
                  {short ? (
                    <>
                      <b>{money(h.monthlyShortfall)}</b> {per} of your rent is above the limit. That part is yours to pay, whatever your income.
                    </>
                  ) : (
                    <>Your rent is within the limit, so all of it counts towards your claim.</>
                  )}
                </p>
              </>
            )}
          </div>
          <Inputs tone="plain">
            <AdvancedOptions description="Use a rate your council has given you." changed={st.changed(["manual"])} onReset={() => st.resetKeys(["manual"])}>
              <MoneyField label="Your own weekly LHA rate" value={v.manual} onChange={st.bind("manual")} pence optional hint="Replaces the published rate for your area." />
            </AdvancedOptions>
          </Inputs>
        </section>

        {rooms.sharedRate && (
          <Flag title="Under 35 and single: the shared rate">
            You can rent a self-contained flat, but help is limited to the going rate for a room. Check the exemptions under More options in step 1: one of them moves you to the one-bedroom rate of{" "}
            {uc ? `${gbp(lhaMonthly(area, "1"), true)} a month` : `${gbp(lhaWeekly(area, "1"), true)} a week`}.
          </Flag>
        )}

        {v.manual === 0 && (
          <div className="sa-lha-rates">
            <h3 className="sa-lha-h3">Every rate in {area}</h3>
            <div className="sa-tablewrap">
              <table>
                <thead>
                  <tr>
                    <th scope="col">Size</th>
                    <th scope="col">Universal Credit, a month</th>
                    <th scope="col">Housing Benefit, a week</th>
                  </tr>
                </thead>
                <tbody>
                  {CATS.map((c) => (
                    <tr key={c.key} className={c.key === rooms.category ? "is-yours" : undefined}>
                      <th scope="row">
                        {c.label}
                        {c.key === rooms.category && <span> · yours</span>}
                      </th>
                      <td>{gbp(lhaMonthly(area, c.key), true)}</td>
                      <td>{gbp(lhaWeekly(area, c.key), true)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <Foot>
          <Caveat>
            Exact published rates for 2026/27, unchanged since April 2024. This is the most rent that can count, not your award: income, savings, other adults at home and the benefit cap can all reduce what is paid.
          </Caveat>
          <ShareButton copied={st.copied} onClick={st.share} />
        </Foot>
      </div>
    </Tool>
  );
}
