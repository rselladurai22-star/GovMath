import type { Metadata } from "next";
import PageHero, { HeroPills } from "@/components/PageHero";
import { CAT } from "@/components/category-style";
import Link from "next/link";
import NIEngine from "./NIEngine";
import NIGuide from "./NIGuide";
import AdSlot from "@/components/AdSlot";
import { CALCULATORS } from "@/lib/calculators";

export const metadata: Metadata = {
  title: "National Insurance Calculator (UK, 2025/26)",
  description:
    "Work out your UK National Insurance for 2025/26 — Class 1 (employee) or Class 4 (self-employed), band by band, with your effective and marginal NI rate. Free, private, no sign-up.",
  alternates: { canonical: "/tax-and-salary/national-insurance" },
};

type SearchParams = Promise<{ income?: string }>;
function parseIncome(raw: string | undefined): number {
  if (!raw) return 35000;
  const n = Number(raw);
  if (!Number.isFinite(n) || n < 0) return 35000;
  return Math.min(n, 10_000_000);
}

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/tax-and-salary", label: "Tax & Salary" },
  { href: "/tax-and-salary/national-insurance", label: "National Insurance" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much National Insurance will I pay?", a: "As an employee in 2025/26 you pay Class 1 NI at 8% on earnings between £12,570 and £50,270, then 2% on anything above £50,270. Nothing is due below £12,570. Enter your salary above for your exact figure, monthly and annually." },
  { q: "Why does the NI rate fall for high earners?", a: "The main 8% rate only applies up to the Upper Earnings Limit (£50,270). Above that, the rate drops to 2%. So while high earners pay more NI in total, their marginal rate on the next pound is lower than a middle earner's." },
  { q: "Is self-employed NI different?", a: "Yes. The self-employed pay Class 4 NI on their trading profits at 6% between £12,570 and £50,270, and 2% above — lower than employees. Class 2 NI was effectively abolished from April 2024. Switch the toggle above to see self-employed figures." },
  { q: "Does National Insurance build my State Pension?", a: "Your NI record does. You generally need 35 qualifying years for the full new State Pension, and at least 10 years to receive anything. Contributions also fund the NHS and certain benefits — it isn't a personal savings pot." },
  { q: "Is NI the same across the UK?", a: "Yes. Unlike Income Tax (which differs in Scotland), National Insurance rates and thresholds are the same across England, Wales, Scotland and Northern Ireland." },
];

export default async function NationalInsurancePage({ searchParams }: { searchParams: SearchParams }) {
  const { income } = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/tax-and-salary/salary-calculator", "/tax-and-salary/tax-bracket-checker", "/tax-and-salary/bonus-tax", "/business/sole-trader-tax", "/tax-and-salary/scottish-tax", "/investing/state-pension-age"].includes(c.href)
  );

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: BREADCRUMBS.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.label, item: `https://govmath.co.uk${c.href}` })) },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ];

  const FEATURES = [
    { icon: "✓", label: "2025/26 HMRC rates" },
    { icon: "📊", label: "Band-by-band" },
    { icon: "🧾", label: "Employed & self-employed" },
    { icon: "🔒", label: "100% Free & Private" },
  ];

  return (
    <div style={{ background: "#ffffff", color: "var(--ink)" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHero
        breadcrumbs={BREADCRUMBS}
        eyebrow="2025/26 rates · Updated for this tax year"
        title="National Insurance Calculator"
        lead="See exactly what you pay in NI — as an employee or self-employed — band by band, for the 2025/26 tax year."
        icon={CAT["tax-and-salary"].icon}
        tone="tax-and-salary"
      >
        <HeroPills items={FEATURES.map((f) => f.label)} />
      </PageHero>

      <div id="calculator" style={{ scrollMarginTop: 74 }} />
      <NIEngine initialIncome={parseIncome(income)} />

      <div className="mx-auto max-w-6xl px-4 sm:px-6" style={{ marginTop: 8, marginBottom: 8 }}>
        <AdSlot size="leaderboard" />
      </div>

      <section className="mx-auto max-w-5xl px-4 sm:px-6">
        <NIGuide />
      </section>

      <section className="mx-auto max-w-5xl px-4 sm:px-6" style={{ paddingTop: 44, paddingBottom: 48 }}>
        <div style={{ borderTop: "1px solid #e6e8f2", paddingTop: 32 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#4353ff" }}>FAQ</div>
          <h2 style={{ fontSize: 27, fontWeight: 800, color: "#0d1330", letterSpacing: "-0.02em", margin: "8px 0 16px" }}>Frequently asked</h2>
          <div className="space-y-2.5" style={{ maxWidth: 760 }}>
            {FAQS.map((f) => (
              <details key={f.q} style={{ border: "1px solid #e6e8f2", borderRadius: 14, padding: "15px 17px", background: "#fff" }}>
                <summary className="flex items-center justify-between gap-3" style={{ fontWeight: 700, fontSize: 15.5, color: "#0d1330", cursor: "pointer", listStyle: "none" }}>
                  {f.q}
                  <span style={{ color: "#4353ff", fontSize: 20, lineHeight: 1, fontWeight: 700 }}>+</span>
                </summary>
                <p style={{ marginTop: 11, fontSize: 15, color: "#1a2040", lineHeight: 1.65 }}>{f.a}</p>
              </details>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2" style={{ marginTop: 32 }}>
            <div style={{ border: "1px solid #e6e8f2", borderRadius: 14, padding: 20 }}>
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
            <div style={{ background: "#0d1330", color: "#e6e8f2", borderRadius: 14, padding: 22 }}>
              <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#7fb3ff" }}>Good to know</div>
              <p style={{ fontSize: 15, color: "#d0d5dd", marginTop: 10, lineHeight: 1.65 }}>
                Figures are estimates for the 2025/26 tax year. National Insurance is UK-wide. GovMath is not affiliated
                with HMRC — always check your payslip and personal circumstances.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
