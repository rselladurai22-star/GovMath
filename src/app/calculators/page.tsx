import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import PageHero from "@/components/PageHero";
import HomeSearch, { type SearchItem } from "@/components/HomeSearch";
import { HomeMotion } from "@/components/home/Motion";
import { accentVars, CAT, LineIcon } from "@/components/category-style";
import { CALCULATORS, CATEGORIES } from "@/lib/calculators";
import styles from "@/components/GovmathHome.module.css";

export const metadata: Metadata = {
  title: "All Calculators",
  description:
    "Every GovMath calculator in one place — tax, benefits, property and pensions. Free, plain English, no sign-up.",
};

export default function AllCalculatorsPage() {
  const searchItems: SearchItem[] = CALCULATORS.map((c) => ({
    title: c.title,
    href: c.href,
    category: CAT[c.category].label,
  }));

  return (
    <div id="gm-all" className={styles.page}>
      <HomeMotion rootId="gm-all" />
      <PageHero
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/calculators", label: "All calculators" },
        ]}
        eyebrow={`${CALCULATORS.length} calculators · 2025/26 rates`}
        title="All calculators"
        lead={`Every free UK calculator on GovMath, across ${CATEGORIES.length} topics. Search, or jump to a topic.`}
      >
        <div id="search" className="relative z-10 max-w-[660px] scroll-mt-24">
          <HomeSearch items={searchItems} />
        </div>
      </PageHero>

      <div className={`gm-wrap ${styles.allBody}`}>
        <nav aria-label="Jump to topic" className={styles.jump}>
          {CATEGORIES.map((c) => (
            <a key={c.slug} href={`#${c.slug}`} style={accentVars(c.slug)}>
              <LineIcon path={CAT[c.slug].icon} size={17} />
              {CAT[c.slug].label}
            </a>
          ))}
        </nav>

        <div className={styles.panels}>
          {CATEGORIES.map((cat, idx) => {
            const items = CALCULATORS.filter((c) => c.category === cat.slug);
            if (items.length === 0) return null;
            return (
              <div key={cat.slug} className={styles.panelGroup}>
                <section id={cat.slug} aria-labelledby={`${cat.slug}-heading`} className={styles.panel} style={accentVars(cat.slug)} data-reveal>
                  <header className={styles.panelHead}>
                    <span className={styles.panelIcon}>
                      <LineIcon path={CAT[cat.slug].icon} size={26} />
                    </span>
                    <div>
                      <h2 id={`${cat.slug}-heading`}>{cat.title}</h2>
                      <p>{cat.tagline}</p>
                    </div>
                    <Link href={cat.href} className={styles.panelPill}>
                      {items.length} calculators
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden="true" className={styles.arrow}>
                        <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </header>
                  <ul className={`${styles.tiles} ${styles.tilesRich}`}>
                    {items.map((c) => (
                      <li key={c.href}>
                        <Link href={c.href}>
                          <span>
                            <strong>{c.title}</strong>
                            <small>{c.blurb}</small>
                          </span>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
                            <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
                {idx === 3 && <AdSlot size="leaderboard" />}
              </div>
            );
          })}
        </div>

        <div className={styles.adRow}>
          <AdSlot size="billboard" />
        </div>
      </div>
    </div>
  );
}
