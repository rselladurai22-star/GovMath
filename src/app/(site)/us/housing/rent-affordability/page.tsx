import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import RentStudio from "./RentStudio";
import RentGuide from "./RentGuide";

export const metadata: Metadata = {
  title: "Rent Affordability Calculator: How Much Rent?",
  description:
    "Free rent affordability calculator for 2026. See the rent you can afford under the 30% rule, the 40× rule and a 50/30/20 budget, and the income a rent needs.",
  alternates: { canonical: "/us/housing/rent-affordability" },
  openGraph: ogFor("/us/housing/rent-affordability"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/housing", label: "Housing" },
  { href: "/us/housing/rent-affordability", label: "Rent Affordability Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "How much rent can I afford on $60,000 a year?",
    a: "$1,500 a month under the 30% rule and the 40× rule. Single in Texas, with $700 of other essentials and $300 of debts, a 50/30/20 budget allows about $1,400, which is the comfortable figure.",
  },
  {
    q: "What is the 40× rent rule?",
    a: "Many landlords ask that your yearly gross income be at least 40 times the monthly rent. For $2,000 rent, that is $80,000 a year.",
  },
  {
    q: "What is the 30% rule for rent?",
    a: "A guideline that rent should be no more than 30% of gross monthly income. HUD counts households paying more as cost-burdened.",
  },
  {
    q: "Is the 30% rule based on gross or net income?",
    a: "Gross income, before tax. That is why the calculator also checks a 50/30/20 budget built on take-home pay.",
  },
  {
    q: "How much do I need to earn for $1,500 rent?",
    a: "$60,000 a year under both the 30% rule and the 40× rule.",
  },
  {
    q: "What is the 50/30/20 rule?",
    a: "A budget that puts 50% of take-home pay toward needs, including rent, 30% toward wants and 20% toward savings and extra debt payments.",
  },
  {
    q: "Do landlords count my partner's or roommate's income?",
    a: "Usually, if they are on the lease. Some landlords want each tenant to meet part of the requirement, so ask before applying.",
  },
  {
    q: "What if I do not earn 40 times the rent?",
    a: "Ask about a guarantor or co-signer, a larger deposit where allowed, or showing savings or a job offer. Smaller landlords may be more flexible.",
  },
  {
    q: "Do debts affect how much rent I can afford?",
    a: "Yes. The calculator keeps rent plus debt payments within 36% of gross income. With $600 of debts on $60,000 a year, that leaves $1,200 for rent.",
  },
  {
    q: "How is take-home pay estimated?",
    a: "From 2026 federal income tax, Social Security, Medicare and your state's income tax, assuming no pre-tax deductions. You can enter the figure from your pay stub instead.",
  },
  {
    q: "What costs should I count besides rent?",
    a: "Utilities, renters insurance, parking, pet fees and commuting. Put them in other essentials so the budget reflects them.",
  },
  {
    q: "How much cash do I need to move in?",
    a: "Often first month's rent, a security deposit, application fees and moving costs: plan for two to three months' rent.",
  },
  {
    q: "How much rent can I afford on $100,000 a year?",
    a: "$2,500 a month under the 30% and 40× rules. Single in Texas, with no debts and other essentials at 20% of take-home pay, a 50/30/20 budget allows about $1,979.",
  },
  {
    q: "Should I budget on my income if it varies?",
    a: "Use a cautious figure, such as your lowest three months of the past year times four, and set aside tax first if you are self-employed.",
  },
];

export default async function RentPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/us/taxes/paycheck-calculator", "/us/housing/mortgage-affordability", "/us/housing/mortgage-calculator", "/us/loans/debt-to-income-ratio", "/us/savings/savings-goal-calculator"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Three rules and your real budget"
      title="Rent Affordability Calculator"
      lead="Find how much rent you can afford under the 30% rule, the 40× rule and a 50/30/20 budget, and check the income a particular rent needs."
      points={["30% and 40× rules", "Take-home pay by state", "50/30/20 budget", "Income needed for a rent"]}
      guide={<RentGuide />}
      faqs={FAQS}
      related={related}
      note="A guide for planning. Landlords set their own income and credit rules."
    >
      <RentStudio query={query} />
    </FlagshipPage>
  );
}
