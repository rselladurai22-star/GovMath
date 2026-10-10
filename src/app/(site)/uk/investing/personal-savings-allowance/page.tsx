import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import PsaStudio from "./PsaStudio";
import { ogFor } from "@/gm/og";
import PsaGuide from "./PsaGuide";

export const metadata: Metadata = {
  title: "Personal Savings Allowance Calculator 2026/27",
  description:
    "Free calculator for tax on savings interest in 2026/27. Check your Personal Savings Allowance, the starting rate for savings and the tax you owe.",
  alternates: { canonical: "/uk/investing/personal-savings-allowance" },
  openGraph: ogFor("/uk/investing/personal-savings-allowance"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/investing", label: "Pensions & Investing" },
  { href: "/uk/investing/personal-savings-allowance", label: "Personal Savings Allowance Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What is the Personal Savings Allowance for 2026/27?", a: "£1,000 of interest tax-free for basic-rate taxpayers, £500 for higher-rate taxpayers and nothing for additional-rate taxpayers." },
  { q: "What is the starting rate for savings?", a: "Up to £5,000 of interest taxed at 0%, reduced by £1 for every £1 of other income over £12,570. It is gone once other income reaches £17,570." },
  { q: "Do I pay tax on savings interest over £1,000?", a: "If you are a basic-rate taxpayer and have no starting rate band left, yes: 20% on interest above £1,000." },
  { q: "Does ISA interest count towards the allowance?", a: "No. ISA interest is tax-free and does not use your Personal Savings Allowance." },
  { q: "How does HMRC collect tax on savings?", a: "Usually through your tax code, using figures from banks, or through your Self Assessment return." },
  { q: "Are Premium Bond prizes taxed?", a: "No. Premium Bond prizes are tax-free and do not count towards the allowance." },
  { q: "Is the allowance different in Scotland?", a: "No. Savings interest is taxed at UK rates and bands, so Scottish taxpayers have the same allowance based on UK bands." },
  { q: "When is savings tax going up?", a: "From 6 April 2027, to 22%, 42% and 47%. The allowances stay the same." },
  { q: "Does interest count towards the £100,000 limit?", a: "Yes. All your interest counts towards total income for the Personal Allowance taper and the Child Benefit charge." },
  { q: "How much interest can I earn with no other income?", a: "Up to £18,570 tax-free: the £12,570 Personal Allowance, the £5,000 starting rate and the £1,000 allowance." },
  { q: "How much can I save before paying tax on interest?", a: "At 4%, a basic-rate taxpayer can hold about £25,000 outside ISAs before the interest goes over £1,000." },
  { q: "Do I need to tell HMRC about savings interest?", a: "Usually not, as banks report it. You must use Self Assessment if your interest is £10,000 or more." },
  { q: "Do children pay tax on savings?", a: "Rarely, as they have their own allowances. But interest over £100 a year on money given by a parent is taxed as the parent's." },
  { q: "Does the Personal Savings Allowance depend on my total income?", a: "Yes. It is based on the highest band your total income reaches, including the interest and any dividends." },
  { q: "Is the starting rate for savings automatic?", a: "Yes, if your other income is low enough. HMRC applies it when it works out your tax." },
];

export default async function PsaPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/investing/savings-interest", "/uk/investing/isa-vs-gia", "/uk/investing/dividend-tax", "/uk/investing/premium-bonds", "/uk/tax-and-salary/tax-bracket-checker", "/uk/investing/junior-isa"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026/27 tax year"
      title="Personal Savings Allowance Calculator"
      lead="See how much of your savings interest is tax-free, what tax you owe on the rest, and how it changes from April 2027."
      points={["PSA and starting rate", "All tax bands", "April 2027 rates", "Free and private"]}
      guide={<PsaGuide />}
      faqs={FAQS}
      related={related}
      note="2026/27 Income Tax rules. Your tax code or Self Assessment decides what you actually pay."
    >
      <PsaStudio query={query} />
    </FlagshipPage>
  );
}
