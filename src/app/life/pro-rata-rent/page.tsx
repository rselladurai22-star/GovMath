import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import ProRataStudio from "./ProRataStudio";
import ProRataGuide from "./ProRataGuide";

export const metadata: Metadata = {
  title: "Pro-Rata Rent Calculator UK: Daily Rent for Part of a Month",
  description:
    "Work out rent for part of a month when you move in or out, using the annual (× 12 ÷ 365) or calendar month method, with weekly rent conversion and deposit caps.",
  alternates: { canonical: "/life/pro-rata-rent" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/life", label: "Everyday Life" },
  { href: "/life/pro-rata-rent", label: "Pro-Rata Rent" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How do you calculate pro-rata rent?", a: "Most agents multiply the monthly rent by 12, divide by 365 for a daily rate, then multiply by the number of days, counting the first and last day." },
  { q: "How do I work out daily rent?", a: "Multiply the monthly rent by 12 and divide by 365 (366 in a leap year). On £1,000 a month that is £32.88 a day, so 10 days cost £328.77." },
  { q: "How do I convert weekly rent to monthly?", a: "Multiply by 52 and divide by 12. £300 a week is £1,300 a month." },
  { q: "How much can a landlord ask for a deposit?", a: "In England, 5 weeks' rent if the annual rent is under £50,000, or 6 weeks' if it is higher. A holding deposit is capped at 1 week's rent." },
  { q: "Do I pay rent for the day I move in?", a: "Yes. Rent is normally charged from the first day of the tenancy." },
];

export default async function ProRataPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/life/right-to-rent", "/life/days-between-dates", "/benefits/local-housing-allowance", "/property/rent-vs-buy", "/property/rent-increase", "/property/deposit-return"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Part-month rent"
      title="Pro-Rata Rent Calculator"
      lead="Work out the rent for part of a month when you move in or out, using the method your landlord is likely to use."
      points={["Both methods", "Weekly or monthly rent", "Deposit caps", "Free and private"]}
      guide={<ProRataGuide />}
      faqs={FAQS}
      related={related}
      note="Your tenancy agreement decides the method."
    >
      <ProRataStudio query={query} />
    </FlagshipPage>
  );
}
