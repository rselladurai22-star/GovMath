import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import W4Studio from "./W4Studio";
import W4Guide from "./W4Guide";

const PATH = "/us/taxes/w4-withholding-calculator";

export const metadata: Metadata = {
  title: "W-4 Withholding Calculator 2026",
  description: "Free W-4 withholding calculator for 2026. Check if your paycheck withholding is on track and see what to enter in Steps 3, 4(a), 4(b) and 4(c) of Form W-4.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/taxes", label: "Taxes and pay" },
  { href: PATH, label: "W-4 Withholding Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How do I know if my withholding is right?", a: "Compare your 2026 tax with what will be withheld by December 31: the year-to-date federal tax on your pay stub plus each remaining paycheck's federal tax. If they are within a few hundred dollars, you are on track." },
  { q: "How much federal tax is withheld from $65,000?", a: "With a basic 2026 W-4 (single, nothing else filled in), $216.15 every two weeks, or $5,620 for the year: the same as the 2026 tax on $65,000 with the standard deduction." },
  { q: "What should I put on my W-4 to owe nothing?", a: "With one job and no other income, just your filing status, plus Step 3 if you have children or dependents. With a second job, side income or big deductions, use Steps 2, 4(a), 4(b) or 4(c), or the figures from this calculator." },
  { q: "What is Step 4(c) on the W-4?", a: "An extra dollar amount withheld from every paycheck. It is the simplest way to cover a second job, side income or a shortfall late in the year." },
  { q: "Should I check the box in Step 2?", a: "Check it on both W-4s if you have exactly two jobs (counting a spouse's if you file jointly) that pay about the same. If the pay is very different, the Multiple Jobs Worksheet or a calculator is more accurate." },
  { q: "How much is Step 3 for children in 2026?", a: "$2,200 for each qualifying child under 17 and $500 for each other dependent, if your total income is $200,000 or less ($400,000 married filing jointly)." },
  { q: "Can I put tips and overtime on my W-4?", a: "Yes. The 2026 Deductions Worksheet has lines for qualified tips (up to $25,000) and the overtime premium (up to $12,500, or $25,000 joint) if your income is under $150,000 ($300,000 joint). The total goes in Step 4(b)." },
  { q: "Does changing my W-4 change my tax?", a: "No. It changes only how much you pay ahead through payroll. Your actual tax is settled on your return; the W-4 decides whether that ends in a refund or a bill." },
  { q: "Is it too late to fix my withholding in October?", a: "No. Withholding counts as paid evenly through the year, so extra withholding in your last paychecks still helps avoid an underpayment penalty. Each paycheck just has to carry more." },
  { q: "How often can I change my W-4?", a: "As often as you like. Your employer must apply a new form by the first payroll period ending on or after the 30th day after you hand it in." },
  { q: "Can I claim exempt from withholding?", a: "Only if you owed no federal income tax for 2025 and expect to owe none for 2026. An exempt W-4 for 2026 expires; file a new one by February 16, 2027." },
  { q: "Should both spouses fill in Step 3?", a: "No. Claim children and other credits on one W-4 only, usually the higher-paying job, or they are counted twice and too little is withheld." },
];

export default async function W4Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/us/taxes/paycheck-calculator", "/us/taxes/tax-refund-calculator", "/us/taxes/federal-income-tax", "/us/taxes/estimated-tax-calculator", "/us/taxes/bonus-tax-calculator", "/us/taxes/child-tax-credit-calculator"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Form W-4 check"
      title="W-4 Withholding Calculator"
      lead="Check whether the federal tax taken from your paychecks will cover your 2026 tax, and see exactly what to put in each step of a new Form W-4 for the paychecks left this year."
      points={["2026 withholding tables", "Paychecks left this year", "Steps 3, 4(a), 4(b) and 4(c)", "Second jobs and spouses"]}
      guide={<W4Guide />}
      faqs={FAQS}
      related={related}
      note="Estimates for 2026 using the IRS Publication 15-T percentage method. State withholding is not included. Not tax advice."
    >
      <W4Studio query={query} />
    </FlagshipPage>
  );
}
