import type { Metadata } from "next";
import PageHero, { HeroPills } from "@/components/PageHero";
import { CAT } from "@/components/category-style";
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
    <div style={{ background: "#ffffff", color: "var(--ink)" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <PageHero
        breadcrumbs={BREADCRUMBS}
        eyebrow="2025/26 rates · Updated for this tax year"
        title="Take-Home Pay Calculator"
        lead="See exactly what lands in your bank after Income Tax, National Insurance, pension and student loan."
        icon={CAT["tax-and-salary"].icon}
        tone="tax-and-salary"
      >
        <HeroPills items={FEATURES.map((f) => f.label)} />
      </PageHero>

      <div id="calculator" style={{ scrollMarginTop: 74 }} />
      <TakeHomeEngine initialSalary={parseSalary(salary)} />

      {/* Visual guide */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6">
        <TakeHomeGuide />
      </section>

      {/* FAQ + related */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6" style={{ paddingTop: 44, paddingBottom: 48 }}>
        <div style={{ borderTop: "1px solid #e6e8f2", paddingTop: 32 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#4353ff" }}>FAQ</div>
          <h2 style={{ fontSize: 27, fontWeight: 800, color: "#0d1330", letterSpacing: "-0.02em", margin: "8px 0 16px", fontFamily: "var(--font-inter), system-ui, sans-serif" }}>Frequently asked</h2>
          <div className="space-y-2.5" style={{ maxWidth: 760 }}>
            {FAQS.map((f) => (
              <details key={f.q} style={{ border: "1px solid #e6e8f2", borderRadius: 6, padding: "15px 17px", background: "#fff" }}>
                <summary className="flex items-center justify-between gap-3" style={{ fontWeight: 700, fontSize: 15.5, color: "#0d1330", cursor: "pointer", listStyle: "none" }}>
                  {f.q}
                  <span style={{ color: "#4353ff", fontSize: 20, lineHeight: 1, fontWeight: 700 }}>+</span>
                </summary>
                <p style={{ marginTop: 11, fontSize: 15, color: "#1a2040", lineHeight: 1.65 }}>{f.a}</p>
              </details>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2" style={{ marginTop: 32 }}>
            <div style={{ border: "1px solid #e6e8f2", borderRadius: 6, padding: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#4353ff" }}>Related tools</div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: "#0d1330", marginTop: 4, marginBottom: 10 }}>Keep exploring</h3>
              <div>
                {related.map((c, i) => (
                  <Link key={c.href} href={c.href} className="flex items-center justify-between" style={{ fontSize: 14.5, color: "#1a2040", padding: "10px 0", borderBottom: i < related.length - 1 ? "1px solid #eef2f6" : "none" }}>
                    <span>{c.title}</span><span style={{ color: "#4353ff", fontWeight: 700 }}>→</span>
                  </Link>
                ))}
              </div>
            </div>
            <div style={{ background: "#0d1330", color: "#e6e8f2", borderRadius: 6, padding: 22 }}>
              <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#7fb3ff" }}>Good to know</div>
              <p style={{ fontSize: 15, color: "#d0d5dd", marginTop: 10, lineHeight: 1.65 }}>
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
