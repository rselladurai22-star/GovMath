import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import PremiumBondsStudio from "./PremiumBondsStudio";
import { ogFor } from "@/gm/og";
import PremiumBondsGuide from "./PremiumBondsGuide";

export const metadata: Metadata = {
  title: "Premium Bonds Calculator UK: What Could I Win?",
  description:
    "Free Premium Bonds calculator. See what you could win at the current prize rate in a typical, unlucky and lucky year, compared with a savings account after tax.",
  alternates: { canonical: "/uk/investing/premium-bonds" },
  openGraph: ogFor("/uk/investing/premium-bonds"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/investing", label: "Pensions & Investing" },
  { href: "/uk/investing/premium-bonds", label: "Premium Bonds" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What is the Premium Bonds prize rate?", a: "4.35% from the September 2026 draw, with odds of 21,000 to 1 per £1 Bond each month." },
  { q: "How much will I win with £10,000?", a: "On average £435 a year, but a typical year brings about £350, because most prizes are small." },
  { q: "Are Premium Bond prizes taxed?", a: "No. Prizes are free of income tax and capital gains tax." },
  { q: "Are Premium Bonds safe?", a: "Yes. They are backed by HM Treasury, so the full amount is protected." },
  { q: "Can I lose money in Premium Bonds?", a: "You cannot lose the amount you put in, but it can lose value against inflation, and you might win nothing." },
  { q: "How are winners told?", a: "NS&I emails or texts winners if you have registered online, and you can check with the prize checker or the app." },
  { q: "What happens to Bonds when someone dies?", a: "They stay in the draw for up to 24 months after death, and any prizes go to the estate. They are then cashed in." },
  { q: "How much do I need to win regularly?", a: "With £20,000, you can expect about 11 prizes a year, worth £870 on average and about £725 in a typical year. Below about £5,000, many months bring nothing." },
  { q: "Can NS&I change the prize rate?", a: "Yes. NS&I reviews the rate in line with other savings rates and the government's funding needs, and announces changes in advance. Enter a different rate under “More options” to see the effect." },
  { q: "Do I need to declare prizes on my tax return?", a: "No. Premium Bond prizes are tax-free and do not need to be reported to HMRC." },
  { q: "Do prizes affect benefits?", a: "For means-tested benefits, the Bonds themselves count as capital, like savings. A prize adds to your capital if you keep it." },
  { q: "How quickly can I cash in?", a: "You can ask to cash in online, by phone or by post. The money usually reaches your bank account within a few working days. There is no charge and no notice period, but Bonds you cash in miss any draws after the request." },
  { q: "Can I hold Premium Bonds in an ISA?", a: "No. Premium Bonds are a separate product, with their own £50,000 limit. They do not use any of your £20,000 ISA allowance, so you can hold both, and prizes are tax-free anyway." },
];

export default async function PremiumBondsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/investing/compound-interest", "/uk/investing/inflation-impact", "/uk/investing/isa-vs-gia", "/uk/tax-and-salary/savings-interest-tax"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Savings"
      title="Premium Bonds Calculator"
      lead="See what you are likely to win in a typical year, not just the average, and compare with a savings account."
      points={["September 2026 prizes", "Typical, lucky and unlucky years", "Tax comparison", "Free and private"]}
      guide={<PremiumBondsGuide />}
      faqs={FAQS}
      related={related}
      note="Prizes are random. Results are simulated. Not financial advice."
    >
      <PremiumBondsStudio query={query} />
    </FlagshipPage>
  );
}
