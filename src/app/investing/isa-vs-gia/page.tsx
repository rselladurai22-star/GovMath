import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import IsaStudio from "./IsaStudio";
import IsaGuide from "./IsaGuide";

export const metadata: Metadata = {
  title: "ISA vs GIA Calculator: How Much Tax an ISA Saves (2026/27)",
  description:
    "Compare a stocks and shares ISA with a general investment account over any number of years, with dividend tax, savings tax, Capital Gains Tax and the 2027 changes.",
  alternates: { canonical: "/investing/isa-vs-gia" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/investing", label: "Pensions & Investing" },
  { href: "/investing/isa-vs-gia", label: "ISA vs GIA" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "Is an ISA better than a general investment account?", a: "Yes, for most people, because dividends, interest and gains in an ISA are tax-free. A GIA pays tax once you pass the small allowances." },
  { q: "What is the ISA allowance for 2026/27?", a: "£20,000 a year across all your ISAs." },
  { q: "What changes to ISAs are coming?", a: "From 6 April 2027, savers under 65 can put at most £12,000 a year into cash ISAs. The overall limit stays at £20,000." },
  { q: "What is bed and ISA?", a: "Selling investments in a general account and buying them back inside an ISA, so future growth is tax-free." },
  { q: "Do I need to report my ISA to HMRC?", a: "No. ISA income and gains do not go on a tax return." },
  { q: "Can I have more than one ISA?", a: "Yes. You can open several, as long as your total payments stay within £20,000 a year." },
  { q: "What happens to an ISA when I die?", a: "It stays tax-free until the estate is settled, and a spouse can inherit an extra ISA allowance equal to its value." },
  { q: "Does an ISA protect from Inheritance Tax?", a: "No. ISAs count towards your estate for Inheritance Tax." },
  { q: "Can I lose money in a stocks and shares ISA?", a: "Yes. The ISA only changes the tax; the investments inside can still fall in value." },
  { q: "Should I choose a cash ISA or a stocks and shares ISA?", a: "Cash suits money you need within about five years. For longer periods, shares have usually grown faster than cash, though with ups and downs along the way." },
  { q: "Do I get the ISA allowance if I live abroad?", a: "You can keep an existing ISA, but you cannot pay into one while you are not resident in the UK, with limited exceptions." },
  { q: "Does it matter when in the tax year I invest?", a: "Investing early in the tax year gives the money longer to grow tax-free, but regular monthly investing works well too." },
  { q: "Is the calculator's growth rate realistic?", a: "It is your choice. Lower growth makes the ISA advantage smaller, higher growth makes it bigger. Try a range of rates to see how sensitive the result is." },
];

export default async function IsaPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/investing/dividend-tax", "/investing/capital-gains-assets", "/investing/compound-interest", "/investing/pension-tax-relief", "/investing/premium-bonds", "/investing/inflation-impact"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026/27 rules"
      title="ISA vs GIA Calculator"
      lead="See how much more you keep by investing through an ISA rather than a general investment account, year by year."
      points={["All three taxes", "Year-by-year chart", "2027 changes", "Free and private"]}
      guide={<IsaGuide />}
      faqs={FAQS}
      related={related}
      note="Illustration only. Not financial advice."
    >
      <IsaStudio query={query} />
    </FlagshipPage>
  );
}
