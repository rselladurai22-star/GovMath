import type { Metadata } from "next";
import Link from "next/link";
import CalcPage from "@/components/calc/CalcPage";
import { CALCULATORS } from "@/lib/calculators";
import { depositCap, fairDeduction } from "@/lib/property/renting";
import { gbp, percent } from "@/components/flagship/format";
import DepositStudio from "./DepositStudio";
import { ogFor } from "@/gm/og";

export const metadata: Metadata = {
  title: "Rental Deposit Calculator UK: Cap & Deductions",
  description:
    "Free rental deposit calculator. Check the legal deposit cap (5 or 6 weeks' rent in England), fair deductions with wear and tear, and what you should get back.",
  alternates: { canonical: "/uk/property/deposit-return" },
  openGraph: ogFor("/uk/property/deposit-return"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/property", label: "Renting & council tax" },
  { href: "/uk/property/deposit-return", label: "Deposit Return" },
];

// Worked examples, from the engine.
const RENT = 1_100;
const CAP_ENG = depositCap("england", RENT) ?? 0;
const CAP_SCO = depositCap("scotland", RENT) ?? 0;
const CAP_NI = depositCap("ni", RENT) ?? 0;
const CARPET = fairDeduction({ kind: "carpet", claimed: 900, age: 5, life: 8 });
const PAINT = fairDeduction({ kind: "decoration", claimed: 400, age: 4, life: 5 });
const OLD = fairDeduction({ kind: "sofa", claimed: 600, age: 10, life: 8 });

const FAQS: { q: string; a: string }[] = [
  {
    q: "Can a landlord charge for professional cleaning at the end?",
    a: "Only to bring the home back to the standard it was in at check-in. If the inventory shows it was professionally cleaned when you moved in and it was left less clean, a reasonable cleaning cost can come off. A clause saying you must pay for a professional clean whatever the condition is not enforceable in England: the Tenant Fees Act bans charges like that.",
  },
  {
    q: "What if there was no check-in inventory?",
    a: "Then the landlord will struggle. The deposit is your money, and in a dispute it is for the landlord to prove the home was in better condition when you moved in. Without a signed inventory or dated photos, adjudicators often reject claims for damage, though unpaid rent is easy to prove either way.",
  },
  {
    q: "My landlord sold the home during my tenancy. Who returns the deposit?",
    a: "The new landlord takes on the tenancy and the deposit with it, so they must return it and should re-protect it in their name. If they say they never received it, the old landlord is still responsible: contact the scheme where it was protected, which can tell you who holds it.",
  },
  {
    q: "Can the landlord keep the deposit for rent I owe after I leave?",
    a: "Yes, if the rent was owed under the tenancy, for example because you left before your notice ran out. It must match what you owe to the day: the rent calculator on this site works out a part-month. Rent for a period after the tenancy legally ended cannot be taken.",
  },
  {
    q: "What if I paid the deposit in cash or to a letting agent who went bust?",
    a: "Ask for a receipt or the protection certificate; a protected deposit is safe whatever happens to the agent, because the scheme holds it or insures it. If it was never protected, you can still claim it back through the courts, with the extra award for non-protection in England, Wales and Scotland.",
  },
];

const SOURCES = [
  { label: "GOV.UK: tenancy deposit protection", href: "https://www.gov.uk/tenancy-deposit-protection" },
  { label: "GOV.UK: private renting, deposits", href: "https://www.gov.uk/private-renting/deposits" },
  { label: "Deposit Protection Service: what makes a reasonable deposit claim", href: "https://www.depositprotection.com/claims-and-disputes/what-makes-a-reasonable-deposit-claim/" },
  { label: "mygov.scot: tenancy deposits", href: "https://www.mygov.scot/tenancy-deposits-tenants" },
  { label: "nidirect: tenancy deposit scheme, information for tenants", href: "https://www.nidirect.gov.uk/articles/tenancy-deposit-scheme-information-tenants" },
  { label: "Renting Homes (Fees etc.) (Wales) Act 2019, Schedule 1", href: "https://www.legislation.gov.uk/anaw/2019/2/schedule/1" },
];

function Notes() {
  return (
    <>
      <h2>The cap comes first</h2>
      <p>
        Before arguing about any deduction, check the deposit was legal to take. In England the limit is 5 weeks&rsquo; rent, or 6 weeks if the rent is £50,000 a year or more: on{" "}
        {gbp(RENT)} a month that is {gbp(CAP_ENG, true)}. Scotland allows 2 months&rsquo; rent ({gbp(CAP_SCO)}) and Northern Ireland 1 month ({gbp(CAP_NI)}). Wales has no limit yet. Anything
        above the cap in England is a banned payment: you can ask for it back straight away, and report the landlord to trading standards at the council if they refuse.
      </p>

      <h2>Wear and tear is the landlord&rsquo;s cost</h2>
      <p>
        Carpets flatten, paint scuffs and furniture ages however careful you are. That is fair wear and tear, and it cannot come off a deposit. Damage can, such as a burn, a stain or a
        broken door, but the landlord should not end up better off than before. Adjudicators call that betterment: replacing a five-year-old carpet with a new one gives the landlord something
        better than they lost.
      </p>
      <p>
        So a charge for a replacement is cut to the share of the item&rsquo;s life that was left. A {gbp(900)} carpet that was 5 years into an 8-year life had {percent(1 - CARPET.share, 1)} of its
        life used, so a fair charge is {gbp(CARPET.fair)}, not {gbp(900)}. Redecorating a room painted 4 years ago, with a 5-year life, is worth {gbp(PAINT.fair)} of a {gbp(400)} bill. An
        item past its expected life, like a 10-year-old sofa, is worth {gbp(OLD.fair)}: there is nothing left to compensate for. Lives vary with quality, so change them in the calculator if
        yours were better or worse than typical.
      </p>

      <h2>Disputing a deduction</h2>
      <p>
        Do not accept a deduction you think is unfair just to get the rest back faster. Reply in writing, item by item, then raise a dispute with the scheme holding the deposit: the
        Deposit Protection Service, mydeposits or the Tenancy Deposit Scheme in England and Wales, SafeDeposits Scotland, Letting Protection Service Scotland or MyDeposits Scotland, and TDS
        or mydeposits in Northern Ireland. The service is free, the undisputed part is paid out first, and you usually need to raise it within 3 months of the tenancy ending.
      </p>
      <p>
        Send the check-in and check-out reports, dated photos, your emails reporting repairs, and any receipts. The adjudicator decides on the papers, and the landlord has to justify each
        amount.
      </p>

      <h2>If the deposit was never protected</h2>
      <p>
        Landlords must protect a deposit within 30 days in England and Wales, 30 working days in Scotland and 28 days in Northern Ireland, and give you the scheme&rsquo;s details. If they did
        not, a court in England or Wales can order them to pay you 1 to 3 times the deposit on top of returning it; in Scotland the tribunal can award up to 3 times. In Northern Ireland the
        council can fine the landlord. Check where yours is on the schemes&rsquo; websites with your postcode and surname.
      </p>
      <p>
        Moving on? The <Link href="/uk/life/pro-rata-rent">rent calculator</Link>{" "}works out the last part-month&rsquo;s rent, the{" "}
        <Link href="/uk/property/rent-increase">rent increase checker</Link>{" "}tests a new landlord&rsquo;s notice later, and the{" "}
        <Link href="/uk/property/council-tax-bands">council tax band calculator</Link>{" "}shows the bill at your new address.
      </p>
    </>
  );
}

export default async function DepositReturnPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/property/rent-increase", "/uk/life/pro-rata-rent", "/uk/benefits/local-housing-allowance", "/uk/property/council-tax-bands", "/uk/property/single-person-discount"].includes(c.href));
  return (
    <CalcPage
      breadcrumbs={BREADCRUMBS}
      title="Tenancy Deposit Return Calculator"
      lead="Whether your deposit is within the legal cap, which deductions are fair once wear and tear is allowed for, and how much you should get back."
      notes={<Notes />}
      faqs={FAQS}
      sources={SOURCES}
      related={related}
    >
      <DepositStudio query={query} />
    </CalcPage>
  );
}
