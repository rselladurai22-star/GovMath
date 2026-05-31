import Link from "next/link";
import type { ReactNode } from "react";
import AdSlot from "@/components/AdSlot";
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Page header */}
      <section className="ink-panel text-white relative overflow-hidden">
        <div className="grid-overlay pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14">
          <nav
            aria-label="Breadcrumb"
            className="text-sm text-white/70 mb-4"
          >
            <ol className="flex flex-wrap items-center gap-1">
              {breadcrumbs.map((c, i) => (
                <li key={c.href} className="flex items-center gap-1">
                  {i > 0 && <span aria-hidden>/</span>}
                  <Link href={c.href} className="hover:underline">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
          <p className="inline-block text-xs font-semibold uppercase tracking-wider bg-white/10 border border-white/20 rounded-full px-3 py-1 mb-4">
            {category}
            {updatedLabel ? ` · ${updatedLabel}` : ""}
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight max-w-3xl">
            {title}
          </h1>
          <p className="mt-4 text-lg text-white/85 max-w-2xl">{intro}</p>
        </div>
      </section>

      {/* Calculator + sidebar */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-10 grid gap-8 lg:grid-cols-[1fr_300px]">
        <div className="min-w-0">{calculator}</div>
        <aside className="space-y-6">
          <AdSlot size="mpu" />
          <div className="card p-5">
            <h3 className="font-bold text-primary-dark mb-2">
              Plain-English promise
            </h3>
            <p className="text-sm text-muted">
              We translate HMRC and DWP rules into clear answers. Figures are
              estimates — always check your personal tax code.
            </p>
          </div>
        </aside>
      </section>

      {/* Ad: leaderboard between calc and explainer */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <AdSlot size="leaderboard" />
      </div>

      {/* Explainer */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
        <div className="prose-like space-y-6 text-text">{explainer}</div>
      </section>

      {/* Related calculators */}
      {related.length > 0 && (
        <section className="bg-surface border-t border-border">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
            <h2 className="text-2xl font-extrabold text-primary-dark mb-2">
              Related calculators
            </h2>
            <p className="text-text/75 mb-6">
              More tools in {category}.
            </p>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    className="card card-interactive group block h-full p-5"
                  >
                    <h3 className="font-bold text-primary-dark mb-1 group-hover:text-primary transition-colors">
                      {c.title}
                    </h3>
                    <p className="text-sm text-muted">{c.blurb}</p>
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
