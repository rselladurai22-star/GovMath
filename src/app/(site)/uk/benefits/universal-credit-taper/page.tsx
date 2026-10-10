import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import TaperStudio from "./TaperStudio";
import { ogFor } from "@/gm/og";
import TaperGuide from "./TaperGuide";

export const metadata: Metadata = {
  title: "UC Taper Rate Calculator 2026/27: 55p per £1",
  description:
    "Free Universal Credit taper rate calculator for 2026/27. UC falls by 55p for every £1 you earn above the work allowance: see what you keep from extra hours.",
  alternates: { canonical: "/uk/benefits/universal-credit-taper" },
  openGraph: ogFor("/uk/benefits/universal-credit-taper"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/benefits", label: "Family & Benefits" },
  { href: "/uk/benefits/universal-credit-taper", label: "Universal Credit Taper" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What is the Universal Credit taper rate?", a: "55%. Your award falls by 55p for every £1 of take-home pay above your work allowance." },
  { q: "What is the work allowance in 2026/27?", a: "£427 a month if your award includes help with rent, or £710 if it does not. Only households with children or a health condition get one." },
  { q: "How much of a pay rise do I keep on Universal Credit?", a: "Below the tax threshold you keep 45p of each extra pound. As a basic-rate taxpayer you keep about 32p, after 20% tax, 8% National Insurance and the 55% taper." },
  { q: "Do pension contributions increase Universal Credit?", a: "Yes. Universal Credit counts pay after pension contributions, so £100 into a pension costs a basic-rate taxpayer on the taper only about £32.40." },
  { q: "Is it ever worse to work more on Universal Credit?", a: "Not on Universal Credit alone. The taper is 55%, so you always keep part of an extra pound. Extra costs such as childcare or travel can still eat into the gain." },
  { q: "Does the taper use gross or net pay?", a: "Net. Universal Credit counts pay after Income Tax, National Insurance and pension contributions." },
  { q: "Do I get a work allowance with no children?", a: "Only if you have limited capability for work. Otherwise the taper applies from the first pound." },
  { q: "Does Carer's Allowance count as earnings?", a: "No. It is unearned income and is taken off pound for pound, not tapered." },
  { q: "Is overtime treated differently?", a: "No. Overtime, bonuses and commission are earnings and are tapered in the month they are paid." },
  { q: "Does the taper apply to Statutory Sick Pay or Maternity Pay?", a: "Yes. Statutory Sick Pay and Statutory Maternity Pay are paid through payroll and count as earnings, so they are tapered like wages." },
  { q: "Can I choose to be paid less to keep my Universal Credit?", a: "You can, but you will be worse off. Each pound of pay given up costs you at least 32p, and usually 45p or more, of household income. Paying more into a pension is the one way to swap pay for something of value to you." },
];

export default async function UcTaperPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/benefits/universal-credit", "/uk/benefits/benefit-cap", "/uk/benefits/tax-free-childcare", "/uk/tax-and-salary/salary-calculator", "/uk/benefits/carers-earnings", "/uk/benefits/local-housing-allowance"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026/27 rates"
      title="Universal Credit Taper Calculator"
      lead="Find out how much better off extra hours or a pay rise really make you, after tax, National Insurance and the 55% Universal Credit taper."
      points={["Real take-home pay", "Hours ladder", "Pension effect", "Free and private"]}
      guide={<TaperGuide />}
      faqs={FAQS}
      related={related}
      note="2026/27 rates. Not financial advice."
    >
      <TaperStudio query={query} />
    </FlagshipPage>
  );
}
