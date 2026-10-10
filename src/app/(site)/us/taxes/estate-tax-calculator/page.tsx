import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import EstateStudio from "./EstateStudio";
import EstateGuide from "./EstateGuide";

const PATH = "/us/taxes/estate-tax-calculator";

export const metadata: Metadata = {
  title: "Estate Tax Calculator 2026: $15 Million Exclusion",
  description:
    "Free estate tax calculator for 2026. Work out federal estate tax with the $15 million exclusion, gifts, portability, marital and charitable deductions.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/taxes", label: "Taxes and pay" },
  { href: PATH, label: "Estate Tax Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "What is the federal estate tax exemption for 2026?",
    a: "$15,000,000 a person for deaths in 2026, set by the One Big Beautiful Bill Act and indexed for inflation from 2027. A married couple can pass $30 million using portability.",
  },
  {
    q: "What is the estate tax rate?",
    a: "40% on everything above the exclusion. The rate schedule starts at 18%, but because the exclusion is far above $1 million, any estate that owes tax pays 40% on each dollar over it.",
  },
  {
    q: "How much estate tax is due on $20 million?",
    a: "With $800,000 of debts and costs, the taxable estate is $19.2 million and the tax is $1,680,000: 40% of the $4.2 million above the exclusion. That is 8.4% of the gross estate.",
  },
  {
    q: "Do I pay tax on an inheritance?",
    a: "Not federally. The estate pays any estate tax before you receive your share, and an inheritance is not income. Kentucky, Maryland, Nebraska, New Jersey and Pennsylvania charge an inheritance tax, mostly on more distant relatives and friends.",
  },
  {
    q: "How much can I give away each year without tax?",
    a: "$19,000 to each person in 2026, or $38,000 from a married couple. Tuition and medical bills paid directly to the school or provider are unlimited. Larger gifts use part of your $15 million and need a Form 709.",
  },
  {
    q: "Do I pay gift tax if I give more than $19,000?",
    a: "Almost never. You file Form 709, and the excess comes off your $15 million lifetime exclusion. Tax is due only once your lifetime taxable gifts pass the exclusion.",
  },
  {
    q: "What is portability?",
    a: "When a spouse dies, the executor can pass their unused exclusion (the DSUE) to the survivor by filing Form 706, even if no tax is due. The survivor adds it to their own exclusion.",
  },
  {
    q: "Is there estate tax when everything goes to my spouse?",
    a: "No, if your spouse is a US citizen. The marital deduction is unlimited. What your spouse still owns at their death is taxed in their estate, so electing portability matters.",
  },
  {
    q: "Which states have an estate tax?",
    a: "Connecticut, Hawaii, Illinois, Maine, Maryland, Massachusetts, Minnesota, New York, Oregon, Rhode Island, Vermont, Washington and Washington, DC. Oregon's starts at $1 million and Massachusetts's at $2 million.",
  },
  {
    q: "Is life insurance part of my estate?",
    a: "Yes, if you owned the policy or could change the beneficiary. The payout counts in full. A policy owned by an irrevocable life insurance trust stays out.",
  },
  {
    q: "When is the estate tax return due?",
    a: "Form 706 and any tax are due nine months after the date of death. A six-month extension to file is available, but not to pay.",
  },
  {
    q: "Do heirs pay capital gains tax on inherited property?",
    a: "Only on growth after the death. Inherited property gets a stepped-up basis equal to its value at death, so selling soon after usually means little or no gain.",
  },
];

export default async function EstateTaxPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/us/taxes/capital-gains-tax", "/us/taxes/federal-income-tax", "/us/savings/roth-ira-calculator", "/us/savings/retirement-calculator", "/us/savings/compound-interest-calculator"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Federal estate and gift tax"
      title="Estate Tax Calculator"
      lead="Work out the federal estate tax for a death in 2026 with the $15 million exclusion, lifetime gifts, portability from a late spouse, and the marital and charitable deductions."
      points={["2026 $15 million exclusion", "Lifetime gifts and DSUE", "Annual gifting plan", "State estate tax check"]}
      guide={<EstateGuide />}
      faqs={FAQS}
      related={related}
      note="An estimate for planning, not legal or tax advice."
    >
      <EstateStudio query={query} />
    </FlagshipPage>
  );
}
