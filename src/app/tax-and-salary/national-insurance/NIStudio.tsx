"use client";

import { useEffect, useState } from "react";
import { employerNI } from "@/lib/business/employer-ni";
import {
  CLASS2_VOLUNTARY_WEEKLY,
  NI_LOWER_EARNINGS_LIMIT,
  NI_SMALL_PROFITS_THRESHOLD,
  niBreakdown,
  niCurve,
  niMarginalRate,
  qualifyingYear,
  type NIMode,
} from "@/lib/tax/ni-insights";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { InputGroup, MoneyField, Segmented } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { gbp, gbpShort, percent } from "@/components/flagship/format";

const COLORS = { employee: "#5b1e6e", self: "#0f9f6e", employer: "#f59e0b", pay: "#94a3b8" };
const DEFAULTS = { income: 35_000, mode: "employee" as NIMode };

export default function NIStudio({ initialIncome, initialMode, showResults }: { initialIncome: number; initialMode: NIMode; showResults: boolean }) {
  const [income, setIncome] = useState(initialIncome);
  const [mode, setMode] = useState<NIMode>(initialMode);
  const [ready, setReady] = useState(showResults);
  const [copied, setCopied] = useState(false);

  const employee = mode === "employee";
  const ni = niBreakdown(income, mode);
  const other = niBreakdown(income, employee ? "self-employed" : "employee");
  const effective = income > 0 ? ni.total / income : 0;
  const marginal = niMarginalRate(income, mode);
  const boss = employerNI({ annualSalary: income });
  const qualifies = qualifyingYear(income, mode);
  const word = employee ? "salary" : "profits";

  const top = Math.max(100_000, Math.ceil((income * 2) / 10_000) * 10_000);
  const steps = 40;
  const curve = niCurve(top, steps);

  useEffect(() => {
    if (!ready) return;
    const t = window.setTimeout(() => {
      const q = new URLSearchParams({ income: String(income) });
      if (!employee) q.set("mode", "self-employed");
      window.history.replaceState(null, "", `${window.location.pathname}?${q}`);
    }, 400);
    return () => window.clearTimeout(t);
  }, [ready, income, employee]);

  const reset = () => {
    setIncome(DEFAULTS.income);
    setMode(DEFAULTS.mode);
    setReady(false);
    window.history.replaceState(null, "", window.location.pathname);
  };
  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — the URL is still in the address bar */
    }
  };

  return (
    <Studio
      title="Your earnings"
      ready={ready}
      onCalculate={() => setReady(true)}
      calculateLabel="Calculate my National Insurance"
      onReset={reset}
      dock={{ label: "National Insurance a month", value: gbp(ni.total / 12, true) }}
      inputs={
        <>
          <InputGroup title="How you work">
            <Segmented
              label="You are"
              value={mode}
              onChange={setMode}
              options={[
                { value: "employee", label: "Employed", note: "Class 1 NI: 8% between £12,570 and £50,270, then 2%. Taken through payroll." },
                { value: "self-employed", label: "Self-employed", note: "Class 4 NI: 6% between £12,570 and £50,270, then 2%. Paid through Self Assessment." },
              ]}
            />
          </InputGroup>
          <InputGroup title="Your income">
            <MoneyField
              label={employee ? "Yearly salary (before tax)" : "Yearly profit (after expenses)"}
              value={income}
              onChange={setIncome}
              max={10_000_000}
              big
              slider={{ min: 0, max: 150_000, step: 500, ends: ["£0", "£150k"] }}
              hint="National Insurance is the same in England, Scotland, Wales and Northern Ireland."
            />
          </InputGroup>
        </>
      }
    >
      {/* 1. The answer */}
      <Answer
        eyebrow="Your National Insurance"
        value={gbp(ni.total / 12, true)}
        unit="a month"
        actions={
          <button type="button" className="textbutton gm-share-link" onClick={share}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" />
            </svg>
            {copied ? "Link copied" : "Share"}
          </button>
        }
        sentence={
          income <= 0 ? (
            <>Enter your {word} to see your National Insurance.</>
          ) : ni.total <= 0 ? (
            <>
              {employee ? "On a salary" : "On profits"} of <b>{gbp(income)}</b> you pay <b>no National Insurance</b>, because it&apos;s below the £12,570 threshold.
            </>
          ) : (
            <>
              {employee ? "On a salary" : "On profits"} of <b>{gbp(income)}</b> you pay <b>{gbp(ni.total)}</b> a year in {employee ? "Class 1" : "Class 4"} National Insurance. That&apos;s{" "}
              <b>{percent(effective, 1)}</b> of your {word}.
            </>
          )
        }
        badges={[
          `${Math.round(marginal * 100)}p on your next £1`,
          employee ? "Class 1 · employee" : "Class 4 · self-employed",
          qualifies ? "Counts towards your State Pension" : "Not a qualifying year yet",
        ]}
      />

      {/* 2. Per period */}
      <Facts
        items={[
          { label: "A year", value: gbp(ni.total) },
          { label: "A month", value: gbp(ni.total / 12) },
          { label: "A week", value: gbp(ni.total / 52) },
          { label: "Effective rate", value: percent(effective, 1), note: `Of your ${word}` },
        ]}
      />

      <Assumptions
        items={[
          { label: "Tax year", value: "2026/27" },
          { label: "Age", value: "Under State Pension age" },
          { label: employee ? "Paid" : "Profits", value: employee ? "Evenly through the year" : "For the whole tax year" },
          { label: "Category", value: employee ? "Standard (category A)" : "Class 4" },
        ]}
        note="Over State Pension age, a company director or paid unevenly? The guide below explains what changes."
      />

      {/* 3. Band by band */}
      {income > 0 && (
        <ResultCard title="How it's worked out" sub="Each slice of your income has its own rate. Nothing is due on the first £12,570.">
          <Compare
            head={["Income slice", "NI on that slice"]}
            rows={ni.bands.map((b) => ({
              label: (
                <>
                  {b.label} <span style={{ color: "var(--muted)" }}>· {percent(b.rate)}</span>
                </>
              ),
              value: gbp(b.ni),
              delta: `on ${gbp(b.income)}`,
              bar: income > 0 ? b.income / income : 0,
            }))}
          />
        </ResultCard>
      )}

      {/* 4. Employer's share */}
      {employee && income > 0 && (
        <ResultCard title="What your employer pays too" sub="Employers pay their own National Insurance on top of your salary: 15% on earnings above £5,000.">
          <SplitBar
            segments={[
              { label: "Your pay after NI", value: income - ni.total, display: gbp(income - ni.total), color: COLORS.pay },
              { label: "Your NI", value: ni.total, display: gbp(ni.total), color: COLORS.employee },
              { label: "Employer's NI", value: boss.grossEmployerNI, display: gbp(boss.grossEmployerNI), color: COLORS.employer },
            ]}
            caption={
              <>
                Employing you costs about <b>{gbp(boss.totalEmploymentCost)}</b> a year before any Employment Allowance. Together you and your employer pay{" "}
                <b>{gbp(ni.total + boss.grossEmployerNI)}</b> in National Insurance.
              </>
            }
          />
        </ResultCard>
      )}

      {/* 5. Tips */}
      {income > 0 && (
        <ResultCard title="Worth knowing" sub="How your National Insurance affects your future.">
          {qualifies ? (
            <Callout tone="good" title="This year counts towards your State Pension">
              You need <b>35 qualifying years</b> for the full new State Pension, and at least 10 to get any.
            </Callout>
          ) : employee ? (
            <Callout tone="warn" title={`Below ${gbp(NI_LOWER_EARNINGS_LIMIT)} this year won't count automatically`}>
              Earnings under the Lower Earnings Limit (<b>{gbp(NI_LOWER_EARNINGS_LIMIT)}</b>) don&apos;t build your State Pension. You may get National Insurance
              credits, for example if you claim Child Benefit for a child under 12, or you can pay voluntary contributions.
            </Callout>
          ) : (
            <Callout tone="warn" title="Consider voluntary Class 2 contributions">
              Profits under <b>{gbp(NI_SMALL_PROFITS_THRESHOLD)}</b> don&apos;t earn a qualifying year. Voluntary Class 2 costs just{" "}
              <b>£{CLASS2_VOLUNTARY_WEEKLY.toFixed(2)} a week</b> ({gbp(CLASS2_VOLUNTARY_WEEKLY * 52, true)} a year) and protects your State Pension.
            </Callout>
          )}
          {income > 50_270 && (
            <Callout title="The rate drops above £50,270">
              Above the Upper Earnings Limit you pay just 2% on each extra pound, down from {employee ? "8%" : "6%"}.
            </Callout>
          )}
          {employee && income > 12_570 && (
            <Callout title="Salary sacrifice cuts National Insurance">
              Pension contributions made by salary sacrifice come off your pay before NI, saving you up to {Math.round(marginal * 100)}p of NI for every £1 you
              put in.
            </Callout>
          )}
        </ResultCard>
      )}

      {/* 6. Employed vs self-employed */}
      {income > 0 && (
        <ResultCard title="Employed or self-employed?" sub={`National Insurance on the same ${gbp(income)} either way.`}>
          <Compare
            head={["You are", "NI a year"]}
            rows={[
              { key: "employee", label: "Employed (Class 1)", total: employee ? ni.total : other.total },
              { key: "self-employed", label: "Self-employed (Class 4)", total: employee ? other.total : ni.total },
            ].map((x) => ({
              label: x.label,
              value: gbp(x.total),
              delta: x.key === mode ? undefined : `${x.total >= ni.total ? "+" : "−"}${gbp(Math.abs(x.total - ni.total))}`,
              deltaTone: x.total > ni.total ? "up" : "down",
              bar: x.total / Math.max(ni.total, other.total, 1),
              current: x.key === mode,
            }))}
          />
        </ResultCard>
      )}

      {/* 7. Across incomes */}
      <ResultCard title="National Insurance across incomes" sub="How NI grows with income, and how the rate eases above £50,270.">
        <AreaChart
          ariaLabel="National Insurance by income"
          series={[
            { key: "emp", label: "Employed", color: COLORS.employee, values: curve.map((c) => c.employee), fill: employee },
            { key: "self", label: "Self-employed", color: COLORS.self, values: curve.map((c) => c.selfEmployed), fill: !employee },
          ]}
          xLabel={(i) => gbpShort(curve[i]?.income ?? 0)}
          yFormat={gbpShort}
          initial={Math.round((Math.min(income, top) / top) * steps)}
          readout={(i) => {
            const c = curve[i];
            if (!c || c.income <= 0) return <>Drag along the chart to compare incomes.</>;
            return (
              <>
                On <b>{gbp(c.income)}</b>: employed <b>{gbp(c.employee)}</b> a year, self-employed <b>{gbp(c.selfEmployed)}</b>.
              </>
            );
          }}
          hint="Drag across the chart, or use the arrow keys, to compare incomes."
        />
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        2026/27 rates, worked out on a yearly basis. Payroll works pay period by pay period, so monthly payslips can vary slightly.
      </p>
    </Studio>
  );
}
