import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import ChildcareStudio from "./ChildcareStudio";
import ChildcareGuide from "./ChildcareGuide";

export const metadata: Metadata = {
  title: "Childcare Costs Calculator UK 2026/27: What Will I Pay?",
  description:
    "Work out what nursery, childminder or after-school care really costs after 30 funded hours, Tax-Free Childcare or Universal Credit childcare, for up to three children.",
  alternates: { canonical: "/benefits/childcare-costs" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/benefits", label: "Family & Benefits" },
  { href: "/benefits/childcare-costs", label: "Childcare Costs Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much does full-time nursery cost?", a: "It varies by area. At £8.50 an hour, 50 hours a week for 51 weeks costs £21,675 a year before any help." },
  { q: "How much do 30 free hours save?", a: "1,140 hours a year at your provider's rate: £7,980 at £7 an hour, or £9,690 at £8.50." },
  { q: "When do 30 funded hours start?", a: "In England, from the term after your child turns 9 months, if every parent works and earns under £100,000." },
  { q: "Can I use Tax-Free Childcare with funded hours?", a: "Yes. Tax-Free Childcare adds 20% to what you pay for hours not covered by funding, up to £2,000 a child a year." },
  { q: "Can I get Tax-Free Childcare and Universal Credit?", a: "No. You have to choose. Universal Credit pays 85% of costs, so it is usually worth more if you qualify." },
  { q: "How much childcare does Universal Credit pay?", a: "85% of what you pay, up to £1,071.09 a month for one child or £1,836.16 for two or more in 2026/27." },
  { q: "Does Tax-Free Childcare cover after-school clubs?", a: "Yes, if the club is registered with Ofsted or a similar body. It covers children up to 11, or 16 if disabled." },
  { q: "Are the 30 hours really free?", a: "The hours are, but providers can charge for meals, nappies and activities. These should be optional." },
  { q: "What if I am not working?", a: "Every 3 and 4-year-old gets 15 hours. Some 2-year-olds get 15 hours if you get certain benefits." },
  { q: "Does the calculator work for Scotland or Wales?", a: "It uses England's funded hours. Tax-Free Childcare and Universal Credit work the same across the UK." },
  { q: "Can grandparents be paid with Tax-Free Childcare?", a: "Only if they are a registered childminder or provider. Informal care by family cannot be paid through the scheme." },
  { q: "What counts as working for the 30 hours?", a: "Each parent expects to earn at least 16 hours a week at their minimum wage over the next three months, and under £100,000 a year." },
  { q: "Do funded hours cover holiday clubs?", a: "No. Funded hours are for children under 5 in early years settings. Holiday clubs for school-age children can be paid through Tax-Free Childcare or Universal Credit." },
  { q: "Is childcare cheaper with a childminder?", a: "Often per hour, especially for babies, but it varies by area. Registered childminders can offer funded hours too." },
];

export default async function ChildcareCostsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/benefits/free-childcare-hours", "/benefits/tax-free-childcare", "/benefits/universal-credit", "/benefits/child-benefit", "/benefits/maternity-pay", "/benefits/shared-parental-leave"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="England, 2026/27"
      title="Childcare Costs Calculator"
      lead="See what childcare really costs you after funded hours, Tax-Free Childcare or Universal Credit, for up to three children."
      points={["Funded hours from 9 months", "Tax-Free Childcare vs UC", "Up to three children", "Free and private"]}
      guide={<ChildcareGuide />}
      faqs={FAQS}
      related={related}
      note="Estimates for England. Providers set their own rates and extras, and funded hours depend on places being available."
    >
      <ChildcareStudio query={query} />
    </FlagshipPage>
  );
}
