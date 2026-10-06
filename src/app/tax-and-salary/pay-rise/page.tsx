import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import PayRiseStudio from "./PayRiseStudio";
import PayRiseGuide from "./PayRiseGuide";

export const metadata: Metadata = {
  title: "Pay Rise Calculator UK 2026/27: What Is My Pay Rise Worth After Tax?",
  description:
    "See what a pay rise adds to your take-home pay after Income Tax, National Insurance, student loan and the Child Benefit charge, and whether it beats inflation.",
  alternates: { canonical: "/tax-and-salary/pay-rise" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/tax-and-salary", label: "Tax & Salary" },
  { href: "/tax-and-salary/pay-rise", label: "Pay Rise Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much of a pay rise do I keep?", a: "72p in every £1 as a basic-rate taxpayer, 58p as a higher-rate taxpayer and 38p between £100,000 and £125,140, before any student loan." },
  { q: "What is a 5% pay rise on £30,000 after tax?", a: "£1,500 more salary adds about £1,080 a year to your take-home, or £90 a month, in England, Wales or Northern Ireland." },
  { q: "Why do I keep less of a pay rise than my average tax rate suggests?", a: "Because the rise is taxed at your marginal rate, the rate on your top slice of income, which is higher than your average rate." },
  { q: "What pay rise do I need to beat inflation?", a: "Slightly more than the inflation rate, because tax takes a bigger share of the rise. On £28,000 with 3.1% inflation, about 3.6%." },
  { q: "Can a pay rise leave me worse off?", a: "Rarely in cash, but it can after the Child Benefit charge or loss of childcare support above £100,000, and in real terms if it is below inflation." },
  { q: "Does a pay rise affect Child Benefit?", a: "If it takes the higher earner over £60,000, 1% of Child Benefit is taken back for every £200 above, until £80,000." },
  { q: "How does a student loan affect a pay rise?", a: "Above your plan's threshold, 9% of the rise goes to the loan (6% for a postgraduate loan)." },
  { q: "Is a pay rise taxed more in Scotland?", a: "From £43,663 Scottish taxpayers pay 42%, so rises between £43,663 and £50,270 keep 50p in the pound rather than 72p." },
  { q: "Why was my backdated pay rise taxed so heavily?", a: "PAYE treats a lump sum as if it were paid every month. Overpaid tax is usually corrected over the rest of the tax year." },
  { q: "Should I put my pay rise into my pension?", a: "Salary sacrifice saves tax and NI, so each £1 in the pension costs 72p at basic rate and 58p at higher rate. It suits people near a threshold." },
  { q: "Do I get to keep a pay rise if I am on Universal Credit?", a: "Part of it. Universal Credit falls by 55p for each extra pound of take-home above any work allowance." },
  { q: "Is a pay rise worth more than a bigger pension contribution?", a: "An employer pension contribution has no tax or NI on it, so £1 into your pension from your employer is worth more than £1 of salary." },
];

export default async function PayRisePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/tax-and-salary/salary-calculator", "/tax-and-salary/reverse-take-home", "/tax-and-salary/tax-bracket-checker", "/tax-and-salary/salary-sacrifice", "/benefits/high-income-child-benefit", "/investing/inflation-impact"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026/27 tax year"
      title="Pay Rise Calculator"
      lead="See how much of a pay rise reaches your bank account after tax, NI and student loan, and whether it keeps you ahead of inflation."
      points={["Take-home before and after", "Marginal rate", "Real terms", "Free and private"]}
      guide={<PayRiseGuide />}
      faqs={FAQS}
      related={related}
      note="Estimates for 2026/27 with a standard tax code. Your payslip may differ in the month the rise starts."
    >
      <PayRiseStudio query={query} />
    </FlagshipPage>
  );
}
