import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import { Crumbs } from "@/components/ContentPage";
import GmShell from "@/gm/GmShell";
import cats from "@/gm/categories.json";
import { CALCULATORS, getCalculatorsByCategory, shortTitle, type CategorySlug } from "@/lib/calculators";

export const metadata: Metadata = {
  title: "All UK Benefits and Family Money Calculators",
  description:
    "Every free SumAtlas calculator in one list: UK benefits and family support, renting and council tax, and student finance, with 2026/27 figures.",
  alternates: { canonical: "/calculators" },
};

type Cat = { slug: CategorySlug; label: string; desc: string; toolIcon: string };
const CATS = cats as Cat[];
const plain = (s: string) => s.replace(/&amp;/g, "&");

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
          <h1>All calculators</h1>
          <p>
            All {CALCULATORS.length} free calculators on SumAtlas, for UK benefits, family, renting and student money. Search
            from the top of the page, or jump to a topic.
          </p>
        </section>
        <nav className="categoryjump" aria-label="Jump to topic">
          {CATS.map((t) => (
            <a key={t.slug} href={`#${t.slug}`}>
              {plain(t.label)}
            </a>
          ))}
        </nav>
        {CATS.map((t, i) => {
          const tools = getCalculatorsByCategory(t.slug);
          return (
            <section key={t.slug} id={t.slug} className="section" aria-labelledby={`${t.slug}-title`}>
              <div className="sectionheading">
                <div>
                  <p className="eyebrow">{tools.length} TOOLS</p>
                  <h2 id={`${t.slug}-title`}>{plain(t.label)}</h2>
                </div>
                <Link className="textbutton" href={`/uk/${t.slug}`}>
                  View topic
                </Link>
              </div>
              <p>{plain(t.desc)}</p>
              <div className="fullcategory">
                {tools.map((c) => (
                  <Link key={c.href} className="categorytool" href={c.href}>
                    <span className="toolicon" dangerouslySetInnerHTML={{ __html: t.toolIcon }} />
                    <div>
                      <h3>{shortTitle(c.title)}</h3>
                      <p>{c.blurb}</p>
                      <span className="openlabel">Open calculator</span>
                    </div>
                  </Link>
                ))}
              </div>
              {i === 0 && <AdSlot size="leaderboard" />}
            </section>
          );
        })}
      </div>
    </GmShell>
  );
}
