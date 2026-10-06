import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import SpaStudio from "./SpaStudio";
import SpaGuide from "./SpaGuide";

export const metadata: Metadata = {
  title: "State Pension Age Calculator UK",
  description:
    "Find your exact State Pension age and date from your date of birth, including the rises to 67 and 68, with your new State Pension amount and the effect of deferring.",
  alternates: { canonical: "/investing/state-pension-age" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/investing", label: "Pensions & Investing" },
  { href: "/investing/state-pension-age", label: "State Pension Age" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What is my State Pension age?", a: "It depends on your date of birth: 66 if born before 6 April 1960, rising to 67 for people born from 6 March 1961, and 68 for people born on or after 6 April 1978 under current law." },
  { q: "When does the State Pension age rise to 67?", a: "Between 2026 and 2028, for people born between 6 April 1960 and 5 March 1961, who get a State Pension age between 66 and 1 month and 66 and 11 months." },
  { q: "How much is the State Pension?", a: "The full new State Pension is £241.30 a week in 2026/27, for people with 35 qualifying years." },
  { q: "Can I defer my State Pension?", a: "Yes. The new State Pension rises by 1% for every 9 weeks you defer, just under 5.8% a year." },
  { q: "Is State Pension age different for men and women?", a: "No. It has been the same for both since November 2018." },
  { q: "Can I get my State Pension early?", a: "No. The State Pension cannot be paid before State Pension age, even in ill health. Benefits may help if you cannot work." },
  { q: "Does living abroad affect my State Pension?", a: "You can claim from abroad. In some countries outside the European Economic Area, it is frozen at the rate when you first claim." },
  { q: "Will I get a letter?", a: "The Department for Work and Pensions usually writes about two months before you reach State Pension age, explaining how to claim. If nothing arrives three weeks before, contact the Pension Service." },
  { q: "Is the State Pension taxed?", a: "Yes, it is taxable income, but no tax is taken off it. Any tax due is usually collected through the tax code on another pension or your wages, or through Self Assessment." },
  { q: "Do I need to stop work to claim?", a: "No. You can work full time and still get your State Pension in full. There is no earnings limit." },
];

export default async function SpaPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/investing/workplace-pension", "/investing/fire-calculator", "/investing/pension-tax-relief", "/benefits/pension-credit"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="State Pension"
      title="State Pension Age Calculator"
      lead="Find the exact date you reach State Pension age, and how much State Pension you could get."
      points={["Exact date", "Rises to 67 and 68", "Deferral", "Free and private"]}
      guide={<SpaGuide />}
      faqs={FAQS}
      related={related}
      note="Based on current law. State Pension age may change."
    >
      <SpaStudio query={query} />
    </FlagshipPage>
  );
}
