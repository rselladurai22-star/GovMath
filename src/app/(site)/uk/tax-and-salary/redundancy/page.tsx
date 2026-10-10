import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import RedundancyStudio from "./RedundancyStudio";
import { ogFor } from "@/gm/og";
import RedundancyGuide from "./RedundancyGuide";

export const metadata: Metadata = {
  title: "Redundancy Pay Calculator UK 2026/27",
  description:
    "Free statutory redundancy pay calculator for 2026/27. See your entitlement by age and service, the weekly pay cap, and the tax on any pay over £30,000.",
  alternates: { canonical: "/uk/tax-and-salary/redundancy" },
  openGraph: ogFor("/uk/tax-and-salary/redundancy"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/tax-and-salary", label: "Tax & Salary" },
  { href: "/uk/tax-and-salary/redundancy", label: "Redundancy Pay" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How is statutory redundancy pay calculated?", a: "You get half a week's pay for each full year under age 22, one week for each full year aged 22 to 40, and one and a half weeks for each full year aged 41 or over. Up to 20 years count, and weekly pay is capped at £751 (£783 in Northern Ireland) from April 2026." },
  { q: "What is the most statutory redundancy pay I can get?", a: "£22,530 in England, Scotland and Wales for redundancies from 6 April 2026: 30 weeks at the £751 cap." },
  { q: "Is redundancy pay taxed?", a: "The first £30,000 of redundancy pay is tax-free. Anything above that is subject to Income Tax but not employee National Insurance. Notice pay and holiday pay are always taxed like salary." },
  { q: "How long do I need to work to get redundancy pay?", a: "At least 2 full years of continuous employment with the same employer, as an employee." },
  { q: "Is notice pay part of redundancy pay?", a: "No. Notice is separate. You are entitled to your contractual notice or the statutory minimum (one week per full year of service, up to 12 weeks), whichever is longer." },
  { q: "Do part-time workers get redundancy pay?", a: "Yes, on the same rules. Their weekly pay is their actual part-time pay." },
  { q: "Does voluntary redundancy pay the same?", a: "You are still entitled to at least statutory redundancy pay, and voluntary schemes are often enhanced." },
  { q: "Does redundancy pay affect my State Pension?", a: "No. Redundancy pay does not count as earnings for National Insurance, so it neither costs nor earns State Pension credits." },
  { q: "Can I be made redundant while on sick leave or maternity leave?", a: "Yes, if the redundancy is genuine and fair, but you must not be selected because of the leave, and extra protections apply during and after maternity leave." },
  { q: "Is redundancy pay paid with my final salary?", a: "Usually, yes. Your employer should pay it on or soon after your leaving date, and show it separately on your final payslip with any notice and holiday pay." },
  { q: "Can I be made redundant and then replaced?", a: "Not if the redundancy is genuine. If your job still exists and someone else is hired to do it, you may have a claim for unfair dismissal." },
];

export default async function RedundancyPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/uk/tax-and-salary/salary-calculator", "/uk/tax-and-salary/p45-p60-explainer", "/uk/tax-and-salary/emergency-tax", "/uk/tax-and-salary/holiday-entitlement", "/uk/benefits/universal-credit", "/uk/investing/pension-tax-relief"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Updated for 2026/27"
      title="Redundancy Pay Calculator"
      lead="Your statutory redundancy pay, notice and holiday pay, and which parts of your package are tax-free."
      points={["April 2026 cap", "Notice and holiday pay", "Tax-free £30,000", "Free and private"]}
      guide={<RedundancyGuide />}
      faqs={FAQS}
      related={related}
      note="Statutory figures for redundancies from 6 April 2026. Tax is an estimate. Not legal advice: speak to Acas or an adviser about your situation."
    >
      <RedundancyStudio query={query} />
    </FlagshipPage>
  );
}
