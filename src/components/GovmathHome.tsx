import Link from "next/link";
import Image from "next/image";
import {
  CATEGORIES,
  CALCULATORS,
  getCalculatorsByCategory,
  type CategorySlug,
} from "@/lib/calculators";
import HomeSearch, { type SearchItem } from "@/components/HomeSearch";
import AdSlot from "@/components/AdSlot";
import styles from "./GovmathHome.module.css";

/* ── Per-category presentation (real categories only) ─────────────── */
type CatMeta = { label: string; short: string; color: string; tint: string; icon: string };

const ICON = {
  receipt:
    "M9 7h6m-6 4h6m-4 4h4M6 3h12a1 1 0 011 1v16l-3-2-2 2-2-2-2 2-2-2-3 2V4a1 1 0 011-1z",
  house: "M3 10.5L12 3l9 7.5M5 9.5V20a1 1 0 001 1h12a1 1 0 001-1V9.5M9.5 21v-6h5v6",
  briefcase:
    "M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2m-9 0h12a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V9a2 2 0 012-2zm0 4h16",
  bars: "M4 19h16M4 19V5m4 14v-6m4 6V9m4 10V7m4 12V11",
  heart: "M12 21s-7-4.35-7-10a4 4 0 017-2.65A4 4 0 0119 11c0 5.65-7 10-7 10z",
  car: "M5 16l1.5-5A2 2 0 018.4 9.6h7.2a2 2 0 011.9 1.4L19 16m-14 0h14m-14 0v2.5a.5.5 0 00.5.5h2a.5.5 0 00.5-.5V16m11 0v2.5a.5.5 0 01-.5.5h-2a.5.5 0 01-.5-.5V16M7.5 13h.01M16.5 13h.01",
  cap: "M12 4L2 9l10 5 10-5-10-5zm0 5v8m6-5.5V17a6 3 0 01-12 0v-4.5",
  calendar:
    "M8 7V3m8 4V3M4 11h16M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z",
  grid: "M4 5h6v6H4zM14 5h6v6h-6zM4 15h6v4H4zM14 15h6v4h-6z",
} as const;

const CAT: Record<CategorySlug, CatMeta> = {
  "tax-and-salary": { label: "Tax & Salary", short: "Tax & Salary", color: "#126CF3", tint: "#eaf2fe", icon: ICON.receipt },
  property: { label: "Property", short: "Property", color: "#18B063", tint: "#e7f7ef", icon: ICON.house },
  business: { label: "Business", short: "Business", color: "#FF7A0A", tint: "#fff1e3", icon: ICON.briefcase },
  investing: { label: "Pensions & Investing", short: "Pensions", color: "#8647F1", tint: "#f2ebfe", icon: ICON.bars },
  benefits: { label: "Family & Benefits", short: "Benefits", color: "#EE5CA0", tint: "#fdecf5", icon: ICON.heart },
  vehicles: { label: "Vehicles", short: "Vehicles", color: "#09AAB0", tint: "#e3f6f6", icon: ICON.car },
  students: { label: "Students", short: "Students", color: "#2D9AF3", tint: "#e8f4fe", icon: ICON.cap },
  life: { label: "Everyday Life", short: "Everyday Life", color: "#8A46F0", tint: "#f0eafe", icon: ICON.calendar },
};

