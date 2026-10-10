import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import DtiStudio from "./DtiStudio";
import DtiGuide from "./DtiGuide";

const PATH = "/us/loans/debt-to-income-ratio";

export const metadata: Metadata = {
  title: "Debt-to-Income Ratio Calculator 2026",
  description:
    "Free debt-to-income ratio calculator for 2026. Find your front-end and back-end DTI and check it against conventional, FHA and VA mortgage limits.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/loans", label: "Loans and debt" },
  { href: PATH, label: "Debt-to-Income Ratio Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "How do I calculate my debt-to-income ratio?",
    a: "Add up your monthly debt payments, including the housing payment, and divide by your gross monthly income (before tax). $2,820 of payments on $7,500 a month is a DTI of 37.6%.",
  },
  {
    q: "What is the difference between front-end and back-end DTI?",
    a: "Front-end DTI counts only the housing payment: mortgage principal and interest, property tax, homeowners insurance, mortgage insurance and HOA dues. Back-end DTI adds every other monthly debt payment. Lenders focus mostly on the back-end figure.",
  },
  {
    q: "What is a good debt-to-income ratio?",
    a: "Lower is better. A back-end ratio of 36% or less is widely seen as comfortable, and the classic rule of thumb is 28% for housing and 36% in all. Many loans allow more, up to about 50% with strong credit.",
  },
  {
    q: "What is the maximum DTI for a conventional loan?",
    a: "Fannie Mae allows up to 36% for manually underwritten loans, up to 45% with the credit score and reserves its eligibility matrix requires, and up to 50% when the loan is approved through its Desktop Underwriter system.",
  },
  {
    q: "What DTI do I need for an FHA loan?",
    a: "FHA's manual underwriting standard is 31% front-end and 43% back-end. With compensating factors, such as cash reserves or a small increase in housing costs, it can allow 37/47 or 40/50. Automated approvals can go higher.",
  },
  {
    q: "What DTI do I need for a VA loan?",
    a: "VA uses 41% as a guideline, not a hard cap. Above 41%, the lender must justify the loan, usually by showing residual income comfortably above VA's minimum for your family size and region.",
  },
  {
    q: "Is there still a 43% DTI limit for qualified mortgages?",
    a: "Not for most loans. The CFPB replaced the 43% limit in the general qualified mortgage definition with a test based on the loan's price, mandatory from October 1, 2022. Lenders must still consider DTI or residual income.",
  },
  {
    q: "Which debts count in DTI?",
    a: "Payments that show on your credit report or that you owe by agreement: mortgage or rent on a new home, car loans, student loans, credit card minimums, personal loans, and child support or alimony. Everyday bills such as utilities, phone and groceries do not count.",
  },
  {
    q: "Do student loans count if my payment is $0?",
    a: "Often, yes. FHA uses 0.5% of the balance when the credit report shows a $0 payment. Fannie Mae can use a documented $0 income-driven payment, but for deferred or forbearance loans it uses 1% of the balance or a fully amortizing payment.",
  },
  {
    q: "Is DTI based on gross or net income?",
    a: "Gross income, before tax and other deductions. Lenders use stable, documented income, such as salary, regular overtime with a history, self-employment profit averaged over two years, Social Security or pensions.",
  },
  {
    q: "How can I lower my DTI quickly?",
    a: "Pay off a small loan with few payments left, pay down card balances to cut minimum payments, add a co-borrower's income, choose a cheaper home or a larger down payment, or avoid new debt before you apply.",
  },
  {
    q: "Does DTI affect my credit score?",
    a: "No. Credit scores do not use your income, so DTI is not part of them. But credit card utilization, which is part of your score, often improves when you pay balances down to lower your DTI.",
  },
];

export default async function DtiPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/us/housing/mortgage-affordability", "/us/housing/mortgage-calculator", "/us/loans/debt-payoff-calculator", "/us/loans/credit-card-payoff", "/us/loans/student-loan-calculator", "/us/housing/rent-affordability"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Mortgage readiness"
      title="Debt-to-Income Ratio Calculator"
      lead="Work out your front-end and back-end debt-to-income ratio the way mortgage lenders do, and see how much room you have under conventional, FHA and VA limits."
      points={["Front-end and back-end", "Conventional, FHA, VA", "Room under each limit", "Student loan rules"]}
      guide={<DtiGuide />}
      faqs={FAQS}
      related={related}
      note="An estimate. Lenders set their own limits and check documents; this is not a loan approval or financial advice."
    >
      <DtiStudio query={query} />
    </FlagshipPage>
  );
}
