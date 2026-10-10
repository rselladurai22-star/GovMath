import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import FhaStudio from "./FhaStudio";
import FhaGuide from "./FhaGuide";

export const metadata: Metadata = {
  title: "FHA Loan Calculator with MIP and 2026 Limits",
  description:
    "Free FHA loan calculator for 2026. Your payment with the 1.75% upfront and annual MIP, how long MIP lasts, the 2026 loan limits and a conventional comparison.",
  alternates: { canonical: "/us/housing/fha-loan-calculator" },
  openGraph: ogFor("/us/housing/fha-loan-calculator"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/housing", label: "Housing" },
  { href: "/us/housing/fha-loan-calculator", label: "FHA Loan Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "What is the payment on a $350,000 FHA loan?",
    a: "With 3.5% down at 7.25% over 30 years, the base loan is $337,750 and the financed upfront MIP takes it to $343,661. Principal and interest is $2,344.37, annual MIP adds $154.12, and with 0.89% property tax and $1,800 of insurance the first payment is about $2,908.",
  },
  {
    q: "What is the FHA upfront MIP?",
    a: "1.75% of the base loan amount, charged at closing. Most borrowers add it to the loan rather than paying cash. On a $337,750 base loan it is $5,910.63.",
  },
  {
    q: "What is the FHA annual MIP rate in 2026?",
    a: "For a loan over 15 years and at or under $726,200, it is 0.55% a year with less than 5% down and 0.50% with 5% or more down. Bigger loans pay 0.70% to 0.75%. Loans of 15 years or less pay 0.15% to 0.65%. These rates have applied since March 20, 2023 (HUD Mortgagee Letter 2023-05).",
  },
  {
    q: "How long do I pay FHA mortgage insurance?",
    a: "With 10% or more down, annual MIP stops after 11 years. With less than 10% down, it lasts for the life of the loan. The usual way to remove it is to refinance into a conventional loan once you have about 20% equity.",
  },
  {
    q: "What credit score do I need for an FHA loan?",
    a: "FHA allows 3.5% down with a score of 580 or more and 10% down with a score of 500 to 579. Below 500 FHA will not insure the loan. Many lenders set higher minimums of their own, often around 620.",
  },
  {
    q: "What are the FHA loan limits for 2026?",
    a: "For a one-unit home, from $541,287 in lower-cost counties to $1,249,125 in the most expensive, with higher limits in Alaska, Hawaii, Guam and the Virgin Islands. HUD's FHA mortgage limits page lists every county.",
  },
  {
    q: "Is an FHA loan cheaper than a conventional loan?",
    a: "It depends on your credit score. At the same rate, a conventional loan with 5% down and 0.5% PMI costs about $92 a month less than FHA with 3.5% down on a $350,000 home, and its PMI ends. With a lower credit score, conventional PMI rises sharply and FHA can be cheaper.",
  },
  {
    q: "Why does my FHA MIP go down each year?",
    a: "Annual MIP is worked out on the average balance you owe during the year, so it falls slowly as you repay. In the $350,000 example it starts at $154.12 a month and is $132.21 a month in year 11.",
  },
  {
    q: "Can I use gift money for an FHA down payment?",
    a: "Yes. FHA allows the whole down payment to come from a gift from family, an employer or certain charities and government programs, documented with a gift letter.",
  },
  {
    q: "Can I buy a multi-unit home with an FHA loan?",
    a: "Yes, up to four units, as long as you live in one of them. Limits are higher for two to four units, and the rent from the other units can help you qualify.",
  },
  {
    q: "Can I get my upfront MIP back?",
    a: "Partly, if you refinance into a new FHA loan within three years: HUD credits part of the old upfront premium against the new one. It is not refunded if you refinance into a conventional loan or sell.",
  },
  {
    q: "Are FHA loans only for first-time buyers?",
    a: "No. Anyone who meets the rules can use one, but the home must be your main residence, and you can normally have only one FHA loan at a time.",
  },
];

export default async function FhaPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    [
      "/us/housing/mortgage-calculator",
      "/us/housing/va-loan-calculator",
      "/us/housing/down-payment-calculator",
      "/us/housing/mortgage-affordability",
      "/us/housing/refinance-calculator",
      "/us/loans/debt-to-income-ratio",
    ].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="With upfront and annual MIP"
      title="FHA Loan Calculator"
      lead="Work out your FHA payment with the upfront and annual mortgage insurance premiums, see how long MIP lasts, and compare it with a conventional loan."
      points={["Upfront and annual MIP", "MIP for 11 years or life", "2026 FHA loan limits", "FHA vs conventional"]}
      guide={<FhaGuide />}
      faqs={FAQS}
      related={related}
      note="An estimate for planning, not a loan offer. Lenders may set stricter rules than FHA's minimums."
    >
      <FhaStudio query={query} />
    </FlagshipPage>
  );
}
