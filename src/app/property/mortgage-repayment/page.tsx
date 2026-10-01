import type { Metadata } from "next";
import EngineOutro from "@/components/calculator/EngineOutro";
import { HomeMotion } from "@/components/home/Motion";
import PageHero, { HeroPills } from "@/components/PageHero";
import { CAT } from "@/components/category-style";
import MortgageEngine from "./MortgageEngine";
import MortgageGuide from "./MortgageGuide";
import AdSlot from "@/components/AdSlot";
import { CALCULATORS } from "@/lib/calculators";

export const metadata: Metadata = {
  title: "UK Mortgage Repayment Calculator (2025)",
  description:
    "The UK mortgage decision engine. Model overpayments, interest-only and rate rises, watch the balance melt year by year, compare scenarios and see exactly what your home really costs.",
  alternates: { canonical: "/property/mortgage-repayment" },
};

type SearchParams = Promise<{ price?: string; deposit?: string; rate?: string; term?: string }>;

function parseNumber(raw: string | undefined, fallback: number, max: number) {
  if (!raw) return fallback;
  const n = Number(raw);
  if (!Number.isFinite(n) || n < 0) return fallback;
  return Math.min(n, max);
}

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/property", label: "Mortgages & Property" },
  { href: "/property/mortgage-repayment", label: "Mortgage Repayment" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "Should I overpay or invest instead?",
    a: "Rule of thumb: if your mortgage rate beats the after-tax return you'd realistically get elsewhere, overpay. At 4–5% mortgage rates, overpaying is often the guaranteed, tax-free win. Check your lender's limit first — usually 10% of the balance a year before any early-repayment charge.",
  },
  {
    q: "Is interest-only actually cheaper?",
    a: "Each month, yes — you only pay interest, so payments are much lower. But you still owe the entire loan at the end and need a repayment vehicle (investments, ISA, or selling) to clear it. UK lenders rarely offer interest-only for residential mortgages now; it's mostly a buy-to-let product.",
  },
  {
    q: "Why does overpaying early save so much more?",
    a: "Interest is charged on the outstanding balance, so early in the term almost all of your payment is interest. Overpaying then removes capital that would otherwise accrue interest for decades. The same overpayment in year 20 barely moves the needle — timing is everything.",
  },
  {
    q: "What is LTV and why do the bands matter?",
    a: "Loan-to-value is your loan divided by the property price. Lenders price risk in bands — you typically unlock better rates at 90%, 85%, 80%, 75% and 60% LTV. Nudging your deposit over one of these thresholds can cut your rate for the whole deal.",
  },
  {
    q: "Is the headline rate what I'll pay for the whole term?",
    a: "Almost never. Most UK mortgages fix for 2, 5 or 10 years, then revert to the lender's Standard Variable Rate — often several points higher. Plan to remortgage at the end of your fix, and stress-test your budget against a higher rate.",
  },
];

export default async function MortgagePage({ searchParams }: { searchParams: SearchParams }) {
  const { price, deposit, rate, term } = await searchParams;
  const related = CALCULATORS.filter((c) =>
    [
      "/property/mortgage-overpayment",
      "/property/mortgage-affordability",
      "/property/stamp-duty-england",
      "/property/first-time-buyer",
      "/property/rent-vs-buy",
      "/property/buy-to-let-yield",
    ].includes(c.href)
  );

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: BREADCRUMBS.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.label, item: `https://govmath.co.uk${c.href}` })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  const FEATURES = [
    { icon: "✓", label: "Based on UK rates" },
    { icon: "📊", label: "Advanced affordability" },
    { icon: "🏷️", label: "Stamp Duty estimate" },
    { icon: "🔒", label: "100% Free & Private" },
  ];

  return (
    <div id="gm-engine-page" style={{ background: "#ffffff", color: "var(--ink)" }}>
      <HomeMotion rootId="gm-engine-page" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHero
        breadcrumbs={BREADCRUMBS}
        eyebrow="2025/26 rates · Updated for this tax year"
        title="UK Mortgage Calculator"
        lead="Plan smarter. See your monthly payment, total cost and affordability in seconds."
        icon={CAT.property.icon}
        tone="property"
      >
        <HeroPills items={FEATURES.map((f) => f.label)} />
      </PageHero>

      <div id="calculator" style={{ scrollMarginTop: 74 }} />
      <MortgageEngine
        price={parseNumber(price, 350_000, 50_000_000)}
        deposit={parseNumber(deposit, 70_000, 50_000_000)}
        ratePct={parseNumber(rate, 4.75, 25)}
        termYears={parseNumber(term, 25, 40)}
      />

      {/* Ad */}
      <div className="mx-auto max-w-6xl px-5 sm:px-6" style={{ marginTop: 8, marginBottom: 8 }}>
        <AdSlot size="leaderboard" />
      </div>

      {/* Visual guide */}
      <section className="mx-auto max-w-5xl px-5 sm:px-6">
        <MortgageGuide />
      </section>

      {/* Ad */}
      <div className="mx-auto max-w-6xl px-5 sm:px-6" style={{ marginTop: 24 }}>
        <AdSlot size="billboard" />
      </div>

      <EngineOutro faqs={FAQS} related={related} note="Every figure here is an estimate. The exact amount your lender quotes depends on their product fees, any cashback and how interest is calculated (daily vs monthly). Always check the official Key Facts Illustration before you commit." />
    </div>
  );
}
