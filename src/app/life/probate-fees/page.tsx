import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import ProbateStudio from "./ProbateStudio";
import ProbateGuide from "./ProbateGuide";

export const metadata: Metadata = {
  title: "Probate Fees Calculator (£526 from July 2026)",
  description:
    "Work out the probate fees for an estate in England and Wales: £526 for estates over £5,000 from 13 July 2026, copies at £2 or £16, and professional fees if you use a solicitor.",
  alternates: { canonical: "/life/probate-fees" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/life", label: "Everyday Life" },
  { href: "/life/probate-fees", label: "Probate Fees" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much is probate in 2026?", a: "£526 for estates over £5,000 in England and Wales, from 13 July 2026. There is no fee for estates of £5,000 or less." },
  { q: "How much are extra copies of the grant?", a: "£2 each if you order them with the application, or £16 each if you order them later." },
  { q: "Is probate cheaper if I apply myself?", a: "The court fee is the same. Applying yourself saves professional fees, which can be several thousand pounds." },
  { q: "Who pays probate fees?", a: "They are paid from the estate." },
];

export default async function ProbatePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/life/inheritance-tax", "/life/power-of-attorney", "/life/care-home-means-test", "/investing/capital-gains-assets"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Fees from July 2026"
      title="Probate Fees Calculator"
      lead="Work out the court fees for probate in England and Wales, the cost of copies, and what professional help adds."
      points={["£526 court fee", "Copies now or later", "Professional fees", "Free and private"]}
      guide={<ProbateGuide />}
      faqs={FAQS}
      related={related}
      note="Court fees from 13 July 2026. Not legal advice."
    >
      <ProbateStudio query={query} />
    </FlagshipPage>
  );
}
