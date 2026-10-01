import Link from "next/link";
import {
  CATEGORIES,
  CALCULATORS,
  getCalculatorsByCategory,
  getCategory,
  type CategorySlug,
} from "@/lib/calculators";
import { accentVars, CAT, ICON, iconForTitle, LineIcon, shortTitle } from "@/components/category-style";
import { HomeMotion } from "@/components/home/Motion";
import CategoryTools, { type ToolItem } from "@/components/CategoryTools";
import AdSlot from "@/components/AdSlot";
import PageHero, { HeroPills } from "@/components/PageHero";
import styles from "./CategoryLanding.module.css";

type CategoryLandingProps = {
  slug: CategorySlug;
  /** Short context line rendered as the hero eyebrow. */
  heroBadge?: string;
  /** Optional H1 override. */
  heading?: string;
  /** Optional long-form SEO prose rendered under the grid. */
  longCopy?: React.ReactNode;
};

const WHY = [
  { title: "Built on official rates", body: "Every calculation uses published HMRC, DWP and GOV.UK figures for the current tax year.", path: "M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6l7-3zM9 12l2 2 4-4" },
  { title: "Answers in seconds", body: "Change a number and see the result update — no forms to submit, no waiting.", path: "M13 3L4 14h6l-1 7 9-11h-6l1-7z" },
  { title: "Private by design", body: "Your figures stay in your browser. No account, no tracking of what you enter.", path: "M6 10V8a6 6 0 1112 0v2m-8 4h4M7 10h10a1 1 0 011 1v7a1 1 0 01-1 1H7a1 1 0 01-1-1v-7a1 1 0 011-1z" },
  { title: "The maths, explained", body: "Plain-English guides show how each figure is worked out, step by step.", path: "M7 3h7l5 5v12a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1zm7 0v5h5M9 13h6M9 17h4" },
];

export default function CategoryLanding({
  slug,
  heroBadge,
  heading,
  longCopy,
}: CategoryLandingProps) {
  const category = getCategory(slug);
  const meta = CAT[slug];
  const items = getCalculatorsByCategory(slug);
  const total = CALCULATORS.length;

  const tools: ToolItem[] = items.map((c) => ({
    title: shortTitle(c.title),
    href: c.href,
    blurb: c.blurb,
    popular: c.popular,
    iconPath: iconForTitle(c.title, slug),
  }));

  return (
    <div className={styles.page} id="gm-cat-page" style={accentVars(slug)}>
      <HomeMotion rootId="gm-cat-page" />
      <PageHero
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/calculators", label: "All calculators" },
          { href: category.href, label: meta.label },
        ]}
        eyebrow={heroBadge ?? `${items.length} calculators · 2025/26 rates`}
        title={heading ?? `${category.title} calculators`}
        lead={category.description}
        icon={meta.icon}
        tone={slug}
      >
        <HeroPills items={["Free to use", "UK rules", "No sign-up", "Updated for 2025/26"]} />
      </PageHero>

      <div className={`gm-wrap ${styles.grid}`}>
        <aside className={styles.sidebar} data-reveal>
          <div className={styles.sideCard}>
            <div className={styles.sideTitle}>Topics</div>
            <nav className={styles.catNav} aria-label="Topics">
              {CATEGORIES.map((c) => {
                const m = CAT[c.slug];
                const count = getCalculatorsByCategory(c.slug).length;
                const active = c.slug === slug;
                return (
                  <Link
                    key={c.slug}
                    href={c.href}
                    className={`${styles.catNavItem} ${active ? styles.active : ""}`}
                    style={accentVars(c.slug)}
                    aria-current={active ? "page" : undefined}
                  >
                    <span className={styles.catNavIcon}>
                      <LineIcon path={m.icon} size={19} />
                    </span>
                    <span className={styles.catNavText}>
                      <span className={styles.catNavName}>{m.label}</span>
                      <span className={styles.catNavCount}>{count}</span>
                    </span>
                  </Link>
                );
              })}
              <Link href="/calculators" className={styles.catNavItem}>
                <span className={styles.catNavIcon}>
                  <LineIcon path={ICON.grid} size={19} />
                </span>
                <span className={styles.catNavText}>
                  <span className={styles.catNavName}>All calculators</span>
                  <span className={styles.catNavCount}>{total}</span>
                </span>
              </Link>
            </nav>
          </div>

          <div className={styles.promo}>
            <span className={styles.promoTag}>Guides</span>
            <div className={styles.promoTitle}>Plan better. Save more.</div>
            <p className={styles.promoBody}>
              Plain-English guides to the rules behind the numbers.
            </p>
            <Link href="/blog" className={styles.promoLink}>
              Explore guides
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          <div className={styles.sideAd}>
            <AdSlot size="mpu" />
          </div>
        </aside>

        <CategoryTools label={meta.short} tools={tools} />
      </div>

      <div className={`gm-wrap ${styles.adRow}`}>
        <AdSlot size="leaderboard" />
      </div>

      <section className={styles.whySection} aria-labelledby="why-heading">
        <div className="gm-wrap">
          <div data-reveal>
            <span className={styles.kicker}>Why GovMath</span>
            <h2 id="why-heading" className={styles.blockTitle}>
              Clearer numbers, every time
            </h2>
          </div>
          <div className={styles.whyGrid}>
            {WHY.map((w, i) => (
              <div key={w.title} className={styles.whyCard} data-reveal data-spot style={{ ["--d" as string]: `${i * 70}ms` }}>
                <span className={styles.whyIcon}>
                  <LineIcon path={w.path} size={24} />
                </span>
                <h3 className={styles.whyCardTitle}>{w.title}</h3>
                <p className={styles.whyBody}>{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {longCopy && (
        <section className={`gm-wrap ${styles.longWrap}`} data-reveal>
          <div className={`gm-prose ${styles.longCopy}`}>{longCopy}</div>
        </section>
      )}
    </div>
  );
}
