import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import DayRateStudio from "./DayRateStudio";
import DayRateGuide from "./DayRateGuide";

export const metadata: Metadata = {
  title: "Freelance Day Rate Calculator UK 2026/27: What Should I Charge?",
  description:
    "Work out the day rate you need as a sole trader for the take-home pay you want, after tax, National Insurance, costs, holidays and unpaid admin days.",
  alternates: { canonical: "/business/day-rate" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/business", label: "Freelance & Business" },
  { href: "/business/day-rate", label: "Freelancer Day Rate Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How do I work out my freelance day rate?", a: "Start from the take-home you need, add tax, National Insurance and business costs to get the turnover, then divide by the days you can actually bill." },
  { q: "How many days a year can a freelancer bill?", a: "Usually around 200, after holidays, bank holidays, sickness and unpaid admin and sales time." },
  { q: "What day rate gives £40,000 take-home?", a: "About £261 a day as a sole trader, with £3,000 of costs and 202 billable days, in 2026/27." },
  { q: "How much tax does a sole trader pay?", a: "Income Tax at the normal rates on profit, plus Class 4 National Insurance of 6% between £12,570 and £50,270 and 2% above." },
  { q: "Should my day rate include VAT?", a: "Quote it before VAT. If you are VAT registered, add 20% on top for clients." },
  { q: "Why is a day rate higher than a salary divided by 260?", a: "Freelancers get no paid holiday, sick pay or employer pension, and pay their own costs, and bill fewer days." },
  { q: "How much should I set aside for tax?", a: "Many freelancers save 25% to 30% of every invoice for Income Tax and National Insurance." },
  { q: "What hourly rate is a day rate?", a: "The calculator assumes a 7.5-hour day, so £261 a day is about £35 an hour." },
  { q: "Is it better to be a limited company?", a: "At higher profits a company can save some tax, but there is more admin. Compare with the dividend vs salary calculator." },
  { q: "When do I need to register for VAT?", a: "When your taxable turnover goes over £90,000 in any rolling 12 months." },
  { q: "How many billable days should I assume in my first year?", a: "Fewer than later: perhaps 120 to 160 days while you build up clients." },
  { q: "Do I need insurance as a freelancer?", a: "Many clients require professional indemnity insurance, and public liability cover is wise if you work on client sites." },
];

export default async function DayRatePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/business/sole-trader-tax", "/business/vat-threshold", "/business/payment-on-account", "/business/allowable-expenses", "/tax-and-salary/ir35-take-home", "/business/dividend-vs-salary"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026/27 tax year"
      title="Freelancer Day Rate Calculator"
      lead="Find the day rate you need to charge as a sole trader for the take-home pay you want, after tax, costs and the days you cannot bill."
      points={["Billable days", "Tax and NI", "VAT threshold check", "Free and private"]}
      guide={<DayRateGuide />}
      faqs={FAQS}
      related={related}
      note="Estimates for sole traders in 2026/27 with no other income. Market rates for your work may differ."
    >
      <DayRateStudio query={query} />
    </FlagshipPage>
  );
}
