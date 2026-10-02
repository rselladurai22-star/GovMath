import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import MortgageStudio from "./MortgageStudio";
import MortgageGuide from "./MortgageGuide";
import { CALCULATORS } from "@/lib/calculators";

export const metadata: Metadata = {
  title: "UK Mortgage Repayment Calculator (2026)",
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

  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Updated for 2026/27"
      title="Mortgage Repayment Calculator"
      lead="See your monthly payment, what the mortgage really costs and how to pay less, as you type."
      points={["Live results", "Overpayments and rate rises", "Stamp Duty and upfront costs", "Free and private"]}
      guide={<MortgageGuide />}
      faqs={FAQS}
      related={related}
      note="Every figure here is an estimate. The exact amount your lender quotes depends on their product fees, any cashback and how interest is calculated (daily vs monthly). Always check the official Key Facts Illustration before you commit."
    >
      <MortgageStudio
        price={parseNumber(price, 350_000, 50_000_000)}
        deposit={parseNumber(deposit, 70_000, 50_000_000)}
        rate={parseNumber(rate, 4.75, 15)}
        term={Math.max(1, Math.round(parseNumber(term, 25, 40)))}
        showResults={[price, deposit, rate, term].some(Boolean)}
      />
    </FlagshipPage>
  );
}
