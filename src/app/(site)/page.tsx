import type { Metadata } from "next";
import Link from "next/link";
import GmShell from "@/gm/GmShell";
import cats from "@/gm/categories.json";
import { ogFor } from "@/gm/og";
import { ToolGrid } from "@/components/ToolGrid";
import PostCard from "@/components/blog/PostCard";
import { CALCULATORS, getCalculatorsByCategory, type CategorySlug } from "@/lib/calculators";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: { absolute: "SumAtlas: UK Benefits, Family and Student Money Calculators" },
  description:
    "Free UK calculators for Universal Credit, housing support, Child Benefit, childcare, council tax, renting and student finance, with 2026/27 rates and guides.",
  alternates: { canonical: "/" },
  openGraph: ogFor("/"),
};

type Cat = { slug: CategorySlug; label: string; desc: string; toolIcon: string };
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
    text: "Rates and rules come from the bodies that set them wherever we can: the DWP, HMRC, GOV.UK, the student finance bodies and councils. Every guide and article lists its sources.",
  },
  {
    title: "One set of sums, tested",
    text: "Each topic's rules are written once as calculation code, which drives the calculator and is used to work out the figures in its guide. Hundreds of automated tests check it against official examples.",
  },
  {
    title: "Checked and dated",
    text: "Every calculator shows when its page last changed. We recheck the rates whenever they change: each April for benefits and council tax, and each year for student finance.",
  },
  {
    title: "Independent and free",
    text: "SumAtlas is not part of any government or council, and no bank or lender pays to appear in our calculators. There is no sign-up and no account to create.",
  },
];

/**
 * The home page (sumatlas.com/). Since 26 November 2026 the site covers one
 * sector, UK benefits, family, renting and student money: the page lists the
 * three topics with all their calculators.
 */
export default function Home() {
  return (
    <GmShell>
      <div className="wrap gm-hub gm-home">
        <section className="categoryhero">
          <h1>UK benefits, family, renting and student money calculators</h1>
          <p>
            Work out Universal Credit, help with rent and council tax, Child Benefit and childcare support, and student finance with{" "}
            {CALCULATORS.length} free calculators built on the 2026/27 rules. Each one shows its working, says what it assumes, and comes with
            a plain-English guide.
          </p>
        </section>

        <section className="section" aria-labelledby="popular-title">
          <Heading id="popular-title" eyebrow="START HERE" title="Most used calculators" link={{ href: "/calculators", label: "All calculators" }} />
          <ToolGrid tools={CALCULATORS.filter((c) => c.popular)} icon={CATS[0].toolIcon} />
        </section>

        {CATS.map((c) => {
          const tools = getCalculatorsByCategory(c.slug);
          return (
            <section key={c.slug} className="section" aria-labelledby={`${c.slug}-title`}>
              <Heading
                id={`${c.slug}-title`}
                eyebrow={`${tools.length} CALCULATORS`}
                title={c.label.replace(/&amp;/g, "&")}
                link={{ href: `/uk/${c.slug}`, label: "View topic" }}
              />
              <p>{c.desc.replace(/&amp;/g, "&")}</p>
              <ToolGrid tools={tools} icon={c.toolIcon} />
            </section>
          );
        })}

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
            SumAtlas is a free, independent site of UK calculators for benefits, family support, renting, council tax and student finance,
            written and maintained by the SumAtlas team. Every calculator uses the current official rates, shows the assumptions it makes, and
            comes with a guide that explains the rules in plain English. Our calculators give estimates for general information, not financial,
            tax, legal or benefits advice: the DWP, HMRC, your council or your student finance body makes the real decision. Read{" "}
            <Link href="/how-we-check">how we check our figures</Link> or <Link href="/about">more about us</Link>.
          </p>
        </section>
      </div>
    </GmShell>
  );
}
