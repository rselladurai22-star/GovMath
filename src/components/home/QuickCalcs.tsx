"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import Link from "next/link";
import { computeTakeHome } from "@/lib/tax/take-home-engine";
import { scottishIncomeTax } from "@/lib/tax/scottish-2026-27";
import { stampDuty } from "@/lib/tax/sdlt-2025";
import { mortgageRepayment } from "@/lib/mortgage";
import { addVat, removeVat, VAT_RATES } from "@/lib/tax/vat";
import s from "../GovmathHome.module.css";

const GBP = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });
const GBP2 = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", minimumFractionDigits: 2, maximumFractionDigits: 2 });
const WHOLE = new Intl.NumberFormat("en-GB", { maximumFractionDigits: 0 });
const ROTATE_MS = 6000;

const REDUCED = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (cb: () => void) => {
  const mq = window.matchMedia(REDUCED);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

/** £ text field that keeps thousands separators tidy. */
function Money({ id, label, value, onChange, max = 100_000_000 }: { id: string; label: string; value: number; onChange: (n: number) => void; max?: number }) {
  const [text, setText] = useState(WHOLE.format(value));
  return (
    <div className={s.qField}>
      <label htmlFor={id}>{label}</label>
      <div className={s.qInput}>
        <span aria-hidden="true">£</span>
        <input
          id={id}
          type="text"
          inputMode="numeric"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            onChange(Math.min(Number(e.target.value.replace(/[^\d]/g, "") || 0), max));
          }}
          onBlur={() => setText(WHOLE.format(value))}
        />
      </div>
    </div>
  );
}

function Num({ id, label, suffix, value, onChange, step = 1, min = 0, max }: { id: string; label: string; suffix: string; value: number; onChange: (n: number) => void; step?: number; min?: number; max: number }) {
  return (
    <div className={s.qField}>
      <label htmlFor={id}>{label}</label>
      <div className={s.qInput}>
        <input
          id={id}
          type="number"
          inputMode="decimal"
          value={value}
          step={step}
          min={min}
          max={max}
          onChange={(e) => onChange(Math.min(Math.max(Number(e.target.value) || 0, min), max))}
        />
        <span aria-hidden="true">{suffix}</span>
      </div>
    </div>
  );
}

