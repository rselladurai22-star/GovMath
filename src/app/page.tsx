import type { Metadata } from "next";
import Link from "next/link";
import GmShell from "@/gm/GmShell";
import cats from "@/gm/categories.json";
import { ogFor } from "@/gm/og";
import { TOPIC_ICON, ToolGrid } from "@/components/TopicHub";
import { CALCULATORS, US_CATEGORIES, getCalculatorsByCategory, type Calculator, type CategorySlug } from "@/lib/calculators";

export const metadata: Metadata = {
  title: { absolute: "SumAtlas: Free Money and Tax Calculators" },
  description:
    "Free calculators with clear answers: take-home pay, tax, mortgages, loans, benefits and retirement for the UK and the US, plus everyday calculators.",
  alternates: { canonical: "/" },
  openGraph: ogFor("/"),
};

type Cat = { slug: CategorySlug; label: string };
const CATS = cats as Cat[];

/** The most used calculators in each country, linked straight from the home page. */
const POPULAR_UK = [
  "/uk/tax-and-salary/salary-calculator",
  "/uk/property/mortgage-repayment",
  "/uk/property/stamp-duty-england",
  "/uk/benefits/universal-credit",
  "/uk/benefits/universal-credit-taper",
  "/uk/investing/compound-interest",
];
const POPULAR_US = [
  "/us/taxes/paycheck-calculator",
  "/us/taxes/federal-income-tax",
  "/us/housing/mortgage-calculator",
  "/us/loans/auto-loan-calculator",
  "/us/savings/401k-calculator",
  "/us/savings/compound-interest-calculator",
];

const pick = (hrefs: string[]) => hrefs.map((h) => CALCULATORS.find((c) => c.href === h)).filter((c): c is Calculator => c !== undefined);

function Heading({ id, eyebrow, title, link }: { id: string; eyebrow: string; title: string; link?: { href: string; label: string } }) {
  return (
    <div className="sectionheading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={id}>{title}</h2>
      </div>
      {link && (
        <Link className="textbutton" href={link.href}>
          {link.label}
        </Link>
      )}
    </div>
  );
}

/**
 * The world home page: everyday calculators that work anywhere, then the
 * most used US and UK calculators and each country's topics. Visitors pick
 * their country from the header's country menu.
 */
export default function WorldHome() {
  return (
    <GmShell>
      <div className="wrap">
        <section className="categoryhero gm-worldhero">
          <h1>Free calculators. Clear answers.</h1>
          <p>
            Work out your take-home pay, tax, mortgage, loans, benefits and everyday sums with calculators built for the rules where you live, each
            with a plain-English guide.
          </p>
        </section>

        <section className="section" aria-labelledby="everyday-title">
          <Heading id="everyday-title" eyebrow="FOR EVERYONE" title="Everyday calculators" link={{ href: "/everyday", label: "See all" }} />
          <ToolGrid tools={getCalculatorsByCategory("everyday")} icon={TOPIC_ICON.everyday} />
        </section>

        <section className="section" aria-labelledby="us-title">
          <Heading id="us-title" eyebrow="UNITED STATES" title="Popular US calculators" link={{ href: "/us", label: "All US calculators" }} />
          <ToolGrid tools={pick(POPULAR_US)} icon={TOPIC_ICON.tax} />
        </section>

        <section className="section" aria-labelledby="uk-title">
          <Heading id="uk-title" eyebrow="UNITED KINGDOM" title="Popular UK calculators" link={{ href: "/uk", label: "All UK calculators" }} />
          <ToolGrid tools={pick(POPULAR_UK)} icon={TOPIC_ICON.tax} />
        </section>

        <section className="section" aria-labelledby="topics-title">
          <Heading id="topics-title" eyebrow="BROWSE" title="Browse by topic" link={{ href: "/calculators", label: "See all calculators" }} />
          <h3 className="gm-topicgroup">United States</h3>
          <nav className="categoryjump" aria-label="US topics">
            {US_CATEGORIES.map((c) => (
              <Link key={c.slug} href={c.href}>
                {c.title} ({getCalculatorsByCategory(c.slug).length})
              </Link>
            ))}
          </nav>
          <h3 className="gm-topicgroup">United Kingdom</h3>
          <nav className="categoryjump" aria-label="UK topics">
            {CATS.map((c) => (
              <Link key={c.slug} href={`/uk/${c.slug}`}>
                {c.label.replace(/&amp;/g, "&")} ({getCalculatorsByCategory(c.slug).length})
              </Link>
            ))}
          </nav>
        </section>

        <section className="section gm-prose" aria-labelledby="about-title">
          <h2 id="about-title">About SumAtlas</h2>
          <p>
            SumAtlas is a free, independent calculator site for the UK and the US. Every calculator uses the current official rates for its country,
            shows the assumptions it makes, and comes with a guide that explains the rules in plain English. There is no sign-up, and we do not store
            what you type. Read <Link href="/how-we-check">how we check our figures</Link> or <Link href="/about">more about us</Link>.
          </p>
        </section>
      </div>
    </GmShell>
  );
}
