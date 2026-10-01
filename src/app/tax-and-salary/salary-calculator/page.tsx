import type { Metadata } from "next";
import EngineOutro from "@/components/calculator/EngineOutro";
import { HomeMotion } from "@/components/home/Motion";
import PageHero, { HeroPills } from "@/components/PageHero";
import { CAT } from "@/components/category-style";
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
    <div id="gm-engine-page" style={{ background: "#ffffff", color: "var(--ink)" }}>
      <HomeMotion rootId="gm-engine-page" />
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

      <EngineOutro faqs={FAQS} related={related} note="Figures are estimates for the 2025/26 tax year (England, Wales & NI). GovMath is not affiliated with HMRC. Always check your tax code and personal circumstances before making financial decisions." />
    </div>
  );
}
