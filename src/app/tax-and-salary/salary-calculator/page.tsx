import type { Metadata } from "next";
import Link from "next/link";
import TakeHomeEngine from "./TakeHomeEngine";
import { CALCULATORS } from "@/lib/calculators";

export const metadata: Metadata = {
  title: "Salary & Take-Home Pay Calculator (UK, 2025/26)",
  description:
    "The UK take-home pay decision engine. Model tax, NI, pension sacrifice and student loans, explore the income curve, compare scenarios and see exactly where every pound goes. 2025/26 rates.",
  alternates: { canonical: "/tax-and-salary/salary-calculator" },
};

type SearchParams = Promise<{ salary?: string }>;

function parseSalary(raw: string | undefined): number {
  if (!raw) return 35000;
  const n = Number(raw);
  if (!Number.isFinite(n) || n < 0) return 35000;
  return Math.min(n, 10_000_000);
}

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/tax-and-salary", label: "Tax & Salary" },
  { href: "/tax-and-salary/salary-calculator", label: "Take-Home Pay" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "Is this the same figure as my payslip?",
    a: "Very close for a standard employee on the 1257L code. Real payslips vary with your exact tax code, month-to-month PAYE adjustments, benefits-in-kind and how bonuses land in a single pay period. Use this for planning, not as a substitute for HMRC's figures.",
  },
  {
    q: "How does salary sacrifice change my take-home?",
    a: "A salary-sacrifice pension lowers your contractual pay before Income Tax and National Insurance are worked out. That means every £1 you sacrifice costs you less than £1 in take-home — the difference is the tax and NI you no longer pay. It also lowers the income used to assess student-loan repayments.",
  },
  {
    q: "What is the 60% tax trap?",
    a: "Between £100,000 and £125,140, your £12,570 Personal Allowance is withdrawn by £1 for every £2 you earn. That withdrawal, stacked on the 40% higher rate, means each extra pound in this band is effectively taxed at 60%. Pension contributions are the usual way to avoid it.",
  },
  {
    q: "Does this include Scotland?",
    a: "No. This engine uses the England, Wales & Northern Ireland bands. Scotland has six Income Tax bands with different rates — use the dedicated Scottish Income Tax calculator, though National Insurance is the same UK-wide.",
  },
  {
    q: "Which student loan plan am I on?",
    a: "Broadly: Plan 1 for pre-2012 English/Welsh loans, Plan 2 for 2012–2023, Plan 5 for courses starting from 2023, Plan 4 for Scottish borrowers, and the Postgraduate Loan for master's/doctoral funding. You repay 9% (6% for postgrad) of income above the plan's threshold.",
  },
];

