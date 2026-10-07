import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import AffordabilityStudio from "./AffordabilityStudio";
import { ogFor } from "@/gm/og";
import AffordabilityGuide from "./AffordabilityGuide";

export const metadata: Metadata = {
  title: "Mortgage Affordability Calculator UK 2026",
  description:
    "Free mortgage affordability calculator. See how much you could borrow from income multiples, debts and childcare, with a rate stress test and monthly payments.",
  alternates: { canonical: "/uk/property/mortgage-affordability" },
  openGraph: ogFor("/uk/property/mortgage-affordability"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/property", label: "Mortgages & Property" },
  { href: "/uk/property/mortgage-affordability", label: "Mortgage Affordability" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much can I borrow for a mortgage?", a: "Most UK lenders lend around 4 to 4.5 times your yearly income before tax, less if you have debts or childcare costs. Some lend 5 to 5.5 times to higher earners." },
  { q: "Do lenders count my bonus?", a: "Often 50% of bonus, overtime or commission, more if it is regular and proven over two years." },
  { q: "How do debts affect what I can borrow?", a: "Regular commitments reduce your borrowing. At 4.5 times income, each £100 a month of debt or childcare cuts the loan by roughly £5,400." },
  { q: "What is a mortgage stress test?", a: "Lenders check you could still afford payments if interest rates rose, often by a few percentage points above your rate." },
  { q: "What deposit do I need?", a: "At least 5% with most lenders. A deposit of 10%, 15% or 25% usually unlocks lower rates." },
  { q: "Can I borrow 5 or 6 times my salary?", a: "Some lenders offer 5 to 5.5 times to higher earners or certain professions, and a few schemes go higher. Most borrowers are limited to 4.5 times." },
  { q: "Does my student loan reduce what I can borrow?", a: "It can. Student loan repayments reduce your take-home pay, and many lenders include them in the affordability check." },
  { q: "Do lenders count my partner's income if they are not on the mortgage?", a: "No. Only applicants' income counts, though some lenders allow a joint borrower who is not an owner." },
  { q: "Does a bigger deposit let me borrow more?", a: "Not directly: the multiple is based on income. But you can buy a more expensive home, and a lower LTV usually means a better rate." },
  { q: "Should I use a broker?", a: "A broker can compare many lenders and knows which ones suit your circumstances, such as self-employment or a bonus. Some charge a fee." },
  { q: "Will a mortgage application affect my credit score?", a: "A decision in principle usually uses a soft search, which other lenders cannot see. A full application uses a hard search, which is recorded. Several hard searches in a short time can count against you, so avoid applying to many lenders at once." },
  { q: "How long is a mortgage offer valid?", a: "Usually around six months, though it varies by lender. New-build offers can sometimes be extended." },
];

export default async function AffordabilityPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/uk/property/mortgage-repayment", "/uk/property/first-time-buyer", "/uk/property/stamp-duty-england", "/uk/property/shared-ownership", "/uk/property/rent-vs-buy", "/uk/tax-and-salary/salary-calculator"].includes(c.href),
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