function Seg<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: { id: T; label: string }[]; onChange: (v: T) => void }) {
  return (
    <div className={s.qSeg} role="group" aria-label={label}>
      {options.map((o) => (
        <button key={o.id} type="button" aria-pressed={value === o.id} onClick={() => onChange(o.id)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

function Result({ label, value, sub, stats }: { label: string; value: string; sub?: string; stats: { label: string; value: string }[] }) {
  return (
    <div className={s.qResult} aria-live="polite">
      <span>{label}</span>
      <strong>{value}</strong>
      {sub && <small>{sub}</small>}
      <dl>
        {stats.map((t) => (
          <div key={t.label}>
            <dt>{t.label}</dt>
            <dd>{t.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function TakeHome() {
  const [gross, setGross] = useState(35000);
  const [region, setRegion] = useState<"ruk" | "scotland">("ruk");
  const r = computeTakeHome({ gross, bonus: 0, pensionPct: 0, plan: "none" });
  const tax = region === "scotland" ? scottishIncomeTax(r.adjustedGross).total : r.incomeTax.total;
  const net = Math.max(0, r.adjustedGross - tax - r.ni.total);
  return (
    <>
      <div className={s.qInputs}>
        <Money id="q-salary" label="Yearly salary" value={gross} onChange={setGross} max={2_000_000} />
        <Seg
          label="Where you pay tax"
          value={region}
          onChange={setRegion}
          options={[
            { id: "ruk", label: "England, Wales & NI" },
            { id: "scotland", label: "Scotland" },
          ]}
        />
      </div>
      <Result
        label="Take-home pay per month"
        value={GBP2.format(net / 12)}
        sub={`${GBP.format(net)} a year · you keep ${(gross > 0 ? (net / gross) * 100 : 0).toFixed(1)}%`}
        stats={[
          { label: region === "scotland" ? "Income Tax (Scottish)" : "Income Tax", value: GBP.format(tax) },
          { label: "National Insurance", value: GBP.format(r.ni.total) },
        ]}
      />
    </>
  );
}

function StampDuty() {
  const [price, setPrice] = useState(350000);
  const [buyer, setBuyer] = useState<"standard" | "first-time" | "additional">("standard");
  const r = stampDuty(price, buyer);
  return (
    <>
      <div className={s.qInputs}>
        <Money id="q-price" label="Property price" value={price} onChange={setPrice} />
        <Seg
          label="Buyer type"
          value={buyer}
          onChange={setBuyer}
          options={[
            { id: "standard", label: "Home mover" },
            { id: "first-time", label: "First-time" },
            { id: "additional", label: "Second home" },
          ]}
        />
      </div>
      <Result
        label="Stamp Duty to pay"
        value={GBP.format(r.total)}
        sub="England & Northern Ireland, from 1 April 2025"
        stats={[
          { label: "Effective rate", value: `${(r.effectiveRate * 100).toFixed(2)}%` },
          { label: "Total with price", value: GBP.format(price + r.total) },
        ]}
      />
    </>
  );
}

function Mortgage() {
  const [loan, setLoan] = useState(250000);
  const [rate, setRate] = useState(4.5);
  const [years, setYears] = useState(25);
  const r = mortgageRepayment(loan, rate, years);
  return (
    <>
      <div className={s.qInputs}>
        <Money id="q-loan" label="Amount to borrow" value={loan} onChange={setLoan} />
        <div className={s.qPair}>
          <Num id="q-rate" label="Interest rate" suffix="%" value={rate} onChange={setRate} step={0.1} max={20} />
          <Num id="q-term" label="Term" suffix="yrs" value={years} onChange={setYears} min={1} max={40} />
        </div>
      </div>
      <Result
        label="Monthly repayment"
        value={GBP2.format(r.monthlyPayment)}
        sub={`Repayment mortgage over ${years} years`}
        stats={[
          { label: "Total interest", value: GBP.format(r.totalInterest) },
          { label: "Total repaid", value: GBP.format(r.totalRepaid) },
        ]}
      />
    </>
  );
}

function Vat() {
  const [amount, setAmount] = useState(1000);
  const [mode, setMode] = useState<"add" | "remove">("add");
  const r = mode === "add" ? addVat(amount, VAT_RATES.standard) : removeVat(amount, VAT_RATES.standard);
  return (
    <>
      <div className={s.qInputs}>
        <Money id="q-vat" label={mode === "add" ? "Price before VAT" : "Price including VAT"} value={amount} onChange={setAmount} />
        <Seg
          label="Add or remove VAT"
          value={mode}
          onChange={setMode}
          options={[
            { id: "add", label: "Add 20% VAT" },
            { id: "remove", label: "Remove VAT" },
          ]}
        />
      </div>
      <Result
        label={mode === "add" ? "Price including VAT" : "Price before VAT"}
        value={GBP2.format(mode === "add" ? r.gross : r.net)}
        sub="Standard rate, 20%"
        stats={[
          { label: "VAT amount", value: GBP2.format(r.vat) },
          { label: mode === "add" ? "Before VAT" : "Including VAT", value: GBP2.format(mode === "add" ? r.net : r.gross) },
        ]}
      />
    </>
  );
}

const SLIDES: { id: string; tab: string; title: string; href: string; cta: string; body: () => ReactNode }[] = [
  { id: "take-home", tab: "Salary", title: "What will I take home?", href: "/tax-and-salary/salary-calculator", cta: "Full salary calculator", body: () => <TakeHome /> },
  { id: "stamp-duty", tab: "Stamp Duty", title: "How much Stamp Duty?", href: "/property/stamp-duty-england", cta: "Full Stamp Duty calculator", body: () => <StampDuty /> },
  { id: "mortgage", tab: "Mortgage", title: "What will my mortgage cost?", href: "/property/mortgage-repayment", cta: "Full mortgage calculator", body: () => <Mortgage /> },
  { id: "vat", tab: "VAT", title: "Add or remove VAT", href: "/business/vat-calculator", cta: "Full VAT calculator", body: () => <Vat /> },
];

/**
 * Compact, auto-rotating quick calculators for the most-used tools.
 * Rotation pauses on hover/focus, stops for good once someone interacts,
 * and never runs for reduced-motion users.
 */
export default function QuickCalcs() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [held, setHeld] = useState(false);
  const touchX = useRef<number | null>(null);

  const reduced = useSyncExternalStore(subscribeReduced, () => window.matchMedia(REDUCED).matches, () => false);

  const running = playing && !held && !reduced;
  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => setActive((i) => (i + 1) % SLIDES.length), ROTATE_MS);
    return () => window.clearTimeout(t);
  }, [running, active]);

  const go = useCallback((i: number) => {
    setActive((i + SLIDES.length) % SLIDES.length);
    setPlaying(false);
  }, []);

  return (
    <div
      className={s.quick}
      role="region"
      aria-roledescription="carousel"
      aria-label="Quick calculators"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHeld(false);
      }}
      onInput={() => setPlaying(false)}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 50) go(active + (dx < 0 ? 1 : -1));
      }}
    >
      <div className={s.quickTop}>
        <div className={s.quickTabs} role="tablist" aria-label="Choose a calculator">
          {SLIDES.map((sl, i) => (
            <button
              key={sl.id}
              type="button"
              role="tab"
              id={`q-tab-${sl.id}`}
              aria-controls={`q-panel-${sl.id}`}
              aria-selected={i === active}
              tabIndex={i === active ? 0 : -1}
              onClick={() => go(i)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                  const next = (active + (e.key === "ArrowRight" ? 1 : -1) + SLIDES.length) % SLIDES.length;
                  go(next);
                  document.getElementById(`q-tab-${SLIDES[next].id}`)?.focus();
                }
              }}
            >
              {sl.tab}
              {i === active && running && <i key={active} className={s.quickProgress} style={{ animationDuration: `${ROTATE_MS}ms` }} aria-hidden="true" />}
            </button>
          ))}
        </div>
        {!reduced && (
          <button
            type="button"
            className={s.quickPlay}
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Stop rotating calculators" : "Start rotating calculators"}
          >
            {playing ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M7 5v14l12-7z" />
              </svg>
            )}
          </button>
        )}
      </div>

      <div className={s.quickStage} onClick={() => setPlaying(false)}>
        {SLIDES.map((sl, i) => (
          <section
            key={sl.id}
            id={`q-panel-${sl.id}`}
            role="tabpanel"
            aria-labelledby={`q-tab-${sl.id}`}
            aria-roledescription="slide"
            className={s.quickSlide}
            data-active={i === active || undefined}
            inert={i !== active}
          >
            <h3>{sl.title}</h3>
            <div className={s.quickBody}>{sl.body()}</div>
            <Link href={sl.href} className={s.quickCta}>
              {sl.cta}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </section>
        ))}
      </div>

      <div className={s.quickDots} aria-hidden="true">
        {SLIDES.map((sl, i) => (
          <button key={sl.id} type="button" tabIndex={-1} data-active={i === active || undefined} onClick={() => go(i)} />
        ))}
      </div>
    </div>
  );
}
