import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import CdStudio from "./CdStudio";
import CdGuide from "./CdGuide";

const PATH = "/us/savings/cd-calculator";

export const metadata: Metadata = {
  title: "CD Calculator: Interest, APY and Penalties",
  description:
    "Free CD calculator for 2026. See the interest and maturity value of a certificate of deposit, the APY, tax, early withdrawal penalty and savings compared.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/savings", label: "Saving and retirement" },
  { href: PATH, label: "CD Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much interest will $10,000 earn in a CD?", a: "At 4.00% APY for 12 months, $400. Over 5 years at 3.80% APY, about $2,050. The calculator works it out for any deposit, rate and term." },
  { q: "What is the difference between APY and the interest rate?", a: "The interest rate is before compounding; the APY includes it, so it shows what you earn in a year. A 4% rate compounded daily is a 4.081% APY. Compare CDs by APY." },
  { q: "What is the average CD rate in 2026?", a: "The FDIC's national average for a 12-month CD was about 1.73% on September 21, 2026, and about 1.38% for 5 years. Online banks and credit unions often pay much more." },
  { q: "What is the penalty for cashing in a CD early?", a: "Each bank sets its own, usually a number of months of interest: often about 3 months for terms under a year, 6 months for 1 to 2 years and 12 months for longer terms. Check your CD agreement." },
  { q: "Can I lose money in a CD?", a: "Not if you hold it to maturity at an insured bank. If you cash in early and the penalty is more than the interest earned, it comes out of your deposit." },
  { q: "Are CDs FDIC insured?", a: "Yes, at FDIC-insured banks, up to $250,000 per depositor, per bank, for each ownership category. Credit union certificates have the same cover from the NCUA." },
  { q: "Is CD interest taxable?", a: "Yes, as ordinary income, in the year it is credited, even if you leave it in the CD. Your bank sends a 1099-INT. Early withdrawal penalties can be deducted." },
  { q: "Is a CD or a high-yield savings account better?", a: "A CD locks in a rate for money you will not need until a set date. A high-yield savings account keeps your money available, which suits an emergency fund, but its rate can change." },
  { q: "What is a CD ladder?", a: "Splitting your money across CDs that mature at different times, for example 1 to 5 years, then reinvesting each one as it matures. You get longer-term rates with money coming free every year." },
  { q: "What happens when my CD matures?", a: "Many CDs renew automatically into a new CD of the same term at the bank's current rate. You usually have a grace period, often 7 to 10 days, to withdraw or move the money without penalty." },
  { q: "Are Treasury bills better than CDs?", a: "Sometimes. Treasury bills are backed by the US government and their interest is free of state and local income tax, which helps in high-tax states. Compare the after-tax yield." },
  { q: "How often do CDs compound?", a: "Many compound daily or monthly. It makes little difference: 4% compounded daily is a 4.081% APY, compounded monthly 4.074%." },
  { q: "Can I add money to a CD after opening it?", a: "Usually not. Most CDs take one deposit at the start. Some banks offer add-on CDs that accept more deposits, often at a lower rate. Otherwise, open a second CD or build a ladder." },
];

export default async function CdPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/us/savings/compound-interest-calculator", "/us/savings/savings-goal-calculator", "/us/savings/roth-ira-calculator", "/us/taxes/tax-bracket-calculator", "/us/savings/retirement-calculator"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Saving and retirement"
      title="CD Calculator"
      lead="Work out what a certificate of deposit earns, its value at maturity after tax, what cashing in early costs, and how it compares with savings."
      points={["APY or rate", "Early withdrawal penalty", "After-tax interest", "CD vs savings"]}
      guide={<CdGuide />}
      faqs={FAQS}
      related={related}
      note="Estimates only. Your CD agreement sets the rate, compounding and penalty. Not financial advice."
    >
      <CdStudio query={query} />
    </FlagshipPage>
  );
}
