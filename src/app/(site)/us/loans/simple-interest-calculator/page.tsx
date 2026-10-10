import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import SimpleInterestStudio from "./SimpleInterestStudio";
import SimpleInterestGuide from "./SimpleInterestGuide";

export const metadata: Metadata = {
  title: "Simple Interest Calculator With Dates",
  description:
    "Free simple interest calculator for 2026. Work out I = P × r × t for a loan or deposit between two dates, with actual/365, actual/360 or 30/360 day counts.",
  alternates: { canonical: "/us/loans/simple-interest-calculator" },
  openGraph: ogFor("/us/loans/simple-interest-calculator"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/loans", label: "Loans and debt" },
  { href: "/us/loans/simple-interest-calculator", label: "Simple Interest Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "What is the simple interest formula?",
    a: "I = P × r × t: interest equals the principal times the yearly rate (as a decimal) times the time in years. $10,000 at 5% for one year earns or costs $500.",
  },
  {
    q: "How do I calculate simple interest for a number of days?",
    a: "Divide the days by the length of the year the lender uses, 365 or 360. $25,000 at 8% for 90 days is $493.15 on actual/365 and $500.00 on actual/360.",
  },
  {
    q: "What is the difference between simple and compound interest?",
    a: "Simple interest is charged only on the original amount. Compound interest is also charged on interest already added. $10,000 at 5% earns $5,000 simple interest over 10 years, but $6,470.09 compounded monthly.",
  },
  {
    q: "What does actual/360 mean?",
    a: "Interest is charged for the actual number of days, but each day is 1/360 of the yearly rate. Over a full 365-day year that charges 365/360 of the stated rate, so 5% becomes about 5.07% in practice.",
  },
  {
    q: "What does 30/360 mean?",
    a: "Every month counts as 30 days and the year as 360 days, so each month's interest is the same. From January 15 to October 10, 2026 is 268 actual days but 265 days on 30/360.",
  },
  {
    q: "Are car loans simple interest?",
    a: "Most US auto loans are simple-interest loans: interest builds daily on the outstanding balance. On a $20,000 balance at 7%, that is $3.84 a day, so paying 10 days late adds about $38 of interest.",
  },
  {
    q: "Do savings accounts pay simple interest?",
    a: "Rarely. Most savings accounts and CDs compound daily or monthly and quote an APY. Some bonds, Treasury bills and certain CDs that pay interest out instead of adding it work like simple interest.",
  },
  {
    q: "How do I find the rate from the interest?",
    a: "Rearrange the formula: r = I ÷ (P × t). Earning $300 on $10,000 over 180 days is a simple rate of about 6.08% a year on actual/365.",
  },
  {
    q: "How do I find how long it takes to earn a sum?",
    a: "t = I ÷ (P × r). To earn $1,000 on $10,000 at 5% simple interest takes 2 years.",
  },
  {
    q: "Does the calculator count the start and end dates?",
    a: "It counts the days from the start date to the end date, including one of the two ends, as lenders do: January 1 to January 2 is one day of interest.",
  },
  {
    q: "Is simple interest better for borrowers?",
    a: "Yes, on the same rate and time, because interest never earns interest. For savers, compounding is better.",
  },
  {
    q: "Why does my loan statement show different interest each month?",
    a: "Because months have different numbers of days. A simple-interest loan charges daily, so a 31-day month costs more than a 28-day one, and the timing of your payment changes the interest too.",
  },
];

export default async function SimpleInterestPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    [
      "/us/savings/compound-interest-calculator",
      "/us/loans/loan-calculator",
      "/us/loans/auto-loan-calculator",
      "/us/loans/apr-calculator",
      "/us/savings/cd-calculator",
      "/everyday/percentage-calculator",
    ].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Interest without compounding"
      title="Simple Interest Calculator"
      lead="Work out simple interest on a loan or deposit for any number of days, months or years, or between two dates, with the day count your lender uses, and see how it compares with compound interest."
      points={["I = P × r × t", "Dates or a length of time", "Actual/365, actual/360, 30/360", "Simple vs compound"]}
      guide={<SimpleInterestGuide />}
      faqs={FAQS}
      related={related}
      note="An estimate for planning, not financial advice."
    >
      <SimpleInterestStudio query={query} />
    </FlagshipPage>
  );
}
