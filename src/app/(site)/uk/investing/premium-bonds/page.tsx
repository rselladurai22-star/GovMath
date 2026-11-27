import type { Metadata } from "next";
import Link from "next/link";
import CalcPage from "@/components/calc/CalcPage";
import { CALCULATORS } from "@/lib/calculators";
import { AVERAGE_PRIZE, grossEquivalent, PREMIUM_BONDS, premiumBondsYear, savingsAfterTax } from "@/lib/investing/growth";
import { gbp, percent } from "@/components/flagship/format";
import PremiumBondsStudio from "./PremiumBondsStudio";
import { ogFor } from "@/gm/og";

export const metadata: Metadata = {
  title: "Premium Bonds Calculator: Average Return",
  description:
    "Free Premium Bonds calculator. See the average return at the current prize rate, and what you could win in a typical, unlucky or lucky year, up to £50,000.",
  alternates: { canonical: "/uk/investing/premium-bonds" },
  openGraph: ogFor("/uk/investing/premium-bonds"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/benefits", label: "Benefits & family" },
  { href: "/uk/investing/premium-bonds", label: "Premium Bonds" },
];

// Every figure below is worked out at render time from the engine's seeded simulation and the published prize table.
const ONE_K = premiumBondsYear(1_000);
const TEN_K = premiumBondsYear(10_000);
const FIFTY_K = premiumBondsYear(50_000);
const prizes = PREMIUM_BONDS.prizes;
const totalPrizes = prizes.reduce((a, [, n]) => a + n, 0);
const smallShare = prizes.filter(([v]) => v <= 100).reduce((a, [, n]) => a + n, 0) / totalPrizes;
const smallValueShare = prizes.filter(([v]) => v <= 100).reduce((a, [v, n]) => a + v * n, 0) / prizes.reduce((a, [v, n]) => a + v * n, 0);
const millionOdds = (PREMIUM_BONDS.odds * totalPrizes) / 2;
const HIGHER_50K = savingsAfterTax(50_000, 0.04, "higher");
const BASIC_50K = savingsAfterTax(50_000, 0.04, "basic");
const GROSS_HIGHER = grossEquivalent(PREMIUM_BONDS.rate, "higher");
const GROSS_BASIC = grossEquivalent(PREMIUM_BONDS.rate, "basic");

const FAQS: { q: string; a: string }[] = [
  {
    q: "Do Premium Bonds count as savings for benefits?",
    a: "Yes. For Universal Credit, Pension Credit and Housing Benefit, Premium Bonds count as capital at their face value, like money in the bank. Universal Credit ignores the first £6,000 and stops altogether at £16,000, so moving savings into Bonds does not protect a claim. A prize adds to your capital if you keep it.",
  },
  {
    q: "Can I buy Premium Bonds for a child or grandchild?",
    a: "Yes. Anyone 16 or over can buy Bonds for a child under 16, as a parent or as a gift. Whoever buys them, the parent or guardian named on the application looks after them until the child's 16th birthday, when the child takes them over. The £25 minimum and £50,000 maximum apply to the child's own holding, and prizes belong to the child.",
  },
  {
    q: "What happens to Premium Bonds when someone dies?",
    a: "They can stay in the draw for up to 12 months after the death, in the holder's name. Prizes won after NS&I is told are paid by warrant to whoever is entitled to the money once the claim is complete, and any won before then are held and sent with it. After that the Bonds must be cashed in or repaid; they cannot be moved into someone else's name. For inheritance tax they count at their face value, the amount NS&I repays.",
  },
  {
    q: "How long does it take to cash in?",
    a: "Usually a few working days to your bank account. There is no penalty and no notice period. Bonds you cash in stop being entered from that point, so a request just before a draw date gives up that month's chance.",
  },
  {
    q: "Is it worth reinvesting prizes?",
    a: "Usually, if you are below the £50,000 limit: reinvested prizes buy new Bonds automatically, and unlike Bonds you buy, they are eligible from the very next draw. Over years that compounds like interest, though more slowly. At the limit, prizes are paid to your bank account instead.",
  },
];

const SOURCES = [
  { label: "NS&I: Premium Bonds, prize fund rate and odds", href: "https://www.nsandi.com/products/premium-bonds" },
  { label: "NS&I: how we share out Premium Bonds prizes (monthly prize allocation)", href: "https://www.nsandi.com/get-to-know-us/monthly-prize-allocation" },
  { label: "NS&I: prize checker", href: "https://www.nsandi.com/prize-checker" },
  { label: "GOV.UK: tax on savings interest and the Personal Savings Allowance", href: "https://www.gov.uk/apply-tax-free-interest-on-savings" },
  { label: "NS&I: what to do if an NS&I customer has died", href: "https://www.nsandi.com/help/manage-money-for-others/customers-who-have-died" },
];

function Notes() {
  return (
    <>
      <h2>Why your typical year is below the prize rate</h2>
      <p>
        The {percent(PREMIUM_BONDS.rate, 2)} prize fund rate is what the whole fund pays out, on average, per pound. Each £1 Bond has a 1 in {PREMIUM_BONDS.odds.toLocaleString("en-GB")} chance of a
        prize each month, and {percent(smallShare, 0)} of prizes are £25, £50 or £100. Those small prizes make up only {percent(smallValueShare, 0)}{" "}of the money paid out: the rest goes on a few
        large prizes, including two £1 million jackpots a month. Very few holders ever win one, so most people&rsquo;s return comes out below the average.
      </p>
      <p>
        On {gbp(10_000)}, the average is {gbp(TEN_K.expected)} a year, but the typical (median) year brings {gbp(TEN_K.median)}, an effective {percent(TEN_K.medianRate, 2)}. One year in ten you
        would get {gbp(TEN_K.p10)} or less. The gap shrinks as the holding grows: at the {gbp(PREMIUM_BONDS.max)} limit the median is {gbp(FIFTY_K.median)} against an average of{" "}
        {gbp(FIFTY_K.expected)}. On {gbp(1_000)} you win nothing at all in {percent(ONE_K.chanceNothing, 0)} of years.
      </p>

      <h2>Tax-free matters most for higher-rate taxpayers</h2>
      <p>
        Prizes are free of Income Tax and Capital Gains Tax, and you never report them. Savings interest is taxed once it goes over your Personal Savings Allowance: £1,000 a year for basic-rate
        taxpayers, £500 at the higher rate and nothing at the additional rate. That changes the comparison.
      </p>
      <p>
        {gbp(50_000)} in an account paying 4% earns {gbp(HIGHER_50K.interest)} before tax. A basic-rate taxpayer keeps {gbp(BASIC_50K.net)}, a higher-rate taxpayer {gbp(HIGHER_50K.net)}. Once the
        allowance is used up, the Bonds&rsquo; {percent(PREMIUM_BONDS.rate, 2)} is worth {percent(GROSS_BASIC, 2)} before tax to a basic-rate taxpayer and {percent(GROSS_HIGHER, 2)} to a
        higher-rate one. From April 2027 the tax on savings interest rises to 22%, 42% and 47%, which tilts it further towards tax-free prizes. A cash ISA is tax-free too, and pays a fixed rate
        rather than a lottery.
      </p>

      <h2>The £50,000 limit and how the draw works</h2>
      <ul>
        <li>You can hold from £25 to £50,000 per person, in £1 Bonds. Couples can hold £50,000 each, but not jointly.</li>
        <li>Bonds you buy wait one full calendar month before their first draw: Bonds bought in March first enter the May draw. Bonds bought with reinvested prizes go straight into the next draw.</li>
        <li>
          The odds per Bond are the same whoever holds it, so the chance of a £1 million prize is about 1 in {Math.round(millionOdds / 1e9).toLocaleString("en-GB")} billion per £1 Bond each
          month.
        </li>
        <li>The average prize is about {gbp(AVERAGE_PRIZE, true)}, but almost every win is £25, £50 or £100.</li>
        <li>Your money is backed by HM Treasury, so all of it is safe, not just the first £120,000 an FSCS-protected bank covers.</li>
      </ul>

      <h2>Before you move savings in</h2>
      <p>
        Keep an emergency fund where it earns a known rate. If you claim means-tested benefits, Bonds count as savings, so check the capital limits on the{" "}
        <Link href="/uk/benefits/universal-credit">Universal Credit calculator</Link>, the <Link href="/uk/benefits/pension-credit">Pension Credit calculator</Link>{" "}or the{" "}
        <Link href="/uk/benefits/housing-benefit">Housing Benefit calculator</Link>. Inflation matters too: in a year when prices rise faster than your prizes, your money buys less, even
        though the amount you put in never falls.
      </p>
    </>
  );
}

export default async function PremiumBondsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/benefits/universal-credit", "/uk/benefits/pension-credit", "/uk/benefits/housing-benefit", "/uk/benefits/council-tax-reduction", "/uk/benefits/benefits-checker"].includes(c.href));
  return (
    <CalcPage
      breadcrumbs={BREADCRUMBS}
      title="Premium Bonds Calculator"
      lead="What your Premium Bonds are likely to win in a typical year, not just the average return, and whether a savings account would pay more after tax."
      notes={<Notes />}
      faqs={FAQS}
      sources={SOURCES}
      related={related}
    >
      <PremiumBondsStudio query={query} />
    </CalcPage>
  );
}
