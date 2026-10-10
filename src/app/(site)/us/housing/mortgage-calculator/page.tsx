import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import MortgageStudio from "./MortgageStudio";
import MortgageGuide from "./MortgageGuide";

export const metadata: Metadata = {
  title: "Mortgage Calculator with Taxes, PMI and HOA",
  description:
    "Free mortgage calculator for 2026. See your monthly payment with property tax, insurance, PMI and HOA, the amortization schedule and what extra payments save.",
  alternates: { canonical: "/us/housing/mortgage-calculator" },
  openGraph: ogFor("/us/housing/mortgage-calculator"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/housing", label: "Housing" },
  { href: "/us/housing/mortgage-calculator", label: "Mortgage Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "What is the monthly payment on a $400,000 house?",
    a: "With 10% down at 7.25% over 30 years, principal and interest is $2,455.83 a month. Adding 1% property tax, $1,800 a year of insurance and 0.5% PMI makes the first payment about $3,089.",
  },
  {
    q: "What does PITI mean?",
    a: "Principal, interest, taxes and insurance: the four parts of a typical mortgage payment. PMI and HOA dues are often added on top.",
  },
  {
    q: "How much is PMI?",
    a: "Freddie Mac puts it at about $30 to $70 a month for every $100,000 borrowed, roughly 0.35% to 0.85% of the loan a year. Your credit score and down payment set where you fall in that range.",
  },
  {
    q: "When does PMI go away?",
    a: "You can ask your servicer to cancel it when the balance reaches 80% of the home's original value. It ends automatically at 78% on the original schedule, and must end by the loan's midpoint if you are current.",
  },
  {
    q: "Is a 15-year or 30-year mortgage better?",
    a: "A 15-year loan costs more each month but much less overall. On $360,000, a 15-year loan at 6.6% costs about $3,156 a month and $208,046 in interest; a 30-year loan at 7.25% costs $2,456 a month and $524,100 in interest.",
  },
  {
    q: "How much do extra payments save?",
    a: "On a $360,000 loan at 7.25% over 30 years, an extra $200 a month saves $130,583 of interest and pays the loan off 6 years 4 months sooner.",
  },
  {
    q: "What are mortgage rates in 2026?",
    a: "Freddie Mac's weekly survey put the average 30-year fixed rate at about 7.3% and the 15-year at about 6.6% on October 1, 2026. Your own rate depends on your credit, down payment and loan type.",
  },
  {
    q: "Why did my mortgage payment go up on a fixed-rate loan?",
    a: "Because property tax or insurance went up. They are paid through escrow, which is reviewed each year. Only the principal and interest part is fixed.",
  },
  {
    q: "How is property tax estimated?",
    a: "As a share of the home's value: about 0.89% nationally (Census Bureau, 2024), from about 0.27% in Hawaii to about 1.9% in New Jersey and Illinois. Pick your state to fill in its typical rate, or enter your own rate or dollar figure under More options.",
  },
  {
    q: "Does the calculator include closing costs?",
    a: "No. Closing costs are paid once, at closing, and do not change the monthly payment unless you roll them into the loan. Your Loan Estimate lists them.",
  },
  {
    q: "Do I need 20% down?",
    a: "No. Many conventional loans accept 3% to 5% down and FHA loans 3.5%; VA and USDA loans can need none. Below 20% on a conventional loan you pay PMI.",
  },
  {
    q: "What is the difference between the rate and the APR?",
    a: "The rate sets your payment. The APR adds the lender's fees and points, so it is higher and better for comparing offers.",
  },
];

export default async function MortgagePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/us/housing/mortgage-affordability", "/us/housing/refinance-calculator", "/us/housing/rent-affordability", "/us/loans/debt-to-income-ratio", "/us/loans/loan-calculator"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="With taxes, insurance, PMI and HOA"
      title="Mortgage Calculator"
      lead="Work out your full monthly mortgage payment, see when PMI ends, and find out how much extra payments would save."
      points={["Full PITI payment", "PMI end date", "Amortization schedule", "Extra payment savings"]}
      guide={<MortgageGuide />}
      faqs={FAQS}
      related={related}
      note="An estimate for planning, not a loan offer or financial advice."
    >
      <MortgageStudio query={query} />
    </FlagshipPage>
  );
}
