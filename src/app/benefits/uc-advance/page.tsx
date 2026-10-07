import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import AdvanceStudio from "./AdvanceStudio";
import { ogFor } from "@/gm/og";
import AdvanceGuide from "./AdvanceGuide";

export const metadata: Metadata = {
  title: "Universal Credit Advance Calculator 2026/27",
  description:
    "Free Universal Credit advance calculator. See your monthly repayments over up to 24 months, the 15% deductions cap and budgeting advance limits.",
  alternates: { canonical: "/benefits/uc-advance" },
  openGraph: ogFor("/benefits/uc-advance"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/benefits", label: "Family & Benefits" },
  { href: "/benefits/uc-advance", label: "UC Advance Repayment Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much Universal Credit advance can I get?", a: "Up to one month of your estimated Universal Credit. You can ask for less." },
  { q: "How long do I have to pay back a UC advance?", a: "Up to 24 months for a new claim advance. You choose the period when you apply." },
  { q: "Is there interest on a Universal Credit advance?", a: "No. You pay back exactly what you borrowed." },
  { q: "How much is taken from my Universal Credit to repay it?", a: "The advance divided by the number of months. Most deductions together are capped at 15% of your standard allowance." },
  { q: "What is the 15% deductions cap?", a: "Since April 2025, most deductions together cannot be more than 15% of your standard allowance: £63.74 a month for a single person aged 25 or over in 2026/27." },
  { q: "What happens if my Universal Credit stops?", a: "Anything still owed becomes a debt to the DWP, which will ask you to agree a payment plan. Repayments restart if you claim again." },
  { q: "Can I pay an advance back early?", a: "Yes. Contact the DWP Debt Management service to pay off the balance." },
  { q: "What is a budgeting advance?", a: "A loan for one-off costs after 6 months on Universal Credit: up to £348 single, £464 for a couple or £812 with children." },
  { q: "Can I delay advance repayments?", a: "In exceptional circumstances repayments can be delayed for up to 3 months. Ask through your journal." },
  { q: "Should I take the full advance?", a: "Only if you need it. Every pound is taken back from later payments, so a smaller advance leaves you more each month." },
  { q: "Can I get an advance if I move to Universal Credit from another benefit?", a: "Yes. You can ask for a benefit transfer advance if you need money before your first Universal Credit payment." },
  { q: "Does a Universal Credit advance affect my credit score?", a: "No. It is a debt to the DWP, not a loan from a lender, so it does not appear on your credit file." },
  { q: "Can I get a second advance?", a: "You can ask for a change of circumstances advance if your award goes up, or a budgeting advance after 6 months, but not a second new claim advance." },
];

export default async function UcAdvancePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/benefits/universal-credit", "/benefits/universal-credit-taper", "/benefits/benefits-checker", "/benefits/new-style-jsa", "/benefits/benefit-cap", "/benefits/local-housing-allowance"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026/27 rules"
      title="UC Advance Repayment Calculator"
      lead="See how much a Universal Credit advance takes from each payment, whether it stays within the 15% cap, and what you are left with."
      points={["Up to 24 months", "15% deductions cap", "Budgeting advances", "Free and private"]}
      guide={<AdvanceGuide />}
      faqs={FAQS}
      related={related}
      note="The DWP decides the amount and repayment period. This calculator shows how the sums work."
    >
      <AdvanceStudio query={query} />
    </FlagshipPage>
  );
}
