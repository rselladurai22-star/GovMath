import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import ChildCreditStudio from "./ChildCreditStudio";
import ChildCreditGuide from "./ChildCreditGuide";

const PATH = "/us/taxes/child-tax-credit-calculator";

export const metadata: Metadata = {
  title: "Child Tax Credit Calculator 2026: $2,200",
  description:
    "Free child tax credit calculator for 2026. See your $2,200-a-child credit, the refundable part up to $1,700, the $500 dependent credit and the phase-out.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/taxes", label: "Taxes and pay" },
  { href: PATH, label: "Child Tax Credit Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much is the child tax credit for 2026?", a: "$2,200 for each qualifying child under 17. Up to $1,700 of that is refundable, so it can come back as a refund even if you owe no income tax. Other dependents get a $500 credit, which is not refundable." },
  { q: "Who counts as a qualifying child?", a: "A son, daughter, stepchild, foster child, brother, sister or a descendant of one of them (such as a grandchild, niece or nephew) who is under 17 at the end of 2026, lived with you for more than half the year, did not provide over half of their own support, is claimed as your dependent and has a Social Security number valid for work." },
  { q: "At what income does the child tax credit phase out?", a: "It drops by $50 for each $1,000 (or part of $1,000) of modified AGI above $200,000, or $400,000 on a joint return. For one child the credit is gone above $243,000 single or $443,000 joint." },
  { q: "Is the child tax credit refundable in 2026?", a: "Partly. Up to $1,700 a child is refundable as the additional child tax credit. It is limited to 15% of your earned income above $2,500, so you need about $13,833 of earnings to get the full refundable amount for one child." },
  { q: "Do I need earned income to get the child tax credit?", a: "To get any refund, yes: the refundable part needs earned income over $2,500. If you owe income tax, the credit can cut that tax whatever kind of income you have, such as pensions or investment income." },
  { q: "Did the child tax credit change for 2026?", a: "The One Big Beautiful Bill Act raised the credit to $2,200 from 2025 and made it permanent, with inflation adjustments from 2026. For 2026 it stays at $2,200, while the refundable part is $1,700. It also requires a Social Security number for the parent claiming it." },
  { q: "Do both parents need a Social Security number?", a: "The child needs an SSN valid for work. From 2025 the person claiming also needs an SSN; on a joint return, one spouse having an SSN is enough. Children with an ITIN can still get the $500 credit for other dependents." },
  { q: "What is the $500 credit for other dependents?", a: "A non-refundable credit for dependents who do not qualify for the child tax credit: children aged 17 or 18, full-time students up to 23, parents and other relatives you support, and children without an SSN. It only reduces tax you owe." },
  { q: "Can divorced parents both claim the child tax credit?", a: "No. Only the parent who claims the child as a dependent gets it. That is usually the custodial parent, but they can release the claim to the other parent on Form 8332." },
  { q: "When will I get my child tax credit refund?", a: "The IRS holds refunds that include the additional child tax credit or the earned income credit until mid-February. If you file online early with direct deposit, most arrive by early March 2027." },
  { q: "Does the child tax credit lower my paychecks' tax?", a: "It can. List your children on step 3 of Form W-4 and your employer withholds less, so you get the credit spread over the year instead of in one refund." },
  { q: "Is there still a monthly child tax credit payment?", a: "No. Monthly advance payments only happened in the second half of 2021. For 2026 you get the credit through lower withholding and when you file your return in 2027." },
];

export default async function ChildCreditPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/us/taxes/earned-income-credit-calculator", "/us/taxes/federal-income-tax", "/us/taxes/paycheck-calculator", "/us/taxes/tax-bracket-calculator", "/us/savings/401k-calculator"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026 family tax credits"
      title="Child Tax Credit Calculator"
      lead="See what the 2026 child tax credit is worth to your family: the $2,200 a child that cuts your tax, the refundable part up to $1,700, the $500 credit for other dependents and the income phase-out."
      points={["$2,200 a child for 2026", "Refundable part, line by line", "$500 other dependent credit", "Phase-out from $200,000"]}
      guide={<ChildCreditGuide />}
      faqs={FAQS}
      related={related}
      note="Estimate for tax year 2026 based on IRS figures and Schedule 8812. Assumes every child meets the IRS tests. Not tax advice."
    >
      <ChildCreditStudio query={query} />
    </FlagshipPage>
  );
}
