import Link from "next/link";
import type { CSSProperties } from "react";
import { CATEGORIES, CALCULATORS, getCalculatorsByCategory, type CategorySlug } from "@/lib/calculators";
import { CAT, iconForTitle, LineIcon } from "@/components/category-style";
import HomeSearch, { type SearchItem } from "@/components/HomeSearch";
import TakeHomeSimulator from "@/components/home/TakeHomeSimulator";
import { CountUp, HomeMotion } from "@/components/home/Motion";
import AdSlot from "@/components/AdSlot";
import styles from "./GovmathHome.module.css";

/**
 * Each topic's accent: `c` is text-safe on white (≥4.5:1), `g` is the second
 * gradient stop for icon tiles, `t` a soft tint for surfaces.
 */
const ACCENT: Record<CategorySlug, { c: string; g: string; t: string }> = {
  "tax-and-salary": { c: "#4353ff", g: "#7c3aed", t: "#eef0ff" },
  property: { c: "#0a8f7a", g: "#22c1c3", t: "#e6f8f5" },
  business: { c: "#d9610b", g: "#f7a531", t: "#fff3e6" },
  investing: { c: "#6d3df0", g: "#b06cf7", t: "#f2edff" },
  benefits: { c: "#d92c69", g: "#fb7aa1", t: "#ffedf3" },
  vehicles: { c: "#0b7fc7", g: "#35c3f3", t: "#e8f6fe" },
  students: { c: "#8a34d9", g: "#d066f0", t: "#f6edff" },
  life: { c: "#2f8f2f", g: "#8ccf3f", t: "#eef9e8" },
};
const accent = (slug: CategorySlug) =>
  ({ ["--c" as string]: ACCENT[slug].c, ["--g" as string]: ACCENT[slug].g, ["--t" as string]: ACCENT[slug].t }) as CSSProperties;
const stagger = (i: number) => ({ ["--d" as string]: `${i * 70}ms` }) as CSSProperties;

const SHORTCUTS = [
  { label: "Salary", href: "/tax-and-salary/salary-calculator" },
  { label: "Stamp Duty", href: "/property/stamp-duty-england" },
  { label: "VAT", href: "/business/vat-calculator" },
  { label: "Mortgage", href: "/property/mortgage-repayment" },
  { label: "Child Benefit", href: "/benefits/child-benefit" },
];

const MOST_POPULAR = [
  "/tax-and-salary/salary-calculator",
  "/property/mortgage-repayment",
  "/property/stamp-duty-england",
  "/business/vat-calculator",
  "/tax-and-salary/national-insurance",
  "/benefits/child-benefit",
];

const FEATURED: { href: string; tag: string; title: string; blurb: string; foot: string }[] = [
  { href: "/tax-and-salary/salary-calculator", tag: "Salary & PAYE", title: "Take-Home Pay", blurb: "Your pay after Income Tax, National Insurance, pension and student loan.", foot: "Instant result" },
  { href: "/property/stamp-duty-england", tag: "Property", title: "Stamp Duty (SDLT)", blurb: "Stamp Duty on a home in England or Northern Ireland, band by band.", foot: "2025/26 thresholds" },
  { href: "/property/mortgage-repayment", tag: "Mortgages", title: "Mortgage Repayment", blurb: "Monthly payments, interest vs capital and total cost over the full term.", foot: "Full breakdown" },
  { href: "/business/dividend-vs-salary", tag: "Limited company", title: "Dividend vs Salary", blurb: "Find a tax-efficient split between salary and dividends for directors.", foot: "Director planning" },
];

