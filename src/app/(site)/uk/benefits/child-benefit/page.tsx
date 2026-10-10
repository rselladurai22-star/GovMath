import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import ChildBenefitStudio from "./ChildBenefitStudio";
import { ogFor } from "@/gm/og";
import ChildBenefitGuide from "./ChildBenefitGuide";

export const metadata: Metadata = {
  title: "Child Benefit Calculator 2026/27: How Much?",
  description:
    "Free Child Benefit calculator for 2026/27. See how much you get each week, month and year for each child, plus the High Income Child Benefit Charge.",
  alternates: { canonical: "/uk/benefits/child-benefit" },
  openGraph: ogFor("/uk/benefits/child-benefit"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/benefits", label: "Family & Benefits" },
  { href: "/uk/benefits/child-benefit", label: "Child Benefit" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much is Child Benefit in 2026/27?", a: "£27.05 a week for the eldest or only child and £17.90 a week for each other child, paid every four weeks." },
  { q: "Is there a limit on how many children I can claim for?", a: "No. Every child after the eldest gets £17.90 a week." },
  { q: "Who can claim Child Benefit?", a: "Anyone responsible for a child under 16, or under 20 in approved education or training, who meets the residence rules. Only one person can claim for each child." },
  { q: "How far back can Child Benefit be backdated?", a: "Three months from the date of the claim, so claim soon after a birth." },
  { q: "Does high income affect Child Benefit?", a: "If either parent's adjusted net income is over £60,000, the higher earner repays 1% for every £200 above it, and all of it at £80,000." },
  { q: "Is Child Benefit taxed?", a: "Not as income. The only tax link is the High Income Child Benefit Charge for incomes over £60,000." },
  { q: "Is there a limit on the number of children?", a: "No. You get £17.90 a week for every child after the eldest." },
  { q: "Can I claim if I am not the parent?", a: "Yes, if you are responsible for the child, such as a grandparent they live with." },
  { q: "What if my child goes to university?", a: "Child Benefit stops, because higher education is not approved education for Child Benefit." },
  { q: "Does Child Benefit affect my tax code?", a: "Not by itself. If you pay the High Income Child Benefit Charge, you can choose to pay it through your tax code instead of Self Assessment." },
  { q: "Can I get Child Benefit for a child born abroad?", a: "Yes, if you live in the UK, are responsible for the child and meet the residence rules." },
  { q: "Can I get Child Benefit for a stepchild?", a: "Yes, if the child lives with you and you are responsible for them, and nobody else is claiming for them." },
  { q: "Is Child Benefit paid during the school holidays for a 17-year-old?", a: "Yes. Breaks between terms, and the summer after finishing a course, are covered as long as they are continuing in approved education or have just finished it." },
  { q: "What if both parents want to claim?", a: "Only one person can get it for each child. If you cannot agree, HMRC decides, usually in favour of the parent the child mainly lives with." },
];

export default async function ChildBenefitPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/benefits/high-income-child-benefit", "/uk/benefits/free-childcare-hours", "/uk/benefits/tax-free-childcare", "/uk/benefits/universal-credit", "/uk/benefits/maternity-pay", "/uk/benefits/benefit-cap"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026/27 rates"
      title="Child Benefit Calculator"
      lead="See how much Child Benefit you get for your family, when it is paid, and whether the high income charge takes any back."
      points={["Every child counts", "Part-year claims", "High income check", "Free and private"]}
      guide={<ChildBenefitGuide />}
      faqs={FAQS}
      related={related}
      note="2026/27 Child Benefit rates. Not financial advice."
    >
      <ChildBenefitStudio query={query} />
    </FlagshipPage>
  );
}
