import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import VaStudio from "./VaStudio";
import VaGuide from "./VaGuide";

export const metadata: Metadata = {
  title: "VA Loan Calculator with Funding Fee",
  description:
    "Free VA loan calculator for 2026. Your payment with the VA funding fee, exemptions, no PMI and no down payment, plus a comparison with FHA and conventional loans.",
  alternates: { canonical: "/us/housing/va-loan-calculator" },
  openGraph: ogFor("/us/housing/va-loan-calculator"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/housing", label: "Housing" },
  { href: "/us/housing/va-loan-calculator", label: "VA Loan Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "What is the payment on a $400,000 VA loan?",
    a: "With no down payment at 7.25% over 30 years, the 2.15% first-use funding fee of $8,600 is usually added to the loan, making it $408,600. Principal and interest is $2,787.37, and with 0.89% property tax and $1,800 of insurance the payment is about $3,234 a month.",
  },
  {
    q: "How much is the VA funding fee in 2026?",
    a: "For a purchase with less than 5% down, 2.15% of the loan the first time you use your benefit and 3.3% after that. With 5% to 9.99% down it is 1.5%, and with 10% or more 1.25%, however many times you have used it. These rates have applied since April 7, 2023.",
  },
  {
    q: "Who doesn't have to pay the VA funding fee?",
    a: "Veterans who receive VA compensation for a service-connected disability (or would, if not receiving retirement or active-duty pay), surviving spouses receiving Dependency and Indemnity Compensation, service members with a pre-discharge rating for compensation, and active-duty service members with a Purple Heart.",
  },
  {
    q: "Is there a VA loan limit in 2026?",
    a: "Not if you have full entitlement: since 2020 the VA guarantees loans of any size with no down payment, though the lender still has to approve the amount. With reduced entitlement, for example because an earlier VA loan is still open, county conforming limits decide how much you can borrow with nothing down.",
  },
  {
    q: "Do VA loans have PMI?",
    a: "No. There is no monthly mortgage insurance on a VA loan, whatever your down payment. The one-time funding fee takes its place.",
  },
  {
    q: "Should I finance the funding fee or pay it in cash?",
    a: "Financing keeps cash in your pocket but you pay interest on it. On a $400,000 home, financing the $8,600 fee at 7.25% adds $58.66 a month and about $12,520 of interest over 30 years.",
  },
  {
    q: "Does a down payment help on a VA loan?",
    a: "It lowers the funding fee and the loan. On a $400,000 home, 5% down cuts the fee to $5,700 and 10% down to $4,500, and the payment falls from about $3,234 to $3,078 and $2,933.",
  },
  {
    q: "What is VA residual income?",
    a: "The money left each month after the mortgage payment, taxes, debts and an allowance for maintenance and utilities. The VA sets a guide by family size and region; for loans of $80,000 or more it runs from $441 for one person in the Midwest or South to $1,158 for five people in the West.",
  },
  {
    q: "Is a VA loan cheaper than an FHA loan?",
    a: "Usually. On a $400,000 home at the same rate, a first-use VA loan with nothing down costs about $3,234 a month, against $3,302 for FHA with 3.5% down, and the VA loan needs no down payment and has no monthly mortgage insurance.",
  },
  {
    q: "Can I use a VA loan more than once?",
    a: "Yes. Your entitlement is restored when you sell and repay the loan, and you can sometimes have two VA loans at once with remaining entitlement. Later loans with less than 5% down pay the higher 3.3% funding fee.",
  },
  {
    q: "What credit score do I need for a VA loan?",
    a: "The VA does not set a minimum score; it asks lenders to look at your whole credit history. Most lenders set their own minimum, so it is worth comparing several.",
  },
  {
    q: "Can I get the funding fee refunded?",
    a: "Yes, if you are later awarded VA disability compensation effective before your loan closed. A proposed or memorandum rating issued after closing does not qualify. Contact your VA regional loan center.",
  },
];

export default async function VaPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    [
      "/us/housing/mortgage-calculator",
      "/us/housing/fha-loan-calculator",
      "/us/housing/mortgage-affordability",
      "/us/housing/refinance-calculator",
      "/us/loans/debt-to-income-ratio",
      "/us/housing/closing-cost-calculator",
    ].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="With the funding fee and no PMI"
      title="VA Loan Calculator"
      lead="Work out your VA home loan payment with the funding fee, check whether you are exempt, and compare it with FHA and conventional loans."
      points={["2026 VA funding fee", "Exemptions", "No down payment, no PMI", "VA vs FHA vs conventional"]}
      guide={<VaGuide />}
      faqs={FAQS}
      related={related}
      note="An estimate for planning, not a loan offer. Your Certificate of Eligibility confirms your entitlement and fee status."
    >
      <VaStudio query={query} />
    </FlagshipPage>
  );
}
