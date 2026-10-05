import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import IR35Studio from "./IR35Studio";
import IR35Guide from "./IR35Guide";

export const metadata: Metadata = {
  title: "IR35 Calculator: Inside vs Outside Take-Home (2026/27)",
  description:
    "Compare contractor take-home inside IR35 through an umbrella company and outside IR35 through your own limited company, with Corporation Tax, dividends and the equivalent permanent salary. 2026/27.",
  alternates: { canonical: "/tax-and-salary/ir35-take-home" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/tax-and-salary", label: "Tax & Salary" },
  { href: "/tax-and-salary/ir35-take-home", label: "IR35 Take-Home" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much less do I take home inside IR35?", a: "On £500 a day for 220 days in 2026/27, about £65,500 inside IR35 through an umbrella company against about £69,000 outside IR35 through a limited company, before accountancy and insurance costs beyond those you enter." },
  { q: "Who decides if my contract is inside IR35?", a: "For medium and large clients, and all public sector clients, the client decides and gives you a Status Determination Statement. For small private clients, your own company decides." },
  { q: "Why does an umbrella company take employer NI from my rate?", a: "Inside IR35 the umbrella is your employer, and it funds employer NI (15% above £5,000) and the 0.5% Apprenticeship Levy from the contract income before paying your salary." },
  { q: "What salary should a limited company director take?", a: "A salary of £12,570 uses the tax-free allowance and counts towards the State Pension; employer NI is due on the part above £5,000 for a sole-director company. The rest is usually taken as dividends." },
  { q: "Can I challenge an inside IR35 decision?", a: "Yes. Write to the client explaining why you disagree. They must respond within 45 days, confirming or changing their decision with reasons." },
];

export default async function IR35Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/business/dividend-vs-salary", "/business/corporation-tax", "/investing/dividend-tax", "/tax-and-salary/salary-calculator", "/tax-and-salary/hourly-to-salary", "/business/sole-trader-tax"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Updated for 2026/27"
      title="IR35 Take-Home Calculator"
      lead="Compare your take-home inside and outside IR35, and the permanent salary that would match it."
      points={["Umbrella and limited company", "Corporation Tax and dividends", "Equivalent salary", "Free and private"]}
      guide={<IR35Guide />}
      faqs={FAQS}
      related={related}
      note="Illustrative 2026/27 figures. Outside IR35 assumes all profit is paid out as dividends in the year. Not tax advice: speak to an accountant about your contracts."
    >
      <IR35Studio query={query} />
    </FlagshipPage>
  );
}
