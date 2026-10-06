import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import RightToRentStudio from "./RightToRentStudio";
import RightToRentGuide from "./RightToRentGuide";

export const metadata: Metadata = {
  title: "Right to Rent Check Dates and Penalties (England)",
  description:
    "Work out when to do a Right to Rent check, which method to use, when a follow-up check is due, and the penalties of up to £10,000 per occupier for a first breach.",
  alternates: { canonical: "/life/right-to-rent" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/life", label: "Everyday Life" },
  { href: "/life/right-to-rent", label: "Right to Rent" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "When should a Right to Rent check be done?", a: "No more than 28 days before the tenancy starts, for every adult who will live there." },
  { q: "What is the fine for not doing a Right to Rent check?", a: "Up to £5,000 per lodger and £10,000 per occupier for a first breach, and £10,000 and £20,000 for a repeat breach." },
  { q: "When is a follow-up check needed?", a: "For tenants with time-limited permission, before the later of their permission ending and 12 months after the previous check." },
  { q: "Do Right to Rent checks apply in Wales or Scotland?", a: "No. They only apply in England." },
];

export default async function RightToRentPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/life/pro-rata-rent", "/property/rent-a-room", "/benefits/local-housing-allowance", "/life/days-between-dates", "/property/deposit-return", "/property/rent-increase"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="England"
      title="Right to Rent Checker"
      lead="Work out when to check a tenant's right to rent, how to do it, when to check again, and what is at stake."
      points={["28-day window", "Follow-up dates", "Penalty estimate", "Free and private"]}
      guide={<RightToRentGuide />}
      faqs={FAQS}
      related={related}
      note="England only. Not legal advice."
    >
      <RightToRentStudio query={query} />
    </FlagshipPage>
  );
}