/* ── Icon primitives ──────────────────────────────────────────────── */
function LineIcon({ path, size = 22 }: { path: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} className={styles.arrow} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const cssVar = (name: string, value: string) =>
  ({ [name]: value } as React.CSSProperties);

/* ── Curated content ──────────────────────────────────────────────── */
const POPULAR: { slug: CategorySlug; href: string; badge?: string }[] = [
  { slug: "property", href: "/property/mortgage-repayment", badge: "Most used" },
  { slug: "tax-and-salary", href: "/tax-and-salary/salary-calculator" },
  { slug: "property", href: "/property/stamp-duty-england" },
  { slug: "tax-and-salary", href: "/tax-and-salary/national-insurance" },
  { slug: "investing", href: "/investing/workplace-pension" },
];

const EXPLORE: CategorySlug[] = [
  "property",
  "tax-and-salary",
  "business",
  "benefits",
  "investing",
];

const WHY = [
  { title: "Accurate & Reliable", body: "Every calculation uses official HMRC, DWP and DVLA data and trusted UK sources.", color: "#126CF3", bg: "#eaf2fe", path: "M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6l7-3z", inner: "M9 12l2 2 4-4" },
  { title: "Fast & Easy", body: "Get answers in seconds with simple, plain-English tools — no sign-up required.", color: "#18B063", bg: "#e7f7ef", path: "M13 3L4 14h6l-1 7 9-11h-6l1-7z" },
  { title: "Private & Secure", body: "We don't store your personal information. Your numbers stay on your device.", color: "#8647F1", bg: "#f2ebfe", path: "M6 10V8a6 6 0 1112 0v2m-8 4h4M7 10h10a1 1 0 011 1v7a1 1 0 01-1 1H7a1 1 0 01-1-1v-7a1 1 0 011-1z" },
  { title: "Built for Real Life", body: "Designed for students, workers, families, homeowners and everyone in between.", color: "#FF7A0A", bg: "#fff1e3", path: "M12 21s-7-4.35-7-10a4 4 0 017-2.65A4 4 0 0119 11c0 5.65-7 10-7 10z" },
];

const byHref = (href: string) => CALCULATORS.find((c) => c.href === href);

export default function GovmathHome() {
  const searchItems: SearchItem[] = CALCULATORS.map((c) => ({
    title: c.title,
    href: c.href,
    category: CAT[c.category].label,
  }));
  const total = CALCULATORS.length;

  return (
    <div className={styles.page}>
      {/* ── Hero ────────────────────────────────────────────── */}
      <section className={`${styles.container} ${styles.hero}`}>
        <div>
          <h1 className={styles.heroTitle}>
            Smart calculations
            <br />
            for <em>life&rsquo;s</em> big decisions
          </h1>
          <p className={styles.heroSub}>
            {total}+ free calculators across money, property, tax, benefits and
            more. Accurate, up to date and built for real life in the UK.
          </p>
          <HomeSearch items={searchItems} />
          <div className={styles.trustRow}>
            {["100% Free", "UK Focused", "No Sign Up", "Always Up to Date"].map(
              (t) => (
                <span key={t} className={styles.trustItem}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#18B063" strokeWidth="2.4" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M8.5 12.5l2.5 2.5 4.5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {t}
                </span>
              )
            )}
          </div>
        </div>

        <div className={styles.heroCard}>
          <Image
            className={styles.heroArt}
            src="/brand/hero-house.png"
            alt=""
            width={290}
            height={250}
            priority
          />
          <div style={{ position: "relative", maxWidth: 300 }}>
            <div style={{ fontSize: 21, fontWeight: 800, color: "#0b1739", letterSpacing: "-0.02em" }}>
              Plan better. Save more.
            </div>
            <p style={{ margin: "10px 0 18px", fontSize: 13, lineHeight: 1.6, color: "#334063" }}>
              Accurate tools and guides to help you make confident financial
              decisions.
            </p>
            <Link href="/calculators" className={styles.btnPrimary}>
              Explore calculators <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Browse by Category ──────────────────────────────── */}
      <section className={styles.container}>
        <div className={styles.section}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>Browse by Category</h2>
            <Link href="/calculators" className={styles.viewAll}>
              View all categories <ArrowRight />
            </Link>
          </div>
          <div className={styles.catGrid}>
            {CATEGORIES.map((c) => {
              const m = CAT[c.slug];
              const count = getCalculatorsByCategory(c.slug).length;
              return (
                <Link
                  key={c.slug}
                  href={c.href}
                  className={styles.catCard}
                  style={cssVar("--cat", m.color)}
                >
                  <span style={{ color: m.color }}>
                    <LineIcon path={m.icon} size={26} />
                  </span>
                  <span className={styles.catName}>{m.short}</span>
                  <span className={styles.catCount}>{count} tools</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ad */}
      <section className={styles.container} style={{ marginTop: 20 }}>
        <AdSlot size="leaderboard" />
      </section>

      {/* ── Popular Calculators ─────────────────────────────── */}
      <section className={styles.container}>
        <div className={styles.section}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>Popular Calculators</h2>
            <Link href="/calculators" className={styles.viewAll}>
              View all calculators <ArrowRight />
            </Link>
          </div>
          <div className={styles.popGrid}>
            {POPULAR.map(({ slug, href, badge }) => {
              const calc = byHref(href);
              if (!calc) return null;
              const m = CAT[slug];
              return (
                <Link
                  key={href}
                  href={href}
                  className={styles.popCard}
                  style={cssVar("--cat", m.color)}
                >
                  <div className={styles.popTop}>
                    <span
                      className={styles.iconTile}
                      style={{ background: m.tint, color: m.color }}
                    >
                      <LineIcon path={m.icon} size={18} />
                    </span>
                    <span className={styles.popTitle}>{calc.title}</span>
                  </div>
                  <p className={styles.popDesc}>{calc.blurb}</p>
                  <div className={styles.popFoot}>
                    {badge ? (
                      <span className={styles.badge}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                          <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {badge}
                      </span>
                    ) : (
                      <span />
                    )}
                    <ArrowRight />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Explore Top Calculators by Category ─────────────── */}
      <section className={styles.container}>
        <div className={styles.section}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>
              Explore Top Calculators by Category
            </h2>
          </div>
          <div className={styles.exploreGrid}>
            {EXPLORE.map((slug) => {
              const m = CAT[slug];
              const cat = CATEGORIES.find((c) => c.slug === slug)!;
              const rows = getCalculatorsByCategory(slug).slice(0, 5);
              return (
                <div
                  key={slug}
                  className={styles.exploreCard}
                  style={cssVar("--cat", m.color)}
                >
                  <div className={styles.exploreHead}>
                    <span className={styles.exploreCat} style={{ color: m.color }}>
                      {m.short}
                    </span>
                    <Link href={cat.href} className={styles.exploreViewAll}>
                      View all →
                    </Link>
                  </div>
                  {rows.map((r) => (
                    <Link key={r.href} href={r.href} className={styles.exploreRow}>
                      <span style={{ color: m.color, display: "inline-flex" }}>
                        <LineIcon path={m.icon} size={15} />
                      </span>
                      <span style={{ flex: 1, minWidth: 0 }}>{r.title}</span>
                      <ArrowRight />
                    </Link>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ad */}
      <section className={styles.container} style={{ marginTop: 20 }}>
        <AdSlot size="billboard" />
      </section>

      {/* ── Why Govmath ─────────────────────────────────────── */}
      <section className={styles.container}>
        <div className={styles.section}>
          <div className={styles.sectionHead} style={{ justifyContent: "center" }}>
            <h2 className={styles.sectionTitle}>Why Govmath?</h2>
          </div>
          <div className={styles.whyGrid}>
            {WHY.map((w) => (
              <div key={w.title} className={styles.whyCard}>
                <span
                  className={styles.whyIcon}
                  style={{ background: w.bg, color: w.color }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d={w.path} />
                    {w.inner && <path d={w.inner} />}
                  </svg>
                </span>
                <h3 className={styles.whyTitle}>{w.title}</h3>
                <p className={styles.whyBody}>{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Request a Calculator CTA ────────────────────────── */}
      <section className={styles.container}>
        <div className={styles.cta}>
          <Image
            className={styles.ctaArt}
            src="/brand/request-calculator-illustration.png"
            alt=""
            width={520}
            height={300}
          />
          <div style={{ position: "relative", maxWidth: 460 }}>
            <h2 style={{ margin: 0, fontSize: 19, fontWeight: 800, color: "#0b1739", letterSpacing: "-0.02em" }}>
              Can&rsquo;t find what you need?
            </h2>
            <p style={{ margin: "8px 0 16px", fontSize: 13, lineHeight: 1.6, color: "#46516d" }}>
              We&rsquo;re always building new calculators. Tell us what
              you&rsquo;d like next.
            </p>
            <Link href="/contact" className={styles.btnPrimary}>
              Request a calculator <ArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
