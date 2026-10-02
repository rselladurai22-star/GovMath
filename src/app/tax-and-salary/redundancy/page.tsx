import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import RedundancyStudio from "./RedundancyStudio";
import RedundancyGuide from "./RedundancyGuide";

export const metadata: Metadata = {
  title: "Redundancy Pay Calculator (UK, 2026/27)",
  description:
    "Work out statutory redundancy pay with the April 2026 £751 weekly cap (£783 in NI), plus notice pay, holiday pay, enhanced payments and the £30,000 tax-free limit.",
  alternates: { canonical: "/tax-and-salary/redundancy" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/tax-and-salary", label: "Tax & Salary" },
  { href: "/tax-and-salary/redundancy", label: "Redundancy Pay" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How is statutory redundancy pay calculated?", a: "You get half a week's pay for each full year under age 22, one week for each full year aged 22 to 40, and one and a half weeks for each full year aged 41 or over. Up to 20 years count, and weekly pay is capped at £751 (£783 in Northern Ireland) from April 2026." },
  { q: "What is the most statutory redundancy pay I can get?", a: "£22,530 in England, Scotland and Wales for redundancies from 6 April 2026: 30 weeks at the £751 cap." },
  { q: "Is redundancy pay taxed?", a: "The first £30,000 of redundancy pay is tax-free. Anything above that is subject to Income Tax but not employee National Insurance. Notice pay and holiday pay are always taxed like salary." },
  { q: "How long do I need to work to get redundancy pay?", a: "At least 2 full years of continuous employment with the same employer, as an employee." },
  { q: "Is notice pay part of redundancy pay?", a: "No. Notice is separate. You are entitled to your contractual notice or the statutory minimum (one week per full year of service, up to 12 weeks), whichever is longer." },
];

export default async function RedundancyPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/tax-and-salary/salary-calculator", "/tax-and-salary/p45-p60-explainer", "/tax-and-salary/emergency-tax", "/tax-and-salary/holiday-entitlement", "/benefits/universal-credit", "/investing/pension-tax-relief"].includes(c.href),
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
