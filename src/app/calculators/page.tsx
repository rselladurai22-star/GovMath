import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import { Crumbs } from "@/components/ContentPage";
import { shortTitle } from "@/components/category-style";
import GmShell from "@/gm/GmShell";
import cats from "@/gm/categories.json";
import { CALCULATORS, getCalculatorsByCategory, type CategorySlug } from "@/lib/calculators";

export const metadata: Metadata = {
  title: "All Calculators",
  description:
    "Every GovMath calculator in one place — tax, benefits, property and pensions. Free, plain English, no sign-up.",
  alternates: { canonical: "/calculators" },
};

type Cat = { slug: CategorySlug; label: string; desc: string; toolIcon: string };
const CATS = cats as Cat[];
const label = (c: Cat) => c.label.replace(/&amp;/g, "&");

/** Every calculator, grouped by topic, in the design's topic-page markup. */
export default function AllCalculatorsPage() {
  return (
    <GmShell>
      <div className="wrap">
        <Crumbs
          items={[
            { href: "/", label: "Home" },
            { href: "/calculators", label: "All calculators" },
          ]}
        />
        <section className="categoryhero">
          <p className="eyebrow">{CALCULATORS.length} FREE TOOLS · 2026/27 RATES</p>
          <h1>All calculators</h1>
          <p>Every free UK calculator on GovMath, across {CATS.length} topics. Search from the top of the page, or jump to a topic.</p>
        </section>
        <nav className="categoryjump" aria-label="Jump to topic">
          {CATS.map((c) => (
            <a key={c.slug} href={`#${c.slug}`}>
              {label(c)}
            </a>
          ))}
        </nav>
        {CATS.map((c, idx) => {
          const tools = getCalculatorsByCategory(c.slug);
          return (
            <section key={c.slug} id={c.slug} className="section" aria-labelledby={`${c.slug}-title`}>
              <div className="sectionheading">
                <div>
                  <p className="eyebrow">{tools.length} TOOLS</p>
                  <h2 id={`${c.slug}-title`}>{label(c)}</h2>
                </div>
                <Link className="textbutton" href={`/${c.slug}`}>
                  View topic
                </Link>
              </div>
              <p>{c.desc.replace(/&amp;/g, "&")}</p>
              <div className="fullcategory">
                {tools.map((t) => (
                  <Link key={t.href} className="categorytool" href={t.href}>
                    <span className="toolicon" dangerouslySetInnerHTML={{ __html: c.toolIcon }} />
                    <div>
                      <h3>{shortTitle(t.title)}</h3>
                      <p>{t.blurb}</p>
                      <span className="openlabel">Open calculator</span>
                    </div>
                  </Link>
                ))}
              </div>
              {idx === 3 && <AdSlot size="leaderboard" />}
            </section>
          );
        })}
      </div>
    </GmShell>
  );
}
