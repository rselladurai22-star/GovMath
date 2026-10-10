import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import AmortizationStudio from "./AmortizationStudio";
import AmortizationGuide from "./AmortizationGuide";

export const metadata: Metadata = {
  title: "Amortization Calculator with Extra Payments",
  description:
    "Free amortization calculator for 2026. See every payment by month and year with dates, the interest and principal split, and what extra payments save.",
  alternates: { canonical: "/us/housing/amortization-calculator" },
  openGraph: ogFor("/us/housing/amortization-calculator"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/housing", label: "Housing" },
  { href: "/us/housing/amortization-calculator", label: "Amortization Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "What is an amortization schedule?",
    a: "A table of every payment on a fixed-rate loan, showing how much goes to interest, how much goes to principal and the balance left afterward. The payment stays the same; the split between interest and principal changes each month.",
  },
  {
    q: "Why is most of my early mortgage payment interest?",
    a: "Interest is charged on the balance, which is largest at the start. On $300,000 at 7.25%, the first payment of $2,046.53 includes $1,812.50 of interest and only $234.03 of principal.",
  },
  {
    q: "When does more of my payment go to principal than interest?",
    a: "On a 30-year loan at 7.25% it takes until payment 246, more than 20 years in. On a 15-year loan at the same rate it happens at payment 66. The calculator shows your own tipping point.",
  },
  {
    q: "How much interest will I pay on a $300,000 mortgage?",
    a: "At 7.25% over 30 years, $436,750. Over 15 years at 6.6%, $173,372. The rate and the term matter far more than small differences in the amount.",
  },
  {
    q: "Do extra payments lower my monthly payment?",
    a: "No. On a US mortgage, extra principal shortens the loan and cuts interest, but the required payment stays the same. Some servicers will recast the loan after a lump sum to lower the payment, usually for a fee.",
  },
  {
    q: "How much does $200 extra a month save?",
    a: "On $300,000 at 7.25% over 30 years, starting December 2026, it moves the last payment from November 2056 to August 2049 and saves $123,590 of interest.",
  },
  {
    q: "Is it better to pay extra early or late in the loan?",
    a: "Early. A $10,000 lump sum in the seventh month of that loan saves $65,133 of interest; the same $10,000 twenty years in saves $9,942.",
  },
  {
    q: "Does the schedule include taxes and insurance?",
    a: "No. It covers principal and interest only. Property tax, homeowners insurance, PMI and HOA dues are extra; the mortgage calculator adds them.",
  },
  {
    q: "Why does my statement differ from the schedule by a few cents?",
    a: "Servicers round interest each month, and a few charge interest by the day. Small differences are normal. A large gap usually means a different start date, rate or balance, or an extra payment that went to escrow instead of principal.",
  },
  {
    q: "Can I use this for a car loan or personal loan?",
    a: "Yes. Any fixed-rate installment loan follows the same schedule. Enter the amount, the rate and the term in years, for example 5 years for a 60-month car loan.",
  },
  {
    q: "What is the formula for the monthly payment?",
    a: "Payment = P × r ÷ (1 − (1 + r)^−n), where P is the amount borrowed, r is the yearly rate ÷ 12 and n is the number of monthly payments.",
  },
  {
    q: "When is the first mortgage payment due?",
    a: "Usually on the first day of the second month after closing, because interest is paid in arrears. Close in late October and the first payment is typically due December 1.",
  },
];

export default async function AmortizationPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    [
      "/us/housing/mortgage-calculator",
      "/us/housing/mortgage-payoff-calculator",
      "/us/housing/refinance-calculator",
      "/us/housing/mortgage-points-calculator",
      "/us/loans/loan-calculator",
    ].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Monthly and yearly, with dates"
      title="Amortization Calculator"
      lead="See every payment on your loan, month by month and year by year, with the interest and principal in each and what extra payments would change."
      points={["Monthly and yearly schedule", "Real payment dates", "Interest vs principal", "Monthly, yearly and one-time extras"]}
      guide={<AmortizationGuide />}
      faqs={FAQS}
      related={related}
      note="An estimate for planning, not a loan offer or financial advice."
    >
      <AmortizationStudio query={query} />
    </FlagshipPage>
  );
}
