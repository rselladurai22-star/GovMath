import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import JisaStudio from "./JisaStudio";
import { ogFor } from "@/gm/og";
import JisaGuide from "./JisaGuide";

export const metadata: Metadata = {
  title: "Junior ISA Calculator UK 2026/27",
  description:
    "Free Junior ISA calculator. See what monthly or lump-sum saving could be worth at 18, cash or stocks and shares, within the £9,000 yearly limit.",
  alternates: { canonical: "/uk/investing/junior-isa" },
  openGraph: ogFor("/uk/investing/junior-isa"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/investing", label: "Pensions & Investing" },
  { href: "/uk/investing/junior-isa", label: "Junior ISA Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much can I put in a Junior ISA?", a: "Up to £9,000 a year in total across a child's cash and stocks and shares Junior ISAs, from anyone." },
  { q: "What will £100 a month in a Junior ISA be worth at 18?", a: "About £34,500 at 5% a year growth, from £21,600 paid in. At 2% it would be about £25,900." },
  { q: "Can I take money out of a Junior ISA?", a: "No, not before the child is 18, unless they are terminally ill." },
  { q: "Who owns the money in a Junior ISA?", a: "The child. At 18 it becomes an adult ISA in their name and they decide what to do with it." },
  { q: "Can grandparents pay into a Junior ISA?", a: "Yes. Once a parent has opened it, anyone can pay in, within the £9,000 yearly allowance." },
  { q: "Cash or stocks and shares Junior ISA?", a: "Shares have usually grown more over 18 years but can fall. Cash is safer but may not keep up with inflation." },
  { q: "Is a Junior ISA taxed?", a: "No. Interest, dividends and gains are all tax-free, and the £100 parental gift rule does not apply." },
  { q: "What happens to a Child Trust Fund?", a: "It can be transferred into a Junior ISA. At 18 it can be taken out or moved into an adult ISA." },
  { q: "Can a child have more than one Junior ISA?", a: "One cash and one stocks and shares Junior ISA, sharing the £9,000 allowance." },
  { q: "When does a child control their Junior ISA?", a: "From 16 they can manage it, but they cannot withdraw until 18." },
  { q: "Does a Junior ISA affect my Universal Credit?", a: "No. The money belongs to the child, so it is not counted as your savings." },
  { q: "Can I switch Junior ISA provider?", a: "Yes. Ask the new provider to arrange a transfer so the money keeps its tax-free status." },
  { q: "What is the minimum I can pay into a Junior ISA?", a: "It depends on the provider; many accept £10 or £25 a month, or one-off payments." },
  { q: "What happens to a Junior ISA if the child dies?", a: "The money passes to the child's estate, usually to the parents, under the normal rules." },
  { q: "Can I move a Child Trust Fund into a Junior ISA?", a: "Yes. Ask the Junior ISA provider to arrange the transfer; the Child Trust Fund then closes." },
];

export default async function JuniorIsaPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/investing/compound-interest", "/uk/investing/savings-interest", "/uk/investing/isa-vs-gia", "/uk/investing/premium-bonds", "/uk/benefits/child-benefit", "/uk/students/degree-cost"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026/27 rules"
      title="Junior ISA Calculator"
      lead="See what regular saving into a Junior ISA could grow to by your child’s 18th birthday, in cash or invested."
      points={["Cash or shares", "Fees and inflation", "£9,000 allowance check", "Free and private"]}
      guide={<JisaGuide />}
      faqs={FAQS}
      related={related}
      note="An illustration with steady growth. Investments can fall as well as rise."
    >
      <JisaStudio query={query} />
    </FlagshipPage>
  );
}
