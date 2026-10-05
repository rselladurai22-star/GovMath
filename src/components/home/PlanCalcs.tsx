"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { computeTakeHome } from "@/lib/tax/take-home-engine";
import { mortgageRepayment } from "@/lib/mortgage";
import { stampDuty } from "@/lib/tax/sdlt-2025";
import { compound } from "@/lib/investing/growth";
import s from "./Home.module.css";

const GBP = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });
const GBP2 = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", minimumFractionDigits: 2, maximumFractionDigits: 2 });
const NUM = new Intl.NumberFormat("en-GB", { maximumFractionDigits: 2 });

/** A labelled value box with a range slider, as on bank calculators. */
function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step,
  prefix,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
}) {
  const id = useId();
  const pct = ((Math.min(max, Math.max(min, value)) - min) / (max - min)) * 100;
  return (
    <div className={s.slider}>
      <div className={s.sliderHead}>
        <label htmlFor={id}>{label}</label>
        <span className={s.sliderBox}>
          {prefix && <span aria-hidden="true">{prefix}</span>}
          <input
            type="number"
            inputMode="decimal"
            value={value}
            min={min}
            max={max}
            step={step}
            aria-label={label}
            onChange={(e) => onChange(Math.min(max, Math.max(0, Number(e.target.value) || 0)))}
          />
          {suffix && <span aria-hidden="true">{suffix}</span>}
        </span>
      </div>
      <input
        id={id}
        type="range"
        className={s.range}
        min={min}
        max={max}
        step={step}
        value={Math.min(max, Math.max(min, value))}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ ["--p" as string]: `${pct}%` }}
      />
      <div className={s.sliderEnds} aria-hidden="true">
        <span>
          {prefix}
          {NUM.format(min)}
          {suffix}
        </span>
        <span>
          {prefix}
          {NUM.format(max)}
          {suffix}
        </span>
      </div>
    </div>
  );
}

type Part = { label: string; value: number; color: string };

/** Donut chart of the parts, with the headline in the middle. */
function Donut({ parts, centre, sub }: { parts: Part[]; centre: string; sub: string }) {
  const total = parts.reduce((a, p) => a + Math.max(0, p.value), 0) || 1;
  const r = 70;
  const c = 2 * Math.PI * r;
  const segs = parts.map((p, i) => {
    const len = (Math.max(0, p.value) / total) * c;
    const before = parts.slice(0, i).reduce((a, q) => a + (Math.max(0, q.value) / total) * c, 0);
    return { ...p, len, before };
  });
  return (
    <div className={s.donut}>
      <svg viewBox="0 0 180 180" role="img" aria-label={parts.map((p) => `${p.label} ${GBP.format(p.value)}`).join(", ")}>
        <circle cx="90" cy="90" r={r} fill="none" stroke="var(--ax-soft)" strokeWidth="22" />
        {segs.map((p) => (
          <circle
            key={p.label}
            cx="90"
            cy="90"
            r={r}
            fill="none"
            stroke={p.color}
            strokeWidth="22"
            strokeDasharray={`${p.len} ${c - p.len}`}
            strokeDashoffset={-p.before}
            transform="rotate(-90 90 90)"
          />
        ))}
      </svg>
      <div className={s.donutCentre}>
        <strong>{centre}</strong>
        <span>{sub}</span>
      </div>
    </div>
  );
}

function Result({ title, value, note, parts, rows, href, cta }: { title: string; value: string; note: string; parts: Part[]; rows: { label: string; value: string }[]; href: string; cta: string }) {
  return (
    <div className={s.calcResult} aria-live="polite">
      <div className={s.calcHeadline}>
        <span>{title}</span>
        <strong>{value}</strong>
        <small>{note}</small>
      </div>
      <Donut parts={parts} centre={value} sub={title} />
      <ul className={s.legend}>
        {parts.map((p) => (
          <li key={p.label}>
            <i style={{ background: p.color }} aria-hidden="true" />
            <span>{p.label}</span>
            <b>{GBP.format(p.value)}</b>
          </li>
        ))}
        {rows.map((r) => (
          <li key={r.label}>
            <i aria-hidden="true" />
            <span>{r.label}</span>
            <b>{r.value}</b>
          </li>
        ))}
      </ul>
      <Link href={href} className={s.btnPrimary}>
        {cta}
      </Link>
    </div>
  );
}

const PLUM = "#5b1e6e";
const LILAC = "#c79bd8";
const GREY = "#b4b4b4";

function TakeHome() {
  const [salary, setSalary] = useState(35_000);
  const [pension, setPension] = useState(5);
  const r = computeTakeHome({ gross: salary, bonus: 0, pensionPct: pension, plan: "none" });
  return (
    <div className={s.calcGrid}>
      <div className={s.calcInputs}>
        <Slider label="Yearly salary" value={salary} onChange={setSalary} min={10_000} max={200_000} step={500} prefix="£" />
        <Slider label="Pension contribution" value={pension} onChange={setPension} min={0} max={20} step={1} suffix="%" />
      </div>
      <Result
        title="Take-home a month"
        value={GBP2.format(r.perPeriod.monthly)}
        note={`${GBP.format(r.takeHome)} a year after tax, National Insurance and pension`}
        parts={[
          { label: "Take-home pay", value: r.takeHome, color: PLUM },
          { label: "Income Tax", value: r.incomeTaxTotal, color: LILAC },
          { label: "National Insurance", value: r.ni.total, color: GREY },
        ]}
        rows={[{ label: "Into your pension", value: GBP.format(r.pensionContribution) }]}
        href="/tax-and-salary/salary-calculator"
        cta="Open the take-home pay calculator"
      />
    </div>
  );
}

