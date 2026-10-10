import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import RefundStudio from "./RefundStudio";
import RefundGuide from "./RefundGuide";

const PATH = "/us/taxes/tax-refund-calculator";

export const metadata: Metadata = {
  title: "Tax Refund Calculator 2026: Refund or Owe?",
  description: "Free tax refund calculator for 2026. Estimate your federal refund or balance due from wages, withholding, children and credits, and see what changes it.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/taxes", label: "Taxes and pay" },
  { href: PATH, label: "Tax Refund Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How is my tax refund calculated?", a: "Add the federal tax withheld from your pay, any estimated payments and your refundable credits, then subtract your total 2026 tax. A positive result is your refund; a negative one is what you owe." },
  { q: "How much will I get back on $65,000?", a: "It depends on what was withheld. A single filer with $65,000 of wages owes $5,620 of federal income tax for 2026. If $6,200 was withheld, the refund is $580." },
  { q: "Why is my refund smaller this year?", a: "Usually because of income with no withholding (a side gig, interest, a sale of shares), a raise that pushed pay into a higher bracket, a change of W-4, or a child who turned 17 and no longer qualifies for the child tax credit." },
  { q: "Does the child tax credit increase my refund?", a: "Yes. It is $2,200 for each child under 17 in 2026. It first cuts your tax; up to $1,700 a child of what is left is refundable, so it can be paid to you even if you owe no tax." },
  { q: "When will I get my 2026 tax refund?", a: "Most e-filed returns with direct deposit are refunded within 21 days. Returns claiming the earned income credit or the refundable child tax credit can't be refunded before mid-February 2027 by law." },
  { q: "Do I get Social Security and Medicare back?", a: "No. Only federal income tax withholding is refunded. The one exception is when two or more employers together took Social Security tax on more than the $184,500 wage base: you can claim the excess on your return." },
  { q: "Is a big tax refund a good thing?", a: "It means you paid more than needed during the year and lent the IRS money without interest. Some people like the lump sum; others prefer a new W-4 that puts the money in each paycheck." },
  { q: "Does a 401(k) contribution increase my refund?", a: "Not directly. Traditional 401(k) contributions lower your taxable wages, but your employer already withholds less because of them. A traditional IRA contribution made by April 15, 2027 does increase your refund, because nothing was adjusted during the year." },
  { q: "What if I owe more than $1,000?", a: "You may face an underpayment penalty unless your withholding and estimated payments covered 90% of your 2026 tax or 100% of your 2025 tax (110% if your 2025 AGI was over $150,000)." },
  { q: "Can my refund be taken for debts?", a: "Yes. Through the Treasury Offset Program, a federal refund can be reduced to pay past-due child support, defaulted federal debts and some state debts. You get a notice explaining any offset." },
  { q: "Does this include my state refund?", a: "No. This is the federal refund only. Most states with an income tax have their own return and refund." },
  { q: "How long do I have to claim a refund?", a: "Generally three years from the original due date. For a 2026 return, that is April 15, 2030. After that, the refund is lost." },
];

export default async function RefundPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/us/taxes/federal-income-tax", "/us/taxes/w4-withholding-calculator", "/us/taxes/child-tax-credit-calculator", "/us/taxes/earned-income-credit-calculator", "/us/taxes/estimated-tax-calculator", "/us/taxes/paycheck-calculator"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026 refund estimate"
      title="Tax Refund Calculator"
      lead="Estimate your 2026 federal tax refund or balance due from your wages, withholding, children and credits, and see which changes would make it bigger or smaller."
      points={["Refund or balance due", "Refundable credits", "What changes your refund", "When it arrives"]}
      guide={<RefundGuide />}
      faqs={FAQS}
      related={related}
      note="Estimates for tax year 2026 based on IRS figures. State refunds are not included. Not tax advice."
    >
      <RefundStudio query={query} />
    </FlagshipPage>
  );
}
