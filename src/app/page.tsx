import type { Metadata } from "next";
import Link from "next/link";
import GmShell from "@/gm/GmShell";
import cats from "@/gm/categories.json";
import { ogFor } from "@/gm/og";
import { CALCULATORS, getCalculatorsByCategory, shortTitle, type CategorySlug } from "@/lib/calculators";

export const metadata: Metadata = {
  title: { absolute: "SumAtlas: Free Money and Tax Calculators" },
  description:
    "Free calculators with clear answers: take-home pay, tax, mortgages, benefits and more, built for the country you live in. UK now, with more countries coming.",
  alternates: { canonical: "/" },
  openGraph: ogFor("/"),
};

type Cat = { slug: CategorySlug; label: string; desc: string; toolIcon: string };
const CATS = cats as Cat[];
const label = (c: Cat) => c.label.replace(/&amp;/g, "&");

/** The most used UK calculators, linked straight from the world home page. */
const POPULAR = [
  "/uk/tax-and-salary/salary-calculator",
  "/uk/property/mortgage-repayment",
  "/uk/property/stamp-duty-england",
  "/uk/benefits/universal-credit",
  "/uk/benefits/universal-credit-taper",
  "/uk/investing/compound-interest",
];

const COMING = [
  { name: "United States", text: "Paycheck, federal tax and mortgage calculators." },
  { name: "India", text: "Income tax (old and new regime), EMI, GST and SIP calculators." },
  { name: "Singapore", text: "Income tax, CPF and property stamp duty calculators." },
];

/**
 * The world home page: one entry per country (the UK is live, others are on
 * the way) and the most used UK calculators. Each country's calculators live
 * under its own folder (/uk/…), so they share one domain and its reputation.
 */
export default function WorldHome() {
  const popular = POPULAR.map((href) => CALCULATORS.find((c) => c.href === href)).filter((c) => c !== undefined);
  return (
    <GmShell>
      <div className="wrap">
        <section className="categoryhero gm-worldhero">
          <h1>Free calculators. Clear answers.</h1>
          <p>
            Work out your take-home pay, tax, mortgage, benefits and everyday costs with calculators built for the rules where you live, each with a
            plain-English guide.
          </p>
        </section>

        <section className="section" aria-labelledby="countries-title">
          <div className="sectionheading">
            <div>
              <p className="eyebrow">CHOOSE YOUR COUNTRY</p>
              <h2 id="countries-title">Calculators for where you live</h2>
            </div>
          </div>
          <div className="fullcategory">
            <Link className="categorytool" href="/uk">
              <span className="toolicon" aria-hidden="true">
                UK
              </span>
              <div>
                <h3>United Kingdom</h3>
                <p>
                  {CALCULATORS.length} calculators for 2026/27: tax and salary, mortgages and property, benefits, business, pensions, vehicles, students
                  and everyday life.
                </p>
                <span className="openlabel">Open UK calculators</span>
              </div>
            </Link>
            {COMING.map((c) => (
              <div key={c.name} className="categorytool gm-coming">
                <span className="toolicon" aria-hidden="true">
                  {c.name === "United States" ? "US" : c.name === "India" ? "IN" : "SG"}
                </span>
                <div>
                  <h3>{c.name}</h3>
                  <p>{c.text}</p>
                  <span className="openlabel">Coming soon</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section" aria-labelledby="popular-title">
          <div className="sectionheading">
            <div>
              <p className="eyebrow">MOST USED</p>
              <h2 id="popular-title">Popular UK calculators</h2>
            </div>
            <Link className="textbutton" href="/calculators">
              See all calculators
            </Link>
          </div>
          <div className="fullcategory">
            {popular.map((t) => {
              const cat = CATS.find((c) => c.slug === t.category);
              return (
                <Link key={t.href} className="categorytool" href={t.href}>
                  <span className="toolicon" dangerouslySetInnerHTML={{ __html: cat?.toolIcon ?? "" }} />
                  <div>
                    <h3>{shortTitle(t.title)}</h3>
                    <p>{t.blurb}</p>
                    <span className="openlabel">Open calculator</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="section" aria-labelledby="topics-title">
          <div className="sectionheading">
            <div>
              <p className="eyebrow">UK TOPICS</p>
              <h2 id="topics-title">Browse by topic</h2>
            </div>
          </div>
          <nav className="categoryjump" aria-labelledby="topics-title">
            {CATS.map((c) => (
              <Link key={c.slug} href={`/uk/${c.slug}`}>
                {label(c)} ({getCalculatorsByCategory(c.slug).length})
              </Link>
            ))}
          </nav>
        </section>

        <section className="section gm-prose" aria-labelledby="about-title">
          <h2 id="about-title">About SumAtlas</h2>
          <p>
            SumAtlas is a free, independent calculator site. Every calculator uses the current official rates for its country, shows the assumptions
            it makes, and comes with a guide that explains the rules in plain English. There is no sign-up, and we do not store what you type. Read{" "}
            <Link href="/how-we-check">how we check our figures</Link> or <Link href="/about">more about us</Link>.
          </p>
        </section>
      </div>
    </GmShell>
  );
}
