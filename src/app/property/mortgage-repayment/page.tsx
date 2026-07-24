import type { Metadata } from "next";
import Link from "next/link";
import MortgageEngine from "./MortgageEngine";
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

  return (
    <div className="rk" style={{ background: "#ffffff", fontFamily: "var(--font-figtree), system-ui, sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section style={{ borderBottom: "1px solid #e6ebe8", background: "#ffffff" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6" style={{ paddingTop: 28, paddingBottom: 22 }}>
          <nav aria-label="Breadcrumb" style={{ fontSize: 12.5 }}>
            <ol className="flex flex-wrap items-center gap-1.5" style={{ color: "#6b756e" }}>
              {BREADCRUMBS.map((c, i) => (
                <li key={c.href} className="flex items-center gap-1.5">
                  {i > 0 && <span style={{ color: "#b6c0ba" }}>/</span>}
                  {i < BREADCRUMBS.length - 1 ? (
                    <Link href={c.href} className="rk-inklink" style={{ color: "#6b756e" }}>{c.label}</Link>
                  ) : (
                    <span style={{ color: "#2d5a80", fontWeight: 600 }}>{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
            <div style={{ maxWidth: 680 }}>
              <h1 style={{ fontSize: 34, fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.03em", margin: 0, color: "#0c1611" }}>
                Mortgage Repayment Calculator
              </h1>
              <p style={{ fontSize: 15.5, color: "#4a534d", marginTop: 10, lineHeight: 1.55, maxWidth: 600 }}>
                See your monthly payment and the true cost of your home — then model overpayments, rate rises and a
                shorter term to see what really saves you money.
              </p>
            </div>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.02em", color: "#0f9a5e", border: "1px solid #cbe8da", borderRadius: 999, padding: "7px 14px", background: "#f0faf5", whiteSpace: "nowrap" }}>
              UK Repayment · 2025
            </span>
          </div>
        </div>
      </section>

      <MortgageEngine
        price={parseNumber(price, 300_000, 50_000_000)}
        deposit={parseNumber(deposit, 30_000, 50_000_000)}
        ratePct={parseNumber(rate, 4.5, 25)}
        termYears={parseNumber(term, 25, 40)}
      />

      <section className="mx-auto max-w-6xl px-4 sm:px-6" style={{ paddingBottom: 8 }}>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] lg:items-start">
          <div>
            <div className="rk-eyebrow">How it works</div>
            <h2 className="rk-serif" style={{ fontSize: 26, fontWeight: 600, marginTop: 4 }}>The maths, in plain English</h2>
            <div style={{ marginTop: 14, color: "#39423c", fontSize: 14.5, lineHeight: 1.7 }} className="space-y-4">
              <p>
                A repayment mortgage uses the standard <strong>amortisation formula</strong>:{" "}
                <code style={{ background: "#f2f5f2", borderRadius: 6, padding: "1px 6px" }}>M = P · r(1+r)ⁿ / ((1+r)ⁿ − 1)</code> — where P is the loan, r the
                monthly rate, and n the number of months. The payment stays constant, but its split shifts: early on
                it&rsquo;s mostly interest, later mostly capital.
              </p>
              <p>
                That&rsquo;s the single most important thing this tool shows. Because interest is charged on the balance,
                an overpayment in year one removes capital that would otherwise cost you interest for decades — which is
                why the same £100 saves far more early than late.
              </p>
              <p>
                Every figure here is a true month-by-month simulation, so your <strong>overpayment savings</strong>,{" "}
                <strong>payoff date</strong> and the <strong>interest/capital crossover</strong> are exact, not rules of
                thumb. Interest-only shows the low monthly cost and the capital you&rsquo;ll still owe at the end.
              </p>
            </div>

            <h2 className="rk-serif" style={{ fontSize: 26, fontWeight: 600, marginTop: 32 }}>Frequently asked</h2>
            <div className="mt-4 space-y-2.5">
              {FAQS.map((f) => (
                <details key={f.q} className="rk-details" style={{ border: "1px solid #e4e9e5", borderRadius: 12, padding: "14px 16px", background: "#fff" }}>
                  <summary className="flex items-center justify-between gap-3" style={{ fontWeight: 600, fontSize: 14.5 }}>
                    {f.q}
                    <span className="rk-mono" style={{ color: "#2d5a80", fontSize: 18, lineHeight: 1 }}>+</span>
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
                  <Link key={c.href} href={c.href} className="rk-tool" style={{ display: "block", fontSize: 13.5, color: "#39423c", padding: "9px 0", borderBottom: "1px solid #f2f5f2", ["--cat-color" as string]: "#2d5a80" }}>
                    {c.title}
                  </Link>
                ))}
              </div>
            </div>
            <div style={{ background: "#0f1a15", color: "#eef4ef", borderRadius: 16, padding: 20 }}>
              <div className="rk-mono" style={{ fontSize: 9.5, letterSpacing: "0.16em", textTransform: "uppercase", color: "#8fd6b1" }}>Good to know</div>
              <p style={{ fontSize: 13, color: "#8fa397", marginTop: 8, lineHeight: 1.6 }}>
                Estimates only. The exact figure your lender quotes depends on product fees, cashback and how interest is
                calculated (daily vs monthly). Always check the Key Facts Illustration.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
