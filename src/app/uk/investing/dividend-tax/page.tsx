import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import DividendStudio from "./DividendStudio";
import { ogFor } from "@/gm/og";
import DividendGuide from "./DividendGuide";

export const metadata: Metadata = {
  title: "Dividend Tax Calculator UK 2026/27",
  description:
    "Free dividend tax calculator for 2026/27. See the tax on dividends after the £500 allowance at 10.75%, 35.75% and 39.35%, stacked on your other income.",
  alternates: { canonical: "/uk/investing/dividend-tax" },
  openGraph: ogFor("/uk/investing/dividend-tax"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/investing", label: "Pensions & Investing" },
  { href: "/uk/investing/dividend-tax", label: "Dividend Tax" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What are the dividend tax rates for 2026/27?", a: "10.75% in the basic-rate band, 35.75% in the higher-rate band and 39.35% in the additional-rate band, after a £500 tax-free allowance." },
  { q: "How much can I receive in dividends tax-free?", a: "£500, plus any unused Personal Allowance. With no other income, £13,070." },
  { q: "Did dividend tax go up in 2026?", a: "Yes. The basic and higher rates rose by 2 percentage points from 6 April 2026." },
  { q: "Do I need to file a tax return for dividends?", a: "Yes, if your dividends are £10,000 or more. Below that, HMRC can usually collect any tax through your tax code." },
  { q: "Do I pay National Insurance on dividends?", a: "No. Dividends are not subject to National Insurance." },
  { q: "Are dividends in an ISA taxed?", a: "No, and they do not use up your dividend allowance." },
  { q: "Do dividends count towards the £100,000 Personal Allowance taper?", a: "Yes. They count as income for adjusted net income, as do savings and rent." },
  { q: "Do I pay tax on reinvested dividends?", a: "Yes. Reinvesting does not change the tax; it is still your income." },
  { q: "Is there tax on dividends from shares in my employer's share plan?", a: "Dividends on shares in a Share Incentive Plan can be reinvested tax-free. Other employee shares pay taxable dividends as normal." },
  { q: "When is a dividend taxed if it is declared in March but paid in April?", a: "In the tax year it is paid, so a dividend paid on 6 April falls into the new tax year." },
  { q: "Do I get a tax credit on dividends?", a: "No. The old 10% dividend tax credit was abolished in April 2016 and replaced by the dividend allowance." },
  { q: "Are dividends from a Venture Capital Trust taxed?", a: "No. Dividends from VCT shares bought within the annual limit are tax-free." },
];

export default async function DividendPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/business/dividend-vs-salary", "/uk/investing/isa-vs-gia", "/uk/investing/capital-gains-assets", "/uk/investing/pension-tax-relief"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026/27 rates"
      title="Dividend Tax Calculator"
      lead="Work out the tax on your dividends, see how they stack on top of your salary, and find ways to pay less."
      points={["New 2026 rates", "Band by band", "Ways to pay less", "Free and private"]}
      guide={<DividendGuide />}
      faqs={FAQS}
      related={related}
      note="2026/27 rates. Not tax advice."
    >
      <DividendStudio query={query} />
    </FlagshipPage>
  );
}
