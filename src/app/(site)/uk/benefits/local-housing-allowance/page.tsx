import type { Metadata } from "next";
import Link from "next/link";
import CalcPage from "@/components/calc/CalcPage";
import { CALCULATORS } from "@/lib/calculators";
import LhaStudio from "./LhaStudio";
import { ogFor } from "@/gm/og";
import { LHA_AREAS, lhaMonthly, lhaWeekly } from "@/lib/benefits/lha-engine";
import { gbp } from "@/components/flagship/format";

export const metadata: Metadata = {
  title: "LHA Calculator 2026/27: Bedroom Rate & Rent",
  description:
    "Free LHA calculator for 2026/27. Find your bedroom entitlement and how much Universal Credit or Housing Benefit pays towards private rent in your area.",
  alternates: { canonical: "/uk/benefits/local-housing-allowance" },
  openGraph: ogFor("/uk/benefits/local-housing-allowance"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/benefits", label: "Benefits & family" },
  { href: "/uk/benefits/local-housing-allowance", label: "Local Housing Allowance" },
];

// Every figure in the text below comes from the engine's rate tables.
const m = (n: number) => gbp(n, true);
const SHARED = lhaMonthly("Bristol", "shared");
const ONE = lhaMonthly("Bristol", "1");
const TWO = lhaMonthly("Bristol", "2");
const TWO_WEEKLY = lhaWeekly("Bristol", "2");

const FAQS: { q: string; a: string }[] = [
  {
    q: "Will Local Housing Allowance go up in April 2027?",
    a: "Nothing has been announced. DWP's proposed benefit rates for 2027/28, published in November 2026, do not include new Local Housing Allowance rates, and the rates for 2026/27 were held at their April 2024 level. Unless the government says otherwise, plan on the same figures.",
  },
  {
    q: "Can I rent a home with more bedrooms than I am allowed, or one above the LHA rate?",
    a: "Yes. The rate limits the help, not where you live. You can take a bigger or dearer home and pay the difference yourself, and a landlord may still ask you to show you can afford it. If you rent somewhere cheaper than your rate you get your actual rent, not the full rate.",
  },
  {
    q: "Does Local Housing Allowance apply to council and housing association homes?",
    a: "No. It is only for private tenancies. Social tenants have their actual rent covered, less 14% for one spare bedroom or 25% for two or more if they are of working age.",
  },
  {
    q: "Is the money paid to me or to my landlord?",
    a: "Normally to you, as part of your Universal Credit or Housing Benefit, and you pay the landlord. You or your landlord can ask for it to be paid direct if you are in arrears or would struggle to manage it. In Scotland you can choose direct payment, and in Northern Ireland it is the default.",
  },
  {
    q: "How do I find which Broad Rental Market Area I am in?",
    a: `Search the postcode on the Valuation Office Agency's LHA Direct service for England, or ask the council for Scotland and Wales, or the Housing Executive for Northern Ireland. Areas follow rental markets, not council borders, so one street can fall in a different area from the next. This calculator holds all ${LHA_AREAS.length} areas.`,
  },
];

const SOURCES = [
  { label: "Valuation Office Agency: Local Housing Allowance rates, April 2026 to March 2027 (England)", href: "https://www.gov.uk/government/publications/local-housing-allowance-lha-rates-applicable-from-april-2026-to-march-2027" },
  { label: "DWP: Universal Credit Local Housing Allowance rates 2026 to 2027 (England, Scotland, Wales)", href: "https://www.gov.uk/government/publications/universal-credit-local-housing-allowance-rates-2026-to-2027" },
  { label: "Welsh Government: Local Housing Allowance rates, April 2026 to March 2027", href: "https://www.gov.wales/local-housing-allowance-lha-rates-april-2026-march-2027" },
  { label: "Housing Executive: current LHA rent levels (Northern Ireland)", href: "https://www.nihe.gov.uk/housing-help/local-housing-allowance/current-lha-rent-levels" },
  { label: "VOA: LHA Direct, search rates by postcode", href: "https://lha-direct.voa.gov.uk/search.aspx" },
  { label: "GOV.UK: Housing costs and Universal Credit, renting from a private landlord", href: "https://www.gov.uk/housing-and-universal-credit/renting-from-private-landlord" },
  { label: "GOV.UK: Housing Benefit, what you'll get", href: "https://www.gov.uk/housing-benefit/what-youll-get" },
  { label: "GOV.UK: Get help from your local council (Crisis and Resilience Fund)", href: "https://www.gov.uk/cost-living-help-local-council" },
];

function Notes() {
  return (
    <>
      <h2>The bedroom rules</h2>
      <p>One bedroom is allowed for each of these:</p>
      <ul>
        <li>you, or you and your partner;</li>
        <li>any other person aged 16 or over;</li>
        <li>two children under 16 of the same sex;</li>
        <li>two children under 10, whatever their sex;</li>
        <li>any child left over;</li>
        <li>a carer who lives elsewhere but has to stay overnight;</li>
        <li>a disabled child, or a couple, who cannot share because of a disability.</li>
      </ul>
      <p>
        So a boy of 11 and a girl of 8 get a room each, and two boys of 11 and 15 share. A room is counted from the birthday, not from when you move. Approved foster carers get one extra
        room. Whatever the total, the rates stop at four bedrooms.
      </p>

      <h2>Under 35 and living alone</h2>
      <p>
        A single person under 35 with no children is held to the shared accommodation rate, even in a self-contained flat. In Bristol that is {m(SHARED)} a month against {m(ONE)} for one
        bedroom. You move up to the one-bedroom rate if you:
      </p>
      <ul>
        <li>get the daily living part of PIP, the middle or highest rate of DLA care, or Attendance Allowance;</li>
        <li>are a care leaver under 25;</li>
        <li>have spent three months or more in a homeless hostel;</li>
        <li>are a survivor of domestic abuse or modern slavery;</li>
        <li>are an ex-offender managed under a MAPPA arrangement.</li>
      </ul>

      <h2>Why the rate is below your rent</h2>
      <p>
        The rates were last reset in April 2024, to the cheapest 30% of local rents recorded the autumn before. They have been frozen at that level since, including for 2026/27, while
        rents have kept rising. A two-bedroom home in Bristol is allowed {m(TWO)} a month under Universal Credit, or {m(TWO_WEEKLY)} a week under Housing Benefit, whatever it now costs to
        rent one.
      </p>
      <p>
        The limit is only the first test. Your <Link href="/uk/benefits/universal-credit">Universal Credit award</Link>{" "}still depends on income and savings, and the{" "}
        <Link href="/uk/benefits/benefit-cap">benefit cap</Link>{" "}can take back housing help that the rate allows. People over State Pension age claim{" "}
        <Link href="/uk/benefits/housing-benefit">Housing Benefit</Link>{" "}instead, at the weekly rate.
      </p>

      <h2>If there is a shortfall</h2>
      <p>
        Ask your council for help before arrears build. In England that is now the Crisis and Resilience Fund, which replaced Discretionary Housing Payments in April 2026; in Scotland and
        Wales it is still a Discretionary Housing Payment, and in Northern Ireland you apply to the Housing Executive. Awards are short-term and depend on the council&rsquo;s budget, so say
        what you are doing to close the gap.
      </p>
      <p>
        Then check the entitlement itself. An overnight carer, a disabled child who cannot share, or a birthday that splits a shared room each add a bedroom, and in Bristol the step from two
        bedrooms to three is worth {m(lhaMonthly("Bristol", "3") - TWO)} a month. If your landlord is proposing an increase, the <Link href="/uk/property/rent-increase">rent increase checker</Link>{" "}shows whether the notice is valid.
      </p>
    </>
  );
}

export default async function LhaPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/benefits/universal-credit", "/uk/benefits/benefit-cap", "/uk/benefits/universal-credit-taper", "/uk/benefits/housing-benefit", "/uk/life/pro-rata-rent"].includes(c.href));
  return (
    <CalcPage
      breadcrumbs={BREADCRUMBS}
      title="Local Housing Allowance Calculator"
      lead="How many bedrooms you are allowed, the Local Housing Allowance rate for your area, and how much of your rent it leaves you to pay."
      notes={<Notes />}
      faqs={FAQS}
      sources={SOURCES}
      related={related}
    >
      <LhaStudio query={query} />
    </CalcPage>
  );
}
