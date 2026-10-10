import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import ProbateStudio from "./ProbateStudio";
import { ogFor } from "@/gm/og";
import ProbateGuide from "./ProbateGuide";

export const metadata: Metadata = {
  title: "Probate Fees Calculator UK 2026",
  description:
    "Free probate fees calculator for England and Wales. See the £526 fee for estates over £5,000, extra copies at £2 or £16, and the cost of using a solicitor.",
  alternates: { canonical: "/uk/life/probate-fees" },
  openGraph: ogFor("/uk/life/probate-fees"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/life", label: "Everyday Life" },
  { href: "/uk/life/probate-fees", label: "Probate Fees" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much is probate in 2026?", a: "£526 for estates over £5,000 in England and Wales, from 13 July 2026. There is no fee for estates of £5,000 or less." },
  { q: "How much are extra copies of the grant?", a: "£2 each if you order them with the application, or £16 each if you order them later." },
  { q: "Is probate cheaper if I apply myself?", a: "The court fee is the same. Applying yourself saves professional fees, which can be several thousand pounds." },
  { q: "Who pays probate fees?", a: "They are paid from the estate." },
  { q: "Who pays the probate fee?", a: "The estate. The executor can pay it and claim it back from the estate." },
  { q: "Is the fee different with a solicitor?", a: "No. The court fee is £526 either way. A solicitor charges their own fees on top." },
  { q: "Is the fee based on the size of the estate?", a: "Only to decide whether it is over £5,000. Above that, every estate pays £526." },
  { q: "Can I get help with the fee?", a: "You may be able to apply for Help with Fees if you have a low income and limited savings." },
  { q: "Do I need probate for a small estate?", a: "Often not. If there is no property in the person's sole name and the banks will release the balances, you may not need a grant at all, and there is no fee for estates of £5,000 or less." },
  { q: "Can more than one executor apply?", a: "Yes. Up to four people can be named on the grant. One executor can apply and the others confirm online." },
  { q: "What if I do not want to be an executor?", a: "You can step aside by signing a renunciation, or have power reserved so you can act later if needed." },
  { q: "Is the probate fee refundable if the estate turns out to be small?", a: "Contact the probate service. Fees paid in error can sometimes be refunded." },
  { q: "How long do I have to apply for probate?", a: "There is no strict deadline, but Inheritance Tax is due six months after the death and interest is charged after that. Delays also leave property empty and accounts frozen." },
];

export default async function ProbatePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/life/inheritance-tax", "/uk/life/power-of-attorney", "/uk/life/care-home-means-test", "/uk/investing/capital-gains-assets"].includes(c.href));
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
