import Link from "next/link";
import Image from "next/image";
import {
  CATEGORIES,
  CALCULATORS,
  getCalculatorsByCategory,
  getCategory,
  type CategorySlug,
} from "@/lib/calculators";
import { CAT, ICON, iconForTitle, LineIcon } from "@/components/category-style";
import CategoryTools, { type ToolItem } from "@/components/CategoryTools";
import AdSlot from "@/components/AdSlot";
import styles from "./CategoryLanding.module.css";

type CategoryLandingProps = {
  slug: CategorySlug;
  /** Kept for compatibility with existing route pages (rendered as eyebrow). */
  heroBadge?: string;
  /** Optional H1 override. */
  heading?: string;
  /** Optional long-form SEO prose rendered under the grid. */
  longCopy?: React.ReactNode;
};

const WHY = [
  { title: "Accurate & Reliable", body: "All calculations use official UK data and trusted sources.", color: "#126CF3", bg: "#eaf2fe", path: "M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6l7-3z", inner: "M9 12l2 2 4-4" },
  { title: "Fast & Easy", body: "Get answers in seconds with simple and intuitive tools.", color: "#18B063", bg: "#e7f7ef", path: "M13 3L4 14h6l-1 7 9-11h-6l1-7z" },
  { title: "Private & Secure", body: "We don't store your personal information — ever.", color: "#8647F1", bg: "#f2ebfe", path: "M6 10V8a6 6 0 1112 0v2m-8 4h4M7 10h10a1 1 0 011 1v7a1 1 0 01-1 1H7a1 1 0 01-1-1v-7a1 1 0 011-1z" },
  { title: "Built for Real Life", body: "Designed for students, workers, families and homeowners.", color: "#FF7A0A", bg: "#fff1e3", path: "M12 21s-7-4.35-7-10a4 4 0 017-2.65A4 4 0 0119 11c0 5.65-7 10-7 10z" },
];

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function CategoryLanding({
  slug,
  heading,
  longCopy,
}: CategoryLandingProps) {
  const category = getCategory(slug);
  const meta = CAT[slug];
  const items = getCalculatorsByCategory(slug);
  const total = CALCULATORS.length;

  const tools: ToolItem[] = items.map((c) => ({
    title: c.title,
    href: c.href,
    blurb: c.blurb,
    popular: c.popular,
    iconPath: iconForTitle(c.title, slug),
  }));

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span className={styles.sep}>›</span>
          <Link href="/calculators">Calculators</Link>
          <span className={styles.sep}>›</span>
          <span aria-current="page">{meta.short}</span>
        </nav>

        {/* Hero */}
        <section className={styles.hero}>
          <div>
            <div className={styles.heroHead}>
              <span className={styles.heroIcon} style={{ background: meta.tint, color: meta.color }}>
                <LineIcon path={meta.icon} size={30} />
              </span>
              <h1 className={styles.heroTitle}>
                {heading ?? `${meta.short} Calculators`}
              </h1>
            </div>
            <p className={styles.heroSub}>{category.description}</p>
            <div className={styles.trustRow}>
              {["100% Free", "UK Focused", "No Sign Up", "Always Up to Date"].map((t) => (
                <span key={t} className={styles.trustItem}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#18B063" strokeWidth="2.4" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M8.5 12.5l2.5 2.5 4.5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {t}
                </span>
              ))}
            </div>
          </div>
          <Image
            className={styles.heroArt}
            src="/brand/hero-house.png"
            alt=""
            width={290}
            height={250}
            priority
          />
        </section>

        {/* Two-column body */}
        <div className={styles.grid}>
          <aside className={styles.sidebar}>
            <div className={styles.sideCard}>
              <div className={styles.sideTitle}>All Categories</div>
              <nav className={styles.catNav} aria-label="Categories">
                {CATEGORIES.map((c) => {
                  const m = CAT[c.slug];
                  const count = getCalculatorsByCategory(c.slug).length;
                  const active = c.slug === slug;
                  return (
                    <Link
                      key={c.slug}
                      href={c.href}
                      className={`${styles.catNavItem} ${active ? styles.active : ""}`}
                      style={{ ["--cat" as string]: m.color, ["--cat-tint" as string]: m.tint }}
                      aria-current={active ? "page" : undefined}
                    >
                      <span className={styles.catNavIcon} style={{ color: m.color }}>
                        <LineIcon path={m.icon} size={19} />
                      </span>
                      <span className={styles.catNavText}>
                        <span className={styles.catNavName}>{m.short}</span>
                        <span className={styles.catNavCount}>{count} calculators</span>
                      </span>
                    </Link>
                  );
                })}
                <Link
                  href="/calculators"
                  className={styles.catNavItem}
                  style={{ ["--cat" as string]: "#0d66f4", ["--cat-tint" as string]: "#eef5ff" }}
                >
                  <span className={styles.catNavIcon} style={{ color: "#0d66f4" }}>
                    <LineIcon path={ICON.grid} size={19} />
                  </span>
                  <span className={styles.catNavText}>
                    <span className={styles.catNavName}>All Calculators</span>
                    <span className={styles.catNavCount}>{total}+ calculators</span>
                  </span>
                </Link>
              </nav>
            </div>

            <div className={styles.promo}>
              <Image className={styles.promoArt} src="/brand/request-calculator-illustration.png" alt="" width={300} height={124} />
              <div className={styles.promoTitle}>Plan better. Save more.</div>
              <p className={styles.promoBody}>
                Get expert guides and tools to help you make confident financial
                decisions.
              </p>
              <Link href="/blog" className={styles.btnPrimary}>
                Explore guides <ArrowRight />
              </Link>
            </div>

            <div className={styles.sideAd}>
              <AdSlot size="mpu" />
            </div>
          </aside>

          <CategoryTools label={meta.short} color={meta.color} tint={meta.tint} tools={tools} />
        </div>

        {/* Ad */}
        <div className={styles.adRow}>
          <AdSlot size="leaderboard" />
        </div>

        {/* Why Govmath */}
        <section className={styles.whySection}>
          <div className={styles.whyTitleRow}>Why Govmath?</div>
          <div className={styles.whyGrid}>
            {WHY.map((w) => (
              <div key={w.title} className={styles.whyCard}>
                <span className={styles.whyIcon} style={{ background: w.bg, color: w.color }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d={w.path} />
                    {w.inner && <path d={w.inner} />}
                  </svg>
                </span>
                <h3 className={styles.whyCardTitle}>{w.title}</h3>
                <p className={styles.whyBody}>{w.body}</p>
              </div>
            ))}
          </div>
        </section>

        {longCopy && <section className={`gm-prose ${styles.longCopy}`}>{longCopy}</section>}
      </div>
    </div>
  );
}
