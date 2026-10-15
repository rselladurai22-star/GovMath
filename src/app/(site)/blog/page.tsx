import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import { Crumbs } from "@/components/ContentPage";
import PostCard from "@/components/blog/PostCard";
import GmShell from "@/gm/GmShell";
import cats from "@/gm/categories.json";
import { getAllPosts } from "@/lib/blog";
import { EVERYDAY, US_CATEGORIES, getCalculatorsByCategory, shortTitle, type AnyCategory, type CategorySlug } from "@/lib/calculators";

export const metadata: Metadata = {
  title: "UK and US Money Guides 2026: Tax, Pay and Homes",
  description:
    "Plain-English guides to UK and US tax, pay, homes, benefits, loans and retirement for 2026, each with a free calculator to run your own numbers.",
  alternates: { canonical: "/blog" },
};

type Cat = { slug: CategorySlug; label: string; desc: string; toolIcon: string };
const CATS = cats as Cat[];
const plain = (s: string) => s.replace(/&amp;/g, "&");

/** Where each calculator's guide starts. The two pages taken from the design package name theirs. */
const GUIDE_ANCHOR: Record<string, string> = {
  "/uk/tax-and-salary/salary-calculator": "#salary-guide",
  "/uk/property/mortgage-repayment": "#mortgage-guide",
};
const guideHref = (href: string) => href + (GUIDE_ANCHOR[href] ?? "#guide");

/** One topic's list of guides: its anchor, jump-link label, heading, intro, icon and calculators. */
type Topic = { slug: AnyCategory; nav: string; heading: string; desc: string; icon: string; onlyCountry?: "uk" };

/** US and Everyday topics borrow the matching UK topic's icon (as on the all calculators page). */
const icon = (slug: CategorySlug) => CATS.find((c) => c.slug === slug)?.toolIcon ?? "";
const US_ICON: Record<string, CategorySlug> = { "us-taxes": "tax-and-salary", "us-housing": "property", "us-loans": "business", "us-savings": "investing" };

/**
 * UK topics first, then the US topics, then Everyday. The UK's Everyday life
 * topic lists its UK calculators only: the shared Everyday ones have their own
 * list at the end.
 */
const TOPICS: Topic[] = [
  ...CATS.map((c) => ({ slug: c.slug, nav: plain(c.label), heading: plain(c.label), desc: plain(c.desc), icon: c.toolIcon, onlyCountry: "uk" as const })),
  ...US_CATEGORIES.map((c) => ({
    slug: c.slug,
    nav: `US ${c.title.toLowerCase()}`,
    heading: `US ${c.title.toLowerCase()}`,
    desc: c.description,
    icon: icon(US_ICON[c.slug]),
  })),
  { slug: EVERYDAY.slug, nav: "Everyday", heading: "Everyday", desc: EVERYDAY.description, icon: icon("life") },
];

/**
 * Every guide on the site: the articles, then the long-form guide that sits
 * under each calculator, grouped by topic.
 */
export default function GuidesPage() {
  const posts = getAllPosts();

  return (
    <GmShell>
      <div className="wrap">
        <Crumbs
          items={[
            { href: "/", label: "Home" },
            { href: "/blog", label: "Guides" },
          ]}
        />
        <section className="categoryhero">
          <h1>UK and US money rules, explained</h1>
          <p>
            Clear, in-depth guides to the UK and US rules that affect your money, and to everyday sums, written the way
            we&rsquo;d explain them to a friend. Every calculator comes with its own guide, with worked examples, charts
            and links to the official sources.
          </p>
        </section>
        <nav className="categoryjump" aria-label="Jump to topic">
          <a href="#articles">Articles</a>
          {TOPICS.map((t) => (
            <a key={t.slug} href={`#${t.slug}`}>
              {t.nav}
            </a>
          ))}
        </nav>

        <section id="articles" className="section" aria-labelledby="articles-title">
          <p className="eyebrow">ARTICLES</p>
          <h2 id="articles-title">In-depth articles</h2>
          <div className="gm-cards gm-postlist">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>

        <AdSlot size="leaderboard" />

        {TOPICS.map((t) => {
          const tools = getCalculatorsByCategory(t.slug).filter((c) => !t.onlyCountry || c.country === t.onlyCountry);
          return (
            <section key={t.slug} id={t.slug} className="section" aria-labelledby={`${t.slug}-guides`}>
              <p className="eyebrow">
                {tools.length} {tools.length === 1 ? "GUIDE" : "GUIDES"}
              </p>
              <h2 id={`${t.slug}-guides`}>{t.heading} guides</h2>
              <p>{t.desc}</p>
              <div className="fullcategory">
                {tools.map((c) => (
                  <Link key={c.href} className="categorytool" href={guideHref(c.href)}>
                    <span className="toolicon" dangerouslySetInnerHTML={{ __html: t.icon }} />
                    <div>
                      <h3>{shortTitle(c.title)} guide</h3>
                      <p>{c.blurb}</p>
                      <span className="openlabel">Read the guide</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </GmShell>
  );
}
