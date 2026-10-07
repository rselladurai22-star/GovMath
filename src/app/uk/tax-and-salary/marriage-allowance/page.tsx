import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import MarriageStudio from "./MarriageStudio";
import { ogFor } from "@/gm/og";
import MarriageGuide from "./MarriageGuide";

export const metadata: Metadata = {
  title: "Marriage Allowance Calculator 2026/27",
  description:
    "Free Marriage Allowance calculator for 2026/27. Check if you can transfer £1,260 of allowance to save up to £252 a year, and backdate four years.",
  alternates: { canonical: "/uk/tax-and-salary/marriage-allowance" },
  openGraph: ogFor("/uk/tax-and-salary/marriage-allowance"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/tax-and-salary", label: "Tax & Salary" },
  { href: "/uk/tax-and-salary/marriage-allowance", label: "Marriage Allowance Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much is Marriage Allowance worth?", a: "Up to £252 a year in 2026/27. With four earlier years backdated, a new claim can be worth up to £1,260." },
  { q: "Who can claim Marriage Allowance?", a: "Married couples and civil partners where one earns £12,570 or less and the other is a basic-rate taxpayer." },
  { q: "Can unmarried couples claim?", a: "No. You must be married or in a civil partnership." },
  { q: "How far back can I claim Marriage Allowance?", a: "To 2022/23, if you were eligible. Claims for 2022/23 must be made by 5 April 2027." },
  { q: "Who should apply?", a: "The lower earner applies on GOV.UK, transferring part of their allowance to their partner." },
  { q: "Can I claim if I am a higher-rate taxpayer?", a: "No. The receiving partner must pay tax at the basic rate, or no more than the intermediate rate in Scotland." },
  { q: "Does Marriage Allowance renew automatically?", a: "Yes, each year, until you cancel it or your circumstances change." },
  { q: "What if the lower earner has income over £11,310?", a: "They pay 20% tax on the income above £11,310, which reduces the gain. At £12,570 the gain is nothing." },
  { q: "Can pensioners claim Marriage Allowance?", a: "Yes, if both were born on or after 6 April 1935. Older couples may get Married Couple's Allowance instead." },
  { q: "Does Marriage Allowance work in Scotland?", a: "Yes. The higher earner can have income up to £43,662, and the saving is still £252." },
  { q: "What ID do I need to apply for Marriage Allowance?", a: "Both National Insurance numbers, and ID to sign in to your Government Gateway account, such as a P60, payslip or passport details." },
  { q: "Does Marriage Allowance affect Universal Credit?", a: "Slightly. Your take-home rises, so Universal Credit may fall by 55p for each pound of tax saved." },
  { q: "Can I claim Marriage Allowance if my partner lives abroad?", a: "Yes, as long as both of you meet the income rules and the recipient gets a UK Personal Allowance." },
  { q: "Can I cancel Marriage Allowance?", a: "Yes. The lower earner can cancel online or by phone; it usually stops at the end of the tax year." },
  { q: "Does Marriage Allowance affect my State Pension?", a: "No. It only changes Income Tax, not your National Insurance record or State Pension." },
];

export default async function MarriageAllowancePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/tax-and-salary/salary-calculator", "/uk/tax-and-salary/tax-code-decoder", "/uk/tax-and-salary/tax-bracket-checker", "/uk/investing/personal-savings-allowance", "/uk/benefits/benefits-checker", "/uk/tax-and-salary/scottish-tax"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026/27 tax year"
      title="Marriage Allowance Calculator"
      lead="Check whether you can transfer part of your Personal Allowance to your partner, what it saves, and how much you can backdate."
      points={["£252 a year", "Backdating to 2022/23", "Scotland included", "Free and private"]}
      guide={<MarriageGuide />}
      faqs={FAQS}
      related={related}
      note="An estimate for 2026/27. HMRC decides each claim and checks each backdated year separately."
    >
      <MarriageStudio query={query} />
    </FlagshipPage>
  );
}
