import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import RightToRentStudio from "./RightToRentStudio";
import { ogFor } from "@/gm/og";
import RightToRentGuide from "./RightToRentGuide";

export const metadata: Metadata = {
  title: "Right to Rent Check Calculator (England)",
  description:
    "Free right to rent checker for landlords in England. See when follow-up checks are due for time-limited permission, and the civil penalties.",
  alternates: { canonical: "/uk/life/right-to-rent" },
  openGraph: ogFor("/uk/life/right-to-rent"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/life", label: "Everyday Life" },
  { href: "/uk/life/right-to-rent", label: "Right to Rent" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "When should a Right to Rent check be done?", a: "No more than 28 days before the tenancy starts, for every adult who will live there." },
  { q: "What is the fine for not doing a Right to Rent check?", a: "Up to £5,000 per lodger and £10,000 per occupier for a first breach, and £10,000 and £20,000 for a repeat breach." },
  { q: "When is a follow-up check needed?", a: "For tenants with time-limited permission, before the later of their permission ending and 12 months after the previous check." },
  { q: "Do Right to Rent checks apply in Wales or Scotland?", a: "No. They only apply in England." },
  { q: "Do I need to check British tenants?", a: "Yes. Every adult must be checked, including British citizens." },
  { q: "Do I need to check again when a tenancy renews?", a: "Not for the same tenant with the same landlord, unless their permission is time-limited." },
  { q: "Can I charge for the check?", a: "No. The Tenant Fees Act bans charging tenants for Right to Rent checks." },
  { q: "What if my tenant's visa is being renewed?", a: "Use the Landlord Checking Service, which can confirm their right to rent while an application is pending." },
  { q: "Can I check a tenant by video call?", a: "Yes, for a manual document check, as long as you have the original documents in your possession during the call." },
  { q: "What if a tenant's share code does not work?", a: "Share codes expire after a set period. Ask the tenant to generate a new one. If they still cannot prove their right to rent, use the Landlord Checking Service." },
  { q: "Does a guarantor need a Right to Rent check?", a: "No, unless they will also live in the property." },
  { q: "Do I need to check an adult child who moves back in?", a: "Yes, if they will live there as their main home and you are their landlord under a tenancy or lodging arrangement." },
  { q: "Are there free resources to help landlords?", a: "The Home Office publishes the code of practice, document lists and a landlord helpline. Landlord associations also offer guidance." },
];

export default async function RightToRentPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/life/pro-rata-rent", "/uk/property/rent-a-room", "/uk/benefits/local-housing-allowance", "/uk/life/days-between-dates", "/uk/property/deposit-return", "/uk/property/rent-increase"].includes(c.href));
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
