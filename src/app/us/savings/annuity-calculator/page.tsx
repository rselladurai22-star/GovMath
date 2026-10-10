import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import AnnuityStudio from "./AnnuityStudio";
import AnnuityGuide from "./AnnuityGuide";

const PATH = "/us/savings/annuity-calculator";

export const metadata: Metadata = {
  title: "Annuity Calculator: Income and Cost",
  description:
    "Free annuity calculator for 2026. See the monthly income a lump sum buys for life or a set term, the cost of a target income, and present and future value.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/savings", label: "Saving and retirement" },
  { href: PATH, label: "Annuity Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "How much does a $200,000 annuity pay a month?",
    a: "At a 5% interest rate, $200,000 pays about $1,319.91 a month for 20 years. Paid over the 22.9-year average life expectancy at 65, it pays about $1,223.18 a month. Real quotes vary by insurer, age, sex and health.",
  },
  {
    q: "How much does an annuity of $1,000 a month cost?",
    a: "At 5%, an income of $1,000 a month for 25 years costs about $171,060. If you want the payments to rise 2% a year to help with inflation, the cost rises to about $208,340.",
  },
  {
    q: "What is the difference between an ordinary annuity and an annuity due?",
    a: "An ordinary annuity pays at the end of each period; an annuity due pays at the start. Because each payment of an annuity due arrives one period sooner, it is worth more: $10,000 a year for 20 years at 5% has a present value of $124,622 as an ordinary annuity and $130,853 as an annuity due.",
  },
  {
    q: "How is the lifetime figure worked out?",
    a: "We spread the payments over your life expectancy from the IRS Single Life Table, 22.9 years at 65. It is an estimate. Insurers use their own mortality tables, which differ by sex and health, and a lifetime annuity keeps paying however long you live.",
  },
  {
    q: "What is the present value of an annuity?",
    a: "What a stream of future payments is worth today, at a given interest rate. It is the lump sum you would need to invest now to pay them. The present value of $1,000 a month for 25 years at 5% is about $171,060.",
  },
  {
    q: "What is the future value of an annuity?",
    a: "What a series of regular payments grows to if each is invested at a given rate. $500 a month for 30 years at 6% grows to about $502,258 paid at the end of each month, or $504,769 paid at the start.",
  },
  {
    q: "Are annuity payments taxed?",
    a: "Yes, in part. If you bought the annuity with after-tax money, each payment is partly a tax-free return of your premium and partly taxable earnings, under the IRS exclusion ratio. If it was bought with pre-tax money, such as from a traditional IRA or 401(k), the whole payment is taxed as income.",
  },
  {
    q: "What happens to an annuity when I die?",
    a: "With a straight life annuity, payments stop and nothing is left for heirs. Options such as a period certain (for example 10 or 20 years guaranteed), a cash refund or a joint-and-survivor annuity pay on after death, but they reduce the monthly income.",
  },
  {
    q: "Are annuities a good idea?",
    a: "An immediate annuity can turn savings into guaranteed income you can't outlive, which some retirees value highly. The trade-offs are lost access to the money, fixed payments that inflation erodes and, for some products, high fees and surrender charges. Compare quotes and read the contract before buying.",
  },
  {
    q: "Is my annuity protected if the insurer fails?",
    a: "Annuities are not FDIC insured. Each state has a life and health insurance guaranty association that covers annuities up to a limit, often $250,000 of present value per person per insurer, though limits vary by state.",
  },
  {
    q: "Why does a higher interest rate give a higher income?",
    a: "The insurer invests your premium, mostly in bonds. When yields are higher, the money earns more while it is being paid out, so the same premium supports bigger payments. At 3%, $200,000 pays about $1,109.20 a month for 20 years; at 7%, about $1,550.60.",
  },
];

export default async function AnnuityPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/us/savings/retirement-withdrawal-calculator", "/us/savings/retirement-calculator", "/us/savings/social-security-calculator", "/us/savings/rmd-calculator", "/us/savings/inflation-calculator", "/us/savings/cd-calculator"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Retirement income"
      title="Annuity Calculator"
      lead="See how much income a lump sum buys, for life or a set number of years, or what a target income would cost, with present and future values."
      points={["Income or cost", "Lifetime or fixed term", "Ordinary or annuity due", "Free and private"]}
      guide={<AnnuityGuide />}
      faqs={FAQS}
      related={related}
      note="An estimate. Real annuity quotes depend on the insurer, your age, sex, health and the contract. Not financial advice."
    >
      <AnnuityStudio query={query} />
    </FlagshipPage>
  );
}
