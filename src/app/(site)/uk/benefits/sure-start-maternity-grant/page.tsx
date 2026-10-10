import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import GrantStudio from "./GrantStudio";
import { ogFor } from "@/gm/og";
import GrantGuide from "./GrantGuide";

export const metadata: Metadata = {
  title: "Sure Start Maternity Grant Checker 2026",
  description:
    "Free checker for the £500 Sure Start Maternity Grant and Scotland's Best Start Grant. See if you qualify, how much you could get and the deadline to claim.",
  alternates: { canonical: "/uk/benefits/sure-start-maternity-grant" },
  openGraph: ogFor("/uk/benefits/sure-start-maternity-grant"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/benefits", label: "Family & Benefits" },
  { href: "/uk/benefits/sure-start-maternity-grant", label: "Sure Start Maternity Grant Checker" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much is the Sure Start Maternity Grant?", a: "£500, paid once. It does not have to be paid back." },
  { q: "Who can get the Sure Start Maternity Grant?", a: "Families getting Universal Credit, Pension Credit, income-based JSA, income-related ESA or Income Support who are expecting their first child." },
  { q: "Can I get the grant for a second baby?", a: "Usually not in England, Wales or Northern Ireland, unless you are expecting twins or more. In Scotland the Best Start Grant pays £398.35 for later children." },
  { q: "How much do I get for twins?", a: "£1,000 if you have no other children under 16, or £500 if you already have a child under 16." },
  { q: "When can I claim the Sure Start Maternity Grant?", a: "From 11 weeks before your due date until the baby is 6 months old." },
  { q: "How do I apply?", a: "Fill in form SF100 and send it to the DWP. A midwife or health visitor must sign part of it." },
  { q: "Does the grant affect my Universal Credit?", a: "No. It is ignored as income and is not taxable." },
  { q: "What is the Best Start Grant in Scotland?", a: "Scotland's version: £796.65 for a first child and £398.35 for later children in 2026/27, plus later payments at nursery and school age." },
  { q: "Can I get the grant if I adopt?", a: "Yes, if you adopt or become the guardian of a child under 12 months and get a qualifying benefit." },
  { q: "Do I need to be on benefits already?", a: "You or your partner must get a qualifying benefit when you claim. If you are waiting for a decision, claim anyway within the time limit." },
  { q: "Is the Sure Start Maternity Grant taxable?", a: "No. It is tax-free and does not affect other benefits." },
  { q: "Can fathers or partners claim the grant?", a: "Yes. Either the mother or her partner can claim, as long as one of them gets a qualifying benefit." },
  { q: "What if my baby is stillborn?", a: "You can still claim the grant if the pregnancy lasted at least 24 weeks, within the same time limit." },
  { q: "Can I claim if I am under 16?", a: "Yes, in some cases on the strength of your parents' qualifying benefit. You do not need to be getting a benefit yourself." },
];

export default async function MaternityGrantPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/life/healthy-start", "/uk/benefits/child-benefit", "/uk/benefits/maternity-pay", "/uk/benefits/universal-credit", "/uk/benefits/benefits-checker", "/uk/benefits/childcare-costs"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026/27 rules"
      title="Sure Start Maternity Grant Checker"
      lead="Check whether you can get the £500 Sure Start Maternity Grant, or Scotland’s Best Start Grant, and when to claim."
      points={["£500 grant", "Scotland's Best Start Grant", "Twins and exceptions", "Free and private"]}
      guide={<GrantGuide />}
      faqs={FAQS}
      related={related}
      note="A guide to the rules. The DWP or Social Security Scotland decides each claim, and some exceptions apply."
    >
      <GrantStudio query={query} />
    </FlagshipPage>
  );
}
