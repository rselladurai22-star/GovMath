import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import CarersStudio from "./CarersStudio";
import { ogFor } from "@/gm/og";
import CarersGuide from "./CarersGuide";

export const metadata: Metadata = {
  title: "Carer's Allowance Earnings Limit Calculator",
  description:
    "Free Carer's Allowance earnings calculator for 2026/27. Check your earnings against the weekly limit after allowable deductions, and avoid an overpayment.",
  alternates: { canonical: "/uk/benefits/carers-earnings" },
  openGraph: ogFor("/uk/benefits/carers-earnings"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/benefits", label: "Family & Benefits" },
  { href: "/uk/benefits/carers-earnings", label: "Carer's Allowance Earnings" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What is the Carer's Allowance earnings limit in 2026/27?", a: "£204 a week after Income Tax, National Insurance, half of your pension contributions and some care costs." },
  { q: "How much is Carer's Allowance in 2026/27?", a: "£86.45 a week, or £4,495.40 a year." },
  { q: "How many hours can I work on Carer's Allowance?", a: "About 16 hours a week at the £12.71 National Living Wage. At higher pay, fewer hours." },
  { q: "What happens if I earn over the limit?", a: "You lose the whole week's Carer's Allowance. There is no taper, so even a small amount over costs £86.45." },
  { q: "Is Carer's Allowance taxable?", a: "Yes. It counts as taxable income, though most carers' total income is under the Personal Allowance." },
  { q: "Can two people get it for caring for the same person?", a: "No. Only one person can get Carer's Allowance for each person cared for." },
  { q: "Can I care for two people to make up the 35 hours?", a: "No. The 35 hours must be for one person." },
  { q: "What happens if the person I care for goes into hospital?", a: "Carer's Allowance can continue for up to 12 weeks in any 26 while either of you is in hospital, but only while their disability benefit continues, and that usually stops after 28 days." },
  { q: "Does my partner's income matter?", a: "No. Only your own earnings count towards the limit." },
  { q: "Do I need to be related to the person I care for?", a: "No. You can care for a friend or neighbour, and you do not need to live with them." },
  { q: "Does holiday pay count as earnings?", a: "Yes. Holiday pay is earnings in the week it is paid, so a large payout when you leave a job can take you over the limit for that week." },
  { q: "Can I get Carer's Allowance if I am retired?", a: "You can claim, but if your State Pension is £86.45 a week or more you get underlying entitlement rather than payments." },
];

export default async function CarersPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/benefits/attendance-allowance", "/uk/benefits/pip-points", "/uk/benefits/universal-credit", "/uk/benefits/pension-credit", "/uk/tax-and-salary/minimum-wage", "/uk/benefits/benefit-cap"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026/27 rates"
      title="Carer's Allowance Earnings Calculator"
      lead="Check whether your pay keeps you within the £204 earnings limit, and how many hours you can work without losing Carer's Allowance."
      points={["Real deductions", "Hours limit", "Pension and care costs", "Free and private"]}
      guide={<CarersGuide />}
      faqs={FAQS}
      related={related}
      note="2026/27 rates. Not financial advice."
    >
      <CarersStudio query={query} />
    </FlagshipPage>
  );
}
