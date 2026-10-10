import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import CollegeStudio from "./CollegeStudio";
import CollegeGuide from "./CollegeGuide";

const PATH = "/us/savings/529-plan-calculator";

export const metadata: Metadata = {
  title: "529 Calculator 2026: How Much to Save for College",
  description: "Free 529 college savings calculator for 2026. See what college will cost when your child enrolls and how much to save each month to cover it.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/savings", label: "Saving and retirement" },
  { href: PATH, label: "529 College Savings Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much should I save for college each month?", a: "To cover four years at an in-state public university for a newborn, about $574 a month, assuming a 6% return and 4% yearly cost growth. Covering half takes about $287 a month." },
  { q: "How much does college cost in 2025–26?", a: "College Board averages for a year, including housing and food: $15,000 at a public two-year college, $25,850 at an in-state public four-year, $45,780 out-of-state and $60,920 at a private nonprofit." },
  { q: "How much will college cost in 18 years?", a: "At 4% a year, four years at an in-state public university that cost $103,400 today would cost about $222,376 for a child born now." },
  { q: "Are 529 contributions tax-deductible?", a: "Not on your federal return. Many states give a deduction or credit for contributions, usually for their own plan and up to a yearly cap." },
  { q: "What can a 529 plan pay for?", a: "Tuition, fees, books, supplies, computers, and housing and food for students enrolled at least half-time, plus registered apprenticeships, up to $10,000 of student loans in a lifetime, and K-12 costs up to $20,000 a year from 2026." },
  { q: "What happens if my child doesn't go to college?", a: "You can change the beneficiary to another family member tax-free, keep the money for later study, roll up to $35,000 into the beneficiary's Roth IRA, or withdraw it, paying tax and usually a 10% penalty on the earnings." },
  { q: "How does the 529 to Roth IRA rollover work?", a: "The 529 must have been open at least 15 years. Up to $35,000 in a lifetime can move to the beneficiary's Roth IRA, within each year's IRA limit and their earned income. Contributions from the last five years can't be moved." },
  { q: "How much can grandparents put in a 529?", a: "Up to $19,000 per grandparent per child in 2026 with no gift tax paperwork, or $95,000 at once ($190,000 for a couple) by electing to spread the gift over five years on Form 709." },
  { q: "Does a 529 hurt financial aid?", a: "Only a little. A parent-owned 529 counts as a parental asset on the FAFSA, reducing aid by at most about 5.64% of its value. Grandparent-owned 529s are no longer counted on the FAFSA." },
  { q: "Can I use a 529 for private K-12 school?", a: "Yes. From 2026, up to $20,000 a year per student, for tuition and other K-12 costs. Some states don't follow this rule for state tax, so check your plan first." },
  { q: "Do I have to use my own state's 529 plan?", a: "No, you can use any state's plan. Your own state's plan may give you a state tax deduction, so compare that with fees and investment choices elsewhere." },
  { q: "What return should I assume?", a: "The calculator uses 6% a year by default. At 4% a newborn's in-state target needs about $705 a month; at 8%, about $463. Returns aren't guaranteed." },
];

export default async function CollegePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/us/savings/savings-goal-calculator", "/us/savings/compound-interest-calculator", "/us/loans/student-loan-calculator", "/us/savings/roth-ira-calculator", "/us/savings/inflation-calculator", "/us/savings/investment-calculator"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="College saving"
      title="529 College Savings Calculator"
      lead="See what college could cost when your child enrolls, how much to save each month in a 529 plan to cover all or part of it, and what your state tax deduction is worth."
      points={["2025–26 College Board prices", "Monthly saving target", "Share of the cost to cover", "State tax deduction"]}
      guide={<CollegeGuide />}
      faqs={FAQS}
      related={related}
      note="Projections, not guarantees. Investment returns and college costs vary, and 529 tax rules differ by state. Not financial or tax advice."
    >
      <CollegeStudio query={query} />
    </FlagshipPage>
  );
}
