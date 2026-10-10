import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import AnnuityStudio from "./AnnuityStudio";
import { ogFor } from "@/gm/og";
import AnnuityGuide from "./AnnuityGuide";

export const metadata: Metadata = {
  title: "Annuity Calculator UK: Income From Your Pension",
  description:
    "Free annuity calculator. See the yearly and monthly income your pension could buy, after tax-free cash and Income Tax, and how it compares with drawdown.",
  alternates: { canonical: "/uk/investing/annuity" },
  openGraph: ogFor("/uk/investing/annuity"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/investing", label: "Pensions & Investing" },
  { href: "/uk/investing/annuity", label: "Annuity Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much annuity will £100,000 buy?", a: "At a 7.5% rate, £100,000 buys £7,500 a year before tax. After taking 25% tax-free first, the remaining £75,000 buys £5,625 a year." },
  { q: "What are annuity rates in 2026?", a: "According to Which?, the best level single-life rates for a healthy 65-year-old have been above 7.5% since the start of 2025." },
  { q: "Is annuity income taxed?", a: "Yes. Income from a pension annuity is taxed like a salary, added to your State Pension and other income." },
  { q: "Can I take tax-free cash and buy an annuity?", a: "Yes. Most people take up to 25% tax-free first and use the rest to buy the annuity." },
  { q: "What is an enhanced annuity?", a: "A higher rate for smokers and people with health conditions, because the insurer expects to pay for fewer years." },
  { q: "Should I choose a level or increasing annuity?", a: "Level pays more at first; increasing keeps pace with inflation. Increasing suits people expecting a long retirement." },
  { q: "What happens to an annuity when I die?", a: "A single-life annuity stops, unless you add a guarantee period, value protection or a joint-life pension for a partner." },
  { q: "Can I cancel an annuity?", a: "Usually not once the cancellation period ends. That is why it pays to shop around and choose options carefully." },
  { q: "Is an annuity better than drawdown?", a: "An annuity guarantees income for life; drawdown is flexible but can run out. Many people use both." },
  { q: "Do annuity rates go up with age?", a: "Yes. The older you are when you buy, the higher the rate, because the insurer expects to pay for fewer years." },
  { q: "Can I buy an annuity with a small pension pot?", a: "Yes, but small pots of £10,000 or less can often be taken as cash instead, with 25% tax-free." },
  { q: "Does annuity income affect Pension Credit?", a: "Yes. It counts as income for Pension Credit, Housing Benefit and Council Tax Reduction." },
  { q: "Can I buy an annuity with part of my pension?", a: "Yes. You can use part of your pot for an annuity and keep the rest in drawdown." },
  { q: "Can I get an annuity if I am in poor health?", a: "Yes, and often at a better rate. An enhanced annuity pays more if your health or lifestyle means a shorter life expectancy." },
  { q: "Is an annuity protected if the insurer fails?", a: "Yes. Annuities from UK insurers are protected in full by the Financial Services Compensation Scheme." },
];

export default async function AnnuityPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/investing/pension-drawdown", "/uk/investing/state-pension-age", "/uk/investing/workplace-pension", "/uk/benefits/pension-credit", "/uk/investing/inflation-impact", "/uk/investing/pension-tax-relief"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026/27 rules"
      title="Annuity Calculator"
      lead="See how much guaranteed income your pension pot could buy, what you keep after tax, and how it compares with drawdown."
      points={["Your annuity rate", "Tax with State Pension", "Payback age", "Free and private"]}
      guide={<AnnuityGuide />}
      faqs={FAQS}
      related={related}
      note="Annuity rates change daily and depend on your age, health and choices. Get real quotes before you buy."
    >
      <AnnuityStudio query={query} />
    </FlagshipPage>
  );
}
