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
  title: "UK Money Guides 2026/27",
  description:
    "Plain-English guides to UK tax, pay, property, benefits, pensions and student loans for 2026/27, each with a free calculator to run your own numbers.",
  alternates: { canonical: "/blog" },
};

type Cat = { slug: CategorySlug; label: string; desc: string; toolIcon: string };
const CATS = cats as Cat[];
const label = (c: Cat) => c.label.replace(/&amp;/g, "&");

/** Where each calculator's guide starts. The two pages taken from the design package name theirs. */
const GUIDE_ANCHOR: Record<string, string> = {
  "/uk/tax-and-salary/salary-calculator": "#salary-guide",
  "/uk/property/mortgage-repayment": "#mortgage-guide",
};
const guideHref = (href: string) => href + (GUIDE_ANCHOR[href] ?? "#guide");

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
          <h1>UK money rules, explained</h1>
          <p>
            Clear, in-depth guides to the UK rules that affect your money, written the way we&rsquo;d explain them to a friend. Every
            calculator comes with its own guide, with worked examples, charts and links to the official sources.
          </p>
        </section>
        <nav className="categoryjump" aria-label="Jump to topic">
          <a href="#articles">Articles</a>
          {CATS.map((c) => (
            <a key={c.slug} href={`#${c.slug}`}>
              {label(c)}
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

        {CATS.map((c) => {
          const tools = getCalculatorsByCategory(c.slug);
          return (
            <section key={c.slug} id={c.slug} className="section" aria-labelledby={`${c.slug}-guides`}>
              <p className="eyebrow">
                {tools.length} {tools.length === 1 ? "GUIDE" : "GUIDES"}
              </p>
              <h2 id={`${c.slug}-guides`}>{label(c)} guides</h2>
              <p>{c.desc.replace(/&amp;/g, "&")}</p>
              <div className="fullcategory">
                {tools.map((t) => (
                  <Link key={t.href} className="categorytool" href={guideHref(t.href)}>
                    <span className="toolicon" dangerouslySetInnerHTML={{ __html: c.toolIcon }} />
                    <div>
                      <h3>{shortTitle(t.title)} guide</h3>
                      <p>{t.blurb}</p>
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
