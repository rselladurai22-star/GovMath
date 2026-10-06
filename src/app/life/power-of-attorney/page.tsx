import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import LpaStudio from "./LpaStudio";
import LpaGuide from "./LpaGuide";

export const metadata: Metadata = {
  title: "Power of Attorney Cost Calculator (LPA Fees 2026)",
  description:
    "Work out what Lasting Powers of Attorney cost in England and Wales: £92 per LPA, fee reductions and exemptions, solicitor fees, and how it compares with a Court of Protection deputyship.",
  alternates: { canonical: "/life/power-of-attorney" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/life", label: "Everyday Life" },
  { href: "/life/power-of-attorney", label: "Power of Attorney" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much does a Lasting Power of Attorney cost?", a: "£92 to register each LPA in England and Wales. Both types cost £184, and a couple making both pays £368." },
  { q: "Can I get the LPA fee reduced?", a: "Yes. The fee is halved if your income is under £12,000, and may be waived if you get certain means-tested benefits." },
  { q: "What happens if there is no LPA?", a: "Your family may need to apply to the Court of Protection to become a deputy, which costs £532 to apply and £320 a year in supervision fees." },
  { q: "Do I need a solicitor?", a: "No. You can make and register an LPA yourself online." },
  { q: "Do I need a solicitor to make an LPA?", a: "No. Many people make their own online. A solicitor can help if your situation is complex." },
  { q: "Does my husband or wife automatically have power of attorney?", a: "No. Being married does not give the right to manage your finances or make health decisions for you." },
  { q: "Is an LPA the same as a will?", a: "No. An LPA works while you are alive. A will takes over after your death." },
  { q: "Can I use the LPA before I lose capacity?", a: "A property and financial affairs LPA can be used straight away if you choose. A health and welfare LPA cannot." },
  { q: "How many attorneys can I have?", a: "There is no fixed limit, but most people choose one to four, plus replacements." },
  { q: "Can my attorneys be paid?", a: "Family members usually act for free, claiming only expenses. Professional attorneys, such as solicitors, charge fees that you agree in the LPA." },
  { q: "Does an old Enduring Power of Attorney still work?", a: "Yes, if it was signed before October 2007. It covers only property and money, and must be registered with the OPG once the donor is losing capacity." },
  { q: "Can I make an LPA for a parent?", a: "You can help, but the parent must make it themselves while they have capacity and choose their own attorneys." },
];

export default async function LpaPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/life/inheritance-tax", "/life/probate-fees", "/life/care-home-means-test", "/benefits/attendance-allowance"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026 fees"
      title="Power of Attorney Cost Calculator"
      lead="Work out what Lasting Powers of Attorney cost, with fee help and solicitor fees, and how that compares with a court deputyship."
      points={["£92 per LPA", "Fee reductions", "Deputyship comparison", "Free and private"]}
      guide={<LpaGuide />}
      faqs={FAQS}
      related={related}
      note="England and Wales fees. Not legal advice."
    >
      <LpaStudio query={query} />
    </FlagshipPage>
  );
}
