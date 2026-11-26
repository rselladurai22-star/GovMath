"use client";

import { useSyncExternalStore } from "react";
import { Mini } from "@/components/calc/fields";
import { Inputs } from "@/components/calc/kit";
import { DateField } from "@/components/flagship/inputs";
import { gbp } from "@/components/flagship/format";
import { bool, date, num } from "@/components/flagship/useStudio";
import { contributionTest, relevantYears, type ContributionResult, type ContributionYear } from "@/lib/benefits/new-style";

/**
 * The National Insurance check shared by the New Style JSA and New Style ESA
 * calculators: the claim date, then one card for each of the two tax years
 * that count, each showing whether it passes its tests. Styles: the "New
 * Style tax-year cards" block of public/gm/sumatlas-ds.css (`sa-ns-`).
 */

/** Keys kept from the earlier calculators, so old share links still work. `claim` "" means today. */
export const NI_SCHEMA = {
  claim: date(""),
  earn1: num(22_000, 0, 1_000_000),
  earn2: num(22_000, 0, 1_000_000),
  cred1: bool(false),
  cred2: bool(false),
  wk1: num(52, 1, 52),
  wk2: num(52, 1, 52),
};
/** ESA only: self-employed all year (Class 2 counts for ESA, not JSA). */
export const SE_SCHEMA = { se1: bool(false), se2: bool(false) };

export type NiValues = { claim: string; earn1: number; earn2: number; cred1: boolean; cred2: boolean; wk1: number; wk2: number; se1?: boolean; se2?: boolean };

const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
/** Used while the page is rendered on the server, before the visitor's own date is known. */
const SERVER_TODAY = "2026-11-26";
const noop = () => () => {};

/** Today's date in the visitor's browser (a fixed date on the server, so hydration matches). */
export function useToday(): string {
  return useSyncExternalStore(noop, () => iso(new Date()), () => SERVER_TODAY);
}

export function niTest(v: NiValues, claimDate: string, benefit: "jsa" | "esa"): ContributionResult {
  return contributionTest({
    claimDate,
    benefit,
    earningsEarlier: v.earn1,
    earningsLater: v.earn2,
    weeksEarlier: v.wk1,
    weeksLater: v.wk2,
    creditedEarlier: v.cred1,
    creditedLater: v.cred2,
    selfEmployedEarlier: v.se1,
    selfEmployedLater: v.se2,
  });
}

/** "6 April 2024 to 5 April 2025". */
const span = (start: number) => `6 April ${start} to 5 April ${start + 1}`;

function Check({ ok, children }: { ok: boolean; children: React.ReactNode }) {
  return (
    <li className={ok ? "is-ok" : "is-no"}>
      <span className="sa-ns-tick" aria-hidden="true">
        {ok ? "✓" : "✕"}
      </span>
      <span>
        <span className="sr-only">{ok ? "Met: " : "Not met: "}</span>
        {children}
      </span>
    </li>
  );
}

function YearCard({
  y,
  start,
  n,
  v,
  set,
  benefit,
  otherA,
}: {
  y: ContributionYear;
  start: number;
  n: 1 | 2;
  v: NiValues;
  set: (k: keyof NiValues, value: string | number | boolean) => void;
  benefit: "jsa" | "esa";
  otherA: boolean;
}) {
  const earn = n === 1 ? v.earn1 : v.earn2;
  const weeks = n === 1 ? v.wk1 : v.wk2;
  const cred = n === 1 ? v.cred1 : v.cred2;
  const se = n === 1 ? v.se1 : v.se2;
  const k = (base: "earn" | "wk" | "cred" | "se") => `${base}${n}` as keyof NiValues;
  const pass = y.bOk && (y.aOk || otherA);
  return (
    <section className={`sa-ns-year${pass ? " is-pass" : " is-fail"}`} aria-labelledby={`ns-year-${n}`}>
      <header>
        <h3 id={`ns-year-${n}`}>
          Tax year {y.label}
          <small>{span(start)}</small>
        </h3>
        <span className="sa-ns-badge">{pass ? "Counts" : "Falls short"}</span>
      </header>
      <div className="sa-ns-fields">
        <Mini label="Pay as an employee" value={earn} onChange={(x) => set(k("earn"), x)} prefix="£" max={1_000_000} step={500} wide hint="Gross, for the year. Your P60 shows it." />
        <Mini label="Weeks you worked" value={weeks} onChange={(x) => set(k("wk"), Math.round(x))} min={1} max={52} stepper hint="52 if you worked all year." />
      </div>
      <div className="sa-ns-ticks">
        <label>
          <input type="checkbox" checked={cred} onChange={(e) => set(k("cred"), e.target.checked)} />
          <span>National Insurance credits for the rest of the year</span>
        </label>
        {benefit === "esa" && (
          <label>
            <input type="checkbox" checked={!!se} onChange={(e) => set(k("se"), e.target.checked)} />
            <span>Self-employed all year, with profits over the small profits threshold</span>
          </label>
        )}
      </div>
      <ul className="sa-ns-tests">
        <Check ok={y.aOk || otherA}>
          {y.underLel ? (
            <>Under {gbp(y.lel)} a week, so no National Insurance was paid</>
          ) : (
            <>
              {Math.round(y.counted / y.lel)} {Math.round(y.counted / y.lel) === 1 ? "week" : "weeks"} paid at {gbp(y.lel)} or more
              {y.aOk ? ": 26 needed in one of the years" : otherA ? ": the other year covers this test" : ": 26 needed in one of the years"}
            </>
          )}
        </Check>
        <Check ok={y.bOk}>
          {y.bOk ? (
            cred ? (
              <>Credits fill the year up to the {gbp(y.factorNeeded)} needed</>
            ) : (
              <>
                Paid on {gbp(y.factor)}, at least the {gbp(y.factorNeeded)} needed
              </>
            )
          ) : (
            <>
              Paid or credited on {gbp(y.factor)}: {gbp(y.factorNeeded)} needed
            </>
          )}
        </Check>
      </ul>
    </section>
  );
}

/** The claim date and the two tax-year cards. `t` must come from `niTest` with the same claim date. */
export function TaxYearCards({
  v,
  set,
  t,
  claimDate,
  benefit,
  dateLabel,
}: {
  v: NiValues;
  set: (k: keyof NiValues, value: string | number | boolean) => void;
  t: ContributionResult;
  claimDate: string;
  benefit: "jsa" | "esa";
  dateLabel: string;
}) {
  const [a, b] = relevantYears(claimDate);
  return (
    <div className="sa-ns-check">
      <div className="sa-ns-date">
        <Inputs tone="plain">
          <DateField label={dateLabel} value={v.claim || claimDate} onChange={(x) => set("claim", x)} hint="The two tax years that count change on the first Sunday in January." />
        </Inputs>
        <p>
          Your National Insurance record for <b>{t.years[0]}</b> and <b>{t.years[1]}</b> decides it.
        </p>
      </div>
      <div className="sa-ns-years">
        <YearCard y={t.detail[0]} start={a} n={1} v={v} set={set} benefit={benefit} otherA={t.detail[1].aOk} />
        <YearCard y={t.detail[1]} start={b} n={2} v={v} set={set} benefit={benefit} otherA={t.detail[0].aOk} />
      </div>
    </div>
  );
}