function Mortgage() {
  const [loan, setLoan] = useState(250_000);
  const [rate, setRate] = useState(4.5);
  const [years, setYears] = useState(25);
  const r = mortgageRepayment(loan, rate, years);
  return (
    <div className={s.calcGrid}>
      <div className={s.calcInputs}>
        <Slider label="Amount to borrow" value={loan} onChange={setLoan} min={25_000} max={1_000_000} step={5_000} prefix="£" />
        <Slider label="Interest rate" value={rate} onChange={setRate} min={0.5} max={10} step={0.05} suffix="%" />
        <Slider label="Term" value={years} onChange={setYears} min={5} max={40} step={1} suffix=" yrs" />
      </div>
      <Result
        title="Monthly repayment"
        value={GBP2.format(r.monthlyPayment)}
        note={`Repayment mortgage over ${years} years`}
        parts={[
          { label: "Amount borrowed", value: loan, color: PLUM },
          { label: "Total interest", value: r.totalInterest, color: LILAC },
        ]}
        rows={[{ label: "Total repaid", value: GBP.format(r.totalRepaid) }]}
        href="/property/mortgage-repayment"
        cta="Open the mortgage calculator"
      />
    </div>
  );
}

function StampDuty() {
  const [price, setPrice] = useState(350_000);
  const [buyer, setBuyer] = useState<"standard" | "first-time" | "additional">("standard");
  const r = stampDuty(price, buyer);
  return (
    <div className={s.calcGrid}>
      <div className={s.calcInputs}>
        <Slider label="Property price" value={price} onChange={setPrice} min={50_000} max={2_000_000} step={5_000} prefix="£" />
        <div className={s.chips} role="group" aria-label="Buyer type">
          {(
            [
              ["standard", "Home mover"],
              ["first-time", "First-time buyer"],
              ["additional", "Additional home"],
            ] as const
          ).map(([id, label]) => (
            <button key={id} type="button" aria-pressed={buyer === id} onClick={() => setBuyer(id)}>
              {label}
            </button>
          ))}
        </div>
      </div>
      <Result
        title="Stamp Duty to pay"
        value={GBP.format(r.total)}
        note={`England and Northern Ireland, effective rate ${(r.effectiveRate * 100).toFixed(2)}%`}
        parts={[
          { label: "Property price", value: price, color: PLUM },
          { label: "Stamp Duty", value: r.total, color: LILAC },
        ]}
        rows={[{ label: "Total cost", value: GBP.format(price + r.total) }]}
        href="/property/stamp-duty-england"
        cta="Open the Stamp Duty calculator"
      />
    </div>
  );
}

function Savings() {
  const [monthly, setMonthly] = useState(250);
  const [rate, setRate] = useState(5);
  const [years, setYears] = useState(15);
  const r = compound({ principal: 0, monthly, rate: rate / 100, years, periods: 12 });
  return (
    <div className={s.calcGrid}>
      <div className={s.calcInputs}>
        <Slider label="Saving each month" value={monthly} onChange={setMonthly} min={25} max={5_000} step={25} prefix="£" />
        <Slider label="Growth a year" value={rate} onChange={setRate} min={0} max={12} step={0.25} suffix="%" />
        <Slider label="Years" value={years} onChange={setYears} min={1} max={40} step={1} suffix=" yrs" />
      </div>
      <Result
        title={`Value after ${years} years`}
        value={GBP.format(r.balance)}
        note="Added monthly, before tax and charges"
        parts={[
          { label: "Paid in", value: r.contributed, color: PLUM },
          { label: "Growth", value: Math.max(0, r.interest), color: LILAC },
        ]}
        rows={[]}
        href="/investing/compound-interest"
        cta="Open the compound interest calculator"
      />
    </div>
  );
}

const TABS = [
  { id: "take-home", label: "Take-home pay", body: <TakeHome /> },
  { id: "mortgage", label: "Mortgage", body: <Mortgage /> },
  { id: "stamp-duty", label: "Stamp Duty", body: <StampDuty /> },
  { id: "savings", label: "Savings", body: <Savings /> },
];

/** Tabbed quick calculators: pill tabs above a two-column calculator card. */
export default function PlanCalcs() {
  const [active, setActive] = useState(0);
  return (
    <div className={s.calcWrap}>
      <div className={s.tabs} role="tablist" aria-label="Choose a calculator">
        {TABS.map((t, i) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={`plan-tab-${t.id}`}
            aria-controls={`plan-panel-${t.id}`}
            aria-selected={i === active}
            tabIndex={i === active ? 0 : -1}
            className={s.tab}
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
              const next = (active + (e.key === "ArrowRight" ? 1 : -1) + TABS.length) % TABS.length;
              setActive(next);
              document.getElementById(`plan-tab-${TABS[next].id}`)?.focus();
            }}
          >
            {t.label}
          </button>
        ))}
      </div>
      {TABS.map((t, i) => (
        <div key={t.id} id={`plan-panel-${t.id}`} role="tabpanel" aria-labelledby={`plan-tab-${t.id}`} hidden={i !== active} className={s.calcCard}>
          {i === active && t.body}
        </div>
      ))}
    </div>
  );
}
