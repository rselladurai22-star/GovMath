"use client";

import { useId } from "react";
import { BAND_D_AVG, BAND_RANGES, bandMultiplier, bandsFor, councilBill, type CtBand, type CtNation } from "@/lib/property/council-tax-bands";
import { COUNCIL_BAND_D_2026, councilBandD } from "@/lib/property/council-band-d-2026";
import { Caveat, Flag, Foot, Hero, Inputs, Rows, Tool, type Row } from "@/components/calc/kit";
import { Mini, Pills } from "@/components/calc/fields";
import { MoneyField, SelectField, Switch } from "@/components/flagship/inputs";
import { gbp } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, text, useStudio, type Query } from "@/components/flagship/useStudio";

const ALL_BANDS: CtBand[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
const SCHEMA = {
  nation: oneOf<CtNation>("england", ["england", "wales", "scotland"]),
  band: oneOf<CtBand>("D", ALL_BANDS),
  council: text("", 60),
  bandD: num(0, 0, 10_000),
  adults: num(2, 0, 10),
  disabled: bool(false),
  premium: num(0, 0, 300),
  months: oneOf<"10" | "12">("10", ["10", "12"]),
};
const NATION_LABEL: Record<CtNation, string> = { england: "England", wales: "Wales", scotland: "Scotland" };
const VALUED: Record<CtNation, string> = { england: "1 April 1991", wales: "1 April 2003", scotland: "1 April 1991" };
const PREMIUM_MAX: Record<CtNation, number> = { england: 300, wales: 300, scotland: 100 };

function rangeLabel(nation: CtNation, band: CtBand): string {
  const list = BAND_RANGES[nation];
  const i = list.findIndex((b) => b.band === band);
  if (i < 0) return "";
  const lo = i === 0 ? 0 : (list[i - 1].upTo ?? 0) + 1;
  const hi = list[i].upTo;
  return hi === null ? `over ${gbp(lo - 1)}` : i === 0 ? `up to ${gbp(hi)}` : `${gbp(lo)} to ${gbp(hi)}`;
}

/** The band's share of Band D as a fraction: 6/9 in England and Wales, 240/360 in Scotland. */
function ratio(nation: CtNation, band: CtBand): string {
  if (band === "D") return "1";
  const m = bandMultiplier(nation, band);
  return nation === "scotland" ? `${Math.round(m * 360)}/360` : `${Math.round(m * 9)}/9`;
}

export default function CouncilTaxStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const group = useId();
  const bands = bandsFor(v.nation);
  const band: CtBand = bands.includes(v.band) ? v.band : "D";
  const council = v.council ? councilBandD(v.nation, v.council) : undefined;
  const ownRate = v.bandD > 0;
  const bandD = ownRate ? v.bandD : council ? council[2] : BAND_D_AVG[v.nation];
  const n = Number(v.months);
  const r = councilBill({ nation: v.nation, band, bandD, adultsCounted: v.adults, disabledReduction: v.disabled, premiumPct: Math.min(v.premium, PREMIUM_MAX[v.nation]), instalments: n });
  const where = ownRate ? "your council’s Band D charge" : council ? `the ${council[1]} average` : `the ${NATION_LABEL[v.nation]} average`;
  const maxBill = bandD * bandMultiplier(v.nation, bands[bands.length - 1]);
  const adults = Math.max(0, Math.round(v.adults));
  const changed = r.payable !== r.fullBill;

  const setNation = (x: CtNation) => {
    st.set("nation", x);
    st.set("council", "");
    if (!bandsFor(x).includes(v.band)) st.set("band", "D");
  };

  const steps: Row[] = [
    { label: `Band ${band} at ${where}`, note: `${ratio(v.nation, band)} of ${gbp(bandD, true)}`, value: gbp(r.fullBill, true) },
    ...(r.reduction > 0 ? [{ label: "Disabled band reduction", note: r.billedBand === band ? "Band A: one-ninth of Band D off" : `Billed as Band ${r.billedBand}`, value: `−${gbp(r.reduction, true)}`, tone: "good" as const }] : []),
    ...(r.discount > 0 ? [{ label: `${Math.round(r.discountRate * 100)}% discount`, note: adults === 0 ? "No adult counts" : "One adult counts", value: `−${gbp(r.discount, true)}`, tone: "good" as const }] : []),
    ...(r.premium > 0 ? [{ label: `${Math.min(v.premium, PREMIUM_MAX[v.nation])}% premium`, note: "On the full band charge", value: `+${gbp(r.premium, true)}`, tone: "bad" as const }] : []),
    { label: "You pay a year", value: gbp(r.payable, true), strong: true },
  ];

  return (
    <Tool label="Council tax band calculator">
      <div className="sa-ctb">
        <div className="sa-ctb-inputs">
          <Inputs title="Where you live">
            <Pills
              label="Nation"
              value={v.nation}
              onChange={setNation}
              options={[
                { value: "england", label: "England" },
                { value: "wales", label: "Wales" },
                { value: "scotland", label: "Scotland" },
              ]}
            />
            <SelectField
              label="Council"
              value={council ? council[0] : ""}
              onChange={(id) => {
                st.set("council", id);
                st.set("bandD", 0);
              }}
              options={[{ value: "", label: `${NATION_LABEL[v.nation]} average (${gbp(BAND_D_AVG[v.nation])})` }, ...COUNCIL_BAND_D_2026[v.nation].map((c) => ({ value: c[0], label: c[1] }))]}
              hint={
                v.nation === "scotland"
                  ? "The council’s own Band D. Water and waste water charges are billed on top."
                  : "The area’s average Band D, including police, fire and the average parish precept."
              }
            />
            <Mini label="Adults who count (18 or over, not disregarded)" value={adults} onChange={(x) => st.set("adults", Math.max(0, Math.min(10, Math.round(x))))} min={0} max={10} stepper hint="One gets 25% off, none gets 50% off. Students, carers and apprentices do not count." />
            <div className="sa-ctb-pay">
              <Pills
                label="Pay in"
                value={v.months}
                onChange={st.bind("months")}
                options={[
                  { value: "10", label: "10 months" },
                  { value: "12", label: "12 months" },
                ]}
              />
            </div>
            <details className="sa-ctb-more" open={ownRate || v.disabled || v.premium > 0 || undefined}>
              <summary>Your own Band D, reductions and premiums</summary>
              <div className="sa-ctb-moregrid">
                <MoneyField
                  label="Band D charge from your bill"
                  value={v.bandD}
                  onChange={st.bind("bandD")}
                  pence
                  hint="Overrides the council average. It is printed on your bill, including your parish."
                />
                <Switch label="Disabled band reduction" checked={v.disabled} onChange={st.bind("disabled")} hint="A room, bathroom or wheelchair space a disabled resident needs: billed one band lower." />
                <Mini
                  label="Second or empty home premium"
                  value={Math.min(v.premium, PREMIUM_MAX[v.nation])}
                  onChange={(x) => st.set("premium", Math.max(0, Math.min(PREMIUM_MAX[v.nation], Math.round(x / 25) * 25)))}
                  min={0}
                  max={PREMIUM_MAX[v.nation]}
                  step={25}
                  suffix="%"
                  stepper
                  hint={v.nation === "scotland" ? "Up to 100% in Scotland." : v.nation === "wales" ? "Up to 300% in Wales." : "England: up to 100% on second homes, 100% to 300% on homes empty a year or more."}
                />
              </div>
            </details>
          </Inputs>
        </div>

        <div className="sa-ctb-main">
          <Hero
            label={`Band ${band} council tax, ${council ? council[1] : NATION_LABEL[v.nation]}${!ownRate && !council ? " average" : ""}, 2026/27`}
            value={gbp(r.payable)}
            unit="a year"
            sub={
              <>
                <b>{gbp(r.instalment, true)}</b> a month over {n} months{changed ? <>, after {r.discount + r.reduction > 0 ? "discounts" : "the premium"}</> : null}. About {gbp(r.weekly, true)} a week.
              </>
            }
          />

          <fieldset className="sa-ctb-ladder">
            <legend>
              Every band at {where}. Pick yours: it is on your bill.
            </legend>
            <div className="sa-ctb-head" aria-hidden="true">
              <span>Band and value on {VALUED[v.nation]}</span>
              <span>Ratio</span>
              <span>A year</span>
            </div>
            {bands.map((b) => {
              const bill = bandD * bandMultiplier(v.nation, b);
              const on = b === band;
              return (
                <label key={b} className={`sa-ctb-rung${on ? " is-on" : ""}${b === "D" ? " is-d" : ""}`}>
                  <input type="radio" name={group} value={b} checked={on} onChange={() => st.set("band", b)} />
                  <span className="sa-ctb-letter" aria-hidden="true">
                    {b}
                  </span>
                  <span className="sa-ctb-range">
                    <span className="sr-only">Band {b}, </span>
                    {rangeLabel(v.nation, b)}
                  </span>
                  <span className="sa-ctb-ratio">{ratio(v.nation, b)}</span>
                  <span className="sa-ctb-bar" aria-hidden="true">
                    <span style={{ width: `${(bill / maxBill) * 100}%` }} />
                  </span>
                  <span className="sa-ctb-bill">
                    {gbp(bill)}
                    <small>{gbp(bill / n)} × {n}</small>
                  </span>
                </label>
              );
            })}
          </fieldset>

          {changed && <Rows caption="How your bill is worked out" rows={steps} />}

          {adults >= 2 && (
            <Flag title="Two adults pay the full bill">
              If only one of you counts, the 25% single person discount takes {gbp(r.fullBill * 0.25)} off this band. Check who is disregarded on the single person discount page.
            </Flag>
          )}

          <Foot>
            <Caveat>
              {ownRate
                ? "Exact for the Band D charge you entered, 2026/27."
                : council
                  ? `2026/27. ${council[1]}’s area average${v.nation === "scotland" ? "" : ", so a parish precept can move your bill a little either way"}.`
                  : `2026/27 national average, so a guide: choose your council or enter the Band D on your bill.`}{" "}
              It leaves out Council Tax Reduction{v.nation === "scotland" ? " and water charges" : ""}.
            </Caveat>
            <ShareButton copied={st.copied} onClick={st.share} />
          </Foot>
        </div>
      </div>
    </Tool>
  );
}
