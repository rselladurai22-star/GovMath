import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import SavingsStudio from "./SavingsStudio";
import SavingsGuide from "./SavingsGuide";

export const metadata: Metadata = {
  title: "Savings Interest Calculator UK: Fixed vs Easy Access After Tax (2026/27)",
  description:
    "Compare a fixed-rate bond with an easy-access account after tax: interest earned, the Personal Savings Allowance, interest paid at maturity and inflation, for 2026/27.",
  alternates: { canonical: "/investing/savings-interest" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/investing", label: "Pensions & Investing" },
  { href: "/investing/savings-interest", label: "Savings Interest Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "Is a fixed-rate savings account worth it?", a: "If you will not need the money and the fixed rate is clearly higher than easy access. On £20,000 over 2 years, 4.2% fixed beats 3.5% easy access by about £291." },
  { q: "How much interest can I earn tax-free?", a: "£1,000 a year for basic-rate taxpayers and £500 for higher-rate taxpayers, plus up to £5,000 more at the starting rate if your other income is low." },
  { q: "Is interest paid at maturity taxed differently?", a: "It is taxed in the year it is paid, so several years of interest can fall into one tax year and use up your allowance." },
  { q: "What does AER mean?", a: "Annual equivalent rate: what you would earn in a year with interest added to the balance. Use it to compare accounts." },
  { q: "Can I take money out of a fixed-rate account?", a: "Usually not, or only with a penalty of some months' interest. Keep an emergency fund in easy access." },
  { q: "Should I use a cash ISA instead?", a: "If your interest is above your tax-free allowances, or will be, a cash ISA keeps it all tax-free up to £20,000 a year." },
  { q: "How much of my savings is protected?", a: "Up to £120,000 per person per bank or building society group, under the Financial Services Compensation Scheme." },
  { q: "Will savings tax go up?", a: "Yes. From April 2027 tax on savings interest rises to 22%, 42% and 47%." },
  { q: "What is a savings ladder?", a: "Splitting savings across fixes of different lengths, so one matures each year, giving regular access and spreading interest across tax years." },
  { q: "Do banks take tax off interest?", a: "No. Interest is paid gross. HMRC collects any tax due through your tax code or Self Assessment." },
  { q: "What is a notice account?", a: "A savings account where you give 30 to 120 days' notice to withdraw, usually in return for a higher rate than easy access." },
  { q: "How much should I keep in easy access?", a: "A common guide is three to six months of essential spending as an emergency fund." },
];

export default async function SavingsInterestPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/investing/personal-savings-allowance", "/investing/compound-interest", "/investing/premium-bonds", "/investing/isa-vs-gia", "/investing/inflation-impact", "/investing/junior-isa"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026/27 tax rules"
      title="Savings Interest Calculator"
      lead="Compare a fixed-rate bond with an easy-access account after tax, and see whether locking your money away pays."
      points={["Fixed vs easy access", "After tax", "Interest at maturity", "Free and private"]}
      guide={<SavingsGuide />}
      faqs={FAQS}
      related={related}
      note="An illustration on stated rates. Easy-access rates change, and accounts compound in different ways."
    >
      <SavingsStudio query={query} />
    </FlagshipPage>
  );
}
