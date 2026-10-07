import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import { Crumbs } from "@/components/ContentPage";
import GmShell from "@/gm/GmShell";
import cats from "@/gm/categories.json";
import { EVERYDAY, US_CATEGORIES, getCalculatorsByCategory, shortTitle, type AnyCategory, type CategorySlug } from "@/lib/calculators";

export const metadata: Metadata = {
  title: "All Calculators: UK, US and Everyday",
  description:
    "Every free SumAtlas calculator in one list: UK tax, property, benefits and pensions, US paycheck, tax, mortgage and retirement, and everyday calculators.",
  alternates: { canonical: "/calculators" },
};

type Cat = { slug: CategorySlug; label: string; desc: string; toolIcon: string };
const CATS = cats as Cat[];
const plain = (s: string) => s.replace(/&amp;/g, "&");

/** One topic as a section: id, heading, intro, link to its page, icon and its calculators. */
type Topic = { id: string; slug: AnyCategory; title: string; desc: string; href: string; icon: string; onlyCountry?: "uk" };

/** The icon for US and Everyday topics: the matching UK topic's icon. */
const icon = (slug: CategorySlug) => CATS.find((c) => c.slug === slug)?.toolIcon ?? "";
const US_ICON: Record<string, CategorySlug> = { "us-taxes": "tax-and-salary", "us-housing": "property", "us-loans": "business", "us-savings": "investing" };

const GROUPS: { country: string; topics: Topic[] }[] = [
  {
    country: "United Kingdom",
    topics: CATS.map((c) => ({ id: c.slug, slug: c.slug, title: plain(c.label), desc: plain(c.desc), href: `/uk/${c.slug}`, icon: c.toolIcon, onlyCountry: "uk" })),
  },
  {
    country: "United States",
    topics: US_CATEGORIES.map((c) => ({ id: c.slug, slug: c.slug, title: c.title, desc: c.tagline, href: c.href, icon: icon(US_ICON[c.slug]) })),
  },
  {
    country: "Everywhere",
    topics: [{ id: "everyday", slug: "everyday", title: EVERYDAY.title, desc: EVERYDAY.tagline, href: EVERYDAY.href, icon: icon("life") }],
  },
];

/** Every calculator, grouped by country and topic, in the design's topic-page markup. */
export default function AllCalculatorsPage() {
  const total = GROUPS.flatMap((g) => g.topics).reduce((n, t) => n + getCalculatorsByCategory(t.slug).filter((c) => !t.onlyCountry || c.country === t.onlyCountry).length, 0);
  const order = GROUPS.flatMap((g) => g.topics.map((t) => t.id));
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
          <p>All {total} free calculators on SumAtlas: for the UK, for the US, and everyday sums that work anywhere. Search from the top of the page, or jump to a topic.</p>
        </section>
        <nav className="categoryjump" aria-label="Jump to topic">
          {GROUPS.flatMap((g) => g.topics).map((t) => (
            <a key={t.id} href={`#${t.id}`}>
              {t.slug.startsWith("us-") ? `US: ${t.title}` : t.title}
            </a>
          ))}
        </nav>
        {GROUPS.map((g) => (
          <div key={g.country}>
            <h2 className="gm-countryheading">{g.country}</h2>
            {g.topics.map((t) => {
              const tools = getCalculatorsByCategory(t.slug).filter((c) => !t.onlyCountry || c.country === t.onlyCountry);
              return (
                <section key={t.id} id={t.id} className="section" aria-labelledby={`${t.id}-title`}>
                  <div className="sectionheading">
                    <div>
                      <p className="eyebrow">{tools.length} TOOLS</p>
                      <h2 id={`${t.id}-title`}>{t.title}</h2>
                    </div>
                    <Link className="textbutton" href={t.href}>
                      View topic
                    </Link>
                  </div>
                  <p>{t.desc}</p>
                  <div className="fullcategory">
                    {tools.map((c) => (
                      <Link key={c.href} className="categorytool" href={c.href}>
                        <span className="toolicon" dangerouslySetInnerHTML={{ __html: t.icon }} />
                        <div>
                          <h3>{shortTitle(c.title)}</h3>
                          <p>{c.blurb}</p>
                          <span className="openlabel">Open calculator</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                  {order.indexOf(t.id) === 3 && <AdSlot size="leaderboard" />}
                </section>
              );
            })}
          </div>
        ))}
      </div>
    </GmShell>
  );
}
