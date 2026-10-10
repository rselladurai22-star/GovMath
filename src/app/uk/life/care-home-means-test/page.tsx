import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import CareStudio from "./CareStudio";
import { ogFor } from "@/gm/og";
import CareGuide from "./CareGuide";

export const metadata: Metadata = {
  title: "Care Home Fees Calculator 2026/27: Who Pays?",
  description:
    "Free care home fees calculator for England, Scotland, Wales and NI. See what you pay from income and savings, and when the council starts to help.",
  alternates: { canonical: "/uk/life/care-home-means-test" },
  openGraph: ogFor("/uk/life/care-home-means-test"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/life", label: "Everyday Life" },
  { href: "/uk/life/care-home-means-test", label: "Care Home Means Test" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much savings can you have before paying for a care home?", a: "In England, if your capital is over £23,250 you pay in full. Between £14,250 and £23,250 you pay part. Scotland's limits are £36,750 and £22,750, and Wales has a single £50,000 limit." },
  { q: "Is my house counted for care home fees?", a: "After 12 weeks of permanent care, unless a partner or a relative aged 60 or over, or who is disabled, still lives there." },
  { q: "How much do you keep if the council pays?", a: "A personal expenses allowance of £31.80 a week in England in 2026/27." },
  { q: "What is tariff income?", a: "£1 a week of assumed income for each £250 of capital above the lower limit." },
  { q: "Will I have to sell my house to pay for care?", a: "Not if a partner or qualifying relative lives there. Otherwise, a deferred payment agreement can delay a sale until after death." },
  { q: "Does the council take my State Pension?", a: "If it funds your place, most of your income goes towards fees, but you keep the personal expenses allowance." },
  { q: "Are care fees the same for self-funders?", a: "Self-funders often pay more than councils for the same room. Ask the home for its rates for both." },
  { q: "Can I get Attendance Allowance in a care home?", a: "Yes, if you pay your own fees. It stops after 28 days if the council funds you." },
  { q: "Does the council count my partner's savings?", a: "No. Only your own capital and your share of anything held jointly is assessed." },
  { q: "What if my savings run out while I am self-funding?", a: "The council will take over funding once you are below the upper limit, but it may ask you to move if the home costs more than its rate and nobody can pay a top-up." },
  { q: "Are care home fees the same in a nursing home?", a: "Nursing homes usually cost more, but in England the NHS pays £267.68 a week towards the nursing part." },
];

export default async function CarePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/benefits/attendance-allowance", "/uk/benefits/pension-credit", "/uk/life/power-of-attorney", "/uk/life/inheritance-tax"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026/27 limits"
      title="Care Home Means Test Calculator"
      lead="Find out who pays for a care home, what you contribute each week, and how long your savings would last."
      points={["All four UK nations", "Your home and top-ups", "Savings projection", "Free and private"]}
      guide={<CareGuide />}
      faqs={FAQS}
      related={related}
      note="2026/27 limits. Not financial advice."
    >
      <CareStudio query={query} />
    </FlagshipPage>
  );
}
