import Link from "next/link";
import {
  CATEGORIES,
  CALCULATORS,
  getCalculatorsByCategory,
  type Calculator,
} from "@/lib/calculators";
import { CAT, iconForTitle, LineIcon } from "@/components/category-style";
import HomeSearch, { type SearchItem } from "@/components/HomeSearch";
import AdSlot from "@/components/AdSlot";
import TopicBar from "@/components/TopicBar";
import styles from "./GovmathHome.module.css";

const SHORTCUTS = [
  { label: "Salary", href: "/tax-and-salary/salary-calculator" },
  { label: "Stamp Duty", href: "/property/stamp-duty-england" },
  { label: "VAT", href: "/business/vat-calculator" },
  { label: "Mortgage", href: "/property/mortgage-repayment" },
  { label: "Child Benefit", href: "/benefits/child-benefit" },
];

/** Hero sidebar: the handful of tools most visitors come for. */
const MOST_POPULAR = [
  "/tax-and-salary/salary-calculator",
  "/property/mortgage-repayment",
  "/property/stamp-duty-england",
  "/business/vat-calculator",
  "/tax-and-salary/national-insurance",
  "/benefits/child-benefit",
];

/** Two headline tools per topic: popular ones first, in registry order. */
function splitTopic(slug: Calculator["category"]) {
  const all = getCalculatorsByCategory(slug);
  const featured = [...all.filter((c) => c.popular), ...all.filter((c) => !c.popular)].slice(0, 2);
  return { all, featured };
}

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden="true" className={styles.arrow}>
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function GovmathHome() {
  const total = CALCULATORS.length;

  const searchItems: SearchItem[] = CALCULATORS.map((c) => ({
    title: c.title,
    href: c.href,
    category: CAT[c.category].label,
  }));

  const popular = MOST_POPULAR.flatMap((href) => {
    const c = CALCULATORS.find((x) => x.href === href);
    return c ? [c] : [];
  });

  return (
    <div className={styles.page}>
      {/* ── Hero: what this is, and search ─────────────────── */}
      <section className={styles.hero} aria-labelledby="hero-heading">
        <div className={`gm-wrap ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <h1 id="hero-heading" className={styles.heroTitle}>
              Free UK Calculators
              <span> for tax, pay, property &amp; benefits</span>
            </h1>
            <p className={styles.lead}>
              {total} free, easy-to-use calculators for UK income tax, take-home pay, mortgages,
              Stamp Duty, VAT, benefits and everyday money — updated for the 2025/26 tax year, with
              the maths explained in plain English.
            </p>
            <HomeSearch items={searchItems} shortcuts={SHORTCUTS} />
            <ul className={styles.trust}>
              {["Official HMRC & GOV.UK rates", "Free, no sign-up", "Nothing you type is stored"].map((t) => (
                <li key={t}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} aria-hidden="true">
                    <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <aside className={styles.popular} aria-labelledby="popular-heading">
            <h2 id="popular-heading">Most popular</h2>
            <ul>
              {popular.map((c) => (
                <li key={c.href}>
                  <Link href={c.href}>
                    <span className={styles.popularIcon}>
                      <LineIcon path={iconForTitle(c.title, c.category)} size={18} />
                    </span>
                    <span className={styles.popularText}>
                      <strong>{c.title}</strong>
                      <small>{CAT[c.category].label}</small>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* ── Topic tiles: jump to a section ─────────────────── */}
      <section className={styles.tilesSection} aria-labelledby="topics-heading">
        <div className="gm-wrap">
          <h2 id="topics-heading" className={styles.blockTitle}>
            Browse by topic
          </h2>
          <ul className={styles.tiles}>
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <a href={`#${c.slug}`} className={styles.tile}>
                  <span className={styles.tileIcon}>
                    <LineIcon path={CAT[c.slug].icon} size={26} stroke={1.6} />
                  </span>
                  <strong>{CAT[c.slug].label}</strong>
                  <small>{getCalculatorsByCategory(c.slug).length} calculators</small>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Every topic, every calculator ──────────────────── */}
      <div className={`gm-wrap ${styles.directory}`}>
        {CATEGORIES.map((c, i) => {
          const { all, featured } = splitTopic(c.slug);
          return (
            <div key={c.slug}>
              <section id={c.slug} className={styles.topic} aria-labelledby={`${c.slug}-heading`}>
                <TopicBar
                  id={`${c.slug}-heading`}
                  title={`${c.title} Calculators`}
                  icon={CAT[c.slug].icon}
                  href={c.href}
                  linkLabel={`View all ${all.length}`}
                />
                <p className={styles.topicDesc}>{c.description}</p>

                <div className={styles.featured}>
                  {featured.map((f) => (
                    <Link key={f.href} href={f.href} className={styles.featureCard}>
                      <span className={styles.featureIcon}>
                        <LineIcon path={iconForTitle(f.title, f.category)} size={30} stroke={1.5} />
                      </span>
                      <span className={styles.featureText}>
                        <strong>{f.title}</strong>
                        <span>{f.blurb}</span>
                      </span>
                      <Arrow />
                    </Link>
                  ))}
                </div>

                <ul className={styles.toolList}>
                  {all
                    .filter((t) => !featured.includes(t))
                    .map((t) => (
                      <li key={t.href}>
                        <Link href={t.href}>{t.title}</Link>
                      </li>
                    ))}
                </ul>
              </section>
              {i === 2 && (
                <div className={styles.adRow}>
                  <AdSlot size="leaderboard" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Reassurance + request ──────────────────────────── */}
      <section className={styles.faqSection} aria-labelledby="free-heading">
        <div className={`gm-wrap ${styles.faqGrid}`}>
          <div>
            <h2 id="free-heading" className={styles.blockTitle}>
              Are the calculators free to use?
            </h2>
            <p>
              Yes. Every GovMath calculator is completely free, with no account or sign-up. Nothing
              you type into a calculator is stored.
            </p>
            <p>
              Figures use the official HMRC and GOV.UK rates for the 2025/26 tax year. They are
              estimates to help you plan — always check anything important against your own
              circumstances.
            </p>
          </div>
          <div className={styles.request}>
            <h2>Can&rsquo;t find the calculator you need?</h2>
            <p>Tell us what you&rsquo;d like to work out and we&rsquo;ll look at building it.</p>
            <Link className="gm-btn" href="/contact">
              Request a calculator
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
