import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import DividendStudio from "./DividendStudio";
import DividendGuide from "./DividendGuide";

const PATH = "/us/savings/dividend-calculator";

export const metadata: Metadata = {
  title: "Dividend Calculator: DRIP, Growth and Tax",
  description:
    "Free dividend calculator for 2026. See dividend income and growth with reinvestment (DRIP), yield on cost and the tax on qualified vs ordinary dividends.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/savings", label: "Saving and retirement" },
  { href: PATH, label: "Dividend Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "How do I calculate dividend income?",
    a: "Multiply the amount invested by the dividend yield. $100,000 at a 3% yield pays about $3,000 a year, or $750 a quarter. The calculator adds monthly contributions, reinvestment and dividend growth over the years.",
  },
  {
    q: "How much do I need to invest to earn $1,000 a month in dividends?",
    a: "$12,000 a year divided by the yield: $400,000 at 3%, $300,000 at 4% or $600,000 at 2%, before tax. Higher yields need less money but often come with slower growth or more risk.",
  },
  {
    q: "What is a DRIP?",
    a: "A dividend reinvestment plan, which uses each dividend to buy more shares automatically, often in fractional shares and with no commission. In our example, reinvesting turns $170,000 of contributions into $483,483 over 20 years, against $291,477 plus $105,904 of cash without reinvesting.",
  },
  {
    q: "Are reinvested dividends taxed?",
    a: "Yes, in a taxable account. You owe tax in the year the dividend is paid, even if it is reinvested. Each reinvestment adds to your cost basis, which lowers capital gains tax when you sell. Dividends inside an IRA, 401(k) or HSA aren't taxed each year.",
  },
  {
    q: "How are dividends taxed in 2026?",
    a: "Qualified dividends use the long-term capital gains rates: 0% up to $49,450 of taxable income for a single filer ($98,900 married filing jointly), 15% above that and 20% above $545,500 ($613,700 joint). Ordinary dividends are taxed at your income tax rate.",
  },
  {
    q: "What makes a dividend qualified?",
    a: "It must come from a US company or a qualifying foreign one, and you must hold the shares for more than 60 days in the 121-day period that begins 60 days before the ex-dividend date. REIT dividends and bond or money market fund distributions are mostly ordinary.",
  },
  {
    q: "What is yield on cost?",
    a: "Your current yearly dividends divided by the money you put in. As dividends grow, it rises well above the current yield: $100,000 at 3% with 5% dividend growth, reinvested, has a yield on cost of 6.69% after 10 years.",
  },
  {
    q: "Is a high dividend yield good?",
    a: "Not always. A yield far above similar companies often means the share price has fallen because investors expect a cut. Look at total return, the payout ratio and the dividend's history, not the yield alone.",
  },
  {
    q: "What is a good dividend yield?",
    a: "There is no single answer. A broad S&P 500 fund yielded about 1% in 2026; dividend-focused funds often yield 2.5% to 4%. A sustainable yield with steady growth usually beats a high yield that gets cut.",
  },
  {
    q: "Do I pay the 3.8% net investment income tax on dividends?",
    a: "Only if your modified AGI is above $200,000 (single or head of household), $250,000 (married filing jointly) or $125,000 (married filing separately). It applies to the smaller of your investment income and the amount over the threshold.",
  },
  {
    q: "What is the ex-dividend date?",
    a: "The cut-off for receiving the next dividend: you must own the shares before it. On that date the share price usually drops by about the dividend, so buying just before it doesn't earn free money.",
  },
  {
    q: "Does the calculator include state tax?",
    a: "No, it shows federal tax only. Most states tax dividends as ordinary income; a few have no income tax. The tax is assumed to be paid from other money, so the whole dividend is reinvested.",
  },
];

export default async function DividendPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/us/taxes/capital-gains-tax", "/us/savings/compound-interest-calculator", "/us/savings/roth-ira-calculator", "/us/savings/fire-calculator", "/us/taxes/tax-bracket-calculator", "/us/savings/retirement-calculator"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Saving and retirement"
      title="Dividend Calculator"
      lead="See how much dividend income your investments could pay, how reinvesting and dividend growth build it, and what you'd owe in tax in 2026."
      points={["DRIP vs cash", "Dividend growth", "Qualified dividend tax", "Free and private"]}
      guide={<DividendGuide />}
      faqs={FAQS}
      related={related}
      note="Illustration only. Dividends can be cut and share prices can fall. Not financial advice."
    >
      <DividendStudio query={query} />
    </FlagshipPage>
  );
}
