import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import SoleTraderStudio from "./SoleTraderStudio";
import { ogFor } from "@/gm/og";
import SoleTraderGuide from "./SoleTraderGuide";
import { alternatesFor } from "@/lib/seo/hreflang";

export const metadata: Metadata = {
  title: "Sole Trader & Self Assessment Tax Calculator",
  description:
    "Free sole trader tax calculator for 2025/26 and 2026/27: Income Tax and Class 4 NI on your profit, what you pay on 31 January 2027 and what to set aside.",
  alternates: alternatesFor("/uk/business/sole-trader-tax"),
  openGraph: ogFor("/uk/business/sole-trader-tax"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/business", label: "Business" },
  { href: "/uk/business/sole-trader-tax", label: "Sole Trader Tax" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much tax does a sole trader pay?", a: "Income Tax at 20%, 40% or 45% on profit above the £12,570 Personal Allowance, plus Class 4 National Insurance at 6% on profit between £12,570 and £50,270 and 2% above." },
  { q: "Do sole traders pay Class 2 National Insurance?", a: "No longer. Profit of £7,105 or more gets a State Pension credit free. Below that you can pay voluntary Class 2 at £3.65 a week." },
  { q: "What is the trading allowance?", a: "A flat £1,000 deduction you can use instead of actual expenses. Turnover of £1,000 or less is tax-free and does not need reporting. Budget 2026 triples it to £3,000 from 6 April 2027." },
  { q: "When do sole traders pay tax?", a: "By 31 January after the tax year ends, with payments on account on 31 January and 31 July towards the next year if the bill is £1,000 or more." },
  { q: "How much should I put aside for tax?", a: "About 15% to 20% of profit for a basic-rate sole trader, and 30% to 40% for higher-rate profit or self-employment on top of a well-paid job." },
  { q: "Do I pay tax on what I take out or on my profit?", a: "On your profit. Money you take out, called drawings, is not taxed separately and is not an expense." },
  { q: "Can I make a loss?", a: "Yes. A trading loss can usually be set against other income in the same or previous year, or carried forward against future profits from the same trade." },
  { q: "Do I need to register if I only earn a little?", a: "Not if your total self-employed turnover is £1,000 or less in the tax year. Above that you must register by 5 October after the year ends." },
  { q: "Does my Class 4 NI count towards my State Pension?", a: "Class 4 itself does not, but profit of £7,105 or more gives you a free Class 2 credit, which does count." },
  { q: "Can I use this for my 2025/26 tax return due on 31 January 2027?", a: "Yes, in England, Wales and Northern Ireland. The Personal Allowance (£12,570), the tax bands and the Class 4 rates (6% and 2%) were the same in 2025/26 and 2026/27, so the tax on a given profit is the same. Scottish Income Tax bands changed between the two years." },
  { q: "What do I pay on 31 January 2027?", a: "The rest of your 2025/26 bill (the balancing payment) plus, if that bill was £1,000 or more, your first payment on account for 2026/27: half of the 2025/26 bill. The return is due online by the same date." },
  { q: "Can I pay my tax monthly?", a: "Yes. HMRC's budget payment plan lets you pay towards your next bill by direct debit in regular amounts." },
];

export default async function SoleTraderPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/business/allowable-expenses", "/uk/business/payment-on-account", "/uk/business/business-mileage", "/uk/business/dividend-vs-salary", "/uk/business/vat-calculator", "/uk/tax-and-salary/salary-calculator"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Updated for 2026/27"
      title="Sole Trader Tax Calculator"
      lead="Work out the Income Tax and National Insurance on your self-employed profit, what you keep, and when you pay."
      points={["Income Tax and Class 4", "Job, student loan, Scotland", "Payment dates", "Free and private"]}
      guide={<SoleTraderGuide />}
      faqs={FAQS}
      related={related}
      note="2026/27 tax rules. Not tax advice; an accountant can check your figures."
    >
      <SoleTraderStudio query={query} />
    </FlagshipPage>
  );
}
