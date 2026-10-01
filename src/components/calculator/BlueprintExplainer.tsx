import { isValidElement, type ReactNode } from "react";
import styles from "./Shell.module.css";
import Disclosure from "./Disclosure";

function nodeToText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeToText).join(" ");
  if (isValidElement(node)) {
    const children = (node.props as { children?: ReactNode }).children;
    return nodeToText(children);
  }
  return "";
}

type Pitfall = {
  title: string;
  body: ReactNode;
};

type BlueprintExplainerProps = {
  /** Section 1 — How We Calculated Your Result */
  howWeCalculated: ReactNode;
  /** Section 2 — Official UK Rules in Simple English */
  officialRules: ReactNode;
  /** Section 3 — Common Pitfalls to Watch Out For */
  pitfalls: Pitfall[];
  /** Optional FAQ disclosures rendered below the three sections. */
  faqs?: { question: string; answer: ReactNode }[];
  /** Small print footnote (e.g. tax-year disclaimer). */
  disclaimer?: ReactNode;
};

/**
 * Standard 3-section explainer used under every GovMath calculator.
 *
 * Layout is intentionally fixed so users learn what to expect across
 * pages: "How we got the answer" → "What the official rule is" →
 * "Where people get caught out".
 */
export default function BlueprintExplainer({
  howWeCalculated,
  officialRules,
  pitfalls,
  faqs,
  disclaimer,
}: BlueprintExplainerProps) {
  const faqJsonLd =
    faqs && faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs
            .map((f) => ({ q: f.question, a: nodeToText(f.answer).replace(/\s+/g, " ").trim() }))
            .filter((f) => f.a.length > 0)
            .map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
        }
      : null;
  return (
    <>
      {faqJsonLd && faqJsonLd.mainEntity.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <section className={styles.section} data-reveal>
        <div className={styles.sectionHead}>
          <span className={styles.num} aria-hidden="true">1</span>
          <h2>How we calculated your result</h2>
        </div>
        <div className={styles.prose}>{howWeCalculated}</div>
      </section>

      <section className={styles.section} data-reveal>
        <div className={styles.sectionHead}>
          <span className={styles.num} aria-hidden="true">2</span>
          <h2>Official UK rules in simple English</h2>
        </div>
        <div className={styles.prose}>{officialRules}</div>
      </section>

      <section className={styles.section} data-reveal>
        <div className={styles.sectionHead}>
          <span className={styles.num} aria-hidden="true">3</span>
          <h2>Common pitfalls to watch out for</h2>
        </div>
        <ul className={styles.pitfalls}>
          {pitfalls.map((p) => (
            <li key={p.title} className={styles.pitfall}>
              <span className={styles.pitfallIcon} aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4}>
                  <path d="M12 8v5M12 16.5v.5M10.3 3.9 2.6 17.2A2 2 0 0 0 4.3 20h15.4a2 2 0 0 0 1.7-2.8L13.7 3.9a2 2 0 0 0-3.4 0z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div>
                <h3>{p.title}</h3>
                <div>{p.body}</div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {faqs && faqs.length > 0 && (
        <section className={styles.section} data-reveal>
          <div className={styles.sectionHead}>
            <span className={styles.num} aria-hidden="true">4</span>
            <h2>Frequently asked questions</h2>
          </div>
          <div className={styles.faqs}>
            {faqs.map((f) => (
              <Disclosure key={f.question} question={f.question}>
                {f.answer}
              </Disclosure>
            ))}
          </div>
        </section>
      )}

      {disclaimer && <p className={styles.disclaimer}>{disclaimer}</p>}
    </>
  );
}
