import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import PointsStudio from "./PointsStudio";
import PointsGuide from "./PointsGuide";

export const metadata: Metadata = {
  title: "Mortgage Points Calculator: Break-Even",
  description:
    "Free mortgage points calculator for 2026. See what discount points cost, the monthly saving, your break-even month and the net gain over your stay.",
  alternates: { canonical: "/us/housing/mortgage-points-calculator" },
  openGraph: ogFor("/us/housing/mortgage-points-calculator"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/housing", label: "Housing" },
  { href: "/us/housing/mortgage-points-calculator", label: "Mortgage Points Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "How much does one mortgage point cost?",
    a: "1% of the loan amount. On a $400,000 loan, one point costs $4,000 and half a point $2,000.",
  },
  {
    q: "How much does a point lower my rate?",
    a: "It depends on the lender and the day. About 0.25 of a percentage point per point is a common rule of thumb; your Loan Estimate shows the real figure.",
  },
  {
    q: "How do I work out the break-even point?",
    a: "Divide the cost of the points by the monthly saving. One point on $400,000 that cuts 7.25% to 7% saves $67.50 a month, so it breaks even in 60 months. Counting the faster paydown of the balance, it is 48 months.",
  },
  {
    q: "Are mortgage points worth it?",
    a: "Only if you keep the loan past the break-even month. On the example, one point leaves you $6,091 ahead after 10 years but $985 behind if you sell or refinance after 3.",
  },
  {
    q: "Are mortgage points tax deductible?",
    a: "Yes, as mortgage interest, if you itemize. Points on a loan to buy your main home are usually deductible in the year paid; points on a refinance are deducted over the life of the loan (IRS Topic 504).",
  },
  {
    q: "Can I deduct points if I take the standard deduction?",
    a: "No. Points only reduce tax when you itemize, and most households take the standard deduction ($32,200 for married couples filing jointly in 2026).",
  },
  {
    q: "What is a lender credit?",
    a: "The opposite of a point: the lender pays part of your closing costs in return for a higher rate. One point of credit on $400,000 gives $4,000 now and adds $68.15 a month, which suits a short stay.",
  },
  {
    q: "Can the seller pay for my points?",
    a: "Yes, as a seller concession, within your loan program's limits. You can deduct seller-paid points, but you reduce the home's cost basis by the same amount.",
  },
  {
    q: "Should I buy points or make a bigger down payment?",
    a: "If more cash down would reach 20% and remove PMI, that usually wins. Money in the down payment stays as equity when you sell; money spent on points is lost if you leave early.",
  },
  {
    q: "Are origination points the same as discount points?",
    a: "No. Origination fees pay the lender for making the loan and do not lower the rate. Only discount points buy a lower rate. Both appear in section A of the Loan Estimate.",
  },
  {
    q: "Should I buy points if rates might fall?",
    a: "Be careful. If you refinance before the break-even month, the money spent on points is lost. Points suit people who expect to keep the same loan for many years.",
  },
  {
    q: "Can I buy part of a point?",
    a: "Usually yes. Lenders often price in steps of 0.125 or 0.25 of a point. The calculator accepts any amount up to 4 points.",
  },
];

export default async function PointsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    [
      "/us/housing/mortgage-calculator",
      "/us/housing/refinance-calculator",
      "/us/housing/amortization-calculator",
      "/us/housing/mortgage-affordability",
      "/us/housing/closing-cost-calculator",
    ].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Discount points and lender credits"
      title="Mortgage Points Calculator"
      lead="Find out whether buying down your mortgage rate pays off: what the points cost, how much they save each month, when you break even and where you stand when you move."
      points={["Cost and new rate", "Break-even month", "Net gain over your stay", "Points and credits compared"]}
      guide={<PointsGuide />}
      faqs={FAQS}
      related={related}
      note="An estimate for planning, not a loan offer, tax or financial advice."
    >
      <PointsStudio query={query} />
    </FlagshipPage>
  );
}
