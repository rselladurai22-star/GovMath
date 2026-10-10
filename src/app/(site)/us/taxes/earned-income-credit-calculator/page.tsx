import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import EitcStudio from "./EitcStudio";
import EitcGuide from "./EitcGuide";

const PATH = "/us/taxes/earned-income-credit-calculator";

export const metadata: Metadata = {
  title: "Earned Income Credit Calculator 2026 (EITC)",
  description:
    "Free earned income credit calculator for 2026. See your EITC by income, filing status and children, with the phase-in, phase-out and $12,200 investment limit.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/taxes", label: "Taxes and pay" },
  { href: PATH, label: "Earned Income Credit Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What is the maximum earned income credit for 2026?", a: "$664 with no qualifying children, $4,427 with one, $7,316 with two and $8,231 with three or more, from IRS Rev. Proc. 2025-32." },
  { q: "What are the 2026 EITC income limits?", a: "For single and head of household filers the credit ends at $19,540 with no children, $51,593 with one, $58,629 with two and $62,974 with three or more. On a joint return the limits are $26,820, $58,863, $65,899 and $70,244." },
  { q: "Is the earned income credit refundable?", a: "Yes, fully. If the credit is more than the tax you owe, the IRS pays you the difference as a refund." },
  { q: "What counts as earned income?", a: "Wages, salaries and tips, union strike benefits, some disability pay before minimum retirement age, and net earnings from self-employment. Interest, dividends, pensions, Social Security, unemployment, child support and alimony do not count." },
  { q: "Can I get the EITC without children?", a: "Yes, if you are at least 25 and under 65 at the end of 2026, are not someone else's dependent or qualifying child, and earn under $19,540 ($26,820 joint). The most you can get is $664." },
  { q: "What is the investment income limit for the EITC?", a: "$12,200 for 2026. If your interest, dividends, capital gains, rents and royalties add up to more than that, you cannot claim the credit at all." },
  { q: "Can married couples filing separately get the EITC?", a: "Only under the separated-spouse rules: a qualifying child lived with you for more than half the year, and you lived apart from your spouse for the last six months of the year or are legally separated under a written agreement or decree." },
  { q: "Who is a qualifying child for the EITC?", a: "Your child, stepchild, foster child, sibling or a descendant of one of them who is under 19 at the end of the year (under 24 if a full-time student, any age if permanently and totally disabled), younger than you, and who lived with you in the U.S. for more than half the year." },
  { q: "When do EITC refunds arrive?", a: "The IRS cannot issue refunds that include the EITC before mid-February. If you file online with direct deposit and there are no problems, most arrive by early March." },
  { q: "Why is my EITC lower than the maximum?", a: "Either your earnings are still in the phase-in (below $8,680 to $18,290, depending on children), or your income is above the phase-out start ($10,860 to $23,890 single, $18,140 to $31,160 joint), where the credit falls with each extra dollar." },
  { q: "Does the EITC affect benefits like SNAP or Medicaid?", a: "No. Federal law says a tax refund, including the EITC, does not count as income for federal benefits, and does not count as a resource for 12 months after you receive it." },
  { q: "What happens if I claim the EITC by mistake?", a: "You will have to repay it with interest. If the IRS finds the claim was reckless, you can be barred from the credit for two years; for fraud, ten years." },
];

export default async function EitcPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/us/taxes/child-tax-credit-calculator", "/us/taxes/federal-income-tax", "/us/taxes/hourly-paycheck-calculator", "/us/taxes/self-employment-tax", "/us/taxes/paycheck-calculator"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026 earned income tax credit"
      title="Earned Income Credit Calculator"
      lead="Find your 2026 earned income tax credit (EITC) from your earnings, filing status and number of qualifying children, and see where you sit on the phase-in, plateau and phase-out."
      points={["2026 IRS table", "0 to 3+ children", "Joint and single limits", "Investment income test"]}
      guide={<EitcGuide />}
      faqs={FAQS}
      related={related}
      note="Estimate for tax year 2026 from the IRS formula. The IRS table works in $50 steps and may differ by a few dollars. Not tax advice."
    >
      <EitcStudio query={query} />
    </FlagshipPage>
  );
}
