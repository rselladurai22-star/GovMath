import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import BudgetStudio from "./BudgetStudio";
import { ogFor } from "@/gm/og";
import BudgetGuide from "./BudgetGuide";

export const metadata: Metadata = {
  title: "Student Budget Calculator UK 2026/27",
  description:
    "Free student budget calculator for 2026/27. Set your loan and income against rent, food, travel and other costs to see if your money will last the term.",
  alternates: { canonical: "/students/student-budget" },
  openGraph: ogFor("/students/student-budget"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/students", label: "Students" },
  { href: "/students/student-budget", label: "Student Budget Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much should a student budget each week?", a: "It depends on your income and rent. Take rent off your yearly income, then divide what is left by the weeks it must last, usually 39." },
  { q: "Will my maintenance loan cover rent?", a: "Often only just. At £170 a week for 44 weeks, rent is £7,480, which is most of the £10,830 maximum loan away from home." },
  { q: "How many hours can I work as a student?", a: "Many universities suggest no more than 15 hours a week in term time. International students on a visa usually have a 20-hour limit." },
  { q: "When are student loans paid?", a: "In England, Wales and Northern Ireland, in three instalments at the start of each term. SAAS pays monthly." },
  { q: "Do students pay council tax?", a: "Not if everyone in the home is a full-time student. Send your council a student certificate." },
  { q: "Does a part-time job reduce my student loan?", a: "No. Your loan depends on household income, not your own earnings while you study." },
  { q: "Do students pay tax on part-time jobs?", a: "Only on income above the £12,570 Personal Allowance, which most students do not reach." },
  { q: "What if I run out of money?", a: "Talk to your university's student money service. Most have hardship funds and short-term loans." },
  { q: "How much should I spend on food?", a: "Many students budget around £40 to £60 a week. Cooking with housemates and buying in bulk can bring it down." },
  { q: "Should I use my overdraft?", a: "An interest-free student overdraft is a useful safety net, but it has to be paid back after you graduate." },
  { q: "How much do students spend a month?", a: "It varies widely by city and rent, but rent plus living costs commonly come to £900 to £1,300 a month during term." },
  { q: "Can I get help if my parents will not contribute?", a: "If you are estranged from your parents you can be assessed as independent and get the full loan. Your university may also help." },
  { q: "Is my maintenance loan paid weekly?", a: "No. It is paid in three instalments a year in England, Wales and Northern Ireland, so you need to budget each payment until the next." },
  { q: "How much should I keep as an emergency fund at university?", a: "A few hundred pounds you do not touch helps with surprises like a broken laptop or an unexpected trip home." },
  { q: "Can I get a part-time job in my first term?", a: "Many students wait until they have settled in. Campus jobs often fit around lectures best." },
];

export default async function StudentBudgetPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/students/maintenance-loan", "/students/degree-cost", "/students/student-council-tax", "/students/saas-funding", "/students/welsh-student-finance", "/tax-and-salary/minimum-wage"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026/27"
      title="Student Budget Calculator"
      lead="Add up your loan, grants, family help and job against rent and living costs, and see what you have to spend each week."
      points={["Loan, grants and job", "Rent planned first", "Weekly budget", "Free and private"]}
      guide={<BudgetGuide />}
      faqs={FAQS}
      related={related}
      note="A planning tool. Your actual loan, rent and costs will differ; update the figures as the year goes on."
    >
      <BudgetStudio query={query} />
    </FlagshipPage>
  );
}
