import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import { Crumbs } from "@/components/ContentPage";
import PostCard from "@/components/blog/PostCard";
import GmShell from "@/gm/GmShell";
import cats from "@/gm/categories.json";
import { getAllPosts } from "@/lib/blog";
import { getCalculatorsByCategory, shortTitle, type CategorySlug } from "@/lib/calculators";

export const metadata: Metadata = {
  title: "UK Benefits, Family and Student Money Guides",
  description:
    "Plain-English guides to UK benefits, childcare, renting, council tax and student finance for 2026/27, each with a free calculator to run your own numbers.",
  alternates: { canonical: "/blog" },
};

type Cat = { slug: CategorySlug; label: string; desc: string; toolIcon: string };
const CATS = cats as Cat[];
const plain = (s: string) => s.replace(/&amp;/g, "&");

const guideHref = (href: string) => `${href}#guide`;

/** One topic's list of guides: its anchor, jump-link label, heading, intro, icon and calculators. */
type Topic = { slug: CategorySlug; nav: string; heading: string; desc: string; icon: string };

const TOPICS: Topic[] = CATS.map((c) => ({ slug: c.slug, nav: plain(c.label), heading: plain(c.label), desc: plain(c.desc), icon: c.toolIcon }));

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
          <h1>UK benefits, family and student money, explained</h1>
          <p>
            Clear, in-depth guides to the UK rules on benefits, childcare, renting, council tax and student finance,
            written the way we&rsquo;d explain them to a friend. Every calculator comes with its own guide, with worked examples, charts
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
          const tools = getCalculatorsByCategory(t.slug);
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
