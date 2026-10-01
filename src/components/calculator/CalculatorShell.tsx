import Link from "next/link";
import type { ReactNode } from "react";
import AdSlot from "@/components/AdSlot";
import PageHero from "@/components/PageHero";
import { iconForTitle, LineIcon, shortTitle } from "@/components/category-style";
import { HomeMotion } from "@/components/home/Motion";
import styles from "./Shell.module.css";
import { CALCULATORS } from "@/lib/calculators";

type Crumb = { href: string; label: string };

type CalculatorShellProps = {
  category: string;
  title: string;
  intro: string;
  breadcrumbs: Crumb[];
  /** Interactive calculator (usually a Client Component). */
  calculator: ReactNode;
  /** Plain-English explainer rendered below the calculator. */
  explainer: ReactNode;
  /** Optional last-updated label, e.g. "Updated for 2025/26". */
  updatedLabel?: string;
};

export default function CalculatorShell({
  category,
  title,
  intro,
  breadcrumbs,
  calculator,
  explainer,
  updatedLabel,
}: CalculatorShellProps) {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: `https://govmath.co.uk${c.href}`,
    })),
  };
  const currentHref = breadcrumbs[breadcrumbs.length - 1]?.href;
  const currentCalc = CALCULATORS.find((c) => c.href === currentHref);
  const related = currentCalc
    ? CALCULATORS.filter(
        (c) =>
          c.category === currentCalc.category &&
          c.status === "live" &&
          c.href !== currentHref,
      ).slice(0, 6)
    : [];
  return (
    <div id="gm-calc-page">
      <HomeMotion rootId="gm-calc-page" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PageHero
        breadcrumbs={breadcrumbs}
        eyebrow={`${category}${updatedLabel ? ` · ${updatedLabel}` : ""}`}
        title={title}
        lead={intro}
        icon={currentCalc ? iconForTitle(currentCalc.title, currentCalc.category) : undefined}
        tone={currentCalc?.category}
      />

      {/* Calculator + sidebar */}
      <section className={`gm-wrap ${styles.body}`}>
        <div className="gm-calc min-w-0">{calculator}</div>
        <aside className={styles.aside}>
          <AdSlot size="mpu" />
          <div className={styles.promise}>
            <span className={styles.promiseIcon} aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
                <path d="M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6l7-3zM9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <h2>Plain-English promise</h2>
            <p>We translate HMRC and DWP rules into clear answers. Figures are estimates — always check your own circumstances.</p>
            <ul>
              {["Official 2025/26 rates", "Free, no sign-up", "Nothing you type is stored"].map((t) => (
                <li key={t}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} aria-hidden="true">
                    <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      {/* Ad: leaderboard between calc and explainer */}
      <div className={`gm-wrap ${styles.adRow}`}>
        <AdSlot size="leaderboard" />
      </div>

      {/* Explainer */}
      <section className={styles.explainer}>
        <div data-reveal>
          <span className={styles.kicker}>The maths, explained</span>
          <p className={styles.explainerTitle}>How this calculator works</p>
        </div>
        <div className={styles.sections}>{explainer}</div>
      </section>

      {/* Related calculators */}
      {related.length > 0 && (
        <section className={styles.related}>
          <div className="gm-wrap">
            <div data-reveal>
              <span className={styles.kicker}>Keep going</span>
              <h2 className={styles.explainerTitle} style={{ marginBottom: 0 }}>
                More {category} calculators
              </h2>
            </div>
            <ul className={styles.relatedGrid}>
              {related.map((c, i) => (
                <li key={c.href} data-reveal style={{ ["--d" as string]: `${i * 60}ms` }}>
                  <Link href={c.href} className={styles.relatedCard} data-spot>
                    <span className={styles.relatedIcon}>
                      <LineIcon path={iconForTitle(c.title, c.category)} size={24} />
                    </span>
                    <strong>{shortTitle(c.title)}</strong>
                    <p>{c.blurb}</p>
                    <span className={styles.relatedGo}>
                      Open calculator
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
                        <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}
