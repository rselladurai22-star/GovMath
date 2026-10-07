import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import IR35Studio from "./IR35Studio";
import { ogFor } from "@/gm/og";
import IR35Guide from "./IR35Guide";

export const metadata: Metadata = {
  title: "IR35 Calculator UK 2026/27: Inside vs Outside",
  description:
    "Free IR35 calculator for 2026/27. Compare take-home pay inside and outside IR35, via an umbrella or your own limited company, at any day rate.",
  alternates: { canonical: "/tax-and-salary/ir35-take-home" },
  openGraph: ogFor("/tax-and-salary/ir35-take-home"),
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
  { q: "Do I get employment rights inside IR35?", a: "Not from the client. IR35 is a tax rule. If you use an umbrella company, you are its employee and get statutory rights such as holiday pay and Statutory Sick Pay from it." },
  { q: "Can I claim expenses inside IR35?", a: "Only limited expenses, broadly the same as an employee could claim. Travel to a single long-term workplace is not usually allowed." },
  { q: "Should I close my company if all my work is inside IR35?", a: "Many contractors do, to save accountancy costs. If you expect outside work in future, you might keep it dormant. Speak to an accountant before deciding." },
  { q: "Is the calculator advice on my status?", a: "No. It compares the money under each route. Your status depends on the facts of each contract." },
  { q: "What happens if HMRC disagrees with my client’s decision?", a: "If a client wrongly treats a contract as outside IR35, HMRC normally pursues the fee-payer for the unpaid tax and National Insurance. Since April 2024, tax you have already paid on that income through your company can be set against what is owed." },
  { q: "Do I need to register for VAT?", a: "Outside IR35, your company must register for VAT if its taxable turnover goes over £90,000 in a rolling 12 months. VAT you charge is passed to HMRC, so it is not part of your take-home. Inside IR35 through an umbrella, VAT is handled by the umbrella." },
  { q: "Is it better to leave profit in my company?", a: "Sometimes. Profit kept in the company has paid Corporation Tax but not dividend tax, so leaving some there can reduce your tax bill if your personal income would otherwise go above £50,270 or £100,000. You can then take it in a later year when your income is lower, or pay it into your pension." },
  { q: "How many days should I assume I will bill?", a: "Many contractors plan on 200 to 220 days a year, allowing for holidays, bank holidays, sickness and gaps between contracts. Be cautious in your first year, when gaps are more likely." },
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
