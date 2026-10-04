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
