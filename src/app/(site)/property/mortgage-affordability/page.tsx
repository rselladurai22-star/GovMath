import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import AffordabilityStudio from "./AffordabilityStudio";
import AffordabilityGuide from "./AffordabilityGuide";

export const metadata: Metadata = {
  title: "Mortgage Affordability Calculator (UK, 2026)",
  description:
    "How much could you borrow? Income multiples, bonus income, debts and childcare, a rate-rise stress test, monthly payments and the Stamp Duty on the home you could buy.",
  alternates: { canonical: "/property/mortgage-affordability" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/property", label: "Mortgages & Property" },
  { href: "/property/mortgage-affordability", label: "Mortgage Affordability" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much can I borrow for a mortgage?", a: "Most UK lenders lend around 4 to 4.5 times your yearly income before tax, less if you have debts or childcare costs. Some lend 5 to 5.5 times to higher earners." },
  { q: "Do lenders count my bonus?", a: "Often 50% of bonus, overtime or commission, more if it is regular and proven over two years." },
  { q: "How do debts affect what I can borrow?", a: "Regular commitments reduce your borrowing. At 4.5 times income, each £100 a month of debt or childcare cuts the loan by roughly £5,400." },
  { q: "What is a mortgage stress test?", a: "Lenders check you could still afford payments if interest rates rose, often by a few percentage points above your rate." },
  { q: "What deposit do I need?", a: "At least 5% with most lenders. A deposit of 10%, 15% or 25% usually unlocks lower rates." },
];

export default async function AffordabilityPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/property/mortgage-repayment", "/property/first-time-buyer", "/property/stamp-duty-england", "/property/shared-ownership", "/property/rent-vs-buy", "/tax-and-salary/salary-calculator"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Updated for 2026"
      title="Mortgage Affordability Calculator"
      lead="See how much you could borrow, what it would cost each month, and whether it would still be affordable if rates rose."
      points={["Joint incomes and bonuses", "Debts and childcare", "Rate-rise stress test", "Free and private"]}
      guide={<AffordabilityGuide />}
      faqs={FAQS}
      related={related}
      note="An estimate based on common lender rules. Lenders use their own models, credit checks and full details of your outgoings. Get a decision in principle before making offers."
    >
      <AffordabilityStudio query={query} />
    </FlagshipPage>
  );
}
