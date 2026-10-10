import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import DepositStudio from "./DepositStudio";
import { ogFor } from "@/gm/og";
import DepositGuide from "./DepositGuide";

export const metadata: Metadata = {
  title: "Tenancy Deposit Calculator UK",
  description:
    "Free tenancy deposit calculator. Check the legal deposit cap, fair deductions with wear and tear apportioned, and how much you should get back.",
  alternates: { canonical: "/uk/property/deposit-return" },
  openGraph: ogFor("/uk/property/deposit-return"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/property", label: "Mortgages & Property" },
  { href: "/uk/property/deposit-return", label: "Deposit Return" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What is the maximum deposit a landlord can ask for?", a: "In England, 5 weeks' rent if the yearly rent is under £50,000, or 6 weeks' if it is £50,000 or more. In Scotland it is 2 months' rent and in Northern Ireland 1 month's rent." },
  { q: "What can a landlord deduct from a deposit?", a: "Unpaid rent or bills, cleaning to return the home to its condition at check-in, and damage beyond fair wear and tear. They cannot charge for normal wear from everyday living." },
  { q: "How is fair wear and tear worked out?", a: "Deposit schemes look at the age and expected life of an item. If a carpet that lasts about 8 years was 5 years old, a landlord can usually charge only for the 3 years it had left: 37.5% of the cost of a new one." },
  { q: "How long does a landlord have to return a deposit?", a: "In England and Wales, within 10 days of you both agreeing how much you will get back." },
  { q: "What if my deposit was not protected?", a: "In England and Wales a court can order the landlord to pay you 1 to 3 times the deposit, as well as returning it. In Scotland it can be up to 3 times." },
  { q: "How do I dispute deductions?", a: "Use your deposit scheme's free dispute resolution service. Send your check-in and check-out reports, photos and receipts. The landlord must show each deduction is justified." },
  { q: "Can a landlord charge for professional cleaning?", a: "Only if the home was professionally cleaned at the start and was not left in the same condition. A clause requiring it regardless is likely unfair." },
  { q: "Can the landlord keep my deposit for unpaid rent?", a: "Yes, if rent is owed at the end. The amount must match what is actually owed." },
  { q: "What if my landlord sold the property?", a: "The deposit should transfer to the new landlord, who becomes responsible for protecting and returning it." },
  { q: "Do I get interest on my deposit?", a: "Usually not. Some custodial schemes keep the interest to run the service." },
];

export default async function DepositReturnPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/property/rent-increase", "/uk/life/pro-rata-rent", "/uk/life/right-to-rent", "/uk/property/moving-house-budget", "/uk/property/rent-vs-buy", "/uk/benefits/local-housing-allowance"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026 rules"
      title="Tenancy Deposit Return Calculator"
      lead="Check your deposit is within the legal limit, see which deductions are fair after wear and tear, and work out what you should get back."
      points={["Deposit caps in all four nations", "Wear and tear by item age", "Unprotected deposit penalties", "Free and private"]}
      guide={<DepositGuide />}
      faqs={FAQS}
      related={related}
      note="General information, not legal advice. Your deposit scheme decides any dispute."
    >
      <DepositStudio query={query} />
    </FlagshipPage>
  );
}
