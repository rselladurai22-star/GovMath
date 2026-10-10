import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import EmergencyStudio from "./EmergencyStudio";
import EmergencyGuide from "./EmergencyGuide";

const PATH = "/us/savings/emergency-fund-calculator";

export const metadata: Metadata = {
  title: "Emergency Fund Calculator: How Much to Save",
  description:
    "Free emergency fund calculator for 2026. Size your fund from essential costs, get the months of cover for your situation and see how long it takes to build.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/savings", label: "Saving and retirement" },
  { href: PATH, label: "Emergency Fund Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "How much should I have in an emergency fund?",
    a: "Three to six months of essential costs is the usual guide: housing, food, utilities, transportation, insurance and minimum debt payments. With $4,000 a month of essentials, that is $12,000 to $24,000. Self-employed people and single-income families with children often aim for more.",
  },
  {
    q: "Should I count my whole budget or just essentials?",
    a: "Just essentials. In an emergency you would cut restaurants, subscriptions, travel and shopping. Counting only what you must keep paying gives a smaller, more reachable target that still keeps the lights on.",
  },
  {
    q: "Is 3 months or 6 months better?",
    a: "Three months suits a household with two steady incomes, where losing one job doesn't stop all pay. Six months suits a single earner. The median spell of unemployment was 11.5 weeks in September 2026, but the average was 24.8 weeks because some searches take much longer.",
  },
  {
    q: "How much emergency fund do I need if I'm self-employed?",
    a: "Usually more: nine to twelve months of essential costs. Self-employed people rarely qualify for unemployment benefits, often pay their own health insurance, and have income that swings from month to month. Keep money for quarterly estimated taxes separate from the fund.",
  },
  {
    q: "Where should I keep my emergency fund?",
    a: "In an FDIC-insured bank or NCUA-insured credit union savings account, ideally a high-yield one, kept separate from checking. Money market accounts and short CDs work for part of a large fund. Avoid stocks: they can fall just when you need the money.",
  },
  {
    q: "How much interest will my emergency fund earn?",
    a: "At 4% APY, a $24,000 fund earns about $960 a year. At the FDIC national average of 0.37% (September 21, 2026), it earns about $89. Interest is taxed as ordinary income in the year it is credited.",
  },
  {
    q: "Should I pay off debt or build an emergency fund first?",
    a: "Usually both, in order: pay every minimum, build a starter fund of about $1,000 or one month of costs, take any 401(k) match, then put extra toward high-interest debt before finishing the full fund. Without any cash, the next surprise goes back on the card.",
  },
  {
    q: "What is a starter emergency fund?",
    a: "A small first target, often $1,000 or one month of essentials, that covers common surprises such as a car repair or an insurance deductible. It stops those costs going on a credit card while you work toward the full fund.",
  },
  {
    q: "Is my emergency fund insured?",
    a: "At an FDIC-insured bank, deposits are protected up to $250,000 per depositor, per bank, per ownership category, and credit unions have the same cover from the NCUA. Money market funds and Treasury bills are not FDIC insured, though they are low risk.",
  },
  {
    q: "Can I count unemployment benefits?",
    a: "Cautiously. State benefits replace only part of your pay, up to a weekly maximum, for a limited number of weeks, and they can take time to start. The calculator lets you enter income you would still have, such as a partner's pay, so the fund covers only the shortfall.",
  },
  {
    q: "How long will it take to build my emergency fund?",
    a: "It depends on the gap and what you save. Going from $5,000 to $24,000 at 4% APY takes 65 months at $250 a month, 35 months at $500, 24 months at $750 and 19 months at $1,000.",
  },
  {
    q: "What counts as an emergency?",
    a: "Something unexpected, necessary and urgent: a job loss, medical bill, essential car or home repair, or emergency travel. Predictable costs such as holidays, annual insurance premiums or a planned purchase are better saved for in a separate fund.",
  },
];

export default async function EmergencyPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/us/savings/high-yield-savings-calculator", "/us/savings/savings-goal-calculator", "/us/savings/cd-calculator", "/us/loans/credit-card-payoff", "/us/loans/debt-payoff-calculator", "/us/savings/net-worth-calculator"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Saving and retirement"
      title="Emergency Fund Calculator"
      lead="Work out how big your emergency fund should be from your essential costs and your situation, and how long it will take to build."
      points={["Months of cover for your situation", "Time to reach your goal", "High-yield interest", "Free and private"]}
      guide={<EmergencyGuide />}
      faqs={FAQS}
      related={related}
      note="A rule of thumb, not financial advice. Savings rates are variable."
    >
      <EmergencyStudio query={query} />
    </FlagshipPage>
  );
}
