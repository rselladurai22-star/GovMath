import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import LeaseStudio from "./LeaseStudio";
import LeaseGuide from "./LeaseGuide";

const PATH = "/uk/property/lease-extension";

export const metadata: Metadata = {
  title: "Lease Extension Calculator: Premium for a Flat",
  description:
    "Free lease extension calculator for flats in England and Wales. Estimate the premium, marriage value under 80 years and costs, and the 2024 Act method.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/property", label: "Mortgages & Property" },
  { href: PATH, label: "Lease Extension Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "How much does it cost to extend a lease?",
    a: "It depends on the flat's value, the years left and the ground rent. For a £250,000 flat with a £250 ground rent, the premium under the current rules is about £8,615 with 81 years left, £20,142 with 75 years and £34,691 with 60 years, plus legal and valuation costs.",
  },
  {
    q: "What is marriage value?",
    a: "The extra value created when a short lease is extended, because a flat on a long lease is worth more than the short lease and the freeholder's interest put together. When 80 years or fewer are left, the freeholder gets half of it as part of the premium.",
  },
  {
    q: "Why is 80 years so important?",
    a: "If more than 80 years are left on the date you serve your formal notice, marriage value is nil by law. Once the lease reaches 80 years it applies in full, so the premium jumps. In our example it goes from £8,615 at 81 years to £16,548 at 80 years.",
  },
  {
    q: "Has marriage value been abolished?",
    a: "Not yet. The Leasehold and Freehold Reform Act 2024 abolishes it, but that part is not in force. The government still has to set the valuation rates and fix parts of the Act, and freeholders' legal challenge is going to the Court of Appeal. No start date has been announced.",
  },
  {
    q: "What is the deferment rate?",
    a: "The rate used to discount the freeholder's right to get the flat back when the lease ends. Since the Sportelli case in 2006 and 2007, tribunals have used 5% for flats and 4.75% for houses. A higher rate gives a lower premium.",
  },
  {
    q: "What is the capitalisation rate?",
    a: "The rate used to turn the ground rent for the rest of the lease into a lump sum. Tribunal decisions have used 4.5% to 9%, most often 6% to 7%. It matters most when the ground rent is high or rises over time.",
  },
  {
    q: "What is relativity?",
    a: "The value of your flat with its current lease, assuming no right to extend, as a share of its freehold value. It is used to work out marriage value. Our default comes from a published relativity table; a valuer may use a different figure, especially outside London.",
  },
  {
    q: "How long does a lease extension take?",
    a: "An agreed statutory extension often takes a few months. The freeholder has at least two months to reply to your notice, then the two sides negotiate. If you cannot agree, the tribunal can decide, which takes longer.",
  },
  {
    q: "Do I have to pay the freeholder's legal fees?",
    a: "Under the current rules, yes: you pay their reasonable legal and valuation costs, though not their costs of a tribunal hearing. The 2024 Act will generally end this once its changes come in.",
  },
  {
    q: "Can I extend my lease as soon as I buy the flat?",
    a: "Yes. The rule that you had to own the flat for two years was removed on 31 January 2025. You can start once you are the registered owner, or a seller can serve notice and pass the benefit of it to you on completion.",
  },
  {
    q: "Should I wait for the new rules before extending?",
    a: "It is a judgement call. Waiting could save marriage value if the reforms start soon, but each year adds to the premium and there is no start date. If you are just above 80 years, serving notice now usually makes sense.",
  },
  {
    q: "Is a lease extension worth it?",
    a: "Usually. A short lease can make a flat hard to sell or mortgage, and a longer lease raises its value, often by more than the premium. Compare the premium with the value of the flat with a long lease.",
  },
];

export default async function LeaseExtensionPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    [
      "/uk/property/remortgage",
      "/uk/property/mortgage-affordability",
      "/uk/property/moving-house-budget",
      "/uk/property/property-capital-gains",
      "/uk/property/buy-to-let-yield",
      "/uk/property/shared-ownership",
    ].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Rules in force, October 2026"
      title="Lease Extension Calculator"
      lead="Estimate the premium to extend your flat's lease, with marriage value, costs and what the 2024 Act would change."
      points={["1993 Act formula", "80-year cliff shown", "2024 Act comparison", "Free and private"]}
      guide={<LeaseGuide />}
      faqs={FAQS}
      related={related}
      note="An estimate for flats in England and Wales, not a valuation. Get a report from a qualified surveyor before you serve notice. SumAtlas is not a law firm or a surveyor."
    >
      <LeaseStudio query={query} />
    </FlagshipPage>
  );
}
