import type { Metadata } from "next";
import Link from "next/link";
import CalcPage from "@/components/calc/CalcPage";
import { CALCULATORS } from "@/lib/calculators";
import HicbcStudio from "./HicbcStudio";
import { ogFor } from "@/gm/og";
import { childBenefitFor, hicbc } from "@/lib/benefits/family";
import { childBenefitRates } from "@/lib/benefits/child-benefit";
import { incomeTax } from "@/lib/tax/2026-27";
import { gbp, percent } from "@/components/flagship/format";

export const metadata: Metadata = {
  title: "High Income Child Benefit Charge Calculator",
  description:
    "Free High Income Child Benefit Charge calculator for 2026/27. See the charge between £60,000 and £80,000 and how pension contributions reduce it.",
  alternates: { canonical: "/uk/benefits/high-income-child-benefit" },
  openGraph: ogFor("/uk/benefits/high-income-child-benefit"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/benefits", label: "Benefits & family" },
  { href: "/uk/benefits/high-income-child-benefit", label: "High Income Child Benefit Charge" },
];

// Every figure in the text below comes from the engines, so it moves with the rates.
const at = (income: number, children = 2, pension = 0, year?: "2026/27" | "2027/28") => hicbc({ children, income, pension, giftAid: 0, weeks: 52, year });
const CB = childBenefitRates("2026/27");
const NEXT = childBenefitRates("2027/28");
const EX = at(70_000);
const EX_NEXT = at(70_000, 2, 0, "2027/28");
// A £10,000 gross pension contribution from £70,000: tax relief is the Income Tax no longer due on that £10,000.
const RELIEF = incomeTax(70_000).total - incomeTax(60_000).total;
const NET_COST = 10_000 - RELIEF - EX.charge;
const STEP = [1, 2, 3].map((n) => ({ n, rate: at(70_000, n).marginalRate, benefit: childBenefitFor(n).annual }));

const FAQS: { q: string; a: string }[] = [
  {
    q: "Is the High Income Child Benefit Charge based on household income?",
    a: "No. It looks at each partner's own adjusted net income and only the higher one counts. Two parents on £59,000 each pay nothing; one parent on £80,000 with a partner who earns nothing repays all of it. The government dropped its plan to move to a household test.",
  },
  {
    q: "What is the tax rate between £60,000 and £80,000 if you get Child Benefit?",
    a: `On top of 40% Income Tax and 2% National Insurance, each extra £1,000 of income adds 5% of your Child Benefit to the charge. For an employee in England, Wales or Northern Ireland in 2026/27 that makes about ${STEP.map((x) => `${percent(x.rate, 0)} with ${x.n === 1 ? "one child" : x.n === 2 ? "two children" : "three"}`).join(", ")}. It drops back to 42% above £80,000.`,
  },
  {
    q: "Does the charge change in April 2027?",
    a: `The £60,000 and £80,000 thresholds stay the same. Child Benefit is due to rise to ${gbp(NEXT.firstChildWeekly, true)} a week for the eldest child and ${gbp(NEXT.additionalChildWeekly, true)} for each other child, so the charge rises with it: with two children and £70,000 it would be ${gbp(EX_NEXT.charge)} instead of ${gbp(EX.charge)}. The new rates are final once Parliament approves them.`,
  },
  {
    q: "My partner will not tell me what they earn. How do I know who pays?",
    a: "Write to HMRC with your own adjusted net income and your partner's name. HMRC will answer only yes or no to whether your partner has the higher income or gets Child Benefit. It will not tell you any figures.",
  },
  {
    q: "We split up, or moved in together, part-way through the year. What do I pay?",
    a: "Only for the weeks you lived together. The charge uses your adjusted net income for the whole tax year, but applies it to the Child Benefit paid from the week you moved in until the week you separated. Set the number of weeks under More options.",
  },
];

const SOURCES = [
  { label: "GOV.UK: High Income Child Benefit Charge", href: "https://www.gov.uk/child-benefit-tax-charge" },
  { label: "HMRC: Personal Allowances, adjusted net income", href: "https://www.gov.uk/guidance/adjusted-net-income" },
  { label: "GOV.UK: Pay the tax charge through PAYE", href: "https://www.gov.uk/child-benefit-tax-charge/pay-tax-charge-paye" },
  { label: "GOV.UK: Opt out of Child Benefit payments", href: "https://www.gov.uk/child-benefit-tax-charge/stop-child-benefit" },
  { label: "Income Tax (Earnings and Pensions) Act 2003, section 681B: who is liable", href: "https://www.legislation.gov.uk/ukpga/2003/1/section/681B" },
  { label: "Income Tax (Earnings and Pensions) Act 2003, section 681C: the amount of the charge", href: "https://www.legislation.gov.uk/ukpga/2003/1/section/681C" },
  { label: "HMRC: Budget 2026 overview of tax legislation and rates, Annex A (rates from April 2027)", href: "https://www.gov.uk/government/publications/budget-2026-overview-of-tax-legislation-and-rates-ootlar" },
];

function Notes() {
  return (
    <>
      <h2>Adjusted net income is not your salary</h2>
      <p>The charge is tested against a figure most people have never worked out. Start with everything you are taxed on, then take off three things:</p>
      <ul>
        <li>
          <strong>Add up</strong>{" "}your taxable income before the Personal Allowance: pay and bonuses, taxable benefits such as a company car, self-employed profit, rent, savings interest and dividends.
        </li>
        <li>
          <strong>Take off pension contributions</strong>{" "}you paid yourself. If your provider claims basic-rate relief, take off what you paid plus that 20% top-up: £1.25 for each £1.
        </li>
        <li>
          <strong>Take off Gift Aid donations</strong>, again grossed up: £1.25 for each £1 given. Trading losses come off too.
        </li>
      </ul>
      <p>
        Salary sacrifice never enters the sum: pay you swap for a pension, a bike or an electric car is not taxable income in the first place. ISA interest and Child Benefit itself do not count
        either.
      </p>

      <h2>What a pension contribution really costs</h2>
      <p>
        Take two children and {gbp(70_000)}. The charge is {gbp(EX.charge)}: half of {gbp(childBenefitFor(2).annual, true)}, rounded down. Put {gbp(10_000)} into a pension and your adjusted
        net income is {gbp(60_000)}, so the charge is nil.
      </p>
      <p>
        That {gbp(10_000)} also earns {gbp(RELIEF)} of tax relief at 40%. Count the charge you no longer pay and {gbp(10_000)} in your pension has cost you {gbp(NET_COST)}. You cannot touch it
        until 57, and you must stay inside the £60,000 annual allowance, but few tax breaks are this large.
      </p>
      <p>
        The contribution has to be paid by 5 April to count for that tax year. If you are just over a line, even a small one helps: each £200 you take off removes 1% of the charge.
      </p>

      <h2>Paying it: PAYE or a tax return</h2>
      <p>
        Since 2025 employees can have the charge collected through their tax code instead of filing a return. You register online with HMRC, which then spreads it over the year&rsquo;s pay
        packets. You can use it for the current or previous tax year, up to 31 January after that year ends.
      </p>
      <p>
        If you already file a return for another reason, such as self-employment or rental income, the charge goes on it and is due by 31 January. If you have never filed and cannot use PAYE,
        tell HMRC by 5 October after the tax year. Missing that date can bring a penalty on top of the charge.
      </p>

      <h2>Keep the claim, even at £80,000</h2>
      <p>
        Once you would repay every pound you can opt out of the payments, and there is then no charge to report. Do not cancel the claim. It gives a parent who is not working National
        Insurance credits towards the State Pension until the youngest child is 12, and gets your child a National Insurance number at 16. Payments can be restarted if your income falls.
      </p>
      <p>
        Between the two thresholds, keep taking the money: you only ever repay part of it. The <Link href="/uk/benefits/child-benefit">Child Benefit calculator</Link>{" "}shows the{" "}
        {gbp(CB.firstChildWeekly, true)} and {gbp(CB.additionalChildWeekly, true)} weekly rates for any number of children. Income over £100,000 brings a second cliff, where{" "}
        <Link href="/uk/benefits/tax-free-childcare">Tax-Free Childcare</Link>{" "}and the <Link href="/uk/benefits/free-childcare-hours">30 funded hours</Link>{" "}stop.
      </p>
    </>
  );
}

export default async function HicbcPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/benefits/child-benefit", "/uk/benefits/tax-free-childcare", "/uk/benefits/free-childcare-hours", "/uk/tax-and-salary/pro-rata"].includes(c.href));
  return (
    <CalcPage
      breadcrumbs={BREADCRUMBS}
      title="High Income Child Benefit Charge Calculator"
      lead="How much Child Benefit you pay back when one of you earns over £60,000, and what a pension contribution does to it."
      notes={<Notes />}
      faqs={FAQS}
      sources={SOURCES}
      related={related}
    >
      <HicbcStudio query={query} />
    </CalcPage>
  );
}
