"use client";

import { useMemo } from "react";
import { grossEquivalent, PREMIUM_BONDS, premiumBondsYear, savingsAfterTax, SAVINGS_TAX, type TaxBand } from "@/lib/investing/growth";
import { Caveat, Foot, Hero, Inputs, Tool } from "@/components/calc/kit";
import { Mini } from "@/components/calc/fields";
import { MoneyField, SelectField } from "@/components/flagship/inputs";
import { gbp, percent } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const SCHEMA = {
  holding: num(10_000, 0, PREMIUM_BONDS.max),
  rate: num(PREMIUM_BONDS.rate * 100, 0, 10),
  savingsRate: num(4, 0, 15),
  band: oneOf<TaxBand>("basic", ["none", "basic", "higher", "additional"]),
  psaUsed: num(0, 0, 1_000),
};

const BINS = 24;

/** The simulated years as histogram bars, from £0 to about the 98th percentile, with the rest in the last bar. */
function histogram(totals: number[]) {
  const top = totals[Math.floor(totals.length * 0.98)] || 25;
  // Round the bar width to a prize-sized step so bars line up with prize values.
  const raw = Math.max(25, top / BINS);
  const step = raw <= 25 ? 25 : raw <= 50 ? 50 : Math.ceil(raw / 25) * 25;
  const counts = new Array(BINS).fill(0) as number[];
  for (const t of totals) counts[Math.min(BINS - 1, Math.floor(t / step))]++;
  const used = Math.max(1, counts.reduce((last, c, i) => (c > 0 ? i : last), 0) + 1);
  return { step, counts: counts.slice(0, used) };
}

