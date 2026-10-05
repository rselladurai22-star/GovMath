import Link from "next/link";
import type { Calculator } from "@/lib/calculators";
import { iconForTitle, LineIcon, shortTitle } from "@/components/category-style";
import Disclosure from "./Disclosure";
import styles from "./Shell.module.css";

/**
 * Closing section for the flagship calculator pages: FAQs, related tools and
 * a "good to know" note, in the same premium system as CalculatorShell.
 */
export default function EngineOutro({
  faqs,
  related,
  note,
}: {
  faqs: { q: string; a: string }[];
  related: Calculator[];
  note: string;
}) {
  return (
    <>
      <section id="faqs" className={styles.explainer}>
        <div data-reveal>
          <span className={styles.kicker}>Questions</span>
          <h2 className={styles.explainerTitle}>Frequently asked</h2>
        </div>
        <div className={styles.faqs} data-reveal>
          {faqs.map((f) => (
            <Disclosure key={f.q} question={f.q}>
              <p>{f.a}</p>
            </Disclosure>
          ))}
        </div>
        <div className={styles.note} data-reveal>
          <strong>Good to know</strong>
          <p>{note}</p>
        </div>
      </section>

      {related.length > 0 && (
        <section id="related" className={styles.related}>
          <div className="gm-wrap">
            <div data-reveal>
              <span className={styles.kicker}>Keep going</span>
              <h2 className={styles.explainerTitle} style={{ marginBottom: 0 }}>
                Other calculators
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
    </>
  );
}
