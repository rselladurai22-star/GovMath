import { isValidElement, type ReactNode } from "react";
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
      <section>
        <h2 className="text-2xl font-bold text-primary-dark mb-3">
          How we calculated your result
        </h2>
        <div className="space-y-3 text-text/85 leading-relaxed">
          {howWeCalculated}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-primary-dark mb-3">
          Official UK rules in simple English
        </h2>
        <div className="space-y-3 text-text/85 leading-relaxed">
          {officialRules}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-primary-dark mb-3">
          Common pitfalls to watch out for
        </h2>
        <ul className="space-y-3">
          {pitfalls.map((p) => (
            <li
              key={p.title}
              className="rounded-lg border-l-4 border-error bg-surface border border-border p-4"
            >
              <h3 className="font-bold text-error mb-1">⚠ {p.title}</h3>
              <div className="text-text/85 text-[15px] leading-relaxed">
                {p.body}
              </div>
            </li>
          ))}
        </ul>
      </section>

      {faqs && faqs.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-primary-dark mb-3">
            Frequently asked questions
          </h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <Disclosure key={f.question} question={f.question}>
                {f.answer}
              </Disclosure>
            ))}
          </div>
        </section>
      )}

      {disclaimer && (
        <p className="text-xs text-text/60 border-t border-border pt-4">
          {disclaimer}
        </p>
      )}
    </>
  );
}
