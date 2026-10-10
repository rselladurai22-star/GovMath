import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import AprStudio from "./AprStudio";
import AprGuide from "./AprGuide";

export const metadata: Metadata = {
  title: "APR Calculator: True Cost With Points and Fees",
  description:
    "Free APR calculator for 2026. Turn a rate, points and lender fees into the true APR, solve the APR from a quoted payment, and see the cost if you repay early.",
  alternates: { canonical: "/us/loans/apr-calculator" },
  openGraph: ogFor("/us/loans/apr-calculator"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/loans", label: "Loans and debt" },
  { href: "/us/loans/apr-calculator", label: "APR Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "What is APR?",
    a: "The annual percentage rate is the yearly cost of a loan including the interest and the fees that count as finance charges, such as points and origination fees. The federal Truth in Lending Act makes lenders show it so you can compare offers.",
  },
  {
    q: "How is APR calculated?",
    a: "Take the amount financed (the loan minus prepaid fees) and find the monthly rate at which your monthly payments would exactly repay it. Multiply that rate by 12. This is the actuarial method set out in Regulation Z.",
  },
  {
    q: "What is the APR on a $300,000 mortgage at 6.25% with 1 point and $3,000 in fees?",
    a: "About 6.442% over 30 years. The payment is $1,847.15 a month, but you only have the use of $294,000 after the $6,000 of points and fees, so the true yearly cost is higher than the rate.",
  },
  {
    q: "Why is my APR higher than my interest rate?",
    a: "Because the APR spreads the fees you pay to get the loan over its term. With no fees, APR and rate are the same. The bigger the fees and the shorter the loan, the bigger the gap.",
  },
  {
    q: "Which fees are included in a mortgage APR?",
    a: "Finance charges such as discount points, origination and underwriting fees, mortgage broker fees, prepaid interest and mortgage insurance. Appraisal, credit report, title insurance, inspection and recording fees are left out on a home loan.",
  },
  {
    q: "Can I work out the APR from my monthly payment?",
    a: "Yes. Choose \"The monthly payment\", enter the loan amount, the payment and the term. A dealer quote of $520 a month for 60 months on $25,000 works out at about 9.09% APR; $499 for 72 months is about 12.78%.",
  },
  {
    q: "Is a lower APR always the better deal?",
    a: "Not always. The APR assumes you keep the loan for the full term. If you will sell or refinance in a few years, a loan with fewer fees and a slightly higher rate can cost less. The early payoff table shows this.",
  },
  {
    q: "What is the difference between APR and APY?",
    a: "APR is a simple yearly rate (the monthly rate times 12) used for loans. APY includes compounding and is used for savings. A 12% APR charged monthly is about 12.68% as an APY.",
  },
  {
    q: "How accurate does a lender's APR have to be?",
    a: "Under Regulation Z, an APR on a regular loan is treated as accurate if it is within one-eighth of a percentage point (0.125) of the true figure, or a quarter point for irregular loans.",
  },
  {
    q: "Does APR include compounding?",
    a: "No. The APR is the periodic rate times the number of periods in a year. Interest still builds monthly on the balance, but the APR figure itself does not compound.",
  },
  {
    q: "Are points worth paying?",
    a: "On a $300,000 loan, paying 1 point ($3,000) to cut the rate from 6.5% to 6.25% saves $49.05 a month, so it takes about 61 months to earn the cost back. Keep the loan longer than that and the points pay off.",
  },
  {
    q: "Do credit cards have an APR too?",
    a: "Yes, but for a card the APR is simply the yearly interest rate; most card fees are not folded into it. Our credit card interest calculator shows what that APR costs each month.",
  },
];

export default async function AprPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    [
      "/us/loans/loan-calculator",
      "/us/loans/loan-comparison-calculator",
      "/us/housing/mortgage-calculator",
      "/us/housing/refinance-calculator",
      "/us/loans/auto-loan-calculator",
      "/us/loans/credit-card-interest-calculator",
    ].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Points, fees and the Truth in Lending APR"
      title="APR Calculator"
      lead="Turn an interest rate, discount points and lender fees into the true APR, work the APR out from a quoted monthly payment, and see how much more a loan really costs if you pay it off early."
      points={["Mortgage points and fees", "APR from a quoted payment", "Truth in Lending figures", "Cost if you repay early"]}
      guide={<AprGuide />}
      faqs={FAQS}
      related={related}
      note="An estimate for planning, not a loan disclosure or financial advice."
    >
      <AprStudio query={query} />
    </FlagshipPage>
  );
}