export default function PremiumBondsStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const holding = Math.floor(v.holding);
  const tooSmall = holding < PREMIUM_BONDS.min;
  const rate = v.rate / 100;
  const r = useMemo(() => premiumBondsYear(holding, rate), [holding, rate]);
  const sav = savingsAfterTax(holding, v.savingsRate / 100, v.band, v.psaUsed);
  const h = useMemo(() => histogram(r.totals), [r.totals]);
  const max = Math.max(...h.counts);
  const span = h.step * h.counts.length;
  const at = (x: number) => `${Math.min(100, (x / span) * 100)}%`;
  const beat = r.totals.filter((t) => t >= sav.net).length / r.totals.length;
  const nothing = r.chanceNothing;
  const nothingText =
    nothing >= 0.995 ? "You will almost certainly win nothing this year." : nothing < 0.005 ? "You are all but certain to win at least one prize this year." : `There is a ${percent(nothing, 0)} chance of winning nothing at all this year.`;
  const marks = [
    { key: "p10", label: "Unlucky", value: r.p10 },
    { key: "p50", label: "Typical", value: r.median },
    { key: "p90", label: "Lucky", value: r.p90 },
  ];

  return (
    <Tool label="Premium Bonds calculator">
      <div className="sa-pb">
        <div className="sa-pb-inputs">
          <Inputs title="Your Bonds and the alternative">
            <MoneyField label="Amount in Premium Bonds" value={v.holding} onChange={st.bind("holding")} slider={{ min: 25, max: 50_000, step: 25, ends: ["£25", "£50,000"] }} hint="From £25 to the £50,000 limit." />
            <Mini label="Savings account rate to compare" value={v.savingsRate} onChange={st.bind("savingsRate")} suffix="% AER" step={0.1} dp={2} max={15} stepper />
            <SelectField label="Your Income Tax band" value={v.band} onChange={st.bind("band")} options={(Object.keys(SAVINGS_TAX) as TaxBand[]).map((k) => ({ value: k, label: SAVINGS_TAX[k].label }))} />
            <details className="sa-pb-more" open={v.psaUsed > 0 || v.rate !== PREMIUM_BONDS.rate * 100 || undefined}>
              <summary>Other interest and the prize rate</summary>
              <div className="sa-pb-moregrid">
                <MoneyField label="Savings allowance already used" value={v.psaUsed} onChange={st.bind("psaUsed")} hint="Interest from other accounts this tax year." />
                <Mini label="Prize fund rate" value={v.rate} onChange={st.bind("rate")} suffix="%" step={0.05} dp={2} max={10} stepper hint={`${percent(PREMIUM_BONDS.rate, 2)} now. NS&I can change it.`} />
              </div>
            </details>
          </Inputs>
        </div>

        <div className="sa-pb-main">
          <Hero
            label={tooSmall ? "Below the minimum" : `A typical year’s prizes on ${gbp(holding)}`}
            value={tooSmall ? gbp(PREMIUM_BONDS.min) : gbp(r.median)}
            unit={tooSmall ? "is the least you can hold" : "tax-free"}
            sub={
              tooSmall ? undefined : (
                <>
                  {percent(r.medianRate, 2)} in the median year, not the {percent(rate, 2)} prize rate. {nothingText}
                </>
              )
            }
          />

          {!tooSmall && (
            <figure className="sa-pb-hist">
              <figcaption className="sa-pb-cap">
                <b>4,000 simulated years</b> of prizes at the {PREMIUM_BONDS.draw} prize table
              </figcaption>
              <div
                className="sa-pb-plot"
                role="img"
                aria-label={`Simulated yearly prizes on ${gbp(holding)}: unlucky year ${gbp(r.p10)}, typical ${gbp(r.median)}, lucky ${gbp(r.p90)}; a savings account pays ${gbp(sav.net)} after tax, which the Bonds beat in ${percent(beat, 0)} of years.`}
              >
                <div className="sa-pb-bars" aria-hidden="true">
                  {h.counts.map((c, i) => (
                    <span key={i} style={{ height: `${(c / max) * 100}%` }} className={r.median >= i * h.step && r.median < (i + 1) * h.step ? "is-median" : undefined} />
                  ))}
                </div>
                {marks.map((m) => (
                  <span key={m.key} className={`sa-pb-mark is-${m.key}`} style={{ left: at(m.value + h.step / 2) }} aria-hidden="true" />
                ))}
                {sav.net <= span && (
                  <span className="sa-pb-savings" style={{ left: at(sav.net) }} aria-hidden="true" />
                )}
              </div>
              <div className="sa-pb-axis" aria-hidden="true">
                <span>£0</span>
                <span>{gbp(span / 2)}</span>
                <span>{gbp(span)}+</span>
              </div>
              <ul className="sa-pb-legend" aria-hidden="true">
                {marks.map((m) => (
                  <li key={m.key} className={`is-${m.key}`}>
                    <i />
                    {m.label} {m.key === "p50" ? "(median)" : "(1 year in 10)"} <b>{gbp(m.value)}</b>
                  </li>
                ))}
                <li className="is-savings">
                  <i />
                  Savings account after tax <b>{gbp(sav.net)}</b>
                </li>
              </ul>
            </figure>
          )}

          {!tooSmall && (
            <dl className="sa-pb-compare">
              <div>
                <dt>Premium Bonds, typical year</dt>
                <dd>{gbp(r.median)}</dd>
              </div>
              <div>
                <dt>Premium Bonds, long-run average</dt>
                <dd>{gbp(r.expected)}</dd>
              </div>
              <div className="is-savings">
                <dt>
                  Savings at {v.savingsRate}%, after tax
                  <small>{sav.tax > 0 ? `${gbp(sav.tax)} tax on ${gbp(sav.interest)}` : "within your tax-free allowance"}</small>
                </dt>
                <dd>{gbp(sav.net)}</dd>
              </div>
            </dl>
          )}
          {!tooSmall && (
            <p className="sa-pb-verdict">
              {sav.net > r.expected ? (
                <>
                  The account pays more than the Bonds&rsquo; long-run average, and beats them in {percent(1 - beat, 0)} of years.
                  {v.band !== "none" ? <> Once your allowance is used up, the Bonds&rsquo; prize rate is worth {percent(grossEquivalent(rate, v.band), 2)} before tax at your band.</> : null}
                </>
              ) : (
                <>
                  On average the Bonds pay more than the account after tax, but only {percent(beat, 0)} of years beat its {gbp(sav.net)}.
                  {v.band !== "none" ? <> Once your allowance is used up, matching their prize rate takes {percent(grossEquivalent(rate, v.band), 2)} before tax at your band.</> : null}
                </>
              )}
            </p>
          )}

          <Foot>
            <Caveat>
              A simulation: prizes are random, so your year can land anywhere on the chart. It uses the {PREMIUM_BONDS.draw} prize table and holds the rate for a year; Bonds you buy wait a full
              month before their first draw. Not financial advice.
            </Caveat>
            <ShareButton copied={st.copied} onClick={st.share} />
          </Foot>
        </div>
      </div>
    </Tool>
  );
}
