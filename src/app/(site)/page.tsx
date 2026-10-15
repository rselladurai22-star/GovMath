import type { Metadata } from "next";
import Link from "next/link";
import GmShell from "@/gm/GmShell";
import cats from "@/gm/categories.json";
import { ogFor } from "@/gm/og";
import { TOPIC_ICON, ToolGrid } from "@/components/TopicHub";
import PostCard from "@/components/blog/PostCard";
import { CALCULATORS, US_CATEGORIES, getCalculatorsByCategory, type CategorySlug } from "@/lib/calculators";
import { getAllPosts } from "@/lib/blog";
import { POPULAR_EVERYDAY, POPULAR_UK, POPULAR_US, pick } from "@/lib/home-picks";
import { alternatesFor } from "@/lib/seo/hreflang";

export const metadata: Metadata = {
  title: { absolute: "SumAtlas: Free UK and US Tax and Money Calculators" },
  description:
    "Free tax, pay, mortgage, benefits, loan and retirement calculators for the UK and the US, with plain-English guides and figures checked against official rates.",
  alternates: alternatesFor("/"),
  openGraph: ogFor("/"),
};

type Cat = { slug: CategorySlug; label: string };
const CATS = cats as Cat[];

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

const TRUST = [
  {
    title: "Official figures",
    text: "Rates and rules come from the bodies that set them wherever we can: HMRC, the DWP and GOV.UK in the UK; the IRS and the Social Security Administration in the US. Every guide and article lists its sources.",
  },
  {
    title: "One set of sums, tested",
    text: "Each topic's rules are written once as calculation code, which drives the calculator and is used to work out the figures in its guide. Hundreds of automated tests check it against official examples.",
  },
  {
    title: "Checked and dated",
    text: "Every calculator shows when its page last changed. We recheck the rates whenever they change: each April for UK tax and benefits, and each autumn for the next year's IRS figures.",
  },
  {
    title: "Independent and free",
    text: "SumAtlas is not part of any government, and no bank or lender pays to appear in our calculators. There is no sign-up and no account to create.",
  },
];

/**
 * The home page (sumatlas.com/). Since 15 October 2026 it is a real page
 * shown to everyone, not a redirect to /uk or /us by location: AdSense
 * reviewers and Google crawl from the US, and the address people type should
 * show the whole site. Visitors pick their country from the cards or the
 * header's country menu.
 */
export default function Home() {
  const uk = CALCULATORS.filter((c) => c.country === "uk").length;
  const us = CALCULATORS.filter((c) => c.country === "us").length;
  const everyday = getCalculatorsByCategory("everyday").length;
  return (
    <GmShell>
      <div className="wrap gm-hub gm-home">
        <section className="categoryhero">
          <h1>Free calculators. Clear answers.</h1>
          <p>
            Work out your take-home pay, tax, mortgage, benefits, loans and retirement with calculators built on the official rules where you live.
            Each one shows its working, says what it assumes, and comes with a plain-English guide.
          </p>
        </section>

        <section className="section" aria-labelledby="countries-title">
          <Heading id="countries-title" eyebrow="START HERE" title="Choose your country" />
          <div className="gm-cards">
            <Link href="/uk" className="gm-card">
              <small>United Kingdom · 2026/27 tax year</small>
              <strong>{uk} UK calculators</strong>
              <p>
                Income Tax and take-home pay, Stamp Duty and mortgages, Universal Credit and other benefits, student loans, pensions and car tax.
              </p>
              <span className="gm-go">Open UK calculators</span>
            </Link>
            <Link href="/us" className="gm-card">
              <small>United States · 2026</small>
              <strong>{us} US calculators</strong>
              <p>
                Your paycheck with federal and state income tax, mortgages and home affordability, loans and credit cards, 401(k), IRAs and
                Social Security.
              </p>
              <span className="gm-go">Open US calculators</span>
            </Link>
            <Link href="/everyday" className="gm-card">
              <small>Anywhere</small>
              <strong>{everyday} everyday calculators</strong>
              <p>Percentages, ages and dates, hours and timesheets, discounts and fuel economy: sums that work the same wherever you live.</p>
              <span className="gm-go">Open everyday calculators</span>
            </Link>
          </div>
        </section>

        <section className="section" aria-labelledby="uk-title">
          <Heading id="uk-title" eyebrow="UNITED KINGDOM" title="Popular UK calculators" link={{ href: "/uk", label: "All UK calculators" }} />
          <ToolGrid tools={pick(POPULAR_UK)} icon={TOPIC_ICON.tax} />
        </section>

        <section className="section" aria-labelledby="us-title">
          <Heading id="us-title" eyebrow="UNITED STATES" title="Popular US calculators" link={{ href: "/us", label: "All US calculators" }} />
          <ToolGrid tools={pick(POPULAR_US)} icon={TOPIC_ICON.tax} />
        </section>

        <section className="section" aria-labelledby="topics-title">
          <Heading id="topics-title" eyebrow="BROWSE" title="Browse by topic" link={{ href: "/calculators", label: "See all calculators" }} />
          <p className="gm-topicgroup">United Kingdom</p>
          <nav className="categoryjump" aria-label="UK topics">
            {CATS.map((c) => (
              <Link key={c.slug} href={`/uk/${c.slug}`}>
                {c.label.replace(/&amp;/g, "&")} ({getCalculatorsByCategory(c.slug).filter((t) => t.country === "uk").length})
              </Link>
            ))}
          </nav>
          <p className="gm-topicgroup">United States</p>
          <nav className="categoryjump" aria-label="US topics">
            {US_CATEGORIES.map((c) => (
              <Link key={c.slug} href={c.href}>
                {c.title} ({getCalculatorsByCategory(c.slug).length})
              </Link>
            ))}
          </nav>
        </section>

        <section className="section" aria-labelledby="everyday-title">
          <Heading id="everyday-title" eyebrow="FOR EVERYONE" title="Everyday calculators" link={{ href: "/everyday", label: "See all" }} />
          <ToolGrid tools={pick(POPULAR_EVERYDAY)} icon={TOPIC_ICON.everyday} />
        </section>

        <section className="section" aria-labelledby="trust-title">
          <Heading id="trust-title" eyebrow="HOW WE WORK" title="Why you can rely on the figures" link={{ href: "/how-we-check", label: "How we check" }} />
          <div className="gm-cards gm-trustcards">
            {TRUST.map((t) => (
              <div key={t.title} className="gm-card">
                <strong>{t.title}</strong>
                <p>{t.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section" aria-labelledby="guides-title">
          <Heading id="guides-title" eyebrow="GUIDES" title="Latest guides" link={{ href: "/blog", label: "All guides" }} />
          <div className="gm-cards">
            {getAllPosts()
              .slice(0, 3)
              .map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
          </div>
        </section>

        <section className="section gm-prose" aria-labelledby="about-title">
          <h2 id="about-title">About SumAtlas</h2>
          <p>
            SumAtlas is a free, independent calculator site for the UK and the US, written and maintained by the SumAtlas team. Every calculator
            uses the current official rates for its country, shows the assumptions it makes, and comes with a guide that explains the rules in
            plain English. Our calculators give estimates for general information, not financial, tax, legal or medical advice. Read{" "}
            <Link href="/how-we-check">how we check our figures</Link> or <Link href="/about">more about us</Link>.
          </p>
        </section>
      </div>
    </GmShell>
  );
}
