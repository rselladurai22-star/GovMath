import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import SSPStudio from "./SSPStudio";
import { ogFor } from "@/gm/og";
import SSPGuide from "./SSPGuide";

export const metadata: Metadata = {
  title: "Statutory Sick Pay Calculator UK 2026/27",
  description:
    "Free SSP calculator for 2026/27. Work out Statutory Sick Pay from day one, the weekly rate, linked periods and how much you get for your days off sick.",
  alternates: { canonical: "/uk/tax-and-salary/statutory-sick-pay" },
  openGraph: ogFor("/uk/tax-and-salary/statutory-sick-pay"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/tax-and-salary", label: "Tax & Salary" },
  { href: "/uk/tax-and-salary/statutory-sick-pay", label: "Statutory Sick Pay" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much is Statutory Sick Pay in 2026/27?", a: "The lower of £123.25 a week or 80% of your average weekly earnings, from 6 April 2026. For a five-day week that is up to £24.65 a day." },
  { q: "Is SSP paid from the first day?", a: "Yes. Since 6 April 2026 there are no unpaid waiting days. SSP is paid from the first day you are off sick." },
  { q: "Do I need to earn a minimum amount to get SSP?", a: "No. The Lower Earnings Limit test was removed in April 2026. Low earners get 80% of their average weekly earnings instead." },
  { q: "How long is SSP paid for?", a: "Up to 28 weeks in a period of sickness. Spells less than 8 weeks apart are linked and share the same 28 weeks." },
  { q: "Is SSP taxed?", a: "Yes. SSP is paid through payroll and Income Tax and National Insurance are deducted as normal." },
  { q: "Do I get SSP for one day off sick?", a: "Yes. Since 6 April 2026 there are no waiting days, so SSP is paid from the first qualifying day." },
  { q: "I earn less than £125 a week. Can I get SSP now?", a: "Yes. The earnings test was removed. You get 80% of your average weekly earnings." },
  { q: "Can I get SSP from two jobs?", a: "Yes, if you are too ill to do either job, each employer pays SSP separately." },
  { q: "Does holiday build up while I am off sick?", a: "Yes. Statutory holiday continues to build up during sick leave, and you can carry over holiday you could not take." },
  { q: "Does SSP count towards my State Pension?", a: "Yes. SSP is treated as earnings, so it counts towards your National Insurance record in the same way as wages." },
  { q: "Can my employer pay less than SSP?", a: "No. SSP is the legal minimum. Your contract can only give you more, not less." },
  { q: "Is SSP paid if I am sick on a bank holiday?", a: "Only if the bank holiday is one of your qualifying days, meaning a day you would normally have worked." },
];

export default async function SSPPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/uk/tax-and-salary/salary-calculator", "/uk/tax-and-salary/holiday-entitlement", "/uk/benefits/universal-credit", "/uk/benefits/maternity-pay", "/uk/tax-and-salary/minimum-wage", "/uk/benefits/pip-points"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="April 2026 rules"
      title="Statutory Sick Pay Calculator"
      lead="Your sick pay under the April 2026 rules, from the first day off, with daily rates and company sick pay."
      points={["Paid from day one", "80% rule for low earners", "Company sick pay compared", "Free and private"]}
      guide={<SSPGuide />}
      faqs={FAQS}
      related={related}
      note="Statutory minimum from 6 April 2026. Your employer may pay more under your contract. Not legal advice."
    >
      <SSPStudio query={query} />
    </FlagshipPage>
  );
}