const RATES = [
  { label: "Personal Allowance", value: "£12,570" },
  { label: "Basic rate", value: "20%" },
  { label: "Higher rate", value: "40%" },
  { label: "Employee NI", value: "8%" },
];

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden="true" className={styles.arrow}>
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Check() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function GovmathHome() {
  const total = CALCULATORS.length;
  const find = (href: string) => CALCULATORS.find((c) => c.href === href);

  const searchItems: SearchItem[] = CALCULATORS.map((c) => ({
    title: c.title,
    href: c.href,
    category: CAT[c.category].label,
  }));
  const popular = MOST_POPULAR.flatMap((href) => find(href) ?? []);

  return (
    <div className={styles.page} id="gm-home">
      <HomeMotion rootId="gm-home" />

      {/* ── Hero ───────────────────────────────────────── */}
      <section className={styles.hero} aria-labelledby="hero-heading">
        <div className={styles.aurora} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <div className={`gm-wrap ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <span className={styles.pill}>
              <span className={styles.pulse} aria-hidden="true" />
              Updated for the 2025/26 tax year
            </span>
            <h1 id="hero-heading" className={styles.heroTitle}>
              <span>Free UK calculators</span>
              <span className={styles.grad}>for tax, pay, property &amp; benefits</span>
            </h1>
            <p className={styles.lead}>
              {total} free, easy-to-use calculators for income tax, take-home pay, mortgages, Stamp Duty, VAT and benefits.
              Results update as you type, with the maths explained in plain English.
            </p>
            <div className={styles.searchWrap}>
              <HomeSearch items={searchItems} shortcuts={SHORTCUTS} />
            </div>
            <ul className={styles.trust}>
              {["Official HMRC & GOV.UK rates", "Free, no sign-up", "Nothing you type is stored"].map((t) => (
                <li key={t}>
                  <Check />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <aside className={styles.popular} aria-labelledby="popular-heading" data-spot>
            <h2 id="popular-heading">
              <span aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4}>
                  <path d="M3 17l6-6 4 4 8-8M21 7h-5M21 7v5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              Most popular
            </h2>
            <ul>
              {popular.map((c, i) => (
                <li key={c.href} style={stagger(i)}>
                  <Link href={c.href} style={accent(c.category)}>
                    <span className={styles.popularIcon}>
                      <LineIcon path={iconForTitle(c.title, c.category)} size={19} />
                    </span>
                    <span className={styles.popularText}>
                      <strong>{c.title}</strong>
                      <small>{CAT[c.category].label}</small>
                    </span>
                    <Arrow />
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        {/* Stats + live rates */}
        <div className={`gm-wrap ${styles.heroBand}`} data-reveal>
          <dl className={styles.stats}>
            <div>
              <dd>
                <CountUp to={total} />
              </dd>
              <dt>Free calculators</dt>
            </div>
            <div>
              <dd>
                <CountUp to={CATEGORIES.length} />
              </dd>
              <dt>Money topics</dt>
            </div>
            <div>
              <dd>2025/26</dd>
              <dt>Tax-year rates</dt>
            </div>
          </dl>
          <dl className={styles.rates} aria-label="Key 2025/26 rates">
            {RATES.map((r) => (
              <div key={r.label}>
                <dt>{r.label}</dt>
                <dd>{r.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Live calculator ────────────────────────────── */}
      <section id="calculator" aria-labelledby="simulator-heading" className={`gm-wrap ${styles.block}`}>
        <div className={styles.blockHead} data-reveal>
          <div>
            <span className={styles.kicker}>Try it now</span>
            <p className={styles.blockTitle}>See your take-home pay in seconds</p>
          </div>
        </div>
        <div data-reveal>
          <TakeHomeSimulator />
        </div>
      </section>

      {/* ── Most-used ──────────────────────────────────── */}
      <section aria-labelledby="featured-heading" className={`gm-wrap ${styles.block}`}>
        <div className={styles.blockHead} data-reveal>
          <div>
            <span className={styles.kicker}>Most used</span>
            <h2 id="featured-heading" className={styles.blockTitle}>
              The calculators people reach for most
            </h2>
          </div>
          <Link href="/calculators" className="gm-btn-outline">
            View all {total} calculators
          </Link>
        </div>
        <ul className={styles.featuredGrid}>
          {FEATURED.map((f, i) => {
            const calc = find(f.href);
            if (!calc) return null;
            return (
              <li key={f.href} data-reveal style={stagger(i)}>
                <Link href={f.href} className={styles.featureCard} style={accent(calc.category)} data-spot>
                  <span className={styles.featureIcon}>
                    <LineIcon path={iconForTitle(calc.title, calc.category)} size={24} />
                  </span>
                  <span className={styles.featureTag}>{f.tag}</span>
                  <strong>{f.title}</strong>
                  <span className={styles.featureDesc}>{f.blurb}</span>
                  <span className={styles.featureFoot}>
                    {f.foot} <Arrow />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <div className={`gm-wrap ${styles.adRow}`}>
        <AdSlot size="leaderboard" />
      </div>

      {/* ── Every topic, every calculator ──────────────── */}
      <section id="topics" aria-labelledby="topics-heading" className={`gm-wrap ${styles.block}`}>
        <div className={styles.blockHead} data-reveal>
          <div>
            <span className={styles.kicker}>Browse</span>
            <h2 id="topics-heading" className={styles.blockTitle}>
              All {total} calculators, by topic
            </h2>
          </div>
        </div>

        <nav aria-label="Jump to topic" className={styles.jump} data-reveal>
          {CATEGORIES.map((c) => (
            <a key={c.slug} href={`#${c.slug}`} style={accent(c.slug)}>
              <LineIcon path={CAT[c.slug].icon} size={17} />
              {CAT[c.slug].label}
            </a>
          ))}
        </nav>

        <div className={styles.panels}>
          {CATEGORIES.map((c) => {
            const tools = getCalculatorsByCategory(c.slug);
            return (
              <section key={c.slug} id={c.slug} aria-labelledby={`${c.slug}-heading`} className={styles.panel} style={accent(c.slug)} data-reveal>
                <header className={styles.panelHead}>
                  <span className={styles.panelIcon}>
                    <LineIcon path={CAT[c.slug].icon} size={26} />
                  </span>
                  <div>
                    <h3 id={`${c.slug}-heading`}>{c.title}</h3>
                    <p>{c.tagline}</p>
                  </div>
                  <Link href={c.href} className={styles.panelPill}>
                    {tools.length} calculators <Arrow />
                  </Link>
                </header>
                <ul className={styles.tiles}>
                  {tools.map((t) => (
                    <li key={t.href}>
                      <Link href={t.href}>
                        <span>{t.title}</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
                          <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </section>

      {/* ── Reassurance + request ──────────────────────── */}
      <section className={`gm-wrap ${styles.block} ${styles.faqGrid}`} aria-labelledby="free-heading">
        <div data-reveal>
          <span className={styles.kicker}>Good to know</span>
          <h2 id="free-heading" className={styles.blockTitle}>
            Are the calculators free to use?
          </h2>
          <p>
            Yes. Every GovMath calculator is completely free, with no account or sign-up. Nothing you type into a calculator is
            stored.
          </p>
          <p>
            Figures use the official HMRC and GOV.UK rates for the 2025/26 tax year. They are estimates to help you plan — always
            check anything important against your own circumstances.
          </p>
        </div>
        <div className={styles.request} data-reveal>
          <h2>Can&rsquo;t find the calculator you need?</h2>
          <p>Tell us what you&rsquo;d like to work out and we&rsquo;ll look at building it.</p>
          <Link className={styles.requestBtn} href="/contact">
            Request a calculator <Arrow />
          </Link>
        </div>
      </section>
    </div>
  );
}
