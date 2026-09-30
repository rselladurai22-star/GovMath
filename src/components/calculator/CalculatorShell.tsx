import Link from "next/link";
import type { ReactNode } from "react";
import AdSlot from "@/components/AdSlot";
import PageHero from "@/components/PageHero";
import { catVars, iconForTitle, LineIcon, shortTitle } from "@/components/category-style";
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
      <PageHero
        breadcrumbs={breadcrumbs}
        eyebrow={`${category}${updatedLabel ? ` · ${updatedLabel}` : ""}`}
        title={title}
        lead={intro}
        icon={currentCalc ? iconForTitle(currentCalc.title, currentCalc.category) : undefined}
        tone={currentCalc?.category}
      />

      {/* Calculator + sidebar */}
      <section className="gm-wrap py-10 grid gap-8 lg:grid-cols-[1fr_300px]">
        <div className="gm-calc min-w-0">{calculator}</div>
        <aside className="space-y-6">
          <AdSlot size="mpu" />
          <div className="rounded-[10px] border border-border bg-ice p-5">
            <h2 className="text-base font-bold text-navy">Plain-English promise</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">
              We translate HMRC and DWP rules into clear answers. Figures are
              estimates — always check your personal tax code.
            </p>
          </div>
        </aside>
      </section>

      {/* Ad: leaderboard between calc and explainer */}
      <div className="gm-wrap">
        <AdSlot size="leaderboard" />
      </div>

      {/* Explainer */}
      <section className="mx-auto max-w-3xl px-6 py-14">
        <div className="prose-like space-y-6 text-text">{explainer}</div>
      </section>

      {/* Related calculators */}
      {related.length > 0 && (
        <section className="bg-ice py-16">
          <div className="gm-wrap">
            <span className="gm-eyebrow">Keep going</span>
            <h2 className="gm-section-title mt-2">Related calculators</h2>
            <p className="gm-section-lead mb-8">More tools in {category}.</p>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    className="card card-interactive group flex h-full flex-col p-5"
                    style={catVars(c.category)}
                  >
                    <span className="gm-icon-tile mb-4" style={{ width: 44, height: 44, background: "var(--t)", color: "var(--c)" }}>
                      <LineIcon path={iconForTitle(c.title, c.category)} size={24} />
                    </span>
                    <h3 className="text-[1.15rem] font-bold leading-snug text-navy mb-2">
                      {shortTitle(c.title)}
                    </h3>
                    <p className="flex-1 text-[15px] leading-relaxed text-muted">{c.blurb}</p>
                    <span className="mt-4 border-t border-[#e9eef4] pt-3 text-[15px] font-bold text-primary group-hover:text-navy">
                      Open calculator
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
