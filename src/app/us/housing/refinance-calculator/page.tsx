import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import RefiStudio from "./RefiStudio";
import RefiGuide from "./RefiGuide";

export const metadata: Metadata = {
  title: "Mortgage Refinance Calculator: Break-Even",
  description:
    "Free refinance calculator for 2026. See your monthly saving, the break-even month on closing costs, lifetime interest, cash out and the 30-year reset trap.",
  alternates: { canonical: "/us/housing/refinance-calculator" },
  openGraph: ogFor("/us/housing/refinance-calculator"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/housing", label: "Housing" },
  { href: "/us/housing/refinance-calculator", label: "Refinance Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "How do I work out the break-even point on a refinance?",
    a: "Divide the closing costs by the monthly saving. $9,000 of costs and a $369.78 saving gives 25 months, rounded up.",
  },
  {
    q: "Is it worth refinancing for 1% lower?",
    a: "Often, if you keep the loan well past the break-even point and do not stretch the term. From 7.75% to 6.5% on $300,000 with 25 years left saves $63,109 over a 25-year loan, but a 30-year loan costs $11,838 more overall.",
  },
  {
    q: "How much are refinance closing costs?",
    a: "Freddie Mac says to expect about 3% to 6% of the loan. On a $300,000 loan, that is $9,000 to $18,000.",
  },
  {
    q: "Should I roll closing costs into the loan?",
    a: "It avoids paying cash at closing, but you pay interest on the costs for the life of the loan. In the example, rolling $9,000 into a 25-year loan cuts the lifetime saving from $63,109 to $53,879.",
  },
  {
    q: "Why can a lower payment cost more overall?",
    a: "Because a new 30-year loan adds years of payments. Five years into a 30-year mortgage, refinancing into another 30-year loan means 35 years of payments in total.",
  },
  {
    q: "What is a cash-out refinance?",
    a: "A new, larger mortgage that pays off the old one and gives you the difference in cash. Lenders usually cap the new loan at about 80% of the home's value.",
  },
  {
    q: "How soon can I refinance after buying?",
    a: "Many conventional loans can be refinanced at any time, though some lenders and programs set waiting periods, especially for cash-out refinances. The bigger question is whether the saving covers the costs before you move.",
  },
  {
    q: "Do I need an appraisal to refinance?",
    a: "Usually, yes, as it confirms your home's value and equity. Some streamline programs and appraisal waivers skip it.",
  },
  {
    q: "What are mortgage rates now?",
    a: "Freddie Mac's survey put the average 30-year fixed rate at about 7.3% and the 15-year at about 6.6% on October 1, 2026.",
  },
  {
    q: "Does refinancing hurt my credit score?",
    a: "Slightly and briefly, from the credit check and the new account. Rate shopping within a short window is usually treated as one inquiry by scoring models.",
  },
  {
    q: "Can I refinance to get rid of PMI?",
    a: "You may not need to: on a conventional loan you can ask to cancel PMI at 80% of the original value. FHA borrowers with 20% equity sometimes refinance into a conventional loan to drop FHA mortgage insurance.",
  },
  {
    q: "Can I lower my payment without resetting to 30 years?",
    a: "Yes. Choose a term close to the years you have left, or take a 30-year loan and keep paying the old amount. Paying the 25-year payment of $2,025.62 on a 30-year loan at 6.5% clears it in 300 months with the same interest as a 25-year loan.",
  },
  {
    q: "Should I refinance an adjustable-rate mortgage?",
    a: "If the rate is about to reset higher, refinancing into a fixed rate swaps uncertainty for a known payment. Enter your expected rate after the reset as the current rate to compare.",
  },
];

export default async function RefiPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/us/housing/mortgage-calculator", "/us/housing/mortgage-affordability", "/us/loans/loan-calculator", "/us/loans/debt-payoff-calculator", "/us/loans/debt-to-income-ratio"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Monthly saving, break-even and lifetime cost"
      title="Refinance Calculator"
      lead="Compare your current mortgage with a new one: what you save each month, when the closing costs are paid back, and whether you pay more or less overall."
      points={["Break-even month", "Lifetime interest", "Cash out and rolled-in costs", "30-year reset warning"]}
      guide={<RefiGuide />}
      faqs={FAQS}
      related={related}
      note="An estimate for planning, not a loan offer or financial advice."
    >
      <RefiStudio query={query} />
    </FlagshipPage>
  );
}