export default async function SalaryCalculatorPage({ searchParams }: { searchParams: SearchParams }) {
  const { salary } = await searchParams;
  const related = CALCULATORS.filter((c) =>
    [
      "/tax-and-salary/tax-bracket-checker",
      "/investing/pension-tax-relief",
      "/students/plan-2-student-loan",
      "/tax-and-salary/bonus-tax",
      "/tax-and-salary/scottish-tax",
      "/tax-and-salary/national-insurance",
    ].includes(c.href)
  );

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: BREADCRUMBS.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.label,
        item: `https://govmath.co.uk${c.href}`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <div className="rk" style={{ background: "#ffffff", fontFamily: "var(--font-figtree), system-ui, sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section style={{ borderBottom: "1px solid #e6ebe8", background: "#ffffff" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6" style={{ paddingTop: 28, paddingBottom: 26 }}>
          <nav aria-label="Breadcrumb" style={{ fontSize: 12.5 }}>
            <ol className="flex flex-wrap items-center gap-1.5" style={{ color: "#6b756e" }}>
              {BREADCRUMBS.map((c, i) => (
                <li key={c.href} className="flex items-center gap-1.5">
                  {i > 0 && <span style={{ color: "#b6c0ba" }}>/</span>}
                  {i < BREADCRUMBS.length - 1 ? (
                    <Link href={c.href} className="rk-inklink" style={{ color: "#6b756e" }}>{c.label}</Link>
                  ) : (
                    <span style={{ color: "#1e5c45", fontWeight: 600 }}>{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
            <div style={{ maxWidth: 680 }}>
              <h1 style={{ fontSize: 34, fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.03em", margin: 0, color: "#0c1611" }}>
                Take-Home Pay Calculator
              </h1>
              <p style={{ fontSize: 15.5, color: "#4a534d", marginTop: 10, lineHeight: 1.55, maxWidth: 600 }}>
                See exactly what lands in your bank after Income Tax, National Insurance, pension and student loan — and
                what a pay rise, bonus or bigger pension would really do.
              </p>
            </div>
            <span
              style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.02em", color: "#0f9a5e", border: "1px solid #cbe8da", borderRadius: 999, padding: "7px 14px", background: "#f0faf5", whiteSpace: "nowrap" }}
            >
              England · Wales · NI — 2025/26
            </span>
          </div>
        </div>
      </section>

      <TakeHomeEngine initialSalary={parseSalary(salary)} />

      {/* Explainer + FAQ */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6" style={{ paddingBottom: 8 }}>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] lg:items-start">
          <div>
            <div className="rk-eyebrow">How it works</div>
            <h2 className="rk-serif" style={{ fontSize: 26, fontWeight: 600, marginTop: 4 }}>The maths, in plain English</h2>
            <div style={{ marginTop: 14, color: "#39423c", fontSize: 14.5, lineHeight: 1.7 }} className="space-y-4">
              <p>
                We start from your gross salary and remove anything you sacrifice into a pension — because that
                happens <em>before</em> the taxman looks at your pay. What&rsquo;s left is your assessed income.
              </p>
              <p>
                Your first <strong>£12,570</strong> is tax-free (the Personal Allowance). The slice up to{" "}
                <strong>£50,270</strong> is taxed at <strong>20%</strong>, then <strong>40%</strong> up to{" "}
                <strong>£125,140</strong>, and <strong>45%</strong> above that. National Insurance adds{" "}
                <strong>8%</strong> between £12,570 and £50,270 and <strong>2%</strong> above. If you have a student
                loan, <strong>9%</strong> (6% postgrad) applies above your plan&rsquo;s threshold.
              </p>
              <p>
                Between <strong>£100,000</strong> and <strong>£125,140</strong> the Personal Allowance is clawed back,
                creating the notorious <strong>60% effective rate</strong> — the single most important thing this tool
                surfaces, because pension sacrifice can neutralise it entirely.
              </p>
            </div>

            <h2 className="rk-serif" style={{ fontSize: 26, fontWeight: 600, marginTop: 32 }}>Frequently asked</h2>
            <div className="mt-4 space-y-2.5">
              {FAQS.map((f) => (
                <details key={f.q} className="rk-details" style={{ border: "1px solid #e4e9e5", borderRadius: 12, padding: "14px 16px", background: "#fff" }}>
                  <summary className="flex items-center justify-between gap-3" style={{ fontWeight: 600, fontSize: 14.5 }}>
                    {f.q}
                    <span className="rk-mono" style={{ color: "#1e5c45", fontSize: 18, lineHeight: 1 }}>+</span>
                  </summary>
                  <p style={{ marginTop: 10, fontSize: 13.5, color: "#4a534d", lineHeight: 1.6 }}>{f.a}</p>
                </details>
              ))}
            </div>
          </div>

          <aside className="lg:sticky lg:top-[74px] space-y-4">
            <div className="rk-card" style={{ padding: 20 }}>
              <div className="rk-eyebrow">Related decisions</div>
              <h3 className="rk-serif" style={{ fontSize: 18, fontWeight: 600, marginTop: 3, marginBottom: 10 }}>Keep exploring</h3>
              <div className="space-y-1">
                {related.map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    className="rk-tool"
                    style={{ display: "block", fontSize: 13.5, color: "#39423c", padding: "9px 0", borderBottom: "1px solid #f2f5f2", ["--cat-color" as string]: "#1e5c45" }}
                  >
                    {c.title}
                  </Link>
                ))}
              </div>
            </div>
            <div style={{ background: "#0f1a15", color: "#eef4ef", borderRadius: 16, padding: 20 }}>
              <div className="rk-mono" style={{ fontSize: 9.5, letterSpacing: "0.16em", textTransform: "uppercase", color: "#8fd6b1" }}>Good to know</div>
              <p style={{ fontSize: 13, color: "#8fa397", marginTop: 8, lineHeight: 1.6 }}>
                Figures are estimates for the 2025/26 tax year (England, Wales &amp; NI). GovMath is not affiliated with
                HMRC. Always check your tax code and personal circumstances before making financial decisions.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
