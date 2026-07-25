import type { Metadata } from "next";
import Link from "next/link";
import TakeHomeEngine from "./TakeHomeEngine";
import TakeHomeGuide from "./TakeHomeGuide";
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

  const FEATURES = [
    { icon: "✓", label: "2025/26 HMRC rates" },
    { icon: "📊", label: "Tax, NI & pension" },
    { icon: "🎓", label: "Student loan plans" },
    { icon: "🔒", label: "100% Free & Private" },
  ];

  return (
    <div style={{ background: "#ffffff", fontFamily: "var(--font-inter), ui-sans-serif, system-ui, -apple-system, sans-serif", color: "#334155" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section style={{ borderBottom: "1px solid #e5e7eb", background: "#ffffff" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6" style={{ paddingTop: 26, paddingBottom: 24 }}>
          <nav aria-label="Breadcrumb" style={{ fontSize: 12.5 }}>
            <ol className="flex flex-wrap items-center gap-1.5" style={{ color: "#64748b" }}>
              {BREADCRUMBS.map((c, i) => (
                <li key={c.href} className="flex items-center gap-1.5">
                  {i > 0 && <span style={{ color: "#cbd5e1" }}>/</span>}
                  {i < BREADCRUMBS.length - 1 ? (
                    <Link href={c.href} style={{ color: "#64748b" }} className="hover:underline">{c.label}</Link>
                  ) : (
                    <span style={{ color: "#2563eb", fontWeight: 600 }}>{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-4 grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
            <div>
              <h1 style={{ fontSize: 40, fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.03em", margin: 0, color: "#0f172a", fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
                Take-Home Pay Calculator
              </h1>
              <p style={{ fontSize: 15.5, color: "#475569", marginTop: 10, lineHeight: 1.55, maxWidth: 600 }}>
                See exactly what lands in your bank after Income Tax, National Insurance, pension and student loan.
              </p>
              <div className="flex flex-wrap gap-2" style={{ marginTop: 16 }}>
                {FEATURES.map((f) => (
                  <span key={f.label} className="flex items-center gap-2" style={{ fontSize: 12.5, fontWeight: 600, color: "#334155", border: "1px solid #e2e8f0", borderRadius: 999, padding: "7px 13px", background: "#ffffff", whiteSpace: "nowrap" }}>
                    <span aria-hidden style={{ color: "#0a66ff" }}>{f.icon}</span>{f.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Hero card */}
            <div style={{ borderRadius: 18, overflow: "hidden", background: "#eff6ff", border: "1px solid #dbeafe", padding: "22px 22px 20px", position: "relative" }}>
              <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-0.01em", color: "#0f172a", maxWidth: 240 }}>Know your real pay</div>
              <p style={{ fontSize: 13.5, color: "#475569", marginTop: 8, lineHeight: 1.5, maxWidth: 250 }}>
                Plan pay rises, pension sacrifice and bonuses with confidence.
              </p>
              <Link href="#calculator" style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 13.5, fontWeight: 600, color: "#0a66ff", marginTop: 14 }}>
                Learn more <span aria-hidden>→</span>
              </Link>
              <svg aria-hidden viewBox="0 0 100 60" style={{ position: "absolute", right: 10, bottom: 8, width: 92, height: 56, opacity: 0.9 }} fill="none" stroke="#93c5fd" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 44 L30 26 L48 38 L72 14 L92 28" />
                <circle cx="72" cy="14" r="3" fill="#93c5fd" stroke="none" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <div id="calculator" style={{ scrollMarginTop: 74 }} />
      <TakeHomeEngine initialSalary={parseSalary(salary)} />

      {/* Visual guide */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6">
        <TakeHomeGuide />
      </section>

      {/* FAQ + related */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6" style={{ paddingTop: 44, paddingBottom: 48 }}>
        <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: 32 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#0a66ff" }}>FAQ</div>
          <h2 style={{ fontSize: 27, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.02em", margin: "8px 0 16px", fontFamily: "var(--font-inter), system-ui, sans-serif" }}>Frequently asked</h2>
          <div className="space-y-2.5" style={{ maxWidth: 760 }}>
            {FAQS.map((f) => (
              <details key={f.q} style={{ border: "1px solid #e2e8f0", borderRadius: 12, padding: "15px 17px", background: "#fff" }}>
                <summary className="flex items-center justify-between gap-3" style={{ fontWeight: 700, fontSize: 15.5, color: "#0f172a", cursor: "pointer", listStyle: "none" }}>
                  {f.q}
                  <span style={{ color: "#0a66ff", fontSize: 20, lineHeight: 1, fontWeight: 700 }}>+</span>
                </summary>
                <p style={{ marginTop: 11, fontSize: 15, color: "#334155", lineHeight: 1.65 }}>{f.a}</p>
              </details>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2" style={{ marginTop: 32 }}>
            <div style={{ border: "1px solid #e2e8f0", borderRadius: 16, padding: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#0a66ff" }}>Related tools</div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: "#0f172a", marginTop: 4, marginBottom: 10 }}>Keep exploring</h3>
              <div>
                {related.map((c, i) => (
                  <Link key={c.href} href={c.href} className="flex items-center justify-between" style={{ fontSize: 14.5, color: "#334155", padding: "10px 0", borderBottom: i < related.length - 1 ? "1px solid #eef2f6" : "none" }}>
                    <span>{c.title}</span><span style={{ color: "#0a66ff", fontWeight: 700 }}>→</span>
                  </Link>
                ))}
              </div>
            </div>
            <div style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 16, padding: 22 }}>
              <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#7fb3ff" }}>Good to know</div>
              <p style={{ fontSize: 15, color: "#cbd5e1", marginTop: 10, lineHeight: 1.65 }}>
                Figures are estimates for the 2025/26 tax year (England, Wales &amp; NI). GovMath is not affiliated with
                HMRC. Always check your tax code and personal circumstances before making financial decisions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
